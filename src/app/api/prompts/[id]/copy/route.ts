import { NextResponse } from 'next/server'
import { incrementCopyCount } from '@/lib/data/prompts'

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await incrementCopyCount(params.id)
    return NextResponse.json({ copyCount: result.copyCount })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
