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

    // Fetch without tags to avoid migration conflicts
    // Tags will be included once the migration is applied in production
    const [prompts, total] = await Promise.all([
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

    // Include tags from database
    const promptsWithTags = prompts.map(p => ({ ...p, tags: p.tags || [] }))

    console.log('✅ Prompts fetched successfully:', prompts.length, 'records, total:', total)
    console.log('=== END: GET /api/prompts (SUCCESS) ===')

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
    const { title, description, content, categoryId, author, isPublished, images, tags } = body

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

    // Separate effect images from original images using imageType field
    const effectImages = images.filter((img: any) => img.imageType === 'effect')
    const originalImages = images.filter((img: any) => img.imageType === 'original')

    if (effectImages.length === 0) {
      return NextResponse.json(
        { error: 'エフェクト画像が必要です' },
        { status: 400 }
      )
    }

    // Phase 1: Create prompt with effect images only
    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        content,
        categoryId,
        author: author || (session.user?.email || 'Anonymous'),
        isPublished: isPublished || false,
        tags: tags ? JSON.stringify(tags) : null,
        images: {
          create: effectImages.map((img: any) => ({
            url: img.url,
            blobKey: img.url.split('/').pop() || 'unknown',
            fileName: img.fileName,
            fileSize: img.fileSize,
            mimeType: img.mimeType,
            order: img.order,
            imageType: 'effect',
          })),
        },
      },
      include: {
        images: { orderBy: { order: 'asc' } },
      },
    })

    // Phase 2: Add original images with proper parentImageId references
    if (originalImages.length > 0) {
      for (const origImg of originalImages) {
        // Find the parent effect image based on parentImageIndex or order
        const parentIndex = origImg.parentImageIndex !== undefined ? origImg.parentImageIndex : origImg.order
        const parentEffectImage = prompt.images.find(
          (img: any) => img.order === parentIndex
        )

        if (parentEffectImage) {
          await prisma.promptImage.create({
            data: {
              promptId: prompt.id,
              url: origImg.url,
              blobKey: origImg.url.split('/').pop() || 'unknown',
              fileName: origImg.fileName,
              fileSize: origImg.fileSize,
              mimeType: origImg.mimeType,
              order: origImg.order,
              imageType: 'original',
              parentImageId: parentEffectImage.id,
            },
          })
        }
      }
    }

    // Fetch the complete prompt with enriched images
    const completedPrompt = await prisma.prompt.findUnique({
      where: { id: prompt.id },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    })

    // Include tags from database
    const promptWithTags = { ...completedPrompt, tags: completedPrompt?.tags || [] }

    return NextResponse.json(promptWithTags, { status: 201 })
  } catch (error) {
    console.error('Failed to create prompt:', error)
    return NextResponse.json(
      { error: 'プロンプト作成に失敗しました' },
      { status: 500 }
    )
  }
}
