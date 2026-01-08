// app/api/download/youtube/combined/route.ts
import { NextRequest, NextResponse } from 'next/server'

//const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000'
const PYTHON_API_URL = (process.env.PYTHON_API_URL || 'http://localhost:8000').replace(/\/$/, '')


// ✅ FUNCIÓN PARA MAPEAR CALIDAD A ITAG
const mapQualityToItag = (quality: string) => {
  const qNum = parseInt(quality.match(/\d+/)?.[0] || '1080')

  const qualityMap: { [key: number]: { video: number, audio: number } } = {
    144: { video: 160, audio: 140 },
    240: { video: 133, audio: 140 },
    360: { video: 134, audio: 140 },
    480: { video: 135, audio: 140 },
    720: { video: 136, audio: 140 },
    1080: { video: 137, audio: 140 },
    1440: { video: 271, audio: 140 },
    2160: { video: 313, audio: 140 }
  }

  return qualityMap[qNum] || qualityMap[1080]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url, quality = "1080p", format_type = "mp4" } = body;
    const { video_itag: reqVideoItag, audio_itag: reqAudioItag } = body;

    console.log('🎬 [YouTube Combined] Iniciando descarga combinada...')
    console.log('📋 [YouTube Combined] Parámetros:', { url, quality, format_type, reqVideoItag, reqAudioItag })
    console.log('🔗 [YouTube Combined] Backend URL:', PYTHON_API_URL)

    // ✅ VALIDACIÓN MEJORADA DE URL
    if (!url) {
      return NextResponse.json(
        { error: 'URL es requerida' },
        { status: 400 }
      )
    }

    const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)/
    if (!youtubeRegex.test(url)) {
      return NextResponse.json(
        { error: 'URL de YouTube inválida' },
        { status: 400 }
      )
    }

    // ✅ LIMPIAR URL MEJORADO
    const cleanUrl = (url: string): string => {
      try {
        const urlObj = new URL(url)
        // Mantener solo parámetros esenciales
        const videoId = urlObj.searchParams.get('v')
        if (videoId) {
          return `https://www.youtube.com/watch?v=${videoId}`
        }
        return url.split('&')[0] // Fallback
      } catch {
        return url.split('&')[0]
      }
    }

    const cleanedUrl = cleanUrl(url)
    console.log('🔧 [YouTube Combined] URL limpia:', cleanedUrl)

    if (!PYTHON_API_URL) {
      return NextResponse.json(
        { error: 'Servidor de descargas no configurado' },
        { status: 500 }
      )
    }

    // ✅ ESTRATEGIA PRINCIPAL: USAR BACKEND COMBINER CON STREAMING
    console.log('🔗 [YouTube Combined] Llamando a endpoint de combinación backend...')

    try {
      // ✅ SOLUCIÓN: Solo usar itags de mapa si no se proveen específicos
      const itags = {
        video: reqVideoItag !== undefined ? reqVideoItag : mapQualityToItag(quality).video,
        audio: reqAudioItag !== undefined ? reqAudioItag : mapQualityToItag(quality).audio
      }

      console.log('🎯 [YouTube Combined] Itags a utilizar:', {
        src: reqVideoItag ? 'frontend' : 'fallback_map',
        quality,
        video_itag: itags.video,
        audio_itag: itags.audio
      })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 300000) // 5 minutos

      // ✅ ENDPOINT CORRECTO DEL BACKEND
      const combineResponse = await fetch(`${PYTHON_API_URL}/api/v1/combiner/youtube/combine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: cleanedUrl,
          quality: quality,
          video_itag: itags.video,
          audio_itag: itags.audio
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!combineResponse.ok) {
        let errorDetail = 'Error en combinación backend'
        const contentType = combineResponse.headers.get('Content-Type') || ''

        if (contentType.includes('application/json')) {
          const errorData = await combineResponse.json().catch(() => ({ error: 'Error al parsear JSON del backend' }))
          errorDetail = errorData.detail || errorData.error || JSON.stringify(errorData)
        } else {
          // Si no es JSON, leemos como texto pero con cuidado
          const errorText = await combineResponse.text().catch(() => 'Error de respuesta no legible')
          // Si el texto es muy largo o parece binario (ftypis), no lo mostramos completo
          if (errorText.includes('ftyp') || errorText.length > 500) {
            errorDetail = `Error del servidor (${combineResponse.status}): ${combineResponse.statusText}`
          } else {
            errorDetail = errorText || `Error ${combineResponse.status}`
          }
        }

        console.error('❌ [YouTube Combined] Error en combinación backend:', {
          status: combineResponse.status,
          detail: errorDetail
        })

        // Intentar fallback a estrategia frontend
        console.log('🔄 [YouTube Combined] Intentando estrategia frontend como fallback...')
        return await handleFrontendCombination(cleanedUrl, quality, format_type, itags.video, itags.audio)
      }

      // ✅ MANEJAR STREAMING RESPONSE DEL BACKEND - PIPING DIRECTO
      console.log('✅ [YouTube Combined] Backend respondió exitosamente, iniciando PIPING DE STREAM...')

      // Preparar headers para el cliente
      const responseHeaders = new Headers()

      // Pasar headers críticos del backend al frontend
      const headersToForward = [
        'Content-Type',
        'Content-Length',
        'Content-Disposition',
        'X-File-Size',
        'X-Video-Itag',
        'X-Audio-Itag'
      ]

      headersToForward.forEach(header => {
        const value = combineResponse.headers.get(header)
        if (value) responseHeaders.set(header, value)
      })

      // Asegurar que el Content-Type sea correcto para descargas
      if (!responseHeaders.has('Content-Type')) {
        responseHeaders.set('Content-Type', 'video/mp4')
      }

      // ✅ RETORNAR EL BODY DIRECTAMENTE COMO RESPONSE (PIPING)
      // Esto evita cargar el archivo en la memoria del servidor Next.js
      return new Response(combineResponse.body, {
        status: 200,
        headers: responseHeaders
      })

    } catch (combineError: any) {
      console.log('⚠️ [YouTube Combined] Combinación backend falló, usando estrategia frontend:', combineError.message)

      // ✅ FALLBACK: Estrategia frontend
      const body = await request.json().catch(() => ({}));
      return await handleFrontendCombination(cleanedUrl, quality, format_type, body.video_itag, body.audio_itag)
    }

  } catch (error: any) {
    console.error('💥 [YouTube Combined] Error general:', error)
    return NextResponse.json(
      {
        error: 'Error en descarga combinada: ' + error.message,
        details: error.toString()
      },
      { status: 500 }
    )
  }
}

// ✅ FUNCIÓN DE FALLBACK: COMBINACIÓN EN FRONTEND
async function handleFrontendCombination(url: string, quality: string, format_type: string, videoItag?: number | string, audioItag?: number | string) {
  try {
    console.log('🔄 [YouTube Combined] Usando estrategia frontend...')

    // Obtener información del video
    const infoResponse = await fetch(`${PYTHON_API_URL}/api/v1/youtube/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        quality: quality,
        format_type: format_type
      }),
    })

    if (!infoResponse.ok) {
      const errorData = await infoResponse.json()
      throw new Error(errorData.detail || 'Error obteniendo información del video')
    }

    const videoData = await infoResponse.json()
    console.log('📊 [YouTube Combined] Información del video obtenida para fallback:', {
      title: videoData.title,
      formatsCount: videoData.formats?.length || 0,
      targetQuality: quality,
      targetItags: { videoItag, audioItag }
    })

    // ✅ ENCONTRAR MEJOR FORMATO DE VIDEO Y AUDIO
    const findBestFormats = (data: any) => {
      let bestVideo = null
      let bestAudio = null

      if (!data.formats || !Array.isArray(data.formats)) {
        return { bestVideo: null, bestAudio: null }
      }

      // 1. PRIORIDAD: Buscar por ITAG si se proporcionó
      if (videoItag) {
        bestVideo = data.formats.find((f: any) => String(f.itag) === String(videoItag) || String(f.format_id) === String(videoItag))
        if (bestVideo) console.log('🎯 [YouTube Combined] Encontrado video por ITAG exacto:', videoItag)
      }

      if (audioItag) {
        bestAudio = data.formats.find((f: any) => String(f.itag) === String(audioItag) || String(f.format_id) === String(audioItag))
        if (bestAudio) console.log('🎯 [YouTube Combined] Encontrado audio por ITAG exacto:', audioItag)
      }

      // 2. FALLBACK: Buscar por calidad (numérico)
      const targetHeight = parseInt(quality.match(/\d+/)?.[0] || '1080')

      if (!bestVideo) {
        const videoFormats = data.formats.filter((f: any) => {
          const hasVideo = f.hasVideo !== false && f.has_video !== false
          const isVideoOnly = !f.hasAudio || f.hasAudio === false || !f.has_audio || f.has_audio === false

          if (!hasVideo || !isVideoOnly) return false

          const h = parseInt(f.height || f.resolution?.match(/\d+/)?.[0] || f.quality_label?.match(/\d+/)?.[0] || '0')
          return h === targetHeight
        })

        videoFormats.sort((a: any, b: any) => (b.contentLength || 0) - (a.contentLength || 0))
        bestVideo = videoFormats[0] || null
      }

      if (!bestAudio && (audioItag !== null)) { // Solo buscar si no se pidió explícitamente sin audio
        const audioFormats = data.formats.filter((f: any) => {
          const hasAudio = f.hasAudio === true || f.has_audio === true
          const hasVideo = f.hasVideo === true || f.has_video === true
          return hasAudio && !hasVideo
        })

        audioFormats.sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0))
        bestAudio = audioFormats[0] || null
      }

      return { bestVideo, bestAudio }
    }

    let { bestVideo, bestAudio } = findBestFormats(videoData)

    // ✅ ESTRATEGIA: SI NO HAY FORMATOS SEPARADOS, USAR EL FORMATO COMBINADO EXISTENTE
    if (!bestVideo && !bestAudio) {
      console.log('🔄 [YouTube Combined] No se encontraron formatos separados, usando formato combinado existente')

      // Buscar cualquier formato con audio y video
      const combinedFormats = videoData.formats?.filter((f: any) => {
        const hasVideo = f.hasVideo !== false && f.has_video !== false
        const hasAudio = f.hasAudio === true || f.has_audio === true
        return f.url && f.url.startsWith('http') && hasVideo && hasAudio
      }) || []

      // Ordenar por calidad
      combinedFormats.sort((a: any, b: any) => {
        const getQualityNum = (format: any) => {
          if (format.quality_label) {
            return parseInt(format.quality_label) || 0
          }
          if (format.quality) {
            const match = format.quality.match(/(\d+)p/)
            return match ? parseInt(match[1]) : 0
          }
          return 0
        }
        return getQualityNum(b) - getQualityNum(a)
      })

      const bestCombined = combinedFormats.find((f: any) =>
        f.quality?.includes(quality) ||
        f.resolution?.includes(quality) ||
        f.quality_label?.includes(quality)
      ) || combinedFormats[0]

      if (bestCombined) {
        console.log('✅ [YouTube Combined] Usando formato combinado existente:', bestCombined.quality || bestCombined.quality_label)
        return NextResponse.json({
          status: 'success',
          download_url: bestCombined.url,
          filename: `youtube_${quality}_${Date.now()}.${format_type}`,
          title: videoData.title,
          combined: false,
          method: 'existing_combined',
          quality: quality,
          file_size: bestCombined.contentLength || 0,
          warning: 'Video con audio incluido (no requiere combinación)'
        })
      } else {
        throw new Error('No se encontraron formatos disponibles para descargar')
      }
    }

    if (!bestVideo) {
      throw new Error(`No se encontró formato de video para calidad ${quality}`)
    }

    // ✅ ESTRATEGIA FINAL: COMBINACIÓN EN FRONTEND (usando proxy)
    console.log('🔄 [YouTube Combined] Usando combinación por proxy')

    if (bestVideo && bestAudio) {
      return NextResponse.json({
        status: 'success',
        video_url: bestVideo.url,
        audio_url: bestAudio.url,
        filename: `youtube_${quality}_${Date.now()}.mp4`,
        title: videoData.title,
        combined: true,
        method: 'proxy_combination',
        quality: quality,
        video_quality: bestVideo.quality || bestVideo.quality_label,
        audio_quality: bestAudio.quality,
        video_size: bestVideo.contentLength || 0,
        audio_size: bestAudio.contentLength || 0
      })
    } else {
      // ✅ ESTRATEGIA: SOLO VIDEO (sin audio disponible)
      console.log('⚠️ [YouTube Combined] Solo video disponible (sin audio)')
      return NextResponse.json({
        status: 'success',
        download_url: bestVideo.url,
        filename: `youtube_${quality}_${Date.now()}.mp4`,
        title: videoData.title,
        combined: false,
        method: 'video_only',
        quality: quality,
        warning: 'Este video no incluye audio - solo video disponible',
        video_quality: bestVideo.quality || bestVideo.quality_label,
        video_size: bestVideo.contentLength || 0
      })
    }

  } catch (error: any) {
    console.error('💥 [YouTube Combined] Error en estrategia frontend:', error)
    throw new Error(`Fallback también falló: ${error.message}`)
  }
}

// ✅ ENDPOINT GET PARA VERIFICAR CONEXIÓN
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'success',
    message: 'YouTube Combined API está funcionando',
    endpoint: 'POST /api/download/youtube/combined',
    parameters: {
      url: 'string (required)',
      quality: 'string (optional) - 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p, 4k',
      format_type: 'string (optional) - mp4, webm, etc.'
    },
    supported_qualities: ['144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p', '4k'],
    backend_url: PYTHON_API_URL
  })
}