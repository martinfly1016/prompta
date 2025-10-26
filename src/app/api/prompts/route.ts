import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/prompts - Public endpoint, shows only published prompts
export async function GET(request: NextRequest) {
  try {
    const dbUrl = process.env.DATABASE_URL
    const nodeEnv = process.env.NODE_ENV

    console.log('=== START: GET /api/prompts ===')
    console.log('TIME:', new Date().toISOString())
    console.log('DATABASE_URL configured:', !!dbUrl)
    console.log('NODE_ENV:', nodeEnv)

    if (!dbUrl) {
      console.error('❌ DATABASE_URL is NOT configured!')
      return NextResponse.json(
        {
          error: 'プロンプト取得に失敗しました',
          reason: 'DATABASE_URL not configured',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {
      isPublished: true, // Only show published prompts for public API
    }
    if (categoryId) where.categoryId = categoryId
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    console.log('Executing parallel queries for prompts and count...')

    let prompts, total

    try {
      // Try to fetch with tags (requires tag migration)
      [prompts, total] = await Promise.all([
        prisma.prompt.findMany({
          where,
          include: {
            category: true,
            images: { orderBy: { order: 'asc' } },
            tags: true,
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.prompt.count({ where }),
      ])
    } catch (tagError) {
      console.log('⚠️ Tags not available yet, fetching without tags...')
      // Fallback: fetch without tags if table doesn't exist
      [prompts, total] = await Promise.all([
        prisma.prompt.findMany({
          where,
          include: {
            category: true,
            images: { orderBy: { order: 'asc' } },
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.prompt.count({ where }),
      ])
      // Add empty tags array for compatibility
      prompts = prompts.map(p => ({ ...p, tags: [] }))
    }

    console.log('✅ Prompts fetched successfully:', prompts.length, 'records, total:', total)
    console.log('=== END: GET /api/prompts (SUCCESS) ===')

    return NextResponse.json({
      prompts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    const errorCode = (error as any)?.code || 'UNKNOWN'
    const errorName = error instanceof Error ? error.name : 'UnknownError'

    console.error('=== ERROR: GET /api/prompts ===')
    console.error('Error Name:', errorName)
    console.error('Error Code:', errorCode)
    console.error('Error Message:', errorMsg)
    console.error('Full Error:', JSON.stringify(error, null, 2))
    console.error('=== END: GET /api/prompts (ERROR) ===')

    return NextResponse.json(
      {
        error: 'プロンプト取得に失敗しました',
        errorName,
        errorCode,
        message: errorMsg,
        timestamp: new Date().toISOString(),
        environment: {
          nodeEnv: process.env.NODE_ENV,
          databaseUrlSet: !!process.env.DATABASE_URL
        }
      },
      { status: 500 }
    )
  }
}

// POST /api/prompts
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, content, categoryId, tags, author, isPublished, images } = body

    if (!title || !description || !content || !categoryId) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: '少なくとも1枚の画像が必要です' },
        { status: 400 }
      )
    }

    // Create or connect tags
    const tagConnections = []
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tag of tags) {
        if (typeof tag === 'string') {
          // If tag is a string, find or create it
          const tagRecord = await prisma.tag.upsert({
            where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
            update: {},
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, '-'),
              color: 'blue', // Default color
            },
          })
          tagConnections.push({ id: tagRecord.id })
        } else if (typeof tag === 'object' && tag.id) {
          // If tag is an object with id, just connect it
          tagConnections.push({ id: tag.id })
        }
      }
    }

    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        content,
        categoryId,
        author: author || (session.user?.email || 'Anonymous'),
        isPublished: isPublished || false,
        images: {
          create: images.map((img: any) => ({
            url: img.url,
            blobKey: img.url.split('/').pop() || 'unknown',
            fileName: img.fileName,
            fileSize: img.fileSize,
            mimeType: img.mimeType,
            order: img.order,
          })),
        },
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        tags: true,
      },
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    console.error('Failed to create prompt:', error)
    return NextResponse.json(
      { error: 'プロンプト作成に失敗しました' },
      { status: 500 }
    )
  }
}
