import React from "react";
import HomeHero from "../components/HeroComponents/HomeHero";
import Cards from "../components/Cards/Cards";
import {
  TruckIcon,
  ShieldCheckIcon,
  FactoryIcon,
  MapPinIcon,
} from "../components/Icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <HomeHero />

      <Cards />

      <section className="relative h-[480px] overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/img/o_1fvd17a7c12qldta14eq11nf6hna.webp"
            className="w-full h-full object-cover"
            alt="Logística Industrial"
          />
          <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>

        <div className="container mx-auto h-full flex items-center relative z-10 px-6">
          <div className="max-w-2xl border-l-4 border-primary pl-8">
            <h2 className="text-white text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
              Entregas seguras en <br /> todas las islas
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-snug">
              Sabemos que su proyecto no puede esperar. Gestionamos una red
              logística propia que garantiza el suministro de materiales en
              tiempo récord a cualquier punto del archipiélago.
            </p>

            <div className="flex gap-4">
              <button
                className="bg-primary text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition shadow-lg cursor-pointer"
                onClick={() => navigate("/contacto")}
              >
                Solicitar presupuesto rápido
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white shadow-xl rounded-xl flex items-center justify-center text-primary mb-6">
                <ShieldCheckIcon size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                Calidad ISO
              </h4>
              <p className="text-gray-500 text-sm">
                Materiales certificados bajo los más estrictos estándares
                europeos.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white shadow-xl rounded-xl flex items-center justify-center text-primary mb-6">
                <TruckIcon size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                Logística
              </h4>
              <p className="text-gray-500 text-sm">
                Distribución ágil y eficiente.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white shadow-xl rounded-xl flex items-center justify-center text-primary mb-6">
                <FactoryIcon size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                Gran Stock
              </h4>
              <p className="text-gray-500 text-sm">
                Más de 5.000 referencias disponibles para entrega inmediata.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white shadow-xl rounded-xl flex items-center justify-center text-primary mb-6">
                <MapPinIcon size={32} />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                Presencia Local
              </h4>
              <p className="text-gray-500 text-sm">
                Desde 1959 apoyando el crecimiento de la industria en Canarias.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
