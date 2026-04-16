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
    seoTitle: '女性向け服装プロンプト集【無料・コピペOK】｜ファンタジー衣装・制服・ドレス',
    seoH1: '女性向け服装プロンプト集｜ファンタジー・制服・ドレス・カジュアル',
    seoDescription: '女性キャラ向け服装プロンプトのコピペ集。トップス・スカート・ドレス・ファンタジー衣装まで、Stable Diffusion で使える呪文と BREAK コマンドによる色滲み対策を紹介。',
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
      '髪型プロンプトは、AI画像生成においてキャラクターの印象を決定づける最も重要な要素のひとつです。Stable DiffusionやMidjourneyでは「long hair」「short bob」「ponytail」「twin tails」といった英語キーワードで指定するのが基本ですが、単に長さを指定するだけでなく、髪の色（blonde, silver, black hair）、質感（silky, wavy, curly）、前髪のスタイル（blunt bangs, side-swept bangs）まで細かく組み合わせることで、より理想に近いビジュアルが得られます。\n日本のアニメ風イラストで人気の高いツインテールやポニーテールは、(twin tails:1.2)のように重み付け（emphasis）を加えることで、AIが髪型を確実に認識しやすくなります。逆に、髪が顔にかかってしまう問題を防ぐため、ネガティブプロンプトに「hair over eyes」「messy hair」を入れるのも定番テクニックです。',
    useCases: [
      'オリジナルキャラクターのビジュアル設計',
      'VTuberやアバターのデザイン案出し',
      'ポートレート・人物写真風の画像生成',
      'コミック・ライトノベルの挿絵作成',
    ],
    tips: [
      '長さ＋スタイル＋色の3要素を組み合わせる（例: long wavy blonde hair）',
      '重要な髪型は (keyword:1.2〜1.4) で強調する',
      'ネガティブプロンプトに「bad hair, messy hair」を入れて品質を安定させる',
      'アニメ調なら「anime style」、リアル調なら「photorealistic」を併用',
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
      'アニメスタイルプロンプトは、日本のアニメ・マンガ調イラストをAIで生成するための核となるテクニックです。Stable Diffusionでは「anime style」「anime coloring」「manga style」「cel shading」といったベースキーワードに加え、特定の作画スタイル（90s anime, modern anime, ghibli style）を指定することで方向性を細かくコントロールできます。\nアニメ系モデル（Anything V5, Counterfeit, MeinaMix など）を使う場合、品質タグ「masterpiece, best quality, ultra detailed」とネガティブタグ「(worst quality, low quality:1.4), bad anatomy, bad hands」をテンプレ化しておくのが定番です。Midjourneyでは「niji 5」モードがアニメ表現に特化しており、「--niji 5 --style expressive」で鮮やかなアニメ風画像が得られます。',
    useCases: [
      'オリジナルキャラクターの設定画作成',
      '同人誌・Web漫画の参考素材',
      'SNSアイコン・ヘッダー画像の作成',
      'ライトノベルやゲームのコンセプトアート',
    ],
    tips: [
      '品質タグ「masterpiece, best quality, ultra detailed」をテンプレ化',
      'アニメ系モデルやMidjourneyのniji 5モードを使う',
      '「(anime style:1.2)」で重み付けしてリアル化を防ぐ',
      'ネガティブに「3d, realistic, photo, bad anatomy」を入れる',
    ],
  },

  'color': {
    intro:
      '色・カラープロンプトは、画像全体の雰囲気と感情表現をコントロールする最も基本的かつ強力な要素です。AI画像生成では「pastel colors」「vivid colors」「monochrome」「sepia tone」のような全体トーンの指定から、「pink and blue gradient」「warm color palette」「cinematic color grading」といった具体的な配色まで、多様な指示が可能です。\nStable Diffusionでは色指定が他の要素に「染み出す」（color bleeding）現象が起きやすいため、BREAK構文や領域指定（regional prompter）で対処するのがプロの手法です。Midjourneyでは「--style raw」を使うと色の解釈が忠実になり、「dominant color: teal」のような自然言語表記も認識します。配色は画像の感情的インパクトを決めるため、参考にしたい配色を持つアーティスト名を併記するのも効果的です。',
    useCases: [
      '雰囲気重視のイメージビジュアル制作',
      'ブランドカラーに合わせた素材作成',
      '季節感のある背景・壁紙作成',
      '映画・ゲームのコンセプトアート',
    ],
    tips: [
      '全体トーン → 具体的な色 → グラデーションの順で記述する',
      '「cinematic color grading」「film grain」で映画的な色合いに',
      '色の染み出しを防ぐにはBREAK構文や領域指定を活用',
      'ネガティブに「oversaturated, washed out colors」を入れる',
    ],
  },

  'costume': {
    intro:
      '衣装・装飾品プロンプトは、キャラクターの個性を完成させるアクセサリーや小物類を表現するためのテクニックです。「necklace」「earrings」「crown」「glasses」「choker」「ribbon」など、英語の基本ワードを覚えておくとAIが認識しやすく、複数併用することで装飾性の高いキャラクターが作れます。\n装飾系プロンプトの難しさは、AIが小物を「忘れる」または「過剰に増やす」点です。「(intricate gold necklace:1.3)」のように重み付けを強めにかけ、ネガティブに「too many accessories, deformed jewelry」を入れて制御するのが基本戦略です。和風キャラには「kanzashi（簪）」「obi（帯）」、ファンタジー系には「tiara, gem, magical pendant」など、ジャンル特有の語彙を覚えておくと表現の幅が広がります。',
    useCases: [
      'キャラクターデザインの細部仕上げ',
      'ジュエリー・アクセサリーのデザイン案出し',
      'ファンタジー・歴史物のコスチューム設計',
      'ゲームアバターのカスタマイズ案',
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
      '体型プロンプトは、キャラクターの体格・プロポーション・ポーズを指定するための重要な要素で、リアル系・アニメ系どちらでも頻繁に使われます。Stable Diffusionでは「slim」「petite」「athletic」「muscular」「curvy」といった体型ワードに加え、身長感（tall, short）、姿勢（standing, sitting, dynamic pose）を組み合わせて指示します。\n体型表現の難所は手や指の崩れやすさで、これは現在のAI画像生成の最大の課題のひとつです。「detailed hands, perfect anatomy, correct proportions」を品質タグとして入れ、ネガティブには必ず「bad hands, extra fingers, missing fingers, bad anatomy, deformed」を入れるのが定石です。ポーズ指定では「contrapposto」「dynamic action pose」のような美術用語が高精度に認識されます。ControlNetを併用すると、参照画像から体型・ポーズを正確にコピーできます。',
    useCases: [
      'キャラクターの基本デザイン設計',
      'ファッション撮影・ポートレート風の生成',
      'アクションシーン・戦闘ポーズの作成',
      'スポーツ・フィットネス系の素材',
    ],
    tips: [
      '体型 → 身長 → 姿勢の3要素で記述する',
      '「perfect anatomy, correct proportions」を必ず入れる',
      '手の崩れ対策に「detailed hands, five fingers」を併用',
      '正確なポーズが必要ならControlNetで参照画像を使う',
    ],
  },

  'camera': {
    intro:
      'カメラ・アングルプロンプトは、画像の構図と視点を決定づける、いわば「映像監督」的な役割を果たす要素です。「close-up」「medium shot」「full body shot」「wide shot」のような基本構図から、「low angle」「high angle」「dutch angle」「bird\'s eye view」といった視点指定、さらに「shallow depth of field」「bokeh」「cinematic composition」のような撮影技法まで、幅広く指示できます。\nMidjourneyは特にカメラ系プロンプトに強く、「shot on Sony A7IV, 85mm lens, f/1.4」のような実機材スペック指定にも反応します。Stable Diffusionでは「professional photography, dramatic lighting, rule of thirds」を併用すると、構図の安定性が大きく向上します。映画的な雰囲気を出したい場合は「cinematic still, anamorphic lens, film grain」が定番の組み合わせです。',
    useCases: [
      '映画的・ドラマチックな構図のシーン作成',
      'ポートレート撮影風の人物画像',
      '広告・ポスター用のビジュアル',
      'ゲームのキービジュアル・コンセプトアート',
    ],
    tips: [
      '構図 → 視点 → 撮影機材 → ライティングの順で記述',
      '「cinematic, dramatic lighting, depth of field」を組み合わせる',
      '実機材名（Sony A7, 35mm lens）はMidjourneyで特に有効',
      'ネガティブに「flat composition, boring angle」を入れる',
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
