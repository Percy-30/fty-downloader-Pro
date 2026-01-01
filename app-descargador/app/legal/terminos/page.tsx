import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Servicio | FTY Downloader Pro',
  description: 'Términos y condiciones de uso de FTY Downloader Pro. Lee nuestras políticas de uso aceptable y limitaciones del servicio.',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Términos de Servicio</h1>
      <p className="text-gray-600 mb-8">Última actualización: 1 de Enero de 2026</p>

      <div className="prose prose-lg max-w-none">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
          <p className="text-amber-800">
            <strong>Importante:</strong> Al utilizar FTY Downloader Pro, aceptas estos términos de servicio.
            Por favor, léelos cuidadosamente antes de usar nuestra plataforma.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar FTY Downloader Pro (en adelante "el Servicio"), ubicado en ftydownloader.com,
          aceptas cumplir con estos Términos de Servicio y todas las leyes y regulaciones aplicables.
          Si no estás de acuerdo con alguno de estos términos, no debes utilizar el Servicio.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Descripción del Servicio</h2>
        <p>
          FTY Downloader Pro es una herramienta web gratuita que permite a los usuarios descargar videos
          de plataformas públicas como YouTube, Facebook y TikTok. El Servicio está diseñado para uso
          personal y educativo legítimo.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Uso Aceptable</h2>
        <p>Nuestras herramientas están diseñadas exclusivamente para:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Respaldo de contenido propio:</strong> Descargar videos que tú mismo has creado y subido a las plataformas</li>
          <li><strong>Uso personal:</strong> Descargar contenido para visualización offline personal</li>
          <li><strong>Fines educativos:</strong> Material para proyectos educativos con atribución adecuada</li>
          <li><strong>Contenido con licencia:</strong> Descargar videos cuyo autor ha dado permiso explícito</li>
          <li><strong>Contenido de dominio público:</strong> Material sin restricciones de derechos de autor</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Uso Prohibido</h2>
        <p>Queda estrictamente prohibido utilizar el Servicio para:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>❌ Descargar contenido protegido por derechos de autor sin la autorización del titular</li>
          <li>❌ Redistribuir, vender o comercializar contenido descargado sin autorización</li>
          <li>❌ Modificar contenido de terceros y reclamarlo como propio</li>
          <li>❌ Descargar contenido para actividades ilegales, difamatorias o dañinas</li>
          <li>❌ Realizar ataques de denegación de servicio o intentar vulnerar la seguridad</li>
          <li>❌ Utilizar el Servicio de manera automatizada sin autorización (bots, scrapers)</li>
          <li>❌ Eludir medidas de protección implementadas por las plataformas de origen</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Derechos de Autor y Fair Use</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">5.1 Respeto a los Derechos de Autor</h3>
        <p>
          FTY Downloader Pro respeta los derechos de propiedad intelectual de terceros. El usuario es
          el único responsable de asegurarse de que tiene derecho legal para descargar cualquier contenido.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">5.2 Doctrina del Uso Justo (Fair Use)</h3>
        <p>
          Reconocemos que existen usos legítimos de contenido protegido bajo la doctrina del "Fair Use"
          (Uso Justo), que incluye:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Crítica y comentario</li>
          <li>Educación e investigación</li>
          <li>Reportajes de noticias</li>
          <li>Parodia</li>
        </ul>
        <p>
          Sin embargo, la determinación de si un uso específico califica como "Fair Use" es responsabilidad
          exclusiva del usuario.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitación de Responsabilidad</h2>
        <div className="bg-gray-50 p-6 rounded-xl my-4">
          <p>
            <strong>EL SERVICIO SE PROPORCIONA "TAL CUAL" Y "SEGÚN DISPONIBILIDAD".</strong> FTY Downloader Pro:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>No garantiza la disponibilidad continua e ininterrumpida del Servicio</li>
            <li>No se hace responsable del uso que los usuarios den al contenido descargado</li>
            <li>No almacena ni es responsable del contenido procesado</li>
            <li>No garantiza la compatibilidad con todos los dispositivos o navegadores</li>
            <li>No se responsabiliza por daños derivados del uso del Servicio</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Indemnización</h2>
        <p>
          El usuario acepta indemnizar y mantener indemne a FTY Downloader Pro, sus operadores,
          directivos y empleados, de cualquier reclamación, demanda, pérdida o daño (incluyendo
          honorarios legales) que surjan del uso del Servicio o de la violación de estos Términos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Propiedad Intelectual del Servicio</h2>
        <p>
          El diseño, código, logotipos y contenido original de FTY Downloader Pro son propiedad de
          sus creadores y están protegidos por leyes de propiedad intelectual. No está permitido copiar,
          modificar o redistribuir elementos del Servicio sin autorización escrita.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Enlaces a Terceros</h2>
        <p>
          El Servicio puede contener enlaces a sitios web de terceros. No somos responsables del
          contenido, políticas de privacidad o prácticas de estos sitios externos. Te recomendamos
          leer los términos de cada sitio que visites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Modificaciones del Servicio</h2>
        <p>
          Nos reservamos el derecho de modificar, suspender o discontinuar el Servicio (o cualquier
          parte del mismo) en cualquier momento, con o sin previo aviso. No seremos responsables
          ante ti ni ante terceros por cualquier modificación, suspensión o discontinuación.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Modificaciones de los Términos</h2>
        <p>
          Podemos revisar estos Términos de Servicio en cualquier momento. Los cambios entrarán en
          vigor inmediatamente después de su publicación. El uso continuado del Servicio después de
          cualquier cambio constituye tu aceptación de los nuevos términos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Ley Aplicable y Jurisdicción</h2>
        <p>
          Estos Términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener
          en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa será sometida
          a la jurisdicción exclusiva de los tribunales competentes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contacto</h2>
        <div className="bg-blue-50 p-6 rounded-xl">
          <p>Si tienes preguntas sobre estos Términos de Servicio, contáctanos:</p>
          <ul className="mt-4 space-y-2">
            <li>📧 <strong>Email:</strong> legal@ftydownloader.com</li>
            <li>📝 <strong>Formulario:</strong> <a href="/contact" className="text-blue-600 hover:underline">Página de Contacto</a></li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>
            Al utilizar FTY Downloader Pro, confirmas que has leído, entendido y aceptado estos
            Términos de Servicio en su totalidad.
          </p>
        </div>
      </div>
    </div>
  )
}