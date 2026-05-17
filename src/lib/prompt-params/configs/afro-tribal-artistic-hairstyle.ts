import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairstyle',
      type: 'select',
      label: '髪型',
      match: 'Afro,Arabesque,Warior',
      options: [
        { value: 'Afro,Arabesque,Warior', label: 'アフロ・アラベスク・戦士' },
        { value: 'Box Braids,Royal,Goddess', label: 'ボックスブレード・女神' },
        { value: 'Long Locs,Spiritual,Sage', label: 'ロングロックス・賢者' },
        { value: 'Shaved Head,Bold,Pioneer', label: '剃髪・パイオニア' },
        { value: 'Crown Twists,Regal,Queen', label: 'クラウンツイスト・女王' },
        { value: 'Bantu Knots,Geometric,Modern', label: 'バンツーノット・モダン' },
      ],
    },
    {
      id: 'artistRef',
      type: 'select',
      label: 'アート参照',
      match: 'baroque, Leonardo da Vinci',
      options: [
        { value: 'baroque, Leonardo da Vinci', label: 'バロック・ダ・ヴィンチ' },
        { value: 'cubist, Picasso, fragmented planes', label: 'キュビズム・ピカソ' },
        { value: 'art nouveau, Mucha, flowing lines', label: 'アール・ヌーヴォー・ミュシャ' },
        { value: 'surrealist, Magritte, dreamlike', label: 'シュルレアリスム・マグリット' },
        { value: 'expressionist, Schiele, raw emotion', label: '表現主義・シーレ' },
        { value: 'pop art, Warhol, bold colors', label: 'ポップアート・ウォーホル' },
      ],
    },
    {
      id: 'medium',
      type: 'select',
      label: '画材',
      match: 'Scratchy pen strokes',
      options: [
        { value: 'Scratchy pen strokes', label: 'ラフペンストローク' },
        { value: 'Soft pencil sketches', label: '柔らかい鉛筆' },
        { value: 'Bold ink wash', label: '墨絵' },
        { value: 'Vibrant watercolor splashes', label: '水彩飛沫' },
        { value: 'Heavy oil paint texture', label: '油彩テクスチャ' },
      ],
    },
  ],
}
