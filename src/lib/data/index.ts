/**
 * Data access layer with mock data fallback.
 *
 * Each function tries the database first. If the DB is unavailable
 * or the new tables don't exist yet, it falls back to mock data so
 * the site keeps working during the migration period.
 */

import {
  TOOLS as MOCK_TOOLS,
  CATEGORIES as MOCK_CATEGORIES,
  GUIDES as MOCK_GUIDES,
  getToolBySlug as mockGetToolBySlug,
  getCategoryBySlug as mockGetCategoryBySlug,
} from '@/lib/constants'
import {
  MOCK_PROMPTS,
  getFeaturedPrompts as mockGetFeatured,
  getLatestPrompts as mockGetLatest,
  getPromptsByTool as mockGetByTool,
  getPromptsByCategory as mockGetByCategory,
  getPromptBySlug as mockGetPromptBySlug,
  getRelatedPrompts as mockGetRelated,
  getPromptsByTag as mockGetByTag,
  getToolPromptCounts as mockToolCounts,
  getCategoryPromptCounts as mockCategoryCounts,
} from '@/lib/mock-data'
import type { MockPrompt } from '@/lib/mock-data'

import { unstable_cache } from 'next/cache'
import {
  CACHE_TAG_CATEGORIES,
  CACHE_TAG_PROMPTS,
  CACHE_TAG_TAGS,
  PROMPTS_PER_PAGE,
  REVALIDATE_DETAIL_SECONDS,
  REVALIDATE_LIST_SECONDS,
} from '@/lib/cache-policy'
import * as dbTools from './tools'
import * as dbCategories from './categories'
import * as dbPrompts from './prompts'
import * as dbTags from './tags'
import * as dbGuides from './guides'

interface CacheOpts {
  key: string[]
  tags: readonly string[]
  revalidate: number
}

const LIST_CACHE = {
  tags: [CACHE_TAG_PROMPTS],
  revalidate: REVALIDATE_LIST_SECONDS,
} as const

const CATEGORY_CACHE = {
  tags: [CACHE_TAG_CATEGORIES, CACHE_TAG_PROMPTS],
  revalidate: REVALIDATE_LIST_SECONDS,
} as const

const TAG_CACHE = {
  tags: [CACHE_TAG_TAGS, CACHE_TAG_PROMPTS],
  revalidate: REVALIDATE_LIST_SECONDS,
} as const

// ---------- helpers ----------

// A normalized shape that pages can consume regardless of source.
export interface NormalizedTool {
  slug: string
  name: string
  nameJa: string
  description: string
  icon: string
  color: string
  promptCount: number
}

export interface NormalizedCategory {
  slug: string
  name: string
  nameEn: string
  description: string
  icon: string
  promptCount: number
}

export interface NormalizedPrompt {
  id: string
  slug: string
  title: string
  description: string
  content: string
  toolSlug: string | null
  toolName: string | null
  toolColor: string | null
  toolIcon: string | null
  categorySlug: string
  categoryName: string
  categoryIcon: string | null
  tags: string[]
  images: { url: string; alt: string | null; width: number | null; height: number | null; imageType: string | null }[]
  sampleBeforeUrl: string | null
  sampleAfterUrl: string | null
  isFeatured: boolean
  viewCount: number
  copyCount: number
  createdAt: string
  updatedAt: string
}

export interface NormalizedGuide {
  slug: string
  title: string
  description: string
  content?: string
  targetKeyword?: string | null
  createdAt?: string
}

function normalizeMockPrompt(p: MockPrompt): NormalizedPrompt {
  const tool = mockGetToolBySlug(p.toolSlug)
  const cat = mockGetCategoryBySlug(p.categorySlug)
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    content: p.content,
    toolSlug: p.toolSlug,
    toolName: tool?.name ?? null,
    toolColor: tool?.color ?? null,
    toolIcon: tool?.icon ?? null,
    categorySlug: p.categorySlug,
    categoryName: cat?.name ?? p.categorySlug,
    categoryIcon: cat?.icon ?? null,
    tags: p.tags,
    images: p.images.map(url => ({ url, alt: null, width: null, height: null, imageType: null })),
    sampleBeforeUrl: null,
    sampleAfterUrl: null,
    isFeatured: p.isFeatured,
    viewCount: p.viewCount,
    copyCount: p.copyCount,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }
}

