export interface ToolComparison {
  slug: string
  name: string
  icon: string
  color: string
  type: 'image' | 'text'
  pricing: string
  pricingDetail: string
  strengths: string[]
  weaknesses: string[]
  bestFor: string
  features: Record<string, string> // feature name -> support level
}

export const TOOL_COMPARISONS: ToolComparison[] = [
  {
    slug: 'stable-diffusion',
    name: 'Stable Diffusion',
    icon: '🎨',
    color: '#7c3aed',
    type: 'image',
    pricing: '無料',
    pricingDetail: 'オープンソース。ローカル実行は無料。クラウドサービス利用時は従量制。',
    strengths: [
      'オープンソースで無料利用可能',
      'LoRA、ControlNetなどの豊富な拡張機能',
      'カスタムモデルで自由な画風を実現',
      'ローカル実行でプライバシー保護',
      'バッチ生成でコスパが高い',
    ],
    weaknesses: [
      '初期セットアップが複雑',
      '高性能GPU（VRAM 8GB+）が必要',
      'プロンプトの学習コストが高い',
    ],
    bestFor: '上級者・カスタマイズ重視・大量生成向け',
    features: {
      'テキストから画像生成': '◎',
      '画像から画像生成': '◎',
      'インペインティング': '◎',
      'アウトペインティング': '◎',
      'ControlNet（ポーズ指定）': '◎',
      'ネガティブプロンプト': '◎',
      'カスタムモデル/LoRA': '◎',
      'リアルタイムプレビュー': '○',
      'テキスト描画': '△',
      '動画生成': '○',
      'API利用': '◎',
      '商用利用': '◎（モデルによる）',
    },
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    icon: '🖼️',
    color: '#2563eb',
    type: 'image',
    pricing: '月額$10〜',
    pricingDetail: 'Basic $10/月(200枚)、Standard $30/月(無制限低速)、Pro $60/月(高速+ステルス)。',
    strengths: [
      '美的品質が非常に高い',
      'シンプルなプロンプトでも高品質な結果',
      'セットアップ不要（Discord/Webで即利用）',
      'コミュニティの画像をプロンプト付きで参照可能',
    ],
    weaknesses: [
      '月額制で無料プランなし',
      'カスタマイズ性がSDより限定的',
      '細かい構図指定が難しい',
      'DiscordベースのUIが独特',
    ],
    bestFor: '初心者〜中級者・高品質アートワーク・商業デザイン向け',
    features: {
      'テキストから画像生成': '◎',
      '画像から画像生成': '○',
      'インペインティング': '○',
      'アウトペインティング': '○（zoom out）',
      'ControlNet（ポーズ指定）': '×',
      'ネガティブプロンプト': '○（--no）',
      'カスタムモデル/LoRA': '×',
      'リアルタイムプレビュー': '×',
      'テキスト描画': '○',
      '動画生成': '×',
      'API利用': '×（非公式のみ）',
      '商用利用': '◎（有料プラン）',
    },
  },
  {
    slug: 'dall-e',
    name: 'DALL-E 3',
    icon: '🎯',
    color: '#ef4444',
    type: 'image',
    pricing: '従量制',
    pricingDetail: 'ChatGPT Plus($20/月)に含まれる。API利用は画像1枚$0.04〜$0.12。',
    strengths: [
      'ChatGPTとの統合で自然言語指示が可能',
      'プロンプト理解力が非常に高い',
      'テキスト描画が正確',
      '安全性フィルターが充実',
    ],
    weaknesses: [
      '生成枚数に制限あり',
      'フォトリアリスティックな品質はやや劣る',
      'カスタマイズ性が限定的',
      'ネガティブプロンプト非対応',
    ],
    bestFor: '初心者・テキスト描画重視・ChatGPTユーザー向け',
    features: {
      'テキストから画像生成': '◎',
      '画像から画像生成': '○',
      'インペインティング': '○',
      'アウトペインティング': '×',
      'ControlNet（ポーズ指定）': '×',
      'ネガティブプロンプト': '×',
      'カスタムモデル/LoRA': '×',
      'リアルタイムプレビュー': '×',
      'テキスト描画': '◎',
      '動画生成': '×',
      'API利用': '◎',
      '商用利用': '◎',
    },
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    icon: '💬',
    color: '#10a37f',
    type: 'text',
    pricing: '無料 / Plus $20/月',
    pricingDetail: '無料版はGPT-4o mini。Plus($20/月)でGPT-4o、DALL-E、Advanced Voice等が利用可能。',
    strengths: [
      '最も広く使われており情報が豊富',
      'プラグインやGPTsで機能拡張可能',
      'DALL-E統合による画像生成',
      'Code InterpreterやBrowsingなどの高度な機能',
      'Web検索との統合',
    ],
    weaknesses: [
      '長文の分析精度がやや劣る',
      'ハルシネーションが時々発生',
      '無料版は機能制限あり',
    ],
    bestFor: '汎用タスク・初心者・プラグイン活用・画像生成も必要な場合',
    features: {
      '文章生成': '◎',
      'コード生成': '◎',
      '翻訳': '◎',
      '要約': '◎',
      '長文分析': '○',
      '画像理解（Vision）': '◎',
      '画像生成': '◎（DALL-E統合）',
      'Web検索': '◎',
      'ファイル分析': '◎',
      'プラグイン/拡張': '◎（GPTs）',
      'API利用': '◎',
      '日本語品質': '◎',
    },
  },
  {
    slug: 'claude',
    name: 'Claude',
    icon: '🤖',
    color: '#d97706',
    type: 'text',
    pricing: '無料 / Pro $20/月',
    pricingDetail: '無料版あり（制限付き）。Pro($20/月)でClaude Opus、長文処理、優先アクセス。',
    strengths: [
      '200Kトークンの超長文コンテキスト',
      '指示への忠実度が非常に高い',
      '安全性と正確性のバランスが良い',
      '複雑な分析・推論タスクに強い',
      'コーディング能力が高い',
    ],
    weaknesses: [
      'Web検索機能が限定的',
      'プラグインエコシステムが未発達',
      '画像生成機能なし',
    ],
    bestFor: '長文分析・コーディング・高精度な文章作成・研究用途',
    features: {
      '文章生成': '◎',
      'コード生成': '◎',
      '翻訳': '◎',
      '要約': '◎',
      '長文分析': '◎',
      '画像理解（Vision）': '◎',
      '画像生成': '×',
      'Web検索': '○',
      'ファイル分析': '◎',
      'プラグイン/拡張': '△',
      'API利用': '◎',
      '日本語品質': '◎',
    },
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    icon: '✨',
    color: '#4285f4',
    type: 'text',
    pricing: '無料 / Advanced ¥2,900/月',
    pricingDetail: '無料版あり。Advanced(¥2,900/月)でGemini Ultra、Google One AI Premium特典付き。',
    strengths: [
      'Google検索との深い統合',
      'Gmail、Docs等のWorkspace連携',
      'マルチモーダル対応（テキスト+画像+動画）',
      '最新情報へのアクセスが強い',
      '画像生成も可能（Imagen統合）',
    ],
    weaknesses: [
      '日本語の精度がやや不安定',
      'ハルシネーションが発生しやすい',
      'APIの料金体系がやや複雑',
    ],
    bestFor: 'Google Workspaceユーザー・最新情報検索・マルチモーダル活用',
    features: {
      '文章生成': '◎',
      'コード生成': '◎',
      '翻訳': '○',
      '要約': '◎',
      '長文分析': '◎（1Mトークン）',
      '画像理解（Vision）': '◎',
      '画像生成': '○（Imagen）',
      'Web検索': '◎',
      'ファイル分析': '◎',
      'プラグイン/拡張': '○（Extensions）',
      'API利用': '◎',
      '日本語品質': '○',
    },
  },
]

export type ComparisonGroup = 'image' | 'text'

export function getComparisonsByType(type: ComparisonGroup): ToolComparison[] {
  return TOOL_COMPARISONS.filter(t => t.type === type)
}

export function getFeatureKeys(tools: ToolComparison[]): string[] {
  if (tools.length === 0) return []
  return Object.keys(tools[0].features)
}
