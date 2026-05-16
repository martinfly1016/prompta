import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'angle',
      type: 'select',
      label: 'カメラアングル',
      match: "bird's eye view",
      options: [
        { value: "bird's eye view", label: '俯瞰' },
        { value: 'low angle ground view', label: 'ローアングル' },
        { value: 'street-level wide angle', label: 'ストリートレベル' },
        { value: 'isometric perspective', label: 'アイソメトリック' },
        { value: 'drone tracking shot', label: 'ドローントラッキング' },
        { value: 'rooftop vista', label: '屋上ビスタ' },
      ],
    },
    {
      id: 'colorPalette',
      type: 'select',
      label: 'ネオン配色',
      match: 'neon hues',
      options: [
        { value: 'neon hues', label: 'ネオン全色' },
        { value: 'cyan and magenta neon', label: 'シアン＋マゼンタ' },
        { value: 'orange and teal neon', label: 'オレンジ＋ティール' },
        { value: 'purple and pink neon', label: 'パープル＋ピンク' },
        { value: 'green and blue neon', label: 'グリーン＋ブルー' },
        { value: 'warm amber neon', label: 'アンバー' },
      ],
    },
    {
      id: 'timeOfDay',
      type: 'select',
      label: '時間帯',
      match: 'the night',
      options: [
        { value: 'the night', label: '夜' },
        { value: 'twilight', label: '夕暮れ' },
        { value: 'rainy dawn', label: '雨の夜明け' },
        { value: 'pre-dawn fog', label: '夜明け前の霧' },
        { value: 'cyberpunk midnight', label: 'サイバーパンク深夜' },
      ],
    },
  ],
}