function normalizeMockGuide(g: typeof MOCK_GUIDES[number]): NormalizedGuide {
  return {
    slug: g.slug,
    title: g.title,
    description: g.description,
    targetKeyword: g.targetKeyword,
  }
}

function mergeGuides(
  dbGuides: NormalizedGuide[],
  mockGuides: typeof MOCK_GUIDES = MOCK_GUIDES,
): NormalizedGuide[] {
  const merged = new Map<string, NormalizedGuide>()
  for (const guide of mockGuides) {
    merged.set(guide.slug, normalizeMockGuide(guide))
  }
  for (const guide of dbGuides) {
    merged.set(guide.slug, guide)
  }
  return Array.from(merged.values())
}

function mergeGuideSlugs(dbSlugs: string[], mockGuides: typeof MOCK_GUIDES = MOCK_GUIDES): string[] {
  return Array.from(new Set([...dbSlugs, ...mockGuides.map(g => g.slug)]))
}

function mergeGuideDates(
  dbGuides: { slug: string; updatedAt: Date }[],
  mockGuides: typeof MOCK_GUIDES = MOCK_GUIDES,
): { slug: string; updatedAt: Date }[] {
  const merged = new Map<string, Date>()
  for (const guide of mockGuides) {
    merged.set(guide.slug, new Date())
  }
  for (const guide of dbGuides) {
    merged.set(guide.slug, guide.updatedAt)
  }
  return Array.from(merged.entries()).map(([slug, updatedAt]) => ({ slug, updatedAt }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeDbPrompt(p: any): NormalizedPrompt {
  return {
    id: p.id,
    slug: p.slug ?? p.id,
    title: p.title,
    description: p.description,
    content: p.content,
    toolSlug: p.tool?.slug ?? null,
    toolName: p.tool?.name ?? null,
    toolColor: p.tool?.color ?? null,
    toolIcon: p.tool?.icon ?? null,
    categorySlug: p.category?.slug ?? '',
    categoryName: p.category?.name ?? '',
    categoryIcon: p.category?.icon ?? null,
    tags: p.tags?.map((t: { name: string }) => t.name) ?? [],
    images: p.images?.map((i: { url: string; altText: string | null; width: number | null; height: number | null; imageType: string | null }) => ({ url: i.url, alt: i.altText, width: i.width, height: i.height, imageType: i.imageType })) ?? [],
    sampleBeforeUrl: p.sampleBeforeUrl ?? null,
    sampleAfterUrl: p.sampleAfterUrl ?? null,
    isFeatured: p.isFeatured ?? false,
    viewCount: p.viewCount ?? 0,
    copyCount: p.copyCount ?? 0,
    createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    updatedAt: p.updatedAt?.toISOString?.() ?? p.updatedAt,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function tryDb<T>(dbFn: () => Promise<T>, fallback: () => T, cacheOpts?: CacheOpts): Promise<T> {
  try {
    if (!cacheOpts) return await dbFn()
    return await unstable_cache(dbFn, cacheOpts.key, {
      tags: [...cacheOpts.tags],
      revalidate: cacheOpts.revalidate,
    })()
  } catch (err) {
    console.error('[tryDb] DB call failed, using fallback:', err)
    return fallback()
  }
}

function extraPageNumbers(total: number, perPage: number): string[] {
  const totalPages = Math.max(0, Math.ceil(total / perPage))
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => String(index + 2))
}

// ---------- public API ----------

export async function getTools(): Promise<NormalizedTool[]> {
  return tryDb(
    async () => {
      const tools = await dbTools.getTools()
      return tools.map(t => ({
        slug: t.slug,
        name: t.name,
        nameJa: t.nameJa ?? '',
        description: t.description ?? '',
        icon: t.icon ?? '🤖',
        color: t.color ?? '#6b7280',
        promptCount: t._count.prompts,
      }))
    },
    () => MOCK_TOOLS.map(t => ({ ...t, promptCount: mockToolCounts()[t.slug] ?? 0 })),
    { key: ['tools'], ...LIST_CACHE },
  )
}

export async function getToolBySlug(slug: string): Promise<NormalizedTool | null> {
  return tryDb(
    async () => {
      const t = await dbTools.getToolBySlug(slug)
      if (!t) return null
      return {
        slug: t.slug,
        name: t.name,
        nameJa: t.nameJa ?? '',
        description: t.description ?? '',
        icon: t.icon ?? '🤖',
        color: t.color ?? '#6b7280',
        promptCount: t._count.prompts,
      }
    },
    () => {
      const t = mockGetToolBySlug(slug)
      if (!t) return null
      return { ...t, promptCount: mockToolCounts()[slug] ?? 0 }
    },
    { key: ['tool', slug], ...LIST_CACHE },
  )
}

export async function getToolSlugs(): Promise<string[]> {
  return tryDb(
    () => dbTools.getToolSlugs(),
    () => MOCK_TOOLS.map(t => t.slug),
    { key: ['tool-slugs'], ...LIST_CACHE },
  )
}

export async function getCategories(): Promise<NormalizedCategory[]> {
  return tryDb(
    async () => {
      const cats = await dbCategories.getCategories()
      return cats.map(c => ({
        slug: c.slug,
        name: c.name,
        nameEn: c.nameEn ?? '',
        description: c.description ?? '',
        icon: c.icon ?? '📁',
        promptCount: c._count.prompts,
      }))
    },
    () => MOCK_CATEGORIES.map(c => ({ ...c, promptCount: mockCategoryCounts()[c.slug] ?? 0 })),
    { key: ['categories'], ...CATEGORY_CACHE },
  )
}

export async function getCategoryBySlug(slug: string): Promise<NormalizedCategory | null> {
  return tryDb(
    async () => {
      const c = await dbCategories.getCategoryBySlug(slug)
      if (!c) return null
      return {
        slug: c.slug,
        name: c.name,
        nameEn: c.nameEn ?? '',
        description: c.description ?? '',
        icon: c.icon ?? '📁',
        promptCount: c._count.prompts,
      }
    },
    () => {
      const c = mockGetCategoryBySlug(slug)
      if (!c) return null
      return { ...c, promptCount: mockCategoryCounts()[slug] ?? 0 }
    },
    { key: ['category', slug], ...CATEGORY_CACHE },
  )
}

export async function getCategorySlugs(): Promise<string[]> {
  return tryDb(
    () => dbCategories.getCategorySlugs(),
    () => MOCK_CATEGORIES.map(c => c.slug),
    { key: ['category-slugs'], ...CATEGORY_CACHE },
  )
}

export async function getFeaturedPrompts(limit = 12): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getFeaturedPrompts(limit)).map(normalizeDbPrompt),
    () => mockGetFeatured().slice(0, limit).map(normalizeMockPrompt),
    { key: ['featured-prompts', String(limit)], ...LIST_CACHE },
  )
}

export async function getLatestPrompts(limit = 8): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getLatestPrompts(limit)).map(normalizeDbPrompt),
    () => mockGetLatest(limit).map(normalizeMockPrompt),
    { key: ['latest-prompts', String(limit)], ...LIST_CACHE },
  )
}

