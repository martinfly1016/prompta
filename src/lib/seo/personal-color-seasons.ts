/**
 * Personal color 4-season subpages content.
 *
 * Each season has its own URL (/tools/personal-color-analysis/[season])
 * targeting 「パーソナルカラー 春/夏/秋/冬」keywords (each KD 16-18,
 * monthly volume 600-900). 4 independent URLs share the same layout but
 * differ in palette / characteristics / makeup / hair color guidance.
 *
 * Content is **educational** (learn-about-your-season) with a CTA back
 * to the diagnosis tool (/tools/personal-color-analysis).
 */

export type SeasonSlug = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonColor {
  hex: string
  nameJa: string
  nameEn: string
}

export interface SeasonContent {
  slug: SeasonSlug
  nameJa: string
  nameJaShort: string // 春/夏/秋/冬
  nameEn: string
  /** Hero subtitle */
  tagline: string
  /** Undertone classification */
  undertone: 'warm' | 'cool'
  /** Brightness (bright = light, dark = deep) */
  brightness: 'bright' | 'soft' | 'rich' | 'sharp'
  /** Long-form description */
  intro: string
  /** Person characteristics — skin / eye / hair tendencies */
  features: {
    skin: string
    eye: string
    hair: string
    overall: string
  }
  /** Best 12 colors */
  bestColors: SeasonColor[]
  /** Avoid colors */
  avoidColors: SeasonColor[]
  /** Makeup recommendations */
  makeup: {
    lip: string
    cheek: string
    eye: string
  }
  /** Hair color recommendations */
  hairColors: string[]
  /** Clothing & accessory guidance */
  styleNotes: string[]
  /** Season-specific FAQ entries (in addition to shared ones) */
  faq: Array<{ q: string; a: string }>
  /** Hex for accent / theme color */
  themeHex: string
  /** Theme accent gradient (Tailwind class fragment) */
  themeGradient: string
}

