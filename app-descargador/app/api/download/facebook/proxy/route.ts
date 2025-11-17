import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url, filename } = await request.json();

    console.log('🔧 [Facebook Proxy] Solicitud recibida:', {
      url: url?.substring(0, 100) + '...',
      filename
    });

    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'URL de Facebook inválida' },
        { status: 400 }
      );
    }

    // Headers específicos para Facebook
    const facebookHeaders = {
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'identity',
      'Range': 'bytes=0-',
      'Sec-Fetch-Dest': 'video',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Referer': 'https://www.facebook.com/',
      'Origin': 'https://www.facebook.com'
    };

    console.log('⬇️ [Facebook Proxy] Iniciando descarga desde Facebook...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 segundos timeout

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: facebookHeaders,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('❌ [Facebook Proxy] Error en respuesta:', response.status, response.statusText);
        return NextResponse.json(
          { error: `Error ${response.status}: ${response.statusText}` },
          { status: response.status }
        );
      }

      // Verificar que sea un archivo de video/audio
      const contentType = response.headers.get('content-type') || '';
      const contentLength = response.headers.get('content-length');
      
      console.log('📦 [Facebook Proxy] Headers recibidos:', {
        contentType,
        contentLength,
        status: response.status
      });

      // Validar tipos de contenido aceptados
      const validContentTypes = [
        'video/mp4', 'video/mp4', 'audio/mp4', 'audio/m4a', 
        'application/octet-stream', 'binary/octet-stream'
      ];
      
      const isValidContentType = validContentTypes.some(type => 
        contentType.includes(type)
      );

      if (!isValidContentType && !contentType.includes('video') && !contentType.includes('audio')) {
        console.warn('⚠️ [Facebook Proxy] Content-Type inesperado:', contentType);
        // Continuamos de todas formas, Facebook a veces usa content-types extraños
      }

      const arrayBuffer = await response.arrayBuffer();
      
      if (arrayBuffer.byteLength === 0) {
        throw new Error('El archivo recibido está vacío');
      }

      console.log('✅ [Facebook Proxy] Descarga exitosa:', {
        size: arrayBuffer.byteLength,
        contentType
      });

      // Determinar content-type apropiado para la respuesta
      let responseContentType = contentType;
      if (filename.endsWith('.m4a')) {
        responseContentType = 'audio/mp4';
      } else if (filename.endsWith('.mp4')) {
        responseContentType = 'video/mp4';
      }

      // Crear respuesta con headers apropiados
      const headers = new Headers();
      headers.set('Content-Type', responseContentType);
      headers.set('Content-Length', arrayBuffer.byteLength.toString());
      headers.set('Content-Disposition', `attachment; filename="${filename}"`);
      headers.set('Cache-Control', 'no-cache');
      headers.set('X-Content-Type-Options', 'nosniff');

      return new NextResponse(arrayBuffer, {
        status: 200,
        headers
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('⏰ [Facebook Proxy] Timeout en descarga');
        return NextResponse.json(
          { error: 'Timeout: La descarga tardó demasiado en responder' },
          { status: 408 }
        );
      }
      
      console.error('❌ [Facebook Proxy] Error de fetch:', fetchError);
      throw fetchError;
    }

  } catch (error: any) {
    console.error('💥 [Facebook Proxy] Error general:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + error.message },
      { status: 500 }
    );
  }
}