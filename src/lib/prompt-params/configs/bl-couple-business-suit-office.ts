import type { PromptParamsConfig } from '../types'
import { artStyleOptions, lightingOptions, blExpressionOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'sophisticated adult BL aesthetic',
      options: artStyleOptions('sophisticated adult BL aesthetic'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'blinds casting striped light across the scene',
      options: lightingOptions('blinds casting striped light across the scene'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'calm composed expressions',
      options: blExpressionOptions('calm composed expressions'),
    },
  ],
}
