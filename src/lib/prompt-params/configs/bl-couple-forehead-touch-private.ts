import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'shoujo manga aesthetic',
      options: artStyleOptions('shoujo manga aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'soft warm rim lighting from window behind them',
      options: lightingOptions('soft warm rim lighting from window behind them'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'tender expressions',
      options: blExpressionOptions('tender expressions'),
    },
  ],
}
