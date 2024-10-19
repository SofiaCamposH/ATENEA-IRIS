import React from "react";

function Index() {
  return (
    <div>
      {/* Sección de héroe */}
      <div
        className="hero flex justify-center items-center bg-cover bg-center min-h-screen relative"
        style={{
          backgroundImage: `url('./police.jpeg')`,
        }}
      >
        <div></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          {/* Texto principal */}
          <h1 className="text-5xl md:text-7xl font-bold">
            SISTEMA DE GESTIÓN
            <br />
            DE REPORTES
            <br />
            ATENEA
          </h1>

          {/* Espacio vacío para ajustar la posición del texto */}
          <div className="pb-20"></div>

          {/* Contenedores de íconos que estarán hasta abajo */}
          <div className="absolute bottom-0 left-0 right-0 mb-10 flex justify-center space-x-6">
            {/* Bloque 1: Blockchain */}
            <div className="bg-blue-900 p-4 rounded-lg text-center shadow-md">
              <img src="./bit.png" alt="Blockchain" className="mx-auto mb-2" />
              <h3 className="text-xl font-bold">Blockchain</h3>
            </div>

            {/* Bloque 2: Modificaciones */}
            <div className="bg-blue-200 p-4 rounded-lg text-center shadow-md">
              <img
                src="./editar.png"
                alt="Modificaciones"
                className="mx-auto mb-2"
              />
              <h3 className="text-xl font-bold">Modificaciones</h3>
            </div>

            {/* Bloque 3: Zonas de Riesgo */}
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

      {/* Sección de Bienvenida */}
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-500 ">Bienvenido</h2>
          <h1 className="font-bold text-6xl md:text-4xl leading-tight">
            Una plataforma diseñada
            <br /> para optimizar y asegurar la gestión
            <br /> de denuncias ciudadanas
          </h1>
          <p className="text-lg mb-6">
            <br></br>
            Este sistema permite a los agentes de seguridad pública acceder,
            visualizar, gestionar y dar
            <br /> seguimiento a los reportes enviados por la población en
            tiempo real, asegurando una respuesta <br />
            rápida, eficiente y organizada.
          </p>
        </div>
        <div
          className="bg-center bg-cover bg-no-repeat w-full h-64 md:h-76"
          style={{
            backgroundImage: `url('./cuadrosIndex.png')`,
          }}
        ></div>
      </div>

      {/* Sección de la App */}
      <div className="bg-[#051C54] text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Atenea App</h2>
          <p className="mt-6">
            Cada vez que un ciudadano genera un reporte en la app <br /> ATENEA,
            el sistema crea un código QR único vinculado <br />
            directamente al reporte
            <br />
          </p>
          <div className="flex justify-center">
            <img src="./appAtenea.png" alt="Atenea App" className="w-90 h-85" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
