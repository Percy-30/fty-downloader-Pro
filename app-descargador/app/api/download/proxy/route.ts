// app/api/download/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server'

// ✅ TIMEOUTS EXTENDIDOS PARA VIDEOS GRANDES Y COMBINACIÓN
const COMBINE_TIMEOUT = 300000 // 5 minutos para combinación
const DOWNLOAD_TIMEOUT = 240000 // 4 minutos para descargas individuales
const CONNECT_TIMEOUT = 60000   // 60 segundos para conexión inicial

// ✅ FUNCIÓN PARA VALIDAR URLs DE DESCARGA
function isValidDownloadUrl(url: string): boolean {
  if (!url || !url.startsWith('http')) return false
  
  // Verificar que no sea una página de YouTube
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    return false
  }
  
  // Verificar que sea un URL de Google Video u otro servicio de descarga directa
  const validDomains = [
    'googlevideo.com',
    'rr1---sn-',
    'rr2---sn-', 
    'rr3---sn-',
    'rr4---sn-',
    'rr5---sn-',
    'videoplayback'
  ]
  
  return validDomains.some(domain => url.includes(domain))
}

export async function POST(request: NextRequest) {
  try {
    const { url, filename, quality, isAudio, isCombined = false, video_url, audio_url } = await request.json()

    console.log('🔧 [Proxy] Solicitud recibida:', { 
      url: url?.substring(0, 100), 
      filename, 
      quality, 
      isAudio, 
      isCombined,
      hasVideoUrl: !!video_url,
      hasAudioUrl: !!audio_url
    })

    // ✅ MANEJAR COMBINACIÓN DE AUDIO Y VIDEO (nueva estructura)
    if (isCombined && video_url && audio_url) {
      console.log('🎵 [Proxy] Iniciando combinación de audio y video...')
      // ✅ VALIDAR URLs ANTES DE PROCESAR
      if (!isValidDownloadUrl(video_url)) {
        return NextResponse.json({
          error: 'URL de video inválida para descarga directa'
        }, { status: 400 })
      }
      if (!isValidDownloadUrl(audio_url)) {
        return NextResponse.json({
          error: 'URL de audio inválida para descarga directa'  
        }, { status: 400 })
      }
      return await handleCombinedDownload(video_url, audio_url, filename, quality)
    }

    // 🔥 MANEJAR DESCARGA COMBINADA (estructura antigua - para compatibilidad)
    if (isCombined && url) {
      console.log('🔄 [Proxy] Descarga combinada (estructura antigua)...')
      return await handleCombinedDownloadBase64(url, filename)
    }

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // ✅ VALIDAR URL ANTES DE DESCARGAR
    if (!isValidDownloadUrl(url)) {
      console.error('❌ [Proxy] URL inválida para descarga directa:', url.substring(0, 200))
      return NextResponse.json({
        error: 'URL inválida para descarga directa. Esta parece ser una página web, no un archivo de video/audio.'
      }, { status: 400 })
    }

    console.log('🔧 [Proxy] Descargando desde:', url.substring(0, 100) + '...')
    console.log('📋 [Proxy] Parámetros:', { filename, quality, isAudio })

    // Detectar tipo de contenido basado en parámetros y URL
    const detectedIsAudio = isAudio || 
                           url.includes('mime=audio') || 
                           url.includes('m4a') || 
                           url.includes('webm') || 
                           url.includes('audio') ||
                           quality === 'audio'
    
    const detectedIsVideo = !detectedIsAudio && (
                           url.includes('mime=video') || 
                           url.includes('mp4') || 
                           url.includes('video') ||
                           quality !== undefined
                         )

    // ✅ CONFIGURACIÓN MEJORADA: Timeouts extendidos para videos grandes
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.log('⏰ [Proxy] Timeout alcanzado (4 minutos), abortando...')
      controller.abort()
    }, DOWNLOAD_TIMEOUT)

    try {
      // ✅ FETCH MEJORADO con timeouts extendidos
      const fetchOptions: RequestInit = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': detectedIsAudio ? 'audio/*' : detectedIsVideo ? 'video/*,*/*' : '*/*',
          'Accept-Encoding': 'identity',
          'Range': 'bytes=0-',
          'Referer': 'https://www.youtube.com/',
          'Origin': 'https://www.youtube.com',
          'Sec-Fetch-Dest': detectedIsAudio ? 'audio' : detectedIsVideo ? 'video' : 'empty',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
        signal: controller.signal,
      }

      // Usar fetch con retry en caso de error
      let response: Response
      let retries = 3 // ✅ Aumentado a 3 reintentos
      
      while (retries >= 0) {
        try {
          console.log(`🔄 [Proxy] Intento ${3 - retries + 1} de 3`)
          response = await fetch(url, fetchOptions)
          
          // ✅ VERIFICAR CONTENT-TYPE PARA EVITAR DESCARGAR HTML
          const contentType = response.headers.get('content-type') || ''
          if (contentType.includes('text/html') || contentType.includes('application/json')) {
            console.error('❌ [Proxy] La respuesta es HTML/JSON, no un archivo multimedia')
            throw new Error('El servidor devolvió una página web en lugar de un archivo multimedia')
          }
          
          break
        } catch (fetchError: any) {
          if (retries === 0) throw fetchError
          console.log(`🔄 [Proxy] Reintentando... (${retries} intentos restantes)`)
          retries--
          // ✅ Esperar 2 segundos antes del reintento (más tiempo)
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }

      clearTimeout(timeoutId)

      if (!response!.ok) {
        console.error('❌ [Proxy] Error en fetch:', response!.status, response!.statusText)
        return NextResponse.json({
          error: `Failed to download file: ${response!.status} ${response!.statusText}`
        }, { status: response!.status })
      }

      // Obtener blob con manejo de progreso
      console.log('📥 [Proxy] Descargando contenido... (esto puede tomar varios minutos para videos grandes)')
      const blob = await response!.blob()

      if (blob.size === 0) {
        return NextResponse.json({ error: 'Empty file received' }, { status: 500 })
      }

      // ✅ VERIFICAR QUE EL ARCHIVO NO SEA HTML
      const firstBytes = await blob.slice(0, 50).text()
      if (firstBytes.trim().startsWith('<!DOCTYPE') || firstBytes.trim().startsWith('<html')) {
        console.error('❌ [Proxy] El archivo descargado es HTML, no multimedia')
        return NextResponse.json({
          error: 'El servidor devolvió una página HTML en lugar de un archivo multimedia. La URL puede haber expirado.'
        }, { status: 400 })
      }

      console.log(`✅ [Proxy] Archivo descargado: ${(blob.size / (1024 * 1024)).toFixed(2)} MB (${detectedIsAudio ? 'AUDIO' : detectedIsVideo ? 'VIDEO' : 'FILE'})`)

      // Detectar tipo de contenido y extensión
      let contentType = blob.type
      let fileExtension = 'mp4'
      
      if (!contentType || contentType === 'application/octet-stream') {
        if (detectedIsAudio) {
          contentType = 'audio/mp4'
          fileExtension = url.includes('m4a') ? 'm4a' : 'mp3'
        } else if (detectedIsVideo) {
          contentType = 'video/mp4'
          fileExtension = 'mp4'
        } else {
          contentType = 'application/octet-stream'
        }
      }

      // Determinar extensión basada en el tipo de contenido
      if (contentType.includes('audio/mp4') || contentType.includes('audio/m4a')) {
        fileExtension = 'm4a'
      } else if (contentType.includes('audio/mpeg')) {
        fileExtension = 'mp3'
      } else if (contentType.includes('video/mp4')) {
        fileExtension = 'mp4'
      } else if (contentType.includes('video/webm')) {
        fileExtension = 'webm'
      }

      // Crear nombre de archivo por defecto si no se proporciona
      let finalFilename = filename
      if (!finalFilename) {
        const timestamp = Date.now()
        if (detectedIsAudio) {
          finalFilename = `youtube_audio_${timestamp}.${fileExtension}`
        } else if (quality) {
          finalFilename = `youtube_${quality}_${timestamp}.${fileExtension}`
        } else {
          finalFilename = `youtube_download_${timestamp}.${fileExtension}`
        }
      }

      // Asegurar que el nombre de archivo tenga la extensión correcta
      if (!finalFilename.includes('.')) {
        finalFilename += `.${fileExtension}`
      }

      // Crear respuesta con el archivo
      return new NextResponse(blob, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${finalFilename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Length': blob.size.toString(),
          'X-File-Size': blob.size.toString(),
          'X-File-Type': detectedIsAudio ? 'audio' : detectedIsVideo ? 'video' : 'file',
          'X-Download-Time': 'extended', // ✅ Indicar que usó timeout extendido
          'X-Url-Validated': 'true' // ✅ Confirmar que la URL pasó validación
        }
      })

    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      console.error('❌ [Proxy] Fetch error:', fetchError)
      
      // ✅ MANEJO ESPECÍFICO DE TIMEOUT CON MENSAJES MEJORADOS
      if (fetchError.name === 'AbortError' || fetchError.code === 'UND_ERR_CONNECT_TIMEOUT') {
        return NextResponse.json({
          error: 'Timeout: La descarga tomó más de 4 minutos. Para videos grandes (>90MB) recomiendo: 1) Usar WiFi, 2) Intentar calidad 720p o 480p, 3) Reintentar más tarde.'
        }, { status: 408 })
      }
      
      // ✅ MANEJO DE HTML/JSON INESPERADO
      if (fetchError.message.includes('HTML') || fetchError.message.includes('JSON') || fetchError.message.includes('página web')) {
        return NextResponse.json({
          error: fetchError.message
        }, { status: 400 })
      }
      
      // ✅ MANEJO DE OTROS ERRORES DE RED
      if (fetchError.message.includes('fetch failed') || fetchError.message.includes('network')) {
        return NextResponse.json({
          error: 'Error de red: No se pudo conectar al servidor. Verifica tu conexión a internet.'
        }, { status: 502 })
      }

      // ✅ ERROR DE SSL/CERTIFICADO
      if (fetchError.message.includes('certificate') || fetchError.message.includes('SSL')) {
        return NextResponse.json({
          error: 'Error de seguridad: No se pudo establecer conexión segura. Intenta nuevamente.'
        }, { status: 526 })
      }

      throw fetchError
    }

  } catch (error: any) {
    console.error('💥 [Proxy] Download error:', error)
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}

// ✅ FUNCIÓN PARA MANEJAR COMBINACIÓN DE AUDIO Y VIDEO (nueva estructura)
async function handleCombinedDownload(videoUrl: string, audioUrl: string, filename: string, quality?: string) {
  try {
    console.log('🎵 [Proxy] Combinando video y audio...')
    console.log('📹 Video URL:', videoUrl.substring(0, 100) + '...')
    console.log('🎶 Audio URL:', audioUrl.substring(0, 100) + '...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.log('⏰ [Proxy] Timeout en combinación (5 minutos), abortando...')
      controller.abort()
    }, COMBINE_TIMEOUT)

    try {
      // ✅ ESTRATEGIA MEJORADA: Descargar en paralelo
      console.log('📥 [Proxy] Descargando video y audio en paralelo...')
      
      const downloadPromises = [
        // Descargar video
        fetch(videoUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.youtube.com/',
            'Origin': 'https://www.youtube.com',
            'Accept': 'video/*,*/*',
            'Accept-Encoding': 'identity',
          },
          signal: controller.signal,
        }),
        
        // Descargar audio
        fetch(audioUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.youtube.com/',
            'Origin': 'https://www.youtube.com',
            'Accept': 'audio/*,*/*',
            'Accept-Encoding': 'identity',
          },
          signal: controller.signal,
        })
      ]

      const [videoResponse, audioResponse] = await Promise.all(downloadPromises)
      
      if (!videoResponse.ok) {
        throw new Error(`Error descargando video: ${videoResponse.status} ${videoResponse.statusText}`)
      }
      
      if (!audioResponse.ok) {
        throw new Error(`Error descargando audio: ${audioResponse.status} ${audioResponse.statusText}`)
      }
      
      const [videoBlob, audioBlob] = await Promise.all([
        videoResponse.blob(),
        audioResponse.blob()
      ])
      
      clearTimeout(timeoutId)
      
      console.log(`✅ [Proxy] Archivos descargados - Video: ${(videoBlob.size / (1024 * 1024)).toFixed(2)}MB, Audio: ${(audioBlob.size / (1024 * 1024)).toFixed(2)}MB`)
      
      // ✅ VERIFICAR QUE LOS ARCHIVOS NO SEAN HTML
      const videoFirstChunk = await videoBlob.slice(0, 50).text()
      const audioFirstChunk = await audioBlob.slice(0, 50).text()
      
      if (videoFirstChunk.trim().startsWith('<!DOCTYPE') || audioFirstChunk.trim().startsWith('<!DOCTYPE')) {
        throw new Error('Uno de los archivos descargados es HTML en lugar de multimedia')
      }
      
      // ✅ ESTRATEGIA: Por ahora, priorizamos el video (sin combinación real)
      let finalBlob = videoBlob
      let finalContentType = 'video/mp4'
      let combinedSuccess = false
      
      // Si ambos archivos son razonables, podríamos intentar combinación
      if (videoBlob.size < 50 * 1024 * 1024 && audioBlob.size < 10 * 1024 * 1024) {
        console.log('🔄 [Proxy] Archivos de tamaño razonable para procesamiento')
        try {
          // En una implementación real, aquí usarías ffmpeg.wasm o un servicio externo
          // Por ahora, usamos solo el video pero indicamos que hay audio disponible
          finalBlob = videoBlob
          combinedSuccess = false
          console.log('⚠️ [Proxy] Combinación real requiere ffmpeg, usando solo video con indicación de audio disponible')
        } catch (combineError) {
          console.log('⚠️ [Proxy] Error en combinación, usando video:', combineError)
          finalBlob = videoBlob
          combinedSuccess = false
        }
      } else {
        console.log('📋 [Proxy] Archivos muy grandes, usando solo video con indicación')
        finalBlob = videoBlob
        combinedSuccess = false
      }
      
      // Crear nombre de archivo final
      let finalFilename = filename || `youtube_${quality || 'combined'}_${Date.now()}.mp4`
      if (!finalFilename.endsWith('.mp4')) {
        finalFilename += '.mp4'
      }

      // Crear respuesta
      return new NextResponse(finalBlob, {
        status: 200,
        headers: {
          'Content-Type': finalContentType,
          'Content-Disposition': `attachment; filename="${finalFilename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Length': finalBlob.size.toString(),
          'X-File-Size': finalBlob.size.toString(),
          'X-File-Type': 'video',
          'X-Combined': combinedSuccess ? 'true' : 'false',
          'X-Video-Size': videoBlob.size.toString(),
          'X-Audio-Size': audioBlob.size.toString(),
          'X-Combined-Status': combinedSuccess ? 'success' : 'video_only_with_audio_available',
          'X-Audio-Download-Url': audioUrl, // ✅ Proporcionar URL de audio para descarga separada
          'X-Timeouts-Used': 'extended',
          'X-Url-Validated': 'true'
        }
      })
      
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      if (fetchError.name === 'AbortError') {
        throw new Error('Timeout: La combinación tomó más de 5 minutos. Intenta con una calidad más baja (720p o 480p).')
      }
      throw fetchError
    }
    
  } catch (error: any) {
    console.error('💥 [Proxy] Error en combinación:', error)
    return NextResponse.json({
      error: 'Error combinando audio y video: ' + (error instanceof Error ? error.message : 'Unknown error'),
      details: 'Se descargó solo el video sin audio. Puedes descargar el audio por separado.',
      fallback_url: videoUrl // ✅ Proporcionar URL de fallback
    }, { status: 500 })
  }
}

// ✅ FUNCIÓN PARA MANEJAR DESCARGA COMBINADA (estructura antigua - base64)
async function handleCombinedDownloadBase64(fileContent: string, filename: string) {
  try {
    console.log('🎯 [Proxy] Procesando archivo combinado base64...')
    
    if (!fileContent) {
      return NextResponse.json({ error: 'No file content provided' }, { status: 400 })
    }

    // Verificar si es base64 válido
    if (!fileContent.startsWith('data:')) {
      // Si no es base64, validar si es una URL válida
      if (isValidDownloadUrl(fileContent)) {
        console.log('🔄 [Proxy] Redirigiendo a descarga normal...')
        return NextResponse.json({
          redirect: true,
          url: fileContent,
          filename: filename
        }, { status: 200 })
      } else {
        return NextResponse.json({
          error: 'URL inválida para descarga directa'
        }, { status: 400 })
      }
    }

    // Decodificar el contenido base64
    const base64Data = fileContent.replace(/^data:video\/mp4;base64,/, '')
    const fileBuffer = Buffer.from(base64Data, 'base64')
    
    if (fileBuffer.length === 0) {
      return NextResponse.json({ error: 'Empty file content' }, { status: 500 })
    }

    console.log(`✅ [Proxy] Archivo combinado procesado: ${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB`)

    // Crear nombre de archivo por defecto si no se proporciona
    let finalFilename = filename || `youtube_combined_${Date.now()}.mp4`

    // Asegurar extensión .mp4
    if (!finalFilename.endsWith('.mp4')) {
      finalFilename += '.mp4'
    }

    // Crear respuesta con el archivo
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${finalFilename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': fileBuffer.length.toString(),
        'X-File-Size': fileBuffer.length.toString(),
        'X-File-Type': 'video',
        'X-Combined': 'true'
      }
    })

  } catch (error: any) {
    console.error('💥 [Proxy] Error procesando archivo combinado:', error)
    return NextResponse.json({
      error: 'Error processing combined file: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}