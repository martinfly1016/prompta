import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'BL romance illustration style',
      options: artStyleOptions('BL romance illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm indoor lighting',
      options: lightingOptions('warm indoor lighting'),
    },
  ],
}
