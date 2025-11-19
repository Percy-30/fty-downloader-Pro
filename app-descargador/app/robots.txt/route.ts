// app/robots.txt/route.ts
export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Sitemaps
Sitemap: https://fty-downloader-pro.vercel.app/sitemap.xml`

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}