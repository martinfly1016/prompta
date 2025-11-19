import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Cache for 1 hour

// Helper function to slugify tag names (supports Japanese and other languages)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g, '') // Keep Japanese characters
}

// GET /api/tags - Get all unique tags with their counts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sortBy = searchParams.get('sortBy') || 'count' // 'count' or 'name'

    // Optimized: Only fetch tags field from published prompts
    const prompts = await prisma.prompt.findMany({
      where: {
        isPublished: true,
      },
      select: {
        tags: true,
      },
    })

    // Extract and count unique tags
    const tagCountMap = new Map<string, number>()

    for (const prompt of prompts) {
      if (prompt.tags) {
        try {
          const parsedTags = JSON.parse(prompt.tags)
          if (Array.isArray(parsedTags)) {
            for (const tag of parsedTags) {
              const tagName = typeof tag === 'string' ? tag : tag.name || ''
              if (tagName) {
                tagCountMap.set(tagName, (tagCountMap.get(tagName) || 0) + 1)
              }
            }
          }
        } catch (e) {
          // Skip invalid JSON
          console.warn('Failed to parse tags:', prompt.tags)
        }
      }
    }

    // Convert map to array of tag objects
    let tags = Array.from(tagCountMap.entries()).map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
    }))

    // Sort tags
    if (sortBy === 'name') {
      tags.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      // Sort by count (descending)
      tags.sort((a, b) => b.count - a.count)
    }

    return NextResponse.json({
      tags,
      total: tags.length,
    })
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return NextResponse.json(
      { error: 'タグ取得に失敗しました' },
      { status: 500 }
    )
  }
}
