/**
 * Twenty-second SEO batch (2026-11-19): straight hair, black hair,
 * short hair, chalkboards, and armor.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Tool wording is limited to official pages checked 2026-11-19.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_22_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'straight-hair-prompt-guide': {
    sections: [
      {
        title: 'ストレートは、長さのうしろに一つ置く',
        content: `「ストレートヘア プロンプト」「プロンプト ストレートヘア」「stable diffusion ストレートヘア」で探しているのは、毛先までまっすぐな髪です。検索では、ツヤ、ロング、ボブ、姫カット、前髪、が一緒に出ます。欲しいのは直毛です。ウェーブの毛先が少し残った結果ではありません。

このページは、直毛の質感を担当します。腰までの長さそのものは [ロングヘアプロンプト](/guides/long-hair-prompt-guide)、前髪の形は [前髪プロンプト](/guides/bangs-prompt-guide)、耳より短い髪は [ショートヘアのプロンプト](/guides/short-hair-prompt-guide) です。役割は一行で分けます。ロングのページは届く位置、前髪のページは額、このページは癖がないことです。髪型の入口は [髪型プロンプト](/guides/hairstyle-prompt-guide) のままです。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。実在の人物と、作者名は書きません。年齢を下げる書き方は使いません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。

重みは目安です。\`(straight hair:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(straight hair:1.2\\)\` と書きます。NovelAI の強調は \`{straight hair}\` と \`[straight hair]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、NovelAI の欄は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。強さの数値も目安で、配布ページの推奨があればそちらです。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`straight\` だけだと、姿勢や服の裾までまっすぐになります。髪まで書いて \`straight hair\` にしてください。\`straight hair\` は短い語として使われることがあります。公式タグとしては断定しません。長さの語の直後に一つ置きます。波の語が同じ強さで残っていると、毛先だけが別の髪型になります。`,
      },
      {
        title: 'ロング、ミディアム、ボブ',
        content: `直毛が安定してから、長さを一つ足します。三つを同じ強さにすると、肩のあたりで平均になります。今日見せたいのは、胸より下か、肩のあたりか、顎のあたりか、です。

\`long hair\` と \`very long hair\` は、短い語として使われることがあります。公式タグとしては断定しません。\`very long hair\` は、腰のあたりまで、という目安で使われることが多いです。床まで、画面の下まで、は自然な英語で足した方が、長さが残りやすいことがあります。効くとは断定しません。\`medium hair\` も短い語として使われることがあります。ボブは \`bob cut\` が短い語として使われることがあります。short bob は自然な英語です。

| 長さ | 書き方 | 直毛の位置 |
|---|---|---|
| ロング | \`long hair\` | \`straight hair\` を直後に |
| さらに長い | \`very long hair\` | 上半身だと枠で切れる |
| 肩のあたり | \`medium hair\` | ロングと同時に強くしない |
| ボブ | \`bob cut\` | 内巻きを足すと直毛が負ける |
| 短い直毛 | \`short hair\` | 細目はショートのページ |

超ロングを上半身のまま書くと、毛先は胸で切れます。長さを見せる日は、自然な英語の full body か、膝まで入る距離にします。距離の名前は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。このページでは、髪が枠の中に入るかだけを見ます。

**胸より下の直毛**

\`\`\`
1 adult woman, adult, long hair, straight hair, black hair, adult face,
white blouse, cardigan, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, short hair
\`\`\`

**腰のあたりまで。全身**

\`\`\`
1 adult woman, adult, very long hair, straight hair, black hair, adult face,
white blouse, long skirt, full body, standing,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, short hair, medium hair
\`\`\`

**顎のあたりの直毛ボブ**

\`\`\`
1 adult woman, adult, bob cut, straight hair, black hair, adult face,
white blouse, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, long hair, very long hair
\`\`\`

比較は、服と背景と顔を固定して、長さの行だけを差し替えます。三行を同じ日に動かすと、直毛が効いたのか長さが効いたのかが残りません。内巻きの語が正向に残っていると、ボブの毛先が丸まります。直毛の日は、その語を消してください。

毛先の向きを足すのは、直毛が三枚そろってからです。内に入るか、外にはねるか、を一つだけにします。inward ends と flipped ends は自然な英語です。公式タグとしては断定しません。両方を残すと、毛先が平均の丸みで止まります。まだ波が残っている日は、毛先の向きは足しません。向きを足すと、波の原因が隠れるからです。超ロングの日は、毛先が枠の外に出ていないかを先に見ます。枠の外の毛先は、内巻きにも外はねにもなりません。全身か、膝まで入る距離に戻してから、向きの語を一つ置いてください。`,
      },
      {
        title: 'ツヤと、風になびく髪',
        content: `ツヤは、直毛が三枚同じになってから一つです。光沢の語を三つ同じ強さにすると、顔まで白い面になります。今日足すのは一つです。

glossy hair、silky hair、sleek hair は、自然な英語です。公式タグとしては断定しません。\`shiny hair\` は短い語として使われることがあります。これも公式タグとしては断定しません。艶を強くしたい日は glossy hair を一つ。表面を滑らかにしたい日は silky hair を一つ。毛束を頭に沿わせたい日は sleek hair を一つ。四つを残したファイルは、保存しません。

濡れた見た目の語は使いません。直毛の光は、昼の窓か、縁の光か、で足します。光の向きの一覧は [光・照明のプロンプト](/guides/lighting-prompt-guide) です。このページでは、soft daylight か rim light かを一つ。両方を同じ強さにすると、輪郭だけが白く飛んで、毛の色が消えます。

風は、ツヤが決まってから一つです。hair blowing in wind は自然な英語です。公式タグとしては断定しません。風と、毛先のハイライトを同じ日に強くすると、髪が背景の色を拾います。ハイライトは hair highlights と自然な英語で、ツヤの語とは別の日に試します。

| 足すもの | 書き方 | 同時に強くしないもの |
|---|---|---|
| 光沢 | glossy hair | silky と sleek を同じ強さにしない |
| 滑らかさ | silky hair | 顔まで光るときは外す |
| 頭に沿う | sleek hair | 風の語 |
| 細い光 | hair highlights | 自然な英語。色のグラデーションとは別 |
| 風 | hair blowing in wind | 背景の模様を増やさない |

**光沢を一つ。窓の光**

\`\`\`
1 adult woman, adult, long hair, straight hair, black hair, glossy hair, adult face,
white blouse, upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, overexposed
\`\`\`

**風で流す。ツヤは足さない日**

\`\`\`
1 adult woman, adult, long hair, straight hair, black hair, adult face,
hair blowing in wind, white blouse, long skirt, full body, standing,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, extra people
\`\`\`

髪が板のように硬いときは、光沢の語をいったん外し、soft daylight だけに戻します。縁の光を足すのは、毛束が分かれてからです。光を三種類足しても、硬さは戻りません。

毛束を分けたい日は、自然な英語で separated strands を一つまでです。公式タグとしては断定しません。光沢と同時に強くすると、また白い面になります。分けるのは、光沢を外した次の枚です。風の日に毛束の語を足すと、どちらが流れを作ったか残りません。風を見る枚と、毛束を見る枚は、ファイルを分けて保存します。ファイル名には、今日足した語を一つだけ書いてください。`,
      },
      {
        title: '色と、分け目',
        content: `色は一つです。直毛の行が決まってから、人数の直後へ色を置きます。黒の濃さは [黒髪のプロンプト](/guides/black-hair-prompt-guide)、金の色味は [金髪のプロンプト](/guides/blonde-hair-prompt-guide)、ほかの色とメッシュは [髪色プロンプト](/guides/hair-color-prompt-guide) です。このページでは、色を一つ借りて、直毛のうしろに残します。

\`black hair\` だけを服より後ろに置くと、ブラウスまで暗くなります。色は hair まで書いて、人数の近くに置いてください。金も同じです。\`blonde\` だけだと、背景が黄色になります。

分け目は、色の次に一つです。中央は center part、横は side part、と自然な英語で書きます。公式タグとしては断定しません。両方を同じ強さにすると、分け目が額の真ん中で揺れます。分け目を見せる日は、前髪で額を全部隠しません。前髪なしに近い日は、[前髪プロンプト](/guides/bangs-prompt-guide) の額を出す節を見て、このページの直毛は残してください。

| 色 | 書き方 | 分け目 |
|---|---|---|
| 黒 | \`black hair\` | まだ足さない |
| 金 | \`blonde hair\` | 色味は金のページで一つ |
| 中央 | center part | 自然な英語。横分けと同時にしない |
| 横 | side part | 自然な英語。左右を両方書かない |

**中央分けの直毛。色は黒**

\`\`\`
1 adult woman, adult, black hair, long hair, straight hair, center part, adult face,
white blouse, upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, side part, blonde hair
\`\`\`

分け目が髪の量で消えるときは、center part を色の直後へ移し、前髪の語が正向に残っていないかを見ます。残っていたら、その日は前髪を外します。色が服へ移るときは、服を白か紺の無地に戻します。分け方の手順は [色プロンプト](/guides/color-prompt-guide) です。

暗い茶との境目を見る日は、\`black hair\` を外してから dark brown hair を自然な英語で一つ置きます。黒と茶を同じ強さで残すと、直毛がそろったのか色が揺れたのかが分かりません。茶の細かい名前は髪色のページへ戻し、このページでは直毛の行を固定したまま色を一つだけ差し替えます。金の日も同じです。色味を二つ書く前に、プラチナかハニーかを金のページで一つに決めてから戻ってください。`,
      },
      {
        title: '前髪と、姫カット',
        content: `直毛に前髪を足す日は、前髪の形を一つです。ぱっつんは \`blunt bangs\` が短い語として使われることがあります。公式タグとしては断定しません。流す前髪と、額を出す書き方を同じ強さにすると、眉のところで形が平均になります。形の一覧は前髪のページです。このページでは、直毛を残したまま、形を一つ借りてきます。

姫カットは \`hime cut\` が短い語として使われることがあります。公式タグとしては断定しません。前髪の横の線と、頬の横の毛がセットになっている呼び方です。\`hime cut\` に \`blunt bangs\` を同じ強さで足すと、前髪が二重になります。姫カットの日は、前髪の語を外して、\`hime cut\` を一つにします。前髪の形を細かく変えたい日は、逆に \`hime cut\` を外します。

| 形 | 書き方 | 直毛 |
|---|---|---|
| ぱっつん | \`blunt bangs\` | \`straight hair\` は残す |
| 姫カット | \`hime cut\` | 前髪の語は外す |
| 前髪なし | 前髪のページの額の書き方 | 直毛は残す |

**姫カット。直毛のロング**

\`\`\`
1 adult woman, adult, black hair, long hair, straight hair, hime cut, adult face,
white blouse, long skirt, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, blunt bangs
\`\`\`

頬の横の毛が消えるときは、\`hime cut\` を長さの直後へ移し、横に流す前髪の語が残っていないかを見ます。残っていたら消してください。前髪が目を隠すときは、前髪の重みを上げる前に、髪が顔にかかる語を正向から外します。

流す前髪の日は、姫カットを外します。side-swept bangs は短い語として使われることがあります。公式タグとしては断定しません。ぱっつんと流しを同じ強さにすると、眉の上で線が二本になります。短い直毛に姫カットを足すと、頬の横の毛だけが長くなって、ボブの輪郭が壊れます。姫カットはロングの日に限ってください。ボブの日の前髪は、前髪のページから形を一つだけ借ります。`,
      },
      {
        title: '成人の男性の直毛',
        content: `男性も、同じ直毛の語を使います。\`1 adult man\` と \`adult\` を残し、\`adult face\` を顔の近くに置きます。長さは短い直毛か、耳にかかる直毛か、を一つ。女性のファイルから服の行までコピーすると、ブラウスが残ります。服はシャツと長いズボンに書き直します。

分け目は side part を自然な英語で一つ、までです。オールバックにしたい日は、自然な英語で combed back hair を一つ。分け目とオールバックを同じ強さにすると、額の半分だけが別の髪型になります。短い髪の種類の細目は [ショートヘアのプロンプト](/guides/short-hair-prompt-guide) です。このページでは、直毛であることだけを足します。

| 誰 | 髪 | 服 |
|---|---|---|
| 成人の男性 | \`short hair, straight hair\` | シャツ、長いズボン |
| 耳にかかる | \`medium hair, straight hair\` | ショートと同時に強くしない |
| 横分け | side part | 自然な英語。一つ |
| 後ろへ流す | combed back hair | 自然な英語。分け目とは別の日 |

**横分けの直毛。成人の男性**

\`\`\`
1 adult man, adult, black hair, short hair, straight hair, side part, adult face,
shirt, long trousers, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, long hair, very long hair
\`\`\`

長さが肩まで伸びるときは、\`long hair\` が古いファイルに残っています。正向から消し、負向に残します。顔が別の人に寄るときは、服の行を先に戻し、髪型の形容を一つに減らしてください。

オールバックの日は、分け目の語を消してから combed back hair を置きます。額に分け目の線が残っていたら、古い side part がまだ正向にあります。女性のカーディガンの行が混ざっていたら、それも消します。男性の直毛は、短いことと、分け目が一つであること、までで十分です。光沢を足すのは、長さが三枚そろってからです。`,
      },
      {
        title: '文章で頼む',
        content: `画風は一つです。\`anime style\` と \`photorealistic\` を同じ強さにすると、毛先の半分だけが別の媒体になります。アニメの日は写真の語を負向へ。写真の日は、セル塗りの語を正向から外します。

ChatGPT や Gemini では、成人であること、直毛、長さ、無地の服、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

**アニメ。直毛のロング**

\`\`\`
1 adult woman, adult, black hair, long hair, straight hair, adult face,
anime style, white blouse, cardigan, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, wavy hair, curly hair, messy hair
\`\`\`

**文章の例。ツヤのある直毛**

\`\`\`
Draw one adult woman with long, straight black hair and a soft shine on the hair only.
She has an adult face, a white blouse, and a cardigan.
Upper body, plain background, soft daylight.
Keep the hair straight to the ends. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
wavy hair, curly hair, messy hair, extra people
\`\`\`

文章で通った長さは、タグへ戻すときに表の一行へ翻訳します。ロングとボブを両方残した翻訳は、保存しません。ツヤの形容が三つ文に残っていたら、タグへ戻す前に一つへ減らしてください。

文に「少しだけ波」が残っていると、タグへ戻したあとも毛先が波になります。直毛の日は、その句を消してから翻訳します。成人であることと、無地の服と、単純な背景は、文からタグへ移すときも残します。この三つが落ちると、髪の形より先に人数が崩れます。`,
      },
      {
        title: '波になる、背景に溶ける、顔にかかる',
        content: `失敗は、だいたい四つです。毛先が波になる。髪が背景の色に溶ける。毛束が板のように硬い。前髪の束が顔を横切る。四つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

波になるときは、正向から wavy hair と curly hair と messy hair を消します。負向には、この三つを残します。ゆるい波の語が自然な英語で残っているときも、直毛の日は外します。\`straight hair\` は長さの直後へ移します。重みを上げるのは、三枚続けてまだ波が残るときだけです。

背景に溶けるときは、髪と背景の明度を分けます。黒い髪に黒い背景、金の髪に黄色の壁、は境目が消えます。背景は明るい無地か、淡い灰色に戻します。模様の布や、花の壁は、髪が安定してから一つです。それでも溶けるときは、髪の行を人数の直後へ移し、背景の名詞を一つに減らします。

硬いときは、光沢の語を外します。sleek hair と rim light が両方残っていると、輪郭が線になります。soft daylight に戻して、毛の色が見えてから、光沢を一つだけ戻してください。

顔を横切る束は、髪が顔にかかる語が正向に残っていることが多いです。直毛の日に、片目を隠す指定は足しません。残っていたら消し、負向に hair over eyes を入れます。前髪の形を変えたい日は、前髪のページへ移って、このページの直毛は持っていってください。持っていく語は \`straight hair\` 一つです。

三枚続けて同じ崩れなら、足した語を全部外して、長さと \`straight hair\` と色の三つに戻します。三つでまっすぐになってから、今日の語を一つだけ戻してください。

直す順番は、波、背景、硬さ、顔にかかる束、です。波が残ったまま背景を変えても、毛先の判定はできません。一枚ごとに、消した語をメモに残します。メモが無いと比較のあとで、どの負向が効いたか戻れません。顔にかかる束を直す日は、前髪のページを開く前に、このページの \`straight hair\` が正向に残っていることを確認してください。

長さのページへ移る日は、直毛の語を一つ持っていき、ツヤの形容は置いていきます。置いていかないと、ロングの実験が光沢の実験になります。ショートのページへ移る日は、\`very long hair\` を正向から消して、負向に残します。残さないと、短い直毛が肩まで戻ります。色のページへ持っていくのも \`straight hair\` 一つまでです。分け目と姫カットは、色が決まってからこのページへ戻して足します。`,
      },
    ],
    faq: [
      {
        q: 'straight と straight hair はどちらですか',
        a: 'straight hair を長さの直後に置いてください。straight だけだと、姿勢や服の線までまっすぐになることがあります。長い句は自然な英語で、公式タグとしては断定しません。',
      },
      {
        q: 'ツヤ髪はどの語を足しますか',
        a: 'glossy hair、silky hair、sleek hair は自然な英語です。shiny hair は短い語として使われることがあります。いずれも公式タグとしては断定しません。同じ強さで四つ残さず、一つにして、光は soft daylight か rim light の一方です。濡れた見た目の語は使いません。',
      },
      {
        q: 'very long hair はタグですか',
        a: 'very long hair は短い語として使われることがあります。公式タグとしては断定しません。腰より長くしたい日は、届く位置を自然な英語で一つ足し、全身で毛先が枠に入るかを見てください。',
      },
      {
        q: '波と巻きを止める負向は何ですか',
        a: 'wavy hair、curly hair、messy hair を負向に残し、正向からは消します。直毛の語を長さの直後へ移してから、まだ波が残るときだけ重みを一つ上げます。',
      },
      {
        q: '男性のストレートでも年齢は成人ですか',
        a: 'はい。1 adult man と adult を残し、adult face を付けます。服の行はシャツと長いズボンに書き直し、長さは short hair か medium hair の一方です。',
      },
    ],
  },
  'black-hair-prompt-guide': {
    sections: [
      {
        title: '黒髪は、色を髪に結びつける',
        content: `「黒髪 プロンプト」「プロンプト 黒髪」「黒髪ロング 英語」「黒髪 マッシュ プロンプト」で探しているのは、黒い色を髪だけに残す書き方です。検索では、ロング、ボブ、マッシュ、青み、が一緒に出ます。欲しいのは髪の色です。服や背景まで黒く塗った結果ではありません。

このページは、黒の範囲を担当します。金の色味は [金髪のプロンプト](/guides/blonde-hair-prompt-guide) です。役割は一行で分けます。金のページは金の濃さ、このページは黒の濃さです。赤も銀も含む色の全体と、メッシュの深さは [髪色プロンプト](/guides/hair-color-prompt-guide) です。直毛の質感は [ストレートヘアのプロンプト](/guides/straight-hair-prompt-guide)、長さの届く位置は [ロングヘアプロンプト](/guides/long-hair-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。髪が黒いからといって、服まで黒くしません。境目が要るからです。実在の人物と、作者名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。

重みは目安です。\`(black hair:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(black hair:1.2\\)\` と書きます。NovelAI の強調は \`{black hair}\` と \`[black hair]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`black\` だけだと、ブラウスと背景まで黒になります。人数の直後に \`black hair\` と、髪まで書いてください。\`black hair\` は短い語として使われることがあります。公式タグとしては断定しません。濃さの形容は、地の黒が三枚同じになってから一つです。

濃さを比べる日は、白い服と明るい背景を固定します。服の色を同じ日に変えると、黒が濃くなったのか服が暗くなったのかが残りません。基準の一枚は、\`black hair\` と \`long hair\` と白いブラウスだけにして、ファイル名に「地」と書いて残します。この一枚が無い状態で jet black や青みを足すと、戻る場所がありません。`,
      },
      {
        title: '黒の濃さ',
        content: `濃さは一つだけ足します。隣の色を同じ強さにすると、茶色と青のあいだで平均になります。今日決めるのは、真っ黒か、青みか、暗い茶との境目か、です。

jet black hair、blue-black hair、dark brown hair、natural black hair は、自然な英語です。公式タグとしては断定しません。真っ黒に寄せたい日は jet black hair を一つ。青みを足す日は blue-black hair を一つ。暗い茶にしたい日は、\`black hair\` を外して dark brown hair にします。写真で地毛の黒にしたい日は natural black hair を一つ。四つを残したファイルは、保存しません。

| 濃さ | 書き方 | 寄りやすい方向 |
|---|---|---|
| 黒髪 | \`black hair\` | 灰色、暗い茶。\`black\` だけにしない |
| 真っ黒 | jet black hair | 自然な英語。背景に溶ける |
| 青みの黒 | blue-black hair | 自然な英語。青髪 |
| 暗い茶 | dark brown hair | 自然な英語。黒の語は外す |
| 写真の地毛 | natural black hair | 自然な英語。アニメの塗りとは別の日 |

青みの日は、普通の \`black hair\` を同じ強さで残しません。残すと、青の半分だけが消えます。暗い茶の日は、\`black hair\` を負向に回すと、境目が残りやすいことがあります。効くとは断定しません。

**真っ黒。白い服で境目を残す**

\`\`\`
1 adult woman, adult, jet black hair, long hair, straight hair, adult face,
white blouse, cardigan, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
grey hair, white hair, brown hair, blue hair, blonde hair
\`\`\`

**青みの黒。服は白のまま**

\`\`\`
1 adult woman, adult, blue-black hair, long hair, adult face,
white blouse, upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
blue hair, grey hair, brown hair, blonde hair
\`\`\`

**暗い茶。黒の語は外す**

\`\`\`
1 adult woman, adult, dark brown hair, long hair, straight hair, adult face,
white blouse, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
black hair, grey hair, blonde hair, blue hair
\`\`\`

色を変える比較は、髪型と服を固定して、色の行だけを差し替えます。青みが服へ移るときは、服を無地の白に戻し、blue-black hair を一つに減らします。\`blue hair\` が地の行に残っていたら消してください。

写真の地毛に戻す日は、jet black hair と blue-black hair を正向から外します。アニメの塗りで natural black hair を強くすると、毛の質感だけが写真になります。画風と濃さは、別の日に動かします。暗い茶から黒へ戻すときも、一度に両方の語を残しません。残したい方を一つ、もう一方は負向です。負向に入れた色は、次の枚で正向へ戻さないでください。戻すと、直前の比較が無効になります。`,
      },
      {
        title: 'ロング、ボブ、マッシュ',
        content: `黒が安定してから、形を一つ足します。ロングとボブとマッシュを同じ強さにすると、肩で平均になります。

ロングの直毛は \`long hair, straight hair\` を黒の直後に。ボブは \`bob cut\`。高い位置で結ぶ日は \`ponytail\` を一つ。姫カットは \`hime cut\` を一つ、前髪の語とは同時に強くしません。いずれも短い語として使われることがあります。公式タグとしては断定しません。結びと前髪の細目は、それぞれのページです。このページでは、地が黒であることを人数の直後に残します。

マッシュは、成人の短い髪型です。mushroom cut は自然な英語で、キノコそのものが画面に出ることがあります。丸い輪郭は rounded short hair と自然な英語でも書いて、キノコの絵が勝つときは mushroom を外します。公式タグとしては断定しません。マッシュの日は \`short hair\` を一つ残し、\`long hair\` は負向へ回します。女性の短髪の種類は [ショートヘアのプロンプト](/guides/short-hair-prompt-guide) です。

| 形 | 書き方 | 黒の行 |
|---|---|---|
| ロングの直毛 | \`long hair, straight hair\` | \`black hair\` を先に |
| ボブ | \`bob cut\` | ロングは負向へ |
| 結び | \`ponytail\` | 長さを残すなら \`long hair\` も |
| 姫カット | \`hime cut\` | 前髪の語は外す |
| マッシュ | rounded short hair | 自然な英語。\`short hair\` と一緒に |

**黒髪ロング。直毛**

\`\`\`
1 adult woman, adult, black hair, long hair, straight hair, adult face,
white blouse, long skirt, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
blonde hair, brown hair, grey hair, short hair, wavy hair
\`\`\`

**成人の男性のマッシュ。地は黒**

\`\`\`
1 adult man, adult, black hair, short hair, rounded short hair, adult face,
shirt, long trousers, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, blonde hair, grey hair, extra people
\`\`\`

マッシュが肩まで伸びるときは、\`long hair\` が正向に残っています。消して、負向に残します。キノコの絵が出るときは、mushroom という語を正向から消し、丸い輪郭の文だけを残してください。

ポニーテールの日は、結びの高さを一つだけ書きます。高い結びと低い結びを同じ強さにすると、後頭部に結びが二つできます。高さの細目は髪型の入口へ戻し、このページでは地が黒であることを残します。姫カットの日にボブの語が残っていると、頬の横だけが長くなります。\`bob cut\` は消してから \`hime cut\` を置いてください。形を変えるたびに、黒の行が人数の直後に残っているかを見ます。後ろへ押し出されると、服が先に黒くなります。`,
      },
      {
        title: '内側の色と、光',
        content: `黒の地に、別の色を足す日は、地を先に書きます。内側の色か、細い筋か、のうち一つです。両方を同じ強さにすると、頭の中ほどで色が平均になります。

内側の色は、\`colored inner hair\` が短い語として使われることがあります。公式タグとしては断定しません。効かなければ、自然な英語で inner color と、色を一つ足します。筋の深さは [メッシュ・インナーカラーのプロンプト](/guides/mesh-inner-color-hair-prompt-guide) です。このページでは、地が黒であるときの内側だけを書きます。筋を細かく分け始めたら、そちらへ移ってください。

黒は、光がないと一枚の影になります。光は、色が安定してから一つです。縁の光は rim light、髪の細い光は hair highlights、と自然な英語で書きます。公式タグとしては断定しません。向きの一覧は [光・照明のプロンプト](/guides/lighting-prompt-guide) です。両方を同じ強さにすると、輪郭が白く飛んで、黒と白髪の区別が消えます。背景は明るい無地にします。夜の場面で全体を暗くすると、髪の形が背景に溶けます。

| 狙い | 書き方 | 地の色 |
|---|---|---|
| 内側だけ | \`colored inner hair\` | \`black hair\` を先に |
| 内側の言い換え | inner color | 自然な英語。色は一つ |
| 縁を分ける | rim light | 自然な英語。一つ |
| 細い光 | hair highlights | 自然な英語。縁の光とは別の日 |

**内側だけ赤。地は黒**

\`\`\`
1 adult woman, adult, black hair, long hair, colored inner hair, dark red inner color, adult face,
white blouse, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
fully red hair, blonde hair, grey hair, white hair
\`\`\`

**縁の光。色は真っ黒のまま**

\`\`\`
1 adult woman, adult, jet black hair, long hair, straight hair, adult face,
rim light, white blouse, portrait, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
grey hair, white hair, blonde hair, overexposed
\`\`\`

内側の色が服へ移るときは、服を白に戻し、内側の色を一つに減らします。縁の光で顔が真っ黒になるときは、光を外して soft daylight に戻します。光を三種類足しても、顔は戻りません。

内側を金にする日は、金のページの色味を一つだけ借りて、地の \`black hair\` は消しません。地を消すと、頭の全体が金になります。赤の内側が髪の外側まで広がるときも、内側の語を弱める前に、\`red hair\` が地の行に無いかを見ます。あったら消して、内側の行だけを残します。光を足す日は、内側の色を固定したファイルを別にしてください。同じ枚で光と内側を動かすと、赤が飛んだのか光が強いのかが残りません。`,
      },
      {
        title: 'アニメと写真、男性の黒髪',
        content: `画風は一つです。\`anime style\` と \`photorealistic\` を同じ強さにすると、髪の半分だけが別の媒体になります。アニメの日は、塗りを平坦にしすぎないように、光を一つ残します。写真の日は natural black hair を自然な英語で一つ、セル塗りの語は正向から外します。

男性も、同じ濃さの表を使います。\`1 adult man\` と \`adult\` を残します。短い黒か、耳にかかる黒か、を一つ。サイドを短くする書き方は undercut が短い語として使われることがあります。公式タグとしては断定しません。効かなければ、自然な英語で short sides と top hair を一文にします。女性の服の行はコピーしません。

| 画風 | 黒の書き方 | 外すもの |
|---|---|---|
| アニメ | \`black hair\` と光を一つ | \`photorealistic\` は負向 |
| 写真 | natural black hair | 自然な英語。セル塗りの語 |
| 成人の男性 | 濃さを一つ、長さを一つ | 女性の服の行 |

**アニメ。縁の光は一つ**

\`\`\`
1 adult woman, adult, black hair, long hair, straight hair, adult face,
anime style, rim light, white blouse, cardigan, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, grey hair, blonde hair, brown hair
\`\`\`

**写真。地毛の黒**

\`\`\`
1 adult man, adult, natural black hair, short hair, adult face,
photorealistic, shirt, long trousers, portrait, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
anime style, cel shading, grey hair, blonde hair, long hair
\`\`\`

写真が灰色で止まるときは、背景を明るくして、grey hair が正向に残っていないかを見ます。アニメで細部が消えるときは、光を一つ残したまま、背景の名詞を減らします。

男性のサイドを短くしたファイルから、女性のロングへ戻るときは、undercut を消します。残ったままだと、次の枚の横髪が欠けます。逆に、ロングの語を男性の短髪へ持っていくと、トップだけが肩まで伸びます。持ち運ぶ語は、黒の濃さ一つです。長さとサイドの刈り込みは、ファイルごとに書き直します。`,
      },
      {
        title: '文章で頼む',
        content: `ChatGPT や Gemini では、成人であること、黒の濃さ、長さ、無地の服、光、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

文では「黒い服」と「黒い髪」を同じ文に置かないでください。置いた文は、タグへ戻すときも服が黒のまま残ります。服は白、髪は黒、と分けて書きます。

**文章の例。黒髪ロングと白いブラウス**

\`\`\`
Draw one adult woman with long, straight jet-black hair and an adult face.
She wears a white blouse and a cardigan. Upper body, plain light background, soft daylight.
Keep the black color on the hair only, and keep a thin rim of light on the hair. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
grey hair, brown hair, blonde hair, extra people
\`\`\`

**文章の例。成人の男性の短い黒髪**

\`\`\`
Draw one adult man with short natural black hair and an adult face.
He wears a shirt and long trousers. Upper body, plain background, soft daylight.
Keep the hair short and black. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, grey hair, blonde hair, extra people
\`\`\`

文章で通った濃さは、表の一行へ翻訳します。真っ黒と暗い茶を両方残した翻訳は、保存しません。

文に黒い服と黒い髪が並んでいたら、服の句を白に直してから、もう一度出します。タグへ戻す前に、服の色を見てください。成人であること、無地の服、明るい背景、は文からタグへ移すときも残します。この三つが落ちると、髪の色より先に人数が崩れます。`,
      },
      {
        title: '灰色になる、細部が消える、若く見える',
        content: `失敗は、だいたい四つです。黒が灰色になる。毛の細部が一つの影になる。色が服や背景へ移る。顔が若く見える。四つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

灰色になるときは、正向から grey hair と white hair を消します。負向に残します。背景が暗いときは、明るい無地に戻してから、もう一枚見ます。jet black hair の隣に \`white hair\` が残っていると、縁だけが白髪になります。

細部が消えるときは、光を一つだけ戻します。rim light か soft daylight か、です。両方を強くしてから、背景の名詞を増やすと、また影に戻ります。光を足す前に、背景は無地のままにしてください。

色が移るときは、\`black\` が hair から離れていないかを見ます。服が黒なら白に戻します。青みが全身へ移るときは、blue-black hair を外して \`black hair\` に戻し、青の語を負向に残します。手順の全体は [色プロンプト](/guides/color-prompt-guide) です。

若く見えるときは、人数の \`adult\` を消しません。\`adult face\` を顔の近くに残します。年齢を下げる語は、正向にも、負向の解除にも使いません。負向の年齢の語は残したまま、顔の行だけを足してください。前髪を厚くすることが、年齢を下げる書き方の代わりにはなりません。

三枚続けて灰色なら、濃さの形容をいったん外し、\`black hair\` と白い服と明るい背景の三つに戻します。真っ黒の語を戻すのは、灰色が消えてからです。

直す順番は、灰色、細部、色の移り、年齢、です。灰色のまま光を三種類足しても、細部は戻りません。年齢の確認は、髪型より前にします。\`adult\` が人数の行から消えていたら、前髪を厚くする前に戻します。戻さずに髪を動かしても、顔の年齢は変わりません。一枚ごとに、消した語をメモへ残してください。`,
      },
      {
        title: '濃さと形は、別のファイルに残す',
        content: `黒のページで崩れる多くは、濃さと形を同じ枚で動かしたことです。地の黒が三枚同じになるまで、ボブもマッシュも内側の色も足しません。足したあとは、ファイル名に濃さと形を両方書いて残します。たとえば、真っ黒でロング、地の黒でマッシュ、です。名前が無いと比較のときに、どの負向を残すべきか戻れません。

金のページへ移る日に持っていくのは、髪型の語を一つまでです。長い髪か、ボブか、です。黒の濃さの語は置いていきます。置いていかないと、金のファイルの地が黒のまま残ります。逆に、金のページから戻るときも、プラチナやハニーの語は消してから、黒の語を人数の直後へ戻します。色の兄弟のページは、地の色を共有しません。共有すると、このページで分けた意味が消えます。

内側の色だけを試すファイルは、さらに分けます。地が真っ黒の枚と、内側が赤の枚を同じ名前で上書きしないでください。上書きすると、灰色になったときの戻り先が、内側の赤の枚になります。戻り先は、白い服と明るい背景と、黒の語だけの枚です。光を足した枚は、その戻り先のコピーに縁の光を一つ足して、別名で保存します。

男性の短髪と、女性のロングも、同じ上書きをしません。サイドを短くする語がロングのファイルに残ると、次の日の横髪が欠けます。人を変える日は、服の行から書き直します。残してよい共通の行は、成人であることと、黒の語一つ、までです。

比べ終わった日は、残す枚を三枚までにします。地の黒、今日の濃さ、今日の形、です。光を足した枚は、形が同じであることを確認してから残します。形が変わった光の枚は、光が効いたのではなく、長さが動いた枚なので捨てます。捨てる基準は、耳の位置と、毛先の位置です。この二つが基準の枚と同じなら、光だけが変わっています。`,
      },
    ],
    faq: [
      {
        q: '黒髪ロングの英語は何ですか',
        a: 'black hair, long hair を人数の直後に置いてください。直毛なら straight hair を長さのうしろに一つ足します。black だけだと服まで黒くなることがあります。長い句は自然な英語で、公式タグとしては断定しません。',
      },
      {
        q: '黒髪のマッシュはどう書きますか',
        a: '成人の男性なら 1 adult man と adult を残し、black hair と short hair のうしろに rounded short hair を自然な英語で一つ足します。mushroom cut はキノコの絵になることがあるので、出たら外してください。',
      },
      {
        q: '黒髪が灰色になります',
        a: 'grey hair と white hair を正向から消し、負向に残します。背景を明るい無地に戻し、光は soft daylight か rim light の一方にしてください。',
      },
      {
        q: '金髪のページとどう分けますか',
        a: '金の濃さは金髪のページ、黒の濃さはこのページです。メッシュやインナーカラーの深さはメッシュ・インナーカラーのページです。地の色を二つ同じ強さにすると、頭の中ほどで色が平均になります。',
      },
      {
        q: '顔が若く見えます',
        a: 'adult は消さず、adult face を顔の近くに残します。年齢を下げる語は正向に足しません。負向の年齢の語も残したままにしてください。',
      },
    ],
  },
  'short-hair-prompt-guide': {
    sections: [
      {
        title: 'ショートは、長さを先に一つ決める',
        content: `「ショートヘア プロンプト」「ショートヘア 種類 プロンプト」「ショートヘア プロンプト 男」「女性 ショートヘア プロンプト」で探しているのは、耳のまわりで終わる髪です。検索では、男性、女性、種類、前髪、が一緒に出ます。欲しいのは短いことです。肩まで伸びた結果ではありません。

このページは、短い髪型の種類を担当します。髪型の入口は [髪型プロンプト](/guides/hairstyle-prompt-guide) のままです。役割は一行で分けます。入口のページは長さも結びも色も見渡す表、このページはショートだけです。直毛の質感は [ストレートヘアのプロンプト](/guides/straight-hair-prompt-guide)、腰までの髪は [ロングヘアプロンプト](/guides/long-hair-prompt-guide) です。ロングの語は、このページの正向に残しません。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` と \`adult face\` を残します。ボーイッシュにしたい日も、成人の女性のまま書きます。年齢を下げる書き方や、子供に寄せる言い方は使いません。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。実在の人物と、作者名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。

重みは目安です。\`(short hair:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(short hair:1.2\\)\` と書きます。NovelAI の強調は \`{short hair}\` と \`[short hair]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`short\` だけだと、服の丈まで短くなることがあります。髪まで書いて \`short hair\` にしてください。\`short hair\` は短い語として使われることがあります。公式タグとしては断定しません。種類の名前は、この長さが三枚同じになってから一つです。

基準の一枚は、\`short hair\` と黒い髪と白い服だけにして残します。種類の名前を足したあとに長さが戻らなくなったら、この一枚へ戻ってから種類を一つずつ試します。基準が無いと、ピクシーが短いのか、負向のロングが効いたのかが分かりません。`,
      },
      {
        title: '種類の一覧',
        content: `種類は一つです。ピクシーとボブとウルフを同じ強さにすると、襟足の長さが平均になります。今日の輪郭を、耳が出るか、顎の線で揃うか、襟足が少し残るか、で決めてください。

\`bob cut\` は短い語として使われることがあります。\`very short hair\` も短い語として使われることがあります。公式タグとしては断定しません。pixie cut、buzz cut、crew cut、wolf cut、layered short hair、short ponytail は自然な英語です。公式タグとしては断定しません。wolf cut は、狼の耳が付くことがあります。耳が要らない日は、この語を外して layered short hair に戻します。

男性の刈り込みも、自然な英語から入ります。buzz cut はさらに短い刈り込み、crew cut はそれより少し残す刈り込み、として使われることがあります。効くとは断定しません。サイドだけを短くする書き方は、次の節で男性のファイルに分けます。

| 種類 | 書き方 | 扱い |
|---|---|---|
| ショート | \`short hair\` | 最初の一手。種類の前に置く |
| さらに短い | \`very short hair\` | ロングと同時に強くしない |
| ボブ | \`bob cut\` | 短い語として使われることがある |
| ピクシー | pixie cut | 自然な英語。耳が出やすい |
| レイヤー | layered short hair | 自然な英語。一つ |
| 短い結び | short ponytail | 自然な英語。結びが小さいお団子になりやすい |
| ウルフ | wolf cut | 自然な英語。動物の耳が出たら外す |
| 刈り込み | buzz cut / crew cut | 自然な英語。男性の節 |

短い結びは、毛が足りずに後頭部の小さい塊になります。結びを見せたい日だけ short ponytail を一つ足し、普通のショートの日は外します。\`ponytail\` だけを強くすると、長さが肩まで戻ることがあります。その日は \`long hair\` を負向に残してください。

**種類を足す前の、短い髪**

\`\`\`
1 adult woman, adult, short hair, black hair, adult face,
white blouse, cardigan, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, medium hair, ponytail
\`\`\`

この一枚が耳のまわりで終わるまで、種類の名前は足しません。肩に届いたら、\`long hair\` か \`medium hair\` が古いファイルに残っていないかを先に見てください。

ウルフを試す前に、動物の耳が出ても捨てる、と決めておきます。出た枚は保存せず、layered short hair のファイルだけを残します。短い結びを試す日は、基準のショートとは別のファイルです。同じファイルに ponytail を足してから外すと、長さの負向まで一緒に消えることがあります。負向の \`long hair\` は、種類を変えても残してください。`,
      },
      {
        title: '成人の女性の短髪',
        content: `女性の短髪は、\`1 adult woman\` から書き直します。男性のファイルの服を貼ると、シャツが残って、輪郭の確認ができません。服は白いブラウスと、カーディガンか長いスカートです。

ピクシーは pixie cut を自然な英語で一つ。襟足が短く、耳が見えやすい形です。ボブは \`bob cut\` を一つ。顎の線で揃えます。レイヤーを足す日は layered short hair を一つ、ボブとは別の日にします。ウルフを試す日は wolf cut を一つだけ。動物の耳が出たら、その語を捨てます。

ボーイッシュな大人の女性にしたい日も、人数は成人の女性のままです。英語の文に、年齢を下げる語や、別の性別の人数は書きません。短さと、シャツに近い無地のブラウスで、輪郭を作ります。性別の語を二つ残すと、顔が平均になります。

| 形 | 書き方 | 見せるところ |
|---|---|---|
| ピクシー | pixie cut | 耳と襟足 |
| ボブ | \`bob cut\` | 顎の線 |
| レイヤー | layered short hair | 毛先の段。一つ |
| 短い直毛 | \`short hair, straight hair\` | 直毛のページの質感は一つまで |

**ピクシー。耳が見える**

\`\`\`
1 adult woman, adult, short hair, pixie cut, black hair, adult face,
white blouse, cardigan, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, medium hair, ponytail
\`\`\`

**ボブ。顎の線**

\`\`\`
1 adult woman, adult, bob cut, short hair, black hair, adult face,
white blouse, long skirt, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, ponytail, wavy hair
\`\`\`

ボブがロングになるときは、\`bob cut\` より \`long hair\` が前にあります。ロングの語を消し、\`bob cut\` を人数の直後へ移します。ピクシーに前髪を厚く足すと、耳が隠れます。耳を見せる日は、前髪を一つに減らしてください。

レイヤーをボブに足す日は、\`bob cut\` を外すか、レイヤーを外すか、を先に決めます。両方を同じ強さにすると、顎の線が段で崩れます。ボーイッシュな大人の女性の日も、種類は一つです。短さを足すために、もう一方の人数の語を借りてきません。借りると、顔が平均になります。服は丈のある無地のままにして、輪郭は髪だけで変えます。`,
      },
      {
        title: '成人の男性の短髪',
        content: `男性は \`1 adult man\` と \`adult\` を残します。女性のブラウスは貼りません。服はシャツと長いズボンです。長さは \`short hair\` か \`very short hair\` の一方です。

刈り込みは一つだけ名前を足します。buzz cut は自然な英語で、地肌に近い短さです。crew cut は自然な英語で、上に少し毛を残す短さです。両方を同じ強さにすると、中間の長さで止まります。完全に毛を消す語は、このページでは使いません。消す語を足すと、髪の形を見る前に頭が光ります。

サイドを短くする日は、undercut が短い語として使われることがあります。公式タグとしては断定しません。効かなければ、自然な英語の two-block haircut に言い換えます。ツーブロックは、サイドが短く、トップが残る、という文でも書いてください。名前だけだと、両サイドの長さが揃いません。

マッシュに近い丸い短さは rounded short hair と自然な英語です。黒の地と一緒に書く日は [黒髪のプロンプト](/guides/black-hair-prompt-guide) のマッシュの節も見て、色の行は一つにします。

| 形 | 書き方 | 注意 |
|---|---|---|
| かなり短い | buzz cut | 自然な英語。\`very short hair\` と一緒に一つ |
| 少し残す | crew cut | 自然な英語。buzz とは別の日 |
| サイドだけ短い | undercut | 短い語として使われることがある |
| ツーブロック | two-block haircut | 自然な英語。サイドとトップを文でも書く |
| 丸い短さ | rounded short hair | 自然な英語。キノコの絵が出たら語を外す |

**刈り込み。成人の男性**

\`\`\`
1 adult man, adult, very short hair, buzz cut, black hair, adult face,
shirt, long trousers, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, medium hair, ponytail, wavy hair
\`\`\`

**ツーブロック。トップは残す**

\`\`\`
1 adult man, adult, short hair, two-block haircut, black hair, adult face,
short sides, shirt, long trousers, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, ponytail, extra people
\`\`\`

サイドが伸びるときは、\`long hair\` が残っています。消してから、two-block haircut を長さの直後へ移します。トップまで地肌になるときは、buzz cut が同じ強さで残っています。残す刈り込みは一つです。

丸い短さを試す日は、刈り込みの語を全部外してから rounded short hair を一つ置きます。刈り込みと丸い輪郭を同じ強さにすると、サイドの長さが平均になります。女性のボブのファイルから \`bob cut\` を男性へ貼らないでください。顎の線が残って、刈り込みの確認ができません。男性のファイルに残してよいのは、黒や金の色の行だけです。`,
      },
      {
        title: '前髪、色、直毛と波',
        content: `短い髪が三枚同じになってから、前髪か、色か、癖か、を一つ足します。三つを同じ日に動かすと、長さが肩へ戻ることがあります。

前髪の形は [前髪プロンプト](/guides/bangs-prompt-guide) から一つ借ります。\`blunt bangs\` は短い語として使われることがあります。公式タグとしては断定しません。短い髪に厚い前髪を同じ強さで足すと、目が隠れます。目を見せる日は、前髪を眉の上で止める文を一つ足すか、前髪の語を外します。

色は一つです。黒は [黒髪のプロンプト](/guides/black-hair-prompt-guide)、金は [金髪のプロンプト](/guides/blonde-hair-prompt-guide)、ほかの色は [髪色プロンプト](/guides/hair-color-prompt-guide) です。筋や内側の色は [メッシュ・インナーカラーのプロンプト](/guides/mesh-inner-color-hair-prompt-guide) です。このページでは \`black hair\` か \`blonde hair\` かを人数の直後に残し、色味の形容はそれぞれのページへ戻します。

癖も一つです。直毛は \`straight hair\`。ゆるい波は \`wavy hair\`。両方を残すと、毛先だけが別の髪型になります。直毛の細目はストレートのページです。短い直毛の日は、波の語を負向へ回します。

| 足すもの | 書き方 | 長さ |
|---|---|---|
| 前髪 | \`blunt bangs\` | \`short hair\` は残す |
| 黒 | \`black hair\` | 色のページへは濃さだけ借りにいく |
| 金 | \`blonde hair\` | \`blonde\` だけにしない |
| 直毛 | \`straight hair\` | 波は負向 |
| ゆるい波 | \`wavy hair\` | 直毛は外す |

**短い直毛と、眉の上の前髪**

\`\`\`
1 adult woman, adult, black hair, short hair, straight hair, blunt bangs, adult face,
white blouse, upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, wavy hair, curly hair, hair over eyes
\`\`\`

前髪が目を覆うときは、\`blunt bangs\` の重みを上げる前に、髪が顔にかかる語を正向から外します。色が服へ移るときは、服を白に戻して、色の語を hair の直後に結びます。

波の短い髪は、直毛のファイルとは別に保存します。\`wavy hair\` を直毛の枚へ足してから外すと、次の枚まで毛先が残ります。色を変える日は、前髪と癖を固定します。金の短い髪が黄ばむときは、このページで長さをいじらず、金のページの負向を一つだけ借りて戻ってください。借りる語は、黄色と橙の負向までです。長さの語は持っていきません。`,
      },
      {
        title: '文章で頼む',
        content: `画風は一つです。アニメの日と写真の日を、同じ文に同じ強さで書きません。ChatGPT や Gemini では、成人であること、短さ、種類を一つ、無地の服、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

文でも、年齢を下げる言い方は使いません。短い髪型の成人、と書きます。耳が見えること、襟足が短いこと、を一文ずつ足すと、肩までの髪に戻りにくくなります。

**文章の例。成人の女性のピクシー**

\`\`\`
Draw one adult woman with a short black pixie cut and an adult face.
Her ears are visible and the nape is short. She wears a white blouse and a cardigan.
Upper body, plain background, soft daylight. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, medium hair, ponytail, extra people
\`\`\`

**文章の例。成人の男性のツーブロック**

\`\`\`
Draw one adult man with a short black two-block haircut and an adult face.
The sides are short and the top is a little longer. He wears a shirt and long trousers.
Upper body, plain background, soft daylight. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, ponytail, wavy hair, extra people
\`\`\`

文章で通った種類は、表の一行へ翻訳します。ピクシーとボブを両方残した翻訳は、保存しません。

文に「肩までのショート」と書いてあったら、肩までを消して、耳のまわり、と直してから翻訳します。肩までが残った文は、タグへ戻すと \`medium hair\` になります。成人であることと、耳が見えることは、文からタグへ移すときも残します。この二つが落ちると、種類より先に長さが伸びます。`,
      },
      {
        title: '伸びる、性別が寄る、耳と首',
        content: `失敗は、だいたい三つです。髪が肩まで伸びる。顔の性別がもう一方へ寄る。耳と首が見えない。三つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

伸びるときは、正向から \`long hair\`、\`very long hair\`、\`medium hair\` を消します。負向に残します。\`ponytail\` が残っていると、結びのために長さが戻ります。結びが要らない日は、結びの語も消します。\`short hair\` は人数の直後へ移します。重みを上げるのは、三枚続けてまだ肩に届くときだけです。

性別が寄るときは、人数の行を見ます。\`1 adult woman\` と \`1 adult man\` が両方残っていると、顔が平均になります。今日の人数を一つにして、もう一方は消します。服の行も、その人数に合わせます。女性の短髪が男性に寄るときは、ブラウスと \`adult face\` を残したまま、男性の刈り込みの名前を外します。男性が女性に寄るときは、シャツと長いズボンを残し、ボブの語を外します。年齢の語は、どちらの日も \`adult\` のままです。

耳が見えないときは、前髪と横の毛を一つ減らします。pixie cut の日は、耳が見えることを自然な英語で ears visible と一つ足すことがあります。効くとは断定しません。首が見えないときは、顔の寄りすぎです。portrait を upper body に戻して、襟まで画面に入れます。耳と首は、髪型の境目を見るための場所です。体の別の部位を強くする語は足しません。

三枚続けて肩まで伸びるなら、種類の名前をいったん外して、\`short hair\` と服と \`adult face\` の三つに戻します。種類を戻すのは、耳のまわりで終わってからです。

直す順番は、長さ、人数、耳と首、です。肩まで伸びたまま性別の語を入れ替えても、顔の判定はできません。耳を出す日は、前髪を増やす日と分けます。一枚ごとに、消した語をメモへ残してください。メモが無いと、次にロングのページへ移ったとき、ショートの負向を持っていってしまいます。持っていく語は、色を一つまでです。`,
      },
      {
        title: '入口のページと、ファイルの分け方',
        content: `髪型の入口は、長さも結びも色も並ぶ表です。このページは、その表の短い行だけを深くします。入口で短い髪を一つ選んでから、種類が要る日にこちらへ来てください。入口のたくさんの種類を、このページの一枚に貼らないでください。貼ると、襟足の長さが平均になります。

女性の短髪、男性の短髪、直毛、波、は別ファイルです。今日開くのは一つです。女性のピクシーがそろったファイルへ、男性の刈り込みを足すと、顔が寄ります。寄ってから語を消しても、服の行が混ざったまま残ることがあります。人を変える日は、人数と服を先に書き直して、種類の名前は空にします。種類は、耳のまわりで終わってから一つ戻します。

ロングのページへ移る日は、短い髪の語を正向から消し、負向にも残しません。残すと、腰までの髪が肩で止まります。ショートへ戻る日は、逆に長い髪の語を負向へ戻します。色のページへ持っていく語は、短い髪かボブの一方だけです。ピクシーと刈り込みの名前は、色の実験には持っていきません。色が決まってから、このページへ戻して種類を足します。

波のファイルと直毛のファイルも、負向ごと分けます。直毛の負向には波の語が入り、波の負向には直毛の語が入ります。一つの負向に両方を入れると、毛先がどちらにもなりません。保存する前に、今日の種類が一つだけ正向にあることを確認してください。`,
      },
    ],
    faq: [
      {
        q: 'ショートヘアの種類はどう書き分けますか',
        a: 'short hair を先に一つ置き、種類は pixie cut、bob cut、layered short hair、wolf cut のどれか一つです。bob cut と very short hair は短い語として使われることがあります。それ以外の長い句は自然な英語で、公式タグとしては断定しません。',
      },
      {
        q: '男性のショートはどう書きますか',
        a: '1 adult man と adult を残し、very short hair なら buzz cut、少し残すなら crew cut、サイドだけ短いなら two-block haircut を自然な英語で一つ足します。undercut は短い語として使われることがあります。公式タグとしては断定しません。',
      },
      {
        q: '女性のショートが長くなります',
        a: 'long hair と medium hair と ponytail を正向から消し、負向に残します。short hair を人数の直後へ移してから、まだ伸びるときだけ重みを一つ上げます。',
      },
      {
        q: 'ボーイッシュにしたいです',
        a: '成人の女性のまま、1 adult woman と adult face を残します。年齢を下げる語や、もう一方の人数は書きません。短さと、丈のある無地の服で輪郭を作ります。',
      },
      {
        q: '耳と首が出ません',
        a: '前髪を一つ減らし、顔の寄りを upper body に戻します。ピクシーの日は ears visible を自然な英語で一つ足すことがあります。効くとは断定しません。体の別の部位を強くする語は足しません。',
      },
    ],
  },
  'blackboard-prompt-guide': {
    sections: [
      {
        title: '黒板は、緑の板であることも多い',
        content: `「黒板 プロンプト」「黒板アート プロンプト」「黒板 に 書く プロンプト」「黒板の前 プロンプト」で探しているのは、チョークで描く板です。検索では、黒板アート、チョーク、黒板消し、板の前に立つ人、が一緒に出ます。「教室 黒板」で探すときも、このページでは学校の場面にはしません。無地の板か、大学の講義室か、です。年齢を下げる場面と、子供のいる部屋は使いません。

このページは、板とチョークを担当します。線そのものの太さは [線画のプロンプト](/guides/line-art-prompt-guide)、塗りの媒体の全体は [画風プロンプト](/guides/art-style-prompt-guide) です。役割は一行で分けます。線のページは輪郭、画風のページは絵の具や水彩、このページはチョークの粉です。部屋の種類は [部屋のプロンプト](/guides/room-prompt-guide)、人物のうしろの場所は [背景プロンプト](/guides/background-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\`、二人なら \`2 adults\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。講師も、聞いている人も、成人です。実在の学校の名前と、実在の人物は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。

重みは目安です。\`(chalkboard:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(chalkboard:1.2\\)\` と書きます。NovelAI の強調は \`{chalkboard}\` と \`[chalkboard]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

板の色を先に一つ決めてください。chalkboard、blackboard、greenboard は自然な英語です。公式タグとしては断定しません。日本語の黒板は、濃い緑の板であることが多いです。黒い板にしたい日は blackboard を一つ。緑にしたい日は greenboard を一つ。両方を同じ強さにすると、色が平均の灰色になります。

基準の一枚は、緑の板と木の枠だけにして残します。絵や人や店を足したあとに板の色が戻らなくなったら、この一枚へ戻ります。基準が無いと、チョークが効いたのか背景の壁が効いたのかが分かりません。学校の教室を表す語は、基準のファイルにも、あとのファイルにも足しません。場所を足す日は、大学の講義室か、無地の壁か、です。`,
      },
      {
        title: 'チョークで描く',
        content: `絵を板の上に載せる日は、板の色が決まってから、チョークを一つ足します。chalk drawing は自然な英語です。公式タグとしては断定しません。白い線だけの日は white chalk を一つ。色を足す日は colored chalk を一つ。両方を同じ強さにすると、色が濁ります。

粉っぽさは chalk smudges を自然な英語で一つ、までです。かすれを三つ書くと、絵の輪郭が消えます。板の枠は wooden frame を自然な英語で一つ。枠と、額縁の絵を同じ強さにすると、板が壁の飾り額になります。

主題は一つです。花束か、一杯のカップか、です。人の顔をチョークで描く日は、その顔も成人の一人として \`1 adult\` を残すか、人を描かずに静物だけにするか、を先に決めてください。両方を曖昧にすると、板の端に顔が出ます。

| 層 | 書き方 | 外すもの |
|---|---|---|
| 板 | greenboard か blackboard | 自然な英語。両方強くしない |
| 絵 | chalk drawing | 自然な英語。絵の具の語 |
| 白い線 | white chalk | 自然な英語 |
| 色チョーク | colored chalk | 自然な英語。色は一つから |
| 粉 | chalk smudges | 自然な英語。一つ |
| 枠 | wooden frame | 自然な英語。額縁の語とは別 |

**緑の板に、白いチョークの花**

\`\`\`
a greenboard with a wooden frame, chalk drawing of a flower bouquet,
white chalk, chalk smudges, simple wall, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, oil painting, watercolor, glossy
\`\`\`

**色チョークを一つ。カップ**

\`\`\`
a blackboard, chalk drawing of a teacup, colored chalk, pale yellow chalk,
chalk smudges, wooden frame, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, oil painting, extra objects
\`\`\`

絵が写真のようになるときは、chalk drawing を文の前へ移し、写真の語を正向から消します。線が太すぎるときは、線画のページの細い線を一つだけ借りて、このページの粉の語は残してください。

色チョークは、最初は一色です。桃、水色、黄、を同じ強さにすると、粉が混ざって灰色になります。二色目を足すのは、一色の線が三枚同じになってからです。花とカップを同じ板に描く日も、どちらかを主にして、もう一方は小さく一つ、までです。主題が二つ同じ大きさだと、板の中央で形が融合します。`,
      },
      {
        title: 'カフェのメニューと、立て看板',
        content: `店の板は、メニューか、歩道の立て看板か、を一つにします。両方を同じ強さにすると、店の中と歩道が平均になります。

カフェのメニュー板は cafe menu board と自然な英語です。立て看板は A-frame chalkboard sign と自然な英語です。公式タグとしては断定しません。書く中身は、絵か、空白か、です。品名の文を正向に長く書くと、文字が模様になります。品名はあとから編集ソフトで足します。次の節で、その手順を分けます。

店の中に人を置く日は、成人の一人だけです。\`1 adult woman\` か \`1 adult man\` と \`adult\` を残し、服は丈のある無地です。人のいない日は、人数の語を正向から消し、負向に people を残します。

| 板 | 書き方 | 人 |
|---|---|---|
| 店内のメニュー | cafe menu board | 自然な英語。立て看板とは別の日 |
| 歩道の看板 | A-frame chalkboard sign | 自然な英語。店内とは別の日 |
| 人なし | no people | 人数の語を消す |
| 成人が一人 | \`1 adult woman\` か \`1 adult man\` | \`adult\` を残す |

**歩道の立て看板。人はいない**

\`\`\`
a wooden A-frame chalkboard sign on a sidewalk, greenboard,
colored chalk drawings of a cup and a leaf, chalk smudges,
daylight, no people, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, oil painting, glossy
\`\`\`

**店内のメニュー板。成人が一人、文字は書かない**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt, adult face,
standing beside a cafe menu board, greenboard, chalk smudges,
indoor daylight, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, oil painting, glossy, watermark
\`\`\`

看板がガラスのように光るときは、光沢の語を消して、昼のやわらかい光に戻します。メニューの皿を三品書くと、板が料理の写真になります。絵はカップ一つ、葉一つ、までです。

店の名前や、実在の標語は書きません。空白のメニューとして出して、語は編集で足します。人が立つ日は、板の横に立つか、板を指さすか、を一つにします。指さす日は holding chalk を外します。チョークと指さしを同じ強さにすると、手が二本分必要になって指が増えます。`,
      },
      {
        title: '大学の講義室で、板の前に立つ',
        content: `「黒板の前」で探すときも、学校の教室にはしません。場所は university lecture hall か、seminar room か、を自然な英語で一つです。公式タグとしては断定しません。大人向けの講座の部屋、と文でも書けます。聴いている人が要る日は、その人も成人です。人数は \`2 adults\` まで。それ以上を同じ強さにすると、顔が平均になります。

講師は、板の横に立ちます。\`standing\` と、holding chalk を自然な英語で一つ。チョークを三本持たせると、指が増えます。持つものは一本です。板の色は greenboard を一つ。机や椅子を足すなら、大学の講義室の名詞を一つまでです。部屋の部品を増やす日は、部屋のページへ移って、このページの板の語だけを持っていってください。

黒板消しは、小物として一つまでです。chalkboard eraser は自然な英語です。公式タグとしては断定しません。消しカスは chalk dust を自然な英語で一つ。粉を画面いっぱいにすると、顔が隠れます。粉は、板の下の棚に少し、までです。

| 誰 | 場所 | 小物 |
|---|---|---|
| 講師一人 | university lecture hall | holding chalk を一つ |
| 講師と、聞く大人 | seminar room | \`2 adults\`。どちらも成人 |
| 消し | chalkboard eraser | 自然な英語。棚の上に一つ |
| 粉 | chalk dust | 自然な英語。顔にはかけない |

**板の横に立つ成人の講師**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt, adult face,
standing beside a greenboard, holding chalk, university lecture hall,
soft daylight, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, oil painting, glossy, watermark
\`\`\`

**講師と、聞く大人。二人とも成人**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult, adult faces,
university lecture hall, greenboard, standing,
white blouse, long skirt, shirt, long trousers,
soft daylight, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, oil painting, glossy
\`\`\`

顔が板に溶けるときは、服を白に戻し、板を緑のままにします。黒い服と黒い板は、境目が消えます。聞く人を増やす前に、二人の顔が三枚同じになるまで待ってください。

講義室の名詞を二つ書くと、部屋が平均の廊下になります。university lecture hall を選んだ日は seminar room を消します。大人向けの講座、と文で補う日も、場所の名詞は一つです。聞く人の服は、講師と違う明度にします。二人とも白だと、誰が板の横にいるか残りません。講師を白、聞く人を紺、のように一つだけ変えてください。`,
      },
      {
        title: '文字は、あとから足す',
        content: `板の上の文字は、画像の中に書かせない方があとで読めます。生成された文字は、字形が崩れたまま残ることが多いです。2026年11月時点でも、これは起きやすいです。長文、数式、品名の一覧は、正向に書きません。

手順は四つです。板と絵だけを先に出す。文字の位置を、空白のまま残す。編集ソフトで、短い語を手で載せる。載せる語は、自分の言葉にする。店名や、実在の標語は書きません。

Stable Diffusion の負向には \`text\` を残します。ChatGPT や Gemini で短い語を試す日は、三語までにして、崩れたらその文字も消して編集に回します。短いから読める、とは書きません。崩れることがあります。公式の案内は、文章で主題を書くページです。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前はバージョンによって違うことがあります。

**文章の例。短い語は試して、崩れなら消す**

\`\`\`
Draw a dark green chalkboard with a wooden frame and a chalk drawing of a single leaf.
Leave a blank area on the right. If you add text, use only the word Leaf, in white chalk.
If the letters break, leave the board blank instead. No people.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, oil painting, watermark
\`\`\`

崩れた文字が残った枚は、保存せず、\`no text\` のファイルに戻します。編集で載せる日は、その空白のファイルを開いてください。板の中に、すでに模様になった文字があるまま編集すると、二重になります。

載せる語は、三語より短くします。品名の一覧、数式、長い挨拶は、編集でも板の中に詰めません。詰めると、チョークの絵が文字の下で消えます。位置は、板の右か下か、を一つに決めてから書きます。両方に書くと、絵の余白が無くなります。`,
      },
      {
        title: '人のいない板と、小物だけ',
        content: `背景として板だけが要る日は、人数を書きません。正向に \`1 adult\` が残っていると、端に顔が出ます。no people を文のうしろに置き、負向に people, person, face を残します。

小物は、チョークか、黒板消しか、を一つ。chalk sticks と chalkboard eraser を自然な英語で、同じ強さにしないでください。両方を残すと、棚の上で形が融合します。粉は chalk dust を一つまで。板の下に薄く置きます。

壁は simple wall を自然な英語で一つ。窓と時計と棚を同じ日に足すと、板が小さくなります。部屋の部品が要る日は [部屋のプロンプト](/guides/room-prompt-guide) へ移ります。

**板だけ。文字も人もいない**

\`\`\`
an empty greenboard with a wooden frame on a plain wall,
chalk tray, soft daylight, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, oil painting, glossy, watermark
\`\`\`

**チョークと黒板消し。板は背景**

\`\`\`
colored chalk sticks and a chalkboard eraser on a wooden tray,
chalk dust, greenboard background, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, oil painting, extra objects
\`\`\`

顔が出るときは、人数の語が正向のどこかに残っています。検索して消し、負向の people を残したまま、もう一枚出してください。

小物の日に、カフェの名詞が残っていると、看板が棚の上に出ます。店の語は消して、板と棚だけに戻します。壁の色を板と同じ緑にすると、枠が消えます。壁は薄い灰色か、木の色か、板とは違う明度にしてください。`,
      },
      {
        title: '文字が崩れる、光る、絵の具になる',
        content: `失敗は、だいたい三つです。文字が模様になる。板がガラスのように光る。チョークが絵の具になる。三つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

文字が崩れるときは、正向の文を消します。品名も、挨拶も、数式も、です。負向の \`text\` を残して、空白の板に戻します。読ませたい語は、編集ソフトで足します。短い語を ChatGPT や Gemini で試した枚も、字形が崩れていたら同じ手順です。

光るときは、glossy や glass の語が正向に残っています。消して、matte chalkboard を自然な英語で一つ足します。公式タグとしては断定しません。窓の反射を書いた日は、反射の語を外し、soft daylight に戻します。光の細目は [光・照明のプロンプト](/guides/lighting-prompt-guide) です。このページでは、板をマットに戻すところまでです。

絵の具になるときは、oil painting や watercolor が正向に残っています。消して、chalk drawing を文の前へ移します。負向に oil painting を残します。塗りのページの語を、チョークの日に混ぜないでください。粉っぽさが消えたときも、同じです。chalk smudges を一つ戻し、絵の具の語は足しません。

三枚続けて同じ崩れなら、主題を花一つに戻し、板の色と chalk drawing だけを残します。人、文字、店の名詞は、板がチョークに戻ってから一つずつです。

直す順番は、文字、光、絵の具、です。文字が模様のまま光沢を消しても、板は読めません。先に空白のファイルへ戻してから、マットの語を一つ足します。絵の具の語を消す日は、線画のページの語が混ざっていないかも見ます。細い線は借りてよいですが、水彩の語はチョークの日には残しません。`,
      },
      {
        title: '人のいる日と、板だけの日を分ける',
        content: `板だけのファイルと、人が立つファイルは、最初から分けます。人のいない枚に人数を足して上書きすると、次に背景が要るとき、端の顔が戻ってきます。背景が要る日は、人のいない枚を別名でコピーしてから人を足します。コピー元は残します。

人が立つ日は、大学の講義室か、店のメニューの横か、を一つです。両方の場所の名詞を残すと、部屋が平均の廊下になります。学校の教室を思わせる語は、どちらのファイルにも足しません。教室の黒板という探し方でここに来たときも、無地の板か、大学の講義室かを選んでください。聞く人が要るなら、その人も成人にして、二人までと書きます。三人目は足しません。

文字を編集で足す日は、空白の板のファイルだけを開きます。チョークの花がある枚に、あとから長い品名を載せると、花の上に文字が重なります。載せるなら、花を小さくした別ファイルを先に出します。短い一語を文章の道具で試した枚は、字形を見て、崩れていたら捨てます。残すのは、文字の無い板です。

粉と枠は、最後に一つだけ足します。枠が額縁になる日は、木の枠の語を外して、板の色だけに戻します。粉が顔にかかる日は、粉を棚の上だけに書き直します。この二つを同じ日に動かすと、どちらが輪郭を消したか残りません。

保存する名前は、板の色、人の有無、文字の有無、の三つが分かるものにします。緑で人なし、緑で講師、黒でメニュー、のように分けます。同じ名前で上書きすると、文字を消した枚が、文字の模様が残った枚に戻ります。店の看板を講義室のファイルへ貼らないでください。場所の名詞が二つ残ると、部屋が廊下になります。講義室の枚に残す場所は、大学の講義室だけです。`,
      },
    ],
    faq: [
      {
        q: '黒板アートはどう書きますか',
        a: 'greenboard か blackboard を自然な英語で一つ、chalk drawing を一つ、粉は chalk smudges を一つまでです。いずれも公式タグとしては断定しません。絵の具の語は正向から外します。',
      },
      {
        q: '黒板に文字を書かせられますか',
        a: '長文は書かせないでください。板と空白を先に出し、語は編集ソフトで足します。ChatGPT や Gemini で短い一語を試しても、字形は崩れることがあります。崩れたら no text の枚に戻します。',
      },
      {
        q: '教室の黒板はどこで書きますか',
        a: '学校の場面にはしません。無地の板か、university lecture hall と自然な英語で書いた大学の講義室にします。人も、講師も、聞いている人も成人です。',
      },
      {
        q: '黒板消しはどの語ですか',
        a: 'chalkboard eraser を自然な英語で一つ、棚の上に置きます。公式タグとしては断定しません。チョークの束と同じ強さにすると形が融合するので、小物は一つにしてください。粉は chalk dust を顔にかけません。',
      },
      {
        q: 'チョークが絵の具になります',
        a: 'oil painting と watercolor を正向から消し、chalk drawing を文の前へ移します。光るときは glossy を消して、matte chalkboard を自然な英語で一つ足します。',
      },
    ],
  },
  'armor-knight-prompt-guide': {
    sections: [
      {
        title: '鎧は、覆う部品から書く',
        content: `「鎧 プロンプト」「騎士 プロンプト」「姫騎士 プロンプト」「甲冑 プロンプト」で探しているのは、体を覆う武具です。検索では、板金、革、兜、マント、鎧武者、が一緒に出ます。欲しいのは、閉じた鎧です。肌の出る衣装や、壊れた板ではありません。

このページは、鎧の部品を担当します。職業の衣装の入口は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) のままです。役割は一行で分けます。入口のページは騎士も魔法使いも見渡す表、このページは鎧だけです。人型の機械の装甲は [ロボット・メカのプロンプト](/guides/robot-mecha-prompt-guide)、杖と詠唱は [魔法のプロンプト](/guides/magic-prompt-guide) です。機械と魔法陣は、鎧の日には足しません。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。姫騎士も、成人の女性です。年齢を下げる書き方は使いません。鎧の下も、板も布も、胴と腕と脚を覆います。肩の出る形、短い丈、肌を出す語は使いません。実在の作品名、ゲームの名前、作者名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。

重みは目安です。\`(armor:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(armor:1.2\\)\` と書きます。NovelAI の強調は \`{armor}\` と \`[armor]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`knight\` だけだと、鎧の形が決まりません。\`armor\` を職業の直後に置いてください。\`armor\` と \`knight\` は短い語として使われることがあります。公式タグとしては断定しません。部品は、この二つが三枚同じになってから、二つまでです。

基準の一枚は、\`knight\` と \`armor\` と城門だけにして残します。部品を足したあとに板が布へ戻ったら、この一枚へ戻ってから部品を一つずつ足します。基準が無いと、肩当てが効いたのかマントが効いたのかが分かりません。西洋の板金と、甲冑は、最初から別の基準ファイルにします。`,
      },
      {
        title: '西洋の部品',
        content: `部品は、今日見せたい場所を二つまでです。兜、肩、手、脚、胸、を全部同じ強さにすると、左右が別の形になります。

\`full armor\`、\`pauldrons\`、\`gauntlets\`、\`greaves\`、\`cape\`、\`shield\` は、短い語として使われることがあります。公式タグとしては断定しません。胸の板は breastplate、顔を覆う兜は helmet、目の覆いは visor、と自然な英語で書きます。公式タグとしては断定しません。表情が要る日は、兜を外します。visor を下ろしたまま顔の表情を書くと、目が板の上に浮きます。

マントは \`cape\` を一つ。\`cloak\` と両方を強くすると、肩の布が二重になります。盾は \`shield\` を一つ。剣と盾を同じ手に書くと、指が融合します。武器は小道具です。腰に収めた剣は sheathed sword と自然な英語で、振っている場面にはしません。手の崩れは [手・指のプロンプト](/guides/hand-finger-prompt-guide) です。このページでは、持つものを一つに減らすところまでです。

| 部品 | 書き方 | 置き方 |
|---|---|---|
| 全身 | \`full armor\` | 職業の直後。軽装とは別の日 |
| 胸 | breastplate | 自然な英語。一つ |
| 肩 | \`pauldrons\` | 左右を別の形にしない |
| 手 | \`gauntlets\` | 剣と同時に強くしない |
| 脚 | \`greaves\` | 短い語として使われることがある |
| 兜 | helmet | 自然な英語。顔を見せる日は外す |
| 覆い | visor | 自然な英語。表情の日は外す |
| マント | \`cape\` | \`cloak\` と両方強くしない |
| 盾 | \`shield\` | 片手。剣は収める |

**顔の見える板金。成人の男性**

\`\`\`
1 adult man, adult, knight, full armor, silver breastplate, pauldrons, gauntlets, greaves, adult face,
sheathed sword, standing, castle gate, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
helmet, modern clothes, extra people, torn clothes
\`\`\`

**肩と手だけを足す日。兜は外す**

\`\`\`
1 adult man, adult, knight, armor, pauldrons, gauntlets, cape, adult face,
standing, castle gate, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
helmet, modern clothes, extra people, torn clothes
\`\`\`

肩の形が左右で違うときは、肩の形容を全部外して \`pauldrons\` を一つに戻します。左右で別の色を書いても、揃いは戻りません。

盾を足す日は、腰の剣を外すか、盾を外すか、を先に決めます。sheathed sword と \`shield\` を同じ強さにすると、利き手が二役になります。顔を見せる日のファイルと、兜のファイルは分けて保存します。同じファイルで helmet を足したり外したりすると、次の枚まで覆いが残ります。`,
      },
      {
        title: '板金、革、鎖',
        content: `素材は一つです。板金と革と鎖を同じ強さにすると、表面が平均のざらつきになります。今日の鎧は、磨いた板か、革か、鎖か、です。

板金は full plate armor と自然な英語です。\`full armor\` と一緒に書く日は、どちらかを主にして、もう一方は弱くするか外します。革は leather armor と自然な英語です。公式タグとしては断定しません。革はジャケットに戻りやすいので、fantasy をうしろに一つ残し、現代の服の語は正向に置きません。軽装は light armor と自然な英語です。軽装でも、肌を出す語は足しません。布と革で、胴と腕と脚を覆います。

鎖は chainmail と自然な英語です。公式タグとしては断定しません。鎖の上に長い布を一枚乗せる日は、自然な英語で long surcoat を一つ。布の色は一つです。板金と鎖を同じ強さにすると、板の表面が網目になります。鎖の日は、板金の語を外します。

| 素材 | 書き方 | 覆い |
|---|---|---|
| 板金 | full plate armor | 自然な英語。頭から脚まで閉じる |
| 革 | leather armor | 自然な英語。現代の上着に戻ったら fantasy を残す |
| 軽装 | light armor | 自然な英語。肌を出す語は足さない |
| 鎖 | chainmail | 自然な英語。板金とは別の日 |
| 上に着る布 | long surcoat | 自然な英語。膝より長く、色は一つ |

**革。胴も腕も脚も覆う**

\`\`\`
1 adult woman, adult, knight, leather armor, long tunic, gauntlets, adult face,
standing, castle gate, full body, fantasy, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
modern clothes, extra people, torn clothes
\`\`\`

**鎖と、長い布。板金は外す**

\`\`\`
1 adult man, adult, knight, chainmail, long surcoat, adult face,
standing, castle gate, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
full plate armor, modern clothes, extra people, torn clothes
\`\`\`

革がジャケットになるときは、leather armor を人数の直後へ移し、現代の街の背景を城門に戻します。鎖が肌の模様になるときは、long surcoat を一枚足して、鎖は布の合わせ目だけに残します。

軽装の日も、板金の語は消します。light armor と full plate armor が両方あると、金属の量が平均になって、どこまで覆っているか見えません。布の色は一つです。色を三色書くと、革の形より布の色が優先されます。`,
      },
      {
        title: '成人の女性の騎士',
        content: `姫騎士は、成人の女性の騎士に、小さい冠を一つ足した呼び方です。\`1 adult woman\` と \`adult\` を残します。princess という語は、年齢が下がることがあるので、正向には置きません。冠は tiara を一つ。冠の素材の細目は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。このページでは、銀の板の上に小さい冠があるかだけを見ます。

鎧は、板金で胴と肩と腕と脚を覆います。マントは \`cape\` を一つ、色は一つです。短い丈の布や、肩の出る形は足しません。表情が要る日は兜を外し、\`adult face\` を残します。兜をかぶる日は、表情の語を外します。

男性の騎士と部品の表は共通です。服の行だけを、成人の女性の鎧に書き直します。魔法使いのローブが古いファイルに残っていると、板の上に布の袖が出ます。ローブの語は消してください。

| 誰 | 鎧 | 頭 |
|---|---|---|
| 成人の女性 | full plate armor、\`gauntlets\`、\`greaves\` | 兜は外し、\`adult face\` |
| 姫騎士 | 同じ板金、\`cape\` を一つ | tiara を一つ。princess は置かない |
| 兜をかぶる日 | 板金はそのまま | helmet を一つ。表情の語は外す |

**成人の女性。顔が見える板金**

\`\`\`
1 adult woman, adult, knight, full plate armor, silver breastplate, pauldrons, gauntlets, greaves, adult face,
sheathed sword, standing, castle gate, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
helmet, modern clothes, extra people, torn clothes
\`\`\`

**小さい冠と、マント。鎧は閉じたまま**

\`\`\`
1 adult woman, adult, knight, full plate armor, gauntlets, greaves, cape, tiara, adult face,
standing, castle gate, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
helmet, modern clothes, extra people, torn clothes
\`\`\`

冠が兜と融合するときは、tiara と helmet の一方を消します。顔を見せる日は冠だけ、顔を隠す日は兜だけです。マントの色が板金まで染まるときは、マントの色を一つに減らし、板の色を銀に戻します。

成人の女性のファイルに、男性のシャツの行が残っていたら消します。残っていると、板の下から現代の服が出ます。魔導書や杖の語も、騎士の日は残しません。魔法のページへ移る日は、鎧の部品を二つまで持っていき、冠の語は置いていきます。`,
      },
      {
        title: '甲冑と、鎧武者',
        content: `日本の甲冑は、歴史の武具として書きます。戦いの最中、壊れた板、負傷の描写は使いません。立った姿と、部品の名前だけです。敬意を欠く言い方や、実在の家の紋は書きません。

samurai armor と kabuto は、短い語として使われることがあります。公式タグとしては断定しません。大鎧のような重ねは、自然な英語で lamellar armor と書かれることがあります。これも公式タグとしては断定しません。肩の大きな板は、自然な英語で large shoulder guards を一つまで。西洋の \`pauldrons\` と両方を同じ強さにすると、肩が平均の丸い板になります。西洋の日と、甲冑の日は、ファイルを分けてください。

兜をかぶる日は kabuto を一つ。顔を見せる日は外して、\`adult face\` を残します。刀は腰に収めた小道具です。sheathed sword を自然な英語で一つ。振っている姿勢は書きません。鎧の下の服は、閉じて丈のある布です。着物の袖や袴の細目は [着物プロンプト](/guides/kimono-prompt-guide) です。このページでは、布が鎧の合わせ目から見えるかだけを見ます。男性の立ち姿の全体は [男性キャラのプロンプト](/guides/male-character-prompt-guide) です。

| 部品 | 書き方 | 場面 |
|---|---|---|
| 鎧 | samurai armor | 短い語として使われることがある |
| 兜 | kabuto | 顔を見せる日は外す |
| 重ねの板 | lamellar armor | 自然な英語。西洋の板金とは別のファイル |
| 刀 | sheathed sword | 自然な英語。腰に収める |
| 下の布 | 丈のある無地 | 着物のページへは袖が要る日だけ |

**鎧武者。兜は外して顔を見せる**

\`\`\`
1 adult man, adult, samurai armor, lamellar armor, large shoulder guards, adult face,
sheathed sword, standing, castle gate, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
kabuto, full plate armor, modern clothes, extra people, torn clothes
\`\`\`

**兜を一つ。表情の語は外す**

\`\`\`
1 adult man, adult, samurai armor, kabuto, lamellar armor,
sheathed sword, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
full plate armor, modern clothes, extra people, torn clothes
\`\`\`

西洋の胸当てが混ざるときは、breastplate と \`pauldrons\` を消し、samurai armor を人数の直後へ移します。刀が手の中で増えるときは、sheathed sword を腰の位置に書き、holding の語を外してください。

甲冑の日に金の縁を足すのは、輪郭が三枚同じになってからです。最初から彫りと金と大きな肩を同じ強さにすると、板の重なりが見えません。下の布を長くしたい日は、着物のページで袖を一つ確認してから、このページでは布の色を一つだけ残します。紋や家の名前は、布にも兜にも書きません。`,
      },
      {
        title: '色、場面、武器は小道具',
        content: `色は、地の金属を一つにしてから、縁取りを足します。銀が地なら silver armor、黒が地なら black armor、と自然な英語で書きます。公式タグとしては断定しません。金の縁は gold trim を自然な英語で一つ。銀と金を同じ強さにすると、金属が中間の色で止まります。彫りは engraved を自然な英語で、輪郭が三枚同じになってから一つ。細い線は消えやすいので、最初の一手にはしません。

場面は一つです。城門は castle gate、霧の野は foggy field、広間は throne room、と自然な英語です。公式タグとしては断定しません。霧の野は、立っているだけにします。相手も、武器を振るう姿勢も、書きません。広間も、座って休む家具ではなく、立った姿です。三つの場所を同じ強さにすると、背景が平均の灰色になります。

武器は小道具です。腰の鞘か、下げた盾か、を一つ。両方を同じ強さにすると、手が融合します。血や、壊れた板や、戦いの語は、正向にも書きません。負向には torn clothes を残して、欠けた板を防ぎます。

| 地の色 | 縁 | 場所 |
|---|---|---|
| 銀 | gold trim はあとから一つ | castle gate |
| 黒 | 金の縁は細く一つ | foggy field。立つだけ |
| 彫り | engraved は輪郭のあと | throne room。立つだけ |

**銀に、金の縁。広間で立つ**

\`\`\`
1 adult woman, adult, knight, full plate armor, silver armor, gold trim, gauntlets, greaves, adult face,
standing, throne room, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
modern clothes, extra people, torn clothes
\`\`\`

**霧の野。武器は腰に収める**

\`\`\`
1 adult man, adult, knight, full armor, black armor, cape, adult face,
sheathed sword, standing, foggy field, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
modern clothes, extra people, torn clothes
\`\`\`

金が全体に広がるときは、gold trim を外して銀だけに戻します。霧で顔が消えるときは、霧の語を弱めるか、城門に戻します。場所を変える日は、鎧の行を固定してください。

広間で座る語を足すと、板の折れが家具に負けます。立つ、だけを残します。霧の野に人を増やす日も、相手は書きません。一人の立ち姿が三枚同じになってから、場所を変えます。場所と色と武器を同じ日に動かすと、銀が効いたのか霧が効いたのかが残りません。`,
      },
      {
        title: 'アニメと写真、文章で頼む',
        content: `画風は一つです。\`anime style\` と \`photorealistic\` を同じ強さにすると、板の半分だけが別の媒体になります。アニメの日は、輪郭を残すために部品を二つまで。写真の日は、金属の名前を自然な英語で一つ足し、セル塗りの語は外します。

ChatGPT や Gemini では、成人であること、閉じた鎧、部品を二つ、場所を一つ、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

**アニメ。閉じた板金**

\`\`\`
1 adult woman, adult, knight, full plate armor, pauldrons, gauntlets, adult face,
anime style, standing, castle gate, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, modern clothes, extra people, torn clothes
\`\`\`

**文章の例。成人の女性の騎士**

\`\`\`
Draw one adult woman in closed silver plate armor, with pauldrons, gauntlets, and greaves.
She has an adult face, no helmet, and a sheathed sword at her hip.
She stands at a castle gate, full body, plain background.
The armor covers the torso, arms, and legs. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
modern clothes, extra people, torn clothes
\`\`\`

文章で通った部品は、表の二行までへ翻訳します。板金と革と鎖を全部残した翻訳は、保存しません。

文に「少し開いた鎧」や「短い布」が残っていたら、その句を消してから翻訳します。閉じた板、と書き直します。成人であることと、顔を見せるかどうかは、文からタグへ移すときも残します。兜の有無が落ちると、次の枚で表情と板が重なります。`,
      },
      {
        title: '肩が揃わない、体に溶ける、紐が多い',
        content: `失敗は、だいたい三つです。肩当てが左右で違う。板が体や服に溶ける。腰の紐が多すぎる。三つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

肩が揃わないときは、肩の形容を外して \`pauldrons\` を一つに戻します。左右で別の形、別の色、を書いた行は消します。上半身の距離の方が、肩は揃いやすいです。全身に戻すのは、肩が三枚同じになってからです。

体に溶けるときは、\`full armor\` を人数の直後へ移し、背景を無地にします。肌の色と金属の色が近いときは、金属を銀か黒の一方に決め、背景を明るい灰色にします。現代の服の語が残っていると、板の下からシャツが出ます。消して、torn clothes を負向に残します。ベルトを何本も書くと、板の境目が紐になります。ベルトは書かないか、一本です。

紐が多いときは、腰の語を全部外して、鎧とマントだけに戻します。小物のポケットや、余分な金具も、その日は足しません。一本のベルトを戻すのは、板の輪郭が戻ってからです。

三枚続けて溶けるなら、部品を \`armor\` と \`cape\` の二つに減らします。兜、盾、彫り、金の縁は、輪郭が戻ってから一つずつです。職業の入口へ戻る日は、[ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) の表で職業を一つ確認してから、このページの部品を二つだけ持ってきてください。

直す順番は、肩、溶け、紐、です。肩が揃わないまま背景を変えても、板の判定はできません。一枚ごとに、消した部品をメモへ残します。甲冑のファイルへ西洋の肩当てを持っていかないでください。持っていくなら、閉じていることと、成人であること、までです。

入口のページへ戻る日は、職業が一つであることを確認してから、部品を二つだけ持っていきます。魔法使いのローブが残ったまま \`armor\` を足すと、袖の上に板が溶けます。ロボットの関節の語も、このページには残しません。関節が要る日は、メカのページへ移って、金属の色だけを一つ借りてきます。借りるのは色の名前までです。板の部品の名前は、鎧のファイルに残します。戦いの語や、壊れた板の語は、どのページへも持っていきません。`,
      },
    ],
    faq: [
      {
        q: '姫騎士はどう書きますか',
        a: '1 adult woman と adult を残し、full plate armor で胴と腕と脚を覆います。冠は tiara を一つ、マントは cape を一つです。princess は年齢が下がることがあるので正向には置きません。肩の出る形や短い丈は使いません。',
      },
      {
        q: '甲冑と西洋の鎧は同じファイルですか',
        a: '分けてください。甲冑は samurai armor を人数の直後に置き、西洋の breastplate や pauldrons は消します。samurai armor と kabuto は短い語として使われることがあります。公式タグとしては断定しません。戦いの場面と、壊れた板は書きません。',
      },
      {
        q: '部品は一度にいくつですか',
        a: 'armor が安定してから二つまでです。兜、肩、手、脚、盾を同じ強さにすると、左右が別の形になります。顔を見せる日は helmet を外します。',
      },
      {
        q: '革の鎧が上着になります',
        a: 'leather armor を人数の直後へ移し、背景を城門に戻します。fantasy を一つ残し、現代の服の語は正向から消してください。軽装でも、肌を出す語は足しません。',
      },
      {
        q: '肩当てが左右で違います',
        a: '肩の形容を外して pauldrons を一つに戻し、左右で別の色を書かないでください。上半身で肩が揃ってから、全身に戻します。腰の紐は、書かないか一本です。',
      },
    ],
  },
}
