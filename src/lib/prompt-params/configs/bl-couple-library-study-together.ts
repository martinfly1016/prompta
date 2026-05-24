import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'slice-of-life anime aesthetic',
      options: artStyleOptions('slice-of-life anime aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm afternoon library light',
      options: lightingOptions('warm afternoon library light'),
    },
  ],
}
