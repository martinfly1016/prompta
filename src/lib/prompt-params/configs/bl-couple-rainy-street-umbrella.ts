import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'cinematic shoujo manga aesthetic',
      options: artStyleOptions('cinematic shoujo manga aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'wet street reflecting neon shop signs in pinks and blues',
      options: lightingOptions('wet street reflecting neon shop signs in pinks and blues'),
    },
  ],
}
