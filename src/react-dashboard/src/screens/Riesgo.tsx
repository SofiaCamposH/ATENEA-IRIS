
import React from "react";
function Riesgo() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Sección de héroe */}
      <div
        className="hero flex justify-center items-center bg-cover bg-center min-h-screen relative"
        style={{
          backgroundImage: `url('./policias.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Zona de Riesgo
          </h1>
          <div className="absolute bottom-0 mb-10 flex justify-center space-x-6">
            <div className="bg-blue-500 p-4 rounded-lg text-center shadow-md">
              <img
                src="./zonaDeRiesgo.png"
                alt="Zonas de Riesgo"
                className="mx-auto mb-2"
              />
              <h3 className="text-xl font-bold">Zonas de Riesgo</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa y secciones adicionales */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="./Mapa.jpg"
            alt="Mapa"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <img
            src="./emergencia.jpg"
            alt="Emergencia"
            className="w-full h-auto rounded-md"
          />
        </div>

        {/* AVISO1 */}
        <div className="flex justify-center mt-8 space-x-4 mb-8">
  <img
    src="./aviso1.jpg"
    alt="Aviso 1"
    className="w-90 h-60 rounded-md"
  />
  <img
    src="./Aviso2.jpg"
    alt="Aviso 2"
    className="w-90 h-60 rounded-md"
  />
</div>
    </div>
    </div>
  );
}

export default Riesgo;
