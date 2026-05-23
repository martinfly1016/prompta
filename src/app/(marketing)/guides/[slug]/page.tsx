import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GUIDES, TOOLS, SITE_CONFIG, getRelatedGuides, GUIDE_RELATIONS } from '@/lib/constants'
import { generateHowToSchema } from '@/lib/schema'
import { getPromptsByTool } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const guide = GUIDES.find(g => g.slug === resolvedParams.slug)
  if (!guide) return {}

  const ogImage = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(guide.title)}&type=guide`
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [ogImage],
    },
  }
}

// Guide content store — static content for each guide
const GUIDE_CONTENT: Record<string, { sections: Array<{ title: string; content: string }>, faq: Array<{ q: string; a: string }> }> = {
  'what-is-prompt': {
    sections: [
      {
        title: 'プロンプトとは？意味と基本の定義',
        content: `プロンプト（Prompt）とは、ChatGPT・Stable Diffusion・Midjourney・Claude・Geminiなどの生成AIに対して入力する「指示文」のことです。日本語に直訳すると「促す・指示する」という意味で、AIに「何をしてほしいのか」「どんな結果を出してほしいのか」を伝える役割を持ちます。

プロンプトはプログラミング言語のような専門的な記法ではなく、日本語や英語などの自然言語で記述できるのが特徴です。つまり、プログラミングの知識がなくても、普通の文章でAIに指示を出すことができます。

**プロンプトの質がAIの出力品質を直接左右する**ため、効果的なプロンプトの書き方を学ぶことは、AIを業務や創作に活用する上で最も重要なスキルの1つです。

例えば、ChatGPTに「メールを書いて」とだけ指示した場合、AIはどんなメールか判断できず、汎用的な文章を返します。しかし「取引先の田中部長に、来週の会議日程変更をお詫びする丁寧なビジネスメールを200文字程度で書いてください」と具体的に伝えれば、すぐに業務で使える文章が得られます。

同じAIでも、プロンプトの違いだけで出力の有用性は10倍以上変わるとも言われています。`,
      },
      {
        title: 'プロンプトエンジニアリングとは',
        content: `プロンプトエンジニアリング（Prompt Engineering）とは、AIから最適な出力を引き出すためにプロンプトを設計・最適化する技術や手法のことです。米国の主要IT企業や研究機関では、すでに「プロンプトエンジニア」という専門職が登場しており、AI時代の新しいスキルとして注目されています。

**文章生成AI（ChatGPT・Claude・Gemini）の場合のテクニック：**
- ロール設定 — 「あなたは○○の専門家です」とAIに役割を与える
- 具体的な条件指定 — 文字数・トーン・対象読者を明示する
- 出力形式の指定 — 「箇条書きで」「表形式で」「JSON形式で」と形式を指定する
- ステップバイステップ — 複雑なタスクを段階的に分解して指示する
- Few-Shot — 期待する入出力の例を1〜3個提示する

