import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'fantasy art style',
      options: artStyleOptions('fantasy art style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'dramatic side lighting casting long shadows',
      options: lightingOptions('dramatic side lighting casting long shadows'),
    },
  ],
}
