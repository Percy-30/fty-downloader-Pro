// app/robots.txt/route.ts
export async function GET() {
  const robots = `User-agent: *
Allow: /
Allow: /_next/static/
Allow: /_next/image/
Disallow: /api/
Disallow: /_next/data/
Disallow: /private/

# Sitemaps
Sitemap: https://www.ftydownloader.com/sitemap.xml`

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}