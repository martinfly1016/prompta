import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'melancholic youth BL aesthetic',
      options: artStyleOptions('melancholic youth BL aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'golden hour warm orange and pink sky behind them',
      options: lightingOptions('golden hour warm orange and pink sky behind them'),
    },
  ],
}
