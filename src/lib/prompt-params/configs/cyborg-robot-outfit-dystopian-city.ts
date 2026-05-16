import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairLength',
      type: 'select',
      label: '髪の長さ',
      match: 'long straight hair',
      options: [
        { value: 'long straight hair', label: 'ロングストレート' },
        { value: 'short bob hair', label: 'ショートボブ' },
        { value: 'twin braids', label: 'ツインブレード' },
        { value: 'wavy medium hair', label: 'ミディアムウェーブ' },
        { value: 'undercut with long top hair', label: 'アンダーカット' },
        { value: 'platinum blonde twintails', label: 'プラチナツインテール' },
      ],
    },
    {
      id: 'setting',
      type: 'select',
      label: '舞台都市',
      hint: '夜景＋雨の未来都市',
      match: 'dystopic futurist Hong Kong streets',
      options: [
        { value: 'dystopic futurist Hong Kong streets', label: '香港' },
        { value: 'dystopic futurist Tokyo streets', label: '東京' },
        { value: 'dystopic futurist Shanghai streets', label: '上海' },
        { value: 'dystopic futurist Seoul streets', label: 'ソウル' },
        { value: 'dystopic futurist Bangkok streets', label: 'バンコク' },
        { value: 'abandoned futurist neon alley', label: 'ネオン裏路地' },
      ],
    },
    {
      id: 'outfit',
      type: 'select',
      label: 'サイボーグ衣装',
      match: 'robotic outfit',
      options: [
        { value: 'robotic outfit', label: 'ロボットアウター' },
        { value: 'chrome bodysuit', label: 'クロームボディスーツ' },
        { value: 'tactical neon armor', label: 'タクティカルネオン装甲' },
        { value: 'sleek black exoskeleton', label: 'エクソスケルトン' },
        { value: 'iridescent holographic jacket', label: 'ホログラフィックジャケット' },
      ],
    },
  ],
}
