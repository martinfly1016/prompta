import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'drink',
      type: 'select',
      label: '飲み物',
      match: 'boba tea , bubble tea',
      options: [
        { value: 'boba tea , bubble tea', label: 'ボバ・タピオカミルクティー' },
        { value: 'matcha latte with foam art', label: '抹茶ラテ・フォームアート' },
        { value: 'iced coffee with whipped cream', label: 'アイスコーヒー・ホイップ' },
        { value: 'fresh fruit smoothie', label: 'フルーツスムージー' },
        { value: 'hot cocoa with marshmallows', label: 'ココア・マシュマロ' },
        { value: 'strawberry milkshake', label: 'ストロベリーシェイク' },
      ],
    },
    {
      id: 'style',
      type: 'select',
      label: 'アートスタイル',
      hint: '参照する画家・スタジオ',
      match: 'style of Laurie Greasley',
      options: [
        { value: 'style of Laurie Greasley', label: 'Laurie Greasley（モダンアニメ）' },
        { value: 'style of Makoto Shinkai', label: '新海誠（青空・光）' },
        { value: 'style of Kyoto Animation', label: '京都アニメーション' },
        { value: 'style of WLOP', label: 'WLOP（写実×ファンタジー）' },
        { value: 'style of Sakimichan', label: 'Sakimichan（ファンタジー美人）' },
        { value: 'style of Studio Trigger', label: 'TRIGGER（ダイナミック）' },
      ],
    },
    {
      id: 'finish',
      type: 'select',
      label: '仕上げ質感',
      match: 'acrylic palette knife',
      options: [
        { value: 'acrylic palette knife', label: 'アクリル・ナイフ' },
        { value: 'cel-shaded flat anime', label: 'セル画フラット' },
        { value: 'soft watercolor wash', label: '水彩ウォッシュ' },
        { value: 'thick oil impasto', label: '厚塗り油彩' },
        { value: 'crisp digital ink', label: 'デジタルインク' },
      ],
    },
  ],
}
