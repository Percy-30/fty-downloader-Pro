import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | FTY Downloader Pro - Nuestra Misión y Equipo',
  description: 'Conoce la visión de FTY Downloader Pro. Somos un equipo de especialistas en procesamiento multimedia dedicados a democratizar el acceso al contenido digital.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Sobre Nosotros</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Democratizando la conservación del contenido digital mediante tecnología de vanguardia y acceso gratuito universal.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="prose prose-lg text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <p>
            <strong>FTY Downloader Pro</strong> nació de una observación simple: internet es la biblioteca más grande de la historia,
            pero es volátil. El contenido que hoy es vital para tu aprendizaje o entretenimiento, mañana puede desaparecer por cambios en los algoritmos o políticas de plataforma.
          </p>
          <p>
            En 2023, nuestro fundador –un ingeniero de sistemas apasionado por el procesamiento de señales– desarrolló la primera versión de FTY como una solución minimalista para respaldar clases académicas de video.
            Rápidamente, la herramienta fue adoptada por una comunidad de creadores que buscaban una alternativa segura, sin malware y sin las limitaciones de las plataformas comerciales.
          </p>
          <p>
            Hoy, FTY Downloader Pro es un ecosistema completo que procesa miles de solicitudes diarias, manteniendo siempre su compromiso original: <strong>código gratuito y alta calidad.</strong>
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-1 rounded-3xl shadow-2xl">
          <div className="bg-white p-8 rounded-[1.4rem]">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 italic">"Nuestra visión es simple: si está en la web y es público, deberías tener el derecho de guardarlo para tu uso personal sin complicaciones técnicas."</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mr-4">🚀</div>
              <div>
                <p className="font-bold text-gray-900">Equipo de Desarrollo</p>
                <p className="text-gray-500">FTY Downloader Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <div className="bg-gray-50 p-8 rounded-2xl">
          <div className="text-3xl mb-4">🏠</div>
          <h4 className="text-xl font-bold mb-3 text-gray-900">Ubicación</h4>
          <p className="text-gray-600">
            Operamos de forma remota y descentralizada, con presencia en los principales nodos de desarrollo en Latinoamérica y Europa.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <div className="text-3xl mb-4">🌍</div>
          <h4 className="text-xl font-bold mb-3 text-gray-900">Impacto Global</h4>
          <p className="text-gray-600">
            Servimos a usuarios en más de 50 países, proporcionando soporte especializado para idiomas español e inglés.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <div className="text-3xl mb-4">⚙️</div>
          <h4 className="text-xl font-bold mb-3 text-gray-900">Tecnología</h4>
          <p className="text-gray-600">
            Utilizamos infraestructuras de nube de alto rendimiento para garantizar latencias mínimas y escalabilidad infinita.
          </p>
        </div>
      </div>

      <div className="bg-white border text-gray-900 p-12 rounded-3xl shadow-sm mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center italic">Nuestros Principios Innegociables</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          <div>
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Privacidad por Diseño
            </h4>
            <p className="text-gray-600">
              No rastreamos, no vendemos, no almacenamos. La web debería ser un lugar seguro para todos.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Innovación Constante
            </h4>
            <p className="text-gray-600">
              Las redes sociales cambian cada día; nosotros nos adaptamos más rápido para que tu flujo hable por sí mismo.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Experiencia Pro-Usuario
            </h4>
            <p className="text-gray-600">
              Interfaz limpia, sin botones trampa, sin redirecciones maliciosas. Calidad profesional hoy mismo.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Responsabilidad Ética
            </h4>
            <p className="text-gray-600">
              Fomentamos el uso responsable del contenido y el respeto sagrado por el derecho de autor de los artistas.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white rounded-[3rem] p-12 mb-20 grid md:grid-cols-3 gap-12 text-center">
        <div>
          <div className="text-5xl font-extrabold text-blue-400 mb-2">+1M</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm">Videos Procesados</div>
        </div>
        <div>
          <div className="text-5xl font-extrabold text-purple-400 mb-2">99.9%</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm">Uptime del Servidor</div>
        </div>
        <div>
          <div className="text-5xl font-extrabold text-pink-400 mb-2">0</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm">Costo para el Usuario</div>
        </div>
      </div>

      <div className="text-center py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Únete a nuestra comunidad</h2>
        <div className="flex justify-center gap-6">
          <a href="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-2xl hover:bg-blue-700 font-bold transition-all shadow-xl hover:-translate-y-1">
            📧 Contacto Directo
          </a>
          <a href="/blog" className="bg-gray-100 text-gray-900 px-10 py-5 rounded-2xl hover:bg-gray-200 font-bold transition-all">
            📰 Ver el Blog
          </a>
        </div>
      </div>
    </div>
  )
}