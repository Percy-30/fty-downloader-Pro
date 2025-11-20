// app/robots.txt/route.ts
export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Sitemaps
Sitemap: https://ftydownloader.com/sitemap.xml`  // 🆕 NUEVO DOMINIO

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}