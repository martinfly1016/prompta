import type { PromptParamsConfig } from '../types'
import { hairColorOptions, hairStyleOptions, eyeColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'blue hair',
      options: hairColorOptions('blue hair'),
    },
    {
      id: 'hairStyle',
      type: 'select',
      label: '髪型',
      match: 'braided hair',
      options: hairStyleOptions('braided hair'),
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳の色',
      match: 'pink eyes',
      options: eyeColorOptions('pink eyes'),
    },
  ],
}
