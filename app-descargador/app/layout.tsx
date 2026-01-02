// app/layout.tsx - ARCHIVO COMPLETO ACTUALIZADO
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ftydownloader.com'),
  // 🎯 TITLE PERFECTO - Combina ambas ideas
  title: 'FTY Downloader Pro - Descargar Videos Facebook HD, YouTube, TikTok Gratis ✅ Alta Calidad',

  description:
    '🚀 Descarga videos de Facebook, YouTube y TikTok en Alta Calidad HD. FTY Downloader Pro: 100% gratis, rápido y seguro. ✅ Videos MP4, audio MP3, sin marca de agua. Compatible con PC y móviles.',
  keywords: `
descargar videos gratis, descargar videos de YouTube, youtube downloader,
descargar videos de TikTok, tiktok downloader, descargar videos de Facebook,
facebook downloader, convertir video a mp3, descargar mp4 gratis,
bajar videos online, descargar videos para celular, youtube mp4,
tiktok mp4, facebook mp4, downloader online, descargar videos sin marca de agua, descargar videos tiktok sin marca de agua
`,
  authors: [{ name: 'ATP DEV', url: 'https://www.ftydownloader.com/' }],
  creator: 'ATP DEV',
  publisher: 'FTY Downloader',
  manifest: '/manifest.json',
  openGraph: {
    title: 'FTY Downloader Pro - Descargar Videos Facebook HD, YouTube, TikTok Gratis ✅ Alta Calidad',
    description:
      'Descarga videos de Facebook, YouTube y TikTok en Alta Calidad HD. FTY Downloader Pro: 100% gratis, rápido y seguro.', url: 'https://www.ftydownloader.com/',
    siteName: 'FTY Downloader',
    images: [
      {
        url: 'https://www.ftydownloader.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FTY Downloader Pro - Descargar Videos de Facebook, YouTube, TikTok',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FTY Downloader Pro - Descargar Videos Facebook HD, YouTube, TikTok Gratis ✅ Alta Calidad',
    description:
      'Descarga videos de Facebook, YouTube y TikTok en Alta Calidad HD. FTY Downloader Pro: 100% gratis, rápido y seguro.',
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
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Meta requerida por AdSense para verificar tu dominio */}
        <meta name="google-adsense-account" content="ca-pub-5414009811868137" />

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5414009811868137"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />

        {/* Canonical URL para SEO */}
        <link rel="canonical" href="https://www.ftydownloader.com/" />

        {/* Meta tags MANUALES para asegurar que funcione */}
        <meta property="og:image" content="https://www.ftydownloader.com/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="FTY Downloader Pro - Descargar Videos de Facebook, YouTube, TikTok" />
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
              "description": "Descarga videos y audios de Facebook, YouTube y TikTok gratis, rápido y en alta calidad",
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}