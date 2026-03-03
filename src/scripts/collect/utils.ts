import { PrismaClient } from '@prisma/client'

// ==================== Prisma (standalone, not from @/lib) ====================

let prisma: PrismaClient | null = null

export function getScriptPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export async function disconnectPrisma(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect()
    prisma = null
  }
}

// ==================== Stdin / Stdout ====================

export function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    process.stdin.setEncoding('utf-8')
    process.stdin.on('data', (chunk: string) => {
      data += chunk
    })
    process.stdin.on('end', () => resolve(data))
    process.stdin.on('error', reject)
  })
}

export function outputJSON(data: unknown): void {
  process.stdout.write(JSON.stringify(data, null, 2))
}

// ==================== Logging (stderr, keeps stdout clean for data) ====================

export function log(...args: unknown[]): void {
  console.error('[collect]', ...args)
}

// ==================== Timing ====================

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ==================== HTTP with Retry ====================

export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  maxRetries = 3,
  baseDelay = 1000,
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after')
        const delay = retryAfter
          ? parseInt(retryAfter) * 1000
          : baseDelay * Math.pow(2, attempt)
        log(`Rate limited (429). Waiting ${delay}ms before retry...`)
        await sleep(delay)
        continue
      }

      return response
    } catch (error) {
      if (attempt === maxRetries) throw error
      const delay = baseDelay * Math.pow(2, attempt)
      log(
        `Fetch failed (attempt ${attempt + 1}/${maxRetries + 1}). Retrying in ${delay}ms...`,
      )
      await sleep(delay)
    }
  }

  throw new Error(`Failed after ${maxRetries + 1} attempts`)
}

// ==================== Tag Slug Helper ====================

/** Generate a URL-safe slug from a tag name (supports Japanese) */
export function slugifyTag(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s\u3000]+/g, '-') // whitespace → hyphens
    .replace(/[^\w\-\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/g, '') // keep alphanumeric, hyphens, JP chars
    .replace(/-+/g, '-') // collapse consecutive hyphens
    .replace(/^-|-$/g, '') // trim hyphens
}
