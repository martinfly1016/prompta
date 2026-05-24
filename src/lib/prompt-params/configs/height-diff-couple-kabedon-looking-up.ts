import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'shoujo manga romance illustration style',
      options: artStyleOptions('shoujo manga romance illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'soft warm window light from the side',
      options: lightingOptions('soft warm window light from the side'),
    },
  ],
}
