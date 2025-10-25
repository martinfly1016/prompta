import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: unknown,
  { params }: { params: { id: string } }
) {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: { category: true },
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, content, categoryId, tags, isPublished } = body

    const prompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        title,
        description,
        content,
        categoryId,
        tags: JSON.stringify(tags || []),
        isPublished,
      },
      include: { category: true },
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
  _request: unknown,
  { params }: { params: { id: string } }
) {
  try {
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
