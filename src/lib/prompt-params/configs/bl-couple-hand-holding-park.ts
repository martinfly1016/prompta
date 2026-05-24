import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'anime illustration style',
      options: artStyleOptions('anime illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'golden hour lighting',
      options: lightingOptions('golden hour lighting'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'soft warm expressions',
      options: blExpressionOptions('soft warm expressions'),
    },
  ],
}
