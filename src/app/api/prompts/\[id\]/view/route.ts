import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.prompt.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'ビューカウント更新に失敗しました' },
      { status: 500 }
    )
  }
}
