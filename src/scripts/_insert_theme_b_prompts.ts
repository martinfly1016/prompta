// @ts-nocheck
// One-off insertion of high-volume keyword gap prompts (Theme B + Theme A natural-hair).
// See seo/photo-edit-keywords-2026-05-supplement.md for keyword research.
//
// Targets:
//   Theme B (Wall/Room Color) — ~3,500/mo combined, 0% coverage
//   Theme A (Hair Color Sim, natural) — ~3,000/mo, partially covered
//
// Idempotent: skips inserts when slug already exists.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

type PromptInput = {
  slug: string
  title: string
  description: string
  content: string
  seoTitle: string
  seoDescription: string
  categorySlug: string
  toolSlug: string
  tags: string[]
  difficulty?: string
}

const PROMPTS: PromptInput[] = [
  {
    slug: 'wallpaper-pattern-try-on',
    title: '壁紙シミュレーション AI - 部屋の壁紙を試着プロンプト',
    description:
      'リビング・トイレ・寝室の壁紙を AI で瞬時に試着シミュレーション。リリカラ/サンゲツ風の柄や色違いを 1 枚で比較できる写真加工プロンプト。',
    content: `Edit only the wall surfaces in the uploaded room photo to apply a new wallpaper pattern. The desired pattern is: [DESCRIBE PATTERN HERE — e.g., "soft cream beige with subtle vertical stripes" or "Scandinavian botanical print in pale sage green"]. Keep the existing furniture, flooring, lighting fixtures, decorations, ceiling, doors, and windows exactly as in the source — only the wall planes change. Preserve the room's perspective, shadow direction, and the way light wraps onto the walls so the new pattern looks like it was physically painted/applied in the same lighting condition. Match the wallpaper scale to the room (typical residential pattern repeat). Output at the original resolution, photorealistic with subtle paper or vinyl texture as appropriate. Do not regenerate the room from scratch — only operate on the existing wall pixels and preserve every non-wall element (furniture, floor, ceiling, fixtures) exactly.`,
    seoTitle: '壁紙シミュレーション AI 無料 - リビング・トイレ・寝室の壁紙を写真で試着',
    seoDescription:
      '壁紙シミュレーションを AI で。リビング・トイレ・寝室の写真をアップして好きな柄・色の壁紙を瞬時にプレビュー。リリカラ/サンゲツ風の和洋柄に対応、配色判定にも使える Gemini プロンプト。',
    categorySlug: 'photo-edit',
    toolSlug: 'gemini',
    tags: ['写真加工', '壁紙シミュレーション', 'インテリア', '部屋デザイン', 'gemini'],
    difficulty: 'intermediate',
  },
  {
    slug: 'wall-color-change-living-room',
    title: 'リビング壁色変更 AI - 部屋配色シミュレーションプロンプト',
    description:
      '部屋の壁を別の色に塗り替えてシミュレーション。家具と床に馴染む配色を瞬時に判定できる AI 写真加工プロンプト。',
    content: `Edit only the wall surfaces in the uploaded room photo to repaint them in a new solid color. Target color: [SPECIFY HEX OR NAME — e.g., "warm sage green (#A8B89A)" or "moody navy (#2C3E50)" or "soft terracotta (#C97757)"]. Keep furniture, flooring, ceiling, doors, windows, baseboards, light fixtures, art, and all decor exactly as in the source — only the wall planes are recolored. Maintain the existing light direction and shadow softness so the wall color reads correctly under the room's lighting. Apply the new color with realistic matte interior-paint texture, including how natural light bounces off corners and how shadow areas darken naturally. Output at the original resolution, photorealistic. Do not introduce new highlights, do not regenerate the room from scratch — only operate on existing wall pixels.`,
    seoTitle: 'リビング壁色変更 AI - 部屋配色シミュレーション無料プロンプト',
    seoDescription:
      'リビングの壁色を AI で塗り替えシミュレーション。家具・床・天井はそのまま、壁だけを瞬時に別の色へ。配色のリフォーム検討に。Gemini 2.5 Flash Image 対応プロンプト。',
    categorySlug: 'photo-edit',
    toolSlug: 'gemini',
    tags: ['写真加工', '部屋配色', '壁色シミュレーション', 'インテリア', 'リフォーム', 'gemini'],
    difficulty: 'intermediate',
  },
  {
    slug: 'interior-color-coordination-palette',
    title: 'インテリア配色シミュレーション AI - 部屋の全体カラーコーディネート',
    description:
      'リビングの壁・カーテン・ラグ・ソファのトーンを統一する AI 配色プロンプト。Spring/Summer/Autumn/Winter 風の調和パレットを瞬時に試せる。',
    content: `Recolor the uploaded room photo according to a unified interior color palette. Target palette: [SPECIFY — e.g., "warm Autumn earth tones (camel #C19A6B, terracotta #C97757, deep olive #6E7C3B, cream #F1E8D0)" or "cool Winter contrast (charcoal #2C3E50, ice blue #B7D6E6, soft white #F4F4F4, silver gray #95A5A6)"]. Apply this palette consistently to the walls, soft furnishings (curtains, rugs, throw pillows, blankets), and accent decor — but preserve the structural elements (floor wood, ceiling, fixed cabinetry, doors, windows, light fixtures) exactly as in the source. Match the existing light direction and shadow softness so the new palette reads naturally. Keep all furniture in the same position; only their textile colors change. Output at the original resolution, photorealistic with appropriate matte/textile texture for each surface.`,
    seoTitle: 'インテリア配色シミュレーション AI - 部屋全体のカラーコーディネートプロンプト',
    seoDescription:
      'インテリア配色を AI で瞬時にシミュレーション。壁・カーテン・ラグ・ソファのトーンを統一し、Spring/Autumn/Winter 系の調和パレットを試せる。リフォーム前の配色検討に最適な Gemini プロンプト。',
    categorySlug: 'photo-edit',
    toolSlug: 'gemini',
    tags: ['写真加工', 'インテリア配色', '部屋デザイン', 'カラーコーディネート', 'gemini'],
    difficulty: 'advanced',
  },
  {
    slug: 'house-exterior-paint-color-simulate',
    title: '外壁塗装シミュレーション AI - 家の外壁色を写真で試着',
    description:
      '一戸建ての外壁色と屋根色を AI で塗り替えシミュレーション。窓・植栽・空はそのまま、外観のリフォーム前検討に使える写真加工プロンプト。',
    content: `Repaint only the exterior wall surfaces of the uploaded house photo with a new color. Target color: [SPECIFY — e.g., "warm beige (#C9B79C)" or "modern charcoal (#3D3D3D)" or "soft sage (#9CA88D)"]. Also optionally recolor the roof: [SPECIFY OR LEAVE AS-IS]. Keep windows, doors, garage doors, eaves, gutters, fences, landscaping (trees, lawn, planters), driveway, sky, and any people/cars exactly as in the source — only the wall siding/stucco/board surfaces change. Maintain the existing sun direction, shadow patterns, and reflected light onto the walls so the new color reads under the photographed lighting condition. Apply realistic exterior-paint or siding texture (slight matte, weathered consistency). Output at the original resolution, photorealistic. Do not regenerate the entire house — only operate on the wall pixels.`,
    seoTitle: '外壁塗装シミュレーション AI 無料 - 家の外壁色・屋根色を写真で試着',
    seoDescription:
      '家の外壁・屋根の色を AI で塗り替えシミュレーション。窓・植栽・空はそのまま。リフォーム業者に依頼前のセルフ検討や、複数色の比較検討に。Gemini 2.5 Flash Image 対応プロンプト。',
    categorySlug: 'photo-edit',
    toolSlug: 'gemini',
    tags: ['写真加工', '外壁塗装', '家リフォーム', '外観シミュレーション', 'gemini'],
    difficulty: 'intermediate',
  },
  {
    slug: 'hair-color-natural-simulation',
    title: '髪色シミュレーション AI - 自分に似合うナチュラル髪色プロンプト',
    description:
      '自分の写真にナチュラルな髪色を AI で試着シミュレーション。ヘアカラー予約前に複数色を比較したい人向けの写真加工プロンプト。',
    content: `Recolor only the hair of the person in the uploaded photo to a new natural shade. Target color: [SPECIFY — e.g., "cool ash brown (#5C4A3F)" or "warm honey blonde (#C9A66B)" or "deep mahogany (#3E2723)" or "soft chestnut (#7A5A48)"]. Keep the person's hairstyle, hair length, hair texture, partline, and the way hair falls exactly as in the source — only the color of each strand changes. Apply realistic salon-grade color characteristics: subtle root-to-tip variation, natural highlights where light hits, and shadow areas darker than highlight areas. Preserve eyebrow color match (subtly adjust eyebrows to harmonize with the new hair). Do not change the person's face, skin tone, eye color, makeup, expression, clothing, or background. Output at the original resolution, photorealistic with sharp strand-level detail. Do not regenerate the hair from scratch — only recolor existing hair pixels.`,
    seoTitle: '髪色シミュレーション AI - 自分に似合うナチュラル髪色を写真で試着',
    seoDescription:
      '髪色を AI で瞬時にシミュレーション。アッシュブラウン・ハニーブロンド・マホガニーなど人気のナチュラル色を試着。ヘアカラー予約前の検討や複数色の比較に使える Gemini プロンプト。',
    categorySlug: 'photo-edit',
    toolSlug: 'gemini',
    tags: ['写真加工', '髪色シミュレーション', 'ヘアカラー', '髪色変更', 'gemini'],
    difficulty: 'beginner',
  },
]

