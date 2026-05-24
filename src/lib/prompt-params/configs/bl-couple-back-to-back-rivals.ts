import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'shounen anime illustration style',
      options: artStyleOptions('shounen anime illustration style'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'dramatic backlight with lens flare',
      options: lightingOptions('dramatic backlight with lens flare'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'serious cool determined expressions',
      options: blExpressionOptions('serious cool determined expressions'),
    },
  ],
}
