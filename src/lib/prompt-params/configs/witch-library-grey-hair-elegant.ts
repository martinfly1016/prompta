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
      match: 'grey hair',
      options: hairColorOptions('grey hair'),
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳色',
      match: 'blue eyes',
      options: eyeColorOptions('blue eyes'),
    },
    {
      id: 'hat',
      type: 'color',
      label: '帽子色',
      match: 'dark blue hat',
      options: fabricColorOptions('hat', 'dark blue hat'),
    },
    {
      id: 'dress',
      type: 'color',
      label: 'ドレス色',
      match: 'black dress',
      options: fabricColorOptions('dress', 'black dress'),
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'smirk',
      options: expressionOptions('smirk'),
    },
  ],
}
