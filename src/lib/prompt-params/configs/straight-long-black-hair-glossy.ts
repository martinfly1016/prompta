import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      hint: '髪の色を選んでプロンプトに反映',
      match: 'black hair',
      options: [
        { value: 'black hair', label: '黒髪', swatch: '#1a1a1a' },
        { value: 'dark brown hair', label: 'ダークブラウン', swatch: '#3b2417' },
        { value: 'brown hair', label: 'ブラウン', swatch: '#6b4423' },
        { value: 'blonde hair', label: 'ブロンド', swatch: '#e8c97a' },
        { value: 'platinum blonde hair', label: 'プラチナブロンド', swatch: '#f0e8d2' },
        { value: 'silver hair', label: 'シルバー', swatch: '#c8c8d0' },
        { value: 'white hair', label: 'ホワイト', swatch: '#f7f7f7' },
        { value: 'red hair', label: 'レッド', swatch: '#a0322a' },
        { value: 'pink hair', label: 'ピンク', swatch: '#e89bb4' },
        { value: 'blue hair', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'purple hair', label: 'パープル', swatch: '#8a6aa8' },
        { value: 'green hair', label: 'グリーン', swatch: '#5a8a6a' },
      ],
    },
    {
      id: 'hairLength',
      type: 'select',
      label: '髪の長さ',
      match: 'long hair',
      options: [
        { value: 'short hair', label: 'ショート' },
        { value: 'medium hair', label: 'ミディアム' },
        { value: 'long hair', label: 'ロング' },
        { value: 'very long hair', label: 'スーパーロング' },
      ],
    },
    {
      id: 'hairStyle',
      type: 'select',
      label: '髪型',
      match: 'straight hair',
      options: [
        { value: 'straight hair', label: 'ストレート' },
        { value: 'wavy hair', label: 'ウェーブ' },
        { value: 'curly hair', label: 'カール' },
        { value: 'braided hair', label: '三つ編み' },
        { value: 'ponytail', label: 'ポニーテール' },
        { value: 'twintails', label: 'ツインテール' },
      ],
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'smile',
      options: [
        { value: 'smile', label: '微笑み' },
        { value: 'gentle smile', label: '優しい微笑み' },
        { value: 'serious face', label: '真顔' },
        { value: 'laughing', label: '笑顔' },
        { value: 'pout', label: 'ふくれっ面' },
        { value: 'shy expression', label: '恥ずかしそう' },
      ],
    },
  ],
}