**画像生成AI（Stable Diffusion・Midjourney）の場合のテクニック：**
- 品質タグ — masterpiece, best quality, ultra-detailed などで品質を底上げ
- スタイル指定 — anime style, photorealistic, oil painting などで画風を制御
- 構図指定 — close-up, wide angle, low-angle shot などで視点を指定
- ネガティブプロンプト — 生成したくない要素を明示的に除外
- 重み付け — \`(masterpiece:1.2)\` のように数値で要素の強調度を調整

これらのテクニックを組み合わせることで、AIの出力品質を劇的に向上させることができます。`,
      },
      {
        title: 'プロンプトの基本構造 — 5つの構成要素',
        content: `効果的なプロンプトには、以下の5つの要素が含まれているのが理想です。すべてを毎回入れる必要はありませんが、結果が思い通りにならないときは、欠けている要素がないか確認してみましょう。

**1. タスクの明確化**
AIに何をしてほしいかを明確に伝えます。「要約してください」「翻訳してください」「アイデアを5つ提案してください」など、動詞を使って具体的な行動を指示します。

**2. コンテキスト（背景情報）**
タスクの背景や目的、対象読者などの情報を提供します。「IT初心者向けに」「30代女性をターゲットに」「社内研修資料として使う」などです。同じ要約でも、相手によって書き方は完全に変わります。

**3. 出力形式の指定**
箇条書き・表形式・JSON・Markdown・段落形式など、どんな形で回答してほしいかを指定します。「3つの見出しに分けて」「比較表で」など具体的に伝えると、後工程での再加工が不要になります。

**4. 例示（Few-Shotプロンプティング）**
期待する出力の例を1〜3個示すことで、AIの理解度が大幅に向上します。抽象的なルールを長々と書くより、「こんな感じ」と実例を見せる方が圧倒的に効果的です。

**5. 制約条件**
文字数・トーン・スタイル・避けたい表現などの制約を設定します。「200文字以内」「カジュアルな口調で」「専門用語を避けて」などです。

この5要素を意識すれば、AIの出力品質は確実に向上します。`,
      },
      {
        title: '効果的なプロンプトの書き方 5つのコツ',
        content: `プロンプトの基本構造を理解した上で、実践で効果を発揮する5つのコツを紹介します。

**コツ1: 曖昧な表現を避け、具体的に書く**
最大の失敗原因は「指示の曖昧さ」です。「日本の経済について教えて」ではなく「2025年の日本のインフレ率の推移を、要因とともに300文字で説明してください」のように、5W1Hを意識した具体的な指示が結果を変えます。

**コツ2: 段階的に分解する（Chain of Thought）**
複雑なタスクは「まず○○を考えて、次に△△を出力してください」と段階分けします。「ステップバイステップで考えてから回答してください」の一文を加えるだけで、推論精度が大幅に向上することが研究で示されています。

**コツ3: ロールを設定する**
「あなたはマーケティングの専門家です」「あなたは小学校教師です」と最初に役割を与えると、その専門性に基づいた回答が得られます。文章のトーンや内容の深さが格段に変わります。

**コツ4: 出力例を見せる（Few-Shot）**
「こんな形式で」「このようなスタイルで」と実例を1〜3個提示すると、AIは即座にパターンを学習します。10行の説明よりも1個の良質な例の方が効果的です。

**コツ5: 対話を重ねて改善する**
最初の出力が期待通りでなくても問題ありません。「もっと具体的に」「○○の観点を追加して」と追加指示を与えることで、AIは意図を学習し精度を高めていきます。完璧な1発プロンプトを目指すより、対話で磨いていく方が実用的です。

これら5つのコツ + Few-Shot・Chain of Thought などの上級テクニックとコピペで使えるテンプレート集は<a href="/guides/prompt-writing-guide" class="text-sky-600 hover:underline">プロンプトの書き方完全ガイド</a>で詳しく解説しています。`,
      },
      {
        title: '主要AIツール別のプロンプトの違い',
        content: `AIツールによってプロンプトの書き方や得意分野は大きく異なります。それぞれの特性を理解して使い分けましょう。

**ChatGPT / Claude / Gemini（文章生成AI）**
- 自然な日本語で指示を書く
- ロール設定やステップバイステップの指示が効果的
- 長い文脈を理解できるので、詳細な指示や資料の参照が可能
- 表・コード・Markdownなど構造的な出力に強い
- ChatGPTは創造的なライティングとコード生成に強く、Claudeは長文の分析・要約に優れ、Geminiはマルチモーダル（画像理解）に強み

**Stable Diffusion / Midjourney（画像生成AI）**
- 英語のキーワードをカンマ区切りで並べる「呪文形式」が主流
- 品質タグ（masterpiece, best quality）や重み付け \`(keyword:1.2)\` で結果を制御
- ネガティブプロンプトで不要な要素（bad hands, text, blurry）を排除
- Stable Diffusionは細かい制御に強く、Midjourneyはアーティスティックな仕上がりに強み

**DALL-E 3 / Nano Banana（次世代画像生成AI）**
- 自然な英語または日本語の文章で描写するスタイル
- スタイルや雰囲気を文章として表現する
- ChatGPTと統合して使えるDALL-Eは、対話的に画像を調整できる
- Nano Banana（Gemini 2.5 Flash Image）は既存画像の編集に強く、写真加工系プロンプトと相性が良い

Promptaでは、これら全ツールに対応した実用的なプロンプトを<a href="/prompts" class="text-sky-600 hover:underline">カテゴリ別に500+件公開</a>しています。`,
      },
      {
        title: 'プロンプト書き方のよくある失敗と改善方法',
        content: `プロンプトを書き始めたばかりの方が陥りがちな失敗パターンと、それを改善する方法を整理しました。

**失敗1: 指示が曖昧すぎる**
- ❌ NG例: 「文章を書いて」
- ✓ 改善: 「ITニュースサイト向けに、ChatGPT-5の発表内容を300文字で要約してください」

**失敗2: 1回で完璧を求めすぎる**
- ❌ NG例: 100行の超詳細プロンプトを書く
- ✓ 改善: 短いプロンプトから始めて、出力を見ながら追加指示で調整する

**失敗3: 出力形式を指定しない**
- ❌ NG例: 「メリットを教えて」
- ✓ 改善: 「メリットを箇条書きで5つ、それぞれに具体例を添えて教えて」

**失敗4: 背景情報を伝えない**
- ❌ NG例: 「タイトルを考えて」
- ✓ 改善: 「30代女性向けの美容ブログ記事のタイトルを、SEOキーワード『シミ ケア』を含めて10案考えてください」

**失敗5: AIの限界を理解していない**
AIは2025年までの学習データに基づいて回答するため、最新情報には弱い場合があります。リアルタイム情報が必要なときは、検索機能付きのAI（Perplexity、ChatGPT Search、Gemini）を使うか、自分で情報を提供する形にしましょう。

これらの失敗パターンは誰もが通る道です。気づいた時に修正していけば、確実にプロンプトスキルは向上します。`,
      },
      {
        title: 'プロンプトの業務活用例',
        content: `プロンプトは、すでに多くのビジネスシーンで実用されています。代表的な活用例を紹介します。

**ライティング・文書作成**
- ビジネスメール・お詫び文・お礼状の下書き
- ブログ記事・SNS投稿文の作成
- 議事録の要約・アクションアイテム抽出
- 提案書・企画書のドラフト生成

**マーケティング・営業**
- 顧客ペルソナの設計
- キャッチコピー・広告文の大量バリエーション生成
- 競合分析・市場調査レポートのドラフト
- セールスメール・テンプレートの個別化

**開発・データ分析**
- コード生成・コードレビュー・リファクタリング
- バグの原因調査・エラーメッセージの解説
- SQLクエリ作成・データ分析プログラム生成
- API仕様書・技術ドキュメントの作成

**画像制作・デザイン**
- SNS投稿用のオリジナル画像生成
- プロフィール写真の加工（似合う髪色シミュレーション、パーソナルカラー診断など）
- プレゼン資料用のアイキャッチ画像
- 商品ビジュアル・モックアップの生成

**教育・学習**
- 概念の説明・例え話の生成
- 練習問題・小テストの自動作成
- 言語学習の会話練習相手
- 専門書・論文の要約

業務でAIを使い始めるなら、まずは身近な作業から1つ選び、プロンプトテンプレートを作って繰り返し使うのがおすすめです。Promptaでは、<a href="/prompts" class="text-sky-600 hover:underline">業務カテゴリ別に実用プロンプトを公開</a>しているので、コピペで試してみてください。`,
      },
    ],
    faq: [
      { q: 'プロンプトは日本語で書けますか？', a: 'ChatGPT・Claude・Geminiなどの文章生成AIは日本語のプロンプトに完全対応しています。Stable Diffusion・Midjourneyなどの画像生成AIは英語が推奨されますが、Midjourney V6以降やDALL-E 3、Geminiの画像生成は日本語も理解できます。' },
      { q: 'プロンプトの書き方にルールはありますか？', a: '厳密なルールはありませんが、(1) 具体的かつ明確、(2) ロール設定、(3) 出力形式の指定、(4) 制約条件の明示、(5) 例示の5要素を意識すると確実に品質が上がります。' },
      { q: 'プロンプトエンジニアリングのスキルは必要ですか？', a: '基本的な使い方は誰でもすぐに始められます。しかし、プロンプトエンジニアリングのテクニックを学ぶことで、AIをより効果的に活用でき、業務効率の大幅な向上が期待できます。米国では「プロンプトエンジニア」という専門職も登場しています。' },
      { q: 'Few-Shotプロンプティングとは何ですか？', a: 'AIに対して期待する入出力の例を1〜3個示してから本番のタスクを依頼する手法です。「こんな感じで書いてください」と実例を見せることで、抽象的なルール定義よりもはるかに高い精度で期待通りの出力が得られます。' },
      { q: 'プロンプトに使える文字数に制限はありますか？', a: 'AIモデルごとに「コンテキストウィンドウ」と呼ばれる入力可能なトークン数の上限があります。GPT-4oは約128K、Claude 3.5 Sonnetは200K、Geminiは最大1Mトークンに対応しています。日本語1文字は約1〜2トークン換算です。画像生成AI（Stable Diffusion）は75トークン程度が実用的な上限です。' },
      { q: 'プロンプトの著作権はどうなりますか？', a: '一般に、プロンプト本文そのものはアイデアの表現として著作物性を持つ場合がありますが、判例は確立していません。Promptaで公開しているプロンプトは無料で個人・商用利用可能です。AIで生成された結果物の著作権・利用条件は各AIツールの利用規約に従ってください。' },
      { q: '画像生成AIと文章生成AIでプロンプトの書き方は同じですか？', a: '基本的な発想（具体的・明確に伝える）は共通ですが、記法が大きく異なります。文章生成AIは自然言語で文章として書きますが、画像生成AIはキーワードを並べる「呪文」形式が主流です。各ツール別のガイドは<a href="/guides" class="text-sky-600 hover:underline">使い方ガイド</a>を参照してください。' },
      { q: 'プロンプトで業務効率はどれくらい上がりますか？', a: 'タスクや使い方によりますが、ライティング業務で2〜5倍、コード生成で3〜10倍、定型文書作成で5倍以上の効率化が報告されています。重要なのは、AIに任せる部分と人間が判断する部分を切り分け、プロンプトのテンプレート化を進めることです。' },
    ],
  },
  'stable-diffusion-prompt-guide': {
    sections: [
      {
        title: 'Stable Diffusionのプロンプト基礎 — 仕組みと書き方',
        content: `Stable Diffusion（SD）のプロンプトは、生成したい画像の特徴を英語のキーワードで記述する「呪文」形式です。文章ではなくカンマ（,）区切りのキーワード列で、AIに「何を、どんなスタイルで、どんな品質で描いてほしいか」を伝えます。

**プロンプトの基本構文（推奨順序）：**

\`主題, スタイル, 品質タグ, 構図, 照明, 背景, 細部, 雰囲気\`

**例：**

\`beautiful girl, long hair, white dress, in garden, (masterpiece:1.2), (best quality:1.4), soft lighting, bokeh background\`

順序が重要な理由は、SDが**プロンプト前方のキーワードに強い重みを置く**ため。最も伝えたい要素（主題・スタイル）を先頭に、修飾要素（背景・照明）を後方に配置します。

ChatGPT や Claude のような文章生成AIとは違い、SDは「自然な日本語」では機能しません。**英単語＋カンマ＋重み付け** が共通言語です。本ガイドでは、髪型・服装・体型・構図・照明など実際のユースケースごとに、コピペできるサンプルプロンプトを提示します。`,
      },
      {
        title: '基本構文 — プロンプトを構成する 8 つの要素',
        content: `効果的な Stable Diffusion プロンプトは以下 8 つの要素から構成されます：

1. **主題 (Subject)** — 描きたい中心人物・物体（例：\`young woman\`, \`samurai\`, \`cat\`）
2. **スタイル (Style)** — アートスタイル指定（例：\`photorealistic\`, \`anime style\`, \`oil painting\`, \`watercolor\`）
3. **品質タグ (Quality)** — 品質向上ワード（例：\`masterpiece\`, \`best quality\`, \`ultra-detailed\`, \`8k\`）
4. **構図 (Composition)** — カメラアングル・距離（例：\`portrait\`, \`full body\`, \`from above\`, \`close-up\`）
5. **照明 (Lighting)** — 光の状態（例：\`soft lighting\`, \`golden hour\`, \`studio lighting\`, \`rim light\`）
6. **背景 (Background)** — 環境・場所（例：\`in garden\`, \`urban street\`, \`forest\`, \`solid white background\`）
7. **細部 (Details)** — 髪型・服装・表情など具体描写（例：\`long blonde hair\`, \`red kimono\`, \`smiling\`）
8. **雰囲気 (Mood)** — 全体トーン（例：\`dramatic\`, \`peaceful\`, \`mysterious\`, \`cinematic\`）

**順序の原則**：上記 1→8 の順番が概ね有効な記述順。ただし「強調したい要素」は順序を前に持ってくることで重みが上がります。

実際のプロンプト例（人物・全身ポートレート）：

\`young japanese woman, anime style, (masterpiece:1.3), (best quality:1.4), full body shot, soft natural lighting, traditional shrine background, long black hair, red kimono, gentle smile, serene atmosphere\``,
      },
      {
        title: '品質タグの使い方 — 高品質な生成結果のためのキーワード',
        content: `品質タグは Stable Diffusion 出力の品質を底上げする「呪文」です。**ほぼ全てのプロンプトに 2-4 個入れる**のが定番。

**基本品質タグ（最頻出）：**

- \`masterpiece\` — 傑作レベルの品質
- \`best quality\` — 最高品質
- \`high quality\` — 高品質
- \`ultra-detailed\` — 超精細描写
- \`8k\` / \`4k\` — 高解像度相当
- \`detailed face\` / \`detailed eyes\` — 顔・目を精細に
- \`sharp focus\` — 鮮明なピント

**スタイル系タグ：**

- \`photorealistic\` / \`realistic\` — 写実的
- \`anime style\` / \`manga style\` — アニメ・漫画調
- \`oil painting\` — 油絵調
- \`watercolor\` — 水彩画調
- \`cinematic\` — シネマティック
- \`octane render\` / \`unreal engine\` — 3DCG レンダラー風

**作家・モデル系タグ（影響度大）：**

- \`by Greg Rutkowski\` — ファンタジー絵師風
- \`by Studio Ghibli\` — ジブリ風
- \`Artstation trending\` — Artstation 人気作風

これらを 3-5 個組み合わせるのが基本テクニック。例：\`(masterpiece:1.2), (best quality:1.4), ultra-detailed, sharp focus, cinematic lighting\``,
      },
      {
        title: '強調と重み付け — 括弧と数値で意図を伝える',
        content: `Stable Diffusion では、特定キーワードの影響度を**数値で精密にコントロール**できます。

**重み付け記法：**

| 記法 | 効果 | 例 |
|---|---|---|
| \`(word)\` | 1.1 倍に強調 | \`(beautiful)\` |
| \`((word))\` | 1.21 倍に強調 | \`((beautiful))\` |
| \`(word:1.3)\` | 1.3 倍に強調（推奨） | \`(masterpiece:1.3)\` |
| \`(word:0.5)\` | 0.5 倍に弱める | \`(blurry:0.5)\` |
| \`[word]\` | 0.91 倍に弱める | \`[shadows]\` |

**推奨範囲**：\`0.5\` 〜 \`1.5\`。\`1.5\` 超えると画像が崩れやすく、\`0.3\` 未満はほぼ無視されます。

**実用テクニック：**

- 品質タグは \`(masterpiece:1.2), (best quality:1.4)\` のように **1.2-1.4** で強調
- 主題の細部（顔・目）は \`(detailed face:1.3), (detailed eyes:1.2)\` で明示強調
- 不要要素（影や血色）は \`[shadows]\` や \`(red face:0.5)\` で抑制

**BREAK キーワード（一部 UI で対応）：**

\`a girl, red hair BREAK a boy, blue eyes\`

→ AI に「区切り」を伝え、2 つの要素を独立して処理。混色防止に有効。`,
      },
      {
        title: 'モデル別のプロンプト戦略 — Realistic / Anime / Fantasy',
        content: `Stable Diffusion はモデル（チェックポイント）ごとに**得意なスタイルが異なります**。同じプロンプトでも結果は全く違います。代表 3 系統の書き分け：

**1. リアル系モデル（Realistic Vision, Juggernaut, epiCRealism など）**

- プロンプト方針：写真的なキーワードを重視
- 必須タグ：\`photorealistic, RAW photo, professional photography, 8k, ultra-detailed\`
- 照明指定：\`studio lighting, soft natural light, golden hour\` など具体的に
- ネガティブ重視：\`(anime:1.2), illustration, painting, cartoon, drawing\` を抑制

**2. アニメ系モデル（Anything V5, Counterfeit, MeinaMix など）**

- プロンプト方針：アニメ用語・danbooru タグを活用
- 必須タグ：\`anime style, masterpiece, best quality, illustration\`
- danbooru タグ例：\`1girl, solo, long_hair, school_uniform\`（アンダーバー区切り）
- スタイル強調：\`(anime screencap:1.2), kawaii, manga style\`

**3. ファンタジー / アート系モデル（Dreamshaper, Deliberate, Realistic Vision Fantasy）**

- プロンプト方針：作家名・絵画用語を活用
- 必須タグ：\`fantasy art, concept art, detailed, dramatic\`
- 作家タグ：\`by Greg Rutkowski, by Akihiko Yoshida, Artstation\`
- 雰囲気タグ：\`epic, mystical, atmospheric, ethereal\`

prompta.jp で公開している Stable Diffusion プロンプトは <a href="/tools/stable-diffusion" class="text-sky-600 hover:underline">/tools/stable-diffusion</a> から閲覧できます。`,
      },
      {
        title: 'Stable Diffusion 髪型プロンプト — コピペできる実例',
        content: `「stable diffusion 髪型」「sd 髪型 プロンプト」で検索されるユースケース向け。髪型は SD で**最もコントロールしやすい要素**の一つ。

**髪の長さ：**

- \`short hair\` — ショートヘア
- \`medium hair\` / \`shoulder-length hair\` — セミロング
- \`long hair\` — ロングヘア
- \`very long hair\` — 超ロング（背中以下）
- \`buzz cut\` — 坊主に近い超短髪

**髪型スタイル：**

- \`ponytail\` — ポニーテール
- \`twintails\` / \`pigtails\` — ツインテール
- \`braided hair\` / \`braids\` — 編み込み・三つ編み
- \`bob cut\` / \`bob\` — ボブカット
- \`bun\` — お団子
- \`curly hair\` — 巻き髪
- \`straight hair\` — ストレート
- \`wavy hair\` — ウェーブ
- \`pixie cut\` — ピクシーカット

**髪色：**

- \`black hair\`, \`brown hair\`, \`blonde hair\`, \`silver hair\`, \`pink hair\`, \`red hair\`, \`blue hair\`, \`gradient hair\`

**前髪：**

- \`bangs\` — 前髪あり
- \`hime cut\` / \`hime bangs\` — 姫カット前髪
- \`side-swept bangs\` — 流し前髪
- \`forehead\` — 前髪なし（おでこ出し）

**実例プロンプト（ロング・編み込み）：**

\`young woman, (masterpiece:1.2), (best quality:1.4), portrait, long braided hair, blonde hair, hime bangs, gentle smile, soft lighting, sharp focus\`

より多くの髪型サンプルは <a href="/prompts/hairstyle" class="text-sky-600 hover:underline">/prompts/hairstyle</a> で公開中。日本人モデル向け詳細は <a href="/guides/hairstyle-prompt-guide" class="text-sky-600 hover:underline">髪型プロンプト完全ガイド</a> を参照してください。`,
      },
      {
        title: 'Stable Diffusion 服装プロンプト — 和洋・ファンタジーまで',
        content: `「stable diffusion 服装」向け。服装プロンプトは**素材・カット・色**の 3 軸で記述すると精度が上がります。

**和装：**

- \`kimono\` / \`furisode\`（振袖）/ \`yukata\`（浴衣）
- \`hakama\` / \`samurai armor\`
- \`shrine maiden outfit\` / \`miko\`（巫女）
- 色指定：\`red kimono with floral pattern\`, \`navy yukata\`

**現代カジュアル：**

- \`white t-shirt\`, \`blue jeans\`, \`hoodie\`, \`sneakers\`
- \`oversized sweater\`, \`crop top\`, \`high-waisted skirt\`
- \`denim jacket\`, \`leather jacket\`, \`bomber jacket\`

**フォーマル：**

- \`business suit\`, \`black blazer\`, \`pencil skirt\`
- \`elegant evening gown\`, \`tuxedo\`
- \`white dress shirt with tie\`

**ファンタジー・コスプレ：**

- \`fantasy armor\`, \`mage robe\`, \`elven dress\`, \`knight in shining armor\`
- \`cyberpunk outfit\`, \`sci-fi suit\`, \`mecha pilot suit\`
- \`magical girl uniform\`, \`gothic lolita\`

**学校・制服：**

- \`school uniform\`, \`sailor uniform\`, \`blazer uniform\`
- \`japanese high school uniform\`, \`college blazer\`

**実例プロンプト（フォーマル・スーツ）：**

\`businesswoman portrait, (masterpiece:1.3), (best quality:1.4), wearing black tailored business suit, white shirt, confident expression, modern office background, soft window lighting\`

より多くの服装サンプルは <a href="/prompts/clothing" class="text-sky-600 hover:underline">/prompts/clothing</a> で公開中。コスプレ向けは <a href="/prompts/cosplay" class="text-sky-600 hover:underline">/prompts/cosplay</a> も合わせてどうぞ。`,
      },
      {
        title: 'Stable Diffusion 体型・身長プロンプト — 多様な人物造形',
        content: `「stable diffusion 体型」「プロンプト 身長」「プロンプト 体格」向け。体型表現は **danbooru タグ + 自然語** の組み合わせが効果的。

**体型（基本）：**

- \`slim\` — 細身
- \`slender\` — スリム
- \`athletic build\` — アスリート体型
- \`muscular\` — 筋肉質
- \`curvy\` — グラマラス
- \`petite\` — 小柄
- \`tall\` — 長身
- \`average build\` — 平均体型

**プロポーション系：**

- \`long legs\` — 脚長
- \`short legs\` — 脚短め
- \`wide hips\` — ヒップ広め
- \`narrow waist\` — 細いウエスト
- \`broad shoulders\` — 肩幅広い
- \`small frame\` — 小柄なフレーム

**身長・年代の表現：**

- \`adult woman\` / \`adult man\` — 成人
- \`teenager\` / \`young adult\` — 10 代後半-20 代前半
- \`young woman in her twenties\` — 20 代
- \`mature woman\` — 落ち着いた大人
- 注：年齢表現は明確な英語表現を使用、未成年扱いになる曖昧表現は避ける

**人種・国籍（モデル特性として）：**

- \`japanese\` / \`asian\` / \`european\` / \`african\` / \`hispanic\`
- \`japanese woman\`, \`korean man\` — 国籍明示

**実例プロンプト（長身・アスリート）：**

\`tall athletic japanese woman, (masterpiece:1.3), (best quality:1.4), full body, long legs, slender build, sportswear, dynamic pose, studio lighting, gradient background\`

より多くの体型サンプルは <a href="/prompts/body-type" class="text-sky-600 hover:underline">/prompts/body-type</a> で公開中。詳細解説は <a href="/guides/body-type-prompt-guide" class="text-sky-600 hover:underline">体型プロンプト完全ガイド</a> を参照してください。`,
      },
      {
        title: '背景・構図プロンプト — カメラアングルと環境設定',
        content: `背景と構図は同じ主題でも**雰囲気を一変させる**重要な要素です。

**カメラアングル（重要）：**

- \`portrait\` / \`headshot\` — 顔・胸から上
- \`upper body shot\` — 上半身
- \`full body shot\` — 全身
- \`from above\` / \`top-down view\` — 俯瞰
- \`from below\` / \`low angle\` — あおり
- \`side view\` / \`profile\` — 横顔
- \`back view\` / \`from behind\` — 後ろ姿
- \`close-up\` — 接写
- \`wide shot\` — 引き
- \`dutch angle\` — 斜め構図

**背景（環境）：**

- \`solid white background\` / \`plain background\` — 無地（証明写真風）
- \`simple background\` — シンプル背景
- \`outdoor\` / \`indoor\` — 屋外・屋内
- \`urban street\` / \`tokyo street at night\` — 都市
- \`forest\` / \`beach\` / \`mountain\` — 自然
- \`japanese garden\` / \`shrine\` / \`temple\` — 日本的
- \`cyberpunk city\` / \`futuristic interior\` — SF
- \`studio backdrop\` / \`gradient background\` — スタジオ

**ポーズ：**

- \`standing\`, \`sitting\`, \`walking\`, \`running\`
- \`looking at viewer\` — カメラ目線
- \`looking away\`, \`looking back\`, \`looking up\`
- \`hand on hip\`, \`arms crossed\`, \`peace sign\`

**構図テクニック：**

- \`rule of thirds\` — 三分割法
- \`centered composition\` — センター構図
- \`bokeh background\` / \`shallow depth of field\` — ボケ
- \`cinematic composition\` — 映画的構図

prompta.jp の <a href="/prompts/camera" class="text-sky-600 hover:underline">/prompts/camera</a> ではカメラ・構図特化のプロンプト集を公開中です。`,
      },
      {
        title: '照明・雰囲気プロンプト — 光が画像の印象を決める',
        content: `照明は画像の**印象を最も左右する要素**。同じ主題でも照明次第で「日中の爽やかさ」「夕暮れの哀愁」「夜の神秘性」と劇的に変わります。

**自然光：**

- \`natural lighting\` — 自然光（万能）
- \`golden hour\` / \`sunset light\` — 黄金時刻・夕陽
- \`blue hour\` — 青の時刻（日の出前・日没後）
- \`overcast lighting\` — 曇り空の柔らかい光
- \`morning light\` / \`afternoon sun\` — 朝・昼の光

**人工光・スタジオ：**

- \`studio lighting\` — スタジオ照明
- \`softbox lighting\` — ソフトボックス光
- \`rim light\` / \`back light\` — リムライト・逆光
- \`spotlight\` — スポットライト
- \`neon lights\` — ネオン（サイバーパンク必須）

**雰囲気タグ：**

- \`dramatic lighting\` — ドラマチックな光
- \`cinematic lighting\` — 映画的照明
- \`soft lighting\` — 柔らかい光
- \`harsh lighting\` — 強い光
- \`volumetric lighting\` — 体積光（霧の中の光線）
- \`god rays\` — 神々しい光線

**色温度・色調：**

- \`warm color tone\` — 暖色寄り
- \`cool color tone\` — 寒色寄り
- \`monochrome\` / \`black and white\` — モノクロ
- \`sepia tone\` — セピア
- \`pastel colors\` — パステル

**実例（黄金時刻・ポートレート）：**

\`young woman portrait, (masterpiece:1.3), golden hour lighting, soft warm tones, rim light from behind, cinematic depth of field, dreamy atmosphere\``,
      },
      {
        title: 'ネガティブプロンプト完全版 — 品質と意図ズレを防ぐ',
        content: `ネガティブプロンプトは、生成結果から**除外したい要素**を指定します。Stable Diffusion で品質を担保する**最重要テクニック**。

**汎用品質ネガティブ（ほぼ全プロンプトに使う）：**

\`(worst quality:1.4), (low quality:1.4), normal quality, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry\`

**人物アナトミー強化（手・顔の崩れ防止）：**

\`extra arms, extra legs, extra fingers, missing arms, missing legs, fused fingers, deformed hands, ugly face, asymmetric eyes, cross-eyed, mutation, disfigured\`

**スタイル不一致防止（リアル系モデルで使用）：**

\`anime, illustration, painting, drawing, sketch, cartoon, manga, 3d render\`

**スタイル不一致防止（アニメ系モデルで使用）：**

\`photorealistic, realistic, photograph, 3d render, RAW photo\`

**NSFW 防止（重要）：**

\`nsfw, nude, naked, sexually suggestive, explicit content\`

**フル例（リアル系・ポートレート）：**

\`(worst quality:1.4), (low quality:1.4), bad anatomy, bad hands, text, watermark, signature, blurry, extra arms, fused fingers, deformed hands, anime, illustration, painting, cartoon, nsfw\`

ネガティブプロンプトは**ほぼテンプレ化**できる要素。一度自分のお気に入りパターンを作って、各生成で使い回すのが効率的です。`,
      },
      {
        title: 'ステップ数・サンプラー・CFG の推奨設定',
        content: `Stable Diffusion はプロンプト以外に、**生成パラメータ**も品質を左右します。

**ステップ数 (Steps)：**

- **20-30** — 高速・実用品質（推奨デフォルト）
- **40-50** — 高品質・細部まで描き込み
- **60+** — 微改善のみ、コスパ悪

**サンプラー (Sampler) — 用途別おすすめ：**

| サンプラー | 特徴 | 用途 |
|---|---|---|
| **DPM++ 2M Karras** | 万能・高速 | 推奨デフォルト |
| **DPM++ SDE Karras** | 高品質 | じっくり生成 |
| **Euler a** | 創造性高い | アート系 |
| **DDIM** | 一貫性高い | 動画用 |
| **UniPC** | 高速 | 高速確認 |

**CFG Scale (Classifier-Free Guidance)：**

- **5-7** — プロンプトに緩く従う、創造性余地あり
- **7-9** — 標準（推奨デフォルト）
- **10-13** — プロンプトに厳密、過剰彩度の傾向
- **15+** — 画像が崩れる可能性大

**Seed (シード値)：**

- 同じシード + 同じプロンプト = 同じ画像
- 気に入った構図のシードを保存しておくと、プロンプト微調整で別バリエーション作成可能

**Resolution (解像度)：**

- 推奨：\`512x512\` (SD1.5) / \`768x768\` (SD2.x) / \`1024x1024\` (SDXL)
- 大きすぎると体や顔が複数生成される（multiple heads 問題）
- 大きい画像は **Hi-Res Fix** や **img2img upscale** で対応

**推奨デフォルト構成（初心者向け）：**

\`Steps: 28, Sampler: DPM++ 2M Karras, CFG Scale: 7, Resolution: 512x768 (portrait) / 768x512 (landscape)\``,
      },
      {
        title: 'トラブルシューティング — 手・顔の崩れを修正する',
        content: `Stable Diffusion で**最も発生しやすい品質問題**と対処法：

**問題 1：手の指が崩れる（多指・癒着・歪み）**

- ネガティブに追加：\`bad hands, deformed hands, fused fingers, extra fingers, missing fingers, mutated hands, poorly drawn hands\`
- ポジティブに追加：\`detailed hands, beautiful hands, perfect anatomy\`
- 手のポーズを明示：\`hand on hip\`, \`hand on face\` など具体的に
- **後処理**：手だけ inpainting で再生成（ADetailer 等のツール推奨）

**問題 2：顔がぼやける・崩れる**

- ポジティブに追加：\`(detailed face:1.3), (detailed eyes:1.2), beautiful eyes, perfect face\`
- ネガティブに追加：\`ugly face, asymmetric eyes, cross-eyed, blurry face, deformed face\`
- 解像度を上げる（512x512 では顔が小さすぎて崩れやすい）
- **ADetailer** や **face restoration** ツールで自動補正

**問題 3：体が複数になる・頭が 2 つある**

- 解像度を SD1.5 で 768x768 以下に下げる（SDXL は 1024 OK）
- ネガティブに追加：\`multiple heads, multiple people, extra arms, extra legs, twins, clones\`

**問題 4：プロンプトが効かない**

- 重要要素を先頭に移動
- 重み付け強化：\`(important_thing:1.4)\`
- ネガティブ過剰を見直す（10 個以上は副作用）
- モデル選択を疑う（リアル系で「anime」を指定しても効果薄い）

**問題 5：似たような画像ばかり生成される**

- Seed を変更（-1 にすればランダム）
- CFG Scale を下げる（7→5 で創造性増）
- Sampler を変更（Euler a で別の出力傾向）
- LoRA / Embedding を活用してスタイル拡張`,
      },
      {
        title: '作品例 — 即使える prompta.jp のサンプル一覧',
        content: `理論を学んだ後は実例で試すのが早道。Stable Diffusion 対応のサンプルプロンプトを <a href="/tools/stable-diffusion" class="text-sky-600 hover:underline">/tools/stable-diffusion</a> から閲覧できます（無料・コピペ可）。

**カテゴリ別おすすめ：**

- 👤 **人物・ポートレート** — <a href="/prompts/hairstyle" class="text-sky-600 hover:underline">髪型</a> / <a href="/prompts/clothing" class="text-sky-600 hover:underline">服装</a> / <a href="/prompts/body-type" class="text-sky-600 hover:underline">体型</a>
- 🎨 **スタイル** — <a href="/prompts/anime" class="text-sky-600 hover:underline">アニメ</a> / <a href="/prompts/color" class="text-sky-600 hover:underline">カラー指定</a>
- 📷 **撮影・構図** — <a href="/prompts/camera" class="text-sky-600 hover:underline">カメラ・アングル</a>
- 🎭 **テーマ** — <a href="/prompts/cosplay" class="text-sky-600 hover:underline">コスプレ</a> / <a href="/prompts/costume" class="text-sky-600 hover:underline">衣装</a>

**関連ガイド：**

- <a href="/guides/hairstyle-prompt-guide" class="text-sky-600 hover:underline">髪型プロンプト完全ガイド</a> — 日本人モデル向け詳細解説
- <a href="/guides/body-type-prompt-guide" class="text-sky-600 hover:underline">体型プロンプト完全ガイド</a> — 多様な人物造形
- <a href="/guides/color-prompt-guide" class="text-sky-600 hover:underline">カラープロンプトガイド</a> — 色彩設計
- <a href="/guides/negative-prompt-guide" class="text-sky-600 hover:underline">ネガティブプロンプトガイド</a> — 品質改善の必須テクニック
- <a href="/guides/cosplay-prompt-guide" class="text-sky-600 hover:underline">コスプレプロンプトガイド</a> — キャラクター再現

**他ツールとの使い分け：**

- アニメ・イラスト系を素早く生成したい → <a href="/tools/midjourney" class="text-sky-600 hover:underline">Midjourney</a>
- 文章で説明的に指示したい → <a href="/tools/dall-e" class="text-sky-600 hover:underline">DALL-E 3</a> や <a href="/tools/gemini" class="text-sky-600 hover:underline">Gemini</a>
- 写真を編集したい → <a href="/prompts/photo-edit" class="text-sky-600 hover:underline">写真加工プロンプト</a>`,
      },
    ],
    faq: [
      { q: 'Stable Diffusionのプロンプトは何語で書きますか？', a: '基本的に英語で記述します。SD は英語コーパスで学習されているため、日本語より英語の方が圧倒的に高品質な結果が得られます。日本人モデルを描く場合も「japanese woman」のように英単語で指定します。' },
      { q: 'プロンプトの長さに制限はありますか？', a: 'CLIP モデルのトークン上限が 75 トークン（英単語約 50-60 個）です。これを超える部分は無視されるか、影響が極端に弱まります。重要なキーワードを必ず先頭に配置し、不要な装飾は削ぎ落とすのがコツ。WebUI によっては「BREAK」キーワードで複数チャンクに分割可能です。' },
      { q: '品質タグ（masterpiece など）は本当に効果がありますか？', a: 'はい、特にアニメ系モデル（Anything V5、Counterfeit など）では顕著に効果があります。これらモデルが Danbooru タグでファインチューニングされており、「masterpiece」「best quality」が高評価画像のメタタグとして学習されているためです。リアル系モデルでは効果は穏やかですが、入れて損はありません。' },
      { q: 'ネガティブプロンプトはどれくらい入れるべきですか？', a: '15-25 個程度がバランス良いです。少なすぎると品質ガードが効かず、多すぎる（30 個超）と副作用で本来描きたい要素まで除外される場合があります。テンプレートとして「品質系 5 個 + アナトミー系 5 個 + スタイル排除 3-5 個」をベースに、ケースごとに 2-3 個追加するのが実用的。' },
      { q: '生成された画像の手や顔が崩れます。どう改善できますか？', a: '3 つのアプローチがあります。(1) ネガティブプロンプトに「bad hands, deformed hands, fused fingers, asymmetric eyes」を追加。(2) ポジティブに「detailed face, detailed eyes」と重み付け（1.2-1.3）を入れる。(3) 解像度を 768x768 以上に上げ、ADetailer 等の自動補正ツールで顔・手を再生成。詳しくは本ページ「トラブルシューティング」セクションをご覧ください。' },
      { q: 'プロンプトの順序は本当に大事ですか？', a: 'はい。SD は前方のキーワードに強い重みを置きます。同じ単語でも「woman, red hair」と「red hair, woman」では結果が異なります。主題 → スタイル → 品質 → 構図 → 詳細の順が定石。重み付け「(word:1.3)」で順序を覆すこともできますが、本質的には順序設計が先決です。' },
      { q: 'おすすめの SD モデル（チェックポイント）は？', a: '用途別に分かれます。(1) リアル系：Realistic Vision V6.0 / Juggernaut XL / epiCRealism。(2) アニメ系：Anything V5 / Counterfeit V3 / MeinaMix。(3) ファンタジー：Dreamshaper / Deliberate。SDXL 系を使う場合は SDXL Base 1.0 + Refiner の組み合わせが標準。モデル選びでプロンプトの書き方も変わる点に注意。' },
      { q: 'Stable Diffusion を無料で試せますか？', a: 'はい。ローカル PC（NVIDIA GPU 推奨、VRAM 6GB 以上）で AUTOMATIC1111 や ComfyUI を無料インストール可能。クラウドなら Google Colab（無料枠あり）、Civitai（オンライン生成あり）、Hugging Face Spaces（一部無料）が選択肢。商用利用したい場合は各モデルライセンス確認が必要。prompta.jp のプロンプト集は全て無料でコピペ可能です。' },
    ],
  },
  'midjourney-prompt-guide': {
    sections: [
      {
        title: 'Midjourneyプロンプトの基本',
        content: `Midjourneyは、Discordベースの画像生成AIツールです。プロンプトは自然な英語の文章で記述でき、Stable Diffusionよりも直感的に使えます。

基本構文：\`/imagine prompt: [画像の説明] --[パラメータ]\`

Midjourneyの特徴は、アーティスティックな解釈力にあります。シンプルなプロンプトでも、独特の美しいスタイルで画像が生成されます。`,
      },
      {
        title: '主要パラメータ',
        content: `Midjourneyでは、パラメータを使って生成結果を細かく制御できます：

- **--ar** — アスペクト比（例: --ar 16:9, --ar 2:3）
- **--v** — バージョン指定（例: --v 6）
- **--s** — スタイライゼーション（0-1000、高いほどアーティスティック）
- **--q** — 品質（.25, .5, 1）
- **--niji** — アニメ風スタイル用のモデル
- **--no** — 特定要素の除外（例: --no text）`,
      },
    ],
    faq: [
      { q: 'Midjourneyは無料で使えますか？', a: 'Midjourneyは有料サブスクリプション制です。月額プランに加入することで、一定数の画像を生成できます。' },
    ],
  },
  'chatgpt-prompt-techniques': {
    sections: [
      {
        title: 'ChatGPTプロンプトの基本テクニック',
        content: `ChatGPTで効果的な結果を得るための基本テクニックを紹介します。

**ロール設定**: 「あなたは○○の専門家です」と役割を与えることで、その分野に特化した回答を引き出せます。

**ステップバイステップ指示**: 複雑なタスクを段階的に分解して指示することで、より正確な結果が得られます。

**出力形式の指定**: 「箇条書きで」「表形式で」「JSON形式で」など、出力形式を明示することで、使いやすい結果を得られます。`,
      },
      {
        title: '高度なテクニック',
        content: `**Few-Shot プロンプティング**: 期待する入出力の例を1-3個提示することで、AIの理解を助けます。

**Chain of Thought**: 「ステップバイステップで考えてください」と指示することで、論理的な推論を促し、より正確な回答を引き出せます。

**制約付きプロンプト**: 文字数、トーン、フォーマットなどの制約を明確にすることで、期待通りの出力を得やすくなります。`,
      },
    ],
    faq: [
      { q: 'ChatGPTとClaudeでプロンプトの書き方は違いますか？', a: '基本的なテクニックは共通ですが、各モデルの特性に合わせた調整が効果的です。Claudeは長文理解と分析に強く、ChatGPTは創造性とコード生成に強い傾向があります。' },
    ],
  },
  'prompt-language-game': {
    sections: [
      {
        title: 'なぜあなたのプロンプトは機能しないのか',
        content: `「条件を細かく書いたのに、AIが思った通りに動かない」「JSON形式で出力させようとしたら、少しでも入力が変わると壊れる」——プロンプトを書いていて、こんな経験はありませんか？

実は多くの人が、プロンプトを「コード」のように書いてしまっています。複雑な変数、厳密な出力フォーマット、分岐条件の羅列。AIを「感情のないコンパイラ」として扱い、ルールでガチガチに縛ろうとする発想です。

しかし、最新のChatGPTやClaudeの真価を引き出すには、まったく違うアプローチが必要です。その答えは、20世紀最大の哲学者ルートヴィヒ・ヴィトゲンシュタインの「大転換」のなかにあります。`,
      },
      {
        title: '前期ヴィトゲンシュタイン：言語は「世界の鏡」である',
        content: `若き日のヴィトゲンシュタインは、主著『論理哲学論考』の中で次のように主張しました。

> 言語は世界の論理的写像（鏡）である。

つまり、言葉と現実は「1対1」で厳密に対応すべきであり、曖昧さは許されない、という考え方です。すべての文は明確な真偽を持ち、論理的に分析できるはずだ——これが前期ヴィトゲンシュタインの世界観でした。

この発想は、私たちがプロンプトを書く時の発想とそっくりです。「Aの場合はBを出力、Cの場合はDを出力」「必ずJSONで返せ」「次のスキーマに従え」——AIを論理回路のように扱い、入力と出力を厳密に対応させようとするのです。

この方法には致命的な弱点があります。**少しでも条件が外れると、回答全体が崩壊してしまう**のです。現実の対話は無限のバリエーションを持つのに、有限のルールでそれを縛ることは原理的に不可能だからです。`,
      },
      {
        title: '後期ヴィトゲンシュタイン：言語は「道具箱」である',
        content: `その後、ヴィトゲンシュタイン自身が自らの理論を覆します。遺稿『哲学探究』の中で、彼は画期的な概念を提示しました。

> 言語の意味とは、その使用である。

言葉は死んだ「鏡」ではなく、ハンマーやノコギリ、ドライバーが入った「道具箱」のようなものだ、と。同じハンマーでも、釘を打つこともできれば、壁を壊すこともできる。意味は道具そのものではなく、それを「どう使うか」にあるのです。

この考え方を、ヴィトゲンシュタインは「**言語ゲーム**（Language Game）」と呼びました。言葉は孤立した記号ではなく、特定の状況・目的・参加者のなかで初めて意味を持つ。意味とは辞書の定義ではなく、その時の文脈と意図によって生まれるものなのです。`,
      },
      {
        title: '「水！」が教えてくれること',
        content: `具体的な例を考えてみましょう。誰かが一言「水！」と叫んだとします。

前期ヴィトゲンシュタインの「鏡」の考え方なら、これは単なるH2Oという物質の描写です。しかし、現実にはそんなはずがありません。

- **砂漠で叫べば** → 「水を飲ませてくれ」（生存の意図）
- **火事の現場で叫べば** → 「水で火を消してくれ」（消火の意図）
- **絵画教室で叫べば** → 「水彩用の水を取って」（道具の要求）
- **レストランで叫べば** → 「水をください」（注文）

同じ言葉なのに、意味は完全に変わります。言葉の意味は辞書的な定義ではなく、その時の「**状況**」と「**目的**」によって決まるのです。

これは、AIへのプロンプトにも全く同じことが言えます。「箇条書きで」という指示も、ビジネスメールの中なのか、技術ドキュメントの中なのか、子供向け教材の中なのかで、求められる粒度・トーン・構造は完全に変わります。文脈なしのルールは無力なのです。`,
      },
      {
        title: 'OpenAIとAnthropicの公式ガイドラインが証明する「後期哲学」',
        content: `驚くべきことに、トップAI企業であるOpenAIとAnthropic（Claude開発元）の公式プロンプトガイドラインは、すべて「後期ヴィトゲンシュタイン」の哲学を裏付けています。

**1. 十分な文脈を与える（Give Context）**
孤立した指示ではなく、背景・目的・対象読者・制約条件を共有します。AIは「言語ゲームの舞台」を理解して初めて、正しい意図を汲み取れます。

**2. 具体例を示す（Provide Examples / Few-Shot）**
抽象的なルールを延々と定義するより、「実際の使用例」を2〜3個見せる方が圧倒的に効果的です。ヴィトゲンシュタインが「意味は使用である」と言ったように、AIも「使い方の実例」から意図を学びます。

**3. 優秀なインターンとして扱う**
Anthropicの公式ドキュメントでは、Claudeへのプロンプトを「優秀だが新人のインターンに仕事を依頼する」イメージで書くことを推奨しています。疑似コードで命令するのではなく、**意図を共有する対話**を行う、ということです。

これらは偶然ではありません。最新のLLMは、もはや「指示待ちの機械」ではないのです。`,
      },
      {
        title: '結論：プロンプトは「対話」である',
        content: `「完璧でエラーの起きない長文プロンプト」を書こうと消耗するのはやめましょう。これからは「**どう制約を書くか**」ではなく、「**どう文脈と意図を伝えるか**」へシフトする時代です。

プロンプトを書くことは、プログラミングではありません。AIという知性との、高度な「**言語ゲーム**」なのです。

実践的に言えば、次の3つを意識するだけでプロンプトの質は劇的に変わります：

1. **背景を語る** — なぜそれが必要なのか、誰のためなのか、どう使われるのか
2. **例を見せる** — 抽象ルールより、理想の出力例を1〜3個
3. **対話する** — 完璧を1回で求めず、出力を見て調整する

AIの進化は「前期（論理）」から「後期（言語ゲーム）」へ。この視点を持つだけで、ChatGPTやClaudeがあなたの真のパートナーになります。`,
      },
    ],
    faq: [
      {
        q: 'プロンプトに厳密なルールやJSON出力指定は完全に不要ですか？',
        a: 'いいえ、不要というわけではありません。データ処理や API 連携など、機械的な厳密さが本当に必要な場面では有効です。ただし、その場合でも「なぜその形式が必要なのか」という文脈を併せて伝えることで、AI の崩壊しにくさが大きく変わります。ルールは「補助」、文脈と意図が「主役」と考えるのが本質的なアプローチです。',
      },
      {
        q: 'Few-Shot プロンプティングとはどう違うのですか？',
        a: 'Few-Shot は「言語ゲーム」哲学の最も実践的な応用です。「水！」の例で言えば、同じシーンの実例を2〜3個見せることで、AIに「この状況での意図」を理解させる手法です。ヴィトゲンシュタインが「意味は使用である」と言った通り、抽象的な定義よりも実例の方がはるかに効率的に意図を伝えられます。',
      },
      {
        q: 'この考え方はChatGPTとClaudeのどちらでも有効ですか？',
        a: 'はい、両方で有効です。むしろ最新世代のモデル（GPT-4o、Claude 3.5 Sonnet 以降）になるほど、文脈理解力が高くなっているため、この「言語ゲーム」アプローチの効果が大きくなります。Gemini や国産モデルでも同様のアプローチが有効です。',
      },
      {
        q: '画像生成 AI（Stable Diffusion / Midjourney）にも同じ考え方が当てはまりますか？',
        a: '部分的に当てはまります。Stable Diffusion はトークンベースの解釈なので「キーワード列挙」スタイルが今も主流ですが、Midjourney V6 以降や DALL-E 3 は自然言語の文脈理解力が高く、「シーン全体を描写する」スタイルの方が良い結果を生みます。テキスト AI ほど顕著ではないものの、文脈と意図を伝える発想は画像生成にも応用できます。',
      },
    ],
  },
  'negative-prompt-guide': {
    sections: [
      {
        title: 'ネガティブプロンプトとは',
        content: `ネガティブプロンプトは、AI画像生成において「生成してほしくない要素」を指定する機能です。Stable DiffusionやMidjourneyなどの画像生成AIで使用され、出力品質を大幅に向上させる重要なテクニックです。

例えば、人物画像を生成する際に「bad hands, extra fingers」をネガティブプロンプトに設定することで、手の描写が改善されます。`,
      },
      {
        title: '汎用ネガティブプロンプト',
        content: `ほぼすべての画像生成で使える基本ネガティブプロンプト：

\`(worst quality:1.4), (low quality:1.4), normal quality, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry, deformed, disfigured, mutation, extra limbs\`

このテンプレートをベースに、生成する画像の内容に応じて項目を追加・削除して使用します。`,
      },
    ],
    faq: [
      { q: 'ネガティブプロンプトは必須ですか？', a: '必須ではありませんが、使用することで画像品質が大幅に向上します。特にStable Diffusionでは、ネガティブプロンプトなしだと品質の低い画像が生成されやすいため、常に使用することを推奨します。' },
    ],
  },
  'hairstyle-prompt-guide': {
    sections: [
      {
        title: '髪型プロンプトの基本 — 長さ×スタイル×色の 3 軸',
        content: `AI画像生成で髪型を指定するプロンプトは、以下の 3 軸の組み合わせで構成します：

**1. 長さ**: \`very long hair\` / \`long hair\` / \`medium hair\` / \`short hair\` / \`very short hair\`
**2. スタイル**: \`straight\` / \`wavy\` / \`curly\` / \`ponytail\` / \`twin tails\` / \`braid\` / \`bun\` / \`bob\`
**3. 色**: \`blonde\` / \`black hair\` / \`silver hair\` / \`pink hair\` / \`blue hair\`

基本テンプレート：
\`1girl, long wavy blonde hair, blue eyes, blunt bangs, hair ribbon\`

さらに前髪（\`blunt bangs\` / \`side-swept bangs\` / \`parted bangs\`）と質感（\`silky\` / \`fluffy\` / \`glossy\`）を加えると精度が上がります。

**重要ポイント**: 髪型は他の要素（服装・ポーズ）より**プロンプトの前方に書く**と優先されます。また \`(twin tails:1.2)\` のように重み付けを加えると AI が確実に認識しやすくなります。`,
      },
      {
        title: '女性キャラ定番ヘアスタイル 20 選とコピペ呪文',
        content: `すぐに使える 20 種類の髪型プロンプトです：

**ロング系**:
1. \`long straight hair\` — ストレートロング
2. \`very long hair, waist-length\` — 超ロング
3. \`long wavy hair\` — ウェーブロング
4. \`long curly hair\` — カーリーロング

**ミディアム系**:
5. \`medium hair, shoulder-length\` — 肩丈
6. \`bob cut\` — ボブ
7. \`long bob, lob\` — ロングボブ

**ショート系**:
8. \`short hair\` — ショート
9. \`short bob\` — ショートボブ
10. \`pixie cut\` — ピクシーカット
11. \`very short hair, buzz cut\` — ベリーショート

**アップスタイル系**:
12. \`ponytail\` — ポニーテール
13. \`high ponytail\` — 高めポニテ
14. \`side ponytail\` — サイドポニテ
15. \`bun, hair bun\` — お団子
16. \`double bun\` — ダブルお団子

**ツインテール系**:
17. \`twin tails, twintails\` — ツインテール
18. \`low twin tails\` — 低めツインテ

**その他人気**:
19. \`braid, french braid\` — 三つ編み
20. \`hime cut\` — 姫カット（前髪ぱっつん＋サイド長め）`,
      },
      {
        title: '髪色指定 — 単色からグラデーション・インナーカラーまで',
        content: `**基本色**: blonde, brunette, black hair, red hair, silver hair, blue hair, pink hair, purple hair, green hair, white hair

**具体的な色名で精度を上げる**:
- 赤系: crimson, scarlet, auburn, ginger, copper
- 青系: navy blue, cerulean, azure, teal
- ピンク系: light pink, hot pink, salmon pink, rose gold
- 銀系: platinum blonde, silver white, ash gray

**グラデーション（2色の移行）**:
\`gradient hair, pink to blue\` — ピンク→青のグラデ
\`ombre hair, dark roots to blonde tips\` — 根元暗→毛先明
\`split color hair, half black half white\` — 左右半分ずつ

**インナーカラー（隠れた色）**:
\`inner color hair, black hair with hidden red underneath\`
\`peek-a-boo highlights, blonde with purple under layer\`

**メッシュ・ハイライト**:
\`streaked hair, black with pink highlights\`
\`highlighted hair, blonde with caramel streaks\`

**色滲み防止**: 髪色が服に移る場合は BREAK 構文で分離: \`(pink gradient hair:1.2) BREAK (white dress:1.2)\`。CutOff 拡張で「pink:hair」と固定するのも有効です。`,
      },
      {
        title: '髪の動き・質感表現で画像のクオリティを上げる',
        content: `髪型の「名前」だけでなく「動き」と「質感」を加えると、画像のクオリティが劇的に向上します。

**質感キーワード**:
- \`silky, smooth\` — 絹のような滑らかさ（ストレート向き）
- \`glossy, shiny\` — 光沢のあるツヤ髪
- \`fluffy, voluminous\` — ふわふわのボリューム感
- \`wet hair\` — 濡れた質感（雨・シャワーシーン）
- \`messy hair, tousled\` — 無造作ヘア
- \`bedhead\` — 寝起きの乱れ髪

**動きキーワード**:
- \`flowing hair\` — 流れるような髪（最も汎用的）
- \`windswept hair, hair blowing in wind\` — 風になびく
- \`floating hair\` — 無重力で浮遊する髪（ファンタジー向き）
- \`hair over one eye\` — 片目に髪がかかる（ミステリアス）

**おすすめ組み合わせ**:
\`1girl, long silver hair, silky, flowing hair, wind, soft lighting\` — 風にたなびく銀髪美人
\`1girl, short messy hair, bedhead, morning light, pajamas\` — 寝起きの自然な可愛さ

**品質安定のネガティブ**: \`bad hair, ugly hair, bald spot, hair clipping through body\``,
      },
      {
        title: '髪飾り・ヘアアクセサリーでキャラの個性を際立たせる',
        content: `髪飾りはキャラクターの個性を一瞬で伝えるアクセント。ジャンル別に定番をまとめます：

**日常系**:
\`hair ribbon, red\` / \`hair clip, star-shaped\` / \`scrunchie\` / \`headband\`

**和風**:
\`kanzashi, japanese hair ornament\` / \`flower in hair, cherry blossom\` / \`tsumami kanzashi\`

**ゴシック・ダーク**:
\`black lace headband\` / \`dark rose hair ornament\` / \`skull hairpin\` / \`thorny crown\`

**ファンタジー**:
\`tiara\` / \`magical hairpin, glowing\` / \`crystal hair ornament\` / \`feathered headpiece\`

**アイドル・華やか**:
\`hair bow, large\` / \`glitter hair accessories\` / \`flower crown\` / \`butterfly hair clip\`

**重要テクニック**:
髪飾りは AI が省略しがちなため、**(hair ribbon:1.3)** のように重み付け 1.3 以上を推奨します。複数の髪飾りを同時に指定すると競合しやすいので、1-2 個に絞るのがコツ。

実践テンプレート：
\`1girl, long black hair, hime cut, (red hair ribbon:1.3), blunt bangs, school uniform, gentle smile, cherry blossom background, anime style, masterpiece\``,
      },
    ],
    faq: [
      {
        q: '髪型が指定と違うものが出てきます',
        a: '髪型キーワードの位置をプロンプトの前方に移動し、(keyword:1.2-1.3) で重み付けしてください。それでも安定しない場合は、ネガティブに意図しない髪型を明示します（例: ロングが欲しいのにショートが出る場合は「short hair」をネガティブに追加）。モデルによっても得意な髪型が異なるため、2-3 モデルで試すのも有効です。',
      },
      {
        q: '髪色が服や背景に滲みます（color bleeding）',
        a: 'BREAK 構文で髪と服を分離するのが最も手軽です: 「(red hair:1.2) BREAK (white dress:1.2)」。CutOff 拡張機能で「red:hair」とトークンを固定する方法もあります。ネガティブに「color bleeding, miscolored」を入れるのも効果的。特にピンク×白、赤×青の組み合わせで起きやすいので注意してください。',
      },
      {
        q: 'グラデーションヘアが上手く出ません',
        a: '「gradient hair, [color1] to [color2]」の形式で書き、重み付け (gradient hair:1.3) を加えてください。Stable Diffusion では CFG スケールを 9-11 に設定すると色の分離が安定します。うまくいかない場合は img2img の Inpaint で髪だけ塗り直す方法もあります。',
      },
    ],
  },
  'anime-prompt-guide': {
    sections: [
      {
        title: 'アニメプロンプトの基本 — キャラクター設計の 4 要素',
        content: `アニメ風 AI イラストを生成するプロンプトは、以下の 4 要素を順番に記述するのが基本です：

**1. 人物指定**: \`1girl\` / \`1boy\` / \`2girls\`（人数と性別）
**2. 外見特徴**: 髪色・髪型・目の色・体型（例: \`long silver hair, blue eyes, slender\`）
**3. 服装・装備**: 制服・ファンタジー・カジュアルなど（例: \`school uniform, pleated skirt\`）
**4. ポーズ・背景**: 構図と場面（例: \`sitting on window sill, sunset background\`）

この 4 要素を組み合わせた基本テンプレート：
\`1girl, long silver hair, blue eyes, school uniform, sitting on window sill, sunset background, anime style, masterpiece, best quality\`

最後に品質タグ（\`masterpiece, best quality, ultra detailed\`）を追加し、ネガティブに \`(worst quality, low quality:1.4), bad anatomy, bad hands\` を入れるのが定石です。`,
      },
      {
        title: '画風・年代指定 — レトロからモダンまで',
        content: `プロンプトに画風キーワードを加えると、年代や作画スタイルを狙い撃ちできます：

**90s アニメ風**（エヴァ・セーラームーン調）:
\`90s anime, retro anime, cel animation, thick outlines, saturated colors\`

**モダンアニメ風**（深夜アニメ調）:
\`modern anime, clean lineart, vibrant colors, detailed shading\`

**ジブリ風**（水彩・自然調）:
\`ghibli style, studio ghibli, watercolor, soft lighting, pastoral scene\`

**新海誠風**（光と空の美しさ）:
\`makoto shinkai style, beautiful sky, lens flare, detailed clouds, golden hour\`

**セル画風**（フラットで古典的）:
\`cel shading, flat color, bold outlines, limited palette\`

**水墨画風**:
\`sumi-e, ink wash painting, traditional japanese art, minimalist\`

画風キーワードは品質タグの**前**に書くと優先度が上がります。「anime style」とリアル系キーワード（photorealistic）は相性が悪いため混ぜないでください。`,
      },
      {
        title: '表情・感情描写でキャラクターに命を吹き込む',
        content: `表情指定は画像の物語性を決める重要な要素です。単純な指定から複合表現まで：

**基本の表情**:
- 笑顔: \`smile, gentle smile, grin, smirk, laughing\`
- 悲しみ: \`crying, tears, sad expression, melancholic\`
- 怒り: \`angry, frown, fierce eyes, clenched teeth\`
- 驚き: \`surprised, wide eyes, open mouth, shocked\`

**複合表現（物語性を出す）**:
\`gentle smile, looking at viewer, slight blush, wind in hair\`（穏やかで親しみやすい）
\`tears in eyes, forced smile, rain background\`（切なさ）
\`confident smirk, arms crossed, dramatic lighting\`（強さ）

**視線指定**:
- \`looking at viewer\` — カメラ目線（最も人気）
- \`looking away\` — 視線を外す
- \`looking up\` — 上目遣い
- \`closed eyes\` — 瞑想的・安らか

NovelAI では表情タグが特に精密で、\`(gentle smile:1.2)\` のように重み付けすると微妙なニュアンスが出ます。`,
      },
      {
        title: 'アニメ系モデル選び — 目的別おすすめ',
        content: `Stable Diffusion のアニメ系モデルは非常に多く、目的に合った選択が重要です：

**初心者向け（汎用）**:
- **Anything V5** — 安定感のある汎用アニメモデル。迷ったらこれ
- **Counterfeit V3** — 美麗な色彩表現。背景も綺麗

**高品質イラスト**:
- **MeinaMix** — リアル寄りのアニメ調。大人っぽいキャラに最適
- **AnimagineXL** — SDXL ベースの最新鋭。高解像度・高ディテール

**特定用途**:
- **Cetus-Mix** — ファンタジー系に強い
- **AbyssOrangeMix** — ダーク系・スタイリッシュ

**Midjourney**:
- **niji 5** — アニメ特化モード。\`--niji 5 --style expressive\` で鮮やかなアニメ風
- niji 以外でも \`anime style\` キーワードで対応可能

**モデル比較のコツ**: 同じプロンプトで 3-4 モデルを試して好みの絵柄を見つけるのが最速です。Civitai や Hugging Face でモデルの比較画像を事前確認するのも有効。`,
      },
      {
        title: 'アニメキャラ設計の実践テンプレート 5 選',
        content: `すぐに使える実践的なアニメキャラクタープロンプトです：

**1. 学園もの主人公（女子）**:
\`1girl, brown hair, ponytail, brown eyes, school uniform, white blouse, navy pleated skirt, standing in classroom, cherry blossoms outside window, anime style, masterpiece, best quality\`

**2. ファンタジー魔法使い**:
\`1girl, long silver hair, purple eyes, mage robe, glowing staff, floating runes, magical aura, dark fantasy, castle background, detailed, anime style\`

**3. サイバーパンクキャラ**:
\`1boy, short white hair, cyberpunk, neon jacket, futuristic city, rain, reflections, dark atmosphere, detailed lighting, anime style\`

**4. 日常系キャラ（カフェ）**:
\`1girl, short bob, blonde hair, casual outfit, hoodie, sitting at cafe, coffee cup, warm lighting, cozy atmosphere, slice of life, anime style\`

**5. バトルシーン**:
\`1girl, red hair, twin tails, dynamic pose, sword slash, action lines, dramatic angle, battle scene, fire effects, (anime style:1.2), masterpiece\`

各テンプレートの構成は「人物 → 外見 → 服装 → ポーズ → 背景 → スタイル → 品質」の順です。要素を差し替えるだけで無限のバリエーションが作れます。`,
      },
    ],
    faq: [
      {
        q: 'アニメ風とリアル風を混ぜたい場合は？',
        a: 'MeinaMix のようなリアル寄りアニメモデルを使い、「semi-realistic, anime-inspired」をキーワードに追加します。Midjourney なら niji モードを OFF にして「anime-inspired, detailed」と記述するとリアルに寄せたアニメ風が得られます。ただし「anime style」と「photorealistic」は相性が悪いため、同時に入れると品質が不安定になります。',
      },
      {
        q: '特定のアニメキャラクターに似せるには？',
        a: 'キャラ名を直接入れるとある程度似ますが、著作権リスクがあります。安全な方法は、キャラの外見特徴を分解して記述すること。例えば初音ミクなら「twin teal tails, black detached sleeves, gray pleated skirt, tie」のように衣装構成で暗示します。LoRA を使えば特定キャラの特徴を学習したモデルで高精度に再現できます。',
      },
      {
        q: 'アニメモデルで品質が安定しません',
        a: 'まず品質タグ「masterpiece, best quality, ultra detailed」とネガティブ「(worst quality, low quality:1.4), bad anatomy, bad hands, extra fingers」をテンプレ化してください。CFG スケールは 7-9 が安定圏。Sampler は DPM++ 2M Karras が定番。Step 数は 20-30 で十分です。それでも崩れる場合は、モデルのバージョンを変えるか、VAE を追加すると改善することがあります。',
      },
    ],
  },
  'cosplay-prompt-guide': {
    sections: [
      {
        title: 'コスプレプロンプトの基本構造',
        content: `コスプレプロンプトは、AIイラストで特定のアニメ・ゲームキャラクター、あるいは職業・世界観に合わせた衣装を再現するためのプロンプト技術です。

書き方には大きく2つのアプローチがあります：

**1. キャラ名直接指定** — 例: \`hatsune miku cosplay\`、\`rem cosplay\`。学習データに有名キャラが含まれていれば再現性は高いものの、著作権リスクが伴います。

**2. 衣装要素分解** — 例: \`twin teal hair, school uniform, black tie, detached sleeves\`。キャラ名を出さずに構成要素で描写する方式です。公開・販売する作品には圧倒的にこちらを推奨します。

どちらの方式でも、**構成要素を分解して並べる**スキルは欠かせません。髪色・髪型・衣装のパーツ・小物・背景を「上から下へ」順に記述すると、AI が各要素を正確に組み立てやすくなります。`,
      },
      {
        title: '定番コスチューム別の呪文テンプレート',
        content: `AIモデルが学習データで頻繁に見ているため再現性が高い10種類の定番コスチュームと、それぞれのコピペ可能な呪文例です：

**1. セーラー服（学校制服）**
\`sailor uniform, sailor collar, pleated skirt, red ribbon, knee-high socks, loafers\`

**2. メイド服**
\`maid uniform, white apron, black dress, frilled headband, white stockings, mary janes\`

**3. 巫女装束**
\`miko costume, white haori, red hakama, shrine maiden, traditional japanese clothing\`

**4. ナース服**
\`nurse uniform, white cap, white apron, pastel blue scrubs, stethoscope\`

**5. チアリーダー**
\`cheerleader uniform, pleated cheer skirt, pom-poms, sneakers, ribbon ponytail\`

**6. 着物**
\`kimono, obi, traditional japanese dress, wooden sandals, floral pattern\`

**7. 魔女**
\`witch costume, pointy hat, black cloak, broomstick, fantasy\`

**8. バニーガール**
\`bunny girl, bunny ears, black leotard, fishnet stockings, high heels\`

**9. ファンタジー甲冑**
\`fantasy armor, knight plate, cape, sword, metal gauntlets, fantasy\`

**10. ゴシックロリータ**
\`gothic lolita, black dress, lace trim, frilled skirt, ribbon choker\``,
      },
      {
        title: '衣装ディテールの書き分け方',
        content: `単に「sailor uniform」と指定しただけでは、AI は無難な標準形を出すだけです。**素材・色・装飾・小物**を積み重ねることで、あなただけのオリジナリティが出ます。

記述順のセオリーは **「上→下→足元→アクセサリー」**:
\`white blouse, navy pleated skirt, knee-high white socks, brown loafers, red ribbon on chest\`

**素材指定**で質感が劇的に変わります：
- \`silk\` — 光沢ある滑らかな質感
- \`cotton\` — マットで柔らかい
- \`leather\` — 硬質で重厚
- \`lace\` — 透け感のある装飾

**色の色滲み（color bleed）対策**には BREAK 構文：
\`white blouse BREAK navy pleated skirt BREAK red ribbon\`

要素ごとにプロンプトを区切ることで、色が隣の要素へ滲む現象を防げます。`,
      },
      {
        title: '撮影・ポーズの指定で品質を上げる',
        content: `衣装を指定しただけでは「ただの絵」です。プロのコスプレ写真の雰囲気に寄せるには、撮影系キーワードを併記します。

**基本の撮影セット**:
\`professional cosplay photo, studio lighting, high quality photography, sharp focus\`

**アングル指定**:
- \`close-up\` — 表情・胸元重視
- \`medium shot\` — 上半身まで
- \`full body shot\` — 全身（衣装の見せ場）
- \`dynamic pose\` — 動きのあるポーズ

**ライティング**:
- \`soft lighting\` — 柔らかく自然
- \`dramatic lighting\` — 陰影強め
- \`ring light\` — コスプレ撮影の定番

**定番ネガティブプロンプト**:
\`low quality, bad anatomy, bad hands, fake wig, cheap cosplay, wrinkled clothes, mismatched uniform\`

これらを組み合わせた完成形のサンプル：
\`1girl, sailor uniform, sailor collar, pleated skirt, knee-high socks, twin tails black hair, red ribbon, professional cosplay photo, studio lighting, medium shot, soft lighting, (masterpiece:1.2), best quality\``,
      },
      {
        title: 'Stable Diffusion と NovelAI の使い分け',
        content: `同じコスプレプロンプトでも、モデルによって仕上がりがまったく違います。

**Stable Diffusion（実写風）**:
おすすめモデル — ChilloutMix、AsianRealistic、BeautifulRealistic
- 実写のコスプレ写真に近い仕上がり
- 品質タグ: \`masterpiece, best quality, ultra detailed\`
- ネガ: \`(worst quality:1.4), (low quality:1.4), bad anatomy, bad hands\`

**Stable Diffusion（アニメ調）**:
おすすめモデル — Anything V5、Counterfeit、MeinaMix
- アニメ調イラスト寄り
- 品質タグ: \`masterpiece, best quality, highres\`
- ネガ: \`(worst quality, low quality:1.4), bad anatomy, extra fingers\`

**NovelAI**:
- Artist タグを使って特定作家風の絵柄に誘導できる（例: \`artist:wlop, artist:kawacy\`）
- 品質タグ: \`best quality, amazing quality, very aesthetic\`
- 重み付けの書き方が SD とわずかに異なる（\`{{sailor uniform}}\` で強調可能）

**Midjourney**:
- コスプレ写真は \`--style raw --ar 2:3\` が最適
- 衣装描写より雰囲気が強く、細部精度は SD に劣る

自分の目的が「写真風コスプレ」なら SD の実写系、「イラスト調キャラ」なら NovelAI、「雰囲気重視のアート」なら Midjourney、と使い分けるのが基本戦略です。`,
      },
    ],
    faq: [
      {
        q: 'キャラ名を直接プロンプトに書いても問題ないですか？',
        a: '個人利用（学習・研究・私的鑑賞）では問題ありませんが、公開・販売・商用利用する場合は著作権・パブリシティ権のリスクがあります。衣装要素を分解して描写する方法（例: セーラー服＋ツインテール＋水色髪）で、キャラの特徴を暗示する程度に留めるのが安全です。',
      },
      {
        q: 'セーラー服が長袖で出てしまいます。夏服にするには？',
        a: '「short sleeves」「summer uniform」「white sailor uniform」を明示的に追加してください。さらにネガティブプロンプトに「long sleeves, winter uniform, navy」を入れると確実です。逆に冬服（長袖紺色）にしたい場合は「long sleeves, navy sailor uniform, winter uniform」を指定します。',
      },
      {
        q: 'コスプレ写真をリアル写真風にするには？',
        a: 'モデル選択が最重要です。ChilloutMix、BeautifulRealistic、Realistic Vision などの実写系 Stable Diffusion モデルを使い、プロンプトに「professional photography, 8K, photorealistic, skin detail, studio lighting」を追加します。Anime 系モデルでは原理的にリアル写真調は出ません。',
      },
      {
        q: '小物（刀・帽子・翼など）が消えてしまいます',
        a: '重み付けで強制的に主張を強めます。例: 「(holding katana:1.3), (wings:1.3)」。それでも消える場合は小物単体の文を別の BREAK セクションに入れる（例: 「sailor uniform BREAK holding a red ribbon bag」）、または参照画像を ControlNet に入れるのが確実です。',
      },
    ],
  },
  'body-type-prompt-guide': {
    sections: [
      {
        title: '体型プロンプトの基本 — 5つの軸で理解する',
        content: `AI画像生成で体型を指定するには、以下の5軸を意識します：

**1. 体格**: slim, slender, athletic, muscular, chubby, curvy, plump, plus-size
**2. 身長**: tall, short, petite, towering, average height
**3. 体の特徴**: narrow waist, wide hips, broad shoulders, long legs, thick thighs
**4. 年齢感**: youthful, mature, elderly（数値指定は不安定）
**5. ポーズ**: standing, sitting, dynamic pose, contrapposto, power stance

これらをカンマ区切りで組み合わせるのが基本です：
\`slender, tall, narrow waist, long legs, elegant standing pose\`

単語選びのコツとして、「skinny」は骨ばった印象が強く、自然な細身には「slim」「slender」を推奨します。「chubby」は可愛い丸み、「plump」はより豊かな体つきを暗示します。`,
      },
      {
        title: 'スレンダー・細身体型の呪文テクニック',
        content: `痩せ型〜細身の体型は最も使用頻度が高いカテゴリです。

**基本セット**:
\`slender body, slim waist, delicate frame, (slender:1.2)\`

**身長を加える**:
\`slender, tall, long legs, leggy, model proportions\`

**アイドル系の細身**:
\`slim, petite, cute face, slender figure, small frame\`

**注意点**:
- 重み付けは \`(slender:1.2)\` 程度が安全圏。1.4超は体が崩壊します
- アニメ系モデル（Anything V5等）はデフォルトが極端に細いため、slender指定の効果が薄い場合があります
- リアル系モデル（ChilloutMix等）は体型指定への反応が素直です

**ネガティブプロンプト**:
\`chubby, overweight, thick body, muscular, fat\``,
      },
      {
        title: '筋肉質・アスレチック体型の呪文',
        content: `筋肉質な体型は、ファンタジーの戦士やスポーツキャラクターに欠かせません。

**男性キャラ**:
\`muscular man, broad shoulders, six-pack abs, (muscular:1.3), strong build\`

**女性キャラ（引き締まった体型）**:
\`athletic build, toned body, visible abs, muscular arms, fit, strong woman\`

**ファンタジー戦士**:
\`muscular warrior, battle-scarred, heavy armor, powerful stance, (muscular:1.3)\`

**コツ**:
- 女性キャラの筋肉は \`(muscular:1.2)\` 程度に抑えないと男性的になりすぎます
- 「athletic」は引き締まった程度、「muscular」は明確に筋肉質、「bodybuilder」は極端な筋肉表現です
- ControlNet の OpenPose を使うと、参照画像からポーズと体型を同時に再現できます`,
      },
      {
        title: 'ぽっちゃり・プラスサイズ体型の表現',
        content: `ぽっちゃり〜プラスサイズの体型は、AI画像生成ではまだ表現が難しいカテゴリですが、正しい指定で改善できます。

**かわいい丸み（chubby系）**:
\`chubby, round face, soft body, cute, (chubby:1.2), baby face\`

**プラスサイズモデル（plus-size系）**:
\`plus-size, curvy, thick thighs, wide hips, confident pose, fashion model\`

**重要ポイント**:
- \`chubby\` は小太りの可愛さ、\`plus-size\` はファッション的な大きめ体型
- リアル系モデルの方がぽっちゃり表現に対応しやすい（アニメ系は痩せバイアスが強い）
- 「fat」は品質が下がりやすいため、「curvy」「plump」「plus-size」を推奨
- \`(chubby:1.3)\` 以上が必要な場合が多い（AIの痩せデフォルトに対抗）

**ネガティブプロンプト**:
\`skinny, slim, underweight, anorexic\``,
      },
      {
        title: '体型×服装×ポーズの組み合わせで説得力を出す',
        content: `体型単体で指定するだけでは不十分です。体型の特性を活かす**服装とポーズ**をセットで指定することで、画像に説得力が生まれます。

**スレンダー×エレガント**:
\`slender woman, long evening dress, elegant pose, hand on hip, side profile, soft lighting\`

**筋肉質×パワフル**:
\`muscular warrior woman, leather armor, power stance, arms crossed, dramatic lighting, battle scene\`

**小柄×キュート**:
\`petite girl, oversized sweater, sitting on stairs, legs dangling, looking up, warm light\`

**プラスサイズ×自信**:
\`plus-size woman, stylish business suit, confident stride, urban street, professional photography\`

**身長差カップル**:
\`tall man and petite woman, height difference, standing together, romantic, soft lighting, couple portrait\`

体型の特性を**服装のシルエット**で強調するのがプロのテクニックです。細身なら体のラインが出る \`form-fitting dress\`、筋肉質なら \`tank top\` や \`armor\`、ぽっちゃりなら \`flowing dress\` や \`oversized clothing\` が相性が良いです。`,
      },
    ],
    faq: [
      {
        q: '体型を数値（170cm、50kgなど）で指定できますか？',
        a: 'Stable Diffusion は数値をテキストとして認識するだけで、実際の身長・体重として解釈しません。「tall, long legs, towering over」のような形容詞の組み合わせで相対的に表現するのが確実です。2人構図で身長差を出したい場合は「height difference, tall and short」を明示します。',
      },
      {
        q: '体型指定したのに反映されません',
        a: 'まずモデルを確認してください。アニメ系モデルは痩せバイアスが強く、「curvy」「muscular」の効果が弱いです。(keyword:1.3) で重み付けを上げるか、リアル系モデル（ChilloutMix等）に切り替えてください。それでもダメな場合はControlNetで参照画像を使うのが確実です。',
      },
      {
        q: '手や指が崩れてしまいます',
        a: 'ネガティブプロンプトに「bad hands, extra fingers, missing fingers, bad anatomy, deformed」を必ず入れてください。品質タグとして「detailed hands, perfect anatomy, correct proportions, five fingers」を追加するとさらに安定します。ADetailerという拡張機能で手だけを自動修復する方法もあります。',
      },
    ],
  },
  'color-prompt-guide': {
    sections: [
      {
        title: '色指定の基本 — 全体トーンと個別色の使い分け',
        content: `AI画像生成での色指定は、大きく2つのレベルに分かれます：

**1. 全体トーン（画像全体の雰囲気）**:
- \`pastel colors\` — 淡くて柔らかい色使い
- \`vivid colors\` — 鮮やかで力強い
- \`monochrome\` — 白黒
- \`sepia tone\` — 古写真風の暖色
- \`warm colors\` / \`cool colors\` — 暖色系 / 寒色系
- \`cinematic color grading\` — 映画的な色補正

**2. 個別色（特定パーツの色指定）**:
- \`red dress, blue ribbon, green eyes, silver hair\`

個別色を指定すると「色滲み（color bleeding）」が起きやすいのが最大の課題です。例えば「red dress, blue jacket」と書くと、赤と青が混ざって紫っぽくなることがあります。この対処法がこのガイドの本題です。`,
      },
      {
        title: '色名プロンプト — 基本色から微妙なニュアンスまで',
        content: `基本10色（red, blue, green, yellow, pink, purple, white, black, orange, brown）はどのモデルでも安定して認識されます。

**より精度の高い色名**:
- 赤系: crimson（深紅）, scarlet（緋色）, coral（サンゴ色）, ruby（ルビー色）
- 青系: navy（紺）, cerulean（空色）, azure（蒼）, teal（青緑）, cobalt（コバルト）
- 緑系: emerald（エメラルド）, mint（ミント）, sage（セージ）, olive（オリーブ）
- 紫系: lavender（ラベンダー）, violet（スミレ）, magenta（マゼンタ）
- 暖色系: amber（琥珀）, gold（金）, peach（桃色）, cream（クリーム）

**和風の色名**も意外と認識します:
- 桜色 → \`sakura pink\` で柔らかいピンク
- 藍色 → \`indigo blue\` で深い青
- 朱色 → \`vermillion\` で朱赤
- 鶯色 → \`olive green, warm\` で暖かい緑

色の精度を上げるには「color」を挟むのがコツ: \`azalea color hair\` のように書くと AI が色として認識しやすくなります。`,
      },
      {
        title: 'CutOff 拡張機能で部分色指定をマスターする',
        content: `CutOff は Stable Diffusion WebUI の拡張機能で、プロンプト中の色指定を特定の対象に「固定」する機能です。

**インストール**: Extensions タブ → Install from URL → CutOff のリポジトリ URL を貼って Install

**基本的な使い方**:
プロンプト: \`1girl, red dress, blue ribbon, green eyes\`
CutOff Target tokens: \`red, blue, green\`
CutOff Weight: 1.0（デフォルト）

これにより「red」はドレスだけ、「blue」はリボンだけ、「green」は目だけに固定されます。

**実践例**:
\`1girl, white blouse, navy pleated skirt, red ribbon, brown loafers\`
→ CutOff targets: \`white, navy, red, brown\`
→ 各色が各パーツにのみ適用され、混色を防止

**注意点**:
- CutOff Weight を 1.5 以上にすると画像が崩れやすい
- 色数が多すぎると（5色以上）効果が弱くなる
- Regional Prompter と併用するとさらに精度が上がる`,
      },
      {
        title: 'BREAK コマンドで色の干渉を分離する',
        content: `BREAK はプロンプトを独立したセグメントに区切る構文です。CutOff をインストールしたくない場合の代替手段として有効です。

**基本構文**:
\`red dress BREAK blue sky BREAK green trees\`

各セグメントが独立して解釈されるため、色の干渉が大幅に減ります。

**衣装の上下で色分け**:
\`1girl, (red jacket:1.2) BREAK (blue pleated skirt:1.2) BREAK (white shoes:1.1)\`

**キャラクター + 背景で色分離**:
\`beautiful girl in yellow dress BREAK purple and pink sunset sky, city skyline\`

**BREAK の注意点**:
- 各セグメントに重み付け \`(keyword:1.2)\` を加えると効果が安定
- BREAK を使いすぎる（4つ以上）と構図が崩れることがある
- 「AND」構文（A AND B）とは異なる動作。BREAK は解釈を分離、AND はブレンドです`,
      },
      {
        title: 'シネマティック・カラーグレーディングで映画的な色彩を出す',
        content: `映画やドラマの色合いを再現するカラーグレーディング技法は、作品全体の質感を劇的に変えます。

**ハリウッド定番 — Orange & Teal**:
\`cinematic color grading, orange and teal, warm skin tones, cool shadows, film grain\`
→ 人物を暖色（オレンジの肌色）、背景を寒色（ティールの影）に分離する技法

**レトロ・フィルム風**:
\`film photography, kodak portra 400, soft grain, slightly desaturated, warm highlights\`

**ダーク・ムーディ**:
\`dark moody, low key lighting, deep shadows, (dark:1.2), muted colors, noir style\`

**パステル・ドリーミー**:
\`pastel colors, soft lighting, dreamy atmosphere, (pastel:1.2), kawaii aesthetic\`

**CFG スケールと色の関係**:
CFGスケール 7-8: 色が柔らかく自然 → パステルや写真的な表現向き
CFGスケール 10-12: 色が鮮明でプロンプトに忠実 → 強い色指定向き
CFGスケール 15+: 色が過飽和になりやすい → 不自然になることが多い

ステップ数も色に影響します。20-30ステップが安定圏、50+は色がくすむことがあります。`,
      },
    ],
    faq: [
      {
        q: 'CutOff と BREAK はどちらを使うべきですか？',
        a: '両方使えるなら CutOff の方が精度が高いです。CutOff はトークン単位で色を固定するため、BREAK より細かい制御が可能です。ただし CutOff は拡張機能のインストールが必要で、一部のモデル（SDXL等）では未対応の場合もあります。BREAK はインストール不要で汎用的に使えるため、まず BREAK で試してダメなら CutOff を導入する、という順序がおすすめです。',
      },
      {
        q: '髪の色が服に染み出します。対処法は？',
        a: '「red hair, white dress」のように対照的な色を使うと染み出しが起きやすいです。対処: (1) BREAK で分離「(red hair:1.2) BREAK (white dress:1.2)」、(2) CutOff で Target tokens に「red, white」を指定、(3) ネガティブに「color bleeding, miscolored」を入れる、(4) Regional Prompter で髪と服の領域を分離、の4つの手段があります。',
      },
      {
        q: 'モノクロ画像の一部だけカラーにできますか？',
        a: 'img2img の Inpaint 機能を使います。まず「monochrome, grayscale」で全体をモノクロ生成し、次に Inpaint でカラーにしたい部分をマスクして「red lips, color」などで部分着色します。Stable Diffusion WebUI の Inpaint 機能が最も手軽です。',
      },
    ],
  },
  'prompt-writing-guide': {
    sections: [
      {
        title: 'プロンプトの書き方とは？— 基本構造と全体像',
        content: `プロンプトの書き方とは、ChatGPT・Claude・Gemini・Stable Diffusion・Midjourneyなどの生成AIから、自分が望む結果を効率的に引き出すための「指示文の設計方法」のことです。日本では「呪文（じゅもん）」「指示文」「テンプレート」とも呼ばれます。

プロンプトの質はAIの出力品質を直接決定するため、同じAIモデルでも書き方ひとつで結果が10倍以上変わると言われています。米国ではプロンプト設計を専門に行う「プロンプトエンジニア」という職種が登場し、年収数千万円規模の求人が出始めています。

**プロンプトには「型」がある**ことを意識しましょう。効果的なプロンプトは、以下の5つの構成要素を組み合わせています：

1. **タスク（何をするか）** — 「要約する」「翻訳する」「画像を生成する」など、動詞で明確に指示
2. **コンテキスト（なぜそれが必要か）** — 背景情報、対象読者、利用シーン
3. **入力（何に対して）** — 処理対象のデータ・テキスト・画像
4. **出力形式（どんな形で）** — 箇条書き・表形式・Markdown・JSON・コード
5. **制約条件（どんな条件で）** — 文字数・トーン・避けるべき表現

この5要素を意識すれば、漠然と「いい感じで書いて」と頼んで失敗する典型パターンを避けられます。本記事では、これら基礎を踏まえた上で、実践で効果を発揮する7つのコツとコピペで使えるテンプレート集を解説します。

プロンプトの基礎を先に押さえたい方は、<a href="/guides/what-is-prompt" class="text-sky-600 hover:underline">プロンプトとは？AI初心者向け完全ガイド</a>を併せてお読みください。`,
      },
      {
        title: '効果的なプロンプトを書く7つのコツ',
        content: `**コツ1: ゴールと完了条件を明確にする**

「メールを書いて」ではなく「取引先（A社・田中部長）に来週月曜の打合せ延期をお詫びする丁寧なビジネスメール。本文200文字、件名込み」のように、5W1Hで指示します。曖昧さこそが失敗の最大原因です。

**コツ2: ロール（役割）を設定する**

プロンプトの冒頭で「あなたは○○の専門家です」とAIに役割を与えると、その専門性に基づいた回答が引き出せます。「あなたはマーケティング歴15年のシニアコンサルタントです」「あなたは中学校の理科教師です」など、職種＋経験年数＋対象を組み合わせるとさらに精度が上がります。

**コツ3: 具体的な背景情報（コンテキスト）を提供する**

AIには文脈が見えていません。「30代女性向けの美容ブログ記事タイトル」より「30代の働く女性向けに、シミ・くすみ対策スキンケアの記事タイトルを、検索キーワード『シミ ケア 40代』を含めて10案」のように、対象・目的・制約を渡します。

**コツ4: 出力形式を指定する**

「箇条書きで5つ」「比較表で3つの観点」「Markdown形式」「JSON形式」のように、後工程で使いやすい形を指定します。形式が決まると、AIは内容も整理して回答するため副次的に品質も向上します。

**コツ5: 例示する（Few-Shotプロンプティング）**

抽象的なルールを長々と書くより、「こんな感じで」と実例を1〜3個見せる方が圧倒的に効果的です。例えば翻訳タスクなら「Input: 'Hello' → Output: 'こんにちは'」のような対の例を示します。**良い例1個 > ルール10行**が原則です。

**コツ6: 段階的に考えさせる（Chain of Thought）**

複雑なタスクには「ステップバイステップで考えてから回答してください」「まず○○を分析して、次に△△を出力してください」と段階指示を加えます。研究で実証されているテクニックで、論理推論精度が大幅に向上します。

**コツ7: 反復改善する（Iterative Refinement）**

完璧な1発プロンプトを目指す必要はありません。「もっと具体的に」「○○の観点を追加して」「もう少しカジュアルに」と追加指示で磨いていく方が実用的です。AIとの対話は会話であり、コードのコンパイルではありません。`,
      },
      {
        title: 'コピペで使えるプロンプトテンプレート集',
        content: `すぐに使える基本テンプレートを目的別に紹介します。\`{}\` の部分を自分の状況に合わせて書き換えてください。

**1. 文章作成テンプレート（汎用）**
\`\`\`
あなたは{役職・専門分野}の専門家です。
以下の条件で{文章タイプ}を作成してください。

# 対象読者: {ターゲット}
# 目的: {ゴール}
# 文字数: {N文字}
# トーン: {丁寧/カジュアル/フォーマル}
# 含めるキーワード: {キーワード1, キーワード2}
# 避ける表現: {NG表現}

入力情報: {元情報}
\`\`\`

**2. 要約テンプレート**
\`\`\`
以下のテキストを要約してください。

要件:
- {N文字}以内
- {対象読者}向けに専門用語を平易に
- 重要なキーワードを{N個}残す
- 結論を冒頭に置く（PREP法）

テキスト:
{要約対象}
\`\`\`

**3. コード生成テンプレート**
\`\`\`
あなたはシニア{言語}エンジニアです。
以下の要件を満たす関数を実装してください。

言語: {言語・バージョン}
関数名: {名前}
入力: {引数の型と意味}
出力: {返り値の型}
要件:
- {要件1}
- {要件2}
エラー処理: {方針}
コメント: {必要/不要}
テストケース: {3例以上を併せて提示}
\`\`\`

**4. アイデア出しテンプレート**
\`\`\`
{業種・分野}向けに{アイデア種類}を{N個}提案してください。

制約:
- 予算: {金額}以内
- 期間: {期間}以内
- ターゲット: {対象}
- 競合との差別化: {差別化ポイント}

各案について以下を含めて回答:
1. 概要（30文字以内）
2. 想定効果
3. 実装難易度（高/中/低）
4. 想定リスク
\`\`\`

**5. 画像生成テンプレート（Stable Diffusion）**
\`\`\`
{主題}, {スタイル}, {照明}, {構図}, {品質タグ}
Negative: {除外要素}
\`\`\`

例: \`1girl, long wavy blonde hair, white dress, in garden, soft lighting, bokeh background, (masterpiece:1.2), (best quality:1.4)\`

SD向けの詳細は<a href="/guides/stable-diffusion-prompt-guide" class="text-sky-600 hover:underline">Stable Diffusion プロンプト書き方ガイド</a>、ChatGPT特化は<a href="/guides/chatgpt-prompt-techniques" class="text-sky-600 hover:underline">ChatGPT プロンプト術</a>を参照してください。`,
      },
      {
        title: 'AIツール別のプロンプトの書き方の違い',
        content: `主要AIツールごとにプロンプトの設計思想が異なります。同じ指示でも書き方を変えるだけで結果が劇的に変わります。

**ChatGPT（OpenAI）**
- 自然な日本語で長文指示できる
- ロール設定 + ステップバイステップが効果的
- システムプロンプト（カスタム指示）でグローバル設定可能
- コード生成・創造的ライティング・対話型UIに強み

**Claude（Anthropic）**
- 長文の文脈理解と要約に特に強い（200Kトークン）
- XMLタグ（\`<context>\` \`<task>\`）で構造化すると精度向上
- 「優秀なインターンに依頼する」イメージで意図を共有
- 分析・要約・コードレビューが得意

**Gemini（Google）**
- マルチモーダル（画像・動画・音声理解）に強い
- Google検索と統合して最新情報を扱える
- 最大1Mトークンの長文対応
- 画像生成 (Nano Banana / Gemini 2.5 Flash Image) は写真加工が得意

**Stable Diffusion / Midjourney（画像生成）**
- 英語キーワードをカンマ区切りで列挙（呪文形式）
- 品質タグ（masterpiece, best quality）と重み付け \`(keyword:1.2)\`
- ネガティブプロンプトで不要要素を明示的に除外
- 重要な要素はプロンプトの前方に置く

**DALL-E 3（OpenAI）**
- 自然な英語または日本語の文章で描写
- ChatGPTと統合して対話的に画像を調整可能
- スタイルや雰囲気を文章として表現

各ツール向けの特化プロンプトは<a href="/prompts" class="text-sky-600 hover:underline">カテゴリ別プロンプト一覧</a>に500+件公開しています。`,
      },
      {
        title: 'よくあるNG例とBefore/After改善方法',
        content: `初心者が陥りがちなNG例と、具体的な改善方法を5パターン紹介します。

**NG1: 指示が曖昧すぎる**
- ❌ Before: 「文章を書いて」
- ✅ After: 「IT初心者向けの社内ブログ記事として、ChatGPT-5新機能を400文字で紹介する文章を書いてください。トーンはカジュアル、専門用語は1つ以下に。」

**NG2: 背景情報がない**
- ❌ Before: 「メールを書いて」
- ✅ After: 「お得意先の山田部長（食品メーカー、50代男性、フォーマル）に、納期遅延を1日謝罪するビジネスメールを書いてください。件名込み・本文300文字以内。」

**NG3: 出力形式を指定していない**
- ❌ Before: 「メリットを教えて」
- ✅ After: 「メリットを箇条書きで5つ、それぞれ ①項目名（10文字）②説明（50文字）③具体例（30文字）の構造で。」

**NG4: 例示がない**
- ❌ Before: 「キャッチコピーを作って」
- ✅ After: 「下記スタイルで20個のキャッチコピーを作成: 例『眠りに、革命を。— マットレス○○』のように『商品の効果を、抽象名詞で。— 商品名』の型で。」

**NG5: 1回で完璧を求めすぎる**
- ❌ Before: 100行の超詳細プロンプトを最初から書く
- ✅ After: 短く始めて「もっと○○して」「△△の観点を追加して」と対話で磨く

NG → After のパターンを意識するだけで、最初の出力品質が確実に向上します。`,
      },
      {
        title: 'プロンプト設計の上級テクニック',
        content: `基本を抑えたら、研究で実証された上級テクニックも活用しましょう。

**Zero-Shot プロンプティング**
例示なしで指示だけを与える方法。「次の文章を要約して: {文章}」のようなシンプル形式。AIモデルが十分に強い場合（GPT-4o, Claude 3.5以降）は Zero-Shot でも高品質な結果が得られます。

**Few-Shot プロンプティング**
1〜5個の入出力例を提示してから本番指示する手法。新しいタスクやドメイン固有の出力スタイルが必要なときに効果的。例示は質の高いものを少数提示する方が、低質な例を多数提示するより精度が高くなります。

**Chain of Thought（思考の連鎖）**
「ステップバイステップで考えてください」「推論過程を書いてから答えを出してください」と段階指示することで、論理推論や数学問題の精度が大幅に向上します。OpenAI o1モデルのように推論プロセスを内蔵したモデルも登場しています。

**ReAct（推論 + 行動）**
「観察 → 思考 → 行動」のループで、ツール呼び出しや検索を含むタスクをこなす設計手法。エージェント型AI（Claude Codeなど）の基本フレームワークです。

**Self-Consistency（自己整合性）**
同じ問題に複数回回答させ、多数派の答えを採用する手法。重要な分析タスクや数値計算の信頼性を高めます。Temperature を 0.7 程度に設定し、3〜5回サンプリングします。

**Constitutional AI / RLHF対応**
「安全性・倫理性を最優先で」「不確実な場合は明示してください」のように、AI の方針に沿った指示を加えると、ハルシネーション（誤情報生成）が減ります。

これらのテクニックは組み合わせて使うことができます。例えば「Chain of Thought + Few-Shot」で、複雑な分析タスクの精度が大きく向上します。`,
      },
      {
        title: 'シーン別の業務活用例',
        content: `プロンプトの書き方を理解したら、実際の業務シーンで使ってみましょう。代表的な活用パターンを紹介します。

**ライティング・文書作成**
- ビジネスメール、議事録要約、提案書ドラフト、ブログ記事、SNS投稿
- 効率化倍率: 2〜5倍
- 推奨ツール: ChatGPT, Claude（長文）

**マーケティング・営業**
- キャッチコピー大量生成、ターゲットペルソナ設計、競合分析、セールスメール個別化
- 効率化倍率: 3〜10倍
- 推奨ツール: ChatGPT, Gemini（マルチモーダル）

**プログラミング・開発**
- コード生成、リファクタリング、バグ調査、テストケース生成、SQL作成、技術ドキュメント
- 効率化倍率: 3〜10倍
- 推奨ツール: Claude（コードレビュー）, ChatGPT（実装）

**画像制作・デザイン**
- SNSアイキャッチ生成、商品写真加工、プロフィール写真調整、プレゼン素材
- 効率化倍率: 5〜20倍
- 推奨ツール: Stable Diffusion（細部制御）, Midjourney（アート）, Nano Banana / Gemini Image（写真加工）

**教育・学習**
- 概念説明、例え話生成、練習問題自動作成、英会話練習
- 効率化倍率: 2〜5倍
- 推奨ツール: ChatGPT（対話）, Claude（精緻な要約）

業務でAI導入を始めるなら、(1) 身近な反復作業を1つ選ぶ、(2) プロンプトをテンプレ化、(3) 月次で再評価・改善、というサイクルが最速です。<a href="/prompts" class="text-sky-600 hover:underline">業務カテゴリ別の実用プロンプト集</a>もご活用ください。`,
      },
      {
        title: 'プロンプトの管理とバージョン管理のヒント',
        content: `業務でプロンプトを継続的に使うなら、管理方法も重要です。試行錯誤の結果を共有・再利用できる仕組みを整えましょう。

**1. プロンプトをファイル化する**
プロンプトをコードと同じく \`.md\` や \`.txt\` で保存し、Git で管理します。バージョン履歴が残り、チームで共有できます。

**2. 変数化する**
\`{topic}\` \`{audience}\` \`{tone}\` のように変数化し、ベース文を再利用可能にします。LangChain・PromptLayer などのライブラリがこれを支援します。

**3. メタデータを残す**
各プロンプトに「目的」「対応AIモデル」「成功例」「失敗パターン」を併記すると、後から見返したときに価値が大きく上がります。

**4. A/Bテストする**
重要なプロンプトは複数バージョンを並行運用し、出力品質を比較します。Temperature・モデル・指示の細かい違いで結果は大きく変わります。

**5. 定期的に見直す**
AIモデルは数ヶ月ごとに新バージョンが出ます（GPT-4 → GPT-4o → GPT-5、Claude 3 → 3.5 → 4...）。新モデル登場時に既存プロンプトを再チェックすると、より短いプロンプトで同等以上の結果が得られることが多いです。

**6. 共有プラットフォームを活用する**
社内 Notion / Confluence でプロンプトカタログを作る、または Promptaのような共有サイトを活用すると、組織のプロンプト資産が蓄積していきます。

プロンプトは「使い捨て」ではなく「資産」です。継続的な投資が業務効率の長期的な差につながります。`,
      },
    ],
    faq: [
      { q: 'プロンプトは日本語と英語、どちらで書くべきですか？', a: '対象AIによります。ChatGPT・Claude・Geminiなどの文章生成AIは日本語に完全対応しているため、日本語の方が意図を正確に伝えやすいです。Stable Diffusion・Midjourneyなどの画像生成AIは英語キーワードが主流ですが、DALL-E 3やGemini画像生成は日本語も理解できます。迷ったら「テキスト系→日本語、画像系→英語」を基本としましょう。' },
      { q: 'プロンプトに最適な長さはどれくらいですか？', a: '目的により大きく異なります。シンプルなタスクは50〜200文字、複雑な分析タスクは500〜2000文字、Few-Shot例を含む高度タスクは2000〜5000文字が目安です。AIモデルにはコンテキストウィンドウ上限があり、GPT-4oは128K、Claude 3.5 Sonnetは200K、Geminiは最大1Mトークンに対応しています。日本語1文字は約1〜2トークン換算です。' },
      { q: 'プロンプトを保存・再利用する方法は？', a: '簡易には .md ファイルで Git 管理、規模が大きくなれば Notion・Confluence・PromptLayer・LangChain などの専用ツールに移行します。Promptaのような共有プラットフォームを社内・個人で使うのも有効です。重要なのは「変数化」「メタデータ追加」「バージョン履歴」の3点です。' },
      { q: 'ChatGPTとClaudeでプロンプトの書き方は違いますか？', a: '基本テクニック（コツ1〜7）は共通ですが、ChatGPTはシステムプロンプトで全体方針を設定するスタイル、ClaudeはXMLタグ（\`<context>\` \`<task>\`）で構造化するスタイルが特に効果的です。Claudeは長文理解と精緻な分析、ChatGPTは創造的ライティングとコード生成に強みがあります。' },
      { q: '画像生成AIと文章生成AIのプロンプトの違いは？', a: '記法と思想が完全に異なります。文章生成AIは自然言語で文を組み立てる「文章型」、画像生成AIは英語キーワードをカンマ区切りで列挙する「呪文型」が主流です。ただし最新のDALL-E 3・Gemini画像生成は文章型に近づいており、境界が曖昧になりつつあります。' },
      { q: 'プロンプトエンジニアリングのスキルは必要ですか？', a: '基本的な使い方は誰でも数時間で習得できます。ただし業務で本格活用するには、本記事の7つのコツやFew-Shot・Chain of Thoughtなどの上級テクニックを意識的に練習する必要があります。米国では「プロンプトエンジニア」が年収数千万円規模の専門職として確立しており、AI時代の重要スキルになっています。' },
      { q: '初心者がまず学ぶべきテクニックは何ですか？', a: '優先順位は (1) ゴールを明確にする、(2) ロール設定する、(3) 具体的な背景情報を渡す、(4) 出力形式を指定する、の4つです。これだけでも出力品質は2〜3倍向上します。慣れてきたらFew-Shot（例示）とChain of Thought（段階指示）に進みます。<a href="/guides/what-is-prompt" class="text-sky-600 hover:underline">プロンプトとは？AI初心者向け完全ガイド</a>で基礎を固めてから本記事に戻ると理解が深まります。' },
      { q: 'プロンプトで業務効率はどれくらい上がりますか？', a: 'タスクと使い方に大きく依存しますが、ライティングで2〜5倍、コード生成で3〜10倍、定型文書作成で5倍以上の効率化が報告されています。重要なのはAIに任せる部分と人間が判断する部分を明確に切り分け、プロンプトをテンプレート化・社内共有することです。' },
    ],
  },

  'personal-color-hair-color': {
    sections: [
      {
        title: 'パーソナルカラー × 髪色の関係 — なぜ「似合う」が決まる？',
        content: `「自分に似合う髪色」は、なんとなく好きな色ではなく、肌・瞳・顔の輪郭との調和で科学的に決まります。その判定軸が**パーソナルカラー**です。

パーソナルカラーは、肌のアンダートーン（暖み／青み）・瞳の色・髪の質感・全体のコントラストから、人を 4 シーズン（春・夏・秋・冬）に分類する手法。1980 年代に米国の Carole Jackson が体系化し、日本では資生堂・カネボウなどのコスメブランドや、美容師・ヘアカラーリストが診断ツールとして実用しています。

**髪色とパーソナルカラーの関係は単純です**:
- **イエベ（暖み肌）** × **明るい瞳** → スプリング（春）— コーラル系のあたたかい髪色が映える
- **ブルベ（青み肌）** × **ソフトな瞳** → サマー（夏）— アッシュ系のくすみ髪色が映える
- **イエベ（暖み肌）** × **深い瞳** → オータム（秋）— こっくりブラウン系が映える
- **ブルベ（青み肌）** × **強いコントラスト瞳** → ウィンター（冬）— 真っ黒・赤系が映える

逆に「似合わない色」を選ぶと、髪色が浮いて見えたり顔色が悪く見えたり、せっかく染めても垢抜けない原因になります。本ガイドでは 4 シーズン別の推奨髪色とその理由、美容師さんへのオーダー方法、AI 診断ツールの活用法までを完全解説します。`,
      },
      {
        title: 'スプリング（春）タイプに似合う髪色 5 選',
        content: `**特徴**: 黄み寄りで明るい肌、明るいブラウン〜ライトブラウンの瞳、生まれつき柔らかい質感の髪。クリア・明るい・黄みの 3 要素が揃うタイプ。代表的な芸能人は新垣結衣さん、佐々木希さん、有村架純さん。

**推奨髪色 5 選**:

1. **ライトブラウン** — スプリング王道。透明感がありながら柔らかい印象に。ダメージも目立ちにくく初心者向け。
2. **ハニーゴールド** — ツヤと明るさが両立、明るいキャラの方に。光に当たると黄金色に輝く。
3. **キャラメルブラウン** — オフィスでも浮かない万能系。深みのあるブラウンに黄みのニュアンス。
4. **ストロベリーブロンド** — 個性派チャレンジ枠。ピンクみのあるブロンドで欧米風の印象。
5. **シナモンブラウン** — 落ち着きと明るさのバランスが取れた赤みブラウン。

**美容師オーダーのコツ**:
- 「黄み寄り・明るめ」を強調する
- 「アッシュ系（青み）にしないでください」と明示する
- ブリーチは不要なケースが多い（5 のストロベリー以外）

**避けたい髪色**: アッシュグレー、ブルーブラック、寒色系ピンク。顔色が悪く沈んで見える原因に。`,
      },
      {
        title: 'サマー（夏）タイプに似合う髪色 5 選',
        content: `**特徴**: 青み寄りで明るくソフトな肌、グレー寄りの瞳、ダークブラウンや黒の落ち着いた髪。透明感・くすみ・青みの 3 要素が揃うタイプ。日本人で最も多いタイプとされ、代表的な芸能人は石原さとみさん、長澤まさみさん、綾瀬はるかさん。

**推奨髪色 5 選**:

1. **アッシュブラウン** — サマー王道。涼しげな透明感が特徴。日本人女性の最大公約数。
2. **ココアブラウン** — 柔らかく上品な印象。茶色系のなかでも青みを含む。
3. **ラベンダーアッシュ** — トレンド感を取り入れたい方に。光が当たると紫がかる。
4. **グレージュ** — グレー × ベージュの絶妙バランス。外国人風カラーの代表。
5. **ブルーブラック** — 強さと知性を出したい方に。黒だが青みが効いて重く見えない。

**美容師オーダーのコツ**:
- 「青み寄り・くすみカラー」を伝える
- 「黄ばまない色味」を強調する
- ブリーチ 1 回で発色が良くなる（特に 3 ラベンダー、4 グレージュ）

**避けたい髪色**: オレンジブラウン、ゴールド、明るいキャメル。黄ばんで見え、青み肌から浮く。`,
      },
      {
        title: 'オータム（秋）タイプに似合う髪色 5 選',
        content: `**特徴**: 黄みを強く含んだイエローオークル肌、ダークブラウン〜こげ茶の瞳、生まれつき赤褐色の髪。ディープ・黄み・マットの 3 要素が揃うタイプ。代表的な芸能人は杏さん、ヨンアさん、栗山千明さん、北川景子さん。

**推奨髪色 5 選**:

1. **チョコレートブラウン** — オータム王道。深みと落ち着き。フォーマルな印象にも合う。
2. **ハニーカラメル** — 暖かみと華やかさ。ハイライトで動きをつけると上品。
3. **テラコッタブラウン** — 個性派、肌の色気を引き立てる赤みブラウン。
4. **ダークオーバーン** — 深い赤褐色。シックで知的な印象、欧州貴族風。
5. **マロンブラウン** — 栗色の温かみ、秋冬コーディネートに最高にマッチ。

**美容師オーダーのコツ**:
- 「暖色寄り・深め・マット」を伝える
- 「黄み・赤み OK」と明示（オータムは黄み肌なので浮かない）
- ハイライトを入れる場合は「ゴールド系の細めハイライト」と指定

**避けたい髪色**: アッシュグレー、プラチナブロンド、寒色系ピンク。マットな肌から色が浮いて顔色を悪く見せる。`,
      },
      {
        title: 'ウィンター（冬）タイプに似合う髪色 5 選',
        content: `**特徴**: 青み寄りで透明感がありコントラストの強い肌、真っ黒〜ダークブラウンの瞳、生まれつき太くハリのある黒髪。コントラスト・青み・クリアの 3 要素が揃うタイプ。代表的な芸能人は小松菜奈さん、菜々緒さん、桐谷美玲さん、深田恭子さん。

**推奨髪色 5 選**:

1. **ジェットブラック** — ウィンター最強。生まれ持った黒髪を活かす。シャープで知的な印象。
2. **ダークアッシュ** — 黒に近いがアッシュ感ありで重くならない。クールな大人系。
3. **ブルーブラック** — 黒髪に青い艶めき。光に当たると神秘的。
4. **プラチナホワイト** — 強烈な個性派。ブリーチ複数回必要。海外風の代表。
5. **ワインレッド** — 深みのある赤、コントラスト肌に映える。

**美容師オーダーのコツ**:
- 「強くハッキリした色」を伝える
- 「黄み・くすみは NG」と明示
- 4 のプラチナはブリーチ 3-4 回が必要、ダメージを覚悟する

**避けたい髪色**: ベージュ、テラコッタ、オリーブ、マスタード系。ぼんやり見え、ウィンター本来のシャープさを台無しに。`,
      },
      {
        title: '自分のパーソナルカラーが分からない時の対処法',
        content: `「自分が春・夏・秋・冬のどれか分からない」のは最も多い悩みです。判断が難しい主な原因は:

- **複数シーズンの特徴が混在**するパターン（例: 肌は黄みだが髪は柔らかいなど）
- **照明・季節・日焼け**で見え方が変わる
- **自己診断の主観バイアス**（好みの色を「似合う」と思い込みやすい）

**最速の解決法は AI 写真診断ツールの活用です**。当サイトの **[似合う髪色診断 AI](/tools/hair-color-diagnosis)** は写真 1 枚で:

1. AI があなたのパーソナルカラーを判定（4 シーズン分類）
2. 似合う髪色を 5 候補提案（安心の定番・トレンド・個性派のバランス）
3. Gemini 2.5 Flash Image で **Before/After シミュレーション**を生成

**Google ログインで 3 回無料**、写真は保存されません。実際の美容院に行く前のイメージトレーニングや、美容師さんへのオーダー時の参考画像として最適です。

より総合的に診断したい方は **[パーソナルカラー診断 AI](/tools/personal-color-analysis)** をご利用ください。髪色だけでなく服・口紅・アクセサリーまで含む 16 色のパレットを提案します。各シーズン詳細ガイドも参考に: [スプリング](/tools/personal-color-analysis/spring) / [サマー](/tools/personal-color-analysis/summer) / [オータム](/tools/personal-color-analysis/autumn) / [ウィンター](/tools/personal-color-analysis/winter)。

**美容師さんに依頼する場合**は「私はおそらく [シーズン名] です。[推奨髪色] のような色を希望します」と伝えると、プロが微調整して最適なカラーを作ってくれます。`,
      },
    ],
    faq: [
      { q: 'パーソナルカラーと似合う髪色の関係は何ですか？', a: 'パーソナルカラーは肌のアンダートーン（暖み／青み）・瞳・髪の質感・全体のコントラストから 4 シーズン（春・夏・秋・冬）に分類する手法です。各シーズンに「似合う色の世界」があり、髪色もその世界に属する色が肌の透明感を最大限に引き出します。例えば春タイプは「黄み × 明るい」髪色（ライトブラウン・ハニーゴールド）、冬タイプは「青み × 強い」髪色（ジェットブラック・ワインレッド）が映えます。' },
      { q: 'イエベ・ブルベの違いは？', a: 'イエベ（イエローベース）は黄み寄りの肌で春・秋タイプが該当、ブルベ（ブルーベース）は青み寄りの肌で夏・冬タイプが該当します。簡易判定は (1) ゴールドのアクセサリーが似合えばイエベ、シルバーが似合えばブルベ。(2) 手首の血管が緑がかればイエベ、青や紫ならブルベ。(3) 焼けるとすぐ赤くなるならブルベ、小麦色になるならイエベ。ただし精度は中程度なので、AI 写真診断や専門家によるドレーピング診断と組み合わせるのがおすすめ。' },
      { q: 'ブリーチが必要な髪色はどれですか？', a: '春タイプの「ストロベリーブロンド」、夏タイプの「ラベンダーアッシュ」「グレージュ」、冬タイプの「プラチナホワイト」はブリーチが必要（特にプラチナは 3-4 回）。一方、各シーズンの王道カラー（ライトブラウン・アッシュブラウン・チョコレートブラウン・ジェットブラック）はブリーチ不要です。ブリーチ回数が増えるほど髪のダメージは大きくなるため、ダメージケアと費用も考慮してください。' },
      { q: 'AI で似合う髪色を試せますか？', a: 'はい。当サイトの「似合う髪色診断 AI」では写真 1 枚で 4 シーズン判定 + 似合う髪色 5 候補 + Before/After シミュレーション画像を Gemini 2.5 Flash Image で自動生成します。Google ログインで 3 回無料、写真は保存されません。実際の美容院予約前のイメージトレーニングに最適です。本格的なパーソナルカラー全体判定をしたい方は「パーソナルカラー診断 AI」も併用できます（ポイント共通）。' },
      { q: '美容師さんへのオーダー方法は？', a: '効果的なオーダー文の構造は (1) 自分のパーソナルカラー判定結果（例: ブルベ夏）、(2) 希望の髪色名（例: アッシュブラウン）、(3) ハイライトの有無、(4) ブリーチを希望するか、(5) ダメージ予算、の 5 点。AI 診断ツールの Before/After 画像を見せると意図がさらに正確に伝わります。「夏タイプなので青み寄りで黄ばまない色味、ブリーチなしでアッシュブラウン希望、ハイライトはお任せ」のようにシンプルに伝えるのが理想です。' },
      { q: '同じパーソナルカラーでもイメージが違うのは？', a: '4 シーズンの中でも「ライト・ブライト・ディープ・ソフト」などのサブタイプがあり（例: ライトスプリング、ブライトスプリング、ライトサマー、ディープオータム）、同じ春タイプでもライト寄りなら淡いライトブラウン、ブライト寄りならハッキリしたコーラルブラウンが映えます。AI 診断では最も近い 4 シーズンに分類しますが、より細かいタイプ判定は専門家の対面診断が確実です。' },
    ],
  },

  'gemini-prompt-collection': {
    sections: [
      {
        title: 'Gemini 2.5 とは — Pro / Flash / Nano Banana の使い分け',
        content: `**Google Gemini 2.5** は Google が 2024 年末から 2026 年にかけて段階的にリリースした最新世代のマルチモーダル AI モデル群です。テキスト・画像・動画・音声を統合的に処理でき、最大 1M トークンの長文対応と画像生成・編集機能を併せ持つのが特徴。ChatGPT・Claude と並ぶ第三の選択肢として急速に普及しています。

**3 つのバリエーションを使い分けるのが効率化のコツ**:

1. **Gemini 2.5 Pro** — 最高精度モデル。複雑な推論・長文の精緻な分析・コード生成に最適。レスポンス時間は長めだが品質重視の場面で。
2. **Gemini 2.5 Flash** — 高速・低コストモデル。日常的な質問・要約・翻訳・短いコード生成に最適。Pro の 3-5 倍速い。
3. **Gemini 2.5 Flash Image（通称 Nano Banana）** — 画像生成・編集専用モデル。アップロード写真の編集（背景置換・髪色変更・着せ替え）と新規画像生成の両方に対応。ChatGPT 画像生成・DALL-E 3 と並ぶ実用ツール。

本ガイドで紹介するプロンプトは、用途に応じてこの 3 モデルを選んで使い分けることを前提に構成しています。プロンプトの「型」は ChatGPT・Claude と共通ですが、Gemini 特有の効果的な書き方も後半で解説します。`,
      },
      {
        title: '画像生成プロンプト集（Nano Banana 用）— 10 例文',
        content: `Gemini 2.5 Flash Image（Nano Banana）の画像生成・編集プロンプトは、ChatGPT 画像生成と異なり**英語の自然文**で書くのが基本です。Stable Diffusion 系のタグ羅列より、シーンを文章で描写する方が認識率が高くなります。

**人物・キャラ系**:

1. \`A young Japanese woman with long black wavy hair, wearing a cream knit sweater, sitting by a window in autumn afternoon light, soft cinematic depth of field, photorealistic\`
2. \`A fantasy elf warrior with silver hair and emerald eyes, wearing leather armor with gold accents, standing in an ancient forest with sunbeams, digital art\`

**風景・スタイル系**:

3. \`A serene Japanese rural landscape in late autumn, rice fields with golden stalks, distant mountains with red maples, soft morning fog, Studio Ghibli style\`
4. \`A futuristic Tokyo cityscape at night, neon signs reflecting on wet streets, cyberpunk aesthetic, cinematic wide shot, blade runner inspired\`

**写真加工系**（既存写真の編集）— ユーザー画像をアップロードしてから:

5. \`Replace the background of the uploaded photo with a soft cream studio backdrop. Keep the person's identity, hair, clothing, and pose exactly. Photorealistic, natural lighting.\`
6. \`Change the hair color of the person in the uploaded photo to ash brown. Keep the person's face, eye shape, jawline, and skin tone exactly unchanged. Maintain natural hair texture and lighting consistency.\`
7. \`Convert the uploaded black and white photo to natural color, with realistic skin tones and period-accurate clothing colors for the 1950s. Preserve all facial features and composition exactly.\`

**ビジネス用途**:

8. \`A clean modern infographic showing 4 key benefits of cloud computing, with icons in pastel colors, minimalist style, suitable for a tech presentation slide\`

**マルチモーダル指示**（画像 + テキスト）:

9. \`Analyze the uploaded chart image and create a similar visualization but for the data: Q1 sales 120K, Q2 145K, Q3 168K, Q4 195K. Use the same color scheme.\`
10. \`Based on the uploaded floor plan, suggest 3 different interior design styles for the living room. Create a visualization for each style.\`

各プロンプトは **R1-R9 規則**（アップロード写真の参照表現・保持声明・出力規格指定）を守ることで成功率が大幅に上がります。詳細は当サイトの [/prompts/photo-edit](/prompts/photo-edit) で多数例を公開中。`,
      },
      {
        title: '文章作成プロンプト集 — ブログ・SEO・メール 10 例文',
        content: `Gemini は最大 1M トークンの長文対応が強み。ブログ記事・レポート・メール文面など長文生成に特に向いています。

**ブログ・SEO 系**:

1. **SEO ブログ記事生成**:
\`あなたはSEOに精通したライターです。以下のキーワードに対して、検索意図を考察したうえで、見出し構造（H2/H3）を提案してください。読者は[ターゲット]、トーンは[ですます調/常体]、文字数は[目安]字程度。\nキーワード: [入力]\n参考にすべき情報: [競合記事 URL 3 つ]\`

2. **記事リライト・改善提案**:
\`以下の記事を読み、SEO 観点（タイトル・H2/H3・内部リンク・冗長表現）と読みやすさ観点（文章のリズム・専門用語の解説）の両面から、具体的な改善点を 10 個リストアップしてください。\n記事: [本文貼り付け]\`

3. **メタディスクリプション生成**:
\`以下の記事タイトルと冒頭 500 字を読み、検索結果で CTR が高くなる魅力的なメタディスクリプションを 3 案、それぞれ 120-155 字で作成してください。\nタイトル: [入力]\n冒頭: [貼り付け]\`

**ビジネスメール系**:

4. **クライアント向け提案メール**:
\`以下の状況で、丁寧かつ簡潔なクライアント向けメール文面を日本語で作成してください。\n状況: [背景]\n依頼内容: [何を伝えるか]\nトーン: 信頼関係構築重視\n結びの一文: 次回ミーティングの提案を含める\`

5. **謝罪メール**:
\`[トラブル内容]について顧客への謝罪メールを作成してください。事実関係、原因、再発防止策、補償案の 4 構成で。誠実かつ過度に卑屈にならないトーン。\`

**長文系（Gemini Pro 推奨）**:

6. **議事録要約**: \`以下の 2 時間分のミーティング書き起こしを読み、(1) 決定事項、(2) アクションアイテム（担当者と期日）、(3) 未解決の論点、(4) 次回までの宿題、の 4 セクションで要約してください。\`

7. **競合分析レポート**: \`以下の 5 つの競合サイトの「ホームページ・料金ページ・特徴ページ」を読み、各社の (1) ターゲット顧客、(2) 価値訴求、(3) 価格帯、(4) 差別化ポイントを比較表にまとめてください。\`

**創作系**:

8. **小説プロット**: \`以下の設定で、5 章構成の短編小説プロットを作成してください。各章のタイトル、主要シーン 3 つ、登場人物の心理変化を簡潔に。\n設定: [入力]\nジャンル: [入力]\`

9. **キャッチコピー 10 案**: \`[商品名]の魅力を 1 行で伝えるキャッチコピーを 10 案、機能訴求 3 / 感情訴求 3 / ベネフィット訴求 3 / 比較訴求 1 のバランスで作成してください。\`

10. **企画書骨子**: \`以下のアイデアを起案者として企画書の骨子に展開してください。背景・課題・提案内容・期待効果・実行計画・予算感の 6 セクションで。\nアイデア: [入力]\`

**Gemini 特有のコツ**: 長文では \`---\` のセクション区切りや見出しを Markdown 形式で明示すると整形精度が上がります。`,
      },
      {
        title: 'AI 写真加工プロンプト集（Gemini 2.5 Flash Image）— 5 例文',
        content: `Gemini 2.5 Flash Image（Nano Banana）はアップロード写真への編集が ChatGPT 画像生成と並ぶ精度を持ちます。**R1-R9 規則**（対象明示・保持声明・出力規格・質感タグ・反向防呆）を守ると成功率が大幅に向上。

**1. 背景置換**:
\`Replace the background of the uploaded photo with a clean cream studio backdrop. Keep the person's identity, eye shape, nose, jawline, hair length, hair color, clothing color, clothing fit, and pose exactly as the source. No white halo around the subject and no color cast on the skin from the new background. Output at the original resolution, photorealistic and natural-looking.\`

**2. 髪色変更**:
\`Change the hair color of the person in the uploaded photo to ash brown (#8B7355). Preserve the person's identity, eye shape, nose, jawline, face proportions, clothing, makeup state, background, and pose exactly. Maintain natural hair texture, lighting consistency, and individual strand definition. Do not modify the facial structure. Output at the original resolution.\`

**3. 服装着せ替え**:
\`Replace the outfit of the person in the uploaded photo with a navy business suit, white blouse, and small pearl earrings. Lock identity, eye shape, nose, jawline, hair length, hair color, bangs, eyebrow shape, lip color, and pose exactly. Do not alter facial features or invent accessories. Do not regenerate the photo from scratch — only operate on the existing pixels. Output at the original resolution, photorealistic.\`

**4. 美肌レタッチ（年齢相応の自然さ）**:
\`Apply gentle, natural skin retouching to the uploaded photo. Reduce only obvious blemishes and even out skin tone slightly. Preserve identity, facial structure, freckles, moles, fine lines around the eyes, eyebrow shape, lip color (do not add lipstick), makeup state, hair, clothing, and background exactly. Do not over-smooth the skin and avoid any plastic-looking face.\`

**5. 白黒写真カラー化**:
\`Convert the uploaded black and white photo to natural color, with realistic, period-accurate skin tones, clothing colors appropriate for the 1950s era, and natural film grain preserved. Lock identity, pose, face proportions, clothing shape, hair shape, and grain texture exactly as the source. Do not regenerate the photo from scratch — only add color to existing pixels.\`

これらは**当サイトの [/prompts/photo-edit](/prompts/photo-edit) で多数の実例とサンプル画像を公開**しています。「自分の写真でやってみたい」方は当サイトの [パーソナルカラー診断 AI](/tools/personal-color-analysis) や [似合う髪色診断 AI](/tools/hair-color-diagnosis) で**Google ログインで 3 回無料**ですぐに試せます。`,
      },
      {
        title: '学習・教育プロンプト集 — 10 例文',
        content: `Gemini の長文対応と多言語能力は学習用途で特に強みを発揮します。

1. **概念解説（小学生でも分かるように）**: \`「[難解な概念]」を小学校 5 年生でも理解できる言葉で、200 字以内で説明してください。比喩を 1 つ含めてください。\`

2. **学習計画作成**: \`[目標、例: TOEIC 800 点]を 6 ヶ月で達成するための週単位学習計画を作成してください。現在のレベル: [入力]、平日の学習時間: [入力]時間。週ごとに目標、教材、テスト方法を明記。\`

3. **問題演習生成**: \`[科目・単元]について、難易度を「易・中・難」に分けて練習問題を各 5 問、合計 15 問作成してください。各問題に解説と関連知識を 100 字程度で添えてください。\`

4. **記憶術・ニーモニック**: \`「[暗記したい内容]」を覚えるためのニーモニック（語呂合わせ）を 3 案作成してください。日本語、できれば短くインパクトのあるもの。\`

5. **英語学習 — シャドーイング教材生成**: \`[トピック]について、ネイティブの自然な英語で 2 分間のモノローグを作成してください。難易度は [初級/中級/上級]、文法のポイントを 3 つ明示。\`

6. **語彙学習**: \`[英単語]の「コア意味 → 拡張意味 → 使用例文 3 つ → 類義語との違い → よくある誤用」を 1 セットで解説してください。\`

7. **論文・本の要約**: \`以下の論文（または本）の要約を、3 階層（30 字 / 200 字 / 1000 字）で作成してください。最も重要な発見や主張を強調してください。\n[本文または PDF アップロード]\`

8. **議論の練習**: \`「[論争のあるトピック]」について、賛成と反対のそれぞれの立場から最強の論拠を 5 つずつ提示してください。エビデンスや具体例を必ず含めてください。\`

9. **コード学習・デバッグ**: \`以下のコードを行ごとに解説してください。初心者が理解できるよう、各行で何が起きているかを説明し、潜在的なバグや改善点も指摘してください。\n[コード貼り付け]\`

10. **試験準備 — 想定質問生成**: \`[試験名]の過去問の傾向を踏まえて、出題されそうな問題を 20 問作成してください。各問題に難易度、出題頻度、解答のコツを添えてください。\``,
      },
      {
        title: '仕事効率化プロンプト集 — 議事録・要約・スケジュール 10 例文',
        content: `**1. 議事録自動整形**:
\`以下のミーティング書き起こしから議事録を作成してください。フォーマット: (1) 日時・参加者、(2) アジェンダ、(3) 決定事項、(4) アクションアイテム（担当者・期日）、(5) 次回までの宿題。\n[書き起こし貼り付け]\`

**2. 長文書類要約**:
\`以下の 50 ページの PDF を、エグゼクティブサマリー（500 字）、主要発見 5 つ、推奨アクション 3 つの構造で要約してください。\n[PDF アップロード]\`

**3. データ分析結果の解釈**:
\`以下の表データを分析し、(1) 主要トレンド、(2) 異常値、(3) ビジネスへの示唆、(4) さらに調査すべき点を整理してください。\n[CSV データ貼り付け]\`

**4. プレゼン構成**:
\`[テーマ]について 15 分のプレゼンの構成を作ってください。スライド 10 枚、各スライドのタイトル・要点 3 つ・話す時間配分を明記。\`

**5. 企画書作成**:
\`以下の企画アイデアを A4 1 枚にまとめてください。背景・課題・解決策・期待効果・KPI・予算感・スケジュールの 7 セクション。\n[アイデア入力]\`

**6. 顧客対応テンプレート**:
\`[よくある問い合わせ内容]に対する顧客対応テンプレートを 3 パターン（標準・丁寧・くだけた）作成してください。各 200 字程度。\`

**7. メール文面生成**:
\`[相手・目的・伝えたい要点 3 つ]を踏まえて、ビジネスメールを作成してください。タイトル含む。トーンは [指定]。\`

**8. スケジュール調整**:
\`以下の参加者リストとそれぞれの空き時間から、全員が参加できる時間帯を 3 つ提案してください。最初の選択肢を本命としてください。\n参加者: [入力]\`

**9. KPI レポート骨子**:
\`[期間]の [事業] KPI レポートの骨子を作ってください。データを入れる枠だけ用意、(1) 売上、(2) 新規顧客、(3) リピート率、(4) 解約率、(5) ROI の 5 指標に対して目標・実績・前期比・分析の 4 列表を作成。\`

**10. プロジェクト振り返り（KPT 形式）**:
\`以下のプロジェクト概要から KPT（Keep / Problem / Try）形式で振り返りをまとめてください。各カテゴリ 3-5 点ずつ、具体的なアクションに繋がる形で。\n[プロジェクト概要]\`

**Gemini を使いこなすコツ**: 仕事系プロンプトは **Markdown 形式の出力指定**（「以下の Markdown 形式で出力してください: ## [見出し]\\n- [リスト項目]」）と、**例示（Few-Shot）**（「以下の例にならって作成してください: [例 1] [例 2]」）を組み合わせると精度が劇的に上がります。`,
      },
    ],
    faq: [
      { q: 'Gemini プロンプトの書き方は ChatGPT と違いますか？', a: '基本テクニック（具体性・ロール設定・例示・出力フォーマット指定）は ChatGPT・Claude と共通です。ただし Gemini 特有のコツとして (1) 長文の Markdown 整形が得意なので「Markdown 形式で出力」を明示、(2) マルチモーダル（画像+テキスト同時入力）に強いので画像と質問を組み合わせるプロンプトを使う、(3) 最大 1M トークン対応なので長大な PDF や複数文書を一度に渡せる、の 3 点を意識すると Gemini の強みを引き出せます。' },
      { q: 'Gemini 2.5 Flash と Pro の違いは？', a: 'Flash は高速・低コスト（Pro の 3-5 倍速）で、日常的な質問・要約・翻訳・短文生成に最適。Pro は最高精度で、複雑な推論・長文の精緻な分析・コード生成・専門領域に適しています。料金は Flash が大幅に安いので、簡単なタスクは Flash、品質が重要な場合のみ Pro を使うのが効率的。Gemini API なら同じプロンプトでモデル名だけ切り替えて両者の出力を比較できます。' },
      { q: 'Nano Banana（Gemini 2.5 Flash Image）とは？', a: '通称「Nano Banana」は Gemini 2.5 Flash Image の俗称で、Google の画像生成・編集専用モデルです。アップロード写真の編集（背景置換・髪色変更・着せ替え・年代変換）と新規画像生成の両方に対応。ChatGPT 画像生成・DALL-E 3 と並ぶ実用ツールで、特に**人物の識別保持（identity preservation）**が強み。当サイトの [パーソナルカラー診断 AI](/tools/personal-color-analysis) と [似合う髪色診断 AI](/tools/hair-color-diagnosis) はこのモデルで Before/After を生成しています。' },
      { q: 'ChatGPT のプロンプトを Gemini にそのまま使えますか？', a: '基本的に使えますが、最大限の精度を引き出したい場合は微調整がおすすめ。ChatGPT 用プロンプトの「You are...」ロール設定はそのまま機能しますが、Gemini ではより自然な日本語の指示（「あなたは…の専門家です」）と Markdown 出力指定の組み合わせがベスト。Claude 用の XML タグ（\`<context>\` \`<task>\`）は Gemini では効果が薄く、代わりに Markdown 見出しで構造化するのが効率的です。' },
      { q: 'Gemini プロンプトの料金は？', a: 'Gemini の利用方法は (1) Web UI（gemini.google.com）が無料、(2) Google One AI Premium が月額 2,900 円で Gemini Advanced（Gemini 2.5 Pro 利用可）、(3) Gemini API が従量課金（Flash $0.075/1M tokens、Pro $1.25/1M tokens 程度）の 3 通り。個人利用なら Web UI で十分、ビジネス用途で大量利用するなら API、画像生成を多用するなら Gemini Advanced がコスパ最適です。' },
      { q: 'Gemini と Stable Diffusion / Midjourney の使い分けは？', a: 'Gemini 2.5 Flash Image（Nano Banana）は**既存写真の編集**（背景置換・髪色変更・着せ替え）に特に強く、ChatGPT 画像生成と並ぶトップクラス。Stable Diffusion は**ゼロから画像を生成**する用途で、ネガティブプロンプトや ControlNet で細かい制御が効きます。Midjourney は**芸術性・スタイル統一**が突出していて、コンセプトアートやファッション撮影風の画像に最適。用途別に使い分けるのが効率的で、当サイトでも [/tools/gemini](/tools/gemini) と [/tools/stable-diffusion](/tools/stable-diffusion) [/tools/midjourney](/tools/midjourney) の各専用プロンプト集を公開しています。' },
    ],
  },

  'ai-coloring-page-prompt': {
    sections: [
      {
        title: 'AI で塗り絵を作るとは — Stable Diffusion / DALL-E / Midjourney で線画ぬりえを無料生成',
        content: `**AI 塗り絵プロンプト**とは、Stable Diffusion・DALL-E 3・Midjourney などの AI 画像生成ツールに「黒い線だけで描かれた白黒の塗り絵（線画）」を出力させる呪文（指示文）のことです。市販の塗り絵本やフリー素材サイトと違い、**好きなテーマ・好きな難易度で無料でオリジナル塗り絵を作成**でき、印刷してそのまま塗り絵として使えます。

**こんな人におすすめ**:

- 子供の習い事・自宅学習用に好きなキャラの塗り絵を作りたい保護者
- 大人の塗り絵（コロリアージュ）で癒し・脳トレを楽しみたい方
- 高齢者介護・リハビリの現場でレクリエーション素材を必要としているスタッフ
- 線画を出発点にデジタル彩色（クリスタ・Procreate）を学びたいイラスト学習者

**AI 塗り絵の最大のメリット**は (1) **無料**（API 無料枠 + Stable Diffusion ローカル実行）、(2) **オリジナル**（市販品にない自由なテーマ）、(3) **難易度調整**（thick outline で簡単 / fine detail で本格）。一方デメリットは (a) 著作権リスクのあるキャラ（ポケモン・ディズニーなど）の生成は推奨されず、(b) 印刷向け解像度設定（300 DPI / A4 サイズ）に少しコツが必要な点です。本ガイドではこの 2 点を含め、すぐ使えるテンプレートと注意点を実例つきで解説します。`,
      },
      {
        title: '塗り絵プロンプトの基本テンプレート — どのツールでもこの型',
        content: `Stable Diffusion / DALL-E / Midjourney すべてで共通の「塗り絵専用プロンプト」の基本構造です。コピペして \`[subject]\` の部分だけ書き換えれば、即使えます。

**ベーステンプレート（英語推奨 — 日本語より精度が高い）**:

\`\`\`
black and white coloring page of [subject], clean line art, printable, thick outline, simple composition, white background, no shading, no grayscale, suitable for [audience]
\`\`\`

**Negative prompt（除外指定）**:

\`\`\`
color, grayscale, shadow, gradient, realistic photo, complex background, text, watermark, logo, copyrighted character, anime character, mascot
\`\`\`

**重要キーワード解説**:

- \`black and white coloring page\` — 塗り絵であることを明示。これがないと普通のイラストになる
- \`clean line art\` — はっきりした線、塗り絵に必須
- \`thick outline\` — 太い線（子供向け・高齢者向けに最適）。本格派は \`fine detail line art\` に置換
- \`no shading, no grayscale\` — 灰色の陰影を排除（塗り絵では塗る人が陰影を付けるので不要）
- \`white background\` — 余計な背景を排除し、印刷向けに最適化
- \`suitable for [audience]\` — \`adults\` / \`children\` / \`seniors\` / \`beginners\` で対象を明示

**具体例**:

\`\`\`
black and white coloring page of beautiful cherry blossoms in a Japanese garden, clean line art, printable, thick outline, simple composition, white background, no shading, no grayscale, suitable for adults
\`\`\`

この型に当てはめれば、花・動物・風景・マンダラ・幾何学模様など何でも塗り絵化できます。`,
      },
      {
        title: 'テーマ別プロンプト例 30 — 大人向け・子供向け・高齢者向け',
        content: `**大人向け塗り絵（コロリアージュ・治癒系）— 細かい線で集中力 UP**:

1. \`black and white coloring page of intricate mandala pattern with floral motifs, fine line art, printable, complex symmetry, white background, no shading, suitable for adults\`
2. \`black and white coloring page of detailed botanical illustration of roses and leaves, fine line art, printable, vintage style, white background, no shading, suitable for adults\`
3. \`black and white coloring page of a serene Japanese zen garden with stones and bamboo, clean line art, printable, simple composition, white background, no shading, suitable for adults\`
4. \`black and white coloring page of art nouveau style peacock with elaborate feathers, fine line art, printable, decorative pattern, white background, no shading, suitable for adults\`
5. \`black and white coloring page of forest animals — deer, owl, fox — in a magical woodland, clean line art, printable, whimsical, white background, no shading, suitable for adults\`

**子供向け塗り絵 — 太い線・シンプル**:

6. \`black and white coloring page of a friendly cartoon dinosaur in a jungle, clean line art, printable, thick outline, simple composition, white background, no shading, suitable for children\`
7. \`black and white coloring page of cute sea animals — fish, octopus, turtle, starfish — in the ocean, clean line art, printable, thick outline, white background, no shading, suitable for children\`
8. \`black and white coloring page of a shinkansen bullet train on a track with mountains, clean line art, printable, thick outline, white background, no shading, suitable for children\`
9. \`black and white coloring page of various fruits — apple, banana, strawberry, grape — on a table, clean line art, printable, thick outline, white background, no shading, suitable for children\`
10. \`black and white coloring page of seasonal events — Christmas tree with presents — clean line art, printable, thick outline, white background, no shading, suitable for children\`

**高齢者向け塗り絵 — 大きな線・見やすい構図**:

11. \`black and white coloring page of large simple flowers — sunflower, tulip, daisy — with thick outlines, clean line art, printable, very simple composition, white background, no shading, suitable for seniors\`
12. \`black and white coloring page of Showa era Japanese countryside landscape with thatched roof house, clean line art, printable, thick outline, white background, no shading, suitable for seniors\`
13. \`black and white coloring page of seasonal Japanese flowers — sakura in spring, hydrangea in summer — with very thick outline, clean line art, printable, white background, no shading, suitable for seniors\`
14. \`black and white coloring page of large simple animal — cat, dog, rabbit — with thick outline, clean line art, printable, very simple composition, white background, no shading, suitable for seniors\`
15. \`black and white coloring page of traditional Japanese pattern with bold thick lines for nursing care recreation, clean line art, printable, very simple, white background, no shading, suitable for seniors\`

**マンダラ・幾何学模様**:

16. \`black and white coloring page of geometric mandala with concentric circles and lotus petals, fine line art, printable, perfect symmetry, white background, no shading\`
17. \`black and white coloring page of Scandinavian folk pattern, clean line art, printable, decorative tiles, white background, no shading\`

**花・植物専門**:

18. \`black and white coloring page of cherry blossom branch with petals falling, clean line art, printable, Japanese style, white background, no shading\`
19. \`black and white coloring page of rose bouquet with leaves and ribbon, fine line art, printable, vintage style, white background, no shading\`
20. \`black and white coloring page of botanical line art of various herbs and plants, fine line art, printable, scientific illustration style, white background, no shading\`

**動物専門**:

21. \`black and white coloring page of woodland animals in a meadow, clean line art, printable, white background, no shading\`
22. \`black and white coloring page of cat sitting by a window, clean line art, printable, cozy scene, white background, no shading\`

**風景・建物**:

23. \`black and white coloring page of European old town street with cafe and lamp post, clean line art, printable, white background, no shading\`
24. \`black and white coloring page of Mt. Fuji with cherry trees in foreground, clean line art, printable, Japanese landscape, white background, no shading\`

**乗り物・機械（子供向け）**:

25. \`black and white coloring page of various vehicles — car, bus, truck, ambulance — on a road, clean line art, printable, thick outline, white background, no shading, suitable for children\`

**昆虫・自然**:

26. \`black and white coloring page of butterflies and dragonflies in a garden, clean line art, printable, white background, no shading\`

**ケーキ・スイーツ（女の子向け）**:

27. \`black and white coloring page of decorated cakes, donuts, macarons on a stand, clean line art, printable, white background, no shading\`

**カフェ風イラスト**:

28. \`black and white coloring page of cozy cafe interior with coffee cup and pastries, clean line art, printable, white background, no shading, suitable for adults\`

**初心者向け超シンプル**:

29. \`black and white coloring page of single large flower with very thick outline, simple geometric petals, printable, white background, no shading, suitable for beginners\`

**印刷専用最終形**:

30. \`black and white coloring page of [your subject], clean line art, A4 portrait orientation, 300 DPI quality, thick outline, simple composition, white background, no shading, no grayscale, suitable for printing\``,
      },
      {
        title: 'Stable Diffusion・DALL-E・Midjourney — ツール別の使い分け',
        content: `塗り絵プロンプトはどの AI 画像生成ツールでも基本構造は同じですが、**それぞれ得意な領域が異なる**ため、用途に応じた使い分けが効率的です。

**Stable Diffusion**（[/tools/stable-diffusion](/tools/stable-diffusion)）—**推奨度: ★★★**:

- **メリット**: ローカル実行で完全無料、無制限生成、Negative prompt の効きが強い（\`color\` \`grayscale\` を確実に除外）
- **デメリット**: セットアップが必要、GPU が必要
- **おすすめモデル**: \`Anything V5\` \`Counterfeit\` などのアニメ系、\`Realistic Vision\` などのリアル系。**塗り絵 LoRA**（Coloring Book LoRA, Line Art LoRA）を追加すると精度が劇的に向上
- **設定**: Sampler は \`DPM++ 2M Karras\`、Steps 25-30、CFG Scale 7-9 が標準

**DALL-E 3**（[/tools/dall-e](/tools/dall-e)）— **推奨度: ★★★**:

- **メリット**: ChatGPT Plus / Bing Image Creator で簡単アクセス、自然文プロンプトの理解が最高クラス、線がきれい
- **デメリット**: 1 日の生成枚数制限、Negative prompt がない（プロンプトに「no shading」と明示）
- **使い方**: ChatGPT Plus に上記テンプレートをそのまま投げるだけ。「もう少し線を太く」のような追加指示も自然文で OK

**Midjourney**（[/tools/midjourney](/tools/midjourney)）— **推奨度: ★★**:

- **メリット**: アート性・スタイル統一が突出、コロリアージュ風の繊細な線画が美しい
- **デメリット**: 有料（月 $10〜）、Discord 経由、「黒線のみ」を守らない傾向あり
- **使い方**: プロンプト末尾に \`--no color, shading, grayscale --ar 4:3\` を追加。バージョンは \`--v 6\` 推奨

**Gemini 2.5 Flash Image（Nano Banana）**（[/tools/gemini](/tools/gemini)）— **推奨度: ★**:

- 2026 年 5 月時点で塗り絵専用には**最適化されていない**。線画よりも自然なイラスト寄り出力になる傾向あり。既存写真からの線画変換（写真→塗り絵）には使えるが、ゼロから生成する用途では SD / DALL-E が優位

**おすすめの使い分け**:

| 用途 | 第一選択 | 第二選択 |
|---|---|---|
| 大量生成・無制限 | Stable Diffusion | — |
| 簡単に試したい | DALL-E 3 | Stable Diffusion |
| 芸術性重視 | Midjourney | Stable Diffusion |
| 写真→線画変換 | Gemini | Stable Diffusion (img2img) |`,
      },
      {
        title: '印刷向け解像度・サイズ設定 — A4 で綺麗に印刷するコツ',
        content: `AI で生成した塗り絵を**家庭用プリンタで A4 印刷**するには、解像度とアスペクト比の指定が重要です。

**推奨設定**:

- **解像度**: 300 DPI（家庭用プリンタの標準）→ A4 サイズなら 2480×3508 px
- **アスペクト比**: A4 縦は 1:1.414（≈ 7:10）→ Stable Diffusion で \`768×1024\` または \`1024×1448\` で生成し、印刷時に A4 にフィット
- **ファイル形式**: PNG（無圧縮、線がジャギらない）。JPG は圧縮ノイズで線が乱れるので非推奨

**Stable Diffusion での A4 設定**:

1. Width: 768、Height: 1024 で生成（縦長 A4 比率に近い）
2. Hires.fix で 1.5x にアップスケール → 1152×1536
3. 出力 PNG を Photoshop / GIMP / [Squoosh](https://squoosh.app/) で 2480×3508 にリサイズ（Bicubic Sharper）
4. プリンタ印刷時に「フチなし印刷」「用紙: 普通紙 A4 縦」を選択

**DALL-E 3 での A4 設定**:

DALL-E 3 は \`1024×1792\` 縦長で生成可。これをそのままダウンロード → A4 にリサイズ印刷で十分綺麗。プロンプトに \`A4 portrait orientation, 300 DPI quality\` を明記すれば、自然と縦長レイアウトを選んでくれます。

**Midjourney での A4 設定**:

プロンプト末尾に \`--ar 7:10 --quality 2\` を追加。これで A4 比率の高品質画像が生成されます。

**家庭用プリンタの設定（重要）**:

- 用紙設定: 「**マット紙**」または「**スーパーファイン紙**」が塗り絵向け。普通のコピー用紙でも可だが、塗料が滲みやすい
- 印刷品質: 「**高品質**」モード（インクは増えるが線がはっきり）
- カラー設定: 「**モノクロ印刷**」（カラーインク節約）

**コンビニ印刷の場合**:

セブンイレブン / ローソンのマルチコピー機で 1 枚 20 円。PNG をネットプリント / プリントスマッシュで送信 → コンビニで番号入力で印刷。家庭用プリンタより線が綺麗に出るので、清書版はコンビニ印刷がおすすめ。`,
      },
      {
        title: '著作権の注意 — 既存キャラクター・IP を生成してはいけない理由',
        content: `**重要**: AI 塗り絵プロンプトを作るとき、**実在する商業キャラクター（ポケモン、ディズニー、サンリオ、鬼滅の刃、ドラえもん、アンパンマン、プリキュアなど）の名前を含めるのは推奨されません**。

**理由**:

1. **著作権法違反のリスク**: AI が生成した画像でも、識別可能な既存キャラを描いていれば翻案権侵害になり得ます。個人の私的利用（自宅で塗るだけ）はグレーゾーンですが、**ネット公開・販売は明確に NG**
2. **AI ツール側の利用規約違反**: OpenAI（DALL-E）・Midjourney・主要 Stable Diffusion サービスの多くが「既存キャラの模倣」を禁止または非推奨
3. **品質も低い**: そもそも AI モデルはキャラ名を渡しても精度が低く（似ているけど違う）、塗り絵として完成度が低い結果になりがち

**安全な代替手段**:

| やりたいこと | NG プロンプト | OK プロンプト |
|---|---|---|
| かわいいモンスター | \`cute pokemon style monster\` | \`cute fantasy creature with big eyes and small wings\` |
| 魔法少女風 | \`magical girl like sailor moon\` | \`original magical girl character with star wand and ribbons\` |
| ロボットヒーロー | \`gundam style robot\` | \`futuristic mecha warrior with armor plates\` |
| 動物キャラ | \`mickey mouse style mouse\` | \`friendly cartoon mouse with round ears\` |

**著作権リスクのない安全テーマ**:

- 自然（花・植物・風景・天気）
- 動物（実在する動物の一般的描写）
- 食べ物（果物・スイーツ・料理）
- 幾何学模様（マンダラ・タイル・パターン）
- 季節イベント（クリスマスツリー・桜・紅葉）
- オリジナルキャラ（「赤毛の少年」「翼のある妖精」など特徴を自分で組む）

**法的グレーの避け方**: 「〇〇風」「〇〇 inspired」も避けるのが無難。完全オリジナルの特徴（色・髪型・服装）を自分で組み立てて Negative Prompt に \`copyrighted character, anime character\` を入れれば安心です。

**当サイトの方針**: Prompta では IP 関連キーワード（ポケモン / ディズニー / 鬼滅 等）を含むプロンプトの収録はしていません。代わりに上記の「安全な代替テーマ」のプロンプトを継続的に拡充しています。`,
      },
    ],
    faq: [
      { q: 'AI 塗り絵は本当に無料で作れますか？', a: 'はい。Stable Diffusion はローカル PC で実行すれば完全無料（電気代のみ）、生成枚数も無制限。DALL-E 3 は ChatGPT Plus（月 $20）または Bing Image Creator（無料、1 日数十枚）で使えます。Midjourney のみ月 $10〜の有料サブスクが必要。**初心者には Bing Image Creator（DALL-E 3 ベース、無料）が最もハードル低い**です。当ガイドのテンプレートはどのツールでも共通で使えます。' },
      { q: 'AI 塗り絵プロンプトを日本語で書いても大丈夫ですか？', a: '基本的に**英語推奨**です。Stable Diffusion / DALL-E / Midjourney のいずれも英語データで学習されているため、英語プロンプトの方が精度が高くなります。本ガイドのテンプレートは英語ですが、コピペするだけで使えるので英語が苦手でも問題ありません。どうしても日本語で書きたい場合は ChatGPT に「以下の塗り絵を作りたいので英語プロンプトに翻訳して: [日本語の内容]」と頼むのが最速です。' },
      { q: '生成した塗り絵は商用利用できますか？', a: 'ツールによります。**Stable Diffusion**（オープンソース）は生成物の権利が制限なく利用者に帰属し商用利用 OK。**DALL-E 3**（OpenAI）は ChatGPT Plus / API ユーザーには商用利用権が付与されています（規約要確認）。**Midjourney** は有料プラン（$10〜）で商用利用権付き、無料トライアルでは商用 NG。ただし**既存キャラ（ポケモン等）を含む生成物は商用 NG**。安全テーマ（花・動物・幾何学）+ オリジナルキャラのみが商用安全です。' },
      { q: '子供と一緒に塗り絵を作りたい場合、どのツールが安全ですか？', a: '**Bing Image Creator**（DALL-E 3 ベース、無料）が最も安全です。OpenAI の Safety Filter が強く、不適切な内容を弾いてくれます。Stable Diffusion ローカル版はフィルタなしで何でも生成できるため、子供と一緒に使うなら避けたほうが無難。Midjourney は Discord 経由でパブリック投稿される（プライベートプラン以外）ため、子供の前で使う場合は注意が必要です。本ガイドのテンプレートをそのまま Bing Image Creator に貼り付ければ、安全に塗り絵が量産できます。' },
      { q: '高齢者介護のレクリエーション素材として使えますか？', a: 'はい、まさに最適な用途です。本ガイドのテンプレートで \`suitable for seniors\` \`very thick outline\` \`very simple composition\` を含めれば、高齢者向けに見やすく塗りやすい塗り絵が生成できます。**昭和風の風景**（懐かしさが認知症介護で有効）、**季節の花**（春は桜、夏はあじさい、秋は紅葉、冬は梅）、**簡単な動物**（猫・犬・うさぎ）など、回想法と組み合わせると効果的。介護施設での集団レクリエーションなら、テーマを月替わりで AI 生成しておくと素材費 0 円で済みます。' },
      { q: '線画の太さや細かさをどう調整すればいいですか？', a: '**太さ**は \`thick outline\`（太い、子供・高齢者向け）/ \`medium outline\`（中、一般向け）/ \`fine line art\`（細い、本格コロリアージュ向け）の 3 段階で指定。**細かさ**（線の密度）は \`simple composition\` / \`moderate detail\` / \`intricate detail\` で調整。例: 高齢者向けなら \`thick outline + very simple composition\`、コロリアージュ大人向けなら \`fine line art + intricate detail\`。失敗例として \`thick outline + intricate detail\` の組み合わせは線が潰れてしまうので避けてください。Stable Diffusion で更に細かく調整するなら CFG Scale を 9-11 に上げて指示を強く反映させる手も有効です。' },
    ],
  },

  'height-difference-pair-prompt': {
    sections: [
      {
        title: '身長差プロンプトとは — 2 人以上のキャラを描く時の必須スキル',
        content: `**身長差プロンプト**とは、Stable Diffusion・Midjourney・DALL-E などの AI 画像生成ツールで「**身長や体格の異なる 2 人以上のキャラクターを同じ画面に描く**」ための呪文（指示文）です。

BL カップル、百合カップル、男女恋人、兄妹、親子、先輩×後輩、ファンタジー RPG パーティ、VTuber コラボイラスト — 推しキャラ同士の **ペア立ち絵** や **二人並びイラスト** を生成したい時、ほぼ必ず必要になるテクニックです。

**こんな人におすすめ**:

- 推しカップルのファンアートを AI で描きたい
- オリキャラ (OC) ペアの設定資料を作りたい
- 同人イラスト・コミッション参考画像を量産したい
- TRPG キャラの関係性ビジュアルを作りたい
- VTuber コラボの並び絵を生成したい

**本ガイドで扱う 14 シチュエーション**: BL カップル / 百合カップル / 男女カップル / 兄妹 / 親子 / 先輩後輩 / ファンタジー（騎士×魔法使い）/ RPG パーティ（戦士×ヒーラー）/ ビジネス同僚 / VTuber アイドル / 壁ドン構図 / ハグシーン / メカ×パイロット / 3 人組グループ。

実例は <a href="/tag/身長差" class="text-sky-600 hover:underline">/tag/身長差</a> に 15 件公開、すべてサンプル画像つきです。`,
      },
      {
        title: 'なぜ身長差を AI に明示しないと描けないのか — モデルのデフォルト挙動',
        content: `Stable Diffusion / Midjourney / DALL-E に「**男女のカップルを描いて**」とだけ指示すると、ほとんどの場合**身長は同じ程度に揃えられて**しまいます。これは AI モデルが学習データの平均的な人物比例を覚えており、特に指定しないとそこに収束する性質があるためです。

**身長差を描かせるには、最低でも以下の 3 要素を明示する必要があります**:

1. **人数指定**: \`2girls\` / \`2boys\` / \`1boy and 1girl\` など danbooru タグスタイルで明示
2. **身長差そのもの**: \`height difference\` / \`tall and short\` / \`size difference\` を **重み付け 1.3-1.4 で強調**
3. **具体的な高さ表現**: \`tall man around 188cm\` / \`petite woman about 158cm\` のように **数値や形容詞**で各キャラを定量化

**基本テンプレート**（コピペ用）:

\`\`\`
{tall character description}, around 185cm,
{short character description}, around 155cm,
(height difference:1.3), 2 people standing together,
full body shot, sharp focus, (masterpiece:1.2), (best quality:1.4)
\`\`\`

**ネガティブプロンプト推奨**:

\`\`\`
same height, same size, equal height, identical body proportions
\`\`\`

このネガティブを入れるだけで、身長差崩壊率が大幅に下がります。`,
      },
      {
        title: '身長差プロンプトを構成する 6 つの要素',
        content: `効果的な身長差プロンプトは以下 6 要素の組み合わせです：

1. **人数指定（必須）** — \`2girls\`, \`2boys\`, \`1boy and 1girl\`, \`3 characters\`
2. **身長差キーワード（必須）** — \`height difference\`, \`tall and short\`, \`size difference\`, \`stark size contrast\`
3. **各キャラの定量化** — \`tall man around 185cm\`, \`petite woman about 158cm\`
4. **関係性の文脈** — \`couple\`, \`siblings\`, \`parent and child\`, \`adventure party\`, \`band members\`
5. **ポーズ・アクション** — \`standing side by side\`, \`holding hands\`, \`looking up at\`, \`embracing\`
6. **構図指定** — \`full body shot\`, \`side angle\`, \`low angle to emphasize height\`

**順序ルール**: SD では前方のトークンに強い重みが乗るので、**「身長差」と「人数」を必ず前半に置く**ことが重要。

**実例（BL カップル）**:

\`\`\`
2boys, height difference, tall handsome man around 190cm with dark hair,
shorter cute man around 165cm with light brown hair,
standing close together, looking at each other,
(height difference:1.3), full body shot, anime illustration style,
(masterpiece:1.2), (best quality:1.4)
\`\`\`

**実例（ファンタジー）**:

\`\`\`
1tall knight and 1small mage, dramatic size difference,
massive armored knight around 210cm with cape,
petite hooded mage around 150cm with staff,
torch-lit dungeon, side lighting, (size difference:1.4),
full body shot, fantasy concept art, (masterpiece:1.3)
\`\`\``,
      },
      {
        title: 'シチュエーション別 — コピペできる身長差プロンプト 8 例',
        content: `すぐ使える人気シチュエーション 8 種を厳選。各サンプル画像は <a href="/tag/身長差" class="text-sky-600 hover:underline">/tag/身長差</a> で確認できます。

**1. BL カップル — 高身長攻め × 低身長受け**

\`\`\`
2boys, tall handsome man 195cm, shorter cute man 165cm,
height difference, standing side by side, soft expressions,
modern casual outfits, cafe background, full body shot,
(height difference:1.3), BL romance illustration
\`\`\`

→ サンプル: <a href="/prompt/height-diff-bl-couple-tall-short" class="text-sky-600 hover:underline">height-diff-bl-couple-tall-short</a>

**2. 百合カップル — 長身お姉さん × 小柄妹系**

\`\`\`
2girls, tall girl 178cm long dark hair, petite girl 155cm short pastel hair,
height difference, taller one patting smaller one's head,
school uniforms, afternoon window light, full body shot,
(height difference:1.3), yuri illustration style
\`\`\`

→ サンプル: <a href="/prompt/height-diff-yuri-couple-tall-petite" class="text-sky-600 hover:underline">height-diff-yuri-couple-tall-petite</a>

**3. 男女恋人 — 王道タッパ差**

\`\`\`
1boy and 1girl, tall man 188cm, petite woman 160cm, height difference,
holding hands, autumn city street, golden hour, full body shot,
(height difference:1.3), photorealistic illustration
\`\`\`

→ サンプル: <a href="/prompt/height-diff-hetero-couple-classic" class="text-sky-600 hover:underline">height-diff-hetero-couple-classic</a>

**4. 兄妹 — お兄ちゃんと妹**

\`\`\`
1boy and 1girl, tall older brother 178cm in high school uniform,
short younger sister 130cm in elementary school uniform,
walking together, holding hands, cherry blossoms,
(height difference:1.3), siblings, family illustration
\`\`\`

→ サンプル: <a href="/prompt/height-diff-siblings-brother-sister" class="text-sky-600 hover:underline">height-diff-siblings-brother-sister</a>

**5. 親子 — お父さんと小さい娘**

\`\`\`
1man and 1child, loving father 178cm, small daughter 110cm,
walking through autumn park, holding hands, warm sunlight,
(height difference:1.4), family bonding photography style
\`\`\`

→ サンプル: <a href="/prompt/height-diff-parent-child-hand-holding" class="text-sky-600 hover:underline">height-diff-parent-child-hand-holding</a>

**6. ファンタジー — 巨大騎士 × 小柄魔法使い**

\`\`\`
1tall knight and 1small mage, massive armored knight 210cm with cape,
petite hooded mage 150cm with staff, torch-lit dungeon,
(height difference:1.4), (size difference:1.3),
full body shot, fantasy concept art
\`\`\`

→ サンプル: <a href="/prompt/height-diff-fantasy-knight-mage" class="text-sky-600 hover:underline">height-diff-fantasy-knight-mage</a>

**7. 学園もの — 先輩 × 後輩**

\`\`\`
2girls, tall third-year senpai 180cm sailor uniform red ribbon,
shorter first-year kohai 158cm same uniform blue ribbon,
walking from school, golden hour, cherry trees,
(height difference:1.3), school slice-of-life anime style
\`\`\`

→ サンプル: <a href="/prompt/height-diff-senpai-kohai-school" class="text-sky-600 hover:underline">height-diff-senpai-kohai-school</a>

**8. メカ × パイロット — 極端なスケール対比**

\`\`\`
1pilot and 1mecha robot, young pilot 160cm in pilot suit,
massive mecha 18 meters tall glossy white blue armor,
giant hangar interior, low angle camera, dramatic backlight,
(size difference:1.5), sci-fi anime illustration
\`\`\`

→ サンプル: <a href="/prompt/height-diff-mecha-pilot-android" class="text-sky-600 hover:underline">height-diff-mecha-pilot-android</a>

その他に **VTuber アイドルデュオ / 壁ドン構図 / ハグシーン / RPG パーティ / 3 人組グループ / OC ペアテンプレート** など 7 シチュエーションも公開中、合計 15 件 → <a href="/tag/身長差" class="text-sky-600 hover:underline">/tag/身長差</a>。`,
      },
      {
        title: 'ポーズ別 — 身長差を強調する 5 つの定番構図',
        content: `同じカップルでも、ポーズによって身長差の見え方が劇的に変わります。

**1. 並び立ち（最も定番）**

両者がカメラに向かって並んで立つ。身長差が一目瞭然。

\`standing side by side, full body shot, even spacing, looking forward\`

**2. 手をつなぐ**

片方が見上げ、片方が見下ろす自然な構図。

\`holding hands, looking at each other, slight side angle, full body shot\`

**3. ハグ — 包み込む抱擁**

高い方が小柄な相手を包む。少女漫画・BL 定番。

\`tall character embracing shorter one, shorter one resting head on taller's chest, intimate close shot\`

→ サンプル: <a href="/prompt/height-diff-hug-tall-embracing-short" class="text-sky-600 hover:underline">height-diff-hug-tall-embracing-short</a>

**4. 壁ドン（見上げる視点）**

高身長キャラが壁に手をつき、小柄キャラを見下ろす。

\`kabe-don pose, tall character's hand on wall, shorter character looking up flushed, low angle shot, shoujo manga style\`

→ サンプル: <a href="/prompt/height-diff-couple-kabedon-looking-up" class="text-sky-600 hover:underline">height-diff-couple-kabedon-looking-up</a>

**5. 見上げる × 見下ろす（対面）**

シンプルだが視線の上下で身長差を強烈に演出。

\`shorter character looking up at taller one with soft expression, taller one looking down gently, close shot\`

**ポーズ × カメラアングルの組み合わせコツ**:

- **\`low angle\`（ローアングル）**: 高い方をより高く見せる
- **\`from above\` / \`high angle\`**: 小柄な方を強調
- **\`side view\` / \`profile shot\`**: 両者の身長を客観的に比較できる
- **\`from behind\`**: 後ろ姿で二人の体格差を魅せる`,
      },
      {
        title: '困った時の対処法 — よくある身長差崩壊と修正法',
        content: `身長差プロンプトは**初回生成で完璧に出ることは少なく**、何度かのリトライ + プロンプト調整が必要です。以下、よくある失敗パターンと対処法。

**問題 1: 同身長になってしまう**

最頻発の問題。SD は人物比例の平均値に収束したがる。

- **対処**: \`(height difference:1.4)\` まで重み付けを上げる
- **対処**: ネガティブに \`same height, equal height, identical proportions\` を追加
- **対処**: 各キャラの cm 数値を明記（例: \`tall man around 188cm\`, \`petite woman about 158cm\`）

**問題 2: 一人だけ正しく描かれない（顔が崩れる / 体が変形）**

二人構図は手・顔が崩れやすい。

- **対処**: \`(detailed face:1.2), (detailed eyes:1.2)\` を両キャラ用に追加
- **対処**: ADetailer（A1111 拡張）で各キャラの顔を独立して再生成
- **対処**: 解像度を 768x768 以上に上げる（512 では二人構図が壊れやすい）

**問題 3: 二人の体型が似てしまう（例: 高身長キャラが小柄キャラと同じ細さ）**

- **対処**: 各キャラに **明確な体型形容詞**を割り当てる。例: \`muscular tall man\` + \`slim petite woman\`
- **対処**: ControlNet OpenPose で 2 人分の異なる骨格を参照画像から取り込む（最強の方法）

**問題 4: キャラがくっつきすぎ / 離れすぎ**

- **対処**: 距離を明示。\`standing side by side with small gap\` / \`standing close together arms touching\`

**問題 5: 3 人以上で全員同身長になる**

- **対処**: 3 人各々の身長を明記。\`tall character (left, 188cm), medium character (middle, 168cm), short character (right, 152cm)\`
- **対処**: \`character lineup illustration, varied heights\` を加える

**ControlNet 活用法（最も確実）**

身長差の崩壊を**ほぼ完全に防ぐ**には、**ControlNet OpenPose** を使うのが最強。手順:

1. 身長差のある 2 人が並んだ参考画像を用意（実写でも OK）
2. ControlNet タブに参考画像を読み込み、Preprocessor を \`openpose_full\` に設定
3. プロンプトは本ガイドのテンプレートをそのまま使用
4. 生成 → 骨格が参考画像の通りになるので、身長差が正確に出る

詳しい ControlNet 操作は <a href="/guides/stable-diffusion-prompt-guide" class="text-sky-600 hover:underline">Stable Diffusion プロンプト書き方ガイド</a> 参照。`,
      },
      {
        title: 'ツール別の身長差表現の違い — SD / Midjourney / DALL-E',
        content: `**Stable Diffusion**（推奨度: ⭐⭐⭐）

- 強み: \`(height difference:1.3)\` のような重み付けが効く、ControlNet で完璧に制御可能、danbooru タグ（\`2girls\` 等）が機能する
- 弱み: 二人構図で顔・手の崩壊率が高い、初期 seed で大きく結果が変わる
- 推奨モデル: anime 用なら Counterfeit / MeinaMix、リアル用なら Realistic Vision

**Midjourney**（推奨度: ⭐⭐）

- 強み: 構図のセンスが良い、芸術性が高い、narrative style プロンプトでも身長差を理解する
- 弱み: 重み付けが SD ほど精密でない、ControlNet 相当の機能なし
- 工夫: \`--ar 9:16\`（縦長）を使うと身長差が強調されやすい

**DALL-E 3**（推奨度: ⭐⭐）

- 強み: 自然言語の指示理解力が高く、「背の高い男性と小柄な女性」のような日本語的指示が効く
- 弱み: NSFW フィルターが厳しめ、ファンアート系（特定 IP）が出にくい
- 工夫: 「片方は他方より明らかに背が高い (clearly taller)」のように relative 指示を入れる

**Gemini 2.5 Flash Image (Nano Banana)**（推奨度: ⭐）

- 強み: 既存写真の編集（カップル写真に身長差を強調する加工）には強い
- 弱み: ゼロからの生成では身長差プロンプトを正確に解釈しないことが多い

**おすすめワークフロー**:

1. **本格的に身長差ペアを描きたい** → Stable Diffusion + ControlNet OpenPose
2. **クオリティ重視 / ファンアート** → Midjourney
3. **自然言語で気軽に試したい** → DALL-E 3（Bing Image Creator で無料）

prompta.jp の身長差プロンプト集は SDXL ベースで動作確認済み。<a href="/tag/身長差" class="text-sky-600 hover:underline">/tag/身長差</a> から該当 prompt の「ここで試す」を押せばサイト内で実行可能（5 ポイント / 回）。`,
      },
      {
        title: '作品例 — prompta.jp で即試せる 15 件',
        content: `本ガイドで紹介した全プロンプトはサンプル画像つきで公開中。各ページ右上の「🚀 ここで試す」から、ログイン後にサイト内で実行（生成）可能です。

**ペアロマンス系**:

- <a href="/prompt/height-diff-bl-couple-tall-short" class="text-sky-600 hover:underline">BL カップル — 高身長×低身長</a>
- <a href="/prompt/height-diff-yuri-couple-tall-petite" class="text-sky-600 hover:underline">百合カップル — 長身×小柄</a>
- <a href="/prompt/height-diff-hetero-couple-classic" class="text-sky-600 hover:underline">男女カップル — 王道タッパ差</a>
- <a href="/prompt/height-diff-couple-kabedon-looking-up" class="text-sky-600 hover:underline">壁ドン構図</a>
- <a href="/prompt/height-diff-hug-tall-embracing-short" class="text-sky-600 hover:underline">ハグ（包み込む抱擁）</a>

**家族・学園系**:

- <a href="/prompt/height-diff-siblings-brother-sister" class="text-sky-600 hover:underline">兄妹 — お兄ちゃんと妹</a>
- <a href="/prompt/height-diff-parent-child-hand-holding" class="text-sky-600 hover:underline">親子 — 手をつなぐ日常</a>
- <a href="/prompt/height-diff-senpai-kohai-school" class="text-sky-600 hover:underline">先輩 × 後輩 — 部活帰り</a>

**ファンタジー・SF**:

- <a href="/prompt/height-diff-fantasy-knight-mage" class="text-sky-600 hover:underline">巨大騎士 × 小柄魔法使い</a>
- <a href="/prompt/height-diff-rpg-party-warrior-healer" class="text-sky-600 hover:underline">RPG パーティ — 戦士×ヒーラー</a>
- <a href="/prompt/height-diff-mecha-pilot-android" class="text-sky-600 hover:underline">メカ × パイロット</a>

**ビジネス・アイドル系**:

- <a href="/prompt/height-diff-coworkers-formal-suit" class="text-sky-600 hover:underline">ビジネス同僚 — スーツ姿</a>
- <a href="/prompt/height-diff-vtuber-idol-duo" class="text-sky-600 hover:underline">VTuber アイドルデュオ</a>

**応用**:

- <a href="/prompt/height-diff-oc-pair-template" class="text-sky-600 hover:underline">OC ペア — オリキャラ並び立ちテンプレート</a>
- <a href="/prompt/height-diff-trio-mixed-heights" class="text-sky-600 hover:underline">3 人組 — バラバラ身長グループ</a>

**関連ガイド**:

- <a href="/guides/body-type-prompt-guide" class="text-sky-600 hover:underline">体型プロンプト完全ガイド</a> — 単体キャラの体型（curvy / muscular / slim 等）
- <a href="/guides/stable-diffusion-prompt-guide" class="text-sky-600 hover:underline">Stable Diffusion プロンプト書き方ガイド</a> — SDXL 基礎・重み付け・ControlNet
- <a href="/guides/cosplay-prompt-guide" class="text-sky-600 hover:underline">コスプレプロンプトガイド</a> — キャラクター再現

**カテゴリ別 prompt 集**:

- <a href="/prompts/body-type" class="text-sky-600 hover:underline">/prompts/body-type</a> — 体型・身長系
- <a href="/prompts/cosplay" class="text-sky-600 hover:underline">/prompts/cosplay</a> — コスプレ・キャラ再現
- <a href="/prompts/clothing" class="text-sky-600 hover:underline">/prompts/clothing</a> — 服装組み合わせ`,
      },
    ],
    faq: [
      { q: 'プロンプトに身長 cm を書いても効きますか？', a: '**Stable Diffusion / Midjourney は数値そのものを正確には理解しません**が、「188cm」「150cm」のような表記は AI が「大きい数字 = 高い、小さい数字 = 低い」という相対比較として処理してくれます。完全な精度は出ませんが、書かないより書いたほうが効果あり。**より確実な方法**は `tall around 185cm` のように形容詞 + 数値で挟むこと、または `tall and short` `dramatic height difference` のような明示的キーワードを併用することです。DALL-E 3 は自然言語の理解力が高いため、cm 表記の効きが比較的良いです。' },
      { q: '「2girls / 2boys」の指定は必須ですか？', a: 'Stable Diffusion（特にアニメ系モデル）では**ほぼ必須**です。danbooru タグで学習されているため、`2girls` `2boys` `1boy and 1girl` `3 characters` のような人数指定がないと、AI は「カップル」と書いても 1 人だけ描いたり、4 人描いたりと不安定。Midjourney と DALL-E 3 では自然言語で「two characters」「a couple」と書けば理解しますが、それでも明示したほうが安定します。' },
      { q: 'ControlNet で身長差を確実に出すには？', a: '**ControlNet OpenPose Preprocessor** を使うのが最強の方法です。手順: (1) 身長差のある 2 人が並んで立つ参考画像（実写でも 3D モデルでも OK）を用意。(2) Stable Diffusion WebUI の ControlNet タブで参考画像を読み込み、Preprocessor を `openpose_full` または `openpose`、Model を `control_v11p_sd15_openpose` に設定。(3) プロンプトは本ガイドのテンプレを使用、CFG Scale 7-9。(4) 生成すると参考画像の骨格通りに 2 人が描かれ、身長差が完全に再現されます。**実写の身長差カップル写真**を Pinterest 等で探して参考にすると、自然な比例が出やすいです。' },
      { q: 'ネガティブプロンプトで「同身長」を防ぐには？', a: '推奨ネガティブ: `same height, equal height, identical body proportions, same size, similar height`。これに加えて品質ネガティブ（`worst quality, low quality, bad anatomy, bad hands`）と二人構図特化ネガティブ（`extra arms, extra legs, fused body, conjoined twins, merged figures`）を組み合わせると安定。**全文例**: `(worst quality:1.4), (low quality:1.4), same height, equal height, identical proportions, bad anatomy, bad hands, extra arms, fused bodies, blurry`。これだけで身長差が出る確率が体感 30% → 70% に上がります。' },
      { q: 'Midjourney と Stable Diffusion で身長差表現の違いは？', a: '**Midjourney** は narrative-style（文章プロンプト）が得意で、「a tall man and a petite woman standing together with a clear height difference」のような自然な指示がよく効く。`--ar 9:16` で縦長アスペクト比にすると身長差が強調されやすい。ただし重み付け制御が SD ほど精密でなく、ControlNet 相当の機能もなし。**Stable Diffusion** は重み付け `(height difference:1.4)` で精密に制御でき、ControlNet OpenPose で完璧な骨格指定が可能。danbooru タグ `2girls` `2boys` で確実に人数が固定できる。**結論**: クオリティ重視で気軽に → Midjourney、本格制御 → Stable Diffusion + ControlNet。' },
      { q: '3 人以上の身長バラバラ構図のコツは？', a: '3 人組以上は **(1) 各々の身長を明記、(2) 立ち位置を明記、(3) `character lineup` キーワード追加** が鉄則。例: `three characters in horizontal lineup, tall character (left, 188cm), medium character (middle, 168cm), short character (right, 152cm), even spacing, character design sheet style`。**着物・制服など全身が見える衣装**を揃えると身長差が視覚的に伝わりやすい。ControlNet OpenPose があれば 3 人骨格を一気に固定できるので失敗率激減。サンプル: <a href="/prompt/height-diff-trio-mixed-heights" class="text-sky-600 hover:underline">3 人組 — バラバラ身長グループ</a>。' },
      { q: 'キャラの顔だけ似て体格は変えたい場合は？', a: '**LoRA + 身長差プロンプト**の組み合わせがベスト。手順: (1) キャラ LoRA（顔特徴）を `<lora:character-name:0.7>` で適用、(2) プロンプトに `height difference, tall version (a) and short version (b)` のように同キャラの 2 体型を明示、(3) 体型形容詞（`muscular`, `petite`, `slim`）を別々に割り当てる。**もう一つの方法**: img2img で既存キャラのフェイス画像をベースに、prompt で体格だけ変更（Denoising Strength 0.4-0.6 で顔保持）。ファンアート常套手段の「**身長差パロディ**」（推しキャラが小学生化する等）も同じ原理です。' },
      { q: 'BL / 百合カップル特有の身長差表現は？', a: 'BL / 百合カップルでは「**役割の視覚的記号化**」が重要です。BL なら「**高身長攻め × 低身長受け**」(`tall seme around 195cm, shorter uke around 165cm`) が定番。「攻め × 受け」を直接書くより `dominant tall partner` / `gentle shorter partner` のような英語表現のほうが安全（NSFW フィルター回避）。**百合** なら「**長身お姉さん × 小柄妹系**」(`tall onee-san type, petite imouto type`) の構図がファンアートで頻出。ポーズも BL は「壁ドン」「ハグ」「頭を撫でる」、百合は「お姫様抱っこ」「頭ぽんぽん」が定番。本ガイドでは <a href="/prompt/height-diff-bl-couple-tall-short" class="text-sky-600 hover:underline">BL カップル</a> と <a href="/prompt/height-diff-yuri-couple-tall-petite" class="text-sky-600 hover:underline">百合カップル</a> のテンプレを公開中、コピペで使えます。' },
    ],
  },
}

