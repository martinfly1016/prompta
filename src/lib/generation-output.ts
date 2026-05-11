// Phase 2 (2026-05-11) — server-side helper to persist tool generation
// outputs (Gemini-produced images and JSON results). Reusable across all
// freemium tools and future embedded prompt generation.

import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

type SaveOptions = {
  emailHash: string
  tool: string
  promptSlug?: string | null
  /** Stringified JSON of input params (resolved prompt-params, hex, etc). */
  inputParams?: string | null
  /** Stringified JSON of output result (diagnosis JSON, etc). */
  outputJson?: string | null
  /** If provided, will be uploaded to Blob under samples/generations/. */
  image?: { buffer: Buffer; mimeType: string }
  creditsUsed?: number
}

export async function saveGenerationOutput(opts: SaveOptions): Promise<{
  id: string
  outputBlobUrl: string | null
}> {
  let outputBlobUrl: string | null = null
  if (opts.image && BLOB_TOKEN) {
    const ext =
      opts.image.mimeType === 'image/png' ? 'png' :
      opts.image.mimeType === 'image/webp' ? 'webp' :
      'jpg'
    try {
      const blob = await put(
        `generations/${opts.tool}-${Date.now()}.${ext}`,
        opts.image.buffer,
        {
          access: 'public',
          contentType: opts.image.mimeType,
          token: BLOB_TOKEN,
          addRandomSuffix: true,
        },
      )
      outputBlobUrl = blob.url
    } catch (e) {
      console.error('[saveGenerationOutput] blob upload failed:', (e as Error).message)
      // Continue — we still want to record the row even if blob storage fails.
    }
  }

  const row = await prisma.generationOutput.create({
    data: {
      emailHash: opts.emailHash,
      tool: opts.tool,
      promptSlug: opts.promptSlug ?? null,
      inputParams: opts.inputParams ?? null,
      outputJson: opts.outputJson ?? null,
      outputBlobUrl,
      creditsUsed: opts.creditsUsed ?? 1,
      status: 'completed',
    },
  })
  return { id: row.id, outputBlobUrl }
}
