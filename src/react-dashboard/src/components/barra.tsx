import { Link } from "react-router-dom";
import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

function Barra() {

    const { isAuth, login, logout } = useContext(AuthContext);

    const handleClick = () => {
        if (isAuth) {
            logout();
        } else {
            login();
        }
    };

    return (
        <div>
            {/* Barra de navegación fija */}
            <div className="fixed top-0 w-full z-50 bg-white shadow-md">
                <div className="menu flex justify-between p-3">
                    <div className="logo">
                        <img
                            src="./logoAtenea.jpeg"
                            alt="logo"
                            style={{ width: "150px", height: "auto" }}
                        />
                    </div>

                    {/* Parte derecha: QR e icono derecho */}
                    <div className="logoDerecha flex items-center space-x-4">
                        <div className="imagenCentral flex items-center">
                            <img
                                src="./contacto.png" // Aquí puedes reemplazar la URL por la imagen que desees
                                alt="imagen"
                                style={{ width: "80px", height: "auto" }}
                            />
                        </div>
                        {/* QR */}
                        <img
                            src="./qr.png" // Reemplaza esta URL con tu imagen de QR
                            alt="qr"
                            style={{ width: "50px", height: "auto" }}
                        />
                        {/* Segundo logo */}
                        <img
                            src="./logoAtenea.jpeg"
                            alt="logo"
                            style={{ width: "80px", height: "auto" }}
                        />
                    </div>
                </div>

                {/* Parte inferior (azul oscuro) */}
                <div className="w-full bg-[#1F2B6C] flex justify-between items-center py-3 px-8">

                    {/* Enlaces de Navegación */}
                    <ul className="flex space-x-8 text-white font-semibold">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/historial" className="text-white hover:text-gray-300">Historial</Link>
                    </li>
                    <li>
                        <Link to="/mapa" className="text-white hover:text-gray-300">Mapa</Link>
                    </li>
                    <li>
                        <Link to="/blockchain" className="text-white hover:text-gray-300">Blockchain</Link>
                    </li>
                    <li>
                        <Link to="/contacto" className="text-white hover:text-gray-300">Contacto</Link>
                    </li>
                    </ul>

                    {/* Barra de búsqueda y botón */}
                    <div className="flex items-center space-x-4">
                        {/* Barra de búsqueda */}
                        <div className="relative">
                            <input
                                type="text"
                                className="px-4 py-2 rounded-full bg-white text-gray-700"
                                placeholder="Buscar"
                            />
                            <span className="absolute right-3 top-2.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                            </span>
                        </div>

                        {/* Botón de sesión */}
                        <button className="bg-[#9ab2fa] text-white rounded-lg px-6 py-2" onClick={() => handleClick()}>
                            {
                                isAuth ? 'Cerrar Sesión' : 'Iniciar Sesión'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Barra;
