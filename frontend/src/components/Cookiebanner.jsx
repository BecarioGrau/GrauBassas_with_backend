import { useState, useEffect, useCallback } from "react";

const GA_ID = import.meta.env.VITE_GA_ID || "G-XXXXXXXXXX";
const CONSENT_KEY = "cookie_consent";

function guardarConsentimiento(valor) {
  const expira = new Date();
  expira.setFullYear(expira.getFullYear() + 1);
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ valor, expira: expira.toISOString() }),
  );
}


function leerConsentimiento(raw) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "valor" in parsed) {
      return parsed;
    }
    if (parsed === "accepted" || parsed === "rejected") {
      return { valor: parsed, expira: null };
    }
  } catch {
    if (raw === "accepted" || raw === "rejected") {
      return { valor: raw, expira: null };
    }
  }

  return null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  const cargarGoogleAnalytics = useCallback(() => {
    if (!GA_ID || GA_ID === "G-XXXXXXXXXX") return;
    if (document.getElementById("ga-script")) return;

    const script1 = document.createElement("script");
    script1.id = "ga-script";
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}'${import.meta.env.DEV ? ", { debug_mode: true }" : ""});
    `;
    document.head.appendChild(script2);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(CONSENT_KEY);

    if (!raw) {
      setVisible(true);
      return;
    }

    const consent = leerConsentimiento(raw);

    if (!consent) {
      localStorage.removeItem(CONSENT_KEY);
      setVisible(true);
      return;
    }

    if (consent.expira && new Date() > new Date(consent.expira)) {
      localStorage.removeItem(CONSENT_KEY);
      setVisible(true);
      return;
    }

    if (!consent.expira) {
      guardarConsentimiento(consent.valor);
    }

    if (consent.valor === "accepted") {
      cargarGoogleAnalytics();
    }

    setVisible(false);
  }, [cargarGoogleAnalytics]); 
  const aceptar = () => {
    guardarConsentimiento("accepted");
    cargarGoogleAnalytics();
    setVisible(false);
  };
 
  const rechazar = () => {
    guardarConsentimiento("rejected");
    setVisible(false);
  };
 
  if (!visible) return null;


  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_-8px_30px_rgba(0,0,0,0.1)]"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
              Privacidad y cookies
            </p>
            <p className="text-sm text-slate-600 leading-relaxed m-0">
            🍪 Usamos cookies propias y de terceros (Google Analytics) para
              analizar el tráfico de nuestra web y mejorar tu experiencia.
              Puedes aceptarlas o rechazarlas. Consulta nuestra{" "}
              <a
                href="/politica-de-cookies"
                className="text-primary font-bold hover:underline underline-offset-2"
              >
                Política de cookies
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={rechazar}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all cursor-pointer"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={aceptar}
              className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg cursor-pointer"
            >
              Aceptar cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
