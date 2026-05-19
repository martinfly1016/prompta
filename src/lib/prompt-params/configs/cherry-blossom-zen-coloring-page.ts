import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'seasonalScene',
      type: 'select',
      label: '四季のシーン',
      match: 'cherry blossom branch arching across the canvas, five-petal sakura flowers in full bloom, several falling petals',
      options: [
        { value: 'cherry blossom branch arching across the canvas, five-petal sakura flowers in full bloom, several falling petals', label: '春・桜（デフォルト）' },
        { value: 'plum blossom branch arching across the canvas, five-petal plum flowers in full bloom, several falling petals', label: '春・梅' },
        { value: 'hydrangea cluster with full bloom hydrangea heads and lush leaves, raindrops falling', label: '梅雨・紫陽花' },
        { value: 'autumn maple branch arching across the canvas, detailed maple leaves in fall, several falling leaves', label: '秋・紅葉' },
        { value: 'chrysanthemum branch with full-petal flowers, several leaves, traditional autumn style', label: '秋・菊' },
        { value: 'pine branch with seasonal needles, traditional bonsai style, simple composition', label: '冬・松' },
      ],
    },
    {
      id: 'lineWeight',
      type: 'select',
      label: '線の太さ',
      match: 'medium-thick line weight',
      options: [
        { value: 'fine line art', label: '細い線' },
        { value: 'medium-thick line weight', label: '中太（デフォルト）' },
        { value: 'extra-thick line weight', label: '極太（簡単版）' },
      ],
    },
    {
      id: 'background',
      type: 'select',
      label: '背景',
      match: 'stylized cloud outlines in the background',
      options: [
        { value: 'stylized cloud outlines in the background', label: '祥雲（デフォルト）' },
        { value: 'simple mountain silhouette outlines in the background', label: '山の輪郭' },
        { value: 'traditional wave pattern outlines in the background', label: '波模様' },
        { value: 'no background, pure white canvas', label: '背景なし（純白）' },
      ],
    },
  ],
}
