import type { PromptParamsConfig } from './types'
import { config as straightLongBlackHair } from './configs/straight-long-black-hair-glossy'

const REGISTRY: Record<string, PromptParamsConfig> = {
  'straight-long-black-hair-glossy': straightLongBlackHair,
}

export function getPromptParamsConfig(slug: string): PromptParamsConfig | null {
  return REGISTRY[slug] ?? null
}
