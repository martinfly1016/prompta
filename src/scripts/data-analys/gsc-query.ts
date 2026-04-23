// @ts-nocheck — googleapis is installed on first use (npm i --save-dev googleapis)
/**
 * Google Search Console — Search Analytics API wrapper.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/gsc-query.ts --mode=rank-track --keywords="K1,K2" --days=28
 *   npx tsx src/scripts/data-analys/gsc-query.ts --mode=page-performance --urls="/prompt/s1,/prompt/s2" --days=14
 *
 * Prerequisites:
 *   npm install --save-dev googleapis
 *   GOOGLE_SERVICE_ACCOUNT_JSON in .env
 */

import { loadGoogleCredentials, parseArgs, checkEnv, SITE_URL } from './config'

async function main() {
  checkEnv(['GOOGLE_SERVICE_ACCOUNT_JSON'])
  const args = parseArgs()
  const mode = args['mode'] || 'rank-track'
  const days = parseInt(args['days'] || '28', 10)

  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const searchconsole = google.searchconsole({ version: 'v1', auth })

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  if (mode === 'rank-track') {
    const keywords = (args['keywords'] || '').split(',').map(k => k.trim()).filter(Boolean)
    if (keywords.length === 0) {
      console.error('--keywords required for rank-track mode')
      process.exit(1)
    }

    const results = []
    for (const keyword of keywords) {
      const resp = await searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['query'],
          dimensionFilterGroups: [{
            filters: [{ dimension: 'query', expression: keyword, operator: 'equals' }],
          }],
          rowLimit: 1,
        },
      })
      const row = resp.data.rows?.[0]
      results.push({
        keyword,
        clicks: row?.clicks ?? 0,
        impressions: row?.impressions ?? 0,
        ctr: row?.ctr ? (row.ctr * 100).toFixed(2) + '%' : '0%',
        position: row?.position ? row.position.toFixed(2) : 'N/A',
      })
    }
    console.log(JSON.stringify(results, null, 2))

  } else if (mode === 'page-performance') {
    const urls = (args['urls'] || '').split(',').map(u => u.trim()).filter(Boolean)
    if (urls.length === 0) {
      console.error('--urls required for page-performance mode')
      process.exit(1)
    }

    const results = []
    for (const url of urls) {
      const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`
      const resp = await searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['page'],
          dimensionFilterGroups: [{
            filters: [{ dimension: 'page', expression: fullUrl, operator: 'equals' }],
          }],
          rowLimit: 1,
        },
      })
      const row = resp.data.rows?.[0]
      results.push({
        url,
        clicks: row?.clicks ?? 0,
        impressions: row?.impressions ?? 0,
        ctr: row?.ctr ? (row.ctr * 100).toFixed(2) + '%' : '0%',
        position: row?.position ? row.position.toFixed(2) : 'N/A',
      })
    }
    console.log(JSON.stringify(results, null, 2))

  } else if (mode === 'top-queries') {
    const limit = parseInt(args['limit'] || '50', 10)
    const resp = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: ['query'],
        rowLimit: limit,
        orderBy: 'impressions',
      },
    })
    const results = (resp.data.rows || []).map(row => ({
      query: row.keys?.[0] ?? '',
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: ((row.ctr ?? 0) * 100).toFixed(2) + '%',
      position: (row.position ?? 0).toFixed(2),
    }))
    console.log(JSON.stringify(results, null, 2))

  } else if (mode === 'top-pages') {
    const limit = parseInt(args['limit'] || '50', 10)
    const resp = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: ['page'],
        rowLimit: limit,
        orderBy: 'clicks',
      },
    })
    const results = (resp.data.rows || []).map(row => ({
      page: row.keys?.[0]?.replace(SITE_URL, '') ?? '',
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: ((row.ctr ?? 0) * 100).toFixed(2) + '%',
      position: (row.position ?? 0).toFixed(2),
    }))
    console.log(JSON.stringify(results, null, 2))

  } else {
    console.error(`Unknown mode: ${mode}. Use rank-track, page-performance, top-queries, top-pages`)
    process.exit(1)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
