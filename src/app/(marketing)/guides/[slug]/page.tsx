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
        title: 'プロンプトとは？',
        content: `プロンプト（Prompt）とは、AIに対して入力する指示文のことです。ChatGPTやStable Diffusionなどの生成AIに「何を生成してほしいか」を伝えるテキストがプロンプトです。

プロンプトの質がAIの出力結果を大きく左右するため、効果的なプロンプトの書き方を学ぶことは、AIを活用する上で非常に重要です。

例えば、ChatGPTに「メールを書いて」と指示するよりも、「取引先の田中部長に、来週の会議日程変更をお詫びする丁寧なビジネスメールを200文字程度で書いてください」と指示した方が、はるかに良い結果が得られます。`,
      },
      {
        title: 'プロンプトエンジニアリングとは',
        content: `プロンプトエンジニアリングとは、AIから最適な出力を引き出すためにプロンプトを設計・最適化する技術です。

テキスト生成AIでは、ロール設定（「あなたは○○の専門家です」）、具体的な条件指定、出力形式の指定などが重要なテクニックです。

画像生成AIでは、品質タグ（masterpiece, best quality）、スタイル指定（anime style, photorealistic）、構図指定（close-up, wide angle）などのテクニックが使われます。`,
      },
      {
        title: 'プロンプトの基本構造',
        content: `効果的なプロンプトには以下の要素が含まれます：

1. **タスクの明確化** — AIに何をしてほしいかを明確に伝える
2. **コンテキスト** — 背景情報や制約条件を提供する
3. **出力形式** — どのような形式で回答してほしいかを指定する
4. **例示（Few-Shot）** — 期待する出力の例を提示する
5. **制約条件** — 文字数、トーン、スタイルなどの制約を設定する

これらの要素を組み合わせることで、AIからより正確で有用な出力を得ることができます。`,
      },
      {
        title: '主要AIツール別のプロンプトの違い',
        content: `AIツールによってプロンプトの書き方は異なります：

**ChatGPT / Claude（テキスト生成AI）**
- 自然な日本語で指示を書く
- ロール設定やステップバイステップの指示が効果的
- 長い文脈を理解できるので、詳細な指示が可能

**Stable Diffusion / Midjourney（画像生成AI）**
- 英語のキーワードをカンマ区切りで並べる
- 品質タグや重み付けで結果を制御
- ネガティブプロンプトで不要な要素を排除

**DALL-E（画像生成AI）**
- 自然な英語の文章で描写
- スタイルや雰囲気を文章で表現
- ChatGPTと統合して使える`,
      },
    ],
    faq: [
      { q: 'プロンプトは日本語で書けますか？', a: 'ChatGPTやClaudeなどのテキスト生成AIは日本語のプロンプトに対応しています。画像生成AI（Stable Diffusion、Midjourney）は英語のプロンプトが推奨されますが、一部は日本語にも対応しています。' },
      { q: 'プロンプトの書き方にルールはありますか？', a: '厳密なルールはありませんが、具体的で明確な指示を書くことが重要です。曖昧な表現を避け、期待する結果を詳細に記述することで、AIの出力品質が向上します。' },
      { q: 'プロンプトエンジニアリングのスキルは必要ですか？', a: '基本的な使い方は誰でもすぐに始められます。しかし、プロンプトエンジニアリングのテクニックを学ぶことで、AIをより効果的に活用でき、業務効率の大幅な向上が期待できます。' },
    ],
  },
  'stable-diffusion-prompt-guide': {
    sections: [
      {
        title: 'Stable Diffusionのプロンプト基礎',
        content: `Stable Diffusion（SD）のプロンプトは、生成したい画像の特徴を英語のキーワードで記述します。キーワードはカンマ（,）で区切って並べ、重要度に応じて順序を調整します。

基本構文：\`主題, スタイル, 品質タグ, 照明, 構図\`

例：\`beautiful girl, long hair, white dress, in garden, (masterpiece:1.2), (best quality:1.4), soft lighting, bokeh background\``,
      },
      {
        title: '品質タグの使い方',
        content: `高品質な画像を生成するために、以下の品質タグを使用します：

- **masterpiece** — 傑作レベルの品質
- **best quality** — 最高品質
- **ultra-detailed** — 超精細
- **8k** — 8K解像度相当の詳細さ
- **realistic** — リアルなスタイル

重み付け：\`(masterpiece:1.2)\` のように数値で強調度を調整できます。1.0が標準、1.5で強い強調、0.5で弱い適用になります。`,
      },
      {
        title: 'ネガティブプロンプト',
        content: `ネガティブプロンプトは、生成結果から除外したい要素を指定します。品質向上に欠かせないテクニックです。

推奨ネガティブプロンプト：
\`(worst quality:1.4), (low quality:1.4), normal quality, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry\`

不要な要素を具体的に指定することで、生成結果の品質が大幅に向上します。`,
      },
    ],
    faq: [
      { q: 'Stable Diffusionのプロンプトは何語で書きますか？', a: '基本的に英語で記述します。日本語にも一部対応していますが、英語の方がより正確に意図が伝わり、高品質な結果が得られます。' },
      { q: 'プロンプトの長さに制限はありますか？', a: 'トークン数（75トークン程度）に制限があります。長すぎるプロンプトは後半が無視される場合があるため、重要なキーワードを先頭に配置することが重要です。' },
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
                      <p className="text-gray-700 text-sm leading-relaxed">A. {item.a}</p>
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
