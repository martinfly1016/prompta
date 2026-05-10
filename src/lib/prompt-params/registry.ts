import type { PromptParamsConfig } from './types'
import { config as straightLongBlackHair } from './configs/straight-long-black-hair-glossy'
import { config as sailorPleated } from './configs/sailor-uniform-pleated-skirt'
import { config as blueSerafuku } from './configs/blue-serafuku-school-uniform'
import { config as chibiWalk } from './configs/chibi-girl-walk-26'
import { config as twintailBlonde } from './configs/twintail-blonde-sailor-outfit'
import { config as witchLibrary } from './configs/witch-library-grey-hair-elegant'
import { config as fantasySwordswoman } from './configs/fantasy-swordswoman-confident'
import { config as whitePaladin } from './configs/white-hair-paladin-sword'

const REGISTRY: Record<string, PromptParamsConfig> = {
  'straight-long-black-hair-glossy': straightLongBlackHair,
  'sailor-uniform-pleated-skirt': sailorPleated,
  'blue-serafuku-school-uniform': blueSerafuku,
  'chibi-girl-walk-26': chibiWalk,
  'chibi-girl-walk-29': chibiWalk,
  'twintail-blonde-sailor-outfit': twintailBlonde,
  'witch-library-grey-hair-elegant': witchLibrary,
  'fantasy-swordswoman-confident': fantasySwordswoman,
  'white-hair-paladin-sword': whitePaladin,
}

export function getPromptParamsConfig(slug: string): PromptParamsConfig | null {
  return REGISTRY[slug] ?? null
}

export function getConfiguredSlugs(): string[] {
  return Object.keys(REGISTRY)
}
