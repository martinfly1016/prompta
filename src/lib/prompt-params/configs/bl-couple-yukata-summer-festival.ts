import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'romantic summer aesthetic, traditional anime illustration style',
      options: artStyleOptions('romantic summer aesthetic, traditional anime illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'festival lanterns and food stalls in soft bokeh background',
      options: lightingOptions('festival lanterns and food stalls in soft bokeh background'),
    },
  ],
}
