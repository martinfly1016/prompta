import { readStdin, outputJSON, log, getScriptPrisma, disconnectPrisma } from './utils'
import type { FetchResult, DeduplicationResult, RawCollectedItem } from './types'

async function main() {
  const input = await readStdin()
  const fetchResult: FetchResult = JSON.parse(input)

  if (!fetchResult.success || fetchResult.items.length === 0) {
    log('No items to check')
    const result: DeduplicationResult = {
      success: true,
      newItems: [],
      duplicateCount: 0,
    }
    outputJSON(result)
    return
  }

  const prisma = getScriptPrisma()

  try {
    const sourceUrls = fetchResult.items.map(item => item.sourceUrl)

    // Batch query for existing sourceUrls
    const existing = await prisma.prompt.findMany({
      where: { sourceUrl: { in: sourceUrls } },
      select: { sourceUrl: true },
    })

    const existingUrls = new Set(existing.map(p => p.sourceUrl))

    const newItems: RawCollectedItem[] = []
    let duplicateCount = 0

    for (const item of fetchResult.items) {
      if (existingUrls.has(item.sourceUrl)) {
        duplicateCount++
        log(`Duplicate: ${item.sourceUrl}`)
      } else {
        newItems.push(item)
      }
    }

    log(`Dedup complete: ${newItems.length} new, ${duplicateCount} duplicates`)

    const result: DeduplicationResult = {
      success: true,
      newItems,
      duplicateCount,
    }
    outputJSON(result)
  } finally {
    await disconnectPrisma()
  }
}

main().catch(async error => {
  log('Fatal error:', error)
  await disconnectPrisma()
  const result: DeduplicationResult = {
    success: false,
    newItems: [],
    duplicateCount: 0,
    error: String(error),
  }
  outputJSON(result)
  process.exit(1)
})
