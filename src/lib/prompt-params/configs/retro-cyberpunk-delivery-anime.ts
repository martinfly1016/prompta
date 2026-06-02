import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: '90s vintage cyberpunk anime style',
      options: [
        { value: '90s vintage cyberpunk anime style', label: '90年代サイバーパンク' },
        { value: '80s retro anime cyberpunk style', label: '80年代レトロアニメ' },
        { value: 'modern neon cyberpunk anime style', label: '現代ネオンアニメ' },
        { value: 'gritty manga cyberpunk illustration style', label: '漫画調サイバーパンク' },
      ],
    },
    {
      id: 'subject',
      type: 'select',
      label: '人物',
      match: 'surreal pizza delivery punk character',
      options: [
        { value: 'surreal pizza delivery punk character', label: 'ピザ配達パンク' },
        { value: 'surreal ramen delivery biker character', label: 'ラーメン配達バイカー' },
        { value: 'surreal courier hacker character', label: '宅配ハッカー' },
        { value: 'surreal arcade street punk character', label: 'ゲーム街のパンク' },
      ],
    },
    {
      id: 'lighting',
      type: 'select',
      label: '照明',
      match: 'dramatic night lighting',
      options: [
        { value: 'dramatic night lighting', label: '夜のドラマ照明' },
        { value: 'pink and cyan neon night lighting', label: 'ピンク×シアンネオン' },
        { value: 'rainy street neon reflections', label: '雨の街ネオン反射' },
        { value: 'warm storefront light at night', label: '夜の店先の暖色光' },
      ],
    },
  ],
}
