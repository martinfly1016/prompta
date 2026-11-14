/**
 * Sixteenth SEO batch (2026-11-13): glasses, landscape as the subject,
 * robots and mecha, plush toys, and snow / winter.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Tool wording is limited to official pages checked 2026-11-13.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_16_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'glasses-prompt-guide': {
    sections: [
      {
        title: '眼鏡は顔の上の部品として書く',
        content: `「眼鏡 プロンプト」「メガネ プロンプト」で探しているのは、フレームの形、レンズの見え方、かけ方の仕草です。検索では、種類、ずれた眼鏡、ぐるぐる眼鏡、リムレス、片眼鏡、アンダーリム、赤縁、光る眼鏡、曇った眼鏡、割れた眼鏡、ゴーグルが一緒に出ます。丸、四角、ハーフリム、キャットアイ、サングラス、手で直す、押し上げる、外す、反射で目が消える、そもそも眼鏡が出ない、も同じ失敗の仲間です。

このページは、顔の上に乗せる部品を担当します。ネックレスや指輪の素材は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。光がどちらから来るかは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。指が溶けるときの手の語は [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。眼鏡そのものを商品として置く枚には人数を書きません。服はブラウス、カーディガン、シャツ、スラックス、コートのように閉じた日常着です。実在の人物、作品名、作者名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。表で自然な英語と書いた語は、公式タグとしては断定しません。効かなければ、近い短い語に一つだけ入れ替えます。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みを使うときは目安です。\`(glasses:1.2)\` のように、1.1 から 1.3 のあいだで少しだけ上げます。括弧を文字として残す必要があるモデルでは \`\\(glasses:1.2\\)\` と書きます。NovelAI の強調は \`{glasses}\` と \`[glasses]\` で、この丸括弧とは別です。記号の意味は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。上げても眼鏡が増えないときは、語を人数の直後へ移してから、重みは戻してください。

比較は、顔と服と背景を固定して、眼鏡の語だけを差し替えます。無地の背景でフレームの線が見えてから、街や室内を足してください。模様の背景に細いフレームを乗せると、縁が模様に溶けます。一枚につき、形を一つ、レンズの効果を一つ、仕草を一つまでです。三つを同時に強くすると、どれが効いたのかが残りません。`,
      },
      {
        title: 'フレームの種類',
        content: `形は、レンズの輪郭と、縁がどこに残るかで分けます。色は、輪郭が三枚同じに見えてから一つ足します。色を先に強くすると、赤い面だけが残って、縁の上下が分からなくなります。

| 検索の言葉 | 書き方 | 見え方 |
|---|---|---|
| 眼鏡、メガネ | \`glasses\` | 最初の一手。形は平均になりやすい |
| 丸眼鏡 | \`round eyewear\` | 円に近いレンズ |
| 四角、スクエア | \`rectangular eyewear\` | 角のあるレンズ。square glasses は自然な英語 |
| 黒縁 | black-framed eyewear | 自然な英語。縁が太いときに足す |
| リムレス、フチなし | \`rimless eyewear\` | 全周の縁が薄い。消えやすい |
| ハーフリム | \`semi-rimless eyewear\` | 縁の一部だけ。上下は揺れやすい |
| アンダーリム | \`under-rim eyewear\` | 下側に縁が残る |
| 上縁 | \`over-rim eyewear\` | 上側に縁が残る |
| 赤縁 | red-framed glasses | 自然な英語。色は一つ |
| キャットアイ | cat-eye glasses | 自然な英語。目尻側が上がる |
| べっ甲 | tortoiseshell glasses | 自然な英語。まだらの縁 |
| 細い、太い | thin frames, thick frames | 自然な英語。太さは一つ |
| 金属 | metal frames | 自然な英語。素材は一つ |

ハーフリムは、\`semi-rimless eyewear\` だけでは上に残るか下に残るかが割れます。下に残したいときは \`under-rim eyewear\` を一つ足し、上に残したいときは \`over-rim eyewear\` を一つ足します。両方を同じ強さにすると、また全周の縁に戻ります。

**丸眼鏡、大人の肖像**

\`\`\`
1 adult woman, adult, round eyewear, black hair,
white blouse, cardigan, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyewear, extra glasses, no glasses
\`\`\`

**フチなしは少しだけ強く**

\`\`\`
1 adult man, adult, (rimless eyewear:1.2), clear lenses,
shirt, necktie, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
thick frames, asymmetrical eyewear, extra glasses
\`\`\`

フチなしが普通の黒縁に戻るときは、\`rimless eyewear\` を人数の直後へ移し、色の語を一度消します。縁が消えてから、金属か透明かを一つ戻してください。赤縁が顔の色まで染めるときは、赤の語をフレームの直後に残し、服の色は別の色にします。服も赤だと、どこまでが縁かが残りません。

ぐるぐる眼鏡は、厚いレンズの \`coke-bottle glasses\` か、渦の模様の swirly glasses です。後者は自然な英語です。公式タグとしては断定しません。両方を同じ強さにすると、レンズが平均の曇りになります。渦にしたい枚では目の色を書かず、口の表情で顔を作ります。目を見せたい枚では、渦の語を消してください。

キャットアイと丸を同時に強くすると、目尻だけが尖った中間の形になります。形は一つです。べっ甲はまだらの色なので、赤や黒と重ねません。まだらが平均の茶色になったら、tortoiseshell glasses を外して、黒か金属かに戻します。`,
      },
      {
        title: 'レンズの反射・曇り・色',
        content: `「光る眼鏡」の検索は、フレームが発光することより、レンズに光が映ることを指すことが多いです。反射はレンズの表面、発光は物が光っている状態です。フレーム自体を \`glowing\` にすると、顔や目まで光ることがあります。光らせたいのがレンズの映り込みなら、反射の語を先に書いてください。光そのものの向きは照明のページです。

| 検索の言葉 | 書き方 | 注意 |
|---|---|---|
| 反射 | lens reflection | 自然な英語。目が消えたら弱める |
| ぎらつき | glare on lenses | 自然な英語。強いと瞳が無い |
| 色付き | tinted lenses | 自然な英語。薄い色を一つ |
| 透明 | clear lenses | 自然な英語。フチなしと一緒に |
| 目が隠れる | opaque glasses | 自然な英語。表情は口で作る |
| 曇り | fogged glasses | 自然な英語。温度差の曇り |
| ひび | cracked lens | 自然な英語。小さなひび一つ |
| 目が見える | eyes visible through glasses | 自然な英語。反射が勝ったとき |

曇りは、室内と屋外の温度差でレンズが白くなった状態です。湯気の部屋や、服が濡れる描写にはしません。ひびは、レンズの小さな亀裂です。顔の傷や、血の描写にはしません。ひびを画面いっぱいにすると、フレームの形より破片が主題になります。

**反射は弱く、目は残す**

\`\`\`
1 adult woman, adult, rectangular eyewear,
light lens reflection, eyes visible through glasses,
white blouse, upper body, soft window light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
opaque glasses, excessive glow, extra glasses
\`\`\`

**薄い色付き。目は読める**

\`\`\`
1 adult man, adult, round eyewear, lightly tinted lenses,
shirt, cardigan, upper body,
soft daylight, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
sunglasses, opaque glasses, extra glasses
\`\`\`

反射で瞳の色が消えたときは、反射の語を外して色を確定し、あとから弱い反射を戻します。戻したときにまた消えるなら、その枚は反射なしを正とします。不透明なレンズは、目を隠すと決めた枚だけです。隠す枚と、見せる枚を一つのプロンプトに混ぜないでください。

曇りを足すときは、フレームの形が先に安定している必要があります。形が揺れている枚に曇りを足すと、白い汚れと縁の区別が消えます。ひびも同じです。形が三枚揃ってから、cracked lens を一つだけ足します。ひびの本数は書きません。本数を書くと、文字や余計な線が増えます。`,
      },
      {
        title: '直す・押し上げる・外す',
        content: `かけている状態と、手で触っている状態は別の絵です。\`glasses\` は顔の上です。手に持っているのか、鼻の上にあるのかを、同じ強さで両方書くと、顔と手の両方に眼鏡が出ます。

| 仕草 | 書き方 | 手 |
|---|---|---|
| 直す | \`adjusting eyewear\` | 片手。指先がフレームに触れる |
| 押し上げる | pushing glasses up | 自然な英語。人差し指は一つ |
| 上から見る | looking over glasses | 自然な英語。目はレンズの上 |
| ずれる | glasses on tip of nose | 自然な英語。鼻先まで下がる |
| 外す | removing glasses | 自然な英語。かけたままに戻しやすい |
| 手に持つ | glasses in one hand | 自然な英語。顔の上には無い |

ずれた眼鏡は、位置と目の両方を書かないと、普通の位置に戻ります。鼻先まで下げる語と、レンズの上から見る語を、セットで一つずつです。頭を少し下げる語を足すと、上目遣いになりやすいです。強くしすぎると、首が折れます。角度は一つにしてください。

**片手で直す**

\`\`\`
1 adult woman, adult, glasses, adjusting eyewear,
one hand, white blouse, cardigan, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra hands, extra fingers, extra glasses
\`\`\`

**鼻先までずれて、上から見る**

\`\`\`
1 adult man, adult, rectangular eyewear,
glasses on tip of nose, looking over glasses,
shirt, cardigan, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra glasses, asymmetrical eyewear, extra hands
\`\`\`

手が二本になるときは、\`adjusting eyewear\` を残して、もう一方の手の動作を消します。物を持たせたまま眼鏡を直すと、指が両方の仕事をしようとして増えます。直す枚では、カップも本も外してください。指の崩れが残るときは、手のガイドへ進み、このページでは仕草を一つに戻します。

外す枚で顔に眼鏡が残るときは、removing glasses を人数の直後へ移し、\`glasses\` だけの行は消します。\`glasses\` が正向に残っていると、外したあとも顔の上に戻ります。手の中の眼鏡と、顔の上の眼鏡は、ファイルを分けて保存してください。`,
      },
      {
        title: 'サングラス・ゴーグル・片眼鏡',
        content: `サングラス、ゴーグル、片眼鏡は、両目の日常の眼鏡とは別の部品です。同じ顔に二つ乗せる枚は作りません。

サングラスは \`sunglasses\` です。レンズが暗く、目が隠れます。表情を読ませたいときは使いません。薄い色で目を残すなら、前の節の tinted lenses に戻してください。暗いレンズの枚は、口元の \`smile\` か \`serious\` を一つにして、目の色は書きません。

ゴーグルは \`goggles\` です。水中の場面や、体に張り付く描写にはしません。額に上げた状態か、単体の商品写真にします。額に上げるなら goggles on forehead と自然な英語です。公式タグとしては断定しません。顔にかけたままにすると、眼鏡とゴーグルが重なります。

片眼鏡は \`monocle\` です。片目だけです。鎖を足すなら monocle chain と自然な英語で一つです。両方の目にレンズを書くと、普通の眼鏡に戻ります。左右の指定を強くしすぎると、もう片方の目までレンズが付くことがあります。

**サングラス。目は隠れる前提**

\`\`\`
1 adult woman, adult, sunglasses, dark lenses,
black hair, long coat, shirt, upper body,
simple background, soft daylight, slight smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra glasses, clear lenses, asymmetrical eyewear
\`\`\`

**片眼鏡、大人のジャケット**

\`\`\`
1 adult man, adult, monocle, suit jacket, shirt, necktie,
upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
glasses, sunglasses, extra eyewear
\`\`\`

**ゴーグルは額。水中にはしない**

\`\`\`
1 adult woman, adult, goggles on forehead, knit hat, coat, scarf,
upper body, outdoors, overcast, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
glasses, extra eyewear
\`\`\`

ゴーグルだけの商品写真にするときは、人数の行を消します。人のタグが残った商品は、端に顔が出ます。片眼鏡の鎖が顔の線に溶けるときは、鎖を外してレンズだけを確定し、鎖はあとから戻します。戻しても鎖が描かれないモデルはあります。そのときは鎖なしを正としてください。`,
      },
      {
        title: '大人の人物テンプレ',
        content: `テンプレは、人数、服、構図を固定して、眼鏡の行だけを差し替えるための起点です。髪の長さや背景を同時に変えると、フレームの差が見えません。

オフィス寄りのシャツ、休日のカーディガン、外出のコート、の三つを別ファイルにします。三つを一つの欄に貼ると、襟が平均になります。背景は無地から始めて、フレームが見えてから場所を一つ足します。場所の名詞そのものは [背景プロンプト](/guides/background-prompt-guide) です。このページでは、眼鏡が場所に負けないかを見ます。

**休日、丸眼鏡**

\`\`\`
1 adult woman, adult, round eyewear, black hair, long hair,
white blouse, long cardigan, long skirt,
upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyewear, extra glasses
\`\`\`

**外出、四角い縁**

\`\`\`
1 adult man, adult, rectangular eyewear, short hair,
long coat, shirt, trousers,
standing, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyewear, extra glasses, cropped
\`\`\`

全身にすると眼鏡が小さくなり、縁が顔に溶けやすくなります。形の確認は胸から上で行い、全身は服が決まってからにしてください。全身の枚で縁が消えたら、構図を戻すのが先で、重みを上げるのはその次です。

二人とも眼鏡、にはしません。\`2 adults\` で両方に \`glasses\` を書くと、顔のあいだに三本目の縁が出ることがあります。二人の位置は [二人構図](/guides/two-person-composition-prompt-guide) で決めてから、眼鏡は一人だけに戻してください。今日の比較は一人です。`,
      },
      {
        title: '出ない、顔に溶ける',
        content: `眼鏡が出ないときと、顔の線に溶けるときは、原因が違います。出ないのは、語が後ろへ押されているか、矛盾する語が残っているときです。溶けるのは、縁が細いか、顔が小さいか、反射が強いときです。

まず \`no glasses\` や、眼鏡を消す意味の語が正向に残っていないかを見ます。残っていたら消します。次に \`glasses\` か、表の形の語を人数の直後へ移します。それでも無いときは、目安の範囲で \`(glasses:1.2)\` を一つだけ試します。1.3 を超えて足しても、縁が増えるより顔の形が先に崩れやすいです。モデルの配布ページに推奨値があれば、それを優先してください。

左右で形が違うときは、正面の \`upper body\` に戻し、横顔や極端な角度を外します。角度の一覧は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。非対称を足したいのでなければ、ネガティブに asymmetrical eyewear を残します。ネガティブを長くしても、正向の矛盾は消えません。

顔が小さい全身で縁が肌の線になるときは、胸から上に戻してから直します。それでもフレームだけが悪いときは、[ADetailerの使い方](/guides/adetailer-face-fix-guide) です。README の説明に沿って、顔を検出してその範囲を inpaint する手順は、そちらのページにまとめてあります。ADetailer の欄には眼鏡の語を一つだけ足し、服や背景は繰り返しません。初期値の数値はこのページでは写しません。マスクを自分で塗る inpaint は [img2imgの使い方](/guides/img2img-guide) です。縁のまわりを小さく塗って、顔全体を塗り直す前に一枚見てください。

**形を前に出した起点**

\`\`\`
1 adult woman, adult, (glasses:1.2), round eyewear,
black hair, white blouse, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyewear, extra glasses, deformed face
\`\`\`

直す順番は、矛盾する語を消す、語を前へ移す、重みを目安の範囲で一つ、構図を近づける、顔の範囲だけを描き直す、です。LoRA で形を寄せる場合も、ファイル名と推奨の強さはモデルの配布ページを見てください。このページでは特定のファイルを指名しません。配布ページの値と、プロンプトの重みを同じ日に両方動かさないでください。どちらが効いたのかが残りません。`,
      },
      {
        title: '自然文で頼むとき',
        content: `ChatGPT、Gemini、FLUX 系は、タグの列より文が通ることが多いです。文でも、人数、形、レンズ、仕草、服、背景の順は崩しません。避けたいものは文の中に書きます。負向の専用欄が無い場合があります。

2026年11月時点の書き方です。画面の名前はバージョンによって違うことがあります。ボタンの位置をこのページでは断定しません。文章で指示できる、ということだけを使います。

**自然文、丸眼鏡**

\`\`\`
1 adult woman, adult, with round black glasses, a white blouse, and a long cardigan.
Upper body, looking at the camera. Soft daylight, plain background.
Both lenses are clear, and the frames sit evenly on the nose.
No text. No extra glasses.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, asymmetrical eyewear, extra glasses
\`\`\`

**自然文、鼻先までずらす**

\`\`\`
1 adult man, adult, rectangular glasses slipped to the tip of the nose.
He looks over the frames. Shirt, cardigan, upper body, plain background, soft daylight.
One pair of glasses only. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, extra glasses
\`\`\`

文が長いほど、先頭の成人と形が後ろへ押されます。三文までにして、四文目を足したくなったら、タグのファイルへ戻って語を一つ消してください。通った文は、英語のタグにも翻訳して別に保存します。タグに戻すとき、丸括弧の重みは Stable Diffusion 用だけに残し、NovelAI には貼りません。

日本語で層を書いても伝わるツールはあります。形の名前が平均の黒縁に戻るときは、日本語のままにせず、\`round eyewear\` のように英語の名詞を文の中へ一つ混ぜてください。混ぜるのは一つです。形と色と仕草を全部英語にすると、またタグの列になります。`,
      },
      {
        title: '記録は形の名前で残す',
        content: `比較が終わった枚は、動かした語の名前をファイル名の先頭に残します。丸、フチなし、赤縁、反射、ずれ、のどれを今日動かしたのかが翌日の自分に分からないと、安定した文の上に別の実験が積み上がります。積み上がった文は、縁が太い理由が色なのか太さの語なのかを教えてくれません。残すのは、無地で形が読める一枚と、同じ形のまま仕草か反射かを一つ足した一枚、までです。三枚目が欲しくなったら、二枚目を別名でコピーしてから足します。上書きすると、形が安定していた行が消えます。

赤縁とキャットアイは、表の自然な英語を、形が決まった起点に一つだけ載せます。赤と、目尻が上がる形を同じ日に足すと、赤い面のどこが縁で、どこが目尻の角度なのかが残りません。色の枚では形を四角か丸かに固定し、形の枚では色を黒か金属かに固定します。べっ甲はまだらなので、赤縁のファイルには入れません。まだらが平均の茶色になった枚は捨て、黒縁の起点からやり直します。

ゴーグルと片眼鏡とサングラスは、日常の両目の眼鏡のファイルに足しません。足した瞬間に、顔の上の部品が二つになります。ゴーグルだけを商品として置く枚は、人数の行を消した別ファイルです。人のタグが一行でも残ると、額に上げたはずのゴーグルが顔の前に戻り、その下に眼鏡が生えます。片眼鏡のファイルに \`glasses\` を残しても、同じことが起きます。

**赤縁。形は四角で固定**

\`\`\`
1 adult woman, adult, rectangular eyewear, red-framed glasses,
black hair, white blouse, cardigan, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyewear, extra glasses, round eyewear
\`\`\`

**キャットアイ。色は黒で固定**

\`\`\`
1 adult man, adult, cat-eye glasses, black frames,
shirt, cardigan, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyewear, extra glasses, round eyewear
\`\`\`

手で直す枚を、この赤縁のファイルに重ねないでください。仕草の日は、昨日の文をコピーしたうえで色の語を一度外し、\`adjusting eyewear\` だけを足します。色と仕草が両方残ったまま指が増えたとき、どちらの語を外すかが決まりません。外すのは、あとから足した方です。メモが無いときは、起点の丸眼鏡まで戻して、今日の語を一つだけ載せ直します。溶ける縁の上で重みだけを上げるより、戻してから足す方が短いです。モデルの配布ページに強さの推奨があるファイルを足す日も、形の語は動かさず、ファイルの有無だけを変えてください。

反射の枚も、同じルールで枝にします。形が三枚揃ったファイルをコピーし、コピーにだけ lens reflection を弱く足します。元のファイルは、目の色を確認する戻り先です。反射を足した枚で瞳が消えたら、その枝を捨て、元のファイルから「目が見える」の語を先に書いて、反射はもっと弱くやり直します。曇りとひびも、同時には足しません。温度差の白いレンズと、小さな亀裂は、どちらも縁の線を隠します。隠れた縁を重みで太くすると、曇りやひびが顔の傷のように見えます。隠れたままにせず、効果の語を外して縁を出し直してください。

ずれた眼鏡の枝は、鼻先の語と、上から見る語をセットで足したコピーです。片方だけを残すと、普通の位置に戻るか、目だけがレンズの外に出ます。セットを崩して直したくなったら、セットごと消して、かけたままの起点に戻ります。外した眼鏡を手に持つ枚は、さらに別です。顔の上の語を消してから、片手の中、と書きます。消さずに持つを足すと、顔と手の両方に縁が出ます。今日のファイル名が、形なのか、仕草なのか、レンズの効果なのかを、生成の前に声に出して確認すると、混ぜる前に気づけます。`,
      },
    ],
    faq: [
      {
        q: '眼鏡が描かれません',
        a: '消す意味の語が正向に残っていないかを見て、glasses か形の語を人数の直後へ移します。それでも無ければ、1.1 から 1.3 の目安で重みを一つだけ足します。モデルの配布ページに推奨値があればそちらを優先してください。',
      },
      {
        q: '左右でフレームの形が違います',
        a: '正面の胸から上に戻し、横顔を外します。ネガティブに asymmetrical eyewear を残します。重みを上げる前に、形の語が二つ残っていないかを見てください。',
      },
      {
        q: '反射で目が消えます',
        a: '反射の語を外して瞳を確定し、弱い反射をあとから戻します。目を隠すと決めた枚だけ、不透明なレンズにします。見せる枚と隠す枚は混ぜません。',
      },
      {
        q: 'ずれた眼鏡が普通の位置に戻ります',
        a: '鼻先まで下げる語と、レンズの上から見る語をセットで一つずつ書きます。glasses だけが強く残っていると、標準の位置に戻ります。',
      },
      {
        q: 'フチなしが黒縁になります',
        a: 'rimless eyewear を人数の直後へ移し、色と太さの語を一度消します。縁が消えてから、金属か透明かを一つ戻してください。',
      },
      {
        q: '手で直すと指が増えます',
        a: '仕草は一つ、手は片手です。カップや本を持たせたまま直さないでください。指が残って崩れるときは、手と指のガイドへ進みます。',
      },
    ],
  },

  'landscape-prompt-guide': {
    sections: [
      {
        title: '風景は主題、背景は人物のうしろ',
        content: `「風景 プロンプト」「画像生成ai 風景 プロンプト」で探しているのは、景色そのものを主題にした絵です。検索では、ファンタジー風景、田園風景、日常の風景、撮影したような風景が一緒に出ます。山、海、森、空、夕日、星空、オーロラ、里山、都市、夜景、季節、天候、時間帯、ワイドやパノラマや俯瞰、絵画か写真か、も同じ依頼の中に入ります。

このページは、人を置かなくても成立する景色を担当します。人物のうしろに場所を付ける書き方は [背景プロンプト](/guides/background-prompt-guide) です。役割は一行で分けます。背景のページはキャラクターのうしろ、このページは風景が主役です。光の向きと影は [光・照明のプロンプト一覧](/guides/lighting-prompt-guide)、塗りの媒体は [画風プロンプト](/guides/art-style-prompt-guide)、レンズの距離は [カメラのプロンプト](/guides/camera-lens-prompt-guide) です。冬の雪を主題にするときは [雪・冬のプロンプト](/guides/snow-winter-prompt-guide) に細かい降り方を任せ、このページでは景色の種類を一つ選ぶところまでです。

人は書きません。人数のタグを残した風景は、端に顔が出ます。動物を主題にする枚と、景色だけの枚はファイルを分けます。実在の観光地の固有名、作品名、作者名は書きません。欲しいのは、山か海か、昼か夜か、絵の具か写真か、です。

2026年11月時点の書き方です。モデルによって、同じ語でも人が混ざりやすいことがあります。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。

一枚につき、場所を一つ、時間を一つ、天候を一つ、画風を一つです。山と街と海を同じ強さにすると、地平線が三本になります。比較は、画風と縦横を固定して、場所の名詞だけを差し替えます。

重みを使うなら目安は 1.1 から 1.3 です。\`(mountain:1.2)\` のように一つだけ上げます。文字として残すときは \`\\(mountain:1.2\\)\` です。NovelAI の強調は \`{mountain}\` と \`[mountain]\` なので、丸括弧は貼り替えません。横長は、文末のパラメータ \`--ar\` で指定できるツールがあります。眼鏡の肖像用の縦構図を、このページのワイドに流用しないでください。`,
      },
      {
        title: '自然の景色',
        content: `自然は、主役の地形を一つにします。空は地形に付属する層で、空だけを強くすると地面が細くなります。星空やオーロラは夜の空が主役なので、その枚では山をシルエットに下げます。

| 景色 | 書き方 | 一緒に一つ |
|---|---|---|
| 山 | \`mountain\` | 連なりなら mountain range。自然な英語 |
| 海 | \`ocean\` | 海岸なら coast。自然な英語 |
| 森 | \`forest\` | 針葉なら pine forest。自然な英語 |
| 空 | \`sky\` | 雲は一つ。積雲か層雲か |
| 夕日 | \`sunset\` | 空の色は一つ |
| 星空 | starry sky | 自然な英語。夜とセット |
| オーロラ | \`aurora\` | 夜。色は緑か青の一方 |

海に山を足す枚は、どちらが地平線の主役かを先に決めます。主役が海なら、山は遠いシルエットの一語だけです。主役が山なら、海は書きません。両方を同じ強さにすると、水が山の中腹まで上がることがあります。

**朝の海岸。人なし**

\`\`\`
quiet coastline at morning, low clouds, pale blue ocean,
dry rocks, soft sunlight, landscape photo, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, watermark
\`\`\`

岩は乾いた岩として書きます。光と空で朝を作ります。服や体の状態を連想させる語は、風景の行に入れません。

**針葉樹の森と霧**

\`\`\`
pine forest, narrow path, light fog, soft light rays,
muted green, overcast, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, oversaturated
\`\`\`

**星空と、低い山のシルエット**

\`\`\`
starry sky, night, low mountain silhouette,
deep blue, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, daylight
\`\`\`

夕日が白飛びするときは、太陽そのものを画面の中央に置かず、空の色と長い影で夕方を作ります。太陽の円を強く書くと、空の半分が白い円になります。オーロラは色を一つにしてください。緑と赤と紫を同じ強さにすると、空が平均の蛍光色になります。森の枚で空を広くしたいときは、木を前景の枠にして、空は木のあいだから見せます。空の語を木より前に置くと、木が低くなります。`,
      },
      {
        title: '田園と里山',
        content: `田園と里山は、日本の田舎の景色として書きます。作品の背景美術の名前では呼びません。田、低い山、雑木、小さな家、のどれが主役かを一つ決めます。四つを同じ強さにすると、観光ポスターの平均になります。

田は rice paddies と自然な英語です。公式タグとしては断定しません。水を張った田と、稲が育った田は別です。水面の反射が欲しい枚では、稲の密度を書かず、空の反射を一つ書きます。稲穂が欲しい枚では、水面の語を消します。両方を強くすると、稲が水面に沈みます。

里山は、低い山と、人の手の入った林と、小さな集落の組み合わせです。satoyama landscape と自然な英語で一つ書き、部品は二つまで足します。木、道、家、を三つとも詳しく書くと、家が森に飲み込まれます。

**水を張った田と、遠い山**

\`\`\`
rice paddies with still water, distant low mountains,
soft morning light, pale sky, countryside landscape,
no people, no text, no signs
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, skyscraper
\`\`\`

**里山の道。家は一つ**

\`\`\`
satoyama landscape, dirt path, mixed trees,
one small wooden house, late afternoon, soft light,
landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, modern city
\`\`\`

電柱や看板を足すと、文字が崩れて出ます。日常の風景にしたいときも、文字のある看板は書きません。道しるべが欲しければ、形だけの木の杭にして、文字はネガティブの text に残します。季節を変えるときは、田の状態か、木の色かを一つだけ変えます。春の花と、秋の紅葉と、雪を同時に書くと、季節が平均になります。雪の細かい指定は雪と冬のページです。`,
      },
      {
        title: '街と夜景',
        content: `都市と夜景は、建物の密度で巨大さを作ります。人が主題ではないので、窓の明かりと街路の光で夜を説明します。人物の群衆は [モブ・群衆のプロンプト](/guides/mob-crowd-prompt-guide) です。このページの夜景に通行人を足すと、顔が窓の灯より前に出ます。

昼の街は \`cityscape\`、高い建物は \`skyscraper\`、夜は \`night\` と city lights を自然な英語で足します。夜景の語を昼の空と一緒にすると、空が半分だけ暗くなります。時間は一つです。

| 街 | 書き方 | 光 |
|---|---|---|
| 昼の都市 | \`cityscape\` | 晴天か曇りか一つ |
| 高い建物 | \`skyscraper\` | 建物は群か、一本か |
| 夜景 | \`night\`, city lights | 自然な英語。窓の灯 |
| 川辺の夜 | river, city lights | 水面の反射は一つ |
| 住宅地 | residential street | 自然な英語。看板の文字は書かない |
| 路地 | \`alley\` | 昼か夜かを先に決める |

**川に映る夜景。人なし**

\`\`\`
night cityscape, river in the foreground, city lights,
reflections on water, deep blue sky, wide view,
no people, no readable text, no signs
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, daylight, watermark
\`\`\`

**曇りの住宅地**

\`\`\`
quiet residential street, two-story houses, overcast sky,
utility poles without letters, daytime, soft light,
landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, night
\`\`\`

ネオンの看板を書くと、存在しない店名が崩れます。夜の色が欲しければ、窓と街灯の色を一つずつにして、看板の単語は書きません。雨の路面に反射が欲しいときは、雨を弱く一つ足し、服や体の描写は入れません。このページには人がいないので、反射は地面と水面だけです。反射を強くすると、建物の形が鏡の中で二重になります。二重になったら、反射の語を外して建物を確定し、あとから弱く戻します。`,
      },
      {
        title: 'ファンタジーの風景',
        content: `ファンタジー風景は、現実に無い要素を一つだけ足します。浮島、光る結晶、空に続く階段、のどれか一つです。三つを同じ強さにすると、どれも中途半端な岩になります。作品名や、既存の地図の名前は書きません。

スケールは、雲より高い、地平線まで続く、のように比較で書きます。数値の高さは書きません。数値はモデルによって文字として出ることがあります。光は、結晶が光るのか、空が光るのかを一つにしてください。粒子を足すなら [エフェクトのプロンプト](/guides/effect-prompt-guide) の粒子を一つだけ借り、魔法陣や文字は入れません。

| 非日常の一つ | 書き方 | 現実側に残すもの |
|---|---|---|
| 浮島 | floating islands | 自然な英語。雲海を一つ |
| 結晶の森 | crystal trees | 自然な英語。色は一つ |
| 空の階段 | stone stairs into the sky | 自然な英語。階段は一本 |
| 遠い遺跡 | distant stone ruins | 自然な英語。文字は刻まない |

**雲海の浮島**

\`\`\`
floating islands above a sea of clouds, waterfalls off the edges,
soft morning light, vast sky, fantasy landscape,
no people, no letters, no creatures in the foreground
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, modern city
\`\`\`

**青い結晶の森**

\`\`\`
forest of tall crystal trees, one shade of blue,
soft mist, night, faint starlight, fantasy landscape,
no people, no text, no ruins
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, daylight
\`\`\`

生物を前景に置くと、風景ではなくcreatureの肖像になります。空の遠くに影を一つ、までにして、種類の名前は書きません。名前を書くと、その生物の顔が画面の前に出ます。遺跡に文字や紋様を詳しく書くと、崩れた文字が壁を埋めます。形は石の門一つ、で足ります。

ファンタジーと写真を同じ強さにすると、結晶がプラスチックの商品に見えます。この節は絵画か、ファンタジーのイラストかに寄せ、写真の語は外します。写真にしたい自然は、前の節へ戻してください。`,
      },
      {
        title: '季節・天候・時間',
        content: `季節、天候、時間は、光の色を変える層です。場所が決まる前にこの層を足すと、山の形より空の色が勝ちます。場所が三枚安定してから、一つだけ変えてください。

| 層 | 書き方 | 衝突 |
|---|---|---|
| 春 | spring, fresh green | 自然な英語。雪と同時に強くしない |
| 夏 | summer, clear sky | 自然な英語。紅葉と同時にしない |
| 秋 | autumn, colored leaves | 自然な英語。葉の色は一つ |
| 冬 | \`winter\`, \`snow\` | 細部は雪と冬のページ |
| 霧 | \`fog\` | 前景の輪郭は残す |
| 曇り | \`overcast\` | 影が柔らかい |
| 雨 | distant rain | 自然な英語。人の服は書かない |
| 朝 | \`sunrise\` | 夕日と同時にしない |
| 夕方 | \`sunset\` | 太陽の円を中央に置かない |
| 夜 | \`night\` | 昼の雲を残さない |

**霧の朝の湖**

\`\`\`
calm lake at sunrise, thin fog, pale gold light,
far shore, pine trees, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, night, snow
\`\`\`

**紅葉は色を一つ**

\`\`\`
autumn valley, maple trees in one red tone,
overcast, soft light, path, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, snow, cherry blossoms
\`\`\`

霧を強くすると、主役の岸まで消えます。消えた輪郭を発光で取り戻さないでください。霧の語を弱い \`mist\` に戻します。雨は遠い層にして、画面の手前を雨粒で埋めないでください。手前の粒が欲しいときは、それだけで一枚にし、地形の語は後ろへ下げます。

時間を変える実験では、場所の名詞を固定します。同じ湖で、朝と夕方の二枚を見ます。両方の語が残った枚は比較に使いません。季節の花を足すときも、花の種類は一つです。桜と紅葉と雪は、三つのファイルです。`,
      },
      {
        title: '構図と縦横',
        content: `風景の構図は、どこから見るかと、地平線をどこに置くかです。ワイド、パノラマ、俯瞰、低い視点、を一度に強くすると、また普通の正面に戻ります。

| 見方 | 書き方 | 向き |
|---|---|---|
| 引き | \`wide shot\` | 横長と相性が良い |
| パノラマ | panoramic view | 自然な英語。地平線が長い |
| 俯瞰 | aerial view | 自然な英語。鳥の視点 |
| 地平線を低く | low horizon | 自然な英語。空が広い |
| 地平線を高く | high horizon | 自然な英語。地面が広い |
| 前景の枠 | foreground frame | 自然な英語。木や岩を一つ |

地平線は一本です。山の稜線と海の線を両方強くすると、画面の中央で折れます。空を主役にする枚は low horizon、地面の模様を主役にする枚は high horizon、と決めてから生成します。

Midjourney では、2026年11月時点の公式 Parameter List で、\`--ar\` または \`--aspect\` が縦横です。ダッシュの前に空白を入れます。バージョンによって仕様が違うことがあります。一覧は <a href="https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Parameter List</a> です。Stable Diffusion にはこのパラメータを貼らないでください。縦横は、使っている画面のサイズで指定します。

**俯瞰の海岸**

\`\`\`
aerial view of a rocky coastline, ocean, low clouds,
soft daylight, wide shot, landscape photo,
no people, no text, no boats with names
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, portrait
\`\`\`

**空が広い、地平線は低い**

\`\`\`
low horizon, vast sky, distant hills, late afternoon,
pale clouds, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, close-up
\`\`\`

**横長のパラメータ例**

\`\`\`
wide shot, calm lake, distant mountains, overcast,
landscape photo, no people, no text --ar 16:9 --no people, text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text
\`\`\`

俯瞰で建物の窓に顔が出るときは、人の語がどこかに残っています。正向から人を消し、ネガティブの person を残したまま再生成します。船や車を足すと、文字と人が戻りやすいです。スケールが欲しければ、木や岩の大きさで比較し、人のシルエットは使いません。`,
      },
      {
        title: '絵画か写真か',
        content: `画風は一つです。写真と油彩と水彩を同じ強さにすると、空の半分だけが筆のタッチになります。媒体の一覧は画風のページです。このページでは、同じ景色のまま媒体だけを入れ替えます。

写真は landscape photo、\`photorealistic\` です。油彩は oil painting と自然な英語、水彩は \`watercolor\`、絵の具のタッチを弱く残すなら painterly と自然な英語です。公式タグとしては断定しません。作者の名前では指定しません。

| 媒体 | 書き方 | 外すもの |
|---|---|---|
| 写真 | landscape photo | 筆のタッチ |
| 油彩 | oil painting | 自然な英語。写真の語 |
| 水彩 | \`watercolor\` | 厚い塗料の語 |
| タッチを残す | painterly landscape | 自然な英語。一つだけ |

**同じ湖を油彩で**

\`\`\`
oil painting of a calm lake, distant hills, muted blue and green,
visible brush texture, soft light, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, photorealistic
\`\`\`

**自然文。写真の朝**

\`\`\`
A quiet lake in the morning, thin fog, pale light, and a far shore of pine trees.
Landscape photograph. No people. No text. No letters.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, person, people, text
\`\`\`

写真の枚に筆の語が残ると、空がまだらになります。油彩の枚に \`photorealistic\` が残ると、筆が消えて平均の写真に戻ります。媒体を変える日は、場所と時間を固定し、媒体の語だけを差し替えてください。

FLUX 系や、文で受けるツールでは、上の自然文を起点にします。タグの列をそのまま貼って空が単語の羅列になるときは、文に戻してください。文を長くして場所を三つ足さないでください。場所は一つ、というルールは文でも同じです。通った文は、タグのファイルにも翻訳して、次に Stable Diffusion へ戻れるようにします。`,
      },
      {
        title: '崩れた層は空の見本へ戻す',
        content: `風景が崩れたときは、足した層を一つ外します。外しても直らないときは、そのファイルを捨て、場所だけの見本から書き直します。混ざった名詞が残った文から引き算しても、海と街と結晶が同じ行に残ります。残った名詞が次の層より前に出ると、また地平線が割れます。

見本は種類ごとに三つだけ持っておきます。自然は朝の海岸か、霧の森か、星空の山のどれか一つです。田園は水を張った田です。夜景は川に映る灯です。ファンタジーは浮島です。今日開く見本は一つで、ほかの見本の語を貼りません。貼ったあとに「どちらも少し残っている」と感じたら、それは平均です。平均の枚は保存しません。

オーロラは夜の空が主役です。山はシルエットに下げ、色は緑か青の一方にします。星空のファイルにオーロラを足すと、星とカーテン状の光が同じ空で平均になります。オーロラの日は、星の語を消してから色を一つ足してください。

**緑のオーロラ。山はシルエット**

\`\`\`
aurora, green light, night, low mountain silhouette,
dark foreground, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, daylight, cityscape
\`\`\`

**田の見本に、季節は足さない**

\`\`\`
rice paddies with still water, distant low mountains,
soft overcast, countryside landscape, no people, no text, no flowers
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, snow, cherry blossoms, skyscraper
\`\`\`

人のシルエットでスケールを出したくなったときは、このページの仕事をいったん閉じます。人物のうしろに風景を付けるなら背景のページ、雪の量を主題にするなら雪と冬のページ、光の向きだけを変えるなら照明のページです。三つのページの表を同じ日に結合すると、人数のタグが風景のファイルへ戻り、端に顔が出ます。戻った顔を消すために負向を長くする前に、正向の人の語が無いかを見てください。

ツールを替えた日も、見本の場所は変えません。海岸の文をタグにしたものと、文のままのもので出します。岩の数や空の色を同時に変えないでください。色を変えると、ツールが人を消したのか、色の指定が空を変えたのかが分かりません。パラメータを足すときも、\`--ar\` だけを足して、場所の名詞は固定です。

空が白いだけの失敗は、雪や霧の量の問題ではなく、濃い色が画面に無い問題であることが多いです。森なら手前の幹、海なら岩、町なら屋根の影、を一つ残します。残した濃い色の名前を、ファイル名の端に書いておくと、次に白く飛んだときに何を戻すかが決まります。発光の語で白を取り戻そうとすると、空も地面も同じ明るさになります。明るさを上げる前に、濃い色が正向に残っているかを見てください。

ファンタジーの見本に、現実の看板や車を足さないでください。足すと、浮島の下に現代の街が広がり、非日常の一つがただの丘になります。現実の夜景が欲しい日は、夜景の見本を開き、浮島のファイルは閉じます。田園の見本に高層の建物を足したときも同じです。里山が平均の郊外になる前に、足した建物の語を消します。季節を変える実験は、見本をコピーして、花か紅葉か雪かを一つだけ載せる枝で行います。三つの季節が一行に残った枚は、どの季節の見本にも戻さず、捨てます。

横長にしたときに空だけが伸び、地面の主役が細くなったら、\`wide shot\` を残したまま地平線の語を見直します。空が主役なら low horizon のまま、地面が主役なら high horizon に一つ入れ替えます。両方を残すと、地平線が画面の中央で折れます。折れた枚は、縦横のパラメータを疑う前に、地平線の語が二つ無いかを見てください。

前景の枠にする木や岩は、一つだけにします。左右に違う木を詳しく書くと、枠が主題になり、奥の湖が細くなります。枠はシルエットで足り、葉の種類や岩の亀裂は書きません。書き始めたら、その枚は前景の勉強として別に保存し、景色の見本には戻しません。見本に戻してよいのは、場所、時間、天候、媒体、見方、のうち今日動かした一つだけです。二つ動いた枚は、どちらが空の色を変えたのかを説明できないので、比較の列に置きません。`,
      },
    ],
    faq: [
      {
        q: '背景のページとどう違いますか',
        a: '背景のページは、人物のうしろの場所です。このページは、風景そのものが主題で、人を置かなくても成立する景色です。人数のタグを残すと、端に顔が出ます。',
      },
      {
        q: '人が端に出ます',
        a: '正向から人の語を消し、ネガティブに person, people を残します。船や車や看板を足すと人が戻りやすいので、スケールは岩や木で作ります。',
      },
      {
        q: '夜景が真っ黒になります',
        a: '夜と、窓か街灯の光を一つセットにします。昼の雲の語が残っていると空が割れます。看板の単語は書かず、光の色だけで夜を作ります。',
      },
      {
        q: 'ファンタジーが普通の山になります',
        a: '非日常の要素を一つだけ、場所の直後に置きます。浮島と結晶と遺跡を同時に強くすると、どれもただの岩になります。写真の語は外してください。',
      },
      {
        q: '横長になりません',
        a: 'wide shot を景色の直後に置きます。Midjourney では文末の --ar を空白のあとに置きます。Stable Diffusion ではパラメータではなく、画面のサイズで縦横を指定します。',
      },
      {
        q: '写真と絵画が混ざります',
        a: '媒体は一つです。入れ替える日は、場所と時間を固定して、媒体の語だけを差し替えます。両方を残した枚は比較に使いません。',
      },
    ],
  },

  'robot-mecha-prompt-guide': {
    sections: [
      {
        title: 'ロボットは部品から書く',
        content: `「ロボット プロンプト」「メカ プロンプト」で探しているのは、人型、巨大な機体、関節、目、アーム、ダンス、コックピット、壊れた機体の書き方です。検索のメカは、ロボットの装甲と関節を指すことが多いです。このページは、その部品をオリジナルの形として書きます。

作品名、機体名、作者名は書きません。既存のロボットに似せる依頼もしません。色、頭の形、肩の形、脚の数を自分の言葉で書いてください。似たシルエットが欲しくても、固有名を足すと、その作品の顔が戻ります。

人の顔と体に近いアンドロイドは、成人の見た目で、服を着た状態にします。\`adult\` を残します。人の顔が無い機械だけの機体には人数を書きません。パイロットを乗せるときだけ、\`1 adult man\` か \`1 adult woman\` を書きます。服はジャケット、シャツ、スラックスのように閉じた仕事着です。

装甲の考え方は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) の金属部品に近く、塗りの切り替えは [画風プロンプト](/guides/art-style-prompt-guide) です。ネオンの夜の光は [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。このページは、ロボットの形を担当します。

2026年11月時点の書き方です。長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先します。重みの目安は 1.1 から 1.3 です。\`(robot:1.2)\` を一つだけ使い、文字として残すときは \`\\(robot:1.2\\)\` です。NovelAI では \`{robot}\` と \`[robot]\` が別の強調なので、丸括弧は貼りません。横長のパラメータ \`--ar\` は、巨大さを見せる枚だけで、文末に置けるツールに限って使います。

一枚につき、種類を一つ、部品の寄りを一つ、素材を一つです。人型と巨大ロボとアームの接写を同じ欄に貼ると、巨大な腕の先に人の顔が出ます。ファイルを分けてください。`,
      },
      {
        title: '人型とアンドロイド',
        content: `人型は、頭と胴と腕と脚がある機械です。アンドロイドは、そのうち顔や体の比率が人に近いものです。人に近いほど、年齢の見た目が揺れます。成人の顔、成人の身長の比率、服、を先頭に書いてください。子供の体にはしません。

顔が金属の板なら、肌の語は書きません。顔が人工の皮膚なら、成人であることと、服を着ていることを同じ行に書きます。肌と装甲を同じ強さにすると、顔の半分だけが金属になります。その日の顔は、どちらか一方です。

| 種類 | 書き方 | 人との距離 |
|---|---|---|
| 人型 | humanoid robot | 自然な英語。顔は機械 |
| アンドロイド | \`android\`, \`adult\` | 成人の見た目。服を着る |
| 頭は機械 | mechanical head | 自然な英語。肌の語は消す |
| 関節が見える | visible mechanical joints | 自然な英語。手首か膝か一つ |
| 普通の立ち姿 | \`standing\`, \`full body\` | 形の確認用 |

**服を着た成人のアンドロイド**

\`\`\`
1 adult android, adult, human-like adult face, clothed,
shirt, trousers, long coat, mechanical joints at the wrists,
glowing eyes, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra faces, skin and metal mixed
\`\`\`

**顔は金属の人型**

\`\`\`
humanoid robot, mechanical head, no human skin,
panel lines, metal neck, standing, full body,
plain background, soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, human face, extra arms, text
\`\`\`

アンドロイドの服が装甲に溶けるときは、服の名詞を \`adult\` の直後へ移し、装甲の語を一度消します。コートの形が三枚揃ってから、手首の関節を戻してください。関節を先に強くすると、袖が無くなります。目を光らせる語は、顔の形が決まってから一つです。先に光らせると、目の位置が平均より上にずれます。

ダンスは、小さな機体の節か、服を着た成人のアンドロイドの節か、ファイルを分けます。人型のダンスで腕を大きく回すと、関節が倍になります。最初の一手は、片腕を上げるだけにしてください。`,
      },
      {
        title: '巨大ロボットはオリジナルだけ',
        content: `巨大さは、隣の建物との比較で書きます。全高の数値は書きません。数値は画面の文字になり、機体の形より数字が残ることがあります。色は二つまで、頭の形は一つ、肩の形は一つです。固有の名前を付けたいときも、プロンプトの中では書かず、ファイル名だけに残します。

オリジナルであることは、original design と自然な英語で添えます。公式タグとしては断定しません。これで既存作品を避けきれるとは限りません。似てきたら、頭の形か配色かを一つ変えて、もう一枚出します。似たまま色だけを変えても、シルエットは残ります。

| 巨大さの材料 | 書き方 | 数 |
|---|---|---|
| 機体 | giant humanoid robot | 自然な英語。一体 |
| 比較 | buildings for scale | 自然な英語。人は置かない |
| 色 | white and gray armor | 自然な英語。二色まで |
| 頭 | narrow visor head | 自然な英語。形は一つ |
| 視点 | \`low angle\` | 見上げると大きく見える |
| オリジナル | original design | 自然な英語。固有名は書かない |

**街路で見上げる。人なし**

\`\`\`
giant humanoid robot, original design, white and gray armor,
narrow visor, panel lines, standing in a city street,
low angle, buildings for scale, no people, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, extra arms, extra heads
\`\`\`

**格納庫のキャットウォークで大きさを見る**

\`\`\`
giant robot, original design, hangar, maintenance gantry,
1 adult man, adult, work jacket, trousers, standing on a catwalk,
low angle, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, extra arms
\`\`\`

人をスケールに使う枚は、成人を一人だけにします。群衆にすると、顔が複製されます。建物だけで足りるなら、人の行は消してください。武器の名前を詳しく書くと、既存の機体に寄りやすくなります。このページの巨大ロボは、手はマニピュレータ、肩は装甲、までにします。剣や銃を足す日は、その部品だけで別の一枚にし、街のディテールは減らします。

肩の翼や角を三対足すと、頭が埋もれます。特徴は一つです。一つで巨大さが足りないときは、特徴を足す前に、視点をさらに低くしてください。`,
      },
      {
        title: '小さな機体・関節・目・アーム',
        content: `接写は、部品を一つだけ画面いっぱいにします。全身の語を残した接写は、小さい全身と、巨大な部品が同時に出ます。全身のファイルと、接写のファイルは分けてください。

小さな機体は、丸い金属の胴、短い肢、光る目、です。可愛さは、年齢の見た目ではなく、角が丸いという意味で書きます。子供の体にはしません。ダンスは、片腕を上げる、体を傾ける、の一方だけです。両方を強くすると、腕が二本ずつになります。

| 寄り | 書き方 | 全身の語 |
|---|---|---|
| 小さな機体 | small round robot | 自然な英語。人は書かない |
| ダンス | dancing, one arm raised | 自然な英語。動作は一つ |
| 目 | glowing eyes, mechanical head | 顔の板。肌は書かない |
| 関節 | mechanical joints, close-up | 自然な英語。膝か肘か一つ |
| アーム | industrial robot arm | 自然な英語。人の腕と混ぜない |

**丸い小さなロボット**

\`\`\`
small round robot, short metal limbs, glowing eyes,
standing, plain background, soft daylight, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, human face, extra arms, text
\`\`\`

**片腕を上げて踊る**

\`\`\`
small robot, dancing, one arm raised, metal joints,
simple background, full body, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, extra arms, extra legs, text
\`\`\`

**工場のアーム。人の腕ではない**

\`\`\`
industrial robot arm, metal joints, panel lines,
workshop, soft overhead light, close-up, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, hands, human skin, text
\`\`\`

目の接写で人の肌が出るときは、mechanical head を先頭に戻し、\`portrait\` の語が残っていないかを見ます。\`portrait\` は人の顔に寄りやすいです。関節の接写で指が出るときは、人の手の語を消して、ヒンジとピストンの名詞に戻します。アームの枚に \`android\` が残っていると、アームの根元に顔が付きます。種類の語は、そのファイルの先頭で一つだけにしてください。`,
      },
      {
        title: '金属・錆・パネルライン・光る目',
        content: `素材は、金属の状態を一つです。新品の光沢、錆、パネルの線、を同じ強さにすると、表面が平均の汚れになります。新品を見せる枚と、使い込んだ枚は分けます。

パネルラインは panel lines と自然な英語です。公式タグとしては断定しません。線を強くしすぎると、顔や空まで線で分割されます。線は装甲の上だけ、と書いてください。錆は \`rust\` です。錆の場所を、脚か、肩か、一つにします。全体を錆にすると、形の縁まで欠けます。

光る目は glowing eyes です。光の色は一つです。赤と青を同時に書くと、目が平均の紫になるか、左右で色が割れます。目以外を光らせたいときは、光る部品の名前を先に書きます。\`glowing\` だけだと、空や窓まで光ります。

| 表面 | 書き方 | 場所 |
|---|---|---|
| 金属 | \`metal\`, brushed metal | 自然な英語。光沢は一つ |
| 錆 | \`rust\` | 脚か肩か |
| 線 | panel lines | 自然な英語。装甲の上 |
| 目 | glowing eyes | 色は一つ |
| 傷 | light scratches | 自然な英語。文字のデカールは書かない |

**使い込んだ脚。錆は下半分**

\`\`\`
humanoid robot, original design, metal armor,
rust on the lower legs, panel lines, standing,
full body, plain background, soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, text, extra legs, gore
\`\`\`

**光る目は色を一つ**

\`\`\`
close-up, mechanical head, glowing blue eyes,
panel lines, dark background, no human skin, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, human face, text, extra eyes
\`\`\`

デカールや番号を書くと、崩れた文字が胸を埋めます。識別は、色のブロックで行い、文字はネガティブに残します。傷を足すときも、単語は書きません。線の傷が文字に見えるときは、傷の語を外して、パネルラインだけに戻してください。

サイバーパンクの夜にこの素材を置くときは、ネオンを一つだけ足します。看板の単語は書きません。夜の光の調整は照明のページ、塗りの種類は画風のページです。素材の比較が終わるまでは、ネオンを足さないでください。`,
      },
      {
        title: 'コックピットと格納庫',
        content: `コックピットは、操縦席の内部です。格納庫は、機体を置く建物です。両方を同じ強さにすると、座席が格納庫の床に置かれたまま、壁が消えません。内部の枚と、建物の枚は分けます。

パイロットを描くときは成人一人です。服はフライトジャケットとスラックスです。体に沿った全身の服や、肌の強調は書きません。計器の文字は書かせません。ランプの色と、画面の光の有無だけにします。文字を書くと、存在しない警告文が並びます。

格納庫は、機体、点検の足場、成人の整備員を一人、までです。クレーンと足場と人を全部強くすると、機体が背景になります。巨大さを見せる枚では、人は小さく、機体が画面の大半です。

**操縦席。文字は書かない**

\`\`\`
1 adult woman, adult, flight jacket, shirt, trousers,
sitting in a robot cockpit, hands on controls,
dim instrument lights, no readable text, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, extra hands, extra people
\`\`\`

**格納庫。整備員は一人**

\`\`\`
original giant robot in a hangar, panel lines,
1 adult man, adult, work jacket, trousers,
standing on a lower platform, overhead lights, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, extra people, extra arms
\`\`\`

手がコントローラーに溶けるときは、手の位置を「膝の上」に戻して、計器は背景に下げます。手のガイドへ進む前に、持つ部品を一つ減らしてください。ガラスの反射で顔が二重になるときは、反射の語を外して、室内の弱い光だけにします。反射は眼鏡のページの問題と同じで、強くすると顔の情報が消えます。

格納庫の枚で夜の街まで見えるときは、扉が開いているのか、壁が無いのかが混ざっています。内部だけを見せるなら、扉の外の語を消します。外の夜景と機体を同時に見せるなら、機体を扉の前に立たせて、室内の足場は消してください。`,
      },
      {
        title: '壊れたロボット',
        content: `壊れた表現は、機械の損傷です。凹んだ装甲、外れたパネル、見えたケーブル、光が消えた目、です。人の負傷、血、苦痛の描写にはしません。パイロットが怪我をしている絵も作りません。

損傷は一箇所です。脚の錆と、肩の欠損と、頭の亀裂を同時に強くすると、形が平均の瓦礫になります。どの部品が壊れているかを、ファイル名に書いてください。

| 壊れ方 | 書き方 | まだ残すもの |
|---|---|---|
| 凹み | dented armor | 自然な英語。シルエット |
| パネル | missing panel | 自然な英語。一枚 |
| ケーブル | exposed cables | 自然な英語。束は一つ |
| 目 | one eye dark | 自然な英語。もう片方は残す |
| 場所 | scrap yard または hangar | 地面か、整備場か |

**肩のパネルが一つ無い**

\`\`\`
damaged humanoid robot, original design,
missing panel on one shoulder, exposed cables,
dented armor, standing, hangar, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, blood, gore, text, extra arms
\`\`\`

**片側の目だけ暗い**

\`\`\`
close-up, mechanical head, one glowing eye, one eye dark,
scratched metal, dark background, no human skin, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, blood, human face, text
\`\`\`

瓦礫の山にすると、機体の輪郭が石に溶けます。壊れ方を見せたい枚では、背景を単純な格納庫か、平らな地面にしてください。煙を足すなら細く一つです。煙を強くすると、損傷の位置が見えなくなります。煙で隠れた部分を、さらに損傷の語で増やさないでください。

壊れた機体にパイロットを乗せるときは、パイロットは無事な成人として、閉じた服のまま描きます。怪我の語は、人の行にも機体の行にも足しません。人を描かないと決めたファイルに、あとから人数を足すと、瓦礫の中に顔だけ出ます。人の有無は、最初の行で決めてください。`,
      },
      {
        title: '夜の都市と自然文',
        content: `サイバーパンク寄りの夜は、ロボットの形が決まってから足す雰囲気です。ネオンを一つ、濡れた路面の反射を一つ、までにします。看板の店名、実在の都市名、作品名は書きません。光の色の調整は照明のページ、塗りは画風のページです。

形の比較が終わっていない日に夜を足すと、ネオンの色だけが残って、頭の形が平均になります。昼の無地でシルエットが三枚揃ったファイルを保存してから、夜の語を足してください。

**ネオンは一つ。人なし**

\`\`\`
humanoid robot, original design, metal armor, glowing eyes,
night city street, one neon color, reflections on the pavement,
full body, no readable signs, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, extra arms
\`\`\`

**自然文。格納庫の巨大ロボ**

\`\`\`
An original giant humanoid robot stands in a hangar for maintenance.
White and gray armor, visible panel lines, no letters and no logos.
One adult technician in a work jacket and trousers stands on a lower platform.
No other people. No readable text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, extra people, text
\`\`\`

**自然文。小さな機体**

\`\`\`
A small round robot with short metal limbs and soft glowing eyes,
standing on a plain background. No people. No text. No human face.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, person, extra arms, text
\`\`\`

文で頼むときも、固有名は入れません。「有名なロボットのように」と書くと、その作品へ寄ります。色と、頭の形と、建物との比較だけで書いてください。

ツールを替えた日は、機体の色を変えません。タグだった見本を文に翻訳するだけにして、損傷や夜を同時に足さないでください。足すと、ツールの差なのか、文章の差なのかが残りません。通った文は、タグのファイルにも戻して、関節の語が落ちていないかを確認します。`,
      },
      {
        title: '種類のファイルを混ぜない',
        content: `人型、巨大ロボ、アームの接写、コックピット、壊れた機体は、別のファイルです。巨大ロボの文の末尾に industrial robot arm を足すと、建物ほどの機体の肩から、工場のアームがもう一本生えます。接写の文の末尾に giant を足すと、画面の中の関節が街になります。混ぜたと気づいたら、引き算をせず、その種類の見本まで戻してください。

見本は五つだけ持っておきます。服を着た成人のアンドロイド、金属の頭の人型、建物と比べた巨大ロボ、丸い小さな機体、肩のパネルが一つ無い機体、です。コックピットはパイロットの服が安定してから、人型の見本とは別に保存します。格納庫は巨大ロボの見本に、足場と成人一人を足した枝です。枝を見本の上に上書きしないでください。

夜の都市を足すのも枝です。昼の無地で頭の形が三枚揃ったファイルをコピーし、コピーの方にネオンを一つ足します。元の昼のファイルは、次に関節を直すときの戻り先です。夜のファイルで関節が溶けても、昼のファイルは残っています。

**成人のアンドロイド。夜はまだ足さない**

\`\`\`
1 adult android, adult, clothed, shirt, trousers, long coat,
mechanical joints at the wrists, standing, full body,
plain background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra faces, text
\`\`\`

**小さな機体。損傷は足さない**

\`\`\`
small round robot, short metal limbs, panel lines,
standing, plain background, soft daylight, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, human face, rust, extra arms, text
\`\`\`

固有名を思い出して足したくなったときは、ファイルを保存する前にその語を消します。色を二つ、頭の形を一つ、比較の建物を一つ、で書き直した枚だけを残します。似てきた枚は、似たまま公開用に取っておきません。頭の形を変えた次の枚で、シルエットが別になったことを確認してから保存します。

人の顔が無い機体のファイルに、あとから \`portrait\` や肌の語を足さないでください。足すと、金属の頭の中に人の目が開きます。人に近い顔が欲しい日は、成人のアンドロイドの見本を開き、機械の頭のファイルは閉じます。二つの見本を同じ欄に置いた状態で生成しないでください。

関節を直す日は、夜も損傷も外します。昼の無地で、膝か肘かを一つだけ大きくします。大きくした枚で指が出たら、人の手の語が混ざっています。機械のヒンジとピストンの名詞に戻し、指のネガティブを残します。指が消えてから、もう一方の関節を足します。両膝と両肘を同じ強さで書くと、四つとも平均の金具になります。

コックピットの枝は、パイロットの服が三枚同じに見えてから計器の灯を足します。灯を先に強くすると、ジャケットの形より画面の光が勝ち、顔が色の平均になります。文字を書かせて情報を足そうとしないでください。ランプの色を一つ増やすか、灯を消して服に戻るか、です。格納庫の枝で人が増えるときは、\`1 adult man\` か \`1 adult woman\` が正向に二回数えていないかを見ます。人数は一人と書き、足場の向こうの人は頼みません。

壊れた機体の見本に、小さな丸い機体の語を足すと、可愛さと損傷が同時に出て、どちらでもない玩具になります。可愛さは小さな機体のファイル、損傷は巨大か人型のファイル、と分けたままにしてください。分けたファイルの先頭に、今日の種類を日本語で一行書いてから生成すると、貼り間違いに気づけます。

光る目の色を変える日も、種類は固定します。金属の頭の見本で青が三枚揃ってから、コピーの方だけを別の一色にします。巨大ロボの夜の枝で目の色を変えないでください。ネオンと目の色が同時に変わると、頭の形が平均に戻っても原因が光に見えます。色が決まってから夜を足す、という順番を、ファイル名に残しておきます。`,
      },
    ],
    faq: [
      {
        q: '既存のロボットに似てしまいます',
        a: '作品名や機体名は書きません。頭の形か配色かを一つ変えて、もう一枚出します。色だけを変えても、シルエットは残ることがあります。',
      },
      {
        q: '関節が溶けて腕が増えます',
        a: '接写ならその関節だけ、全身なら立ち姿だけ、とファイルを分けます。ダンスは片腕を上げる一つに戻してください。人の手の語が残っていると、指が出ます。',
      },
      {
        q: '巨大さが出ません',
        a: '全高の数値は書かず、建物かキャットウォークとの比較と、低い視点で書きます。人を置くなら成人一人だけです。特徴の角は一つまでにしてください。',
      },
      {
        q: 'アンドロイドの顔が幼く見えます',
        a: 'adult と、成人の顔であること、閉じた服を先頭に書きます。子供の体にはしません。肌と金属を同じ強さで書かないでください。',
      },
      {
        q: 'コックピットに文字が並びます',
        a: '計器はランプの色だけにして、単語を書かせません。ネガティブの text を残します。警告文を正向に書くと、崩れた文字が増えます。',
      },
      {
        q: '壊れた表現が痛々しくなります',
        a: '凹み、外れたパネル、ケーブル、消えた目、のどれか一つにします。人の負傷や血は書きません。パイロットを描くときは、無事な成人の服のままにします。',
      },
    ],
  },

  'plush-toy-prompt-guide': {
    sections: [
      {
        title: 'ぬいぐるみを主題にする',
        content: `「ぬいぐるみ プロンプト」「ぬいぐるみ化 プロンプト」で探しているのは、布のおもちゃそのものと、写真をぬいぐるみに変える文と、大人が大きなぬいぐるみを抱く構図です。検索では、抱く、抱きしめる、持つ、大きなぬいぐるみ、猫のぬいぐるみ、ChatGPT で作る、が一緒に出ます。

このページは、フェルト、編み物、縫い目、毛足のある布を担当します。塗装済みのフィギュア、箱、アクリルの台座は [フィギュア化プロンプト](/guides/figure-ai-prompt-guide) です。人同士の抱き合いは [ハグのプロンプト](/guides/hug-prompt-guide) です。ぬいぐるみを抱くときだけ、このページに残します。

商品だけの枚には人数を書きません。人が抱く枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はコート、カーディガン、シャツ、スラックスのように閉じた日常着です。寝室や寝具の上の場面は使いません。立つ、椅子に座る、机の上の商品写真、のどれかです。

使う写真は、自分の成人の写真、自分のペット、自分で描いたオリジナルキャラだけです。他人、有名人、年少者、既存の作品のキャラクターは使いません。ロゴや商品名も書きません。

2026年11月時点の書き方です。長い句は自然な英語で、公式タグとしては断定しません。重みを使うなら 1.1 から 1.3 の目安で、\`(plush toy:1.2)\` を一つです。文字として残すときは \`\\(plush toy:1.2\\)\`、NovelAI の強調は \`{plush toy}\` と \`[plush toy]\` です。横長の \`--ar\` は商品を横に並べる枚だけで、文末に置けるツールに限って使います。

一枚につき、動物を一つ、素材を一つ、置き場所を一つです。熊と猫と兎を同じ強さにすると、耳の形が混ざります。兎は rabbit と書きます。比較は、光と背景を固定して、素材の語だけを差し替えます。`,
      },
      {
        title: '素材で分ける',
        content: `ぬいぐるみの差は、布の種類と、縫い目が見えるかです。ふわふわ、の一語だけだと、毛足の長さも目の作りも平均になります。毛足、フェルト、編み物、のどれかを先に決めてください。

テディベアは \`teddy bear\` です。動物一般の布のおもちゃは plush toy と自然な英語です。フェルトは felt texture、編み物のあみぐるみは knitted amigurumi、布の表面は fabric texture、縫い目は stitched seams、です。いずれも自然な英語で、公式タグとしては断定しません。目は、刺繍の糸か、丸い布の部品か、を一つにします。両方を書くと、目が二重になります。

| 素材 | 書き方 | 見え方 |
|---|---|---|
| テディベア | \`teddy bear\` | 熊の形。最初の一手 |
| 布のおもちゃ | plush toy | 自然な英語。動物は別に一つ |
| フェルト | felt texture | 自然な英語。毛足は短い |
| 編み物 | knitted amigurumi | 自然な英語。糸の目が見える |
| 生地 | fabric texture | 自然な英語。毛足と同時に強くしない |
| 縫い目 | stitched seams | 自然な英語。手足の付け根 |
| 刺繍の目 | embroidered eyes | 自然な英語。ボタンの目と混ぜない |

**フェルトの熊。縫い目あり**

\`\`\`
teddy bear, felt texture, stitched seams, embroidered eyes,
sitting, plain background, soft studio light,
product photo, no text, no logo, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, plastic, extra limbs
\`\`\`

**糸のあみぐるみ**

\`\`\`
knitted amigurumi bear, yarn texture, visible stitches,
round body, sitting, plain background, soft light,
product photo, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, text, plastic, extra limbs
\`\`\`

プラスチックの光沢が出るときは、フィギュアの語がどこかに残っています。plush と felt を前に戻し、\`figure\` や PVC の語は消してください。毛足を長くしすぎると、目と鼻が毛に隠れます。顔の部品を見せる枚では、毛足の語を弱めるか、フェルトに戻します。

耳の形で動物が決まります。熊の丸い耳と、猫の三角の耳を同時に書かないでください。色は、形が三枚揃ってから一つ足します。色を先に強くすると、茶色の塊になって、縫い目が消えます。`,
      },
      {
        title: '猫のぬいぐるみと商品写真',
        content: `猫のぬいぐるみは、生きている猫とは別のファイルです。\`cat\` だけだと、毛の生えた本物の猫になります。plush か felt を、猫の直後に置いてください。生きている猫の写真を布に変える手順は、次のぬいぐるみ化の節です。この節は、最初から布の猫を作るときです。

商品写真は、机か無地の背景、柔らかいスタジオの光、文字なし、ロゴなし、です。箱を足すと、箱の印刷が崩れます。箱と台座が必要な立体はフィギュア化のページへ戻し、このページの商品は布の本体だけにします。

| 猫の布 | 書き方 | 本物の猫との差 |
|---|---|---|
| 猫のぬいぐるみ | cat plush toy | 自然な英語。布を先に |
| 座り | \`sitting\` | 四本の足が布 |
| 縫い目 | stitched seams | 本物の毛並とは別 |
| 商品 | product photo | 自然な英語。背景は無地 |
| 光 | soft studio light | 自然な英語。方向は一つ |

**無地の猫のぬいぐるみ**

\`\`\`
cat plush toy, felt texture, stitched seams, embroidered eyes,
sitting, plain light-gray background, soft studio light,
centered, product photo, no text, no logo, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, live cat, text, plastic, extra limbs
\`\`\`

**横に一つ。パラメータは文末だけ**

\`\`\`
one cat plush toy, knitted texture, visible stitches,
plain background, soft light, product photo, no text --ar 1:1 --no text, people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, text, extra limbs
\`\`\`

本物の猫が出るときは、\`cat\` が布の語より前で強すぎます。cat plush toy を一塊にして先頭へ移し、whiskers だけの行は消します。ひげを詳しく書くと、生きている猫の顔に戻ります。布の猫のひげは、刺繍の線として一つだけにしてください。

影が二方向に落ちるときは、光源の語が二つ残っています。窓かスタジオか、片方を消します。商品の比較では、背景の色も固定します。背景を先に変えると、布の色が一緒に変わったのかが分かりません。`,
      },
      {
        title: 'ぬいぐるみ化は自分の写真だけ',
        content: `ぬいぐるみ化は、手元の写真を、布のおもちゃのように見せる編集です。渡してよいのは、自分の成人の写真、自分のペット、自分で描いたキャラクターだけです。既存のアニメやゲームのキャラクター、他人の写真、年少者の写真は使いません。

2026年11月時点の公式ヘルプでは、ChatGPT Images は、既存の画像をアップロードして、変更を文章で頼めます。編集は二つあります。Select で範囲を選んでから会話で変更を書く方法と、範囲を選ばずに会話欄へ直接書く方法です。ヘルプは、選択は正確でないことがあり、編集は選んだ範囲の外まで及ぶことがある、と説明しています。画面の名前は言語やバージョンで違うことがあります。手順の全体は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a> です。

Gemini は、画像をアップロードして編集を頼めます。2026年11月時点の公式ヘルプでは、生成した画像を直す、アップロードした画像を直す、複数の画像から新しい画像を作る、が挙がっています。パソコンでは gemini.google.com を開き、サイドバーの画像から生成するか、ライブラリの画像を開いてチャットで頼みます。ヘルプは、画像の編集は18歳以上が対象だと書いています。プロンプトの最後に「描いて」「生成して」「作成して」を付けること、スタイル、被写体、動作、場面を書くことがヒントです。表示名は、選んでいるモデルによって違うとヘルプにあります。バージョンによって仕様が違うことがあります。出典は <a href="https://support.google.com/gemini/answer/14286560?hl=ja" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini アプリで画像を生成、編集する</a> です。料金、枚数の上限、解像度の数値はこのページでは書きません。

ヘルプには、人物の見た目を保つ機能や、一部だけを直す機能が挙がっています。それでも顔や模様が変わることがあります。保証ではありません。残すものは文の先頭に書き、変わった差分だけを次の一文で頼んでください。一度に、布の種類と背景とポーズを変えないでください。

**自分のペットをフェルトに**

\`\`\`
この写真は、私のペットです。毛色と顔の模様は残してください。
体をフェルトのぬいぐるみにし、縫い目が見えるようにします。
机の上、柔らかい光、商品写真。文字とロゴは入れません。
人は追加しないでください。作成して。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo, extra limbs
\`\`\`

**英語。成人の自分の写真**

\`\`\`
Use my uploaded photo of this adult. Keep the same adult face, hair color, and clothing colors.
Turn the person into a soft felt plush toy with stitched seams and embroidered eyes.
Plain background, soft studio light, product photo. No text and no logo.
Do not add another person.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

顔が別人になるときは、布の種類を足す前に、「同じ顔のまま」を先頭に戻して、写真をもう一度添えます。服の色を同時に変えないでください。色を変えると、顔まで平均に寄ることがあります。自作キャラの場合は、設定の一枚だけを渡し、他の作品の画面は渡しません。`,
      },
      {
        title: '大人が抱く、持つ',
        content: `抱く、抱きしめる、持つ、は手の位置が違います。持つは、片手か両手で体の前に支えることです。抱くは、腕がぬいぐるみのうしろに回ります。人を抱く語と混ぜると、ぬいぐるみの位置に人の顔が出ます。人を抱く書き方はハグのページです。

場所は、立ったままか、椅子か、無地の背景です。寝具の上にはしません。ぬいぐるみは一つです。二つ抱えると、腕が四本になります。

| 動作 | 書き方 | 手 |
|---|---|---|
| 持つ | holding a plush toy | 自然な英語。体の前 |
| 抱く | hugging a plush toy | 自然な英語。腕はうしろ |
| 大きい | large teddy bear | 自然な英語。胴くらい |
| 椅子 | sitting on a chair | 自然な英語。寝具は書かない |
| 立つ | \`standing\` | 全身で確認する |

**立って、大きな熊を抱く**

\`\`\`
1 adult woman, adult, long coat, knit sweater, trousers,
hugging a large teddy bear, standing, outdoors,
soft daylight, simple background, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra people, extra toys
\`\`\`

**椅子に座って、猫のぬいぐるみを持つ**

\`\`\`
1 adult man, adult, cardigan, shirt, trousers,
sitting on a chair, holding a cat plush toy,
soft window light, plain room, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra hands, extra people, live cat
\`\`\`

手が溶けるときは、抱くをやめて、膝の上に置くだけに戻します。置く枚で手が安定してから、腕を回す語を一つ戻してください。戻したときにまた増えるなら、持つ、で止めて、抱くは別の日にします。指の細部は手のガイドです。このページでは、手袋や、手が見えない抱っこで指の負担を減らしてよいです。手袋にするときは、冬のページの手袋と混ざらないように、室内の光のままにしてください。

大きなぬいぐるみが人より画面を支配するときは、人の行を前に戻し、ぬいぐるみは「胴の大きさ」とだけ書きます。画面の端まで布が広がる指定は、商品写真のファイルへ移します。抱く枚と、商品の枚を一つの欄に貼らないでください。`,
      },
      {
        title: '大きなぬいぐるみ',
        content: `大きなぬいぐるみは、大人の胴から頭くらい、を起点にします。部屋いっぱい、と書くと、壁と布の境界が消えて、縫い目が見えなくなります。大きさを見せるなら、大人の体と比較するか、椅子と比較するか、一方だけです。

人がいない商品として大きく見せるときは、フレームの中に一体だけを置き、余白を残します。余白が無いと、耳が切れて、何の動物かが残りません。

**胴くらいの熊。立った大人**

\`\`\`
1 adult woman, adult, coat, scarf, trousers, boots,
standing, holding a teddy bear about torso height,
outdoors, overcast, soft daylight, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra people, cropped
\`\`\`

**余白のある大きな猫。人なし**

\`\`\`
one large cat plush toy, felt texture, stitched seams,
sitting, wide margin, plain background, soft studio light,
product photo, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, text, cropped, extra limbs
\`\`\`

「画面いっぱい」と「全身が入る」は矛盾します。耳まで入れる枚では、余白を優先してください。大きさを強調したいなら、隣に椅子を一つ置いて比較し、ぬいぐるみ自体の語は large の一つに留めます。椅子と机と棚を全部書くと、布が家具の模様になります。

色の違う大きなぬいぐるみを並べる枚は、二体までです。三体にすると、顔が平均の動物になります。並べる日は、素材をフェルトに固定し、色だけを変えます。素材も同時に変えると、どちらが大きさを変えたのかが分かりません。`,
      },
      {
        title: '自然文の型',
        content: `タグが通るモデルと、文が通るモデルは分けて保存します。文でも、動物、素材、縫い目、場所、人の有無、の順は崩しません。人を置く文は、成人と服を先頭に書きます。

ChatGPT と Gemini の編集は、前の節のヘルプの範囲だけを使います。新しいボタン名をこのページで断定しません。変わってほしくないものは、変えるものより前に書きます。

**商品の自然文**

\`\`\`
A single cat plush toy made of felt, with stitched seams and embroidered eyes.
It sits centered on a plain background under soft studio light.
Product photo. No people. No text. No logo.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, person, text, plastic
\`\`\`

**抱く自然文**

\`\`\`
1 adult woman, adult, in a long coat and knit sweater, standing outdoors.
She hugs one large teddy bear. Soft daylight, simple background.
No extra people. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, extra arms, extra people
\`\`\`

**自作キャラを布にする自然文**

\`\`\`
この画像は、私のオリジナルキャラクターです。顔の色と髪の色は残してください。
フェルトのぬいぐるみにして、縫い目を見せてください。
無地の背景、柔らかい光。文字とロゴは入れないでください。作成して。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, logo
\`\`\`

既存のキャラクターの名前を足すと、その作品の顔に寄ります。名前が無くても、有名な衣装の部品を詳しく書くと寄ることがあります。布に変えるときは、色と、髪の長さと、服の色の数だけにして、衣装の固有の部品名は減らしてください。

フィギュア化のページの台座や箱の文を、このページの布の文のうしろに貼らないでください。プラスチックの台座が布の足に付きます。立体の種類を変える日は、空の文から書き直します。今日使うのは、布か、塗装済みのフィギュアか、一方です。`,
      },
      {
        title: '布の見本を三枚だけ持つ',
        content: `見本は三つです。フェルトの熊の商品、猫のぬいぐるみの商品、大人が大きな熊を抱く立ち姿、です。あみぐるみは熊の見本をコピーして、素材の語だけを編み物に変えた枝です。兎のぬいぐるみも、猫の見本をコピーして耳の形だけを変えた枝です。枝を見本の上に上書きすると、翌日にフェルトへ戻れません。

抱く枚に商品写真の「余白」や「中央」を残すと、人が端へ寄って、ぬいぐるみが商品の構図のまま大きくなります。抱くファイルを作るときは、商品の語を消してから、成人と服と動作を書いてください。逆に、商品のファイルに成人の行が残ると、無地の背景の端に顔が出ます。人の有無は、ファイルの一行目で決めます。

**兔。猫の見本から耳だけ変える**

\`\`\`
rabbit plush toy, felt texture, stitched seams, long ears,
sitting, plain background, soft studio light,
product photo, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, live animal, text, plastic, extra limbs
\`\`\`

**膝の上に置く。腕はまだ回さない**

\`\`\`
1 adult woman, adult, cardigan, long skirt,
sitting on a chair, cat plush toy on her lap,
soft window light, plain room, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra people, live cat
\`\`\`

ぬいぐるみ化の会話は、この見本とは別のメモに残します。メモの先頭は、渡した写真が自分の成人か、自分のペットか、自作キャラか、です。次に、残したものと、変えたもの（布にした、縫い目を足した）を一行ずつ書きます。背景を変えた回と、布を変えた回が同じ行に並んでいたら、その結果は比較に使いません。顔が変わった回は、残す文を短くして、同じ写真をもう一度添えます。公式のヘルプが、選択した範囲の外まで変わることがある、と書いているのはこの失敗のためです。範囲を狭く頼んでも、顔まで動くときは、その枚を捨てて、布の指定を一つ減らします。

人同士のハグの文を、抱く見本のうしろに貼らないでください。腕の高さが人の腰と、ぬいぐるみの背中の両方を指して、手が倍になります。人を抱く日はハグのページを開き、このページのファイルは閉じます。

大きなぬいぐるみの枝は、抱く見本をコピーして、大きさを「胴くらい」の一つだけ変えます。画面いっぱい、部屋いっぱい、は書きません。書くと耳が切れて、熊なのか猫なのかが残りません。余白を残した商品のファイルで大きく見せるときは、人の行が無いかを先に確認します。人が残った大きな商品は、端に顔が出て、縫い目の確認に使えません。

素材を変える日は、動物を固定します。熊のフェルトが三枚揃ってから、コピーで編み物にします。猫の日に編み物へ変えないでください。耳と糸の目が同時に変わると、どちらの語が効いたのかが残りません。刺繍の目と、丸い布の目も同じ日に切り替えません。目の作りは、素材が決まってから一つです。

ぬいぐるみ化で背景まで布になったときは、布にする範囲を「写真の中のペット」か「写真の中の成人」かに書き、背景は無地のまま残す、と次の一文で分けます。一回の依頼に両方を書かないのは、生成の見本と同じです。公式ヘルプの一部を直す機能を使うときも、文章で範囲を書いてください。範囲を書かずに「ぬいぐるみにして」だけだと、部屋の椅子まで縫い目になります。椅子まで布になった枚は捨て、範囲を一文で書き直します。

商品写真の光は、窓かスタジオかをファイルごとに固定します。同じ猫のぬいぐるみで、光だけを変えた二枚を並べると、縫い目が見えるのが素材の語なのか光なのかが分かります。光を変える日は、布の種類も動物も動かしません。動かしたくなるのは、影が強いときです。影が強ければ、光源の語を一つに減らしてから、もう一枚だけ出します。減らさずに素材を変えると、影の問題が布の問題に見えたまま残ります。`,
      },
    ],
    faq: [
      {
        q: 'ぬいぐるみ化で顔が変わります',
        a: '残すものを文の先頭に書き、布の種類だけを変えます。服の色と背景を同時に変えないでください。公式ヘルプでも、選択範囲の外まで編集が及ぶことがある、と説明されています。変わった差分だけを次の一文で頼んでください。',
      },
      {
        q: '既存のキャラクターをぬいぐるみにできますか',
        a: 'このページでは使いません。渡してよいのは、自分の成人の写真、自分のペット、自分で描いたオリジナルキャラだけです。他人や年少者の写真も使いません。',
      },
      {
        q: 'フィギュア化のページとどう違いますか',
        a: 'フィギュア化は、塗装済みの立体、台座、箱が中心です。このページは、フェルトや編み物や縫い目のある布のぬいぐるみです。台座の文はこちらへ貼りません。',
      },
      {
        q: '抱くと腕が増えます',
        a: 'ぬいぐるみは一つ、動作は持つかか抱くかの一方です。崩れたら、膝の上に置くだけに戻します。人を抱く語は混ぜず、人同士のハグはハグのページです。',
      },
      {
        q: '本物の猫になります',
        a: 'cat plush toy のように、布であることを猫の直後に書きます。ひげを詳しく書くと、生きている猫に戻ります。布のひげは刺繍の線を一つだけにしてください。',
      },
      {
        q: '寝室で抱きしめる絵はありますか',
        a: 'このページでは使いません。立ったまま、椅子、無地の商品写真、のどれかにします。服は閉じた日常着のままです。',
      },
    ],
  },

  'snow-winter-prompt-guide': {
    sections: [
      {
        title: '雪と冬は層を一つずつ足す',
        content: `「雪 プロンプト」「冬 プロンプト」「雪 加工 ai プロンプト」で探しているのは、降る雪と積もった雪、結晶、雪の景色と街、冬の光、白い息、大人の冬服、雪遊び、そして自分の写真に雪を足す編集です。12月に向かって、季節の絵を先に用意したい検索です。

このページは、雪と冬の組み合わせを担当します。クリスマスの電飾と赤の衣装は [クリスマスのプロンプト一覧](/guides/christmas-prompt-guide)、年賀状の賀詞は [AI年賀状プロンプト](/guides/new-year-card-ai-prompt-guide) です。コートの部品の一般は [服装プロンプト一覧](/guides/clothing-prompt-guide)、人物のうしろの場所は [背景プロンプト](/guides/background-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。景色そのものを主題にする広い構図は [風景のプロンプト](/guides/landscape-prompt-guide) です。このページの雪景色は、雪の降り方と積もり方が主題です。

人物を置くときは大人だけです。\`1 adult woman\` か \`1 adult man\`、または \`2 adults\` から書き、\`adult\` を残します。服はコート、マフラー、手袋、ニット、スラックス、ブーツのように、閉じた冬の服で全身を覆います。年少者の雪遊びは書きません。人がいない景色には人数を書きません。

2026年11月時点の書き方です。長い句は自然な英語で、公式タグとしては断定しません。重みの目安は 1.1 から 1.3 です。\`(snow:1.2)\` を一つだけ使い、文字として残すときは \`\\(snow:1.2\\)\` です。NovelAI の強調は \`{snow}\` と \`[snow]\` です。横長の \`--ar\` は、雪原を広く見せる枚の文末だけで、置けるツールに限って使います。

一枚につき、雪の状態を一つ、場所を一つ、服を一つです。粉雪と吹雪と積雪と夜を同じ強さにすると、画面が白い平均になります。比較は、服と場所を固定して、雪の語だけを差し替えます。`,
      },
      {
        title: '降る雪、積もった雪、結晶',
        content: `降っている雪と、積もった雪は、別の層です。\`snowing\` は空から落ちてくる粒、\`snow\` は地面や屋根に乗っている雪、として使い分けます。両方を同じ強さにすると、空も地面も同じ白になり、輪郭が消えます。主役を一つにして、もう一方は弱くするか、消します。

結晶は \`snowflakes\` です。手前に大きな結晶が欲しいときは、large snowflakes in the foreground と自然な英語で一つ足し、背景は暗くします。白い空に結晶を置くと、粒が見えません。吹雪は \`blizzard\` です。強くすると人が埋もれるので、人物の枚では使わず、景色だけの枚に限ってください。

| 状態 | 書き方 | 画面 |
|---|---|---|
| 降る | \`snowing\` | 粒が動いて見える |
| 積もる | \`snow\` | 地面、屋根、枝 |
| 粉雪 | light snowfall | 自然な英語。粒は細かい |
| 結晶 | \`snowflakes\` | 暗い背景の方が見える |
| 手前の大粒 | large snowflakes in the foreground | 自然な英語。数は書かない |
| 吹雪 | \`blizzard\` | 人の枚では使わない |

**降る雪。地面はまだ見える**

\`\`\`
quiet park, snowing, light snowfall, dark pine trees,
overcast, winter, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, blizzard, daylight bloom
\`\`\`

**積もった屋根。空は降らせない**

\`\`\`
snow on roofs, snow on tree branches, quiet town,
overcast winter day, no falling snow, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, snowing
\`\`\`

**暗い背景の結晶**

\`\`\`
large snowflakes in the foreground, dark background,
soft light on the crystals, macro, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, text, bright white background
\`\`\`

粒が同じ大きさの白い点になるときは、奥行きがありません。手前は少し大きく、奥は小さく、と一文で書いて、\`snowflakes\` を二重に強くしないでください。結晶の幾何を詳しく書きすぎると、画面が図形の模様になり、景色が消えます。模様が欲しい枚と、景色の枚は分けます。

雪の量を上げても白く飛ぶだけなら、暗い木か、濃いコートかを一つ足して、白の隣に濃い色を作ります。明るさを上げて雪を出そうとすると、空が先に白くなります。`,
      },
      {
        title: '雪景色と街',
        content: `雪景色は、場所を一つにします。山、森、町、神社の鳥居、のどれかです。四つを並べると、観光の平均になり、雪の状態が見えません。人物のうしろに雪道を付けるだけなら、背景のページの場所に \`snow\` を一つ足す方が短いです。このページは、雪が画面の主題であるときです。

町は、看板の文字を書きません。屋根の雪と、道の雪と、窓の灯、で冬の町にします。夜にするなら \`night\` と街灯を一つです。昼の空を残したまま夜の灯を足すと、空が割れます。

| 場所 | 書き方 | 雪の置き場 |
|---|---|---|
| 山 | snowy mountains | 自然な英語。稜線 |
| 森 | snowy forest | 自然な英語。枝 |
| 町 | snowy town | 自然な英語。屋根と道 |
| 野 | snowfield | 自然な英語。地平線は一本 |
| 鳥居 | torii in snow | 自然な英語。文字は書かない |
| 夜の町 | \`night\`, streetlight, snowing | 灯は一つ |

**雪の町。昼**

\`\`\`
snowy town, snow on roofs, quiet street, overcast,
winter, soft daylight, landscape, no people, no signs, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, night, cherry blossoms
\`\`\`

**街灯に浮かぶ粉雪**

\`\`\`
night, one streetlight, light snowfall, snowy street,
cool blue shadows, winter, no people, no readable signs
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, daylight
\`\`\`

電飾の連なりや、赤の衣装や、贈り物はクリスマスのページです。このページの夜は、街灯か窓の灯かを一つにして、雪の粒が見えるかを確認します。灯を三色にすると、雪の白が平均のパステルになります。

山の枚で町の看板が混ざるときは、町の語が残っています。雪のファイルは場所を一つだけ正向に残し、ほかの場所は消してください。鳥居を書くときは、掲額の文字を書かせません。形だけの門にして、text はネガティブに残します。`,
      },
      {
        title: '冬の光と白い息',
        content: `冬の光は、雪が白いからこそ、影の色で寒さを作ります。曇りなら影は薄く、晴れなら影は青い、と一つに決めてください。両方を書くと、地面の半分だけが別の時間になります。光のカタログは照明のページです。このページでは、雪の白に負ける色を一つ残すことだけを見ます。

白い息は、寒さのしるしです。visible breath と自然な英語です。公式タグとしては断定しません。煙や、火のついたものにはしません。息は口の前の薄い白で、顔を隠す量にはしないでください。強くすると、口が煙に消えます。

| 光 | 書き方 | 雪との関係 |
|---|---|---|
| 曇り | \`overcast\` | 影が柔らかい。白飛びしにくい |
| 薄い日 | pale winter sun | 自然な英語。円は中央に置かない |
| 青い影 | blue shadows on snow | 自然な英語。晴れの雪 |
| 夕方 | \`sunset\` | 雪が暖色に染まる。夜と混ぜない |
| 息 | visible breath | 自然な英語。顔は残す |

**青い影の雪原**

\`\`\`
snowfield, pale winter sun, blue shadows on snow,
low horizon, winter, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, night, oversaturated
\`\`\`

**息は薄く。大人の肖像**

\`\`\`
1 adult woman, adult, long coat, scarf, knit sweater,
visible breath, overcast, snowing, upper body,
soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra faces, text
\`\`\`

頬の赤みを足すときは、blush を弱く一つです。赤を強くすると、マフラーの色と混ざります。マフラーを赤にする枚では、頬の赤は消し、寒さは息とコートで作ります。逆に、コートを濃紺にして、頬だけを薄く赤くする枚も作れます。両方を赤にしないでください。

室内から窓の外の雪を見る枚は、室内の暖色を一つ、外の寒色を一つ、に分けます。部屋の種類を詳しく書くと、雪より家具が勝ちます。窓、外の雪、室内の一つの灯、で足ります。寝具の語は入れません。`,
      },
      {
        title: '大人の冬服',
        content: `冬服は、コート、マフラー、手袋、ニット、を閉じて着た状態です。丈は膝より下を起点にし、手足の肌を出す書き方はしません。服装のページが部品の一覧で、このページは雪の場面で同時に着せる組み合わせです。四つを全部詳しく書くと、首元が平均の布になります。コートを主役にする日は、マフラーの色だけを足し、手袋は「手袋がある」までにしてください。

| 部品 | 書き方 | 雪との役割 |
|---|---|---|
| コート | \`coat\` | 濃い色だと雪に負けない |
| マフラー | \`scarf\` | 色のアクセントは一つ |
| 手袋 | \`gloves\` または mittens | 指の崩れを減らす |
| ニット | knit sweater | 自然な英語。コートの下 |
| 帽子 | knit hat | 自然な英語。髪と競合する |
| ブーツ | \`boots\` | 積雪の枚で足元を見せる |

**濃紺のコートと、赤いマフラー**

\`\`\`
1 adult woman, adult, long navy coat, red scarf, gloves,
knit sweater, trousers, boots, standing, full body,
snowing, overcast, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, text
\`\`\`

**大人の男性。手袋はミトン**

\`\`\`
1 adult man, adult, long coat, scarf, knit sweater,
mittens, trousers, boots, standing, upper body,
snow, overcast, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, text
\`\`\`

帽子を足すと、前髪と帽子の縁が溶けます。髪を見せたい枚では帽子を外し、耳まで隠したい枚では髪の長さの語を減らします。両方を詳しく書くと、頭に布が二枚乗ることがあります。

コートの色を白にすると、雪と同化します。白のコートが欲しいときは、マフラーか、背景の木かを濃い色にして、境界を作ってください。境界が無い枚は、人物が雪の中に消えます。消えた輪郭を発光で取り戻さないでください。濃い色を一つ戻します。

服装のページにある他の季節の語が残っていると、袖が短くなります。雪のファイルを作るときは、夏の語が正向に無いかを先に見てください。`,
      },
      {
        title: '大人の雪遊び',
        content: `雪遊びは、大人の冬服のまま、雪だるまを作るか、雪玉を一つ持つか、です。投げる相手や、争う描写は書きません。年少者は登場しません。人が二人なら \`2 adults\` と、それぞれが成人であることを書きます。

雪だるまは \`snowman\` です。人が雪に埋まる指定はしません。埋めると、手足の位置が雪の中で増えます。雪だるまの顔は、石か布の部品で簡単に作り、文字は書きません。

| 遊び | 書き方 | 人数 |
|---|---|---|
| 雪だるま | \`snowman\` | 大人一人と、だるま一つ |
| 雪玉を持つ | holding a snowball | 自然な英語。投げる相手は書かない |
| 並んで立つ | \`2 adults\`, standing | 動作は「立つ」だけ |
| 手袋 | \`gloves\` | 雪の日は手を覆う |

**雪だるまの横。大人一人**

\`\`\`
1 adult woman, adult, long coat, scarf, gloves, knit hat,
standing beside a snowman, snow on the ground,
overcast, soft daylight, full body, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra arms, text
\`\`\`

**二人は並ぶだけ**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
long coats, scarves, gloves, standing side by side,
snowy park, overcast, full body, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text
\`\`\`

雪だるまの顔が人の顔の複製になるときは、雪だるまを単純な三つの玉に戻し、人の \`portrait\` の語が残っていないかを見ます。人の顔の詳細と、雪だるまの顔の詳細を同じ強さで書かないでください。人の顔を見せる枚では、雪だるまは横のシルエットに下げます。

手が崩れるときは、雪玉を地面に置いて、手は手袋の中に戻します。指のガイドへ進む前に、持つ物を一つ減らしてください。二人の枚で顔が平均になるときは、二人の距離のページへ行かず、まず一人の雪だるまのファイルに戻ります。今日の雪遊びは一人です。`,
      },
      {
        title: '写真に雪を足す',
        content: `雪加工は、自分の写真に、降る雪や薄い積雪を足す編集です。渡してよいのは、自分の成人の写真か、自分が権利を持つ景色の写真だけです。他人や年少者の写真は使いません。元の写真に写っている看板やロゴを、新しい店名に書き換えません。

ChatGPT Images は、2026年11月時点の公式ヘルプで、既存の画像をアップロードして変更を文章で頼めます。Select で範囲を選ぶ方法と、会話欄に直接書く方法があります。ヘルプは、選択は正確でないことがあり、編集は選んだ範囲の外まで及ぶことがある、と説明しています。表示名はバージョンや言語で違うことがあります。出典は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a> です。

Gemini は、アップロードした画像の編集を頼めます。2026年11月時点の公式ヘルプでは、画像の編集は18歳以上が対象です。パソコンでは gemini.google.com を使い、アップロードするか、ライブラリの画像を開いてチャットで頼みます。ヘルプは、一部を直すことと、人物の見た目を保つことを機能として挙げています。それでも顔が変わることがあるので、保証とは書きません。プロンプトの最後に「作成して」と付けるのは、ヘルプのヒントです。出典は <a href="https://support.google.com/gemini/answer/14286560?hl=ja" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini アプリで画像を生成、編集する</a> です。料金や枚数の上限は書きません。

残すものを先頭に、足す雪をその次に書きます。一度に、雪の量と服と時間帯を変えないでください。顔が変わったら、その差分だけを次の一文で頼み、写真を添えます。

**肖像に粉雪だけ。顔は維持**

\`\`\`
この写真は私自身の成人の写真です。顔、髪型、服、ポーズ、構図は変えないでください。
細かい粉雪を足し、手前の粒は少なく、奥の粒は小さくしてください。
空が晴天なら、薄い雪雲の明るさに合わせて光だけを柔らかくします。
新しい文字は入れません。服の形は変えません。作成して。
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text
\`\`\`

**英語。景色の写真に薄い積雪**

\`\`\`
Edit my photo. Keep the same buildings, trees, and framing.
Add a thin layer of snow on horizontal surfaces only, and a light snowfall.
Do not add people. Do not add signs or letters. Keep the time of day.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, person, text
\`\`\`

**自然文。生成から雪の町を作る**

\`\`\`
A quiet snowy town in the daytime, snow on the roofs, overcast light, no people.
Winter landscape photograph. No letters and no signs.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, person, people, text
\`\`\`

雪を足したあとに顔の輪郭が変わっていたら、その枚は採用せず、残す文を短くして再依頼します。服を冬服に替える作業と、雪を足す作業は分けてください。同じ依頼に両方を書くと、顔まで平均の顔になります。クリスマスの電飾を同時に足したいときは、雪が安定した枚を保存してから、クリスマスのページの灯を一つだけ足します。`,
      },
      {
        title: '隣のページへ渡す前に層を一つにする',
        content: `雪のファイルが安定したら、隣のページへ渡すのはその一枚だけです。クリスマスへ渡すときは、電飾を一つ足すために、降る雪と積雪の両方を残したままにしないでください。両方残った白の上に灯を足すと、灯の色が雪に溶けます。渡す前に、雪の状態を一つに削ります。年賀状へ渡すときは、賀詞の文字をこのページで書かせません。文字の無い雪の下地だけを渡し、言葉は年賀状のページの注意に従います。

服装のページへ戻るときは、コートの丈と手袋が残っているかを見ます。雪の語だけを服装のファイルへコピーすると、夏の袖の語が正向に残ったまま雪が降ります。コピーするのは冬服の行で、雪の行はこちらのファイルに残します。背景のページへ戻るときは、人物のうしろに雪道を一つ足すだけにします。このページの町と山と結晶を、人物の肖像のうしろに全部貼らないでください。貼ると、人が雪の模様の中で小さくなります。

風景のページは、雪が主題ではない広い景色です。雪の量を比べたい日は、このページを開いたままにします。光の向きだけを変えたい日は、照明のページで語を一つ選んでから、こちらの雪の状態は固定したまま戻ってきます。

**枝に積もった雪。人なし**

\`\`\`
snowy forest, snow on tree branches, overcast,
winter, soft daylight, landscape, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, snowing, night
\`\`\`

**大人は歩き、雪は降るだけ**

\`\`\`
1 adult man, adult, long coat, scarf, gloves, trousers, boots,
walking, light snowfall, quiet street, overcast,
full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, blizzard
\`\`\`

雪加工のメモは、生成の見本と混ぜません。メモの一行目は、写真が自分の成人か、自分の景色か、です。二行目は、変えないもの（顔、服、構図、建物）です。三行目は、足した雪が粉雪か、薄い積雪か、です。三行が一つに潰れている依頼は、顔も空も同時に動きます。潰れた依頼で出た枚は、採用せず、三行に分けてからもう一度送ります。

枚数や料金は、このページでは書きません。使える回数や、画面のモデル名は、開いているサービスの表示と公式ヘルプで確認してください。バージョンによって表示名や仕様が違うことがあります。確認できたのは、アップロードした画像に対して、変える内容を文章で頼める、ということと、変えてほしくない範囲の外まで結果が動くことがある、ということです。

白い息を足す枝は、冬服が三枚揃ってから作ります。息を先に強くすると、口が白い塊になり、顔の確認ができません。息は薄く一つ、マフラーの色は固定、です。息の枚でマフラーの色まで変わったら、その枝を捨て、服の見本から息だけを弱く足し直します。頬の赤みを同じ枝に足さないでください。赤が二つになると、寒さの理由が息なのか色なのかが残りません。

雪遊びの枝は、大人一人と雪だるま一つ、から始めます。雪玉を持たせるのは、手袋の手が三枚崩れていないあとです。崩れていたら、雪玉は地面に置いたままにします。二人の立ち姿は、一人の枝が安定してからコピーし、\`2 adults\` と二人目の成人を足します。コピーせずに人数だけを書き換えると、雪だるまのファイルが二人用に上書きされます。

結晶の接写は、町や山のファイルに足しません。足すと、幾何の模様が屋根の上に貼り付き、雪の状態が見えなくなります。結晶を見せる日は、暗い背景のファイルだけを開きます。吹雪は人のファイルに足しません。人の輪郭が消えた枚を、コートの色で取り戻す前に、吹雪の語を消して粉雪に戻してください。粉雪で輪郭が戻ってから、場所の濃い色を一つ残します。

夜の町の枝は、昼の雪の町が三枚揃ってから作ります。昼のファイルをコピーし、\`night\` と街灯を一つだけ足します。コピーせずに時間の語を書き換えると、昼の比較相手が消えます。消えたあとに夜が暗すぎても、戻す文がありません。街灯が顔より明るい失敗は、人がいない景色では窓の灯に弱め、人がいる枚では照明のページの向きに戻して、雪の量は固定したままにします。`,
      },
    ],
    faq: [
      {
        q: '画面が白く飛んでしまいます',
        a: '降る雪と積もった雪を同じ強さにせず、主役を一つにします。白い画面には、濃い木か濃いコートかを一つ置いて境界を作ります。明るさを上げて雪を出そうとしないでください。',
      },
      {
        q: '降る雪と積雪はどう書き分けますか',
        a: '落ちてくる粒は snowing、地面や屋根に乗っている雪は snow です。両方を同じ強さにすると輪郭が消えます。結晶の接写は暗い背景にして、景色のファイルとは分けます。',
      },
      {
        q: '雪加工で顔が変わります',
        a: '顔、服、ポーズ、構図を変えない、と先頭に書き、足すのは雪だけにします。公式ヘルプでも、編集は選んだ範囲の外まで及ぶことがある、と説明されています。変わった差分だけを次の一文で頼んでください。',
      },
      {
        q: 'クリスマスのページとどう違いますか',
        a: 'クリスマスは電飾、赤の衣装、贈り物です。このページは雪の降り方、冬の町、冬服、雪加工です。年賀状の賀詞は年賀状のページに残します。',
      },
      {
        q: '冬服なのに袖が短くなります',
        a: 'コートを長く、手袋がある、と書いて、他の季節の語が正向に残っていないかを見ます。白のコートは雪と同化しやすいので、マフラーか背景かを濃い色にします。',
      },
      {
        q: '雪遊びに年少者が混ざります',
        a: '人数は adult から書き、ネガティブに年齢の語を残します。雪だるまの横に置くのも大人一人です。年少者の雪遊びはこのページでは書きません。',
      },
    ],
  },
}
