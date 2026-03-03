// ==================== CivitAI API Types ====================

export interface CivitAIMeta {
  prompt?: string
  negativePrompt?: string
  Size?: string
  seed?: number
  Model?: string
  steps?: number
  sampler?: string
  cfgScale?: number
  [key: string]: unknown
}

export interface CivitAIImageStats {
  cryCount: number
  laughCount: number
  likeCount: number
  dislikeCount: number
  heartCount: number
  commentCount: number
}

export interface CivitAIImageItem {
  id: number
  url: string
  hash: string
  width: number
  height: number
  nsfwLevel: number // 1=None, 2+=NSFW
  hasMeta: boolean
  type: string
  createdAt: string
  postId: number
  stats: CivitAIImageStats
  meta: CivitAIMeta | null
  username: string
}

export interface CivitAIResponse {
  items: CivitAIImageItem[]
  metadata: {
    nextCursor?: string
    nextPage?: string
    currentPage: number
    pageSize: number
  }
}

// ==================== Pipeline Data Types ====================

/** Raw data extracted from CivitAI API */
export interface RawCollectedItem {
  sourceId: string
  sourceUrl: string
  imageUrl: string
  prompt: string
  negativePrompt?: string
  width: number
  height: number
  model?: string
  author: string
  stats: {
    likes: number
    hearts: number
    comments: number
  }
  collectedAt: string
}

/** Data after Claude Code enrichment (translation, classification, SEO) */
export interface EnrichedPromptData {
  // Preserved from raw
  sourceUrl: string
  imageUrl: string
  content: string // Original English prompt
  negativePrompt?: string
  width: number
  height: number
  author: string

  // AI-generated fields
  title: string // Japanese title, ~30 chars
  description: string // Japanese description, 1-2 sentences
  slug: string
  categorySlug: string // One of: hairstyle, clothing, cosplay, anime, color, costume, body-type, camera
  toolSlug: string // 'stable-diffusion' for CivitAI
  tags: string[] // 3-5 Japanese tags
  seoTitle: string // Japanese, <=60 chars
  seoDescription: string // Japanese, <=160 chars
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

/** Image uploaded to Vercel Blob */
export interface UploadedImage {
  url: string
  blobKey: string
  fileName: string
  fileSize: number
  mimeType: string
  width: number
  height: number
}

/** Final data ready for database write (image uploaded) */
export interface FinalPromptData extends Omit<EnrichedPromptData, 'imageUrl'> {
  image: UploadedImage
}

// ==================== Script Output Wrappers ====================

export interface FetchResult {
  success: boolean
  items: RawCollectedItem[]
  totalFetched: number
  totalSkipped: number
  cursor?: string
  error?: string
}

export interface DeduplicationResult {
  success: boolean
  newItems: RawCollectedItem[]
  duplicateCount: number
  error?: string
}

export interface WriteResult {
  success: boolean
  promptId?: string
  slug?: string
  title?: string
  error?: string
}
