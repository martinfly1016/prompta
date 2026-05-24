import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'character lineup illustration style',
      options: artStyleOptions('character lineup illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'even studio lighting',
      options: lightingOptions('even studio lighting'),
    },
  ],
}
