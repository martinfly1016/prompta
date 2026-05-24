// @ts-nocheck
/**
 * Probe: for sessions LANDING on /tag/身長差, did they continue to a prompt detail?
 *
 * Method:
 *   1. Landing-page report: sessions, pageviews, engagedSessions
 *      → pageviews/session > 1 means people navigated further
 *   2. Top 2nd pages (sessionSecondaryPage proxy): use pagePath dim with landingPage filter
 *      to see which pages those same sessions hit
 */
import { loadGoogleCredentials, parseArgs, checkEnv, GA4_PROPERTY_ID } from './config'

async function main() {
  checkEnv(['GOOGLE_SERVICE_ACCOUNT_JSON', 'GA4_PROPERTY_ID'])
  const args = parseArgs()
  const days = parseInt(args['days'] || '7', 10)
  const landing = args['landing'] || '/tag/身長差'

  const { google } = await import('googleapis')
  const auth = new google.auth.GoogleAuth({
    credentials: loadGoogleCredentials(),
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
  const ad = google.analyticsdata({ version: 'v1beta', auth })

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const dateRanges = [{ startDate: fmt(startDate), endDate: fmt(endDate) }]

  // Q1: Landing-page totals (sessions / pageviews / engaged / events)
  const q1 = await ad.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
      dateRanges,
      dimensions: [{ name: 'landingPagePlusQueryString' }],
      metrics: [
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'engagedSessions' },
        { name: 'eventCount' },
        { name: 'averageSessionDuration' },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'landingPagePlusQueryString',
          stringFilter: { matchType: 'BEGINS_WITH', value: landing },
        },
      },
      limit: 5,
    },
  })

  console.log(`=== Q1: sessions landing on ${landing} (last ${days}d) ===`)
  for (const row of q1.data.rows || []) {
    const sessions = Number(row.metricValues?.[0]?.value || 0)
    const pageviews = Number(row.metricValues?.[1]?.value || 0)
    const engaged = Number(row.metricValues?.[2]?.value || 0)
    const events = Number(row.metricValues?.[3]?.value || 0)
    const dur = Number(row.metricValues?.[4]?.value || 0)
    console.log(JSON.stringify({
      landing: row.dimensionValues?.[0]?.value,
      sessions,
      pageviews,
      pageviewsPerSession: (pageviews / Math.max(1, sessions)).toFixed(2),
      engagedSessions: engaged,
      engagementRate: ((engaged / Math.max(1, sessions)) * 100).toFixed(1) + '%',
      eventsPerSession: (events / Math.max(1, sessions)).toFixed(1),
      avgDuration: dur.toFixed(1) + 's',
    }, null, 2))
  }

  // Q2: which pages do these landing-sessions also visit?
  // GA4 trick: filter sessionSource is hard; instead use sessions with landingPage = X dim filter
  // then dim = pagePath gives ALL pages those sessions hit (incl. landing itself)
  const q2 = await ad.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
      dateRanges,
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'landingPagePlusQueryString',
          stringFilter: { matchType: 'BEGINS_WITH', value: landing },
        },
      },
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 25,
    },
  })

  console.log(`\n=== Q2: pages visited by sessions landing on ${landing} (top 25) ===`)
  const rows = (q2.data.rows || []).map(r => ({
    page: r.dimensionValues?.[0]?.value || '',
    pageviews: Number(r.metricValues?.[0]?.value || 0),
    sessions: Number(r.metricValues?.[1]?.value || 0),
  }))
  console.log(JSON.stringify(rows, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