const SPRING: SeasonContent = {
  slug: 'spring',
  nameJa: 'スプリング（春）',
  nameJaShort: '春',
  nameEn: 'Spring',
  tagline: '黄み × 明るい × フレッシュ — 若々しい光感のあるタイプ',
  undertone: 'warm',
  brightness: 'bright',
  intro:
    'スプリング（春）タイプは、黄みを帯びた明るい肌・瞳・髪に、クリアで鮮やかな色が映えるパーソナルカラーです。コーラルやピーチ、若草グリーンのように「光を含んだ温かい色」が肌の透明感を引き出し、健康的でフレッシュな印象を強めます。芸能人では新垣結衣さん、佐々木希さんのような「ナチュラル可愛い系」がスプリングの代表格です。',
  features: {
    skin: '黄み寄りで明るく、ツヤ感がある。日焼けすると小麦色になりやすい。',
    eye: '明るめのブラウン〜ライトブラウン。白目と黒目の境界がはっきりしている。',
    hair: '生まれつきの髪が明るめのブラウンや赤みのあるダークブラウン。柔らかい質感。',
    overall: '全体的に「クリア」「明るい」「黄み」の 3 要素が揃う。',
  },
  bestColors: [
    { hex: '#FF8C66', nameJa: 'コーラルレッド', nameEn: 'Coral Red' },
    { hex: '#FFB088', nameJa: 'ピーチ', nameEn: 'Peach' },
    { hex: '#FFD24A', nameJa: 'サンフラワー', nameEn: 'Sunflower Yellow' },
    { hex: '#A8D854', nameJa: '若草グリーン', nameEn: 'Lime Green' },
    { hex: '#64C8E0', nameJa: 'ターコイズ', nameEn: 'Turquoise' },
    { hex: '#FFA0B8', nameJa: 'サーモンピンク', nameEn: 'Salmon Pink' },
    { hex: '#E89B70', nameJa: 'アプリコット', nameEn: 'Apricot' },
    { hex: '#F0E0AA', nameJa: 'クリーム', nameEn: 'Cream' },
    { hex: '#88C8B0', nameJa: 'ミントグリーン', nameEn: 'Mint Green' },
    { hex: '#D4A064', nameJa: 'キャメル', nameEn: 'Camel' },
    { hex: '#FFC080', nameJa: 'ライトオレンジ', nameEn: 'Light Orange' },
    { hex: '#E8D080', nameJa: 'ゴールド', nameEn: 'Gold' },
  ],
  avoidColors: [
    { hex: '#2A2A2A', nameJa: '真っ黒', nameEn: 'Pure Black' },
    { hex: '#7A7A7A', nameJa: 'グレー', nameEn: 'Gray' },
    { hex: '#5A1A2A', nameJa: 'ボルドー', nameEn: 'Burgundy' },
    { hex: '#1A2A4A', nameJa: 'ダークネイビー', nameEn: 'Dark Navy' },
  ],
  makeup: {
    lip: 'コーラル系・サーモンピンク・ライトオレンジ。マットよりツヤ感のある質感が◎',
    cheek: 'ピーチ・コーラル系で、頬骨高めに丸く入れる',
    eye: 'ベージュ・ゴールド・若草グリーン。アイラインはブラックよりブラウンが似合う',
  },
  hairColors: [
    'ライトブラウン（柔らかい印象）',
    'ハニーゴールド（明るい印象）',
    'ストロベリーブロンド（個性派）',
    'キャラメルブラウン（万能）',
  ],
  styleNotes: [
    '柔らかい質感の素材（コットン、リネン、シフォン）が似合う',
    'アクセサリーはゴールド系がベスト。プラチナや真っ白なシルバーは肌を白茶けて見せる',
    '柄物はチェック・小花柄など「可愛い系」が得意',
    '春・夏物に最適。秋冬は明るめの色を意識的に取り入れる',
  ],
  faq: [
    {
      q: 'スプリング（春）タイプの芸能人は誰ですか？',
      a: '新垣結衣さん、佐々木希さん、有村架純さんなど「ナチュラル系で透明感のある可愛らしい印象」の方が代表的なスプリングタイプです。明るいブラウンの瞳、黄み寄りの肌、ツヤのある柔らかい髪が共通の特徴です。',
    },
    {
      q: 'スプリングに似合うリップの色は？',
      a: 'コーラルピンク、サーモンオレンジ、ピーチが鉄板。色みのある明るめリップが顔色を一気に華やかにします。「真っ赤」より「コーラル寄りの赤」のほうが浮かずに馴染みます。ブラウンリップは選ぶ場合「黄み寄り（オレンジブラウン）」を選ぶと◎。',
    },
    {
      q: 'スプリングが避けるべき色は？',
      a: '真っ黒・グレー・くすんだピンク（モーブピンク）・ボルドーなどの「青み × 暗い × くすんだ」色は顔色を悪く見せます。どうしても黒を着たい場合は、顔まわりにコーラル系のスカーフやアクセサリーを足すと違和感が和らぎます。',
    },
  ],
  themeHex: '#FF8C66',
  themeGradient: 'from-orange-50 via-amber-50 to-pink-50',
}

