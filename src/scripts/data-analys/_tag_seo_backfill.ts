/**
 * Backfill seoTitle / seoDescription / seoIntro for approved tags that lack them.
 *
 * Source of truth for the output format = existing approved tags. Stats observed
 * (2026-05-12, 69 tags): seoIntro 409-1250 chars (median 562). The new
 * approved-but-empty set is 72 tags after R2.
 *
 * Uses Gemini 2.5 Flash (text-only, JSON response). Cost ~$0.03 total for 72 tags.
 * Concurrency 4. Failed tags are logged but don't stop the batch.
 */
import { PrismaClient } from '@prisma/client'

const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash'
const TEXT_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent`
const CONCURRENCY = 4

interface TagInput {
  slug: string
  name: string
  promptCount: number
  samplePrompts: { title: string; category: string | null; tool: string | null }[]
}

interface SeoOutput {
  seoTitle: string
  seoDescription: string
  seoIntro: string
}

function buildPrompt(t: TagInput): string {
  const sampleLines = t.samplePrompts
    .map((p, i) => `  ${i + 1}. ${p.title} (category=${p.category ?? '-'}, tool=${p.tool ?? '-'})`)
    .join('\n')
  return `あなたは日本語AIプロンプト集サイト「Prompta」のSEOライターです。タグページ向けに、SEOメタデータと導入文を生成します。

## タグ情報
- タグ名: ${t.name}
- スラッグ: ${t.slug}
- このタグが付いたプロンプト数: ${t.promptCount}
- 代表プロンプト例:
${sampleLines || '  (なし)'}

## 出力仕様
以下のJSONオブジェクトのみを出力してください。前後に説明文・コードフェンス禁止。

{
  "seoTitle": "<20-30文字 / 形式「『${t.name}』プロンプト集｜<具体的なベネフィット>」>",
  "seoDescription": "<50-70文字 / プロンプト数(${t.promptCount}個)・主な用途・対応ツール(Stable Diffusion / Midjourney / ChatGPT / Claude / DALL-E / Gemini いずれか該当)を含む>",
  "seoIntro": "<450-650文字 / 構成は以下に従う>"
}

## seoIntro 構成（厳守）
段落1（120-180文字）: 「${t.name}プロンプトは、…AI画像生成（または文章生成）で…するためのテキスト指示です。」で始め、何のためのプロンプトか・どのAIで使うかを定義。
段落2（120-180文字）: 効果的なテクニック・指定すべき要素（カラー / 構図 / 雰囲気 / 質感 など3-4個）を具体的に箇条書き風に述べる。英語キーワードはそのまま挿入。
段落3（150-250文字）: 「組み合わせ例:」と書き、3つの実例プロンプトを「・」始まりで列挙。各例は英語キーワード混じり、25-50文字程度。
段落4（任意、50-80文字）: 失敗時の代替案や、より絞り込むコツ。

## 文体要件
- 「ですます」体
- 専門用語は英語のまま（例: cinematic lighting, ash beige, low-angle shot）
- 改行は \\n（JSON エスケープ）で入れる
- 「組み合わせ例:」は段落3の冒頭。直後に改行→「・」始まりの3行

