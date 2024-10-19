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
    documents: HashMap<DocumentId, String>,      // Textos originales de los documentos
    total_docs: u64,                             // Total de documentos procesados
}

// Inicialización del estado del canister
thread_local! {
    static NLP_CANISTER: RefCell<NlpCanister> = RefCell::new(NlpCanister::default());
}

// ID del canister de la base de datos vectorial
static VECTORDB_CANISTER_ID: Lazy<Principal> = Lazy::new(|| {
    Principal::from_text("bkyz2-fmaaa-aaaaa-qaaaq-cai").unwrap() // tu ID real
});

// Función para procesar texto y generar el vector Hash
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

        // Guardar el vector hash y el texto en el estado del canister
        canister.hash_vectors.insert(doc_id, hashed_vector.clone());
        canister.documents.insert(doc_id, text.clone());

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

// Función para encontrar reportes similares basados en hashing
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

// Función para generar perfiles criminales basados en similitudes
#[update]
#[candid_method(update)]
async fn generate_criminal_profiles(num_profiles: i32) -> Vec<String> {
    ic_println!(
        "Generating {} criminal profiles based on similarities",
        num_profiles
    );

    // Obtener los vectores hash y los textos de los documentos
    let (documents_with_vectors, documents_texts) = NLP_CANISTER.with(|canister| {
        let canister = canister.borrow();
        (canister.hash_vectors.clone(), canister.documents.clone())
    });

    if documents_with_vectors.is_empty() {
        ic_println!("No documents available to generate profiles.");
        return vec![];
    }

    // Filtrar documentos relacionados con criminales (suponiendo que tienes una forma de diferenciarlos)
    let criminal_docs: Vec<(DocumentId, Vec<u32>, String)> = documents_with_vectors
        .iter()
        .filter_map(|(&doc_id, vector)| {
            if is_criminal_document(&documents_texts[&doc_id]) {
                Some((doc_id, vector.clone(), documents_texts[&doc_id].clone()))
            } else {
                None
            }
        })
        .collect();

    // Generar perfiles basados en los documentos de criminales
    generate_profiles(criminal_docs, num_profiles)
}

// Función para generar perfiles de víctimas basados en similitudes
#[update]
#[candid_method(update)]
async fn generate_victim_profiles(num_profiles: i32) -> Vec<String> {
    ic_println!(
        "Generating {} victim profiles based on similarities",
        num_profiles
    );

    // Obtener los vectores hash y los textos de los documentos
    let (documents_with_vectors, documents_texts) = NLP_CANISTER.with(|canister| {
        let canister = canister.borrow();
        (canister.hash_vectors.clone(), canister.documents.clone())
    });

    if documents_with_vectors.is_empty() {
        ic_println!("No documents available to generate profiles.");
        return vec![];
    }

    // Filtrar documentos relacionados con víctimas (suponiendo que tienes una forma de diferenciarlos)
    let victim_docs: Vec<(DocumentId, Vec<u32>, String)> = documents_with_vectors
        .iter()
        .filter_map(|(&doc_id, vector)| {
            if is_victim_document(&documents_texts[&doc_id]) {
                Some((doc_id, vector.clone(), documents_texts[&doc_id].clone()))
            } else {
                None
            }
        })
        .collect();

    // Generar perfiles basados en los documentos de víctimas
    generate_profiles(victim_docs, num_profiles)
}

// Función auxiliar para generar perfiles basados en una lista de documentos
fn generate_profiles(docs: Vec<(DocumentId, Vec<u32>, String)>, num_profiles: i32) -> Vec<String> {
    if docs.is_empty() {
        ic_println!("No documents available to generate profiles.");
        return vec![];
    }

    // Inicializar clusters y centroides
    let mut clusters: Vec<Vec<(DocumentId, String)>> = Vec::new();
    let mut centroids: Vec<Vec<u32>> = Vec::new();

    let num_clusters = num_profiles as usize;

    // Seleccionar documentos iniciales como centroides
    for i in 0..num_clusters {
        if let Some((doc_id, vector, text)) = docs.get(i) {
            clusters.push(vec![(*doc_id, text.clone())]);
            centroids.push(vector.clone());
        }
    }

    // Asignar documentos a clusters basados en similitud
    for (doc_id, vector, text) in docs.into_iter().skip(num_clusters) {
        let mut max_similarity = -1.0;
        let mut best_cluster = 0;
        for (i, centroid) in centroids.iter().enumerate() {
            let similarity = cosine_similarity(centroid, &vector);
            if similarity > max_similarity {
                max_similarity = similarity;
                best_cluster = i;
            }
        }
        clusters[best_cluster].push((doc_id, text));
    }

    // Generar perfiles para cada cluster
    let mut generated_profiles = Vec::new();

    for (i, cluster) in clusters.iter().enumerate() {
        let mut profile_text = format!("Perfil Generado {}\n", i + 1);
        profile_text.push_str("Combinación de los siguientes documentos:\n");
        for (_doc_id, text) in cluster {
            profile_text.push_str(text);
            profile_text.push_str("\n---\n");
        }
        generated_profiles.push(profile_text);
    }

    generated_profiles
}

// Función para determinar si un documento es de un criminal (simulación)
fn is_criminal_document(text: &str) -> bool {
    text.contains("Delitos") || text.contains("Modus Operandi")
}

// Función para determinar si un documento es de una víctima (simulación)
fn is_victim_document(text: &str) -> bool {
    text.contains("Incidente") || text.contains("Detalles")
}

// Función para calcular la similitud de coseno entre dos vectores
fn cosine_similarity(vec_a: &[u32], vec_b: &[u32]) -> f32 {
    let dot_product: u32 = vec_a.iter().zip(vec_b.iter()).map(|(a, b)| a * b).sum();
    let magnitude_a: f32 = vec_a
        .iter()
        .map(|a| (*a as f32).powi(2))
        .sum::<f32>()
        .sqrt();
    let magnitude_b: f32 = vec_b
        .iter()
        .map(|b| (*b as f32).powi(2))
        .sum::<f32>()
        .sqrt();

    if magnitude_a == 0.0 || magnitude_b == 0.0 {
        return 0.0;
    }

    dot_product as f32 / (magnitude_a * magnitude_b)
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
