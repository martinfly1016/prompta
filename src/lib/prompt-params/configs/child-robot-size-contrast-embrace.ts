import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'pose',
      type: 'select',
      label: 'ポーズ',
      match: 'hugging each other',
      options: [
        { value: 'hugging each other', label: 'ハグ' },
        { value: 'high-fiving', label: 'ハイファイブ' },
        { value: 'sitting back-to-back', label: '背中合わせで座る' },
        { value: 'walking hand in hand', label: '手を繋いで歩く' },
        { value: 'looking up at the sky together', label: '空を見上げる' },
        { value: 'playing chess', label: 'チェスをする' },
      ],
    },
    {
      id: 'weather',
      type: 'select',
      label: '天候・時間',
      match: 'sunny day',
      options: [
        { value: 'sunny day', label: '晴れた日' },
        { value: 'rainy afternoon', label: '雨の午後' },
        { value: 'stormy night', label: '嵐の夜' },
        { value: 'golden hour sunset', label: 'ゴールデンアワー' },
        { value: 'snowy winter morning', label: '雪の朝' },
        { value: 'starry night', label: '星空の夜' },
      ],
    },
    {
      id: 'artist',
      type: 'select',
      label: 'アーティスト風',
      match: 'by Mattias Adolfsson',
      options: [
        { value: 'by Mattias Adolfsson', label: 'Mattias Adolfsson（細密ファンタジー）' },
        { value: 'in the style of Studio Ghibli', label: 'スタジオジブリ風' },
        { value: 'in the style of Pixar animation', label: 'Pixar 風' },
        { value: 'in the style of Moebius', label: 'メビウス風' },
        { value: 'in the style of Hayao Miyazaki', label: '宮崎駿風' },
      ],
    },
  ],
}