export async function getPromptsByTool(toolSlug: string): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getPromptsByTool(toolSlug)).map(normalizeDbPrompt),
    () => mockGetByTool(toolSlug).map(normalizeMockPrompt),
    { key: ['prompts-by-tool', toolSlug], ...LIST_CACHE },
  )
}

export async function getPromptsByCategory(catSlug: string): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getPromptsByCategory(catSlug)).map(normalizeDbPrompt),
    () => mockGetByCategory(catSlug).map(normalizeMockPrompt),
    { key: ['prompts-by-category', catSlug], ...LIST_CACHE },
  )
}

export async function getPromptBySlug(slug: string): Promise<NormalizedPrompt | null> {
  return tryDb(
    async () => {
      const p = await dbPrompts.getPromptBySlug(slug)
      return p ? normalizeDbPrompt(p) : null
    },
    () => {
      const p = mockGetPromptBySlug(slug)
      return p ? normalizeMockPrompt(p) : null
    },
    {
      key: ['prompt-by-slug', slug],
      tags: [CACHE_TAG_PROMPTS, `prompt:${slug}`],
      revalidate: REVALIDATE_DETAIL_SECONDS,
    },
  )
}

export async function getRelatedPrompts(prompt: NormalizedPrompt, limit = 4): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getRelatedPrompts(prompt.id, prompt.toolSlug, prompt.categorySlug, limit)).map(normalizeDbPrompt),
    () => {
      const mock = mockGetPromptBySlug(prompt.slug)
      return mock ? mockGetRelated(mock, limit).map(normalizeMockPrompt) : []
    },
    { key: ['related-prompts', prompt.id, String(limit)], ...LIST_CACHE },
  )
}

