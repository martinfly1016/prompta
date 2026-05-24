import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'shoujo manga emotional aesthetic',
      options: artStyleOptions('shoujo manga emotional aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'afternoon sunlight streaming through windows',
      options: lightingOptions('afternoon sunlight streaming through windows'),
    },
  ],
}
