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
  {
    slug: 'photo-edit',
    name: '写真加工',
    nameEn: 'Photo Editing',
    description: 'AI写真加工プロンプト集。背景透過、証明写真生成、プロフィール写真レタッチ、服装の着せ替え、髪型シミュレーション、美肌加工など、ユーザーがアップロードした写真をAIで編集するためのプロンプト。Gemini 2.5 Flash Image・Nano Banana・ChatGPTの画像編集機能で使えます。',
    icon: '📸',
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
    seoTitle: '服装プロンプト集【無料・コピペOK】女性・制服・メイド服・ファンタジー衣装｜AI画像生成',
    seoH1: '服装プロンプト集｜女性キャラのドレス・制服・メイド服・ビジネススーツ・ファンタジー衣装',
    seoDescription: '女性キャラの服装・衣装プロンプトをコピペで使える無料例文集。ドレス・制服・メイド服・ビジネススーツ・ファンタジー衣装・カジュアル・パンクファッションを Stable Diffusion・Midjourney・NovelAI で動作確認済み。BREAK コマンドによる色滲み対策、衣装の組み合わせ方も画像付きで解説。',
  },
  'body-type': {
    seoTitle: '体型プロンプト集【Stable Diffusion 呪文・コピペOK】｜スレンダー・筋肉質・ぽっちゃり・身長指定',
    seoH1: '体型プロンプト集｜スレンダー・筋肉質・小柄・高身長を画像付きで比較',
    seoDescription: 'スレンダー・アスレチック・ぽっちゃり・小柄・高身長など体型プロンプトを多数紹介。Stable Diffusion・NovelAI 対応の呪文とネガティブプロンプト、ControlNet 連携まで徹底解説。',
  },
  'color': {
    seoTitle: '色プロンプト集【無料・コピペOK】髪色・服色・背景色の指定例｜Stable Diffusion 118色',
    seoH1: '色プロンプト集｜髪色・服色・背景色の指定例 + 色滲み対策 118 色',
    seoDescription: 'AI画像生成で色を思い通りに指定する無料プロンプト集。髪色・服色・背景色・パステル・ネオン 118 色以上の英語呪文を画像付き解説。Stable Diffusion・Midjourney・NovelAI 対応、BREAK・CutOff による色滲み（color bleeding）防止テクニックも紹介。コピペですぐ試せます。',
  },
  'anime': {
    seoTitle: 'アニメプロンプト集【呪文・コピペOK】｜キャラクターデザイン・画風・表情指定',
    seoH1: 'アニメプロンプト集｜キャラクター設計・画風・表情・アニメモデル活用',
    seoDescription: 'アニメスタイルのAI画像生成プロンプト集。アニメキャラクター設計・画風指定・表情描写のコツと、niji mode・Anything V5 など人気モデルの使い分けを画像付きで紹介。',
  },
  'hairstyle': {
    seoTitle: '髪型プロンプト集【無料・コピペOK】女性・ロング・ボブ・ツインテール｜AI画像生成',
    seoH1: '髪型プロンプト集｜女性キャラの髪型・髪色・髪質を自在にコントロール',
    seoDescription: '女性向け髪型プロンプトを無料でコピペできる例文集。ロング・ショート・ボブ・ポニーテール・ツインテール・髪色グラデーションを Stable Diffusion・Midjourney・NovelAI 対応の呪文で画像付き解説。「自分に似合う髪型・髪色を AI で試したい」方は無料の「似合う髪色診断 AI」もご利用ください。',
  },
  'costume': {
    seoTitle: 'コスチュームプロンプト集【呪文・コピペOK】｜和服・甲冑・アクセサリー・装飾品',
    seoH1: 'コスチューム・衣装プロンプト集｜和服・甲冑・ジュエリー・装飾品の呪文',
    seoDescription: 'コスチューム・衣装・装飾品プロンプトのコピペ集。和服・甲冑・ティアラ・チョーカーなど、Stable Diffusion で使えるキャラクター装飾の呪文を画像付きで多数紹介。',
  },
  'writing': {
    seoTitle: 'ライティングプロンプト集【ChatGPT・Claude対応】｜ブログ・コピー・メール文面',
    seoH1: 'ライティングプロンプト集｜ブログ記事・コピーライティング・メール文面',
    seoDescription: 'ChatGPT・Claude で使えるライティングプロンプト集。ブログ記事、コピーライティング、メール文面、小説執筆など高品質な文章を生成するテンプレートをコピペOKで多数紹介。',
  },
  'programming': {
    seoTitle: 'プログラミングプロンプト集【ChatGPT・Claude対応】｜コード生成・レビュー・デバッグ',
    seoH1: 'プログラミングプロンプト集｜コード生成・レビュー・デバッグ・リファクタリング',
    seoDescription: 'ChatGPT・Claude で使えるプログラミングプロンプト集。コード生成、バグ修正、コードレビュー、リファクタリングの実践テンプレートをコピペOKで紹介。',
  },
  'business': {
    seoTitle: 'ビジネスプロンプト集【ChatGPT・Claude対応】｜企画書・プレゼン・マーケティング',
    seoH1: 'ビジネスプロンプト集｜企画書・プレゼン・営業・マーケティング戦略',
    seoDescription: 'ChatGPT・Claude で使えるビジネスプロンプト集。企画書作成、プレゼン資料、営業メール、マーケティング戦略、データ分析のテンプレートをコピペOKで紹介。',
  },
  'education': {
    seoTitle: '教育プロンプト集【ChatGPT・Claude対応】｜学習計画・教材作成・問題生成',
    seoH1: '教育プロンプト集｜学習計画・教材作成・問題生成・概念解説',
    seoDescription: 'ChatGPT・Claude で使える教育プロンプト集。学習計画作成、練習問題生成、概念説明、英語学習など教育・学習を効率化するテンプレートをコピペOKで紹介。',
  },
  'creative': {
    seoTitle: 'クリエイティブプロンプト集【ChatGPT・Claude対応】｜アイデア発想・ストーリー・ネーミング',
    seoH1: 'クリエイティブプロンプト集｜アイデア発想・ストーリー・ブレスト',
    seoDescription: 'ChatGPT・Claude で使えるクリエイティブプロンプト集。アイデア発想、ストーリー執筆、ネーミング、ブレインストーミングのテンプレートをコピペOKで紹介。',
  },
  'camera': {
    seoTitle: 'カメラプロンプト集【無料・コピペOK】レンズ・構図・ライティング指定｜AI画像生成',
    seoH1: 'カメラアングル・構図・ライティングプロンプト集｜Stable Diffusion・Midjourney 撮影呪文 35 選',
    seoDescription: 'Stable Diffusion・Midjourney・NovelAI で使えるカメラ・構図・ライティングプロンプト 35 選。クローズアップ・俯瞰・ローアングル・ハイアングル・シネマティック撮影、スタジオライティング・自然光・逆光・ゴールデンアワーの呪文を画像付きで紹介。無料コピペで動作確認済み。',
  },
  'photo-edit': {
    seoTitle: 'AI写真加工プロンプト集【コピペOK】｜壁紙・髪色シミュレーション・配色・背景削除',
    seoH1: 'AI写真加工プロンプト集｜壁紙シミュレーション・髪色変更・配色・背景削除・証明写真',
    seoDescription: 'AI写真加工プロンプトのコピペ集。壁紙・インテリア配色シミュレーション、髪色変更、家外壁色、背景透過/削除、証明写真、プロフィール写真レタッチ、服装着せ替え、美肌加工を Gemini 2.5 Flash Image・Nano Banana・ChatGPT 対応プロンプトで実例付き紹介。',
  },
}

