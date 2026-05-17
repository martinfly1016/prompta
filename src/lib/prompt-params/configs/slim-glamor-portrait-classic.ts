import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'skinTone',
      type: 'select',
      label: '肌のトーン',
      match: 'pale skin',
      options: [
        { value: 'pale skin', label: '青白い肌' },
        { value: 'fair skin', label: '色白' },
        { value: 'olive skin', label: 'オリーブ肌' },
        { value: 'tan skin', label: '小麦色' },
        { value: 'dark skin', label: 'ダーク' },
      ],
    },
    {
      id: 'build',
      type: 'select',
      label: '体型',
      match: 'thin muscular midriff',
      options: [
        { value: 'thin muscular midriff', label: '細身・引き締まった腹部' },
        { value: 'athletic toned figure', label: 'アスリート体型' },
        { value: 'curvy hourglass figure', label: '砂時計型' },
        { value: 'slender willowy figure', label: 'スレンダー' },
        { value: 'soft elegant figure', label: 'ソフトエレガント' },
      ],
    },
    {
      id: 'pose',
      type: 'select',
      label: 'ポーズ',
      match: 'side glamor pose',
      options: [
        { value: 'side glamor pose', label: 'サイドグラマーポーズ' },
        { value: 'three-quarter facing pose', label: 'スリークォーター' },
        { value: 'frontal confident stance', label: '正面・自信スタンス' },
        { value: 'seated relaxed pose', label: '座位リラックス' },
        { value: 'dynamic walking pose', label: '歩行ダイナミック' },
        { value: 'back-turned over shoulder glance', label: '後ろ姿・肩越し' },
      ],
    },
  ],
}
