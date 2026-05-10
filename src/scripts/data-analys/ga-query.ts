// @ts-nocheck — googleapis is installed on first use (npm i --save-dev googleapis)
/**
 * Google Analytics 4 — Data API wrapper.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=28 --dimension=page --limit=30
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=source --limit=10
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=page --page-filter=/tools/personal-color-analysis
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=tool-funnel --days=7
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=tool-funnel --days=7 --tool=hair-color
 *
 * Prerequisites:
 *   npm install --save-dev googleapis
 *   GOOGLE_SERVICE_ACCOUNT_JSON + GA4_PROPERTY_ID in .env
 */

import { loadGoogleCredentials, parseArgs, checkEnv, GA4_PROPERTY_ID } from './config'

async function main() {
  checkEnv(['GOOGLE_SERVICE_ACCOUNT_JSON', 'GA4_PROPERTY_ID'])
  const args = parseArgs()
  const mode = args['mode'] || 'traffic-report'
  const days = parseInt(args['days'] || '28', 10)
  const dimension = args['dimension'] || 'page'
  const limit = parseInt(args['limit'] || '30', 10)
  const pageFilter = args['page-filter']

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })

  if (mode === 'tool-funnel') {
    return runToolFunnel(analyticsdata, days, args['tool'])
  }

  // Map user-friendly dimension names to GA4 API dimension names
  const dimensionMap: Record<string, string> = {
    page: 'pagePath',
    source: 'sessionDefaultChannelGrouping',
    category: 'pagePath', // will filter /prompts/* later
    device: 'deviceCategory',
    country: 'country',
  }
  const gaDimension = dimensionMap[dimension] || 'pagePath'

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const requestBody: Record<string, unknown> = {
    dateRanges: [{ startDate: fmt(startDate), endDate: fmt(endDate) }],
    dimensions: [{ name: gaDimension }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
      { name: 'eventCount' },
    ],
    limit,
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  }
  if (pageFilter && gaDimension === 'pagePath') {
    requestBody.dimensionFilter = {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'BEGINS_WITH', value: pageFilter },
      },
    }
  }
  const resp = await analyticsdata.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody,
  })

  const rows = resp.data.rows || []
  const results = rows.map(row => ({
    [dimension]: row.dimensionValues?.[0]?.value ?? '',
    activeUsers: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
    sessions: parseInt(row.metricValues?.[1]?.value ?? '0', 10),
    avgSessionDuration: parseFloat(row.metricValues?.[2]?.value ?? '0').toFixed(1) + 's',
    bounceRate: (parseFloat(row.metricValues?.[3]?.value ?? '0') * 100).toFixed(1) + '%',
    eventCount: parseInt(row.metricValues?.[4]?.value ?? '0', 10),
  }))

  console.log(JSON.stringify(results, null, 2))
}

/**
 * Paywall funnel: paywall_view → paywall_purchase_click → checkout_started.
 * Outputs eventName aggregate counts. Per-tool / per-trigger breakdown
 * requires `tool` and `trigger` to be registered as event-scoped Custom
 * Dimensions in GA4 admin (Property → Custom definitions). After registration
 * + 24-48h backfill, the breakdown query becomes available.
 *
 * StripePayment success comes from db-query.ts tool-usage mode (already wired).
 */
async function runToolFunnel(analyticsdata, days: number, toolFilter?: string) {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const dateRange = { startDate: fmt(startDate), endDate: fmt(endDate) }

  const eventNames = ['paywall_view', 'paywall_purchase_click', 'checkout_started']

  // Aggregate counts by eventName. No tool/trigger split until custom
  // dimensions are registered; consumer falls back to the event name only.
  const totalsResp = await analyticsdata.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: eventNames },
        },
      },
      limit: 50,
    },
  })

  const counts: Record<string, number> = { paywall_view: 0, paywall_purchase_click: 0, checkout_started: 0 }
  for (const row of totalsResp.data.rows || []) {
    const evt = row.dimensionValues?.[0]?.value || ''
    const c = parseInt(row.metricValues?.[0]?.value ?? '0', 10)
    counts[evt] = (counts[evt] || 0) + c
  }

  // Per-tool/per-trigger split (only works once user registers custom dims)
  let perToolBreakdown: Record<string, unknown> | null = null
  try {
    const splitResp = await analyticsdata.properties.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [{ name: 'eventName' }, { name: 'customEvent:tool' }, { name: 'customEvent:trigger' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', inListFilter: { values: eventNames } },
        },
        limit: 200,
      },
    })
    perToolBreakdown = {}
    for (const row of splitResp.data.rows || []) {
      const evt = row.dimensionValues?.[0]?.value || ''
      const tool = row.dimensionValues?.[1]?.value || '(unset)'
      const trig = row.dimensionValues?.[2]?.value || '(unset)'
      const c = parseInt(row.metricValues?.[0]?.value ?? '0', 10)
      if (toolFilter && tool !== toolFilter) continue
      const key = `${tool}.${evt}${evt === 'paywall_view' ? '.' + trig : ''}`
      perToolBreakdown[key] = (perToolBreakdown[key] || 0) + c
    }
  } catch (e: any) {
    // Custom dim not registered yet — that's OK, just emit a hint.
    perToolBreakdown = {
      _note: 'Per-tool/per-trigger split unavailable. Register `tool` and `trigger` as event-scoped Custom Dimensions in GA4 admin → Property → Custom definitions. After 24-48h, this section will populate automatically.',
      _error: e?.cause?.message || e?.message || 'unknown',
    }
  }

  const view = counts['paywall_view'] || 0
  const click = counts['paywall_purchase_click'] || 0
  const checkout = counts['checkout_started'] || 0
  console.log(JSON.stringify({
    range: dateRange,
    aggregate: {
      paywall_view: view,
      paywall_purchase_click: click,
      checkout_started: checkout,
      conversion: {
        view_to_click: view > 0 ? +(click / view * 100).toFixed(1) : null,
        click_to_checkout: click > 0 ? +(checkout / click * 100).toFixed(1) : null,
      },
    },
    perToolBreakdown,
  }, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
