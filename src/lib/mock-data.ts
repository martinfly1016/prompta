import { TOOLS, CATEGORIES } from './constants'

export interface MockPrompt {
  id: string
  slug: string
  title: string
  description: string
  content: string
  toolSlug: string
  categorySlug: string
  tags: string[]
  images: string[]
  isFeatured: boolean
  viewCount: number
  copyCount: number
  createdAt: string
  updatedAt: string
}

export const MOCK_PROMPTS: MockPrompt[] = [
  // Stable Diffusion - Hairstyle
  {
    id: '1',
    slug: 'sd-long-flowing-hair',
    title: '長い流れる髪のプロンプト — Stable Diffusion',
    description: 'Stable Diffusionで美しいロングヘアを表現するためのプロンプト。風になびく髪の質感を再現。',
    content: 'beautiful long flowing hair, silky smooth hair, hair blowing in wind, detailed hair strands, shiny hair highlights, (masterpiece:1.2), (best quality:1.4), ultra-detailed, 8k',
    toolSlug: 'stable-diffusion',
    categorySlug: 'hairstyle',
    tags: ['ロングヘア', '髪型', 'SD', '高品質'],
    images: ['/mock/sd-long-hair-1.jpg'],
    isFeatured: true,
    viewCount: 3420,
    copyCount: 1205,
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2025-12-15T00:00:00Z',
  },
  {
    id: '2',
    slug: 'sd-twin-tails-anime',
    title: 'ツインテール — アニメ風 Stable Diffusion プロンプト',
    description: 'アニメ風のかわいいツインテールを生成するSD向けプロンプト。リボンアクセサリー付き。',
    content: 'twin tails, cute anime girl, ribbon hair accessories, colorful hair ties, (anime style:1.3), detailed hair, bright colors, (masterpiece:1.2), (best quality:1.4)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'hairstyle',
    tags: ['ツインテール', 'アニメ', 'かわいい'],
    images: ['/mock/sd-twin-tails-1.jpg'],
    isFeatured: false,
    viewCount: 2180,
    copyCount: 890,
    createdAt: '2025-11-20T00:00:00Z',
    updatedAt: '2025-12-01T00:00:00Z',
  },
  // Stable Diffusion - Clothing
  {
    id: '3',
    slug: 'sd-elegant-dress',
    title: 'エレガントドレス — Stable Diffusion 服装プロンプト',
    description: '高級感のあるエレガントなドレスを表現するプロンプト。パーティーシーンに最適。',
    content: 'elegant evening gown, flowing fabric, silk dress, detailed lace trim, jeweled neckline, (masterpiece:1.2), (best quality:1.4), dramatic lighting, studio photography',
    toolSlug: 'stable-diffusion',
    categorySlug: 'clothing',
    tags: ['ドレス', 'エレガント', 'ファッション'],
    images: ['/mock/sd-dress-1.jpg'],
    isFeatured: true,
    viewCount: 4560,
    copyCount: 1890,
    createdAt: '2025-11-15T00:00:00Z',
    updatedAt: '2025-12-10T00:00:00Z',
  },
  // Stable Diffusion - Cosplay
  {
    id: '4',
    slug: 'sd-fantasy-armor-cosplay',
    title: 'ファンタジーアーマー コスプレプロンプト — SD',
    description: 'ファンタジーRPG風の鎧コスプレを再現するStable Diffusionプロンプト。',
    content: 'fantasy armor cosplay, ornate medieval plate armor, glowing magical runes, cape flowing, detailed metalwork, epic warrior pose, (masterpiece:1.2), (best quality:1.4), cinematic lighting',
    toolSlug: 'stable-diffusion',
    categorySlug: 'cosplay',
    tags: ['コスプレ', 'ファンタジー', '鎧', 'RPG'],
    images: ['/mock/sd-armor-1.jpg'],
    isFeatured: true,
    viewCount: 5230,
    copyCount: 2100,
    createdAt: '2025-10-20T00:00:00Z',
    updatedAt: '2025-11-25T00:00:00Z',
  },
  // Stable Diffusion - Anime
  {
    id: '5',
    slug: 'sd-anime-schoolgirl',
    title: 'アニメ風 学園少女プロンプト — Stable Diffusion',
    description: '日本のアニメスタイルの学園少女イラストを生成するプロンプト。桜の背景付き。',
    content: 'anime school girl, japanese school uniform, cherry blossom background, sakura petals, soft lighting, (anime style:1.4), detailed eyes, cute expression, (masterpiece:1.2), (best quality:1.4)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'anime',
    tags: ['アニメ', '学園', '桜', 'かわいい'],
    images: ['/mock/sd-anime-school-1.jpg'],
    isFeatured: true,
    viewCount: 8900,
    copyCount: 4200,
    createdAt: '2025-09-15T00:00:00Z',
    updatedAt: '2025-12-01T00:00:00Z',
  },
  // Stable Diffusion - Color
  {
    id: '6',
    slug: 'sd-neon-cyberpunk-colors',
    title: 'ネオンサイバーパンク カラープロンプト — SD',
    description: 'サイバーパンク風のネオンカラーパレットで画像を生成するプロンプト。',
    content: 'neon cyberpunk, vibrant neon pink and blue, glowing neon signs, rain-soaked streets, reflective surfaces, (cyberpunk:1.4), neon lighting, futuristic city, (masterpiece:1.2), (best quality:1.4)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'color',
    tags: ['ネオン', 'サイバーパンク', 'カラー', '夜景'],
    images: ['/mock/sd-neon-1.jpg'],
    isFeatured: false,
    viewCount: 3100,
    copyCount: 1350,
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-20T00:00:00Z',
  },
  // Stable Diffusion - Camera
  {
    id: '7',
    slug: 'sd-cinematic-close-up',
    title: 'シネマティック クローズアップ — SD カメラプロンプト',
    description: '映画のようなクローズアップショットを実現するカメラアングルプロンプト。',
    content: 'cinematic close-up shot, shallow depth of field, bokeh background, film grain, anamorphic lens flare, (cinematic:1.4), dramatic rim lighting, professional photography, 85mm lens, f/1.4',
    toolSlug: 'stable-diffusion',
    categorySlug: 'camera',
    tags: ['クローズアップ', 'シネマティック', 'カメラ', 'ボケ'],
    images: ['/mock/sd-closeup-1.jpg'],
    isFeatured: false,
    viewCount: 2750,
    copyCount: 1100,
    createdAt: '2025-10-15T00:00:00Z',
    updatedAt: '2025-11-10T00:00:00Z',
  },
  // Stable Diffusion - Body Type
  {
    id: '8',
    slug: 'sd-athletic-pose',
    title: 'アスレチック体型 ダイナミックポーズ — SD',
    description: 'スポーティーで引き締まった体型とダイナミックなポーズの表現プロンプト。',
    content: 'athletic build, dynamic action pose, toned muscles, sportswear, energetic movement, (high quality:1.3), studio lighting, fitness photoshoot style, (masterpiece:1.2)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'body-type',
    tags: ['アスレチック', 'ポーズ', 'スポーツ'],
    images: ['/mock/sd-athletic-1.jpg'],
    isFeatured: false,
    viewCount: 1980,
    copyCount: 720,
    createdAt: '2025-11-05T00:00:00Z',
    updatedAt: '2025-11-25T00:00:00Z',
  },
  // Stable Diffusion - Costume
  {
    id: '9',
    slug: 'sd-royal-crown-jewelry',
    title: '王冠とジュエリー — SD 衣装装飾プロンプト',
    description: '豪華な王冠とジュエリーアクセサリーを表現するプロンプト。',
    content: 'ornate golden crown, sparkling jewels, diamond tiara, royal jewelry, gemstone necklace, pearl earrings, (masterpiece:1.2), (best quality:1.4), detailed metalwork, luxury',
    toolSlug: 'stable-diffusion',
    categorySlug: 'costume',
    tags: ['王冠', 'ジュエリー', '装飾', '豪華'],
    images: ['/mock/sd-crown-1.jpg'],
    isFeatured: false,
    viewCount: 2340,
    copyCount: 950,
    createdAt: '2025-10-25T00:00:00Z',
    updatedAt: '2025-11-15T00:00:00Z',
  },
  // Midjourney - Hairstyle
  {
    id: '10',
    slug: 'mj-ethereal-braids',
    title: '幻想的な編み込みヘア — Midjourney プロンプト',
    description: 'Midjourneyで幻想的な編み込みヘアスタイルを生成するプロンプト。花飾り付き。',
    content: 'ethereal braided hair with flowers woven in, fantasy princess hairstyle, soft golden light, detailed hair texture, dreamy atmosphere --ar 3:4 --v 6 --s 750',
    toolSlug: 'midjourney',
    categorySlug: 'hairstyle',
    tags: ['編み込み', '幻想的', 'MJ', '花飾り'],
    images: ['/mock/mj-braids-1.jpg'],
    isFeatured: true,
    viewCount: 4100,
    copyCount: 1750,
    createdAt: '2025-11-10T00:00:00Z',
    updatedAt: '2025-12-05T00:00:00Z',
  },
  // Midjourney - Anime
  {
    id: '11',
    slug: 'mj-anime-warrior',
    title: 'アニメ風ウォーリアー — Midjourney プロンプト',
    description: 'Midjourneyでアニメ風の戦士キャラクターを生成するプロンプト。',
    content: 'anime style warrior character, glowing sword, dynamic battle pose, dramatic lighting, detailed armor design, epic fantasy background --ar 2:3 --v 6 --niji 6',
    toolSlug: 'midjourney',
    categorySlug: 'anime',
    tags: ['アニメ', '戦士', 'MJ', 'ファンタジー'],
    images: ['/mock/mj-warrior-1.jpg'],
    isFeatured: true,
    viewCount: 6200,
    copyCount: 2800,
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-11-20T00:00:00Z',
  },
  // Midjourney - Clothing
  {
    id: '12',
    slug: 'mj-japanese-kimono',
    title: '和装・着物 — Midjourney プロンプト',
    description: 'Midjourneyで美しい日本の着物を表現するプロンプト。伝統的な柄と現代的なアレンジ。',
    content: 'beautiful japanese kimono, traditional floral pattern, obi sash, elegant woman, cherry blossom garden background, soft natural lighting, fine details --ar 2:3 --v 6 --s 800',
    toolSlug: 'midjourney',
    categorySlug: 'clothing',
    tags: ['着物', '和装', 'MJ', '日本'],
    images: ['/mock/mj-kimono-1.jpg'],
    isFeatured: false,
    viewCount: 3800,
    copyCount: 1500,
    createdAt: '2025-11-25T00:00:00Z',
    updatedAt: '2025-12-10T00:00:00Z',
  },
  // Midjourney - Camera
  {
    id: '13',
    slug: 'mj-drone-aerial-shot',
    title: 'ドローン空撮風 — Midjourney カメラプロンプト',
    description: 'Midjourneyでドローンによる空撮風の壮大な風景を生成するプロンプト。',
    content: 'aerial drone photography, bird eye view, vast landscape, dramatic clouds, golden hour lighting, ultra wide angle, cinematic color grading --ar 16:9 --v 6 --s 900',
    toolSlug: 'midjourney',
    categorySlug: 'camera',
    tags: ['空撮', 'ドローン', 'MJ', '風景'],
    images: ['/mock/mj-aerial-1.jpg'],
    isFeatured: false,
    viewCount: 2900,
    copyCount: 1200,
    createdAt: '2025-11-18T00:00:00Z',
    updatedAt: '2025-12-01T00:00:00Z',
  },
  // ChatGPT prompts
  {
    id: '14',
    slug: 'chatgpt-business-email',
    title: 'ビジネスメール作成プロンプト — ChatGPT',
    description: 'ChatGPTで丁寧で効果的なビジネスメールを自動生成するプロンプト。',
    content: 'あなたはビジネスコミュニケーションの専門家です。以下の条件でビジネスメールを作成してください。\n\n【宛先】{相手の役職・名前}\n【目的】{メールの目的}\n【トーン】丁寧かつプロフェッショナル\n【長さ】200-300文字\n\n以下の構成で書いてください：\n1. 挨拶と自己紹介\n2. 用件の説明\n3. 具体的な依頼事項\n4. 締めの言葉',
    toolSlug: 'chatgpt',
    categorySlug: 'hairstyle', // Using as placeholder; ChatGPT prompts don't fit image categories
    tags: ['ビジネス', 'メール', 'ChatGPT', '仕事効率化'],
    images: [],
    isFeatured: true,
    viewCount: 12500,
    copyCount: 7800,
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2025-12-15T00:00:00Z',
  },
  {
    id: '15',
    slug: 'chatgpt-code-review',
    title: 'コードレビュープロンプト — ChatGPT',
    description: 'ChatGPTにコードレビューを依頼するための詳細なプロンプト。バグ発見と改善提案。',
    content: 'あなたはシニアソフトウェアエンジニアです。以下のコードをレビューしてください。\n\n【レビュー観点】\n1. バグや潜在的な問題\n2. パフォーマンスの改善点\n3. コードの可読性\n4. セキュリティリスク\n5. ベストプラクティスとの比較\n\n各問題について、問題の説明と改善案を具体的なコード例付きで提示してください。\n\n```\n{レビュー対象のコードをここに貼り付け}\n```',
    toolSlug: 'chatgpt',
    categorySlug: 'hairstyle',
    tags: ['コードレビュー', 'プログラミング', 'ChatGPT', '開発'],
    images: [],
    isFeatured: false,
    viewCount: 8900,
    copyCount: 5200,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-12-01T00:00:00Z',
  },
  // Claude prompts
  {
    id: '16',
    slug: 'claude-research-analysis',
    title: 'リサーチ分析プロンプト — Claude',
    description: 'Claudeの長文理解力を活かした包括的なリサーチ分析プロンプト。',
    content: 'あなたは経験豊富なリサーチアナリストです。以下のテーマについて包括的な分析を行ってください。\n\n【テーマ】{調査テーマ}\n\n以下の構成で回答してください：\n\n## 1. 概要（200字）\n## 2. 現状分析\n- 市場規模・トレンド\n- 主要プレイヤー\n## 3. SWOT分析\n## 4. 将来予測（短期・中期・長期）\n## 5. 推奨アクション\n\n情報源がある場合は引用元を明記し、推測の場合はその旨を記載してください。',
    toolSlug: 'claude',
    categorySlug: 'hairstyle',
    tags: ['リサーチ', '分析', 'Claude', 'ビジネス'],
    images: [],
    isFeatured: true,
    viewCount: 6700,
    copyCount: 3900,
    createdAt: '2025-10-20T00:00:00Z',
    updatedAt: '2025-12-10T00:00:00Z',
  },
  {
    id: '17',
    slug: 'claude-creative-writing',
    title: '小説・創作文プロンプト — Claude',
    description: 'Claudeで質の高い創作小説を生成するためのプロンプトテンプレート。',
    content: 'あなたはプロの小説家です。以下の設定で短編小説を書いてください。\n\n【ジャンル】{ジャンル}\n【舞台設定】{時代・場所}\n【主人公】{キャラクター設定}\n【テーマ】{物語のテーマ}\n【長さ】2000-3000文字\n【文体】{三人称/一人称、文学的/軽い読み口}\n\n以下の要素を含めてください：\n- 印象的な冒頭\n- キャラクターの内面描写\n- 伏線と回収\n- 余韻のある結末',
    toolSlug: 'claude',
    categorySlug: 'hairstyle',
    tags: ['創作', '小説', 'Claude', 'クリエイティブ'],
    images: [],
    isFeatured: false,
    viewCount: 4500,
    copyCount: 2100,
    createdAt: '2025-11-05T00:00:00Z',
    updatedAt: '2025-12-05T00:00:00Z',
  },
  // DALL-E prompts
  {
    id: '18',
    slug: 'dalle-watercolor-landscape',
    title: '水彩風景画プロンプト — DALL-E',
    description: 'DALL-Eで美しい水彩画風の風景を生成するプロンプト。',
    content: 'A beautiful watercolor painting of a Japanese countryside in autumn, golden rice fields, distant mountains with morning mist, traditional wooden farmhouse, soft warm colors, delicate brush strokes, artistic watercolor technique, peaceful and serene atmosphere',
    toolSlug: 'dall-e',
    categorySlug: 'color',
    tags: ['水彩', '風景', 'DALL-E', '秋'],
    images: ['/mock/dalle-watercolor-1.jpg'],
    isFeatured: true,
    viewCount: 3600,
    copyCount: 1400,
    createdAt: '2025-11-12T00:00:00Z',
    updatedAt: '2025-12-08T00:00:00Z',
  },
  {
    id: '19',
    slug: 'dalle-isometric-room',
    title: 'アイソメトリック部屋デザイン — DALL-E',
    description: 'DALL-Eでかわいいアイソメトリック（等角投影）の部屋を生成するプロンプト。',
    content: 'Isometric view of a cozy Japanese study room, miniature detailed furniture, bookshelves filled with manga, small desk with laptop, warm lighting from window, potted plants, cute cat sleeping on cushion, pastel colors, 3D render style, highly detailed',
    toolSlug: 'dall-e',
    categorySlug: 'camera',
    tags: ['アイソメトリック', '部屋', 'DALL-E', '3D'],
    images: ['/mock/dalle-isometric-1.jpg'],
    isFeatured: false,
    viewCount: 2800,
    copyCount: 1100,
    createdAt: '2025-11-28T00:00:00Z',
    updatedAt: '2025-12-12T00:00:00Z',
  },
  // More SD prompts for variety
  {
    id: '20',
    slug: 'sd-gothic-lolita-outfit',
    title: 'ゴシックロリータ衣装 — SD プロンプト',
    description: 'Stable Diffusionでゴシックロリータファッションを表現するプロンプト。',
    content: 'gothic lolita fashion, black and white frilly dress, lace trim, ribbon details, parasol, platform shoes, rose accessories, dark romantic atmosphere, (masterpiece:1.2), (best quality:1.4)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'clothing',
    tags: ['ゴスロリ', 'ファッション', 'SD'],
    images: ['/mock/sd-gothic-1.jpg'],
    isFeatured: false,
    viewCount: 3200,
    copyCount: 1350,
    createdAt: '2025-11-22T00:00:00Z',
    updatedAt: '2025-12-06T00:00:00Z',
  },
  {
    id: '21',
    slug: 'sd-sunset-golden-hour',
    title: 'ゴールデンアワー夕暮れ — SD カラープロンプト',
    description: '美しい黄金色の夕暮れ時の光を表現するカラープロンプト。',
    content: 'golden hour sunset, warm orange and pink sky, golden light rays, long shadows, dreamy atmosphere, lens flare, (golden hour:1.4), professional photography, (masterpiece:1.2)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'color',
    tags: ['ゴールデンアワー', '夕暮れ', 'カラー'],
    images: ['/mock/sd-sunset-1.jpg'],
    isFeatured: false,
    viewCount: 2600,
    copyCount: 980,
    createdAt: '2025-11-30T00:00:00Z',
    updatedAt: '2025-12-14T00:00:00Z',
  },
  {
    id: '22',
    slug: 'sd-bob-cut-modern',
    title: 'モダンボブカット — SD 髪型プロンプト',
    description: 'スタイリッシュなモダンボブカットを表現するプロンプト。',
    content: 'modern bob cut hairstyle, sleek and straight, chin length, side swept bangs, glossy hair, professional studio lighting, fashion photography, (masterpiece:1.2), (best quality:1.4)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'hairstyle',
    tags: ['ボブカット', 'モダン', '髪型'],
    images: ['/mock/sd-bob-1.jpg'],
    isFeatured: false,
    viewCount: 1850,
    copyCount: 720,
    createdAt: '2025-12-02T00:00:00Z',
    updatedAt: '2025-12-16T00:00:00Z',
  },
  {
    id: '23',
    slug: 'mj-cyberpunk-cosplay',
    title: 'サイバーパンク コスプレ — Midjourney プロンプト',
    description: 'Midjourneyでサイバーパンク風のコスプレキャラクターを生成するプロンプト。',
    content: 'cyberpunk cosplay character, neon LED accessories, futuristic visor, tech-enhanced outfit, holographic elements, rain and neon reflections, dark alley background --ar 2:3 --v 6 --s 800',
    toolSlug: 'midjourney',
    categorySlug: 'cosplay',
    tags: ['サイバーパンク', 'コスプレ', 'MJ', '未来'],
    images: ['/mock/mj-cyberpunk-1.jpg'],
    isFeatured: false,
    viewCount: 4300,
    copyCount: 1900,
    createdAt: '2025-10-28T00:00:00Z',
    updatedAt: '2025-11-22T00:00:00Z',
  },
  {
    id: '24',
    slug: 'chatgpt-meeting-summary',
    title: '会議議事録作成プロンプト — ChatGPT',
    description: 'ChatGPTで効率的に会議の議事録を作成するプロンプト。',
    content: 'あなたは優秀な秘書です。以下の会議メモから、構造化された議事録を作成してください。\n\n【形式】\n## 会議概要\n- 日時：\n- 参加者：\n- 議題：\n\n## 議論内容\n（各議題について要点を箇条書き）\n\n## 決定事項\n（番号付きリスト）\n\n## アクションアイテム\n| 担当者 | タスク | 期限 |\n\n## 次回予定\n\n---\n\n【会議メモ】\n{ここにメモを貼り付け}',
    toolSlug: 'chatgpt',
    categorySlug: 'hairstyle',
    tags: ['議事録', '会議', 'ビジネス', '効率化'],
    images: [],
    isFeatured: false,
    viewCount: 9800,
    copyCount: 6200,
    createdAt: '2025-09-20T00:00:00Z',
    updatedAt: '2025-12-01T00:00:00Z',
  },
  {
    id: '25',
    slug: 'sd-petite-character-design',
    title: 'ちびキャラ デフォルメデザイン — SD',
    description: 'Stable Diffusionでかわいいちびキャラクター（デフォルメ）を生成するプロンプト。',
    content: 'chibi character design, super deformed style, large head small body, cute big eyes, simple kawaii outfit, pastel background, (chibi:1.4), adorable expression, (masterpiece:1.2), (best quality:1.4)',
    toolSlug: 'stable-diffusion',
    categorySlug: 'body-type',
    tags: ['ちびキャラ', 'デフォルメ', 'かわいい'],
    images: ['/mock/sd-chibi-1.jpg'],
    isFeatured: false,
    viewCount: 3700,
    copyCount: 1600,
    createdAt: '2025-11-08T00:00:00Z',
    updatedAt: '2025-12-02T00:00:00Z',
  },
]

