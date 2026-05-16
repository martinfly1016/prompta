import type { PromptParamsConfig } from '../types'
import { fabricColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'subject',
      type: 'select',
      label: '主題',
      match: 'a man with glasses',
      options: [
        { value: 'a man with glasses', label: '眼鏡の男性' },
        { value: 'a woman with sunglasses', label: 'サングラスの女性' },
        { value: 'a child with headphones', label: 'ヘッドフォン少年' },
        { value: 'an elderly woman smiling', label: '微笑むご老女' },
        { value: 'a cat sitting upright', label: '座る猫' },
        { value: 'a robot head', label: 'ロボット頭部' },
      ],
    },
    {
      id: 'eraStyle',
      type: 'select',
      label: 'スタイル時代',
      match: '90s mtv illustration',
      options: [
        { value: '90s mtv illustration', label: '90年代MTV' },
        { value: '80s memphis illustration', label: '80年代メンフィス' },
        { value: '70s retro psychedelic', label: '70年代サイケ' },
        { value: '2000s vector flat', label: '2000年代ベクター' },
        { value: 'modern minimalist line art', label: 'モダンミニマル' },
        { value: 'bauhaus geometric', label: 'バウハウス幾何' },
      ],
    },
    {
      id: 'background',
      type: 'color',
      label: '背景色',
      match: 'blue background',
      options: fabricColorOptions('background', 'blue background'),
    },
  ],
}