async function main() {
  const db = new PrismaClient()

  // Lookup category + tool IDs
  const photoEdit = await db.category.findUnique({ where: { slug: 'photo-edit' } })
  const gemini = await db.tool.findUnique({ where: { slug: 'gemini' } })
  if (!photoEdit || !gemini) {
    console.error('Missing category=photo-edit or tool=gemini in DB')
    process.exit(1)
  }

  for (const p of PROMPTS) {
    const existing = await db.prompt.findUnique({ where: { slug: p.slug } })
    if (existing) {
      console.log(`[skip] ${p.slug} already exists`)
      continue
    }

    // Ensure tags exist (create as unapproved by default per memory note)
    const tagIds: string[] = []
    for (const tagName of p.tags) {
      const slug = tagName.toLowerCase().replace(/\s+/g, '-')
      const tag = await db.tag.upsert({
        where: { slug },
        create: { slug, name: tagName, isApproved: false },
        update: {},
      })
      tagIds.push(tag.id)
    }

    const created = await db.prompt.create({
      data: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        content: p.content,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        difficulty: p.difficulty ?? 'intermediate',
        isPublished: true,
        category: { connect: { id: photoEdit.id } },
        tool: { connect: { id: gemini.id } },
        tags: { connect: tagIds.map(id => ({ id })) },
      },
    })
    console.log(`[ok] ${p.slug} → /${created.id}`)
  }

  await db.$disconnect()
  console.log('\n[done]')
}

main().catch(e => { console.error(e); process.exit(1) })
