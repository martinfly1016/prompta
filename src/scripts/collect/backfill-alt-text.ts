// @ts-nocheck
/**
 * Backfill descriptive alt text for existing PromptImage records.
 *
 * Two modes:
 *   --export  Query images needing alt text, output JSON to stdout
 *   --import  Read {imageId, altText}[] from stdin, update DB
 *
 * Usage:
 *   npx tsx backfill-alt-text.ts --export > /tmp/prompta-alttext-export.json
 *   cat /tmp/prompta-alttext-import.json | npx tsx backfill-alt-text.ts --import
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function log(...args: unknown[]) {
  console.error('[backfill-alt]', ...args)
}

async function exportImages() {
  const images = await prisma.$queryRaw`
    SELECT
      pi.id AS "imageId",
      p.title,
      p.content,
      c.name AS "categoryName",
      t.name AS "toolName"
    FROM "PromptImage" pi
    JOIN "Prompt" p ON pi."promptId" = p.id
    JOIN "Category" c ON p."categoryId" = c.id
    LEFT JOIN "Tool" t ON p."toolId" = t.id
    WHERE p."isPublished" = true
      AND (pi."altText" IS NULL OR pi."altText" = p.title)
  `

  const items = (images as any[]).map(img => ({
    imageId: img.imageId,
    title: img.title,
    content: (img.content || '').slice(0, 300),
    categoryName: img.categoryName,
    toolName: img.toolName || 'Stable Diffusion',
  }))

  log(`Found ${items.length} images needing alt text`)
  console.log(JSON.stringify(items, null, 2))
}

async function importAltText() {
  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }
  const input = JSON.parse(Buffer.concat(chunks).toString('utf-8'))

  if (!Array.isArray(input)) {
    log('Error: expected JSON array on stdin')
    process.exit(1)
  }

  log(`Importing ${input.length} alt text updates...`)

  const BATCH_SIZE = 20
  let updated = 0
  let failed = 0

  for (let i = 0; i < input.length; i += BATCH_SIZE) {
    const batch = input.slice(i, i + BATCH_SIZE)
    try {
      await prisma.$transaction(
        batch.map((item: { imageId: string; altText: string }) =>
          prisma.promptImage.update({
            where: { id: item.imageId },
            data: { altText: item.altText },
          })
        )
      )
      updated += batch.length
      log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} updated`)
    } catch (err) {
      failed += batch.length
      log(`Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, err)
    }
  }

  log(`Done: ${updated} updated, ${failed} failed`)
}

async function main() {
  try {
    if (process.argv.includes('--export')) {
      await exportImages()
    } else if (process.argv.includes('--import')) {
      await importAltText()
    } else {
      log('Usage: npx tsx backfill-alt-text.ts --export|--import')
      process.exit(1)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
