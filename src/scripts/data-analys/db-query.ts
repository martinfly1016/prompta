/**
 * Local DB query helper for data-analys scripts.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=recent-prompts --since=2026-04-16
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=category-counts
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=tag-stats
 *   npx tsx src/scripts/data-analys/db-query.ts --mode=tool-usage --days=7
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

    } else if (mode === 'tool-usage') {
      const days = parseInt(args['days'] || '7', 10)
      const since = new Date()
      since.setDate(since.getDate() - days)
      const prevSince = new Date(since)
      prevSince.setDate(prevSince.getDate() - days)

      const tools = ['personal-color', 'hair-color']
      const summary: Record<string, unknown> = {}

      for (const tool of tools) {
        const usages = await prisma.toolUsage.findMany({
          where: { tool, createdAt: { gte: since } },
          select: { type: true, anonId: true, emailHash: true, createdAt: true },
        })
        const prevUsages = await prisma.toolUsage.count({
          where: { tool, createdAt: { gte: prevSince, lt: since } },
        })

        const free = usages.filter(u => u.type === 'free').length
        const paid = usages.filter(u => u.type === 'paid').length
        const uniqAnon = new Set(usages.map(u => u.anonId)).size
        const uniqEmail = new Set(usages.filter(u => u.emailHash).map(u => u.emailHash)).size

        const byDay: Record<string, number> = {}
        for (const u of usages) {
          const d = u.createdAt.toISOString().split('T')[0]
          byDay[d] = (byDay[d] || 0) + 1
        }

        summary[tool] = {
          total: usages.length,
          free,
          paid,
          uniqueAnon: uniqAnon,
          uniqueEmail: uniqEmail,
          previousPeriodTotal: prevUsages,
          deltaPct: prevUsages === 0 ? null : Math.round(((usages.length - prevUsages) / prevUsages) * 100),
          byDay,
        }
      }

      const payments = await prisma.stripePayment.findMany({
        where: { status: 'paid', createdAt: { gte: since } },
        select: { amountJpy: true, creditsGranted: true, createdAt: true, emailHash: true },
      })
      const prevPayments = await prisma.stripePayment.aggregate({
        where: { status: 'paid', createdAt: { gte: prevSince, lt: since } },
        _sum: { amountJpy: true },
        _count: true,
      })

      summary['payments'] = {
        count: payments.length,
        revenueJpy: payments.reduce((s, p) => s + p.amountJpy, 0),
        creditsGranted: payments.reduce((s, p) => s + p.creditsGranted, 0),
        uniquePayers: new Set(payments.map(p => p.emailHash)).size,
        previousPeriod: {
          count: prevPayments._count,
          revenueJpy: prevPayments._sum.amountJpy || 0,
        },
      }

      console.log(JSON.stringify({ days, since: since.toISOString().split('T')[0], ...summary }, null, 2))

    } else if (mode === 'paywall-hits') {
      // Server-side ground truth: count anonIds that hit the 3-call free quota.
      // Use this to cross-check GA4 paywall_view event, especially before instrumentation.
      const days = parseInt(args['days'] || '7', 10)
      const since = new Date()
      since.setDate(since.getDate() - days)

      const tools = ['personal-color', 'hair-color']
      const result: Record<string, unknown> = { days, since: since.toISOString().split('T')[0] }

      for (const tool of tools) {
        const usages = await prisma.toolUsage.findMany({
          where: { tool, createdAt: { gte: since } },
          select: { anonId: true, type: true },
        })
        // Group by anonId
        const byAnon = new Map<string, { free: number; paid: number }>()
        for (const u of usages) {
          const cur = byAnon.get(u.anonId) ?? { free: 0, paid: 0 }
          if (u.type === 'free') cur.free++
          else cur.paid++
          byAnon.set(u.anonId, cur)
        }
        const counts = Array.from(byAnon.values())
        const exhausted = counts.filter(c => c.free >= 3).length
        const partial = counts.filter(c => c.free < 3).length
        const paid = counts.filter(c => c.paid > 0).length
        const exhaustedToPaid = counts.filter(c => c.free >= 3 && c.paid > 0).length
        result[tool] = {
          uniqueAnons: byAnon.size,
          exhausted,            // hit ≥3 free calls
          partial,              // <3 free calls (still has quota)
          paid,                 // any paid call
          exhaustedToPaid,      // hit limit AND paid (real conversion)
          conversionRate: exhausted === 0 ? null : Math.round((exhaustedToPaid / exhausted) * 100) + '%',
        }
      }
      console.log(JSON.stringify(result, null, 2))

    } else {
      console.error(`Unknown mode: ${mode}. Use recent-prompts, category-counts, tag-stats, tool-usage, paywall-hits`)
      process.exit(1)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(e => { console.error(e); process.exit(1) })
