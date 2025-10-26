import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  _request: NextRequest,
  context: any
) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const params = await context.params

    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        tags: true,
      },
    })

    if (!prompt) {
      return NextResponse.json(
        { error: 'プロンプトが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json(prompt)
  } catch (error) {
    return NextResponse.json(
      { error: 'プロンプト取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: any
) {
  try {
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')
    const params = await context.params

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, content, categoryId, tags, isPublished, images } = body

    // First, delete existing images if images are provided
    if (images && images.length >= 0) {
      await prisma.promptImage.deleteMany({
        where: { promptId: params.id },
      })
    }

    // Handle tag connections
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

    const prompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        title,
        description,
        content,
        categoryId,
        isPublished,
        tags: {
          set: [], // Clear existing tags
          connect: tagConnections, // Connect new tags
        },
        ...(images && images.length > 0 && {
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
        }),
      },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        tags: true,
      },
    })

    return NextResponse.json(prompt)
  } catch (error) {
    return NextResponse.json(
      { error: 'プロンプト更新に失敗しました' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  context: any
) {
  try {
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')
    const params = await context.params

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    await prisma.prompt.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'プロンプト削除に失敗しました' },
      { status: 500 }
    )
  }
}
