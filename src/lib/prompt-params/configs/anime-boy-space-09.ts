import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'pink hair heart',
      options: [
        { value: 'pink hair heart', label: 'ピンク', swatch: '#e89bb4' },
        { value: 'blue hair heart', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'silver hair heart', label: 'シルバー', swatch: '#c8c8d0' },
        { value: 'gold hair heart', label: 'ゴールド', swatch: '#d4a64a' },
        { value: 'red hair heart', label: 'レッド', swatch: '#a0322a' },
        { value: 'rainbow hair heart', label: 'レインボー', swatch: '#e89bb4' },
      ],
    },
    {
      id: 'palette',
      type: 'select',
      label: '色調',
      match: 'muted colors',
      options: [
        { value: 'muted colors', label: 'マット' },
        { value: 'vibrant colors', label: '鮮やか' },
        { value: 'pastel colors', label: 'パステル' },
        { value: 'monochrome', label: 'モノクロ' },
        { value: 'dreamy soft colors', label: 'ドリーミーソフト' },
      ],
    },
  ],
}
