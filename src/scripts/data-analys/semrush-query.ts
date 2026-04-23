/**
 * SEMrush — REST API wrapper for content gap analysis.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/semrush-query.ts \
 *     --mode=content-gap --competitor=romptn.com --our-domain=prompta.jp --limit=20 --db=jp
 *   npx tsx src/scripts/data-analys/semrush-query.ts \
 *     --mode=domain-overview --domain=prompta.jp --db=jp
 *
 * Prerequisites:
 *   SEMRUSH_API_KEY in .env
 *
 * API docs: https://developer.semrush.com/api/
 */

import { parseArgs, checkEnv, SEMRUSH_API_KEY } from './config'

const SEMRUSH_BASE = 'https://api.semrush.com'

async function semrushRequest(params: Record<string, string>): Promise<string[][]> {
  const url = new URL(SEMRUSH_BASE)
  url.searchParams.set('key', SEMRUSH_API_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  const resp = await fetch(url.toString())
  if (!resp.ok) {
    throw new Error(`SEMrush API error: ${resp.status} ${await resp.text()}`)
  }
  const text = await resp.text()
  return text.trim().split('\n').map(line => line.split(';'))
}

async function main() {
  checkEnv(['SEMRUSH_API_KEY'])
  const args = parseArgs()
  const mode = args['mode'] || 'content-gap'
  const db = args['db'] || 'jp'

  if (mode === 'content-gap') {
    const competitor = args['competitor']
    const ourDomain = args['our-domain'] || 'prompta.jp'
    const limit = args['limit'] || '20'
    if (!competitor) {
      console.error('--competitor required for content-gap mode')
      process.exit(1)
    }

    // Get competitor's organic keywords
    const competitorKws = await semrushRequest({
      type: 'domain_organic',
      domain: competitor,
      database: db,
      display_limit: '100',
      display_sort: 'tr_desc', // sort by traffic
      export_columns: 'Ph,Po,Nq,Kd,Tr',
    })

    // Get our organic keywords
    const ourKws = await semrushRequest({
      type: 'domain_organic',
      domain: ourDomain,
      database: db,
      display_limit: '200',
      export_columns: 'Ph,Po',
    })

    const ourKeywords = new Map<string, number>()
    for (const row of ourKws.slice(1)) { // skip header
      ourKeywords.set(row[0], parseFloat(row[1]))
    }

    // Find gaps: keywords competitor ranks for but we don't (or rank much lower)
    const gaps = []
    for (const row of competitorKws.slice(1)) {
      const [keyword, compPos, volume, kd, traffic] = row
      const ourPos = ourKeywords.get(keyword)
      if (!ourPos || ourPos > parseFloat(compPos) + 10) {
        gaps.push({
          keyword,
          competitorPosition: parseFloat(compPos),
          ourPosition: ourPos ?? null,
          monthlyVolume: parseInt(volume, 10),
          keywordDifficulty: parseInt(kd, 10),
          estimatedTraffic: parseFloat(traffic),
          gap: ourPos ? ourPos - parseFloat(compPos) : 'not ranking',
        })
      }
    }

    // Sort by ROI: volume / difficulty
    gaps.sort((a, b) => {
      const roiA = a.monthlyVolume / Math.max(a.keywordDifficulty, 1)
      const roiB = b.monthlyVolume / Math.max(b.keywordDifficulty, 1)
      return roiB - roiA
    })

    console.log(JSON.stringify(gaps.slice(0, parseInt(limit, 10)), null, 2))

  } else if (mode === 'domain-overview') {
    const domain = args['domain'] || 'prompta.jp'
    const rows = await semrushRequest({
      type: 'domain_rank',
      domain,
      database: db,
      export_columns: 'Dn,Rk,Or,Ot,Oc,Ad,At,Ac',
    })
    console.log(JSON.stringify(rows, null, 2))

  } else {
    console.error(`Unknown mode: ${mode}. Use content-gap or domain-overview`)
    process.exit(1)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
