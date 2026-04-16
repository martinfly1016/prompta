/**
 * Tier 2 tag seed — upserts SEO landing pages from YAML.
 *
 * Usage: npx tsx src/scripts/seed/tier2-tags.ts
 *
 * Enrichment gate: a tag is only approved (isApproved=true) when seoIntro
 * reaches ≥ 400 characters. Tags without sufficient intro stay noindex, which
 * matches the SEO execution plan §1.8 (do not publish thin content).
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as yaml from 'js-yaml'
import { PrismaClient } from '@prisma/client'

const MIN_INTRO_CHARS = 400
const MIN_RELATED_PROMPTS_WARN = 5

interface TagSeed {
  slug: string
  name: string
  color?: string
  isApproved?: boolean
  seoTitle?: string | null
  seoDescription?: string | null
  seoIntro?: string | null
}

async function main() {
  const yamlPath = path.join(__dirname, 'tier2-tags.yaml')
  const raw = fs.readFileSync(yamlPath, 'utf8')
  const parsed = yaml.load(raw) as { tags?: TagSeed[] } | null
  const tags = parsed?.tags ?? []

  console.log(`[tier2-seed] ${tags.length} tag(s) in YAML`)

  if (tags.length === 0) {
    console.log('[tier2-seed] Nothing to seed. Fill tier2-tags.yaml to add tags.')
    return
  }

  const prisma = new PrismaClient()
  try {
    let upsertedCount = 0
    let skippedCount = 0

    for (const t of tags) {
      const introLen = t.seoIntro?.trim().length ?? 0
      if (t.isApproved && introLen < MIN_INTRO_CHARS) {
        console.warn(
          `[tier2-seed] SKIP ${t.slug}: isApproved=true but seoIntro < ${MIN_INTRO_CHARS} chars (got ${introLen})`,
        )
        skippedCount++
        continue
      }

      const result = await prisma.tag.upsert({
        where: { slug: t.slug },
        create: {
          slug: t.slug,
          name: t.name,
          color: t.color ?? 'blue',
          isApproved: t.isApproved ?? false,
          seoTitle: t.seoTitle ?? null,
          seoDescription: t.seoDescription ?? null,
          seoIntro: t.seoIntro ?? null,
        },
        update: {
          name: t.name,
          ...(t.color !== undefined && { color: t.color }),
          ...(t.isApproved !== undefined && { isApproved: t.isApproved }),
          seoTitle: t.seoTitle ?? null,
          seoDescription: t.seoDescription ?? null,
          seoIntro: t.seoIntro ?? null,
        },
      })

      const promptCount = await prisma.prompt.count({
        where: { tags: { some: { slug: t.slug } } },
      })
      if (result.isApproved && promptCount < MIN_RELATED_PROMPTS_WARN) {
        console.warn(
          `[tier2-seed] WARN ${t.slug}: approved=true but only ${promptCount} related prompts (recommend ≥${MIN_RELATED_PROMPTS_WARN})`,
        )
      }
      console.log(
        `[tier2-seed] upsert ${t.slug} approved=${result.isApproved} prompts=${promptCount}`,
      )
      upsertedCount++
    }

    console.log(`[tier2-seed] done: ${upsertedCount} upserted, ${skippedCount} skipped`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
