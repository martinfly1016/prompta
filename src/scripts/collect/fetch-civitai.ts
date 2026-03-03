import { CIVITAI_CONFIG, VALIDATION_CONFIG, getCivitaiSourceUrl } from './config'
import { outputJSON, log, sleep, fetchWithRetry } from './utils'
import type {
  CivitAIResponse,
  CivitAIImageItem,
  RawCollectedItem,
  FetchResult,
} from './types'

// ==================== CLI Arguments ====================

function parseArgs(): { pages: number; limit: number; cursor?: string } {
  const args = process.argv.slice(2)
  let pages = 1
  let limit: number = CIVITAI_CONFIG.defaultLimit
  let cursor: string | undefined

  for (const arg of args) {
    if (arg.startsWith('--pages=')) pages = parseInt(arg.split('=')[1])
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1])
    if (arg.startsWith('--cursor=')) cursor = arg.split('=')[1]
  }

  return { pages, limit, cursor }
}

// ==================== Validation ====================

function isValidItem(item: CivitAIImageItem): boolean {
  // Must have prompt metadata
  if (!item.meta?.prompt) return false
  // Prompt must be long enough to be useful
  if (item.meta.prompt.length < VALIDATION_CONFIG.minPromptLength) return false
  // SFW only
  if (item.nsfwLevel > VALIDATION_CONFIG.maxNsfwLevel) return false
  return true
}

// ==================== Transform ====================

function toRawItem(item: CivitAIImageItem): RawCollectedItem {
  return {
    sourceId: String(item.id),
    sourceUrl: getCivitaiSourceUrl(item.id),
    imageUrl: item.url,
    prompt: item.meta!.prompt!,
    negativePrompt: item.meta?.negativePrompt,
    width: item.width,
    height: item.height,
    model: item.meta?.Model,
    author: item.username,
    stats: {
      likes: item.stats.likeCount,
      hearts: item.stats.heartCount,
      comments: item.stats.commentCount,
    },
    collectedAt: new Date().toISOString(),
  }
}

// ==================== API Fetch ====================

async function fetchPage(
  cursor?: string,
  limit?: number,
): Promise<CivitAIResponse> {
  const params = new URLSearchParams({
    limit: String(limit || CIVITAI_CONFIG.defaultLimit),
    sort: CIVITAI_CONFIG.sort,
    period: CIVITAI_CONFIG.period,
    nsfw: CIVITAI_CONFIG.nsfw,
  })

  if (cursor) params.set('cursor', cursor)

  const apiKey = process.env.CIVITAI_API_KEY
  const headers: Record<string, string> = {}
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`

  const url = `${CIVITAI_CONFIG.baseUrl}/images?${params}`
  log(`Fetching: ${url}`)

  const response = await fetchWithRetry(url, { headers })

  if (!response.ok) {
    throw new Error(
      `CivitAI API error: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<CivitAIResponse>
}

// ==================== Main ====================

async function main() {
  const { pages, limit, cursor: initialCursor } = parseArgs()

  log(`Starting CivitAI fetch: pages=${pages}, limit=${limit}`)

  const items: RawCollectedItem[] = []
  let totalSkipped = 0
  let currentCursor = initialCursor

  for (let page = 0; page < pages; page++) {
    try {
      const response = await fetchPage(currentCursor, limit)

      log(`Page ${page + 1}: received ${response.items.length} items`)

      for (const item of response.items) {
        if (isValidItem(item)) {
          items.push(toRawItem(item))
        } else {
          totalSkipped++
        }
      }

      currentCursor = response.metadata.nextCursor
      if (!currentCursor) {
        log('No more pages available')
        break
      }

      // Rate limiting between pages
      if (page < pages - 1) {
        log(`Waiting ${CIVITAI_CONFIG.requestDelayMs}ms before next page...`)
        await sleep(CIVITAI_CONFIG.requestDelayMs)
      }
    } catch (error) {
      log(`Error on page ${page + 1}:`, error)
      break
    }
  }

  const result: FetchResult = {
    success: true,
    items,
    totalFetched: items.length,
    totalSkipped,
    cursor: currentCursor,
  }

  log(`Done: ${items.length} valid items, ${totalSkipped} skipped`)
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
