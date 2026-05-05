// @ts-nocheck
// One-shot: upload Before/After samples for 4 PASS photo-edit prompts (May 2026 batch).
// Before = source photo, After = Gemini rendered output.
// Skip era-transform-1970s-classic (FAIL).

import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const PASS_SLUGS = [
  'photo-auto-enhance-vivid',
  'hairstyle-grid-9-variations',
  'pose-correct-face-forward',
  'id-photo-asia-2-inch-blue',
]

const MANIFEST = require(`${ROOT}/seo/style-test-samples/source-manifest.json`)
const RENDER_DIR = `${ROOT}/seo/style-test-samples/output/photo-edit-may-2026`

const prisma = new PrismaClient()

async function uploadFile(localPath: string, blobKey: string, mimeType: string) {
  const buf = await readFile(localPath)
  const blob = await put(blobKey, buf, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: true,
  })
  return { url: blob.url, blobKey: blob.pathname, fileSize: buf.length }
}

async function main() {
  for (const slug of PASS_SLUGS) {
    const sourceRel = MANIFEST.bySlug[slug]
    if (!sourceRel) {
      console.error(`No source mapping for ${slug}`)
      continue
    }
    const sourcePath = `${ROOT}/${sourceRel}`
    const renderPath = `${RENDER_DIR}/${slug}.png`

    const prompt = await prisma.prompt.findUnique({
      where: { slug },
      select: { id: true },
    })
    if (!prompt) {
      console.error(`Prompt not found: ${slug}`)
      continue
    }

    // Skip if already has images
    const existing = await prisma.promptImage.count({ where: { promptId: prompt.id } })
    if (existing > 0) {
      console.log(`[${slug}] already has ${existing} images, skipping`)
      continue
    }

    console.log(`[${slug}] uploading...`)

    const beforeUp = await uploadFile(sourcePath, `prompts/${slug}-before.jpg`, 'image/jpeg')
    const afterUp = await uploadFile(renderPath, `prompts/${slug}-after.png`, 'image/png')

    const original = await prisma.promptImage.create({
      data: {
        promptId: prompt.id,
        url: beforeUp.url,
        blobKey: beforeUp.blobKey,
        fileName: `${slug}-before.jpg`,
        fileSize: beforeUp.fileSize,
        mimeType: 'image/jpeg',
        imageType: 'original',
        order: 0,
        altText: `Before: ${slug} 編集前の元写真`,
      },
    })

    await prisma.promptImage.create({
      data: {
        promptId: prompt.id,
        url: afterUp.url,
        blobKey: afterUp.blobKey,
        fileName: `${slug}-after.png`,
        fileSize: afterUp.fileSize,
        mimeType: 'image/png',
        imageType: 'effect',
        order: 1,
        altText: `After: ${slug} Gemini 2.5 Flash Image AI 加工結果`,
        parentImageId: original.id,
      },
    })

    console.log(`[${slug}] OK: original + effect linked`)
  }

  await prisma.$disconnect()
  console.log('Done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
