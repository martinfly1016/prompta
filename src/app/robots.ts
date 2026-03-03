import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/categories', '/api/tags'],
        disallow: ['/admin/', '/api/', '/api/auth/', '/api/image-proxy'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/auth/'],
      },
    ],
    sitemap: 'https://www.prompta.jp/sitemap.xml',
  }
}
