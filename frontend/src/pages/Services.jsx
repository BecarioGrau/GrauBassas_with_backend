import React from "react";
import Hero from "../components/HeroComponents/Hero";
import { WorkIcon, CheckIcon, LocationIcon } from "../components/Icons";
import { useNavigate } from "react-router-dom";

const heroTitle = "Soluciones Profesionales a su Medida";
const heroDescription =
  "Desde el corte de precisión hasta la logística interinsular. En Almacenes Grau Bassas optimizamos cada etapa de su proyecto.";
const desktopHeroHeight = "440px";
const mobileHeroHeight = "auto";

const Services = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        title={heroTitle}
        description={heroDescription}
        desktopHeroHeight={desktopHeroHeight}
        mobileHeroHeight={mobileHeroHeight}
      />

      <main className="container mx-auto px-4 pb-10">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">
            Nuestros Servicios
          </h2>
          <div className="w-16 h-1 bg-primary mb-4 mx-auto md:mx-0"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <section className="mb-16">
            <h2 className="h2-about-us">
              <div className="flex-shrink-0">
                <WorkIcon />
              </div>
              Corte a Medida y Transformación
            </h2>
            <div className="bg-white border border-gray-200 p-6 rounded-b-lg shadow-sm">
              <p className="text-gray-700 text-justify text-lg leading-relaxed mb-4">
                Entendemos que cada proyecto tiene requerimientos específicos.
                Contamos con maquinaria especializada para ofrecer un{" "}
                <b>servicio de corte de precisión</b> en hierro, acero y
                plásticos técnicos.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <p className="text-sm text-amber-800">
                  <strong>Nota técnica:</strong> Los servicios de corte se
                  presupuestan de forma independiente según la complejidad y el
                  volumen del material solicitado.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-gray-50 border-l-8 border-primary p-8 rounded-r-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              Transporte y Logística Especializada
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Disponemos de una flota propia preparada para el transporte de
              materiales pesados y voluminosos, garantizando que su pedido
              llegue en perfectas condiciones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  Entrega Local
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Reparto eficiente en zonas industriales y obras dentro de la
                  isla, con tiempos de respuesta optimizados para no detener su
                  producción.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  Transporte Interinsular
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Llevamos nuestro material a cualquier isla del archipiélago
                  canario.
                </p>
                <div className="text-xs bg-gray-100 p-3 rounded text-gray-500 italic">
                  * En envíos interinsulares, Almacenes Grau Bassas gestiona la
                  logística, corriendo por cuenta del cliente los gastos
                  derivados del trayecto marítimo (barco).
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="h2-about-us">
              <div className="flex-shrink-0">
                <CheckIcon />
              </div>
              Garantía de Servicio
            </h2>
            <div className="bg-white border border-gray-200 p-6 rounded-b-lg shadow-sm">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="text-primary font-bold text-xl">01</div>
                  <div>
                    <b className="text-gray-900">Seguridad en la Carga:</b>
                    <p className="text-gray-600">
                      Protocolos estrictos de estiba para evitar daños en
                      materiales sensibles como plásticos técnicos o metales
                      pulidos.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-primary font-bold text-xl">02</div>
                  <div>
                    <b className="text-gray-900">Asesoramiento Logístico:</b>
                    <p className="text-gray-600">
                      Le ayudamos a planificar la entrega para optimizar costes
                      de transporte, especialmente en grandes proyectos.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-primary font-bold text-xl">03</div>
                  <div>
                    <b className="text-gray-900">Trazabilidad:</b>
                    <p className="text-gray-600">
                      Información constante sobre el estado de su pedido y
                      tiempos estimados de llegada.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10 bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesita un presupuesto personalizado?
            </h3>
            <p className="text-lg italic opacity-90 mb-6">
              "Nuestro equipo técnico está listo para valorar sus necesidades de
              corte y logística para ofrecerle la solución más rentable."
            </p>
            <button
              className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors uppercase text-sm tracking-widest cursor-pointer"
              onClick={() => navigate("/contacto")}
            >
              Solicitar Presupuesto
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Services;