const SUMMER: SeasonContent = {
  slug: 'summer',
  nameJa: 'サマー（夏）',
  nameJaShort: '夏',
  nameEn: 'Summer',
  tagline: '青み × 明るい × ソフト — エレガントで涼しげなタイプ',
  undertone: 'cool',
  brightness: 'soft',
  intro:
    'サマー（夏）タイプは、青みを帯びた明るくソフトな肌・瞳・髪に、スモーキーで上品な色が映えるパーソナルカラーです。ローズピンクやラベンダー、グレージュのように「水彩画のような淡くくすみのある色」が肌の透明感を引き出し、知的でエレガントな印象を強めます。芸能人では石原さとみさん、長澤まさみさんのような「上品で涼しげな美人」がサマーの代表格です。',
  features: {
    skin: '青み寄りで明るく、透明感がある。日焼けすると赤くなって戻りやすい。',
    eye: 'ソフトなブラウン、グレー、ローズ系。白目と黒目の境界がやや穏やか。',
    hair: '生まれつきの髪が黒すぎず、ダークブラウンやアッシュ系の落ち着いた色味。',
    overall: '全体的に「ソフト」「青み」「くすみ」の 3 要素が揃う。',
  },
  bestColors: [
    { hex: '#E8A8B8', nameJa: 'ローズピンク', nameEn: 'Rose Pink' },
    { hex: '#C4A8D8', nameJa: 'ラベンダー', nameEn: 'Lavender' },
    { hex: '#A8C8D8', nameJa: 'パウダーブルー', nameEn: 'Powder Blue' },
    { hex: '#B0C8B0', nameJa: 'ミントグレージュ', nameEn: 'Mint Greige' },
    { hex: '#D8B8A8', nameJa: 'ローズベージュ', nameEn: 'Rose Beige' },
    { hex: '#7090B8', nameJa: 'スカイブルー', nameEn: 'Sky Blue' },
    { hex: '#B0A8C8', nameJa: 'モーブ', nameEn: 'Mauve' },
    { hex: '#D0E8E8', nameJa: 'アイスブルー', nameEn: 'Ice Blue' },
    { hex: '#9888A8', nameJa: 'スモーキーパープル', nameEn: 'Smoky Purple' },
    { hex: '#E8D8D8', nameJa: 'ペールローズ', nameEn: 'Pale Rose' },
    { hex: '#B8C8E0', nameJa: 'ベビーブルー', nameEn: 'Baby Blue' },
    { hex: '#787888', nameJa: 'ピューターグレー', nameEn: 'Pewter Gray' },
  ],
  avoidColors: [
    { hex: '#FF8800', nameJa: 'ビビッドオレンジ', nameEn: 'Vivid Orange' },
    { hex: '#D4A634', nameJa: 'マスタードゴールド', nameEn: 'Mustard Gold' },
    { hex: '#B85C3D', nameJa: 'テラコッタ', nameEn: 'Terracotta' },
    { hex: '#5A4A2A', nameJa: 'カーキブラウン', nameEn: 'Khaki Brown' },
  ],
  makeup: {
    lip: 'ローズピンク・モーブ・くすみピンクが鉄板。マット質感かほのかなツヤ感が◎',
    cheek: 'ローズ系・ピーチピンクで、頬骨に沿って斜めに入れる',
    eye: 'ラベンダー・グレージュ・スモーキーパープル。アイラインはブラックよりグレー系が似合う',
  },
  hairColors: [
    'アッシュブラウン（涼しげな印象）',
    'ココアブラウン（柔らかい印象）',
    'ラベンダーアッシュ（個性派）',
    'グレージュ（万能・透明感）',
  ],
  styleNotes: [
    'シルク、サテン、レースなど「上品で滑らかな素材」が似合う',
    'アクセサリーはシルバー・プラチナ系がベスト。ゴールドは黄ばんで見えやすい',
    '柄物はピンストライプ・水彩柄など「繊細な柄」が得意',
    'パステルカラーが映える。鮮やかすぎる色は浮きやすい',
  ],
  faq: [
    {
      q: 'サマー（夏）タイプの芸能人は誰ですか？',
      a: '石原さとみさん、長澤まさみさん、綾瀬はるかさんなど「上品で涼しげな美人」がサマータイプの代表例です。青みの肌、透明感のある瞳、ソフトな印象が共通の特徴です。',
    },
    {
      q: 'サマーが日本人で一番多いと聞きました。本当ですか？',
      a: 'はい、日本人の約 40-50% がサマーまたはサマー寄りに分類されると言われています（パーソナルカラー診断機関のデータ）。明るくソフトで青み寄りの肌色は日本人女性に多いタイプです。',
    },
    {
      q: 'サマーがオレンジリップを使うとどうなる？',
      a: '顔色が黄ばんで見えたり、唇だけが浮いてしまう失敗が起きやすいです。どうしてもオレンジを使いたい場合は「ピンクオレンジ」「コーラルオレンジ」のように青みを少し含んだ色を選ぶと馴染みます。',
    },
  ],
  themeHex: '#A8C8D8',
  themeGradient: 'from-blue-50 via-sky-50 to-purple-50',
}

