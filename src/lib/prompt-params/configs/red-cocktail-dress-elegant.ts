import type { PromptParamsConfig } from '../types'
import { fabricColorOptions, hairColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'dressColor',
      type: 'color',
      label: 'ドレスの色',
      match: 'red cocktail dress',
      options: fabricColorOptions('cocktail dress', 'red cocktail dress'),
    },
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'blonde',
      options: hairColorOptions('blonde'),
    },
    {
      id: 'lighting',
      type: 'select',
      label: 'ライティング',
      match: 'studio lighting',
      options: [
        { value: 'studio lighting', label: 'スタジオ' },
        { value: 'soft natural lighting', label: 'ソフト自然光' },
        { value: 'dramatic rim lighting', label: 'リムライト' },
        { value: 'golden hour lighting', label: 'ゴールデンアワー' },
        { value: 'neon ambient lighting', label: 'ネオン' },
        { value: 'candlelight', label: 'キャンドルライト' },
      ],
    },
  ],
}
