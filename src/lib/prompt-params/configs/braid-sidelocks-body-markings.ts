import type { PromptParamsConfig } from '../types'
import { hairColorOptions, eyeColorOptions, expressionOptions } from '../options'

// Note: content has both "long hair" and "very long hair" tokens — length cannot
// be safely parameterized without rewriting both. Skipping that axis.
export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'orange hair',
      options: hairColorOptions('orange hair'),
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳色',
      match: 'blue eyes',
      options: eyeColorOptions('blue eyes'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'smile',
      options: expressionOptions('smile'),
    },
  ],
}
