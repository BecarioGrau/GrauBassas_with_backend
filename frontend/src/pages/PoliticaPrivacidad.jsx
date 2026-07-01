import { Link } from "react-router-dom";

const PoliticaPrivacidad = () => {
  return (
    <main className="container mx-auto px-4">
      <div className="my-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">
          Política de Privacidad
        </h1>
        <div className="w-16 h-1 bg-primary mb-4 mx-auto md:mx-0" />
        <p className="text-sm text-slate-500">
          Última actualización: junio de 2026
        </p>
      </div>

      <div className="my-10 shadow-lg bg-gray-100 p-6 md:p-10 rounded-lg border-t-primary border-t-5 mb-16">
        <p className="p-aviso-legal">
          La presente Política de Privacidad describe cómo{" "}
          <strong>Almacenes Graubassas, S.L.</strong> (en adelante, «GRAU
          BASSAS» o «nosotros») trata los datos personales de los usuarios que
          visitan el sitio web <strong>graubassas.com</strong>, utilizan el
          formulario de contacto o se suscriben voluntariamente a comunicaciones
          comerciales, de conformidad con el Reglamento (UE) 2016/679 (RGPD) y
          la Ley Orgánica 3/2018 (LOPDGDD).
        </p>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">1. Responsable del tratamiento</h2>
          <ul className="list-none pl-0 p-aviso-legal space-y-1">
            <li>
              <strong>Identidad:</strong> Almacenes Graubassas, S.L.
            </li>
            <li>
              <strong>CIF:</strong> B-35048255
            </li>
            <li>
              <strong>Domicilio:</strong> Calle Profesor Lozano, 18-20,
              Urbanización El Sebadal, CP 35008 – Las Palmas de Gran Canaria
            </li>
            <li>
              <strong>Correo electrónico:</strong>{" "}
              <a
                href="mailto:info@graubassas.com"
                className="text-primary font-semibold hover:underline"
              >
                info@graubassas.com
              </a>
            </li>
            <li>
              <strong>Teléfono:</strong> 928 460 044
            </li>
          </ul>
          <p className="p-aviso-legal">
            Para cualquier cuestión relacionada con la protección de datos
            personales, puede contactar con nosotros a través del correo
            indicado, indicando en el asunto «Protección de datos».
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">2. Qué datos recogemos</h2>
          <p className="p-aviso-legal">
            Dependiendo de la interacción que mantenga con nosotros, podemos
            tratar las siguientes categorías de datos:
          </p>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Datos identificativos y de contacto:</strong> nombre,
              apellidos, empresa, dirección de correo electrónico y número de
              teléfono.
            </li>
            <li className="mb-2">
              <strong>Datos del mensaje:</strong> asunto, contenido del mensaje
              y cualquier información que usted incluya voluntariamente en el
              formulario de contacto.
            </li>
            <li className="mb-2">
              <strong>Datos de navegación (cookies):</strong> dirección IP,
              identificadores de dispositivo, páginas visitadas y estadísticas de
              uso, únicamente si acepta las cookies analíticas. Consulte nuestra{" "}
              <Link
                to="/politica-de-cookies"
                className="text-primary font-semibold hover:underline"
              >
                Política de Cookies
              </Link>
              .
            </li>
            <li className="mb-2">
              <strong>Preferencias de comunicación:</strong> consentimiento
              expreso para recibir comunicaciones comerciales, cuando lo marque
              en el formulario de contacto.
            </li>
          </ul>
          <p className="p-aviso-legal">
            No recogemos categorías especiales de datos (origen étnico,
            opiniones políticas, salud, etc.) salvo que usted los incluya
            voluntariamente en el mensaje. Le recomendamos no facilitar datos
            sensibles a través del formulario.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">
            3. Para qué usamos esos datos (finalidad)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm mb-4">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-slate-300 px-4 py-3 font-bold">
                    Finalidad
                  </th>
                  <th className="border border-slate-300 px-4 py-3 font-bold">
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="border border-slate-300 px-4 py-3 font-semibold">
                    Atender consultas
                  </td>
                  <td className="border border-slate-300 px-4 py-3">
                    Gestionar y responder solicitudes de información,
                    presupuestos o soporte técnico recibidas a través del
                    formulario de contacto.
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="border border-slate-300 px-4 py-3 font-semibold">
                    Relación comercial
                  </td>
                  <td className="border border-slate-300 px-4 py-3">
                    Mantener la relación precontractual o contractual derivada
                    de pedidos, ofertas o servicios solicitados.
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="border border-slate-300 px-4 py-3 font-semibold">
                    Comunicaciones comerciales
                  </td>
                  <td className="border border-slate-300 px-4 py-3">
                    Enviar newsletters, novedades de productos, promociones o
                    información comercial de GRAU BASSAS, solo si ha marcado la
                    casilla de aceptación correspondiente.
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="border border-slate-300 px-4 py-3 font-semibold">
                    Análisis web
                  </td>
                  <td className="border border-slate-300 px-4 py-3">
                    Obtener estadísticas anónimas de uso del sitio web mediante
                    Google Analytics, con su consentimiento previo.
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="border border-slate-300 px-4 py-3 font-semibold">
                    Cumplimiento legal
                  </td>
                  <td className="border border-slate-300 px-4 py-3">
                    Atender obligaciones legales aplicables en materia fiscal,
                    mercantil o de consumo.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">
            4. Por qué podemos tratarlos (base legal)
          </h2>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Ejecución de medidas precontractuales o contrato</strong>{" "}
              (art. 6.1.b RGPD): para atender su consulta, preparar presupuestos
              o gestionar pedidos solicitados.
            </li>
            <li className="mb-2">
              <strong>Consentimiento</strong> (art. 6.1.a RGPD): para el envío
              de comunicaciones comerciales y para el uso de cookies no
              esenciales. Puede retirarlo en cualquier momento.
            </li>
            <li className="mb-2">
              <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para
              responder consultas genéricas, mejorar nuestros servicios y
              garantizar la seguridad del sitio web, siempre que no prevalezcan
              sus derechos.
            </li>
            <li className="mb-2">
              <strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c
              RGPD): cuando la normativa nos obligue a conservar determinada
              documentación.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">5. Cuánto tiempo los conservamos</h2>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Consultas de contacto:</strong> mientras dure la gestión
              de su solicitud y, posteriormente, durante un plazo máximo de{" "}
              <strong>12 meses</strong> desde la última comunicación, salvo que
              derive una relación comercial.
            </li>
            <li className="mb-2">
              <strong>Clientes y presupuestos:</strong> durante la vigencia de
              la relación comercial y los plazos legales de conservación
              aplicables (habitualmente <strong>6 años</strong> en materia
              mercantil y fiscal).
            </li>
            <li className="mb-2">
              <strong>Comunicaciones comerciales:</strong> hasta que retire su
              consentimiento o solicite la baja, y en todo caso durante un
              máximo de <strong>3 años</strong> desde la última interacción si
              no ha manifestado oposición.
            </li>
            <li className="mb-2">
              <strong>Datos de navegación (cookies):</strong> según los plazos
              indicados en nuestra{" "}
              <Link
                to="/politica-de-cookies"
                className="text-primary font-semibold hover:underline"
              >
                Política de Cookies
              </Link>
              .
            </li>
          </ul>
          <p className="p-aviso-legal">
            Transcurridos dichos plazos, los datos serán suprimidos o
            anonimizados de forma segura.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">6. A quién se los cedemos</h2>
          <p className="p-aviso-legal">
            GRAU BASSAS no vende ni cede sus datos personales a terceros con
            fines comerciales. No obstante, podemos comunicar datos a:
          </p>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Proveedores de servicios</strong> que actúan como
              encargados del tratamiento (hosting, correo electrónico, envío de
              formularios como EmailJS, herramientas de analítica), con los que
              mantenemos contratos que garantizan la confidencialidad y el
              cumplimiento del RGPD.
            </li>
            <li className="mb-2">
              <strong>Administraciones públicas</strong>, cuando exista
              obligación legal.
            </li>
            <li className="mb-2">
              <strong>Asesores profesionales</strong> (legal, fiscal o contable),
              bajo deber de secreto profesional.
            </li>
          </ul>
          <p className="p-aviso-legal">
            En ningún caso realizamos cesiones que requieran su consentimiento
            adicional sin informarle previamente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">7. Derechos del usuario</h2>
          <p className="p-aviso-legal">
            Usted puede ejercer en cualquier momento los siguientes derechos
            reconocidos por el RGPD:
          </p>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Acceso:</strong> conocer qué datos tratamos sobre usted.
            </li>
            <li className="mb-2">
              <strong>Rectificación:</strong> corregir datos inexactos o
              incompletos.
            </li>
            <li className="mb-2">
              <strong>Supresión:</strong> solicitar la eliminación de sus datos
              cuando ya no sean necesarios.
            </li>
            <li className="mb-2">
              <strong>Limitación:</strong> solicitar que restrinjamos el
              tratamiento en determinadas circunstancias.
            </li>
            <li className="mb-2">
              <strong>Portabilidad:</strong> recibir sus datos en formato
              estructurado y transmitirlos a otro responsable.
            </li>
            <li className="mb-2">
              <strong>Oposición:</strong> oponerse al tratamiento basado en
              interés legítimo o al envío de comunicaciones comerciales.
            </li>
            <li className="mb-2">
              <strong>Retirar el consentimiento</strong> en cualquier momento,
              sin efectos retroactivos.
            </li>
          </ul>
          <p className="p-aviso-legal">
            Para ejercer estos derechos, envíe un correo a{" "}
            <a
              href="mailto:info@graubassas.com"
              className="text-primary font-semibold hover:underline"
            >
              info@graubassas.com
            </a>{" "}
            adjuntando copia de un documento acreditativo de identidad. Le
            responderemos en el plazo de <strong>un mes</strong>, prorrogable
            hasta <strong>dos meses</strong> en casos complejos (art. 12 RGPD).
          </p>
          <p className="p-aviso-legal">
            Si considera que sus derechos no han sido atendidos, puede
            presentar una reclamación ante la{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Agencia Española de Protección de Datos (AEPD)
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-aviso-legal">8. Transferencias internacionales</h2>
          <p className="p-aviso-legal">
            Algunos de nuestros proveedores tecnológicos pueden estar ubicados
            fuera del Espacio Económico Europeo (EEE), en particular:
          </p>
          <ul className="list-disc pl-10 p-aviso-legal">
            <li className="mb-2">
              <strong>Google LLC</strong> (Estados Unidos), para Google
              Analytics, cuando usted acepta cookies analíticas. Google participa
              en el Marco de Privacidad de Datos UE-EE.UU. y aplica cláusulas
              contractuales tipo.
            </li>
            <li className="mb-2">
              <strong>EmailJS</strong> u otros servicios de envío de formularios
              que podamos integrar en el futuro, con sede fuera del EEE. En tal
              caso, solo se transferirán los datos estrictamente necesarios para
              remitir su mensaje, con garantías adecuadas conforme al RGPD.
            </li>
          </ul>
          <p className="p-aviso-legal">
            Antes de activar cualquier herramienta que implique transferencias
            internacionales, informaremos al usuario y, cuando sea necesario,
            solicitaremos su consentimiento.
          </p>
        </section>

        <section>
          <h2 className="h2-aviso-legal">9. Cambios en la política</h2>
          <p className="p-aviso-legal">
            GRAU BASSAS se reserva el derecho de modificar la presente Política
            de Privacidad para adaptarla a novedades legislativas, cambios en
            nuestros servicios o en las herramientas tecnológicas utilizadas
            (por ejemplo, la integración de EmailJS en el formulario de contacto).
          </p>
          <p className="p-aviso-legal">
            Cuando se produzcan cambios relevantes, los publicaremos en esta
            página indicando la fecha de «Última actualización». Le recomendamos
            revisarla periódicamente. El uso continuado del sitio web tras la
            publicación de cambios implicará su aceptación, salvo que la normativa
            exija un nuevo consentimiento.
          </p>
          <p className="p-aviso-legal">
            Documentos relacionados:{" "}
            <Link
              to="/aviso-legal"
              className="text-primary font-semibold hover:underline"
            >
              Aviso Legal
            </Link>
            {" · "}
            <Link
              to="/politica-de-cookies"
              className="text-primary font-semibold hover:underline"
            >
              Política de Cookies
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default PoliticaPrivacidad;
