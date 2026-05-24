/**
 * Seed bl-composition-prompt-guide Guide row into DB so /guides list + sitemap
 * include it. Detail page renders GUIDE_CONTENT constant from page.tsx.
 *
 * Idempotent — upserts.
 */
import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()

  const slug = 'bl-composition-prompt-guide'
  const title = 'BL カップル構図のAIプロンプト完全ガイド — 二人の関係性を 8 ポーズ × 12 シーンで描き分ける'
  const description = 'BL（男性 2 人）カップル構図を AI で描く完全ガイド。並び立ち・手をつなぐ・ハグ・お姫様抱っこ・壁ドン・見上げる・キス・額をつける 8 ポーズ × 学園 / カフェ / オフィス / ファンタジー 12 シチュエーション、Stable Diffusion / Midjourney / DALL-E 対応、NSFW フィルター回避の中立表現、全英語プロンプト一覧、実例サンプル画像つき。'
  const targetKeyword = 'bl 構図'

  const content = '# BL カップル構図のAIプロンプト完全ガイド\n\n本記事の本文は /guides/bl-composition-prompt-guide のページ実装（GUIDE_CONTENT 定数）で管理されています。\n\n対応キーワード: bl 構図, bl ポーズ, bl イラスト 構図, bl 表紙 構図, bl キス 構図, 二人構図, カップル ポーズ'

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
