/**
 * Seed two-person-composition-prompt-guide Guide row into the DB so it shows
 * up on /guides list page + sitemap (both query DB; detail page reads
 * GUIDE_CONTENT constants in (marketing)/guides/[slug]/page.tsx).
 *
 * Run once after deploy. Idempotent — upserts.
 */
import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()

  const slug = 'two-person-composition-prompt-guide'
  const title = 'カップルポーズ・二人構図のAIプロンプト完全ガイド — 関係性別 30 構図テンプレート'
  const description = 'カップル・友達・兄弟・BL風・百合風・OC×推し など二人構図を AI で描く完全ガイド。並ぶ・手をつなぐ・ハグ・お姫様抱っこ・壁ドン・見上げる・キス・背中合わせ 8 ポーズ × 関係性別 30+ テンプレート。Stable Diffusion / Midjourney / DALL-E 対応、英語プロンプト一覧、ツール別注意点、よくある失敗対処法を実例つきで解説。'
  const targetKeyword = 'カップル ポーズ'

  const content = '# カップルポーズ・二人構図のAIプロンプト完全ガイド\n\n本記事の本文は /guides/two-person-composition-prompt-guide のページ実装（GUIDE_CONTENT 定数）で管理されています。\n\n対応キーワード: カップル ポーズ, 二人 ポーズ, 見上げる 構図, キス イラスト 構図, お姫様抱っこ 構図, カップル 写真 ポーズ, カップル イラスト'

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
