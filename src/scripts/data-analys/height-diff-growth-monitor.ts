// @ts-nocheck
/**
 * Height-difference growth monitor.
 *
 * Low-frequency daily run:
 *   npx tsx src/scripts/data-analys/height-diff-growth-monitor.ts --days=7
 *
 * What it checks:
 *   1. GSC query performance for the height-difference cluster
 *   2. GSC landing-page performance for tool + P1 guides
 *   3. GA4 traffic for the same pages
 *   4. GA4 client events from /tools/height-difference-maker
 *   5. URL Inspection baseline + manual GSC request-indexing checklist
 */

import { loadGoogleCredentials, parseArgs, SITE_URL, GA4_PROPERTY_ID } from './config'
import { WATCH_KEYWORDS } from '../../lib/seo/watch-keywords'

const PUBLIC_ORIGIN = process.env.PUBLIC_SITE_URL || 'https://www.prompta.jp'
const HEIGHT_DIFF_URLS = [
  '/tools/height-difference-maker',
  '/guides/height-difference-pair-prompt',
  '/guides/oshi-height-difference-ai-guide',
  '/guides/body-size-difference-prompt-guide',
  '/guides/height-difference-illustration-composition-guide',
  '/tag/身長差',
]

const TOOL_EVENTS = [
  'height_difference_tool_view',
  'height_difference_tool_click',
  'height_difference_prompt_copy',
]

const fmtDate = (d: Date) => d.toISOString().slice(0, 10)
const pct = (n: number) => `${(n * 100).toFixed(2)}%`
const pos = (n: number) => n ? n.toFixed(2) : 'N/A'

function windowRange(days: number) {
  const end = new Date()
  end.setDate(end.getDate() - 1)
  const start = new Date(end)
  start.setDate(start.getDate() - days + 1)
  return { startDate: fmtDate(start), endDate: fmtDate(end) }
}

async function gscQueryRows(searchconsole: any, startDate: string, endDate: string) {
  const keywords = WATCH_KEYWORDS
    .filter(k => k.cluster === 'height-difference-spike')
    .map(k => k.keyword)

  const rows = []
  for (const keyword of keywords) {
    const resp = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{
          filters: [{ dimension: 'query', operator: 'equals', expression: keyword }],
        }],
        rowLimit: 10,
      },
    })
    const best = resp.data.rows?.[0]
    rows.push({
      keyword,
      page: best?.keys?.[1]?.replace(PUBLIC_ORIGIN, '') ?? '-',
      clicks: best?.clicks ?? 0,
      impressions: best?.impressions ?? 0,
      ctr: best?.ctr ?? 0,
      position: best?.position ?? 0,
    })
  }
  return rows.sort((a, b) => b.impressions - a.impressions)
}

async function gscPageRows(searchconsole: any, startDate: string, endDate: string) {
  const rows = []
  for (const path of HEIGHT_DIFF_URLS) {
    const resp = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{ dimension: 'page', operator: 'equals', expression: `${PUBLIC_ORIGIN}${path}` }],
        }],
        rowLimit: 1,
      },
    })
    const row = resp.data.rows?.[0]
    rows.push({
      path,
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
      ctr: row?.ctr ?? 0,
      position: row?.position ?? 0,
    })
  }
  return rows.sort((a, b) => b.impressions - a.impressions)
}

async function gaPageRows(analyticsdata: any, startDate: string, endDate: string) {
  if (!GA4_PROPERTY_ID) return []
  const resp = await analyticsdata.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
        { name: 'eventCount' },
      ],
      dimensionFilter: {
        orGroup: {
          expressions: HEIGHT_DIFF_URLS.map(path => ({
            filter: {
              fieldName: 'pagePath',
              stringFilter: { matchType: 'EXACT', value: path },
            },
          })),
        },
      },
      limit: String(HEIGHT_DIFF_URLS.length),
    },
  })
  return (resp.data.rows || []).map(row => ({
    path: row.dimensionValues[0].value,
    activeUsers: Number(row.metricValues[0].value || 0),
    sessions: Number(row.metricValues[1].value || 0),
    avgSessionDuration: Number(row.metricValues[2].value || 0),
    eventCount: Number(row.metricValues[3].value || 0),
  }))
}

async function gaEventRows(analyticsdata: any, startDate: string, endDate: string) {
  if (!GA4_PROPERTY_ID) return []
  const resp = await analyticsdata.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'activeUsers' }],
      dimensionFilter: {
        orGroup: {
          expressions: TOOL_EVENTS.map(eventName => ({
            filter: {
              fieldName: 'eventName',
              stringFilter: { matchType: 'EXACT', value: eventName },
            },
          })),
        },
      },
      limit: String(TOOL_EVENTS.length),
    },
  })
  return (resp.data.rows || []).map(row => ({
    eventName: row.dimensionValues[0].value,
    eventCount: Number(row.metricValues[0].value || 0),
    activeUsers: Number(row.metricValues[1].value || 0),
  }))
}

