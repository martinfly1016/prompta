import type { ImageProvider, ProviderCallOpts, ProviderResult } from './types'

const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1'
const ENDPOINT = 'https://api.openai.com/v1/images/generations'

function getApiKey(): string {
  const k = process.env.OPENAI_API_KEY || process.env.chatgpt_api_key
  if (!k) throw new Error('Missing OPENAI_API_KEY')
  return k
}

function mapAspect(ar: ProviderCallOpts['aspectRatio']): string {
  switch (ar) {
    case '3:4':
    case '9:16':
      return '1024x1536'
    case '4:3':
    case '16:9':
      return '1536x1024'
    case '1:1':
    default:
      return '1024x1024'
  }
}

async function call(opts: ProviderCallOpts): Promise<ProviderResult> {
  const apiKey = getApiKey()

  // gpt-image-1 only supports generations (no edit endpoint yet via this adapter)
  // Edit mode falls back to embedding the source image hint in the prompt text.
  let prompt = opts.prompt
  if (opts.sourceImage) {
    prompt = `[Source photo provided; edit only the requested elements while preserving identity, pose, background details unless explicitly changed.]\n\n${prompt}`
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size: mapAspect(opts.aspectRatio),
      n: 1,
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`OpenAI Image ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json: any = await res.json()
  const data = json?.data?.[0]
  if (data?.b64_json) {
    return { image: { base64: data.b64_json, mimeType: 'image/png' } }
  }
  if (data?.url) {
    const imgRes = await fetch(data.url)
    if (!imgRes.ok) throw new Error(`OpenAI fetch image URL ${imgRes.status}`)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    return { image: { base64: buf.toString('base64'), mimeType: 'image/png' } }
  }
  throw new Error('OpenAI returned no image data')
}

export const provider: ImageProvider = {
  id: 'openai-image',
  label: 'ChatGPT (DALL-E)',
  icon: '💬',
  modes: ['image-gen'],
  credits: 5,
  costUsd: 0.04,
  call,
}
