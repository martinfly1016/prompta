import { NextResponse } from 'next/server'
import { incrementViewCount } from '@/lib/data/prompts'

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await incrementViewCount(params.id)
    return NextResponse.json({ viewCount: result.viewCount })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
