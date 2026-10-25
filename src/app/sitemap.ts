import type { MetadataRoute } from 'next'
import {
  getToolSlugsWithLatestDate,
  getCategorySlugsWithLatestDate,
  getPromptSlugsWithDates,
  getGuideSlugsWithDates,
  getApprovedTagSlugsWithDates,
  getLatestPromptDate,
} from '@/lib/data'
import { REVALIDATE_LIST_SECONDS } from '@/lib/cache-policy'
import { isPromptIndexable, isSitemapPathAllowed, isTagIndexable } from '@/lib/seo/indexing-policy'

// Revalidate hourly so DB-driven URL additions (new Guide/Tag/Prompt rows)
// surface in sitemap.xml without waiting for the next Vercel deploy.
// Admin edits also call revalidatePath('/sitemap.xml').
export const revalidate = REVALIDATE_LIST_SECONDS

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

    // Interactive AI tools (not the brand-tool catalog) — high priority for SEO
    {
      url: `${BASE}/tools/height-difference-maker`,
      lastModified: latestDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE}/tools/personal-color-analysis`,
      lastModified: latestDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          ja: `${BASE}/tools/personal-color-analysis`,
          en: `${BASE}/en/tools/personal-color-analysis`,
        },
      },
    },
    {
      url: `${BASE}/en/tools/personal-color-analysis`,
      lastModified: latestDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          ja: `${BASE}/tools/personal-color-analysis`,
          en: `${BASE}/en/tools/personal-color-analysis`,
        },
      },
    },
    {
      url: `${BASE}/tools/hair-color-diagnosis`,
      lastModified: latestDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },

    // Personal color 4-season subpages (P0 SEO targets per
    // keyword-research-2026-05-17.md §D — KD 16-18, monthly volume
    // 600-900 each)
    {
      url: `${BASE}/tools/personal-color-analysis/spring`,
      lastModified: latestDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/tools/personal-color-analysis/summer`,
      lastModified: latestDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/tools/personal-color-analysis/autumn`,
      lastModified: latestDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/tools/personal-color-analysis/winter`,
      lastModified: latestDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // Operator pages required before advertising
    { url: `${BASE}/about`, lastModified: latestDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: latestDate, changeFrequency: 'yearly', priority: 0.4 },

    // Legal pages
    { url: `${BASE}/legal/privacy`, lastModified: latestDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/terms`, lastModified: latestDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/tokushoho`, lastModified: latestDate, changeFrequency: 'yearly', priority: 0.3 },

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

    // Tag pages — approved and indexable. noindex tags stay in the DB.
    ...tags.filter(t => isTagIndexable(t.slug, true)).map(t => ({
      url: `${BASE}/tag/${encodeURIComponent(t.slug)}`,
      lastModified: t.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),

    // Prompt detail pages — skip noindex slugs. Rows stay published.
    ...prompts.filter(p => isPromptIndexable(p.slug)).map(p => ({
      url: `${BASE}/prompt/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return routes.filter(route => {
    const pathname = route.url.startsWith(BASE) ? route.url.slice(BASE.length) : route.url
    return isSitemapPathAllowed(pathname)
  })
}
