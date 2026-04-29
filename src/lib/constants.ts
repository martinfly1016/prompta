// Site configuration
export const SITE_CONFIG = {
  name: 'プロンプタ',
  nameEn: 'Prompta',
  url: 'https://www.prompta.jp',
  description: 'AIプロンプト集 — Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-E、Geminiなど主要AIツール対応の高品質プロンプトを無料提供。',
  email: 'prompta.jp@gmail.com',
  twitter: '@prompta_jp',
} as const

// AI Tools
export interface Tool {
  slug: string
  name: string
  nameJa: string
  description: string
  icon: string
  color: string
  promptCount?: number
}

export const TOOLS: Tool[] = [
  {
    slug: 'stable-diffusion',
    name: 'Stable Diffusion',
    nameJa: 'ステーブルディフュージョン',
    description: 'オープンソースの画像生成AI。高品質な画像をローカル環境で自由に生成できます。細かいパラメータ調整が可能で、プロフェッショナルな作品制作に最適。',
    icon: '🎨',
    color: '#7c3aed',
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    nameJa: 'ミッドジャーニー',
    description: 'Discord上で動作するAI画像生成ツール。アーティスティックで高品質な画像を簡単なプロンプトで生成。独特の美しいスタイルが特徴。',
    icon: '🖼️',
    color: '#2563eb',
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    nameJa: 'チャットジーピーティー',
    description: 'OpenAIが開発した対話型AI。文章生成、翻訳、プログラミング、分析など幅広いタスクに対応。ビジネスから日常まで活用できます。',
    icon: '💬',
    color: '#10a37f',
  },
  {
    slug: 'claude',
    name: 'Claude',
    nameJa: 'クロード',
    description: 'Anthropicが開発した高性能対話AI。長文理解、論理的な分析、クリエイティブな文章作成に優れ、安全性を重視した設計。',
    icon: '🤖',
    color: '#d97706',
  },
  {
    slug: 'dall-e',
    name: 'DALL-E',
    nameJa: 'ダリ',
    description: 'OpenAIの画像生成AI。テキストから高品質な画像を生成。ChatGPTとの統合で直感的に画像を作成できます。',
    icon: '🎯',
    color: '#ef4444',
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    nameJa: 'ジェミニ',
    description: 'Googleが開発したマルチモーダルAI。テキスト、画像、コード生成に対応し、Google検索やWorkspaceとの連携が強み。',
    icon: '✨',
    color: '#4285f4',
  },
]

// Prompt categories (text + image)
export interface Category {
  slug: string
  name: string
  nameEn: string
  description: string
  icon: string
  promptCount?: number
}

export const CATEGORIES: Category[] = [
  // Text prompt categories (ChatGPT, Claude, Gemini)
  {
    slug: 'writing',
    name: 'ライティング',
    nameEn: 'Writing',
    description: 'AIライティングプロンプト集。ブログ記事、コピーライティング、小説、メール文面など、高品質な文章を生成するためのプロンプトテクニック。ChatGPTやClaudeで活用できます。',
    icon: '✍️',
  },
  {
    slug: 'programming',
    name: 'プログラミング',
    nameEn: 'Programming',
    description: 'AIプログラミングプロンプト集。コード生成、デバッグ、リファクタリング、コードレビューなど、開発効率を高めるプロンプトテクニック。ChatGPTやClaudeでの活用法を紹介。',
    icon: '💻',
  },
  {
    slug: 'business',
    name: 'ビジネス',
    nameEn: 'Business',
    description: 'AIビジネスプロンプト集。企画書、プレゼン資料、マーケティング戦略、データ分析など、ビジネスシーンで役立つプロンプトテクニック。業務効率化に最適。',
    icon: '💼',
  },
  {
    slug: 'education',
    name: '教育',
    nameEn: 'Education',
    description: 'AI教育プロンプト集。学習計画、教材作成、問題生成、概念説明など、教育・学習を効率化するプロンプトテクニック。教師と学習者の両方に役立ちます。',
    icon: '📚',
  },
  {
    slug: 'creative',
    name: 'クリエイティブ',
    nameEn: 'Creative',
    description: 'AIクリエイティブプロンプト集。アイデア発想、ストーリーテリング、ブレインストーミング、クリエイティブライティングなど、創造力を引き出すプロンプトテクニック。',
    icon: '🎨',
  },
  // Image prompt categories (SD, MJ, DALL-E)
  {
    slug: 'hairstyle',
    name: '髪型',
    nameEn: 'Hairstyle',
    description: 'AI画像生成で使える髪型プロンプト集。ロングヘア、ショートカット、ポニーテール、ツインテールなど、様々なヘアスタイルの指定方法を紹介。キャラクターデザインやポートレート作成に。',
    icon: '💇',
  },
  {
    slug: 'clothing',
    name: '服装',
    nameEn: 'Clothing',
    description: 'AI画像生成で使える服装・ファッションプロンプト集。ドレス、スーツ、カジュアル、制服など、様々な衣装の指定方法。キャラクターの個性を引き立てるファッション表現。',
    icon: '👗',
  },
  {
    slug: 'cosplay',
    name: 'コスプレ',
    nameEn: 'Cosplay',
    description: 'AI画像生成で使えるコスプレ・コスチュームプロンプト集。アニメキャラクター、ゲームキャラクター、歴史的衣装など、リアルなコスプレ画像を生成するテクニック。',
    icon: '🎭',
  },
  {
    slug: 'anime',
    name: 'アニメ',
    nameEn: 'Anime',
    description: 'AI画像生成で使えるアニメスタイルプロンプト集。日本のアニメ風イラストを生成するための表現テクニック、スタイル指定、品質向上のコツを紹介。',
    icon: '🎌',
  },
  {
    slug: 'color',
    name: '色・カラー',
    nameEn: 'Color',
    description: 'AI画像生成で使える色・カラーパレットプロンプト集。配色の指定方法、グラデーション表現、特定の色調で統一する方法など、カラーコントロールのテクニック。',
    icon: '🎨',
  },
  {
    slug: 'costume',
    name: '衣装・装飾',
    nameEn: 'Costume',
    description: 'AI画像生成で使える衣装・装飾品プロンプト集。アクセサリー、ジュエリー、帽子、靴など、キャラクターの見た目を彩る装飾アイテムの表現方法。',
    icon: '👑',
  },
  {
    slug: 'body-type',
    name: '体型',
    nameEn: 'Body Type',
    description: 'AI画像生成で使える体型・ポーズプロンプト集。スリム、筋肉質、小柄など体型の指定方法と、自然なポーズ表現のテクニック。',
    icon: '🧍',
  },
  {
    slug: 'camera',
    name: 'カメラ・アングル',
    nameEn: 'Camera',
    description: 'AI画像生成で使えるカメラアングル・撮影技法プロンプト集。クローズアップ、俯瞰、ローアングルなど、構図や撮影テクニックの表現方法。',
    icon: '📷',
  },
]

