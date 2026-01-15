import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isCuid } from '@/lib/slug'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  _request: NextRequest,
  context: any
) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const params = await context.params
    const idOrSlug = params.id

    // Determine if the parameter is a CUID or a slug
    // Try to find by ID first if it looks like a CUID, otherwise by slug
    let promptData = null

    if (isCuid(idOrSlug)) {
      // Look up by ID (CUID)
      promptData = await prisma.prompt.findUnique({
        where: { id: idOrSlug },
        include: {
          category: true,
          images: {
            orderBy: { order: 'asc' },
          },
        },
      })
    } else {
      // Look up by slug
      promptData = await prisma.prompt.findUnique({
        where: { slug: idOrSlug },
        include: {
          category: true,
          images: {
            orderBy: { order: 'asc' },
          },
        },
      })
    }

    // If we have images, enrich effect images with their original images
    if (promptData && promptData.images) {
      try {
        const enrichedImages = []
        for (const img of promptData.images) {
          if (img.imageType === 'effect') {
            // Fetch original images for this effect image
            const originalImages = await prisma.promptImage.findMany({
              where: { parentImageId: img.id },
              orderBy: { createdAt: 'asc' }
            })
            enrichedImages.push({ ...img, originalImages })
          }
          // Only include effect images in the main array
          // Original images are nested in the originalImages field of their parent effect image
        }
        promptData.images = enrichedImages
      } catch (enrichError) {
        // If enrichment fails, just return the basic image data
        console.error('Error enriching images:', enrichError)
      }
    }

    // Return tags as is (they are stored as JSON string in database)
    let prompt
    if (promptData) {
      prompt = promptData
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
    const { title, description, content, categoryId, isPublished, images, tags } = body

    // Only handle image deletion and recreation if new images are actually provided
    if (images && images.length > 0) {
      // First, delete existing images if new images are provided
      // Need to delete in correct order: original images first, then effect images
      await prisma.promptImage.deleteMany({
        where: {
          promptId: params.id,
          imageType: 'original'
        },
      })
      // Then delete effect images
      await prisma.promptImage.deleteMany({
        where: {
          promptId: params.id,
          imageType: 'effect'
        },
      })

      // Separate effect and original images using imageType field
      const effectImages = images.filter((img: any) => img.imageType === 'effect')
      const originalImages = images.filter((img: any) => img.imageType === 'original')

      console.log('DEBUG: Creating images', {
        effectImagesCount: effectImages.length,
        originalImagesCount: originalImages.length,
        effectImages: effectImages.map((img: any) => ({ order: img.order, url: img.url.substring(0, 50) })),
        originalImages: originalImages.map((img: any) => ({ parentImageIndex: img.parentImageIndex, order: img.order }))
      })

      // Create effect images first, then original images can reference them
      // Map effect images by their order to easily find the correct parent
      const createdEffectImagesByOrder: { [key: number]: any } = {}
      const createdEffectImagesByIndex: any[] = []

      // Create all effect images first
      for (const img of effectImages) {
        const created = await prisma.promptImage.create({
          data: {
            promptId: params.id,
            url: img.url,
            blobKey: img.url.split('/').pop() || 'unknown',
            fileName: img.fileName,
            fileSize: img.fileSize,
            mimeType: img.mimeType,
            order: img.order,
            imageType: 'effect',
          },
        })
        createdEffectImagesByOrder[img.order] = created
        createdEffectImagesByIndex.push(created)
      }

      // Then create original images, linking them to the correct effect image
      for (const img of originalImages) {
        // Original images have parentImageIndex that tells us which effect image (by index) they belong to
        let parentEffectImage = null

        if (typeof img.parentImageIndex === 'number' && img.parentImageIndex >= 0) {
          // Use parentImageIndex as array index to find the correct effect image
          parentEffectImage = createdEffectImagesByIndex[img.parentImageIndex]
        } else {
          // Fallback: use order or default to first effect image
          const parentOrder = img.order
          parentEffectImage = createdEffectImagesByOrder[parentOrder] || createdEffectImagesByIndex[0]
        }

        console.log('DEBUG: Creating original image', {
          parentImageIndex: img.parentImageIndex,
          parentEffectImageId: parentEffectImage?.id,
          parentEffectImageOrder: parentEffectImage?.order
        })

        if (!parentEffectImage) {
          console.error('ERROR: No parent effect image found for original image with parentImageIndex:', img.parentImageIndex)
          // Skip this original image if we can't find its parent
          continue
        }

        console.log('DEBUG: Creating original image with valid parent')
        await prisma.promptImage.create({
          data: {
            promptId: params.id,
            url: img.url,
            blobKey: img.url.split('/').pop() || 'unknown',
            fileName: img.fileName,
            fileSize: img.fileSize,
            mimeType: img.mimeType,
            order: img.order,
            imageType: 'original',
            parentImageId: parentEffectImage.id,
          },
        })
      }
    }

    // Now update the prompt with other fields
    // Note: We need to use connect for relationships, not direct ID assignment
    const updateData: any = {
      title,
      description,
      content,
      isPublished,
    }

    // Only include tags if they're being updated
    if (tags !== undefined) {
      updateData.tags = tags ? JSON.stringify(tags) : null
    }

    // Only update category if categoryId is provided
    if (categoryId) {
      updateData.category = {
        connect: { id: categoryId }
      }
    }

    const prompt = await prisma.prompt.update({
      where: { id: params.id },
      data: updateData,
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    })

    return NextResponse.json(prompt)
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
