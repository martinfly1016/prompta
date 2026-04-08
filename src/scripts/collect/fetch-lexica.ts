import { outputJSON, log, sleep, fetchWithRetry } from './utils'
import type { RawCollectedItem, FetchResult } from './types'

// ==================== Lexica API ====================
//
// Lexica's public-facing search endpoint. Reverse-engineered from lexica.art.
// POST https://lexica.art/api/infinite-prompts
// Body: { text, searchMode: "images", source: "search", cursor, model: "lexica-aperture-v2" }
// Returns { nextCursor, prompts: [...], images: [...], count }
// Image URL pattern: https://image.lexica.art/full_jpg/{imageId}

const LEXICA_API = 'https://lexica.art/api/infinite-prompts'
const LEXICA_IMAGE_BASE = 'https://image.lexica.art/full_jpg'

interface LexicaImage {
  id: string
  promptid: string
  width: number
  height: number
}

interface LexicaPrompt {
  id: string
  prompt: string
  negativePrompt?: string | null
  width: number
  height: number
  model?: string
  seed?: string
  images: LexicaImage[]
}

interface LexicaResponse {
  nextCursor: number
  prompts: LexicaPrompt[]
  images: LexicaImage[]
  count: number
}

// ==================== CLI Arguments ====================

function parseArgs(): { keywords: string[]; perKeyword: number } {
  const args = process.argv.slice(2)
  let keywordsArg = ''
  let perKeyword = 10

  for (const arg of args) {
    if (arg.startsWith('--keywords=')) keywordsArg = arg.split('=')[1]
    if (arg.startsWith('--per=')) perKeyword = parseInt(arg.split('=')[1])
  }

  // Default keyword set covers high-priority categories per SEO algorithm
  const defaultKeywords = [
    'hairstyle portrait',
    'cosplay character',
    'fantasy costume',
    'cyberpunk city',
    'anime girl',
    'cinematic lighting',
    'gothic dress',
    'fashion photography',
  ]

  const keywords = keywordsArg
    ? keywordsArg.split(',').map(s => s.trim()).filter(Boolean)
    : defaultKeywords

  return { keywords, perKeyword }
}

// ==================== Fetch ====================

async function fetchOne(text: string, cursor: number): Promise<LexicaResponse> {
  const body = JSON.stringify({
    text,
    searchMode: 'images',
    source: 'search',
    cursor,
    model: 'lexica-aperture-v2',
  })

  const response = await fetchWithRetry(LEXICA_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; PromptaBot/1.0)',
    },
    body,
  })

  if (!response.ok) {
    throw new Error(`Lexica API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<LexicaResponse>
}

// ==================== Transform ====================

function lexicaToRaw(p: LexicaPrompt): RawCollectedItem | null {
  if (!p.prompt || p.prompt.length < 20) return null
  const img = p.images?.[0]
  if (!img) return null

  return {
    sourceId: `lexica-${p.id}`,
    sourceUrl: `https://lexica.art/prompt/${p.id}`,
    imageUrl: `${LEXICA_IMAGE_BASE}/${img.id}`,
    prompt: p.prompt,
    negativePrompt: p.negativePrompt || undefined,
    width: img.width || p.width || 1024,
    height: img.height || p.height || 1024,
    model: p.model || 'Stable Diffusion (Lexica)',
    author: 'Lexica Community',
    stats: { likes: 0, hearts: 0, comments: 0 },
    collectedAt: new Date().toISOString(),
  }
}

// ==================== Main ====================

async function main() {
  const { keywords, perKeyword } = parseArgs()
  log(`Starting Lexica fetch: ${keywords.length} keywords × ${perKeyword} target`)

  const collected: RawCollectedItem[] = []
  const seenIds = new Set<string>()
  let totalSkipped = 0

  for (const keyword of keywords) {
    log(`Keyword: "${keyword}"`)
    let cursor = 0
    let gotForThis = 0
    let attempts = 0
    const maxAttempts = 6

    while (gotForThis < perKeyword && attempts < maxAttempts) {
      attempts++
      try {
        const data = await fetchOne(keyword, cursor)
        if (!data.prompts || data.prompts.length === 0) break

        for (const p of data.prompts) {
          if (seenIds.has(p.id)) continue
          seenIds.add(p.id)
          const item = lexicaToRaw(p)
          if (item) {
            collected.push(item)
            gotForThis++
            if (gotForThis >= perKeyword) break
          } else {
            totalSkipped++
          }
        }

        cursor = data.nextCursor
        if (!cursor) break
        await sleep(400)
      } catch (err) {
        log(`  Error fetching "${keyword}": ${String(err)}`)
        break
      }
    }
    log(`  Collected ${gotForThis} for "${keyword}"`)
  }

  log(`Done: ${collected.length} valid items, ${totalSkipped} skipped`)

  const result: FetchResult = {
    success: true,
    items: collected,
    totalFetched: collected.length,
    totalSkipped,
  }
  outputJSON(result)
}

main().catch(error => {
  log('Fatal error:', error)
  const result: FetchResult = {
    success: false,
    items: [],
    totalFetched: 0,
    totalSkipped: 0,
    error: String(error),
  }
  outputJSON(result)
  process.exit(1)
})
