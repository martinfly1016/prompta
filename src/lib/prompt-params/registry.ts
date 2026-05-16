import type { PromptParamsConfig } from './types'
import { ALL_CONFIGS } from './configs.generated'

// Slug aliases — both keys resolve to the same config.
// Use this when two prompts share identical content (e.g. duplicate seed entries).
const ALIASES: Record<string, string> = {
  'chibi-girl-walk-29': 'chibi-girl-walk-26',
  'orange-hair-braid-multicolor-jacket': 'braid-sidelocks-body-markings',
  // 2026-05-16 batch — near-duplicate prompt contents share single config
  'anime-girl-red-14': 'anime-prompt-f061b77b',
  'anime-girl-scene-12': 'anime-prompt-f061b77b',
  'anime-girl-meadow-22': 'anime-girl-meadow-21',
}

export function getPromptParamsConfig(slug: string): PromptParamsConfig | null {
  const target = ALIASES[slug] ?? slug
  return ALL_CONFIGS[target] ?? null
}

export function getConfiguredSlugs(): string[] {
  return [...Object.keys(ALL_CONFIGS), ...Object.keys(ALIASES)]
}
