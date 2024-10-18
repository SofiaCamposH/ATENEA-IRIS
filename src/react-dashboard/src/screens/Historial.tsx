import React, { useEffect } from "react";
import { AuthContext } from '../context/AuthContext'
import { useContext, useState } from "react";
import { createActor } from "../declarations/backend";

type ResumenReporte = {
  id: bigint;
  status: string;
  municipio: string;
  tipoDelito: string;
  subtipo: string;
  entidad: string;
  hora: string;
  bienJuridicoAfectado: string;
}

function Historial() {

  const { isAuth, login, logout, identity } = useContext(AuthContext);
  const [reportes, setReportes] = useState<ResumenReporte[]>([]);

  let canisterId: any = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
  let backend = createActor(canisterId, {
    agentOptions: {
      host: "http://localhost:4943",
      identity,
    },
  });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (isAuth) {
      try {
        let response: ResumenReporte[] = await backend.getAllDenuncias();
        setReportes(response);
      } catch (e) {
        console.error(e);
      }
    }
  }


  return (
    <div>

      {/* Sección de héroe */}
      <div
        className="hero flex justify-center items-center bg-cover bg-center min-h-screen relative"
        style={{
          backgroundImage: `url('https://ucarecdn.com/2c811c68-1d70-491a-9c54-eb7546cb5710/reportes.jpg')`,
        }}
      >
        <div></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          {/* Texto principal */}
          <h1 className="text-5xl md:text-7xl font-bold">
            HISTORIAL  DE  REPORTES
          </h1>

          {/* Espacio vacío para ajustar la posición del texto */}
          <div className="pb-20"></div>

          {/* Contenedores de íconos que estarán hasta abajo */}
          <div className="absolute bottom-0 left-0 right-0 mb-10 flex justify-center space-x-6">
            {/* Bloque 1: Blockchain */}
            <div className="bg-blue-900 p-4 rounded-lg text-center shadow-md">
              <img src="https://ucarecdn.com/e186682f-314c-4afe-af52-c71863e1fc04/currency_bitcoin_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png" alt="Blockchain" className="mx-auto mb-2" />
              <h3 className="text-xl font-bold">Blockchain</h3>
            </div>

            {/* Bloque 2: Modificaciones */}
            <div className="bg-blue-200 p-4 rounded-lg text-center shadow-md">
              <img src="https://ucarecdn.com/bd20b58b-149e-4440-bc80-72764f4b5282/contract_edit_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png" alt="Modificaciones" className="mx-auto mb-2" />
              <h3 className="text-xl font-bold">Modificaciones</h3>
            </div>


          </div>
        </div>

      </div>
      {/* Sección de Bienvenida */}
      <div className="p-20 rounded-lg">
        <img
          src="https://ucarecdn.com/f98806e1-5752-4cd8-926f-642bd6342d75/datos.jpg"
          alt="Datos"
          className="w-auto h-auto"
        />
      </div>
      <div className="container mx-auto p-9">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Empieza por realizar una búsqueda para localizar más rápidamente los
            reportes
          </h2>
          <ul className="flex space-x-10 text-blue-900 font-semibold"></ul>
          <p className="text-lg mb-6">
            Visualiza, y modifica los reportes enviados por los usuarios desde la App de ATENEA
          </p>
        </div>
        <div className="flex justify-between space-x-6">
          {/* Tres características */}
        </div>
      </div>

      {/* Sección de la App */}
      <div className="text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6"></h2>
          <div className="flex justify-center">
            <img
              src="https://ucarecdn.com/65828248-c357-43a0-93c4-a44ec3a802ef/historiall.jpg"
              alt="Demostración de la aplicación Atenea"
              className="w-79 h-auto"
            />
          </div>
          <p className="mt-6">

          </p>
        </div>
      </div>

      {isAuth ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      {/*tabla de datos*/}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Municipio
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Tipo de delito
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Subtipo
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Entidad
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Hora
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Bien Jurídico Afectado
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((denuncia, index) => (
              <tr
                key={index}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''
                  }`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {denuncia.status}
                </th>
                <td className="px-6 py-4">{denuncia.municipio}</td>
                <td className="px-6 py-4">{denuncia.tipoDelito}</td>
                <td className="px-6 py-4">{denuncia.subtipo}</td>
                <td className="px-6 py-4">{denuncia.entidad}</td>
                <td className="px-6 py-4">{denuncia.hora}</td>
                <td className="px-6 py-4">{denuncia.bienJuridicoAfectado}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Mostrar información completa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie de página */}
      <footer className="bg-gray-900 text-white py-8 mb-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <img
                src="https://ucarecdn.com/3c489268-9922-46ec-88bb-3d96119a8a09/LOGOBLANCO.png"
                alt="Logo de Atenea"
                className="mb-4"
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
  );
}

export default Historial;
