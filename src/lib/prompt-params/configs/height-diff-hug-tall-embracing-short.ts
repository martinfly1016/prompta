import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'anime romantic illustration style',
      options: artStyleOptions('anime romantic illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'soft warm interior lighting',
      options: lightingOptions('soft warm interior lighting'),
    },
  ],
}
