/**
 * Per-anon paywall behavior for the 2 personal-color exhausted users (and
 * also hair-color for cross-reference). Shows each anon's full ToolUsage
 * timeline so we can see retry patterns, time gaps, and whether they
 * eventually converted on a different tool.
 *
 * Window: last 7 days by default.
 */
import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()
  const days = 7
  const since = new Date()
  since.setDate(since.getDate() - days)

  for (const tool of ['personal-color', 'hair-color']) {
    console.log(`\n========== ${tool} ==========\n`)

    // Find anon users who hit exhausted (>= 3 free in window)
    const usages = await p.toolUsage.findMany({
      where: { tool, createdAt: { gte: since } },
      orderBy: { createdAt: 'asc' },
      select: { anonId: true, ipHash: true, type: true, createdAt: true, emailHash: true },
    })

    // Group by anonId
    const byAnon: Record<string, typeof usages> = {}
    for (const u of usages) {
      if (!byAnon[u.anonId]) byAnon[u.anonId] = []
      byAnon[u.anonId].push(u)
    }

    // Filter to anons with >= 3 free uses (exhausted)
    const exhaustedAnons = Object.entries(byAnon)
      .filter(([, list]) => list.filter(u => u.type === 'free').length >= 3)
      .sort((a, b) => b[1].length - a[1].length)

    console.log(`Total anons: ${Object.keys(byAnon).length}`)
    console.log(`Exhausted anons (>= 3 free): ${exhaustedAnons.length}\n`)

    for (const [anonId, list] of exhaustedAnons) {
      const free = list.filter(u => u.type === 'free').length
      const paid = list.filter(u => u.type === 'paid').length
      const firstUse = list[0].createdAt
      const lastUse = list[list.length - 1].createdAt
      const spanMs = lastUse.getTime() - firstUse.getTime()
      const spanH = (spanMs / 1000 / 3600).toFixed(1)

      console.log(`anon=${anonId.slice(0, 12)}... | ${list.length} total (free=${free}, paid=${paid}) | span ${spanH}h | ipHash=${list[0].ipHash.slice(0, 8)}...`)
      for (const u of list) {
        const t = new Date(u.createdAt).toISOString().replace('T', ' ').replace(/\..+/, '')
        const tag = u.type === 'paid' ? '💰 PAID' : '· free'
        const email = u.emailHash ? ` email=${u.emailHash.slice(0, 8)}...` : ''
        console.log(`  ${t}  ${tag}${email}`)
      }
      console.log()
    }
  }

  // Cross-tool view: any anon that triggered exhaustion on BOTH tools?
  console.log('\n========== Cross-tool overlap ==========\n')
  const allUsages = await p.toolUsage.findMany({
    where: { createdAt: { gte: since } },
    select: { anonId: true, tool: true, type: true },
  })
  const anonToolMap: Record<string, Record<string, { free: number; paid: number }>> = {}
  for (const u of allUsages) {
    if (!anonToolMap[u.anonId]) anonToolMap[u.anonId] = {}
    if (!anonToolMap[u.anonId][u.tool]) anonToolMap[u.anonId][u.tool] = { free: 0, paid: 0 }
    anonToolMap[u.anonId][u.tool][u.type as 'free' | 'paid']++
  }
  const multiTool = Object.entries(anonToolMap).filter(([, t]) => Object.keys(t).length > 1)
  console.log(`Anons that used >1 tool in window: ${multiTool.length}`)
  for (const [anonId, tools] of multiTool) {
    const summary = Object.entries(tools).map(([t, c]) => `${t}(free=${c.free},paid=${c.paid})`).join(' | ')
    console.log(`  ${anonId.slice(0, 12)}...  ${summary}`)
  }

  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
