import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getTools = cache(async () => {
  return prisma.tool.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { prompts: { where: { isPublished: true } } } },
    },
  })
})

export const getToolBySlug = cache(async (slug: string) => {
  return prisma.tool.findUnique({
    where: { slug },
    include: {
      _count: { select: { prompts: { where: { isPublished: true } } } },
      categories: {
        include: { category: true },
      },
    },
  })
})

export const getToolSlugs = cache(async () => {
  const tools = await prisma.tool.findMany({
    where: { isActive: true },
    select: { slug: true },
  })
  return tools.map(t => t.slug)
})

export const getToolSlugsWithLatestDate = cache(async () => {
  const tools = await prisma.tool.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      prompts: {
        where: { isPublished: true },
        orderBy: { updatedAt: 'desc' },
        take: 1,
        select: { updatedAt: true },
      },
    },
  })
  return tools.map(t => ({
    slug: t.slug,
    lastModified: t.prompts[0]?.updatedAt ?? null,
  }))
})
