import { loadGoogleCredentials, SITE_URL as GSC_SITE_URL } from './config'

// For each "head" keyword, fetch which page on prompta.jp is ranking,
// plus position/impressions/clicks over the past 90 days (longer window to
// capture low-traffic queries).

const HEAD_KEYWORDS = [
  'プロンプト',
  'プロンプト とは',
  'プロンプトとは',
  'プロンプト 意味',
  'プロンプト 書き方',
  'プロンプト 集',
  'プロンプト 生成',
  'プロンプト ai',
  'ai プロンプト',
  'ai プロンプト とは',
  'ai プロンプト コツ',
  '生成ai プロンプト',
  'chatgpt プロンプト',
  'chat gpt プロンプト',
]

async function main() {
  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const webmasters = google.webmasters({ version: 'v3', auth })

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 90)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const results: any[] = []

  for (const keyword of HEAD_KEYWORDS) {
    const resp = await webmasters.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: ['page', 'query'],
        dimensionFilterGroups: [
          {
            filters: [{ dimension: 'query', operator: 'equals', expression: keyword }],
          },
        ],
        rowLimit: 5,
      },
    })

    const rows = resp.data.rows ?? []
    if (!rows.length) {
      results.push({ keyword, pages: [] })
      continue
    }

    results.push({
      keyword,
      pages: rows.map((r: any) => ({
        page: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: (r.ctr * 100).toFixed(2) + '%',
        position: r.position.toFixed(2),
      })),
    })
  }

  console.log(JSON.stringify(results, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
