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

import * as dbTools from './tools'
import * as dbCategories from './categories'
import * as dbPrompts from './prompts'
import * as dbTags from './tags'
import * as dbGuides from './guides'

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
  images: { url: string; alt: string | null }[]
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
    images: p.images.map(url => ({ url, alt: null })),
    isFeatured: p.isFeatured,
    viewCount: p.viewCount,
    copyCount: p.copyCount,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }
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
    images: p.images?.map((i: { url: string; altText: string | null }) => ({ url: i.url, alt: i.altText })) ?? [],
    isFeatured: p.isFeatured ?? false,
    viewCount: p.viewCount ?? 0,
    copyCount: p.copyCount ?? 0,
    createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    updatedAt: p.updatedAt?.toISOString?.() ?? p.updatedAt,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function tryDb<T>(dbFn: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await dbFn()
  } catch (err) {
    console.error('[tryDb] DB call failed, using fallback:', err)
    return fallback()
  }
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
  )
}

export async function getToolSlugs(): Promise<string[]> {
  return tryDb(
    () => dbTools.getToolSlugs(),
    () => MOCK_TOOLS.map(t => t.slug),
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
  )
}

export async function getCategorySlugs(): Promise<string[]> {
  return tryDb(
    () => dbCategories.getCategorySlugs(),
    () => MOCK_CATEGORIES.map(c => c.slug),
  )
}

export async function getFeaturedPrompts(limit = 12): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getFeaturedPrompts(limit)).map(normalizeDbPrompt),
    () => mockGetFeatured().slice(0, limit).map(normalizeMockPrompt),
  )
}

export async function getLatestPrompts(limit = 8): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getLatestPrompts(limit)).map(normalizeDbPrompt),
    () => mockGetLatest(limit).map(normalizeMockPrompt),
  )
}

export async function getPromptsByTool(toolSlug: string): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getPromptsByTool(toolSlug)).map(normalizeDbPrompt),
    () => mockGetByTool(toolSlug).map(normalizeMockPrompt),
  )
}

export async function getPromptsByCategory(catSlug: string): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getPromptsByCategory(catSlug)).map(normalizeDbPrompt),
    () => mockGetByCategory(catSlug).map(normalizeMockPrompt),
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
  )
}

export async function getRelatedPrompts(prompt: NormalizedPrompt, limit = 4): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getRelatedPrompts(prompt.id, prompt.toolSlug, prompt.categorySlug, limit)).map(normalizeDbPrompt),
    () => {
      const mock = mockGetPromptBySlug(prompt.slug)
      return mock ? mockGetRelated(mock, limit).map(normalizeMockPrompt) : []
    },
  )
}

export async function getPromptsByTag(tag: string): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getPromptsByTag(tag)).map(normalizeDbPrompt),
    () => mockGetByTag(tag).map(normalizeMockPrompt),
  )
}

export async function getAllPrompts(): Promise<NormalizedPrompt[]> {
  return tryDb(
    async () => (await dbPrompts.getAllPrompts()).map(normalizeDbPrompt),
    () => MOCK_PROMPTS.map(normalizeMockPrompt),
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
  )
}

export async function getPromptSlugs(): Promise<string[]> {
  return tryDb(
    () => dbPrompts.getPromptSlugs(),
    () => MOCK_PROMPTS.map(p => p.slug),
  )
}

export async function getGuides(): Promise<NormalizedGuide[]> {
  return tryDb(
    async () => {
      const guides = await dbGuides.getGuides()
      return guides.map(g => ({
        slug: g.slug,
        title: g.title,
        description: g.description ?? '',
        content: g.content,
        targetKeyword: g.targetKeyword,
      }))
    },
    () => MOCK_GUIDES.map(g => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
    })),
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
  )
}

export async function getGuideSlugs(): Promise<string[]> {
  return tryDb(
    () => dbGuides.getGuideSlugs(),
    () => MOCK_GUIDES.map(g => g.slug),
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
  )
}
