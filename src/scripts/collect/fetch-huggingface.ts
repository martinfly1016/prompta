import { HUGGINGFACE_CONFIG } from './config'
import { outputJSON, log, sleep, fetchWithRetry } from './utils'
import type {
  HFMidjourneyV6Row,
  HFMidjourneyDetailedRow,
  HFDalleRow,
  HFPromptsChatRow,
  HFRowsResponse,
  RawCollectedItem,
  FetchResult,
} from './types'

// ==================== CLI Arguments ====================

type DatasetKey = keyof typeof HUGGINGFACE_CONFIG.datasets

function parseArgs(): { dataset: DatasetKey; count: number; offset: number; random: boolean } {
  const args = process.argv.slice(2)
  let dataset: DatasetKey = 'midjourney'
  let count = 50
  let offset = 0
  let random = false

  for (const arg of args) {
    if (arg.startsWith('--dataset=')) {
      const val = arg.split('=')[1]
      if (val !== 'midjourney' && val !== 'midjourneyDetailed' && val !== 'dalle' && val !== 'promptsChat') {
        throw new Error(`Invalid dataset: ${val}. Must be "midjourney", "midjourneyDetailed", "dalle", or "promptsChat"`)
      }
      dataset = val
    }
    if (arg.startsWith('--count=')) count = parseInt(arg.split('=')[1])
    if (arg.startsWith('--offset=')) offset = parseInt(arg.split('=')[1])
    if (arg === '--random') random = true
  }

  return { dataset, count, offset, random }
}

// ==================== API Fetch ====================

