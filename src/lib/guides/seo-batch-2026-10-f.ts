/**
 * Sixth SEO batch (2026-10-29): art style, long hair, braids,
 * bangs, and kimono.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume stays 0 in GUIDES — exact "<topic> プロンプト" volumes are not published here.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_6_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'art-style-prompt-guide': {
    sections: [
      {
        title: '画風プロンプトの基本',
        content: `「画風 プロンプト」「絵柄 プロンプト」で必要なのは、絵の見た目を三つの層に分けて、一度に一つだけ足すことです。三つの層は、媒体・画材（何で描いたか）、塗り（色の置き方）、線（輪郭の有無と太さ）です。\`anime coloring\` と \`watercolor (medium)\` と \`photorealistic\` を同じ強さで並べると、三つの絵が一つの画面で混ざります。

画風の語は、人物の直後か、品質の語より前に置きます。後ろに長く続くと、服や背景の指定に負けて、いつもの絵に戻ります。最初の一手は、層を一つ、語を一つです。効いたら次の層を足します。

アニメ調そのものの書き方は [アニメプロンプト](/guides/anime-prompt-guide) に任せます。このページは、同じ人物のまま塗りや媒体だけを入れ替えるときの一覧です。品質の語の置き場所は [品質タグ](/guides/quality-tags-prompt-guide)、色の名前は [色プロンプト](/guides/color-prompt-guide) です。

登場人物は大人だけです。人数は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。学生の場面は使いません。

**セル塗りの土台**

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, anime coloring, cel shading, flat color
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic
\`\`\``,
      },
      {
        title: '画風・媒体の一覧',
        content: `名前は、その層の代表を一つだけ選びます。近い語を二つ強くすると、線の太さや色の数が平均に戻ります。括弧付きのタグは、画面によっては括弧を重みとして読みます。そのときは括弧を外し、うしろの語を自然な英語にしてください。

| 見た目 | 書き方 | 層 |
|---|---|---|
| アニメ塗り | \`anime coloring\`, \`cel shading\` | 塗り |
| フラット | \`flat color\` | 塗り |
| 厚塗り・筆致 | \`painterly\`, \`impasto\` | 塗り。厚い絵の具は thick painting と自然な英語でも書く |
| 水彩 | \`watercolor (medium)\` | 媒体。括弧を外すなら watercolor medium |
| 油絵 | \`oil painting (medium)\` | 媒体。oil painting でも近い |
| ガッシュ | gouache | 自然な英語。公式タグとしては断定しない |
| 色鉛筆 | colored pencil | 自然な英語 |
| スケッチ | \`sketch\` | 線 |
| インク | ink | 自然な英語 |
| 水墨 | sumi-e | 自然な英語。歴史的な画材の名前 |
| 浮世絵 | \`ukiyo-e\` | 媒体。歴史上の版画のジャンル名 |
| ドット絵 | \`pixel art\` | 媒体 |
| 3D | 3d render | 自然な英語 |
| 写真 | \`realistic\`, \`photorealistic\` | 媒体 |
| ちび | \`chibi\` | 頭身。画風とは別の層 |
| 伝統画材 | \`traditional media\` | 媒体の総称。単体だと弱いことがある |
| 絵本 | picture book illustration | 自然な英語 |

\`traditional media\` は、モデルによって効きが弱いことがあります。水彩なら \`watercolor (medium)\`、油絵なら \`oil painting (medium)\` のように、画材を一つに決めてください。

存命の作家名や、特定のスタジオの作品名では指定しません。著作と、その人の仕事の扱いの両方で、名前を借りる必要がありません。欲しいのは線の太さ、色数、影の段数、紙の質なので、上の表の語で足ります。`,
      },
      {
        title: '塗り方別のコピペ',
        content: `塗りは、影の段数で分けます。セルは影が少なく、境目がはっきりします。厚塗りは筆のあとが残り、色が絵の具のように重なります。水彩は色の端がにじみます。やわらかいグラデーションは、影の境目をぼかします。

**セル塗り・アニメ塗り**

上の基本例がセルです。\`anime coloring\` と \`cel shading\` と \`flat color\` のうち、まず二つまでにしてください。三つを同じ重みにすると、輪郭だけが太くなって顔の情報が減ります。

**厚塗り**

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, painterly, impasto, visible brush strokes
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, flat color
\`\`\`

visible brush strokes は自然な英語です。\`impasto\` だけだと絵の具の塊が背景に飛び、顔が埋まることがあります。そのときは \`painterly\` だけを残します。

**水彩**

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, watercolor (medium), traditional media
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic
\`\`\`

紙の白を残したいときは、自然な英語で paper texture を一つ足します。足して色が全部薄くなったら外してください。

**やわらかいグラデーション**

柔らかいグラデーション塗りは、自然な英語で soft gradient shading と書きます。特定の恋愛ゲームの絵柄の名前は使いません。影の色を決めるなら [色プロンプト](/guides/color-prompt-guide) で、影は紫か青かを一つだけ足します。

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, anime coloring, soft gradient shading
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, flat color, photorealistic
\`\`\``,
      },
      {
        title: '線画・モノクロ・漫画風',
        content: `線だけが欲しいときは、塗りを足しません。\`lineart\` は輪郭です。\`sketch\` は下書きの線で、\`lineart\` より途切れます。塗りつぶしの漫画にするなら \`monochrome\` か \`greyscale\` を一つ足します。両方を強くすると、灰色と黒の境界が平均になります。

線画の作例は [線画](/tag/線画)、塗り絵向けの線は [塗り絵プロンプト](/guides/ai-coloring-page-prompt) です。

**線画**

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, lineart, monochrome
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic, watercolor (medium)
\`\`\`

**漫画の一コマ**

スクリーントーンは screentone、コマ割りは manga panel と、自然な英語で書きます。公式タグとしては断定しません。文字はネガティブの \`text\` で抑えます。吹き出しの中の文は書きません。

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, monochrome, greyscale, manga panel, screentone
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic, text
\`\`\``,
      },
      {
        title: 'ドット絵・レトロゲーム風',
        content: `ドット絵は \`pixel art\` です。解像度の数字を大きくすると、ドットが細かくなって普通のイラストに戻ります。色数を減らすときは、自然な英語で limited palette と書きます。16-bit も自然な英語です。公式タグとしては断定しません。

ドットの大きさは、全身より上半身の方が揃いやすいです。全身は手足のドットが欠けます。

\`\`\`
1 adult woman, black hair, long hair, white blouse,
upper body, simple background, pixel art, limited palette, 16-bit
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic, painterly
\`\`\`

背景もドットにしたいときは、simple background を外して、自然な英語で pixel background を一つ足します。風景の名詞を三つまでは足さないでください。ドットの密度が場所ごとに変わります。`,
      },
      {
        title: '和風・浮世絵・水墨画',
        content: `和の絵は、服と画材を別の層にします。服が着物でも、塗りがセルのままなら浮世絵にはなりません。浮世絵にするなら \`ukiyo-e\` を画風の位置に置き、輪郭と色面を優先します。水墨は sumi-e と自然な英語で、色をほぼ使いません。

着物のパーツは [着物プロンプト](/guides/kimono-prompt-guide) です。この節は、同じ和服のまま版画や墨に寄せるときだけ使います。

**浮世絵**

\`\`\`
1 adult woman, black hair, hair bun, kimono, obi,
standing, simple background, ukiyo-e, flat color
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic
\`\`\`

水墨は色の語を外し、sumi-e, ink, monochrome を自然な英語とタグで一つずつ足します。\`ukiyo-e\` と sumi-e は同時に強くしないでください。版画の色面と、墨のにじみが打ち消し合います。`,
      },
      {
        title: '同じキャラで画風だけ変える',
        content: `比較するときは、人物・服・姿勢・背景を固定し、最後の画風だけを差し替えます。下の六つは同じ成人です。一度に一つを生成し、混ざったら前の画風の語を消してから次を試します。

\`\`\`
1 adult woman, black hair, long hair, white blouse, standing, simple background, anime coloring, cel shading
1 adult woman, black hair, long hair, white blouse, standing, simple background, painterly, impasto
1 adult woman, black hair, long hair, white blouse, standing, simple background, watercolor (medium)
1 adult woman, black hair, long hair, white blouse, standing, simple background, oil painting (medium)
1 adult woman, black hair, long hair, white blouse, standing, simple background, pixel art
1 adult woman, black hair, long hair, white blouse, standing, simple background, ukiyo-e
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

写真風に振るときは、最後の語を \`photorealistic\` に替え、\`flat color\` と \`anime coloring\` を残しません。ちびにするときは \`chibi\` だけを足し、頭身と同時に \`photorealistic\` を置きません。`,
      },
      {
        title: 'ChatGPT・Gemini・Midjourney の自然文',
        content: `ChatGPT と Gemini は、タグの列より一つの文の方が安定します。Midjourney も同じ文で始め、パラメータは [Midjourney プロンプト](/guides/midjourney-prompt-guide) 側で足します。Stable Diffusion と NovelAI では、上のタグ例に戻してください。モデルごとの順序は [Stable Diffusion プロンプト](/guides/stable-diffusion-prompt-guide) と [Illustrious プロンプト](/guides/illustrious-prompt-guide) です。

\`\`\`
An adult woman with long black hair and a white blouse, standing against a plain background.
Paint the same person as a watercolor illustration with soft paper grain.
Keep the face, clothes, and pose. Change only the medium.
Avoid: ${NEGATIVE_AGE}
\`\`\`

同じ文の medium を oil painting、pixel art、ukiyo-e print に替えて比較します。作家の名前や「あのスタジオのように」は書きません。線が太い、影が二段、色が少ない、と特徴で書いてください。

Illustrious や NovelAI は Danbooru に近いタグの方が反応し、ChatGPT と Gemini は文の方が反応します。SD1.5 は短いタグ、SDXL は文とタグの中間、というようにモデルの癖が違います。同じ文を三つのモデルに貼っても、同じ絵にはなりません。`,
      },
      {
        title: '効かない・混ざるときの直し方',
        content: `混ざるときは、画風を一つに戻します。重みを付けるなら \`(watercolor (medium):1.1)\` から \`(watercolor (medium):1.3)\` までです。括弧が二重になる画面では、重みをやめて語順だけを前に動かしてください。1.4 を超えると、画面の端までその質感で埋まります。

打ち消し合う組は、同時に置かないでください。

| 残す | 外す |
|---|---|
| \`photorealistic\` | \`flat color\`, \`anime coloring\`, \`cel shading\` |
| \`lineart\` | \`impasto\`, \`photorealistic\` |
| \`pixel art\` | \`painterly\`, \`watercolor (medium)\` |
| \`ukiyo-e\` | \`photorealistic\`, sumi-e |

モデル自体が写真寄り、またはアニメ寄りだと、逆のタグは効きが弱いことがあります。そのときはタグを増やすより、モデルを変えます。追加学習（LoRA など）で画風を足す場合も、プロンプト側の画風は一つに減らしてから足します。学習データの名前の一覧は、このページでは扱いません。

**混ざったあとの戻し方**

\`\`\`
1 adult woman, black hair, long hair, white blouse,
standing, simple background, (watercolor (medium):1.2)
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, photorealistic, anime coloring
\`\`\`

作家名で指定しない理由は、名前がその人の作品の代替になるからです。線の数、影の段、紙か絵の具か、を自分の語で書いてください。`,
      },
    ],
    faq: [
      {
        q: '画風はプロンプトのどこに置きますか？',
        a: '人物の直後、品質の語より前です。後ろに長いと服や背景に負けます。層は媒体・塗り・線のどれか一つから足してください。',
      },
      {
        q: '作家名やスタジオ名を書いてもよいですか？',
        a: '書きません。存命の作家や特定のスタジオの名前は、著作と仕事の扱いの両方で借りる必要がありません。線の太さ、色数、影の段数、画材の名前で指定します。',
      },
      {
        q: 'アニメ塗りとセル塗りの違いは何ですか？',
        a: '`anime coloring` はアニメの彩色全般、`cel shading` は影の境目がはっきりした塗りです。`flat color` はさらに面が平坦です。アニメ調そのものは [アニメプロンプト](/guides/anime-prompt-guide) を見てください。',
      },
      {
        q: '厚塗りがフラットな塗りに戻ります',
        a: '`painterly` を画風の位置に置き、ネガティブに `flat color` を入れてください。`impasto` で顔が埋まるときは外します。重みは 1.1 から 1.3 までです。',
      },
      {
        q: 'Illustrious と NovelAI で同じタグですか？',
        a: 'Danbooru に近いタグはどちらでも土台になります。括弧付きの媒体名は、画面によって重みと衝突します。効かないときは括弧を外して自然な英語にしてください。順序の詳細は [Illustrious プロンプト](/guides/illustrious-prompt-guide) です。',
      },
      {
        q: '線画だけにして、色を消したいです',
        a: '`lineart` と `monochrome` を置き、水彩や写真の語をネガティブに入れてください。塗り絵用の線は [塗り絵プロンプト](/guides/ai-coloring-page-prompt)、作例は [線画](/tag/線画) です。',
      },
    ],
  },

  'long-hair-prompt-guide': {
    sections: [
      {
        title: 'ロングヘアプロンプトの基本',
        content: `「ロングヘア プロンプト」「ストレートヘア プロンプト」は、長さ、質感、前髪、色の順に書きます。長さを最後に置くと、服の指定に負けて肩で止まります。\`long hair\` を髪色の直後に置いてください。

質感は straight hair のように長さのうしろです。前髪は [前髪プロンプト](/guides/bangs-prompt-guide)、色の名前の一覧は [髪色プロンプト](/guides/hair-color-prompt-guide) です。髪型の全体は [髪型プロンプト](/guides/hairstyle-prompt-guide)、作例のタグは [ロングヘア](/tag/ロングヘア) です。

登場人物は大人です。\`1 adult woman\` から書き、\`adult\` を残します。服はブラウスやジャケットなど、大人の日常着を一つ足します。

**ストレートのロング**

\`\`\`
1 adult woman, long hair, straight hair, black hair, bangs,
white blouse, upper body, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair
\`\`\`

公開作例は [ストレートの黒髪ロング](/prompt/straight-long-black-hair-glossy) です。`,
      },
      {
        title: '長さの一覧',
        content: `長さの名前は、届く位置の目安です。どこまで描かれるかはモデルで変わります。目安を三つ重ねると、中間の長さに平均されます。一つだけ選んでください。

| 日本語 | 英語 | 届く位置の目安 |
|---|---|---|
| ミディアム | \`medium hair\` | 肩のあたり。ロングではない |
| ロング | \`long hair\` | 胸より下。最初の一手 |
| 超ロング | \`very long hair\` | 腰のあたりまで、という目安 |
| さらに長い | \`absurdly long hair\` | 画面の下まで。全身でないと切れやすい |

\`very long hair\` と \`absurdly long hair\` は、\`long hair\` に足す形でも、\`long hair\` を置き換える形でも通ります。両方を同じ強さにすると、長さがコマごとに変わります。まずは \`long hair\` だけにしてください。

**腰までの長さ**

\`\`\`
1 adult woman, very long hair, straight hair, black hair,
white blouse, full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, medium hair
\`\`\`

上半身の構図では、腰までの髪は枠で切れます。長さを見せるなら full body か、自然な英語の cowboy shot にして、髪の先が画面に入るようにします。`,
      },
      {
        title: 'ストレートヘア',
        content: `ストレートは \`straight hair\` です。\`long hair, straight hair\` の順に置きます。毛先が内側に入る、外にはねる、は自然な英語で inward ends または flipped ends と一つだけ足します。公式タグとしては断定しません。

艶は silky、sleek、glossy と自然な英語で書きます。三つ並べると、光が面になって顔まで光ります。一つにして、光は soft daylight か window light のどちらか一方です。

姫カットは \`hime cut\` です。前髪のぱっつんと、頬の横の毛がセットになっています。\`hime cut\` に \`blunt bangs\` を同じ強さで足すと、前髪が二重になります。前髪を細かく変えるときは [前髪プロンプト](/guides/bangs-prompt-guide) に任せ、\`hime cut\` は外します。

\`\`\`
1 adult woman, long hair, straight hair, hime cut, black hair,
white blouse, upper body, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, wavy hair
\`\`\``,
      },
      {
        title: '黒髪ロング',
        content: `黒髪は \`black hair\` です。\`long hair, straight hair, black hair\` で、暗い茶色との境目が安定します。\`black hair\` を服より後ろに置くと、服の色が髪に混ざります。

暗い茶色にしたいときは \`black hair\` を外し、自然な英語で dark brown hair と書きます。青みを足すなら、[髪色プロンプト](/guides/hair-color-prompt-guide) の青や銀の節を見て、このページの長さの指定は残してください。

艶のある黒髪は、自然な英語の glossy を一つ足します。夜のシーンで全体を暗くすると、黒髪が背景に溶けます。背景は明るい単色か、昼の窓にしてください。

\`\`\`
1 adult woman, long hair, straight hair, black hair, glossy hair,
white blouse, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, blonde hair
\`\`\`

glossy hair は自然な英語です。\`black hair\` の直後に置いて、服の光沢と分けます。`,
      },
      {
        title: 'ウェーブ・巻き髪のロング',
        content: `ゆるい波は \`wavy hair\` です。\`long hair\` のうしろに置きます。強い巻きは curly hair と自然な英語で書きます。公式タグとしては断定しません。\`wavy hair\` と curly hair を同時に強くすると、毛先だけが別の髪型になります。

ゆるく広がる波は loose waves と自然な英語です。\`straight hair\` を残したまま足さないでください。ストレートの指定が勝って、波が消えます。

\`\`\`
1 adult woman, long hair, wavy hair, dark brown hair,
white blouse, upper body, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, straight hair
\`\`\`

パーマの名前や、サロンの施術名は書きません。波の大きさは、ゆるいか強いかの二択で足ります。`,
      },
      {
        title: 'ロングヘアのアレンジ',
        content: `下ろしたロングを、結ぶ・編む・二つに分ける、に変えるときは、長さのタグを残したまま結び方を一つ足します。結び方を二つにすると、結び目が二箇所できます。

| アレンジ | 書き方 | 詳しいページ |
|---|---|---|
| ポニーテール | \`ponytail\` | このページの例 |
| 半分上げる | half up half down | 自然な英語 |
| お団子 | \`hair bun\` | 長さを残すなら \`long hair\` も |
| 編み込み | \`braid\` | [編み込みプロンプト](/guides/braid-prompt-guide) |
| 二つ | \`twintails\` | [ツインテールプロンプト](/guides/twintail-prompt-guide) |

リボンは \`hair ribbon\` を一つです。髪飾りの種類は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。

**ポニーテール（長さを残す）**

\`\`\`
1 adult woman, long hair, ponytail, straight hair, black hair,
hair ribbon, white blouse, upper body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, twintails
\`\`\`

半分上げるは half up half down と自然な英語で、\`ponytail\` とは同時に強くしません。`,
      },
      {
        title: '動き・シーン',
        content: `長さを絵で見せるときは、髪が動く理由を一つ足します。風は wind と \`flowing hair\` です。\`flowing hair\` はタグとして書いてよいです。風の語を三つにすると、背景の布まで全部なびきます。

後ろ姿は from behind と自然な英語です。毛先がどこまで届くかを見せる構図です。振り返りは looking back と自然な英語で、顔と髪の両方を残します。座って肩に髪を落とすときは sitting と、自然な英語で hair over one shoulder を足します。

**風**

\`\`\`
1 adult woman, very long hair, straight hair, black hair,
flowing hair, wind, white blouse, full body, standing, outdoors
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair
\`\`\`

**後ろから長さを見せる**

\`\`\`
1 adult woman, very long hair, straight hair, black hair,
white blouse, from behind, full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair
\`\`\`

**座って肩に落とす**

\`\`\`
1 adult woman, long hair, straight hair, black hair,
sitting, hair over one shoulder, white blouse, upper body, window light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair
\`\`\`

hair over one shoulder は自然な英語です。\`hair over one eye\` とは別なので、前髪で目を隠したいときと混ぜないでください。`,
      },
      {
        title: '崩れ対策',
        content: `ロングが途中で切れるときは、枠が原因です。upper body のまま \`very long hair\` を書いても、胸より下は描かれません。full body か cowboy shot に変えて、毛先を画面の中に入れてください。

髪が服と溶けるときは、髪と服の色を分けます。黒髪に黒い服だと境界が消えます。\`white blouse\` のように、髪と明度の違う服を一つ残します。それでも溶けるときは、髪の指定をプロンプトの前の方へ動かし、服の色の語を減らします。

長さがコマごとに変わるときは、長さのタグが二つ以上ないかを見ます。\`long hair\` と \`medium hair\` が両方あると、中間で揺れます。欲しい長さ以外はネガティブへ移します。

**枠で切れたあとの直し**

\`\`\`
1 adult woman, very long hair, straight hair, black hair,
white blouse, full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, medium hair
\`\`\`

前髪だけを別に決めたいときも、長さのタグは残したまま [前髪プロンプト](/guides/bangs-prompt-guide) の形を一つ足します。`,
      },
      {
        title: 'ChatGPT・Gemini の自然文',
        content: `ChatGPT と Gemini では、タグの列を一つの文にします。長さ、質感、前髪、色の順は同じです。Stable Diffusion や NovelAI では、上のタグ例に戻してください。

\`\`\`
An adult woman with very long, straight black hair past the waist,
blunt bangs, and a white blouse. Full body, standing, plain background.
Show the ends of the hair inside the frame.
Avoid: ${NEGATIVE_AGE}
\`\`\`

自分の写真で髪の長さだけを試すときは、顔と服と背景を残す文にします。人物は成人です。

\`\`\`
Edit only the hair of the adult in this photo.
Keep the face, clothes, and background.
Change the hair to long straight black hair past the shoulders.
Do not change the person's age. Avoid: ${NEGATIVE_AGE}
\`\`\`

写真の人物が成人であることを確認してから使ってください。髪色を同時に変えると、顔の色まで動くことがあります。長さだけ、色だけ、と一回に一つにしてください。`,
      },
    ],
    faq: [
      {
        q: 'long hair と very long hair の違いは何ですか？',
        a: '`long hair` は胸より下のロング、`very long hair` は腰あたりまでの目安です。届く位置はモデルで変わります。両方を同じ強さにすると長さが揺れます。',
      },
      {
        q: '髪が画面の途中で切れます',
        a: '上半身の構図では腰までの髪は枠の外です。`full body` か cowboy shot にして、ネガティブに `short hair` を入れてください。',
      },
      {
        q: '姫カットにしたいです',
        a: '`hime cut` を `long hair, straight hair` のうしろに置きます。`blunt bangs` を同じ強さで足すと前髪が二重になります。前髪だけ変えるときは [前髪プロンプト](/guides/bangs-prompt-guide) です。',
      },
      {
        q: 'ストレートが波になってしまいます',
        a: '`straight hair` を長さの直後に置き、`wavy hair` をネガティブに入れてください。glossy などの艶の語は一つまでです。',
      },
      {
        q: '黒髪が背景に溶けます',
        a: '背景を明るい単色か昼の窓にし、服は白や明るい色にしてください。`black hair` は髪色の位置、つまり長さの近くに置きます。',
      },
    ],
  },

  'braid-prompt-guide': {
    sections: [
      {
        title: '編み込みプロンプトの基本',
        content: `「編み込み プロンプト」「三つ編み プロンプト」で \`braid\` だけを書くと、一本のときと二本のときが毎回変わります。本数と、頭のどこにあるかを一緒に指定してください。

基本は \`braid\` です。一本なら \`single braid\`、二本なら \`twin braids\` に置き換えます。\`braid\` と \`twin braids\` を同じ強さで残すと、結びが二重になります。

登場人物は大人です。\`1 adult woman\` から書き、服は大人のブラウスにします。髪型の全体は [髪型プロンプト](/guides/hairstyle-prompt-guide)、長い髪との組み合わせは [ロングヘアプロンプト](/guides/long-hair-prompt-guide) です。

**一本に決めた三つ編み**

\`\`\`
1 adult woman, long hair, single braid, black hair,
white blouse, from side, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, twintails, ponytail
\`\`\`

横から見る理由は、正面だと編み目が顔の前に落ちて、本数が分かりにくくなるからです。`,
      },
      {
        title: '本数で選ぶ',
        content: `本数は一つだけ書きます。\`single braid\` と \`twin braids\` を両方置くと、三本に見えることがあります。

| 本数 | 英語 | 注記 |
|---|---|---|
| 一本 | \`single braid\` | 後ろか横。正面だと前に落ちやすい |
| 二本 | \`twin braids\` | 左右。おさげはこれに低い位置を足す |
| たくさん | multiple braids | 自然な英語。公式タグとしては断定しない |

おさげは、二本を低く下ろした形です。\`twin braids\` に、自然な英語で low, resting on the shoulders を足します。結ぶだけで編まないおさげは [ツインテールプロンプト](/guides/twintail-prompt-guide) の \`low twintails\` です。編むならこのページ、結ぶだけなら向こう、と分けてください。

**二本（低めのおさげ）**

\`\`\`
1 adult woman, long hair, twin braids, low, resting on the shoulders,
black hair, hair ribbon, white blouse, upper body, from front
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, single braid, ponytail
\`\`\`

low と resting on the shoulders は自然な英語です。\`low twintails\` と同時に強くすると、編んだ束と結んだ束が両方出ます。`,
      },
      {
        title: '位置で選ぶ',
        content: `位置の語は一つです。後ろ、横、前、前髪、頭頂、と同時に指定すると、編み目が頭を一周します。

| 位置 | 書き方 | 注記 |
|---|---|---|
| 後ろ | back braid | 自然な英語。\`single braid\` と from behind |
| 横 | \`side braid\` | 片方の肩 |
| 前 | front braid | 自然な英語。顔の前に垂らすときだけ |
| 前髪 | \`braided bangs\` | 前髪だけ編む。長さは短くてよい |
| 頭頂 | \`crown braid\` | 頭の周り。正面より斜め |
| フレンチ | \`french braid\` | 後頭部から編み込む |
| 横の毛 | braided sidelocks | 自然な英語。頬の横だけ |

公開作例は [横の編み込み](/prompt/braid-sidelocks-body-markings) と [フレンチブレイドのロング](/prompt/french-braid-blonde-long-hair) です。体の模様や特定の作品の要素は、このページの例には入れません。

**横**

\`\`\`
1 adult woman, long hair, side braid, brown hair,
white blouse, from side, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, twin braids
\`\`\`

**フレンチ（後頭部）**

\`\`\`
1 adult woman, long hair, french braid, blonde hair,
white blouse, from behind, upper body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, twin braids, ponytail
\`\`\`

\`crown braid\` は斜め前か斜め後ろで頭の輪が見えるようにします。正面だけだと輪が髪の中に隠れます。braided sidelocks は自然な英語で、\`side braid\` とは別です。頬の横の毛だけを編むときに使い、太い一本と同時に強くしません。`,
      },
      {
        title: 'まとめ髪のアレンジ',
        content: `編んだあとに結ぶ形は、\`braided bun\` か \`braided ponytail\` のどちらか一つです。両方を書くと、お団子とテールが同時に出ます。半分だけ上げて編む形は half up braid と自然な英語です。\`ponytail\` とは同時に強くしません。

リボンは \`hair ribbon\` を一つ、編み目の根元か毛先に足します。髪飾りの素材は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。和装の簪と一緒にするときは [着物プロンプト](/guides/kimono-prompt-guide) を見て、リボンと簪を同じ強さにしないでください。

**編んだお団子**

\`\`\`
1 adult woman, long hair, braided bun, black hair, hair ribbon,
white blouse, from side, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, ponytail, twintails
\`\`\`

\`braided ponytail\` に替えるときは、\`braided bun\` を消してから置き換えます。毛先を見せたいなら from side を残します。`,
      },
      {
        title: '長さ・髪色との組み合わせ',
        content: `一本の太い三つ編みは、\`long hair\` がないと肩で終わります。短い髪で編むなら、前髪の \`braided bangs\` の方が形が残ります。\`long hair, single braid\` と \`short hair, braided bangs\` を混ぜないでください。

色は長さの近くに置きます。金と黒を同時に書くと、メッシュに寄ります。一色にするなら [髪色プロンプト](/guides/hair-color-prompt-guide) の単色を一つだけ足します。このページでは色の名前を増やしません。

\`\`\`
1 adult woman, long hair, single braid, black hair,
white blouse, from side, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short hair, blonde hair
\`\`\`

短い前髪の編み込みは、\`long hair\` を外して \`braided bangs\` と \`medium hair\` にします。長さのガイドは [ロングヘアプロンプト](/guides/long-hair-prompt-guide) です。`,
      },
      {
        title: '三つ編みを見せる構図',
        content: `正面で \`single braid\` を書くと、編み目が胸の前に垂れて、服の模様と混ざります。横は from side、後ろは from behind、振り返りは looking back と自然な英語で書きます。上半身で足りるのは、頭の編み目を見せるときだけです。毛先まで見せるなら full body にします。

姿勢の語の置き方は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。腕を組むなど、髪と手が重なる姿勢は、編み目が確認できてから足します。

\`\`\`
1 adult woman, long hair, french braid, brown hair,
white blouse, from behind, looking back, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, ponytail
\`\`\`

from behind と looking back は自然な英語です。顔を完全に消したいときは looking back を外します。`,
      },
      {
        title: '男性キャラの編み込み',
        content: `男性も成人です。\`1 adult man\` から書き、\`adult\` を残します。横の一本は \`side braid\`、長さは \`long hair\` です。ファンタジーの服にするときは、自然な英語で fantasy tunic のように服を一つ足し、鎧の部品を三つ以上並べません。部品が増えると編み目が金属に溶けます。

\`\`\`
1 adult man, long hair, side braid, brown hair,
fantasy tunic, from side, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, twintails
\`\`\`

fantasy tunic は自然な英語です。女性の例とタグを混ぜると、顔が中間の形になります。人数の語は \`1 adult man\` のままにしてください。`,
      },
      {
        title: '崩れ対策',
        content: `正面で編み目が前に落ちるときは、プロンプトを from side か from behind に変えます。本数が増えるときは、\`single braid\` と \`twin braids\` のどちらが残っているかを見て、要らない方をネガティブに入れます。

髪が服に溶けるときは、髪と服の明度を分け、手や持ち物を一旦外します。リボンを二つにすると、編み目の途中に輪が余分に出ます。\`hair ribbon\` は一つです。

**本数を一本に戻す**

\`\`\`
1 adult woman, long hair, single braid, black hair,
white blouse, from side, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, twin braids, twintails, ponytail
\`\`\`

前髪の編み込みが目に食い込むときは、[前髪プロンプト](/guides/bangs-prompt-guide) を見て、\`hair over eyes\` をネガティブに入れてください。`,
      },
      {
        title: 'ChatGPT・Gemini の自然文',
        content: `自然文でも、本数と位置を文の前半に置きます。\`braid\` に相当する語だけだと、モデルが一本と二本を往復します。

\`\`\`
An adult woman with long black hair in one single braid over her left shoulder,
seen from the side, white blouse, plain background.
Show the braid clearly. Do not add a second braid.
Avoid: ${NEGATIVE_AGE}
\`\`\`

二本のおさげにするときは one single braid を two low braids resting on the shoulders に替えます。Stable Diffusion や NovelAI では \`single braid\` か \`twin braids\` のタグ例に戻してください。写真の髪だけを編むときも、成人の写真であることを確認し、顔と服は残す、と書きます。`,
      },
    ],
    faq: [
      {
        q: 'braid だけだと形が毎回変わります',
        a: '本数を `single braid` か `twin braids` に決めて、`braid` との二重指定をやめてください。位置は from side か from behind で見せます。',
      },
      {
        q: 'おさげはどのタグですか？',
        a: '編むなら `twin braids` に、低い位置を自然な英語で足します。結ぶだけで編まない場合は [ツインテールプロンプト](/guides/twintail-prompt-guide) の `low twintails` です。',
      },
      {
        q: 'フィッシュボーンにしたいです',
        a: 'fishtail braid は自然な英語です。公式タグとしては断定しません。`single braid` のうしろに一つ足し、`twin braids` とは同時に強くしないでください。',
      },
      {
        q: '正面だと三つ編みが前に垂れます',
        a: 'from side か from behind に変えてください。前に垂らすのが目的のときだけ、front braid を自然な英語で足します。',
      },
      {
        q: '一本のはずが二本になります',
        a: '`twin braids` と `twintails` をネガティブに入れ、ポジティブは `single braid` だけにしてください。',
      },
    ],
  },

  'bangs-prompt-guide': {
    sections: [
      {
        title: '前髪プロンプトの基本',
        content: `「前髪 プロンプト」は、\`bangs\` だけでは形が決まりません。形、量、透け、分け目を一つずつ足し、髪全体の長さと一緒に書きます。前髪だけを最後に置くと、長さの指定に負けて眉までしか残りません。\`bangs\` は長さの直後です。

長さのページは [ロングヘアプロンプト](/guides/long-hair-prompt-guide)、髪型の全体は [髪型プロンプト](/guides/hairstyle-prompt-guide) です。目の形と一緒に調整するときは [表情プロンプト](/guides/stable-diffusion-expression-prompt) を見て、前髪のタグと目を隠すタグを同時に強くしないでください。

登場人物は大人です。\`1 adult woman\` から書き、\`adult\` を残します。

**ぱっつんの土台**

\`\`\`
1 adult woman, long hair, straight hair, black hair, blunt bangs,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, hair over eyes
\`\`\``,
      },
      {
        title: '形の一覧',
        content: `形のタグは一つです。\`blunt bangs\` と \`swept bangs\` を同じ強さにすると、左右で別の前髪になります。

| 形 | 書き方 | 注記 |
|---|---|---|
| 前髪（総称） | \`bangs\` | 形は決まらない。次の行を一つ足す |
| ぱっつん | \`blunt bangs\` | ラインがまっすぐ |
| 流し | \`swept bangs\` | 横に流す |
| 分け目 | \`parted bangs\` | 左右に分かれる |
| 目のあいだ | \`hair between eyes\` | 中央の隙間 |
| 交差 | \`crossed bangs\` | 中央で交差。モデルによって効きが弱いことがある |
| 非対称 | \`asymmetrical bangs\` | 左右で長さが違う |
| 片目 | \`hair over one eye\` | 片方の目を隠す。隠したくないときはネガティブへ |
| 両目 | \`hair over eyes\` | 両目が隠れる。通常はネガティブ |
| 前髪を編む | \`braided bangs\` | [編み込みプロンプト](/guides/braid-prompt-guide) |
| 長い前髪 | long bangs | 自然な英語 |
| 短い前髪 | short bangs | 自然な英語 |
| シースルー | see-through bangs, wispy bangs | 自然な英語。公式タグとしては断定しない |
| カーテン | curtain bangs | 自然な英語。センター分けに近い |

\`crossed bangs\` は、モデルによって効きが弱いことがあります。効かないときは外して、\`parted bangs\` か \`hair between eyes\` に戻してください。`,
      },
      {
        title: 'ぱっつん・姫カット',
        content: `ぱっつんは \`blunt bangs\` です。眉にかかる長さにしたいときは、自然な英語で eyebrow-length を一つ足します。足して目が完全に隠れたら外し、ネガティブの \`hair over eyes\` を残します。

姫カットは \`hime cut\` です。ぱっつんと、頬の横の長い毛がセットです。\`hime cut\` と \`blunt bangs\` を同じ強さで重ねると、前髪が二枚になります。姫カットが目的なら \`hime cut\` を優先し、前髪の微調整が目的なら \`blunt bangs\` を優先します。

**姫カット**

\`\`\`
1 adult woman, long hair, straight hair, hime cut, black hair,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, hair over eyes, swept bangs
\`\`\`

M字に近い形は、自然な英語で M-shaped bangs と書きます。公式タグとしては断定しません。\`hair intakes\` は頬の横に残る毛で、M字そのものではありません。触角のように横へ出すときは \`hair intakes\` を一つ足し、\`blunt bangs\` とはどちらを主役にするかを決めてください。`,
      },
      {
        title: '分け目・センター分け・流し前髪',
        content: `分け目は \`parted bangs\` です。中央で分けるセンター分けは、自然な英語で center part を足します。\`parted bangs\` だけだと、分け目の位置が左右に揺れます。七三に近い横分けは、自然な英語で side part と \`swept bangs\` です。center part と side part は同時に置かないでください。

**流し前髪**

\`\`\`
1 adult woman, long hair, black hair, swept bangs,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, blunt bangs, hair over eyes
\`\`\`

**センター分け**

\`\`\`
1 adult woman, long hair, brown hair, parted bangs, center part,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, blunt bangs, hair over eyes
\`\`\`

center part は自然な英語です。シースルーにするときは \`blunt bangs\` を外し、see-through bangs を自然な英語で一つ足します。カーテンのような分けは curtain bangs と自然な英語で、\`parted bangs\` と近いので両方を強くしません。`,
      },
      {
        title: 'おでこ出し・前髪なし',
        content: `前髪を上げて額を見せるときは、\`bangs\` をポジティブから外します。額は \`forehead\` です。髪を後ろへまとめるのは \`hair pulled back\` です。オールバックに近い形は hair slicked back と自然な英語で書きます。公式タグとしては断定しません。

\`forehead\` と \`blunt bangs\` を同時に強くすると、前髪がある絵とない絵が混ざります。上げるなら、前髪の形タグは全部ネガティブへ移します。

\`\`\`
1 adult woman, long hair, black hair, forehead, hair pulled back,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, bangs, blunt bangs, hair over eyes
\`\`\`

短く刈った横は \`sidelocks\` を外したいときだけネガティブに入れます。残したいときは書かずに、\`hair pulled back\` だけにしてください。`,
      },
      {
        title: '男性キャラの前髪',
        content: `男性も成人です。\`1 adult man\` から書きます。センター分け、流し、オールバックは、女性の例と同じタグです。顔の語を女性の例からコピーすると、中間の顔になります。服はシャツを一つにして、前髪の指定を先に置いてください。

**流し（男性）**

\`\`\`
1 adult man, short hair, swept bangs, black hair,
shirt, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, blunt bangs, hair over eyes
\`\`\`

オールバックは \`forehead, hair slicked back\` を自然な英語とタグで書き、\`bangs\` をネガティブに入れます。センター分けは \`parted bangs, center part\` です。三つを一つのプロンプトにまとめないでください。`,
      },
      {
        title: 'リアル写真風と自然文',
        content: `写真風は \`photorealistic\` を画風の位置に置き、\`bangs\` の形は一つ残します。アニメの \`flat color\` と同時に強くすると、肌が平面のまま髪だけ写真になります。画風の入れ替えは [画風プロンプト](/guides/art-style-prompt-guide) です。

\`\`\`
1 adult woman, long hair, brown hair, see-through bangs,
white blouse, portrait, photorealistic, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, hair over eyes, flat color
\`\`\`

see-through bangs は自然な英語です。

ChatGPT と Gemini では文にします。

\`\`\`
An adult woman, portrait photo, long brown hair with light see-through bangs
that do not cover the eyes, white blouse, plain background.
Avoid: ${NEGATIVE_AGE}
\`\`\`

自分の写真で前髪だけを変えるときは、成人の写真であることを確認します。

\`\`\`
Edit only the bangs of the adult in this photo.
Keep the face, hair color, clothes, and background.
Change the bangs to straight blunt bangs above the eyes.
Do not change the person's age. Avoid: ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '崩れ対策',
        content: `目が隠れるときは、\`hair over eyes\` をネガティブに入れます。片目だけ隠したいときは、ポジティブに \`hair over one eye\` を残し、\`hair over eyes\` はネガティブのままにします。両方をポジティブに置くと、両目が隠れます。

前髪が無視されるときは、\`bangs\` を長さの直後へ動かし、重みは \`(blunt bangs:1.1)\` から \`(blunt bangs:1.2)\` までです。1.3 を超えると、前髪が顔の半分を覆います。形のタグが二つあるときは、一つに減らしてから重みを付けてください。

**目を隠さない直し**

\`\`\`
1 adult woman, long hair, black hair, (blunt bangs:1.2),
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, hair over eyes, hair over one eye
\`\`\`

分け目とぱっつんが混ざるときも、同じ手順です。残す形を一つにして、外す形をネガティブに入れます。`,
      },
      {
        title: '他の髪型との組み合わせ',
        content: `前髪は、長さや結びとは別の層です。ロングは [ロングヘアプロンプト](/guides/long-hair-prompt-guide)、編み込みは [編み込みプロンプト](/guides/braid-prompt-guide)、二つに分ける髪型は [ツインテールプロンプト](/guides/twintail-prompt-guide)、色は [髪色プロンプト](/guides/hair-color-prompt-guide) です。ボブは [髪型プロンプト](/guides/hairstyle-prompt-guide) の短い髪に、このページの形を一つ足します。

結びと前髪を同時に変えるときは、結びを先に安定させてから前髪を足します。一度に両方を強くすると、前髪が結び目に吸い込まれます。

**ロング＋ぱっつん（結びなし）**

\`\`\`
1 adult woman, long hair, straight hair, black hair, blunt bangs,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, hair over eyes, ponytail
\`\`\`

ツインテールに前髪を足すときは \`twintails, blunt bangs\` の順ではなく、長さ、\`twintails\`、\`blunt bangs\` の順にします。\`hair ribbon\` は一つまでです。`,
      },
    ],
    faq: [
      {
        q: 'bangs だけだとどんな前髪になりますか？',
        a: '形が毎回変わります。ぱっつんは `blunt bangs`、流しは `swept bangs`、分け目は `parted bangs` のどれか一つを足してください。',
      },
      {
        q: '前髪で目が隠れます',
        a: 'ネガティブに `hair over eyes` を入れてください。片目だけ隠すときだけ、ポジティブに `hair over one eye` を残します。',
      },
      {
        q: 'シースルーバングはどのタグですか？',
        a: 'see-through bangs または wispy bangs と自然な英語で書きます。公式タグとしては断定しません。`blunt bangs` と同時に強くすると、厚いぱっつんに戻ります。',
      },
      {
        q: '男性の前髪はどう書きますか？',
        a: '`1 adult man` から書き、流しなら `swept bangs`、額を出すなら `forehead` と hair slicked back です。女性向けの顔の語はコピーしません。',
      },
      {
        q: 'NovelAI で前髪が安定しません',
        a: '形のタグを長さの直後に置き、重みは 1.1 から 1.2 までにしてください。`blunt bangs` と `swept bangs` のように形を二つ残さないでください。',
      },
    ],
  },

  'kimono-prompt-guide': {
    sections: [
      {
        title: '着物プロンプトの基本',
        content: `「着物 プロンプト」は、\`kimono\` だけでは帯も履物も平均的な一枚絵になります。種類、帯、柄、履物の順に足してください。\`kimono\` は服の位置、つまり人数の直後です。

登場人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。子どもの行事の着物は扱いません。着崩した状態では書きません。衿の左右は、最後の節で確認する項目にしています。

和服のコスプレ全般のうち、巫女は [コスプレプロンプト](/guides/cosplay-prompt-guide) に任せ、このページでは着物の種類を分けます。

**普段の着物**

\`\`\`
1 adult woman, black hair, hair bun, kimono, obi, floral print,
zouri, tabi, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress
\`\`\`

\`zouri\` と \`tabi\` は履物のタグです。帯が要るので \`obi\` を種類の直後に残します。`,
      },
      {
        title: '種類の一覧',
        content: `種類は一つです。\`furisode\` と \`yukata\` を同時に強くすると、袖の長さが中間になります。

| 種類 | 書き方 | 一緒に固定するパーツ |
|---|---|---|
| 着物 | \`kimono\` | \`obi\`, 柄, 履物 |
| 浴衣 | \`yukata\` | \`obi\`, \`geta\` |
| 振袖 | \`furisode\` | \`long sleeves\`, \`wide sleeves\`, \`kanzashi\` |
| 袴 | \`hakama\`, \`hakama skirt\` | 上の着物かブラウス |
| 羽織 | \`haori\` | 着物の上。男性の礼装でも使う |
| 巫女 | \`miko\` | 詳細は [コスプレプロンプト](/guides/cosplay-prompt-guide) |
| 白無垢 | white wedding kimono | 自然な英語。shiromuku も自然な英語 |
| 打ち掛け | uchikake | 自然な英語。白無垢の上に重ねるときだけ |
| 小紋 | komon | 自然な英語。\`floral print\` と一緒に |
| 紋付羽織袴 | montsuki haori hakama | 自然な英語。男性の礼装 |

\`japanese clothes\` は和服全般のタグです。種類が決まったら \`kimono\` か \`yukata\` に置き換えた方が、袖と帯が安定します。

**巫女（成人）**

\`\`\`
1 adult woman, black hair, hair bun, miko, red hakama,
standing, shrine, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress
\`\`\`

パーツを増やすときはコスプレのページを見て、このページの帯と履物の節と混ぜすぎないでください。`,
      },
      {
        title: '浴衣と夏祭り',
        content: `浴衣は \`yukata\` です。帯は \`obi\`、履物は \`geta\` です。下駄を草履にすると礼装に寄るので、夏祭りでは \`geta\` を残します。柄は \`floral print\` を一つ。柄の名前を三つまでは足しません。

場所は、自然な英語で paper lantern と fireworks のどちらか一方です。両方を強くすると、夜空と屋台の看板が一つの模様になります。文字はネガティブの \`text\` で抑えます。人物は成人です。

\`\`\`
1 adult woman, black hair, hair bun, yukata, obi, floral print, geta,
standing, paper lantern, evening, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress, text
\`\`\`

花火に替えるときは paper lantern を fireworks に置き換え、\`yukata\` と \`obi\` と \`geta\` は残します。背景の種類は [背景プロンプト](/guides/background-prompt-guide) です。`,
      },
      {
        title: '振袖・正月・初詣',
        content: `振袖は \`furisode\` です。袖の長さを固定するため \`long sleeves\` と \`wide sleeves\` を足します。髪飾りは \`kanzashi\` を一つです。簪の素材を増やすときは [アクセサリープロンプト](/guides/accessory-prompt-guide) を見て、このページでは本数を増やしません。

正月の初詣は、自然な英語で shrine と書きます。\`furisode\` を残したまま \`yukata\` を足さないでください。

\`\`\`
1 adult woman, black hair, hair bun, kanzashi, furisode,
long sleeves, wide sleeves, obi, floral print,
standing, shrine, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress, yukata
\`\`\`

髪を長く下ろしてから簪を足すときは [ロングヘアプロンプト](/guides/long-hair-prompt-guide)、編み込みと一緒にするときは [編み込みプロンプト](/guides/braid-prompt-guide) です。\`hair bun\` と \`single braid\` を同じ強さにすると、頭の上で両方が出ます。`,
      },
      {
        title: '白無垢・神前式',
        content: `白無垢は、自然な英語で white wedding kimono と書きます。shiromuku も自然な英語です。公式タグとしては断定しません。色無地の着物に戻るときは、pure white を一つ足し、\`floral print\` は入れません。綿帽子は wataboshi、打ち掛けは uchikake と自然な英語です。両方を同じ強さにすると、頭と裾が同じ白い布になります。まずは white wedding kimono と wataboshi だけにしてください。

場所は shrine wedding と自然な英語です。赤い傘を足すなら red umbrella と自然な英語で一つまでです。

**白無垢**

\`\`\`
1 adult woman, black hair, white wedding kimono, wataboshi,
standing, shrine, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, floral print, yukata, dress
\`\`\`

**二人（神前）**

二人の並びは [二人構図](/guides/two-person-composition-prompt-guide) です。人数は \`2 adults\` と書き、\`adult\` を残します。新郎の礼装は montsuki haori hakama と自然な英語です。

\`\`\`
2 adults, bride and groom, standing side by side,
1 adult woman, white wedding kimono, wataboshi,
1 adult man, montsuki haori hakama,
shrine wedding, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, floral print, dress
\`\`\`

公開作例は [白無垢の婚礼](/prompt/wedding-shiromuku-japanese) です。子どもの着物の作例へはリンクしません。`,
      },
      {
        title: '袴スタイル',
        content: `袴は \`hakama\` または \`hakama skirt\` です。スカート状に見せるなら \`hakama skirt\`、上下を和装で揃えるなら \`kimono, hakama\` です。両方を同じ強さにすると、袴が二重に重なります。

ここでの袴は、成人の式典スタイルです。学校の行事の名前では書きません。大正ロマン風は、自然な英語で Taisho-era inspired outfit と書き、ブラウスと \`hakama skirt\` と boots を足します。boots は自然な英語です。公式タグとしては断定しません。

\`\`\`
1 adult woman, long hair, black hair, hair ribbon,
white blouse, hakama skirt, boots,
standing, full body, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress
\`\`\`

男性の袴は次の節です。女性の例に \`1 adult man\` だけを足すと、服の形が中間になります。`,
      },
      {
        title: '男性の着物',
        content: `男性は \`1 adult man\` から書きます。羽織袴は \`haori, hakama\`、普段の夏は \`yukata\` です。紋付まで要るときは、前の節の montsuki haori hakama を自然な英語で使い、\`yukata\` とは混ぜません。

帯は \`obi\` を残します。男性の帯は細く見えやすいので、\`obi\` を服の直後に置いてください。履物は \`zouri\` と \`tabi\` です。下駄の夏祭りにするときだけ \`geta\` に替えます。

**羽織袴**

\`\`\`
1 adult man, black hair, haori, kimono, hakama, obi,
zouri, tabi, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress, yukata
\`\`\`

夏の浴衣は、上の羽織袴を \`yukata, obi, geta\` に置き換え、\`haori\` と \`hakama\` は残しません。\`furisode\` も混ぜません。

髪を伸ばして横で結ぶときは [編み込みプロンプト](/guides/braid-prompt-guide) の男性の例を見て、着物のタグはここに残します。`,
      },
      {
        title: '帯・柄・髪飾り・小物',
        content: `小物は一つずつ足します。帯、柄、簪、履物を全部同じ強さにすると、帯結びが顔の横に飛びます。

| 部位 | 書き方 | 注記 |
|---|---|---|
| 帯 | \`obi\` | タグ。種類の直後 |
| 帯結び | obi bow, taiko knot | 自然な英語。一つだけ |
| 柄 | \`floral print\` | タグ。白無垢には足さない |
| 簪 | \`kanzashi\` | タグ。本数は一つ |
| 花 | hair flower | 自然な英語。簪と同時に強くしない |
| 扇 | folding fan | 自然な英語。手に持つなら holding |
| 下駄 | \`geta\` | 浴衣・夏 |
| 草履 | \`zouri\` | スペルは zouri |
| 足袋 | \`tabi\` | 草履と一緒にすることが多い |
| 袖 | \`long sleeves\`, \`wide sleeves\` | 振袖で固定する |

帯の形を見せるときは、後ろ姿にします。from behind は自然な英語です。

\`\`\`
1 adult woman, black hair, hair bun, kimono, obi, taiko knot,
from behind, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress
\`\`\`

taiko knot は自然な英語です。浮世絵の線で同じ帯を描くときは [画風プロンプト](/guides/art-style-prompt-guide) の \`ukiyo-e\` を最後に一つ足し、写真の語は入れません。`,
      },
      {
        title: '崩れ対策と自然文',
        content: `衿の左右の重ねは、プロンプトだけでは向きを保証できません。生成したあとに見て、違うときはその部分だけを直してください。語を強くしても、左右が安定するとは限りません。

帯が消えるときは、\`obi\` を \`kimono\` の直後へ動かし、重みは \`(obi:1.1)\` から \`(obi:1.2)\` までです。着物がワンピースに寄るときは、ネガティブに dress を入れ、\`japanese clothes\` か \`kimono\` を前に残します。柄が多すぎて帯の形が分からないときは、\`floral print\` を一旦外します。

**帯を戻す**

\`\`\`
1 adult woman, black hair, hair bun, kimono, (obi:1.2),
zouri, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, dress
\`\`\`

ChatGPT と Gemini では文にします。自分の写真を着物姿にするときも、成人の写真であることを確認し、顔は残します。

\`\`\`
Edit the clothes of the adult in this photo into a formal kimono.
Keep the face, age, and pose. Add an obi sash and simple floral pattern.
Full body if the frame allows. Do not change the person into a child.
Avoid: ${NEGATIVE_AGE}
\`\`\`

Stable Diffusion や NovelAI では、上のタグ例に戻してください。袖、帯、履物のどれが消えたかを一つずつ戻す方が、文を長くするより安定します。`,
      },
    ],
    faq: [
      {
        q: '衿の左右は指定できますか？',
        a: 'プロンプトだけでは、左右の重ねを保証できません。生成後に確認し、違う部分だけを直してください。語の重みを上げても安定するとは限りません。',
      },
      {
        q: '帯が消えます',
        a: '`obi` を `kimono` の直後に置き、重みは 1.1 から 1.2 までにしてください。柄の `floral print` を一旦外すと、帯の形が見えやすくなります。',
      },
      {
        q: '白無垢が色のある着物になります',
        a: 'white wedding kimono を自然な英語で書き、`floral print` と `yukata` をネガティブに入れてください。shiromuku は自然な英語であり、公式タグとしては断定しません。作例は [白無垢の婚礼](/prompt/wedding-shiromuku-japanese) です。',
      },
      {
        q: '男性の着物はどう書きますか？',
        a: '`1 adult man` から書き、礼装は `haori, hakama`、夏は `yukata, obi, geta` です。女性の振袖のタグは混ぜません。',
      },
      {
        q: '英語では kimono と japanese clothes のどちらですか？',
        a: '種類が決まっているなら `kimono`、`yukata`、`furisode` です。`japanese clothes` は和服全般で、単体だと袖と帯が平均になります。',
      },
      {
        q: '袴を式典の服装にしたいです',
        a: '成人の式典として `hakama skirt` とブラウスを書きます。学校の行事の名前は使いません。ブーツは boots と自然な英語です。',
      },
    ],
  },
}
