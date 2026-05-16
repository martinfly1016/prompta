import type { PromptParamsConfig } from '../types'
import { fabricColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'era',
      type: 'select',
      label: 'アニメ年代',
      hint: '主流の作画スタイルの年代感',
      match: "90's vintage anime",
      options: [
        { value: "90's vintage anime", label: '90年代ヴィンテージ' },
        { value: "80's retro anime", label: '80年代レトロ' },
        { value: '2000s digital anime', label: '2000年代デジタル' },
        { value: 'modern 2020s anime', label: '現代（2020s）' },
        { value: 'classic shonen 70s anime', label: '70年代クラシック少年漫' },
      ],
    },
    {
      id: 'subject',
      type: 'select',
      label: 'キャラ・ジャンル',
      match: 'cyberpunk woman',
      options: [
        { value: 'cyberpunk woman', label: 'サイバーパンク女性' },
        { value: 'samurai warrior woman', label: '侍・武士女性' },
        { value: 'mecha pilot woman', label: 'メカパイロット女性' },
        { value: 'school girl', label: '女子高生' },
        { value: 'magical girl', label: '魔法少女' },
        { value: 'post-apocalyptic survivor woman', label: '終末世界サバイバー' },
      ],
    },
    {
      id: 'outfit',
      type: 'color',
      label: 'ドレスの色',
      match: 'a dress',
      options: fabricColorOptions('dress', 'a dress'),
    },
  ],
}
