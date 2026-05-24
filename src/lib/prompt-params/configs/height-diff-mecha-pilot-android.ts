import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'sci-fi anime illustration style',
      options: artStyleOptions('sci-fi anime illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'dramatic backlight from hangar bay doors',
      options: lightingOptions('dramatic backlight from hangar bay doors'),
    },
  ],
}
