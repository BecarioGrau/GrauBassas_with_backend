import { Link } from "react-router-dom";

const COOKIES = [
  {
    nombre: "cookie_consent",
    proveedor: "Propia",
    finalidad: "Guarda tu preferencia sobre el uso de cookies",
    duracion: "1 año",
  },
  {
    nombre: "_ga",
    proveedor: "Google Analytics",
    finalidad: "Identifica usuarios únicos para estadísticas de visitas",
    duracion: "2 años",
  },
  {
    nombre: "_ga_*",
    proveedor: "Google Analytics",
    finalidad: "Mantiene el estado de la sesión de analítica",
    duracion: "2 años",
  },
  {
    nombre: "_gid",
    proveedor: "Google Analytics",
    finalidad: "Distingue usuarios entre sí",
    duracion: "24 horas",
  },
  {
    nombre: "_gat",
    proveedor: "Google Analytics",
    finalidad: "Limita el número de peticiones al servidor",
    duracion: "1 minuto",
  },
];

const NAVEGADORES = [
  {
    nombre: "Google Chrome",
    url: "https://support.google.com/chrome/answer/95647",
  },
  {
    nombre: "Mozilla Firefox",
    url: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias",
  },
  {
    nombre: "Safari",
    url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
  },
  {
    nombre: "Microsoft Edge",
    url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

const PoliticaCookies = () => {
  return (
    <main className="container mx-auto px-4">
      <div className="my-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">
          Política de Cookies
        </h1>
        <div className="w-16 h-1 bg-primary mb-4 mx-auto md:mx-0" />
        <p className="text-sm text-slate-500">Última actualización: junio de 2025</p>
      </div>

      <div className="my-10 shadow-lg bg-gray-100 p-6 md:p-10 rounded-lg border-t-primary border-t-5 mb-16">
        <section className="mb-8">
          <h2 className="h2-aviso-legal">¿Qué son las cookies?</h2>
          <p className="p-aviso-legal">
            Las cookies son pequeños archivos de texto que los sitios web almacenan
            en tu dispositivo (ordenador, tablet o móvil) cuando los visitas. Su
            finalidad es recordar información sobre tu visita, como tu idioma
            preferido o tus preferencias de privacidad, para que no tengas que
            volver a configurarlas en cada visita.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">¿Qué tipos de cookies utilizamos?</h2>
          <p className="p-aviso-legal">
            En <strong>graubassas.com</strong> utilizamos cookies propias y de
            terceros con las siguientes finalidades:
          </p>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Cookies técnicas (propias):</strong> necesarias para
              recordar si has aceptado o rechazado el uso de cookies.
            </li>
            <li className="mb-2">
              <strong>Cookies analíticas (terceros):</strong> utilizamos Google
              Analytics para conocer de forma anónima cómo los usuarios navegan
              por la web y así poder mejorarla.
            </li>
          </ul>
          <p className="p-aviso-legal">
            Las cookies analíticas solo se instalan si aceptas expresamente su
            uso a través del banner de cookies que aparece en tu primera visita.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">Detalle de cookies utilizadas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-slate-300 px-4 py-3 font-bold">
                    Cookie
                  </th>
                  <th className="border border-slate-300 px-4 py-3 font-bold">
                    Proveedor
                  </th>
                  <th className="border border-slate-300 px-4 py-3 font-bold">
                    Finalidad
                  </th>
                  <th className="border border-slate-300 px-4 py-3 font-bold">
                    Duración
                  </th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((cookie) => (
                  <tr key={cookie.nombre} className="even:bg-gray-50">
                    <td className="border border-slate-300 px-4 py-3 font-mono text-xs">
                      {cookie.nombre}
                    </td>
                    <td className="border border-slate-300 px-4 py-3">
                      {cookie.proveedor}
                    </td>
                    <td className="border border-slate-300 px-4 py-3">
                      {cookie.finalidad}
                    </td>
                    <td className="border border-slate-300 px-4 py-3 whitespace-nowrap">
                      {cookie.duracion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">¿Cómo puedes gestionar las cookies?</h2>
          <p className="p-aviso-legal">
            Puedes aceptar o rechazar las cookies no esenciales desde el banner
            que aparece al acceder por primera vez a la web. También puedes
            eliminar las cookies ya almacenadas en tu navegador en cualquier
            momento.
          </p>
          <p className="p-aviso-legal">
            A continuación encontrarás enlaces a las instrucciones oficiales de
            los navegadores más habituales:
          </p>
          <ul className="list-none pl-0 p-aviso-legal space-y-2">
            {NAVEGADORES.map((nav) => (
              <li key={nav.nombre}>
                <a
                  href={nav.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {nav.nombre}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="h2-aviso-legal">Más información</h2>
          <p className="p-aviso-legal">
            Para cualquier consulta sobre el uso de cookies o el tratamiento de
            tus datos, puedes contactar con nosotros a través de los datos
            indicados en nuestro{" "}
            <Link
              to="/aviso-legal"
              className="text-primary font-semibold hover:underline"
            >
              Aviso Legal
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
};

export default PoliticaCookies;
