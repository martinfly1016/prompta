/**
 * Link existing prompts to Tier-2 tags based on keyword heuristics.
 *
 * Usage:
 *   npx tsx src/scripts/seed/link-prompts-to-tags.ts --dry-run   # preview only
 *   npx tsx src/scripts/seed/link-prompts-to-tags.ts --apply     # apply links
 *
 * Heuristics:
 *   スレンダー        content or title contains /slender/i OR /細身|痩せ型|スレンダー/
 *   ファンタジー衣装  (content OR title matches fantasy keyword)
 *                     AND (content OR title matches clothing keyword)
 *                     → only prompts with BOTH signals to avoid tagging generic fantasy scenes.
 *
 * The script reports candidates and, if --apply is passed, connects the tags.
 * It never disconnects existing tag associations.
 */
import { PrismaClient } from '@prisma/client'

const DRY_RUN = !process.argv.includes('--apply')

interface TagRule {
  slug: string
  /**
   * Whitelist of prompt slugs to link. Curated after dry-run heuristics surfaced
   * candidates; keeps linking surgical so no off-topic prompts slip in.
   */
  includeSlugs: string[]
}

const RULES: TagRule[] = [
  {
    slug: 'スレンダー',
    includeSlugs: [
      'midjourney-dark-robe-gold-embroidery',
      'midjourney-dark-robes-azawakh-dog',
      'midjourney-watercolor-dark-fantasy',
      'translucent-wing-melancholic-silhouette',
    ],
  },
  {
    slug: 'ファンタジー衣装',
    includeSlugs: [
      'dragon-princess-zelda-dress',
      'wizard-spellbook-cathedral-library-cinematic-d4f6j2',
      'wizard-sleeping-stone-face-dark-fantasy-landscape-h8t3v5',
      'warhammer-40k-chaos-witch-cosplay',
    ],
  },
]

async function main() {
  const prisma = new PrismaClient()
  try {
    for (const rule of RULES) {
      const tag = await prisma.tag.findUnique({
        where: { slug: rule.slug },
        include: { prompts: { select: { id: true } } },
      })
      if (!tag) {
        console.warn(`[link] tag "${rule.slug}" not found in DB. Run tier2-tags seed first.`)
        continue
      }
      const alreadyLinked = new Set(tag.prompts.map((p) => p.id))

      const matches = await prisma.prompt.findMany({
        where: {
          slug: { in: rule.includeSlugs },
          isPublished: true,
        },
        select: { id: true, title: true, description: true, content: true, slug: true },
      })
      const missing = rule.includeSlugs.filter((s) => !matches.find((m) => m.slug === s))
      if (missing.length > 0) {
        console.warn(`  ⚠️  not found / not published: ${missing.join(', ')}`)
      }
      const toLink = matches.filter((p) => !alreadyLinked.has(p.id))

      console.log(`\n=== ${rule.slug} ===`)
      console.log(`  currently linked: ${alreadyLinked.size}`)
      console.log(`  whitelist hits: ${matches.length} / ${rule.includeSlugs.length}`)
      console.log(`  new links to add: ${toLink.length}`)
      for (const m of toLink) {
        console.log(`    • [${m.slug}] ${m.title}`)
      }

      if (!DRY_RUN && toLink.length > 0) {
        await prisma.tag.update({
          where: { slug: rule.slug },
          data: {
            prompts: {
              connect: toLink.map((m) => ({ id: m.id })),
            },
          },
        })
        console.log(`  ✅ linked ${toLink.length} prompts → ${rule.slug}`)
      }
    }

    if (DRY_RUN) {
      console.log('\n[link] DRY RUN — no changes applied. Pass --apply to commit links.')
    } else {
      console.log('\n[link] done. Re-run tier2-tags seed to re-evaluate approval.')
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
