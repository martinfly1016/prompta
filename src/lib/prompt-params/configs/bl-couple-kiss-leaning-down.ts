import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'romantic shoujo manga kiss scene',
      options: artStyleOptions('romantic shoujo manga kiss scene'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm rim lighting from sunset window behind them',
      options: lightingOptions('warm rim lighting from sunset window behind them'),
    },
  ],
}
