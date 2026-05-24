import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'modern anime aesthetic',
      options: artStyleOptions('modern anime aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'RGB keyboard glow',
      options: lightingOptions('RGB keyboard glow'),
    },
  ],
}
