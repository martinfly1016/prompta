/**
 * Accelerate Google re-crawl of the 4 pages changed by the May-12 SEO
 * optimization (commits d314307 → 963a500 → 768a122).
 *
 * Steps:
 *   1. Baseline current GSC index status via URL Inspection API for each URL
 *   2. Push the same URLs through IndexNow (Bing + Yandex pick this up; Google
 *      ignores it but the request is cheap and improves overall coverage)
 *   3. Print a clear checklist for the user to manually trigger "Request
 *      indexing" in GSC for each URL — there is no API for that action
 *
 * Usage: npx tsx src/scripts/data-analys/_recrawl_seo_pages.ts
 */
// @ts-nocheck
import { loadGoogleCredentials, SITE_URL as GSC_SITE_URL } from './config'

const TARGET_URLS = [
  { path: '/', label: 'Homepage (Type-C anchor: AI プロンプト一覧 / 集)', commit: 'd314307' },
  { path: '/guides/what-is-prompt', label: 'Type-A anchor: プロンプトとは / 意味', commit: 'd314307' },
  { path: '/guides/prompt-writing-guide', label: 'Type-B anchor: プロンプト 書き方', commit: '963a500' },
  { path: '/tools/chatgpt', label: 'Tool-specific: chatgpt プロンプト', commit: '768a122' },
  { path: '/tools/gemini', label: 'Tool-specific: gemini プロンプト (28d pos 38.3)', commit: 'a7fe3fa' },
  { path: '/prompts/writing', label: 'Category SEO: ai ライティング プロンプト (pos 20.3)', commit: 'pending' },
  { path: '/prompts/cosplay', label: 'Category SEO: ai コスプレ (pos 23.5)', commit: 'pending' },
]

const HOST = 'www.prompta.jp'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || ''

async function inspectUrl(searchconsole: any, fullUrl: string) {
  try {
    const r = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: fullUrl,
        siteUrl: GSC_SITE_URL,
      },
    })
    const idx = r.data?.inspectionResult?.indexStatusResult
    return {
      verdict: idx?.verdict ?? 'UNKNOWN',
      coverageState: idx?.coverageState ?? 'UNKNOWN',
      lastCrawlTime: idx?.lastCrawlTime ?? null,
      indexingState: idx?.indexingState ?? null,
      pageFetchState: idx?.pageFetchState ?? null,
      robotsTxtState: idx?.robotsTxtState ?? null,
    }
  } catch (e: any) {
    return { error: e.message ?? String(e) }
  }
}

async function pushIndexNow(urls: string[]) {
  if (!INDEXNOW_KEY) {
    console.log('⚠ INDEXNOW_KEY not set — skipping IndexNow push')
    return
  }
  const fullUrls = urls.map(u => `https://${HOST}${u}`)
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: fullUrls,
  }
  console.log(`\nIndexNow push (${fullUrls.length} URLs):`)
  for (const engine of ['api.indexnow.org', 'www.bing.com', 'yandex.com']) {
    try {
      const resp = await fetch(`https://${engine}/indexnow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      })
      console.log(`  ${engine}: ${resp.status} ${resp.statusText}`)
    } catch (e: any) {
      console.error(`  ${engine}: ERROR ${e.message}`)
    }
  }
}

async function pingSitemap() {
  // Google deprecated the sitemap ping endpoint in 2023, but it still
  // works and is harmless. Bing also accepts the same protocol.
  const sitemapUrl = `https://${HOST}/sitemap.xml`
  console.log(`\nSitemap ping:`)
  for (const engine of ['www.google.com', 'www.bing.com']) {
    try {
      const url = `https://${engine}/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const resp = await fetch(url)
      console.log(`  ${engine}: ${resp.status} ${resp.statusText}`)
    } catch (e: any) {
      console.error(`  ${engine}: ERROR ${e.message}`)
    }
  }
}

async function main() {
  const { google } = await import('googleapis')
  const credentials = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/webmasters.readonly',
    ],
  })
  const searchconsole = google.searchconsole({ version: 'v1', auth })

  console.log('=== GSC URL Inspection baseline ===\n')
  const baseline: any[] = []
  for (const { path, label, commit } of TARGET_URLS) {
    const fullUrl = `https://${HOST}${path}`
    const info = await inspectUrl(searchconsole, fullUrl)
    baseline.push({ path, label, commit, ...info })
    console.log(`${path}`)
    console.log(`  label: ${label}`)
    console.log(`  commit: ${commit}`)
    if ((info as any).error) {
      console.log(`  ✗ inspect error: ${(info as any).error}`)
    } else {
      console.log(`  verdict:       ${info.verdict}`)
      console.log(`  coverageState: ${info.coverageState}`)
      console.log(`  indexingState: ${info.indexingState}`)
      console.log(`  lastCrawlTime: ${info.lastCrawlTime ?? '— never'}`)
      console.log(`  robotsTxtState: ${info.robotsTxtState}`)
      console.log(`  pageFetchState: ${info.pageFetchState}`)
    }
    console.log()
  }

  await pushIndexNow(TARGET_URLS.map(t => t.path))
  await pingSitemap()

  console.log('\n=== Manual action required (no API exists) ===')
  console.log('Google "Request indexing" must be done by hand in GSC web UI.')
  console.log('For each URL below, paste it into the GSC top search bar,')
  console.log('wait for the inspection report, then click "Request indexing":\n')
  for (const { path } of TARGET_URLS) {
    console.log(`  https://${HOST}${path}`)
  }
  console.log()
  console.log('GSC URL Inspection tool:')
  console.log(`  https://search.google.com/search-console?resource_id=${encodeURIComponent(GSC_SITE_URL)}`)
  console.log()
  console.log('After requesting, Google usually re-crawls within 1-24h.')
  console.log('Re-run this script tomorrow to confirm lastCrawlTime advanced.')
}

main().catch(e => { console.error(e); process.exit(1) })
