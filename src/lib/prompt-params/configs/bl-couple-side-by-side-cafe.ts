import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'slice-of-life anime illustration style',
      options: artStyleOptions('slice-of-life anime illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm indoor lighting',
      options: lightingOptions('warm indoor lighting'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'gentle smiles',
      options: blExpressionOptions('gentle smiles'),
    },
  ],
}
