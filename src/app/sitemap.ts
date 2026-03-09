import type { MetadataRoute } from 'next'
import {
  getTools,
  getCategories,
  getPromptSlugs,
  getGuideSlugs,
  getApprovedTagSlugs,
} from '@/lib/data'

const BASE = 'https://www.prompta.jp'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, categories, promptSlugs, guideSlugs, tagSlugs] = await Promise.all([
    getTools(),
    getCategories(),
    getPromptSlugs(),
    getGuideSlugs(),
    getApprovedTagSlugs(),
  ])

  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    // Static pages
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/prompts`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Tool pages
    ...tools.map(tool => ({
      url: `${BASE}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Category pages
    ...categories.map(cat => ({
      url: `${BASE}/prompts/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Guide pages
    ...guideSlugs.map(slug => ({
      url: `${BASE}/guides/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Tag pages (approved only)
    ...tagSlugs.map(tag => ({
      url: `${BASE}/tag/${encodeURIComponent(tag)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),

    // Prompt detail pages
    ...promptSlugs.map(slug => ({
      url: `${BASE}/prompt/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return routes
}
