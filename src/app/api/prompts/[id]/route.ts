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

    // Fetch without tags to avoid migration conflicts
    // Tags will be included once the migration is applied in production
    let promptData = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    })

    // Add empty tags array for UI compatibility
    let prompt
    if (promptData) {
      prompt = { ...promptData, tags: [] }
    } else {
      prompt = null
    }

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
    const { title, description, content, categoryId, isPublished, images } = body

    // First, delete existing images if images are provided
    if (images && images.length >= 0) {
      await prisma.promptImage.deleteMany({
        where: { promptId: params.id },
      })
    }

    // Update without tags to avoid migration conflicts
    // Tags will be updated once the migration is applied in production
    const prompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        title,
        description,
        content,
        categoryId,
        isPublished,
        ...(images && images.length > 0 && {
          images: {
            create: images.map((img: any) => ({
              url: img.url,
              blobKey: img.url.split('/').pop() || 'unknown',
              fileName: img.fileName,
              fileSize: img.fileSize,
              mimeType: img.mimeType,
              order: img.order,
              imageType: img.imageType || 'effect',
            })),
          },
        }),
      },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    })

    // Add empty tags array for UI compatibility
    const promptWithTags = { ...prompt, tags: [] }

    return NextResponse.json(promptWithTags)
  } catch (error) {
    console.error('Failed to update prompt:', error)
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