export async function getPromptsByTag(tag: string): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getPromptsByTag(tag)).map(normalizeDbPrompt),
    () => mockGetByTag(tag).map(normalizeMockPrompt),
    { key: ['prompts-by-tag', tag], ...TAG_CACHE },
  )
}

export async function getAllPrompts(): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getAllPrompts()).map(normalizeDbPrompt),
    () => MOCK_PROMPTS.map(normalizeMockPrompt),
    { key: ['all-prompts'], ...LIST_CACHE },
  )
}

// ---------- Paginated variants ----------

export interface PaginatedResult {
  prompts: NormalizedPrompt[]
  total: number
  totalPages: number
}

export async function getPromptsByCategoryPaginated(catSlug: string, page = 1, perPage = 12): Promise<PaginatedResult> {
  return tryDb(
    async () => {
      const r = await dbPrompts.getPromptsByCategoryPaginated(catSlug, page, perPage)
      return { prompts: r.prompts.map(normalizeDbPrompt), total: r.total, totalPages: r.totalPages }
    },
    () => {
      const all = mockGetByCategory(catSlug).map(normalizeMockPrompt)
      const start = (page - 1) * perPage
      return { prompts: all.slice(start, start + perPage), total: all.length, totalPages: Math.ceil(all.length / perPage) }
    },
    { key: ['prompts-category-page', catSlug, String(page), String(perPage)], ...LIST_CACHE },
  )
}

export async function getPromptsByToolPaginated(toolSlug: string, page = 1, perPage = 12): Promise<PaginatedResult> {
  return tryDb(
    async () => {
      const r = await dbPrompts.getPromptsByToolPaginated(toolSlug, page, perPage)
      return { prompts: r.prompts.map(normalizeDbPrompt), total: r.total, totalPages: r.totalPages }
    },
    () => {
      const all = mockGetByTool(toolSlug).map(normalizeMockPrompt)
      const start = (page - 1) * perPage
      return { prompts: all.slice(start, start + perPage), total: all.length, totalPages: Math.ceil(all.length / perPage) }
    },
    { key: ['prompts-tool-page', toolSlug, String(page), String(perPage)], ...LIST_CACHE },
  )
}

export async function getAllPromptsPaginated(page = 1, perPage = 12): Promise<PaginatedResult> {
  return tryDb(
    async () => {
      const r = await dbPrompts.getAllPromptsPaginated(page, perPage)
      return { prompts: r.prompts.map(normalizeDbPrompt), total: r.total, totalPages: r.totalPages }
    },
    () => {
      const all = MOCK_PROMPTS.map(normalizeMockPrompt)
      const start = (page - 1) * perPage
      return { prompts: all.slice(start, start + perPage), total: all.length, totalPages: Math.ceil(all.length / perPage) }
    },
    { key: ['prompts-all-page', String(page), String(perPage)], ...LIST_CACHE },
  )
}

export async function getPromptsByTagPaginated(tag: string, page = 1, perPage = 12): Promise<PaginatedResult> {
  return tryDb(
    async () => {
      const r = await dbPrompts.getPromptsByTagPaginated(tag, page, perPage)
      return { prompts: r.prompts.map(normalizeDbPrompt), total: r.total, totalPages: r.totalPages }
    },
    () => {
      const all = mockGetByTag(tag).map(normalizeMockPrompt)
      const start = (page - 1) * perPage
      return { prompts: all.slice(start, start + perPage), total: all.length, totalPages: Math.ceil(all.length / perPage) }
    },
    { key: ['prompts-tag-page', tag, String(page), String(perPage)], ...TAG_CACHE },
  )
}

export async function getPromptSlugs(): Promise<string[]> {
  return tryDb(
    () => dbPrompts.getPromptSlugs(),
    () => MOCK_PROMPTS.map(p => p.slug),
    { key: ['prompt-slugs'], ...LIST_CACHE },
  )
}

export async function getGuides(): Promise<NormalizedGuide[]> {
  return tryDb(
    async () => {
      const guides = await dbGuides.getGuides()
      return mergeGuides(guides.map(g => ({
        slug: g.slug,
        title: g.title,
        description: g.description ?? '',
        content: g.content,
        targetKeyword: g.targetKeyword,
        createdAt: g.createdAt?.toISOString?.() ?? String(g.createdAt),
      })))
    },
    () => MOCK_GUIDES.map(normalizeMockGuide),
    { key: ['guides'], ...LIST_CACHE },
  )
}

