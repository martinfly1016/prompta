import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { withPrivateCache } from '@/lib/http-cache'
import { revalidateCategoryContent } from '@/lib/revalidate-public'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function privateJson<T>(body: T, init?: { status?: number }) {
  return withPrivateCache(NextResponse.json(body, init))
}

export async function DELETE(
  _request: NextRequest,
  context: any
) {
  try {
    // Lazy import to prevent build-time errors
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')

    const params = await context.params
    const session = await getServerSession(authOptions)

    if (!session) {
      return privateJson({ error: '認証が必要です' }, { status: 401 })
    }

    if (!params?.id) {
      return privateJson(
        { error: 'カテゴリIDが必要です' },
        { status: 400 }
      )
    }

    const existing = await prisma.category.findUnique({
      where: { id: params.id },
      select: { slug: true },
    })

    await prisma.category.delete({ where: { id: params.id } })

    try {
      revalidateCategoryContent(existing?.slug)
    } catch (revalidateError) {
      console.error('[revalidate] category delete:', revalidateError)
    }

    return privateJson({ success: true })
  } catch (error) {
    console.error('Delete category error:', error)
    return privateJson(
      { error: 'カテゴリ削除に失敗しました' },
      { status: 500 }
    )
  }
}