## 厳守事項
- 出力は単一JSONオブジェクト。前後の説明・コードフェンス・コメント禁止
- seoIntro は450-650文字。必ずこの範囲に収める
- 代表プロンプト例が「(なし)」の場合でも、タグ名から内容を推測して書く`
}

async function callGemini(promptText: string, apiKey: string): Promise<string> {
  const body = {
    contents: [{ parts: [{ text: promptText }] }],
    generationConfig: {
      temperature: 0.3,
      topP: 0.95,
      responseMimeType: 'application/json',
    },
  }
  const res = await fetch(`${TEXT_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 300)}`)
  }
  const json: any = await res.json()
  const text = json?.candidates?.[0]?.content?.parts?.find((p: any) => p?.text)?.text ?? ''
  if (!text) throw new Error('Empty response')
  return text
}

function parseOutput(raw: string): SeoOutput {
  let parsed: any
  try {
    parsed = JSON.parse(raw)
  } catch {
    const m = raw.match(/\{[\s\S]*\}/)
    if (!m) throw new Error(`Not JSON: ${raw.slice(0, 200)}`)
    parsed = JSON.parse(m[0])
  }
  const seoTitle = String(parsed.seoTitle ?? '').trim()
  const seoDescription = String(parsed.seoDescription ?? '').trim()
  const seoIntro = String(parsed.seoIntro ?? '').trim()
  if (!seoTitle || !seoDescription || !seoIntro) {
    throw new Error(`Missing fields: title=${seoTitle.length} desc=${seoDescription.length} intro=${seoIntro.length}`)
  }
  if (seoIntro.length < 300 || seoIntro.length > 1250) {
    throw new Error(`seoIntro length out of range: ${seoIntro.length}`)
  }
  return { seoTitle, seoDescription, seoIntro }
}

async function processTag(p: PrismaClient, slug: string, apiKey: string): Promise<{ slug: string; ok: boolean; introLen?: number; error?: string }> {
  const tag = await p.tag.findUnique({
    where: { slug },
    include: {
      _count: { select: { prompts: true } },
      prompts: {
        select: { title: true, category: { select: { slug: true } }, tool: { select: { slug: true } } },
        take: 6,
      },
    },
  })
  if (!tag) return { slug, ok: false, error: 'not found' }

  const input: TagInput = {
    slug: tag.slug,
    name: tag.name,
    promptCount: (tag as any)._count.prompts,
    samplePrompts: (tag as any).prompts.map((pr: any) => ({
      title: pr.title,
      category: pr.category?.slug ?? null,
      tool: pr.tool?.slug ?? null,
    })),
  }

  const prompt = buildPrompt(input)
  let lastErr = ''
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const raw = await callGemini(prompt, apiKey)
      const out = parseOutput(raw)
      await p.tag.update({
        where: { slug },
        data: {
          seoTitle: out.seoTitle,
          seoDescription: out.seoDescription,
          seoIntro: out.seoIntro,
        },
      })
      return { slug, ok: true, introLen: out.seoIntro.length }
    } catch (e: any) {
      lastErr = e.message
      await new Promise(r => setTimeout(r, 800 * (attempt + 1)))
    }
  }
  return { slug, ok: false, error: lastErr }
}

async function main() {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) { console.error('Missing GOOGLE_AI_API_KEY'); process.exit(1) }

  const p = new PrismaClient()
  const todo = await p.tag.findMany({
    where: { isApproved: true, OR: [{ seoIntro: null }, { seoIntro: '' }] },
    select: { slug: true },
    orderBy: { prompts: { _count: 'desc' } },
  })
  console.log(`Tags needing seoIntro: ${todo.length}`)
  if (!todo.length) { await p.$disconnect(); return }

  const limit = parseInt(process.argv[2] || '0', 10) || todo.length
  const slugs = todo.slice(0, limit).map(t => t.slug)
  console.log(`Will process ${slugs.length} (concurrency=${CONCURRENCY}, model=${TEXT_MODEL})`)
  console.log()

  let done = 0
  const results: any[] = []
  for (let i = 0; i < slugs.length; i += CONCURRENCY) {
    const chunk = slugs.slice(i, i + CONCURRENCY)
    const out = await Promise.all(chunk.map(s => processTag(p, s, apiKey)))
    for (const r of out) {
      done++
      if (r.ok) console.log(`  [${done}/${slugs.length}] ✓ ${r.slug} (intro=${r.introLen})`)
      else console.log(`  [${done}/${slugs.length}] ✗ ${r.slug} — ${r.error}`)
      results.push(r)
    }
  }

  const ok = results.filter(r => r.ok).length
  const fail = results.filter(r => !r.ok).length
  console.log()
  console.log(`Done: ${ok} ok / ${fail} fail`)
  if (fail) {
    console.log(`Failed slugs: ${results.filter(r => !r.ok).map(r => r.slug).join(', ')}`)
  }
  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
