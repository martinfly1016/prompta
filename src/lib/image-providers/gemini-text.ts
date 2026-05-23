import type { ImageProvider, ProviderCallOpts, ProviderResult } from './types'

const MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const MAX_OUTPUT_TOKENS = 4000  // hard cap to bound runaway cost

async function call(opts: ProviderCallOpts): Promise<ProviderResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY')

  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: opts.prompt }] }],
      generationConfig: {
        responseModalities: ['TEXT'],
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.7,
      },
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini Text ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json: any = await res.json()
  const parts = json?.candidates?.[0]?.content?.parts ?? []
  const text = parts.map((p: any) => p?.text).filter(Boolean).join('\n')
  if (!text) throw new Error('Gemini returned no text')
  return { text }
}

export const provider: ImageProvider = {
  id: 'gemini-text',
  label: 'Gemini 2.5 Flash',
  icon: '📝',
  iconUrl: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64',
  modes: ['text'],
  credits: 1,
  costUsd: 0.003,
  call,
}
