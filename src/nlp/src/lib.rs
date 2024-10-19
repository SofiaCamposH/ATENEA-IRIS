use candid::{candid_method, CandidType, Principal};
use ic_cdk::api::call::call;
use ic_cdk::println as ic_println;
use ic_cdk_macros::*;
use once_cell::sync::Lazy;
use serde::Deserialize;
use std::cell::RefCell;
use std::collections::hash_map::DefaultHasher;
use std::collections::HashMap;
use std::hash::{Hash, Hasher};

// Tipo para identificar documentos
type DocumentId = u64;

// Definición de errores personalizados
#[derive(CandidType, Deserialize, Debug)]
enum CustomError {
    MemoryError,
    UniqueViolation,
    DimensionMismatch,
    NotFound,
}

// Resultados personalizados
#[derive(CandidType, Deserialize, Debug)]
enum CustomResult {
    Ok,
    Err(CustomError),
}

#[derive(CandidType, Deserialize, Debug)]
enum CustomResult2 {
    Ok(Vec<String>),
    Err(CustomError),
}

// Definición del estado del canister NLP
#[derive(Default)]
struct NlpCanister {
    hash_vectors: HashMap<DocumentId, Vec<u32>>, // Vectores hash por documento
    total_docs: u64,                             // Total de documentos procesados
}

// Inicialización del estado del canister
thread_local! {
    static NLP_CANISTER: RefCell<NlpCanister> = RefCell::new(NlpCanister::default());
}

// ID del canister de la base de datos vectorial
static VECTORDB_CANISTER_ID: Lazy<Principal> = Lazy::new(|| {
    Principal::from_text("be2us-64aaa-aaaaa-qaabq-cai").unwrap() // tu ID real
});

// Función para procesar texto y generar el vector Hash (debe ser un update porque modifica el estado)
#[update]
#[candid_method(update)]
async fn process_text(doc_id: DocumentId, text: String) -> Vec<u32> {
    ic_println!("Starting text processing for document ID: {}", doc_id);

    let hash_vector = NLP_CANISTER.with(|canister| {
        let mut canister = canister.borrow_mut();
        canister.total_docs += 1;

        // Generar el vector hash basado en el texto
        let tokens = tokenize(&text);
        let hashed_vector = hash_vectorize(&tokens, 128); // Vector de 128 dimensiones

        // Guardar el vector hash en el estado del canister
        canister.hash_vectors.insert(doc_id, hashed_vector.clone());

        hashed_vector
    });

    ic_println!("Generated hash vector for document: {:?}", hash_vector);

    let collection_name = "police_reports_hash".to_string(); // Nuevo nombre de colección

    // Convertir el vector de u32 a f32 para insertar en vectordb
    let hash_vector_f32: Vec<f32> = hash_vector.iter().map(|&x| x as f32).collect();

    // Verificar si la colección existe
    let collections: Vec<String> =
        match call::<(), (CustomResult2,)>(*VECTORDB_CANISTER_ID, "get_collections", ()).await {
            Ok((CustomResult2::Ok(collections),)) => collections,
            _ => return hash_vector,
        };

    if !collections.contains(&collection_name) {
        match call::<(String, u64), (CustomResult,)>(
            *VECTORDB_CANISTER_ID,
            "create_collection",
            (collection_name.clone(), hash_vector_f32.len() as u64),
        )
        .await
        {
            Ok((CustomResult::Ok,)) => ic_println!("Collection created successfully."),
            _ => return hash_vector,
        }
    }

    // Insertar el vector hash (convertido a f32) en vectordb
    let vectors = vec![hash_vector_f32.clone()];
    let documents = vec![text.clone()];
    let metadata = format!("doc_id:{}", doc_id);

    match call::<(String, Vec<Vec<f32>>, Vec<String>, String), (CustomResult,)>(
        *VECTORDB_CANISTER_ID,
        "insert",
        (collection_name, vectors, documents, metadata),
    )
    .await
    {
        Ok((CustomResult::Ok,)) => ic_println!("Successfully inserted hash vector into vectordb."),
        _ => ic_println!("Error inserting hash vector into vectordb."),
    }

    hash_vector
}

// Función para encontrar reportes similares basados en hashing (cambiar de query a update)
#[update] // Cambiado a update
#[candid_method(update)]
async fn find_similar(text: String, top_k: i32) -> Vec<String> {
    ic_println!("Starting similarity search for: '{}'", text);

    // Generar el vector hash del texto de consulta
    let tokens = tokenize(&text);
    let query_vector = hash_vectorize(&tokens, 128); // Vector de 128 dimensiones

    let collection_name = "police_reports_hash".to_string();

    // Verificar la colección y sus dimensiones
    let collections: Vec<String> =
        match call::<(), (CustomResult2,)>(*VECTORDB_CANISTER_ID, "get_collections", ()).await {
            Ok((CustomResult2::Ok(collections),)) => collections,
            _ => {
                ic_println!("Error fetching collections");
                return vec![];
            }
        };

    if !collections.contains(&collection_name) {
        ic_println!("Collection '{}' not found.", collection_name);
        return vec![];
    }

    // Realizar la consulta de similaridad en vectordb
    match call::<(String, Vec<f32>, i32), (CustomResult2,)>(
        *VECTORDB_CANISTER_ID,
        "find_query",
        (
            collection_name.clone(),
            query_vector.iter().map(|&x| x as f32).collect(),
            top_k,
        ),
    )
    .await
    {
        Ok((CustomResult2::Ok(results),)) => {
            ic_println!("Query successful, found results: {:?}", results);
            results
        }
        Ok((CustomResult2::Err(error),)) => {
            ic_println!("Error querying vectordb: {:?}", error);
            vec![]
        }
        Err((rejection_code, msg)) => {
            ic_println!(
                "Failed to call vectordb.find_query: {:?}, {}",
                rejection_code,
                msg
            );
            vec![]
        }
    }
}

// Función para tokenizar el texto
fn tokenize(text: &str) -> Vec<String> {
    text.split_whitespace()
        .map(|s| s.trim_matches(|c: char| !c.is_alphanumeric()))
        .filter(|s| !s.is_empty())
        .map(|s| s.to_lowercase())
        .collect()
}

// Función para vectorizar usando hashing
fn hash_vectorize(tokens: &[String], vector_size: usize) -> Vec<u32> {
    let mut vector = vec![0u32; vector_size];

    for token in tokens {
        let hash = calculate_hash(token);
        let index = (hash % vector_size as u64) as usize;
        vector[index] += 1;
    }

    vector
}

// Función para calcular un hash simple de una palabra
fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}
