/**
 * Twenty-sixth SEO batch (2026-11-23): color prompt guide upgrade.
 * The previous color article lived inline in the guide page and used
 * unverified extension steps. This file replaces that article.
 * Adult, clothed, safe-for-work only. No example images are invented here.
 * monthlySearchVolume stays 0 in GUIDES — these seeds have no published volume.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_26_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'color-prompt-guide': {
    sections: [
      {
        title: '色名の早見',
        content: `「色 プロンプト」「色 プロンプト 一覧」で先に欲しいのは、色の名前を系統で引ける表です。色は、塗るもの名詞の前に一つ置きます。\`pink dress\` のように、色だけで終わらせません。色だけを並べると、髪にも床にも同じ色が乗ります。

このページは、色の名前、色合い、配色、背景色、光の色を担当します。髪の単色とメッシュは [髪色プロンプト](/guides/hair-color-prompt-guide)、筋と内側の色は [メッシュ・インナーカラーのプロンプト](/guides/mesh-inner-color-hair-prompt-guide) です。服の部品は [服装プロンプト一覧](/guides/clothing-prompt-guide)、長いドレスの種類は [ドレスプロンプト](/guides/dress-prompt-guide) です。光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide)、場所の名詞は [背景プロンプト](/guides/background-prompt-guide) です。役割は一行で分けます。このページは色の名前です。

書く順は、塗るもの、色を一つ、色合いを一つ、背景の色、光の色、です。色合いを先に強くすると、個別の色名が平均のパステルに溶けます。個別の色が決まってから、パステルかくすみかを足してください。比べる色は、一枚に一つです。赤と青を同じプロンプトに残して「どちらが勝つか」を見ると、紫になります。比較は、プロンプトを二枚に分けて行います。

人を描くときは \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。景色、部屋、花、器物には人を置きません。肌の色に優劣はありません。色名を人の直後に置く書き方は [肌の質感のプロンプト](/guides/skin-texture-prompt-guide) です。品質タグの順を Illustrious に合わせる日は [Illustriousプロンプト](/guides/illustrious-prompt-guide) を見て、このページの色名はそのまま持っていきます。

下の表は早見です。英語は、よく使われる書き方です。公式タグとして全部を断定しません。モデルによって、近い色に寄ることがあります。

| 系統 | まず置く英語 | ニュアンス |
|---|---|---|
| ピンク | \`pink\` | 薄い桃。濃さは次の節 |
| 紫 | \`purple\` | 青みの紫。赤みは magenta |
| 青 | \`blue\` | 基本の青。紺は navy |
| 青系 | \`teal\`, \`cyan\` | 緑に寄る青。青と同時に強くしない |
| 緑 | \`green\` | 基本の緑。くすみは sage |
| 黄 | \`yellow\` | 明るい黄。白に寄る黄は cream |
| オレンジ | \`orange\` | 黄と赤のあいだ |
| 茶 | \`brown\` | 木や布の茶 |
| ベージュ | \`beige\` | 薄い茶。白に近いときは cream |
| 白 | \`white\` | 紙や布の白 |
| 黒 | \`black\` | 影と混ざりやすい |
| グレー | \`grey\` | 無彩色。灰み |
| 金 | \`gold\` | 金属の黄。光と混ざる |
| 銀 | \`silver\` | 金属の灰。白と混ざる |

系統の中をさらに一つに絞るときは、次の表です。同じ系統の色を二つ強くしません。

| 緑 | 英語 | 一行 |
|---|---|---|
| 緑 | \`green\` | 基本 |
| 深い緑 | emerald | 宝石に寄る。自然な英語 |
| くすみ緑 | sage | 灰が混ざる。自然な英語 |
| 明るい緑 | mint | 黄に寄らない薄い緑。自然な英語 |

| 黄・橙 | 英語 | 一行 |
|---|---|---|
| 黄 | \`yellow\` | 基本 |
| クリーム | \`cream\` | 白に寄る黄 |
| 橙 | \`orange\` | 黄と赤のあいだ |
| 琥珀 | amber | 橙に金み。自然な英語 |

| 茶・ベージュ | 英語 | 一行 |
|---|---|---|
| 茶 | \`brown\` | 木や布 |
| ベージュ | \`beige\` | 薄い茶 |
| キャメル | camel | 布の薄い茶。自然な英語 |
| 生成り | ivory | 白に近い。beige より明るい |

| 白・黒・灰 | 英語 | 一行 |
|---|---|---|
| 白 | \`white\` | 紙や布 |
| 黒 | \`black\` | 影と混ざりやすい |
| 灰 | \`grey\` | 無彩色 |
| オフホワイト | ivory | 黄みが入った白。\`white\` と両方強くしない |

| 金・銀 | 英語 | 一行 |
|---|---|---|
| 金 | \`gold\` | 金属の黄。光と混ざる |
| 銀 | \`silver\` | 金属の灰 |
| 薄い金 | champagne gold | 白に近い金。自然な英語。\`gold\` と両方強くしない |

**色合い（トーン）は一つ**

色名の前に、画面全体の調子を一つだけ置けます。二つを同じ強さにすると、薄いのに鮮やか、のように打ち消し合います。彩度を数値で指定する機能ではありません。語の目安です。

| 日本語 | 英語 | 出やすい印象 |
|---|---|---|
| パステル | pastel colors | 薄く、彩度が下がる |
| くすみ | muted colors | 灰が混ざった落ち着き。dusty も近い |
| ビビッド | vivid colors | 彩度が高い |
| モノクロ | monochrome | 白黒に寄る |
| セピア | sepia | 古い写真の茶 |
| 暖色 | warm colors | 赤、橙、黄が勝つ |
| 寒色 | cool colors | 青、紫が勝つ |
| クリーム色 | \`cream\`, \`ivory\` | 白に黄み。ベージュより白に近い |

**クリーム色のブラウス**

\`\`\`
1 adult woman, cream blouse, ivory skirt, muted colors,
soft daylight, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding
\`\`\`

ピンク、紫、青の短い節は、このあとです。緑から金までは、この早見の英語を名詞の前に一つ置いてください。

表の英語は、名詞の前に置いて初めて色になります。\`green\` だけを行の先頭に置くと、画面全体が緑に寄ります。\`green blouse\` と書けば、緑の範囲はブラウスです。表から語を借りるときは、塗るものを先に決めて、色をその直前へ動かしてください。髪に載せる語は、この表から一つだけ [髪色プロンプト](/guides/hair-color-prompt-guide) へ持っていきます。服に載せる語は [服装プロンプト一覧](/guides/clothing-prompt-guide) の部品の前です。ドレスの種類が先に要る日は [ドレスプロンプト](/guides/dress-prompt-guide) で丈を決めてから、色を一つ足します。

金と銀は、布の色ではなく金属の色として使います。\`gold blouse\` は布まで金属の光沢になることがあります。刺繍やボタンだけを金にしたいときは、gold embroidery のように場所を一つ書いてください。銀も同じです。場所を書かない \`silver\` は、髪や壁まで灰の金属になります。光の色と金属の色を同じ日に変えないでください。暖色の光の下では、銀も黄ばんで見えます。`,
      },
      {
        title: 'ピンクのプロンプト',
        content: `「色 プロンプト ピンク」は、濃さで分かれます。\`pink\` は薄い桃です。濃い桃は hot pink、灰が混ざった桃は dusty pink と自然な英語です。公式タグとしては \`pink\` 以外を断定しません。桜の花を描きたい日と、布を桃にしたい日は、語を分けます。\`sakura\` だけだと花が出ます。布なら \`pink blouse\` です。

| 日本語 | 英語 | 一行 |
|---|---|---|
| ピンク | \`pink\` | 最初の一手 |
| 薄い桃 | light pink | 白に近い。自然な英語 |
| 濃い桃 | hot pink | 彩度が高い。自然な英語 |
| くすみ桃 | dusty pink | 灰が混ざる。自然な英語 |
| 桜色 | sakura pink | 花と混ざるときは外す |

髪を桃にする日は [髪色プロンプト](/guides/hair-color-prompt-guide) です。この節は服です。

\`\`\`
1 adult woman, dusty pink blouse, long navy skirt,
muted colors, upper body, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding, red dress
\`\`\`

赤に寄るときは hot pink を外し、\`pink\` だけに戻します。ネガティブの red dress は、この桃の例だけの除けです。赤い服が欲しい回では外してください。`,
      },
      {
        title: '紫のプロンプト',
        content: `「色 プロンプト 紫」は、青みか赤みかを先に決めます。\`purple\` は青みの紫に寄ることが多いです。赤みの鮮やかさは magenta、薄い紫は lavender と自然な英語です。violet も紫の名前として使われます。三つを同じ強さにすると、平均の紫になります。一つにしてください。

| 日本語 | 英語 | 一行 |
|---|---|---|
| 紫 | \`purple\` | 基本 |
| 薄い紫 | lavender | 白に近い。自然な英語 |
| 赤みの紫 | magenta | 桃に寄る。自然な英語 |
| スミレ | violet | purple と両方強くしない |

\`\`\`
1 adult woman, lavender coat, white blouse, long skirt,
cool colors, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding, pink coat
\`\`\`

服が桃になるときは、magenta が残っていないかを見ます。残っていなければ lavender を外し、\`purple\` に戻してから薄さを足してください。`,
      },
      {
        title: '青と青系のプロンプト',
        content: `「色 プロンプト 青」「色 プロンプト 青系」は、純度の青と、緑や灰が混ざった青を分けます。\`blue\` が基本です。紺は \`navy\`、空に近い明るさは sky blue、緑に寄る青は \`teal\` です。青系と書きたいときは、\`blue\` と \`teal\` を同時に強くせず、近い方を一つ選びます。

| 日本語 | 英語 | 一行 |
|---|---|---|
| 青 | \`blue\` | 基本 |
| 紺 | \`navy\` | 暗い青 |
| 空色 | sky blue | 明るい。自然な英語 |
| 青緑 | \`teal\` | 緑が混ざる |
| シアン | \`cyan\` | 明るい青緑。teal と両方強くしない |
| 藍 | indigo | 深い青。自然な英語 |

水色の部屋だけを描く例です。人は置きません。

\`\`\`
empty sitting room, sky blue wall, white curtain, oak table,
soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, color bleeding
\`\`\`

服を紺にする日は、壁の青を外してから \`navy coat\` を人の直後に置きます。壁と服を同じ \`blue\` にすると、境界が消えます。分け方はうしろの節です。`,
      },
      {
        title: '配色パターン',
        content: `色を二色以上使うときは、役割を先に決めます。色数は、主役、脇、差し色の三つまでを目安にしてください。四つを同じ強さにすると、どれが主役か残りません。比率の 60、30、10 は、絵の面積をモデルが測る機能ではありません。人が見るときの配分の目安です。主役を広く、脇を中くらい、差し色を小さく、と名詞で書いてください。

補色は、色相環で向かい合う組み合わせです。青緑と橙は、その一例です。類似色は、隣り合う色です。青、青緑、緑のように、同じ側にまとめます。モノクロマティックは、一つの色の濃淡だけです。パステルとくすみは、色相ではなく彩度の話なので、配色と同時に二つ強くしません。

服の色の部品は [服装プロンプト一覧](/guides/clothing-prompt-guide)、夜のドレスの色は [ドレスプロンプト](/guides/dress-prompt-guide) です。

**補色（青緑と橙）の部屋**

\`\`\`
living room, teal sofa, orange cushion, white wall,
soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, color bleeding
\`\`\`

**類似色の丘**

\`\`\`
rolling hills, blue sky, teal distant trees, green grass,
analogous colors, daytime, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, red flowers
\`\`\`

analogous colors は自然な英語です。公式タグとしては断定しません。効かないときは、青、青緑、緑の名詞だけを残してください。

**一つの色の濃淡**

\`\`\`
still life, grey ceramic cup, light grey cloth, dark grey wall,
monochrome, soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, vivid colors
\`\`\`

**差し色を小さく**

広い面積は紺のコート、中くらいの面積はクリームのブラウス、小さい面積は錆色のスカーフ、という配分の目安です。面積の数字は書きません。

\`\`\`
1 adult woman, navy coat, cream blouse, rust scarf,
standing, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding, vivid colors
\`\`\`

rust は自然な英語です。スカーフが画面の半分になるときは、rust を外して、紺とクリームの二色に戻します。差し色は、戻してから一つだけ足してください。

配色を試す日は、一枚につき変える役割を一つにします。補色の部屋ができたあとで類似色の丘を見るときは、プロンプトをコピーして、色の名詞だけを入れ替えます。同じプロンプトの中に teal sofa と green grass を残したまま、どちらが効いたかを見ないでください。景色の回と、服の回も混ぜません。服の紺が決まるまでは、部屋の補色は別のファイルに残します。

パステルを配色と同時に強くすると、補色の橙が薄くなって、向かい合う色だとは見えなくなります。彩度の語は、色の役割が決まってから一つ足すか、足さないかを決めてください。くすみにしたい日は muted colors を残し、vivid colors は正向から外します。`,
      },
      {
        title: 'HEXとカラーコード',
        content: `カラーコードをプロンプトに書いても、その番号の色がそのまま出るとは限りません。\`#\` ではじまる六桁は、画像モデルにとって色名より弱いヒントになることが多いです。効かない回もあります。見本の色に近づけたいときは、コードより先に、pink や navy のような色名を置いてください。コードを足すなら、色名のうしろに一つ、です。コードだけで色を指定する書き方は、このページでは勧めません。

印刷や画面の色指定と、画像生成のタグは別の仕組みです。コードが正しい色の値でも、モデルは隣の照明や学習した色名の方へ寄ることがあります。2026年11月時点でも、この挙動を「必ず再現する」とは書けません。近い色が出たら、コードを消して色名だけを残し、そこから dusty や light を一つ足して調整してください。

花瓶の例です。人は置きません。コードはヒントです。

\`\`\`
ceramic vase, dusty pink, #D4A5A5,
white table, soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, text, watermark
\`\`\`

画面に番号の文字が出るときは、コードを外してください。文字はネガティブの text でも残します。色名の dusty pink だけでも、この花瓶は作れます。

コードを二色分書くと、どちらが花瓶でどちらが机かが残りません。一色のヒントまでにします。近い色が出ないときは、コードを足すのではなく、色名を dusty、light、deep のどれか一つに言い換えてください。deep は自然な英語です。公式タグとしては断定しません。言い換えても寄らないときは、照明を昼の白い光に戻します。暖色の光の下では、桃も橙に見えます。光を直す前にコードを増やしても、番号は読まれません。

見本の画像と並べて「同じ色か」を目で見るのは、人が判断する範囲です。モデルが HEX を守った、とは書きません。2026年11月時点でも、コードは色名の補助です。`,
      },
      {
        title: '背景色と光の色を分ける',
        content: `背景の色と、光の色は、服の色と別の文にしてください。同じ行に \`yellow dress, blue sky, orange sunset\` と置くと、黄と青と橙が布の上で混ざります。背景の名詞は [背景プロンプト](/guides/background-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。このページでは、色をどの行に置くかだけを決めます。

分け方は三つです。

1. 服の色を、人の直後に一つ。
2. 背景の色を、場所の名詞の前に一つ。空行で段落を分けるか、WebUI 系では BREAK を大文字で置いて前後を別のまとまりにすることがあります。効きはバージョンで違います。最新の説明は、使っている画面の公式ドキュメントを確認してください。2026年11月時点の話です。
3. 光の色は、最後に一つ。暖色の光なら warm light、寒色なら cool light と自然な英語です。公式タグとしては断定しません。

**服と壁を分ける**

\`\`\`
1 adult woman, white blouse, long navy skirt
BREAK
pale grey wall, soft daylight, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding
\`\`\`

BREAK は大文字です。小文字の break は、別の単語として読まれることがあります。記号の意味は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

**光の色だけを暖色にする**

服は白のまま、光だけを暖色にします。服に orange を書かないでください。

\`\`\`
1 adult woman, white blouse, long grey skirt, warm light,
upper body, plain room
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding, orange blouse
\`\`\`

壁まで橙になるときは、warm light を外し、soft daylight に戻します。光の色と服の色を、同じ実験で同時に変えないでください。`,
      },
      {
        title: '色が隣へにじむとき',
        content: `色のにじみは、色の語が名詞から離れたときと、反対の色を同じ強さで置いたときに起きます。\`red hair, white dress\` のように差が大きい組は、境目が濁りやすいです。直しは、語を増やす前に、色を名詞へ戻します。

1. 色は名詞の直前。\`navy coat\` であり、\`navy, coat\` と離さない。
2. 色は一つずつ。比較したい色は、プロンプトを二枚に分ける。
3. 背景と服のあいだを、前の節の BREAK か、段落で分ける。
4. まだ移るときは、ネガティブに color bleeding を残し、柄を外して無地に戻す。
5. 髪の色が服に移る日は [髪色プロンプト](/guides/hair-color-prompt-guide)、服の部品が混ざる日は [服装プロンプト一覧](/guides/clothing-prompt-guide) に戻る。

重みは、無視された色に一つだけ足す目安です。\`(navy coat:1.2)\` から試し、1.3 を超えるとコートの枚数が増えることがあります。数字はモデルで違います。配布ページに推奨があれば、それを優先してください。

部分ごとに色を固定する拡張を使う画面もあります。導入のコマンドや、対象の書き方は、ここでは断定しません。2026年11月時点でも、対応するモデルと表示名は配布元の説明で確認してください。信頼できる配布元のものだけを入れてください。

\`\`\`
1 adult man, navy coat, cream shirt,
BREAK
grey sidewalk, daytime, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding
\`\`\`

シャツまで紺になるときは、cream が coat の行に付いていないかを見ます。色は、その服の名詞の直前だけに残してください。

にじみを直す実験では、髪型と背景を同時に変えません。髪の色が疑わしい日は服を白に固定し、服の色が疑わしい日は髪を黒か茶の一つに固定します。両方を動かすと、どちらが移ったのかが残りません。直ったプロンプトは、崩れる前のプロンプトを消さずに残します。戻り先が無いと、次の色を試したときに最初の安定した組へ戻れません。

柄のある布は、無地で境界が残ってから足します。花柄の上でにじみを直そうとすると、花の色と布の色のどちらが移ったのかが見えません。無地の一色に戻し、境界が残った枚を保存してから、柄を一つだけ戻してください。`,
      },
      {
        title: 'ChatGPT・Gemini の自然文',
        content: `自然文でも、順番は同じです。塗るもの、色の名前、色合いは一つ、背景の色は別の文、光の色は最後です。成人を描く文には、大人であることを残します。景色だけの文には、人を置かない、と書きます。

FLUX や、文章で描く画像生成でも、色名を先に置いた方が、コードの六桁より残りやすいです。コードを足すときは「目安であり、一致しなくてもよい」と一文を添えてください。

**日本語**

\`\`\`
成人の女性が、クリーム色のブラウスと紺の長いスカートを着ています。
色合いはくすみです。背景は薄い灰色の壁で、服とは別の色です。
光は昼の柔らかい光。大人です。文字は入れません。
\`\`\`

**英語**

\`\`\`
An adult woman wears a cream blouse and a long navy skirt.
The palette is muted. The wall behind her is pale grey, separate from the clothes.
Soft daylight. She is an adult. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color bleeding
\`\`\`

Midjourney では、同じ英文のうしろに縦横だけを足せます。色が混ざったら、文から色を一つ減らし、壁の色を次の文に分けてください。

自然文をタグに戻すときは、クリームのブラウス、紺の長いスカート、くすみ、薄い灰色の壁、昼の光、の五つに収めてから、それ以外を足すかを決めます。文が長いほど、色は平均に戻ります。FLUX のように文章で描く画面でも、色名は短く残した方が、後ろの雰囲気の文に負けません。雰囲気の文は、色が三枚同じになってから足してください。`,
      },
    ],
    faq: [
      {
        q: 'ピンクが服全体に広がります',
        a: '色は名詞の直前に置きます。`dusty pink blouse` のように、広がってほしくない側の色は書きません。まだ移るときは、背景を無地の白か灰に戻し、ネガティブに color bleeding を残してください。',
      },
      {
        q: 'カラーコードを書けばその色になりますか？',
        a: 'なりません。六桁のコードは目安で、効かないこともあります。先に pink や navy のような色名を置き、コードは色名のうしろに一つまでにしてください。文字として画面に出たら、コードは外します。',
      },
      {
        q: '色は何色まで書けますか？',
        a: '主役、脇、差し色の三つまでを目安にしてください。60、30、10 は面積の目安であり、モデルが守る数値ではありません。四つを同じ強さにすると、どれが主役か残らなくなります。',
      },
      {
        q: '背景の色と服の色が混ざります',
        a: '服の行と背景の行を分けます。WebUI 系では BREAK を大文字で置くと、前後が別のまとまりになることがあります。効きはバージョンで違うので、公式の説明を確認してください。',
      },
      {
        q: '肌の色はどう書きますか？',
        a: '描きたい色の名前を、人の直後に一つ置きます。色のあいだに優劣はありません。色名の辞典はこのページ、肌の質感は [肌の質感プロンプト](/guides/skin-texture-prompt-guide) です。服の色と同じ語を肌に強くしないでください。',
      },
      {
        q: '青と青系は同じですか？',
        a: '同じにしません。青は `blue`、紺は `navy` です。青系で緑が混ざるときは `teal` を一つ選び、`blue` と同時に強くしないでください。',
      },
    ],
  },
}
