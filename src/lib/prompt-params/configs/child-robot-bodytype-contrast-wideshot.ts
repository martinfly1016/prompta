import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'colorful lighting',
      options: [
        { value: 'colorful lighting', label: 'カラフル' },
        { value: 'soft natural sunlight', label: '柔らかい自然光' },
        { value: 'golden hour glow', label: 'ゴールデンアワー' },
        { value: 'dramatic neon lighting', label: 'ネオン（劇的）' },
        { value: 'warm afternoon glow', label: '暖かい午後光' },
        { value: 'overcast diffused light', label: '曇天の拡散光' },
        { value: 'cinematic rim lighting', label: 'シネマ風リム光' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'sci-fi atmosphere',
      options: [
        { value: 'sci-fi atmosphere', label: 'SF' },
        { value: 'cyberpunk atmosphere', label: 'サイバーパンク' },
        { value: 'post-apocalyptic atmosphere', label: 'ポストアポカリプス' },
        { value: 'nostalgic warm atmosphere', label: 'ノスタルジック' },
        { value: 'whimsical fairytale atmosphere', label: 'おとぎ話風' },
        { value: 'dreamy surreal atmosphere', label: '夢幻シュール' },
        { value: 'cozy domestic atmosphere', label: '家庭的' },
      ],
    },
  ],
}
