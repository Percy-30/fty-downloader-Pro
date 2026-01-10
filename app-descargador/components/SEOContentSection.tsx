import React from 'react'

export default function SEOContentSection() {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 space-y-12">

            {/* SECCIÓN 1: INTRODUCCIÓN DETALLADA */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    La Herramienta Definitiva para Descargar Videos de Redes Sociales
                </h2>
                <p>
                    En la era digital actual, el contenido de video es el rey. Ya sea un tutorial útil en YouTube, un video divertido en TikTok
                    o un recuerdo memorable en Facebook, a menudo nos encontramos con contenido que deseamos guardar para ver sin conexión.
                    <strong>FTY Downloader Pro</strong> nace como la solución integral, gratuita y segura para estas necesidades.
                </p>
                <p>
                    Nuestra plataforma ha sido diseñada con una prioridad clara: la <strong>simplicidad y calidad</strong>. No necesitas instalar software extraño
                    ni registrarte con tu correo electrónico. Simplemente copia, pega y descarga. Soportamos resoluciones hasta <strong>4K (2160p)</strong>
                    y aseguramos que tus descargas de TikTok estén 100% libres de marcas de agua.
                </p>
            </section>

            {/* SECCIÓN 2: GUÍA PASO A PASO */}
            <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3">?</span>
                    ¿Cómo Descargar Videos Gratis?
                </h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-blue-200 rounded-full flex items-center justify-center font-bold text-blue-600">1</div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">Copia el Enlace</h3>
                            <p className="text-sm">Ve a Facebook, YouTube o TikTok. Busca el video que te gusta, presiona el botón "Compartir" y selecciona "Copiar enlace".</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-blue-200 rounded-full flex items-center justify-center font-bold text-blue-600">2</div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">Pega en FTY Downloader</h3>
                            <p className="text-sm">Vuelve a nuestra web (ftydownloader.com) y pega el enlace en el campo de texto ubicado en la parte superior.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-blue-200 rounded-full flex items-center justify-center font-bold text-blue-600">3</div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">Elige Calidad y Descarga</h3>
                            <p className="text-sm">Presiona "Buscar". Verás las opciones disponibles (MP4, MP3, HD, 4K). Elige la que prefieras y la descarga comenzará al instante.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: FAQ / PREGUNTAS FRECUENTES (CRUCIAL PARA ADSENSE) */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Preguntas Frecuentes (FAQ)</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-2">¿Es legal descargar videos de YouTube?</h3>
                        <p className="text-sm leading-relaxed">
                            Es legal descargar videos para uso personal ("Fair Use") siempre que no redistribuyas el contenido con fines de lucro ni infringas los derechos de autor del creador.
                            <strong>FTY Downloader Pro</strong> está diseñado estrictamente para copias de seguridad personales.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-2">¿Elimina la marca de agua de TikTok?</h3>
                        <p className="text-sm leading-relaxed">
                            Sí. Nuestra tecnología avanzada procesa el video original del servidor de TikTok para entregarte una versión limpia, perfecta para republicar o guardar en tu galería sin el logo flotante.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-2">¿Puedo descargar en mi iPhone/Android?</h3>
                        <p className="text-sm leading-relaxed">
                            ¡Absolutamente! Nuestra herramienta es una <strong>WebApp Progresiva (PWA)</strong> optimizada. Funciona perfectamente en Chrome, Safari (iOS) y cualquier navegador móvil moderno.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-2">¿Dónde se guardan los archivos?</h3>
                        <p className="text-sm leading-relaxed">
                            En PC, generalmente en la carpeta "Descargas". En móviles Android/iOS, se guardan en tu "Galería" o en la carpeta "Archivos", dependiendo de tu configuración del sistema.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 4: TABLA COMPARATIVA DE FORMATOS */}
            <section className="overflow-x-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Formatos y Calidades Soportadas</h2>
                <table className="w-full border-collapse border border-gray-200 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Plataforma</th>
                            <th className="border p-3 text-left">Formatos de Video</th>
                            <th className="border p-3 text-left">Formatos de Audio</th>
                            <th className="border p-3 text-left">Características Extra</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-3 font-semibold">YouTube</td>
                            <td className="border p-3">MP4, WEBM (144p hasta 4K/8K)</td>
                            <td className="border p-3">MP3, M4A (128kbps - 320kbps)</td>
                            <td className="border p-3">Soporte para 60fps y HDR</td>
                        </tr>
                        <tr>
                            <td className="border p-3 font-semibold">Facebook</td>
                            <td className="border p-3">MP4 (SD y HD)</td>
                            <td className="border p-3">Extracción de audio MP3</td>
                            <td className="border p-3">Descarga de Reels y Videos Privados</td>
                        </tr>
                        <tr>
                            <td className="border p-3 font-semibold">TikTok</td>
                            <td className="border p-3">MP4 (HD Original)</td>
                            <td className="border p-3">MP3 (Sonido original)</td>
                            <td className="border p-3"><strong>Sin Marca de Agua</strong></td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </div>
    )
}
