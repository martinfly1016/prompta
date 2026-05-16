import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'ethnicity',
      type: 'select',
      label: '人物の出自',
      hint: 'モデルのバックグラウンド設定',
      match: 'half-american, half-korean',
      options: [
        { value: 'half-american, half-korean', label: '日米/韓ハーフ' },
        { value: 'East Asian Japanese', label: '日本人' },
        { value: 'half-Italian, half-Indian', label: 'イタリア/インドハーフ' },
        { value: 'African', label: 'アフリカ系' },
        { value: 'Brazilian', label: 'ブラジル系' },
        { value: 'Northern European', label: '北欧系' },
        { value: 'Middle Eastern', label: '中東系' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'ominous',
      options: [
        { value: 'ominous', label: '不穏' },
        { value: 'ethereal and dreamy', label: '幻想的' },
        { value: 'serene and tranquil', label: '静謐' },
        { value: 'mysterious and intriguing', label: '神秘' },
        { value: 'romantic and soft', label: 'ロマンティック' },
        { value: 'powerful and regal', label: '威厳' },
      ],
    },
    {
      id: 'style',
      type: 'select',
      label: 'アートスタイル',
      match: 'concept art',
      options: [
        { value: 'concept art', label: 'コンセプトアート' },
        { value: 'editorial fashion photography', label: 'エディトリアル写真' },
        { value: 'oil painting', label: '油絵' },
        { value: 'digital matte painting', label: 'マットペイント' },
        { value: 'high-fashion runway photo', label: 'ランウェイ' },
      ],
    },
  ],
}
