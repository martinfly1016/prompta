import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'very long blonde hair',
      options: [
        { value: 'very long blonde hair', label: 'ロングブロンド', swatch: '#e8c97a' },
        { value: 'very long black hair', label: 'ロングブラック', swatch: '#1a1a1a' },
        { value: 'very long red hair', label: 'ロングレッド', swatch: '#a0322a' },
        { value: 'very long silver hair', label: 'ロングシルバー', swatch: '#c8c8d0' },
        { value: 'very long auburn hair', label: 'ロングオーバーン', swatch: '#7a3e22' },
        { value: 'very long platinum hair', label: 'ロングプラチナ', swatch: '#f0e8d2' },
      ],
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳の色',
      match: 'blue pupils',
      options: [
        { value: 'blue pupils', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'green pupils', label: 'グリーン', swatch: '#5a8a6a' },
        { value: 'hazel pupils', label: 'ヘーゼル', swatch: '#9a7a4a' },
        { value: 'violet pupils', label: 'バイオレット', swatch: '#6e4a8e' },
        { value: 'amber pupils', label: 'アンバー', swatch: '#c89a3a' },
        { value: 'gray pupils', label: 'グレー', swatch: '#7a7a7a' },
      ],
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'with very confident face',
      options: [
        { value: 'with very confident face', label: '自信' },
        { value: 'with serene face', label: '静謐' },
        { value: 'with playful smile', label: '遊び心の微笑み' },
        { value: 'with intense focused gaze', label: '集中の眼差し' },
        { value: 'with soft gentle smile', label: '優しい微笑み' },
      ],
    },
  ],
}