// Per-category SEO overrides. Leave a field unset to fall back to the default
// template in src/app/(marketing)/prompts/[category]/page.tsx.
// - seoTitle is the <title> *base* (the template appends " — ページN" when paginated).
// - seoDescription overrides the meta description (≤158 chars recommended).
// - seoH1 overrides the on-page H1.
export interface CategorySeoOverride {
  seoTitle?: string
  seoH1?: string
  seoDescription?: string
}

export const CATEGORY_SEO_OVERRIDES: Record<string, CategorySeoOverride> = {
  'cosplay': {
    seoTitle: 'コスプレプロンプト集【呪文・コピペOK】｜セーラー服・メイド服・ファンタジー衣装',
    seoH1: 'コスプレプロンプト集｜セーラー服・メイド服・制服・ファンタジー衣装',
    seoDescription: 'コスプレプロンプトのコピペ集。セーラー服・メイド服・制服・和風・ファンタジー衣装まで、Stable Diffusion と NovelAI で使える呪文を画像付きで多数紹介。',
  },
  'clothing': {
    seoTitle: '服装プロンプト集【呪文・コピペOK】｜ドレス・制服・ファンタジー衣装・カジュアル',
    seoH1: '服装プロンプト集｜ドレス・制服・ファンタジー・カジュアルの呪文',
    seoDescription: '服装プロンプトのコピペ集。ドレス・制服・ファンタジー衣装・カジュアルなど、AI画像生成で使える服装呪文を多数紹介。BREAKコマンドによる色滲み対策も解説。',
  },
  'body-type': {
    seoTitle: '体型プロンプト集【Stable Diffusion 呪文・コピペOK】｜スレンダー・筋肉質・ぽっちゃり・身長指定',
    seoH1: '体型プロンプト集｜スレンダー・筋肉質・小柄・高身長を画像付きで比較',
    seoDescription: 'スレンダー・アスレチック・ぽっちゃり・小柄・高身長など体型プロンプトを多数紹介。Stable Diffusion・NovelAI 対応の呪文とネガティブプロンプト、ControlNet 連携まで徹底解説。',
  },
  'color': {
    seoTitle: '色プロンプト集【コピペOK】｜118色の色名・色指定・色滲み対策の呪文',
    seoH1: '色プロンプト集｜118色の色名・CutOff・BREAK で色滲みを防ぐ',
    seoDescription: 'そのままコピペで使える色プロンプト集。赤・青・パステル・ネオンなど118色以上の色名呪文と、CutOff・BREAK による色滲み防止テクニックを画像付きで紹介。すぐ試せます。',
  },
  'anime': {
    seoTitle: 'アニメプロンプト集【呪文・コピペOK】｜キャラクターデザイン・画風・表情指定',
    seoH1: 'アニメプロンプト集｜キャラクター設計・画風・表情・アニメモデル活用',
    seoDescription: 'アニメスタイルのAI画像生成プロンプト集。アニメキャラクター設計・画風指定・表情描写のコツと、niji mode・Anything V5 など人気モデルの使い分けを画像付きで紹介。',
  },
  'hairstyle': {
    seoTitle: '髪型プロンプト集【呪文・コピペOK】｜ロング・ショート・ツインテール・髪色指定',
    seoH1: '髪型プロンプト集｜女性キャラの髪型・髪色・髪質を自在にコントロール',
    seoDescription: '髪型プロンプトのコピペ集。ロングヘア・ショートカット・ポニーテール・ツインテール・髪色グラデーションまで、Stable Diffusion・NovelAI で使える呪文を画像付きで紹介。',
  },
  'costume': {
    seoTitle: 'コスチュームプロンプト集【呪文・コピペOK】｜和服・甲冑・アクセサリー・装飾品',
    seoH1: 'コスチューム・衣装プロンプト集｜和服・甲冑・ジュエリー・装飾品の呪文',
    seoDescription: 'コスチューム・衣装・装飾品プロンプトのコピペ集。和服・甲冑・ティアラ・チョーカーなど、Stable Diffusion で使えるキャラクター装飾の呪文を画像付きで多数紹介。',
  },
  'camera': {
    seoTitle: 'カメラアングルプロンプト集【構図・ライティングの呪文】｜クローズアップ・俯瞰・シネマティック',
    seoH1: 'カメラアングル・構図プロンプト集｜クローズアップ・俯瞰・シネマティック撮影',
    seoDescription: 'カメラアングル・構図・ライティングのAIプロンプト集。クローズアップ・俯瞰・ローアングル・シネマティック撮影まで、Stable Diffusion・Midjourney で使える呪文を紹介。',
  },
}

// Long-form category intros (~600-800 chars each) for SEO content depth.
// Rendered on /prompts/[category] pages above the existing "コツ" section.
export interface CategoryIntro {
  intro: string
  useCases: string[]
  tips: string[]
}

