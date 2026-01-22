import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/content/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.ftydownloader.com'

    // Rutas estáticas principales
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/faq',
        '/blog',
        '/tools',
        '/tools/facebook',
        '/tools/tiktok',
        '/tools/youtube',
        '/legal/privacidad',
        '/legal/terminos',
        '/legal/cookies',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Rutas del blog dinámicas
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...blogRoutes]
}