async function fetchRows(
  datasetConfig: typeof HUGGINGFACE_CONFIG.datasets[DatasetKey],
  offset: number,
  length: number,
): Promise<HFRowsResponse> {
  const params = new URLSearchParams({
    dataset: datasetConfig.dataset,
    config: datasetConfig.config,
    split: datasetConfig.split,
    offset: String(offset),
    length: String(length),
  })

  const url = `${HUGGINGFACE_CONFIG.baseUrl}/rows?${params}`
  log(`Fetching: ${url}`)

  const response = await fetchWithRetry(url)

  if (!response.ok) {
    throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<HFRowsResponse>
}

// ==================== Transform ====================

function midjourneyV6ToRaw(row: HFMidjourneyV6Row, rowIdx: number): RawCollectedItem | null {
  if (!row.prompt || row.prompt.length < 20) return null
  if (!row.image?.src) return null

  return {
    sourceId: `hf-mjv6-${row.id || rowIdx}`,
    sourceUrl: `https://huggingface.co/datasets/brivangl/midjourney-v6-llava#row=${row.id || rowIdx}`,
    imageUrl: row.image.src,
    prompt: row.prompt,
    width: row.image.width || 1024,
    height: row.image.height || 1024,
    model: 'Midjourney v6',
    author: 'Midjourney Community',
    stats: { likes: 0, hearts: 0, comments: 0 },
    collectedAt: new Date().toISOString(),
  }
}

function midjourneyDetailedToRaw(row: HFMidjourneyDetailedRow, rowIdx: number): RawCollectedItem | null {
  const prompt = row.long_prompt || row.short_prompt
  if (!prompt || prompt.length < 20) return null
  if (!row.image?.src) return null

  return {
    sourceId: `hf-mjdet-${rowIdx}`,
    sourceUrl: `https://huggingface.co/datasets/MohamedRashad/midjourney-detailed-prompts#row=${rowIdx}`,
    imageUrl: row.image.src,
    prompt,
    width: row.image.width || 1024,
    height: row.image.height || 1024,
    model: 'Midjourney',
    author: 'Midjourney Community',
    stats: { likes: 0, hearts: 0, comments: 0 },
    collectedAt: new Date().toISOString(),
  }
}

function dalleToRaw(row: HFDalleRow, rowIdx: number): RawCollectedItem | null {
  const prompt = row.caption || row.synthetic_caption
  if (!prompt || prompt.length < 20) return null
  if (!row.image?.src) return null

  return {
    sourceId: `hf-dalle-${rowIdx}`,
    sourceUrl: row.link || 'https://huggingface.co/datasets/OpenDatasets/dalle-3-dataset',
    imageUrl: row.image.src,
    prompt,
    width: row.image.width || 1024,
    height: row.image.height || 1024,
    model: 'DALL-E 3',
    author: 'DALL-E Community',
    stats: { likes: 0, hearts: 0, comments: 0 },
    collectedAt: new Date().toISOString(),
  }
}

function promptsChatToRaw(row: HFPromptsChatRow, rowIdx: number): RawCollectedItem | null {
  if (!row.prompt || row.prompt.length < 20) return null
  if (!row.act) return null
  // Skip non-TEXT types (SKILL, WORKFLOW are multi-step, not suitable as single prompts)
  if (row.type && row.type !== 'TEXT') return null
  // Cap at 10000 chars — some entries are full SKILL documentation files, not usable prompts
  if (row.prompt.length > 10000) return null

  return {
    sourceId: `hf-promptschat-${rowIdx}`,
    sourceUrl: `https://prompts.chat/#act=${encodeURIComponent(row.act.toLowerCase().replace(/\s+/g, '-'))}`,
    prompt: row.prompt,
    // Text-only: no image fields
    model: 'ChatGPT',
    author: row.contributor || 'prompts.chat Community',
    stats: { likes: 0, hearts: 0, comments: 0 },
    collectedAt: new Date().toISOString(),
  }
}

// ==================== Random Sampling ====================

function generateRandomOffsets(total: number, count: number, batchSize: number): number[] {
  const maxOffset = Math.max(0, total - batchSize)
  const offsets = new Set<number>()
  const numBatches = Math.ceil(count / batchSize)

  while (offsets.size < numBatches) {
    offsets.add(Math.floor(Math.random() * maxOffset))
  }

  return Array.from(offsets)
}

// ==================== Main ====================

async function main() {
  const { dataset, count, offset, random } = parseArgs()
  const config = HUGGINGFACE_CONFIG.datasets[dataset]

  log(`Starting HuggingFace fetch: dataset=${dataset}, count=${count}, random=${random}`)

  const items: RawCollectedItem[] = []
  let totalSkipped = 0

  const batchSize = Math.min(count, HUGGINGFACE_CONFIG.maxRowsPerRequest)

  // Determine offsets to fetch
  const offsets = random
    ? generateRandomOffsets(config.totalRows, count, batchSize)
    : [offset]

  for (const currentOffset of offsets) {
    if (items.length >= count) break

    try {
      const remaining = count - items.length
      const fetchLength = Math.min(remaining, batchSize)
      const response = await fetchRows(config, currentOffset, fetchLength)

      log(`Offset ${currentOffset}: received ${response.rows.length} rows`)

      for (const { row, row_idx } of response.rows) {
        if (items.length >= count) break

        let rawItem: RawCollectedItem | null = null
        if (dataset === 'midjourney') {
          rawItem = midjourneyV6ToRaw(row as unknown as HFMidjourneyV6Row, row_idx)
        } else if (dataset === 'midjourneyDetailed') {
          rawItem = midjourneyDetailedToRaw(row as unknown as HFMidjourneyDetailedRow, row_idx)
        } else if (dataset === 'dalle') {
          rawItem = dalleToRaw(row as unknown as HFDalleRow, row_idx)
        } else if (dataset === 'promptsChat') {
          rawItem = promptsChatToRaw(row as unknown as HFPromptsChatRow, row_idx)
        }

        if (!rawItem) {
          totalSkipped++
          continue
        }

        items.push(rawItem)
      }

      // Rate limiting between batches
      if (offsets.indexOf(currentOffset) < offsets.length - 1) {
        await sleep(HUGGINGFACE_CONFIG.requestDelayMs)
      }
    } catch (error) {
      log(`Error at offset ${currentOffset}:`, error)
      break
    }
  }

  const result: FetchResult = {
    success: true,
    items,
    totalFetched: items.length,
    totalSkipped,
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
