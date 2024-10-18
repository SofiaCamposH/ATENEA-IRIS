
import React from "react";
function Riesgo() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Sección de héroe */}
      <div
        className="hero flex justify-center items-center bg-cover bg-center min-h-screen relative"
        style={{
          backgroundImage: `url('https://ucarecdn.com/2c811c68-1d70-491a-9c54-eb7546cb5710/reportes.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Zona de Riesgo
          </h1>
          <div className="absolute bottom-0 mb-10 flex justify-center space-x-6">
            <div className="bg-blue-500 p-4 rounded-lg text-center shadow-md">
              <img
                src="https://ucarecdn.com/01f21916-23a3-48bf-8c9f-2c1fde510773/zone_person_urgent_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png"
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
            src="https://ucarecdn.com/9b496881-2427-4125-b1c8-804120e931a1/Mapa.jpg"
            alt="Mapa"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <img
            src="https://ucarecdn.com/abfc92a0-feb0-4fd1-8e85-6eb3999d699a/emergencia.jpg"
            alt="Emergencia"
            className="w-full h-auto rounded-md"
          />
        </div>

        {/* AVISO1 */}
        <div className="flex justify-center mt-8 space-x-4 mb-8">
  <img
    src="https://ucarecdn.com/a0157651-19eb-4194-add2-060fb6f1060f/aviso1.jpg"
    alt="Aviso 1"
    className="w-90 h-60 rounded-md"
  />
  <img
    src="https://ucarecdn.com/9faff87f-66bd-4f52-9c34-afc01452b6c7/Aviso2.jpg"
    alt="Aviso 2"
    className="w-90 h-60 rounded-md"
  />
</div>
      {/* Pie de página */}
      <footer className="bg-gray-900 text-white py-8 mb-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="w-full lg:w-1/4 mb-4 lg:mb-10">
              <img
                src="https://ucarecdn.com/3c489268-9922-46ec-88bb-3d96119a8a09/LOGOBLANCO.png"
                alt="Logo de Atenea"
                className="mb-9 w-36"
              />
              <p>
                Atenea optimiza la gestión de denuncias ciudadanas, mejorando la
                seguridad pública.
              </p>
            </div>
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <h3 className="font-bold mb-2">Contáctanos</h3>
              <p>Av. Gerónimo de la Cueva s/n, Villas del Río, Aguascalientes</p>
              <p>
                <a href="mailto:contacto@atenea.com" className="text-white">
                  contacto@atenea.com
                </a>
              </p>
              <p>
                <a href="tel:+521234567890" className="text-white">
                  +52 123 456 7890
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>IRIS 2024 © Atenea - Gestión de Reportes</p>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default Riesgo;
