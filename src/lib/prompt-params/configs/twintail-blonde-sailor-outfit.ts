import type { PromptParamsConfig } from '../types'
import {
  hairColorOptions,
  expressionOptions,
  eyeColorOptions,
  fabricColorOptions,
} from '../options'

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
      id: 'eyeColor',
      type: 'color',
      label: '瞳色',
      match: 'blue eyes',
      options: eyeColorOptions('blue eyes'),
    },
    {
      id: 'choker',
      type: 'color',
      label: 'チョーカー色',
      match: 'red choker',
      options: fabricColorOptions('choker', 'red choker'),
    },
    {
      id: 'skirt',
      type: 'color',
      label: 'スカート色',
      match: 'blue skirt',
      options: fabricColorOptions('skirt', 'blue skirt'),
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
