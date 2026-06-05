import React, { useState } from "react";
import Hero from "../components/HeroComponents/Hero";
import useIsMobile from "../hooks/useIsMobile";
import {
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ScheduleIcon,
} from "../components/Icons";

export default function Contact() {
  const isMobile = useIsMobile();
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const desktopHeroHeight = "430px";
  const mobileHeroHeight = "auto";

  const heroTile = isMobile ? (
    <>
      Ponte en contacto <br /> con nosotros
    </>
  ) : (
    <>
      Ponte en <br /> contacto con nosotros
    </>
  );

  const heroDescription =
    "Estamos aquí para ayudarle con sus necesidades de materiales metalúrgicos. Solicite presupuesto o resuelva sus dudas.";

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());

    if (!acceptedPrivacy) {
      alert("Debe aceptar la política de privacidad");
      return;
    }

    console.log("Contact form submitted:", payload);
    alert("Mensaje enviado con éxito.");
    e.target.reset();
    setAcceptedPrivacy(false);
  }

  return (
    <>
      <Hero
        title={heroTile}
        description={heroDescription}
        desktopHeroHeight={desktopHeroHeight}
        mobileHeroHeight={mobileHeroHeight}
      />

      <main className="flex-grow container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-t-4 border-primary">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase">
              Envíenos un mensaje
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <input
                    required
                    className="h-9 w-full border-gray-300 rounded-sm shadow-sm focus:border-primary focus:ring-primary"
                    id="name"
                    name="name"
                    placeholder="Nombre completo"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="company"
                  >
                    Empresa (Opcional)
                  </label>
                  <input
                    className="h-9 w-full border-gray-300 rounded-sm shadow-sm focus:border-primary focus:ring-primary"
                    id="company"
                    name="company"
                    placeholder="Nombre de la empresa"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    className="h-9 w-full border-gray-300 rounded-sm shadow-sm focus:border-primary focus:ring-primary"
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    type="email"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="phone"
                  >
                    Teléfono
                  </label>
                  <input
                    required
                    className="h-9 w-full border-gray-300 rounded-sm shadow-sm focus:border-primary focus:ring-primary"
                    id="phone"
                    name="phone"
                    placeholder="+34 600 000 000"
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="subject"
                >
                  Asunto
                </label>
                <select
                  className="h-9 w-full border-gray-300 rounded-sm shadow-sm focus:border-primary focus:ring-primary"
                  id="subject"
                  name="subject"
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option>Información General</option>
                  <option>Solicitar Presupuesto</option>
                  <option>Suministros</option>
                  <option>Departamento Técnico</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  required
                  className="h-24 w-full border-gray-300 rounded-sm shadow-sm focus:border-primary focus:ring-primary"
                  id="message"
                  name="message"
                  placeholder="¿En qué podemos ayudarle?"
                  rows="4"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    required
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded cursor-pointer"
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    className="font-medium cursor-pointer text-gray-700"
                    htmlFor="privacy"
                  >
                    He leído y acepto la{" "}
                    <a className="text-primary hover:underline" href="#">
                      política de privacidad
                    </a>
                    .
                  </label>
                </div>
              </div>

              <div>
                <button
                  disabled={!acceptedPrivacy}
                  className={`rounded-sm w-full md:w-auto px-8 py-3 font-bold uppercase tracking-wider transition-all shadow-md ${
                    acceptedPrivacy
                      ? "bg-primary hover:bg-red-800 text-white cursor-pointer"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  type="submit"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 border-l-4 border-primary shadow-lg rounded-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="material-icons text-primary">
                    <LocationIcon />
                  </span>
                  <h3 className="font-bold text-gray-800 uppercase">
                    Ubicación
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Calle Prof. Lozano, 18/20
                  <br />
                  35008, Las Palmas
                  <br />
                  Gran Canaria
                </p>
              </div>

              <div className="bg-gray-50 p-6 border-l-4 border-primary shadow-lg rounded-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="material-icons text-primary">
                    <PhoneIcon />
                  </span>
                  <h3 className="font-bold text-gray-800 uppercase">
                    Teléfono
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">
                  Oficina:{" "}
                  <span className="font-semibold text-gray-800">
                    928 460 044
                  </span>
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fax: 928 462 133
                </p>
              </div>

              <div className="bg-gray-50 p-6 border-l-4 border-primary shadow-lg rounded-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="material-icons text-primary">
                    <EmailIcon />
                  </span>
                  <h3 className="font-bold text-gray-800 uppercase">Email</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <a
                    className="hover:text-primary transition-colors"
                    href="mailto:info@graubassas.com"
                  >
                    info@graubassas.com
                  </a>
                </p>
              </div>

              <div className="bg-gray-50 p-6 border-l-4 border-primary shadow-lg rounded-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="material-icons text-primary">
                    <ScheduleIcon />
                  </span>
                  <h3 className="font-bold text-gray-800 uppercase">Horario</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lunes - Viernes:
                  <br />
                  08:00 - 16:30
                </p>
              </div>
            </div>

            <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg border-t-4 border-primary overflow-hidden relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.7093846819077!2d-15.418271416814473!3d28.15637801364156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc409551dd504ca5%3A0xeb42ec88b9e07be2!2sAlmacenes%20Grau%20Bassas%20S.L.!5e0!3m2!1ses!2ses!4v1766487167246!5m2!1ses!2ses"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Almacenes Grau Bassas"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
