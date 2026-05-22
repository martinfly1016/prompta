// @ts-nocheck
// One-shot: re-submit sitemap.xml to GSC and print its current status.
// Usage: npx tsx src/scripts/data-analys/_gsc_resubmit_sitemap.ts
import { loadGoogleCredentials, SITE_URL } from './config'

async function main() {
  const { google } = await import('googleapis')
  const auth = new google.auth.GoogleAuth({
    credentials: loadGoogleCredentials(),
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  })
  const sc = google.searchconsole({ version: 'v1', auth })
  // SITE_URL may be a sc-domain property; the sitemap feedpath must be a real URL.
  const sitemapUrl = 'https://www.prompta.jp/sitemap.xml'
  await sc.sitemaps.submit({ siteUrl: SITE_URL, feedpath: sitemapUrl })
  console.log(`✅ Resubmitted: ${sitemapUrl}\n`)
  const list = await sc.sitemaps.list({ siteUrl: SITE_URL })
  for (const s of list.data.sitemap || []) {
    console.log(`  ${s.path}`)
    console.log(`    lastSubmitted   = ${s.lastSubmitted}`)
    console.log(`    lastDownloaded  = ${s.lastDownloaded}`)
    console.log(`    isPending=${s.isPending} isSitemapsIndex=${s.isSitemapsIndex}`)
    console.log(`    warnings=${s.warnings} errors=${s.errors}`)
    for (const c of s.contents || []) {
      console.log(`    contents: type=${c.type} submitted=${c.submitted} indexed=${c.indexed}`)
    }
  }
}
main().catch(e => { console.error(e.message || e); process.exit(1) })
