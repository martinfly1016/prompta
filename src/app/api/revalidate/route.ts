import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { paths, tags } = body as { paths?: string[]; tags?: string[] }

    const revalidated: string[] = []

    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path)
        revalidated.push(`path:${path}`)
      }
    }

    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag)
        revalidated.push(`tag:${tag}`)
      }
    }

    // If no specific targets, revalidate all public pages
    if (!paths && !tags) {
      revalidatePath('/', 'layout')
      revalidated.push('path:/ (full layout)')
    }

    return NextResponse.json({
      revalidated: true,
      targets: revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate', details: String(error) },
      { status: 500 },
    )
  }
}
