/**
 * Local DB query helper for data-analys scripts.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=recent-prompts --since=2026-04-16
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=category-counts
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=tag-stats
 */

import { PrismaClient } from '@prisma/client'
import { parseArgs } from './config'

async function main() {
  const args = parseArgs()
  const mode = args['mode'] || 'category-counts'
  const prisma = new PrismaClient()

  try {
    if (mode === 'recent-prompts') {
      const since = args['since']
      if (!since) {
        console.error('--since=YYYY-MM-DD required')
        process.exit(1)
      }
      const prompts = await prisma.prompt.findMany({
        where: {
          isPublished: true,
          createdAt: { gte: new Date(since) },
        },
        select: {
          slug: true,
          title: true,
          createdAt: true,
          category: { select: { slug: true, name: true } },
          tool: { select: { slug: true } },
          tags: { select: { slug: true } },
          _count: { select: { images: true } },
        },
        orderBy: { createdAt: 'desc' },
      })
      const result = prompts.map(p => ({
        slug: p.slug,
        title: p.title,
        createdAt: p.createdAt.toISOString().split('T')[0],
        category: p.category.slug,
        tool: p.tool?.slug ?? null,
        tags: p.tags.map(t => t.slug),
        imageCount: p._count.images,
        url: `/prompt/${p.slug}`,
      }))
      console.log(JSON.stringify(result, null, 2))

    } else if (mode === 'category-counts') {
      const cats = await prisma.category.findMany({
        include: { _count: { select: { prompts: { where: { isPublished: true } } } } },
        orderBy: { order: 'asc' },
      })
      console.log(JSON.stringify(cats.map(c => ({
        slug: c.slug,
        name: c.name,
        count: c._count.prompts,
      })), null, 2))

    } else if (mode === 'tag-stats') {
      const tags = await prisma.tag.findMany({
        where: { isApproved: true },
        include: { _count: { select: { prompts: true } } },
        orderBy: { name: 'asc' },
      })
      const withIntro = tags.filter(t => t.seoIntro)
      const noIntro = tags.filter(t => !t.seoIntro)
      console.log(JSON.stringify({
        totalApproved: tags.length,
        withSeoIntro: withIntro.length,
        withoutSeoIntro: noIntro.length,
        tags: tags.map(t => ({
          slug: t.slug,
          name: t.name,
          prompts: t._count.prompts,
          hasIntro: !!t.seoIntro,
        })),
      }, null, 2))

    } else {
      console.error(`Unknown mode: ${mode}. Use recent-prompts, category-counts, tag-stats`)
      process.exit(1)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(e => { console.error(e); process.exit(1) })
