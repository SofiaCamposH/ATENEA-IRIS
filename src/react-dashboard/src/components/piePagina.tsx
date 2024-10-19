import React from "react";

function PiePagina() {
  return (
    // Pie de página
    <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
          <img
            src="./LOGO BLANCO.png"
            alt="Atenea Logo"
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
  );
}

export default PiePagina;
