/**
 * Pages that must not be indexed.
 *
 * Prompt and tag rows stay in the database. These slugs are noindex and are
 * left out of sitemap.xml. Redirect sources are also dropped from the sitemap
 * even if a published row still exists.
 *
 * Chosen from a crawl of live /prompt and /tag titles and body text
 * (2026-10-25). A hit was kept only when the page itself asks for sexual or
 * sexually suggestive output, or pairs a school-uniform / 少女 framing with
 * sexual wording. Substring false positives (イエロー, 個性的, コロリアージュ,
 * ゴシックロリィタ as a fashion label) were not included.
 */

export const NOINDEX_PROMPT_SLUGS = [
  // Title markets 「セクシー学校制服」 and a loosened necktie.
  'untied-necktie-uniform-girl',
  // Student-uniform portrait whose prompt includes "sexy".
  'cinematic-portrait-student-uniform',
  // Title says 学生服美少女 and the prompt includes "sexy".
  'school-uniform-freckles-joy',
  // Description sells a 「セクシー」 curvy gym-wear look.
  'curvy-pink-gym-wear-sporty',
  // Prompt tag is "(emo, sexy)".
  'emo-tattoo-piercing-subculture-accessories',
  // Title says アニメ少女 and the prompt includes "cleavage".
  'twin-color-wings-anime-girl',
] as const

export const NOINDEX_TAG_SLUGS = [
  // Editorial intro recommends `short skirt` + `sexy pose` for school uniforms.
  '学校制服',
] as const

/** Permanent redirect sources from next.config.js. Not landing pages. */
export const REDIRECT_SOURCE_PATHS = [
  '/all-prompts',
  '/prompt/sailor-uniform-school-cosplay',
  '/prompt/elegant-dress-woman-nlds',
  '/prompt/red-cocktail-dress-elegant-c248',
  '/prompt/cmhzvpn7n0001121qnipsdo6d',
  '/prompt/cmi45qa9q0006120dkmu4tn7v',
  '/prompt/gradient-hair-17',
  '/prompt/gradient-hair-18',
  '/prompt/gradient-hair-19',
  '/prompt/neon-cyberpunk-15',
  '/prompt/neon-cyberpunk-16',
  '/prompt/vibrant-palette-7',
  '/prompt/color-theme-12',
  '/prompt/elegant-lady-knight-armor',
  '/prompt/elegant-fantasy-knight-lady',
  '/prompt/knight-armor-fantasy-4',
  '/prompt/blonde-angel-mech-cyberpunk-night',
  '/prompt/studio-dance-scene-colorful-costume-actress',
  '/prompt/jesus-church-unreal-cinematic',
  '/prompt/stevie-witch-classical-art',
  '/prompt/gold-necklace-vintage-10',
  '/prompt/anime-girl-red-13',
  '/prompt/anime-girl-meadow-20',
  '/prompt/anime-boy-pink-04',
  '/prompt/anime-prompt-94dea3a7',
  '/prompt/anime-prompt-2a7dec94',
  '/prompt/anime-prompt-c1ed5e6e',
  '/prompt/long-black-hair-2ed92766',
  '/prompt/chatgpt-base-r-programming',
  '/prompt/dalle-funk-boy-1980s-film-style',
] as const

const noindexPrompts = new Set<string>(NOINDEX_PROMPT_SLUGS)
const noindexTags = new Set<string>(NOINDEX_TAG_SLUGS)
const redirectPaths = new Set<string>(REDIRECT_SOURCE_PATHS)

export function isPromptIndexable(slug: string): boolean {
  return !noindexPrompts.has(slug)
}

/** Approved tags are indexable unless this policy says otherwise. */
export function isTagIndexable(slug: string, isApproved: boolean): boolean {
  return isApproved && !noindexTags.has(slug)
}

export function isSitemapPathAllowed(pathname: string): boolean {
  const decoded = safeDecode(pathname)
  if (redirectPaths.has(pathname) || redirectPaths.has(decoded)) return false
  const promptSlug = slugAfter(decoded, '/prompt/')
  if (promptSlug && !isPromptIndexable(promptSlug)) return false
  const tagSlug = slugAfter(decoded, '/tag/')
  if (tagSlug && noindexTags.has(tagSlug)) return false
  return true
}

function slugAfter(pathname: string, prefix: string): string | null {
  if (!pathname.startsWith(prefix)) return null
  const rest = pathname.slice(prefix.length).split('/')[0]
  return rest || null
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
