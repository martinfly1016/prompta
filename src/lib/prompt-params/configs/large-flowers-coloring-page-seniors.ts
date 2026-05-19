import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'flowerSet',
      type: 'select',
      label: '花の組合せ',
      match: 'a sunflower (left), a tulip (center), a daisy (right)',
      options: [
        { value: 'a sunflower (left), a tulip (center), a daisy (right)', label: '向日葵・チューリップ・雛菊（デフォルト）' },
        { value: 'a peony (left), a chrysanthemum (center), a rose (right)', label: '牡丹・菊・薔薇' },
        { value: 'a cherry blossom (left), a plum blossom (center), an iris (right)', label: '桜・梅・あやめ' },
        { value: 'a lily (left), a carnation (center), a gerbera (right)', label: 'ユリ・カーネーション・ガーベラ' },
        { value: 'a hydrangea (left), a morning glory (center), a sunflower (right)', label: '紫陽花・朝顔・向日葵' },
        { value: 'a hibiscus (left), an orchid (center), a frangipani (right)', label: 'ハイビスカス・蘭・プルメリア' },
      ],
    },
    {
      id: 'season',
      type: 'select',
      label: '季節',
      match: 'EXTRA-thick consistent line weight',
      options: [
        { value: 'EXTRA-thick consistent line weight', label: '極太線（デフォルト）' },
        { value: 'very thick line weight with small seasonal symbols (cherry petals)', label: '春・桜の花びら追加' },
        { value: 'very thick line weight with small seasonal symbols (fireflies)', label: '夏・蛍追加' },
        { value: 'very thick line weight with small seasonal symbols (maple leaves)', label: '秋・紅葉追加' },
        { value: 'very thick line weight with small seasonal symbols (snowflakes)', label: '冬・雪の結晶追加' },
      ],
    },
    {
      id: 'arrangement',
      type: 'select',
      label: '配置',
      match: 'arranged side by side',
      options: [
        { value: 'arranged side by side', label: '横並び（デフォルト）' },
        { value: 'arranged in a triangle composition', label: '三角構図' },
        { value: 'arranged in a vase together', label: '花瓶に活ける' },
        { value: 'arranged in a circle bouquet', label: '円形ブーケ' },
      ],
    },
  ],
}
