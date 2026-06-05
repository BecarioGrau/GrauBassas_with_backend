import React from "react";
import logo from "../assets/img/imagotipo_GrauBassas_vertical_blanco.webp";
import { PhoneIcon, EmailIcon, FacebookIcon, LocationIcon } from "./Icons";
import useIsMobile from "../hooks/useIsMobile";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-primary text-white py-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-12 bg-white"
        style={{ clipPath: "polygon(0 0, 20% 0, 0 100%)" }}
      ></div>
      <div
        className="absolute top-0 right-0 w-full h-full bg-black/10 pointer-events-none"
        style={{ clipPath: "polygon(70% 0, 100% 0, 100% 100%, 60% 100%)" }}
      ></div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 relative z-10">
        <div className="flex flex-col mb-8 md:mb-0">
          <img
            src={logo}
            alt="GrauBassas Logo"
            className="h-20 md:h-30 w-auto object-contain"
            width={120}
            height={120}
            loading="lazy"
          />
        </div>

        {!isMobile && (
          <div className="hidden md:block w-px h-24 bg-white/30 mx-8"></div>
        )}

        {isMobile ? (
          <div className="grid grid-cols-1 gap-4 max-w-xs w-full mb-5">
            <div className="flex flex-col-2 justify-between">
              <div className="flex flex-col gap-2">
                <EmailIcon className="text-3xl text-white/90" />
                <span>info@graubassas.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <PhoneIcon className="text-3xl text-white/90" />
                <span>928460044</span>
              </div>
            </div>
            <div className="flex flex-col-2 justify-between">
              <div className="flex flex-col gap-2">
                <LocationIcon className="text-3xl text-white/90" />
                <a href="https://maps.app.goo.gl/e47h6BHSc3ox4LrJ6">
                  Calle Prof. Lozano, 18, 35008, Las
                  <br />
                  Palmas Gran Canaria, Las Palmas
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <FacebookIcon className="text-3xl text-white/90" />
                <a href="https://www.facebook.com/Almacenesgraubassas/?locale=es_ES">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <EmailIcon className="text-3xl text-white/90" />
                <span>info@graubassas.com</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="text-3xl text-white/90" />
                <span>928460044</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-24 bg-white/30 mx-8"></div>

            <div className="flex flex-col gap-4 text-sm font-light">
              <div className="flex items-start gap-3">
                <LocationIcon className="text-3xl text-white/90" />
                <a href="https://maps.app.goo.gl/e47h6BHSc3ox4LrJ6">
                  Calle Prof. Lozano, 18, 35008, Las
                  <br />
                  Palmas Gran Canaria, Las Palmas
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FacebookIcon className="text-3xl text-white/90" />
                <a href="https://www.facebook.com/Almacenesgraubassas/?locale=es_ES">
                  Facebook
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={` border-t border-white/20 pt-2 text-center text-xs ${
          isMobile
            ? "flex flex-col gap-4 text-center borde mt-2"
            : "container mx-auto flex justify-between mt-2"
        }`}
      >
        <div className="space-x-4 text-white/60">
          <a href="/contacto" className="hover:text-white transition-colors">
            Contacto
          </a>
          <span>|</span>
          <a href="/aviso-legal" className="hover:text-white transition-colors">
            Aviso Legal
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">
            Terminos y Condiciones
          </a>
        </div>
        <div className="text-white">
          Copyright © {new Date().getFullYear()} | GRAU BASSAS S.L.
        </div>
      </div>
    </footer>
  );
}
