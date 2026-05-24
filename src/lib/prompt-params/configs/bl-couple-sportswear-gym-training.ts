import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'dynamic athletic aesthetic with subtle emotional tension',
      options: artStyleOptions('dynamic athletic aesthetic with subtle emotional tension'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'bright clean lighting',
      options: lightingOptions('bright clean lighting'),
    },
  ],
}
