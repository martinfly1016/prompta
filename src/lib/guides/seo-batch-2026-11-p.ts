/**
 * Twenty-fourth SEO batch (2026-11-21): mesh / inner-color hair,
 * and everyday casual outfits.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Wording is original. Tool names are limited to software the site already names.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_24_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'mesh-inner-color-hair-prompt-guide': {
    sections: [
      {
        title: '筋と内側は、置き方が違う',
        content: `「メッシュ プロンプト」「メッシュヘア プロンプト」「髪 メッシュ プロンプト」「インナーカラー プロンプト」で探しているのは、地の色とは別の色を、筋にするか、内側に隠すか、です。検索では、前髪だけの筋、赤い筋、髪色の筋、服の網目、が同じ語で並びます。欲しいのは髪の色です。布の網目ではありません。

このページは、髪の筋と内側の色を担当します。単色の全体は [髪色プロンプト](/guides/hair-color-prompt-guide) のままです。役割は一行で分けます。髪色のページは黒も金も含む入口、このページは地の色に足す二色目です。黒の濃さは [黒髪のプロンプト](/guides/black-hair-prompt-guide)、金の色味は [金髪のプロンプト](/guides/blonde-hair-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。実在の人物、作者名、作品名は書きません。年齢を下げる書き方は使いません。染毛剤の商品名も書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(streaked hair:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(streaked hair:1.2\\)\` と書きます。NovelAI の強調は \`{streaked hair}\` と \`[streaked hair]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。強さの数値も目安で、配布ページの推奨があればそちらです。

「メッシュ プロンプト 服」は、布の網目を指す別の依頼です。このページでは服の網目は作りません。布の並びは [服装プロンプト一覧](/guides/clothing-prompt-guide) です。髪のファイルに mesh fabric を残すと、ブラウスまで格子になります。

検索語のうしろに、髪、髪色、髪型、前髪、赤、が続くときは、どれもこのページの髪です。服が続くときだけ、服装のページへ移ります。赤は筋の色の一例で、地の色ではありません。髪型の名前（長さ、結び、前髪の形）は、色の置き方が決まってから一つ借ります。先に髪型を三つつけると、筋の確認ができません。

比較用の基準は、地が黒、服が白、背景が無地、の一枚です。この一枚を保存してから、筋の色だけを差し替えます。赤が頭全体になったら、基準へ戻って、アクセントの行を地のうしろへ移します。基準が無いと、モデルの癖なのか、語順なのかが残りません。

色の名前は、黒、赤、青、金、ピンク、銀、紫、茶、までです。商品の色番号や、店の名前は書きません。実在の人物の髪も書きません。架空の成人の髪として、地とアクセントの二色だけを残してください。`,
      },
      {
        title: '英語の早見',
        content: `短い語と、文で説明する語を混ぜると、どちらが色の置き方なのかが残りません。今日足す置き方は一つです。短い語は、タグを空白で区切るモデルで使われることがあります。アンダースコアでつなぐ書き方は、その区切りを覚えるモデル向けです。どちらも公式タグとしては断定しません。効きはモデル次第です。

| 日本語 | 短い語 | 自然な英語 | 読み方 |
|---|---|---|---|
| メッシュ | \`streaked hair\` | thin colored streaks in the hair | 地に細い別色 |
| インナーカラー | \`colored inner hair\` | colored inner hair | 表は地、内側が別色 |
| 毛先カラー | \`colored tips\` | dip-dyed tips | 毛先だけ |
| ツートン | \`two-tone hair\` | two-tone hair | 二色。境目はモデルによる |
| 左右分け | \`split-color hair\` | hair split into two colors | 左右や前後 |
| グラデーション | \`gradient hair\` | color fading along the hair | 境目がにじむ |
| 多色 | \`multicolored hair\` | hair in several colors | 三色以上。増えやすい |
| ハイライト | highlights | soft lighter streaks | 自然な英語。筋より弱い |

\`streaked hair\` と highlights を同じ強さにすると、筋の太さが平均になります。細い筋の日は highlights を消し、自然な明るさの日は \`streaked hair\` を消します。\`rainbow hair\` は色数が増えて服まで虹になります。このページの作例には入れません。

地の色を書かずに置き方だけを置くと、筋の色が頭全体になります。次の節の順番を先に決めてください。

アンダースコアでつなぐ書き方（streaked_hair のように）は、区切りを覚えるモデル向けです。空白で分ける streaked hair は、同じ意味の短い語として使われることがあります。どちらが公式かはこのページでは断定しません。両方を同じ行に残すと、同じ指示が二回入って、筋が太くなります。今日使う区切りは一つです。

ハイライトは、筋より細い明るさです。地が金のときに highlights を足すと、金がさらに明るくなって、別の色の筋にはなりません。別の色が欲しい日は highlights を消し、streaked hair と色の名前を置きます。自然な明るさだけが欲しい日は、色の名前を足しません。`,
      },
      {
        title: '地の色を先に置く',
        content: `順番は、地、置き方、アクセント、です。アクセントを先にすると、頭全体がその色になります。「黒髪に赤メッシュ」は \`black hair\` を人数の直後に置き、\`streaked hair\` をそのうしろ、赤を最後にします。

赤の筋は red streaks、青の筋は blue streaks、と自然な英語です。公式タグとしては断定しません。\`red hair\` を地の \`black hair\` と同じ強さで残すと、頭の半分が赤くなります。筋の日は、地の色を hair まで書き、アクセントは streaks まで書いてください。

インナーカラーも同じ順です。\`black hair, colored inner hair, red inner hair\`。内側の色を先に強くすると、表まで赤くなります。毛先は \`black hair, colored tips, blue tips\`。\`gradient hair\` は境目がにじむので、毛先だけをはっきり分けたい日には使いません。

| 日本語の依頼 | 置く順 |
|---|---|
| 黒髪に赤メッシュ | \`black hair, streaked hair, red streaks\` |
| 黒髪に青の内側 | \`black hair, colored inner hair, blue inner hair\` |
| 金にピンクの筋 | \`blonde hair, streaked hair, pink streaks\` |
| 銀に紫の内側 | \`silver hair, colored inner hair, purple inner hair\` |
| 茶に金の筋 | \`brown hair, streaked hair, blonde streaks\` |

**黒髪に赤い筋。上半身**

\`\`\`
1 adult woman, adult, black hair, streaked hair, red streaks, long hair, adult face,
white blouse, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
red hair, red clothes, red eyes, rainbow hair
\`\`\`

**表は黒、内側は青**

\`\`\`
1 adult woman, adult, black hair, colored inner hair, blue inner hair, long hair, adult face,
white blouse, upper body, from side,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
blue hair, blue clothes, blue eyes, rainbow hair
\`\`\`

比較は、服と背景と顔を固定して、置き方の行だけを差し替えます。筋と内側を同じ強さで残すと、表も筋も中間の色になります。

「黒髪に赤メッシュ」を日本語のまま文の途中へ置いても、タグのモデルでは色が髪に結びつかないことがあります。そのときは、上の表の英語の順に戻します。文章のモデルでは、次の最後の節の自然文を使います。タグと自然文を同じ強さでつなぐと、地の色が二回入って、赤が半分になります。残すのは、そのモデルが読む方だけです。

金の地にピンクの筋を足す日は、先に金が三枚同じになっていることを確認します。金が黄ばんだ枚にピンクを足すと、筋ではなく全体がオレンジに寄ります。茶の地に金の筋を足す日も同じです。茶が黒に沈んでいる枚では、筋の金が見えません。地を一色に戻してから、アクセントを一つ足してください。`,
      },
      {
        title: '前髪だけ、短い髪、長い髪',
        content: `前髪だけの筋は、頭全体の筋が三枚そろってからです。自然な英語では streak in the bangs と、前髪の形を一つ足します。公式タグとしては断定しません。前髪の形の一覧は [前髪プロンプト](/guides/bangs-prompt-guide) です。このページでは、筋を前髪に限るときだけ借ります。

\`blunt bangs\` は短い語として使われることがあります。公式タグとしては断定しません。ぱっつんと流す前髪を同じ強さにすると、眉のところで形が平均になります。前髪の色だけを変えたい日は、頭全体の \`streaked hair\` を弱めるか、負向に「筋が後頭部まで続く」ことを足します。語を増やすより、前髪の行を人数の近くへ移してください。

短い髪は、筋が見える面積が小さいです。\`short hair\` を長さとして先に置き、\`long hair\` は消します。短い髪型の種類は [ショートヘアのプロンプト](/guides/short-hair-prompt-guide) です。長い髪は \`long hair\` を残し、内側を見せる日は次の節の角度を一つ足します。直毛の質感は [ストレートヘアのプロンプト](/guides/straight-hair-prompt-guide) です。波の語が同じ強さで残っていると、筋が波の影に隠れます。

| 範囲 | 書き方 | 消すもの |
|---|---|---|
| 前髪だけ | streak in the bangs | 自然な英語。頭全体の筋は弱める |
| 短い髪 | \`short hair, streaked hair\` | \`long hair\` |
| 長い髪 | \`long hair, colored inner hair\` | 短い髪の語 |

**前髪にだけ赤い筋**

\`\`\`
1 adult woman, adult, black hair, blunt bangs, streak in the bangs, red streaks, adult face,
white blouse, portrait, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
red hair, streaks all over the hair, rainbow hair
\`\`\`

**短い黒髪に金の筋**

\`\`\`
1 adult woman, adult, black hair, short hair, streaked hair, blonde streaks, adult face,
white blouse, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, blonde hair, rainbow hair
\`\`\`

前髪の筋が後頭部まで広がるときは、アクセントの重みを 1.2 より上げません。上げるのは置き方かアクセントの一方だけです。

短い髪で筋が見えないときは、色を増やす前に横からの角度を一つ足します。正面の短い髪は、筋が額の影に隠れます。長い髪で内側が見えないときも、同じです。長さのページへ移ってから戻るときは、\`short hair\` か \`long hair\` の一方だけを持ってきて、このページの地の色は残します。両方の長さを残すと、肩のあたりで髪が切れます。

前髪の形を変える実験は、筋の色を固定した複製で行います。元のファイルの前髪を上書きすると、筋が前髪だけだったのか、頭全体だったのかが戻りません。ぱっつんが三枚そろってから、流す前髪へ一つだけ差し替えてください。`,
      },
      {
        title: '組み合わせと、内側を見せる',
        content: `色は二色までです。地とアクセントです。三色目を足すと、次の節の虹になります。組み合わせは、地が落ち着いて、アクセントが一つ、です。

| 地 | アクセント | 向く置き方 |
|---|---|---|
| 黒 | 赤 | 筋。内側にも使える |
| 黒 | 青 | 内側。横から見せる |
| 金 | ピンク | 筋。金の色味は金のページで一つに決めてから |
| 銀 | 紫 | 内側。銀を先に書く |
| 茶 | 金 | 筋。茶を brown hair まで書く |

内側の色は、正面のままでは表の地に隠れます。見せる角度は一つです。耳のうしろへ髪を入れる、横から見る、肩へ髪を落とす、風で表をめくる、のどれかです。四つを同じ強さにすると、頭の向きが平均で止まります。

hair tucked behind ear、from side、hair over shoulder、wind lifting the outer hair は自然な英語です。公式タグとしては断定しません。\`hair over shoulder\` は短い語として使われることがあります。公式タグとしては断定しません。風と横を同時に強くすると、髪が顔を横切って内側が見えません。

**長い髪。肩へ落として内側を見せる**

\`\`\`
1 adult woman, adult, black hair, long hair, colored inner hair, red inner hair,
hair over shoulder, from side, adult face,
white blouse, long skirt, upper body,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
red hair, red clothes, rainbow hair
\`\`\`

**金にピンクの筋。正面でも筋が見える量**

\`\`\`
1 adult woman, adult, blonde hair, long hair, streaked hair, pink streaks, adult face,
white blouse, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
pink hair, pink clothes, rainbow hair
\`\`\`

金の地が黄ばむときは、このページで筋を増やす前に [金髪のプロンプト](/guides/blonde-hair-prompt-guide) で地を一色に戻します。黒が灰色になるときは [黒髪のプロンプト](/guides/black-hair-prompt-guide) です。

風で表をめくる書き方は、内側を見せる最後の手段です。横から見る、肩へ落とす、耳のうしろへ入れる、のどれかで見えてから、wind lifting the outer hair を一つ足します。先に風を強くすると、髪が顔を横切って、内側の色より動きが主題になります。風と横を同じ強さにしないでください。

左右で色を分ける日は、\`split-color hair\` を置き方として一つ選び、筋の語は消します。左右のどちらが赤かは、モデルが入れ替えることがあります。左右を固定したいときは、from side をやめて正面に戻し、色を二色だけ残します。三色目を足した瞬間に、分けた境界がにじみます。`,
      },
      {
        title: '成人の男性の筋',
        content: `成人の男性も、地を先に書きます。\`1 adult man\` から書き、\`adult\` を残します。服はシャツと長いズボンです。短い髪に細い筋を一つ置くと、横から見たときに筋が残ります。長い髪の内側は、肩へ髪を落とす角度と一緒にします。

男性の輪郭と服の入口は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。このページでは、筋の色だけを借ります。短い髪型の種類を三つつけると、筋より刈り込みが主題になります。長さは \`short hair\` か \`long hair\` の一方です。

| 見せ方 | 書き方 |
|---|---|
| 短い髪の筋 | \`1 adult man, black hair, short hair, streaked hair\` |
| 長い髪の内側 | \`long hair, colored inner hair, from side\` |

**短い黒髪に青の筋**

\`\`\`
1 adult man, adult, black hair, short hair, streaked hair, blue streaks, adult face,
shirt, long trousers, upper body, from side,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
blue hair, blue clothes, long hair, rainbow hair
\`\`\`

女性のファイルから長いスカートの行を残したまま男性へ貼ると、服の輪郭が混ざります。貼る前に服の行を消してください。`,
      },
      {
        title: '色が服と目へ移るとき',
        content: `アクセントが強いと、同じ色がブラウス、目、背景へ広がります。色の数を地とアクセントの二つに減らし、服の色は無地の白か紺に固定します。目の色を書かない日は、アクセントと同じ色の目を負向に入れます。

手順は次の四つです。

1. 髪の色は地とアクセントだけ。三色目は消す。
2. アクセントの重みは 1.2 から 1.3 まで。目安です。1.4 を超えると筋が頭全体になります。
3. \`BREAK\` で髪の行と服の行を分ける。記号の意味は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、色の分け方の全体は [色プロンプト](/guides/color-prompt-guide) です。
4. 負向に、乗ってほしくない場所を書く。

部分ごとに色を固定する拡張は、色のページに任せます。このページでは、BREAK と色数の削減までです。

**赤の筋が白い服に移らないように**

\`\`\`
1 adult woman, adult, (black hair:1.2), streaked hair, red streaks, long hair
BREAK
white blouse, grey eyes, simple background, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
red clothes, red eyes, red background, rainbow hair
\`\`\`

重みの括弧を文字として残すモデルでは、髪の行を \`\\(black hair:1.2\\)\` と書きます。服の行には重みを同時に付けません。上げるのは一つだけです。`,
      },
      {
        title: '文章で頼む。広がる、見えない、虹になる',
        content: `ChatGPT や Gemini には、タグの列より文が向きます。成人であること、地の色、筋か内側か、服が無地であること、を同じ文に入れます。

**自然文**

\`\`\`
An adult woman with long black hair and a few thin red streaks.
The rest of the hair stays black. She wears a plain white blouse.
Upper body, soft daylight, looking at the camera.
She is an adult. No other bright colors.
\`\`\`

ネガティブ欄があるツールでは、次を足します。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
red clothes, rainbow hair
\`\`\`

NovelAI は、2026年11月時点の公式ドキュメントでは、画像生成の案内として日本語入力にも対応し、関連する英語タグへ自動変換される、と書かれています。V5 のモデル案内では、自然言語の理解力が向上し、日本語などの多言語プロンプトに対応した、とも案内されています。常に同じタグへ変換されるとは書かれていません。バージョンによって表示名や仕様が違うことがあります。最新の手順は <a href="https://docs.novelai.net/ja/image/" rel="nofollow noopener" target="_blank">公式の画像生成ドキュメント</a> と <a href="https://docs.novelai.net/ja/image/models/" rel="nofollow noopener" target="_blank">モデルの案内</a> を確認してください。

うまくいかないときは、語を増やす前に一つ外します。

- 筋が頭全体に広がる。地を先に戻し、アクセントの重みを 1.2 以下にします。三色目を消します。
- 内側の色が見えない。正面をやめて、from side か hair over shoulder を一つだけ足します。
- 三色が虹になる。\`multicolored hair\` と \`rainbow hair\` を消し、地とアクセントの二色に戻します。

単色に戻す日は、このページの置き方を全部消してから [髪色プロンプト](/guides/hair-color-prompt-guide) の一色だけを残します。置き方の語が残っていると、単色の確認ができません。

広がった枚を直す順番は、色を減らす、角度を一つにする、重みを 1.2 まで戻す、です。語を足して直そうとすると、四色目が入って虹が濃くなります。見えない枚を直す順番は、正面をやめる、髪を肩へ落とす、内側の語を地の直後へ移す、です。光を足すのは、色の位置が三枚同じになってからです。先に光を強くすると、筋が白く飛んで、地の黒まで明るくなります。

ファイルは、単色、筋、内側、前髪だけ、で分けて保存します。一つの文に四種類を残したまま次の日へ進むと、どれを消したのかが残りません。今日開くファイルは一つです。`,
      },
    ],
    faq: [
      {
        q: 'メッシュの英語は何ですか',
        a: '短い語では streaked hair が使われることがあります。細い筋を文で書くなら thin colored streaks in the hair です。地の色を先、筋の色を後に置いてください。公式タグとしては断定しません。ハイライトは highlights と自然な英語で、筋より弱い明るさです。',
      },
      {
        q: 'インナーカラーが見えません',
        a: 'colored inner hair を地の色のうしろに置き、横から見るか、髪を肩へ落とすか、耳のうしろへ入れるかを一つ足します。正面のまま語を増やしても、内側は表に出てきません。',
      },
      {
        q: '前髪だけメッシュにできますか',
        a: 'streak in the bangs と、前髪の形を一つ足します。前髪の形の一覧は前髪のページです。頭全体の streaked hair を同じ強さで残すと、後頭部まで筋が続きます。',
      },
      {
        q: '三色にしたら虹になります',
        a: '地とアクセントの二色に戻してください。multicolored hair を残すと色数が増えます。服や目まで同じ色になるときは、BREAK で髪と服を分け、負向にその色の服と目を入れます。',
      },
      {
        q: '服のメッシュはどこですか',
        a: '布の網目は別の意味です。このページでは書きません。服の並びは服装プロンプト一覧です。髪のファイルに布の語を残すと、ブラウスまで格子になります。',
      },
    ],
  },

  'casual-outfit-prompt-guide': {
    sections: [
      {
        title: '私服は、上から下へ一つずつ',
        content: `「私服 プロンプト」「カジュアル プロンプト」「カジュアルな服装 プロンプト」「カジュアルコーデ プロンプト」「普段着 プロンプト」で探しているのは、仕事の礼服でも衣装でもない、日常の服です。検索では、カジュアルウェア、カジュアルシャツ、オフィスカジュアル、ビジネスカジュアル、が一緒に出ます。欲しいのは、閉じた普段着の組み合わせです。

このページは、大人の普段着を担当します。服の全体の入口は [服装プロンプト一覧](/guides/clothing-prompt-guide) のままです。役割は一行で分けます。入口のページは服の種類を見渡す表、このページは休日と、オフィスに寄った普段着です。フードの形は [パーカーのプロンプト](/guides/hoodie-prompt-guide)、長い外着は [コートのプロンプト](/guides/coat-prompt-guide)、足元の種類は [靴のプロンプト](/guides/shoes-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は首から下を布で閉じ、丈は膝より下か、長いズボンにします。実在の店の名前、商品名、胸の印は書きません。価格も書きません。年齢を下げる書き方は使いません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(casual clothes:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(casual clothes:1.2\\)\` と書きます。NovelAI の強調は別の括弧です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。

一枚につき、上を一つ、下を一つ、靴を一つ、小物を一つまでです。四つを全部詳しく書くと、袖と裾が平均の布になります。

検索では、カジュアルな服装、カジュアルコーデ、カジュアルウェア、カジュアルシャツ、オフィスカジュアル、ビジネスカジュアル、が同じ依頼に並びます。このページでは、それらを普段着の系統として一つずつ分けます。シャツだけの日は上の部品、コーデの日は上と下と靴、オフィスに寄る日は次の系統の表、です。全部を一つの文に残すと、ネクタイと運動靴が同時に出ます。

作例は成人の、閉じた服だけです。丈は長いスカートか、くるぶしに近い丈か、長いズボンです。店の名前、胸の印、価格、年齢を下げる言い方は書きません。比較は、顔と背景を固定して、服の行だけを差し替えます。`,
      },
      {
        title: '基本の語',
        content: `入口の語は一つです。\`casual\` だけだと、服の形が残らず、雰囲気だけが軽くなります。服であることを hair や背景より前に書いてください。

| 日本語 | 書き方 | 扱い |
|---|---|---|
| カジュアル | \`casual\` | 短い語。形は次の行 |
| カジュアルな服 | \`casual clothes\` | 短い語として使われることがある |
| 普段着 | everyday outfit | 自然な英語。公式タグとしては断定しない |
| 私服 | casual clothes, everyday outfit | 上の二つで足りる。衣装名は足さない |
| ストリート | \`streetwear\` | 短い語。パーカーと運動靴を一つずつ |

\`casual outfit\` は自然な英語です。公式タグとしては断定しません。\`streetwear\` と \`casual clothes\` を同じ強さにすると、シャツとパーカーが二重になります。今日の系統は一つです。

**白いシャツと長いズボン。休日**

\`\`\`
1 adult woman, adult, casual clothes, white t-shirt, jeans, sneakers,
full body, standing, city sidewalk, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, suit, necktie
\`\`\`

街の背景を足す日は、服の行が決まってから [街のプロンプト](/guides/city-town-prompt-guide) の場所を一つ借ります。場所を先に詳しく書くと、人が看板の大きさまで小さくなります。

\`casual\` を人数の直後に置き、服の名詞をそのうしろに続けます。後ろへ押し出されると、背景の看板の方が先に軽くなって、服は平均の布のままです。everyday outfit は、同じ位置に置く自然な英語です。両方を残すと、指示が二回入って、袖が二重になることがあります。今日の入口は一つです。

私服という日本語を、文のモデルへ渡すときは、最後の節の自然文にします。タグのモデルへ日本語の「私服」だけを置いても、服の形は決まりません。上の名前、下の名前、靴の名前、を英語で一つずつ足してください。

コーデとして保存するときは、語順を上、下、靴、小物、で固定します。次の枚で靴だけをローファーから運動靴へ替えるなら、それ以外の行はコピーしたままにします。色を同時に替えると、どの変更で袖が変わったのかが残りません。気に入った一枚は、服の行だけを別のメモに残し、髪や背景の実験ではそのメモを先頭の人数のうしろへ貼ります。貼る前に、古い服の行が残っていないかを見てください。残っていると、新しい靴の下に前の靴がもう一足出ます。`,
      },
      {
        title: '部品は上、下、外、靴、鞄',
        content: `部品は層です。肌に近い上、下、その上に羽織るもの、靴、鞄。同じ層を二つ強くすると、袖が二重になります。

| 層 | 書き方 | 詳しいページ |
|---|---|---|
| 上 | \`t-shirt\`, \`hoodie\`, \`sweater\`, \`cardigan\` | パーカーは専用ページ |
| 襟のあるシャツ | oxford shirt, button-up shirt | 自然な英語 |
| 下 | \`jeans\`, wide-leg pants, \`long skirt\`, midi skirt | 自然な英語は断定しない |
| 外 | \`denim jacket\`, \`coat\` | コートは専用ページ |
| 靴 | \`sneakers\`, \`loafers\` | 靴は専用ページ |
| 鞄 | shoulder bag | 自然な英語。一つ |

\`hoodie\`、\`sweater\`、\`cardigan\`、\`jeans\`、\`coat\`、\`sneakers\`、\`loafers\` は短い語として使われることがあります。公式タグとしては断定しません。wide-leg pants、midi skirt、denim jacket、oxford shirt、button-up shirt、shoulder bag は自然な英語です。

帽子を足す日は [帽子のプロンプト](/guides/hat-prompt-guide) から一つだけです。フードと帽子を同じ強さにすると、頭の上に二つ載ります。眼鏡は [眼鏡・メガネのプロンプト](/guides/glasses-prompt-guide)、ワンピースの種類は [ドレスプロンプト](/guides/dress-prompt-guide) です。このページのスカートは、膝より下の長い丈か、くるぶしに近い丈にします。

**パーカーと長いズボン。運動靴**

\`\`\`
1 adult woman, adult, casual clothes, plain hoodie, wide-leg pants, sneakers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, suit, coat, hat
\`\`\`

**カーディガン、長いスカート、ローファー**

\`\`\`
1 adult woman, adult, everyday outfit, cardigan, white blouse, long skirt, loafers,
full body, standing, city sidewalk, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, sneakers, hoodie
\`\`\`

パーカーの日にコートの語が残っていると、丈が膝下まで伸びます。外着は一つにしてください。

層の順番は、肌に近い布から外へ、です。白いシャツの上にカーディガン、その下に長いスカート、最後にローファー、というように読みます。鞄は肩に一つまでです。鞄の色を服の色より先に強くすると、肩の布が鞄の色になります。眼鏡を足す日は、服が三枚同じになってからです。先に縁を強くすると、顔の輪郭より縁が主題になります。

ニットの日は \`sweater\` を上として一つ。カーディガンとニットを同じ強さにすると、前の開き方が平均になります。開いている日はカーディガン、閉じている日はニット、と決めてから生成します。デニムの上着は \`denim jacket\` で、ジーンズのズボンとは別の層です。両方をデニムにする日は、色を名詞へ付けて、上と下を次の節の分け方で分けます。`,
      },
      {
        title: '系統は一つ',
        content: `系統の名前を二つ残すと、ネクタイと運動靴が同時に出ます。今日の場面は一つです。

| 系統 | 書き方 | 残す部品 |
|---|---|---|
| シンプル | simple casual clothes | 自然な英語。無地を一つ |
| きれいめ | neat casual outfit | 自然な英語。シャツとローファー |
| ストリート | \`streetwear\` | パーカーと運動靴 |
| ナチュラル | natural everyday outfit | 自然な英語。ニットと長いスカート |
| オフィスカジュアル | office casual | 自然な英語。ブラウスとカーディガン |
| ビジネスカジュアル | business casual | 自然な英語。ジャケット。ネクタイは足さない |

公式タグとしては断定しません。礼服の部品が要る日は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) へ移り、このページの \`casual clothes\` は消します。

**オフィスカジュアル。膝より下のスカート**

\`\`\`
1 adult woman, adult, office casual, blouse, cardigan, midi skirt, loafers,
full body, standing, office lobby, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, sneakers, hoodie, necktie
\`\`\`

**ビジネスカジュアル。ネクタイは置かない**

\`\`\`
1 adult man, adult, business casual, navy jacket, oxford shirt, chinos, loafers,
full body, standing, office lobby, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, necktie, hoodie, sneakers
\`\`\`

ジャケットを足した日に \`hoodie\` が残っていると、前が二重になります。系統を変えるときは、前の系統の名詞を消してから生成します。

シンプルは、無地を一つ、小物を無し、です。きれいめは、シャツとローファーで、運動靴を消します。ストリートは、パーカーと運動靴で、ジャケットを消します。ナチュラルは、ニットと長いスカートで、柄を足しません。オフィスカジュアルは、ブラウスとカーディガンで、ネクタイを置きません。ビジネスカジュアルは、ジャケットを足しますが、礼服のネクタイまでは進みません。ネクタイが要る日は、このページを閉じてスーツのページへ移ります。

系統の名前だけを書いて部品を書かないと、モデルが平均の服を補います。名前は場面の目印で、形は部品が決めます。部品が三枚同じになってから、系統の名前を足すか、外すかを見てください。名前を外しても絵が変わらないモデルでは、部品の行だけを残します。`,
      },
      {
        title: '季節は、羽織るものを一つ',
        content: `季節は、外着か、袖の厚さか、で一つ伝えます。春夏秋冬を同じ文に書くと、コートと薄いシャツが重なります。人は成人のまま、服は閉じたままです。

| 季節 | 足すもの | 消すもの |
|---|---|---|
| 春 | \`cardigan\`, long skirt | \`coat\` |
| 夏 | \`t-shirt\`, chinos, \`sneakers\` | \`coat\`, scarf |
| 秋 | \`sweater\`, \`jeans\`, \`loafers\` | 薄いシャツだけの行 |
| 冬 | \`coat\`, \`sweater\`, long trousers | 夏の行 |

scarf は自然な英語です。公式タグとしては断定しません。冬にマフラーとコートと手袋を全部詳しく書くと、首元が平均の布になります。コートを主役にする日は、マフラーの色だけを足します。コートの形は専用ページです。

**春。カーディガン**

\`\`\`
1 adult woman, adult, casual clothes, cardigan, white blouse, long skirt, loafers,
full body, standing, city sidewalk, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, coat, scarf
\`\`\`

**冬。コートの下はニット**

\`\`\`
1 adult woman, adult, everyday outfit, coat, sweater, long trousers, ankle boots,
full body, standing, city sidewalk, overcast
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, t-shirt, sandals
\`\`\`

夏のファイルにコートの語が残っていたら、消してから再生成します。言葉で季節を書いても、部品が反対の季節のままだと、袖の長さは部品の側に寄ります。

春はカーディガンを一枚足すところまでです。夏は薄いシャツと長いズボンと運動靴で、コートの語は消します。秋はニットに替えて、ローファーを一つ。冬はコートを主役にして、下はニットを残します。四季の語を英語で spring, summer, autumn, winter と並べると、服より背景の木が先に変わります。季節は部品で伝えてください。語を足すのは、部品が三枚同じになってからです。

冬のマフラーは色を一つだけです。手袋まで同じ日に詳しく書くと、指の形が布に隠れます。手袋が要る確認は、コートの形が決まってから、別の複製で一つ足します。`,
      },
      {
        title: '成人の男性と、色は部品へ付ける',
        content: `成人の男性の普段着は、\`1 adult man\` から書きます。輪郭と髪の入口は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。このページでは服の行だけを持ち込みます。シャツ、長いズボン、ローファー、が起点です。パーカーにする日は、シャツの行を消します。

色は、服の名詞の前に一つ付けます。white t-shirt、navy pants、のようにです。\`white, navy\` と色だけを並べると、どちらが上か残りません。色の分け方の全体は [色プロンプト](/guides/color-prompt-guide) です。

| 部品 | 色の付け方 |
|---|---|
| 上 | white t-shirt |
| 下 | navy pants |
| 外 | grey cardigan |
| 靴 | white sneakers |

**成人の男性。紺のズボン**

\`\`\`
1 adult man, adult, casual clothes, white t-shirt, navy pants, white sneakers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, suit, necktie, navy shirt
\`\`\`

**色を行で分ける**

\`\`\`
1 adult woman, adult, white t-shirt
BREAK
navy pants, white sneakers, full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, navy shirt, white pants
\`\`\`

上の白がズボンへ移るときは、色を名詞にくっつけたまま、BREAK の前に上だけを残します。色を三色以上にすると、鞄まで平均の色になります。鞄を足す日は、色が二色に戻ってからです。

男性のファイルへ女性の長いスカートを残したまま貼ると、裾の形が混ざります。貼る前に下の行を、長いズボンへ書き換えてください。髪の長さを足すときは、男性のページから一つだけ借ります。服の行と髪の行を同じ日に両方変えると、どちらで輪郭が動いたのかが残りません。

色の名前は、白、紺、灰色、までを起点にします。蛍光の色を足すと、普段着ではなく看板に寄ります。色を変える実験は、形が三枚同じになった複製で、名詞の前の色だけを差し替えます。`,
      },
      {
        title: '同じ服を、次の枚にも残す',
        content: `同じ普段着を続けるときは、服の行を一字も変えないで、変えるのは背景か髪の一方だけです。良い一枚の番号をメモし、次の枚ではその番号を固定します。番号の置き方は [サンプラーのページ](/guides/stable-diffusion-sampler-guide) です。

服の文も、同じ語順で繰り返します。white t-shirt, navy pants, white sneakers を、枚ごとに言い換えないでください。言い換えると、別の服として読み替えられます。

\`\`\`
seed: 固定した数字
残す行: 1 adult woman, adult, white t-shirt, navy pants, white sneakers
変えてよい行: simple background か city sidewalk の一方
\`\`\`

**背景だけを街へ変えた枚**

\`\`\`
1 adult woman, adult, casual clothes, white t-shirt, navy pants, white sneakers,
full body, standing, city sidewalk, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, suit, coat
\`\`\`

服だけを塗り替えるときは、着ていた語を消してから新しい服を全部書きます。両方残すと、袖が二枚重なります。手順の骨格は [img2imgの使い方](/guides/img2img-guide) です。強さの数値は、モデルの配布ページに推奨があればそちらです。`,
      },
      {
        title: '文章で頼む。衣装に寄る、溶ける、色が入れ替わる',
        content: `ChatGPT や Gemini には、成人、上、下、靴、場面を一つの文にします。タグの列をそのまま貼ると、文の途中で服の名前が落ちます。

**自然文**

\`\`\`
An adult woman in casual clothes: a white t-shirt, navy pants, and white sneakers.
Full body, standing on a quiet city sidewalk, soft daylight.
She is an adult. The outfit stays closed and everyday.
\`\`\`

ネガティブ欄があるツールでは、次を足します。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, suit
\`\`\`

うまくいかないときは、部品を増やす前に一つ外します。

- 普段着が、決まった型の衣装に寄る。正向から衣装の名詞を消し、各作例の負向に入れてある除外の行を残します。このページの作例は普段着だけです。
- カーディガンとシャツが溶ける。層を一つに減らし、羽織るものを消すか、上を消します。
- 白と紺が入れ替わる。色を t-shirt と pants の名詞へ付け、BREAK で行を分けます。

礼服に切り替える日は、casual の行を全部消してから [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) を開きます。消さずに足すと、運動靴のままネクタイが出ます。服の入口へ戻るときは [服装プロンプト一覧](/guides/clothing-prompt-guide) です。

溶けるときは、層を一つ減らします。カーディガンを消すか、シャツを消すか、です。両方を残したまま語を足しても、境界は戻りません。色が入れ替わるときは、白がどの名詞の前にあるかを見て、ズボンの前に白が無いことを確認します。衣装に寄るときは、正向の衣装の名詞を消し、各作例の負向の行を残します。このページの正向は、普段着の部品だけです。

同じ服を別の背景で続ける日と、服を一枚だけ替える日は、ファイルを分けます。一つの文に、固定用の番号と、新しい服と、街の看板を全部残すと、どれが残すべき行なのかが次の日に分かりません。

戻る場所は、白いシャツ、紺のズボン、白い運動靴、の一枚です。系統を試して崩れたら、この一枚へ戻してから、次の系統を一つだけ足します。戻さずに足すと、前の系統の靴が残ります。入口のページへ戻るときも、持っていく語は上、下、靴の三つまでです。四つ目を足すと、先頭の adult が後ろへ押し出されます。`,
      },
    ],
    faq: [
      {
        q: '私服とカジュアルは同じ語ですか',
        a: 'このページでは同じ普段着です。短い語は casual か casual clothes、文で書くなら everyday outfit です。衣装の固有名は足しません。上、下、靴を一つずつ書いてください。',
      },
      {
        q: 'オフィスカジュアルとビジネスカジュアルの違いは',
        a: 'オフィスカジュアルはブラウスとカーディガン、またはシャツとローファーです。ビジネスカジュアルはジャケットを足し、ネクタイは置きません。両方の系統名を同じ強さにすると、靴が混ざります。',
      },
      {
        q: '同じコーデを次の画像でも着せるには',
        a: '服の行を同じ語順で残し、番号を固定して、背景か髪の一方だけを変えます。語を言い換えると別の服になります。',
      },
      {
        q: '服が決まった型の衣装に寄ります',
        a: '正向に衣装の名詞が残っていないかを見て消します。各作例の負向にある除外の行を残してください。このページの丈は長いスカートか長いズボンです。',
      },
      {
        q: '色が上下で入れ替わります',
        a: 'white t-shirt、navy pants のように色を名詞の前に付け、BREAK で上と下を分けます。色だけを並べると、どちらが上か残りません。',
      },
    ],
  },
}
