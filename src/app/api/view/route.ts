import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const body = await request.json()
    const { promptId } = body

    if (!promptId) {
      return NextResponse.json(
        { error: 'promptId is required' },
        { status: 400 }
      )
    }

    // Increment view count
    await prisma.prompt.update({
      where: { id: promptId },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to increment view count:', error)
    // Don't throw error to user, just log it
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
