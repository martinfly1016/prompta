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
  {
    slug: '制服',
    includeSlugs: [
      'cinematic-portrait-student-uniform',
      'school-uniform-freckles-joy',
      'green-suit-gentleman-fashion',
      'sailor-uniform-school-cosplay',
      'school-uniform-pleated-skirt',
      'pleated-miniskirt-cosplay-girl',
      'dark-academia-school-uniform',
    ],
  },
  {
    slug: 'プリーツスカート',
    includeSlugs: [
      'white-down-jacket-serafuku-winter',
      'pleated-miniskirt-cosplay-girl',
      'straight-long-black-hair-glossy',
      'asymmetrical-bangs-black-hair',
      'school-uniform-pleated-skirt',
    ],
  },
  {
    // 2026-05-27: /tag/体格差 currently has only 5 dark-fantasy "怪物×老人"
    // prompts that mismatch the dominant 体格差 search intent (恋愛カップル /
    // 攻め受け / 親子 / 戦士×魔法使い). GSC「体格差ツール」410 imp/月 pos 8.4
    // CTR 0.49% confirms severe content-intent mismatch.
    //
    // Retag 8 height-diff + 6 BL prompts that are真正的 ペア体格差 to grow
    // the tag from 5 → 19 and align with search intent.
    slug: '体格差',
    includeSlugs: [
      // height-diff guide series — clear ペア体格差 (5/24 ship)
      'height-diff-fantasy-knight-mage',         // 巨大装甲騎士 210cm × 小柄魔法使い 150cm
      'height-diff-mecha-pilot-android',          // メカ 18m × パイロット 160cm（極端スケール）
      'height-diff-siblings-brother-sister',      // 高校生兄 × 小学生妹（大人体 vs 子供体）
      'height-diff-parent-child-hand-holding',    // 父 178cm × 娘 110cm
      'height-diff-rpg-party-warrior-healer',     // 戦士 × ヒーラー（筋肉 vs 細身）
      'height-diff-hug-tall-embracing-short',     // 高身長が小柄を包み込む
      'height-diff-couple-kabedon-looking-up',    // 壁ドン構図（攻め受け体格差）
      'height-diff-bl-couple-tall-short',         // BL 高身長攻め × 低身長受け
      // BL guide series — clear 攻め × 受け 体格差 (5/24 ship)
      'bl-couple-princess-carry-rescue',          // お姫様抱っこ（体格差必須）
      'bl-couple-kabedon-school',                 // 壁ドン（高身長 × 小柄）
      'bl-couple-kiss-leaning-down',              // 屈んでキス（体格差顕著）
      'bl-couple-looking-up-tension',             // 見上げる × 見下ろす対面
      'bl-couple-hug-from-behind',                // 後ろからハグ
      'bl-couple-fantasy-knight-mage',            // BL 騎士 × 魔法使いペア
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
