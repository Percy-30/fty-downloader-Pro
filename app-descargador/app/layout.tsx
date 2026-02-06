// app/layout.tsx - ARCHIVO COMPLETO ACTUALIZADO
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AdManager from '@/components/AdManager'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ftydownloader.com'),
  // 🎯 TITLE PERFECTO - Enfocado en Redes Sociales (Facebook/TikTok) para evitar bloqueos
  title: 'FTY Downloader - Descargar Videos de Facebook HD y TikTok Sin Marca de Agua ✅ Gratis',

  description:
    '🚀 La herramienta más rápida para descargar videos de Facebook en HD y TikTok sin marca de agua. FTY Downloader: 100% gratis, seguro y en alta calidad. MP4 y MP3.',
  keywords: `
descargar videos tiktok sin marca de agua, facebook downloader hd, descargar videos facebook, 
tiktok downloader no watermark, descargar videos de tiktok gratis, bajar videos de facebook,
convertir video a mp3, descargar mp4 gratis, bajar videos online, downloader online
`,
  authors: [{ name: 'ATP DEV', url: 'https://www.ftydownloader.com/' }],
  creator: 'ATP DEV',
  publisher: 'FTY Downloader',
  manifest: '/manifest.json',
  openGraph: {
    title: 'FTY Downloader - Descargar Videos de Facebook HD y TikTok Sin Marca de Agua ✅ Gratis',
    description:
      'La herramienta más rápida para descargar videos de Facebook en HD y TikTok sin marca de agua. 100% gratis, seguro y en alta calidad.', url: 'https://www.ftydownloader.com/',
    siteName: 'FTY Downloader',
    images: [
      {
        url: 'https://www.ftydownloader.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FTY Downloader - Descargar Videos de Facebook y TikTok',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FTY Downloader - Descargar Videos de Facebook HD y TikTok Sin Marca de Agua ✅ Gratis',
    description:
      'La herramienta más rápida para descargar videos de Facebook en HD y TikTok sin marca de agua. 100% gratis, seguro y en alta calidad.',
    images: ['https://www.ftydownloader.com/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/icon-192.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/icon-192.png',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Ezoic Privacy Scripts (Must load first) */}
        <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
        <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>

        {/* Ezoic Header Script */}
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `
          }}
        />

        {/* Ezoic Site Verification */}
        <meta name="ezoic-site-verification" content="wStjwIfmHCWL7mcvHPkYWJi6FeTviZ" />

        {/* Meta requerida por AdSense para verificar tu dominio (Mantener por ahora) */}
        <meta name="google-adsense-account" content="ca-pub-5414009811868137" />



        {/* Canonical URL para SEO */}
        <link rel="canonical" href="https://www.ftydownloader.com/" />

        {/* Meta tags MANUALES para asegurar que funcione */}
        <meta property="og:image" content="https://www.ftydownloader.com/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="FTY Downloader - Descargar Videos de Facebook y TikTok" />
        <meta property="og:image:type" content="image/png" />

        {/* Twitter Card Manual */}
        <meta name="twitter:image" content="https://www.ftydownloader.com/images/og-image.png" />



        {/* 🆕 SCHEMA MARKUP PARA ACELERAR INDEXACIÓN DE IMAGEN */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FTY Downloader Pro",
              "description": "Descarga videos y audios de redes sociales gratis, rápido y en alta calidad",
              "url": "https://www.ftydownloader.com/",
              "image": "https://www.ftydownloader.com/images/og-image.png",
              "screenshot": "https://www.ftydownloader.com/images/og-image.png",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "ATP DEV"
              }
            })
          }}
        />

        {/* 🆕 META ADICIONAL PARA BÚSQUEDAS */}
        <meta name="thumbnail" content="https://www.ftydownloader.com/images/og-image.png" />
        <link rel="image_src" href="https://www.ftydownloader.com/images/og-image.png" />
      </head>
      <body className={inter.className}>
        <AdManager />
        {children}
      </body>
    </html>
  )
}