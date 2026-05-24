import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'mature adult BL aesthetic',
      options: artStyleOptions('mature adult BL aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'dim subway interior lighting',
      options: lightingOptions('dim subway interior lighting'),
    },
  ],
}
