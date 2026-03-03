import type { MetadataRoute } from 'next'
import {
  getTools,
  getCategories,
  getPromptSlugs,
  getGuideSlugs,
  getTagSlugs,
  getAllPromptsPaginated,
  getPromptsByTagPaginated,
} from '@/lib/data'

const BASE = 'https://www.prompta.jp'
const PER_PAGE = 12

function pageUrls(basePath: string, totalPages: number, now: Date, freq: 'daily' | 'weekly', priority: number): MetadataRoute.Sitemap {
  if (totalPages <= 1) return []
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${basePath}?page=${i + 2}`,
    lastModified: now,
    changeFrequency: freq,
    priority: Math.max(0, priority - 0.1),
  } as MetadataRoute.Sitemap[number]))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, categories, promptSlugs, guideSlugs, tagSlugs, allPaginated] = await Promise.all([
    getTools(),
    getCategories(),
    getPromptSlugs(),
    getGuideSlugs(),
    getTagSlugs(),
    getAllPromptsPaginated(1),
  ])

  // Get tag page counts in parallel
  const tagResults = await Promise.all(
    tagSlugs.map(tag => getPromptsByTagPaginated(tag, 1))
  )

  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    // Static pages
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/prompts`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // All prompts paginated pages
    ...pageUrls(`${BASE}/prompts`, allPaginated.totalPages, now, 'daily', 0.9),

    // Tool pages + paginated
    ...tools.flatMap(tool => [
      { url: `${BASE}/tools/${tool.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
      ...pageUrls(`${BASE}/tools/${tool.slug}`, Math.ceil(tool.promptCount / PER_PAGE), now, 'weekly', 0.8),
    ]),

    // Category pages + paginated
    ...categories.flatMap(cat => [
      { url: `${BASE}/prompts/${cat.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
      ...pageUrls(`${BASE}/prompts/${cat.slug}`, Math.ceil(cat.promptCount / PER_PAGE), now, 'weekly', 0.8),
    ]),

    // Guide pages
    ...guideSlugs.map(slug => ({
      url: `${BASE}/guides/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Tag pages + paginated
    ...tagSlugs.flatMap((tag, i) => [
      { url: `${BASE}/tag/${encodeURIComponent(tag)}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 },
      ...pageUrls(`${BASE}/tag/${encodeURIComponent(tag)}`, tagResults[i].totalPages, now, 'weekly', 0.6),
    ]),

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
