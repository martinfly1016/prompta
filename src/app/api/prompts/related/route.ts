import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Cache for 1 hour

/**
 * GET /api/prompts/related
 * Fetch related prompts based on category and tags
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const excludeId = searchParams.get('excludeId')
    const categorySlug = searchParams.get('category')
    const tagsParam = searchParams.get('tags')
    const limit = parseInt(searchParams.get('limit') || '4')

    const tags = tagsParam ? tagsParam.split(',').filter(Boolean) : []

    if (!excludeId || !categorySlug) {
      return NextResponse.json(
        { error: 'Missing required parameters: excludeId and category' },
        { status: 400 }
      )
    }

    // Fetch prompts from the same category (excluding current prompt)
    const categoryPrompts = await prisma.prompt.findMany({
      where: {
        id: { not: excludeId },
        isPublished: true,
        category: { slug: categorySlug },
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: {
          orderBy: { order: 'asc' },
          take: 3, // Only fetch first few images for performance
        },
      },
      take: limit * 3, // Fetch more to allow for scoring and filtering
      orderBy: { createdAt: 'desc' },
    })

    // Score prompts by tag match count
    const scoredPrompts = categoryPrompts.map((prompt) => {
      let score = 1 // Base score for being in same category

      if (prompt.tags && tags.length > 0) {
        try {
          const promptTags = typeof prompt.tags === 'string'
            ? JSON.parse(prompt.tags)
            : prompt.tags

          if (Array.isArray(promptTags)) {
            const matchCount = tags.filter((t) =>
              promptTags.some((pt: any) => {
                const ptName = typeof pt === 'string' ? pt : pt.name
                return ptName?.toLowerCase() === t.toLowerCase()
              })
            ).length
            score += matchCount * 2 // Weight tag matches higher
          }
        } catch {
          // Ignore JSON parse errors
        }
      }

      return { ...prompt, _score: score }
    })

    // Sort by score (highest first) and take the limit
    const sortedPrompts = scoredPrompts
      .sort((a, b) => b._score - a._score)
      .slice(0, limit)
      .map(({ _score, ...prompt }) => prompt) // Remove score from response

    // If we don't have enough from the same category, fetch from other categories
    if (sortedPrompts.length < limit) {
      const remaining = limit - sortedPrompts.length
      const existingIds = [excludeId, ...sortedPrompts.map((p) => p.id)]

      const additionalPrompts = await prisma.prompt.findMany({
        where: {
          id: { notIn: existingIds },
          isPublished: true,
        },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: {
            orderBy: { order: 'asc' },
            take: 3,
          },
        },
        take: remaining,
        orderBy: { createdAt: 'desc' },
      })

      sortedPrompts.push(...additionalPrompts)
    }

    return NextResponse.json({
      prompts: sortedPrompts,
    })
  } catch (error) {
    console.error('Failed to fetch related prompts:', error)
    return NextResponse.json(
      { error: '関連プロンプトの取得に失敗しました' },
      { status: 500 }
    )
  }
}
