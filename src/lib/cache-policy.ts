/** ISR windows for public content. Detail pages change rarely; lists pick up new items within an hour. */
export const REVALIDATE_LIST_SECONDS = 60 * 60
export const REVALIDATE_DETAIL_SECONDS = 60 * 60 * 24

export const PROMPTS_PER_PAGE = 12

/** Shared CDN cache for public read-only API responses. Browsers revalidate; the edge holds a fresh copy for an hour and may serve stale for a day. */
export const PUBLIC_API_CACHE_CONTROL =
  'public, s-maxage=3600, stale-while-revalidate=86400'

export const PRIVATE_API_CACHE_CONTROL =
  'private, no-cache, no-store, must-revalidate'

export const CACHE_TAG_PROMPTS = 'prompts'
export const CACHE_TAG_CATEGORIES = 'categories'
export const CACHE_TAG_TAGS = 'tags'
