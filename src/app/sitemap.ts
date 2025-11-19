export const dynamic = 'force-dynamic'
export const revalidate = 0

import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  // Return basic sitemap during build if database is unavailable
  const basicSitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  try {
    const [categories, prompts] = await Promise.all([
      prisma.category.findMany(),
      prisma.prompt.findMany({ where: { isPublished: true }, take: 10000 }),
    ])

    const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const promptUrls: MetadataRoute.Sitemap = prompts.map((prompt, idx) => ({
      url: `${baseUrl}/prompt/${prompt.id}`,
      lastModified: prompt.updatedAt,
      changeFrequency: 'daily' as const,
      priority: Math.max(0.5, 1 - (idx / prompts.length) * 0.5),
    }))

    // Extract unique tags from prompts
    const tagSet = new Set<string>()
    prompts.forEach(p => {
      if (p.tags) {
        try {
          const parsed = JSON.parse(p.tags)
          if (Array.isArray(parsed)) {
            parsed.forEach(tag => {
              if (typeof tag === 'string') tagSet.add(tag)
              else if (tag.name) tagSet.add(tag.name)
            })
          }
        } catch {}
      }
    })

    const tagUrls: MetadataRoute.Sitemap = Array.from(tagSet).map((tag) => ({
      url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      ...categoryUrls,
      ...promptUrls,
      ...tagUrls,
    ]
  } catch (error) {
    console.error('Failed to generate full sitemap:', error)
    return basicSitemap
  }
}
