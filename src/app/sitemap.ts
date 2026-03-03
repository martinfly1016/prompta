import type { MetadataRoute } from 'next'
import {
  getToolSlugs,
  getCategorySlugs,
  getPromptSlugs,
  getGuideSlugs,
  getTagSlugs,
} from '@/lib/data'

const BASE = 'https://www.prompta.jp'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [toolSlugs, categorySlugs, promptSlugs, guideSlugs, tagSlugs] = await Promise.all([
    getToolSlugs(),
    getCategorySlugs(),
    getPromptSlugs(),
    getGuideSlugs(),
    getTagSlugs(),
  ])

  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    // Static pages
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/prompts`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Tool pages
    ...toolSlugs.map(slug => ({
      url: `${BASE}/tools/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Category pages
    ...categorySlugs.map(slug => ({
      url: `${BASE}/prompts/${slug}`,
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

    // Tag pages
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
