import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getGuides = cache(async () => {
  return prisma.guide.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  })
})

export const getGuideBySlug = cache(async (slug: string) => {
  return prisma.guide.findUnique({
    where: { slug },
  })
})

export const getGuideSlugs = cache(async () => {
  const guides = await prisma.guide.findMany({
    where: { isPublished: true },
    select: { slug: true },
  })
  return guides.map(g => g.slug)
})

export const getGuideSlugsWithDates = cache(async () => {
  return prisma.guide.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  })
})
