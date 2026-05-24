import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'dynamic music BL aesthetic',
      options: artStyleOptions('dynamic music BL aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm evening lighting from a single floor lamp',
      options: lightingOptions('warm evening lighting from a single floor lamp'),
    },
  ],
}
