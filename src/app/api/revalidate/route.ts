import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { revalidatePublicCatalogTags } from '@/lib/revalidate-public'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CATALOG_PATHS = [
  '/',
  '/prompts',
  '/tools',
  '/guides',
  '/sitemap.xml',
  '/feed.xml',
] as const

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

    // Always drop the tagged catalog cache and the listing routes so a publish
    // shows up on the next request instead of waiting out ISR.
    revalidatePublicCatalogTags()
    revalidated.push('tag:prompts', 'tag:categories', 'tag:tags')
    for (const path of CATALOG_PATHS) {
      revalidatePath(path)
      revalidated.push(`path:${path}`)
    }
    revalidatePath('/prompt/[slug]', 'page')
    revalidatePath('/embed/[slug]', 'page')
    revalidatePath('/prompts/[category]', 'page')
    revalidatePath('/prompts/page/[page]', 'page')
    revalidatePath('/prompts/[category]/page/[page]', 'page')
    revalidatePath('/tools/[tool]', 'page')
    revalidatePath('/tools/[tool]/page/[page]', 'page')
    revalidatePath('/tag/[slug]', 'page')
    revalidatePath('/tag/[slug]/page/[page]', 'page')
    revalidatePath('/guides/[slug]', 'page')
    revalidated.push('path:catalog dynamic routes')

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