const AUTUMN: SeasonContent = {
  slug: 'autumn',
  nameJa: 'オータム（秋）',
  nameJaShort: '秋',
  nameEn: 'Autumn',
  tagline: '黄み × 暗い × リッチ — 大人っぽくシックなタイプ',
  undertone: 'warm',
  brightness: 'rich',
  intro:
    'オータム（秋）タイプは、黄みを帯びた深く落ち着いた肌・瞳・髪に、こっくりしたアースカラーが映えるパーソナルカラーです。テラコッタ、マスタード、オリーブ、モカブラウンのように「土・自然・紅葉」を思わせる豊かな色が肌のツヤとリッチさを引き出します。芸能人では杏さん、ヨンアさん、栗山千明さんのような「大人で華のあるエキゾチック美人」がオータムの代表格です。',
  features: {
    skin: '黄みを強く含んだイエローオークル系。マットでツヤより落ち着いた質感。',
    eye: 'ダークブラウン、こげ茶。深く吸い込まれるような印象。',
    hair: '黒髪よりこげ茶や赤褐色。光が当たると赤みが映える。',
    overall: '全体的に「ディープ」「黄み」「マット」の 3 要素が揃う。',
  },
  bestColors: [
    { hex: '#B85C3D', nameJa: 'テラコッタ', nameEn: 'Terracotta' },
    { hex: '#C89A3A', nameJa: 'マスタード', nameEn: 'Mustard' },
    { hex: '#7A8A4A', nameJa: 'オリーブ', nameEn: 'Olive' },
    { hex: '#5A4A2A', nameJa: 'モカブラウン', nameEn: 'Mocha Brown' },
    { hex: '#A04830', nameJa: 'パンプキン', nameEn: 'Pumpkin' },
    { hex: '#3A5A3A', nameJa: 'フォレストグリーン', nameEn: 'Forest Green' },
    { hex: '#8A4A22', nameJa: 'コニャック', nameEn: 'Cognac' },
    { hex: '#D4A064', nameJa: 'キャメル', nameEn: 'Camel' },
    { hex: '#7A3E22', nameJa: 'オーバーン', nameEn: 'Auburn' },
    { hex: '#5C4232', nameJa: 'ナチュラルブラウン', nameEn: 'Natural Brown' },
    { hex: '#A89373', nameJa: 'シアーベージュ', nameEn: 'Sheer Beige' },
    { hex: '#6A4A2A', nameJa: 'チェスナット', nameEn: 'Chestnut' },
  ],
  avoidColors: [
    { hex: '#FFC8D8', nameJa: 'ベビーピンク', nameEn: 'Baby Pink' },
    { hex: '#D8E8E8', nameJa: 'ペールブルー', nameEn: 'Pale Blue' },
    { hex: '#FFFFFF', nameJa: 'ピュアホワイト', nameEn: 'Pure White' },
    { hex: '#FF66CC', nameJa: 'フューシャピンク', nameEn: 'Fuchsia Pink' },
  ],
  makeup: {
    lip: 'テラコッタ・モカブラウン・オレンジブラウンが鉄板。マット質感が肌のリッチさを引き立てる',
    cheek: 'オレンジ系・テラコッタで、頬骨高めに横長に入れる',
    eye: 'ブラウン・カーキ・ゴールド・テラコッタ。アイラインはブラウンが似合う',
  },
  hairColors: [
    'チョコレートブラウン（基本）',
    'ハニーカラメル（華やかさ）',
    'テラコッタブラウン（個性派）',
    'ダークオーバーン（赤み）',
  ],
  styleNotes: [
    'ウール、スエード、コーデュロイなど「マットで温かみのある素材」が似合う',
    'アクセサリーはアンティークゴールド・ブロンズ系がベスト。輝きすぎる金属はNG',
    '柄物はペイズリー・カモフラ・ボタニカルなど「自然モチーフ」が得意',
    'モカブラウンやオリーブなど「秋色」をベースにコーディネートを組むと失敗しない',
  ],
  faq: [
    {
      q: 'オータム（秋）タイプの芸能人は誰ですか？',
      a: '杏さん、ヨンアさん、栗山千明さん、北川景子さんなど「大人で華のあるエキゾチック系」がオータムの代表例です。黄みのある落ち着いた肌、深いブラウンの瞳、こげ茶の髪が共通の特徴です。',
    },
    {
      q: 'オータムなのに赤を着るのが苦手です。どんな赤なら似合う？',
      a: '「真っ赤」より「テラコッタ寄りの赤」「ブリックレッド（レンガ色）」を選んでください。青みのない、土の温もりのある赤がオータムの肌を一番美しく見せます。バーガンディは少し青みが入るので、肌から少し離れた部分（バッグや靴）に使うのがおすすめ。',
    },
    {
      q: 'オータムが避けるべき色は？',
      a: 'ベビーピンク・ペールブルー・ピュアホワイト・蛍光色・フューシャピンクなど「青み × 明るい × 鮮やか」な色は顔色を悪く見せる傾向があります。代わりに「アイボリー」「ベージュ」「テラコッタ」を選ぶと肌が美しく見えます。',
    },
  ],
  themeHex: '#B85C3D',
  themeGradient: 'from-amber-50 via-orange-50 to-yellow-50',
}