export const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  // ========== 画像系カテゴリ (8) ==========
  'hairstyle': {
    intro:
      '髪型プロンプトは、AI画像生成においてキャラクターの印象を決定づける最も重要な要素のひとつです。Stable DiffusionやMidjourneyでは「long hair」「short bob」「ponytail」「twin tails」といった英語キーワードで指定するのが基本ですが、単に長さを指定するだけでなく、髪の色（blonde, silver, black hair）、質感（silky, wavy, curly）、前髪のスタイル（blunt bangs, side-swept bangs）まで細かく組み合わせることで、より理想に近いビジュアルが得られます。\n日本のアニメ風イラストで人気の高いツインテールやポニーテールは、(twin tails:1.2)のように重み付け（emphasis）を加えることで、AIが髪型を確実に認識しやすくなります。逆に、髪が顔にかかってしまう問題を防ぐため、ネガティブプロンプトに「hair over eyes」「messy hair」を入れるのも定番テクニックです。\n\n【女性キャラ定番髪型 20 選】ロング系: long hair, very long hair, waist-length hair、ミディアム: medium hair, shoulder-length hair、ショート: short hair, short bob, pixie cut、アップスタイル: ponytail, high ponytail, side ponytail, bun, double bun、ツインテール系: twin tails, twintails, low twin tails、その他人気: braid, french braid, drill hair, hime cut, ahoge。これらに「前髪＋色＋質感」を足すのが基本パターンです。\n\n【髪色のプロ指定 — 単色からグラデーションまで】基本色は blonde, brunette, black hair, red hair, silver hair, blue hair, pink hair。グラデーション指定は「gradient hair, pink to blue」「ombre hair, dark roots to light tips」のように始点→終点で書きます。メッシュは「streaked hair, blonde with pink highlights」、インナーカラーは「inner color hair, black with hidden red」。髪色は他パーツへの色滲みが起きやすいため、BREAK や CutOff で分離するのが安全です。\n\n【髪質・動きの表現で差をつける】「silky, straight」で光沢のあるストレート、「wavy, flowing」で風になびく動き、「curly, voluminous」でボリュームのあるカール。「wet hair」で濡れた質感、「messy hair, bedhead」で寝起き感、「windswept hair」で風に吹かれた躍動感。動きの表現は品質を大きく左右するので、重み付け (flowing hair:1.2) を加えることを推奨します。\n\n【髪飾り・アクセサリーで個性を出す】「hair ribbon, red」「flower in hair」「hairpin, star-shaped」「tiara」「hair ornament, butterfly」など、髪飾りはキャラの個性を決定づける重要アクセント。和風なら「kanzashi, japanese hair ornament」、ゴシックなら「black lace headband, dark rose」。髪飾りは (hair ribbon:1.3) のように強めの重み付けをしないと AI が省略しがちです。',
    useCases: [
      'オリジナルキャラクターのビジュアル設計',
      'VTuberやアバターのデザイン案出し',
      'ポートレート・人物写真風の画像生成',
      'コミック・ライトノベルの挿絵作成',
      '髪色グラデーション・インナーカラーの表現',
    ],
    tips: [
      '長さ＋スタイル＋色＋質感の4要素を組み合わせる',
      '重要な髪型は (keyword:1.2〜1.4) で強調する',
      'ネガティブプロンプトに「bad hair, messy hair」を入れて品質を安定させる',
      'アニメ調なら「anime style」、リアル調なら「photorealistic」を併用',
      '髪色の色滲みにはBREAK構文やCutOffで対策',
    ],
  },

  'clothing': {
    intro:
      '服装プロンプトは、キャラクターの世界観や時代設定、性格までを一目で伝える強力な表現手段です。AI画像生成では「dress」「suit」「school uniform」「kimono」「hoodie」といった基本ワードに加え、素材（silk, denim, leather）、色、ディテール（lace trim, gold buttons, ripped jeans）を細かく指定することで、ファッション雑誌レベルの仕上がりを目指せます。\nStable Diffusionで特に効果的なのは、複数の衣装要素をカンマで区切って積み重ねる方法です。例えば「white blouse, navy pleated skirt, knee-high socks, brown loafers」のように構成すると、AIが各パーツを正確に組み立てられます。Midjourneyの場合は「--style raw」と組み合わせることで、過度に装飾的な解釈を避けてリアルな服装表現が可能になります。\n\n【カジュアル・フォーマル・ファンタジー・コスチュームの4軸で整理する】服装プロンプトを体系的に覚えるには、日常系（casual：T-shirt, jeans, hoodie, sneakers）、フォーマル系（formal：suit, evening dress, tuxedo, high heels）、ファンタジー系（fantasy：medieval armor, mage robe, elf tunic, knight plate）、コスチューム系（costume：sailor uniform, maid outfit, kimono, cheerleader）の4軸で引き出しを作るのが効率的です。各軸ごとに10〜20個の英単語を覚えておけば、組み合わせで数百種類の衣装表現が可能になります。\n\n【BREAKコマンドで色滲み（color bleeding）を防ぐ】複数の服装要素に別々の色を指定すると、Stable Diffusionでは色が混ざってしまう「color bleeding」が起きやすく、例えば「red dress, blue jacket」が紫系に変色することがあります。これを防ぐには「red dress BREAK blue jacket」とプロンプトを分割するか、CutOff 拡張機能で「red:dress || blue:jacket」のように領域ごとに色を固定する方法が有効です。Attention ウェイトと組み合わせて「(red dress:1.2) BREAK (blue jacket:1.2)」と書くとさらに安定します。\n\n【女性キャラ向けの定番パターン】女性キャラクター向けの服装では、トップス（blouse, cardigan, sweater, crop top）とボトムス（pleated skirt, tight skirt, jeans, hot pants）のバランス、足元（knee-high socks, thigh-high stockings, pumps, sneakers）の選択、アクセサリー（ribbon, choker, earrings, hair ornament）の有無が印象を大きく左右します。「1girl, white blouse, navy pleated skirt, knee-high socks, brown loafers, school uniform」のように「人数→上→下→足元→シーン」の順で書くと AI が解釈しやすくなります。',
    useCases: [
      'ファッションデザインのインスピレーション',
      'キャラクター設定資料の作成',
      'EC・アパレルサイト用のモックアップ画像',
      '時代劇・SF・ファンタジーの衣装イメージ作り',
    ],
    tips: [
      'トップス→ボトムス→足元→アクセサリーの順で記述すると安定する',
      '素材名（silk, wool, cotton）を入れると質感が劇的に向上',
      '「detailed clothing, intricate fabric texture」で品質タグを補強',
      'ネガティブに「nude, deformed clothes, extra sleeves」を追加',
    ],
  },

  'cosplay': {
    intro:
      'コスプレプロンプトは、特定のアニメ・ゲーム・歴史上のキャラクターの衣装やルックを再現するための専門的なプロンプト技術です。Stable Diffusionでは作品名や役名を直接入れる方法（例: 「miku hatsune cosplay」）と、衣装の構成要素を分解して記述する方法（例: 「twin teal hair, school uniform, tie」）の2通りがあり、後者の方が著作権リスクを避けつつ「それっぽい」画像を生成できます。\nコスプレ特有の課題として、衣装のディテール再現と人物の自然さの両立があります。「cosplay photo, professional photography, studio lighting」といった撮影系キーワードを併用することで、実際のコスプレ写真に近いリアリティが得られます。Midjourneyでは「--ar 2:3 --style raw」が人物コスプレ写真に最適です。\n\n【定番コスプレ10選の呪文例】AIモデルが学習データで頻繁に見ているため再現性が高い定番コスチュームは、「sailor uniform（セーラー服）」「maid uniform（メイド服）」「school uniform（制服）」「miko costume（巫女装束）」「nurse outfit（ナース服）」「kimono（着物）」「cheerleader uniform（チアリーダー）」「witch costume（魔女コスチューム）」「bunny girl（バニーガール）」「fantasy armor（ファンタジー甲冑）」の10種類。これらをベースに色・素材・小物を追加するだけで、少ない指示でも安定した結果が得られます。\n\n【Stable Diffusion と NovelAI の使い分け】Stable Diffusionはリアル寄りの実写コスプレ写真が得意で、ChilloutMix や AsianRealistic 系モデルは実写風コスプレ、Anything V5 や Counterfeit 系はアニメ調に最適です。一方 NovelAI は Artist タグを積極活用することで、特定作家の絵柄でコスプレキャラを描けるのが特徴。どちらもベースプロンプトは共通ですが、品質タグ（SD: masterpiece, best quality / NovelAI: best quality, amazing quality）とネガティブプロンプトの書式がモデルごとに微妙に異なる点に注意してください。\n\n【呪文の重み付けテクニック】コスプレの衣装要素は複数併記すると AI が省略する傾向があるため、重要パーツに「(sailor collar:1.2), (pleated skirt:1.3), (knee-high socks:1.1)」のように重みを散らすのがコツです。1.4 を超えると画像全体が崩壊しやすいので、1.1〜1.3 の範囲に収めるのが安全圏。さらに BREAK 構文を使うと「[上着]BREAK[下]BREAK[足元]」と要素を分離でき、色の干渉（color bleeding）も防げます。',
    useCases: [
      'コスプレ衣装のデザイン案出し',
      'イベントポスター・告知画像の作成',
      'キャラクター紹介資料の作成',
      'コミケ・ハロウィン用の参考画像',
    ],
    tips: [
      'キャラ名より「衣装の構成要素」で記述する方が安定する',
      '「professional cosplay photo, studio lighting」で写真品質を上げる',
      '武器や小物は「holding [item]」と明示すると認識率が上がる',
      'ネガティブに「low quality cosplay, fake wig」を入れる',
    ],
  },

  'anime': {
    intro:
      'アニメスタイルプロンプトは、日本のアニメ・マンガ調イラストをAIで生成するための核となるテクニックです。Stable Diffusionでは「anime style」「anime coloring」「manga style」「cel shading」といったベースキーワードに加え、特定の作画スタイル（90s anime, modern anime, ghibli style）を指定することで方向性を細かくコントロールできます。\nアニメ系モデル（Anything V5, Counterfeit, MeinaMix など）を使う場合、品質タグ「masterpiece, best quality, ultra detailed」とネガティブタグ「(worst quality, low quality:1.4), bad anatomy, bad hands」をテンプレ化しておくのが定番です。Midjourneyでは「niji 5」モードがアニメ表現に特化しており、「--niji 5 --style expressive」で鮮やかなアニメ風画像が得られます。\n\n【アニメキャラクター設計の呪文パターン】オリジナルキャラクターを描くには「1girl/1boy」＋ 外見特徴（髪色・髪型・目の色・服装）＋ ポーズ ＋ 背景 の 4 要素を順番に記述します。例: 「1girl, long silver hair, blue eyes, school uniform, sitting on window sill, sunset background, anime style」。人気の高いキャラ設定として、ツインテール×制服、銀髪×ファンタジー装備、ネコミミ×メイド服 は AI の再現性が特に高いです。\n\n【画風・年代指定のテクニック】「90s anime」で『エヴァンゲリオン』風のレトロ感、「modern anime」で最近の深夜アニメ風、「ghibli style」でジブリの水彩調、「makoto shinkai style」で新海誠風の光の表現が得られます。セル画風なら「cel shading, flat color, bold outlines」、水墨画風なら「sumi-e, ink wash, traditional japanese art」と組み合わせます。画風は品質タグの前に書くと優先度が上がります。\n\n【表情・感情描写で物語性を加える】キャラの表情は「smile, happy」のような単純な指定から、「gentle smile, looking at viewer, tears in eyes, blushing」のような複合表現まで幅広く対応しています。感情と状況を組み合わせると物語性が出ます: 「crying, rain, holding umbrella, melancholic expression」。NovelAI では emotion タグがかなり精密で、「(gentle smile:1.2), soft eyes, slight blush」のように重み付けすると表情の繊細さが増します。\n\n【モデル選びの決定版ガイド】Stable Diffusion のアニメ系モデルは進化が速く、用途に合った選択が重要です。Anything V5 は汎用的で初心者向け、Counterfeit は美麗な色彩表現、MeinaMix はリアル寄りのアニメ調、AnimagineXL は SDXL ベースの最新鋭。Midjourney なら niji 5（アニメ特化）、DALL-E 3 はアニメ風指定が可能ですがスタイルの制御は弱め。モデル比較は同じプロンプトで 3-4 モデル試して好みの絵柄を見つけるのが最速です。',
    useCases: [
      'オリジナルキャラクターの設定画作成',
      '同人誌・Web漫画の参考素材',
      'SNSアイコン・ヘッダー画像の作成',
      'ライトノベルやゲームのコンセプトアート',
      'アニメキャラクターの表情・感情バリエーション',
    ],
    tips: [
      '品質タグ「masterpiece, best quality, ultra detailed」をテンプレ化',
      'アニメ系モデルやMidjourneyのniji 5モードを使う',
      '「(anime style:1.2)」で重み付けしてリアル化を防ぐ',
      'ネガティブに「3d, realistic, photo, bad anatomy」を入れる',
      '画風は品質タグの前に書くと優先度が上がる',
    ],
  },

  'color': {
    intro:
      '色・カラープロンプトは、画像全体の雰囲気と感情表現をコントロールする最も基本的かつ強力な要素です。AI画像生成では「pastel colors」「vivid colors」「monochrome」「sepia tone」のような全体トーンの指定から、「pink and blue gradient」「warm color palette」「cinematic color grading」といった具体的な配色まで、多様な指示が可能です。\nStable Diffusionでは色指定が他の要素に「染み出す」（color bleeding）現象が起きやすいため、BREAK構文や領域指定（regional prompter）で対処するのがプロの手法です。Midjourneyでは「--style raw」を使うと色の解釈が忠実になり、「dominant color: teal」のような自然言語表記も認識します。配色は画像の感情的インパクトを決めるため、参考にしたい配色を持つアーティスト名を併記するのも効果的です。\n\n【色名プロンプト — 基本 20 色と応用】基本色（red, blue, green, yellow, pink, purple, white, black, orange, brown）はどのモデルでも安定して認識されますが、微妙なニュアンスを出すには「crimson, scarlet, coral」（赤系）、「navy, cerulean, azure, teal」（青系）、「emerald, mint, sage」（緑系）のような具体名が有効です。和風の色名（「桜色 sakura pink」「藍色 indigo blue」「朱色 vermillion」）も Stable Diffusion では意外と認識精度が高く、日本的な雰囲気を出すのに効果的です。\n\n【CutOff 拡張機能で部分色指定をマスターする】CutOff は Stable Diffusion WebUI の拡張機能で、プロンプト中の色指定を特定の対象に「固定」する機能です。例えば「red dress, blue ribbon」と指定したとき、ドレスが青っぽくなる色滲みを CutOff の「Target tokens: red-dress, blue-ribbon」で防止できます。Regional Prompter と併用すれば、画面の左右で完全に別の色使いを指定することも可能です。\n\n【BREAK コマンドによるセグメント分離】BREAK はプロンプトをセグメントに区切る構文で、「red dress BREAK blue sky BREAK green trees」のように書くと、AI が各セグメントを独立して解釈するため色干渉を大幅に抑えられます。特にマルチカラーの衣装（例：赤い上着＋青いスカート＋白い靴）を描くときに威力を発揮します。重み付けと組み合わせて「(red jacket:1.2) BREAK (blue skirt:1.2)」とすると最も安定します。\n\n【モノクロ・セピア・カラーグレーディング】「monochrome」「sepia」「desaturated」などのトーン指定は、写真的・映画的な仕上がりを目指すときに効果的です。「cinematic color grading, orange and teal, film grain」はハリウッド映画風の配色で、キャラクターを暖色（orange skin tone）、背景を寒色（teal shadows）に分離するテクニックです。CFG スケールを 8-12 に設定すると色指定が安定しやすくなります。',
    useCases: [
      '雰囲気重視のイメージビジュアル制作',
      'ブランドカラーに合わせた素材作成',
      '季節感のある背景・壁紙作成',
      '映画・ゲームのコンセプトアート',
      'マルチカラー衣装のカラーリング指定',
    ],
    tips: [
      '全体トーン → 具体的な色 → グラデーションの順で記述する',
      '「cinematic color grading」「film grain」で映画的な色合いに',
      '色の染み出しを防ぐにはBREAK構文やCutOff拡張を活用',
      'ネガティブに「oversaturated, washed out colors」を入れる',
      'CFGスケール 8-12 で色指定が安定しやすい',
    ],
  },

  'costume': {
    intro:
      '衣装・装飾品プロンプトは、キャラクターの個性を完成させるアクセサリーや小物類を表現するためのテクニックです。「necklace」「earrings」「crown」「glasses」「choker」「ribbon」など、英語の基本ワードを覚えておくとAIが認識しやすく、複数併用することで装飾性の高いキャラクターが作れます。\n装飾系プロンプトの難しさは、AIが小物を「忘れる」または「過剰に増やす」点です。「(intricate gold necklace:1.3)」のように重み付けを強めにかけ、ネガティブに「too many accessories, deformed jewelry」を入れて制御するのが基本戦略です。和風キャラには「kanzashi（簪）」「obi（帯）」、ファンタジー系には「tiara, gem, magical pendant」など、ジャンル特有の語彙を覚えておくと表現の幅が広がります。\n\n【コスチューム 5 大カテゴリと定番呪文】衣装・装飾品は 5 つのカテゴリに大別できます。\n1. **和風**: kimono, hakama, yukata, obi, kanzashi, geta, furisode — 季節を添えると雰囲気が出ます（cherry blossoms, autumn leaves）\n2. **甲冑・アーマー**: plate armor, chainmail, leather armor, gauntlets, helmet, shield — ファンタジー系は「ornate, glowing runes, magical」を追加\n3. **ジュエリー**: necklace, pendant, earrings, bracelet, ring, tiara, crown — 素材名（gold, silver, diamond, ruby）を必ず併記\n4. **ゴシック・ダーク**: choker, lace gloves, corset, black veil, cross pendant — 「dark, gothic, elegant」で雰囲気統一\n5. **SF・メカ**: visor, cybernetic eye, mech suit, LED strip, holographic display — ネオンカラーとの組み合わせが定番\n\n【装飾品が消える問題の対処法】AIが装飾品を「忘れる」のは最も多いトラブルです。対策は 3 段階:\n1. **(keyword:1.3)** で重み付け — 最初の防壁\n2. **BREAK 構文**で分離 — 「character description BREAK (golden crown:1.3), (diamond earrings:1.2)」と装飾品を独立セグメントに\n3. **ControlNet の参照画像** — 装飾品の位置を物理的に固定。Canny や Depth モードが有効\n\n逆に装飾品が**増殖する**場合は、ネガティブに「too many accessories, duplicate jewelry, extra rings」を入れてください。',
    useCases: [
      'キャラクターデザインの細部仕上げ',
      'ジュエリー・アクセサリーのデザイン案出し',
      'ファンタジー・歴史物のコスチューム設計',
      'ゲームアバターのカスタマイズ案',
      '和風キャラクターの装飾品指定',
    ],
    tips: [
      'アクセサリーは (keyword:1.3) でしっかり重み付けする',
      '「intricate, detailed, ornate」を装飾語として併用する',
      '素材名（gold, silver, gemstone）を必ず入れる',
      'ネガティブに「deformed jewelry, broken accessories」を入れる',
    ],
  },

  'body-type': {
    intro:
      '体型プロンプトは、キャラクターの体格・プロポーション・ポーズを指定するための重要な要素で、リアル系・アニメ系どちらでも頻繁に使われます。Stable Diffusionでは「slim」「petite」「athletic」「muscular」「curvy」といった体型ワードに加え、身長感（tall, short）、姿勢（standing, sitting, dynamic pose）を組み合わせて指示します。\n体型表現の難所は手や指の崩れやすさで、これは現在のAI画像生成の最大の課題のひとつです。「detailed hands, perfect anatomy, correct proportions」を品質タグとして入れ、ネガティブには必ず「bad hands, extra fingers, missing fingers, bad anatomy, deformed」を入れるのが定石です。ポーズ指定では「contrapposto」「dynamic action pose」のような美術用語が高精度に認識されます。ControlNetを併用すると、参照画像から体型・ポーズを正確にコピーできます。\n\n【身長系の呪文テクニック】身長は「tall」「short」だけでは AI に伝わりにくいため、「tall woman, long legs, towering over」や「petite, short stature, looking up」のように身体的特徴を複合で記述するのがコツです。2 人構図で身長差を出したいときは「height difference, tall man and short woman, looking down at her」のように関係性をセットで書くと安定します。数値指定（170cm など）は Stable Diffusion では機能しないため、相対的な形容詞で表現してください。\n\n【体格系（スレンダー/アスリート/ぽっちゃり）の使い分け】痩せ型は「slim, slender, thin」のうち「slender」が最もバランスの取れた細身表現で、「skinny」は骨ばった印象が強くなります。アスリート体型は「athletic build, toned body, muscular arms」、ぽっちゃり系は「chubby, plump, curvy, thick thighs」が定番。重み付けは (slender:1.2) 程度で十分で、1.4 を超えると体が崩壊しやすいので注意してください。\n\n【年齢感を体型で表現する】年齢そのものを指定するより、体型で暗示する方が自然な仕上がりになります。10 代→「youthful, slender, petite frame」、20 代→「young adult, slim waist, athletic」、30 代以上→「mature, curvy, slightly wider hips」。「child」「teenager」「elderly」などの年齢語と組み合わせると年齢感がより明確に伝わります。\n\n【ポーズ連携テクニック】体型とポーズはセットで指定すると説得力が増します。スレンダー体型×「elegant pose, hand on hip, walking」、筋肉質×「power stance, arms crossed, flexing」、小柄×「sitting, legs dangling, looking up」のように、体型の特性を活かすポーズを選ぶのがプロのテクニックです。\n\n【モデル別の体型挙動】リアル系モデル（ChilloutMix, BeautifulRealistic）はデフォルトが標準〜やや細身で、体型指定への反応が素直です。アニメ系モデル（Anything V5, Counterfeit）はデフォルトが極端に細身のため、「curvy」「muscular」の効きが弱く、重み付けを 1.3 以上に上げる必要があります。NovelAI では Artist タグとの相性もあるため、体型が安定しないときはモデルやArtistを変えてみるのも有効な手段です。',
    useCases: [
      'キャラクターの基本デザイン設計',
      'ファッション撮影・ポートレート風の生成',
      'アクションシーン・戦闘ポーズの作成',
      'スポーツ・フィットネス系の素材',
      '身長差カップル・体格差構図の作成',
    ],
    tips: [
      '体型 → 身長 → 姿勢の3要素で記述する',
      '「perfect anatomy, correct proportions」を必ず入れる',
      '手の崩れ対策に「detailed hands, five fingers」を併用',
      '正確なポーズが必要ならControlNetで参照画像を使う',
      '重み付けは1.2程度が安全圏、1.4超は体の崩壊に注意',
    ],
  },

  'camera': {
    intro:
      'カメラ・アングルプロンプトは、画像の構図と視点を決定づける、いわば「映像監督」的な役割を果たす要素です。「close-up」「medium shot」「full body shot」「wide shot」のような基本構図から、「low angle」「high angle」「dutch angle」「bird\'s eye view」といった視点指定、さらに「shallow depth of field」「bokeh」「cinematic composition」のような撮影技法まで、幅広く指示できます。\nMidjourneyは特にカメラ系プロンプトに強く、「shot on Sony A7IV, 85mm lens, f/1.4」のような実機材スペック指定にも反応します。Stable Diffusionでは「professional photography, dramatic lighting, rule of thirds」を併用すると、構図の安定性が大きく向上します。映画的な雰囲気を出したい場合は「cinematic still, anamorphic lens, film grain」が定番の組み合わせです。\n\n【コピペで使える構図テンプレート 10 選】すぐに使える実践的な呪文テンプレートです:\n1. ポートレート基本: 「close-up portrait, soft lighting, shallow depth of field, 85mm lens」\n2. 全身ショット: 「full body shot, standing pose, studio lighting, white background」\n3. シネマティック: 「cinematic still, anamorphic lens, dramatic lighting, film grain, 2.39:1 aspect ratio」\n4. 俯瞰: 「bird\'s eye view, top-down shot, aerial perspective, city below」\n5. ローアングル迫力: 「low angle shot, looking up, dramatic perspective, heroic pose」\n6. 横顔: 「side profile, rim lighting, dark background, dramatic shadows」\n7. 背面ショット: 「from behind, over the shoulder, looking at scenery, depth」\n8. 超接写: 「extreme close-up, macro shot, eyes detail, skin texture, 100mm macro lens」\n9. 群像構図: 「group shot, multiple characters, symmetrical composition, wide angle」\n10. ダッチアングル: 「dutch angle, tilted frame, dynamic composition, action scene」\n\n【ライティング 8 パターン — 雰囲気を劇的に変える】ライティングだけで画像の印象は 180 度変わります:\n- 「soft lighting」— 柔らかく自然、ポートレート向き\n- 「dramatic lighting」— 強い陰影、ドラマチック\n- 「rim lighting / backlight」— 被写体の輪郭が光る逆光\n- 「golden hour」— 夕暮れの暖かい自然光\n- 「studio lighting, three-point lighting」— プロの撮影スタジオ\n- 「neon lighting」— サイバーパンク・夜の繁華街\n- 「candle light, warm」— 暖かい室内の雰囲気\n- 「moonlight, cool blue」— 月明かりの冷たい光\n\n【レンズ・機材指定で差をつける（Midjourney 特に有効）】Midjourney はカメラ機材名に強く反応します。「shot on Canon 5D Mark IV, 50mm f/1.4」でリアルなボケ味、「shot on Fujifilm X-T4, 23mm f/1.4」でフィルム調の色味、「Leica M10, 35mm Summilux」で上品なドキュメンタリー風。Stable Diffusion ではレンズ効果は「depth of field, bokeh, f/1.4」のような一般的記述の方が安定します。',
    useCases: [
      '映画的・ドラマチックな構図のシーン作成',
      'ポートレート撮影風の人物画像',
      '広告・ポスター用のビジュアル',
      'ゲームのキービジュアル・コンセプトアート',
      'サイバーパンク・ネオンライティング系の作品',
    ],
    tips: [
      '構図 → 視点 → 撮影機材 → ライティングの順で記述',
      '「cinematic, dramatic lighting, depth of field」を組み合わせる',
      '実機材名（Sony A7, 35mm lens）はMidjourneyで特に有効',
      'ネガティブに「flat composition, boring angle, bad lighting」を入れる',
      'コピペ可能なテンプレートから始めて、要素を差し替えるのが最速',
    ],
  },

  // ========== テキスト系カテゴリ (5) ==========
  'writing': {
    intro:
      'ライティング向けプロンプトは、ChatGPTやClaudeで高品質な文章を生成するための指示文設計テクニックです。単に「ブログを書いて」と頼むのではなく、役割設定（あなたはプロの編集者です）、対象読者、文体（です・ます調 / である調）、文字数、構成（見出し付き / 結論先出し）を明示することで、AIの出力品質は劇的に向上します。\n特に効果的なのが「Few-Shotプロンプト」で、理想の文章サンプルを2〜3例先に示してから本題を依頼する方法です。これによりAIは文体・トーン・構成パターンを学習し、サンプルに近い品質で出力します。さらに「Step by Stepで考えてください」と指示すると、AIが論理を組み立てる過程を経て、より深く整理された文章が得られます。コピーライティングではAIDA・PASなどのフレームワーク名を直接指示するのも有効です。',
    useCases: [
      'ブログ記事・コラムの執筆支援',
      'コピーライティング・LPの本文作成',
      'メール文面・営業文のドラフト',
      '小説・シナリオのプロット組み立て',
    ],
    tips: [
      '役割設定 → 対象読者 → 文体 → 文字数 → 構成の5点を明示する',
      'Few-Shot（参考例3つ）でトーンを教え込む',
      '「Step by Stepで考えてください」で論理を引き出す',
      '出力後に「もっと自然に」「もっと簡潔に」と段階的に修正させる',
    ],
  },

  'programming': {
    intro:
      'プログラミング向けプロンプトは、AIをコーディングパートナーとして活用するための指示文設計です。コード生成・デバッグ・リファクタリング・コードレビューなど目的によって最適なプロンプト構造が異なります。基本は「言語・フレームワーク・バージョン」「目的」「制約条件（型安全 / 副作用なし / O(n)以下など）」を最初に明示することです。\nClaudeやChatGPTにバグを質問する際は、エラーメッセージ全文と再現コードを丸ごと貼り付け、「期待する動作」と「実際の動作」を分けて書くと、的確な原因特定ができます。コードレビューを頼む場合は「セキュリティ観点で」「パフォーマンス観点で」「可読性観点で」と観点を分けて複数回問うのが効果的です。複雑な実装では「まず設計を提案して、私の確認後に実装してください」と段階分けすると暴走を防げます。',
    useCases: [
      '新機能のコード生成・スキャフォールド作成',
      'バグの原因特定とデバッグ',
      'リファクタリング・コード品質向上',
      'コードレビュー・セキュリティ監査',
    ],
    tips: [
      '言語・FW・バージョン・制約条件を最初に明示する',
      'バグ質問は「エラー全文＋期待動作＋実際の動作」を分けて書く',
      'レビューは観点別（セキュリティ/速度/可読性）に分けて依頼',
      '複雑な実装は「設計→確認→実装」の段階分けで暴走を防ぐ',
    ],
  },

  'business': {
    intro:
      'ビジネス向けプロンプトは、企画書・プレゼン資料・マーケティング戦略・データ分析など、業務効率化のためのAI活用テクニックです。ビジネス文書では正確性・論理性・敬語の自然さが求められるため、ChatGPTやClaudeに対しては「あなたは経営コンサルタントです」「あなたは新規事業の責任者です」など、役割と業界知識を明確に与えることが第一歩です。\n企画書作成では「3C分析」「SWOT分析」「ロジックツリー」など既存のフレームワーク名を直接指示することで、構造化された出力が得られます。データ分析の依頼では数値の根拠を必ず確認し、AIの「ハルシネーション（幻覚）」を防ぐために「不明な点は推測せず、不明と明示してください」と一文加えるのが鉄則です。プレゼン資料はマークダウン形式で出力させると、後でスライドツールに移植しやすくなります。',
    useCases: [
      '企画書・提案書のドラフト作成',
      '営業メール・商談スクリプトの作成',
      'マーケティング戦略の壁打ち',
      'データ分析・市場調査の整理',
    ],
    tips: [
      '役割（経営者・コンサル・営業）を最初に設定する',
      'フレームワーク名（3C, SWOT, 4P）を直接指示して構造化',
      '「不明な点は推測せず明示してください」でハルシネーション対策',
      'プレゼン用はマークダウン形式で出力させる',
    ],
  },

  'education': {
    intro:
      '教育向けプロンプトは、学習計画の設計・教材作成・問題生成・概念説明など、学ぶ側と教える側の双方を支援するAI活用法です。「中学2年生にもわかるように」「専門用語を避けて」「比喩を使って」のように対象レベルを明示することで、AIは説明の難易度を細かく調整します。Claudeは特にこの手の階層的な説明に強く、Feynman Technique（自分の言葉で教える）を再現できます。\n問題生成では「○○の概念を確認できる5問の選択式問題を、解説付きで作成してください」と具体的に依頼します。学習計画作成では「3ヶ月で英検準1級レベルに到達する週間学習計画を、月次マイルストーン付きで」のように期間・目標・粒度を明示することで実用性が高まります。間違えた問題を貼り付けて「なぜ間違えたか3ステップで解説して」と頼むのも効果的な使い方です。',
    useCases: [
      '学習計画・カリキュラムの作成',
      '練習問題・小テストの自動生成',
      '難しい概念のわかりやすい解説',
      '英会話・語学学習の対話相手',
    ],
    tips: [
      '対象レベル（小学生・高校生・社会人）を必ず明示する',
      '「比喩を使って」「日常例で」と表現方法を指定する',
      '問題生成は「○問・形式・解説の有無」を具体的に指示',
      '間違えた問題は「3ステップで解説」と段階分けを依頼',
    ],
  },

  'creative': {
    intro:
      'クリエイティブ向けプロンプトは、アイデア発想・ストーリーテリング・ブレインストーミング・コンセプト作りなど、創造性を引き出すためのAI活用法です。AIは「数を出す」のが得意なので、「斬新なアイデアを20個出してください」のように大量生成を頼み、その中から人間が選別する流れが効率的です。質を上げたい場合は「ターゲット層」「制約条件」「既存案との差別化ポイント」を明示します。\nストーリーテリングではキャラクター設定・世界観・テーマ・トーンを与え、「3幕構成で」「主人公の葛藤を中心に」のような構造指定が効きます。Claudeは長文の物語生成に強く、ChatGPTはアイデアの発散と組み合わせに強い、という使い分けも覚えておくと便利です。詰まったら「全く逆の発想で」「業界外の視点で」「もし○○だったら」のような視点切り替えプロンプトで突破口が開けます。',
    useCases: [
      '新商品・キャンペーンのアイデア出し',
      '小説・脚本・ゲームシナリオの執筆',
      'ネーミング・キャッチコピー作成',
      'ブレスト・コンセプトワークの壁打ち',
    ],
    tips: [
      'まず数（10〜20案）を出させ、人間が選別する',
      'ターゲット・制約・差別化ポイントを最初に明示',
      'ストーリーは「3幕構成・キャラ・テーマ・トーン」で枠を作る',
      '「逆の発想で」「業界外の視点で」で発想の壁を破る',
    ],
  },
}

