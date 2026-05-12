/**
 * Head keyword rank tracking for daily-report.
 *
 * For each core head keyword in the プロンプト cluster (Type-A definition,
 * Type-B how-to, Type-C directory), compares last 7 days vs the previous
 * 7 days on: clicks / impressions / CTR / average position / primary
 * landing page. Used to detect cannibalization regressions and validate
 * the SEO optimization work from 2026-05-12 (commit d314307).
 *
 * Output: JSON to stdout. Shape:
 *   { window, keywords: [{ keyword, current, previous, delta, status, topPage }] }
 *
 * Usage: npx tsx src/scripts/data-analys/_head_keyword_track.ts [--days=7]
 */
// @ts-nocheck
import { loadGoogleCredentials, SITE_URL as GSC_SITE_URL } from './config'

// Three clusters tracked. Keep in sync with seo/ analysis 2026-05-12.
const HEAD_KEYWORDS = [
  // Type-A: definitional
  { keyword: 'プロンプト', cluster: 'A-定义' },
  { keyword: 'プロンプト とは', cluster: 'A-定义' },
  { keyword: 'プロンプトとは', cluster: 'A-定义' },
  { keyword: 'プロンプト 意味', cluster: 'A-定义' },
  { keyword: 'ai プロンプト とは', cluster: 'A-定义' },
  // Type-B: how-to
  { keyword: 'プロンプト 書き方', cluster: 'B-書き方' },
  { keyword: 'プロンプト 生成', cluster: 'B-書き方' },
  { keyword: 'ai プロンプト コツ', cluster: 'B-書き方' },
  { keyword: '生成ai プロンプト', cluster: 'B-書き方' },
  // Type-C: directory / 集
  { keyword: 'ai プロンプト', cluster: 'C-一覧' },
  { keyword: 'プロンプト 集', cluster: 'C-一覧' },
  { keyword: 'プロンプト ai', cluster: 'C-一覧' },
  { keyword: 'chatgpt プロンプト', cluster: 'C-一覧' },
  { keyword: 'chat gpt プロンプト', cluster: 'C-一覧' },
]

function fmt(d: Date) { return d.toISOString().split('T')[0] }

function parseArgs() {
  const out: Record<string, string> = {}
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/)
    if (m) out[m[1]] = m[2]
  }
  return out
}

async function query(webmasters: any, startDate: string, endDate: string, keyword: string) {
  const resp = await webmasters.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      dimensionFilterGroups: [
        { filters: [{ dimension: 'query', operator: 'equals', expression: keyword }] },
      ],
      rowLimit: 1,
    },
  })
  const r = resp.data.rows?.[0]
  if (!r) return { clicks: 0, impressions: 0, ctr: 0, position: null }
  return {
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? null,
  }
}

async function topPage(webmasters: any, startDate: string, endDate: string, keyword: string) {
  const resp = await webmasters.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      dimensionFilterGroups: [
        { filters: [{ dimension: 'query', operator: 'equals', expression: keyword }] },
      ],
      orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
      rowLimit: 1,
    },
  })
  const r = resp.data.rows?.[0]
  if (!r) return null
  const url = r.keys[0] as string
  return {
    page: url.replace(/^https?:\/\/[^/]+/, ''),
    impressions: r.impressions ?? 0,
    position: r.position ?? null,
  }
}

function classifyStatus(prevPos: number | null, currPos: number | null): string {
  if (prevPos == null && currPos == null) return '⚫ 未在SERP'
  if (prevPos == null && currPos != null) return '🆕 新登场'
  if (prevPos != null && currPos == null) return '⚫ 消失'
  const delta = (currPos as number) - (prevPos as number)
  if (delta <= -5) return '🟢 大幅改善'
  if (delta <= -2) return '🟢 改善'
  if (delta >= 5) return '🔴 大幅悪化'
  if (delta >= 2) return '🔴 悪化'
  return '⚪ 横ばい'
}

async function main() {
  const args = parseArgs()
  const days = parseInt(args.days || '7', 10)

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const webmasters = google.webmasters({ version: 'v3', auth })

  // GSC data lags ~24-48h, so end the windows yesterday to ensure 完整 data
  const today = new Date()
  const currEnd = new Date(today); currEnd.setDate(today.getDate() - 1)
  const currStart = new Date(currEnd); currStart.setDate(currEnd.getDate() - (days - 1))
  const prevEnd = new Date(currStart); prevEnd.setDate(currStart.getDate() - 1)
  const prevStart = new Date(prevEnd); prevStart.setDate(prevEnd.getDate() - (days - 1))

  const window = {
    current: `${fmt(currStart)}~${fmt(currEnd)}`,
    previous: `${fmt(prevStart)}~${fmt(prevEnd)}`,
  }

  const results: any[] = []
  for (const { keyword, cluster } of HEAD_KEYWORDS) {
    const [curr, prev, page] = await Promise.all([
      query(webmasters, fmt(currStart), fmt(currEnd), keyword),
      query(webmasters, fmt(prevStart), fmt(prevEnd), keyword),
      topPage(webmasters, fmt(currStart), fmt(currEnd), keyword),
    ])

    const positionDelta = curr.position != null && prev.position != null
      ? Number((curr.position - prev.position).toFixed(2))
      : null
    const impressionsDelta = curr.impressions - prev.impressions

    results.push({
      keyword,
      cluster,
      current: {
        clicks: curr.clicks,
        impressions: curr.impressions,
        ctrPct: (curr.ctr * 100).toFixed(2),
        position: curr.position != null ? Number(curr.position.toFixed(2)) : null,
      },
      previous: {
        clicks: prev.clicks,
        impressions: prev.impressions,
        ctrPct: (prev.ctr * 100).toFixed(2),
        position: prev.position != null ? Number(prev.position.toFixed(2)) : null,
      },
      delta: {
        positionDelta,
        impressionsDelta,
        clicksDelta: curr.clicks - prev.clicks,
      },
      status: classifyStatus(prev.position, curr.position),
      topPage: page?.page ?? null,
    })
  }

  console.log(JSON.stringify({ window, days, keywords: results }, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
