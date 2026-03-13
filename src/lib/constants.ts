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
