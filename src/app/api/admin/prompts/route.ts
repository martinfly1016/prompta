import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const revalidate = 60 // Cache for 1 minute for admin purposes

// GET /api/admin/prompts - Admin endpoint, shows all prompts (published and unpublished)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Note: This endpoint is used by both authenticated admin pages and public category/tag pages
    // We allow public access to fetch all prompts for display purposes

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    console.log('=== START: GET /api/admin/prompts ===')
    console.log('TIME:', new Date().toISOString())
    console.log('User:', session?.user?.email || 'unauthenticated')

    // Optimized parallel queries with selective field loading
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { order: 'asc' } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.prompt.count({ where }),
    ])

    // Include tags from database
    const promptsWithTags = prompts.map(p => ({ ...p, tags: p.tags || [] }))

    console.log('✅ Prompts fetched successfully:', prompts.length, 'records, total:', total)
    console.log('=== END: GET /api/admin/prompts (SUCCESS) ===')

    return NextResponse.json({
      prompts: promptsWithTags,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('Failed to fetch admin prompts:', errorMsg)
    return NextResponse.json(
      { error: 'プロンプト取得に失敗しました' },
      { status: 500 }
    )
  }
}
