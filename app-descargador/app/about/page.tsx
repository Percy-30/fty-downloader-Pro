import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | FTY Downloader Pro - Nuestra Historia y Misión',
  description: 'Conoce al equipo detrás de FTY Downloader Pro. Nuestra misión es proporcionar herramientas gratuitas y seguras para creadores de contenido digital.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>

      <div className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 leading-relaxed">
            FTY Downloader Pro nació en 2023 como un proyecto personal para resolver una necesidad común:
            permitir a los creadores de contenido respaldar y gestionar sus propios videos de manera sencilla.
            Lo que comenzó como una herramienta simple ha evolucionado hasta convertirse en una plataforma
            completa utilizada por miles de usuarios en Latinoamérica y España.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Fundada por desarrolladores apasionados por la tecnología y el contenido digital,
            nuestra plataforma se ha construido con un principio fundamental: <strong>la accesibilidad</strong>.
            Creemos que las herramientas digitales básicas deben estar disponibles para todos,
            sin importar su presupuesto o conocimientos técnicos.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎯 Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Empoderar a los creadores de contenido proporcionándoles herramientas gratuitas, seguras y fáciles de usar
            para gestionar, respaldar y optimizar su trabajo multimedia. Nos comprometemos a mantener nuestra
            plataforma libre de malware, sin necesidad de registro y con total transparencia en el procesamiento de datos.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">👁️ Nuestra Visión</h2>
          <p className="text-gray-700 leading-relaxed">
            Ser la herramienta de referencia para creadores de contenido en español, expandiendo nuestras
            capacidades para incluir edición básica, conversión de formatos y herramientas de optimización,
            siempre manteniendo nuestro compromiso con la gratuidad y la seguridad.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">💎 Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-blue-600 mb-2">🆓 Gratuidad</h3>
              <p className="text-gray-600">
                Creemos que las herramientas básicas de gestión de contenido deben ser accesibles para todos.
                FTY Downloader Pro es y seguirá siendo 100% gratuito, sin funciones premium bloqueadas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-green-600 mb-2">🔒 Seguridad</h3>
              <p className="text-gray-600">
                Tu privacidad es nuestra prioridad. No almacenamos tus videos, no requerimos registro
                y no vendemos datos. El procesamiento es temporal y los archivos se eliminan automáticamente.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-purple-600 mb-2">⚡ Calidad</h3>
              <p className="text-gray-600">
                Nos esforzamos por ofrecer la mejor experiencia posible. Interfaz moderna,
                procesamiento rápido y soporte para las máximas calidades disponibles en cada plataforma.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-orange-600 mb-2">📚 Educación</h3>
              <p className="text-gray-600">
                Más allá de las herramientas, proporcionamos contenido educativo para ayudar a los
                creadores a mejorar sus habilidades y optimizar su flujo de trabajo.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🛠️ ¿Qué Hacemos?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Desarrollamos herramientas de descarga y gestión de video para las principales plataformas sociales:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-red-500 mr-3 text-xl">▶️</span>
              <div>
                <strong className="text-gray-900">YouTube:</strong>
                <span className="text-gray-600"> Descarga videos en calidades desde 360p hasta 4K, con opción de extraer solo audio en MP3.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 text-xl">📘</span>
              <div>
                <strong className="text-gray-900">Facebook:</strong>
                <span className="text-gray-600"> Respalda videos públicos de Facebook en la máxima calidad disponible.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3 text-xl">🎵</span>
              <div>
                <strong className="text-gray-900">TikTok:</strong>
                <span className="text-gray-600"> Descarga videos sin marca de agua, preservando la calidad original del contenido.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Commitment Section */}
        <div className="bg-blue-50 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">🤝 Nuestro Compromiso</h2>
          <p className="text-gray-700 leading-relaxed">
            Entendemos las necesidades de los creadores de contenido porque nosotros mismos lo somos.
            Nos comprometemos a:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✅ Mantener el servicio gratuito y sin publicidad intrusiva</li>
            <li>✅ Proteger tu privacidad y no almacenar datos personales</li>
            <li>✅ Actualizar constantemente para soportar nuevas plataformas y formatos</li>
            <li>✅ Proporcionar contenido educativo de calidad para creadores</li>
            <li>✅ Responder a las consultas de soporte en menos de 48 horas</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">📬 ¿Tienes Preguntas?</h2>
          <p className="text-gray-700 mb-6">
            Estamos aquí para ayudarte. Visita nuestra página de contacto o consulta nuestras preguntas frecuentes.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contáctanos
            </a>
            <a
              href="/faq"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Ver FAQ
            </a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="text-sm text-gray-500 border-t pt-6 mt-8">
          <p>
            <strong>Aviso Legal:</strong> FTY Downloader Pro es una herramienta diseñada para ayudar a los usuarios
            a respaldar su propio contenido. Animamos a todos los usuarios a respetar los derechos de autor y
            las políticas de uso de cada plataforma. El uso de esta herramienta para descargar contenido
            protegido sin autorización es responsabilidad exclusiva del usuario.
          </p>
        </div>
      </div>
    </div>
  )
}