/**
 * GSC scan: queries with high impressions but underperforming CTR for their rank.
 *
 * Captures the "page-1 bottom" / "page-2 top" cluster that
 * _rank_opportunities.ts (position > 20 filter) misses entirely.
 *
 * Example (body-type プロンプト, May 2026):
 *   impressions 2,609 / clicks 91 / pos 6.4 / CTR 3.5%
 *   → Google already considers prompta.jp page-1-worthy, but content depth
 *     keeps it pinned below the fold.
 *
 * Filter:
 *   impressions >= 200 AND position between 3 and 15 AND CTR < expected*0.6
 *
 * Expected CTR baseline (rough Sistrix 2023 anime/JP study):
 *   pos 1: 32%  pos 2: 18%  pos 3: 11%  pos 4: 7%  pos 5: 5%
 *   pos 6: 4%   pos 7: 3%   pos 8: 2.5% pos 9: 2.2% pos 10: 2%
 *   pos 11-15: 1.5%
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/_ctr_underperformers.ts
 *   npx tsx src/scripts/data-analys/_ctr_underperformers.ts --days=28 --minImpressions=200
 */
// @ts-nocheck
import { loadGoogleCredentials, SITE_URL as GSC_SITE_URL, parseArgs } from './config'

function fmt(d: Date) { return d.toISOString().split('T')[0] }

const EXPECTED_CTR: Record<number, number> = {
  1: 0.32, 2: 0.18, 3: 0.11, 4: 0.07, 5: 0.05,
  6: 0.04, 7: 0.03, 8: 0.025, 9: 0.022, 10: 0.02,
}
function expectedCtr(pos: number): number {
  const p = Math.round(pos)
  if (p <= 10) return EXPECTED_CTR[p] ?? 0.015
  if (p <= 15) return 0.015
  return 0.01
}

async function main() {
  const args = parseArgs()
  const days = parseInt(args.days || '28', 10)
  const minImpressions = parseInt(args.minImpressions || '200', 10)
  const minPos = parseFloat(args.minPos || '3')
  const maxPos = parseFloat(args.maxPos || '15')
  const ctrRatio = parseFloat(args.ctrRatio || '0.6')

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const webmasters = google.webmasters({ version: 'v3', auth })

  const today = new Date()
  const endDate = new Date(today); endDate.setDate(today.getDate() - 1)
  const startDate = new Date(endDate); startDate.setDate(endDate.getDate() - (days - 1))

  console.log(`Window: ${fmt(startDate)} ~ ${fmt(endDate)} (${days}d)`)
  console.log(`Filter: impressions >= ${minImpressions} AND ${minPos} <= pos <= ${maxPos} AND CTR < expected*${ctrRatio}\n`)

  const resp = await webmasters.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: 5000,
      orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
    },
  })

  const rows = resp.data.rows ?? []
  const flagged = rows
    .filter(r => {
      const imp = r.impressions ?? 0
      const pos = r.position ?? 0
      const ctr = r.ctr ?? 0
      if (imp < minImpressions) return false
      if (pos < minPos || pos > maxPos) return false
      const exp = expectedCtr(pos)
      return ctr < exp * ctrRatio
    })
    .map(r => {
      const pos = r.position ?? 0
      const ctr = r.ctr ?? 0
      const exp = expectedCtr(pos)
      return {
        query: r.keys![0],
        impressions: r.impressions ?? 0,
        clicks: r.clicks ?? 0,
        ctrPct: (ctr * 100).toFixed(2),
        expectedCtrPct: (exp * 100).toFixed(1),
        gapRatio: (ctr / exp).toFixed(2),
        position: Number(pos.toFixed(2)),
        gapClicks: Math.round((exp - ctr) * (r.impressions ?? 0)),
      }
    })

  console.log(`Found ${flagged.length} underperforming queries (of ${rows.length} total)\n`)

  // Enrich with top landing page
  const enriched: any[] = []
  for (const op of flagged) {
    const pageResp = await webmasters.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: ['page'],
        dimensionFilterGroups: [
          { filters: [{ dimension: 'query', operator: 'equals', expression: op.query }] },
        ],
        orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
        rowLimit: 3,
      },
    })
    const pages = (pageResp.data.rows ?? []).map(r => ({
      page: r.keys![0].replace(/^https?:\/\/[^/]+/, ''),
      impressions: r.impressions ?? 0,
      position: Number((r.position ?? 0).toFixed(2)),
    }))
    enriched.push({ ...op, topPage: pages[0]?.page ?? null, allPages: pages })
  }

  // Sort by clicks-left-on-table desc (biggest opportunity first)
  enriched.sort((a, b) => b.gapClicks - a.gapClicks)

  console.log('## Page-1 / Page-2 underperformers (highest opportunity first)\n')
  console.log('| 関键词 | pos | 曝光 | 点击 | CTR | 期待CTR | gap比 | 可补点击 | top page |')
  console.log('|---|---|---|---|---|---|---|---|---|')
  for (const e of enriched) {
    console.log(`| ${e.query} | ${e.position} | ${e.impressions} | ${e.clicks} | ${e.ctrPct}% | ${e.expectedCtrPct}% | ${e.gapRatio}× | +${e.gapClicks} | ${e.topPage ?? '?'} |`)
  }

  // Aggregate by landing page
  const byPage: Record<string, { totalImp: number; totalGap: number; queries: string[] }> = {}
  for (const e of enriched) {
    if (!e.topPage) continue
    if (!byPage[e.topPage]) byPage[e.topPage] = { totalImp: 0, totalGap: 0, queries: [] }
    byPage[e.topPage].totalImp += e.impressions
    byPage[e.topPage].totalGap += e.gapClicks
    if (byPage[e.topPage].queries.length < 5) byPage[e.topPage].queries.push(`${e.query}(pos${e.position}, CTR${e.ctrPct}%)`)
  }

  const pages = Object.entries(byPage).sort((a, b) => b[1].totalGap - a[1].totalGap)
  console.log('\n## 按着陆页聚合（潜在补充点击量最大的页面）\n')
  console.log('| 页面 | 関键词数 | 28d 曝光合计 | 可补点击合计 | 代表査询 |')
  console.log('|---|---|---|---|---|')
  for (const [page, info] of pages.slice(0, 20)) {
    console.log(`| ${page} | ${info.queries.length} | ${info.totalImp} | +${info.totalGap} | ${info.queries.slice(0, 3).join(' / ')} |`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
