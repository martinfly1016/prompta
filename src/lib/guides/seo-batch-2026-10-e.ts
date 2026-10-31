/**
 * Fifth SEO batch (2026-10-28): maid outfit, tall adult height,
 * quality tags, accessories, suit and lab coat.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_5_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'maid-outfit-prompt-guide': {
    sections: [
      {
        title: 'メイド服プロンプトの基本',
        content: `「メイド服 プロンプト」「メイド プロンプト」で必要なのは、成人のスタッフとして、ドレス・エプロン・カチューシャを分けて書くことです。\`maid\` は職業と衣装の両方に付くタグです。これだけだとエプロンが消えることがあるので、\`maid apron\` か \`apron\`、\`maid headdress\` を足します。

\`maid uniform\`、\`maid dress\` は、衣装だと伝えたいときの自然な英語です。公式タグとしてこのページでは断定しません。土台は \`maid\` と、エプロンと、カチューシャです。

登場人物は大人のスタッフだけにします。人数は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。学生服の場面と短い丈は使いません。それらを避ける語は、各作例のネガティブに入れます。

コスプレ全般は [コスプレプロンプト](/guides/cosplay-prompt-guide) です。髪は [髪型プロンプト](/guides/hairstyle-prompt-guide)、二つに分けた髪型は [ツインテールプロンプト](/guides/twintail-prompt-guide) です。ドレスの種類は [ドレスプロンプト](/guides/dress-prompt-guide) です。

**クラシック（白と黒、長い丈）**

\`\`\`
1 adult woman, maid, maid headdress, maid apron, frilled apron,
black dress, long skirt, long sleeves, white apron, mary janes,
holding a tea tray, mansion parlor, full body, standing
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

公開作例は [黒白のメイド衣装](/prompt/maid-costume-3d-render) です。`,
      },
      {
        title: '種類の一覧',
        content: `種類の名前を一つだけ強くすると、丈や袖が平均的な衣装に戻ることがあります。名前のあとに、丈と袖とエプロンを書いてください。

| 種類 | 書き方 | 固定するパーツ |
|---|---|---|
| クラシック | \`maid\` と白黒 | \`long skirt\`, \`long sleeves\`, \`frilled apron\`, \`maid headdress\` |
| ヴィクトリアン | \`victorian maid\` は自然な英語。長いドレス | \`long skirt\` か床までの長いドレス、\`long sleeves\` |
| フレンチ | 自然な英語で膝丈と控えめ、と書く | \`knee-length skirt\`, \`long sleeves\`, \`frilled apron\` |
| 和風 | \`wa maid\` は自然な英語。断定しない | \`kimono\`, \`long sleeves\`, \`apron\`, \`maid headdress\` |
| ゴシック | 自然な英語。黒い長いドレスとレース。控えめ | \`long skirt\`, \`long sleeves\`, lace trim は自然な英語 |
| 中華風 | 自然な英語。立ち襟の長いワンピースは、襟の英語を避けて「長いドレスとボタン」と書く | \`long skirt\`, \`apron\`, \`maid headdress\` |
| メイドカフェ風 | パステルは自然な英語 | \`knee-length skirt\`, \`frilled apron\`, \`maid headdress\` |

ゴシックは長い黒いドレスです。体の線を強調する下着や、短い丈にはしません。中華風もスリットを開けた短い服にはしません。

**ヴィクトリアン（長いドレス）**

\`\`\`
1 adult woman, maid, long black dress, long skirt, long sleeves,
white apron, maid headdress, frilled apron, boots,
holding a tea tray, dining room, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

**メイドカフェ風（パステル、膝丈）**

\`\`\`
1 adult woman, maid, maid headdress, frilled apron, apron,
pastel pink dress, knee-length skirt, long sleeves, mary janes,
holding a tea tray, cafe interior, full body, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\``,
      },
      {
        title: 'パーツ別のタグ',
        content: `パーツは「頭・胴・腕・丈・足・手に持つ物」の順に足すと、どれが消えたか分かります。

| 部位 | 英語 | 注記 |
|---|---|---|
| カチューシャ | \`maid headdress\` | タグとして書く。フリルのヘッドバンドは自然な英語 |
| エプロン | \`apron\`, \`maid apron\`, \`frilled apron\` | 白い平面のエプロンだけなら \`apron\`。フリルは \`frilled apron\` |
| 袖 | \`long sleeves\` | 半袖にしたいときは、このタグを外してから自然な英語で半袖と書く |
| 襟 | 自然な英語で、首元のフリル、と書く | ドレスの襟元。フリルはエプロンと分ける |
| リボン | \`ribbon\` | 髪や腰。アクセサリー全般は [アクセサリープロンプト](/guides/accessory-prompt-guide) |
| 丈 | \`long skirt\` | 膝丈は自然な英語で \`knee-length skirt\` |
| 靴 | \`mary janes\`, \`boots\` | タグとして書いてよい |
| 盆 | 自然な英語で \`tea tray\` | 手とセット。\`holding a tea tray\` |
| 羽根ぼうき | 自然な英語で \`feather duster\` | 掃除の小物。必須ではない |

頭のリボンが要るときは [髪型プロンプト](/guides/hairstyle-prompt-guide) の髪飾りと一緒に、\`ribbon\` を一つだけ足します。カチューシャと大きなリボンを同じ強さにすると、頭の上で形が混ざります。`,
      },
      {
        title: '色と素材',
        content: `色はドレスとエプロンで分けます。\`black dress, white apron\` のように、名詞の直前に置いてください。\`black and white\` だけだと、どちらが黒か決まりません。

| 色・素材 | 書き方 |
|---|---|
| 白黒 | \`black dress, white apron, maid headdress\` |
| ネイビー | \`navy dress, white apron\`。ネイビーは自然な英語 |
| パステル | \`pastel pink dress\` または \`pastel blue dress\`。自然な英語 |
| 茶色と生成り | \`brown dress, cream apron\`。自然な英語 |
| 綿 | cotton は自然な英語。光沢が要らなければ足す |
| レース | 裾や袖口の lace trim は自然な英語。長い丈のまま |

素材を三種類以上書くと、エプロンのフリルが別の布に溶けます。色二つと、\`frilled apron\` までにして、足して変わらなければ戻してください。

ゴシックの黒は \`black dress, long skirt, long sleeves\` です。赤や金を足すならリボン一つにします。全身が暗く潰れるときは、\`white apron\` を残して光を一つ（窓の昼光）足します。`,
      },
      {
        title: 'シーン別のコピペ',
        content: `場所は一つ、動作は一つです。同時に掃除と接客を書くと、手が両方の小物を持ちます。

**洋館のティータイム**

\`\`\`
1 adult woman, maid, maid headdress, maid apron, frilled apron,
black dress, long skirt, long sleeves, mary janes,
holding a tea tray, parlor, afternoon light, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

**カフェでの接客**

上のパステルの例が接客です。店内は \`cafe interior\` と自然な英語で一つ。看板の文字は書きません。ネガティブの \`text\` は、文字が出るのを抑えるためです。

**掃除**

\`\`\`
1 adult woman, maid, maid headdress, maid apron, frilled apron,
black dress, long skirt, long sleeves, mary janes,
holding a broom, standing, sunlit hallway, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

公開作例は [掃除中のメイド](/prompt/maid-cleaning-cel-shade-style) です。

**屋敷の図書室**

学校の教室にはしません。個人の屋敷の本棚です。

\`\`\`
1 adult woman, maid, maid headdress, apron, long skirt, long sleeves,
standing beside a bookshelf, holding a book, mansion library, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

**和風の旅館**

\`\`\`
1 adult woman, maid, maid headdress, apron, kimono, long sleeves,
long skirt, standing, wooden corridor, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

和風の名前として \`wa maid\` を自然な英語で足してもよいです。効かなければ外し、\`kimono\` と \`apron\` と \`maid headdress\` を残します。`,
      },
      {
        title: '男性メイドと執事、二人の構図',
        content: `男性のメイドも成人です。\`1 adult man, maid\` から書き、ドレスとエプロンとカチューシャは女性の例と同じパーツにします。執事は別の衣装です。\`butler\` と \`tailcoat\` を使い、シャツと \`necktie\` とズボンを足します。\`suit\` だけだと背広で止まり、裾の長い礼装になりません。

二人は [二人構図](/guides/two-person-composition-prompt-guide) の「並ぶ」に、この衣装を足す形です。

**男性のメイド**

\`\`\`
1 adult man, maid, maid headdress, maid apron, frilled apron,
black dress, long skirt, long sleeves, mary janes,
mansion hallway, full body, standing
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

**執事とメイドが並ぶ**

\`\`\`
1 adult man and 1 adult woman,
the man is an adult butler in a tailcoat, white shirt, necktie, trousers,
the woman is an adult maid with maid headdress, apron, long skirt, long sleeves,
standing side by side, mansion parlor, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\``,
      },
      {
        title: 'ポーズと構図',
        content: `衣装のパーツを見せるなら \`full body\` です。顔とカチューシャだけなら \`cowboy shot\` か上半身にします。両方を強くすると、頭が大きくなり丈が切れます。

| 構図・動作 | 英語 | 注記 |
|---|---|---|
| 全身 | \`full body\` | 靴まで入れる。最初の構図 |
| 膝上 | \`cowboy shot\` | 表情とエプロン。丈は切れやすい |
| 横 | \`from side\` | 盆とエプロンの重なりが見える |
| お辞儀 | \`bowing\` | タグとして足せる。盆と同時だと手が崩れやすい |
| カーテシー | \`curtsy\` | 自然な英語。公式タグとは書かない |

お辞儀を足すときは、ティータイムの例の \`standing\` を \`bowing\` に一つだけ替えます。カーテシーは \`curtsy, full body, long skirt\` と自然な英語で足し、短い丈の語は入れません。

ポーズの立ち方そのものは [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。腕が溶けるときは、持つ物を \`tea tray\` か箒の一方だけにしてください。`,
      },
      {
        title: '崩れやすい点とネガティブ',
        content: `メイド服で先に消えるのは、エプロン、フリル、カチューシャです。カチューシャが猫の耳になるのは、頭のタグが別の耳飾りに寄ったときです。\`maid headdress\` を人数の近くに戻し、猫耳の語は入れません。

直し方は次の順です。

1. \`maid, maid headdress, frilled apron\` を人数の直後に置く。
2. 丈を \`long skirt\` か \`knee-length skirt\` の一方だけにする。
3. 小物を一つにする。
4. 重みは \`(frilled apron:1.2)\` から一つ。1.4 を超えるとフリルが布全体に広がります。
5. それでも猫耳になるときは、ネガティブに耳のアクセサリーを足すより、頭のタグを \`maid headdress\` だけに減らします。

ネガティブの共通行は、各作例のブロックです。手と体の語に加え、学生服と短い丈を除外します。品質タグの削り方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

フリルが溶けて模様になるときは、\`frilled apron\` を残してレースの語を外します。エプロンがドレスと同じ色に染まるときは、\`white apron, black dress\` と色を名詞に付けてください。`,
      },
      {
        title: 'ChatGPT・Gemini で書く場合',
        content: `自然文のツールには、タグの列より文が向きます。成人であること、長い丈か膝丈、エプロン、カチューシャ、場所を同じ文に入れてください。

**日本語**

\`\`\`
成人の女性（adult woman）。クラシックな黒い長いメイドドレス、白いフリルのエプロン、カチューシャ。
洋館の応接で、紅茶の盆を持って立っている。全身。丈は長い。成人のスタッフ。
\`\`\`

**英語**

\`\`\`
An adult woman in a classic black maid dress with a long skirt, a white frilled apron, and a maid headdress.
She is an adult staff member, standing in a mansion parlor and holding a tea tray. Full body, modest covered outfit.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

ChatGPT や Gemini の画像生成にネガティブ欄が無いときは、同じ文に「成人だけ。丈は長い。学生服にはしない」と足します。Midjourney では重みの括弧を外し、末尾に \`--ar 2:3\` を一つ足す程度にしてください。`,
      },
    ],
    faq: [
      { q: 'maid と maid uniform はどちらを使いますか？', a: 'まず `maid` と `maid apron`（または `apron`）と `maid headdress` です。`maid uniform` と `maid dress` は自然な英語として足せます。衣装が普通のワンピースに戻るときは、エプロンとカチューシャを人数の直後に戻してください。' },
      { q: 'カチューシャが猫の耳になります', a: '`maid headdress` を人数の近くに置き、頭に付ける別の耳飾りは書かないでください。フリルのヘッドバンドは自然な英語の補助です。`maid headdress` が残っているのに耳になるときは、頭のタグをそれ一つに減らします。' },
      { q: 'エプロンが消えます', a: '`apron` だけでなく `frilled apron` を足し、色を `white apron` のように名詞へ付けます。重みは `(frilled apron:1.2)` から一つです。小物を同時に増やすと、エプロンより小物が優先されることがあります。' },
      { q: '男性のメイドと執事は同じですか？', a: '同じにしません。メイドは `maid` とエプロンとカチューシャです。執事は `butler` と `tailcoat`、シャツ、`necktie`、ズボンです。二人で並べるときは [二人構図](/guides/two-person-composition-prompt-guide) と組み合わせ、どちらも adult と書きます。' },
      { q: '自然文のツールでも同じタグを並べますか？', a: '並べなくても伝わります。成人、長い丈か膝丈、白いエプロン、カチューシャ、場所、全身を一つの文にしてください。Stable Diffusion や NovelAI に戻すときだけ、このページのタグ列を使います。' },
    ],
  },

  'tall-height-prompt-guide': {
    sections: [
      {
        title: '高身長プロンプトの基本',
        content: `「高身長 プロンプト」「背が高い プロンプト」「長身 プロンプト」は、一人の大人を高く見せる英語です。最初のタグは \`tall\` です。\`tall adult\` と \`tall stature\` は、\`tall\` に添える自然な英語です。公式タグとして断定はしません。

\`long legs\` は脚の長さです。\`full body\` と一緒に書いてください。脚だけをアップにすると、背の高さではなく脚の寄り絵になります。

センチの数字は、モデルが巻尺で測る値にはなりません。大きい数字ほど高く、という相対のヒントにしかならないことが多いです。数字に頼らず、\`tall\` と全身と、比べる物を先に書いてください。

このページは成人だけです。背を高くするために年齢を上げる必要はありませんが、成人であることは人数に書きます。低身長の反対側は [低身長・小柄プロンプト](/guides/short-height-petite-prompt)、体型全般は [体型プロンプト](/guides/body-type-prompt-guide) です。男性の長身を髪型や服と一緒に書くときは [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。

**全身の基本**

\`\`\`
1 adult woman, tall, tall stature, long legs, full body, standing,
long coat, wide-leg trousers, boots, plain wall, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\``,
      },
      {
        title: '高身長の英語一覧',
        content: `強さの違う語を全部同時に強くしないでください。\`tall\` を土台にして、足りないときだけ一つ足します。

| 英語 | 意味 | 注記 |
|---|---|---|
| \`tall\` | 背が高い | 最初に置くタグ |
| \`tall adult\` | 背の高い大人 | 自然な英語。人数の adult と重ねてよい |
| \`tall stature\` | 長身 | 自然な英語。\`tall\` の補助 |
| very tall | とても高い | 自然な英語。強くすると頭身が崩れる |
| towering | そびえる | 自然な英語。ファンタジーや極端な差向け。日常の長身では外す |
| \`long legs\` | 脚が長い | \`full body\` とセット |
| slender tall | 細い長身 | 自然な英語。細さは身長ではない |
| broad-shouldered tall | 肩幅のある長身 | 自然な英語。男性の例で使う |
| statuesque | 立ち姿が堂々としている | 自然な英語。タグとは書かない |

\`towering\` は日常の「モデル体型」には強すぎます。街の人物なら \`tall\` と \`long legs\` で止めてください。筋肉の量は [筋肉質プロンプト](/guides/muscular-prompt-guide) に分け、このページでは肩幅までにとどめます。`,
      },
      {
        title: '背の高さを見せる構図',
        content: `一人が画面の中央に立っているだけだと、モデルは平均的な頭身に戻します。高さの分かる物を一つ置きます。

比べる物の例は、ドア枠、街灯、成人の群衆です。物は一つで足ります。ドアと街灯と群衆を同時に書くと、背景が勝ちます。

| 比べる物 | 自然な英語の例 |
|---|---|
| ドア枠 | standing beside a door frame, the door reaches her shoulder |
| 街灯 | standing next to a street lamp |
| 群衆 | standing among a crowd of adults |

カメラを下げる書き方は \`from below\` です。服の写り込みを避ける注意は [下からのアングル](/guides/low-angle-prompt-guide) にあります。このページの下からの例は、長いコートとズボンの全身だけにします。引きの \`wide shot\` は、人物が小さい代わりに頭の先と靴が同時に入ります。

**ドア枠**

\`\`\`
1 adult woman, tall, long legs, full body, standing beside a door frame,
the door frame reaches her shoulder, long coat, trousers, boots, indoor daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

**下から、長いコート**

\`\`\`
1 adult woman, tall, long legs, full body, from below, wide shot,
long coat, wide-leg trousers, boots, city sidewalk, overcast
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\``,
      },
      {
        title: '女性の高身長',
        content: `服の縦の線が、背の高さを補助します。長いコート、ワイドのズボン、膝が隠れる丈のスカートです。短い丈の服は、脚の寄りに戻りやすいので使いません。

歩き方は、自然な英語で runway walk か walking を一つ。両方を強くするとポーズが誇張されます。

**ロングコートで歩く**

\`\`\`
1 adult woman, tall, long legs, full body, walking,
long coat, wide-leg trousers, boots, city street, overcast, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

**ワイドのズボンで立つ**

\`\`\`
1 adult woman, tall, tall stature, long legs, full body, standing,
long coat, wide-leg trousers, boots, studio backdrop, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

仕事着のスーツに寄せるときは [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) のパーツを、この \`tall, full body\` に足してください。`,
      },
      {
        title: '男性の高身長',
        content: `男性は \`tall\` に、肩の自然な英語 broad shoulders を一つ足すと、ただ脚が長い絵と区別できます。肩の筋肉をさらに強くする語は [筋肉質プロンプト](/guides/muscular-prompt-guide) 側です。ここでは服で高さを見せます。

**スーツ**

\`\`\`
1 adult man, tall, long legs, full body, standing,
suit jacket, white dress shirt, necktie, trousers, dress shoes,
office lobby, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

**コート**

\`\`\`
1 adult man, tall, broad shoulders, long legs, full body, standing,
long coat, trousers, boots, city street at night, street lamp
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

\`suit\` 一語だとジャケットだけになり、脚が切れます。ズボンまで書いて \`full body\` を残してください。パーツの名前は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。`,
      },
      {
        title: '二人で並べて身長差にする',
        content: `一人の高身長と、二人の頭の高さの差は別のページです。差を見せるなら、高い側にこのページの \`tall\`、低い側に [低身長・小柄プロンプト](/guides/short-height-petite-prompt) の \`petite\` を置き、\`full body, from side\` で頭の位置を比べます。

並びの安定化は [身長差プロンプト](/guides/height-difference-pair-prompt)、肩幅や筋肉量の差は [体格差プロンプト](/guides/body-size-difference-prompt-guide) です。数値とポーズから文を組むときは [身長差メーカー](/tools/height-difference-maker) を使えます。

**並んで立つ二人**

\`\`\`
1 tall adult man and 1 petite adult woman, full body, from side,
standing side by side, the man is clearly taller,
both adults, casual coats, city sidewalk, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs, same height
\`\`\``,
      },
      {
        title: '脚だけ伸びるときの直し方',
        content: `失敗は三種類です。脚だけが伸びて頭が極端に小さい、頭が画面の外に切れる、靴が切れて高さの基準が消える。

直しは、\`full body\` を残したまま、\`long legs\` の重みを下げるか外すことです。\`(long legs:1.4)\` のように強くしてから頭を直そうとすると、両方崩れます。比べる物（ドア枠）を一つ戻すと、脚の長さより全体の比率が残りやすくなります。

ネガティブには、各作例のとおり \`cropped feet, out of frame, disproportionate legs\` を自然な英語で入れます。これらは公式タグとして断定しません。

**直したあとの全身**

\`\`\`
1 adult woman, tall, full body, standing beside a door frame,
long coat, wide-leg trousers, boots, head to toe in frame, indoor daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

まだ頭が小さいときは \`long legs\` を外し、\`tall\` とドア枠だけにします。`,
      },
      {
        title: 'ChatGPT・Gemini で書く場合',
        content: `自然文では、センチの数字を「その身長にする」命令にしないでください。成人であること、全身、靴まで入ること、比べる物を一つ、服の縦の線を書いてください。

**日本語**

\`\`\`
背の高い成人の女性（adult woman）。全身が入り、靴まで見える。
ドア枠が肩の高さに来る。ロングコートとワイドのズボン。やわらかい昼の光。
\`\`\`

**英語**

\`\`\`
A tall adult woman, full body, shoes visible, standing beside a door frame that reaches her shoulder.
She wears a long coat and wide-leg trousers. Soft daylight. She is an adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame, disproportionate legs
\`\`\`

Midjourney ではタグの重みを外し、\`full body, head to toe, standing beside a door\` を文にして、\`--ar 2:3\` を足します。顔のアップでは背の高さは出ません。`,
      },
    ],
    faq: [
      { q: 'tall と tall stature はどう使い分けますか？', a: 'まず `tall` です。まだ平均的な頭身に戻るときに、自然な英語の `tall stature` か `tall adult` を一つ足します。very tall や towering は、その次です。日常の長身で最初から towering は強すぎます。' },
      { q: '180cm と書けばその身長になりますか？', a: 'なりません。センチの数字は実寸として測られないことが多く、相対的なヒントどまりです。`tall`、`full body`、ドア枠や街灯との比較を先に書いてください。' },
      { q: '脚だけ長くなり、頭が小さくなります', a: '`long legs` の重みを外し、`tall` と `full body` とドア枠を残します。ネガティブに `cropped feet, out of frame, disproportionate legs` を入れて、靴と頭が同時に入る構図に戻してください。' },
      { q: '一人の高身長と、二人の身長差は同じページですか？', a: '一人が高く見える書き方がこのページです。二人の頭の位置は [身長差プロンプト](/guides/height-difference-pair-prompt)、フォームで組むなら [身長差メーカー](/tools/height-difference-maker) です。低い側の一人絵は [低身長・小柄プロンプト](/guides/short-height-petite-prompt) です。' },
      { q: 'モデル体型やスタイルが良い、はどう書きますか？', a: '体型の評価語を重ねず、`tall`、`long legs`、`full body`、長いコートかワイドのズボンで見せます。statuesque は自然な英語として一つまでです。筋肉を足すときは [筋肉質プロンプト](/guides/muscular-prompt-guide) に分けてください。' },
    ],
  },

  'quality-tags-prompt-guide': {
    sections: [
      {
        title: '品質タグとは',
        content: `「品質タグ プロンプト」「品質タグ 一覧」で探すのは、絵の上手さを上げるために足す \`masterpiece\` や \`best quality\` のような語です。主題のタグではありません。人物、服、場所が空のまま品質タグだけを増やしても、描きたいものは決まりません。

モデルによって、品質タグは学習データに入っている語だったり、ほとんど無視される語だったりします。このページはモデル別に、どの語がドキュメントやモデルカードにあるかを分けます。Stable Diffusion 全般の書き方と、すでに検索で上位にある品質のコピペは [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide) のままです。このページは「品質タグ」という語と、NovelAI・Illustrious・Pony・SDXL・Flux の違いを担当します。

ネガティブ側の基礎は [ネガティブプロンプト](/guides/negative-prompt-guide)、アニメの顔は [アニメプロンプト](/guides/anime-prompt-guide) です。`,
      },
      {
        title: '基本の一覧',
        content: `NovelAI のタグページ（2026年10月28日に確認した <a href="https://docs.novelai.net/en/image/tags/" class="text-sky-600 hover:underline">Tagging</a>）では、品質タグと美的タグが分かれています。

| 区分 | 英語 | ドキュメント上の範囲 |
|---|---|---|
| 品質 | \`best quality\`, \`amazing quality\`, \`great quality\`, \`normal quality\`, \`bad quality\`, \`worst quality\` | 品質の段階。悪い側はネガティブ向き |
| 美的 | \`masterpiece\` | V4.5 以降 |
| 美的 | \`top aesthetic\` | V4 以降 |
| 美的 | \`very aesthetic\`, \`aesthetic\` | 良い側 |
| 美的 | \`displeasing\`, \`very displeasing\` | 悪い側。ネガティブ向き |
| 解像度の語 | \`absurdres\` | 品質タグ追加の Anime V3 の列に含まれる。独立した「上手さ」ではない |

\`highres\` は、Stable Diffusion 1.5 や SDXL で \`masterpiece, best quality\` と一緒に並ぶことが多い語です。上の NovelAI の品質タグ一覧そのものではありません。

同じ語をポジティブとネガティブの両方に置かないでください。\`best quality\` を両側に書くと、足した意味が打ち消されます。`,
      },
      {
        title: 'モデル別の書き方',
        content: `カードが示す語を先に使い、足して絵が変わらなければ戻します。品質が何割上がる、という測り方はこのページではしません。

**Stable Diffusion 1.5**

一般的な並びは \`masterpiece, best quality, highres\` です。ネガティブ側は \`worst quality, low quality, lowres\` です。

\`\`\`
1 adult woman, portrait, white blouse, long skirt, soft window light,
masterpiece, best quality, highres
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

**SDXL**

SDXL でも同じ三語から試せます。実写寄りでは、品質タグより光とレンズの語の方が残りやすいことがあります。変わらなければ \`highres\` から外してください。

\`\`\`
1 adult woman, portrait, white blouse, long skirt, soft window light,
masterpiece, best quality, highres
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

**Illustrious・NoobAI**

v0.1 のカードが対応していると書いている品質タグは、\`worst quality\`, \`bad quality\`, \`average quality\`, \`good quality\`, \`best quality\`, \`masterpiece (quality)\` です。詳しくは [Illustriousプロンプト](/guides/illustrious-prompt-guide) と同じです。カードは順番を固定していません。公開作例は人数から始まり、\`masterpiece\` を付ける場合も末尾です。

\`very aesthetic\` は v0.1 カードの対応リストにはありません。ファインチューンの作例では \`masterpiece, best quality, very aesthetic, absurdres\` が並ぶことがあり、\`newest\` を足すカードもあります。読んだモデルカードが先頭を推奨しているときだけ、先頭へ移します。

\`\`\`
1 adult woman, long black hair, white blouse, long skirt, gentle smile,
indoors, window light, upper body, masterpiece, best quality
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, bad quality, low quality
\`\`\`

**Pony**

Pony 系では、\`score_9, score_8_up, score_7_up\` を先頭付近に置き、アニメなら \`source_anime\` を添える書き方がモデルカードで案内されていることが多いです。レーティング用のタグは別に存在します。このページでは \`rating_safe\` だけを載せます。

\`\`\`
score_9, score_8_up, score_7_up, source_anime, rating_safe,
1 adult woman, long black hair, white blouse, long skirt,
upper body, looking at viewer, indoors
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

**NovelAI V4・V4.5・V5**

<a href="https://docs.novelai.net/ja/image/qualitytags/" class="text-sky-600 hover:underline">品質タグ追加</a>のページ（同日確認）では、切替で末尾に足される文字列として次が載っています。

| モデル | 切替 | 末尾に足される文字列 |
|---|---|---|
| V5 Full / V5 Curated | Light | \`, very aesthetic, amazing quality, no text\` |
| V5 Full / V5 Curated | Standard | \`, very aesthetic, masterpiece, no text\` |
| Anime V3 | オン | 末尾に \`best quality, amazing quality, very aesthetic, absurdres\` |
| Anime V2 | オン | 先頭に \`very aesthetic, best quality, absurdres\` |
| V1 | オン | 先頭に \`masterpiece, best quality\` |

V4 と V4.5 の切替文字列は、そのページの現在の本文には見当たりません。一部のまとめにある V4 Full の \`no text, best quality, very aesthetic, absurdres\` や、V4.5 Full の \`location, very aesthetic, masterpiece, no text\` は、この確認日の公式ページでは裏が取れなかったので、作例の必須タグにはしません。タグページでは \`masterpiece\` が V4.5 以降、\`top aesthetic\` が V4 以降です。\`location\` は、屋内か屋外かを指定せず場所を描かせるタグとして、同じタグページにあります。

切替がオンのときは、同じ語を自分のプロンプトにも書かないでください。二重になります。オフのときの V5 Standard 向けコピペです。

\`\`\`
1 adult woman, long black hair, white blouse, long skirt, standing, indoors, upper body,
very aesthetic, masterpiece, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

**Flux・Midjourney・ChatGPT**

この三種では、\`masterpiece\` や \`best quality\` はほぼ不要です。光、画材、レンズ、被写体を文で書いてください。Midjourney の \`--stylize\` は品質タグではなく、パラメータです。上げると様式化が強くなり、指示した服から離れることがあります。`,
      },
      {
        title: '置く位置',
        content: `先に見るのは、読み込んだモデルカードです。カードが先頭と書いていれば先頭、末尾と書いていれば末尾です。書いていないときは、主題を先にして品質タグは二つだけ末尾に置きます。

NovelAI の品質タグ追加ページでは、Anime V3 以降の切替は末尾、V2 以前は先頭、と位置が違います。Illustrious v0.1 は順番を固定していません。Stable Diffusion では、先頭に置く人と末尾に置く人がいます。どちらが常に正しい、という仕様はこのページでは断定しません。

品質タグを先頭に五個並べてから人物を書くと、人物タグが後ろに下がります。主題が消えるときは、品質タグを末尾へ移して数を減らしてください。`,
      },
      {
        title: 'ネガティブ側の品質タグ',
        content: `悪い側の語をネガティブに置きます。NovelAI の一覧では \`bad quality\`, \`worst quality\`, \`displeasing\`, \`very displeasing\` がそれに当たります。Illustrious v0.1 の作例は \`worst quality\` と \`bad quality\` をネガティブに置いています。Stable Diffusion で広く使われるのは \`worst quality, low quality, lowres\` です。\`low quality\` は NovelAI の六段階の名前そのものではありません。SD の作例ではこの並びのまま使います。

ポジティブに \`best quality\` があるとき、ネガティブに \`best quality\` は入れません。\`masterpiece\` も同様です。切替がオンの NovelAI で、標準の末尾と同じ語をネガティブに入れる必要もありません。

ネガティブを長くしすぎると、ファインチューンによっては絵がぼやける、と Illustrious のモデルページに注意があることがあります。その注意があるカードでは、\`worst quality, low quality\` と、手と年齢の行で止めてください。`,
      },
      {
        title: 'コピペ用テンプレ',
        content: `主題が違う四種類です。品質タグはアニメの人物だけに置き、実写と静物は光と素材にします。

**アニメの成人ポートレート**

\`\`\`
1 adult woman, anime style, portrait, long black hair, white blouse,
soft window light, looking at viewer, masterpiece, best quality
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

**実写の成人ポートレート**

\`\`\`
1 adult woman, portrait photograph, white blouse, long skirt,
soft window light, 50mm lens, natural skin texture
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

**背景だけ**

場所の選び方は [背景プロンプト](/guides/background-prompt-guide) です。

\`\`\`
no people, empty coffee shop interior, wooden counter, morning light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, person, human, face, worst quality, low quality
\`\`\`

**静物**

\`\`\`
ceramic cup on a linen table, product photo, soft daylight, centered, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, person, human, face, worst quality, low quality
\`\`\``,
      },
      {
        title: '入れすぎと重み付け',
        content: `品質タグを何個も積むと良くなる、という仕様は Illustrious v0.1 のカードにありません。NovelAI の一覧も、段階の名前であって「全部ポジティブに入れる」とは書いていません。

試し方は次です。

1. ポジティブは良い側を二つまで。例は \`masterpiece, best quality\` か、V5 Standard の \`very aesthetic, masterpiece\`。
2. ネガティブは悪い側を二つまで。\`worst quality, low quality\` か、カードにある \`worst quality, bad quality\`。
3. 重みを付けるなら一つだけ、\`(best quality:1.1)\` から。全部を 1.4 にすると、顔や手が先に崩れることがあります。
4. 足しても絵が変わらなければ、足した語を戻します。

\`8k\` や \`ultra-detailed\` は、上の公式一覧にはありません。解像度の数字を品質タグの代わりに増やしても、構図は直りません。`,
      },
      {
        title: 'よくある誤解',
        content: `EasyNegative や EasyNegativeV2 は、タグの単語ではなく embedding（Textual Inversion のファイル）の名前です。ファイルを UI に入れたときに展開されます。ファイルが無い環境で単語だけ書いても、その embedding の中身にはなりません。badhand 系の名前も同様で、手のタグそのものではありません。

もう一つは、品質タグが主題より優先される、という誤解です。服が消えたときに \`masterpiece\` を足しても、服は戻りません。服の名詞を人数の直後に戻してください。

Flux、Midjourney、ChatGPT 画像生成に、Stable Diffusion 用の品質タグ列をそのまま貼る必要もありません。光と画材の文に戻します。

**自然文（品質タグを足さない）**

\`\`\`
成人の女性（adult woman）のポートレート。白いブラウス、窓のやわらかい光、50mm の写真。
品質の点数語は書かない。布と光を書く。
\`\`\`

\`\`\`
A portrait photograph of an adult woman in a white blouse, soft window light, 50mm lens.
Describe the fabric and the light. She is an adult. Do not add score words.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, worst quality, low quality
\`\`\`

Midjourney 向けのパラメータは [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。`,
      },
    ],
    faq: [
      { q: '品質タグは先頭ですか、末尾ですか？', a: 'モデルカードが位置を書いているなら、その位置です。NovelAI の品質タグ追加では、Anime V3 以降は末尾、V2 以前は先頭です。Illustrious v0.1 は固定していません。カードが無言なら、主題のあとに良い側を二つだけ置いてください。' },
      { q: '同じタグをポジティブとネガティブの両方に入れてよいですか？', a: '入れないでください。`best quality` や `masterpiece` を両側に置くと、足した意味が打ち消されます。ネガティブに置くのは `worst quality` や `low quality` のような悪い側です。' },
      { q: 'NovelAI の品質タグ追加は何を足しますか？', a: '2026年10月28日の公式ページでは、V5 Full と V5 Curated の Light が末尾に `very aesthetic, amazing quality, no text`、Standard が末尾に `very aesthetic, masterpiece, no text` です。切替がオンなら、同じ語を自分では足しません。V4 と V4.5 の切替文字列は、そのページの現在の本文にはありません。' },
      { q: 'Flux や ChatGPT に masterpiece は必要ですか？', a: 'ほぼ不要です。被写体、光、画材、レンズを書いてください。Stable Diffusion や Illustrious 用の品質タグ列を、そのまま貼らなくて構いません。' },
      { q: 'EasyNegative は品質タグですか？', a: 'タグではありません。embedding のファイル名です。そのファイルを入れた UI で展開されます。単語だけコピーしても、中身のネガティブにはなりません。' },
      { q: '高画質と書くのと、品質タグは同じですか？', a: '同じではありません。`masterpiece` や `best quality` はモデルが学習した語で、出力ピクセルの寸法指定ではありません。寸法は UI の解像度で変えます。' },
    ],
  },

  'accessory-prompt-guide': {
    sections: [
      {
        title: 'アクセサリープロンプトの基本',
        content: `「ネックレス プロンプト」「アクセサリー プロンプト」は、小さな金属や石が顔や服に負ける、という失敗から始まります。書く順は、部位、素材、構図です。\`necklace\` だけでは鎖が服の模様になることがあります。\`gold necklace\` のように素材を付け、\`portrait\` か \`upper body\` で首元を大きくしてください。

全身と同時に強くすると、石は点になります。まず胸から上です。素材の色が服に移るときは [色プロンプト](/guides/color-prompt-guide)、髪に付けるものは [髪型プロンプト](/guides/hairstyle-prompt-guide) と分けます。

人物は成人です。ピアスは耳だけにします。首輪のような小物は扱いません。

**金のネックレス、上半身**

\`\`\`
1 adult woman, portrait, upper body, gold necklace, pendant,
white blouse, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

公開作例は [金のネックレス](/prompt/gold-necklace-vintage-6) です。タグの一覧は [ネックレス](/tag/ネックレス)、[ジュエリー](/tag/ジュエリー)、[アクセサリー](/tag/アクセサリー) です。`,
      },
      {
        title: 'ネックレスとペンダント',
        content: `名前がタグとして確かなのは \`necklace\` と \`pendant\` です。それ以外はこの表では自然な英語として書きます。

| 種類 | 書き方 | 注記 |
|---|---|---|
| ネックレス | \`necklace\` | 部位の基本タグ |
| ペンダント | \`pendant\` | \`necklace\` と一緒に |
| チェーン | chain necklace | 自然な英語 |
| 真珠 | pearl necklace | 自然な英語。粒が服に溶けるときは \`portrait\` |
| ロケット | locket | 自然な英語。開閉は書かない |
| 十字架 | cross necklace | 自然な英語 |
| 三日月・星・ハート | crescent pendant, star pendant, heart pendant | 自然な英語。一つだけ |
| 重ね付け | layered necklaces | 自然な英語。二本まで。増やすと鎖が融合する |

モチーフは一つです。十字架とハートと星を同時に強くすると、ペンダントの形が平均化されます。

**真珠**

\`\`\`
1 adult woman, portrait, upper body, pearl necklace,
black dress, long sleeves, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\``,
      },
      {
        title: 'チョーカー',
        content: `\`choker\` は首に沿う細い飾りです。ファッションの範囲だけにします。

| 種類 | 書き方 |
|---|---|
| 細いチョーカー | \`choker\` |
| リボン | ribbon choker。自然な英語。\`ribbon\` はタグ |
| レース | lace choker。自然な英語 |

リボンチョーカーとネックレスを同じ強さにすると、首元で一本に融合します。どちらか一方にしてください。

**リボンのチョーカー**

\`\`\`
1 adult woman, portrait, upper body, choker, ribbon,
white blouse, long sleeves, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

メイド服の首元と一緒に書くときは [メイド服プロンプト](/guides/maid-outfit-prompt-guide) のエプロンを先に決め、首の飾りは \`choker\` か \`ribbon\` の一方だけ足します。`,
      },
      {
        title: 'イヤリングとピアス',
        content: `耳に付ける基本タグは \`earrings\` です。スタッド、フープ、ドロップは自然な英語で stud earrings、hoop earrings、drop earrings と書きます。ピアスは耳だけです。体や舌には使いません。

髪が耳を隠すとイヤリングは出ません。耳が見えるように \`hair behind ear\` を自然な英語で一つ足すか、髪を耳より後ろにまとめてください。まとめ髪の名前は [髪型プロンプト](/guides/hairstyle-prompt-guide) です。

**フープ**

\`\`\`
1 adult woman, portrait, close-up, hoop earrings, hair behind ear,
gold earrings, white blouse, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

\`earrings\` と \`hoop earrings\` を両方強くしすぎると、耳に輪が二組できます。形は一つにしてください。`,
      },
      {
        title: '指輪、ブレスレット、腕時計',
        content: `手が小さいと、指輪は消え、指は増えます。指輪が主題なら、顔の全身ではなく手の寄りにします。それでも指が溶けるときは、指輪を一つにして、持つ物を外してください。手のネガティブは [ネガティブプロンプト](/guides/negative-prompt-guide) と併用します。

| 種類 | 書き方 | 注記 |
|---|---|---|
| 指輪 | \`ring\` | タグ。指は \`on finger\` を自然な英語で |
| ブレスレット | \`bracelet\` | タグ |
| バングル | bangle | 自然な英語 |
| 腕時計 | wristwatch | 自然な英語。文字盤の文字は書かない |

**指輪（手の寄り）**

\`\`\`
1 adult woman, close-up of one hand, gold ring on finger,
simple background, soft daylight, detailed fingers
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, extra fingers, missing fingers
\`\`\`

ブレスレットは同じ構図で \`bracelet\` に替えます。指輪と時計とブレスレットを一度に強くすると、手首で金属がつながります。`,
      },
      {
        title: '髪飾り、ティアラ、ブローチ',
        content: `髪と胸元は、ネックレスとは別の部位です。同時に全部を主題にすると、どれも小さくなります。

| 種類 | 英語 | 注記 |
|---|---|---|
| ヘアクリップ | \`hairclip\` | タグ |
| 髪飾り | hair ornament | 自然な英語 |
| ヘアピン | hairpin | 自然な英語 |
| ティアラ | \`tiara\` | タグ。寄りで頭の上を見せる |
| ブローチ | \`brooch\` | タグ。襟元ではなく胸の布の上、と自然な英語で位置を書く |

**ティアラとヘアクリップ**

\`\`\`
1 adult woman, portrait, tiara, hairclip, long hair,
white blouse, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

ブローチは \`brooch\` を胸の位置の文と一緒に、ネックレスを外した状態で試します。両方要るときも、重みは片方だけです。

和装の簪は \`kanzashi\` を一つ、髪をまとめた位置の近くに置きます。着物と一緒に書くときは [着物プロンプト](/guides/kimono-prompt-guide) です。`,
      },
      {
        title: '素材、宝石、色',
        content: `石と金属の名前は、タグというより名詞です。自然な英語として、色と素材を飾りの直後に置きます。服の色と同じにすると境界が消えるので、[色プロンプト](/guides/color-prompt-guide) のとおり、服と金属で色を分けてください。

| 素材・石 | 自然な英語 |
|---|---|
| 金 | gold |
| 銀 | silver |
| ローズゴールド | rose gold |
| 真珠 | pearl |
| ダイヤモンド | diamond |
| サファイア | sapphire |
| エメラルド | emerald |
| ルビー | ruby |
| アメジスト | amethyst |

石は一つです。\`gold necklace, sapphire pendant\` のように金属と石を一組にします。三色の石を同時に指定すると、ペンダントが虹色の模様になります。光は soft daylight か studio light のどちらか一方です。`,
      },
      {
        title: '描かれないときと、消したいとき',
        content: `小さい飾りが無いときは、タグが弱いのではなく、構図で顔や全身に負けています。

1. \`portrait\` か \`upper body\` か \`close-up\` の一つにする。\`full body\` は外す。
2. 素材を名詞に付ける。\`gold necklace\`。
3. 重みは一つ、\`(necklace:1.2)\` から。1.4 を超えると鎖が太くなりすぎます。
4. 服の柄を減らす。無地の \`white blouse\` の方が金属が見えます。

**寄りで描き直す**

\`\`\`
1 adult woman, close-up, upper body, gold necklace, pendant,
white blouse, plain background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, full body
\`\`\`

消したいときは、ポジティブから飾りを全部外し、ネガティブに \`jewelry, necklace, earrings\` を入れます。

**飾りなし**

\`\`\`
1 adult woman, portrait, white blouse, long hair, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, jewelry, necklace, earrings
\`\`\``,
      },
      {
        title: 'ChatGPT・Gemini と商品写真',
        content: `自然文でも、部位、素材、寄り、を同じ文に入れます。商品写真は人を描かず、布の上に一つだけ置きます。背景の布は [背景プロンプト](/guides/background-prompt-guide) の単色やスタジオに寄せてください。

**人のいる自然文**

\`\`\`
成人の女性（adult woman）の胸から上。金のネックレスと小さなペンダント。白い無地のブラウス。やわらかい昼の光。
\`\`\`

\`\`\`
A close-up portrait of an adult woman wearing a gold necklace with a small pendant and a plain white blouse.
Soft daylight. The necklace is clearly visible. She is an adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt
\`\`\`

**人のいない商品**

\`\`\`
a single gold necklace with a small pendant, lying on dark velvet,
product photo, soft studio light, centered, no person
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, person, human, face, text, watermark
\`\`\`

Midjourney では人の例から重みを外し、\`close-up portrait, gold necklace, plain white blouse --ar 2:3\` のように短くします。`,
      },
    ],
    faq: [
      { q: 'ネックレスを書いても描かれません', a: '`full body` を外し、`portrait` か `upper body` か `close-up` にします。`gold necklace` のように素材を付け、服は無地にしてください。重みは `(necklace:1.2)` から一つです。' },
      { q: 'チョーカーとネックレスは同時に書けますか？', a: '同じ強さにすると首元で一本に融合します。`choker` か `necklace` の一方にしてください。リボンにするときは `ribbon` を一つだけ足します。' },
      { q: 'ピアスはどこに指定できますか？', a: '耳だけです。基本タグは `earrings` で、フープやスタッドは自然な英語で形を一つ足します。体や舌には使いません。耳が髪で隠れるときは、髪を耳より後ろにまとめてください。' },
      { q: 'アクセサリーを消すには？', a: 'ポジティブから `necklace` や `earrings` を消し、ネガティブに `jewelry, necklace, earrings` を入れます。一部だけ残すときは、消したい種類だけをネガティブに回してください。' },
      { q: '商品写真風にするには？', a: '人を書かず、`product photo`、布、光、中央、を自然な英語で指定します。ネガティブに人物を入れ、石と金属は一組だけにしてください。' },
    ],
  },

  'suit-lab-coat-prompt-guide': {
    sections: [
      {
        title: 'スーツと白衣の基本',
        content: `「スーツ プロンプト」「白衣 プロンプト」は、服の名前が一語だと形が決まりません。\`suit\` だけだとジャケットで止まり、ネクタイやズボンが平均的な服に溶けます。\`business suit\` も同様で、パーツを続けて書いてください。

成人の仕事着として、\`suit jacket, white dress shirt, necktie, trousers\` までを一組にします。\`formal\` はフォーマルさのタグです。これだけで袖の長さや襟の左右は決まりません。

白衣は \`lab coat\` です。下に着るシャツを書かないと、白衣自体がワンピースになります。コスプレ全般の衣装の分け方は [コスプレプロンプト](/guides/cosplay-prompt-guide)、背の高さで全身を見せるときは [高身長プロンプト](/guides/tall-height-prompt-guide) です。ドレスの種類は [ドレスプロンプト](/guides/dress-prompt-guide) です。男性キャラのスーツ・私服の並べ方は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。

**パーツを書いたスーツ**

\`\`\`
1 adult man, suit jacket, white dress shirt, necktie, trousers, dress shoes,
formal, standing, office lobby, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, asymmetrical clothes, cropped feet
\`\`\`

タグの一覧は [スーツ](/tag/スーツ) です。`,
      },
      {
        title: 'スーツのパーツと種類',
        content: `確かなタグは \`suit\`, \`business suit\`, \`necktie\`, \`formal\` です。種類の名前の多くは自然な英語として、パーツと一緒に書きます。

| 種類 | 書き方 | 一緒に書くパーツ |
|---|---|---|
| ビジネス | \`business suit\` | \`suit jacket, white dress shirt, necktie, trousers\` |
| スリーピース | three-piece suit。自然な英語 | ジャケット、\`waistcoat\` または vest（自然な英語）、ズボン |
| パンツスーツ | pantsuit。自然な英語 | \`suit jacket, trousers\`。スカートは書かない |
| スカートスーツ | skirt suit。自然な英語 | \`knee-length skirt\`。短い丈は書かない |
| ダブル | double-breasted。自然な英語 | ボタンの列。強くすると左右が非対称になりやすい |
| タキシード | \`tuxedo\` | \`bowtie\` はタグ。\`bow tie\` とスペースを空ける書き方は自然な英語 |
| ベスト | \`waistcoat\` | vest は自然な英語 |
| ネクタイ | \`necktie\` | シャツの前で一本 |
| 蝶ネクタイ | \`bowtie\` | \`necktie\` と同時に強くしない |

色は \`navy suit jacket\` のように名詞へ付けます。ストライプは pinstripe を自然な英語で一つまでです。柄をジャケットとネクタイの両方に強くすると、色がにじみます。`,
      },
      {
        title: '女性のスーツ',
        content: `女性も成人の仕事着です。パンツか、膝丈のスカートかを先に決めて、両方は書きません。丈は \`knee-length skirt\` と自然な英語で指定し、短い丈の語はネガティブに回します。

**パンツスーツ**

\`\`\`
1 adult woman, pantsuit, suit jacket, white dress shirt, necktie, trousers, dress shoes,
formal, standing, office, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, asymmetrical clothes, cropped feet
\`\`\`

**膝丈のスカートスーツ**

\`\`\`
1 adult woman, skirt suit, suit jacket, white dress shirt, necktie,
knee-length skirt, dress shoes, formal, standing, office, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, asymmetrical clothes, cropped feet
\`\`\`

公開作例は [女性のビジネススーツ](/prompt/business-suit-woman) です。髪をまとめると首元のシャツが見えます。髪型の名前が要るときは [髪型プロンプト](/guides/hairstyle-prompt-guide) を見て、このページでは服のパーツを優先します。`,
      },
      {
        title: '男性のスーツ',
        content: `男性は肩の線と、ネクタイの一本です。\`necktie\` をシャツの色と分け、\`white dress shirt, navy necktie\` のように書いてください。

スリーピースはベストを一枚足すだけです。ベストとジャケットの色を変えると境界は見えますが、にじみやすいので、最初は同系色にします。

**スリーピース**

\`\`\`
1 adult man, three-piece suit, suit jacket, waistcoat, white dress shirt,
necktie, trousers, dress shoes, formal, standing, office, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, asymmetrical clothes, cropped feet
\`\`\`

二人の成人がオフィスで並ぶ公開作例は [オフィスのスーツ](/prompt/bl-couple-business-suit-office) です。背を高く見せるなら [高身長プロンプト](/guides/tall-height-prompt-guide) の \`tall, full body\` を人数の直後に足します。礼装の公開作例として [緑のスーツ](/prompt/green-suit-gentleman-fashion) もあります。色を変えるときは \`green suit jacket\` のように名詞へ付け、他のパーツは同じ列のままにします。`,
      },
      {
        title: '白衣',
        content: `\`lab coat\` は、下の服の上に羽織るコートです。\`white dress shirt\` とズボン、または膝丈のスカートを先に書き、そのあとに \`lab coat\` を置きます。聴診器は \`stethoscope\` と書きます。

医師は病院の廊下、研究者は実験室、薬剤師は薬局のカウンター、と場所を一つだけ変えます。職業名は自然な英語です。\`doctor\`、\`researcher\`、\`pharmacist\` を全部同時に強くすると、部屋が混ざります。

**医師**

\`\`\`
1 adult woman, doctor, lab coat, white dress shirt, trousers, stethoscope,
standing, hospital corridor, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, evening gown, cropped feet
\`\`\`

公開作例は [医師の白衣](/prompt/uniform-medical-doctor-white-coat) です。

**研究者**

\`\`\`
1 adult man, researcher, lab coat, white dress shirt, trousers,
standing, laboratory, full body, bright even lighting
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, evening gown, cropped feet
\`\`\`

薬剤師は研究者の例の \`researcher, laboratory\` を、自然な英語の \`pharmacist\` と薬局のカウンターに替えます。白衣とシャツとズボンは同じです。背景の部屋の選び方は [背景プロンプト](/guides/background-prompt-guide) です。`,
      },
      {
        title: 'スクラブと看護の制服',
        content: `手術着や看護の実務着は、自然な英語で \`medical scrubs\` と書きます。上下が分かれた無地の作業着です。白衣を重ねるときは \`lab coat\` を一枚足します。性的な看護服の言い回しは使いません。丈は足首まで見える全身か、膝まで隠れるズボンにします。

**スクラブ**

\`\`\`
1 adult woman, medical scrubs, trousers, standing,
hospital corridor, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, evening gown, cropped feet
\`\`\`

スクラブの色は \`navy medical scrubs\` のように一つだけです。柄を増やすと、ポケットや襟の線が模様に溶けます。`,
      },
      {
        title: 'シーン別のコピペ',
        content: `場所は一つです。オフィス、会議室、病院の廊下、実験室、夜の街を同時に書くと、窓と照明が混ざります。病院と実験室は白衣の節の作例です。ここには残りの三つを置きます。

**オフィス**

上のパンツスーツと、パーツを書いたスーツがオフィスです。ロビーと執務室を両方書かないでください。

**会議室**

\`\`\`
1 adult woman, suit jacket, white dress shirt, necktie, knee-length skirt,
standing, meeting room, conference table, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, asymmetrical clothes, cropped feet
\`\`\`

**夜の街**

\`\`\`
1 adult man, tall, suit jacket, white dress shirt, necktie, trousers,
long coat, standing, city street at night, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, cropped feet, out of frame
\`\`\`

夜の街で背を見せるときは [高身長プロンプト](/guides/tall-height-prompt-guide) のドアや街灯を一つ足せます。コートとスーツを両方主題にすると袖が二枚になります。コートが要るときはジャケットのディテールを減らし、\`long coat, necktie, trousers\` を残してください。`,
      },
      {
        title: 'ネクタイや白衣が崩れるとき',
        content: `ネクタイが溶ける、ラペルの左右が違う、白衣がドレスになる、の三つが多いです。

1. \`necktie\` を \`white dress shirt\` の直後に置く。柄は無地から始める。
2. ダブルのボタン列は、左右が安定してから double-breasted を自然な英語で足す。
3. 白衣の下に \`white dress shirt, trousers\` を書き、ネガティブに \`evening gown\` を入れる。
4. 構図は \`upper body\` で襟とネクタイを確認し、問題なければ \`full body\` に戻す。
5. 重みは \`(necktie:1.2)\` から一つ。

\`suit\` 一語に戻すと、直したパーツがまた消えます。直したあともジャケット、シャツ、ネクタイ、ズボンの列は残してください。`,
      },
      {
        title: 'ChatGPT・Gemini で書く場合',
        content: `証明写真やビジネスのプロフィールでは、タグより文が向きます。成人、無地のスーツ、無地の背景、正面、胸から上、を書いてください。提出できる規格になるかは、発行元の指定で確認します。関連する作例の集まりは [証明写真](/tag/証明写真) です。

**日本語**

\`\`\`
成人の女性（adult woman）のビジネス用ポートレート。ネイビーのスーツジャケット、白いシャツ、無地の背景。
正面、胸から上、やわらかい均一な光。成人。
\`\`\`

**英語**

\`\`\`
A business profile portrait of an adult woman in a navy suit jacket and a white dress shirt.
Plain background, facing the camera, head and shoulders, soft even light. She is an adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, asymmetrical clothes, text, watermark
\`\`\`

Midjourney では \`business portrait of an adult woman, navy suit jacket, white shirt, plain background, head and shoulders --ar 1:1\` のように短くし、品質タグの列は足しません。`,
      },
    ],
    faq: [
      { q: 'suit とだけ書くと何が足りませんか？', a: 'ジャケットで止まり、シャツとネクタイとズボンが別の服に溶けることがあります。`suit jacket, white dress shirt, necktie, trousers` まで書いてください。`business suit` も、そのパーツの代わりにはなりません。' },
      { q: '女性のスカートスーツの丈はどう指定しますか？', a: '自然な英語の `knee-length skirt` を、`suit jacket` とシャツと一緒に書きます。短い丈の語はネガティブに回し、パンツスーツにするときはスカートを書かずに `trousers` にします。' },
      { q: '白衣がワンピースになります', a: '`lab coat` の前に `white dress shirt` と `trousers` を書き、ネガティブに `evening gown` を入れてください。聴診器が要るときだけ `stethoscope` を一つ足します。' },
      { q: 'ネクタイの形が崩れます', a: '`necktie` をシャツの直後に置き、柄は無地から始めます。重みは `(necktie:1.2)` までです。`bowtie` と同時に強くすると、首元で二種類が混ざります。' },
      { q: '証明写真風の文はどう書きますか？', a: '成人、スーツジャケット、白いシャツ、無地の背景、正面、胸から上、均一な光、を一つの文にします。タグ列よりこの文の方が ChatGPT や Gemini 向きです。作例の集まりは [証明写真](/tag/証明写真) です。' },
    ],
  },
}
