/**
 * Ninth SEO batch (2026-11-02): gaze direction, chibi / head-to-body ratio,
 * skin texture, figure-ization, and an illustration-prompt hub.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

const NEGATIVE_SKIN = 'plastic skin, waxy skin, airbrushed, overly smooth skin, doll-like, cgi, 3d render, oversaturated, oily skin'

export const SEO_BATCH_9_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'gaze-direction-prompt-guide': {
    sections: [
      {
        title: '目線は目線タグ・顔の向き・構図で決まる',
        content: `「目線 プロンプト」「視線 プロンプト」「カメラ目線 プロンプト」で最初に分けるのは、三つの層です。目がどこを見ているか、顔がどちらを向いているか、カメラがどこにあるか。三つを一つの語で済ませると、目だけがカメラを向いて首がねじれるか、顔は正面なのに目がどこも見ていない絵になります。

目線の語は、顔の向きが決まってから足します。人数は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はブラウス、カーディガン、コート、スーツのように閉じた日常着を一つ。このページは成人の肖像だけです。目の形・色・ハイライトは [目・瞳のプロンプト一覧](/guides/eye-prompt-guide)、ショットの大きさは [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) に渡します。レンズや、カメラを引く距離、動画のパンやドリーは [カメラのプロンプト](/guides/camera-lens-prompt-guide) です。カメラ目線は、このページのままです。

比較するときは、髪と服と背景を固定して、目線の語だけを差し替えます。表情まで同時に動かすと、目が合ったのか口が動いたのかが残りません。モデルによって効きが弱いことがあります。そのときは目線の語を人数の近くへ戻し、背景の名詞を一つ減らしてください。

組み合わせは、プロンプトを書く前に四つだけメモします。顔は正面か斜めか後ろか。目はカメラか、窓か、相手か。カメラは目の高さか、上か、下か。表情は笑顔か、真剣か、無いか。顔が正面で目がカメラなら \`facing viewer, looking at viewer\` で足ります。顔が正面で目が窓なら \`facing viewer, looking away\` です。顔が斜めで目がカメラなら、three-quarter view を自然な英語で書き、\`looking at viewer\` を一つ足します。顔が後ろで目がカメラなら \`from behind, looking back\` です。メモにない層のタグは正向へ足しません。足したまま重みだけを上げると、首が平均の角度に戻って、どの層を直したのかが消えます。服の色を同じ日に変えないでください。目線が安定した枚を別名で保存し、次の日はそのファイルから一語だけ動かします。

公開作例は [落ち着いた視線のポートレート](/prompt/neutral-v-neck-casual-gaze) と [明るい髪の肖像](/prompt/blonde-wavy-hair-portrait-gaze) です。タグの並びの入口は [カメラ](/tag/カメラ) です。

**Stable Diffusion / NovelAI の型**

\`\`\`
1 adult woman, adult, white blouse, cardigan,
upper body, facing viewer, looking at viewer, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

**ChatGPT / Gemini / Midjourney の自然文**

\`\`\`
1 adult woman, adult, wearing a white blouse and a cardigan.
Upper body portrait, face turned toward the camera, eyes looking straight into the lens.
Soft daylight, plain background. Keep the clothing on.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cross-eyed, asymmetrical eyes
\`\`\`

自然文で通った目線は、タグに戻すときに \`looking at viewer\` か \`looking away\` のどちらだったかを残します。文のままイラスト向けのモデルへ貼ると、目線だけが正面に戻ることがあります。Midjourney では重みの括弧を外し、縦の肖像なら文の末尾で縦横を指定します。`,
      },
      {
        title: '目線タグ一覧',
        content: `下の語は、目の向きとしてよく使われる書き方です。顔の向き（\`facing viewer\` や \`profile\`）や、カメラの高さ（\`from above\` や \`from below\`）とは別の列に置いてください。同時に強くしてよいのは、矛盾しない組み合わせだけです。

\`half-closed eyes\` は、考えごとや眠そうな目として使います。誘う表情にはしません。\`wink\` は片目を閉じた自然なウィンクです。\`closed eyes\` と \`eyes closed\` は、目を閉じた安静な表情です。

| タグ | 日本語 | 使いどころ |
|---|---|---|
| \`looking at viewer\` | カメラを見る | カメラ目線の基本。正面か斜めと一緒に |
| \`eye contact\` | 目が合う | カメラ、または二人のあいだ。向きとセットで |
| \`facing viewer\` | 顔がカメラを向く | 目線ではなく顔の向き |
| \`looking away\` | 目をそらす | カメラ目線を外すときの正向 |
| \`looking to the side\` | 横を見る | 体は正面のまま視線だけ横 |
| \`looking up\` | 上を見る | カメラの高さとは別 |
| \`looking down\` | 下を見る | 見下ろす目。カメラを上げることではない |
| \`looking back\` | 振り返って見る | 後ろ姿や横からの振り返り |
| \`looking afar\` | 遠くを見る | 窓や空を一つだけ添える |
| \`sideways glance\` | 横目 | 顔はほぼ正面、目だけ横 |
| \`upturned eyes\` | 上目遣い | 顔は正面に近く、目だけ上 |
| \`closed eyes\` | 目を閉じる | 安静。カメラ目線とは同時に強くしない |
| \`averting eyes\` | 目を伏せる | そらすより下向きに近い |
| \`head tilt\` | 首を傾ける | 目線の補助。強くしすぎない |

\`from side\` と \`profile\` は顔の向きです。ここに目線の \`looking at viewer\` を同じ強さで足すと、見える目が一つなのにカメラを見ようとして目が崩れます。斜めの顔は three-quarter view と自然な英語で書いてください。公式タグとしては断定しません。

表の語を二つ選ぶときも、同じ方向なら重ねてよく、逆の方向なら片方をネガティブへ移します。\`looking at viewer\` と \`eye contact\` はどちらもカメラ側なので、正面の肖像では並べてよい組み合わせです。\`looking away\` と \`looking at viewer\` は逆なので、正向に両方を残しません。\`closed eyes\` は目を閉じる指定なので、カメラを見る語とは同時に強くしません。\`averting eyes\` は伏せる方向、\`sideways glance\` は横へずらす方向です。両方を同じ強さにすると、黒目が中間で止まります。\`head tilt\` は首の補助で、目の方向そのものではありません。傾きを足しても目がカメラを見たままなら、目線の語は別に残してください。効いた組み合わせは、表の行の名前でメモします。英語を増やすより、行を一つに戻した方が次の枚は再現しやすくなります。`,
      },
      {
        title: 'カメラ目線にする',
        content: `カメラ目線は、目と顔とカメラを同じ側に揃えます。正向は \`looking at viewer, facing viewer, eye contact\` です。上半身か胸から上にして、顔が画面の十分な面積を占めるようにします。全身のまま目線だけを指定すると、目が小さくてタグが負けます。

Stable Diffusion や NovelAI のように括弧の重みが使える画面では、\`(looking at viewer:1.2)\` を一つだけ試します。1.4 以上にすると、黒目が寄りやすくなります。重みを上げる前に、\`facing viewer\` がプロンプトに残っているかを見てください。顔が横を向いたまま目の重みだけを上げると、目が顔の側面へずれます。

正面を足すときは front view と自然な英語でも書けます。公式タグとしては断定しません。\`facing viewer\` が既にあるなら、front view は足さなくてよいことが多いです。

横顔なのに目線だけをカメラへ向ける指定、つまり \`from side, looking at viewer\` は崩れやすいです。横から見える目は一つで、カメラを見るには顔を戻す必要があります。斜め前まで顔を戻すなら、three-quarter view を自然な英語で置き、\`from side\` と \`profile\` は外します。

**カメラ目線の肖像**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, facing viewer, (looking at viewer:1.2), eye contact,
soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes, looking away
\`\`\`

重みの括弧は、Stable Diffusion と NovelAI 系の画面用です。ChatGPT、Gemini、Midjourney では括弧を外し、文で「レンズをまっすぐ見る」と書きます。`,
      },
      {
        title: 'カメラ目線にしない・外す',
        content: `カメラ目線を外すときは、見てほしい先を正向に書き、カメラを見る語をネガティブへ移します。正向は \`looking away\` か \`looking to the side\` か \`looking afar\` のどれか一つです。ネガティブには \`looking at viewer, eye contact\` を入れます。正向とネガティブに同じ語を置くと、目は平均の正面に戻ります。

そらす先の名詞は一つです。窓か、空か、手元の本か。三つ書くと背景が勝って、目が点になります。\`looking afar\` は遠くを見る目です。場所の名詞を足すなら \`window\` か \`sky\` のどちらかにしてください。

自然な目線、いわゆる何気ない写真は candid shot と自然な英語です。公式タグとしては断定しません。candid shot は「カメラを意識していない」という雰囲気の語で、目線の方向そのものではありません。方向は \`looking away\` か \`looking to the side\` で残します。モデルによって効きが弱いことがあります。効かないときは candid shot を外し、目線の語だけにしてください。

**窓の外を見る**

\`\`\`
1 adult woman, adult, black hair, coat,
upper body, facing viewer, looking away, window, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
looking at viewer, eye contact, cross-eyed
\`\`\`

目がまだカメラを見るときは、\`looking away\` を人数の近くへ移し、\`facing viewer\` を弱めるか外します。顔まで横を向けるなら \`looking to the side\` と \`from side\` をセットにし、\`looking at viewer\` は正向から消します。振り返りでカメラを見たい場合は、この節ではなく \`looking back\` を使ってください。`,
      },
      {
        title: '上目遣い・見下ろす・横目',
        content: `上目遣い、見下ろす目、横目は、表情のニュアンスです。このページでは成人の肖像として書きます。カメラの高さは、目の向きとは別の層です。高さの詳しい調整は [見下ろす構図・俯瞰プロンプト](/guides/high-angle-prompt-guide) と [下からのアングルプロンプト](/guides/low-angle-prompt-guide) です。

上を見る目は \`looking up\`、上目遣いは \`upturned eyes\` です。カメラが上にある構図と一緒にするなら \`from above\` を高さの位置に置き、目は \`looking up\` にします。両方を 1.3 以上にすると、あごが伸びます。顔は正面に近く保ち、\`profile\` は外してください。

見下ろす目は \`looking down\` です。カメラを下に置いて、相手から見上げられる絵にするなら \`from below\` と \`looking down\` を役割で分けます。\`from below\` はカメラ、\`looking down\` は目です。下からのカメラだけを強くすると、目は正面のままあごが強調されます。

横目は \`sideways glance\` です。顔は \`facing viewer\` のまま、目だけを横へずらします。\`from side\` と同時に強くすると、横顔と横目が混ざって目の位置がずれます。首の傾きを足すなら \`head tilt\` を一つ、弱くです。

**上目遣い（カメラは上）**

\`\`\`
1 adult woman, adult, black hair, cardigan,
upper body, from above, facing viewer, looking up, upturned eyes, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

**見下ろす目（カメラは下）**

\`\`\`
1 adult man, adult, short hair, suit, necktie,
upper body, from below, facing viewer, looking down, serious
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

どちらも、服を着た胸から上の肖像です。横になってカメラを見る構図は書きません。`,
      },
      {
        title: '2人の目線',
        content: `二人の目線は、カメラを見るのか、相手を見るのかを先に決めます。人数は \`2 adults\` から書きます。二人の距離やポーズの全般は [カップルポーズ・二人構図](/guides/two-person-composition-prompt-guide) です。このページでは目線だけを足します。

相手を見る正向は \`looking at another\` です。見つめ合うなら、二人のあいだの \`eye contact\` を一つ足します。\`looking at viewer\` を同じ強さで残すと、両方の顔がカメラへ戻ります。見つめ合う枚では、カメラ目線の語を外してください。

片方だけをカメラ目線にするときは、どちらがカメラを見るかを文で分けます。タグだけでは左右が入れ替わりやすいので、左の人は \`looking at viewer\`、右の人は \`looking at another\`、のように位置を自然な英語で添えます。公式タグとしては、位置の文を断定しません。モデルによって効きが弱いことがあります。左右が逆のときは、逆になった人だけを描き直す方が、プロンプトの重みを両方上げるより顔は残ります。

**見つめ合う**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
white blouse, suit, standing, upper body,
looking at another, eye contact, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
looking at viewer, cross-eyed, extra people
\`\`\`

**片方だけカメラ目線**

\`\`\`
2 adults, 1 adult woman on the left looking at viewer,
1 adult man on the right looking at another,
adult, coat, suit, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, extra people
\`\`\`

三人以上は、このページでは書きません。人数が増えると、目線の指定が平均の正面に戻ります。

二人の枚で両方の目がカメラを向いたら、\`looking at viewer\` が正向に残っていないかを先に見ます。残っていれば消し、\`looking at another\` を人数の直後へ移します。左右が入れ替わるモデルでは、位置の文を強くするより、カメラを見る人だけを別の枚で描き、相手を見る人の顔はあとから合わせた方が安定します。距離を詰める語や、手の位置を同じ実験で足さないでください。手を足すときは二人構図のガイドへ戻り、目線の行は固定したままにします。背景の看板や窓の人物が三人目として解釈されることもあるので、二人の確認中は \`simple background\` に戻します。`,
      },
      {
        title: '目線と表情のテンプレ',
        content: `ここからは、表情を一つだけ足した全文です。表情の単語そのものは [表情プロンプト](/guides/stable-diffusion-expression-prompt)、男性の顔立ちは [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。変えてよいのは、髪か服か背景を一つずつです。目線と表情を同時に二種類ずつ足さないでください。

**微笑みのカメラ目線**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, facing viewer, looking at viewer, smile, closed mouth, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

**遠くを見る**

\`\`\`
1 adult woman, adult, brown hair, coat,
upper body, looking afar, window, soft daylight, calm expression
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
looking at viewer, eye contact, cross-eyed
\`\`\`

**振り返り**

\`\`\`
1 adult woman, adult, black hair, long coat,
upper body, from behind, looking back, city street, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, extra faces
\`\`\`

**考えごと**

\`\`\`
1 adult woman, adult, black hair, cardigan,
upper body, looking down, half-closed eyes, head tilt, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

**鋭い目つき**

\`\`\`
1 adult woman, adult, black hair, coat,
upper body, facing viewer, looking at viewer, tsurime, serious
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

sharp eyes は自然な英語です。公式タグとしては断定しません。\`tsurime\` と \`serious\` で足りるモデルでは、sharp eyes は足しません。

**上目遣いの笑顔**

\`\`\`
1 adult woman, adult, black hair, cardigan,
upper body, facing viewer, upturned eyes, looking up, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

**写真風のポートレート**

\`\`\`
1 adult woman, adult, black hair, white blouse,
portrait, facing viewer, looking at viewer, soft daylight, photorealistic
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes, cgi
\`\`\`

**男性キャラ**

\`\`\`
1 adult man, adult, short hair, suit, necktie,
upper body, facing viewer, looking at viewer, closed mouth, serious
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cross-eyed, asymmetrical eyes
\`\`\`

ウィンクを足すときは \`wink\` を一つ、\`smile\` と一緒にします。\`closed eyes\` と \`looking at viewer\` は同時に強くしません。目を閉じた笑顔は、カメラ目線の語を外して \`closed eyes, smile\` にしてください。`,
      },
      {
        title: 'うまくいかないとき',
        content: `目線が合わないときは、順番に一つずつ戻します。まず \`facing viewer\` が正向にあるか。次に \`looking at viewer\` を人数の近くへ移す。それでも正面を見ないモデルでは、Stable Diffusion や NovelAI に限って \`(looking at viewer:1.2)\` を一つだけ足します。顔のパーツだけを直すときは、汎用の部分描き直し（インペイントや、顔用の補助）で目の周辺だけを指定します。ツール名は環境によって違うので、ここでは手順の名前だけにします。画面全体を再生成すると、髪と服まで動きます。

寄り目、または左右で黒目の位置が違うときは、ネガティブの \`cross-eyed\` を残し、目の形の語を一つに減らします。形と色の直し方は [目・瞳のプロンプト一覧](/guides/eye-prompt-guide) です。目線の重みを 1.4 以上にしたまま色を足すと、黒目が中央でくっつきやすくなります。

指示が無視されるのは、ChatGPT や Gemini でタグだけを貼ったときによく起きます。そのときはタグをやめ、文の前半で「成人が、カメラのレンズをまっすぐ見つめる」と書いてください。レンズ、という名詞があると、画面の外の観客ではなくカメラの位置を向きやすくなります。逆に外したいときは「レンズからは目をそらし、窓を見る」と、そらす先を一つ書きます。

目線を直すたびに髪の色まで変えないでください。目が安定した枚を別名で保存し、次の実験では目線の語だけを差し替えます。ネガティブを長くしても、正向の \`looking at viewer\` が残っていればカメラ目線は消えません。外す枚では、正向からその語を消すのが先です。

まだ合わないときは、画面のどこを見ているかを一枚ずつ言葉にします。黒目がカメラなら正向は合っています。黒目が額の外なら、\`facing viewer\` が足りないか、\`profile\` が残っています。黒目が中央でくっつくなら、重みを外して \`cross-eyed\` をネガティブに残します。左右で高さが違うなら、\`head tilt\` を一旦消し、顔を水平に戻してから目線だけを再生成します。部分的に描き直すときは、髪の輪郭をマスクの外に残し、目の周りだけを指定します。顔全体をマスクすると、目線は直っても髪型が別の人になります。ChatGPT や Gemini でタグを足しても無視されるときは、タグの行を削除して、レンズを見る文だけにしてください。文とタグを同じ入力に混ぜると、後の行が読まれないことがあります。直った文は、その場で \`looking at viewer\` か \`looking away\` に翻訳して、イラスト向けのファイルへ戻します。`,
      },
      {
        title: 'ChatGPT・Geminiの自然文',
        content: `ChatGPT と Gemini では、人数、成人であること、顔の向き、目の向き、見てほしい先、の順で一文にします。タグの列をそのまま貼っても、目線は読まれないことがあります。

**レンズを見る**

\`\`\`
1 adult woman, adult. She faces the camera.
Her eyes look straight into the camera lens. Calm closed-mouth smile.
White blouse, cardigan, upper body, soft daylight, plain background.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cross-eyed
\`\`\`

**窓を見る**

\`\`\`
1 adult man, adult, short hair, coat.
His face is toward the window, and his eyes look outside, away from the camera lens.
Upper body, daytime, quiet street.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, looking at the camera
\`\`\`

文で指定したあと、イラスト向けのモデルへ渡すときは \`looking at viewer\` か \`looking away\` に翻訳して保存します。翻訳を残さないと、次にタグへ戻したとき目線だけが正面になります。

Gemini に自分の写真を渡す回は、新規に描く回とプロンプトを分けてください。写真を渡すときは、顔を変えないことを先頭に書き、変えるのは目線の説明だけにします。このページの作例は、文章から描くときの型です。

自然文が長いときは、三文に割ります。一文目は成人と服装、二文目は顔の向きと目の向き、三文目は光と背景です。一文に窓と笑顔と振り返りと全身を全部入れると、目の向きだけが落ちます。割ったあとに結果が安定したら、落ちた文をもう一度だけ足します。Midjourney では、同じ三文を一続きにして、括弧の重みは付けません。縦の肖像なら、文の末尾で縦横だけを指定します。Stable Diffusion に戻す翻訳は、三文を三つのタグ群に対応させます。成人と服、\`facing viewer\` と目線、光と背景、です。翻訳後に自然文の単語をタグの後ろへ残すと、同じ指示が二回入って目が平均に戻ることがあります。残すのはタグの方だけにしてください。写真を渡した回で目線だけを変えたいときも、服装の文は「写真のまま」と固定し、目の文だけを差し替えます。

出力を並べるときは、目の向きだけを言葉で記録します。カメラ、窓、下、振り返り、のどれだったかをファイル名に残すと、次に同じ向きへ戻れます。記録せずに「良さそう」で保存すると、\`looking away\` と \`looking afar\` の差が分からなくなります。差を見る枚は、髪と服を固定した四枚で十分です。五枚目以降は、四枚のうち残したい向きのファイルをコピーして、表情を一つ足す段階です。表情を先に足した枚は、目線の比較には使いません。口が変わると、目が合っているように見えても、実際には目線の語が負けていることがあります。疑ったら、表情の語を外して、目線だけの枚に戻してください。戻した枚で黒目の位置が安定してから、同じ表情を一つだけ足し直します。足し直したときに目がまた外れるなら、その表情は目線と衝突しています。衝突した表情は別のファイルに残し、本番の目線ファイルからは外してください。本番のファイルは、顔の向き、目の向き、光、の三行だけが動く状態を保ちます。三行以外を触った日は、比較用の四枚を最初から取り直します。取り直さずに昨日の枚と混ぜると、服の差を目線の差と勘違いします。`,
      },
    ],
    faq: [
      {
        q: 'カメラ目線になりません',
        a: '`facing viewer` と `looking at viewer` を人数の近くに置き、上半身にして顔を大きくします。Stable Diffusion と NovelAI では `(looking at viewer:1.2)` を一つだけ試してください。横顔の `profile` が残っていると、目だけがカメラを向いて崩れます。',
      },
      {
        q: 'カメラ目線を外したいです',
        a: '正向を `looking away` か `looking to the side` か `looking afar` にし、ネガティブへ `looking at viewer, eye contact` を入れます。そらす先は窓か空かを一つにしてください。',
      },
      {
        q: '横顔で目が崩れます',
        a: '`from side` と `looking at viewer` を同じ強さにしないでください。斜め前の顔は three-quarter view と自然な英語で書き、`profile` は外します。',
      },
      {
        q: '二人ともカメラを見てしまいます',
        a: '人数は `2 adults`、正向は `looking at another` です。見つめ合うなら `eye contact` を足し、`looking at viewer` は外してください。距離やポーズは二人構図のガイドへ渡します。',
      },
      {
        q: 'ChatGPTで視線の指示が無視されます',
        a: 'タグの列をやめ、「成人がカメラのレンズをまっすぐ見つめる」と文で書いてください。外すときは「レンズからは目をそらし、窓を見る」と先を一つ指定します。',
      },
    ],
  },

  'chibi-deformed-prompt-guide': {
    sections: [
      {
        title: 'デフォルメは頭身のスタイルで、年齢は成人のまま',
        content: `「デフォルメ プロンプト」「ちびキャラ プロンプト」「頭身 プロンプト」で決めるのは、頭と体の比率です。頭身を下げても、年齢設定は成人のままにしてください。デフォルメは描き方であって、年齢を下げる指定ではありません。

人を描くときの先頭は \`1 adult woman, chibi\` か \`1 adult man, chibi\` です。\`adult\` を残します。頭を大きくしても、年齢の語はネガティブに残したままにします。動物やマスコットだけを描く枚は、人の人数を書きません。学生の場面、教室、制服は使いません。

基本の並びは、人数、デフォルメ、全身、単純な背景です。背景が細かいと、頭身より小物が優先されて、体が普通の比率に戻ります。

画風の媒体そのものは [画風プロンプト](/guides/art-style-prompt-guide)、アニメ塗りの全般は [アニメプロンプト](/guides/anime-prompt-guide) です。タグの入口は [ちび](/tag/ちび) です。

**タグの型**

\`\`\`
1 adult woman, adult, chibi, super deformed, full body,
simple background, standing, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**自然文の型**

\`\`\`
Draw 1 adult woman as an adult character in a chibi style.
Large head, short body, about 2 heads tall, full body, standing, simple smile.
Plain background. The age stays adult even though the proportions are stylized.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

ChatGPT や Gemini では、上の自然文のように「成人のまま、頭身だけを下げる」と結果で書いてください。頭身の数字だけを渡すと、年齢の方を動かされることがあります。

デフォルメの確認は、必ず全身で行います。胸から上だけだと、頭の大きさは分かっても、体が何頭身なのかは画面に残りません。立ち姿で頭のてっぺんから足まで入っている枚だけを、成功例として保存してください。服のひだが多いと、ひだの長さに体が引っ張られて普通の比率へ戻ります。確認が終わるまでは、服は色の分かる一枚にして、模様を足しません。背景の小物、地面の線、空の雲も同じです。情報が多い画面は、頭身より背景の学習に寄ります。白か、薄い単色にしてから、\`chibi\` が残るかを見てください。残った枚にだけ、次の日に小物を一つ足します。`,
      },
      {
        title: 'デフォルメの度合い',
        content: `度合いは一つにします。\`chibi\` と普通の頭身を同じ強さで書くと、中間の不安定な比率になります。強くしたい方を人数の直後に置いてください。

\`chibi\` は頭を大きく、体を短くする一語です。\`super deformed\` は、それよりさらに頭の割合が大きい指定として一緒に足せます。両方を 1.3 以上にすると、手足が棒になります。まずは \`chibi\` だけにして、足りないとき \`super deformed\` を足してください。

2頭身は \`2-head-tall proportions\`、3頭身は \`3-head-tall proportions\` と自然な英語です。4頭身から5頭身も、\`4-head-tall proportions\` のように自然な英語で書けます。公式タグとしては断定しません。モデルによって効きが弱いことがあります。数字が無視されるときは、\`chibi\` を前に戻し、頭身の文は一つだけ残します。

ゆるキャラに近づけるときは \`mascot character, simple shapes\` と自然な英語です。公式タグとしては断定しません。人の成人キャラと、動物のマスコットを同じプロンプトで混ぜないでください。混ぜると、顔がどちらでもなくなります。

| 度合い | 書き方 | 注記 |
|---|---|---|
| ちび | \`chibi\` | 最初の一手 |
| さらにデフォルメ | \`super deformed\` | \`chibi\` に足す。同時に強くしすぎない |
| 2頭身 | \`2-head-tall proportions\`（自然な英語） | モデルによって効きが弱いことがあります |
| 3頭身 | \`3-head-tall proportions\`（自然な英語） | 同上 |
| 4〜5頭身 | \`4-head-tall proportions\`（自然な英語） | 公式タグとしては断定しない |
| ゆるキャラ | \`mascot character, simple shapes\`（自然な英語） | 人の成人指定と混ぜない |
| 全身 | \`full body\` | 頭身の確認は全身で |
| 背景 | \`simple background\` / \`white background\` | 小物を増やさない |

立ち姿は \`standing\`、表情は \`smile\` が安定します。口を大きく開ける記号は避け、open-mouth smile と自然な英語にしてください。

数字の頭身が無視されるときは、文を長くするより、\`chibi\` の位置を確認します。頭身の文が服や背景より後ろにあると、比率は平均へ戻ります。\`2-head-tall proportions\` を人数の直後、\`chibi\` の隣へ移し、他の頭身の文は消してください。2と3と4を同時に書くと、モデルは中間の5前後に落とすことがあります。欲しい段は一つです。ゆるキャラの \`simple shapes\` は、指や服のひだを省略する指定でもあります。省略させたい枚と、服の部品を正確に描きたい枚は分けます。同じ文で部品を増やしながら形を単純化すると、エプロンや本が体に溶けます。効かなかった語は、表から外したことをメモし、次のモデルでもう一度だけ試します。モデルが変わると、同じ文でも頭身の残り方は違います。`,
      },
      {
        title: '頭身を上げる',
        content: `頭身を上げるのは、ちびの反対です。7頭身から8頭身の、いわゆるモデル体型に近づけるときは、\`chibi\` と \`super deformed\` を正向から消します。残っていると、脚を長くする語と打ち消し合います。

正向は \`adult proportions, 8 heads tall, small head, long legs\` と自然な英語です。公式タグとしては断定しません。\`tall\` を一つ足すと、頭身の文より身長の印象が先に出ることがあります。一人を高く見せる調整の詳細は [高身長プロンプト](/guides/tall-height-prompt-guide)、体型の単語そのものは [体型プロンプト](/guides/body-type-prompt-guide) です。このページでは、頭と体の比だけを扱います。

**8頭身**

\`\`\`
1 adult woman, adult, adult proportions, 8 heads tall, small head, long legs,
full body, standing, long coat, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
chibi, super deformed
\`\`\`

頭だけが小さくて脚が画面の外へ伸びるときは、\`full body\` を残したまま背景を \`simple background\` に戻します。センチの数字は、モデルが測る身長にはなりません。8という頭の数も、厳密な定規ではなく比率のヒントです。効かないモデルでは、\`long legs\` と \`small head\` を残し、頭身の文は一つにしてください。

ちびの枚と8頭身の枚は、別のプロンプトとして保存します。一つの文の中で \`chibi\` を消したつもりが残っていると、次の枚で頭が大きく戻ります。

7頭身に近づけたいときも、8頭身の文を少し弱めるだけにして、\`chibi\` は戻しません。7と8を両方書くと、頭の大きさが平均になります。\`small head\` を消すと、脚だけが伸びて頭は普通の大きさのままになることがあります。頭と脚はセットで残してください。全身が画面に入らないときは、背景を \`simple background\` に戻し、\`full body\` を前へ移します。寄りと全身を同時に強くすると、頭身を測る前に足が切れます。高身長のガイドにある \`tall\` は、この比率が安定してから一つ足す程度にします。先に \`tall\` を強くすると、頭身ではなくあごの位置だけが上がって見えることがあります。`,
      },
      {
        title: '顔と目のデフォルメ',
        content: `ちびの顔は、目を一つ、口を一つ、までです。目を大きくする語は big eyes と自然な英語です。公式タグとしては断定しません。顔のパーツを減らすときは simple face と自然な英語です。両方を同じ強さにすると、目だけが大きくて他が消えるか、のっぺりな顔に目が浮きます。

表情は \`smile\` が基本です。口を開けて笑う記号は、歯が崩れて口の中が黒くなりやすいので避けます。開けるなら open-mouth smile と自然な英語を一つにしてください。

目の色やハイライトをちびの確認と同時に足さないでください。色は顔の比率が安定してからです。色と形の一覧は [目・瞳のプロンプト一覧](/guides/eye-prompt-guide)、表情の単語は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。

**大きい目と単純な顔**

\`\`\`
1 adult woman, adult, chibi, full body, simple background,
big eyes, simple face, smile, black hair
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

big eyes は年齢の指定ではありません。\`adult\` とネガティブの年齢の語は、目を大きくしたあとも残します。目のガイドにあるリアルな瞳のディテールを、2頭身の顔に全部足すと、目だけが別の絵になります。ちびの枚では、目の語は一つまでです。

顔が細かい絵に戻るときは、simple face を \`chibi\` の隣へ移し、まつげやハイライトの語を外します。ハイライトは、頭身が安定したあとの別の枚で一つだけ足してください。口を \`smile\` から open-mouth smile に変えるときも、目の語は固定します。口と目を同じ日に動かすと、顔のどこがデフォルメを強くしたのかが残りません。眉を足すなら、眉の形は一つです。左右で違う眉を書くと、2頭身の顔では眉が目より先に崩れます。色は最後です。髪の色を変えても頭身は変わりませんが、顔の中の目の色を強くすると、目の大きさまでは変わります。色の実験は、simple face の枚をコピーしてから行ってください。`,
      },
      {
        title: 'ステッカー・アイコン・グッズ・マスコット',
        content: `用途が決まっていると、頭身は安定しやすくなります。ステッカーは \`sticker\` に、白いフチを white border と自然な英語で足します。公式タグとしては、フチの文を断定しません。公開作例は [ステッカーのポートレート](/prompt/sticker-die-cut-portrait) です。背景は \`white background\` にして、景色を書きません。

アイコンは、胸から上か、顔の周りだけにします。全身のステッカーと、顔のアイコンを一つの文に混ぜると、体が切れた中途半端な枠になります。用途ごとにプロンプトを分けてください。

グッズの台紙に載せるなら、アクリルスタンドは acrylic stand と自然な英語です。フィギュアやぬいぐるみとしての仕上げは [フィギュア化プロンプト](/guides/figure-ai-prompt-guide) にまとめています。このページでは、平面のデフォルメ絵までです。

動物とマスコットは、人を書きません。先頭に人数を置かず、\`mascot character\` と動物の名前を自然な英語で一つにします。

**ステッカー**

\`\`\`
1 adult woman, adult, chibi, sticker, white border,
full body, standing, smile, white background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
scenery, text
\`\`\`

**動物のマスコット**

\`\`\`
mascot character, cat, chibi, simple shapes,
sticker, white background, standing
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

人の顔を動物に混ぜたいときは、別の枚にしてください。同じ文に \`1 adult woman\` と cat を同じ強さで置くと、耳の位置が平均になります。

ステッカーとアイコンは、余白の扱いが違います。ステッカーは全身と白いフチ、アイコンは顔の周りだけ、と先に用途を文の先頭へ書きます。用途を書かずに \`sticker\` だけを足すと、枠が中途半端な四角になることがあります。フチの色は白を一つ。フチと背景を別の色にすると、境界が二重になります。グッズの台座まで描く枚は、平面のステッカーのプロンプトから分け、フィギュアのガイドのアクリルスタンドの文を使います。動物のマスコットは、人の服の語を残さないでください。残っていると、動物の胴にボタンが付きます。マスコットが決まったあとに色を一つ変える、までをこのページの範囲にします。

アイコンにするときは、肩より下を書かないと先に決めます。全身の \`full body\` が残ったまま「顔のアイコン」と自然文で足すと、体が小さく押し込まれて頭身の確認ができません。アイコン用の文からは \`full body\` を外し、\`portrait\` か胸から上を一つだけ残します。ステッカー用の文は逆に、\`full body\` を残して顔のアップを外します。二つの用途を一つのプロンプトのコメントに併記しないでください。モデルはコメントと本文を区別しないことがあります。白背景に影を足すときは、影の方向を一つにします。影が複数あると、ステッカーのフチが二重に見えます。`,
      },
      {
        title: 'ChatGPT・Geminiでミニキャラにする',
        content: `ChatGPT や Gemini でミニキャラにするときは、自分のオリジナルキャラの画像か、自分で文章にした設定だけを渡します。既存の作品のキャラクター、実在の人物、俳優、アイドルは使いません。

指示は、残すものと変えるものを分けます。残すのは服の色、髪の色、持っている小物。変えるのは頭身だけ、です。年齢は成人のまま、と文の前半に書きます。

**自作キャラを2頭身にする**

\`\`\`
ここにある自作の成人キャラ（adult）を、2頭身のミニキャラにしてください。
年齢設定は成人のままです。服の色、髪の色、持っている小物は維持します。
全身、白い背景、立ち姿。既存作品のキャラクターにはしないでください。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

英語で渡す場合:

\`\`\`
Turn this original adult character into a 2-head-tall mini character.
Keep the adult age. Keep the clothing colors, hair color, and the small prop.
Full body, standing, white background.
Do not base it on an existing series or a real person.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

写真の中に他人が写っている場合は、その写真を使いません。背景の看板や作品名も、指示文に写さないでください。名前を残すと、顔が知っているキャラクターへ寄ります。

渡す画像は、そのキャラの設定画として自分で描いたものか、自分で撮った資料に限ります。画面の中に他の作品のロゴや、タイトル文字が写っている場合は、隠してから渡してください。指示文にも作品名を書きません。残すリストは短くします。髪の色、服の色、小物が一つ、で十分です。リストが長いと、頭身よりリストの項目が優先されて、比率が戻りません。年齢の文は、リストより前に置きます。「成人のまま」が後ろにあると、頭を大きくする指示だけが読まれて、年齢の方まで動くことがあります。出力が希望と違うときは、頭身の数字を上げる前に、残すリストを一つ減らして同じ画像でもう一度出します。`,
      },
      {
        title: 'コピーできるテンプレ',
        content: `どの人も \`adult\` から始まります。動物の一枚だけ、人を書きません。服は着たままです。変えてよいのは色を一つずつです。

**ちびの魔法使い**

\`\`\`
1 adult woman, adult, chibi, robe, holding a book,
full body, standing, simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**ちびのメイド**

メイド服の部品は [メイド服プロンプト](/guides/maid-outfit-prompt-guide) です。丈は長いドレスにします。

\`\`\`
1 adult woman, adult, chibi, maid outfit, white apron, long dress,
full body, standing, simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**ちびの男性**

\`\`\`
1 adult man, adult, chibi, short hair, jacket,
full body, standing, simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**ちびの和装**

\`\`\`
1 adult woman, adult, chibi, kimono,
full body, standing, simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**ちびの二人**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult, chibi,
full body, standing side by side, simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\`

**動物のマスコット**

\`\`\`
mascot character, bird, chibi, simple shapes,
full body, white background, standing
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text
\`\`\`

**全身のステッカー**

\`\`\`
1 adult man, adult, chibi, sticker, white border,
full body, standing, smile, white background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, scenery
\`\`\`

**8頭身の立ち姿**

\`\`\`
1 adult woman, adult, adult proportions, 8 heads tall, small head, long legs,
coat, full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
chibi, super deformed
\`\`\``,
      },
      {
        title: '頭身が戻る・崩れるとき',
        content: `頭身が普通の比率に戻るときは、\`chibi\` を人数の直後へ移し、Stable Diffusion や NovelAI では \`(chibi:1.2)\` を一つだけ足します。\`full body\` と \`standing\` を残し、背景は \`simple background\` に戻してください。背景の街や室内が強いと、人の比率は学習の平均へ戻ります。

体が幼く見えるときは、年齢を下げる語を足してはいけません。正向の \`adult\` を先頭に戻し、ネガティブの年齢の語を残します。頭を大きくする語はデフォルメであって、年齢の置換ではありません。幼く見えるからといって、体の呼び方を変える語を足すと、意図と逆に年齢の方を動かします。

手足が溶けるときは、手の形を増やすのをやめて、\`simple background\` に戻します。指の崩れそのものは [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。ちびの手は、開いた指を精密に描かせるより、こぶしに近い単純な形の方が残りやすいです。手のポーズを二つ同時に指定しないでください。

**崩れ用のネガティブ例**

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, fused fingers, long legs, realistic proportions
\`\`\`

8頭身の枚では、このネガティブから \`long legs\` を外します。ちびの枚で脚が長く戻るときだけ、\`long legs\` をネガティブに入れてください。正向とネガティブに同じ語があると、比率は中間で止まります。

手を単純にしたあとも指が増えるときは、手に持たせる物を外します。本やカップは、指のあいだに別の形を要求するので、頭身の確認が終わるまでは持たせません。物を足すのは、立ち姿の頭身が三枚続けて揃ってからです。揃った枚のプロンプトは、語の順番を崩さずにコピーし、物の名詞だけを末尾へ足してください。ネガティブを毎回長くしていくと、正向の \`chibi\` まで打ち消されることがあります。ネガティブは、体の崩れと年齢の語を土台にして、その枚で起きている問題を一つだけ足す、で止めてください。問題が消えたら、足した語は次の枚では外します。

頭身が揃った枚は、その比率の名前でフォルダを分けます。2頭身、3頭身、8頭身、を一つのファイルに上書きしないでください。上書きすると、ネガティブに入れた \`chibi\` が、ちびの枚へ逆流します。逆流した枚は、頭が小さいのに \`chibi\` が正向にも残る、という矛盾になります。矛盾を見つけたら、正向とネガティブを音読して、同じ語が両方に無い状態へ戻します。戻したあとに色や小物を足します。小物を先に足してから矛盾を直すと、小物の形まで平均に戻って、どの修正が原因か残りません。動物のマスコットは、人のフォルダとは別にして、人の \`adult\` 行を貼り付けないでください。人の枚へ動物の行が混ざっていたら、その枚は捨てて、人数の行から書き直します。書き直すときは、年齢の文を頭身の文より前に置き、服は一色、背景は無地、手に持つ物は無し、から始めます。この四つの状態で頭身が揃ってから、色を一つ、物を一つ、の順で戻します。順を飛ばして物から戻すと、指の形が先に崩れて、頭身の判断ができなくなります。判断できない枚は成功例に数えません。`,
      },
    ],
    faq: [
      {
        q: '頭身を下げると幼く見えます',
        a: 'デフォルメは描き方です。年齢設定は成人のままにして、先頭の `adult` とネガティブの年齢の語を残してください。年齢を下げる語は足しません。',
      },
      {
        q: 'ちびを書いても普通の頭身に戻ります',
        a: '`chibi` を人数の直後に置き、`full body` と `simple background` を残します。Stable Diffusion と NovelAI では `(chibi:1.2)` を一つだけ試してください。',
      },
      {
        q: '2頭身や3頭身の数字が無視されます',
        a: '`2-head-tall proportions` は自然な英語です。モデルによって効きが弱いことがあります。`chibi` を前に戻し、頭身の文は一つだけにしてください。',
      },
      {
        q: '8頭身にしたいのに頭が大きくなります',
        a: '`chibi` と `super deformed` を正向から消し、ネガティブに移します。正向は `adult proportions, 8 heads tall, small head, long legs` と自然な英語です。',
      },
      {
        q: '自分のキャラをミニキャラにできますか',
        a: '自作の成人キャラに限ります。既存作品のキャラクターや実在の人物は使いません。服の色・髪の色・小物は維持し、変えるのは頭身だけ、と書いてください。',
      },
    ],
  },

  'skin-texture-prompt-guide': {
    sections: [
      {
        title: '肌の質感は顔のポートレートから直す',
        content: `「肌の質感 プロンプト」「肌 プロンプト」「リアルな肌 プロンプト」で最初に直すのは、のっぺりしたプラスチックのような肌です。このページは、服を着た成人の顔、または胸から上だけを扱います。体の広い範囲の肌、濡れた質感、光沢を足す書き方は使いません。

先頭は \`1 adult woman\` か \`1 adult man\` で、\`adult\` を残します。質感の語は、人数と \`portrait\` のあとに置きます。品質の語を先に何個も積むと、肌は平均の滑らかさに戻り、毛穴が消えます。

肌の色は、描きたい色の名前です。色のあいだに優劣はありません。色白が正解、という並べ方はしません。色の名前そのものの一覧は [色プロンプト](/guides/color-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。拡大したときに質が変わる手順は [Hires. fix の使い方](/guides/hires-fix-upscale-guide) です。

**ポートレートの型**

\`\`\`
1 adult woman, adult, portrait, white blouse,
realistic skin texture, natural skin texture, soft diffused light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

質感の語は自然な英語として書きます。公式の一語タグとしては断定しません。モデルによって効きが弱いことがあります。効かないときは、品質タグを二つまでに減らし、質感の語を人数の近くへ戻してください。

比較は、同じ顔の位置で行います。全身の立ち姿と、顔のアップを見比べても、質感の差なのか、顔の大きさの差なのかが分かりません。このページの確認は \`portrait\` か、胸から上に固定します。服は白か、薄い無地が一色です。柄の多い服は、柄のコントラストに肌の情報が負けます。背景も無地に戻してから、毛穴が見えるかを判断してください。見えるようになった枚だけを保存し、次に光を一つ変えます。光と質感と色を同じ生成で動かすと、直った理由が残りません。メモには、外した品質タグの名前と、足した質感の語を一行で残します。`,
      },
      {
        title: '質感タグ一覧',
        content: `一度に足すのは二つまでです。毛穴と、桃の産毛と、そばかすと、光沢を全部同じ強さにすると、顔が別々の質感の貼り合わせになります。まず \`natural skin texture\` を置き、足りない特徴を一つ足します。

\`dewy skin\` は顔のポートレートに限って使います。体には広げません。強くすると顔全体が光った面になるので、柔らかい光と一緒にし、ネガティブの \`oily skin\` は残します。

| 書き方 | 意味 | 強さと注意 |
|---|---|---|
| \`realistic skin texture\` | 実写に近い肌の粒 | 最初に足す候補。強くしすぎるとザラつく |
| \`natural skin texture\` | 加工の少ない肌 | のっぺりを戻す基本 |
| \`visible skin pores\` | 毛穴が見える | 顔のアップ向け。全身ではノイズになりやすい |
| \`subtle skin imperfections\` | 小さなゆらぎ | 傷の描写にはしない |
| \`freckles\` | そばかす | 位置を顔に限る |
| \`mole\` | ほくろ | 自然な英語。数は一つ |
| \`fine peach fuzz\` | 細い産毛 | 自然な英語。顔の輪郭の光と一緒に |
| \`matte skin\` | つやを抑えた肌 | スタジオの肖像向け |
| \`dewy skin\` | うるおいのある顔 | 顔のみ。強くしない |
| \`subsurface scattering\` | 皮膚の下で光がにじむ | 自然な英語。逆光や窓光と一緒に |

そばかすとほくろは、欠点の採点ではなく、その人の顔の描写です。消す指示と、足す指示を同じプロンプトに置かないでください。`,
      },
      {
        title: 'のっぺり肌とCG感を直す',
        content: `プラスチックのような肌は、質感の語が足りないときと、品質の語が強すぎるときの両方で起きます。直し方は、足すより先に、強すぎる側を外すことです。

\`masterpiece\` や \`best quality\` を何個も重ね、さらに重みを 1.4 以上にしていると、肌は平均のツルツルに寄ります。品質タグの置き方は [品質タグ一覧](/guides/quality-tags-prompt-guide) です。ポジティブの品質は二つまでに減らし、そのあとで \`natural skin texture\` を人数の近くへ置きます。

CFG を高くしている画面では、数値を一段下げると、エッジの硬いCG感が和らぐことがあります。適正値はモデルで違うので、このページでは数字を指定しません。一段下げて肌の粒が戻るかを見て、戻らなければ質感の語の方を見直してください。

ネガティブには、ツルツルと人形感をまとめて入れます。\`plastic skin, waxy skin, airbrushed, overly smooth skin, doll-like\` です。\`oily skin\` も、テカリを止めるネガティブとして入れてよい語です。正向には置きません。ネガティブの全般は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

同じ語を正向とネガティブの両方に置くと、肌は中間で止まります。\`natural skin texture\` を正向に残したまま、ネガティブにも肌の語を重複させないでください。

直った枚は、品質タグを戻す実験とは分けて保存します。質感が戻ったあとに品質タグを全部戻すと、またのっぺりへ戻ることがあります。戻すなら一つだけです。

のっぺりが残るときの順番は、次で固定します。まず正向の品質タグを数えます。三つ以上あるなら、後ろの二つを消します。次に、肌を滑らかにする意味の語が正向に残っていないかを見ます。残っていれば消して、ネガティブ側の \`overly smooth skin\` と \`plastic skin\` を確認します。そのあとで \`natural skin texture\` を \`portrait\` の直後へ置きます。まだ平面なら、\`visible skin pores\` を顔のアップの枚にだけ足します。全身の枚に毛穴を足すと、服や背景までざらつきます。CFG を動かすのは、この順で語を整理したあとです。語が矛盾したまま数値だけを下げても、肌の原因は分離できません。一段下げて変化がなければ、数値は元に戻し、語の方を続けて見直します。`,
      },
      {
        title: '肌の色を指定する',
        content: `肌の色は、描きたい肖像の色として中立に書きます。並び順は好みの順位ではありません。どの色も、成人の顔の描写として同じ欄に置きます。

| 書き方 | 意味 |
|---|---|
| \`fair skin\` | 明るい肌の色 |
| \`pale skin\` | さらに明るい肌の色 |
| \`tan skin\` | 日焼けしたトーンの肌の色 |
| \`dark skin\` | 濃い肌の色 |

\`tanned\` は \`tan skin\` と同じ欄の自然な英語です。境界の線や、服の跡のような模様は書きません。色を二つ同じ強さで並べると、顔の左右で色が割れます。一つにしてください。

「肌の色がおかしい」「顔と首で色が違う」は、色の名前より光が原因のことが多いです。窓の光が顔だけに当たり、首が別の色温度になっていると、同じ \`fair skin\` でも境目が出ます。光源を一つに減らし、white balance を自然な英語で一つ足します。公式タグとしては断定しません。モデルによって効きが弱いことがあります。効かないときは、背景の色を無地に戻してから、肌の色を見てください。

色の名前が服へ移るときは、肌の色を人数の近くに置き、服の色とのあいだを空けます。色の分離の書き方は [色プロンプト](/guides/color-prompt-guide) です。肌の色を直す実験では、服の色を同時に変えないでください。

色の指定は、その肖像で使いたい色を一つ書くだけです。明るい色を先に、濃い色をあとに、という並べ方はしません。どの行も同じ強さの候補です。\`fair skin\` を書いたから質感まで自動で良くなる、ということはありません。質感は \`natural skin texture\`、色は色の語、と列を分けてください。ほくろやそばかすを足すときも、色の優劣とは別です。顔にあるものを描写するなら \`mole\` か \`freckles\` を一つ、消したいならその語を正向から外します。両方を同時に書かないでください。顔と手で色が割れるときは、手を画面から出して胸から上に戻し、光源を一つにしてから色の語を見ます。手の色だけを別の名前にすると、境目はさらに目立ちます。`,
      },
      {
        title: '光が肌の見え方を変える',
        content: `同じ質感の語でも、光が硬いと肌は平面に見え、光が柔らかいと粒が残りやすくなります。光のカタログは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。このページでは、肌に影響する置き方だけを書きます。

柔らかい光は \`soft diffused light\` です。\`soft lighting\` でも近い結果になることが多いです。硬い光は hard light と自然な英語です。公式タグとしては断定しません。肖像の質感を見るときは、先に柔らかい光にしてください。硬い光は、影の形を見たい別の枚にします。

輪郭を縁取る光は \`rim lighting\` です。顔の正面が暗いと、質感の語は縁の光に負けます。\`rim lighting\` を残すなら、正面の補助光を弱く一つ足します。両方を同じ強さにすると、縁の光が消えます。

窓の光は window light と自然な英語です。顔と背景の窓を両方明るくしすぎると、肌は白く飛んで毛穴が消えます。窓は背景の明るさ、顔は \`soft diffused light\`、と役割を分けてください。

**窓の光の肖像**

\`\`\`
1 adult woman, adult, portrait, white blouse,
natural skin texture, window light, soft diffused light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

光を変える比較では、肌の色の語を固定します。色と光を同時に動かすと、どちらが顔の色を変えたのかが残りません。

柔らかい光で毛穴が消えるときは、光を硬くする前に、質感の語が正向に残っているかを見ます。光が柔らかいことと、肌を塗りつぶすことは別です。\`soft diffused light\` を残したまま \`natural skin texture\` を前へ移すと、粒が戻ることがあります。それでも平面なら、顔のアップに切り替えて \`visible skin pores\` を一つ足します。硬い光の枚は、影の境界を見るための別ファイルです。本番の肖像へ hard light を戻すと、鼻の横の影が顔の半分を割って、質感より影が主題になります。\`rim lighting\` で輪郭だけが明るく顔が黒いときは、縁の光を弱め、正面の柔らかい光を残します。縁を消すために質感の語まで消さないでください。`,
      },
      {
        title: 'アニメ塗りの肌',
        content: `アニメ塗りでは、実写の毛穴を足さない方が安定します。\`visible skin pores\` や \`realistic skin texture\` をアニメの正向に置くと、顔の一部だけが写真になり、輪郭の線と喧嘩します。アニメの肌は、塗りの種類で揃えます。

\`flat color\` はむらの少ない塗り、\`cel shading\` は境目のある影、\`soft shading\` は境目の薄い影です。\`blush\` は頬の赤みです。シール状の頬の赤は blush stickers と自然な英語です。公式タグとしては断定しません。\`cel shading\` と \`soft shading\` を同じ強さにすると、影が二重になります。一つにしてください。

画風の媒体は [画風プロンプト](/guides/art-style-prompt-guide)、アニメの全般は [アニメプロンプト](/guides/anime-prompt-guide) です。

**セル塗りの顔**

\`\`\`
1 adult woman, adult, portrait, anime style, white blouse,
flat color, cel shading, blush, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}, photorealistic
\`\`\`

実写の枚とアニメの枚は、プロンプトを分けて保存します。\`anime style\` を消したつもりが残っていると、毛穴の指定が顔の半分にしか乗りません。

アニメで肌の赤みだけを足したいときは、\`blush\` を一つ、弱くです。blush stickers は頬にシール状の赤を置く自然な英語で、\`blush\` と同時に強くすると赤みが二重になります。どちらも顔の描写であって、肌の色の順位ではありません。セル塗りで影の位置が顔の左右で違うときは、\`cel shading\` を残したまま、光源を一つに減らします。影の色を別に指定し始めると、塗りより色面が勝って、線が消えます。柔らかい塗りに移るときは、\`cel shading\` を消して \`soft shading\` だけにします。両方を残したまま \`flat color\` を足すと、三つの塗りが帯状に分かれます。実写側の \`natural skin texture\` は、アニメのファイルにはコピーしないでください。コピーした瞬間に、頬だけが写真になります。

アニメの肌を明るくしたいときも、\`fair skin\` を実写の枚から流用するより、塗りを一段明るくする方が線は残ります。色の名前を足すなら一つだけで、質感の毛穴語は足しません。頬の赤みを消したい枚では、\`blush\` を正向から外し、ネガティブに肌をプラスチックにする語まで入れないでください。赤みを消すことと、肌の粒を消すことは別です。実写へ戻すときは、アニメ用のファイルを書き換えずに、実写用のファイルを開きます。\`flat color\` が残った実写は、毛穴を足しても色面のままです。ファイルを分けることが、この節の直し方の本体です。

実写の肌がまだ平面なときは、アニメの語が混ざっていないかを先に検索します。\`flat color\`、\`cel shading\`、\`anime style\` のどれかが残っていれば消してから、\`natural skin texture\` を戻します。消したあとに色が暗くなるのは、塗りの影が無くなったためです。そのときは質感の語を増やさず、\`soft diffused light\` を一つ足して明るさを戻します。明るさの語を三つ重ねると、毛穴は白飛びで消えます。白飛びした枚は、光を一段戻した版を別名で保存し、毛穴の語は顔のアップのファイルにだけ残してください。胸から上の枚と、顔のアップの枚で、肌の色の名前は同じ一つに揃えます。アップだけ色を変えると、あとで同じ人物に見えなくなります。

ほくろを一つ残す指定は、\`mole\` を自然な英語で顔に一つだけ足します。数を増やしたり、位置を細かく座標で書いたりしても、モデルは測れません。位置が違う枚は、その枚を捨てて、語は \`mole\` のまま再生成します。そばかすは \`freckles\` を顔に限って足し、体には広げません。両方を同じ強さにすると、ほくろがそばかすの点に紛れて数だけが増えます。どちらか一つにしてください。産毛の \`fine peach fuzz\` は、輪郭の光が見える顔のアップ向けです。胸から上の枚では弱いか、外した方が服の境界は安定します。これらの語は、肌の色の順位ではなく、その肖像に残したい特徴です。特徴を消す依頼と、特徴を足す依頼は、別のファイルに分けてください。分けたファイルでは、光の文も同じにしておきます。光が違うと、残したほくろの濃さまで変わって、特徴の差なのか影の差なのかが残りません。光を固定したまま特徴だけを足し引きするのが、このページの比較です。比較が終わった枚だけを、構図のガイドや年齢のガイドの語と組み合わせます。組み合わせる前に、肌のファイルへ構図の語を全部コピーしないでください。コピーすると、顔のアップで確認した毛穴が全身の小さな顔ではノイズになります。全身が必要なら、質感の語は \`natural skin texture\` 一つに減らします。`,
      },
      {
        title: '写真の肌を自然に整える',
        content: `ChatGPT や Gemini に自分の写真を渡して肌を整えるときは、残すものを先に書きます。毛穴や質感は残し、赤みだけを少し抑える、という指示が、顔を別の人に置き換える指示より安全です。シミやほくろを全部消す、輪郭を変える、年齢を下げる、という書き方はしません。

過度な加工で別人になると、元の写真に戻すのが難しくなります。変えてよいのは色味の一段まで、と文に書いてください。証明写真として整えるときの枠は [証明写真のAIプロンプト](/guides/id-photo-ai-prompt-guide) です。公開作例は [自然な肌のレタッチ](/prompt/natural-skin-retouching-gentle) です。

**赤みだけを抑える**

\`\`\`
Edit the uploaded photo of this adult. Keep the same person.
Keep visible skin pores and natural skin texture.
Reduce redness on the face only slightly.
Do not change the face shape, age, moles, or clothing.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, ${NEGATIVE_SKIN}
\`\`\`

他人の写真は使いません。顔をアップロードする前に、そのサービスの規約を確認してください。加工した写真を公的な証明として使える、とはこのページでは書きません。

指示は、残すリストを先に、変える項目を一つだけあとにします。残すのは、同一人物であること、毛穴、ほくろ、顔の形、服です。変えるのは赤みの強さだけ、のように範囲を狭くします。範囲が「きれいにして」だけだと、顔の形まで平均へ寄ります。出力を見たら、元の写真と並べて、目の位置と輪郭が動いていないかを確認します。動いていたら、その出力は採用せず、変える項目をさらに狭くして元の写真からやり直します。加工済みの画像を次の入力にすると、ずれが累積します。肌の色を別の名前に変える作業と、赤みを抑える作業は、同じ指示にまとめません。色を変えるなら、質感を残す文は維持したまま、色の文だけを別の依頼にしてください。`,
      },
      {
        title: 'コピーできるテンプレ',
        content: `どれも服を着た、顔か胸から上です。変えてよいのは、光か、肌の特徴を一つずつです。タグの入口は [美肌加工](/tag/美肌加工) です。

**自然光のポートレート**

\`\`\`
1 adult woman, adult, portrait, white blouse,
natural skin texture, realistic skin texture, soft diffused light, window light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**そばかす**

\`\`\`
1 adult woman, adult, portrait, cardigan,
fair skin, freckles, natural skin texture, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**男性のポートレート**

\`\`\`
1 adult man, adult, portrait, shirt,
natural skin texture, visible skin pores, soft diffused light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**40代の肌**

世代の単語は [年齢プロンプト](/guides/age-prompt-guide) です。

\`\`\`
1 adult woman, adult, adult woman in her 40s, portrait, blouse,
natural skin texture, subtle skin imperfections, soft diffused light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**顔に寄った写真**

寄りの作例は [マクロの肖像](/prompt/ultra-macro-portrait-photography) です。

\`\`\`
1 adult woman, adult, close-up, face, white blouse,
visible skin pores, fine peach fuzz, natural skin texture, soft diffused light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**スタジオ**

光の作例は [スタジオの肖像](/prompt/studio-lighting-portrait-detailed) です。

\`\`\`
1 adult man, adult, portrait, shirt,
matte skin, natural skin texture, studio lighting, plain gray background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**明るい肌の色**

\`\`\`
1 adult woman, adult, portrait, white blouse,
fair skin, natural skin texture, soft diffused light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

**穏やかな血色**

\`\`\`
1 adult woman, adult, portrait, cardigan,
natural skin texture, soft blush, soft diffused light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\`

血色は \`blush\` を弱く一つです。色の名前を同時に変えないでください。明るい肌の色も、濃い肌の色も、同じ文章の型で指定できます。型を変える必要はありません。`,
      },
    ],
    faq: [
      {
        q: '肌がプラスチックのようになります',
        a: '品質タグを二つまでに減らし、`natural skin texture` を人数の近くへ置きます。ネガティブに `plastic skin, waxy skin, airbrushed, overly smooth skin, doll-like, oily skin` を残してください。',
      },
      {
        q: '顔と首で色が違います',
        a: '光源を一つに減らし、white balance を自然な英語で一つ足します。肌の色の名前を二つ同時に強くしないでください。背景を無地に戻すと比較しやすいです。',
      },
      {
        q: 'アニメなのに写真の肌が混ざります',
        a: 'アニメの正向から `realistic skin texture` と `visible skin pores` を外し、`cel shading` か `soft shading` のどちらか一つにしてください。',
      },
      {
        q: '色白と書いてもうるおいとつやが混ざります',
        a: '`fair skin` は色の名前です。つやは `dewy skin` で、顔のポートレートに限って弱く足します。ネガティブの `oily skin` は残してください。色に優劣はありません。',
      },
      {
        q: '写真を加工すると別人になります',
        a: '毛穴と質感を残し、赤みだけを少し抑える、と書いてください。輪郭、年齢、ほくろ、服は変えない、と先に書きます。他人の写真は使いません。',
      },
    ],
  },

  'figure-ai-prompt-guide': {
    sections: [
      {
        title: 'フィギュア化で使う写真',
        content: `「フィギュア化 プロンプト」「gemini フィギュア化 プロンプト」「ぬいぐるみ化 プロンプト」は、手元の写真や自作の絵を、立体の商品写真のように見せる指示です。使うのは、自分の写真、自分のペット、自分のオリジナルキャラだけです。他人、有名人、子どもの写真、既存のアニメやゲームのキャラクターは使いません。布のぬいぐるみ、抱く構図、ぬいぐるみ化の文は [ぬいぐるみのプロンプト](/guides/plush-toy-prompt-guide) にまとめました。このページは塗装済みのフィギュアが中心です。

向きは、全身か胸から上が写っていて、正面に近く、明るい写真が扱いやすいです。横を向いた写真や、顔が影の写真は、顔が別の人に置き換わりやすくなります。背景は単純な方が、台座や箱を足したときに崩れません。

このページのツールは、Gemini の画像生成（Nano Banana 系）と、ChatGPT の画像生成です。モデルの版の番号や、無料で何枚作れるかは書きません。条件は各サービスの画面で確認してください。

箱や台座に、メーカーの名前やロゴは入れません。既存の商品名も書きません。立体としての仕上げの種類だけを指定します。

写真を選ぶときの確認は四つです。一人、または一匹だけが主題になっているか。顔、またはペットの顔が正面に近いか。明るく、目が影で潰れていないか。背景に文字やロゴが写っていないか。四つが揃った写真の方が、台座を足したあとも顔が残りやすいです。複数の人が写っている写真は、別の人の顔がフィギュアに混ざります。その写真は使いません。自分の顔でも、他の人が端に写っているなら、渡す前にその部分を隠します。自作キャラの場合は、設定資料の一枚を使い、別作品のスクショは渡しません。明るさが足りない写真は、フィギュア化の前に、顔が分かる明るさまで整えたコピーを作ってから渡すと、顔の置き換えが減ることがあります。整える作業と、フィギュアにする作業は、指示を分けてください。`,
      },
      {
        title: '基本プロンプト',
        content: `最初の一文で、写真の中の成人を、塗装済みのフィギュアにすると書きます。その次に、台座、机、箱、ロゴを入れないこと、の順です。箱の文字は、この段階では書かせません。文字は崩れやすいので、必要ならあとから別の工程で足します。

**日本語（Gemini）**

\`\`\`
この写真の成人（adult）を、1/7スケールの塗装済みフィギュアにしてください。
透明なアクリルの台座に載せ、机の上に置きます。背景にはパッケージの箱を置きます。
箱や台座にロゴや商標や文字は入れないでください。
服と顔の特徴は写真のまま維持します。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo, watermark
\`\`\`

**英語**

\`\`\`
Turn the adult person in this photo into a painted 1/7 scale figure.
Place the figure on a transparent acrylic base, on a desk.
Put a packaging box in the background with no logo, no trademark, and no text.
Keep the same face and the same clothing.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo, watermark
\`\`\`

スケールの数字は、実物の寸法を測る指定にはなりません。画面の中で「完成品のフィギュアらしい大きさ」に寄せるヒントです。顔が変わったときは、数字を増やすより、顔を維持する文を先頭に戻してください。

基本の文で安定してから、バリエーションの表へ進みます。安定の目安は、顔の印象と服の色が、元の写真と見て分かることです。台座の形が多少単純でも、この段階では先へ進んでよいです。逆に、箱の反射は綺麗なのに顔が別の人なら、その出力は採用せず、基本の文に戻ります。箱を先に凝ると、顔の情報が箱の模様に使われて、人が小さくなります。机の素材や、部屋の奥行きも、基本の確認が終わるまでは書きません。確認用の背景は、無地か、机の面だけです。日本語の文で通った内容を英語にするときは、残すものと入れないものを同じ順で訳します。順を入れ替えると、ロゴを禁止する文が後ろに落ちて、箱に印が戻ることがあります。

日本語と英語は、同じ内容の対にして保存します。片方だけを長くすると、次にどちらが最新か分からなくなります。対にする項目は、成人であること、顔と服を維持すること、台座か素材、ロゴと文字を入れないこと、の四つです。四つが両方の言語にあるかを音読してから生成します。英語だけにスケールの数字があり、日本語から顔の維持が抜けている、というずれが、別人の出力の原因になることがあります。ずれたら、短い方の言語を長い方に合わせて書き直し、数字は両方に同じ一つだけ残します。写真を添付しない新規の描画は、この対の文ではなく、最後の節のタグを使ってください。

バリエーションへ進むときも、基本の四項目は残したまま、種類の文だけを差し替えます。箱入りの文からぬいぐるみへ移るなら、パッケージの文を消し、フェルトと縫い目の文を足します。両方残すと、箱の中に布が溶けた形になります。ステッカーへ移るときは、台座の文を消して白い背景を足します。台座が残ったステッカーは、厚みのある板になり、平面のフチが出ません。粘土へ移るときは、PVC の文を消します。素材の語が二つ残ると、表面がどちらでもなくなります。種類を変えるたびに、顔を維持する文がまだ先頭にあるかを確認してから生成してください。確認は、生成ボタンを押す前に文を上から読み、成人、顔を維持、服を維持、ロゴと文字を入れない、の四つが見えるかどうかです。四つのうち一つでも後ろに落ちていたら、先頭へ戻してから生成します。生成後は、元の写真と出力を並べ、顔の輪郭と服の色だけを見ます。台座の形が単純でも、顔が同じならその種類は成功です。顔が違えば台座がどれだけ整っていても捨て、基本の文に戻ります。成功した種類は、言語の対ごと別名で保存し、次の種類は成功ファイルではなく基本の文から作ります。`,
      },
      {
        title: 'バリエーション',
        content: `種類は一つずつ作ります。箱入りと、ぬいぐるみと、ステッカーを同じ文に書くと、素材が混ざります。公開の作例があるものは、文言の参考にリンクだけを置きます。中身のプロンプトは、このページの成人指定で書き直してください。

| 種類 | 書くこと | 作例 |
|---|---|---|
| 箱入り | packaging box、ロゴなし | [箱入りのトイ](/prompt/action-figure-box-toy) |
| 棚のミニチュア | display shelf | [棚のミニチュア](/prompt/miniature-figurine-shelf) |
| ぬいぐるみ | plush toy, felt texture, stitched seams | [ぬいぐるみ](/prompt/plush-stuffed-toy-cute) |
| アクリルスタンド | acrylic stand | 自然な英語。公式タグとしては断定しない |
| 粘土 | clay figure | 自然な英語 |
| ステッカー | sticker, white background | [ステッカー](/prompt/sticker-die-cut-portrait) |
| デフォルメ | 頭身だけを下げる | [デフォルメ・ちびキャラのプロンプト](/guides/chibi-deformed-prompt-guide) |

**箱入り**

\`\`\`
この写真の成人（adult）を、箱に入ったコレクタブルフィギュアにしてください。
透明な窓のあるパッケージ、机の上、スタジオの照明。
箱の文字、ロゴ、商標は入れないでください。顔と服は維持します。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Make a collectible figure of the adult in this photo, inside a packaging box with a clear window.
On a desk, studio lighting. No text, no logo, no trademark.
Keep the face and the clothing.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**棚に飾る**

\`\`\`
この写真の成人（adult）を、小さな塗装済みフィギュアにして、飾り棚に置いてください。
透明なアクリル台座。周囲の棚は単純に。ロゴも文字も入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Place a small painted figure of this adult on a display shelf, with a transparent acrylic base.
Keep the shelf simple. No logo and no text. Keep the face and clothing.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**ぬいぐるみ**

\`\`\`
この写真の成人（adult）を、フェルト生地のぬいぐるみにしてください。
縫い目が見える、机の上、柔らかい光。ロゴや文字は入れません。顔の印象は維持します。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Turn this adult into a plush toy with felt texture and visible stitched seams.
On a desk, soft light. No logo and no text. Keep the face recognizable.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**アクリルスタンド**

\`\`\`
この写真の成人（adult）を、透明な台座のアクリルスタンドにしてください。
机の上、正面、単純な背景。ロゴや文字は入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Make an acrylic stand of this adult, on a transparent base, on a desk.
Front view, simple background. No logo and no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**粘土**

\`\`\`
この写真の成人（adult）を、手作業の粘土フィギュアにしてください。
粘土の表面、机の上、自然な光。ロゴや文字は入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Turn this adult into a handmade clay figure on a desk, with visible clay texture.
Natural light. No logo and no text. Keep the clothing colors.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**ステッカー**

\`\`\`
この写真の成人（adult）を、白いフチのダイカットステッカーにしてください。
白背景、全身、立ち姿。文字は入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Make a die-cut sticker of this adult with a white border, on a white background.
Full body, standing. No text and no logo.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**デフォルメのフィギュア**

頭身のルールはちびのガイドと同じです。頭を大きくしても、年齢は成人のままです。

\`\`\`
この写真の成人（adult）を、頭の大きいデフォルメの塗装済みフィギュアにしてください。
年齢設定は成人のままです。透明な台座、白背景。ロゴや文字は入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Turn this adult into a painted chibi-style figure with a large head.
Keep the adult age. Transparent base, white background. No logo and no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\``,
      },
      {
        title: 'ペットと物のフィギュア化',
        content: `犬や猫は、自分のペットだけを使います。人の顔のルールは不要ですが、子どもの写真を背景に残したまま渡さないでください。服の柄に他のキャラクターが写っているときは、その部分を隠してから渡します。

車は、自分の車を「車」として書きます。メーカー名、エンブレム、車種名は書きません。写真にロゴが写っている場合は、指示文で「ロゴは消す」と書きます。

**自分の犬**

\`\`\`
この写真の自分の犬を、塗装済みのフィギュアにしてください。
透明なアクリル台座、机の上、単純な背景。ロゴや文字は入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
Turn my own dog in this photo into a painted figure on a transparent acrylic base.
On a desk, simple background. No logo and no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**自分の車**

\`\`\`
この写真の自分の車を、ディスプレイ用の模型にしてください。
机の上、スタジオの照明。エンブレムやロゴや文字は入れないでください。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo, watermark
\`\`\`

\`\`\`
Turn my own car in this photo into a display model on a desk, with studio lighting.
Remove emblems, logos, and text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo, watermark
\`\`\``,
      },
      {
        title: 'ChatGPTで作る場合',
        content: `ChatGPT の画像生成でも、伝えたい内容は Gemini と同じです。違うのは、文を短く区切った方が従いやすいことがある点です。顔、服、台座、禁止事項を、別の文にしてください。

顔を保つ文は、先頭に置きます。「別人にしない」「顔の特徴を保つ」と、結果で書きます。服の色を一つでも変えると、顔まで平均の顔に寄ることがあります。服を変えない枚と、服を変える枚は分けてください。

**顔を保つ**

\`\`\`
Use the uploaded photo of this adult. Keep the same face.
Do not replace the person.
Make a painted 1/7 scale figure on a transparent acrylic base.
Keep the clothing. No logo, no text, no trademark on the box.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

**日本語**

\`\`\`
アップロードした成人（adult）の写真を使ってください。同じ顔のままにして、別人にしないでください。
1/7スケールの塗装済みフィギュア、透明なアクリル台座。服はそのまま。
箱にロゴも文字も商標も入れません。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

文章の型の入口は [ChatGPTプロンプト](/guides/chatgpt-prompt-techniques) と [Geminiプロンプト集](/guides/gemini-prompt-collection) です。`,
      },
      {
        title: '仕上がりを上げる',
        content: `素材と光とカメラを、一つずつ足します。一度に全部を強くすると、箱の反射ばかりが残って顔が小さくなります。

光は \`studio lighting\` です。質感は、フィギュアなら PVC figure、ぬいぐるみなら felt texture、粘土なら clay figure と、自然な英語で一つです。カメラは realistic product photo と自然な英語です。公式タグとしては断定しません。寄りにするなら close-up を一つ足し、全身の台座と寄りを同じ強さにしないでください。

背景は、机か、単純な棚か、無地です。景色の詳しい書き方は [背景プロンプト](/guides/background-prompt-guide)、光のカタログは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

**商品写真らしい寄り**

\`\`\`
この成人（adult）の塗装済みフィギュアを、商品写真らしく撮ってください。
PVCの質感、スタジオの照明、机、単純な背景、やや寄り。
ロゴや文字は入れません。顔は維持します。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

\`\`\`
A realistic product photo of a painted PVC figure of this adult.
Studio lighting, on a desk, simple background, a slight close-up.
No logo and no text. Keep the face.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

台座は transparent acrylic base と自然な英語で足せます。台座の形を凝るより、顔が維持されているかを先に確認してください。

足す順番は、素材、光、カメラ、背景です。素材が決まる前に寄りを強くすると、表面が平均のプラスチックになり、ぬいぐるみとフィギュアの差が消えます。PVC figure を書く枚と、felt texture を書く枚はファイルを分けてください。光は \`studio lighting\` を一つ。窓の光とスタジオを同じ強さにすると、台座の影が二方向へ伸びます。カメラの realistic product photo は、机の上に置いた完成品、という見え方の指定です。風景写真の語や、ポートレート用のぼかしを同時に強くすると、商品としての輪郭が消えます。背景を足すのは、顔が三枚続けて同じに見えてからです。棚の本や植物は一つまでです。`,
      },
      {
        title: 'うまくいかないとき',
        content: `別人になるときは、新しい特徴を足すのをやめます。髪の色、服、年齢感、表情を同時に変えないでください。文の先頭を「同じ顔の成人のまま」に戻し、変えてよいのは台座と背景だけにします。

服が変わるときは、服の色と形を「写真のまま」と書き、衣装の別名を足しません。フィギュア化の文の中に、別の職業の服を書くと、顔より服が優先されます。

箱の文字が崩れるのは、文字を描かせているときです。箱には文字を入れない、と書き、必要な文字は画像ができたあとに別の工程で足します。プロンプトの中で商品名を書いても、正しい綴りにはなりません。

指が崩れるときは、手の形を増やすのをやめ、胸から上に切り替えます。指そのものの直し方は [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。商品写真の寄りで指を画面いっぱいにすると、本数が増えやすくなります。

背景が部屋の景色のまま崩れるときは、背景を無地か机だけに戻します。棚の小物を三種類以上書くと、フィギュアより棚が主題になります。

直すときは、失敗の種類を一つに決めてから文を削ります。別人なら、新しい形容を全部消して顔の維持だけを残します。服が変わるなら、衣装の別名を消して「写真の服のまま」を残します。文字が崩れるなら、箱に書いてほしい単語をプロンプトから消します。指が増えるなら、手のジェスチャーを消して胸から上にします。四つの失敗を一つの長いネガティブで同時に塞ごうとすると、正向の「フィギュアにする」まで弱くなります。ネガティブに足すのは、今の枚で見えている問題の語だけです。直った版は別名で保存し、次のバリエーションはそのファイルから種類の文だけを差し替えます。基本の文に戻さずに種類を重ねると、箱とぬいぐるみが同じ画面に出ます。`,
      },
      {
        title: '権利とプライバシー',
        content: `一般的な注意です。このページは、適法かどうかの判断をしません。投稿や販売の前に、自分で規約と権利を確認してください。

肖像は、写っている人の問題です。使えるのは自分の写真に限ってください。他人や有名人の写真をフィギュア風にして公開しないでください。子どもの写真は使わないでください。

著作権は、既存のキャラクターや作品の絵を、そのまま立体にしないための注意です。自作のキャラクターだけを渡します。商標は、メーカー名、商品名、ロゴです。箱や台座や車に入れません。

SNS に出すときは、元の写真に写り込んだ人や、背景の看板も一緒に出ていないかを見てください。顔の写真をサービスへアップロードする前に、そのサービスの規約を確認します。Made with AI の表示や透かしの扱いは、各サービスの規約に従ってください。

自分のペットも、他人の家のペットや、店先の動物の写真で代用しないでください。

公開する前の確認も、権利の確認と分けて行います。画像の中に、意図しない文字が残っていないか。背景に人の顔が残っていないか。ロゴの形が台座に出ていないか。三つを見てから投稿するかどうかを決めます。透かしを消す指示は、各サービスが自分で付けた表示を無理に消す目的では書きません。表示の要否は規約に従います。販売や配布をする場合も、このページの文面が許可を意味するわけではありません。使える素材かどうかは、写真の出どころと、投稿先のルールで判断してください。判断に迷う素材は、フィギュア化の入力に使わないでください。`,
      },
      {
        title: 'Stable Diffusionで作る場合',
        content: `タグで新規に描くときは、写真の変換ではなく、フィギュアらしい一人絵です。自然な英語として、figure、1/7 scale figure、PVC figure、acrylic base、product photo を並べます。公式タグとしては断定しません。

\`\`\`
1 adult woman, adult, figure, 1/7 scale figure, PVC figure,
transparent acrylic base, product photo, studio lighting, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, logo, watermark
\`\`\`

写真の顔を維持したいときは、このタグ列だけでは足りません。その場合は Gemini か ChatGPT に写真を渡す節へ戻ってください。タグの枚と、写真変換の枚は、別のプロンプトとして保存します。`,
      },
    ],
    faq: [
      {
        q: '顔が別人になります',
        a: '文の先頭で、同じ成人の顔を維持すると書いてください。髪、服、表情を同時に変えないでください。変えてよいのは台座と背景だけにすると、顔は残りやすいです。',
      },
      {
        q: '箱の文字が崩れます',
        a: '箱には文字を入れない、と書いてください。商品名をプロンプトに書いても綴りは安定しません。必要な文字は、画像のあとで足します。',
      },
      {
        q: '他人の写真を使ってよいですか',
        a: '使いません。自分の写真、自分のペット、自作キャラだけです。有名人や既存のキャラクターも使いません。子どもの写真は使わないでください。',
      },
      {
        q: 'ペットや車もフィギュアにできますか',
        a: '自分の犬や猫、自分の車に限ってください。車はメーカー名やエンブレムを書かず、ロゴは消すと指示します。',
      },
      {
        q: 'Stable Diffusionだけでも作れますか',
        a: 'タグで新規に描くなら、このページの最後の型を使えます。手元の写真の顔を維持したいときは、Gemini か ChatGPT に写真を渡す文の方が向きます。',
      },
    ],
  },

  'ai-illustration-prompt-list': {
    sections: [
      {
        title: '呪文の基本構成と順番',
        content: `個別のプロンプト作例は [プロンプト一覧](/prompts) です。このページは、AIイラストの呪文をカテゴリに分けた入口です。一枚を作る手順は [AIイラストの作り方](/guides/ai-illustration-how-to-guide) です。一つのタグ集を全部貼るのではなく、何を制御するカテゴリかを先に選んで、詳しいガイドへ進みます。

読み方は、次の順です。まずこの節の順番で全文を一つ保存します。次に、直したい箇所の節だけを開きます。髪型が溶けるなら髪型、目がカメラを向かないなら構図と目線、肌が平面なら顔の節、です。関係ない節のタグを同じ日に足すと、直した理由が残りません。各節の表は、そのカテゴリで最初に試す語だけです。段階や衝突の直し方は、表の下のガイドに分けてあります。ガイドを開かずに表の語を全部並べると、このページの入口としての意味が消えて、また長い呪文に戻ります。人を描く行は \`adult\` から始め、ネガティブには年齢の語を残します。動物や背景だけの行は、人の人数を書きません。

Stable Diffusion や NovelAI で崩れにくい順番は、品質、被写体、外見、服、ポーズ、構図、背景、光です。前にある語が残りやすいので、今回強調したいものだけを被写体の直後へ移します。全部を先頭にすると、どれが効いたのかが分かりません。

品質の置き方は [品質タグ一覧](/guides/quality-tags-prompt-guide)、入れないものの書き方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。プロンプトという言葉の意味は [プロンプトとは](/guides/what-is-prompt)、書き方の型は [プロンプトの書き方](/guides/prompt-writing-guide) です。画像を作る順番と例文は [画像生成AIのプロンプトの書き方](/guides/image-generation-prompt-guide) です。文章で指示するときの型は [ChatGPTプロンプト](/guides/chatgpt-prompt-techniques)、言葉の使い方の話は [プロンプトはコードではない](/guides/prompt-language-game) です。

**全文の型**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
standing, upper body, facing viewer, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**自然文**

\`\`\`
1 adult woman, adult, black hair, white blouse and a cardigan.
Upper body, facing the camera, eyes on the lens.
Plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

ChatGPT や Gemini では自然文、Stable Diffusion や NovelAI ではタグ、と保存を分けてください。Midjourney では重みの括弧を外します。パラメータの考え方は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。`,
      },
      {
        title: '画風・塗り',
        content: `画風は、人物の直後に一つだけ置きます。アニメ塗りと水彩と写真を同じ強さにすると、三つの絵が混ざります。

画風を変える実験では、人物の行を固定します。髪、服、構図が同じで、\`anime style\` と \`photorealistic\` だけが違う二枚を見比べてください。両方を残した枚は、比較に使いません。水彩や線画に寄ったあとで写真の質感語を足すと、顔の半分だけが別の媒体になります。媒体を戻すときは、足した質感語を消してから再生成します。Illustrious のようにモデル側で画風が決まっている場合は、品質タグのガイドと Illustrious のガイドを先に読み、この表の語は一つまでにしてください。色の名前は画風が決まってから足します。色を先に強くすると、塗りより色面が優先されます。

| 制御 | 書き方の例 |
|---|---|
| アニメ | \`anime style\` |
| セル塗り | \`cel shading\`, \`flat color\` |
| 柔らかい塗り | \`soft shading\` |
| 写真 | \`photorealistic\` |
| 水彩 | watercolor（自然な英語） |
| 線画 | \`lineart\` |

詳しくは [画風プロンプト](/guides/art-style-prompt-guide)、[アニメプロンプト](/guides/anime-prompt-guide)、[Illustriousプロンプト](/guides/illustrious-prompt-guide)、[Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide) です。色の名前は [色プロンプト](/guides/color-prompt-guide)、ツール側の書き方は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。

\`\`\`
1 adult woman, adult, anime style, cel shading, flat color,
black hair, white blouse, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic
\`\`\``,
      },
      {
        title: 'ツール・モデル別の使い方',
        content: `画風のタグを足す前に、どのモデルへ書くかを決めます。タグの列が通るモデルと、自然な文が通るモデルは違います。LoRA と ControlNet は、そのモデルにファイルを足す手順です。

| やりたいこと | ページ |
|---|---|
| 初めて一枚を作る手順 | [AIイラストの作り方](/guides/ai-illustration-how-to-guide) |
| Stable Diffusion の始め方 | [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) |
| SDXL の解像度と Refiner | [SDXLとは](/guides/sdxl-guide) |
| LoRA を自分で作る | [LoRA学習のやり方](/guides/lora-training-guide) |
| ChatGPT の画像と上限 | [ChatGPTの画像生成](/guides/chatgpt-image-generation-guide) |
| Midjourney の Web での始め方 | [Midjourneyの使い方](/guides/midjourney-how-to-guide) |
| ノードの導入と基本のつなぎ | [ComfyUIの使い方](/guides/comfyui-guide) |
| ComfyUI Manager | [ComfyUI Managerの使い方](/guides/comfyui-manager-guide) |
| A1111 の WebUI と日本語化 | [Stable Diffusion WebUIの使い方](/guides/stable-diffusion-webui-guide) |
| どの公式ツールでイラストを出すか | [AIイラスト生成ツールの選び方](/guides/ai-illustration-generator-guide) |
| VAE の置き場所と選択 | [Stable DiffusionのVAE](/guides/stable-diffusion-vae-guide) |
| Forge と Forge Neo の導入 | [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) |
| Hires. fix と拡大 | [Hires. fix の使い方](/guides/hires-fix-upscale-guide) |
| 顔の崩れと ADetailer | [ADetailerの使い方](/guides/adetailer-face-fix-guide) |
| \`<lora:名前:強さ>\` と Load LoRA | [LoRAの使い方](/guides/stable-diffusion-lora-guide) |
| 参照画像で姿勢や線を固定 | [ControlNetの使い方](/guides/controlnet-guide) |
| SD1.5、SDXL、SD3.5、FLUX の違い | [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) |
| \`{}\` と \`1.5::タグ::\` | [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) |
| 括弧、BREAK、重み | [プロンプトの記号の意味](/guides/prompt-symbols-guide) |
| Denoising と inpaint | [img2imgの使い方](/guides/img2img-guide) |
| サンプラー、CFG、ステップ | [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) |
| 商用利用の確認順 | [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) |

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

この行は、どのツールでも人数と服を残すための起点です。LoRA のタグや ControlNet の参照は、それぞれのページの手順で足します。NovelAI では強調の括弧を、Stable Diffusion の \`(tag:1.2)\` のまま貼らないでください。`,
      },
      {
        title: '構図・アングル・目線',
        content: `構図は、ショットの大きさ、カメラの高さ、体の向き、目線の四つです。四つを一度に強くすると、いつもの胸から上の正面に戻ります。

足りない軸を一つ決めてから、その語だけを人物の直後へ移します。全身が欲しいのに顔が大きいなら \`full body\` を前へ。上から見たいなら \`from above\` を前へ。カメラ目線を外すなら \`looking away\` を前へ移し、\`looking at viewer\` はネガティブへ。軸を二つ同時に前へ移すと、どちらが効いたのかが残りません。縦横の比率は、タグの軸とは別の指定です。全身の縦絵が欲しいときは、アスペクト比のガイドを開き、プロンプトの中の \`full body\` は残したままにしてください。比率だけを変えても、\`upper body\` が正向に残っていれば足は切れます。

| 制御 | 書き方の例 |
|---|---|
| 全身 | \`full body\` |
| 上半身 | \`upper body\` |
| 正面の顔 | \`facing viewer\` |
| 上から | \`from above\` |
| 下から | \`from below\` |
| カメラ目線 | \`looking at viewer\` |
| 目をそらす | \`looking away\` |

詳しくは [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide)、[見下ろす構図](/guides/high-angle-prompt-guide)、[下からのアングル](/guides/low-angle-prompt-guide)、[目線・視線のプロンプト一覧](/guides/gaze-direction-prompt-guide)、[二人構図](/guides/two-person-composition-prompt-guide)、[縦横のプロンプト](/guides/image-aspect-ratio-916-prompt-guide)、[カメラのプロンプト](/guides/camera-lens-prompt-guide) です。二人の身長差を絵の配置で見せるときは [身長差イラストの構図](/guides/height-difference-illustration-composition-guide) です。

\`\`\`
1 adult woman, adult, full body, facing viewer, looking at viewer,
standing, long coat, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped
\`\`\``,
      },
      {
        title: '顔・表情・目・肌',
        content: `顔は、表情、目の形と色、肌の質感、年齢感を別々に足します。同じ実験で四つを動かすと、別人になります。

最初の顔は、\`smile\` か \`serious\` のどちらかと、\`looking at viewer\` だけにしてください。目の色は、その顔が三枚同じに見えてから一つ足します。肌の質感は、実写の肖像で平面なときだけ足し、アニメ塗りの枚には毛穴を足しません。年齢の句を足すときは、\`adult\` を消さずに、世代の語を髪より前に置きます。表情のガイド、目のガイド、肌のガイド、年齢のガイドは、それぞれ直す層が違います。四つのガイドのタグを一つの文に結合しないでください。結合すると、この節で分けた理由が消えます。

| 制御 | 書き方の例 |
|---|---|
| 笑顔 | \`smile\` |
| 真剣 | \`serious\` |
| 目の色 | \`blue eyes\` |
| カメラ目線 | \`looking at viewer\` |
| 自然な肌 | \`natural skin texture\` |
| 成人の世代 | adult woman in her 30s（自然な英語） |

詳しくは [表情プロンプト](/guides/stable-diffusion-expression-prompt)、[目・瞳のプロンプト一覧](/guides/eye-prompt-guide)、[肌の質感プロンプト](/guides/skin-texture-prompt-guide)、[年齢プロンプト](/guides/age-prompt-guide) です。

\`\`\`
1 adult woman, adult, portrait, smile, looking at viewer,
natural skin texture, white blouse, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
${NEGATIVE_SKIN}
\`\`\``,
      },
      {
        title: '髪型',
        content: `髪型は長さを一つ、結びを一つ、色を一つまでです。ツインテールとお団子とボブを同時に強くすると、結び目が三箇所になります。

長さが決まるまでは、色を変えません。黒髪のロングが安定した枚を保存してから、色のガイドへ進んでください。結びを変えるときも、長さの語は残します。\`long hair\` を消して \`ponytail\` だけにすると、長さが肩で止まることがあります。ツインテール、編み込み、前髪は専用のガイドがあるので、この表の一語で足りなくなったら、そちらへ移ります。パーソナルカラーのページは、似合う色の考え方です。生成用のタグそのものは髪色のガイドに戻して書いてください。髪が溶けるときは、背景を無地に戻し、髪の語を人数の直後へ移します。背景の模様が強いと、毛先が模様に吸収されます。

| 制御 | 書き方の例 |
|---|---|
| ロング | \`long hair\` |
| ボブ | \`bob cut\` |
| ポニーテール | \`ponytail\` |
| お団子 | \`hair bun\` |
| ツインテール | \`twintails\` |
| 前髪 | \`blunt bangs\` |
| 黒髪 | \`black hair\` |

詳しくは [髪型プロンプト](/guides/hairstyle-prompt-guide)、[ロングヘア](/guides/long-hair-prompt-guide)、[ツインテール](/guides/twintail-prompt-guide)、[編み込み](/guides/braid-prompt-guide)、[前髪](/guides/bangs-prompt-guide)、[髪色](/guides/hair-color-prompt-guide)、[ハーフアップ](/guides/half-up-hair-prompt-guide)、[パーソナルカラーと髪色](/guides/personal-color-hair-color) です。

\`\`\`
1 adult woman, adult, black hair, long hair, blunt bangs,
white blouse, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '体型・身長・デフォルメ',
        content: `体型は一つ、頭身は一つの方向だけです。\`chibi\` を残したまま脚を長くすると、比率が中間で止まります。頭身を下げても、年齢は成人のままです。

体型の語と頭身の語は、別の日に試します。細身にしたい枚で \`chibi\` を残すと、どちらでもない中間の体になります。ちびにする枚では体型の形容を外し、8頭身にする枚では \`chibi\` をネガティブへ移します。二人の身長差や体格差は、一人の体型が決まってから専用のガイドへ進みます。一人の文に二人の差の語を足しても、画面の人数は増えません。低身長のガイドは成人の小柄であって、頭身を下げるページではありません。頭を大きくしたいときは、デフォルメのガイドだけを開いてください。

| 制御 | 書き方の例 |
|---|---|
| 細身 | slim（自然な英語） |
| 筋肉 | \`muscular\` |
| ふくよか | plump（自然な英語） |
| 長身 | \`tall\` |
| ちび | \`chibi\` |
| 8頭身 | 8 heads tall（自然な英語） |

詳しくは [体型プロンプト](/guides/body-type-prompt-guide)、[筋肉質](/guides/muscular-prompt-guide)、[ぽっちゃり](/guides/plump-body-prompt-guide)、[高身長](/guides/tall-height-prompt-guide)、[低身長・小柄](/guides/short-height-petite-prompt)、[デフォルメ・ちびキャラ](/guides/chibi-deformed-prompt-guide) です。二人の差は [身長差プロンプト](/guides/height-difference-pair-prompt)、[体格差プロンプト](/guides/body-size-difference-prompt-guide)、[推しとの身長差](/guides/oshi-height-difference-ai-guide) です。

\`\`\`
1 adult woman, adult, chibi, full body, standing,
simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '服装・衣装',
        content: `服は場面を一つ決めてから、部品を二つまで足します。スーツとメイド服を同じ強さにすると、襟元とエプロンが溶きます。

場面の語を人数の直後に置き、小物は後ろです。着物の枚に \`suit\` が残っていると、袖が洋装に戻ります。ファンタジーの鎧と、現代のブラウスも同時に強くしません。アクセサリーは、服の形が三枚安定してから一つ足します。先にネックレスや髪飾りを強くすると、服の輪郭より小物の形が優先されることがあります。コスプレのガイドは衣装の部品、メイドや着物やドレスのガイドは種類の差です。種類が決まる前にコスプレのページの部品を全部足さないでください。服が現代の無地に戻るときは、背景の場所を単純にしてから、衣装の名詞を前へ戻します。

| 制御 | 書き方の例 |
|---|---|
| ブラウス | white blouse（自然な英語） |
| コート | \`coat\` |
| スーツ | \`suit\`, \`necktie\` |
| 着物 | \`kimono\` |
| メイド | \`maid outfit\`, long dress |
| 鎧 | \`armor\` |

詳しくは [服装プロンプト一覧](/guides/clothing-prompt-guide)、[コスプレプロンプト](/guides/cosplay-prompt-guide)、[メイド服](/guides/maid-outfit-prompt-guide)、[スーツ・白衣](/guides/suit-lab-coat-prompt-guide)、[着物](/guides/kimono-prompt-guide)、[ドレス](/guides/dress-prompt-guide)、[ファンタジー衣装](/guides/fantasy-outfit-prompt-guide)、[アクセサリー](/guides/accessory-prompt-guide)、[眼鏡・メガネ](/guides/glasses-prompt-guide) です。

\`\`\`
1 adult woman, adult, white blouse, cardigan, long skirt,
standing, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: 'ポーズと二人のシーン',
        content: `ポーズは一つです。手の位置を二つ同時に指定すると、指が増えます。二人のシーンは \`2 adults\` から書き、何をしているかを一つにします。

立ち姿が安定するまでは、手のジェスチャーを足しません。指の崩れは手のガイド、二人の距離はハグや手つなぎや壁ドンのガイド、というように出口を分けます。キスとハグを同じ強さで書くと、顔の距離が中間で止まって、どちらでもない接触になります。BL の構図とポーズは、男性二人のページです。人数を書かずにポーズだけを足すと、人が増減します。手を画面の外に出してよい確認なら、\`upper body\` に切り替えて指の負担を減らしてください。物を持たせるのは、空の手が三枚続けて崩れていないあとです。

| 制御 | 書き方の例 |
|---|---|
| 立つ | \`standing\` |
| 腕を組む | \`arms crossed\` |
| 手をつなぐ | \`holding hands\` |
| 抱き合う | \`hug\` |
| キス | \`kiss\` |
| 壁に手 | \`hand on wall\` |

詳しくは [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、[ダンスのプロンプト](/guides/dance-prompt-guide)、[手・指](/guides/hand-finger-prompt-guide)、[手をつなぐ](/guides/hand-holding-prompt-guide)、[ハグ](/guides/hug-prompt-guide)、[キス](/guides/kiss-prompt-guide)、[壁ドン](/guides/kabedon-prompt-guide)、[お姫様抱っこ](/guides/princess-carry-prompt-guide)、[BL構図](/guides/bl-composition-prompt-guide)、[BLポーズ](/guides/bl-pose-collection-guide) です。

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
standing side by side, holding hands, coat, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\``,
      },
      {
        title: '背景・光・季節・用途',
        content: `背景は場所を一つ、光は方向を一つにします。季節の小物を四種類並べると、人が背景に負けます。用途が証明写真やフィギュアや年賀状のときは、そのガイドの注意を先に読んでください。

場所を変える実験では、人物の行を固定します。無地で顔が決まってから、室内か屋外かを一つ足してください。暗い部屋は、光を消すページではなく、光源を一つ残すページです。光のガイドとセットで読んで、\`backlighting\` と \`studio lighting\` を同時に強くしないでください。クリスマスや年賀状は、季節の小物を一つにします。証明写真とフィギュア化は、自分の写真を渡す用途です。他人の写真や、既存のキャラクターは使いません。塗り絵と、画像から動画は、人物のタグを流用する前に、それぞれのガイドの制約を確認します。男性キャラのページは、一人の男性を服と髪から組み立てる入口です。Gemini の文例は、タグが通らないときの自然文へ戻る場所です。

| 制御 | 書き方の例 |
|---|---|
| 無地 | \`simple background\` |
| 室内 | indoors（自然な英語） |
| 柔らかい光 | \`soft lighting\` |
| スタジオ | \`studio lighting\` |
| 逆光 | \`backlighting\` |

詳しくは [背景プロンプト](/guides/background-prompt-guide)、[風景のプロンプト](/guides/landscape-prompt-guide)、[モブ・群衆のプロンプト](/guides/mob-crowd-prompt-guide)、[暗い部屋](/guides/dark-room-prompt-guide)、[光・照明](/guides/lighting-prompt-guide)、[エフェクトのプロンプト](/guides/effect-prompt-guide)、[雪・冬のプロンプト](/guides/snow-winter-prompt-guide)、[クリスマス](/guides/christmas-prompt-guide)、[年賀状](/guides/new-year-card-ai-prompt-guide)、[証明写真](/guides/id-photo-ai-prompt-guide)、[フィギュア化](/guides/figure-ai-prompt-guide)、[ぬいぐるみのプロンプト](/guides/plush-toy-prompt-guide)、[塗り絵](/guides/ai-coloring-page-prompt)、[画像から動画](/guides/image-to-video-ai-prompt-guide) です。人型や巨大なロボットは [ロボット・メカのプロンプト](/guides/robot-mecha-prompt-guide) です。男性のキャラ全体は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide)、Gemini の文例は [Geminiプロンプト集](/guides/gemini-prompt-collection) です。この入口自身は [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list) です。

\`\`\`
1 adult woman, adult, white blouse, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

人物なしの背景だけを試すときは、人数の行を消してから場所を一つ書きます。人のタグが残った背景は、端に顔が出ます。

この一覧を一周する必要はありません。今の絵で足りない層を一つだけ開いて、その節のコードをコピーし、詳しいガイドで衝突を確認してから戻ってきます。入口の全文テンプレは、層がまだ何も決まっていないときの開始点です。すでに髪型だけ決まっているなら、全文は使わず、髪型の節の一行を今のプロンプトへ足します。足したあとに別の層が崩れたら、足した行を外して、崩れた層のガイドを開きます。ガイド同士を同じ日に三ページ分コピーしないでください。コピーが長いほど、先頭の \`adult\` が後ろへ押し出されて、人数から崩れます。保存するファイル名は、層の名前が分かるものにします。目線用、頭身用、肌用、フィギュア用、と分けておくと、次にこの一覧へ戻ったとき、どの節から再開するかが残ります。個別の作例が欲しくなったら、プロンプト一覧へ移って、その作例のタグはガイドの注意と突き合わせてから使ってください。

節を移動するときの持ち帰りは、タグを三つまでです。表にある語を全部コピーすると、次の節の衝突チェックができません。三つを今のプロンプトの、被写体の直後へ置き、生成して、崩れた語を一つ外します。外しても変わらない語は、そのモデルでは弱いので、ガイド側の「自然な英語」と書かれた行に戻って言い換えてください。言い換えも効かないときは、その層は諦めて、別の層を一つだけ足します。同じ層で語を五個まで増やすと、入口の順番が後ろへ押し出され、背景と光だけが残ります。光を変えるのは、人物が三枚同じに見えてからです。人物が揺れているあいだに季節の小物やフィギュアの台座を足しても、主題は定まりません。

各ガイドの先頭には、そのページで扱わないものも書いてあります。年齢を下げる語、既存の作品名、実在の人物名、服を開けた描写は、この一覧のどの節からも足しません。節の表に無い語を足したくなったら、先にその節のガイドを開き、自然な英語と書かれているかを確認します。確認せずに長い呪文へ戻ると、カテゴリに分けた意味が消えます。迷ったら全文テンプレの人数と服と背景だけに戻し、今日直したい層を一つだけ足し直してください。それが、この一覧の使い方の全部です。戻したテンプレには、\`adult\` と、着た服と、単純な背景が残っていることを確認してから、次の層を足します。確認できたら、その層のガイドを開いて、表の語を一つだけ足します。一つで絵が動いたら、そのガイドの直し方の節を読んでから次の語へ進みます。動かなければ、その語はそのモデルでは弱いので、ガイドに書かれた言い換えを一つ試します。言い換えも動かなければ、その層は今日は閉じます。閉じた層の語を残したまま別の層を開かないでください。残った弱い語が、次の層の結果を濁します。`,
      },
    ],
    faq: [
      {
        q: '呪文はどの順番で書けばよいですか',
        a: '品質、被写体、外見、服、ポーズ、構図、背景、光の順が起点です。今回強調したい語だけを被写体の直後へ移してください。全部を先頭にすると、何が効いたのかが残りません。',
      },
      {
        q: 'タグと自然文はどちらですか',
        a: 'Stable Diffusion と NovelAI はタグ、ChatGPT と Gemini は自然文です。Midjourney は自然文に近く、重みの括弧は外します。通った文は、タグに翻訳して別に保存してください。',
      },
      {
        q: 'この一覧と個別のガイドはどう使い分けますか',
        a: 'このページでカテゴリを選び、詳しいガイドでタグの衝突と直し方を読みます。一枚ずつの作例はプロンプト一覧です。',
      },
      {
        q: 'ネガティブは毎回要りますか',
        a: 'Stable Diffusion と NovelAI では、体の崩れと年齢の語を残した短いネガティブから始めてください。長くしても、正向に残った矛盾は消えません。',
      },
      {
        q: '品質タグは先頭ですか',
        a: '先頭付近に置いてよいのは二つまでです。積みすぎて肌や手が崩れるときは、品質タグのガイドと肌の質感のガイドを見て、数を減らしてください。',
      },
    ],
  },
}
