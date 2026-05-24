import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'romantic wedding aesthetic',
      options: artStyleOptions('romantic wedding aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'stained glass window light casting colorful patterns',
      options: lightingOptions('stained glass window light casting colorful patterns'),
    },
  ],
}
