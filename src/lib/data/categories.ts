import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getCategories = cache(async () => {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { prompts: { where: { isPublished: true } } } },
    },
  })
})

export const getCategoryBySlug = cache(async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      _count: { select: { prompts: { where: { isPublished: true } } } },
    },
  })
})

export const getCategorySlugs = cache(async () => {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { slug: true },
  })
  return categories.map(c => c.slug)
})

export const getCategorySlugsWithLatestDate = cache(async () => {
  const categories = await prisma.category.findMany({
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
  return categories.map(c => ({
    slug: c.slug,
    lastModified: c.prompts[0]?.updatedAt ?? null,
  }))
})
