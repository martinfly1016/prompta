import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'slice-of-life shoujo manga aesthetic',
      options: artStyleOptions('slice-of-life shoujo manga aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'sunlight streaming through the cafe window',
      options: lightingOptions('sunlight streaming through the cafe window'),
    },
  ],
}
