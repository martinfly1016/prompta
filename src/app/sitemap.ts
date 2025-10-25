import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  try {
    const [categories, prompts] = await Promise.all([
      prisma.category.findMany(),
      prisma.prompt.findMany({ where: { isPublished: true } }),
    ])

    const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: 'weekly' as const,
    }))

    const promptUrls: MetadataRoute.Sitemap = prompts.map((prompt) => ({
      url: `${baseUrl}/prompt/${prompt.id}`,
      lastModified: prompt.updatedAt,
      changeFrequency: 'daily' as const,
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
    ]
  } catch (error) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ]
  }
}
