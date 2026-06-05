import React from "react";
import { useNavigate } from "react-router-dom";

const MedidaSection = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 pb-10">
      <section className="mb-10 bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
        <p className="text-lg italic opacity-90 mb-6">
          ¿Necesitas un corte a medida?
        </p>
        <p>
          Ofrecemos servicios de corte a medida y logística rápida para que tu
          proyecto no se detenga
        </p>
        <button
          className="bg-primary hover:bg-red-700 text-white mt-6 font-bold py-3 px-8 rounded-full transition-colors uppercase text-sm tracking-widest cursor-pointer"
          onClick={() => navigate("/contacto")}
        >
          Contáctanos
        </button>
      </section>
    </div>
  );
};
export default MedidaSection;
