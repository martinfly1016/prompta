import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'animal',
      type: 'select',
      label: '動物',
      match: '(white cat:1.1)',
      options: [
        { value: '(white cat:1.1)', label: '白猫' },
        { value: '(black cat:1.1)', label: '黒猫' },
        { value: '(orange tabby cat:1.1)', label: 'オレンジ猫' },
        { value: '(siamese cat:1.1)', label: 'シャム猫' },
        { value: '(shiba inu puppy:1.1)', label: '柴犬子犬' },
        { value: '(red fox:1.1)', label: 'キツネ' },
        { value: '(rabbit with floppy ears:1.1)', label: 'ロップイヤーうさぎ' },
      ],
    },
    {
      id: 'scene',
      type: 'select',
      label: 'シーン',
      match: 'reading nook, bean bag',
      options: [
        { value: 'reading nook, bean bag', label: '読書コーナー・ビーズクッション' },
        { value: 'window seat, soft cushion', label: '窓辺・柔らかいクッション' },
        { value: 'kitchen counter, sunlight', label: '台所カウンター・陽光' },
        { value: 'garden bench, flowers around', label: '庭ベンチ・花咲く' },
        { value: 'fireplace rug, warm glow', label: '暖炉ラグ・暖光' },
        { value: 'desk near laptop, papers scattered', label: 'デスク・ノートPC' },
      ],
    },
    {
      id: 'weather',
      type: 'select',
      label: '天候',
      match: 'rain outside',
      options: [
        { value: 'rain outside', label: '外は雨' },
        { value: 'snow outside', label: '外は雪' },
        { value: 'autumn leaves outside', label: '外は紅葉' },
        { value: 'sunset golden hour outside', label: '夕焼け' },
        { value: 'starry night outside', label: '星空' },
        { value: 'cherry blossoms outside', label: '外は桜' },
      ],
    },
  ],
}
