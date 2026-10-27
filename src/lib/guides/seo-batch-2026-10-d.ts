/**
 * Fourth SEO batch (2026-10-27): princess carry, hand holding,
 * twintails, plump / plus-size build.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_4_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'princess-carry-prompt-guide': {
    sections: [
      {
        title: 'お姫様抱っこプロンプトの基本',
        content: `「お姫様抱っこ プロンプト」「抱っこ プロンプト」で必要なのは、誰が誰を腕の中で支えているかを一文で書くことです。タグは \`princess carry\` と \`carrying\` を、人数の直後に置きます。抱かれる側の腕は \`arms around neck\` です。

最小の並びは次のとおりです。

1. 成人の人数（\`1 adult man and 1 adult woman\`、\`2 adult men\`、\`2 adult women\`）
2. \`princess carry, carrying\`
3. 誰が抱えて、誰が抱えられているか、を短い英語の文で一つ
4. 抱かれる側の \`arms around neck\`
5. \`full body\` または \`wide shot\`。脚が画面の外に出ると、支えている腕が見えません

自然文のツール（ChatGPT、Gemini、Midjourney）では、同じ内容を文にします。「成人の男性が、成人の女性を、膝の下と背中に腕を回して抱えている」のように、動作の主語を先に書いてください。

このページは、意識のある大人同士の、温かい抱っこです。気絶、気を失って倒れている人、無理やり運ぶ、閉じ込めている、という書き方は使いません。学生服の場面も入れません。タグの作例一覧は [お姫様抱っこ](/tag/お姫様抱っこ)、二人の構図全般は [二人構図](/guides/two-person-composition-prompt-guide) です。`,
      },
      {
        title: '英語タグ一覧',
        content: `抱っこの名前と、腕の位置は別のタグです。名前だけだと、二人が並んでいる絵になることがあります。

| 日本語 | 英語 | 注記 |
|---|---|---|
| お姫様抱っこ | \`princess carry\` | 動作の名前。単独では腕が通らないことがある |
| 抱える | \`carrying\` | 誰かが誰かを支えている、という関係 |
| 首に腕を回す | \`arms around neck\` | 抱かれる側の腕。抱く側の腕とは別 |
| 見つめ合う | \`looking at another\` | 顔が向き合う。\`eye contact\` も近い |
| 笑顔 | \`smile\` | 一つで足ります。強くしすぎない |
| おんぶ | \`piggyback\` | 背中に乗せる。お姫様抱っことは同時に強くしない |
| 片手抱っこ | one arm carrying | 公式タグとしては断定しません。自然な英語の短文で書きます |

\`lifting person\` も、人を持ち上げる自然な英語として足せますが、ここでは公式タグとは書きません。効かないときは、腕の位置を文で書いてください。

おんぶにしたいときだけ \`piggyback\` を使い、\`princess carry\` は外します。両方を同じ強さにすると、腕が前と後ろの両方にできます。`,
      },
      {
        title: '抱く側・抱かれる側を固定する',
        content: `役割が逆になるのは、二人を同じタグでまとめているときです。抱く人の腕と、抱かれる人の腕を、文で分けてください。

抱く側は「膝の下に片腕、背中に片腕」です。英語では \`one arm under her knees, one arm behind her back\` と書きます。抱かれる側は \`arms around neck\` だけにします。抱く側にも \`arms around neck\` を入れると、首に腕が二組できます。

身長と体格を先に書くと、どちらが支えているかが残りやすいです。\`tall man\` と \`petite woman\` のように、高さを人数の直後に置きます。\`petite\` は小柄の大人です。成人であることは人数タグで書き、下のネガティブを必ず入れます。体の大きさの差そのものは [体格差プロンプト](/guides/body-size-difference-prompt-guide)、並んだときの頭の高さは [身長差イラストの構図](/guides/height-difference-illustration-composition-guide) です。数値から文を組むときは [身長差メーカー](/tools/height-difference-maker) を使えます。

**身長差のある抱っこ**

\`\`\`
1 tall adult man and 1 petite adult woman, princess carry, carrying,
the tall man carrying the woman, one arm under her knees, one arm behind her back,
the woman with arms around his neck, looking at another, smile,
casual clothes, park, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\`

NovelAI V4 以降には、キャラクターごとの action タグがあります。公式ドキュメント（Multiple Characters）では、する側を \`source#\`、される側を \`target#\` と書く、と説明されています。公式の例は \`source#hug\` と \`target#hug\` です。\`princess carry\` を同じ接頭辞で書く使い方は、公式ページの例そのものではないので、効かないときは上の文の書き方に戻してください。

\`\`\`
1 adult man, source#princess carry, carrying
1 adult woman, target#princess carry, arms around neck
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\``
      },
      {
        title: 'シーン別コピペ例',
        content: `場所は一つ、服は着たまま、二人とも成人です。重みは付けずに試し、無視されるときだけ \`(princess carry:1.2)\` を一つ足します。腕の文と同時に強くしないでください。

**結婚式**

\`\`\`
1 adult man and 1 adult woman, princess carry, carrying,
the man carrying the woman, one arm under her knees, one arm behind her back,
the woman with arms around his neck, looking at another, smile,
wedding dress, tuxedo, chapel, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\`

**雨の日に駆ける**

\`\`\`
2 adults, adult couple, princess carry, carrying,
the man carrying the woman, one arm under her knees, one arm behind her back,
arms around neck, raincoat, city street, rainy day, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\`

**ファンタジー**

\`\`\`
1 adult man and 1 adult woman, princess carry, carrying,
a knight carrying a princess, one arm under her knees, one arm behind her back,
the woman in a long gown, arms around neck, castle hall, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\`

**BL**

意識のある相手を、助けたあとにオフィスや廊下で運ぶ構図です。怪我や気絶は書きません。公開作例は [BL お姫様抱っこ](/prompt/bl-couple-princess-carry-rescue) です。

\`\`\`
2 adult men, princess carry, carrying,
the taller man carrying the other man, one arm under his knees, one arm behind his back,
arms around neck, both looking at another, office, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies, unconscious
\`\`\`

**百合**

\`\`\`
2 adult women, princess carry, carrying,
one woman carrying the other, one arm under her knees, one arm behind her back,
arms around neck, yukata, festival, smile, looking at another, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\``,
      },
      {
        title: 'アングルと構図',
        content: `腕と脚を同時に見せるなら、真横が最も安定します。上下の極端な角度は、腕か脚のどちらかを隠します。

| アングル | 英語タグ | 向き |
|---|---|---|
| 横 | \`from side\` | 膝の下の腕と、背中の腕が両方見える |
| 斜め | \`three-quarter view\` | 顔と腕。横の次に試しやすい |
| 下から | \`from below\` | 劇的に見える。腕が短くなりやすい。詳細は [下からのアングル](/guides/low-angle-prompt-guide) |
| 上から | \`from above\` | 頭の位置は見える。腕が胴に溶けやすい。詳細は [見下ろす構図](/guides/high-angle-prompt-guide) |
| 全身 | \`full body\` | 脚の先まで入れる。寄りと同時に強くしない |
| 引き | \`wide shot\` | 全身が入る。人物が小さいときは解像度を上げる |

**横から、全身**

\`\`\`
2 adults, princess carry, carrying, from side, full body,
one arm under her knees, one arm behind her back, arms around neck,
casual clothes, street, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, close-up
\`\`\`

\`close-up\` をネガティブに入れるのは、顔だけになって腕が消えるのを避けるためです。表情が要るときは外し、\`upper body\` ではなく \`full body\` のまま横を維持してください。`,
      },
      {
        title: '崩れやすい点とネガティブ',
        content: `浮いている人、膝の下に腕がない、体が一つに溶ける、脚が一本多い、がよく起きます。ポジティブで腕の位置を一文にし、ネガティブで浮きと余分な脚を外します。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, missing arms, extra legs, fused bodies, conjoined
\`\`\`

直し方は次の順です。数字のパラメータはこのページでは決めません。

1. 腕を文で指定する（\`one arm under her knees, one arm behind her back\`）。
2. \`full body\` か \`wide shot\` で、膝から足先まで入れる。
3. 重みを減らす。\`princess carry\` と腕の文を同時に 1.3 以上にしない。
4. アングルを \`from side\` に戻す。
5. まだ溶けるなら、ControlNet の OpenPose で、抱く姿勢の参照を渡す。腕の通りだけを借りて、顔や服はプロンプト側に残します。

人が浮くときは、地面や床を一つ書いてください。\`chapel floor\` や \`street\` のように、足が向かう場所があると、浮きが減ります。地面に足をつけたいわけではなく、抱えている人が立っている、という意味です。`,
      },
      {
        title: 'ChatGPT・Gemini で書く場合',
        content: `タグが読めないツールでは、主語、腕の位置、服、場所、画角を、この順で一つの文にします。人数は成人と書いてください。

**日本語**

\`\`\`
成人の男性が、成人の女性をチャペルでお姫様抱っこしています。
片方の腕は膝の下、もう片方の腕は背中です。
女性は首に腕を回し、相手を見て微笑んでいます。
ウェディングドレスとタキシード。全身が入り、横からの構図。二人とも大人です。
\`\`\`

**英語**

\`\`\`
An adult man carries an adult woman in a princess carry inside a wedding chapel.
One arm is under her knees and the other arm is behind her back.
She has her arms around his neck and looks at him with a smile.
Wedding dress and tuxedo, full body, seen from the side. Both people are adults.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, floating, extra legs, fused bodies
\`\`\`

Midjourney では、同じ英文のうしろに画角のパラメータを足せます。Stable Diffusion や NovelAI では、上のタグ例に戻してください。キスにしたいときは、このページに \`kiss\` を足さず、[キスプロンプト](/guides/kiss-prompt-guide) の距離に切り替えた方が顔は溶けません。`,
      },
      {
        title: '関連するポーズ',
        content: `お姫様抱っこは、足が地面から離れて腕の中にいるポーズです。隣のポーズと混ぜると、腕の位置が割れます。

- 抱きしめる、バックハグは [ハグプロンプト](/guides/hug-prompt-guide)。足は地面かソファにあります。
- 顔が触れる距離は [キスプロンプト](/guides/kiss-prompt-guide)。
- 壁に手をつく距離は [壁ドンプロンプト](/guides/kabedon-prompt-guide)。
- 頭の高さの差は [身長差プロンプト](/guides/height-difference-pair-prompt) と [身長差イラストの構図](/guides/height-difference-illustration-composition-guide)。
- 八種類の二人ポーズの中での位置づけは [二人構図](/guides/two-person-composition-prompt-guide) です。`,
      },
    ],
    faq: [
      {
        q: '浮いているように見えます',
        a: '抱く人の足がつく場所（床、道）を一つ書き、`full body` と `from side` にします。ネガティブに `floating` を入れてください。腕の文がないと、体だけが空中に残ります。',
      },
      {
        q: '脚が消えます',
        a: '`close-up` を外し、`full body` か `wide shot` で膝から足先まで入れてください。上からのアングルは脚を短くするので、まずは `from side` に戻します。',
      },
      {
        q: '抱く側と抱かれる側が逆になります',
        a: '誰の腕が膝の下にあるかを文で書きます。NovelAI の `source#` / `target#` は公式の例が hug なので、`princess carry` で効かないときは文の指定に戻してください。',
      },
      {
        q: '英語では何と書きますか？',
        a: '動作の名前は `princess carry`、支えている関係は `carrying`、抱かれる側の腕は `arms around neck` です。この三つを、成人の人数のあとに置いてください。',
      },
      {
        q: '顔が近すぎてキスになります',
        a: '`kiss` は入れないでください。`looking at another` か `smile` を一つにし、顔の距離は `from side, full body` で離します。キスにしたいときはキスプロンプトのページに切り替えてください。',
      },
      {
        q: 'おんぶとの違いは何ですか？',
        a: 'お姫様抱っこは前の腕の中で、膝の下と背中を支えます。おんぶは背中に乗せる `piggyback` です。同時に強くすると、腕が前後に分かれます。',
      },
    ],
  },

  'hand-holding-prompt-guide': {
    sections: [
      {
        title: '手をつなぐ・恋人繋ぎの基本',
        content: `「恋人繋ぎ プロンプト」「恋人つなぎ プロンプト」「手をつなぐ プロンプト」は、手のひらの向きでタグが分かれます。\`holding hands\` は手のひらを合わせてつなぐ書き方、\`interlocked fingers\` は指を絡める恋人繋ぎ（恋人つなぎ）です。欲しい方を一つ、人数の直後に置いてください。

手のタグを服装や背景のうしろに回すと、手が画の外に出ます。並びは次のとおりです。

1. 成人の人数
2. \`holding hands\` または \`interlocked fingers\`
3. 歩いているなら \`walking, side-by-side\`
4. 画角は \`upper body\` か \`cowboy shot\`

\`full body\` は、解像度が低いと手が点になります。手を見せたいときは、腰から上か、太ももあたりまでの距離にしてください。二人の構図全般は [二人構図](/guides/two-person-composition-prompt-guide)、並んだ作例のタグは [カップル](/tag/カップル) です。

このページは、服を着た大人の手つなぎです。親子やきょうだいの例は置きません。学生服の場面も入れません。`,
      },
      {
        title: '英語タグ一覧',
        content: `| 日本語 | 英語 | 注記 |
|---|---|---|
| 手をつなぐ | \`holding hands\` | 手のひら同士。指は絡まないことが多い |
| 恋人繋ぎ / 恋人つなぎ | \`interlocked fingers\` | 指を絡める。\`holding hands\` と両方強くしない |
| 並んで歩く | \`walking, side-by-side\` | 横に並んだ歩行。一つずつでも足ります |
| 見つめ合う | \`looking at another\` | 歩きながらだと横顔になる |
| 振り返る | \`looking back\` | 手を引かれながら後ろを見る |
| 手を引く | leading her by the hand | 公式タグとしては断定しません。自然な英語の短文で書きます |
| 主観 | \`pov, pov hands\` | カメラが手の持ち主側。次の節 |

\`hand in another's hand\` は、相手の手の中に手がある、という自然な英語として足せますが、ここでは公式タグとは書きません。恋人繋ぎにしたいのに握手になるときは、\`interlocked fingers\` を \`holding hands\` より前に置いてください。

指の形まで一語ずつ書くと、指は増えやすくなります。まず絡めるか、ひらを合わせるか、だけを決めてください。`,
      },
      {
        title: '並んで歩く・デート',
        content: `場所は一つ、服は日常着です。夜の街、公園、祭りの浴衣、海沿いの遊歩道をジャケットと長ズボンで歩く、のどれかを選んでください。海の場面でも水着の語は入れません。

**公園**

\`\`\`
1 adult woman and 1 adult man, adult couple, interlocked fingers,
walking, side-by-side, looking at another, smile,
park, casual jacket, daytime, cowboy shot, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\`

**夜の街**

\`\`\`
2 adults, adult couple, holding hands, walking, side-by-side,
city street at night, street lights, coat, cowboy shot, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\`

**海沿いの遊歩道（カジュアルな服）**

\`\`\`
2 adults, adult couple, holding hands, walking, side-by-side,
beach promenade, casual jacket, long pants, daytime, cowboy shot, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\`

**祭りの浴衣（成人）**

\`\`\`
2 adult women, interlocked fingers, walking, side-by-side,
yukata, festival, lanterns, smile, cowboy shot, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\``,
      },
      {
        title: '恋人繋ぎのアップ',
        content: `指を絡めた手元だけを見せるときは、距離を寄せます。\`close-up\` は広く使われます。\`hands focus\` は公式タグとしてここでは断定しないので、英語の短文 \`close-up of hands\` を一緒に書いてください。

寄りは指のエラーが増えます。指の本数をポジティブで数えないでください。\`interlocked fingers\` を一つ置き、手のネガティブを厚くします。

\`\`\`
close-up of hands, interlocked fingers, 2 adults, adult couple,
outdoor daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, disconnected hands, floating hand, bad hands
\`\`\`

顔も残したいときは、このアップをやめて \`cowboy shot\` に戻します。手元と顔を同じ強さで寄ると、指か目のどちらかが溶けます。`,
      },
      {
        title: '主観視点（POV）で手を引かれる',
        content: `\`pov\` はカメラが誰かの目の位置、\`pov hands\` は画面の手前にその人の手が出ます。振り返りながら手を引かれる構図は、次の並びが読みやすいです。

\`pov, pov hands, looking back, holding hands, outstretched arm\`

画面に全身で出るのは、振り返っている側の一人です。カメラ側の体は手だけにしてください。\`2 people\` と \`pov\` を同じ強さにすると、人数が割れます。

\`\`\`
pov, pov hands, looking back, holding hands, outstretched arm,
1 adult woman, casual coat, city street, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, extra hands, floating hand, extra person
\`\`\`

「leading her by the hand」のように、誰が導いているかを文で足すと、\`holding hands\` だけより意図が残ります。この文は自然な英語であり、公式タグとしては断定しません。`,
      },
      {
        title: '身長差・BL・百合で使う',
        content: `身長差は、頭の高さを見せるために \`cowboy shot\` か \`full body\` を一度だけ試します。手が見えなくなったら \`cowboy shot\` に戻してください。体の大きさの差は [体格差プロンプト](/guides/body-size-difference-prompt-guide)、二人の頭の高さは [身長差プロンプト](/guides/height-difference-pair-prompt) です。

親子、保護者と子ども、きょうだいの年齢差では書きません。二人とも成人です。

**身長差**

\`\`\`
1 tall adult man and 1 petite adult woman, holding hands,
walking, side-by-side, city street, casual clothes, cowboy shot, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\`

**BL**

公開作例は [公園で手をつなぐ BL](/prompt/bl-couple-hand-holding-park) です。

\`\`\`
2 adult men, interlocked fingers, walking, side-by-side,
park, casual jacket, looking at another, cowboy shot, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\`

百合は、前の節の浴衣の例がそのまま使えます。関係の語を増やすより、\`2 adult women\` と \`interlocked fingers\` を残してください。近い距離の腕は [ハグプロンプト](/guides/hug-prompt-guide)、顔が触れる距離は [キスプロンプト](/guides/kiss-prompt-guide)、足が浮く抱っこは [お姫様抱っこプロンプト](/guides/princess-carry-prompt-guide) です。`,
      },
      {
        title: '指が増える・手が溶けるときの直し方',
        content: `手をつなぐ絵で多い失敗は、指が六本、手がもう一組、手が腕から離れて浮く、左右の手の大きさが違う、です。ネガティブの基本は次です。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, fused fingers, extra hands, disconnected hands, floating hand, bad hands,
school uniform
\`\`\`

直し方は、タグを増やす前に距離と重みを戻します。

1. 手のタグを一つにする。\`holding hands\` と \`interlocked fingers\` を同時に強くしない。
2. \`from side\` にして、つながった手が輪郭で見えるようにする。
3. 手を画面の真ん中あたりに置く。極端な寄りと、小さすぎる全身の両方を避ける。
4. 解像度を上げる、または hires.fix で手のまわりを描き直す。倍率の数値はモデルで違うので、ここでは決めません。
5. まだ崩れるなら、手の範囲だけを inpaint する。マスクは手首まで入れ、服や顔にはみ出させない。

手だけの専用ガイドはないので、品質タグの削り方は [ネガティブプロンプト](/guides/negative-prompt-guide) と併用してください。ネガティブを長くするより、ポジティブの手タグを減らした方が先に効くことが多いです。`,
      },
      {
        title: 'ChatGPT・Gemini・Midjourney で書く場合',
        content: `自然文では、「指を絡める」と「手のひらを合わせる」を明示します。恋人繋ぎも恋人つなぎも、英語では指を絡める方です。

**日本語**

\`\`\`
成人の二人が、公園を並んで歩いています。
指を絡めた恋人繋ぎで、横から腰のあたりまで見えています。
カジュアルなジャケット。二人とも大人で、相手の方を見て微笑んでいます。
\`\`\`

**英語**

\`\`\`
Two adults walk side by side in a park, holding hands with fingers interlocked.
Seen from the side, framed from the waist up. Casual jackets.
Both people are adults and glance at each other with a smile.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, extra fingers, fused fingers, extra hands, floating hand
\`\`\`

Midjourney では、同じ英文のうしろに画角のパラメータを足せます。指が溶けるときは、文から指の本数の説明を消し、「fingers interlocked, no extra fingers」だけを残してください。`,
      },
    ],
    faq: [
      {
        q: '恋人繋ぎにならず、普通の握手になります',
        a: '`holding hands` だけだと手のひら同士になりやすいです。恋人繋ぎ（恋人つなぎ）は `interlocked fingers` を人数の直後に置き、`holding hands` は外すか弱くしてください。',
      },
      {
        q: '指が6本になります',
        a: '指の本数をポジティブに書かず、ネガティブに `extra fingers, fused fingers, bad hands` を入れてください。距離は `from side` の `cowboy shot` に戻し、重みは一つだけにします。',
      },
      {
        q: '手が離れて浮きます',
        a: 'ネガティブに `disconnected hands, floating hand, extra hands` を入れ、手を画面の端ではなく真ん中あたりに置いてください。`full body` で手が小さいときも、手だけが体から離れやすくなります。',
      },
      {
        q: '英語では何と書きますか？',
        a: '手のひらでつなぐのは `holding hands`、指を絡める恋人繋ぎ・恋人つなぎは `interlocked fingers` です。並んで歩くなら `walking, side-by-side` を足してください。',
      },
      {
        q: '手をつないで歩く後ろ姿にしたいです',
        a: 'カメラの `from behind` と `walking, holding hands` を書けます。後ろ姿では手が背中に隠れやすいので、まずは `from side` で手が見えるかを確認してください。',
      },
    ],
  },

  'twintail-prompt-guide': {
    sections: [
      {
        title: 'ツインテールプロンプトの基本',
        content: `「ツインテール プロンプト」の基本タグは \`twintails\` です。一語が Danbooru で使われる形で、\`twin tails\` と分けて書いても通ることが多いです。髪色の直後に置いてください。色より前だと、リボンや服の色まで髪になります。

ツインテールは幼く見えやすいので、成人の指定と服装で年齢感を固定する。人数は \`1 adult woman\`、服はブラウス、ジャケット、ニット、コート、日常着、ステージ衣装のように、大人の服を一つ書きます。学生服は入れません。

\`\`\`
1 adult woman, black hair, twintails, hair ribbon,
white blouse, cafe, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\`

髪型全般は [髪型プロンプト](/guides/hairstyle-prompt-guide)、色の名前は [髪色プロンプト](/guides/hair-color-prompt-guide)、タグの順を Illustrious に合わせるときは [Illustrious プロンプト](/guides/illustrious-prompt-guide) です。一覧は [髪型プロンプト集](/prompts/hairstyle)、タグは [髪型](/tag/髪型) にあります。`,
      },
      {
        title: '種類一覧',
        content: `種類は一つにします。高い・低い、長い・短い、編み込み、を同時に強くすると、結び目が二箇所できます。

| 日本語 | 英語 | 注記 |
|---|---|---|
| ツインテール | \`twintails\` | 基本。\`twin tails\` でも近い |
| 低いツインテール | \`low twintails\` | 耳より下で結ぶ |
| 高い位置 | \`high twintails\` | 公式タグとしては断定しません。自然な英語では high-set twintails |
| 短い | \`short twintails\` | 肩より上で終わる |
| 長い | \`long twintails\` | 胸より下まで |
| 三つ編みツインテール | \`twin braids\` | 二本とも編む |
| 縦ロール | \`twin drills\` | 螺旋。長い髪と一緒に書く |
| ツーサイドアップ / ハーフツイン | \`two side up\` | 上半分だけ結び、残りは下ろす |
| 左右非対称 | \`uneven twintails\` | 左右で長さか高さが違う |
| 4本 | \`quad tails\` | 二本より結び目が増える |
| おさげ | \`low twintails\` または \`twin braids\` | 下ろした結びは low、編むなら twin braids。両方は書かない |

おさげは日本語の中で、結ぶだけの場合と編む場合が混ざっています。絵にしたい方を一つ選んでください。`,
      },
      {
        title: '位置（高い・低い・サイド）の指定',
        content: `位置は \`low twintails\` のように、基本タグへ置き換えるか、無視されるときだけ重みを一つ足します。\`(low twintails:1.2)\` から試し、1.3 を超えると結び目が崩れやすくなります。数字は目安です。

高い位置を \`high twintails\` と書くと通るモデルもあります。公式タグとしては断定しないので、効かないときは high-set twintails という自然な英語に変えてください。

サイド（片側だけ）はツインテールではありません。片側の結びは \`side ponytail\` です。左右の二本と同時に強くすると、結びが三箇所になります。

**低い位置**

\`\`\`
1 adult woman, brown hair, (low twintails:1.2),
knit sweater, office, upper body, from front
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail, side ponytail
\`\`\`

左右を揃えたいときは \`from front\` を足します。横顔だと、奥の一本が髪の塊に溶けます。`,
      },
      {
        title: '長さ・太さ（長い・短い・細い）の指定',
        content: `長さは \`long twintails\` と \`short twintails\` で分けます。それより長いときは、全体の長さとして \`very long hair\` を一つ足します。長さのタグを三つの強さで重ねないでください。

細いツインテールに、ここでは安定した公式タグを置きません。thin twintails という自然な英語を、\`twintails\` のうしろに足してください。太さの語を強くすると、髪の本数そのものが崩れることがあります。まずは長さだけを決めてください。

**長い**

\`\`\`
1 adult woman, black hair, long twintails, very long hair,
coat, city street, upper body, from front
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail, short hair
\`\`\`

**短い**

\`\`\`
1 adult woman, dark hair, short twintails,
blouse, cafe, upper body, from front
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail, very long hair
\`\`\``,
      },
      {
        title: '髪飾り（リボン・シュシュ・ヘアゴム）',
        content: `飾りは一つ、色は一つです。複数を同じ強さにすると、結び目の上に飾りが積み重なります。

| 日本語 | 英語 | 注記 |
|---|---|---|
| リボン | \`hair ribbon\` | 結び目に付ける。色はうしろ |
| ヘアゴム / ボンボン | \`hair bobbles\` | 球状のゴム |
| シュシュ | \`hair scrunchie\` | 布の輪 |
| ボウ | \`hair bow\` | リボンより大きな蝶 |

色は \`red hair ribbon\` のように、飾りの直前に置きます。毛先の色は髪飾りの色と別です。毛先だけ変える書き方は [髪色プロンプト](/guides/hair-color-prompt-guide) の \`colored tips\` を使ってください。

\`\`\`
1 adult woman, black hair, twintails, red hair ribbon,
white blouse, cafe, upper body, from front
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\``,
      },
      {
        title: '大人っぽいツインテールにする',
        content: `幼く見えるときは、髪型を変える前に年齢と服を固定します。\`adult woman\` を先頭近くに置き、ブラウス、ジャケット、ニット、コートのどれかを書きます。化粧を足すなら \`makeup\` を一つ。\`mature female\` は、ここでは公式タグとして断定しません。大人の顔は人数タグと服で固定してください。

場所は、カフェ、コンサートのステージ、街、オフィスのカジュアル、のどれか一つです。

**カフェ、低いツインテール**

\`\`\`
1 adult woman, black hair, low twintails, hair scrunchie,
blouse, long skirt, cafe, sitting at a table, upper body, from front, makeup
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\`

**ステージ、短いツインテール**

\`\`\`
1 adult woman, brown hair, short twintails, hair ribbon,
jacket, concert stage, spotlight, upper body, from front, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\`

**街、長いツインテール**

\`\`\`
1 adult woman, black hair, long twintails,
coat, city street, daytime, upper body, from front
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\`

**オフィスのカジュアル**

\`\`\`
1 adult woman, dark brown hair, low twintails, hair bobbles,
knit sweater, office, upper body, from front, calm expression
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\``,
      },
      {
        title: '崩れやすい点とネガティブ',
        content: `一本のポニーテールになる、左右で本数や長さが違う、髪が背景の色と溶ける、がよく起きます。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail, single hair bun
\`\`\`

\`ponytail\` と \`single hair bun\` をネガティブに入れるのは、結びが一つにまとまるときだけです。お団子も欲しい絵では外してください。

直し方:

1. \`from front\` にして、左右の結びが同じ高さで見えるようにする。
2. 髪タグを減らす。長さ、位置、飾り、質感のうち、強くするのは一つ。
3. 色は髪に一つ、飾りに一つ。背景は無地か、髪と違う色。
4. 非対称が欲しくないときは \`uneven twintails\` をポジティブから外す。

左右の長さをあえて変えるときだけ \`uneven twintails\` を使い、\`from front\` は残します。横からの非対称は、奥の髪が消えた結果と区別がつきません。`,
      },
      {
        title: 'ChatGPT・Gemini で書く場合',
        content: `自然文では、本数、結ぶ高さ、長さ、年齢、服をこの順で書きます。ツインテールという日本語だけだと、子ども向けの絵に寄ることがあります。成人と服を同じ文に入れてください。

**日本語**

\`\`\`
成人の女性。黒い長い髪を、耳より下で左右二つに結び、赤いリボンを付けています。
白いブラウス。カフェの席、正面から、上半身。大人の顔です。
\`\`\`

**英語**

\`\`\`
An adult woman with long black hair tied into two low twintails and a red ribbon.
She wears a white blouse and sits at a cafe table, seen from the front, upper body.
She is an adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, ponytail
\`\`\`

Midjourney でも同じ文が使えます。Stable Diffusion や NovelAI では \`twintails\` のタグ例に戻してください。`,
      },
    ],
    faq: [
      {
        q: 'ポニーテールになってしまいます',
        a: '`twintails` を髪色の直後に置き、ネガティブに `ponytail, single hair bun` を入れてください。結びの位置を変える前に、タグが一つにまとまっていないかを確認します。',
      },
      {
        q: '左右の長さがそろいません',
        a: '`from front` にして、`uneven twintails` を外してください。横顔だと奥の一本が短く見えます。長さのタグは `long twintails` か `short twintails` の一方だけにします。',
      },
      {
        q: '幼く見えます',
        a: 'ツインテールは幼く見えやすいので、成人の指定と服装で年齢感を固定します。`adult woman` とブラウスやジャケットを書き、ネガティブに年齢の語を入れてください。学生服は足しません。',
      },
      {
        q: '英語では何と書きますか？',
        a: '基本は `twintails` です。低い位置は `low twintails`、短いのは `short twintails`、長いのは `long twintails`。`twin tails` と分けても近い結果になることがあります。',
      },
      {
        q: 'ツーサイドアップとの違いは何ですか？',
        a: '`twintails` は左右を結んで二本の束にします。`two side up` は上だけを結び、残りの髪は下ろすハーフです。両方を同じ強さにすると、結び目が二重になります。',
      },
      {
        q: '三つ編みツインテールにしたいです',
        a: '`twin braids` を髪色の直後に置いてください。`twintails` と同時に強くすると、編んだ束と結んだ束が両方出ます。飾るなら `hair bobbles` を一つ足します。',
      },
    ],
  },

  'plump-body-prompt-guide': {
    sections: [
      {
        title: 'ぽっちゃりプロンプトの基本',
        content: `「ぽっちゃり プロンプト」は、体型を書かないと細身に戻ります。多くのモデルは細い体を初期値にしているので、\`plump\` を人数の直後に置き、服と顔でもう一度シルエットを足します。

強さは中くらいから始めます。重みを付けるなら \`(plump:1.1)\` から \`(plump:1.3)\` までです。これは目安であり、出る割合の話ではありません。1.4 を超えると、体の線が崩れやすくなります。

このページは服を着た大人の、ファッションと日常の書き方です。体の部位を強調する語、水着、下着、肌の露出は入れません。顔、全体のシルエット、服のゆとりで表します。

他の体型（細身、筋肉、小柄）は [体型プロンプト](/guides/body-type-prompt-guide)、作例のタグは [ぽっちゃり](/tag/ぽっちゃり)、一覧は [体型プロンプト集](/prompts/body-type) です。`,
      },
      {
        title: '強さ別の英語タグ',
        content: `強い語を重ねると、服の形より体の変形が先に出ます。段階は一つにしてください。

| 日本語 | 英語 | 強さの目安 | 注記 |
|---|---|---|---|
| ふっくら | \`plump\` | 最初の一手 | このページの基本タグ |
| ぽっちゃり | \`chubby\` | やや強い | Danbooru では \`plump\` へのエイリアスになっていることがあります。公式タグとしては断定せず、SDXL や Midjourney では普通の英語として通ります |
| プラスサイズ | \`plus-size\` | 服のサイズ感 | 自然な英語です。公式タグとしては断定しません |
| 大柄 | \`large build\` / \`heavyset\` | 骨格も含む | 自然な英語。\`heavyset\` は男性の例で使います |
| 丸顔 | \`round face\` | 顔だけ | 体型タグと独立して足せる |

\`fat\` は強い語で、画質が落ちることがあります。初期値では使わないでください。\`soft body\` も、柔らかい体、という自然な英語としては書けますが、ここでは公式タグとはせず、作例には入れません。

「デブ プロンプト」でも同じ意図が検索されることがあります。このページの見出しと作例ではその語も \`fat\` も使いません。ふくよか、ぽっちゃり、という言い方で書いてください。`,
      },
      {
        title: '顔と服のシルエットで表す',
        content: `体型タグだけだと、モデルが部位の強調に寄ることがあります。顔と服のゆとりを先に書くと、着衣のシルエットとして残りやすいです。

- 顔: \`round face\`。頬を足すなら soft cheeks という自然な英語を一つ
- 上半身の服: \`oversized knit\`、\`long cardigan\`
- ボトム: \`wide-leg pants\`、\`long skirt\`
- ワンピース: \`a-line dress\`

服はゆったり、または A ラインのように、布の外形で見せます。体に張り付く服、肌が見える服は書きません。色は服に一つで足ります。

\`\`\`
1 adult woman, plump, round face, oversized knit, long skirt,
cafe, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\``,
      },
      {
        title: '女性のぽっちゃり作例',
        content: `三人とも \`1 adult woman\`、着衣、日常かファッションです。重みは 1.2 を上限の目安にして、まずは付けずに試してください。

**カフェ**

\`\`\`
1 adult woman, (plump:1.2), round face, oversized knit, long skirt,
sitting at a cafe table, coffee cup, soft daylight, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\`

**秋の街**

\`\`\`
1 adult woman, plump, round face, long cardigan, wide-leg pants,
autumn street, walking, full body, from side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\`

**オフィス**

\`\`\`
1 adult woman, plump, round face, a-line dress,
office, standing, full body, soft indoor light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\``,
      },
      {
        title: '男性のぽっちゃり・ふくよか作例',
        content: `「太った 男性 プロンプト」でも、書き方は同じです。\`1 adult man\` の直後に \`plump\` を置き、\`heavyset\` は自然な英語の補足として一つ足します。表情は \`kind smile\` のように、顔のタグを別にすると、体型タグが顔まで変形しにくくなります。

**ラーメン店**

\`\`\`
1 adult man, plump, heavyset, kind smile, round face,
casual shirt, ramen shop, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\`

**シェフ**

\`\`\`
1 adult man, plump, heavyset, kind smile,
chef coat, apron, kitchen, standing, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\`

**オフィス**

\`\`\`
1 adult man, plump, round face, kind smile,
suit jacket, dress shirt, office, standing, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\``,
      },
      {
        title: 'アニメ調とリアル調の違い',
        content: `アニメ寄りのチェックポイントは、同じ \`plump\` でも細身に戻りやすいです。体型タグを人数の直後、髪や服より前に置き、\`full body\` で腰から下のシルエットも入れてください。

リアル寄りのチェックポイントでは、低い重みで足ります。\`(plump:1.1)\` から試し、服のタグ（\`oversized knit\` や \`long cardigan\`）を先に読んでから、まだ細いときだけ 1.2 に上げます。

チェックポイントの固有名はこのページでは挙げません。系統（アニメ寄りか、実写寄りか）だけを見て、上の順を変えてください。

**アニメ寄り（タグを前に、全身）**

\`\`\`
1 adult woman, plump, round face, oversized knit, long skirt,
full body, cafe, soft daylight
\`\`\`

**リアル寄り（重みは低め）**

\`\`\`
1 adult woman, (plump:1.1), round face, long cardigan, wide-leg pants,
full body, city street
\`\`\`

ネガティブ（両方）:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\``,
      },
      {
        title: '細く戻る・体が崩れるときの直し方',
        content: `細いときは、語を増やす前に順番と対立タグを見ます。

1. \`plump\` を人数の直後に戻す。
2. ポジティブから \`slim\`、\`slender\`、\`skinny\`、\`thin\` を消す。
3. ネガティブに、その対立語を入れる。
4. 服のゆとり（\`oversized knit\`、\`a-line dress\`）を一つ残し、体の部位の語は足さない。
5. \`full body\` で、コートの裾まで入れる。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\`

太すぎる、線が崩れる、というときは逆です。重みを 1.1 まで下げ、\`chubby\` や \`plus-size\` や \`heavyset\` を外して \`plump\` だけにします。\`round face\` は残してかまいません。顔だけ丸く、体は大きくしたくないときは、体型タグを外して \`round face\` と服だけにしてください。

手足が溶けるときは、体型の重みを下げ、[ネガティブプロンプト](/guides/negative-prompt-guide) の手と腕の語を併用します。体型タグを 1.4 以上にしてから手を直そうとすると、両方崩れます。`,
      },
      {
        title: 'ChatGPT・Gemini で書く場合',
        content: `自然文では、体型をからかう言い方にしないでください。「ふっくらした体型の成人女性」「丸い顔の、プラスサイズの成人女性」のように、年齢と服と場所を同じ文に入れます。

**日本語**

\`\`\`
ふっくらした体型の成人女性。丸い顔、大きめのニット、ロングスカート。
カフェの席に座り、やわらかい昼の光。全身。細身にはしない。
\`\`\`

**英語**

\`\`\`
A plus-size adult woman with a round face, wearing an oversized knit and a long skirt,
sitting at a cafe table in soft daylight. Full body. She is an adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny
\`\`\`

男性なら、「ふっくらした体型の成人男性。やさしい笑顔。ラーメン店で、カジュアルなシャツ。全身。」のように、職業か場所を一つ足します。\`fat\` という語は、この文にも入れません。`,
      },
      {
        title: '関連する体型ガイド',
        content: `ぽっちゃり以外の体型は、タグを混ぜずにページを分けた方が崩れません。

- 細身、筋肉、小柄、高身長をまとめて見るなら [体型プロンプト](/guides/body-type-prompt-guide)。
- 筋肉の段階は [筋肉質プロンプト](/guides/muscular-prompt-guide)。
- 大人の低身長・小柄は [低身長・小柄プロンプト](/guides/short-height-petite-prompt)。
- 二人の体の大きさの差は [体格差プロンプト](/guides/body-size-difference-prompt-guide)。
- 着衣の街角の作例は [プラスサイズのパリストリート](/prompt/plus-size-paris-street-professional) です。コートを着た歩行です。

同じプロンプトに \`plump\` と \`muscular\` を入れると、どちらも中途半端になります。一つに決めてから、服を合わせてください。`,
      },
    ],
    faq: [
      {
        q: '指定しても細くなります',
        a: '`plump` を人数の直後に置き、ポジティブから `slim, slender, skinny` を消してください。ネガティブに `slim, skinny` を入れ、服は `oversized knit` や `a-line dress` のようにゆとりのある形を一つ残します。アニメ寄りのモデルでは `full body` も足してください。',
      },
      {
        q: 'fat と plump の違いは何ですか？',
        a: '`plump` がこのページの基本です。`fat` はより強い語で、画質が落ちることがあるので、初期値では使いません。まだ細いときは重みを 1.2 まで試してから、語そのものを変えてください。',
      },
      {
        q: '顔だけ丸くしたいです',
        a: '体型タグを外し、`round face` と服だけを書いてください。`plump` を残すと、顔だけでなく体のシルエットも変わります。',
      },
      {
        q: '男性をふくよかにしたいです',
        a: '`1 adult man, plump, heavyset, kind smile` を先頭に置きます。`heavyset` は自然な英語の補足です。場所はラーメン店、厨房、オフィスのように一つに決め、ネガティブに `slim, skinny` を入れてください。',
      },
      {
        q: '太りすぎてしまいます。弱くするには？',
        a: '重みを `(plump:1.1)` まで下げ、`chubby` や `plus-size` や `heavyset` を外して `plump` だけにします。`round face` と、ゆとりのある服は残してかまいません。',
      },
    ],
  },
}
