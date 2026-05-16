import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'uniformStyle',
      type: 'select',
      label: '制服スタイル',
      match: 'seifuku',
      options: [
        { value: 'seifuku', label: 'セーラー服' },
        { value: 'blazer school uniform', label: 'ブレザー' },
        { value: 'British school uniform with tie', label: 'ブリティッシュ' },
        { value: 'preppy academy uniform', label: 'プレッピー' },
        { value: 'gothic lolita school uniform', label: 'ゴシックロリィタ' },
        { value: 'sporty PE uniform', label: '体操服' },
      ],
    },
    {
      id: 'skirtType',
      type: 'select',
      label: 'スカート',
      match: 'pleated miniskirt',
      options: [
        { value: 'pleated miniskirt', label: 'プリーツミニ' },
        { value: 'pleated knee-length skirt', label: 'プリーツ膝丈' },
        { value: 'pleated long skirt', label: 'プリーツロング' },
        { value: 'a-line skirt', label: 'Aラインスカート' },
        { value: 'box-pleated skirt', label: 'ボックスプリーツ' },
        { value: 'tartan plaid skirt', label: 'タータンチェック' },
      ],
    },
    {
      id: 'artist',
      type: 'select',
      label: 'アーティストスタイル',
      hint: '参照する画家',
      match: 'by rembrandt 1 6 6 7',
      options: [
        { value: 'by rembrandt 1 6 6 7', label: 'レンブラント' },
        { value: 'by alphonse mucha', label: 'ミュシャ' },
        { value: 'by gustav klimt', label: 'クリムト' },
        { value: 'by hayao miyazaki', label: '宮崎駿' },
        { value: 'by makoto shinkai', label: '新海誠' },
        { value: 'by edward hopper', label: 'ホッパー' },
      ],
    },
  ],
}
