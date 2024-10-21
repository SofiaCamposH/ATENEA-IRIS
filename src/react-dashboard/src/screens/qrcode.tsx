import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createActor } from "../declarations/backend";
import { AuthContext } from "../context/AuthContext";
import { Denuncia } from "../declarations/backend/backend.did";

export default function QRCodeScreen() {

    const [denuncia, setDenuncia] = useState<Denuncia>({} as Denuncia);

    // Get the id from the URL
    let { id } = useParams<{ id: string }>();
    // Parse the id to an integer
    let idInt = parseInt(id ?? "0");

    const { identity } = useContext(AuthContext);

    let canisterId: any = "fvkqz-2qaaa-aaaap-akphq-cai";
    let backend = createActor(canisterId, {
        agentOptions: {
            host: "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/",
            identity,
        },
    });

    useEffect(() => {
        init();
    }, []);

    async function init() {
        try {
            let response = await backend.getDenuncia(BigInt(idInt));
            setDenuncia(response.ok);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        // Using Tailwind CSS for styling the QR code screen layout optimized for mobile devices
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">QR Code Screen</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Denuncia</h2>
                <p>Status: {denuncia.status}</p>
                <p>Municipio: {denuncia.municipio}</p>
                <p>Subtipo: {denuncia.subtipo}</p>
                <p>Hora: {denuncia.hora}</p>
                <p>Tipo de Delito: {denuncia.tipoDelito}</p>
                <p>Entidad: {denuncia.entidad}</p>
                <p>Bien Jurídico Afectado: {denuncia.bienJuridicoAfectado}</p>
            </div>
        </div>
    );
}
