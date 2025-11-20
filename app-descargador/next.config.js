/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PYTHON_BACKEND_URL: process.env.PYTHON_BACKEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  serverExternalPackages: ['yt-dlp-wrap'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ],
      },
      // Headers específicos para sitemap y robots
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // REDIRECCIONES ACTUALIZADAS para tu nuevo dominio
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ftydownloader.com',
          },
        ],
        destination: 'https://ftydownloader.com/:path*',
        permanent: true,
      },
      // Redirigir desde el dominio viejo de Vercel al nuevo
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fty-downloader-pro.vercel.app',
          },
        ],
        destination: 'https://ftydownloader.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.fty-downloader-pro.vercel.app',
          },
        ],
        destination: 'https://ftydownloader.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig