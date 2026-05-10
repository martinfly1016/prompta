import type { PromptParamsConfig } from '../types'
import {
  hairColorOptions,
  hairLengthOptions,
  hairStyleOptions,
  expressionOptions,
  fabricColorOptions,
} from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'black hair',
      options: hairColorOptions('black hair'),
    },
    {
      id: 'hairLength',
      type: 'select',
      label: '髪の長さ',
      match: 'long hair',
      options: hairLengthOptions('long hair'),
    },
    {
      id: 'hairStyle',
      type: 'select',
      label: '髪型',
      match: 'straight hair',
      options: hairStyleOptions('straight hair'),
    },
    {
      id: 'collar',
      type: 'color',
      label: 'セーラーカラーの色',
      match: 'blue sailor collar',
      options: fabricColorOptions('sailor collar', 'blue sailor collar'),
    },
    {
      id: 'sleeves',
      type: 'select',
      label: '袖の長さ',
      match: 'short sleeves',
      options: [
        { value: 'short sleeves', label: '半袖' },
        { value: 'long sleeves', label: '長袖' },
        { value: 'sleeveless', label: 'ノースリーブ' },
      ],
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
