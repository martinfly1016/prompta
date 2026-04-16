import type { MetadataRoute } from 'next'
import {
  getToolSlugsWithLatestDate,
  getCategorySlugsWithLatestDate,
  getPromptSlugsWithDates,
  getGuideSlugsWithDates,
  getApprovedTagSlugsWithDates,
  getLatestPromptDate,
} from '@/lib/data'

// Revalidate hourly so DB-driven URL additions (new Guide/Tag/Prompt rows)
// surface in sitemap.xml without waiting for the next Vercel deploy.
export const revalidate = 3600

const BASE = 'https://www.prompta.jp'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, categories, prompts, guides, tags, latestDate] = await Promise.all([
    getToolSlugsWithLatestDate(),
    getCategorySlugsWithLatestDate(),
    getPromptSlugsWithDates(),
    getGuideSlugsWithDates(),
    getApprovedTagSlugsWithDates(),
    getLatestPromptDate(),
  ])

  const routes: MetadataRoute.Sitemap = [
    // Hub pages — use latest prompt date as freshness signal
    { url: BASE, lastModified: latestDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: latestDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/prompts`, lastModified: latestDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: guides[0]?.updatedAt ?? latestDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/glossary`, lastModified: latestDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare`, lastModified: latestDate, changeFrequency: 'monthly', priority: 0.8 },

    // Tool pages — lastModified = latest prompt in that tool
    ...tools.map(t => ({
      url: `${BASE}/tools/${t.slug}`,
      lastModified: t.lastModified ?? latestDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Category pages — lastModified = latest prompt in that category
    ...categories.map(c => ({
      url: `${BASE}/prompts/${c.slug}`,
      lastModified: c.lastModified ?? latestDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Guide pages — use their own updatedAt
    ...guides.map(g => ({
      url: `${BASE}/guides/${g.slug}`,
      lastModified: g.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Tag pages (approved only) — use their own updatedAt
    ...tags.map(t => ({
      url: `${BASE}/tag/${encodeURIComponent(t.slug)}`,
      lastModified: t.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),

    // Prompt detail pages — use their own updatedAt
    ...prompts.map(p => ({
      url: `${BASE}/prompt/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return routes
}
