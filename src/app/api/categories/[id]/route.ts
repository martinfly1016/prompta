import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    if (!params?.id) {
      return NextResponse.json(
        { error: 'カテゴリIDが必要です' },
        { status: 400 }
      )
    }

    await prisma.category.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete category error:', error)
    return NextResponse.json(
      { error: 'カテゴリ削除に失敗しました' },
      { status: 500 }
    )
  }
}