// Guide articles
export interface Guide {
  slug: string
  title: string
  description: string
  targetKeyword: string
  monthlySearchVolume: number
}

export const GUIDES: Guide[] = [
  {
    slug: 'what-is-prompt',
    title: 'プロンプトとは？AI初心者向け完全ガイド',
    description: 'プロンプトの意味と基本的な使い方を初心者向けにわかりやすく解説。ChatGPTやStable Diffusionでの効果的なプロンプト作成法。',
    targetKeyword: 'プロンプトとは',
    monthlySearchVolume: 49500,
  },
  {
    slug: 'stable-diffusion-prompt-guide',
    title: 'Stable Diffusion プロンプトの書き方完全ガイド',
    description: 'Stable Diffusionで美しい画像を生成するためのプロンプトの書き方を徹底解説。品質タグ、構図、スタイル指定のコツ。',
    targetKeyword: 'stable diffusion プロンプト 書き方',
    monthlySearchVolume: 3600,
  },
  {
    slug: 'midjourney-prompt-guide',
    title: 'Midjourney プロンプトの書き方とコツ',
    description: 'Midjourneyで思い通りの画像を生成するためのプロンプトテクニック。パラメータ設定からスタイル指定まで。',
    targetKeyword: 'midjourney プロンプト 書き方',
    monthlySearchVolume: 2900,
  },
  {
    slug: 'chatgpt-prompt-techniques',
    title: 'ChatGPT プロンプト術：効果的な質問の仕方',
    description: 'ChatGPTから最高の回答を引き出すプロンプトテクニック。ロール設定、ステップバイステップ、Few-Shotなどの手法を解説。',
    targetKeyword: 'chatgpt プロンプト コツ',
    monthlySearchVolume: 2400,
  },
  {
    slug: 'negative-prompt-guide',
    title: 'ネガティブプロンプト完全ガイド',
    description: 'AI画像生成におけるネガティブプロンプトの使い方と効果。品質向上のための必須テクニック。',
    targetKeyword: 'ネガティブプロンプト',
    monthlySearchVolume: 6600,
  },
  {
    slug: 'prompt-language-game',
    title: 'プロンプトは「コード」ではない — ヴィトゲンシュタインに学ぶAI対話の本質',
    description: 'なぜあなたのプロンプトは機能しないのか？哲学者ヴィトゲンシュタインの「言語ゲーム」理論から、ChatGPT・Claudeを真に使いこなすための本質的な思考法を解説します。',
    targetKeyword: 'プロンプトエンジニアリング 本質',
    monthlySearchVolume: 480,
  },
  {
    slug: 'cosplay-prompt-guide',
    title: 'コスプレプロンプトの書き方｜セーラー服・メイド服・ファンタジー衣装を再現する呪文',
    description: 'AIイラストでコスプレを再現するプロンプト完全ガイド。セーラー服・メイド・ナース・巫女・ファンタジー衣装の呪文例と Stable Diffusion / NovelAI の使い分けを徹底解説。',
    targetKeyword: 'コスプレ プロンプト 書き方',
    monthlySearchVolume: 480,
  },
  {
    slug: 'hairstyle-prompt-guide',
    title: '髪型プロンプトの書き方｜ロング・ショート・ツインテール・髪色グラデーションの完全ガイド',
    description: 'AI画像生成で髪型を自在にコントロールするプロンプト完全ガイド。20種類の定番ヘアスタイル、髪色指定、グラデーション・インナーカラー、髪飾りの呪文例を徹底解説。',
    targetKeyword: '髪型 プロンプト 書き方',
    monthlySearchVolume: 2400,
  },
  {
    slug: 'anime-prompt-guide',
    title: 'アニメプロンプトの書き方｜キャラクター設計・画風・表情指定の完全ガイド',
    description: 'AIでアニメ風イラストを生成するプロンプト完全ガイド。キャラクター設計、90s/modern/ジブリ風の画風指定、表情描写、Anything V5/Counterfeit/niji 5 モデルの使い分けを徹底解説。',
    targetKeyword: 'アニメ プロンプト 書き方',
    monthlySearchVolume: 260,
  },
  {
    slug: 'body-type-prompt-guide',
    title: '体型プロンプトの書き方｜スレンダー・筋肉質・ぽっちゃりを Stable Diffusion で再現',
    description: 'AI画像生成で体型を自在にコントロールするプロンプト完全ガイド。スレンダー・アスレチック・ぽっちゃり・小柄・高身長の指定方法と重み付けテクニックを解説。',
    targetKeyword: '体型 プロンプト 書き方',
    monthlySearchVolume: 390,
  },
  {
    slug: 'color-prompt-guide',
    title: '色プロンプト完全ガイド｜CutOff・BREAK で色滲みを防ぐ Stable Diffusion テクニック',
    description: 'AI画像生成での色指定を完全マスター。118色の色名、CutOff拡張、BREAKコマンド、cinematic color grading まで、色滲み防止テクニックを徹底解説。',
    targetKeyword: '色 プロンプト 色指定',
    monthlySearchVolume: 320,
  },
]

