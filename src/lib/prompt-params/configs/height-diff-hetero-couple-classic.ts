import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'photorealistic illustration style',
      options: artStyleOptions('photorealistic illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'soft golden hour lighting',
      options: lightingOptions('soft golden hour lighting'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'affectionate expressions',
      options: blExpressionOptions('affectionate expressions'),
    },
  ],
}
