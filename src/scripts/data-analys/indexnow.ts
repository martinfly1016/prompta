/**
 * Submit URLs to IndexNow (Bing + Yandex).
 * Google does NOT support IndexNow, but Bing and Yandex do.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/indexnow.ts --urls="/prompts/color,/prompts/clothing,/tag/サイバーパンク"
 *   npx tsx src/scripts/data-analys/indexnow.ts --recent=7  # submit all prompts from last N days
 */
import 'dotenv/config'
import { parseArgs } from './config'

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || ''
const HOST = 'www.prompta.jp'
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

async function submitToIndexNow(urls: string[]) {
  if (!INDEXNOW_KEY) {
    console.error('INDEXNOW_KEY not set in .env')
    process.exit(1)
  }

  const fullUrls = urls.map(u => u.startsWith('http') ? u : `https://${HOST}${u}`)
  console.log(`Submitting ${fullUrls.length} URLs to IndexNow...`)

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: fullUrls,
  }

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

async function main() {
  const args = parseArgs()

  if (args['urls']) {
    const urls = args['urls'].split(',').map(u => u.trim()).filter(Boolean)
    await submitToIndexNow(urls)
  } else if (args['recent']) {
    const days = parseInt(args['recent'], 10)
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    try {
      const since = new Date()
      since.setDate(since.getDate() - days)
      const prompts = await prisma.prompt.findMany({
        where: { isPublished: true, createdAt: { gte: since } },
        select: { slug: true },
      })
      const urls = prompts.map(p => `/prompt/${p.slug}`)
      console.log(`Found ${urls.length} prompts from last ${days} days`)
      if (urls.length > 0) await submitToIndexNow(urls)
      else console.log('No recent prompts to submit')
    } finally {
      await prisma.$disconnect()
    }
  } else {
    console.log('Usage:')
    console.log('  --urls=/path1,/path2,...   Submit specific URLs')
    console.log('  --recent=7                 Submit prompts from last N days')
  }
}

main().catch(e => { console.error(e); process.exit(1) })
