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

// A charged run is recorded before the provider call. Success flips the row
// to completed. Failure marks it refunded and returns the points. A row still
// pending after the function timeout is refunded on a later request.

const STALE_PENDING_MS = 90_000

export async function startGeneration(opts: {
  emailHash: string
  tool: string
  creditsUsed: number
  promptSlug?: string | null
  inputParams?: string | null
}): Promise<string> {
  const row = await prisma.generationOutput.create({
    data: {
      emailHash: opts.emailHash,
      tool: opts.tool,
      promptSlug: opts.promptSlug ?? null,
      inputParams: opts.inputParams ?? null,
      creditsUsed: opts.creditsUsed,
      status: 'pending',
    },
  })
  return row.id
}

export async function completeGeneration(
  id: string,
  opts: {
    outputJson?: string | null
    inputParams?: string | null
    image?: { buffer: Buffer; mimeType: string }
    outputBlobUrl?: string | null
  },
): Promise<void> {
  let outputBlobUrl = opts.outputBlobUrl ?? null
  if (opts.image && BLOB_TOKEN && !outputBlobUrl) {
    const ext =
      opts.image.mimeType === 'image/png' ? 'png' :
      opts.image.mimeType === 'image/webp' ? 'webp' :
      'jpg'
    try {
      const blob = await put(
        `generations/out-${Date.now()}.${ext}`,
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
      console.error('[completeGeneration] blob upload failed:', (e as Error).message)
    }
  }
  await prisma.generationOutput.update({
    where: { id },
    data: {
      status: 'completed',
      outputJson: opts.outputJson ?? undefined,
      inputParams: opts.inputParams ?? undefined,
      outputBlobUrl,
      errorMessage: null,
    },
  })
}

// Claims a pending row, then refunds. A second caller sees status != pending
// and does not refund again.
export async function refundPendingGeneration(
  id: string,
  emailHash: string,
  reason: string,
): Promise<boolean> {
  const row = await prisma.generationOutput.findUnique({
    where: { id },
    select: { status: true, emailHash: true, creditsUsed: true },
  })
  if (!row || row.status !== 'pending' || row.emailHash !== emailHash) return false
  const note = reason.slice(0, 500)
  try {
    await prisma.$transaction(async (tx) => {
      const claimed = await tx.generationOutput.updateMany({
        where: { id, status: 'pending' },
        data: { status: 'refunded', errorMessage: note },
      })
      if (claimed.count !== 1) return
      if (row.creditsUsed > 0) {
        await tx.paidCredits.update({
          where: { emailHash },
          data: {
            balance: { increment: row.creditsUsed },
            totalUsed: { decrement: row.creditsUsed },
          },
        })
      }
    })
  } catch (e) {
    await prisma.generationOutput.updateMany({
      where: { id, status: 'pending' },
      data: { status: 'failed', errorMessage: `refund_failed: ${note}`.slice(0, 500) },
    }).catch(() => {})
    throw e
  }
  return true
}

export async function reconcileStaleGenerations(emailHash: string): Promise<number> {
  const cutoff = new Date(Date.now() - STALE_PENDING_MS)
  const stale = await prisma.generationOutput.findMany({
    where: { emailHash, status: 'pending', createdAt: { lt: cutoff } },
    select: { id: true },
  })
  let refunded = 0
  for (const row of stale) {
    const ok = await refundPendingGeneration(row.id, emailHash, 'stale_pending_refunded').catch((e) => {
      console.error('[reconcileStaleGenerations]', (e as Error).message)
      return false
    })
    if (ok) refunded += 1
  }
  return refunded
}
