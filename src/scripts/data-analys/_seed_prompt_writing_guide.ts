/**
 * Seed the new prompt-writing-guide Guide row into the DB so it shows up
 * on /guides list page (which queries DB; detail page reads constants.ts).
 *
 * Run once after deploy of d314307+ / Tier 2 commit. Idempotent — upserts.
 */
import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()

  const slug = 'prompt-writing-guide'
  const title = 'プロンプトの書き方完全ガイド｜効果的なAIプロンプト作成の7つのコツとテンプレート集'
  const description = 'ChatGPT・Claude・Gemini・Stable Diffusion対応のプロンプト書き方完全ガイド。7つのコツ、コピペで使えるテンプレート、ツール別の違い、NG例と改善方法、業務活用例まで実践的に解説。'
  const targetKeyword = 'プロンプト 書き方'

  // Detail page renders content from hardcoded GUIDE_CONTENT (constants.ts pattern).
  // DB content field is required (String, not optional), so we store a short
  // placeholder pointing to the canonical source.
  const content = '# プロンプトの書き方完全ガイド\n\n本記事の本文は /guides/prompt-writing-guide のページ実装（GUIDE_CONTENT 定数）で管理されています。\n\n対応キーワード: プロンプト 書き方, プロンプト 生成, ai プロンプト コツ, 生成ai プロンプト, プロンプト 書き方 コツ'

  // Get max order to append at end
  const maxOrder = await p.guide.aggregate({ _max: { order: true } })
  const nextOrder = (maxOrder._max.order ?? 0) + 1

  const result = await p.guide.upsert({
    where: { slug },
    create: {
      slug,
      title,
      description,
      content,
      targetKeyword,
      isPublished: true,
      order: nextOrder,
    },
    update: {
      title,
      description,
      content,
      targetKeyword,
      isPublished: true,
    },
  })

  console.log(`✓ ${result.slug} (id=${result.id}, order=${result.order}, isPublished=${result.isPublished})`)
  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