// Guide ↔ Tool/Category mapping for internal linking
export const GUIDE_RELATIONS: Record<string, { tools: string[]; categories: string[] }> = {
  'what-is-prompt': {
    tools: ['chatgpt', 'stable-diffusion', 'midjourney', 'claude', 'dall-e'],
    categories: [],
  },
  'stable-diffusion-prompt-guide': {
    tools: ['stable-diffusion'],
    categories: ['hairstyle', 'clothing', 'anime', 'color', 'camera', 'body-type', 'costume', 'cosplay'],
  },
  'midjourney-prompt-guide': {
    tools: ['midjourney'],
    categories: ['hairstyle', 'clothing', 'anime', 'color', 'camera', 'body-type', 'costume', 'cosplay'],
  },
  'chatgpt-prompt-techniques': {
    tools: ['chatgpt', 'claude'],
    categories: ['writing', 'programming', 'business', 'education', 'creative'],
  },
  'negative-prompt-guide': {
    tools: ['stable-diffusion', 'midjourney'],
    categories: ['hairstyle', 'clothing', 'anime', 'color', 'camera', 'body-type', 'costume', 'cosplay'],
  },
  'prompt-language-game': {
    tools: ['chatgpt', 'claude', 'gemini'],
    categories: ['writing', 'business', 'creative', 'education', 'programming'],
  },
  'cosplay-prompt-guide': {
    tools: ['stable-diffusion', 'midjourney'],
    categories: ['cosplay', 'clothing', 'costume'],
  },
  'hairstyle-prompt-guide': {
    tools: ['stable-diffusion', 'midjourney'],
    categories: ['hairstyle', 'anime', 'color'],
  },
  'anime-prompt-guide': {
    tools: ['stable-diffusion', 'midjourney'],
    categories: ['anime', 'hairstyle', 'cosplay'],
  },
  'body-type-prompt-guide': {
    tools: ['stable-diffusion', 'midjourney'],
    categories: ['body-type', 'camera', 'clothing'],
  },
  'color-prompt-guide': {
    tools: ['stable-diffusion', 'midjourney'],
    categories: ['color', 'anime', 'camera', 'hairstyle'],
  },
}

export function getGuidesForTool(toolSlug: string): Guide[] {
  return GUIDES.filter(g => GUIDE_RELATIONS[g.slug]?.tools.includes(toolSlug))
}

export function getGuidesForCategory(categorySlug: string): Guide[] {
  return GUIDES.filter(g => GUIDE_RELATIONS[g.slug]?.categories.includes(categorySlug))
}

export function getRelatedGuides(currentSlug: string): Guide[] {
  const current = GUIDE_RELATIONS[currentSlug]
  if (!current) return []
  return GUIDES.filter(g => {
    if (g.slug === currentSlug) return false
    const other = GUIDE_RELATIONS[g.slug]
    if (!other) return false
    return other.tools.some(t => current.tools.includes(t))
      || other.categories.some(c => current.categories.includes(c))
  })
}

// Tool slug to tool lookup
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find(t => t.slug === slug)
}

// Category slug to category lookup
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}
