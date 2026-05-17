import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'character',
      type: 'select',
      label: 'キャラクター',
      hint: '獣耳キャラのタイプ',
      match: 'fox ears, fox tail',
      options: [
        { value: 'fox ears, fox tail', label: '狐耳・狐尻尾' },
        { value: 'cat ears, cat tail', label: '猫耳・猫尻尾' },
        { value: 'wolf ears, wolf tail', label: '狼耳・狼尻尾' },
        { value: 'rabbit ears, fluffy tail', label: '兎耳・ふわふわ尻尾' },
        { value: 'dragon horns, dragon tail', label: 'ドラゴン角・ドラゴン尻尾' },
        { value: 'angel wings, halo', label: '天使翼・光輪' },
      ],
    },
    {
      id: 'setting',
      type: 'select',
      label: '場所',
      match: 'outside, river, bridge',
      options: [
        { value: 'outside, river, bridge', label: '川辺の橋' },
        { value: 'outside, forest clearing, mossy rocks', label: '森の開けた地' },
        { value: 'outside, mountain peak, clouds below', label: '山頂・雲海' },
        { value: 'inside, ancient library, candles', label: '古代図書館' },
        { value: 'outside, cherry blossom path, falling petals', label: '桜並木' },
        { value: 'underwater, coral reef, fish swimming', label: '海中珊瑚礁' },
      ],
    },
    {
      id: 'style',
      type: 'select',
      label: 'アートスタイル',
      match: '(impressionism:1.2)',
      options: [
        { value: '(impressionism:1.2)', label: '印象派' },
        { value: '(art nouveau:1.2)', label: 'アール・ヌーヴォー' },
        { value: '(ukiyo-e style:1.2)', label: '浮世絵' },
        { value: '(art deco:1.2)', label: 'アール・デコ' },
        { value: '(cyberpunk:1.2)', label: 'サイバーパンク' },
        { value: '(watercolor painterly:1.2)', label: '水彩画風' },
      ],
    },
  ],
}
