// @ts-nocheck
// One-shot: bulk URL Inspection across all sitemap URLs to categorize index coverage.
// Output: /tmp/gsc-coverage.json + console summary

import { loadGoogleCredentials, SITE_URL } from './config'

const CONCURRENCY = 6
const SLEEP_MS = 200

const PUBLIC_BASE = 'https://www.prompta.jp'

async function fetchSitemapUrls(): Promise<string[]> {
  const xml = await fetch(`${PUBLIC_BASE}/sitemap.xml`).then((r) => r.text())
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || []
  return matches.map((m) => m.replace(/<\/?loc>/g, ''))
}

async function inspect(searchconsole: any, url: string) {
  try {
    const res = await searchconsole.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl: SITE_URL },
    })
    const r = res.data?.inspectionResult || {}
    const idx = r.indexStatusResult || {}
    return {
      url,
      verdict: idx.verdict,            // PASS / FAIL / NEUTRAL / PARTIAL
      coverageState: idx.coverageState,
      indexingState: idx.indexingState,
      pageFetchState: idx.pageFetchState,
      crawledAs: idx.crawledAs,
      lastCrawlTime: idx.lastCrawlTime,
      googleCanonical: idx.googleCanonical,
      userCanonical: idx.userCanonical,
      sitemap: idx.sitemap?.[0],
      referringUrls: idx.referringUrls?.length || 0,
      robotsTxtState: idx.robotsTxtState,
    }
  } catch (e: any) {
    return { url, error: e?.message?.slice(0, 200) || 'unknown' }
  }
}

async function main() {
  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  })
  const searchconsole = google.searchconsole({ version: 'v1', auth })

  const urls = await fetchSitemapUrls()
  const limitArg = process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1]
  const limit = limitArg ? parseInt(limitArg, 10) : urls.length
  const target = urls.slice(0, limit)

  console.error(`Inspecting ${target.length}/${urls.length} URLs (concurrency=${CONCURRENCY})...`)

  const results: any[] = []
  let done = 0
  const queue = [...target]

  async function worker() {
    while (queue.length) {
      const url = queue.shift()
      if (!url) break
      const r = await inspect(searchconsole, url)
      results.push(r)
      done++
      if (done % 20 === 0) console.error(`  ${done}/${target.length}`)
      await new Promise((res) => setTimeout(res, SLEEP_MS))
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))

  const fs = await import('node:fs')
  fs.writeFileSync('/tmp/gsc-coverage.json', JSON.stringify(results, null, 2))

  // ===== Summary =====
  const buckets: Record<string, number> = {}
  const byTypeBuckets: Record<string, Record<string, number>> = {}
  const samplesPerBucket: Record<string, string[]> = {}

  for (const r of results) {
    const key = r.error ? `ERROR: ${r.error.slice(0, 50)}` : r.coverageState || 'UNKNOWN'
    buckets[key] = (buckets[key] || 0) + 1

    // path-prefix bucket
    let kind = 'other'
    const u = r.url
    if (u.includes('/prompt/')) kind = 'prompt'
    else if (u.includes('/prompts/')) kind = 'category'
    else if (u.includes('/tag/')) kind = 'tag'
    else if (u.includes('/tools/')) kind = 'tool'
    else if (u.includes('/guides/')) kind = 'guide'
    else if (u === SITE_URL || u === SITE_URL + '/') kind = 'home'

    byTypeBuckets[kind] = byTypeBuckets[kind] || {}
    byTypeBuckets[kind][key] = (byTypeBuckets[kind][key] || 0) + 1

    if (!samplesPerBucket[key]) samplesPerBucket[key] = []
    if (samplesPerBucket[key].length < 5) samplesPerBucket[key].push(r.url)
  }

  console.log('\n=== COVERAGE SUMMARY ===')
  console.log(`Total inspected: ${results.length}`)
  console.log('\n--- by coverageState ---')
  for (const [k, v] of Object.entries(buckets).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${v.toString().padStart(4)}  ${k}`)
  }

  console.log('\n--- by url type × coverageState ---')
  for (const [kind, sub] of Object.entries(byTypeBuckets)) {
    console.log(`  ${kind}:`)
    for (const [k, v] of Object.entries(sub).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${v.toString().padStart(4)}  ${k}`)
    }
  }

  console.log('\n--- sample URLs per bucket (up to 5) ---')
  for (const [k, samples] of Object.entries(samplesPerBucket)) {
    console.log(`  [${k}]`)
    for (const s of samples) console.log(`    - ${s}`)
  }

  console.log('\nFull results: /tmp/gsc-coverage.json')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
