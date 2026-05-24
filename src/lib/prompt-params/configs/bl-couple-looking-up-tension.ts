import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'emotional shoujo manga aesthetic',
      options: artStyleOptions('emotional shoujo manga aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'soft warm indoor lighting',
      options: lightingOptions('soft warm indoor lighting'),
    },
  ],
}
