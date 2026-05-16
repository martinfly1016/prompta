import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'scarfColor',
      type: 'color',
      label: 'スカーフ色',
      match: 'red scarf tied around her neck',
      options: [
        { value: 'red scarf tied around her neck', label: 'レッド', swatch: '#b03030' },
        { value: 'blue scarf tied around her neck', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'yellow scarf tied around her neck', label: 'イエロー', swatch: '#e0c648' },
        { value: 'pink scarf tied around her neck', label: 'ピンク', swatch: '#e89bb4' },
        { value: 'green scarf tied around her neck', label: 'グリーン', swatch: '#5a8a6a' },
        { value: 'purple scarf tied around her neck', label: 'パープル', swatch: '#8a6aa8' },
      ],
    },
    {
      id: 'shortsColor',
      type: 'color',
      label: 'ショーツ色',
      match: 'a pair of blue shorts',
      options: [
        { value: 'a pair of blue shorts', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'a pair of red shorts', label: 'レッド', swatch: '#b03030' },
        { value: 'a pair of yellow shorts', label: 'イエロー', swatch: '#e0c648' },
        { value: 'a pair of green shorts', label: 'グリーン', swatch: '#5a8a6a' },
        { value: 'a pair of pink shorts', label: 'ピンク', swatch: '#e89bb4' },
        { value: 'a pair of black shorts', label: 'ブラック', swatch: '#1a1a1a' },
        { value: 'a pair of white shorts', label: 'ホワイト', swatch: '#f7f7f7' },
        { value: 'a pair of denim blue shorts', label: 'デニム', swatch: '#1f2a4a' },
      ],
    },
    {
      id: 'backpackColor',
      type: 'color',
      label: 'バックパック色',
      match: 'red backpack',
      options: [
        { value: 'red backpack', label: 'レッド', swatch: '#b03030' },
        { value: 'navy blue backpack', label: 'ネイビー', swatch: '#1f2a4a' },
        { value: 'mustard yellow backpack', label: 'マスタード', swatch: '#c89a3a' },
        { value: 'forest green backpack', label: 'フォレスト', swatch: '#3a5a3a' },
        { value: 'pink backpack', label: 'ピンク', swatch: '#e89bb4' },
        { value: 'gray backpack', label: 'グレー', swatch: '#7a7a7a' },
      ],
    },
  ],
}
