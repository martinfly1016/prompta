import type { ImageProvider, ProviderCallOpts, ProviderResult } from './types'

// fal.ai endpoint. Default model is fast-sdxl (~$0.005/image, ~2-3s).
// Override via FAL_SD_MODEL env if you want flux/dev or a different variant.
//   Examples:
//     fal-ai/fast-sdxl              ← default, cheapest, SDXL Lightning
//     fal-ai/stable-diffusion-v35-large
//     fal-ai/flux/dev               ← higher quality, ~$0.025/image
const MODEL_PATH = process.env.FAL_SD_MODEL || 'fal-ai/fast-sdxl'
const ENDPOINT = `https://fal.run/${MODEL_PATH}`

/**
 * Map our ProviderCallOpts.aspectRatio onto fal's image_size enum. fal
 * accepts named sizes or {width, height}; we use the named set for the
 * SDXL family. Defaults to square_hd (1024×1024).
 */
function imageSizeFor(aspect?: ProviderCallOpts['aspectRatio']): string {
  switch (aspect) {
    case '16:9':
      return 'landscape_16_9'
    case '9:16':
      return 'portrait_16_9'
    case '4:3':
      return 'landscape_4_3'
    case '3:4':
      return 'portrait_4_3'
    case '1:1':
    default:
      return 'square_hd'
  }
}

async function call(opts: ProviderCallOpts): Promise<ProviderResult> {
  const apiKey = process.env.FAL_KEY || process.env.FAL_API_KEY
  if (!apiKey) throw new Error('Missing FAL_KEY')

  // image-edit isn't this provider's job (SDXL on fal.ai doesn't take a
  // source image in the same way Gemini does). Reject early.
  if (opts.sourceImage) {
    throw new Error('fal-sdxl does not support image-edit mode')
  }

  const body: Record<string, unknown> = {
    prompt: opts.prompt,
    image_size: imageSizeFor(opts.aspectRatio),
    num_images: 1,
    num_inference_steps: 25,
    enable_safety_checker: true,
  }
  if (opts.negativePrompt) body.negative_prompt = opts.negativePrompt

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`fal-sdxl ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json: any = await res.json()
  const imageUrl: string | undefined = json?.images?.[0]?.url
  if (!imageUrl) {
    throw new Error('fal-sdxl returned no image url')
  }

  // fal returns a hosted URL; download + base64-encode so we match the
  // ProviderResult shape that /api/prompt/execute already handles (it
  // uploads the buffer to Vercel Blob downstream).
  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) throw new Error(`fal image fetch ${imgRes.status}`)
  const buf = Buffer.from(await imgRes.arrayBuffer())
  const mimeType = imgRes.headers.get('content-type') || 'image/jpeg'

  // Safety-filter detection: fal's `enable_safety_checker: true` returns a
  // valid HTTP 200 with a tiny (~14-20 KB) all-black JPEG when content
  // tripped the filter — not an error response. Real SDXL renders are
  // typically 100-400 KB. Anything under 50 KB is treated as a safety
  // reject so the executor's catch path refunds the credit instead of
  // delivering a black image to the user.
  if (buf.length < 50_000) {
    console.warn('[fal-sdxl] safety_filter_block', {
      bytes: buf.length,
      promptHead: opts.prompt.slice(0, 120),
    })
    throw new Error(
      'fal-sdxl returned a safety-filter blank (likely NSFW reject). ' +
      'Try rephrasing the prompt — remove couple/romantic/intimate terms.',
    )
  }

  return {
    image: {
      base64: buf.toString('base64'),
      mimeType,
    },
  }
}

export const provider: ImageProvider = {
  id: 'fal-sdxl',
  label: 'Stable Diffusion (SDXL)',
  icon: '🎨',
  // stability.ai owns the SD brand — use their favicon for visual association
  iconUrl: 'https://www.google.com/s2/favicons?domain=stability.ai&sz=64',
  modes: ['image-gen'],
  credits: 5,
  // fal-ai/fast-sdxl is ~$0.005/image; bumped to 0.008 to cover bandwidth
  // overhead from the buffer download + Vercel Blob upload.
  costUsd: 0.008,
  call,
}
