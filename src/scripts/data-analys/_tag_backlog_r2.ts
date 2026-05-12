/**
 * Tag backlog R2 cleanup (2026-05-12).
 *
 * Approves ~55 high-value unapproved tags (≥2 prompts, semantic, photo/visual SEO-targets).
 * Deletes ~15 pollution tags (X プロンプト suffix, X ai suffix, 8k/8d 解像度 etc).
 * Skip "anime" (5 prompts, lowercase dup of approved アニメ) — manual decision needed.
 *
 * Rationale: tag-stats showed 494/580 (85.2%) noindex with 22 new tags in last 7d and only
 * 1 approval, so the audit is severely backlogged. This batch targets the highest-prompt
 * unapproved tags + obvious pollution to bring noindex below 75%.
 *
 * Note: approved tags here do NOT have seoIntro yet. Tag detail pages fall back to template
 * intro. Backfill of seoIntro is a follow-up batch.
 */
import { PrismaClient } from '@prisma/client'

const APPROVE_SLUGS = [
  // Tier A (≥3 prompts, broad semantic)
  '学校制服', 'シルエット', '未来的', '剣', 'モノクロ', '甲冑',
  'シミュレーション', 'ファッション', 'エレガント', 'キャラクターデザイン',
  'コスチューム', '背景', '逆光', 'タトゥー', '探検家',
  // Tier B (2 prompts, broad semantic — visual SEO targets)
  '宇宙船', '戦闘', '夕焼け', 'フリル', '前髪', 'アクション',
  '1980年代', 'ショートヘア', '後ろ姿', 'フィルムフォト', 'ダンス',
  '暗い', '魔法使い', '未来', 'インテリア', '全身', '田園風景',
  'スタジオライティング', '図書館', 'ヘッドドレス', '学生服',
  'ドラマティック', '宇宙', 'セピア', '肖像画', '俯瞰', '窓辺',
  '読書', '冬服', 'ローアングル', '部屋デザイン', '怪獣',
  '水彩画', 'パステルカラー', '漢服', 'イラスト', 'シュルレアリスム',
  'アート', 'ミニマルアート', 'ファンタジーキャラ',
]

const DELETE_SLUGS = [
  // Param/spec pollution
  '8k解像度', '8k詳細', '8d', '高解像度撮影',
  // "X プロンプト" suffix (duplicate vs base tag)
  '髪型プロンプト', 'カメラアングルプロンプト', '構図プロンプト', '表情プロンプト',
  // "X ai" suffix (tool name mashed into theme)
  'ビューティーai', 'ファッションai', 'キャラクターai', '動物ai', 'ファンタジーai',
  'ビジネスai', 'ai',
  // Tool + technique mash
  'midjourneyテクニック',
  // Encoding garbage
  '経営�画',
  // Generic adjective noise
  '詳細描写', '超詳細',
]

async function main() {
  const p = new PrismaClient()

  // 1) Snapshot before
  const beforeTotal = await p.tag.count()
  const beforeApproved = await p.tag.count({ where: { isApproved: true } })
  console.log(`Before: total=${beforeTotal} approved=${beforeApproved} noindex=${beforeTotal - beforeApproved} (${((beforeTotal - beforeApproved) / beforeTotal * 100).toFixed(1)}%)`)
  console.log()

  // 2) Approve
  console.log(`=== Approving ${APPROVE_SLUGS.length} tags ===`)
  const approvedRows: any[] = []
  const approveMissing: string[] = []
  for (const slug of APPROVE_SLUGS) {
    const t = await p.tag.findUnique({ where: { slug }, include: { _count: { select: { prompts: true } } } })
    if (!t) { approveMissing.push(slug); continue }
    if (t.isApproved) { console.log(`  SKIP ${slug} (already approved)`); continue }
    await p.tag.update({ where: { slug }, data: { isApproved: true } })
    approvedRows.push({ slug, prompts: (t as any)._count.prompts })
    console.log(`  ✓ ${slug} (${(t as any)._count.prompts} prompts)`)
  }
  if (approveMissing.length) console.log(`  MISSING (skipped): ${approveMissing.join(', ')}`)
  console.log()

  // 3) Delete pollution
  console.log(`=== Deleting ${DELETE_SLUGS.length} pollution tags ===`)
  const deleted: any[] = []
  const deleteMissing: string[] = []
  for (const slug of DELETE_SLUGS) {
    const t = await p.tag.findUnique({ where: { slug }, include: { _count: { select: { prompts: true } } } })
    if (!t) { deleteMissing.push(slug); continue }
    await p.tag.delete({ where: { slug } })
    deleted.push({ slug, prompts: (t as any)._count.prompts })
    console.log(`  ✗ ${slug} (had ${(t as any)._count.prompts} prompts)`)
  }
  if (deleteMissing.length) console.log(`  MISSING (skipped): ${deleteMissing.join(', ')}`)
  console.log()

  // 4) Snapshot after
  const afterTotal = await p.tag.count()
  const afterApproved = await p.tag.count({ where: { isApproved: true } })
  console.log(`After:  total=${afterTotal} approved=${afterApproved} noindex=${afterTotal - afterApproved} (${((afterTotal - afterApproved) / afterTotal * 100).toFixed(1)}%)`)
  console.log()
  console.log(`Summary: +${approvedRows.length} approved, -${deleted.length} deleted (pollution), noindex ${beforeTotal - beforeApproved} → ${afterTotal - afterApproved}`)

  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
