import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'romantic shoujo manga aesthetic',
      options: artStyleOptions('romantic shoujo manga aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'warm torch lighting',
      options: lightingOptions('warm torch lighting'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'soft loving expressions',
      options: blExpressionOptions('soft loving expressions'),
    },
  ],
}
