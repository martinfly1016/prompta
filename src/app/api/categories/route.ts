import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    console.log('📝 GET /api/categories called')
    console.log('📝 DATABASE_URL:', process.env.DATABASE_URL ? 'configured' : 'NOT SET')
    console.log('📝 NODE_ENV:', process.env.NODE_ENV)

    const categories = await prisma.category.findMany({
      include: { _count: { select: { prompts: true } } },
      orderBy: { order: 'asc' },
    })
    console.log('✅ Categories fetched successfully:', categories.length)
    return NextResponse.json(categories)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : ''
    console.error('❌ Failed to fetch categories:', errorMsg)
    console.error('❌ Error stack:', errorStack)
    return NextResponse.json(
      {
        error: 'カテゴリ取得に失敗しました',
        message: errorMsg,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, icon } = body

    if (!name) {
      return NextResponse.json(
        { error: 'カテゴリ名は必須です' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: slugify(name),
        description,
        icon,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'カテゴリ作成に失敗しました' },
      { status: 500 }
    )
  }
}
