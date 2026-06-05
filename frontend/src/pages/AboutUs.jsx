import Hero from "../components/HeroComponents/Hero";
import { UsersIcon, WorkIcon, CheckIcon } from "../components/Icons";
import { useNavigate } from "react-router-dom";

const heroTile = "Compromiso, Calidad y Experiencia";
const heroDescription =
  "Conoce la historia de Almacenes Grau Bassas: especialistas en hierro, acero y plásticos técnicos al servicio de las islas desde 1959.";
const desktopHeroHeight = "440px";
const mobileHeroHeight = "auto";

const AboutUS = () => {
  const navigate = useNavigate();
  return (
    <>
      <Hero
        title={heroTile}
        description={heroDescription}
        desktopHeroHeight={desktopHeroHeight}
        mobileHeroHeight={mobileHeroHeight}
      />

      <section className="bg-primary text-white py-12 shadow-xl relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">
                65 Años de Historia
              </h2>
              <p className="text-xl md:text-2xl font-light opacity-90 max-w-xl">
                Desde 1959, hemos forjado nuestra reputación sobre los pilares
                del hierro, el acero y la confianza de miles de clientes en
                Canarias.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center border border-white/20">
                <p className="text-4xl font-black">1959</p>
                <p className="text-xs uppercase font-bold opacity-70 tracking-widest">
                  Fundación
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center border border-white/20">
                <p className="text-4xl font-black">100%</p>
                <p className="text-xs uppercase font-bold opacity-70 tracking-widest">
                  Canario
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center border border-white/20">
                <p className="text-4xl font-black">7</p>
                <p className="text-xs uppercase font-bold opacity-70 tracking-widest">
                  Islas
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center border border-white/20">
                <p className="text-4xl font-black">+65</p>
                <p className="text-xs uppercase font-bold opacity-70 tracking-widest">
                  Años de Éxito
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 text-[15rem] font-black opacity-5 select-none pointer-events-none">
          65
        </div>
      </section>

      <main className="container mx-auto px-4 pb-10 pt-12">
        <div className="max-w-5xl mx-auto">
          <section className="mb-16">
            <h2 className="h2-about-us">
              <div className="flex-shrink-0">
                <UsersIcon />
              </div>
              ¿Quiénes somos?
            </h2>
            <div className="bg-white border border-gray-200 p-8 rounded-b-lg shadow-sm">
              <p className="text-gray-700 text-justify text-lg leading-relaxed">
                <b>Almacenes Grau Bassas S.L.</b> no es solo un almacén; es una
                institución con raíces profundas en el archipiélago. Nacimos con
                la visión de profesionalizar el suministro industrial en una
                época de pleno crecimiento para las Islas. Con más de seis
                décadas de trayectoria, nos hemos consolidado como una empresa
                referente, evolucionando junto a las necesidades de nuestros
                clientes y adaptando nuestra logística a la complejidad de
                nuestro territorio.
              </p>
            </div>
          </section>

          {/* SECCIÓN POR QUÉ ELEGIRNOS MEJORADA */}
          <section className="mb-16">
            <h2 className="h2-about-us">
              <div className="flex-shrink-0">
                <CheckIcon />
              </div>
              ¿Por qué elegir Grau Bassas?
            </h2>
            <div className="bg-white border border-gray-200 p-8 rounded-b-lg shadow-sm">
              <p className="text-gray-700 text-lg mb-8 text-center italic border-b pb-6 border-gray-100">
                "Nuestra diferencia reside en que no solo vendemos material,
                vendemos soluciones respaldadas por décadas de conocimiento
                técnico y un compromiso inquebrantable con el éxito de sus
                proyectos."
              </p>

              <ul className="space-y-8">
                <li className="flex flex-col md:flex-row gap-4">
                  <div className="text-primary font-black text-3xl">01</div>
                  <div>
                    <b className="text-gray-900 text-xl block mb-1">
                      Experiencia y Conocimiento Técnico:
                    </b>
                    <p className="text-gray-600 leading-relaxed">
                      Llevar 65 años en el mercado nos otorga una perspectiva
                      única. Entendemos las propiedades químicas y físicas de
                      cada material que vendemos, asesorándole sobre la mejor
                      opción para su obra o proceso industrial.
                    </p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row gap-4">
                  <div className="text-primary font-black text-3xl">02</div>
                  <div>
                    <b className="text-gray-900 text-xl block mb-1">
                      Capacidad Logística Real:
                    </b>
                    <p className="text-gray-600 leading-relaxed">
                      Conocemos los desafíos del transporte interinsular.
                      Mantenemos un stock masivo y permanente para que sus
                      tiempos de espera sean mínimos, garantizando que el
                      material llegue donde se necesite, cuando se necesite.
                    </p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row gap-4">
                  <div className="text-primary font-black text-3xl">03</div>
                  <div>
                    <b className="text-gray-900 text-xl block mb-1">
                      Calidad Certificada y Sin Sorpresas:
                    </b>
                    <p className="text-gray-600 leading-relaxed">
                      Trabajamos exclusivamente con proveedores de primer nivel.
                      Cada pieza de acero, metal o plástico técnico cumple con
                      los estándares internacionales de seguridad y durabilidad.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="h2-about-us">
              <div className="flex-shrink-0">
                <WorkIcon />
              </div>
              Nuestra Especialización
            </h2>
            <div className="bg-white border border-gray-200 p-6 rounded-b-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition-all border-b-4 border-b-primary">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Hierro y Acero
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vigas, perfiles y corrugados. La base sólida para cualquier
                    infraestructura.
                  </p>
                </div>
                <div className="p-6 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition-all border-b-4 border-b-primary">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Metal y Aluminio
                  </h3>
                  <p className="text-sm text-gray-600">
                    Suministro de precisión con aleaciones adaptadas a la
                    salinidad canaria.
                  </p>
                </div>
                <div className="p-6 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition-all border-b-4 border-b-primary">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Plásticos Técnicos
                  </h3>
                  <p className="text-sm text-gray-600">
                    Soluciones de vanguardia para ingeniería: Nylon, POM, PTFE y
                    más.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10 bg-gray-900 p-10 rounded-2xl shadow-2xl text-white text-center border-b-8 border-primary">
            <p className="text-xl italic opacity-90 mb-8 max-w-2xl mx-auto">
              "En Almacenes Grau Bassas seguimos mirando al futuro, apostando
              por la innovación para seguir siendo su proveedor de confianza en
              Canarias."
            </p>
            <button
              className="bg-primary hover:bg-red-700 text-white font-black py-4 px-10 rounded-full transition-all uppercase text-sm tracking-[0.2em] shadow-lg hover:scale-105 active:scale-95"
              onClick={() => navigate("/contacto")}
            >
              Contactar con un experto
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default AboutUS;