// Helper functions for mock data queries

export function getFeaturedPrompts(): MockPrompt[] {
  return MOCK_PROMPTS.filter(p => p.isFeatured)
}

export function getLatestPrompts(limit: number = 8): MockPrompt[] {
  return [...MOCK_PROMPTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getPromptsByTool(toolSlug: string): MockPrompt[] {
  return MOCK_PROMPTS.filter(p => p.toolSlug === toolSlug)
}

export function getPromptsByCategory(categorySlug: string): MockPrompt[] {
  return MOCK_PROMPTS.filter(p => p.categorySlug === categorySlug)
}

export function getPromptBySlug(slug: string): MockPrompt | undefined {
  return MOCK_PROMPTS.find(p => p.slug === slug)
}

export function getPromptsByTag(tag: string): MockPrompt[] {
  return MOCK_PROMPTS.filter(p => p.tags.includes(tag))
}

export function getRelatedPrompts(prompt: MockPrompt, limit: number = 4): MockPrompt[] {
  return MOCK_PROMPTS
    .filter(p => p.id !== prompt.id && (p.toolSlug === prompt.toolSlug || p.categorySlug === prompt.categorySlug))
    .slice(0, limit)
}

export function getToolPromptCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const tool of TOOLS) {
    counts[tool.slug] = MOCK_PROMPTS.filter(p => p.toolSlug === tool.slug).length
  }
  return counts
}

export function getCategoryPromptCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const cat of CATEGORIES) {
    counts[cat.slug] = MOCK_PROMPTS.filter(p => p.categorySlug === cat.slug).length
  }
  return counts
}
