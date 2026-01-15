/**
 * Migration script to generate slugs for existing prompts
 *
 * Usage:
 *   npx ts-node scripts/migrate-slugs.ts
 *   or
 *   npx tsx scripts/migrate-slugs.ts
 *
 * This script will:
 * 1. Find all prompts without a slug
 * 2. Generate a slug from the title + last 6 chars of ID
 * 3. Handle conflicts by appending a counter
 * 4. Update the database
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string, existingId: string, maxLength = 50): string {
  let base = title
    .toLowerCase()
    .trim()
    .replace(/[\s　]+/g, '-')
    .replace(/[^\w\-\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (base.length > maxLength) {
    const truncated = base.slice(0, maxLength)
    const lastHyphen = truncated.lastIndexOf('-')
    base = lastHyphen > maxLength / 2 ? truncated.slice(0, lastHyphen) : truncated
  }

  const suffix = existingId.slice(-6)
  return `${base}-${suffix}`
}

async function main() {
  console.log('Starting slug migration...\n')

  // Get all prompts without slugs
  const promptsWithoutSlug = await prisma.prompt.findMany({
    where: { slug: null },
    select: { id: true, title: true },
  })

  console.log(`Found ${promptsWithoutSlug.length} prompts without slugs\n`)

  if (promptsWithoutSlug.length === 0) {
    console.log('All prompts already have slugs. Nothing to do.')
    return
  }

  // Get existing slugs to check for conflicts
  const existingSlugs = new Set(
    (await prisma.prompt.findMany({
      where: { slug: { not: null } },
      select: { slug: true },
    })).map(p => p.slug)
  )

  let successCount = 0
  let errorCount = 0

  for (const prompt of promptsWithoutSlug) {
    try {
      let slug = generateSlug(prompt.title, prompt.id)
      let counter = 1

      // Handle conflicts by appending a counter
      while (existingSlugs.has(slug)) {
        slug = `${generateSlug(prompt.title, prompt.id)}-${counter}`
        counter++
      }

      // Update the prompt
      await prisma.prompt.update({
        where: { id: prompt.id },
        data: { slug },
      })

      existingSlugs.add(slug)
      successCount++
      console.log(`✓ ${prompt.id}: "${prompt.title}" → ${slug}`)
    } catch (error) {
      errorCount++
      console.error(`✗ ${prompt.id}: Failed to update - ${error}`)
    }
  }

  console.log('\n--- Migration Summary ---')
  console.log(`Success: ${successCount}`)
  console.log(`Failed: ${errorCount}`)
  console.log(`Total: ${promptsWithoutSlug.length}`)
}

main()
  .catch((e) => {
    console.error('Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
