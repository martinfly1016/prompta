import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'fantasy concept art illustration',
      options: artStyleOptions('fantasy concept art illustration'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'mysterious blue magical light',
      options: lightingOptions('mysterious blue magical light'),
    },
  ],
}
