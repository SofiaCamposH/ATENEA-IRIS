import PiePagina from "../components/piePagina";
import React from "react";
function Blockchain() {
    return (
        <div>
            <br />
            <br />
            <br />
            <div className="flex justify-center p-5"></div>

            {/* Sección de héroe */}
            <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex flex-col items-center justify-center text-center p-6">
                <main className="flex flex-col md:flex-row items-center justify-between text-left w-full max-w-4xl">
                    {/* Contenedor del Texto */}
                    <div className="flex flex-col items-start justify-center text-left">
                        <p className="text-gray-300 mb-2 text-lg md:text-xl">Blockchain Is New Brands!</p>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">BLOCKCHAIN</h1>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 mb-8 shadow-lg">
                            Get Started
                        </button>
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            REPORTES CREADOS POR LOS USUARIOS DE LA APP ATENEA
                        </h2>
                    </div>

                    {/* Contenedor de la Imagen */}
                    <div className="relative w-60 h-60 md:w-96 md:h-96 mb-10 md:mb-0">
                        <img
                            src="https://ucarecdn.com/095908d3-956e-41d7-895d-cc68b40ee559/blockchain.png"
                            alt="Blockchain Icon"
                            className="w-full h-full object-contain"
                        />
                    </div>

                </main>

                {/*Seccion de logo */}
                <div className="flex justify-center p-5">
                    <img
                        src="https://ucarecdn.com/bf514a6a-bc47-4f69-be69-79c92bb48807/infinityremovebgpreview.png"
                        alt="logo"
                        style={{ width: "300px", height: "auto" }}
                    />
                </div>

                {/* Dos imagenes */}
                <div className="flex justify-center p-5 space-x-5">
                    <img
                        src="https://ucarecdn.com/1a82c720-b81b-4e55-b92c-151453fddcdb/WhatsAppImage20241018at11306AM.jpeg"
                        alt="imagen"
                        style={{ width: "300px", height: "auto" }}
                    />
                    <img
                        src="https://ucarecdn.com/1a82c720-b81b-4e55-b92c-151453fddcdb/WhatsAppImage20241018at11306AM.jpeg"
                        alt="imagen"
                        style={{ width: "300px", height: "auto" }}
                    />
                </div>
            </div>


            <div>
                <PiePagina />
            </div>

        </div>


    );
}

export default Blockchain