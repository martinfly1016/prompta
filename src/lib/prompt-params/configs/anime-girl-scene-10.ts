import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: 'アニメスタイル',
      hint: '主に参照される作家・スタジオ',
      match: 'style of Laurie Greasley',
      options: [
        { value: 'style of Laurie Greasley', label: 'Laurie Greasley（モダンアニメ）' },
        { value: 'style of Makoto Shinkai', label: '新海誠（青空・光）' },
        { value: 'style of Hayao Miyazaki', label: '宮崎駿（ジブリ温かみ）' },
        { value: 'style of Satoshi Kon', label: '今敏（緻密・幻想）' },
        { value: 'style of Yoji Shinkawa', label: '新川洋司（モノクロ陰影）' },
        { value: 'style of WLOP', label: 'WLOP（写実×ファンタジー）' },
      ],
    },
    {
      id: 'palette',
      type: 'select',
      label: '色調',
      match: 'vibrant colors',
      options: [
        { value: 'vibrant colors', label: '鮮やか' },
        { value: 'muted colors', label: 'マット' },
        { value: 'pastel colors', label: 'パステル' },
        { value: 'monochrome', label: 'モノクロ' },
        { value: 'sepia tones', label: 'セピア' },
        { value: 'neon colors', label: 'ネオン' },
      ],
    },
    {
      id: 'finish',
      type: 'select',
      label: '仕上げ質感',
      match: 'acrylic palette knife',
      options: [
        { value: 'acrylic palette knife', label: 'アクリル・ナイフ調' },
        { value: 'oil painting brushstrokes', label: '油彩・筆跡' },
        { value: 'cel-shaded flat', label: 'セル画フラット' },
        { value: 'soft airbrush gradient', label: 'エアブラシ・グラデ' },
        { value: 'ink wash watercolor', label: '水墨水彩' },
      ],
    },
  ],
}
