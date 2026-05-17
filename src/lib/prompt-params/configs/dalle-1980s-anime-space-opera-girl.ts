import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'era',
      type: 'select',
      label: 'アニメ年代',
      match: 'from the 80s',
      options: [
        { value: 'from the 80s', label: '80年代' },
        { value: 'from the 70s', label: '70年代' },
        { value: 'from the 90s', label: '90年代' },
        { value: 'from the 2000s', label: '2000年代' },
        { value: 'modern 2020s', label: '現代' },
      ],
    },
    {
      id: 'outfit',
      type: 'select',
      label: '服装・装備',
      match: 'in a space suit',
      options: [
        { value: 'in a space suit', label: '宇宙服' },
        { value: 'in a samurai armor', label: '侍鎧' },
        { value: 'in a flight pilot jacket', label: 'パイロットジャケット' },
        { value: 'in a flowing celestial robe', label: '天上のローブ' },
        { value: 'in a mecha cockpit suit', label: 'メカパイロットスーツ' },
        { value: 'in a futurist battlesuit', label: '未来戦闘服' },
      ],
    },
    {
      id: 'medium',
      type: 'select',
      label: 'メディウム',
      match: 'watercolor blending on chrome steel',
      options: [
        { value: 'watercolor blending on chrome steel', label: '水彩×クロームスチール' },
        { value: 'oil painting on canvas', label: '油彩・キャンバス' },
        { value: 'digital ink illustration', label: 'デジタルインク' },
        { value: 'pencil sketch with halftone shading', label: '鉛筆＋ハーフトーン' },
        { value: 'cel animation flat shading', label: 'セル画フラット' },
      ],
    },
  ],
}
