/**
 * Fix missing images for Midjourney prompts.
 *
 * Searches the HuggingFace dataset by matching prompt text,
 * downloads the Discord CDN image, uploads to Vercel Blob,
 * and links to the prompt in the database.
 *
 * Usage: npx tsx src/scripts/collect/fix-midjourney-images.ts
 */

import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { HUGGINGFACE_CONFIG, IMAGE_CONFIG } from './config'

const prisma = new PrismaClient()

function log(...args: unknown[]) {
  console.error('[fix-mj]', ...args)
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

interface HFRow {
  id: number
  prompt: string
  url: string
  width: number
  height: number
  version: string
  is_niji: boolean
}

interface HFResponse {
  rows: Array<{ row_idx: number; row: HFRow }>
  num_rows_total: number
}

async function searchHuggingFace(searchPrompt: string): Promise<HFRow | null> {
  // Use the search API to find matching rows
  const config = HUGGINGFACE_CONFIG.datasets.midjourney
  const params = new URLSearchParams({
    dataset: config.dataset,
    config: config.config,
    split: config.split,
    where: `prompt LIKE '%${searchPrompt.slice(0, 60).replace(/'/g, "''")}%'`,
    offset: '0',
    length: '5',
  })

  const url = `${HUGGINGFACE_CONFIG.baseUrl}/search?${params}`
  log(`Searching HF: ${searchPrompt.slice(0, 50)}...`)

  try {
    const resp = await fetch(url)
    if (resp.ok) {
      const data = await resp.json() as HFResponse
      if (data.rows.length > 0) {
        return data.rows[0].row
      }
    }
  } catch {
    // search API might not be available, fall back to filter
  }

  // Fallback: use filter API
  const filterParams = new URLSearchParams({
    dataset: config.dataset,
    config: config.config,
    split: config.split,
    offset: '0',
    length: '100',
  })

  const filterUrl = `${HUGGINGFACE_CONFIG.baseUrl}/filter?${filterParams}&where=prompt LIKE '%${searchPrompt.slice(0, 40).replace(/'/g, "''")}%'`

  try {
    const resp = await fetch(filterUrl)
    if (resp.ok) {
      const data = await resp.json() as HFResponse
      if (data.rows.length > 0) {
        return data.rows[0].row
      }
    }
  } catch {
    // ignore
  }

  return null
}

async function fetchBatch(offset: number, length: number): Promise<HFRow[]> {
  const config = HUGGINGFACE_CONFIG.datasets.midjourney
  const params = new URLSearchParams({
    dataset: config.dataset,
    config: config.config,
    split: config.split,
    offset: String(offset),
    length: String(length),
  })

  const url = `${HUGGINGFACE_CONFIG.baseUrl}/rows?${params}`
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`HF API error: ${resp.status}`)
  const data = await resp.json() as HFResponse
  return data.rows.map(r => r.row)
}

async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    const resp = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) })
    return resp.ok
  } catch {
    return false
  }
}

async function downloadAndUpload(imageUrl: string, slug: string, width: number, height: number) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is not set')

  const resp = await fetch(imageUrl)
  if (!resp.ok) return null

  const buffer = Buffer.from(await resp.arrayBuffer())
  if (buffer.length > IMAGE_CONFIG.maxSizeBytes) return null

  // Determine extension
  let ext = 'jpeg'
  try {
    const pathname = new URL(imageUrl).pathname
    const e = pathname.split('.').pop()?.toLowerCase()
    if (e && ['jpg', 'jpeg', 'png', 'webp'].includes(e)) ext = e
  } catch { /* ignore */ }

  const fileName = `${slug}.${ext}`
  const blobPath = `${IMAGE_CONFIG.blobPathPrefix}${fileName}`
  const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'

  const blob = await put(blobPath, buffer, {
    access: 'public',
    addRandomSuffix: true,
    contentType: mimeType,
    token,
  })

  return { url: blob.url, fileName, fileSize: buffer.length, mimeType, width, height }
}

async function main() {
  // Step 1: Get all Midjourney prompts without images
  const prompts = await prisma.prompt.findMany({
    where: {
      tool: { slug: 'midjourney' },
      isPublished: true,
      images: { none: {} },
    },
    select: { id: true, slug: true, content: true, sourceUrl: true },
  })

  log(`Found ${prompts.length} Midjourney prompts without images`)
  if (prompts.length === 0) {
    log('Nothing to fix!')
    await prisma.$disconnect()
    return
  }

  // Step 2: Build a lookup of prompt text → HF image URL
  // Scan HuggingFace dataset in batches to find matching prompts
  log('Scanning HuggingFace dataset for matching prompts...')

  // Build ID-based lookup from sourceUrl
  const idMap = new Map<number, typeof prompts[0]>()
  for (const p of prompts) {
    const match = p.sourceUrl?.match(/\/row\/(\d+)/)
    if (match) {
      idMap.set(Number(match[1]), p)
    }
  }
  log(`Looking for ${idMap.size} IDs in dataset (94k rows)...`)

  const matches: Array<{ prompt: typeof prompts[0]; row: HFRow }> = []
  const batchSize = 100
  let scanned = 0
  const totalRows = 94438

  for (let offset = 0; offset < totalRows && idMap.size > 0; offset += batchSize) {
    try {
      const rows = await fetchBatch(offset, batchSize)
      scanned += rows.length

      for (const row of rows) {
        if (!row.id || !row.url) continue
        if (idMap.has(row.id)) {
          const p = idMap.get(row.id)!
          matches.push({ prompt: p, row })
          idMap.delete(row.id)
          log(`  Matched: ${p.slug} (id=${row.id})`)
        }
      }

      if (scanned % 5000 === 0) {
        log(`  Scanned ${scanned}/${totalRows} rows, found ${matches.length}/${prompts.length}`)
      }

      // Minimal delay to avoid rate limits
      if (offset % 1000 === 0 && offset > 0) await sleep(200)
    } catch (err) {
      log(`  Batch error at offset ${offset}:`, err)
      await sleep(2000)
    }
  }

  log(`Scan complete: ${matches.length} matches found from ${scanned} rows`)

  // Step 3: Download and upload images
  let success = 0
  let failed = 0

  for (const { prompt: p, row } of matches) {
    log(`[${success + failed + 1}/${matches.length}] ${p.slug}`)

    // Check if Discord CDN URL is still accessible
    const accessible = await isUrlAccessible(row.url)
    if (!accessible) {
      log(`  SKIP: Discord CDN URL expired`)
      failed++
      continue
    }

    try {
      const result = await downloadAndUpload(row.url, p.slug!, row.width || 1024, row.height || 1024)
      if (!result) {
        log(`  SKIP: download/upload failed`)
        failed++
        continue
      }

      // Create PromptImage record
      await prisma.promptImage.create({
        data: {
          promptId: p.id,
          url: result.url,
          altText: null,
          order: 0,
        },
      })

      log(`  OK: ${result.url}`)
      success++
    } catch (err) {
      log(`  ERROR:`, err)
      failed++
    }

    await sleep(500)
  }

  log(`\nDone! ${success} images added, ${failed} failed, ${prompts.length - matches.length} not found in dataset`)
  await prisma.$disconnect()
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
