import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'slice-of-life manga illustration',
      options: artStyleOptions('slice-of-life manga illustration'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm indoor evening lighting with soft lamp glow',
      options: lightingOptions('warm indoor evening lighting with soft lamp glow'),
    },
  ],
}
