import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { withPrivateCache } from '@/lib/http-cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Admin category list. Kept off the public CDN cache used by GET /api/categories. */
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return withPrivateCache(NextResponse.json({ error: '認証が必要です' }, { status: 401 }))
  }

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

  return withPrivateCache(NextResponse.json(categories))
}
