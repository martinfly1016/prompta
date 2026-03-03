// ==================== CivitAI API Configuration ====================

export const CIVITAI_CONFIG = {
  baseUrl: 'https://civitai.com/api/v1',
  defaultLimit: 20,
  maxPages: 5,
  sort: 'Most Reactions' as const,
  period: 'Week' as const,
  nsfw: 'None' as const,
  requestDelayMs: 1500,
} as const

// ==================== Image Configuration ====================

export const IMAGE_CONFIG = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  blobPathPrefix: 'prompts/',
} as const

// ==================== Validation Rules ====================

export const VALIDATION_CONFIG = {
  minPromptLength: 20,
  requireMeta: true,
  maxNsfwLevel: 1, // 1 = None (SFW only)
} as const

// ==================== Revalidation Targets ====================

export const REVALIDATION_PATHS = [
  '/',
  '/all-prompts',
] as const

// ==================== Helper Functions ====================

export function getCivitaiImageDownloadUrl(imageUrl: string, width?: number): string {
  if (width) {
    const url = new URL(imageUrl)
    url.searchParams.set('width', String(width))
    return url.toString()
  }
  return imageUrl
}

export function getCivitaiSourceUrl(imageId: number | string): string {
  return `https://civitai.com/images/${imageId}`
}
