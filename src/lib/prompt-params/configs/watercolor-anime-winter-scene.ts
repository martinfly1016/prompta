import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'animal',
      type: 'select',
      label: '動物',
      match: 'Siamese cat',
      options: [
        { value: 'Siamese cat', label: 'シャム猫' },
        { value: 'Shiba Inu dog', label: '柴犬' },
        { value: 'red fox', label: 'キツネ' },
        { value: 'snowy owl', label: 'シロフクロウ' },
        { value: 'arctic hare', label: 'ホッキョクウサギ' },
        { value: 'red panda', label: 'レッサーパンダ' },
      ],
    },
    {
      id: 'scene',
      type: 'select',
      label: 'シーン',
      match: 'winter trail walk, snow crunching',
      options: [
        { value: 'winter trail walk, snow crunching', label: '冬の散歩道' },
        { value: 'cozy cabin window view', label: 'ログハウス窓辺' },
        { value: 'autumn forest path', label: '秋の森' },
        { value: 'spring sakura path', label: '桜並木' },
        { value: 'summer lakeside', label: '湖畔の夏' },
        { value: 'moonlit garden', label: '月夜の庭' },
      ],
    },
    {
      id: 'accessory',
      type: 'select',
      label: '小物',
      match: 'wool beanie, scarf',
      options: [
        { value: 'wool beanie, scarf', label: 'ニット帽＋スカーフ' },
        { value: 'leather harness, jingle bell', label: 'ハーネス＋鈴' },
        { value: 'red ribbon collar', label: '赤リボン首輪' },
        { value: 'cozy sweater', label: 'セーター' },
        { value: 'tiny umbrella', label: '小さな傘' },
      ],
    },
  ],
}
