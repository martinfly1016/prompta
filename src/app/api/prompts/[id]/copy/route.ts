import { NextResponse } from 'next/server'
import { incrementCopyCount } from '@/lib/data/prompts'
import { withPrivateCache } from '@/lib/http-cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await incrementCopyCount(params.id)
    return withPrivateCache(NextResponse.json({ copyCount: result.copyCount }))
  } catch {
    return withPrivateCache(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  }
}