export async function getGuideBySlug(slug: string): Promise<NormalizedGuide | null> {
  return tryDb(
    async () => {
      const g = await dbGuides.getGuideBySlug(slug)
      if (!g) return null
      return {
        slug: g.slug,
        title: g.title,
        description: g.description ?? '',
        content: g.content,
        targetKeyword: g.targetKeyword,
      }
    },
    () => {
      const g = MOCK_GUIDES.find(g => g.slug === slug)
      if (!g) return null
      return { slug: g.slug, title: g.title, description: g.description }
    },
    {
      key: ['guide', slug],
      tags: [CACHE_TAG_PROMPTS],
      revalidate: REVALIDATE_DETAIL_SECONDS,
    },
  )
}

export async function getGuideSlugs(): Promise<string[]> {
  return tryDb(
    async () => mergeGuideSlugs(await dbGuides.getGuideSlugs()),
    () => MOCK_GUIDES.map(g => g.slug),
    { key: ['guide-slugs'], ...LIST_CACHE },
  )
}

export async function getTagSlugs(): Promise<string[]> {
  return tryDb(
    () => dbTags.getTagSlugs(),
    () => {
      const allTags = new Set<string>()
      MOCK_PROMPTS.forEach(p => p.tags.forEach(t => allTags.add(t)))
      return Array.from(allTags)
    },
    { key: ['tag-slugs'], ...TAG_CACHE },
  )
}

export async function getApprovedTagSlugs(): Promise<string[]> {
  return tryDb(
    () => dbTags.getApprovedTagSlugs(),
    () => {
      const allTags = new Set<string>()
      MOCK_PROMPTS.forEach(p => p.tags.forEach(t => allTags.add(t)))
      return Array.from(allTags)
    },
    { key: ['approved-tag-slugs'], ...TAG_CACHE },
  )
}

export async function getTagBySlug(slug: string) {
  return tryDb(
    () => dbTags.getTagBySlug(slug),
    () => null,
    { key: ['tag', slug], ...TAG_CACHE },
  )
}

export interface PopularTag {
  slug: string
  name: string
  color: string
  promptCount: number
}

export interface PrimaryCategory {
  slug: string
  name: string
  icon: string | null
  promptCount: number
}

export async function getPrimaryCategoryForTag(
  tagSlug: string,
): Promise<PrimaryCategory | null> {
  return tryDb(
    async () => {
      const cat = await dbTags.getPrimaryCategoryForTag(tagSlug)
      if (!cat) return null
      return {
        slug: cat.slug,
        name: cat.name,
        icon: cat.icon,
        promptCount: cat._count.prompts,
      }
    },
    () => null,
    { key: ['tag-primary-category', tagSlug], ...TAG_CACHE },
  )
}

export async function getPopularTagsByCategory(
  categorySlug: string,
  limit = 6,
): Promise<PopularTag[]> {
  return tryDb(
    async () => {
      const tags = await dbTags.getPopularTagsByCategory(categorySlug, limit)
      return tags.map(t => ({
        slug: t.slug,
        name: t.name,
        color: t.color,
        promptCount: t._count.prompts,
      }))
    },
    () => [],
    { key: ['popular-tags', categorySlug, String(limit)], ...TAG_CACHE },
  )
}

// ---------- Sitemap helpers (with timestamps) ----------

export async function getPromptSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  const rows = await tryDb(
    () => dbPrompts.getPromptSlugsWithDates(),
    () => MOCK_PROMPTS.map(p => ({ slug: p.slug, updatedAt: new Date(p.updatedAt) })),
    { key: ['prompt-slugs-dates'], ...LIST_CACHE },
  )
  return rows.map(row => ({ slug: row.slug, updatedAt: new Date(row.updatedAt) }))
}

export async function getLatestPromptDate(): Promise<Date> {
  const value = await tryDb(
    () => dbPrompts.getLatestPromptDate(),
    () => new Date(),
    { key: ['latest-prompt-date'], ...LIST_CACHE },
  )
  return new Date(value)
}

export async function getGuideSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  const rows = await tryDb(
    async () => mergeGuideDates(await dbGuides.getGuideSlugsWithDates()),
    () => MOCK_GUIDES.map(g => ({ slug: g.slug, updatedAt: new Date() })),
    { key: ['guide-slugs-dates'], ...LIST_CACHE },
  )
  return rows.map(row => ({ slug: row.slug, updatedAt: new Date(row.updatedAt) }))
}

