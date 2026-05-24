import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'family illustration style',
      options: artStyleOptions('family illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'soft morning light',
      options: lightingOptions('soft morning light'),
    },
  ],
}
