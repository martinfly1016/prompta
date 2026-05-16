import type { PromptParamsConfig } from '../types'
import { fabricColorOptions, eyeColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'jacketColor',
      type: 'color',
      label: 'ジャケット色',
      match: 'brown jacket',
      options: fabricColorOptions('jacket', 'brown jacket'),
    },
    {
      id: 'sweaterColor',
      type: 'color',
      label: 'セーター色',
      match: 'black sweater',
      options: fabricColorOptions('sweater', 'black sweater'),
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳の色',
      match: 'red eyes',
      options: eyeColorOptions('red eyes'),
    },
  ],
}
