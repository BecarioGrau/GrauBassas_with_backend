import React from "react";
import { materialsData } from "../../data/HomeContentData";

export default function Cards() {
  return (
    <section className="py-2 md:pb-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">
            Catálogo de Materiales
          </h2>
          <div className="w-16 h-1 bg-primary mb-4 mx-auto md:mx-0"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">
            Explora nuestra gama de metales y plásticos certificados. Calidad
            garantizada para la industria.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {materialsData.map((material) => (
            <a
              key={material.title}
              href={material.url}
              className="group relative h-48 md:h-48 w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${material.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex flex-col transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-sm md:text-lg font-bold text-white mb-1 uppercase tracking-wide leading-tight">
                    {material.title}
                  </h3>

                  <div className="w-6 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></div>

                  <span className="hidden md:inline-block text-white/80 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-widest">
                    Detalles +
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
