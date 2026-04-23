// @ts-nocheck — googleapis is installed on first use (npm i --save-dev googleapis)
/**
 * Google Analytics 4 — Data API wrapper.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=28 --dimension=page --limit=30
 *   npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=source --limit=10
 *
 * Prerequisites:
 *   npm install --save-dev googleapis
 *   GOOGLE_SERVICE_ACCOUNT_JSON + GA4_PROPERTY_ID in .env
 */

import { loadGoogleCredentials, parseArgs, checkEnv, GA4_PROPERTY_ID } from './config'

async function main() {
  checkEnv(['GOOGLE_SERVICE_ACCOUNT_JSON', 'GA4_PROPERTY_ID'])
  const args = parseArgs()
  const days = parseInt(args['days'] || '28', 10)
  const dimension = args['dimension'] || 'page'
  const limit = parseInt(args['limit'] || '30', 10)

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })

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

  const resp = await analyticsdata.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
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
    },
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

main().catch(e => { console.error(e); process.exit(1) })