export default async function GuidePage({ params }: Props) {
  const resolvedParams = await params
  const guide = GUIDES.find(g => g.slug === resolvedParams.slug)
  if (!guide) notFound()

  const guideContent = GUIDE_CONTENT[guide.slug]
  if (!guideContent) notFound()

  const relatedGuides = getRelatedGuides(guide.slug)
  const relations = GUIDE_RELATIONS[guide.slug]
  const relatedToolSlugs = relations?.tools ?? []
  const primaryTool = relatedToolSlugs[0]
  const relatedPrompts = primaryTool
    ? (await getPromptsByTool(primaryTool)).slice(0, 4)
    : []

  const howToSchema = generateHowToSchema(
    guide.title,
    guide.description,
    guideContent.sections.map(s => ({ name: s.title, text: s.content.slice(0, 200) })),
    { baseUrl: SITE_CONFIG.url, siteName: SITE_CONFIG.nameEn },
    `${SITE_CONFIG.url}/guides/${guide.slug}`
  )

  const faqSchema = guideContent.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guideContent.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'ガイド', href: '/guides' },
            { name: guide.title.split('—')[0].trim(), href: `/guides/${guide.slug}` },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-12">
          {/* Table of Contents — Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">目次</p>
              <nav className="space-y-1.5">
                {guideContent.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block text-sm text-gray-600 hover:text-sky-600 transition-colors py-1 border-l-2 border-transparent hover:border-sky-600 pl-3"
                  >
                    {section.title}
                  </a>
                ))}
                {guideContent.faq.length > 0 && (
                  <a
                    href="#faq"
                    className="block text-sm text-gray-600 hover:text-sky-600 transition-colors py-1 border-l-2 border-transparent hover:border-sky-600 pl-3"
                  >
                    よくある質問
                  </a>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {guide.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {guide.description}
              </p>
            </header>

            {/* Mobile TOC */}
            <nav className="lg:hidden mb-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">目次</p>
              <ol className="space-y-1 text-sm">
                {guideContent.sections.map((section, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="text-sky-600 hover:text-sky-700">
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Article Sections */}
            <div className="space-y-10">
              {guideContent.sections.map((section, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-20">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content.split('\n\n').map((paragraph, j) => {
                      if (paragraph.startsWith('```')) {
                        const code = paragraph.replace(/```\w*\n?/g, '').trim()
                        return (
                          <pre key={j} className="my-4 p-4 bg-gray-900 text-gray-100 rounded-xl text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        )
                      }
                      return (
                        <p key={j} className="mb-4" dangerouslySetInnerHTML={{
                          __html: paragraph
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-red-600 rounded text-sm font-mono">$1</code>')
                        }} />
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* FAQ */}
            {guideContent.faq.length > 0 && (
              <section id="faq" className="mt-12 scroll-mt-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-sky-500 inline-block">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  {guideContent.faq.map((item, i) => (
                    <div key={i} className="p-5 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-2">Q. {item.q}</h3>
                      <p
                        className="text-gray-700 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: 'A. ' + item.a
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-red-600 rounded text-sm font-mono">$1</code>'),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                  関連プロンプト
                </h2>
                <PromptGrid prompts={relatedPrompts} />
                {primaryTool && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/tools/${primaryTool}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700"
                    >
                      {TOOLS.find(t => t.slug === primaryTool)?.name} のプロンプトをもっと見る →
                    </Link>
                  </div>
                )}
              </section>
            )}

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                  関連ガイド
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedGuides.map(g => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-sky-600 mb-1">{g.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{g.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA — Tool-specific */}
            <section className="mt-12 p-6 bg-sky-50 rounded-xl text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-2">プロンプトを試してみましょう</h2>
              <p className="text-sm text-gray-600 mb-4">
                このガイドで学んだテクニックを、実際のプロンプトで試してみてください。
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {(relatedToolSlugs.length > 0
                  ? TOOLS.filter(t => relatedToolSlugs.includes(t.slug))
                  : TOOLS.slice(0, 3)
                ).map(tool => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-sm font-medium text-gray-700 rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-700 transition-all"
                  >
                    {tool.icon} {tool.name}
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  )
}
