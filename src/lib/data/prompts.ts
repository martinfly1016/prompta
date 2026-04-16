import { prisma } from '@/lib/prisma'
import { cache } from 'react'

const promptInclude = {
  category: true,
  tool: true,
  tags: true,
  images: {
    orderBy: { order: 'asc' as const },
  },
}

export const getPromptBySlug = cache(async (slug: string) => {
  // findFirst (not findUnique) so we can filter isPublished — unpublished drafts
  // should 404 for the public site; admins edit via the admin dashboard instead.
  return prisma.prompt.findFirst({
    where: { slug, isPublished: true },
    include: promptInclude,
  })
})

export const getPromptsByTool = cache(async (toolSlug: string, limit?: number) => {
  return prisma.prompt.findMany({
    where: {
      isPublished: true,
      tool: { slug: toolSlug },
    },
    include: promptInclude,
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {}),
  })
})

export const getPromptsByCategory = cache(async (categorySlug: string, limit?: number) => {
  return prisma.prompt.findMany({
    where: {
      isPublished: true,
      category: { slug: categorySlug },
    },
    include: promptInclude,
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {}),
  })
})

export const getFeaturedPrompts = cache(async (limit: number = 12) => {
  return prisma.prompt.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    include: promptInclude,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
})

export const getLatestPrompts = cache(async (limit: number = 8) => {
  return prisma.prompt.findMany({
    where: { isPublished: true },
    include: promptInclude,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
})

export const getAllPrompts = cache(async () => {
  return prisma.prompt.findMany({
    where: { isPublished: true },
    include: promptInclude,
    orderBy: { createdAt: 'desc' },
  })
})

export const getRelatedPrompts = cache(async (promptId: string, toolId: string | null, categoryId: string, limit: number = 4) => {
  return prisma.prompt.findMany({
    where: {
      isPublished: true,
      id: { not: promptId },
      OR: [
        ...(toolId ? [{ toolId }] : []),
        { categoryId },
      ],
    },
    include: promptInclude,
    orderBy: { viewCount: 'desc' },
    take: limit,
  })
})

export const getPromptsByTag = cache(async (tagSlug: string) => {
  return prisma.prompt.findMany({
    where: {
      isPublished: true,
      tags: { some: { slug: tagSlug } },
    },
    include: promptInclude,
    orderBy: { createdAt: 'desc' },
  })
})

// ---------- Paginated variants ----------

export const getPromptsByCategoryPaginated = cache(
  async (categorySlug: string, page: number = 1, perPage: number = 12) => {
    const skip = (page - 1) * perPage
    const where = { isPublished: true, category: { slug: categorySlug } } as const
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({ where, include: promptInclude, orderBy: { createdAt: 'desc' }, skip, take: perPage }),
      prisma.prompt.count({ where }),
    ])
    return { prompts, total, totalPages: Math.ceil(total / perPage) }
  }
)

export const getPromptsByToolPaginated = cache(
  async (toolSlug: string, page: number = 1, perPage: number = 12) => {
    const skip = (page - 1) * perPage
    const where = { isPublished: true, tool: { slug: toolSlug } } as const
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({ where, include: promptInclude, orderBy: { createdAt: 'desc' }, skip, take: perPage }),
      prisma.prompt.count({ where }),
    ])
    return { prompts, total, totalPages: Math.ceil(total / perPage) }
  }
)

export const getAllPromptsPaginated = cache(
  async (page: number = 1, perPage: number = 12) => {
    const skip = (page - 1) * perPage
    const where = { isPublished: true } as const
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({ where, include: promptInclude, orderBy: { createdAt: 'desc' }, skip, take: perPage }),
      prisma.prompt.count({ where }),
    ])
    return { prompts, total, totalPages: Math.ceil(total / perPage) }
  }
)

export const getPromptsByTagPaginated = cache(
  async (tagSlug: string, page: number = 1, perPage: number = 12) => {
    const skip = (page - 1) * perPage
    const where = { isPublished: true, tags: { some: { slug: tagSlug } } } as const
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({ where, include: promptInclude, orderBy: { createdAt: 'desc' }, skip, take: perPage }),
      prisma.prompt.count({ where }),
    ])
    return { prompts, total, totalPages: Math.ceil(total / perPage) }
  }
)

export const getPromptSlugs = cache(async () => {
  const prompts = await prisma.prompt.findMany({
    where: { isPublished: true, slug: { not: null } },
    select: { slug: true },
  })
  return prompts.map(p => p.slug).filter(Boolean) as string[]
})

export const getPromptSlugsWithDates = cache(async () => {
  const prompts = await prisma.prompt.findMany({
    where: { isPublished: true, slug: { not: null } },
    select: { slug: true, updatedAt: true },
  })
  return prompts.filter((p): p is { slug: string; updatedAt: Date } => p.slug !== null)
})

export const getLatestPromptDate = cache(async () => {
  const result = await prisma.prompt.findFirst({
    where: { isPublished: true },
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true },
  })
  return result?.updatedAt ?? new Date()
})

export const searchPrompts = cache(async (query: string, limit: number = 20) => {
  return prisma.prompt.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: promptInclude,
    orderBy: { viewCount: 'desc' },
    take: limit,
  })
})

// Stats update (non-cached, for API routes)
export async function incrementViewCount(promptId: string) {
  return prisma.prompt.update({
    where: { id: promptId },
    data: { viewCount: { increment: 1 } },
    select: { viewCount: true },
  })
}

export async function incrementCopyCount(promptId: string) {
  return prisma.prompt.update({
    where: { id: promptId },
    data: { copyCount: { increment: 1 } },
    select: { copyCount: true },
  })
}
