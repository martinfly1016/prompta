/**
 * Per-prompt list of tools where the prompt has been **manually verified**
 * to produce a satisfactory image (i.e. the SD-style prompt is portable).
 *
 * Rendered as a "🎨 動作確認済み" badge row on the prompt detail page,
 * letting users discover the prompt also works on tools they already have.
 *
 * Update workflow:
 *   1. Run `src/scripts/_gen_coloring_compare.ts <slug>` to cross-check.
 *   2. Manually inspect output quality.
 *   3. Add the slug here with the list of confirmed tool slugs.
 *
 * SEO benefit: surfaces long-tail queries like
 *   `<subject> 塗り絵 chatgpt` / `<subject> 塗り絵 gemini` / `<subject> 塗り絵 dall-e`.
 */

export type ToolSlug = 'stable-diffusion' | 'midjourney' | 'chatgpt' | 'claude' | 'dall-e' | 'gemini'

/** Tool display config used by the badge. */
export const TOOL_BADGE_META: Record<ToolSlug, { label: string; icon: string; href: string }> = {
  'stable-diffusion': { label: 'Stable Diffusion', icon: '🎨', href: '/tools/stable-diffusion' },
  midjourney: { label: 'Midjourney', icon: '🚀', href: '/tools/midjourney' },
  chatgpt: { label: 'ChatGPT (DALL-E)', icon: '💬', href: '/tools/chatgpt' },
  claude: { label: 'Claude', icon: '🤖', href: '/tools/claude' },
  'dall-e': { label: 'DALL-E', icon: '🖼️', href: '/tools/dall-e' },
  gemini: { label: 'Gemini (Nano Banana)', icon: '✨', href: '/tools/gemini' },
}

/**
 * slug → list of tool slugs where the prompt has been manually verified.
 * Order matters: shown left-to-right in the badge row.
 */
export const VERIFIED_TOOLS: Record<string, ToolSlug[]> = {
  // ========================================================
  // 塗り絵試点 (2026-05-19 ship) — verified across Gemini + ChatGPT
  // via src/scripts/_gen_coloring_compare.ts. SD path inferred from
  // the prompt being SD-tag-style ("clean line art, no shading...").
  // ========================================================
  'mandala-floral-coloring-page-adults': ['stable-diffusion', 'gemini', 'chatgpt'],
  'rose-bouquet-coloring-page-adults': ['stable-diffusion', 'gemini', 'chatgpt'],
  'cherry-blossom-zen-coloring-page': ['stable-diffusion', 'gemini', 'chatgpt'],
  'cute-dinosaur-coloring-page-kids': ['stable-diffusion', 'gemini', 'chatgpt'],
  'sea-animals-coloring-page-kids': ['stable-diffusion', 'gemini', 'chatgpt'],
  'large-flowers-coloring-page-seniors': ['stable-diffusion', 'gemini', 'chatgpt'],
}

export function getVerifiedTools(slug: string): ToolSlug[] {
  return VERIFIED_TOOLS[slug] ?? []
}