// Long-form category intros (~600-800 chars each) for SEO content depth.
// Rendered on /prompts/[category] pages above the existing "コツ" section.
export interface CategoryIntro {
  intro: string
  useCases: string[]
  tips: string[]
  /** Optional FAQ — when present, renders a collapsible FAQ section + FAQPage JSON-LD */
  faqs?: { question: string; answer: string }[]
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
    faqs: [
      { question: '女性向け髪型プロンプトのおすすめは？', answer: 'ロング系（long hair, very long hair, waist-length hair）、ツインテール系（twin tails, low twin tails）、ボブ・ショート系（short bob, pixie cut）、アップスタイル（ponytail, bun, double bun）の 4 グループを覚えておくと、ほぼすべての女性キャラ髪型がカバーできます。「1girl, [長さ], [スタイル], [色], [質感]」の順で書くと AI の解釈が安定します。' },
      { question: '髪型プロンプトは ChatGPT でも使えますか？', answer: 'ChatGPT 自体は画像生成ができませんが、DALL-E 3（ChatGPT の画像生成機能）や Gemini 2.5 Flash Image、Midjourney、Stable Diffusion で使えます。本ページの英語プロンプトはすべて Stable Diffusion・NovelAI 用の構文ですが、DALL-E に渡す場合は自然な英文章に書き換えると認識率が上がります（例: "A girl with long wavy blonde hair tied in a ponytail"）。' },
      { question: '自分に似合う髪型・髪色を AI で試せますか？', answer: 'はい。当サイトの「似合う髪色診断 AI」では、写真 1 枚で AI があなたのパーソナルカラーに合う髪色を 5 候補提案し、Gemini 2.5 Flash Image で Before/After シミュレーション画像を生成します。Google ログインで 3 回無料、写真は保存されません。' },
      { question: '前髪・もみあげ・後れ毛の細かい指定方法は？', answer: '前髪は「blunt bangs（ぱっつん）」「side-swept bangs（流し前髪）」「curtain bangs（センター分け）」「hime cut（姫カット）」など。もみあげは「sideburns, short sideburns」、後れ毛は「stray hair, hair strands」と書きます。これらは省略されがちなので (blunt bangs:1.2) のように重み付けすると確実です。' },
      { question: '髪色プロンプトと色滲み対策は？', answer: '基本色は blonde / brunette / black hair / red hair / silver hair / blue hair / pink hair。グラデーションは「gradient hair, pink to blue」、メッシュは「streaked hair, blonde with pink highlights」。複数キャラや服色と髪色が混ざる「color bleeding」を防ぐには BREAK 構文（「red hair BREAK blue dress」）または CutOff 拡張機能で領域固定が有効です。' },
      { question: 'ロング・ボブ・ショートの違いを画像で比較したい', answer: '本ページの 50+ 例文を順番にコピペして、同じプロンプトの「[hair length]」部分だけ差し替えると、AI の挙動が比較できます。Stable Diffusion・NovelAI ともにシードを固定（seed: 12345）すると、長さ以外を完全一致させて比較画像が作れます。' },
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
    faqs: [
      { question: '女性向け服装プロンプトのおすすめは？', answer: '日常系（T-shirt, jeans, hoodie, casual dress）、フォーマル系（cocktail dress, evening gown, business suit）、制服系（school uniform, sailor uniform, office uniform）、コスチューム系（maid outfit, kimono, traditional dress）の 4 ジャンルを覚えると、ほぼすべてカバーできます。「1girl, [トップス], [ボトムス], [足元], [アクセサリー]」の順で書くと AI が解釈しやすくなります。' },
      { question: 'メイド服プロンプトの書き方は？', answer: '基本構文は「maid outfit, white apron, black dress, frilled headdress, knee-high socks, mary jane shoes」。クラシック寄りは「victorian maid outfit, long black dress」、現代寄りは「modern maid uniform, short dress」と書き分けます。コスプレ調なら「moe maid costume, anime style」、リアル調なら「professional maid uniform, photorealistic」と質感タグを補強してください。' },
      { question: 'ビジネススーツ・OL ファッションのプロンプトは？', answer: '「business suit, blazer, pencil skirt, blouse, stockings, high heels, office worker」が定番。色指定は「navy business suit」「grey pencil skirt」のように形容詞として書きます。OL リアル系では「Japanese office lady, formal suit, hair tied back, no excessive makeup, daylight office setting」が高品質。男性スーツは「business suit, tie, dress shirt, leather shoes, briefcase」。' },
      { question: '色違いの服装で色滲み（color bleeding）を防ぐには？', answer: '複数の色を指定すると Stable Diffusion では色が混ざってしまうことがあります。「red dress BREAK blue jacket」のように BREAK で分割するか、CutOff 拡張機能で「red:dress || blue:jacket」と領域ごとに色を固定すると安定します。Attention ウェイトと組み合わせて「(red dress:1.2) BREAK (blue jacket:1.2)」がさらに確実です。' },
      { question: '服装プロンプトはコスプレや衣装と何が違う？', answer: '本ページの「服装」は日常〜フォーマル〜カジュアル全般、「コスプレ」は特定キャラ・作品の衣装再現（セーラー服・メイド服・ナース服）、「衣装（コスチューム）」は和服・甲冑・装飾品など特殊系を扱います。一般的なドレス・スーツ・制服を探すなら本ページ、特定キャラのコスチュームは「コスプレ」、和服・甲冑は「衣装」をご覧ください。' },
      { question: 'ファンタジー衣装プロンプトの書き方は？', answer: '「medieval armor, knight plate, chainmail」が騎士系、「mage robe, wizard hat, magical staff」が魔法使い系、「elf tunic, leather boots, archer quiver」がエルフ系、「dark sorceress dress, gothic ornaments」が女魔法使い系。Stable Diffusion なら ChilloutMix・RealisticVision、Midjourney なら「--style raw --ar 2:3」がファンタジー衣装の写実度を上げます。' },
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
    faqs: [
      { question: 'AI コスプレプロンプトとは何ですか？', answer: 'AI 画像生成で特定のキャラクターやコスチュームのルックを再現するための呪文（プロンプト）です。Stable Diffusion・Midjourney・NovelAI で「sailor uniform（セーラー服）」「maid outfit（メイド服）」「miko costume（巫女装束）」のような英語キーワードをカンマ区切りで組み合わせて記述します。' },
      { question: 'キャラクター名を直接書いても大丈夫ですか？', answer: '著作権リスクがあるためお勧めしません。「miku hatsune cosplay」のように作品名・キャラ名を直接入れる方法もありますが、衣装の構成要素を分解して記述する方が安全かつ汎用的です。例: 「twin teal hair, school uniform, tie, headphones」のように特徴を分解すれば「それっぽい」コスプレ画像が得られます。' },
      { question: 'Stable Diffusion と NovelAI、どちらがコスプレに向いていますか？', answer: 'リアル系の実写コスプレ写真は Stable Diffusion（ChilloutMix・BeautifulRealistic 系モデル）が、アニメ調のコスプレイラストは NovelAI または Anything V5 / Counterfeit / niji 5 が得意です。Midjourney は「--ar 2:3 --style raw」で人物コスプレ写真に最適化できます。' },
      { question: 'コスプレ衣装のディテールが消えないようにするには？', answer: '重要パーツに「(sailor collar:1.2), (pleated skirt:1.3), (knee-high socks:1.1)」のように重み付け（1.1〜1.3 範囲）を散らすのがコツです。それでも消える場合は BREAK 構文で「[上着] BREAK [下] BREAK [足元]」と要素を分離します。1.4 を超えると画像全体が崩壊するので注意してください。' },
      { question: 'コスプレ写真の品質を上げる呪文は？', answer: '「professional cosplay photo, studio lighting, DSLR camera, sharp focus, detailed costume」を品質タグとして併用すると、プロカメラマンが撮影したような仕上がりになります。ネガティブに「low quality cosplay, fake wig, bad anatomy, blurry」を必ず入れてください。' },
      { question: '武器や小物（剣・刀・銃など）はどう指定しますか？', answer: '「holding [item]」と明示すると認識率が大幅に上がります。例: 「holding katana, samurai armor」「holding magical staff, wizard robe」。さらに（holding:1.2, katana:1.3）のような重み付けや、ControlNet（OpenPose）でポーズを固定するのも有効です。' },
      { question: 'コスプレプロンプトは商用利用できますか？', answer: 'Prompta に掲載しているプロンプトはすべて無料・商用利用可能です。ただし、生成画像が既存キャラクターに似すぎる場合は著作権・肖像権の問題が発生する可能性があるため、商用利用前に必ず確認してください。汎用的な構成要素プロンプト（衣装の特徴を分解したもの）の方が安全です。' },
      { question: 'コスプレ衣装のデザイン案を出すのに最適なプロンプトは？', answer: '「あなたはコスプレ衣装デザイナーです。○○（テーマ）をモチーフに、オリジナル衣装のデザイン案を 5 つ、各案に主要素材・色・小物を含めて提案してください」のような構成が効果的です。詳しいプロンプト書き方は<a href="/guides/cosplay-prompt-guide" class="text-sky-600 hover:underline">コスプレプロンプトの書き方ガイド</a>を参照してください。' },
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
    faqs: [
      { question: '髪色プロンプトの基本的な指定方法は？', answer: '基本色は blonde / brunette / black / red / silver / blue / pink hair。グラデーションは「gradient hair, pink to blue」「ombre hair, dark roots to light tips」、メッシュは「streaked hair, blonde with pink highlights」、インナーカラーは「inner color hair, black with hidden red」。「自分に似合う髪色を AI で試したい」方は当サイトの「似合う髪色診断 AI」（Google ログインで 3 回無料）もご利用ください。' },
      { question: '服色（衣装の色）を正確に指定するには？', answer: '「red dress」「navy blazer」「emerald green skirt」のように形容詞として書きます。複数の服に別々の色を指定すると色が混ざる「color bleeding」が起きやすいので、BREAK 構文（「red dress BREAK blue jacket」）か CutOff 拡張機能（「red:dress || blue:jacket」）で領域固定するのが安全です。Attention ウェイト併用（(red dress:1.2) BREAK (blue jacket:1.2)）でさらに安定します。' },
      { question: '背景色だけを指定するには？', answer: '「plain white background」「pure black background」「gradient sunset background, orange to pink」のように指定。被写体と背景の色を分離したい場合は「subject: girl in red, BREAK background: blue gradient」のように BREAK で完全分離します。スタジオ風には「seamless backdrop, studio background」、グラデーション系は「gradient background, [start color] to [end color]」が定番。' },
      { question: 'パーソナルカラーに合った色を AI でみつけたい', answer: '当サイトの「パーソナルカラー診断 AI」では、写真 1 枚で AI が 4 シーズン（春・夏・秋・冬）を判定し、似合う 16 色（服・口紅・髪色・アクセサリー）を提案します。Google ログインで 3 回無料で利用可能。各シーズンの完全ガイド（春 / 夏 / 秋 / 冬）も別ページにあります。' },
      { question: '色滲み（color bleeding）が起きる仕組みと対策は？', answer: 'Stable Diffusion は近接した単語を関連付けて処理するため、「red dress, blue jacket」のように複数色を併記すると色が混ざる「color bleeding」が発生します。対策は ① BREAK 構文で分割、② CutOff 拡張機能で領域分離、③ Attention ウェイト併用、④ ControlNet の Color Map で色配置を物理固定、の 4 段階。CFG スケールを 8-12 に上げると色の解釈が強化されます。' },
      { question: 'パステル・ネオン・モノクロなど特殊な色調を出すには？', answer: '全体トーンを最初に書きます。「pastel colors, soft palette」「neon colors, vivid」「monochrome black and white」「sepia tones, vintage」のような形容詞句を冒頭に置くと、AI が全体カラースキームを統一しやすくなります。「cinematic color grading, film grain」を追加すると映画的な色合いに、「watercolor palette, soft washes」で水彩風になります。' },
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
    faqs: [
      { question: 'カメラアングル・構図プロンプトの基本指定方法は？', answer: '基本は「[アングル], [距離], [構図]」の 3 要素。アングルは「low angle（ローアングル）」「high angle（ハイアングル）」「bird-eye view（俯瞰）」「dutch angle（傾き）」。距離は「close-up（クローズアップ）」「medium shot（ミディアム）」「full body（全身）」「wide shot（広角）」。構図は「rule of thirds（三分割法）」「centered composition（中央構図）」「leading lines（リーディングライン）」を組み合わせます。' },
      { question: 'ライティングプロンプトの種類と使い分けは？', answer: '主要なライティングは ① natural light（自然光）、② studio lighting（スタジオライティング）、③ rim lighting（リムライト・逆光）、④ cinematic lighting（映画的照明）、⑤ golden hour（ゴールデンアワー）、⑥ blue hour（青の時間）、⑦ neon lighting（ネオン）、⑧ candlelight（キャンドルライト）。シネマティックさを出すには「dramatic lighting, depth of field, volumetric light」を組み合わせるのが定番です。' },
      { question: 'シネマティックな写真風プロンプトを作るには？', answer: '「cinematic photography, film grain, anamorphic lens, dramatic lighting, depth of field, 35mm film, kodak portra」を組み合わせると映画ワンシーン風の質感になります。Midjourney は「--ar 2:3 --style raw --stylize 250」、Stable Diffusion は ChilloutMix・RealisticVision 系モデルが向いています。「cinematic color grading, teal and orange」で映画的なカラーグレーディングも可能。' },
      { question: '俯瞰・ローアングルなど特殊アングルが反映されない', answer: '重み付けを上げてください。「(low angle:1.3)」「(bird-eye view:1.4)」のように 1.3 以上の強調が必要です。それでも反映されない場合は ControlNet（OpenPose・Depth）で参照画像のカメラ位置を物理固定するのが確実。Midjourney は「--ar 9:16」（縦長）でローアングル感が出やすく、「--ar 16:9」（横長）で俯瞰感が強調されます。' },
      { question: '実機材名（Sony・Canon・35mm レンズ）を書く効果は？', answer: 'Midjourney では実機材名が非常に強力で、「Sony A7 IV, 50mm f/1.4 lens, ISO 200」と書くだけで一気にプロカメラマン風になります。Stable Diffusion でも一定の効果があり、「shot on Canon EOS R5, 85mm portrait lens, shallow depth of field」のように具体化すると質感が向上。逆に DALL-E 3 では機材名はあまり効かないため、ライティング・構図の言葉で代替してください。' },
      { question: 'ポートレート写真のおすすめプロンプトは？', answer: '基本テンプレート: 「professional portrait photography, soft natural light from the side, shallow depth of field, blurred background, [被写体]、85mm lens, eye-level angle, sharp focus on eyes」。ビジネス用途なら「LinkedIn profile photo, neutral background, formal lighting」、芸術系なら「fine art portrait, dramatic chiaroscuro lighting」、ファッション系なら「Vogue editorial photography, dramatic pose」を組み合わせます。' },
    ],
  },

  'photo-edit': {
    intro:
      'AI写真加工プロンプトは、あなたがアップロードした実際の写真を AI に編集させるための「指示文」です。AI 画像生成（テキストから新規生成）とは区別される領域で、**Google Gemini 2.5 Flash Image（通称 Nano Banana）/ ChatGPT の画像編集機能 / DALL-E 3 inpainting** などが代表的なツール。「服を別のスタイルに着せ替える」「背景を削除する」「壁の色を変える」「白黒写真をカラー化する」といった作業を、Photoshop を開かずに自然文の指示だけで実行できます。\n\n【3 大ツールの使い分け】\n- **Gemini 2.5 Flash Image (Nano Banana)** — 最も柔軟で精度が高い。識別保持（ID preservation）に強く、人物の顔・骨格を残したまま服装/髪型/背景を変えるのが得意。本サイトのプロンプトは Gemini で動作確認済み。\n- **ChatGPT 画像編集** — Gemini と並ぶ実用ツール。証明写真・プロフィール写真生成は ChatGPT の方が安定する傾向。長文プロンプトに強い。\n- **DALL-E 3 inpainting** — 部分マスク指定での編集が可能。ホクロ除去・小さな修復に向く。\n\n【7 大ユースケース】(1) **壁紙・インテリア配色シミュレーション** — リフォーム前の DIY 検討。(2) **髪色変更シミュレーション** — 美容院予約前の試着。(3) **証明写真・パスポート写真 AI 生成** — 自撮りからフォーマル写真へ。(4) **プロフィール写真・LinkedIn ヘッドショット** — ビジネス用途。(5) **服装着せ替え（参照画像から移植）** — EC・ファッション提案。(6) **背景透過・置換・削除** — 商品撮影・人物切り抜き。(7) **白黒写真カラー化・古写真修復** — 家族写真のレストア。\n\n【効くプロンプト 5 大原則】① **「アップロードした写真の **だけ** を編集」を明示** — 「Edit only the X of the uploaded photo」と書き、AI が全体を再生成しないよう制御。② **保持要素を列挙** — 「Keep the person\'s identity, eye shape, jawline, hair length, pose, background exactly」と保持事項を全部書く。③ **目標を具体的に** — 色は HEX 指定（#A8B89A）、服装は素材まで（cotton, knit）、髪色は CIELab 系（cool ash brown, warm honey blonde）。④ **「Do not regenerate from scratch」** — 既存ピクセル上で操作することを明示。⑤ **出力解像度を指定** — 「Output at the original resolution, photorealistic and natural-looking」で品質を担保。\n\n【Nano Banana の能力境界】Gemini 2.5 Flash Image でも難しい領域があります: **(a) 透明 PNG 生成不可** — 背景透過用途は remove.bg / Photoroom を推奨。**(b) 大幅な構造変更は識別崩壊** — 「年代変身（50 年後）」「ジブリ風変換」など整図再描画が必要なものは顔が変わりがち。**(c) 集合写真の特定人物だけ削除** — 周囲のピクセル復元が完璧でないため、痕跡が残ることが多い。サイト内の各プロンプト詳細ページで Before/After サンプルを公開しているため、実際の挙動を確認したうえで利用ください。',
    useCases: [
      '部屋の壁紙・配色シミュレーション（リフォーム前 DIY 検討）',
      '髪色変更シミュレーション（美容院予約前の試着）',
      '証明写真・パスポート写真の AI 生成（マイナンバー・運転免許用）',
      'プロフィール写真・LinkedIn ヘッドショットの整え',
      '服装の着せ替え・参照画像からの移植（EC・ファッション提案）',
      '背景透過・背景置換・不要物除去',
      '白黒写真のカラー化・古写真の修復',
      '美肌レタッチ・ホクロ除去（識別保持型の小修正）',
    ],
    tips: [
      '「Edit only the X of the uploaded photo」で AI に全体再生成を防止',
      '保持する要素（顔・骨格・髪型・背景・ポーズ）は冗長でも全部書く',
      '色は HEX、素材は具体名、髪色は CIELab 系で曖昧さを排除',
      '「Do not regenerate from scratch — operate on existing pixels」で識別を保護',
      '透明 PNG / 大幅な構造変更は Gemini 苦手。詳細ページの Before/After サンプルで挙動確認してから使う',
    ],
  },

  // ========== テキスト系カテゴリ (5) ==========
  'writing': {
    intro:
      'ライティング向けAIプロンプトは、ChatGPT・Claude・Geminiで高品質な文章を生成するための指示文設計テクニックです。単に「ブログを書いて」と頼むだけでは汎用的な文章しか得られませんが、役割設定（あなたはプロの編集者です）、対象読者、文体（です・ます調 / である調）、文字数、構成（見出し付き / 結論先出し）を明示することで、AIの出力品質は劇的に変わります。米国の調査では、適切なプロンプト設計でライティング業務の効率が 2〜5 倍に向上したという報告も多く、すでに業務必須スキルになりつつあります。\n\n【ライティング系プロンプトの 5 つの構成要素】効率的な文章生成プロンプトは、(1) ロール設定（「あなたは 30 代女性向け美容ブログの編集者です」）、(2) 対象読者（「シミに悩む 40 代女性」）、(3) 目的（「商品の魅力を伝える」「専門知識を平易に説明する」）、(4) 文体・トーン（「カジュアル」「フォーマル」「親近感ある語り口」）、(5) 構成・字数（「H2 を 3 つ・全体 1500 字・結論先出し」）の 5 要素で構成します。これらをテンプレ化すれば、毎回ゼロから書く負担がなくなります。\n\n【Few-Shot プロンプティングで文体を再現する】Few-Shot は理想の文章サンプルを 2〜3 例先に示してから本題を依頼する手法で、抽象的なルール定義よりも遥かに高い精度で文体を再現できます。例えば「以下の 3 つの記事タイトルの語感を真似て、新作の美容クリームの記事タイトル案を 10 個」のように、参考例で語感や雰囲気を伝えると、AIは思考のテンプレートを学習します。サンプルは質の高いものを少数提示する方が、低質な例を大量に渡すより効果的です。\n\n【コピーライティングフレームワーク（AIDA / PAS / 4U）の活用】商品紹介・LP・広告コピーには確立されたフレームワークがあり、AI への指示でこれらを直接呼び出せます。AIDA（Attention 注目→ Interest 興味→ Desire 欲求→ Action 行動）、PAS（Problem 問題提起→ Agitation 煽り→ Solution 解決）、4U（Urgent 急ぎ・Useful 有益・Unique 独自・Ultra-Specific 超具体）。プロンプトに「PAS の流れで」「AIDA フレームワークで」と書くだけで構造化された原稿が得られます。\n\n【ChatGPT・Claude・Gemini の使い分け】ライティングタスクでは各 AI に得意領域があります。ChatGPT は創造的なライティング（ストーリー・キャッチコピー・アイデア発想）に強く、Claude は長文の精緻な要約・論理的な解説・編集校正に優れ、Gemini はマルチモーダル（参考画像と一緒に指示する）と長文（最大 1M トークン）対応が強み。複数 AI を併用して下書き → 校正 → 仕上げ のパイプラインを作ると最強です。\n\n【SEO ライティングへの応用】検索流入を狙うブログ記事には、見出し階層・キーワード密度・読了時間を意識したプロンプトが必要です。「H1・H2 を SEO キーワード『○○ 書き方』中心に組み立て、専門用語は初出で簡単な定義を添え、自然な文章で 2500 字書いてください」のように指示すると、AI は SEO 要件を踏まえた構造で書いてくれます。タイトル候補・メタディスクリプション・FAQ も同時に出力させるとワンストップで完成します。',
    useCases: [
      'ブログ記事・SEO 記事の執筆支援',
      'コピーライティング・LP の本文作成',
      'メール文面・営業文の高速ドラフト',
      '小説・シナリオのプロット組み立て',
      '広告コピー・キャッチフレーズの大量バリエーション生成',
      'SNS 投稿文（X・Instagram・LinkedIn）の最適化',
    ],
    tips: [
      'ロール設定 → 対象読者 → 文体 → 文字数 → 構成の 5 点を明示する',
      'Few-Shot（参考例 2〜3 つ）で文体・トーンを教え込む',
      'AIDA / PAS / 4U などコピーライティングフレームワークを直接呼び出す',
      '「Step by Step で考えてください」で論理を引き出す',
      '出力後に「もっと自然に」「もっと簡潔に」と段階的に修正させる',
      'SEO 記事は H2 構造とキーワード密度を含めて指示する',
    ],
    faqs: [
      { question: 'AI ライティングプロンプトとは何ですか？', answer: 'ChatGPT・Claude・Gemini などの AI に文章作成を依頼するときに使う「指示文」のことです。役割設定・対象読者・文体・字数・構成の 5 要素を明示することで、AI の出力品質は単に「書いて」と頼んだ場合と比べて 2〜5 倍向上することが報告されています。' },
      { question: 'ライティングプロンプトでブログ記事を書く方法は？', answer: '「あなたは○○分野の専門ブロガーです。30 代の働く女性をターゲットに、SEO キーワード『シミ ケア』を含めて 1500 字のブログ記事を H2 を 3 つ立てて書いてください。結論先出しで、専門用語には簡単な定義を添えてください」のように、ロール・読者・目的・構成・字数・トーンを揃えて指示するのが基本です。詳しい書き方は<a href="/guides/prompt-writing-guide" class="text-sky-600 hover:underline">プロンプトの書き方完全ガイド</a>を参照してください。' },
      { question: 'AI で書いた記事は SEO に有効ですか？', answer: 'はい、適切に書かれた AI 記事は SEO に有効です。Google は 2024 年以降「コンテンツの作成者（人 / AI）」より「有用性・専門性」を評価する方針を明示しており、AI 生成記事でも実用情報を含めば検索順位は上がります。ただし、ファクトチェック・独自視点の追加・最新情報の補完は必要です。' },
      { question: 'ChatGPT・Claude・Gemini どれがライティングに最適ですか？', answer: 'タスクによって異なります。創造的ライティング（キャッチコピー・小説・アイデア発想）は ChatGPT、長文の論理的な解説・編集校正は Claude、マルチモーダル（画像参照）と超長文の取り回しは Gemini が得意です。複数 AI を併用して「下書き → 校正 → 仕上げ」パイプラインを組むのが最強です。' },
      { question: 'コピーライティングで使える AI プロンプトテンプレートは？', answer: 'AIDA（Attention → Interest → Desire → Action）・PAS（Problem → Agitation → Solution）・4U（Urgent / Useful / Unique / Ultra-Specific）が定番です。「PAS の流れで、シミに悩む 40 代女性向けに新作美容クリームの広告コピーを 200 字で」のように、フレームワーク名を直接プロンプトに含めると構造化された原稿が得られます。' },
      { question: 'AI 文章を自然に仕上げるコツは？', answer: '初回出力をベースに「もっと自然に」「もっと簡潔に」「○○のトーンに寄せて」と追加指示する反復改善が最強です。Few-Shot で理想のサンプルを 2〜3 個渡しておくと、初回から目的の文体に近づきます。最終確認は必ず人間が行い、敬語の自然さや業界慣習との整合性をチェックしてください。' },
      { question: 'AI ライティングプロンプトを業務で共有・管理するには？', answer: '少人数なら .md ファイルで Git 管理、規模が大きくなれば Notion・Confluence・PromptLayer などの専用ツールに移行します。重要なのは「変数化（{topic} {audience} {tone}）」「メタデータ（成功例・失敗パターン）」「バージョン履歴」の 3 点です。プロンプトは資産なので継続投資が業務効率の長期差につながります。' },
      { question: 'Prompta のライティングプロンプトは無料で使えますか？', answer: 'はい、Prompta に掲載しているすべてのライティングプロンプトは無料でコピー・商用利用可能です。生成された記事の著作権は通常利用者に帰属しますが、AI ツール本体の利用規約（OpenAI / Anthropic / Google）にも従ってください。' },
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
    title: 'プロンプトとは？意味・書き方・コツを徹底解説【AI初心者向け完全ガイド】',
    description: 'プロンプトの意味から書き方の5つのコツ、よくある失敗例、業務活用事例まで網羅した完全ガイド。ChatGPT・Claude・Gemini・Stable Diffusion・Midjourney・DALL-E対応の具体例つきでAIプロンプトを基礎から実践まで学べます。',
    targetKeyword: 'プロンプトとは',
    monthlySearchVolume: 49500,
  },
  {
    slug: 'stable-diffusion-prompt-guide',
    title: 'Stable Diffusion プロンプト 書き方ガイド【呪文・コピペOK】｜品質タグ・構図・ネガティブ実例',
    description: 'Stable Diffusion で美しい画像を生成するプロンプト書き方の完全ガイド。品質タグ、構図、スタイル指定、ネガティブプロンプト、BREAK・LoRA 連携まで、コピペで使える呪文と実例を画像付きで徹底解説。初心者の基礎から応用テクニックまで。',
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
    title: '体型・身長差プロンプト 完全ガイド【コピペOK】｜Stable Diffusion スレンダー・筋肉質・ぽっちゃり・体格差',
    description: 'Stable Diffusion で体型・身長差・体格差を自在にコントロールするプロンプト完全ガイド。スレンダー・アスレチック・ぽっちゃり・小柄・高身長・身長差の指定方法と重み付けテクニックを画像付きで解説。コピペで再現可能。',
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
  {
    slug: 'prompt-writing-guide',
    title: 'プロンプトの書き方完全ガイド｜効果的なAIプロンプト作成の7つのコツとテンプレート集',
    description: 'ChatGPT・Claude・Gemini・Stable Diffusion対応のプロンプト書き方完全ガイド。7つのコツ、コピペで使えるテンプレート、ツール別の違い、NG例と改善方法、業務活用例まで実践的に解説。',
    targetKeyword: 'プロンプト 書き方',
    monthlySearchVolume: 5400,
  },
  {
    slug: 'personal-color-hair-color',
    title: 'パーソナルカラー別 似合う髪色完全ガイド｜春・夏・秋・冬タイプの推奨ヘアカラー',
    description: 'パーソナルカラー（春・夏・秋・冬）別に似合う髪色を完全解説。イエベ・ブルベの違い、ブリーチの要不要、美容院オーダーのコツまで網羅。写真 1 枚で AI 診断できる「似合う髪色診断 AI」（無料 3 回）への案内付き。',
    targetKeyword: 'パーソナルカラー 髪色',
    monthlySearchVolume: 5400,
  },
  {
    slug: 'gemini-prompt-collection',
    title: 'Geminiプロンプト集【用途別・無料コピペOK】画像生成・文章作成・SEO・学習活用 50+ 例文',
    description: 'Google Gemini 2.5 で使えるプロンプトを用途別に 50+ 例文収録。画像生成（Nano Banana）・文章作成・SEO・写真加工・学習・仕事効率化まで、コピペですぐ使える無料テンプレートと Gemini 独自機能の活用法を解説。',
    targetKeyword: 'gemini プロンプト 一覧',
    monthlySearchVolume: 1300,
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
  'prompt-writing-guide': {
    tools: ['chatgpt', 'claude', 'gemini', 'stable-diffusion', 'midjourney', 'dall-e'],
    categories: ['writing', 'programming', 'business', 'education', 'creative'],
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

// Per-tool extended SEO content. Add an entry to give a tool page a long-form
// intro, use cases, tips, and FAQ schema. Tools without an entry render the
// default [tool] template only.
export interface ToolPageContent {
  /** Override for <title> + H1 keyword line. If absent, fall back to "{Tool}プロンプト集..." default. */
  seoTitle?: string
  seoDescription?: string
  /** Long-form intro block between hero and prompt grid */
  intro: {
    heading: string
    paragraphs: string[]
  }
  useCases: {
    heading: string
    items: { name: string; desc: string }[]
  }
  tips: {
    heading: string
    items: { name: string; desc: string }[]
  }
  faqs: { question: string; answer: string }[]
}

export const TOOL_PAGE_CONTENT: Record<string, ToolPageContent> = {
  chatgpt: {
    seoTitle: 'ChatGPTプロンプト集｜業務で使える厳選テンプレートとコツ',
    seoDescription: 'ChatGPT向けの実用プロンプトを無料公開。文章作成・コード生成・要約・アイデア出しなど業務で使えるテンプレート集と効果的な書き方のコツ、GPT-5新機能の活用法を解説。',
    intro: {
      heading: 'ChatGPTプロンプトとは？— OpenAI ChatGPTを使いこなすための指示文',
      paragraphs: [
        'ChatGPTプロンプトとは、OpenAIが提供する対話型AI「ChatGPT」に与える指示文のことです。プロンプトの質によって、文章作成・要約・翻訳・コード生成・アイデア出しなど、あらゆるタスクの出力品質が大きく変わります。',
        'ChatGPTは2022年11月の公開以来、日本でも数千万人が利用する主要AIツールとなり、無料版（GPT-4o mini）でも実用的なタスクをこなせるレベルに到達しています。ただし、AI から良い結果を引き出すには「ロール設定」「具体的な背景情報」「出力形式の指定」など、プロンプトエンジニアリングの基本テクニックを意識する必要があります。',
        'Promptaでは、ビジネス・ライティング・プログラミング・教育・クリエイティブなどシーン別に、ChatGPTで実際に使えるプロンプトを多数公開しています。コピペするだけですぐに業務に活用できる実用テンプレートを揃えています。',
      ],
    },
    useCases: {
      heading: 'ChatGPTプロンプトの代表的な活用シーン',
      items: [
        { name: 'ビジネス文書作成', desc: 'メール・議事録要約・提案書・お詫び文・FAQ作成など、定型業務を2〜5倍速化。' },
        { name: 'プログラミング支援', desc: 'コード生成・リファクタリング・バグ調査・テストケース生成・技術ドキュメント作成。' },
        { name: 'ライティング・編集', desc: 'ブログ記事下書き・SNS投稿文・キャッチコピー大量生成・文章校正。' },
        { name: 'マーケティング・営業', desc: 'ターゲットペルソナ設計・広告コピーA/Bテスト案・競合分析レポート。' },
        { name: '教育・学習', desc: '概念説明の言い換え・練習問題自動作成・英会話練習相手・専門書の要約。' },
        { name: 'アイデア発想', desc: 'ブレスト・ネーミング・ストーリー構成・企画書のたたき台生成。' },
      ],
    },
    tips: {
      heading: 'ChatGPTで効果的なプロンプトを書く5つのコツ',
      items: [
        { name: 'ロールを設定する', desc: '「あなたは○○の専門家です」と冒頭で役割を与えると、専門性の高い回答が得られます。職種＋経験年数＋対象を組み合わせるとさらに精度向上。' },
        { name: '具体的な背景情報を渡す', desc: '対象読者・目的・利用シーンを明示します。「30代女性向け」「社内研修資料として」など、文脈を共有することで的外れな回答を防げます。' },
        { name: '出力形式を指定する', desc: '「箇条書きで5つ」「比較表で」「Markdown形式で」のように、後工程で使いやすい形を指定します。' },
        { name: '例示する（Few-Shot）', desc: '「Input: A → Output: B」のように、期待する入出力ペアを1〜3個提示すると、抽象的なルール定義よりも遥かに高い精度を得られます。' },
        { name: '段階指示する（Chain of Thought）', desc: '複雑なタスクには「ステップバイステップで考えてください」を追加すると、論理推論精度が大幅に向上します。' },
      ],
    },
    faqs: [
      { question: 'ChatGPTのプロンプトとは何ですか？', answer: 'ChatGPTに対して入力する「指示文」のことです。「メールを書いて」のような短い指示から、ロール設定・背景情報・出力形式を含む詳細な指示まで、すべてプロンプトと呼びます。プロンプトの質によってAIの出力品質が大きく変わるため、効果的な書き方を学ぶことが重要です。' },
      { question: 'ChatGPTで効果的なプロンプトの書き方は？', answer: '(1) ロールを設定する「あなたは○○の専門家です」、(2) 具体的な背景情報を渡す、(3) 出力形式を指定する、(4) 例示する（Few-Shot）、(5) 段階指示する（Chain of Thought）の5つが基本です。詳しくは<a href="/guides/prompt-writing-guide" class="text-sky-600 hover:underline">プロンプトの書き方完全ガイド</a>と<a href="/guides/chatgpt-prompt-techniques" class="text-sky-600 hover:underline">ChatGPTプロンプト術</a>をご覧ください。' },
      { question: 'ChatGPT プロンプトテンプレートはどこで入手できますか？', answer: 'Promptaでは、文章作成・コード生成・要約・アイデア出しなど、業務カテゴリ別に実用プロンプトテンプレートを無料公開しています。コピペで即実践できる形式で整備しています。テンプレート設計のコツは<a href="/guides/prompt-writing-guide" class="text-sky-600 hover:underline">プロンプトの書き方完全ガイド</a>で解説しています。' },
      { question: 'ChatGPTは日本語のプロンプトに対応していますか？', answer: 'はい、ChatGPTは日本語プロンプトに完全対応しています。GPT-4o以降のモデルは、日本語特有の敬語・ビジネス慣習も理解できるため、英語で書く必要はありません。ただし、専門的な技術文書やコード生成のときは英語の方が精度が出やすい場合もあります。' },
      { question: 'ChatGPTのプロンプトは無料で使えますか？', answer: 'Promptaに掲載しているChatGPTプロンプトはすべて無料でコピー・利用可能です。商用利用も自由ですが、生成された結果物の利用条件はOpenAIの利用規約に従ってください。ChatGPT本体の利用は、無料版（GPT-4o mini中心）と有料版（ChatGPT Plus/Pro/Team/Enterprise）が選べます。' },
      { question: 'ChatGPTとClaudeでプロンプトの書き方は違いますか？', answer: '基本テクニック（ロール設定・出力形式指定・Few-Shot）は共通ですが、ChatGPTはシステムプロンプト（カスタム指示）でグローバル設定を、Claudeは<context>や<task>などXMLタグで構造化するスタイルが特に効果的です。長文の文脈理解はClaudeが、創造的ライティングとコード生成はChatGPTがそれぞれ強みを持ちます。' },
      { question: 'GPT-5でプロンプトの書き方は変わりますか？', answer: 'GPT-5は長文理解・推論・マルチモーダル能力が向上していますが、基本テクニックは変わりません。むしろ高性能モデルほど、長すぎるプロンプトより簡潔で明確な指示の方が良い結果を引き出せる傾向があります。「対話で改善していく」アプローチがGPT-5世代でも有効です。' },
      { question: 'ChatGPTプロンプトをチームで共有・管理するには？', answer: '小規模なら .md ファイルでGit管理、規模が大きくなればNotion・Confluence・PromptLayer・LangChain などの専用ツールに移行します。重要なのは「変数化」「メタデータ追加」「バージョン履歴」の3点です。Promptaのような共有プラットフォームを社内・個人で使うのも有効です。' },
    ],
  },
  gemini: {
    seoTitle: 'Geminiプロンプト集｜Google Gemini 2.5活用テンプレートとマルチモーダル指示の書き方',
    seoDescription: 'Google Gemini向けの実用プロンプトを無料公開。マルチモーダル理解（画像・動画・音声）と最大1Mトークン長文対応を活かす指示テンプレート、Nano Banana画像生成、Gemini独自機能の活用法を解説。',
    intro: {
      heading: 'Geminiプロンプトとは？— Google Gemini 2.5を使いこなすための指示文',
      paragraphs: [
        'Geminiプロンプトとは、Google が提供するマルチモーダル AI「Gemini」に与える指示文のことです。テキスト・画像・動画・音声を統合的に扱える点が最大の特徴で、ChatGPTやClaudeと比較しても画像理解とマルチモーダル指示で頭一つ抜けています。',
        '2026年5月時点で主力モデルは Gemini 2.5 Pro / 2.5 Flash / 2.5 Flash Image（通称 Nano Banana）の3系統です。Pro は最大1Mトークンの超長文に対応し、論文・コード・大量資料の分析に圧倒的な強み。Flash は応答速度とコストのバランスがよく、業務の定型タスクで実用度が高い。Flash Image (Nano Banana) は画像編集に特化し、写真加工や合成で Stable Diffusion / Midjourney に並ぶ品質を実現しています。',
        'PromptaではGeminiで使える実用プロンプトを、文章生成・コード生成・画像理解・写真加工などのシーン別に多数公開しています。特に Nano Banana を使った写真加工プロンプト（似合う髪色・パーソナルカラー・背景置換など）はPromptaでツール化して提供しており、コピペで即試せます。',
      ],
    },
    useCases: {
      heading: 'Geminiプロンプトの代表的な活用シーン',
      items: [
        { name: '長文ドキュメント分析', desc: '最大1Mトークン対応を活かし、論文・契約書・技術仕様書をまるごと読ませて要点抽出・比較分析。' },
        { name: 'マルチモーダル指示', desc: '画像・動画・音声を含めて「これを見て○○して」と指示。OCR・図表理解・動画要約も自然言語で完結。' },
        { name: '写真加工（Nano Banana）', desc: '似合う髪色シミュレーション・パーソナルカラー診断・背景置換・写真修復など、Gemini 2.5 Flash Image での画像編集タスク。' },
        { name: 'Google サービス統合', desc: 'Gmail・Docs・Sheets・Drive と統合した業務自動化。Workspace 連携で資料探索や予定調整も自然言語で。' },
        { name: 'コード生成・分析', desc: '長文コードベース全体を読ませてリファクタリング提案・バグ調査・テストケース生成・技術ドキュメント作成。' },
        { name: 'リアルタイム情報取得', desc: 'Google検索と統合された AI Mode / Gemini App から最新情報・ニュース・株価・天気を加味した回答を生成。' },
      ],
    },
    tips: {
      heading: 'Geminiで効果的なプロンプトを書く5つのコツ',
      items: [
        { name: 'マルチモーダル素材を活かす', desc: '画像・PDF・動画・音声を直接添付できるのがGeminiの最大の強み。「この画像/動画を見て○○して」と素材を渡す前提でプロンプトを設計します。' },
        { name: '長文を惜しまず渡す', desc: '最大1Mトークン対応を活用し、関連資料・コードベース・過去の議論をまるごと文脈として渡します。要約せずに渡した方が精度が出やすい場面が多いです。' },
        { name: '構造化を明示する', desc: '「JSON形式で」「Markdown表で」「箇条書きで5つ」など出力形式を指示。Geminiは構造化出力に強く、後工程の自動化と組み合わせやすい。' },
        { name: 'ロール + 目的 + 制約', desc: 'ChatGPT/Claudeと同様、ロール設定（「あなたは○○の専門家」）＋目的（「○○のために」）＋制約（文字数・トーン）の3点セットが効果的。' },
        { name: '画像編集は具体的に指示', desc: 'Nano Banana で写真加工する場合、「自然に」「違和感なく」など曖昧表現を避け、「髪の色だけを暗めのアッシュベージュに変更、髪型・表情・背景は完全保持」のように保持要素を明示します。' },
      ],
    },
    faqs: [
      { question: 'Geminiのプロンプトとは何ですか？', answer: 'Google が提供する AI「Gemini」に対して入力する指示文のことです。テキストだけでなく画像・動画・音声・PDFも一緒に渡せるマルチモーダル指示が可能で、最大1Mトークンの超長文にも対応しています。プロンプトの質によって出力品質が大きく変わるのは他のAIと同じです。' },
      { question: 'Geminiで効果的なプロンプトの書き方は？', answer: '(1) マルチモーダル素材を活かす、(2) 長文を惜しまず渡す、(3) 出力形式を明示する、(4) ロール・目的・制約の3点セット、(5) 画像編集は保持要素を明示する、の5つが基本です。詳しい一般テクニックは<a href="/guides/prompt-writing-guide" class="text-sky-600 hover:underline">プロンプトの書き方完全ガイド</a>で解説しています。' },
      { question: 'Gemini 2.5 Pro / Flash / Flash Image (Nano Banana) の違いは？', answer: '2.5 Pro は最大1Mトークン対応で長文分析・複雑な推論に最強、API コストは高め。2.5 Flash は速度とコストのバランス重視で日常業務に最適、ChatGPT API より安価。2.5 Flash Image（Nano Banana）は画像編集特化モデルで、写真加工・合成タスクが得意。用途に応じて使い分けます。' },
      { question: 'Geminiは日本語のプロンプトに対応していますか？', answer: 'はい、Gemini は日本語に完全対応しています。敬語・ビジネス用語も自然に扱え、ChatGPT・Claudeと同等の日本語品質です。マルチモーダル機能（画像内のテキスト読み取りなど）も日本語OCRに強く、Google翻訳の血統が活きています。' },
      { question: 'GeminiとChatGPT・Claudeの使い分けは？', answer: '画像・動画・音声を含むマルチモーダルタスクと、超長文（書籍・大量資料）の分析はGeminiが最強。創造的ライティングと対話型UIはChatGPTが優位、長文の精緻な要約・分析と倫理的応答はClaudeが優位です。Googleサービスとの統合が必要ならGemini一択になります。' },
      { question: 'Nano Banana（Gemini 2.5 Flash Image）で写真加工するには？', answer: '元写真と「○○を××に変更、その他要素は完全保持」という保持要素明示プロンプトを組み合わせます。Promptaでは似合う髪色診断・パーソナルカラー診断・背景置換などNano Banana活用ツールを<a href="/tools/hair-color-diagnosis" class="text-sky-600 hover:underline">無料公開中</a>で、コピペ不要で写真をアップロードするだけで試せます。' },
      { question: 'Geminiのプロンプトは無料で使えますか？', answer: 'Promptaに掲載しているGeminiプロンプトはすべて無料でコピー・利用可能です。Gemini本体の利用は、無料版（gemini.google.com）と有料版（Gemini Advanced / AI Pro / Vertex AI API）が選べます。商用利用時の規約はGoogle側の利用規約に従ってください。' },
      { question: 'GeminiのAPIで業務自動化するには？', answer: 'Google AI Studio または Vertex AI 経由で API キーを取得し、generateContent エンドポイントに JSON でプロンプトを送ります。Promptaでも Gemini 2.5 Flash Image API を使った写真加工ツール（パーソナルカラー診断・似合う髪色診断）を運用しており、プロンプトテンプレートを工夫することで安定した品質を実現しています。' },
    ],
  },
}

// Tool slug to tool lookup
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find(t => t.slug === slug)
}

export function getToolPageContent(slug: string): ToolPageContent | undefined {
  return TOOL_PAGE_CONTENT[slug]
}

// Category slug to category lookup
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}
