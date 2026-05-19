/**
 * Cross-tool coloring page generator.
 *
 * Given a prompt slug, generates the same image on both Gemini 2.5/3.1
 * Flash Image and OpenAI GPT Image (DALL-E 3 successor) and writes
 * side-by-side outputs to /tmp/compare-{slug}-{provider}.png.
 *
 * Used to verify prompt portability across tools and to spot-check any
 * prompt that produces an unsatisfactory image on one provider.
 *
 * Env (loads .env + .env.local automatically):
 *   - GOOGLE_AI_API_KEY (Gemini)
 *   - OPENAI_API_KEY or chatgpt_api_key (OpenAI GPT Image)
 *
 * Usage:
 *   npx tsx src/scripts/_gen_coloring_compare.ts mandala-floral-coloring-page-adults
 *   npx tsx src/scripts/_gen_coloring_compare.ts --all
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { PrismaClient } from '@prisma/client'

function loadEnvFile(path: string): void {
  if (!existsSync(path)) return
  const text = readFileSync(path, 'utf8')
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!m) continue
    const name = m[1]
    if (process.env[name] !== undefined) continue
    process.env[name] = m[2].replace(/^['"]|['"]$/g, '')
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

const GEMINI_MODEL =
  process.env.GEMINI_PAID_IMAGE_MODEL ||
  process.env.GEMINI_IMAGE_MODEL ||
  'gemini-3.1-flash-image-preview'

const OPENAI_MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1'

async function generateGemini(prompt: string, apiKey: string): Promise<Buffer | null> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  })
  if (!res.ok) {
    console.error(`  Gemini FAIL ${res.status}: ${(await res.text()).slice(0, 300)}`)
    return null
  }
  const json: any = await res.json()
  const parts = json?.candidates?.[0]?.content?.parts ?? []
  const imgPart = parts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data)
  const b64 = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data
  if (!b64) return null
  return Buffer.from(b64, 'base64')
}

async function generateOpenAI(prompt: string, apiKey: string): Promise<Buffer | null> {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      prompt,
      size: '1024x1024',
      n: 1,
    }),
  })
  if (!res.ok) {
    console.error(`  OpenAI FAIL ${res.status}: ${(await res.text()).slice(0, 300)}`)
    return null
  }
  const json: any = await res.json()
  const data = json?.data?.[0]
  if (!data) return null
  if (data.b64_json) return Buffer.from(data.b64_json, 'base64')
  if (data.url) {
    const imgRes = await fetch(data.url)
    if (!imgRes.ok) return null
    return Buffer.from(await imgRes.arrayBuffer())
  }
  return null
}

async function compareOne(slug: string, content: string): Promise<void> {
  const positive = content.split('\n\n---\n\nNegative prompt:')[0].trim()
  console.log(`\n[${slug}]`)
  console.log(`  Prompt: ${positive.slice(0, 120)}...`)

  const geminiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY || process.env.chatgpt_api_key

  // Run in parallel — independent providers
  const [geminiBuf, openaiBuf] = await Promise.all([
    geminiKey ? generateGemini(positive, geminiKey).catch((e) => { console.error('Gemini ERR', e.message); return null }) : Promise.resolve(null),
    openaiKey ? generateOpenAI(positive, openaiKey).catch((e) => { console.error('OpenAI ERR', e.message); return null }) : Promise.resolve(null),
  ])

  if (geminiBuf) {
    const out = `/tmp/compare-${slug}-gemini.png`
    writeFileSync(out, geminiBuf)
    console.log(`  Gemini OK -> ${out} (${(geminiBuf.length / 1024).toFixed(0)} KB)`)
  } else if (geminiKey) {
    console.log('  Gemini FAIL')
  }

  if (openaiBuf) {
    const out = `/tmp/compare-${slug}-openai.png`
    writeFileSync(out, openaiBuf)
    console.log(`  OpenAI OK -> ${out} (${(openaiBuf.length / 1024).toFixed(0)} KB) [model=${OPENAI_MODEL}]`)
  } else if (openaiKey) {
    console.log('  OpenAI FAIL')
  }
}

;(async () => {
  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const slugs = all ? null : args.filter((a) => !a.startsWith('--'))
  if (!all && (!slugs || slugs.length === 0)) {
    console.error('Usage: npx tsx src/scripts/_gen_coloring_compare.ts <slug> [<slug>...] | --all')
    process.exit(1)
  }

  const p = new PrismaClient()
  const where = all
    ? { slug: { contains: 'coloring-page' } }
    : { slug: { in: slugs! } }
  const prompts = await p.prompt.findMany({ where, select: { slug: true, content: true } })
  await p.$disconnect()

  if (prompts.length === 0) {
    console.error('No prompts found')
    process.exit(1)
  }

  console.log(`Gemini model: ${GEMINI_MODEL}`)
  console.log(`OpenAI model: ${OPENAI_MODEL}`)
  console.log(`Testing ${prompts.length} prompts`)

  for (const pr of prompts) {
    await compareOne(pr.slug, pr.content)
  }

  console.log('\nDone. View images at /tmp/compare-*.png')
})().catch((e) => {
  console.error('FATAL', e.message)
  process.exit(1)
})
