export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-8 italic">Última actualización: 1 de Enero de 2026</p>

        <p>
          En <strong>FTY Downloader Pro</strong>, utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación,
          analizar el tráfico del sitio y personalizar el contenido. Esta política explica qué son las cookies, cómo las usamos y tus opciones para controlarlas.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en tu computadora o dispositivo móvil cuando los visitas.
          Permiten que el sitio web "recuerde" tus acciones o preferencias (como el idioma, el tamaño de la fuente y otras preferencias de visualización)
          durante un período de tiempo, para que no tengas que volver a introducirlas cada vez que regresas al sitio o navegas de una página a otra.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. ¿Cómo utilizamos las cookies?</h2>
        <p>Utilizamos cookies por varias razones técnicas y de experiencia de usuario:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Cookies Esenciales:</strong> Son necesarias para el funcionamiento básico del sitio, como la navegación por las páginas y el acceso a áreas seguras. El sitio no puede funcionar correctamente sin estas cookies.</li>
          <li><strong>Cookies de Preferencia:</strong> Nos permiten recordar información que cambia la forma en que el sitio se comporta o se ve, como tu idioma preferido o la región en la que te encuentras.</li>
          <li><strong>Cookies de Estadística (Analíticas):</strong> Nos ayudan a comprender cómo interactúan los visitantes con el sitio al recopilar y reportar información de forma anónima a través de herramientas como Google Analytics.</li>
          <li><strong>Cookies de Marketing (Publicidad):</strong> Se utilizan para rastrear a los visitantes a través de las webs. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual, como los proporcionados por la red de Google AdSense.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cookies de Terceros</h2>
        <p>
          Además de nuestras propias cookies, también utilizamos varias cookies de terceros para informar sobre las estadísticas de uso del sitio,
          entregar anuncios en y a través del sitio, y así sucesivamente:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Google Analytics:</strong> Para medir el tráfico y el comportamiento de los usuarios en la web de forma agregada.</li>
          <li><strong>Google AdSense:</strong> Para mostrar anuncios relevantes basados en tus intereses y navegación previa.</li>
          <li><strong>Redes Sociales:</strong> Cookies integradas de Facebook y TikTok para permitir la carga correcta de contenidos externos.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. ¿Cómo puedes controlar las cookies?</h2>
        <p>
          Puedes controlar y/o eliminar las cookies como desees; para más detalles, consulta <strong>aboutcookies.org</strong>.
          Puedes eliminar todas las cookies que ya están en tu computadora y puedes configurar la mayoría de los navegadores para evitar que se coloquen.
        </p>
        <p className="mt-4">
          Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Actualizaciones de esta política</h2>
        <p>
          Es posible que actualicemos nuestra Política de Cookies de vez en cuando para reflejar, por ejemplo, cambios en las cookies que utilizamos
          o por otras razones operativas, legales o reglamentarias. Por lo tanto, te rogamos que visites esta Política de Cookies regularmente para
          mantenerte informado sobre nuestro uso de las mismas.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl border mt-12">
          <h3 className="text-xl font-bold mb-3">Contacto</h3>
          <p>Si tienes alguna pregunta sobre nuestro uso de las cookies, envíanos un correo electrónico a: <strong>privacidad@ftydownloader.com</strong></p>
        </div>
      </div>
    </div>
  )
}