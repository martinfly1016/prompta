/**
 * GSC opportunity scan: keywords with high impressions but page-2/3 rank.
 *
 * Filter: impressions >= 40 AND position > 20 over the last 7 days (configurable).
 * These are queries Google already considers prompta.jp relevant for but rank
 * too low for clicks — the highest-ROI cluster to push from pos 20-50 into 1-20.
 *
 * Output: opportunities sorted by impressions desc, with their primary
 * landing page and a recommended action category.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/_rank_opportunities.ts
 *   npx tsx src/scripts/data-analys/_rank_opportunities.ts --days=7 --minImpressions=40 --minPosition=20
 */
// @ts-nocheck
import { loadGoogleCredentials, SITE_URL as GSC_SITE_URL } from './config'

function fmt(d: Date) { return d.toISOString().split('T')[0] }

function parseArgs() {
  const out: Record<string, string> = {}
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/)
    if (m) out[m[1]] = m[2]
  }
  return out
}

async function main() {
  const args = parseArgs()
  // Default 28d because 7d window for low-traffic sites rarely has any
  // query with impressions >= 40. GSC web UI also defaults to 28d for the
  // Performance report, which is what the user threshold matches.
  const days = parseInt(args.days || '28', 10)
  const minImpressions = parseInt(args.minImpressions || '40', 10)
  const minPosition = parseFloat(args.minPosition || '20')
  const limit = parseInt(args.limit || '1000', 10)

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const webmasters = google.webmasters({ version: 'v3', auth })

  // GSC data lags 24-48h, so end window yesterday for completeness
  const today = new Date()
  const endDate = new Date(today); endDate.setDate(today.getDate() - 1)
  const startDate = new Date(endDate); startDate.setDate(endDate.getDate() - (days - 1))

  console.log(`Window: ${fmt(startDate)} ~ ${fmt(endDate)} (${days}d)`)
  console.log(`Filter: impressions >= ${minImpressions} AND position > ${minPosition}\n`)

  // First pass: get all queries with their aggregate metrics
  const queriesResp = await webmasters.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: limit,
      orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
    },
  })

  const rows = queriesResp.data.rows ?? []
  const opportunities = rows
    .filter(r => (r.impressions ?? 0) >= minImpressions && (r.position ?? 0) > minPosition)
    .map(r => ({
      query: r.keys![0],
      impressions: r.impressions ?? 0,
      clicks: r.clicks ?? 0,
      ctrPct: ((r.ctr ?? 0) * 100).toFixed(2),
      position: Number((r.position ?? 0).toFixed(2)),
    }))

  console.log(`Found ${opportunities.length} opportunity keywords (of ${rows.length} total queries)\n`)

  // Second pass: for each opportunity, find which page currently ranks
  const enriched: any[] = []
  for (const op of opportunities) {
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

    const topPage = pages[0]
    const cannibalization = pages.length >= 2 ? pages.length : 0

    enriched.push({
      ...op,
      topPage: topPage?.page ?? null,
      pageCount: pages.length,
      cannibalization,
      allPages: pages,
    })
  }

  // Sort by impressions desc
  enriched.sort((a, b) => b.impressions - a.impressions)

  // Output as Markdown table
  console.log('| 排名 | 关键词 | 7d 曝光 | 点击 | CTR | top page | 着陆页数 |')
  console.log('|---|---|---|---|---|---|---|')
  for (const e of enriched) {
    const cannibFlag = e.cannibalization >= 3 ? ' 🔴' : e.cannibalization === 2 ? ' 🟡' : ''
    console.log(`| ${e.position} | ${e.query} | ${e.impressions} | ${e.clicks} | ${e.ctrPct}% | ${e.topPage ?? '?'} | ${e.pageCount}${cannibFlag} |`)
  }

  // Summary by landing page (find which pages have most opportunity volume)
  const byPage: Record<string, { total: number; queries: number; topQueries: string[] }> = {}
  for (const e of enriched) {
    if (!e.topPage) continue
    if (!byPage[e.topPage]) byPage[e.topPage] = { total: 0, queries: 0, topQueries: [] }
    byPage[e.topPage].total += e.impressions
    byPage[e.topPage].queries += 1
    if (byPage[e.topPage].topQueries.length < 3) byPage[e.topPage].topQueries.push(e.query)
  }

  const pages = Object.entries(byPage).sort((a, b) => b[1].total - a[1].total)
  console.log('\n## 按着陆页聚合（机会量最大的页面）')
  console.log('| 页面 | 机会词数 | 7d 曝光合计 | 代表关键词 |')
  console.log('|---|---|---|---|')
  for (const [page, info] of pages.slice(0, 15)) {
    console.log(`| ${page} | ${info.queries} | ${info.total} | ${info.topQueries.join(' / ')} |`)
  }

  console.log('\n## 输出 JSON（脚本可消费）')
  process.stderr.write(JSON.stringify({
    window: { startDate: fmt(startDate), endDate: fmt(endDate), days },
    filter: { minImpressions, minPosition },
    opportunities: enriched,
    byPage: Object.fromEntries(pages),
  }, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
