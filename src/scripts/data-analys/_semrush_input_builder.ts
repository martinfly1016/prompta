// @ts-nocheck
/**
 * Build input.json for the monthly SEMrush snapshot agent.
 *
 * Union of 3 keyword sources:
 *   1. GSC top queries over the last 28 days (top 50 by impressions)
 *   2. All entries from src/lib/seo/watch-keywords.ts
 *   3. Combinatorial seed keywords from 14 categories × 6 tools
 *
 * Output goes to stdout — pipe to seo/semrush-snapshots/{YYYY-MM-DD}/input.json
 *
 * Usage:
 *   TODAY=$(date +%Y-%m-%d)
 *   mkdir -p seo/semrush-snapshots/$TODAY
 *   npx tsx src/scripts/data-analys/_semrush_input_builder.ts \
 *     > seo/semrush-snapshots/$TODAY/input.json
 */
import 'dotenv/config'
import { loadGoogleCredentials, SITE_URL } from './config'
import { WATCH_KEYWORDS } from '../../lib/seo/watch-keywords'

const CATEGORIES_JP: Record<string, string> = {
  hairstyle: '髪型',
  clothing: '服装',
  anime: 'アニメ',
  color: 'カラー',
  camera: 'カメラ',
  'body-type': '体型',
  costume: '衣装',
  cosplay: 'コスプレ',
  writing: 'ライティング',
  programming: 'プログラミング',
  business: 'ビジネス',
  education: '教育',
  creative: 'クリエイティブ',
  'photo-edit': '写真加工',
}

const TOOLS = ['chatgpt', 'claude', 'gemini', 'stable-diffusion', 'midjourney', 'dall-e']

interface KwEntry {
  keyword: string
  source: string
  currentTargetPage?: string | null
  promptaRank?: number | null
  searchVolume?: number | null
  keywordDifficulty?: number | null
  notes?: string
}

async function fetchGscTopQueries(days = 28, limit = 50): Promise<KwEntry[]> {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.error('GOOGLE_SERVICE_ACCOUNT_JSON not set — skipping GSC source')
    return []
  }
  const { google } = await import('googleapis')
  const auth = new google.auth.GoogleAuth({
    credentials: loadGoogleCredentials(),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const sc = google.searchconsole({ version: 'v1', auth })
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const resp = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: limit,
      orderBy: 'impressions',
    },
  })
  return (resp.data.rows ?? []).map((row: any) => ({
    keyword: row.keys?.[0] ?? '',
    source: 'gsc-top-queries',
    promptaRank: row.position ? Math.round(row.position * 100) / 100 : null,
    notes: `gsc impressions=${row.impressions} clicks=${row.clicks}`,
  }))
}

function fetchWatchKeywords(): KwEntry[] {
  return WATCH_KEYWORDS.map(w => ({
    keyword: w.keyword,
    source: 'watch-keywords',
    currentTargetPage: w.targetPage ?? null,
    searchVolume: (w as any).monthlyVolume ?? null,
    keywordDifficulty: (w as any).kd ?? null,
    notes: `cluster=${w.cluster}${(w as any).notes ? '; ' + (w as any).notes : ''}`,
  }))
}

function buildSeedCombinations(): KwEntry[] {
  const out: KwEntry[] = []
  for (const [catSlug, catJp] of Object.entries(CATEGORIES_JP)) {
    // {cat-jp} プロンプト
    out.push({
      keyword: `${catJp} プロンプト`,
      source: 'seed-combinatorial',
      currentTargetPage: `/prompts/${catSlug}`,
      notes: 'category x prompt',
    })
    // ai {cat-jp}
    out.push({
      keyword: `ai ${catJp}`,
      source: 'seed-combinatorial',
      currentTargetPage: `/prompts/${catSlug}`,
      notes: 'ai x category',
    })
    // {tool} {cat-jp}（only for top 3 visual tools to keep size sane）
    for (const tool of ['chatgpt', 'stable-diffusion', 'midjourney']) {
      out.push({
        keyword: `${tool} ${catJp}`,
        source: 'seed-combinatorial',
        currentTargetPage: `/tools/${tool}`,
        notes: `tool x category`,
      })
    }
  }
  // {tool} プロンプト
  for (const tool of TOOLS) {
    out.push({
      keyword: `${tool} プロンプト`,
      source: 'seed-combinatorial',
      currentTargetPage: `/tools/${tool}`,
      notes: 'tool x prompt',
    })
  }
  return out
}

async function main() {
  const gscKws = await fetchGscTopQueries(28, 50).catch(e => {
    console.error('GSC fetch failed:', e.message)
    return []
  })
  const watchKws = fetchWatchKeywords()
  const seedKws = buildSeedCombinations()

  // Union (first occurrence wins)
  const seen = new Set<string>()
  const all: KwEntry[] = []
  for (const entry of [...gscKws, ...watchKws, ...seedKws]) {
    const k = entry.keyword.trim().toLowerCase()
    if (!k || seen.has(k)) continue
    seen.add(k)
    all.push(entry)
  }

  const output = {
    _meta: {
      generatedAt: new Date().toISOString(),
      counts: {
        total: all.length,
        gscTopQueries: gscKws.length,
        watchKeywords: watchKws.length,
        seedCombinatorial: seedKws.length,
      },
      generatorVersion: 'input-builder-v1',
    },
    keywords: all,
  }
  process.stdout.write(JSON.stringify(output, null, 2) + '\n')
}

main().catch(e => { console.error(e); process.exit(1) })
