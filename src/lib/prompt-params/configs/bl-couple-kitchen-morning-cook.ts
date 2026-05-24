import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'slice-of-life manga aesthetic',
      options: artStyleOptions('slice-of-life manga aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'morning sunlight streaming through window',
      options: lightingOptions('morning sunlight streaming through window'),
    },
  ],
}
