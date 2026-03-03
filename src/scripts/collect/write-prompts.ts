import {
  readStdin,
  outputJSON,
  log,
  getScriptPrisma,
  disconnectPrisma,
  slugifyTag,
} from './utils'
import type { FinalPromptData, WriteResult } from './types'

// ==================== Slug Uniqueness ====================

function generateRandomSuffix(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function ensureUniqueSlug(
  prisma: ReturnType<typeof getScriptPrisma>,
  baseSlug: string,
): Promise<string> {
  const existing = await prisma.prompt.findUnique({
    where: { slug: baseSlug },
    select: { id: true },
  })

  if (!existing) return baseSlug

  // Conflict: append random suffix
  const uniqueSlug = `${baseSlug}-${generateRandomSuffix(4)}`
  log(`Slug conflict: "${baseSlug}" → "${uniqueSlug}"`)
  return uniqueSlug
}

// ==================== Tag Upsert ====================

async function upsertTags(
  prisma: ReturnType<typeof getScriptPrisma>,
  tagNames: string[],
): Promise<string[]> {
  const tagIds: string[] = []

  for (const name of tagNames) {
    const slug = slugifyTag(name)
    if (!slug) continue

    const tag = await prisma.tag.upsert({
      where: { slug },
      create: { name, slug },
      update: {}, // no update needed, just ensure existence
      select: { id: true },
    })

    tagIds.push(tag.id)
  }

  return tagIds
}

// ==================== Resolve Slugs to IDs ====================

async function resolveToolId(
  prisma: ReturnType<typeof getScriptPrisma>,
  toolSlug: string,
): Promise<string | null> {
  const tool = await prisma.tool.findUnique({
    where: { slug: toolSlug },
    select: { id: true },
  })
  return tool?.id ?? null
}

async function resolveCategoryId(
  prisma: ReturnType<typeof getScriptPrisma>,
  categorySlug: string,
): Promise<string | null> {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    select: { id: true },
  })
  return category?.id ?? null
}

// ==================== Write Single Prompt ====================

async function writePrompt(
  prisma: ReturnType<typeof getScriptPrisma>,
  item: FinalPromptData,
): Promise<WriteResult> {
  try {
    // Resolve tool and category
    const toolId = await resolveToolId(prisma, item.toolSlug)
    const categoryId = await resolveCategoryId(prisma, item.categorySlug)

    if (!categoryId) {
      return {
        success: false,
        title: item.title,
        error: `Category not found: ${item.categorySlug}`,
      }
    }

    // Ensure slug uniqueness
    const slug = await ensureUniqueSlug(prisma, item.slug)

    // Upsert tags
    const tagIds = await upsertTags(prisma, item.tags)

    // Create prompt with image
    const prompt = await prisma.prompt.create({
      data: {
        title: item.title,
        description: item.description,
        content: item.content,
        slug,
        categoryId,
        toolId,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        author: item.author,
        difficulty: item.difficulty,
        sourceUrl: item.sourceUrl,
        isAutoCollected: true,
        isPublished: true,
        tagsJson: JSON.stringify(item.tags),
        tags: {
          connect: tagIds.map(id => ({ id })),
        },
        ...(item.image ? {
          images: {
            create: [
              {
                url: item.image.url,
                blobKey: item.image.blobKey,
                fileName: item.image.fileName,
                fileSize: item.image.fileSize,
                mimeType: item.image.mimeType,
                width: item.image.width,
                height: item.image.height,
                imageType: 'effect',
                order: 0,
                altText: item.title,
              },
            ],
          },
        } : {}),
      },
      select: { id: true, slug: true, title: true },
    })

    log(`Created prompt: ${prompt.slug} (${prompt.id})`)

    return {
      success: true,
      promptId: prompt.id,
      slug: prompt.slug ?? undefined,
      title: prompt.title,
    }
  } catch (error) {
    log(`Error writing prompt "${item.title}":`, error)
    return {
      success: false,
      title: item.title,
      error: String(error),
    }
  }
}

// ==================== Main ====================

async function main() {
  const input = await readStdin()
  const items: FinalPromptData[] = JSON.parse(input)

  log(`Writing ${items.length} prompts to database...`)

  const prisma = getScriptPrisma()
  const results: WriteResult[] = []

  try {
    for (let i = 0; i < items.length; i++) {
      log(`[${i + 1}/${items.length}] ${items[i].title}`)
      const result = await writePrompt(prisma, items[i])
      results.push(result)
    }

    const successCount = results.filter(r => r.success).length
    log(`Done: ${successCount}/${items.length} prompts written`)

    outputJSON(results)
  } finally {
    await disconnectPrisma()
  }
}

main().catch(async error => {
  log('Fatal error:', error)
  await disconnectPrisma()
  outputJSON([])
  process.exit(1)
})
