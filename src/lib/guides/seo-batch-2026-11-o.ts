/**
 * Twenty-third SEO batch (2026-11-20): ponytail, space, sitting poses,
 * rain, and shrines.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Wording is original. Tool names are limited to software the site already names.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_23_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'ponytail-prompt-guide': {
    sections: [
      {
        title: '一本に結ぶ。位置は一つ',
        content: `「ポニーテール プロンプト」「ポニーテール 種類 プロンプト」「ポニーテール 位置 プロンプト」「ポニーテール 英語」で探しているのは、髪を一つに束ねた形です。検索では、結ぶ高さ、リボン、長さ、短い結び、長い結び、編んだ結び、が一緒に出ます。欲しいのは、後頭部の結びが一つで、毛先が一本の束になっている絵です。左右に分かれた結びではありません。

このページは、結びの位置と長さを担当します。髪型の入口は [髪型プロンプト](/guides/hairstyle-prompt-guide) のままです。左右二つに分ける書き方は [ツインテールプロンプト](/guides/twintail-prompt-guide)、編む手順そのものは [編み込みプロンプト](/guides/braid-prompt-guide) です。役割は一行で分けます。入口のページは長さも色も見渡す表、このページは一本の束です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボン、コートのように、閉じて丈のある無地です。実在の人物と、作者名は書きません。年齢を下げる書き方は使いません。年齢を下げる服装も、集団で練習する場面も使いません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(ponytail:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(ponytail:1.2\\)\` と書きます。NovelAI の強調は \`{ponytail}\` と \`[ponytail]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、NovelAI の欄は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。強さの数値も目安で、配布ページの推奨があればそちらです。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`hair\` を書かずに ponytail だけを置くと、結びの位置が後頭部から肩へ揺れます。長さの語の直後に、結びの高さを一つ置いてください。高い結びと低い結びを同じ強さで残すと、後頭部に結びが二つできます。`,
      },
      {
        title: '種類と、結ぶ位置',
        content: `位置は一つです。今日見せたいのは、頭頂に近いか、うなじのあたりか、横に寄せているか、です。三つを同じ強さにすると、結びが頭の真ん中で平均になります。

\`ponytail\`、\`high ponytail\`、\`low ponytail\`、\`side ponytail\` は、短い語として使われることがあります。公式タグとしては断定しません。高い位置を自然な英語で足すなら ponytail tied high、うなじの高さなら ponytail at the nape、横に寄せるなら ponytail gathered to one side、です。公式タグとしては断定しません。左右を両方書かないでください。右か左かを一つにします。

編んだ一本は \`braided ponytail\` が短い語として使われることがあります。公式タグとしては断定しません。編み目の細かい名前は編み込みのページです。このページでは、束が一本であることを残します。ゆるい束は loose ponytail、毛先がばらけた束は messy ponytail、と自然な英語で書きます。両方を同じ強さにすると、結び目がほどけたのか、毛先だけが乱れたのかが残りません。

| 形 | 書き方 | 読み方 |
|---|---|---|
| 基本の一本 | \`ponytail\` | 短い語。高さは次の行 |
| 高い | \`high ponytail\` | 短い語。低い結びと同時にしない |
| 低い | \`low ponytail\` | 短い語。うなじのあたり |
| 横 | \`side ponytail\` | 短い語。左右は一つ |
| 編んだ一本 | \`braided ponytail\` | 短い語。編み方は編み込みのページ |
| ゆるい | loose ponytail | 自然な英語。messy と同時に強くしない |

**高い位置。横から結びを見せる**

\`\`\`
1 adult woman, adult, black hair, long hair, high ponytail, adult face,
white blouse, cardigan, upper body, from side,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, hair bun, low ponytail, side ponytail
\`\`\`

**うなじの低い結び**

\`\`\`
1 adult woman, adult, black hair, long hair, low ponytail, adult face,
white blouse, long skirt, upper body, from side,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, hair bun, high ponytail
\`\`\`

比較は、服と背景と顔を固定して、高さの行だけを差し替えます。横の結びを試す日は、\`side ponytail\` を一つ置いて、高い結びの語を消します。消さずに足すと、頭頂と横の両方に束が出ます。`,
      },
      {
        title: '長さを、束のうしろに置く',
        content: `長さは、結びの高さが三枚そろってから一つです。短い束、肩までの束、腰まで届く束、を同じ強さにすると、毛先が肩で止まります。

\`short ponytail\` は短い語として使われることがあります。公式タグとしては断定しません。短い髪そのものの種類は [ショートヘアのプロンプト](/guides/short-hair-prompt-guide) です。このページでは、短い髪を一つに束ねるときだけ \`short ponytail\` を足します。\`long hair\` が正向に残っていると、短い束が肩まで伸びます。短い日は、長い髪の語を消してください。

長い束は、\`long hair\` を残したまま \`ponytail\` を一つ足す方が、long ponytail という一語より長さが残りやすいことがあります。long ponytail は自然な英語です。公式タグとしては断定しません。腰のあたりまで見せる日は \`very long hair\` を自然な英語の full body と一緒に置きます。上半身のまま超ロングを書くと、毛先は胸のところで切れます。距離の名前は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

| 長さ | 書き方 | 画面 |
|---|---|---|
| 短い束 | \`short ponytail\` | \`long hair\` は消す |
| 肩のあたり | \`long hair, ponytail\` | 上半身でも毛先が見える |
| さらに長い | \`very long hair, ponytail\` | 全身か、膝まで入る距離 |
| 一語にまとめる | long ponytail | 自然な英語。長さが足りないときは分ける |

**短い束。長い髪の語は置かない**

\`\`\`
1 adult woman, adult, black hair, short hair, short ponytail, adult face,
white blouse, upper body, from side,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, twintails, hair bun
\`\`\`

**腰のあたりまで。全身**

\`\`\`
1 adult woman, adult, black hair, very long hair, ponytail, straight hair, adult face,
white blouse, long skirt, full body, standing, from side,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short hair, short ponytail, twintails, hair bun
\`\`\`

直毛を残したい日は \`straight hair\` を長さの直後に一つ置きます。質感の細目は [ストレートヘアのプロンプト](/guides/straight-hair-prompt-guide) です。波の語が同じ強さで残っていると、毛先だけが別の髪型になります。`,
      },
      {
        title: 'リボンと、髪を留めるもの',
        content: `留めるものは一つです。リボンと、布の輪と、細いゴムを同じ強さにすると、結び目のまわりに飾りが三重になります。今日足すのは一つです。

\`hair ribbon\` は短い語として使われることがあります。公式タグとしては断定しません。色は red hair ribbon のように、色を一つだけ前へ付けます。布の輪は scrunchie、細い留めは hair tie、と自然な英語です。公式タグとしては断定しません。商品名や、店の名前は書きません。素材の細目は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。このページでは、結び目に一つ付いているかだけを見ます。

| 留め | 書き方 | 同時にしないもの |
|---|---|---|
| リボン | \`hair ribbon\` | 色は一つ |
| 布の輪 | scrunchie | 自然な英語。リボンと同時に強くしない |
| 細い留め | hair tie | 自然な英語。飾りを増やさない |

**赤いリボンを一つ。高い結び**

\`\`\`
1 adult woman, adult, black hair, long hair, high ponytail, hair ribbon, adult face,
white blouse, cardigan, upper body, from side,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, hair bun, extra ribbon
\`\`\`

リボンが服の柄に溶けるときは、服を無地に戻し、リボンの色を髪と違う色に一つ変えます。色の分け方は [色プロンプト](/guides/color-prompt-guide) です。留め具が見えないときは、from side か from behind に移してから、留めの語を結びの直後へ置きます。正面のまま語を増やしても、後頭部の飾りは顔の前に出てきません。`,
      },
      {
        title: '前髪と、色',
        content: `前髪は、結びが決まってから形を一つです。ぱっつんと、流す前髪と、額を出す書き方を同じ強さにすると、眉のところで形が平均になります。形の一覧は [前髪プロンプト](/guides/bangs-prompt-guide) です。このページでは、束を残したまま、形を一つ借りてきます。

\`blunt bangs\` は短い語として使われることがあります。公式タグとしては断定しません。前髪なしに近い日は、前髪のページの額を出す節を見て、このページの \`ponytail\` は残してください。

色も一つです。黒の濃さは [黒髪のプロンプト](/guides/black-hair-prompt-guide)、金の色味は [金髪のプロンプト](/guides/blonde-hair-prompt-guide)、ほかの色は [髪色プロンプト](/guides/hair-color-prompt-guide) です。\`black hair\` を服より後ろに置くと、ブラウスまで暗くなります。色は hair まで書いて、人数の近くに置いてください。

| 足すもの | 書き方 | 結び |
|---|---|---|
| ぱっつん | \`blunt bangs\` | \`ponytail\` は残す |
| 黒 | \`black hair\` | 人数の直後 |
| 金 | \`blonde hair\` | 色味は金のページで一つ |

**ぱっつんと、高い結び。色は黒**

\`\`\`
1 adult woman, adult, black hair, long hair, high ponytail, blunt bangs, adult face,
white blouse, upper body, from side,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, hair bun, blonde hair
\`\`\`

金に替える日は、\`black hair\` を消してから \`blonde hair\` を一つ置きます。二つを残すと、束の半分だけが別の色になります。メッシュを足すのは、単色の束が三枚そろってからです。`,
      },
      {
        title: '後ろ姿と、成人の男性',
        content: `束を見せる日は、正面をやめます。正面は顔のページです。束の長さと高さを見る日は、from side か from behind を一つ。両方を同じ強さにすると、体の向きが斜めの平均で止まります。from behind と from side は自然な英語です。公式タグとしては断定しません。振り返りを足すなら looking back を自然な英語で一つ。顔と束の両方を同じ日に強くしないでください。

成人の男性は \`1 adult man\` から書きます。\`adult\` を残します。服はシャツと長いズボン、または無地の着物です。高い結びを一つ置くと、後頭部に束が残ります。丁髷は topknot と自然な英語です。\`chonmage\` は短い語として使われることがあります。公式タグとしては断定しません。\`ponytail\` と topknot を同じ強さにすると、頭の上と後頭部とで結びが二つできます。武士の髷の日は \`ponytail\` を消し、現代の束の日は topknot を消します。男性の服と輪郭の入口は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。

| 見せ方 | 書き方 | 向いている確認 |
|---|---|---|
| 横 | from side | 結びの高さと毛先 |
| 後ろ | from behind | 束が一本か |
| 男性の束 | \`1 adult man, ponytail\` | 髷の語は消す |
| 髷 | topknot | 自然な英語。束の語は消す |

**後ろから。束が一本**

\`\`\`
1 adult woman, adult, black hair, long hair, ponytail, hair ribbon, adult face,
white blouse, long skirt, full body, from behind,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, hair bun, facing viewer
\`\`\`

**成人の男性。低い束**

\`\`\`
1 adult man, adult, black hair, long hair, low ponytail, adult face,
shirt, long trousers, upper body, from side,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, topknot, hair bun
\`\`\`

着物の日は、シャツの語を消してから \`kimono\` を一つ置きます。袖と帯の細目は [着物プロンプト](/guides/kimono-prompt-guide) です。このページでは、頭の結びが一つであることを残します。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini、自然文に近い FLUX では、成人であること、結ぶ位置、長さ、留め具、服、見る方向を一つの文にします。タグの列をそのまま貼ると、括弧が文字として残ることがあります。2026年11月時点でも、画面の名前は版によって違います。最新の手順は、各サービスの公式ヘルプを確認してください。

**日本語**

\`\`\`
成人の女性。黒い長い髪を、頭頂に近い位置で一つに結び、赤いリボンを一つ付けています。
白いブラウスとカーディガン。横から、上半身。無地の背景、昼の柔らかい光。大人の顔です。adult。
入れないもの: 左右二つに分かれた結び、お団子、崩れた手、文字。
\`\`\`

**英語**

\`\`\`
An adult woman with long black hair tied into one high ponytail and a single red ribbon.
She wears a white blouse and a cardigan, seen from the side, upper body.
Plain background, soft daylight. She is an adult.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, twintails, hair bun
\`\`\`

通った文は、タグのファイルへ翻訳して別に保存します。Stable Diffusion や NovelAI では、このページのタグ例に戻してください。Midjourney では重みの括弧を外します。パラメータの考え方は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。`,
      },
      {
        title: '三枚そろえてから、次の語を足す',
        content: `結びの実験は、一日に一語です。高い位置が三枚同じに見えてから、長さを変えます。長さが三枚そろってから、リボンを足します。リボンが三枚見えてから、前髪か色かを一つ変えます。同じ日に高さと色と前髪を動かすと、束が安定したのか、色が勝ったのかが残りません。

保存するファイル名には、今日足した語を一つだけ書きます。高い結び、低い結び、横の結び、短い束、長い束、と分けてください。昨日のリボンを、今日の長さのファイルに残したまま開き直さないでください。リボンが残っていると、長さの比較が飾りの有無と混ざります。

横から見た枚と、後ろから見た枚は、別の確認です。横は結びの高さ、後ろは束が一本か、です。正面の顔を同じ日に良くしようとしないでください。顔を直す日は、束の語を固定したまま、表情のページへ移ります。束のページで笑顔の語を強くすると、口の形と結びの高さのどちらが動いたか残りません。

成人の男性の束を試す日は、女性のファイルを閉じます。服がブラウスのまま \`1 adult man\` だけを足すと、襟の形が平均になります。シャツと長いズボンに戻してから、低い結びを一つ置いてください。髷の日は、そのファイルをさらに分けます。現代の束と髷を一つの名前のファイルに交互に入れると、次に開いたとき先頭の語がどちらだったか消えます。

毛先が枠の外に出ている枚は、長さの確認に使いません。全身か、膝まで入る距離に戻してから、\`very long hair\` が効いたかを見ます。上半身のまま毛先を想像で補わないでください。見えていない毛先は、内巻きにも直毛にもなっていません。直毛を足すのは、毛先が画面の中に入ってからです。

色を借りるときも、同じ順番です。黒が三枚そろった束を保存し、その複製で \`black hair\` を消してから金を一つ置きます。元のファイルに金を上書きすると、戻る場所が無くなります。メッシュや内側の色は、単色が残っている日には足しません。髪色のページで色の名前を一つ決めてから、このページの束の行だけを持ってきてください。持ってくる語は、束の高さと長さと色の三つまでです。四つ目を足すと、先頭の \`adult\` が後ろへ押し出されます。

戻した起点には、人数、\`adult\`、色、長さ、結びの高さ、無地の服、横から、が残っていることを確認します。確認できたら、今日の一語だけを結びの直後へ置きます。置いた語で絵が動いたら、その語をファイル名に残して閉じます。動かなければ、その語はそのモデルでは弱いので、自然な英語の言い換えを一つだけ試します。言い換えも動かなければ、その層は今日は閉じます。閉じた語を残したまま、次の層を開かないでください。残った弱い語が、次のリボンや前髪の結果を濁します。

前髪を借りる日も同じです。束のファイルを複製し、前髪のページで決めた形を一つだけ足します。ぱっつんと、流す前髪と、額を出す書き方を一つの複製に重ねると、眉の位置が平均になり、束の高さまでは分からなくなります。額を出す日は、前髪の語を消してから生成します。消さずに「無い」と書いても、モデルは前髪の名詞の方を残すことがあります。

男性の低い結びを、女性の高い結びの翌日に続けるときは、服の行を全部入れ替えます。ブラウスと長いスカートが残った男性は、襟だけが別の服になります。入れ替えたあとに、\`adult\` が人数の近くに残っているかを見ます。後ろへ下がっているときは、色や長さより前へ戻してから生成してください。戻さずに重みだけを上げると、服の色が先に強くなり、結びはまた後ろへ下がります。

横の結びを試す複製では、左右を文章で両方書かないでください。右か左かを一つにし、ファイル名にもその向きを残します。翌日開いたとき、向きの語が消えていると、高い結びとの比較ができません。編んだ一本へ移る日は、編み込みのページで編み方を一つ決めてから、このページの高さの行だけを持ってきます。高さを持たずに \`braided ponytail\` だけを置くと、結びの位置がまた平均に戻ります。ゆるい束と、毛先がばらけた束も、別の複製です。同じファイルで交互に生成すると、結び目がほどけたまま保存されて、次の日の起点が汚れます。`,
      },
      {
        title: '束が消える、二つになる、背景に溶ける',
        content: `正面で束が消えるのは、結びが後頭部にあって、カメラが顔を見ているからです。語を足す前に、from side か from behind へ移します。正面のまま \`ponytail\` の重みだけを上げると、顔の横に毛がはみ出して、束にはなりません。

二つになるときは、\`twintails\` か side の語が正向に残っています。左右に分けたい日は [ツインテールプロンプト](/guides/twintail-prompt-guide) へ移り、このページの \`ponytail\` は消します。一本の日は、負向に twintails を残します。お団子に丸まるときは \`hair bun\` を正向から消し、負向に残します。半分だけ上げた髪型に寄るときは [ハーフアップのプロンプト](/guides/half-up-hair-prompt-guide) の語が残っていないかを見ます。

背景に溶けるときは、背景を無地に戻し、髪の色を背景と違う色に一つします。黒い束を暗い背景に置くと、毛先の輪郭が消えます。明るい無地にしてから、束の形が三枚見えて、背景を戻します。

| 症状 | 先にやること | まだ残るとき |
|---|---|---|
| 正面で束が無い | from side か from behind | 重みは一つまで |
| 左右に分かれる | twintails を消して負向へ | 高さの語を一つに |
| 丸い塊になる | hair bun を消す | 長さの語を戻す |
| 毛先が背景と同色 | 無地に戻す | 色を一つ変える |

束の行が人数の直後に残っているかを、形を変えるたびに見ます。後ろへ押し出されると、服の色が先に決まって、結びが弱くなります。`,
      },
    ],
    faq: [
      {
        q: 'ポニーテールは英語で何と書きますか',
        a: '基本は ponytail です。高い位置は high ponytail、低い位置は low ponytail、横は side ponytail と書かれることが多いです。これらは短い語として使われることがあり、公式タグとしては断定しません。長い説明は ponytail tied high のような自然な英語にします。',
      },
      {
        q: '高い結びと低い結びを同時に書けますか',
        a: '同じ強さでは書かないでください。後頭部に結びが二つできます。今日の高さは一つにして、もう一方は正向から消します。',
      },
      {
        q: '正面なのに束が見えません',
        a: '結びは後頭部にあります。from side か from behind に移してから、長さの語を残してください。正面のまま重みだけを上げても、束は顔の前に出てきません。',
      },
      {
        q: 'ツインテールになってしまいます',
        a: 'twintails を正向から消し、負向に残します。左右に分けたいときはツインテールのページへ移り、このページの ponytail は消してください。',
      },
      {
        q: '成人の男性の束と、髷はどう分けますか',
        a: '現代の一本は ponytail、髷は topknot と自然な英語で一つにします。両方を残すと結びが二つできます。人数は 1 adult man と adult から書いてください。',
      },
    ],
  },

  'space-prompt-guide': {
    sections: [
      {
        title: '宇宙は、場所を一つに決める',
        content: `「宇宙 プロンプト」「宇宙船 プロンプト」「宇宙空間 プロンプト」「宇宙ステーション プロンプト」「宇宙飛行士 プロンプト」「宇宙背景 プロンプト」で探しているのは、星の背景か、船の外側か、船の中か、軌道の施設か、服を着た飛行士か、です。検索では、宇宙人や、宇宙を背景にした猫も一緒に出ます。欲しい場所を一つに決めてから、ほかは足しません。

このページは、宇宙の場面を担当します。人物のうしろに星空を短く置くだけなら [背景プロンプト](/guides/background-prompt-guide) の入口のままです。役割は一行で分けます。背景のページは場所を一つ足す表、このページは船と空間と飛行士です。人型の機械は [ロボット・メカのプロンプト](/guides/robot-mecha-prompt-guide)、光の筋や粒子は [エフェクトのプロンプト](/guides/effect-prompt-guide)、詠唱の魔法は [魔法のプロンプト](/guides/magic-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult\` から書き、\`adult\` を残します。飛行士は閉じた宇宙服です。実在の人物、実在の機関の印、作品の船の名前は書きません。船の外側だけの枚と、星雲だけの枚には人数を書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(spacecraft:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(spacecraft:1.2\\)\` と書きます。NovelAI の強調は \`{spacecraft}\` と \`[spacecraft]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

作品名を入れると、その作品の船や印に寄ります。このページでは、形を部品で書きます。機関の紋や、実在の計画の名前も正向に足しません。`,
      },
      {
        title: '星空、星雲、惑星',
        content: `背景は一つです。星の粒、色の雲、渦、惑星の一つ、地球の弧、を同じ強さにすると、空が五層になります。今日の空は一つです。

\`starry sky\` は短い語として使われることがあります。公式タグとしては断定しません。宇宙空間そのものは outer space と自然な英語です。色の雲は nebula、渦は galaxy、一つの惑星は planet、と自然な英語です。公式タグとしては断定しません。地球を弧で見せる日は earth seen from orbit と自然な英語で一つ。地表の街と、軌道からの弧を同じ強さにすると、地面と宇宙が半分ずつになります。

星を濃くしたい日は、背景を黒に近い dark space と自然な英語で先に置きます。明るい空に星を足すと、粒が白飛びします。光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。このページでは、星の縁の光か、暗い空間の対比かを一つ。

| 空 | 書き方 | 同時に強くしないもの |
|---|---|---|
| 星の粒 | \`starry sky\` | 星雲を同じ強さにしない |
| 空間 | outer space | 自然な英語。地表の街 |
| 色の雲 | nebula | 自然な英語。渦と同時にしない |
| 渦 | galaxy | 自然な英語 |
| 惑星 | planet | 自然な英語。地球の弧とは別の日 |
| 軌道の地球 | earth seen from orbit | 自然な英語。印は書かない |

**星の粒だけ。人はいない**

\`\`\`
outer space, starry sky, dark space, planet, no people,
scenery, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, face, logo, text
\`\`\`

**色の雲。渦は足さない日**

\`\`\`
nebula, outer space, dark space, soft colored clouds, no people,
scenery, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, city, logo, text
\`\`\`

星が砂のように画面を埋めるときは、\`starry sky\` をいったん外し、暗い空間だけに戻します。粒は、空間が三枚そろってから弱く戻してください。数は書きません。`,
      },
      {
        title: '宇宙船の外と、船の中',
        content: `船は、外か中かを先に分けます。外観と、操縦席と、通路を同じ強さにすると、窓の外に同じ船がもう一艘浮きます。

spaceship は短い語として使われることがあります。丸く古い形に寄ることがあります。形を決めたい日は spacecraft と自然な英語で、推進の口を thrusters、アンテナを antenna、と一つずつ足します。公式タグとしては断定しません。両方を残すと、口と棒のどちらが船の特徴か残りません。作品の戦艦の名前は書きません。

中は一つです。操縦席は cockpit、通路は corridor、と自然な英語です。公式タグとしては断定しません。窓が大きい席は cockpit with a wide window と自然な英語で一つ。丸い扉は circular hatch と自然な英語です。部屋を三つ書かないでください。

| 部分 | 書き方 | 画面 |
|---|---|---|
| 外観 | spacecraft | 自然な英語。中の語は消す |
| 推進 | thrusters | 自然な英語。一つ |
| 操縦席 | cockpit | 自然な英語。通路と同時にしない |
| 通路 | corridor | 自然な英語 |
| 丸い扉 | circular hatch | 自然な英語。一つ |

**船の外。人はいない**

\`\`\`
spacecraft, thrusters, antenna, outer space, starry sky,
no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, face, cockpit, text, logo
\`\`\`

**操縦席。成人が一人**

\`\`\`
1 adult, adult, sitting in a cockpit, spacesuit, adult face,
wide window, stars outside, soft instrument light, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, logo, text
\`\`\`

船が惑星より大きくなるときは、惑星を画面の端の小さい弧にして、船を手前に一つ残します。尺度を二つの文章で同時に強くすると、窓の大きさまで一緒に揺れます。`,
      },
      {
        title: 'ステーションと、飛行士',
        content: `軌道の施設は、船とは別の日です。\`space station\` は短い語として使われることがあります。公式タグとしては断定しません。モジュールが連なる形は modular space station、輪の形は ring-shaped space station、と自然な英語で一つ。公式タグとしては断定しません。実在の施設の名前と、機関の印は書きません。

飛行士は \`1 adult\` と閉じた宇宙服です。\`astronaut\` と \`spacesuit\` は短い語として使われることがあります。公式タグとしては断定しません。ヘルメットは helmet、面の反射は reflective visor、と自然な英語です。顔を見せる日は clear visor と adult face を自然な英語で一つ。反射と透明を同じ強さにすると、面が半分だけ曇ります。背中の装置は life support backpack と自然な英語で一つまでです。

| 主題 | 書き方 | 外すもの |
|---|---|---|
| 施設 | \`space station\` | 船の操縦席 |
| 連なる形 | modular space station | 自然な英語。輪と同時にしない |
| 輪 | ring-shaped space station | 自然な英語 |
| 飛行士 | \`astronaut, spacesuit\` | 印、作品名 |
| 面 | reflective visor か clear visor | 自然な英語。両方強くしない |

**輪の施設。人はいない**

\`\`\`
ring-shaped space station, outer space, planet, starry sky,
no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, face, logo, text
\`\`\`

**成人の飛行士。面は透明**

\`\`\`
1 adult, adult, astronaut, spacesuit, helmet, clear visor, adult face,
earth seen from orbit, outer space, full body, soft rim light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, logo, text, fogged visor
\`\`\`

面が白い霧になるときは、reflective visor を消して clear visor を一つにします。顔を出さない日は、逆に反射の面を残し、顔の語を足しません。どちらも、印は書きません。`,
      },
      {
        title: '宇宙人と、宇宙の猫',
        content: `宇宙人を描く日は、友好的な形を一つにします。丸い頭、大きな目、丸みのある漫画調、のどれかです。傷ついた表現は使わない。武器の名前も書きません。人に見える形にするなら \`1 adult\` と \`adult\` を残し、服は閉じた宇宙服か、無地のつなぎです。

friendly alien は自然な英語です。公式タグとしては断定しません。漫画調は cartoon と自然な英語で一つ。写実と漫画調を同じ強さにすると、肌の質が平均になります。

猫は人ではありません。宇宙を背景にした猫は、猫のページの書き方へ戻します。種類と毛色の入口は [動物・ペットのプロンプト](/guides/animal-pet-prompt-guide) です。このページでは、星空を猫のうしろに短く置くところまでです。猫に人の顔を足す日は、別のファイルにして、このページの飛行士とは混ぜません。

| 主題 | 書き方 | 人数 |
|---|---|---|
| 友好的な宇宙人 | friendly alien, cartoon | 自然な英語。人に見えるなら adult |
| 猫と星空 | a cat, starry sky | 人の人数は書かない |

**漫画調の宇宙人。成人として一人**

\`\`\`
1 adult, adult, friendly alien, cartoon, rounded head, large eyes,
plain jumpsuit, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, injury, logo, text
\`\`\`

**星空の前の猫。人はいない**

\`\`\`
a cat, sitting, starry sky background, soft rim light,
no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, face, logo, text
\`\`\`

猫の毛色を変える日は、動物のページで色を一つ決めてから戻ってください。このページで色を三色足すと、星雲の色と毛が混ざります。`,
      },
      {
        title: '画風と、星の縁の光',
        content: `画風は一つです。写実の科学映像、アニメ、古い未来図、粒の絵、を同じ強さにすると、線の太さが平均になります。

realistic science fiction は自然な英語です。アニメは \`anime style\` が短い語として使われることがあります。公式タグとしては断定しません。古い未来図は retro science fiction と自然な英語です。公式タグとしては断定しません。粒で描く日は [ドット絵のプロンプト](/guides/pixel-art-prompt-guide) へ移り、このページの場面を一つだけ持っていきます。作者名と、作品の題名は書きません。

光は、星の縁を一つです。rim light は短い語として使われることがあります。公式タグとしては断定しません。暗い空間との対比は dark space を残したまま、縁の光を弱く一つ足します。照明を三種類にすると、ヘルメットの面が白く飛びます。

| 画風 | 書き方 | 光 |
|---|---|---|
| 写実 | realistic science fiction | 自然な英語。縁の光は一つ |
| アニメ | \`anime style\` | 写実と同時にしない |
| 古い未来図 | retro science fiction | 自然な英語。作品名は書かない |
| 粒 | ドット絵のページ | 場面は一つ持っていく |

**アニメの船。外観だけ**

\`\`\`
anime style, spacecraft, thrusters, outer space, starry sky,
rim light, no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, person, people, logo, text
\`\`\`

縁の光が船の形を消すときは、rim light を外して、暗い空間と船だけに戻します。光を戻すのは、船の輪郭が三枚見えてからです。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、場所、船か人か、印を入れないこと、を文で書きます。タグの列はそのまま貼りません。

**日本語**

\`\`\`
軌道から見た地球の弧と、暗い宇宙。成人が一人、閉じた宇宙服と透明な面で立っています。
顔は大人です。adult。機関の印も、読める文字も入れません。星の縁の光を一つ。
\`\`\`

**英語**

\`\`\`
An adult astronaut in a closed spacesuit and a clear visor, standing with the curve of the earth behind them.
Dark outer space, one rim light from a star. The face is an adult face.
No logos, no readable text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, logo, text
\`\`\`

通った文は、タグのファイルへ別に保存します。Stable Diffusion や NovelAI では、このページのタグ例に戻してください。`,
      },
      {
        title: '場面をファイルで分けて残す',
        content: `宇宙の実験は、空、船、人、を別の日にします。星空が三枚同じに見えてから、船の外観を足します。船の輪郭が三枚残ってから、操縦席に移ります。飛行士を足すのは、窓の外の星が安定してからです。同じ日に星雲と船とヘルメットを強くすると、面の反射の中に星雲が入り、顔の確認ができなくなります。

ファイル名は、空、船の外、操縦席、通路、施設、飛行士、宇宙人、猫、と分けます。昨日の船を、今日の星雲のファイルに残したまま開かないでください。船が残っている星雲は、比較になりません。人のいない枚に \`1 adult\` を残すと、端に顔が出ます。景色のファイルを開いたら、人数の行が消えているかを先に見ます。

印が出た枚は、語を足して消しません。実在の計画の名前、紋、作品の船の名前が正向に無いかを見て、無い起点から作り直します。起点には、暗い空間と、主題一つと、文字が無いこと、だけが残っています。アンテナや推進の口は、起点が三枚そろってから一つです。両方を同じ日に足すと、棒と口のどちらが形を決めたか残りません。

尺度は、手前を一つに決めてメモします。船を見せる日は、惑星を端の弧にするとファイル名に書きます。飛行士を見せる日は、施設を背景に下げると書きます。メモが無い枚を翌日開くと、大きい方が手前だったのか、語が強かっただけなのかが分かりません。

面の実験も分けます。透明な面のファイルと、反射する面のファイルを混ぜないでください。透明の日に反射の語が残っていると、曇りの原因が面の種類なのか、光が強いのかが残りません。縁の光を足すのは、面の種類が決まったあとです。光を先に強くすると、ヘルメットの輪郭が白く飛んで、顔の有無が見えません。

猫の枚は、人のファイルと混ぜません。星空を持っていく語は一つまでです。毛色を変える日は、動物のページで色を決めてから、このページの星空の行だけを足します。宇宙人の漫画調と、猫の毛並みを同じファイルに置くと、どちらも中間の質感になります。画風を変える日は、写実かアニメか古い未来図かをファイル名に書いて、ほかの画風の語を消してから生成してください。

起点に戻るときの持ち帰りは、場所の語を一つ、主題の語を一つ、光を一つまでです。星雲と船と飛行士を同じ文に戻すと、この節で分けた意味が消えます。迷ったら、暗い空間と、文字が無いこと、だけに戻し、今日の主題を一つ足し直します。足し直した行に \`adult\` が要るのは、人がいる主題だけです。船の外観や星雲では、人数の行を入れたまま「いない」と書かないでください。行が残っていると、窓の端に顔が出ます。

通路と操縦席を同じ日に見ない、という決まりもファイル名で守ります。通路の日は cockpit を消し、操縦席の日は corridor を消します。両方の名詞が残った枚は、窓の位置が平均になり、尺度の確認に使えません。丸い扉を足すのは、通路の壁が三枚そろってからです。扉を先に強くすると、通路そのものが扉の枠だけになります。

飛行士の背中の装置は、面の種類が決まった複製に一つだけ足します。装置と、反射する面と、地球の弧を同じ日に足すと、白い面の原因が光なのか、装置の形なのかが残りません。装置が要らない日は、その語を正向から消します。消さずに重みを下げても、背中の箱は残りやすいです。

宇宙人のファイルでは、武器の名詞が混ざっていないかを開くたびに見ます。混ざっていたら、その複製は捨て、丸い頭と無地のつなぎだけの起点から作り直します。猫のファイルでは、宇宙服の語が残っていないかを見ます。猫に服を着せた枚は、人の飛行士とは別の話題なので、このページの比較には使いません。

惑星を一つだけ見せる日は、地球の弧の語を消します。両方を「大きい」と書くと、窓の外が二枚の空になります。地球の弧の日は、地表の街の語が残っていないかを見ます。残っていると、軌道ではなく屋上からの夜景になります。街が欲しい日は、背景のページへ戻ってください。このページの空は、地表の建物を持ちません。星の粒を戻すときも、数は書きません。弱い一語で足りないときは、暗い空間を先に確認し、粒の重みは 1.1 から 1.3 の目安で一つだけ上げます。それ以上は、砂のような画面に戻りやすいので、今日はそこで止めます。`,
      },
      {
        title: '星がうるさい、尺度が違う、面が曇る',
        content: `星がノイズのように画面を埋めるときは、\`starry sky\` を外して dark space だけに戻します。粒は弱く一つ戻し、数は書きません。星を強くする重みと、ノイズを消す語を同じ日に足すと、どちらが効いたか残りません。

尺度が狂うときは、手前の主題を一つにします。船が惑星より大きい日は、惑星を端の弧にします。飛行士が施設より大きい日は、施設を背景の一つに下げ、人は full body のままにします。両方を「大きい」と書くと、平均の大きさで止まります。

面が曇る、顔が隠れる、ときは clear visor と adult face を一つにします。反射の面を残したまま顔を要求すると、面の中に別の顔が映ります。顔が要らない日は、反射の面だけを残し、顔の語を消します。

| 症状 | 戻す場所 | そのあと一つ |
|---|---|---|
| 星が砂 | dark space | 粒を弱く戻す |
| 船が惑星より大きい | 船を手前 | 惑星は端の弧 |
| 面が白い | clear visor | adult face を一つ |
| 印が出る | 名前を全部消す | no logo を残す |

印が出た枚は、語を足して消そうとせず、名前の無い起点から作り直します。

作り直した起点は、暗い空間、主題一つ、文字が無いこと、だけです。主題が船なら推進かアンテナかを一つ、主題が飛行士なら面の種類を一つ、と次の日まで足しません。同じ日に二つ足して「だいたい合った」枚を保存すると、翌日の比較ができません。合った枚は、足した語がファイル名に残っているときだけ残します。名前が「宇宙」だけのファイルは、起点に戻してください。`,
      },
    ],
    faq: [
      {
        q: '宇宙船は spaceship と spacecraft のどちらですか',
        a: 'spaceship は短い語として使われることがあり、丸く古い形に寄ることがあります。形を決めたいときは spacecraft と自然な英語で、thrusters か antenna を一つ足してください。公式タグとしては断定しません。',
      },
      {
        q: '実在の機関の名前は書けますか',
        a: '書きません。紋や、実在の計画の名前も正向に足しません。軌道の施設は space station と、形を一つだけ自然な英語で書いてください。',
      },
      {
        q: 'ヘルメットの中の顔が見えません',
        a: 'clear visor と adult face を一つにします。反射の面を同じ強さで残すと、面が半分だけ曇ります。顔を出さない日は、反射の面だけを残してください。',
      },
      {
        q: '星がノイズのようになります',
        a: 'starry sky をいったん外し、dark space だけに戻します。粒は、空間が安定してから弱く一つ戻します。数は書かないでください。',
      },
      {
        q: '宇宙の猫はどこで書きますか',
        a: '猫の種類と毛色は動物・ペットのページです。このページでは、星空をうしろに短く置くところまでにして、人の人数は書かないでください。',
      },
    ],
  },

  'sitting-pose-prompt-guide': {
    sections: [
      {
        title: '座り方は、姿勢を一つ',
        content: `「座り方 プロンプト」「プロンプト 座り」「stable diffusion 座り方」「あぐら プロンプト」「斜め座り プロンプト」で探しているのは、椅子か床かの上で、足の形を一つに固定する書き方です。検索では、正座、あぐら、横座り、膝を抱える座り、が一緒に出ます。欲しいのは、服を着たままの日常の休み方です。人の上に座る形や、体を大きく開く形は使いません。

このページは、座り方の細目を担当します。立つ、歩く、腕の入口は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) のままです。役割は一行で分けます。入口のページは姿勢の一覧、このページは座った足の形です。手の指は [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide)、入れないものの全体は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\`、または \`2 adults\` から書き、\`adult\` を残します。服はブラウス、カーディガン、長いスカート、シャツ、長いズボン、コートのように、閉じて丈のある無地です。カメラは目の高さか、上からです。下から見上げる角度は使いません。実在の人物は書きません。年齢を下げる書き方は使いません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(sitting:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(sitting:1.2\\)\` と書きます。NovelAI の強調は \`{sitting}\` と \`[sitting]\` です。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`sitting\` だけだと、椅子があるのか床なのかが残りません。場所を一つ、足の形を一つ、手の位置を一つ、までにしてください。`,
      },
      {
        title: '椅子、床、正座、あぐら',
        content: `場所と足の形は、別の行です。椅子に座ることと、足を組むことと、床にあぐらをかくことを同じ強さにすると、家具の中に足が溶けます。

\`sitting\` と \`sitting on chair\` は短い語として使われることがあります。公式タグとしては断定しません。床は \`sitting on floor\` が短い語として使われることがあります。正座は \`seiza\` が短い語として使われることがあります。公式タグとしては断定しません。畳の部屋は \`tatami\` を一つまでです。

あぐらは sitting cross-legged と自然な英語で書きます。\`crossed legs\` は短い語として使われることがあります。椅子の上で足を組む意味に寄ることがあるので、床のあぐらの日は sitting on floor と sitting cross-legged をセットにします。古い一覧では indian style と書かれていることがあります。国の名前に座り方を結びつけた古い呼び方なので、新しく書くときは使いません。

膝を抱えて座るは hugging own knees と自然な英語です。\`hugging own legs\` は短い語として使われることがあります。公式タグとしては断定しません。このページでは「膝を抱えて座る」と呼びます。割座は、両膝を曲げて足を左右へ崩す形です。sitting with legs folded to the sides と自然な英語で書きます。\`wariza\` は短い語として使われることがあります。公式タグとしては断定しません。

| 姿勢 | 書き方 | 読み方 |
|---|---|---|
| 座る | \`sitting\` | 短い語。場所は次の行 |
| 椅子 | \`sitting on chair\` | 短い語 |
| 床 | \`sitting on floor\` | 短い語 |
| 正座 | \`seiza\` | 短い語。畳は一つ |
| あぐら | sitting cross-legged | 自然な英語。床とセット |
| 足を組む | \`crossed legs\` | 短い語。椅子とセット |
| 膝を抱える | hugging own knees | 自然な英語 |
| 割座 | sitting with legs folded to the sides | 自然な英語。\`wariza\` は短い語 |

**椅子にまっすぐ。手は膝**

\`\`\`
1 adult woman, adult, sitting on chair, hands on lap, adult face,
white blouse, cardigan, long skirt, full body, eye level,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing, extra legs
\`\`\`

**床のあぐら**

\`\`\`
1 adult man, adult, sitting on floor, sitting cross-legged, hands on knees, adult face,
shirt, long trousers, full body, from above,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing, chair, extra legs
\`\`\`

正座の日は、あぐらの語を消して \`seiza\` を一つにします。両方を残すと、膝の向きが平均になります。`,
      },
      {
        title: '斜め、ベンチ、手の位置',
        content: `斜め座りは、体の向きを一つずらす書き方です。torso turned slightly, sitting on chair と自然な英語で書きます。公式タグとしては断定しません。45 という数字を角度の約束としては書きません。モデルが角度の数字を守るとは限りません。横からの from side と、斜めの three-quarter view を同じ強さにすると、肩の線が平均になります。見る方向の名前は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。上から見る日は [見下ろす構図・俯瞰](/guides/high-angle-prompt-guide) の \`from above\` を一つ。目の高さは eye level と自然な英語です。

座る家具は一つです。階段は sitting on stairs、ベンチは sitting on a bench、縁に浅く掛けるは sitting on the edge of a bench、と自然な英語です。公式タグとしては断定しません。後ろに手をついて軽く傾くは leaning back on hands と自然な英語で一つ。手を二箇所に置くと、指が増えます。

手は一つです。膝の上は hands on lap、床について支えるは one hand on the floor、と自然な英語です。\`hands on lap\` は短い語として使われることがあります。公式タグとしては断定しません。本を持たせるのは、空の手が三枚崩れていないあとです。本は指を隠す役にもなります。

| 足し方 | 書き方 | 一つにする理由 |
|---|---|---|
| 斜め | torso turned slightly | 自然な英語。真横と同時にしない |
| 階段 | sitting on stairs | 自然な英語 |
| ベンチ | sitting on a bench | 自然な英語 |
| 縁 | sitting on the edge of a bench | 自然な英語 |
| 手をつく | leaning back on hands | 自然な英語。手は一箇所 |
| 上から | \`from above\` | 下から見上げない |

**ベンチの縁。目の高さ**

\`\`\`
1 adult woman, adult, sitting on the edge of a bench, hands on lap, adult face,
coat, long skirt, full body, eye level, park, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing, extra legs, extra people
\`\`\`

**手をついて、少し傾く。上から**

\`\`\`
1 adult man, adult, sitting on floor, leaning back on hands, adult face,
shirt, long trousers, full body, from above,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing, extra fingers, extra legs
\`\`\`

手が溶けるときは、持つ物を足す前に、手を膝の上へ戻します。指の直しは手のページです。`,
      },
      {
        title: '並んで座る二人',
        content: `二人は \`2 adults\` から書きます。\`1 adult woman\` と \`1 adult man\` を残し、\`adult\` をそれぞれの行に残します。並びは sitting side by side と自然な英語で一つ。向かい合いは sitting face to face と自然な英語で、同じ日に強くしません。

二人の距離の入口は [二人構図プロンプト](/guides/two-person-composition-prompt-guide) です。男性二人が並んで座るときは [BLポーズ集](/guides/bl-pose-collection-guide) を、中立な並びとして見てください。このページでは、肩が触れるか、手を膝に置くか、までです。抱える形や、口づけは足しません。

| 並び | 書き方 | 人数 |
|---|---|---|
| 横並び | sitting side by side | \`2 adults\` |
| 向かい | sitting face to face | 自然な英語。並びと同時にしない |

**ベンチに二人。横並び**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
sitting side by side on a bench, hands on laps, coats,
full body, eye level, park, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing, extra people, extra legs
\`\`\`

体が一つに溶けるときは、一人の座りが三枚安定してから、二人目を足します。一人の文に二人の語を足しても、画面の人数は安定しません。`,
      },
      {
        title: '猫の香箱と、カエルの形',
        content: `香箱座りは、猫が足を体の下に畳む形です。人の姿勢の名前としては使いません。猫の例は、人の人数を書かずに置きます。loafing cat と自然な英語です。公式タグとしては断定しません。毛色と種類の続きは [動物・ペットのプロンプト](/guides/animal-pet-prompt-guide) です。

カエル座りは、カエルが肢を横に開いて座る形として説明します。人の絵で膝を大きく開く座りは使わない。人にその形を頼む日は、このページでは作りません。カエルそのものを一匹描く枚と、服を着た大人の正座の枚は、ファイルを分けます。

| 題 | 書き方 | 人 |
|---|---|---|
| 猫の香箱 | loafing cat | 自然な英語。人数は書かない |
| カエル | a frog, sitting | 人の姿勢には使わない |
| 人の正座 | \`seiza\` | 大人だけ |

**猫。香箱**

\`\`\`
a cat, loafing cat, paws tucked, sitting, simple background, soft daylight,
no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, extra legs
\`\`\`

**カエル。一匹**

\`\`\`
a frog, sitting, front view, pond edge, soft daylight,
no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people
\`\`\`

猫の日に \`seiza\` を残すと、猫が人の膝の形を借ります。動物のファイルでは、人の姿勢の語を消してください。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、成人、椅子か床か、足の形、手の位置、カメラの高さ、を一つの文にします。下から見る、とは書かないでください。

**日本語**

\`\`\`
成人の女性が、木の椅子にまっすぐ座っています。手は膝の上。
白いブラウスと長いスカート。カメラは目の高さ。全身。無地の背景、昼の光。
大人の顔です。adult。下からは見ません。
\`\`\`

**英語**

\`\`\`
An adult woman sitting straight on a wooden chair, hands on her lap,
wearing a white blouse and a long skirt. Eye-level camera, full body.
Plain background, daylight. She is an adult. Do not look up from below.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, standing
\`\`\`

通った文は、タグのファイルへ別に保存します。Stable Diffusion や NovelAI では、このページのタグ例に戻してください。`,
      },
      {
        title: '姿勢を一つずつファイルに残す',
        content: `座り方は、一日に一つだけ変えます。椅子にまっすぐ座った枚が三枚同じに見えてから、足を組む語を足します。床のあぐら、正座、膝を抱える形、割座は、それぞれ別のファイルです。昨日の椅子を、今日の床のファイルに残すと、足が家具の中に溶けます。ファイルを開いたら、場所の語が一つだけかを先に見てください。

手の位置も、姿勢が決まってからです。膝の上で三枚崩れていないことを確認してから、床に手をつく形へ移ります。本を持たせるのは、その次です。同じ日に手の位置と足の形を変えると、指が増えた原因が本なのか、膝を抱える腕なのかが残りません。崩れた枚は保存せず、空の手が安定したファイルへ戻ります。

カメラは、目の高さを起点にします。上から見る枚は、複製を作って \`from above\` を一つ足します。元のファイルに上書きすると、目の高さへ戻れません。下から見る語が混ざった枚は、削除して起点から作り直します。このページでは、下からの確認はしません。

二人の並びは、一人の座りが残っている日だけです。一人のファイルを複製し、人数を \`2 adults\` に変えて、sitting side by side を一つ足します。元の一人のファイルは残します。二人の枚で足が溶けたら、二人目を消して一人に戻し、どの語で増えたかを見ます。向かいの配置は、さらに別の複製です。並びと向かいを一つのファイルで交互に生成しないでください。

猫とカエルは、人のファイルに入れません。人の \`seiza\` が猫のファイルに残っていると、足の畳み方が人の膝になります。動物のファイルを開いたら、人数の行が無いことを確認してから生成します。人の姿勢へ戻る日は、動物のファイルを閉じて、椅子の起点を開きます。

骨格の参照を使う日も、プロンプト側の姿勢は一つに残します。参照画像と、文章の足の形が違うと、膝が両方の平均になります。参照に任せる日は、足の形の語を外し、服と場所だけを残してください。参照のファイルも、信頼できる配布元のものだけを入れます。表示名が画面と違うときは、公式の説明を見て、このページの語を増やして合わせようとしないでください。

椅子の色と、服の色は、境界が見えてから一つだけ変えます。両方を同じ日に変えると、溶けた原因が柄なのか、姿勢の語が多すぎるのかが残りません。無地の椅子、無地の服、無地の床、が起点です。柄を戻すのは、膝の線が三枚続いて見えてからです。床のあぐらの起点には、椅子の名詞が一つも残っていないことを確認します。残っていると、床なのに脚の間に家具の線が出ます。

正座の複製では、畳の語を一つまでにします。畳と、座布団と、床の板を同時に書くと、膝の下の面が平均になり、正座か椅子の浅い座りかが分かりません。膝を抱える形の複製では、抱える腕を一つにし、もう一方の手の仕事を足しません。割座の複製では、足を左右へ崩す自然な英語を一つだけ残し、正座の語を消します。

二人のファイルで肩の位置を直す日は、ベンチの語を固定したまま、sitting side by side だけを見ます。距離の細かい言い換えを三つ重ねると、人が一人に戻ります。一人に戻った枚は失敗として捨て、一人の起点がまだ残っていることを確認してから、もう一度だけ二人にします。三回続けて一人に戻るときは、そのモデルでは二人の座りが弱いので、今日は一人の姿勢に戻って終わります。語を五個まで増やして人数を取り戻そうとしないでください。増やすほど、先頭の \`adult\` が後ろへ下がります。

階段とベンチと、縁に浅く掛ける形は、椅子の起点とは別の複製です。家具の名詞を二つ残すと、座面の高さが平均になり、足が床に届いているのかが分かりません。今日の家具は一つです。上から見る複製を作るときも、家具は変えないでください。高さと家具を同じ日に動かすと、足が短く見えた原因がカメラなのか、座面なのかが残りません。目の高さの起点は、上書きせずに残します。斜めの体の向きを足すのは、その起点の複製です。真横の語と斜めの語を同時に残さないでください。肩の線が平均になると、足の形の確認まで一緒にぼけます。

膝を抱える形の名前は、このページでは「膝を抱えて座る」で統一します。集団で体を動かす場面の呼び方は使いません。手は自分の膝に回し、もう一つの仕事を持たせないでください。抱える腕と、本を持つ手を同じ複製に置くと、指の数が平均になります。猫の香箱と、人の正座も同じ日に比べません。比べるときは、人のファイルを閉じてから動物のファイルを開きます。開いたファイルに人の服の語が残っていたら、生成する前に消してください。`,
      },
      {
        title: '浮く、椅子に溶ける、足が折れる',
        content: `体が椅子から浮くときは、\`sitting on chair\` を人数の直後へ移し、負向に standing を残します。\`sitting\` だけを強くしても、足は床に着きません。背景に椅子の形が無いときも浮きます。椅子を一つ、無地の床に置いてから、人を座らせてください。

椅子と体が溶けるときは、家具の語を減らし、服の輪郭を無地に戻します。柄の椅子と柄の服を同じ強さにすると、境界が消えます。境界が見えてから、椅子の色を一つ戻します。

足が折れる、増える、ときは、足の形を一つにします。正座とあぐらと、膝を抱える形を同時に残さないでください。まだ折れるときは、full body を膝まで入る距離に少し寄せ、手は膝の上で指を隠します。指の語は手のページです。

姿勢を文章で固定しきれないときは、参照画像の骨格を渡す方法があります。2026年11月時点の案内では、OpenPose と呼ばれる骨格の前処理を使う場合があります。表示名は版によって違います。最新の手順は公式ドキュメントと [ControlNetの使い方](/guides/controlnet-guide) を確認してください。プロンプト側は、服と場所に寄せます。

| 症状 | 先にやること | まだ残るとき |
|---|---|---|
| 浮く | sitting on chair を前へ | 負向に standing |
| 溶ける | 家具を無地に | 服の柄を消す |
| 足が増える | 姿勢を一つ | 手は膝の上 |
| 文章で固定できない | 骨格の参照 | ControlNet のページ |

骨格のファイルも、信頼できる配布元のものだけを入れてください。

参照を外して文章に戻る日は、足の形を一つだけ書き直します。正座の枚に、あぐらの語が残ったまま参照を外すと、膝が両方の形を取ります。外したあとの一枚目は、無地の服と無地の床で、姿勢の確認だけに使います。背景の柄や、二人目は、その一枚が安定してから足します。安定の判断は、膝の数と、足の着地と、手が一箇所であること、の三つです。三つが揃わない枚は保存しません。

揃った枚の次に足してよいのは、背景か、二人目か、どちらか一つです。公園のベンチに変える日は、無地の床の語を全部消してから sitting on a bench を置きます。消さずに足すと、床とベンチが重なります。二人目を足す日は、背景を無地のままにします。背景と人数を同じ日に変えないでください。変えたあとに膝が増えたら、最後に足した語を外して、揃った枚へ戻ります。戻るファイルを上書きしていないことが、このページの手順の全部です。`,
      },
    ],
    faq: [
      {
        q: 'sitting だけで座りますか',
        a: '場所までは決まりません。椅子なら sitting on chair、床なら sitting on floor を足してください。足の形は、それとは別の一つです。',
      },
      {
        q: 'あぐらはどの英語ですか',
        a: 'このページでは sitting cross-legged と自然な英語で、床とセットにします。古い一覧の indian style は、国の名前に座り方を結びつけた呼び方なので、新しく書くときは使いません。',
      },
      {
        q: '正座と割座を同時に書けますか',
        a: '書かないでください。膝の向きが平均になります。割座は sitting with legs folded to the sides と自然な英語で一つ、正座の日は seiza を一つにします。',
      },
      {
        q: '座っているのに足が立ちます',
        a: 'sitting on chair を人数の直後へ移し、負向に standing を残します。背景に椅子が無いときも浮くので、椅子を一つ先に置いてください。',
      },
      {
        q: 'カメラは下からでもよいですか',
        a: 'このページでは使いません。目の高さか、from above の上からにします。下から見上げると、足の形の確認より先に構図が別の意味へ寄ります。',
      },
    ],
  },

  'rain-prompt-guide': {
    sections: [
      {
        title: '雨は、降り方を一つ',
        content: `「雨 プロンプト」「雨の日 プロンプト」「天気 雨 プロンプト」で探しているのは、空から降る雨と、傘と、雨のあとの地面です。検索では、街、窓、水たまり、虹、梅雨の花、が一緒に出ます。欲しいのは、服を着た大人か、人のいない景色です。人の服や体を濡らす書き方は使わない。\`wet\` は、濡れた路面の wet pavement、濡れた地面の wet ground、ガラスの雨粒、に限って使います。

このページは、雨の場面を担当します。山や海の広い景色は [風景のプロンプト](/guides/landscape-prompt-guide)、通りの種類は [街のプロンプト](/guides/city-town-prompt-guide)、雪は [雪・冬のプロンプト](/guides/snow-winter-prompt-guide) です。役割は一行で分けます。街のページは建物の並び、このページは雨です。光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\`、または \`2 adults\` から書き、\`adult\` を残します。服はレインコート、トレンチコート、長いズボン、ブーツのように、閉じて丈のある布です。人のいない街や空には人数を書きません。実在の店の名前は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(rain:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(rain:1.2\\)\` と書きます。NovelAI の強調は \`{rain}\` と \`[rain]\` です。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`rain\` だけだと、筋が細すぎて傷のように見えることがあります。降り方を一つ、地面の反射を一つ、までにしてください。`,
      },
      {
        title: '小雨、本降り、筋',
        content: `降り方は一つです。霧のような小雨、太い本降り、嵐、を同じ強さにすると、空が白い平均になります。

\`rain\` は短い語として使われることがあります。公式タグとしては断定しません。小雨は light rain か drizzle、と自然な英語で一つ。本降りは heavy rain、筋を密にするは dense rain streaks、と自然な英語です。公式タグとしては断定しません。嵐は storm と自然な英語で、雷は次の節まで足しません。今日の空は、小雨か本降りか、です。

地面を濡らす日は wet pavement か wet ground を一つ。人の服には wet を付けません。曇りは \`overcast\` が短い語として使われることがあります。公式タグとしては断定しません。晴天の語が残っていると、雨の筋が空の青に負けます。

| 降り方 | 書き方 | 地面 |
|---|---|---|
| 基本 | \`rain\` | まだ反射を足さない |
| 小雨 | light rain | 自然な英語。drizzle と同時にしない |
| 霧雨 | drizzle | 自然な英語 |
| 本降り | heavy rain | 自然な英語 |
| 筋 | dense rain streaks | 自然な英語。数は書かない |
| 路面 | wet pavement | 人には使わない |

**小雨。人はいない街**

\`\`\`
city street, light rain, overcast, wet pavement, daytime,
no people, scenery, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, clear sky, text
\`\`\`

**本降りの筋。人はいない**

\`\`\`
city street, heavy rain, dense rain streaks, overcast, wet ground,
no people, scenery, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, clear sky, text
\`\`\`

筋が傷に見えるときは、dense rain streaks を外して \`rain\` と overcast だけに戻します。暗い傷は、雨が足りないのではなく、線が細すぎることがあります。太さは heavy rain を一つ戻してから見ます。`,
      },
      {
        title: '傘と、二人で一枚',
        content: `傘は一枚です。透明な傘と、赤い傘と、閉じた傘を同じ強さにすると、柄が三本になります。

\`umbrella\` は短い語として使われることがあります。公式タグとしては断定しません。透明は transparent umbrella、赤は red umbrella、持つは holding umbrella、と自然な英語です。公式タグとしては断定しません。肩に掛ける日は umbrella resting on the shoulder と自然な英語で一つ。顔を見せたい日は透明、色を見せたい日は赤、と分けます。和紙の傘は oil-paper umbrella と自然な英語です。洋傘と同時に強くしません。

二人で一枚は、\`2 adults\` と sharing one umbrella と自然な英語です。公式タグとしては断定しません。大人二人、閉じたコート、目の高さ、までです。

| 傘 | 書き方 | 向き |
|---|---|---|
| 透明 | transparent umbrella | 自然な英語。顔が見える |
| 赤 | red umbrella | 自然な英語。色は一つ |
| 持つ | holding umbrella | 自然な英語 |
| 肩 | umbrella resting on the shoulder | 自然な英語 |
| 二人 | sharing one umbrella | 自然な英語。\`2 adults\` |
| 和紙 | oil-paper umbrella | 自然な英語。洋傘と同時にしない |

**透明な傘。成人が一人**

\`\`\`
1 adult woman, adult, transparent umbrella, holding umbrella, adult face,
raincoat, long trousers, boots, full body, eye level,
city street, rain, overcast, wet pavement, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra umbrella, clear sky
\`\`\`

**赤い傘を二人で一枚**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
sharing one umbrella, red umbrella, coats, long trousers,
full body, eye level, city street, rain, overcast
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra umbrella, clear sky
\`\`\`

傘の骨が折れるときは、色を一つに戻し、構図を upper body にして傘の全体を枠の中に入れます。全身のまま傘を画面の外に出すと、骨の途中で切れます。`,
      },
      {
        title: '夜の街、窓、水たまり',
        content: `夜の雨は、建物の輪郭が決まってから反射を一つ足します。neon lights は自然な英語です。公式タグとしては断定しません。反射は reflection on wet pavement と自然な英語で弱く一つ。強くすると、建物が路面の中で二重になります。読める看板は書かないでください。店の名前が崩れます。通りの種類を変える日は街のページへ戻ります。

窓は、室内から外を見る枚です。カフェの窓か、電車の窓かを一つ。raindrops on glass と自然な英語で、ガラスの粒だけに wet を使います。人の服には使いません。室内は indoors を場所の前に置きます。カフェは \`cafe\`、電車の窓は train window と自然な英語です。公式タグとしては断定しません。

水たまりは \`puddle\` が短い語として使われることがあります。公式タグとしては断定しません。映り込みは reflection in a puddle と自然な英語で一つ。空の反射と、ネオンの反射を同じ強さにすると、水面が二枚の絵になります。

| 場面 | 書き方 | 人 |
|---|---|---|
| 夜の路面 | reflection on wet pavement | 自然な英語。看板の文字は書かない |
| カフェの窓 | raindrops on glass, cafe | 自然な英語。室内 |
| 電車の窓 | train window, raindrops on glass | 自然な英語 |
| 水たまり | \`puddle\` | 反射は一つ |

**夜。路面の反射。人はいない**

\`\`\`
city street, night, rain, neon lights, reflection on wet pavement,
no readable signs, no people, scenery, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, words, text
\`\`\`

**カフェの窓。成人が一人**

\`\`\`
1 adult man, adult, sitting by a window, coat, adult face,
cafe, indoors, raindrops on glass, rain outside, upper body, eye level
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
outdoors, extra people, text
\`\`\`

電車の日は、cafe を消して train window を一つにします。両方を残すと、席が店と車両の平均になります。`,
      },
      {
        title: '雨のあと、梅雨の花、ほかの天気',
        content: `雨のあとは、降る雨の語を消してから書きます。\`rain\` が残っていると、虹の空に筋が残ります。after rain は自然な英語です。公式タグとしては断定しません。虹は \`rainbow\`、雲の切れ間の光は sunbeams breaking through clouds、と自然な英語で一つ。公式タグとしては断定しません。閉じた傘は holding a closed umbrella と自然な英語です。開いた傘と同時に強くしません。

梅雨の花は hydrangea と自然な英語で一つ。紫陽花の色や本数の細目は [花のプロンプト](/guides/flower-prompt-guide) です。このページでは、雨の季節の庭に花を一つ置くところまでです。rainy season は自然な英語です。公式タグとしては断定しません。

ほかの天気は、雨のファイルを閉じた別の枚です。雪は雪のページ、霧は \`fog\` を一つ、雷は thunder and distant lightning と自然な英語で空だけの枚にします。人の近くで雷を強くすると、空の白飛びが顔まで届きます。雷の日は人を置きません。

| 場面 | 書き方 | 消すもの |
|---|---|---|
| 雨のあと | after rain | 自然な英語。降る rain |
| 虹 | \`rainbow\` | 本降りの筋 |
| 光 | sunbeams breaking through clouds | 自然な英語。一つ |
| 紫陽花 | hydrangea | 自然な英語。花は一つ |
| 霧 | \`fog\` | 雨の筋 |
| 雷 | thunder and distant lightning | 自然な英語。人は置かない |

**雨のあと。虹。人はいない**

\`\`\`
after rain, puddle, rainbow, sunbeams breaking through clouds,
park, daytime, no people, scenery, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, heavy rain, text
\`\`\`

**紫陽花。成人が一人。小雨**

\`\`\`
1 adult woman, adult, raincoat, long trousers, adult face,
hydrangea, rainy season, light rain, garden path, full body, eye level
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, clear sky, text
\`\`\`

雪に替える日は、雨の語を全部消してから雪のページを開きます。雨と雪を同じ強さで残すと、地面が灰色の平均になります。`,
      },
      {
        title: '曇りの光と、文章で頼むとき',
        content: `雨の光は、曇りを一つです。\`overcast\` を残したまま夜とスタジオの照明を同じ強さにすると、空の明るさが三層になります。昼の雨は overcast と soft daylight。夜の雨は night と、路面の反射を弱く一つ。映画のような対比が欲しい日は、光のページの語を一つだけ借りてきます。このページでは、空の明るさを先に固定します。

暗すぎるときは、夜の語が昼のファイルに残っています。night を消して overcast に戻してから、雨を弱くしてください。明るくするために筋を消すと、雨の日ではなくなります。

**日本語**

\`\`\`
成人の女性が、透明な傘をさして昼の街を歩いています。
閉じたレインコートと長いズボン。曇り空、細い雨、濡れた路面。
カメラは目の高さ。全身。看板の文字は入れません。服は濡らした表現にしません。adult。
\`\`\`

**英語**

\`\`\`
An adult woman in a closed raincoat and long trousers, holding a transparent umbrella,
walking on a city street in light rain. Overcast daylight, wet pavement.
Eye-level camera, full body. No readable signs. She is an adult.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, clear sky, text
\`\`\`

通った文は、タグのファイルへ別に保存します。ChatGPT や Gemini ではこの文、Stable Diffusion や NovelAI ではタグ例に戻してください。`,
      },
      {
        title: '天気を一つずつ残す',
        content: `雨の実験は、降り方、傘、場所、を別の日にします。小雨の街が三枚同じに見えてから、本降りへ複製を作ります。元の小雨のファイルは残します。上書きすると、筋が太くなったのか、ただ暗くなったのかが戻りません。嵐や雷は、人のいるファイルへ足しません。空だけの複製を作ってから、thunder の行を一つ置きます。

傘を足す日は、人のいない雨のファイルを複製し、\`1 adult\` とコートと傘を一つ足します。透明と赤は別の複製です。両方を残したファイルは、骨が折れたときの原因探しに使えません。二人で一枚にするのは、一人の傘が三枚安定してからです。人数を先に増やすと、傘の形が悪かったのか、人が重なったのかが残りません。

夜の路面は、昼のファイルとは混ぜません。昼の \`overcast\` が残った夜は、空の半分だけが明るくなります。夜の起点には、night と rain と、文字が無いこと、だけを置きます。ネオンと反射は、建物の輪郭が三枚見えてから一つずつです。看板の文字が出た枚は、語を足して消さず、文字の無い起点から作り直します。

窓の枚は、カフェと電車を分けます。ガラスの粒は raindrops on glass の一つです。人の服に wet を書いて、雨の感じを足そうとしないでください。粒が足りないときは、ガラスの語を前へ移します。服の語は動かしません。

雨のあとへ移る日は、降る rain を消した複製を作ります。虹と、雲の切れ間の光は、その複製の上で一つだけ足します。紫陽花を足す日は、花のページで色を一つ決めてから、このページの小雨の行を持ってきます。持ってくる語は、花と、小雨と、コートの三つまでです。雪に替える日は、雨のファイルを閉じ、雪のページの起点から始めてください。雨の語が一つでも残っている雪は、地面が灰色で止まります。

暗さで迷ったときは、ファイル名に昼か夜かを書いてから開きます。名前が無い枚は、比較に使いません。名前を付け直す前に、中の語が昼と夜のどちらに寄っているかを見て、反対の語を消します。消さずに明るさの語だけを足すと、また半分だけ昼になります。

傘の複製を作る前に、人のいない雨の起点が残っているかを見ます。起点が無い状態で傘から始めると、降り方が毎回変わり、傘の形の比較ができません。起点には、街か公園かを一つ、小雨か本降りかを一つ、曇り、濡れた路面、文字が無いこと、だけが残っています。人の行は、傘を足す複製にだけ入れます。

窓の複製では、外の街の建物を細かく書きません。カフェの席と、ガラスの粒と、外が雨であること、までです。電車の複製では、車内の広告や、読める行き先を書きません。文字が出た窓は捨て、no text の起点から作り直します。ガラスの粒を強くしすぎて外の景色が消えたときは、粒の語を弱くし、雨の語を外に一つ残します。

雨のあとの複製では、開いた傘の語が残っていないかを見ます。残っていると、虹の下で傘が開いたままになり、閉じた傘の確認ができません。閉じた傘を足すのは、空の虹が三枚見えてからです。紫陽花を足す複製では、花の色を一つにします。青と紫と白を同じ強さにすると、花のページで決めるべき色が、このページの雨の比較に混ざります。

雷の空だけの複製は、人のコートのファイルとはフォルダを分けます。誤って人の行が残った雷の枚は保存しません。霧の日は、雨の筋を消して \`fog\` を一つ置きます。筋を残した霧は、傷のような線と白い空気が同時に出て、どちらも使えません。雪へ移るときは、このページのファイルを閉じるところまでを、手順の最後にしてください。

和紙の傘を試す日は、透明な傘の複製とは混ぜません。洋傘の骨の語が残った和紙は、骨の上に紙が乗っただけの形になります。石の道と一緒にするときも、街のネオンは消します。夜の路面の反射と、昼の和紙の傘は、別の天気です。同じ空に置くと、時間帯の比較ができません。コートの色を変える日は、傘の色を固定します。両方を動かすと、赤いのが傘なのか、コートなのかが残りません。長靴を足すのは、全身の起点で足が三枚見えてからです。上半身のまま足元の語を足しても、枠の外の足は描かれません。

二人で一枚の傘は、コートの色を二人で揃えた複製にだけ足します。一人が明るい色、もう一人が暗い色、傘が赤、を同じ日に決めると、どの色が路面の反射に勝ったのかが残りません。反射を見る夜のファイルには、人を置かないままにしてください。人を置いた夜は、傘と顔が見える距離にして、路面の反射は弱く一つまでです。強くした反射で建物が二重になった枚は、反射の語を外した起点へ戻します。戻さずに建物の語を足しても、二重の線は消えません。`,
      },
      {
        title: '傷のように見える、暗すぎる、傘が折れる',
        content: `雨が傷やノイズに見えるときは、線の語を外して \`rain\` と overcast と wet pavement だけに戻します。粒を画面の手前いっぱいに置くと、ノイズと区別がつきません。手前の粒が欲しい日は、それだけで一枚にし、建物は後ろへ下げます。

暗すぎるときは、night と heavy rain が同じ強さです。昼に戻すか、夜を残して雨を light rain に弱めるか、を一つ選んでください。両方を残したまま明るさの語を足すと、空の半分だけが昼になります。

傘が折れるときは、傘を一枚にします。透明と赤と和紙を同時に残さないでください。持つ手が見える日は upper body にして、手は傘の柄だけです。指が増えるときは、傘を肩に掛けて、もう一方の手はコートのポケットに隠します。隠す書き方は one hand in pocket と自然な英語です。公式タグとしては断定しません。

| 症状 | 戻す行 | そのあと |
|---|---|---|
| 傷のように見える | rain と overcast | 筋はあとで一つ |
| 暗すぎる | 昼か夜かを一つ | 本降りを弱める |
| 傘の骨が折れる | 傘を一枚 | 枠の中に全体を入れる |
| 建物が二重 | 反射を外す | 輪郭のあとで弱く戻す |

人の服に wet を付けて直そうとしないでください。雨は、空と、路面と、ガラスの粒で足ります。

路面の反射が弱いときは、wet pavement を前へ移し、人のコートの語は動かしません。ガラスの粒が弱いときは、raindrops on glass を窓の直後へ移します。空の筋が弱いときは、\`rain\` を曇りの直後へ移します。三箇所を同じ日に動かすと、どの移動が効いたか残りません。効いた移動だけをファイル名に残し、ほかは起点の位置へ戻してください。

戻した起点で次に足せるのは、傘か、夜か、窓か、の一つです。傘を足すなら人を一人にしてコートを閉じます。夜を足すなら人を置かず、文字の無い路面にします。窓を足すなら室内を一つに決め、外の看板は書きません。三つを順に試すときは、毎回起点の複製から始めて、前の実験の語を持ち越さないでください。持ち越したファイルは、雨の比較ではなく、別の絵になります。別の絵にしたい日は、ファイル名を新しい場面の名前に変えてから生成します。`,
      },
    ],
    faq: [
      {
        q: '雨は rain だけで足りますか',
        a: '降り始めの確認には足ります。小雨は light rain、本降りは heavy rain と自然な英語で一つに分けてください。地面は wet pavement か wet ground です。人の服には wet を付けません。',
      },
      {
        q: '傘の形が崩れます',
        a: '傘は一枚、色は一つにします。全体が枠に入る距離にして、持つ手は柄だけにしてください。骨がまだ折れるときは、肩に掛ける書き方へ移します。',
      },
      {
        q: '夜の雨が暗すぎます',
        a: 'night と heavy rain を同じ強さで残さないでください。夜を残すなら雨は弱く、昼に戻すなら overcast と soft daylight にします。',
      },
      {
        q: '虹と雨が同時に降ります',
        a: '虹の日は、降る rain を消して after rain にします。雲の切れ間の光は一つだけ足してください。',
      },
      {
        q: '雨が傷のように見えます',
        a: 'dense rain streaks を外し、rain と overcast と wet pavement に戻します。手前の粒で画面を埋めないでください。',
      },
    ],
  },

  'shrine-prompt-guide': {
    sections: [
      {
        title: '神社は、部品を二つまで',
        content: `「神社 プロンプト」「プロンプト 神社」「日本の神社 プロンプト」「神社 本殿 プロンプト」で探しているのは、鳥居、参道、社殿のある景色です。検索では、日本の神社、本殿、季節の境内、が一緒に出ます。欲しいのは、架空の神社の静かな絵です。実在の社の名前、紋、印は書きません。信仰をからかう書き方は使いません。

このページは、神社の背景を担当します。装束の細目は [巫女のプロンプト](/guides/miko-prompt-guide)、着物と浴衣の種類は [着物プロンプト](/guides/kimono-prompt-guide) です。役割は一行で分けます。装束のページは衣、このページは鳥居と参道と社殿です。人物のうしろに場所を短く置く入口は [背景プロンプト](/guides/background-prompt-guide)、森そのものは [森のプロンプト](/guides/forest-prompt-guide)、広い景色は [風景のプロンプト](/guides/landscape-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は着物、浴衣、または閉じたコートです。参拝の列を置く日も、一人ひとりを成人として書きます。人のいない境内には人数を書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(torii:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(torii:1.2\\)\` と書きます。NovelAI の強調は \`{torii}\` と \`[torii]\` です。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`shrine\` だけだと、鳥居が門になり、屋根が別の寺院に寄ることがあります。今日見せたい部品を二つまでにしてください。`,
      },
      {
        title: '鳥居、参道、本殿',
        content: `部品は二つまでです。鳥居、参道、本殿、灯籠、狛犬、を全部同じ強さにすると、人が入る余地が無くなり、建築が平均になります。

\`torii\` は短い語として使われることがあります。公式タグとしては断定しません。朱の色は vermilion torii と自然な英語です。連なる鳥居は row of vermilion torii gates と自然な英語で、実在の場所の名前は付けません。参道は shrine approach か stone path、と自然な英語です。公式タグとしては断定しません。奥へ続く線にしたい日は、道を画面の中央に一つ残します。

本殿は shrine main hall と自然な英語です。\`shinto shrine\` は短い語として使われることがあります。公式タグとしては断定しません。木の柱と瓦の屋根を一つずつ足すと、ただの門より社殿に寄ります。wooden pillars と tiled roof は自然な英語です。公式タグとしては断定しません。

| 部品 | 書き方 | 同時に増やさないもの |
|---|---|---|
| 鳥居 | \`torii\` | 色は vermilion を一つ |
| 連なる鳥居 | row of vermilion torii gates | 自然な英語。社名は書かない |
| 参道 | shrine approach | 自然な英語。石段と同時に強くしない |
| 石の道 | stone path | 自然な英語 |
| 本殿 | shrine main hall | 自然な英語 |
| 柱と屋根 | wooden pillars, tiled roof | 自然な英語。二つまで |

**鳥居と参道。人はいない**

\`\`\`
shinto shrine, vermilion torii, shrine approach, stone path,
cedar trees, morning mist, no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, pagoda, logo, text
\`\`\`

**本殿。柱と瓦**

\`\`\`
shrine main hall, wooden pillars, tiled roof, shinto shrine,
forest, soft daylight, no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, pagoda, logo, text
\`\`\`

鳥居が西洋の拱門になるときは、\`torii\` を景色の先頭へ移し、arch に近い語が正向に残っていないかを消します。屋根が塔になるときは、pagoda を負向に残します。`,
      },
      {
        title: '灯籠、狛犬、手水、絵馬',
        content: `小さい部品は、社殿か鳥居が三枚安定してから一つです。石灯籠、狛犬、手水、絵馬、守り、注連縄、を同じ日に足すと、手前が道具で埋まります。

石灯籠は stone lantern と自然な英語です。公式タグとしては断定しません。狛犬は komainu が短い語として使われることがあります。対で置きたい日は a pair of guardian lion-dogs と自然な英語で一つ。公式タグとしては断定しません。左右の顔が別の動物になるときは、対の語を外して、灯籠に戻します。

手水は purification fountain と自然な英語です。公式タグとしては断定しません。柄杓まで書くと、木の形が折れやすいので、このページでは水盤があることまでです。絵馬は wooden prayer plaques、守りは omamori charm、注連縄は shimenawa rope、と自然な英語です。公式タグとしては断定しません。絵馬や札に読める文字は書かせません。文字は、画像の外であとから足します。

| 部品 | 書き方 | 文字 |
|---|---|---|
| 灯籠 | stone lantern | 自然な英語。一つ |
| 狛犬 | komainu | 短い語。対は自然な英語で一つ |
| 手水 | purification fountain | 自然な英語 |
| 絵馬 | wooden prayer plaques | 自然な英語。文字は書かない |
| 守り | omamori charm | 自然な英語。文字は書かない |
| 注連縄 | shimenawa rope | 自然な英語。一つ |

**石灯籠を一つ。人はいない**

\`\`\`
shinto shrine, stone lantern, shrine approach, cedar trees,
soft daylight, no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, words, text, logo
\`\`\`

**注連縄。鳥居は一つ**

\`\`\`
vermilion torii, shimenawa rope, shinto shrine, forest,
morning, no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, pagoda, text, logo
\`\`\`

札に文字が出た枚は、語を足して消そうとせず、文字の無い起点から作り直します。`,
      },
      {
        title: '神社と、寺のタグ',
        content: `神社と寺は、別の建物です。同じ強さにすると、鳥居の奥に塔が立ち、屋根の形が平均になります。

神社は \`shinto shrine\`、鳥居は \`torii\` です。寺は buddhist temple と自然な英語、塔は pagoda と自然な英語です。公式タグとしては断定しません。神社の日は、寺の語を正向から消し、負向に pagoda を残します。寺を描く日は、このページを閉じて、鳥居の語を消してから別のファイルにします。このページは神社だけです。

| 建物 | 残す語 | 消す語 |
|---|---|---|
| 神社 | \`shinto shrine\`, \`torii\` | pagoda |
| 寺 | buddhist temple, pagoda | このページでは書かない |

混ざった枚の直しは、先頭の名詞を一つに戻すことです。\`shrine\` と temple が両方残っているファイルは、保存しません。石庭や枯山水の語も、寺のファイルへ移します。神社の地面は、砂利か石の参道かを一つにします。gravel は自然な英語です。公式タグとしては断定しません。`,
      },
      {
        title: '季節と、時間',
        content: `季節は一つです。正月の人の列、桜、紅葉、雪、夜の灯籠、を同じ強さにすると、地面の色が平均になります。

正月の参拝は new year visit と自然な英語です。公式タグとしては断定しません。人の密度は [モブ・群衆のプロンプト](/guides/mob-crowd-prompt-guide)、余白と文字を入れない年賀の絵は [年賀状のプロンプト](/guides/new-year-card-ai-prompt-guide) です。このページでは、鳥居の前に成人の列があることまでです。一人ひとりの顔は細かく書きません。列の日は、本殿の彫りを弱くします。

桜は \`cherry blossoms\`、紅葉は autumn leaves、雪は \`snow\`、と一つ。夜の祭りは paper lanterns at night と自然な英語で、夏の灯籠を一つ。公式タグとしては断定しません。実在の祭の名前は書きません。

| 季節 | 書き方 | 一緒にしないもの |
|---|---|---|
| 正月 | new year visit | 自然な英語。桜と同時にしない |
| 桜 | \`cherry blossoms\` | 雪 |
| 紅葉 | autumn leaves | 自然な英語。桜と同時にしない |
| 雪 | \`snow\` | 細目は雪のページ |
| 夜の灯籠 | paper lanterns at night | 自然な英語。昼の霧 |

**雪の鳥居。人はいない**

\`\`\`
vermilion torii, shinto shrine, snow, cedar trees, overcast,
no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, cherry blossoms, pagoda, text
\`\`\`

**夜の灯籠。人はいない**

\`\`\`
shinto shrine, paper lanterns at night, stone path, dark trees,
no people, scenery, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, daytime, letters, text
\`\`\`

雪の降り方を細かくする日は、雪のページで状態を一つ決めてから、このページの鳥居を持っていきます。季節の語を三つ持ったまま戻らないでください。`,
      },
      {
        title: '着物の参拝と、巫女装束',
        content: `人を置く日は、背景の部品を一つに減らします。鳥居か、参道か、です。本殿と灯籠と狛犬を残したまま人を足すと、人が小さくなり、服が見えません。

着物と浴衣は [着物プロンプト](/guides/kimono-prompt-guide) の種類を一つ借りてきます。このページでは \`kimono\` か \`yukata\` かを一つ。両方を同じ強さにすると、袖の長さが平均になります。巫女装束の白い上衣と赤い袴は [巫女のプロンプト](/guides/miko-prompt-guide) です。このページに装束の部品を全部は書きません。借りてくるのは「境内に成人が一人立っている」ことだけです。

| 人 | 服 | 背景 |
|---|---|---|
| 成人の参拝 | \`kimono\` か \`yukata\` | 鳥居を一つ |
| 装束 | 巫女のページの衣 | 灯籠か参道を一つ |

**着物。鳥居の前。成人**

\`\`\`
1 adult woman, adult, black hair, kimono, obi, adult face,
standing, vermilion torii, shinto shrine, full body, soft daylight,
no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, pagoda, text, logo
\`\`\`

**浴衣と夜の灯籠。成人**

\`\`\`
1 adult man, adult, yukata, obi, adult face,
standing, paper lanterns at night, shrine approach, full body,
no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, daytime, text, logo
\`\`\`

装束の衿や袴の形が崩れるときは、このページの背景を単純な鳥居に戻し、衣の直しは巫女のページで行ってください。背景の語を増やしても、衿の向きは戻りません。`,
      },
      {
        title: '画風と、文章で頼むとき',
        content: `画風は一つです。アニメの背景、写真、平たい色の木版のような塗り、を同じ強さにすると、線が三種類になります。作者の名前は書きません。

アニメの背景は anime background と自然な英語です。写真は \`photorealistic\` が短い語として使われることがあります。公式タグとしては断定しません。平たい色は flat color, woodblock print と自然な英語です。公式タグとしては断定しません。「誰々の様式」とは書きません。

**日本語**

\`\`\`
架空の神社。朱い鳥居が一つ、奥に石の参道。杉の木と朝もや。
人はいません。no people。実在の社の名前も、読める文字も、紋も入れません。
写真のような静かな朝です。
\`\`\`

**英語**

\`\`\`
A fictional Shinto shrine with one vermilion torii and a stone approach,
cedar trees and morning mist. No people. No real shrine name, no readable text, no crest.
Quiet photorealistic morning.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, person, logo, text, pagoda
\`\`\`

通った文は、タグのファイルへ別に保存します。ChatGPT や Gemini ではこの文、Stable Diffusion や NovelAI ではタグ例に戻してください。`,
      },
      {
        title: '部品を二つまで残して比べる',
        content: `神社の実験は、部品を二つまでにした起点を先に保存します。鳥居と参道が三枚同じに見えてから、灯籠を足す複製を作ります。元のファイルに灯籠を上書きすると、灯籠が形を崩したときに戻る場所が無くなります。狛犬、手水、絵馬、注連縄は、それぞれ別の複製です。四つを一つのファイルに足した枚は、どの部品が塔や文字を呼んだのかが残りません。

寺の語が混ざった枚は、保存しません。\`shinto shrine\` と \`torii\` だけの起点を開き、pagoda が負向に残っているかを確認してから、次の部品を一つ足します。赤の柱だけを強くしても、神社にはなりません。鳥居が先頭にあるかを、生成の前に見てください。

季節も複製で分けます。桜、紅葉、雪、夜の灯籠、正月の列、は別のファイルです。雪の日に桜の語が残っていると、地面の色が平均になります。雪の降り方を細かくするときは、雪のページで状態を一つ決めてから、このページの鳥居の行だけを持っていきます。持っていく語は、鳥居と、雪と、人を置かないこと、の三つまでです。

人を置く日は、背景の部品を一つに減らした複製を使います。着物のファイルと、浴衣のファイルと、装束を借りるファイルは混ぜません。装束の衿が崩れたときは、背景の語を増やさず、巫女のページで衣だけを直してから戻ります。戻るときに灯籠と狛犬と本殿を一緒に持ってこないでください。人が小さくなります。

文字が出た絵馬は、その複製を捨てます。起点の no text が残っているファイルから作り直し、絵馬の名詞を弱く一つだけ戻します。文言は画像の外であとから足します。実在の社名や紋が出た枚も、同じように捨てます。名前を負向に追加して消し続けると、次の枚がその名前を覚えます。起点には、名前が一度も入っていないことを確認してから使ってください。

画風を変える日は、写真か、アニメの背景か、平たい色かをファイル名に書きます。作者の名前は、どのファイルにも入れません。平たい色の日に写真の語が残っていると、線の半分だけが太くなります。画風は、部品が二つに絞れたあとに一つだけ変えてください。

参道を画面の中央に置く日は、鳥居を手前、社殿を奥、と順番だけをメモします。メモの無い枚は、奥行きの比較に使いません。石段と、平らな石の道を同じ複製に書くと、地面の高さが平均になります。今日の地面は一つです。砂利を足すのは、道の線が三枚続いて奥へ伸びてからです。

人が列になる正月の複製は、顔を一人ずつ書きません。列があることと、鳥居が一つあること、までです。列の密度を変える日は、群衆のページの語を一つだけ借りて、このページの鳥居の行と一緒に置きます。借りる語が三つを超えたら、いったん戻して、鳥居が見えているかを先に確認します。年賀の文字は、このページの画像には入れません。余白が要る日は、年賀のページへ移ってから、神社の名詞を一つだけ持っていきます。

着物の人と、浴衣の人を比べるときは、鳥居のファイルを固定した二つの複製にします。袖の長さ以外を同時に変えないでください。帯の色、髪の結び、時間帯を同じ日に動かすと、着物が勝ったのか、夜の灯籠が勝ったのかが残りません。装束を借りる複製では、袴の色をこのページで増やしません。色の細目は巫女のページに残し、ここでは境内に一人立っていることだけを見ます。

平たい色の複製で、写真の質感語が一つでも残っていたら、生成する前に消します。消したあとに線がまだ混ざるときは、その枚を捨て、平たい色と、鳥居と、森、だけの起点から作り直します。作者の名前で画風を固定しようとしないでください。名前が一度でも入ったファイルは、起点には使いません。

朝もやを足す日は、昼の強い光の語を消した複製を使います。もやと、木漏れ日と、夜の灯籠を同じ強さにすると、空の明るさが三層になります。今日の光は一つです。森の種類を細かくするときは、森のページで木を一つ決めてから、このページの鳥居の行だけを持ってきます。森の語を三つ持ったまま戻ると、鳥居が木の間に隠れて、形の確認ができません。広い景色として山や空を主題にしたい日は、風景のページへ移り、このページの部品は鳥居一つまでに減らしてください。`,
      },
      {
        title: '鳥居の形、寺への寄り、崩れた文字',
        content: `鳥居の上が丸い拱門になるときは、\`torii\` を先頭へ移し、二つの柱と二本の横木がある、と自然な英語で two pillars and two crossbars を一つ足します。公式タグとしては断定しません。足したあとも塔が残るときは、pagoda を負向に置いたまま、寺の語を正向から全部消します。

中国の寺院に寄るときは、龍の装飾や、極端に反った軒の語が混ざっています。このページでは龍を書きません。軒は tiled roof の一つに戻します。赤の柱だけでは、神社か寺かは決まりません。鳥居を残しているかを先に見てください。

看板や絵馬の文字が意味のない形になるのは、画像の中で文字を書かせているからです。no text を残し、文言は画像の外であとから足します。文字を正向に一文字でも置くと、隣の札まで形が崩れます。

| 症状 | 戻すもの | 残すもの |
|---|---|---|
| 鳥居が拱門 | torii を先頭へ | 柱と横木を一つ |
| 塔が立つ | pagoda を負向へ | 神社の名詞だけ |
| 文字が崩れる | 文字の語を消す | no text |
| 人が小さすぎる | 部品を一つに | 人を full body |

実在の社名が出た枚は、保存せず、名前の無い起点から作り直します。

作り直した起点は、鳥居一つ、参道か社殿かのどちらか一つ、文字が無いこと、紋が無いこと、です。季節の語は、この起点が三枚同じに見えてから複製に足します。人を足すのも、その後です。起点に季節と人と画風を同時に戻すと、また社名や塔が混ざりやすくなります。混ざった枚を負向の語で直し続けず、名前の入っていないファイルから始めてください。`,
      },
    ],
    faq: [
      {
        q: '神社と寺はどう書き分けますか',
        a: '神社は shinto shrine と torii、寺は buddhist temple と pagoda です。同じ強さで残すと、鳥居の奥に塔が立ちます。このページは神社だけにして、pagoda は負向に残してください。',
      },
      {
        q: '実在の神社の名前は書けますか',
        a: '書きません。紋や、実在の祭の名前も正向に足しません。鳥居が連なる形は、row of vermilion torii gates と自然な英語で、場所の名前なしで書いてください。',
      },
      {
        q: '絵馬の文字が崩れます',
        a: '画像の中では文字を書かせないでください。no text を残し、文言はあとから足します。文字の語を足して直そうとすると、隣の札まで崩れます。',
      },
      {
        q: '鳥居が普通の門になります',
        a: 'torii を景色の先頭へ移し、二つの柱と二本の横木を自然な英語で一つ足します。塔の語が残っているときは pagoda を負向に入れてください。',
      },
      {
        q: '巫女の服の細かい形はどこで書きますか',
        a: '白い上衣と赤い袴は巫女のページです。このページは鳥居、参道、本殿を残し、衣は一つだけ借りてきます。',
      },
    ],
  },
}
