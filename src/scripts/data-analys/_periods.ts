// @ts-nocheck
import { loadGoogleCredentials, GA4_PROPERTY_ID, parseArgs } from './config'

async function main() {
  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })

  // Dynamic windows: ends yesterday (GSC/GA both lag <= 24h), 7-day spans.
  // Override via --this-start / --prev-start CLI args if needed.
  const args = parseArgs()
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const today = new Date()
  const thisEnd = new Date(today); thisEnd.setDate(today.getDate() - 1)
  const thisStart = new Date(thisEnd); thisStart.setDate(thisEnd.getDate() - 6)
  const prevEnd = new Date(thisStart); prevEnd.setDate(thisStart.getDate() - 1)
  const prevStart = new Date(prevEnd); prevStart.setDate(prevEnd.getDate() - 6)
  const periods = [
    { name: 'this', startDate: args['this-start'] ?? fmt(thisStart), endDate: args['this-end'] ?? fmt(thisEnd) },
    { name: 'prev', startDate: args['prev-start'] ?? fmt(prevStart), endDate: args['prev-end'] ?? fmt(prevEnd) },
  ]

  const out: any = {}
  for (const p of periods) {
    const [totals, sources] = await Promise.all([
      analyticsdata.properties.runReport({
        property: `properties/${GA4_PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: p.startDate, endDate: p.endDate }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'sessions' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
            { name: 'screenPageViews' },
          ],
        },
      }),
      analyticsdata.properties.runReport({
        property: `properties/${GA4_PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: p.startDate, endDate: p.endDate }],
          dimensions: [{ name: 'sessionSource' }],
          metrics: [
            { name: 'sessions' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
          ],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 25,
        },
      }),
    ])

    const tRow = totals.data.rows?.[0]?.metricValues ?? []
    out[p.name] = {
      window: `${p.startDate}~${p.endDate}`,
      activeUsers: parseInt(tRow[0]?.value ?? '0', 10),
      sessions: parseInt(tRow[1]?.value ?? '0', 10),
      avgSessionDuration: parseFloat(tRow[2]?.value ?? '0').toFixed(1) + 's',
      bounceRate: (parseFloat(tRow[3]?.value ?? '0') * 100).toFixed(1) + '%',
      pageviews: parseInt(tRow[4]?.value ?? '0', 10),
      sources: (sources.data.rows ?? []).map((r: any) => ({
        source: r.dimensionValues?.[0]?.value,
        sessions: parseInt(r.metricValues?.[0]?.value ?? '0', 10),
        avgSessionDuration: parseFloat(r.metricValues?.[1]?.value ?? '0').toFixed(1) + 's',
        bounceRate: (parseFloat(r.metricValues?.[2]?.value ?? '0') * 100).toFixed(1) + '%',
      })),
    }
  }
  console.log(JSON.stringify(out, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
