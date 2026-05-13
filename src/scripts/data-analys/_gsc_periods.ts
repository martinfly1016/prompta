import { loadGoogleCredentials, SITE_URL as GSC_SITE_URL } from './config'

async function main() {
  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const webmasters = google.webmasters({ version: 'v3', auth })

  // Dynamic windows: ends yesterday, 7-day spans.
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const today = new Date()
  const thisEnd = new Date(today); thisEnd.setDate(today.getDate() - 1)
  const thisStart = new Date(thisEnd); thisStart.setDate(thisEnd.getDate() - 6)
  const prevEnd = new Date(thisStart); prevEnd.setDate(thisStart.getDate() - 1)
  const prevStart = new Date(prevEnd); prevStart.setDate(prevEnd.getDate() - 6)
  const periods = [
    { name: 'this', startDate: fmt(thisStart), endDate: fmt(thisEnd) },
    { name: 'prev', startDate: fmt(prevStart), endDate: fmt(prevEnd) },
  ]

  const out: any = {}
  for (const p of periods) {
    const r = await webmasters.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate: p.startDate,
        endDate: p.endDate,
        rowLimit: 1,
      },
    })
    const row = r.data.rows?.[0]
    out[p.name] = {
      window: `${p.startDate}~${p.endDate}`,
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
      ctr: row?.ctr ? (row.ctr * 100).toFixed(2) + '%' : '0%',
      position: row?.position?.toFixed(2),
    }
  }
  console.log(JSON.stringify(out, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