async function inspectUrls(searchconsole: any) {
  const rows = []
  for (const path of HEIGHT_DIFF_URLS.slice(0, 5)) {
    try {
      const resp = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: `${PUBLIC_ORIGIN}${path}`,
          siteUrl: SITE_URL,
        },
      })
      const idx = resp.data?.inspectionResult?.indexStatusResult
      rows.push({
        path,
        verdict: idx?.verdict ?? 'UNKNOWN',
        coverageState: idx?.coverageState ?? 'UNKNOWN',
        lastCrawlTime: idx?.lastCrawlTime ?? '-',
      })
    } catch (e: any) {
      rows.push({ path, verdict: 'ERROR', coverageState: e.message ?? String(e), lastCrawlTime: '-' })
    }
  }
  return rows
}

async function submitSitemap(searchconsole: any) {
  const sitemapUrl = `${PUBLIC_ORIGIN}/sitemap.xml`
  try {
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: sitemapUrl,
    })
    return [`GSC sitemap submitted: ${sitemapUrl}`]
  } catch (e: any) {
    return [`GSC sitemap submit failed: ${e.message ?? String(e)}`]
  }
}

async function main() {
  const args = parseArgs()
  const days = Number(args.days || 7)
  const { startDate, endDate } = windowRange(days)

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly',
    ],
  })

  const searchconsole = google.searchconsole({ version: 'v1', auth })
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })

  const [gscQueries, gscPages, gaPages, gaEvents, inspections, sitemapResults] = await Promise.all([
    gscQueryRows(searchconsole, startDate, endDate),
    gscPageRows(searchconsole, startDate, endDate),
    gaPageRows(analyticsdata, startDate, endDate),
    gaEventRows(analyticsdata, startDate, endDate),
    inspectUrls(searchconsole),
    submitSitemap(searchconsole),
  ])

  console.log(`# Height Difference Growth Monitor (${startDate}〜${endDate})\n`)

  console.log('## GSC Queries')
  console.log('| keyword | page | clicks | impressions | CTR | pos |')
  console.log('|---|---|---:|---:|---:|---:|')
  for (const r of gscQueries) {
    console.log(`| ${r.keyword} | ${r.page} | ${r.clicks} | ${r.impressions} | ${pct(r.ctr)} | ${pos(r.position)} |`)
  }

  console.log('\n## GSC Pages')
  console.log('| page | clicks | impressions | CTR | pos |')
  console.log('|---|---:|---:|---:|---:|')
  for (const r of gscPages) {
    console.log(`| ${r.path} | ${r.clicks} | ${r.impressions} | ${pct(r.ctr)} | ${pos(r.position)} |`)
  }

  console.log('\n## GA4 Pages')
  console.log('| page | users | sessions | avg sec | events |')
  console.log('|---|---:|---:|---:|---:|')
  for (const r of gaPages) {
    console.log(`| ${r.path} | ${r.activeUsers} | ${r.sessions} | ${r.avgSessionDuration.toFixed(1)} | ${r.eventCount} |`)
  }

  console.log('\n## GA4 Tool Events')
  console.log('| event | events | users |')
  console.log('|---|---:|---:|')
  for (const r of gaEvents) {
    console.log(`| ${r.eventName} | ${r.eventCount} | ${r.activeUsers} |`)
  }
  if (gaEvents.length === 0) {
    console.log('| - | 0 | 0 |')
    console.log('\n> New GA4 events can take 24h to appear. Register custom dimensions later only if slicing by mode/output is needed.')
  }

  console.log('\n## URL Inspection Baseline')
  console.log('| page | verdict | coverage | last crawl |')
  console.log('|---|---|---|---|')
  for (const r of inspections) {
    console.log(`| ${r.path} | ${r.verdict} | ${r.coverageState} | ${r.lastCrawlTime} |`)
  }

  console.log('\n## Sitemap Submit')
  for (const line of sitemapResults) console.log(`- ${line}`)

  console.log('\n## Manual GSC Request Indexing')
  console.log(`GSC: https://search.google.com/search-console?resource_id=${encodeURIComponent(SITE_URL)}`)
  for (const path of HEIGHT_DIFF_URLS.slice(0, 5)) {
    console.log(`- ${PUBLIC_ORIGIN}${path}`)
  }

  console.log('\n## Decision Rules')
  console.log('- pos 6-15 + impressions up + CTR < 1%: rewrite title/description or add FAQ snippet.')
  console.log('- page mismatch vs watch-keywords target: add stronger internal link to the intended page.')
  console.log('- prompt copy / tool view < 5% after traffic appears: move output card higher or tighten CTA copy.')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
