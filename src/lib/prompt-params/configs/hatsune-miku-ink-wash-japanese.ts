import type { PromptParamsConfig } from '../types'
import { hairColorOptions, eyeColorOptions, hairStyleOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'aqua hair',
      options: hairColorOptions('aqua hair'),
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳色',
      match: 'aqua eyes',
      options: eyeColorOptions('aqua eyes'),
    },
    {
      id: 'hairStyle',
      type: 'select',
      label: '髪型',
      match: 'twintails',
      options: hairStyleOptions('twintails'),
    },
  ],
}
