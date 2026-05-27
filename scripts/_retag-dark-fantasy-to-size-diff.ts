// @ts-nocheck
/**
 * 2026-05-27: move 5 dark-fantasy "怪物 × 老人 / 子供 × ロボット" prompts
 * from /tag/体格差 → /tag/サイズ差.
 *
 * Rationale: these are size-contrast images, not 人物ペア体格差 (couple /
 * 攻め受け / 親子 / 戦士×魔法使い) which is the dominant search intent
 * for 体格差. Phase 1 (6029a73) + Phase 2 (17ca5d6) brought /tag/体格差
 * to 25 prompts with the new ペア content on page 1; this cleanup makes
 * the tag 100% intent-focused by relocating the off-topic dark-fantasy
 * 5 to a separate サイズ差 tag where size-contrast is the literal focus.
 *
 * /tag/サイズ差 will hold these as the seed for a niche cluster (giant
 * 怪物 + tiny 老人/子供 fantasy aesthetic).
 */
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const SLUGS = [
  'child-robot-bodytype-contrast-wideshot',
  'child-robot-size-contrast-embrace',
  'old-man-giant-baby-monster-bodytype',
  'old-man-giant-evil-cat-bodytype',
  'old-man-giant-monster-bodytype-dark',
]

const p = new PrismaClient()
;(async () => {
  // 1. ensure サイズ差 tag exists (approved for sitemap inclusion)
  const sizeDiff = await p.tag.upsert({
    where: { slug: 'サイズ差' },
    update: { isApproved: true },
    create: { slug: 'サイズ差', name: 'サイズ差', isApproved: true },
  })
  console.log(`サイズ差 tag: id=${sizeDiff.id} approved=${sizeDiff.isApproved}`)

  const taikakuSa = await p.tag.findUnique({ where: { slug: '体格差' } })
  if (!taikakuSa) throw new Error('体格差 tag missing — unexpected')

  for (const slug of SLUGS) {
    const before = await p.prompt.findUnique({
      where: { slug },
      include: { tags: { select: { slug: true } } },
    })
    if (!before) {
      console.log(`  ⚠️  ${slug} not found, skipping`)
      continue
    }
    const beforeTagSlugs = before.tags.map((t) => t.slug)

    await p.prompt.update({
      where: { slug },
      data: {
        tags: {
          disconnect: [{ id: taikakuSa.id }],
          connect: [{ id: sizeDiff.id }],
        },
      },
    })

    const after = await p.prompt.findUnique({
      where: { slug },
      include: { tags: { select: { slug: true } } },
    })
    const afterTagSlugs = after!.tags.map((t) => t.slug)
    console.log(`  ✅ ${slug}`)
    console.log(`     before: ${beforeTagSlugs.join(', ')}`)
    console.log(`     after:  ${afterTagSlugs.join(', ')}`)
  }

  // 3. final state check
  const taikakuCount = await p.prompt.count({
    where: { tags: { some: { slug: '体格差' } }, isPublished: true },
  })
  const sizeDiffCount = await p.prompt.count({
    where: { tags: { some: { slug: 'サイズ差' } }, isPublished: true },
  })
  console.log(`\n=== final state ===`)
  console.log(`/tag/体格差    published: ${taikakuCount}`)
  console.log(`/tag/サイズ差  published: ${sizeDiffCount}`)

  await p.$disconnect()
})()
