// Server-side image validation. Runs BEFORE quota consumption so an invalid
// upload never costs the user a free use or paid credit.
//
// Layers:
//  1. Magic-byte sniff — declared MIME from the browser may lie. We confirm
//     the actual format from the file header.
//  2. sharp metadata — verifies the image actually decodes (rejects truncated
//     / corrupted files), and exposes width/height/animation flags so we can
//     enforce sensible bounds before paying for a Gemini call.
//
// Bounds chosen to match the Gemini 2.5 Flash personal-color use case:
//  - >= 256×256: smaller than this, facial features aren't reliable
//  - <= 6000×6000: pixel-count cap to avoid Gemini timeouts on absurd inputs
//  - no animation: GIF/animated-WebP only the first frame would reach Gemini

import sharp from 'sharp'

export type ImageFormat = 'jpeg' | 'png' | 'webp'

export interface ImageValidationOk {
  ok: true
  format: ImageFormat
  width: number
  height: number
}

export interface ImageValidationError {
  ok: false
  code:
    | 'unrecognised_magic'
    | 'mime_mismatch'
    | 'decode_failed'
    | 'animated_not_supported'
    | 'image_too_small'
    | 'image_too_large'
  messageJa: string
}

const MIN_SIDE = 256
const MAX_SIDE = 6000

function sniffMagic(buf: Buffer): ImageFormat | null {
  if (buf.length < 12) return null
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg'
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  )
    return 'png'
  // WebP: "RIFF" .... "WEBP"
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  )
    return 'webp'
  return null
}

const DECLARED_TO_FORMAT: Record<string, ImageFormat> = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export async function validateImageBuffer(
  buf: Buffer,
  declaredMime: string,
): Promise<ImageValidationOk | ImageValidationError> {
  const sniffed = sniffMagic(buf)
  if (!sniffed) {
    return {
      ok: false,
      code: 'unrecognised_magic',
      messageJa: 'ファイルが画像として認識できません。JPG / PNG / WebP のみ対応しています。',
    }
  }

  const declared = DECLARED_TO_FORMAT[declaredMime?.toLowerCase()]
  if (declared && declared !== sniffed) {
    return {
      ok: false,
      code: 'mime_mismatch',
      messageJa: `ファイルの拡張子と内容が一致しません（実際は ${sniffed.toUpperCase()} です）。`,
    }
  }

  let meta: sharp.Metadata
  try {
    meta = await sharp(buf, { failOn: 'truncated' }).metadata()
  } catch (e: any) {
    return {
      ok: false,
      code: 'decode_failed',
      messageJa: '画像が破損しているか、対応していない形式です。別の画像をお試しください。',
    }
  }

  const isAnimated =
    Boolean((meta as any).pages && (meta as any).pages > 1) ||
    Boolean((meta as any).delay && (meta as any).delay.length > 1)
  if (isAnimated) {
    return {
      ok: false,
      code: 'animated_not_supported',
      messageJa: 'アニメーション画像は対応していません。静止画をアップロードしてください。',
    }
  }

  const width = meta.width ?? 0
  const height = meta.height ?? 0
  if (width < MIN_SIDE || height < MIN_SIDE) {
    return {
      ok: false,
      code: 'image_too_small',
      messageJa: `画像が小さすぎます（${width}×${height}）。${MIN_SIDE}×${MIN_SIDE} 以上の画像を推奨します。`,
    }
  }
  if (width > MAX_SIDE || height > MAX_SIDE) {
    return {
      ok: false,
      code: 'image_too_large',
      messageJa: `画像の解像度が大きすぎます（${width}×${height}）。${MAX_SIDE}×${MAX_SIDE} 以下に縮小してください。`,
    }
  }

  return { ok: true, format: sniffed, width, height }
}
