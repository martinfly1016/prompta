import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    // Environment check
    const dbUrl = process.env.DATABASE_URL
    const nodeEnv = process.env.NODE_ENV

    console.log('=== START: GET /api/categories ===')
    console.log('TIME:', new Date().toISOString())
    console.log('DATABASE_URL configured:', !!dbUrl)
    console.log('NODE_ENV:', nodeEnv)

    if (!dbUrl) {
      console.error('❌ DATABASE_URL is NOT configured!')
      return NextResponse.json(
        {
          error: 'カテゴリ取得に失敗しました',
          reason: 'DATABASE_URL not configured',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    console.log('DATABASE_URL starts with:', dbUrl.substring(0, 20) + '...')
    console.log('Attempting to query categories...')

    // Optimized query with selective field loading
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        icon: true,
        order: true,
        isActive: true,
        _count: { select: { prompts: true } },
      },
      orderBy: { order: 'asc' },
    })

    console.log('✅ Categories fetched successfully:', categories.length, 'records')
    console.log('=== END: GET /api/categories (SUCCESS) ===')
    return NextResponse.json(categories)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    const errorCode = (error as any)?.code || 'UNKNOWN'
    const errorName = error instanceof Error ? error.name : 'UnknownError'

    console.error('=== ERROR: GET /api/categories ===')
    console.error('Error Name:', errorName)
    console.error('Error Code:', errorCode)
    console.error('Error Message:', errorMsg)
    console.error('Full Error:', JSON.stringify(error, null, 2))
    console.error('=== END: GET /api/categories (ERROR) ===')

    return NextResponse.json(
      {
        error: 'カテゴリ取得に失敗しました',
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
