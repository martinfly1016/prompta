import type { PromptParamsConfig } from '../types'
import { hairColorOptions, fabricColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'blonde hair',
      options: hairColorOptions('blonde hair'),
    },
    {
      id: 'dressColor',
      type: 'color',
      label: 'ドレスの色',
      match: 'blue dress',
      options: fabricColorOptions('dress', 'blue dress'),
    },
    {
      id: 'palette',
      type: 'select',
      label: '色調',
      match: 'pastel colors',
      options: [
        { value: 'pastel colors', label: 'パステル' },
        { value: 'vibrant colors', label: '鮮やか' },
        { value: 'muted colors', label: 'マット' },
        { value: 'monochrome', label: 'モノクロ' },
        { value: 'sepia tones', label: 'セピア' },
        { value: 'dreamy soft tones', label: 'ドリーミーソフト' },
      ],
    },
  ],
}
