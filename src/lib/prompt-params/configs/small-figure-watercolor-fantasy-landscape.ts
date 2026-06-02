import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'medium',
      type: 'select',
      label: '画材',
      match: 'watercolor illustration',
      options: [
        { value: 'watercolor illustration', label: '水彩' },
        { value: 'gouache illustration', label: 'ガッシュ' },
        { value: 'soft pastel illustration', label: 'ソフトパステル' },
        { value: 'ink and watercolor illustration', label: 'インク＋水彩' },
      ],
    },
    {
      id: 'composition',
      type: 'select',
      label: '構図',
      match: 'small figure in a vast magical landscape',
      options: [
        { value: 'small figure in a vast magical landscape', label: '広大な魔法風景' },
        { value: 'tiny figure on a cliff above a vast ocean landscape', label: '崖上と大海原' },
        { value: 'small figure walking through an enormous flower field', label: '巨大な花畑' },
        { value: 'small figure before a glowing fantasy castle landscape', label: '光る城の前' },
      ],
    },
    {
      id: 'palette',
      type: 'select',
      label: '色調',
      match: 'muted colors',
      options: [
        { value: 'muted colors', label: 'くすみ色' },
        { value: 'soft pastel colors', label: '淡いパステル' },
        { value: 'warm sunset colors', label: '夕焼け暖色' },
        { value: 'cool blue and lavender colors', label: '青とラベンダー' },
      ],
    },
  ],
}
