import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getTags = cache(async () => {
  return prisma.tag.findMany({
    include: {
      _count: { select: { prompts: true } },
    },
    orderBy: { name: 'asc' },
  })
})

export const getTagBySlug = cache(async (slug: string) => {
  return prisma.tag.findUnique({
    where: { slug },
    include: {
      _count: { select: { prompts: true } },
    },
  })
})

export const getTagSlugs = cache(async () => {
  const tags = await prisma.tag.findMany({
    select: { slug: true },
  })
  return tags.map(t => t.slug)
})

export const getApprovedTagSlugs = cache(async () => {
  const tags = await prisma.tag.findMany({
    where: { isApproved: true },
    select: { slug: true },
  })
  return tags.map(t => t.slug)
})

export const getApprovedTags = cache(async () => {
  return prisma.tag.findMany({
    where: { isApproved: true },
    include: {
      _count: { select: { prompts: true } },
    },
    orderBy: { name: 'asc' },
  })
})
