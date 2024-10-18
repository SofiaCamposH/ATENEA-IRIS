// import { useAuth, useCandidActor } from "@bundly/ares-react";
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, SafeAreaView } from
    "react-native";
import { CandidActors } from "../../canisters";
import { useState } from "react";


type Denuncia = {
    id: any;
    denunciante: Denunciante;
    denunciado: Denunciado;
    entidad: string;
    municipio: string;
    bienJuridicoAfectado: string;
    tipoDelito: string;
    subtipo: string;
    hora: string;
    descripcion: string;
    status: string;
};

type Denunciante = {
    id: any;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    calle: string;
    numero: string;
    colonia: string;
    municipio: string;
    estado: string;
    telefono: string;
    email: string;
};

type Denunciado = {
    id: any;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    calle: string;
    numero: string;
    colonia: string;
    municipio: string;
    estado: string;
    telefono: string;
};

export default function CrearDenunciaScreen() {

    const [denunciaData, setDenunciaData] = useState({} as Denuncia);
    const [denuncianteData, setDenuncianteData] = useState({} as Denunciante);
    const [denunciadoData, setDenunciadoData] = useState({} as Denunciado);

    // const { currentIdentity } = useAuth();

    // const backend = useCandidActor<CandidActors>("backend", currentIdentity) as CandidActors["backend"];

    const handleChangeText = (field, value, setState) => {
        setState(prevState => ({ ...prevState, [field]: value }));
    };

    // async function handlePress() {
    //     try {
    //         // Crea los nuevos objetos localmente antes de setear el estado
    //         const newDenunciante = { ...denuncianteData, id: Date.now() + 1 };
    //         const newDenunciado = { ...denunciadoData, id: Date.now() + 2 };
    //         const newDenuncia: Denuncia = {
    //             ...denunciaData,
    //             id: Date.now(),
    //             denunciante: newDenunciante,
    //             denunciado: newDenunciado,
    //             status: 'Pendiente',
    //             hora: "09:15"
    //         };

    //         setDenuncianteData(newDenunciante);
    //         setDenunciadoData(newDenunciado);
    //         setDenunciaData(newDenuncia);

    //         // console.log(typeof newDenuncia.denunciado.municipio);
    //         // console.log(newDenuncia);
    //         // console.log(typeof newDenuncia.denunciado.municipio);
    //         // const result = await backend.addDenuncia(newDenuncia);
    //         const result = await backend.addDenuncia(newDenuncia);
    //         console.log(result);

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Crear Denuncia</Text>

                {/* Datos de la Denuncia */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Datos de la Denuncia</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Entidad</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entidad"
                            value={denunciaData.entidad || ''}
                            onChangeText={(text) => handleChangeText('entidad', text, setDenunciaData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Municipio</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Municipio"
                            value={denunciaData.municipio || ''}
                            onChangeText={(text) => handleChangeText('municipio', text, setDenunciaData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Bien Jurídico Afectado</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Bien Jurídico Afectado"
                            value={denunciaData.bienJuridicoAfectado || ''}
                            onChangeText={(text) => handleChangeText('bienJuridicoAfectado', text, setDenunciaData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tipo de Delito</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo de Delito"
                            value={denunciaData.tipoDelito || ''}
                            onChangeText={(text) => handleChangeText('tipoDelito', text, setDenunciaData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Subtipo de Delito</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Subtipo de Delito"
                            value={denunciaData.subtipo || ''}
                            onChangeText={(text) => handleChangeText('subtipo', text, setDenunciaData)}
                        />
                    </View>
                </View>

                {/* Datos del Denunciante */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Datos del Denunciante</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del denunciante"
                            value={denuncianteData.nombre || ''}
                            onChangeText={(text) => handleChangeText('nombre', text, setDenuncianteData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Apellido Paterno</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido Paterno del denunciante"
                            value={denuncianteData.apellidoPaterno || ''}
                            onChangeText={(text) => handleChangeText('apellidoPaterno', text, setDenuncianteData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Apellido Materno</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido Materno del denunciante"
                            value={denuncianteData.apellidoMaterno || ''}
                            onChangeText={(text) => handleChangeText('apellidoMaterno', text, setDenuncianteData)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Calle</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Calle del denunciante"
                            value={denuncianteData.calle || ''}
                            onChangeText={(text) => handleChangeText('calle', text, setDenuncianteData)}
                        />
                    </View>

                    {/* Más campos para Denunciante */}
                    {/* ... */}
                </View>

                {/* Datos del Denunciado */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Datos del Denunciado</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del denunciado"
                            value={denunciadoData.nombre || ''}
                            onChangeText={(text) => handleChangeText('nombre', text, setDenunciadoData)}
                        />
                    </View>

                    {/* Más campos para Denunciado */}
                    {/* ... */}
                </View>

                {/* Descripción del Suceso */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Descripción del Suceso</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Descripción del suceso"
                        value={denunciaData.descripcion || ''}
                        onChangeText={(text) => handleChangeText('descripcion', text, setDenunciaData)}
                        multiline
                    />
                </View>

                {/* Botón */}
                <Pressable style={styles.button} onPress={() => console.log("Formulario enviado")}>
                    <Text style={styles.buttonText}>Enviar Denuncia</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    content: {
        paddingBottom: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CrearDenunciaScreen;
