import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | FTY Downloader Pro',
  description: 'Política de privacidad de FTY Downloader Pro. Conoce cómo protegemos tu información y tus derechos como usuario.',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
      <p className="text-gray-600 mb-8">Última actualización: 1 de Enero de 2026</p>

      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <p className="text-blue-800 font-medium">
            En FTY Downloader Pro, nos tomamos muy en serio la privacidad de nuestros usuarios.
            Esta política describe qué información recopilamos, cómo la usamos y tus derechos sobre ella.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Información que Recopilamos</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">1.1 Información que NO recopilamos</h3>
        <p>FTY Downloader Pro está diseñado con la privacidad como prioridad:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>No requerimos registro:</strong> Puedes usar nuestra herramienta sin crear una cuenta</li>
          <li><strong>No almacenamos videos:</strong> Los archivos procesados se eliminan automáticamente después de la descarga</li>
          <li><strong>No vendemos datos:</strong> Nunca compartimos información con terceros con fines comerciales</li>
          <li><strong>No rastreamos tu actividad:</strong> No guardamos historial de las URLs que procesas</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">1.2 Información que SÍ recopilamos</h3>
        <p>Recopilamos únicamente la información mínima necesaria para proporcionar nuestros servicios:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>URLs de videos (temporal):</strong> Los enlaces que pegas para descargar se procesan temporalmente y se eliminan inmediatamente después</li>
          <li><strong>Datos técnicos anónimos:</strong> Tipo de navegador, dispositivo y sistema operativo para optimizar la experiencia</li>
          <li><strong>Datos de uso agregados:</strong> Estadísticas anónimas sobre el uso general del sitio</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Uso de la Información</h2>
        <p>Utilizamos la información recopilada exclusivamente para:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Procesar tus solicitudes de descarga de video</li>
          <li>Mejorar la calidad y rendimiento de nuestros servicios</li>
          <li>Garantizar la seguridad y prevenir abusos de la plataforma</li>
          <li>Generar estadísticas anónimas de uso</li>
          <li>Cumplir con obligaciones legales cuando sea requerido</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies y Tecnologías Similares</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">3.1 ¿Qué son las cookies?</h3>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
          Nos ayudan a recordar tus preferencias y mejorar tu experiencia.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">3.2 Tipos de cookies que utilizamos</h3>
        <table className="w-full border-collapse my-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Tipo</th>
              <th className="border p-3 text-left">Propósito</th>
              <th className="border p-3 text-left">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3"><strong>Esenciales</strong></td>
              <td className="border p-3">Necesarias para el funcionamiento básico del sitio</td>
              <td className="border p-3">Sesión</td>
            </tr>
            <tr>
              <td className="border p-3"><strong>Preferencias</strong></td>
              <td className="border p-3">Recuerdan tu configuración (idioma, tema)</td>
              <td className="border p-3">1 año</td>
            </tr>
            <tr>
              <td className="border p-3"><strong>Analíticas</strong></td>
              <td className="border p-3">Nos ayudan a entender cómo se usa el sitio</td>
              <td className="border p-3">2 años</td>
            </tr>
            <tr>
              <td className="border p-3"><strong>Publicidad</strong></td>
              <td className="border p-3">Utilizadas por Google AdSense para mostrar anuncios relevantes</td>
              <td className="border p-3">Variable</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-medium mt-6 mb-3">3.3 Gestión de cookies</h3>
        <p>
          Puedes gestionar tus preferencias de cookies en cualquier momento a través de la configuración de tu navegador.
          Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Servicios de Terceros</h2>
        <p>Utilizamos los siguientes servicios de terceros:</p>

        <h3 className="text-xl font-medium mt-6 mb-3">4.1 Google AdSense</h3>
        <p>
          Utilizamos Google AdSense para mostrar anuncios. Google puede usar cookies para mostrar anuncios basados
          en visitas anteriores a este u otros sitios web. Puedes optar por no recibir publicidad personalizada
          visitando <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Configuración de Anuncios de Google</a>.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">4.2 Google Analytics</h3>
        <p>
          Utilizamos Google Analytics para analizar el uso del sitio web. Esta información nos ayuda a mejorar
          nuestros servicios. Google Analytics recopila información de forma anónima.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Seguridad de los Datos</h2>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Conexiones cifradas mediante HTTPS/TLS</li>
          <li>Eliminación automática de archivos temporales</li>
          <li>Acceso restringido a datos solo a personal autorizado</li>
          <li>Monitoreo continuo de seguridad</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Tus Derechos (GDPR y CCPA)</h2>
        <p>Tienes los siguientes derechos sobre tus datos personales:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Derecho de acceso:</strong> Solicitar una copia de los datos que tenemos sobre ti</li>
          <li><strong>Derecho de rectificación:</strong> Corregir datos inexactos</li>
          <li><strong>Derecho de supresión:</strong> Solicitar la eliminación de tus datos</li>
          <li><strong>Derecho de portabilidad:</strong> Recibir tus datos en formato legible</li>
          <li><strong>Derecho de oposición:</strong> Oponerte al procesamiento de tus datos</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, contáctanos a través de nuestro
          <a href="/contact" className="text-blue-600 hover:underline"> formulario de contacto</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Menores de Edad</h2>
        <p>
          FTY Downloader Pro no está dirigido a menores de 13 años. No recopilamos conscientemente
          información personal de niños. Si eres padre/tutor y crees que tu hijo nos ha proporcionado
          información personal, contáctanos para que podamos eliminarla.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Cambios en Esta Política</h2>
        <p>
          Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios
          significativos publicando la nueva política en esta página con una fecha de actualización visible.
          Te recomendamos revisar esta página periódicamente.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contacto</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <p className="mb-4">
            Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos,
            puedes contactarnos a través de:
          </p>
          <ul className="space-y-2">
            <li>📧 <strong>Email:</strong> privacy@ftydownloader.com</li>
            <li>📝 <strong>Formulario:</strong> <a href="/contact" className="text-blue-600 hover:underline">Página de Contacto</a></li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Tiempo de respuesta estimado: 24-48 horas hábiles
          </p>
        </div>
      </div>
    </div>
  )
}