export async function getApprovedTagSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  const rows = await tryDb(
    () => dbTags.getApprovedTagSlugsWithDates(),
    () => {
      const allTags = new Set<string>()
      MOCK_PROMPTS.forEach(p => p.tags.forEach(t => allTags.add(t)))
      return Array.from(allTags).map(t => ({ slug: t, updatedAt: new Date() }))
    },
    { key: ['approved-tag-slugs-dates'], ...TAG_CACHE },
  )
  return rows.map(row => ({ slug: row.slug, updatedAt: new Date(row.updatedAt) }))
}

export async function getToolSlugsWithLatestDate(): Promise<{ slug: string; lastModified: Date | null }[]> {
  const rows = await tryDb(
    () => dbTools.getToolSlugsWithLatestDate(),
    () => MOCK_TOOLS.map(t => ({ slug: t.slug, lastModified: new Date() })),
    { key: ['tool-slugs-dates'], ...LIST_CACHE },
  )
  return rows.map(row => ({
    slug: row.slug,
    lastModified: row.lastModified ? new Date(row.lastModified) : null,
  }))
}

export async function getCategorySlugsWithLatestDate(): Promise<{ slug: string; lastModified: Date | null }[]> {
  const rows = await tryDb(
    () => dbCategories.getCategorySlugsWithLatestDate(),
    () => MOCK_CATEGORIES.map(c => ({ slug: c.slug, lastModified: new Date() })),
    { key: ['category-slugs-dates'], ...CATEGORY_CACHE },
  )
  return rows.map(row => ({
    slug: row.slug,
    lastModified: row.lastModified ? new Date(row.lastModified) : null,
  }))
}

function mockTagCounts(): Map<string, number> {
  const counts = new Map<string, number>()
  for (const prompt of MOCK_PROMPTS) {
    for (const tag of prompt.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return counts
}

/** Page numbers after the first, for ISR of path-based pagination. One DB round-trip. */
export async function getAllPromptsExtraPages(perPage = PROMPTS_PER_PAGE): Promise<{ page: string }[]> {
  const pages = await tryDb(
    async () => extraPageNumbers(await dbPrompts.countPublishedPrompts(), perPage),
    () => extraPageNumbers(MOCK_PROMPTS.length, perPage),
    { key: ['extra-pages-all', String(perPage)], ...LIST_CACHE },
  )
  return pages.map(page => ({ page }))
}

export async function getCategoryExtraPages(perPage = PROMPTS_PER_PAGE): Promise<{ category: string; page: string }[]> {
  const rows = await tryDb(
    () => dbCategories.countPublishedByCategory(),
    () => MOCK_CATEGORIES.map(category => ({
      slug: category.slug,
      count: MOCK_PROMPTS.filter(prompt => prompt.categorySlug === category.slug).length,
    })),
    { key: ['extra-pages-category', String(perPage)], ...CATEGORY_CACHE },
  )
  return rows.flatMap(row => extraPageNumbers(row.count, perPage).map(page => ({ category: row.slug, page })))
}

export async function getToolExtraPages(perPage = PROMPTS_PER_PAGE): Promise<{ tool: string; page: string }[]> {
  const rows = await tryDb(
    () => dbTools.countPublishedByTool(),
    () => MOCK_TOOLS.map(tool => ({
      slug: tool.slug,
      count: MOCK_PROMPTS.filter(prompt => prompt.toolSlug === tool.slug).length,
    })),
    { key: ['extra-pages-tool', String(perPage)], ...LIST_CACHE },
  )
  return rows.flatMap(row => extraPageNumbers(row.count, perPage).map(page => ({ tool: row.slug, page })))
}

export async function getTagExtraPages(perPage = PROMPTS_PER_PAGE): Promise<{ slug: string; page: string }[]> {
  const rows = await tryDb(
    () => dbTags.countPublishedByApprovedTag(),
    () => Array.from(mockTagCounts().entries()).map(([slug, count]) => ({ slug, count })),
    { key: ['extra-pages-tag', String(perPage)], ...TAG_CACHE },
  )
  return rows.flatMap(row =>
    extraPageNumbers(row.count, perPage).map(page => ({ slug: encodeURIComponent(row.slug), page })),
  )
}
