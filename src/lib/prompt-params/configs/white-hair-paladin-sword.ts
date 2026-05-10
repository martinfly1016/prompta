import type { PromptParamsConfig } from '../types'
import { hairColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'white hair',
      options: hairColorOptions('white hair'),
    },
    {
      id: 'weapon',
      type: 'select',
      label: '武器',
      match: 'holding sword',
      options: [
        { value: 'holding sword', label: '剣' },
        { value: 'holding greatsword', label: '大剣' },
        { value: 'holding spear', label: '槍' },
        { value: 'holding bow', label: '弓' },
        { value: 'holding axe', label: '斧' },
        { value: 'holding shield', label: '盾' },
        { value: 'holding staff', label: '杖' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'dark light night',
      options: [
        { value: 'dark light night', label: '夜闇' },
        { value: 'golden sunrise', label: '黄金の朝焼け' },
        { value: 'misty forest', label: '霧の森' },
        { value: 'snow storm', label: '吹雪' },
        { value: 'desert wasteland', label: '荒野' },
        { value: 'enchanted ruins', label: '魔法の遺跡' },
      ],
    },
  ],
}