const WINTER: SeasonContent = {
  slug: 'winter',
  nameJa: 'ウィンター（冬）',
  nameJaShort: '冬',
  nameEn: 'Winter',
  tagline: '青み × 暗い × シャープ — クールで華やかなタイプ',
  undertone: 'cool',
  brightness: 'sharp',
  intro:
    'ウィンター（冬）タイプは、青みを帯びた深くコントラストの強い肌・瞳・髪に、ビビッドで鮮やかな色が映えるパーソナルカラーです。真っ赤、ロイヤルブルー、エメラルドグリーン、フューシャピンクのような「クリアで強い色」、そして真っ黒や純白のモノトーンが肌のクールさとシャープさを最大限に引き出します。芸能人では小松菜奈さん、菜々緒さん、桐谷美玲さんのような「シャープで華のあるクール美人」がウィンターの代表格です。',
  features: {
    skin: '青み寄りで透明感があり、白さが際立つ。日焼けしても赤くなりにくく、地黒寄りの方も多い。',
    eye: '真っ黒〜ダークブラウン。白目と黒目のコントラストが強い。',
    hair: '真っ黒〜深いブラウン。生まれつきの髪が太く、ハリのある質感。',
    overall: '全体的に「コントラスト」「青み」「クリア」の 3 要素が揃う。',
  },
  bestColors: [
    { hex: '#C81030', nameJa: 'トゥルーレッド', nameEn: 'True Red' },
    { hex: '#1A3A8A', nameJa: 'ロイヤルブルー', nameEn: 'Royal Blue' },
    { hex: '#0A8060', nameJa: 'エメラルドグリーン', nameEn: 'Emerald Green' },
    { hex: '#D02080', nameJa: 'フューシャピンク', nameEn: 'Fuchsia Pink' },
    { hex: '#FFFFFF', nameJa: 'ピュアホワイト', nameEn: 'Pure White' },
    { hex: '#1A1A1A', nameJa: 'ジェットブラック', nameEn: 'Jet Black' },
    { hex: '#6A1A8A', nameJa: 'ロイヤルパープル', nameEn: 'Royal Purple' },
    { hex: '#C8C8D0', nameJa: 'クールシルバー', nameEn: 'Cool Silver' },
    { hex: '#3A78D8', nameJa: 'コバルトブルー', nameEn: 'Cobalt Blue' },
    { hex: '#A02050', nameJa: 'マゼンタ', nameEn: 'Magenta' },
    { hex: '#0AC8C8', nameJa: 'アイスターコイズ', nameEn: 'Ice Turquoise' },
    { hex: '#1F2A4A', nameJa: 'ミッドナイトネイビー', nameEn: 'Midnight Navy' },
  ],
  avoidColors: [
    { hex: '#E8C97A', nameJa: 'ベージュ', nameEn: 'Beige' },
    { hex: '#B85C3D', nameJa: 'テラコッタ', nameEn: 'Terracotta' },
    { hex: '#7A8A4A', nameJa: 'オリーブ', nameEn: 'Olive' },
    { hex: '#C89A3A', nameJa: 'マスタード', nameEn: 'Mustard' },
  ],
  makeup: {
    lip: 'トゥルーレッド・フューシャピンク・ワインレッドが鉄板。マットでクリアな発色が◎',
    cheek: 'ローズ系・ピンク系で、頬骨に控えめに入れる（強い色はリップとアイで主張）',
    eye: 'ブラック・ロイヤルブルー・パープル・シルバー。アイラインはくっきりブラックが似合う',
  },
  hairColors: [
    'ジェットブラック（基本・最強）',
    'ダークアッシュ（クール）',
    'ブルーブラック（個性派）',
    'プラチナホワイト（強烈な個性派）',
  ],
  styleNotes: [
    'シャープな素材（ハードレザー、サテン、エナメル）が似合う',
    'アクセサリーはシルバー・プラチナがベスト。クリアストーン・ダイヤモンドも映える',
    'モノトーン × 1 色の鮮やかなカラーアクセントが鉄板コーデ',
    'ぼんやりした中間色（ベージュ・カーキ・くすみピンク）は避ける',
  ],
  faq: [
    {
      q: 'ウィンター（冬）タイプの芸能人は誰ですか？',
      a: '小松菜奈さん、菜々緒さん、桐谷美玲さん、深田恭子さんなど「シャープで華のあるクール系美人」がウィンターの代表例です。青みのある白い肌、強いコントラストの黒髪と黒目、ハッキリした顔立ちが共通の特徴です。',
    },
    {
      q: 'ウィンターは黒髪が一番似合うと聞きました。茶髪は禁止？',
      a: '禁止ではありませんが、明るい茶髪（ハニーゴールドや明るめキャメル）は顔色が悪く見えやすいです。茶髪にする場合は「ダークアッシュブラウン」「ブルーブラック」「黒に近いダークブラウン」など暗めの色を選ぶと、ウィンターの魅力を活かせます。',
    },
    {
      q: 'ウィンターでも肌の色が黒っぽい場合、どう着こなす？',
      a: 'ウィンタータイプは色白だけでなく、肌色が濃い「ディープウィンター」のサブタイプもあります。その場合は、純白より「クリアアイボリー」を選ぶと馴染みやすく、エメラルドグリーンやロイヤルパープルなど深く鮮やかな色がより一層映えます。',
    },
  ],
  themeHex: '#1A1A1A',
  themeGradient: 'from-slate-50 via-blue-50 to-purple-50',
}

export const SEASONS: Record<SeasonSlug, SeasonContent> = {
  spring: SPRING,
  summer: SUMMER,
  autumn: AUTUMN,
  winter: WINTER,
}

export const SEASON_SLUGS: SeasonSlug[] = ['spring', 'summer', 'autumn', 'winter']
