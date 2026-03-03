import { put } from '@vercel/blob'
import { readStdin, outputJSON, log, sleep, fetchWithRetry } from './utils'
import { IMAGE_CONFIG } from './config'
import type { EnrichedPromptData, FinalPromptData, UploadedImage } from './types'

// ==================== Image Download + Upload ====================

function getExtensionFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname
    const ext = pathname.split('.').pop()?.toLowerCase()
    if (ext && ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return ext
  } catch {
    // ignore parse errors
  }
  return 'jpeg' // default
}

function getMimeType(ext: string): string {
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  }
  return map[ext] || 'image/jpeg'
}

async function downloadAndUpload(
  item: EnrichedPromptData,
): Promise<UploadedImage | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set')
  }

  try {
    // Download image from CivitAI
    log(`Downloading: ${item.imageUrl}`)
    const response = await fetchWithRetry(item.imageUrl)

    if (!response.ok) {
      log(`Download failed: ${response.status} ${response.statusText}`)
      return null
    }

    const buffer = Buffer.from(await response.arrayBuffer())

    // Check size
    if (buffer.length > IMAGE_CONFIG.maxSizeBytes) {
      log(`Image too large (${buffer.length} bytes), skipping`)
      return null
    }

    // Determine file type
    const ext = getExtensionFromUrl(item.imageUrl)
    const mimeType = getMimeType(ext)

    if (!(IMAGE_CONFIG.allowedMimeTypes as readonly string[]).includes(mimeType)) {
      log(`Unsupported mime type: ${mimeType}, skipping`)
      return null
    }

    // Upload to Vercel Blob
    const fileName = `${item.slug}.${ext}`
    const blobPath = `${IMAGE_CONFIG.blobPathPrefix}${fileName}`

    log(`Uploading to Blob: ${blobPath}`)
    const blob = await put(blobPath, buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: mimeType,
      token,
    })

    return {
      url: blob.url,
      blobKey: blob.pathname,
      fileName,
      fileSize: buffer.length,
      mimeType,
      width: item.width,
      height: item.height,
    }
  } catch (error) {
    log(`Error processing image for ${item.slug}:`, error)
    return null
  }
}

// ==================== Main ====================

async function main() {
  const input = await readStdin()
  const items: EnrichedPromptData[] = JSON.parse(input)

  log(`Processing ${items.length} images...`)

  const results: FinalPromptData[] = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    log(`[${i + 1}/${items.length}] ${item.slug}`)

    const image = await downloadAndUpload(item)

    if (image) {
      const { imageUrl: _imageUrl, ...rest } = item
      results.push({ ...rest, image })
      log(`  OK: ${image.url}`)
    } else {
      log(`  SKIPPED: image download/upload failed`)
    }

    // Small delay between downloads
    if (i < items.length - 1) {
      await sleep(500)
    }
  }

  log(`Done: ${results.length}/${items.length} images uploaded`)
  outputJSON(results)
}

main().catch(error => {
  log('Fatal error:', error)
  outputJSON([])
  process.exit(1)
})
