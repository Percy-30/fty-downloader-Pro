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
          { key: 'X-Content-Type-Options', value: 'nosniff' }
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
  // 🚫 ELIMINA COMPLETAMENTE esta sección
  // async redirects() {
  //   return []
  // },
}

export default nextConfig