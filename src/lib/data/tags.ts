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

export const getApprovedTagSlugsWithDates = cache(async () => {
  return prisma.tag.findMany({
    where: { isApproved: true },
    select: { slug: true, updatedAt: true },
  })
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

/**
 * Popular approved tags for a given category, ranked by how many published
 * prompts in that category carry the tag. Used in the category page's
 * "人気 Tag" section to surface long-tail landing pages.
 */
export const getPopularTagsByCategory = cache(
  async (categorySlug: string, limit = 6) => {
    const tags = await prisma.tag.findMany({
      where: {
        isApproved: true,
        prompts: {
          some: {
            isPublished: true,
            category: { slug: categorySlug },
          },
        },
      },
      select: {
        slug: true,
        name: true,
        color: true,
        _count: {
          select: {
            prompts: {
              where: {
                isPublished: true,
                category: { slug: categorySlug },
              },
            },
          },
        },
      },
      take: 20,
    })
    return tags
      .sort((a, b) => b._count.prompts - a._count.prompts)
      .slice(0, limit)
  },
)
