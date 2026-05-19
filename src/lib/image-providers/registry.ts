/**
 * Provider registry. Auto-discovers all registered providers and exposes
 * helpers to:
 *  - List providers for a given mode (text / image-gen / image-edit)
 *  - Recommend a default provider for a given prompt (by category + tool)
 *  - Look up provider by id
 *
 * To add a new provider: drop the file in this directory and add to PROVIDERS.
 */

import { provider as geminiImage } from './gemini-image'
import { provider as openaiImage } from './openai-image'
import { provider as geminiText } from './gemini-text'
import type { ExecuteMode, ImageProvider, ProviderId } from './types'

export const PROVIDERS: ImageProvider[] = [
  geminiImage,
  openaiImage,
  geminiText,
]

const BY_ID = Object.fromEntries(PROVIDERS.map((p) => [p.id, p])) as Record<ProviderId, ImageProvider>

export function getProvider(id: ProviderId): ImageProvider | null {
  return BY_ID[id] ?? null
}

export function listProvidersForMode(mode: ExecuteMode): ImageProvider[] {
  return PROVIDERS.filter((p) => p.modes.includes(mode))
}

/**
 * Inspect a prompt's category + tool slug and return the recommended
 * execute mode + default provider. Used by <PromptExecutor> to seed the
 * UI before the user picks anything.
 */
export function recommendForPrompt(args: {
  categorySlug: string | null | undefined
  toolSlug: string | null | undefined
}): { mode: ExecuteMode; defaultProviderId: ProviderId } {
  const { categorySlug, toolSlug } = args
  // photo-edit category → image-edit (requires source upload)
  if (categorySlug === 'photo-edit') {
    return { mode: 'image-edit', defaultProviderId: 'gemini-image' }
  }
  // text-prompt categories → text generation
  const TEXT_CATEGORIES = new Set([
    'writing',
    'programming',
    'business',
    'education',
  ])
  const TEXT_TOOLS = new Set(['chatgpt', 'claude'])
  if (
    (categorySlug && TEXT_CATEGORIES.has(categorySlug)) ||
    (toolSlug && TEXT_TOOLS.has(toolSlug))
  ) {
    return { mode: 'text', defaultProviderId: 'gemini-text' }
  }
  // Default: image generation (hairstyle, clothing, anime, creative, etc.)
  return { mode: 'image-gen', defaultProviderId: 'gemini-image' }
}
