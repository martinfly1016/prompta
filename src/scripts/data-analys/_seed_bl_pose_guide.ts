/**
 * Seed bl-pose-collection-guide Guide row into DB so /guides list + sitemap
 * include it. Detail page renders GUIDE_CONTENT constant from page.tsx.
 *
 * Idempotent — upserts.
 */
import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()

  const slug = 'bl-pose-collection-guide'
  const title = 'BL ポーズ集｜AIで再現する男性 2 人の定番 30 ポーズ完全ガイド'
  const description = 'BL ポーズを AI イラストで再現する完全ガイド。距離別 / アクション別 / 関係性別に 30 種以上のポーズ英語プロンプトを収録。手の使い方・視線・表情・服装パターン、ControlNet OpenPose 活用法、NSFW 回避のコツ、ツール別の出しやすさを実例つきで解説。BL ポーズ素材・資料を探している同人作家・AI イラストレーター向け。'
  const targetKeyword = 'bl ポーズ'

  const content = '# BL ポーズ集 — AI で再現する男性 2 人の定番 30 ポーズ完全ガイド\n\n本記事の本文は /guides/bl-pose-collection-guide のページ実装（GUIDE_CONTENT 定数）で管理されています。\n\n対応キーワード: bl ポーズ, bl ポーズ 集, bl ポーズ 素材, bl ポーズ 資料, bl ポーズ フリー素材, 二人 ポーズ, 男性 2 人 ポーズ'

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
