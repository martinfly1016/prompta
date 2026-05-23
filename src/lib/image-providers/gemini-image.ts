import type { ImageProvider, ProviderCallOpts, ProviderResult } from './types'

const MODEL =
  process.env.GEMINI_PAID_IMAGE_MODEL ||
  process.env.GEMINI_IMAGE_MODEL ||
  'gemini-3.1-flash-image-preview'

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

async function call(opts: ProviderCallOpts): Promise<ProviderResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY')

  // Build content parts: prompt text + optional source image (image-edit mode)
  const parts: any[] = [{ text: opts.prompt }]
  if (opts.sourceImage) {
    parts.push({
      inline_data: {
        mime_type: opts.sourceImage.mimeType,
        data: opts.sourceImage.base64,
      },
    })
  }

  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini Image ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json: any = await res.json()
  const respParts = json?.candidates?.[0]?.content?.parts ?? []
  const imgPart = respParts.find(
    (p: any) => p?.inline_data?.data || p?.inlineData?.data,
  )
  const b64: string | undefined =
    imgPart?.inline_data?.data ?? imgPart?.inlineData?.data
  if (!b64) {
    const textPart = respParts.find((p: any) => p?.text)?.text ?? ''
    throw new Error(`Gemini returned no image. Text: ${textPart.slice(0, 200)}`)
  }
  return {
    image: { base64: b64, mimeType: 'image/png' },
  }
}

export const provider: ImageProvider = {
  id: 'gemini-image',
  label: 'Gemini (Nano Banana)',
  icon: '✨',
  iconUrl: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64',
  modes: ['image-gen', 'image-edit'],
  credits: 5,
  costUsd: 0.039,
  call,
}
