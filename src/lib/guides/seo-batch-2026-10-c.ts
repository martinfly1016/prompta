/**
 * Third SEO batch (2026-10-26): hair color, muscular build,
 * high angle / bird's-eye, kabedon.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_3_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'hair-color-prompt-guide': {
    sections: [
      {
        title: '髪色プロンプトの基本',
        content: `「髪色 プロンプト」で必要なのは、色の名前を髪に結びつける書き方です。\`blonde\` だけだと服や背景まで黄色くなりやすいので、人物の直後に \`blonde hair\` のように「色名 + hair」を置きます。

明るさは色名の前に足します。\`light\`、\`dark\`、\`pale\` です。\`light brown hair\` は明るい茶、\`dark blue hair\` は深い青、\`pale blonde hair\` は薄い金です。色を増やす前に、地の色を一つ決めてください。

髪型の長さや結び方は [髪型プロンプト](/guides/hairstyle-prompt-guide)、色が服に移るときの BREAK と CutOff は [色プロンプト一覧](/guides/color-prompt-guide) です。作例は [髪色のナチュラルシミュレーション](/prompt/hair-color-natural-simulation)、タグは [髪型](/tag/髪型)、一覧は [髪型プロンプト集](/prompts/hairstyle) にあります。髪色と目の色を合わせるときは [目・瞳のプロンプト一覧](/guides/eye-prompt-guide) を見て、色は髪と目で一つずつ決めてください。`,
      },
      {
        title: '単色の髪色一覧',
        content: `単色は、色名を一つだけ \`hair\` につなげます。和名とタグがずれやすい色は、注記の英語を優先してください。

| 日本語 | 英語タグ | 注記 |
|---|---|---|
| 黒髪 | black hair | 光沢を足すなら \`shiny hair\`。青みは別色になる |
| 茶髪 | brown hair | 明るさは \`light\` / \`dark\` |
| 金髪 | blonde hair | 黄ばむときは次の節 |
| プラチナブロンド | platinum blonde hair | \`blonde hair\` より白い。弱いときは \`pale blonde hair\` |
| 銀髪 | silver hair | 白と金のあいだ。年齢が上がって見えることがある |
| 白髪 | white hair | 高齢に寄りやすい。成人の若い顔には次の節 |
| 灰髪 | grey hair | 白髪よりくすむ。高齢にも寄りやすい |
| 赤髪 | red hair | 橙に寄るときは \`dark red hair\` |
| オレンジ | orange hair | 赤と金のあいだ |
| ピンク | pink hair | 薄さは \`light pink hair\` |
| 青 | blue hair | 深さは \`dark blue hair\` |
| 水色 | aqua hair | \`light blue hair\` でも近い |
| 紫 | purple hair | |
| 緑 | green hair | |
| ベージュ / ミルクティー | light brown hair | \`beige hair\` はタグとして弱く、肌や服に散りやすい |

公開タグのページ: [金髪](/tag/金髪)、[黒髪](/tag/黒髪)、[赤髪](/tag/赤髪)。

**黒髪のバストアップ**

\`\`\`
1 adult woman, black hair, long hair, looking at viewer,
upper body, white shirt, soft daylight
\`\`\`

**ミルクティーに近い明るい茶**

\`\`\`
1 adult woman, light brown hair, shoulder-length hair,
looking at viewer, upper body, cream knit, indoor light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '金髪・銀髪・白髪の違い',
        content: `この四つは隣り合っています。欲しい色の隣をネガティブに入れると、寄りが減ります。

| 英語タグ | 見え方 | 寄りやすい方向 |
|---|---|---|
| blonde hair | 黄色みのある金 | オレンジ、茶色 |
| platinum blonde hair | 白に近い金 | 普通の金髪、灰色 |
| silver hair | 金属っぽい銀 | 白、灰色、青み |
| white hair | 紙に近い白 | 銀、灰色、高齢の印象 |
| grey hair | 灰色 | 白髪、高齢の印象 |

\`grey hair\` や \`white hair\` は、何も足さないと年齢が上に見えることがあります。若い大人にしたいときは、人数の直後に \`young adult\` か \`adult woman\` を書き、顔のタグを別にします。年齢を下げる書き方は使いません。

黄ばむ金髪は、\`blonde hair\` を少し強くし、ネガティブに \`yellow hair, orange hair\` を入れます。銀にしたいのに金になるときは、ネガティブに \`blonde hair, yellow hair\` です。

**白に近い金で、大人の顔**

\`\`\`
1 adult woman, young adult, platinum blonde hair, long hair,
adult face, looking at viewer, upper body, black turtleneck
\`\`\`

**銀髪で、高齢に寄せない**

\`\`\`
1 adult man, young adult, silver hair, short hair,
adult face, looking at viewer, portrait, navy shirt
\`\`\`

ネガティブ（銀髪の例）:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
blonde hair, yellow hair, elderly, wrinkles
\`\`\`

ネガティブの \`wrinkles\` は、しわを出さないための語です。顔がのっぺりするときは外してください。`,
      },
      {
        title: 'メッシュ・インナーカラー・毛先カラー',
        content: `地の色を先に書き、そのあとでアクセントを一つ足します。アクセントを先にすると、全体がその色になります。

| 日本語 | 英語タグ | 書き方 |
|---|---|---|
| メッシュ | streaked hair | 地の色、次に筋の色。例: \`black hair, streaked hair, blonde streaks\` |
| インナーカラー | colored inner hair | 表は地の色、内側に別色。\`black hair, colored inner hair, red inner hair\` |
| 毛先カラー | colored tips | 毛先だけ。\`black hair, colored tips, blue tips\` |
| ツートン（太めの分け） | two-tone hair | 二色を明示。\`two-tone hair, black hair, white hair\` |

メッシュが全体に広がるときは、筋の色の重みを下げ、\`streaked hair\` を地の色より後ろに置きます。内側の色が見えないときは、\`hair over shoulder\` や横向きで、内側が見える角度にします。

**黒髪に金のメッシュ**

\`\`\`
1 adult woman, black hair, streaked hair, blonde streaks,
long hair, looking at viewer, upper body, white blouse
\`\`\`

**インナーカラー（表は黒、内側は赤）**

\`\`\`
1 adult woman, black hair, colored inner hair, red inner hair,
hair tucked behind ear, looking at viewer, portrait
\`\`\`

**毛先だけ青**

\`\`\`
1 adult woman, black hair, colored tips, blue tips,
long hair, upper body, looking at viewer, grey sweater
\`\`\``,
      },
      {
        title: 'グラデーション・ツートン・マルチカラー',
        content: `グラデーションは境目がにじみ、ツートンは境目が分かれ、マルチカラーは三色以上です。方向を一文で書いてください。\`black hair with blue tips\` のように、英語の短文でも通ります。

| 英語タグ | 意味 |
|---|---|
| gradient hair | 色が徐々に変わる |
| ombre hair | 根元が暗く、毛先が明るい方向で使われることが多い |
| split-color hair | 左右や前後で色が分かれる |
| two-tone hair | 二色。境目はモデルによる |
| multicolored hair | 三色以上 |
| rainbow hair | 虹。色数が増えて服に移りやすい |

作例のタグページは [マルチカラー](/tag/マルチカラー) です。

**根元が黒、毛先が青**

\`\`\`
1 adult woman, gradient hair, black hair with blue tips,
long hair, upper body, white shirt, simple background
\`\`\`

**左右で分かれた二色**

\`\`\`
1 adult woman, split-color hair, black hair on one side, white hair on the other,
looking at viewer, portrait, black jacket
\`\`\`

**自然文（ChatGPT / Gemini / Midjourney）**

\`\`\`
An adult woman with long hair that starts black at the roots and fades to blue at the tips.
She wears a plain white shirt. Soft daylight, upper body, looking at the camera.
No other bright colors.
\`\`\`

Midjourney では同じ文のうしろに画角のパラメータを足せます。Illustrious のタグ順は [Illustrious プロンプト](/guides/illustrious-prompt-guide) です。`,
      },
      {
        title: '色が服・目・背景に移るとき',
        content: `髪の色が強いと、同じ色が服、目、背景に広がります。色の数を減らし、目と服の色を別に書いてください。

手順は次のとおりです。

1. 髪の色は一つ、服の色は別の一つ、に減らす。
2. 髪を \`(silver hair:1.2)\` のように少しだけ強くする。1.4 を超えると髪の形が崩れやすくなります。数字は目安です。
3. \`BREAK\` で髪と服を分ける。
4. ネガティブに、髪の色が乗ってほしくない場所を書く。

部分ごとに色を固定する CutOff は [色プロンプト一覧](/guides/color-prompt-guide) にまとめてあります。

**銀髪が白い服に移らないように**

\`\`\`
1 adult woman, (silver hair:1.2), long hair, blue eyes
BREAK
white blouse, grey skirt, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
silver clothes, silver background, silver eyes
\`\`\``,
      },
      {
        title: '髪色だけ変えたい場合',
        content: `新規の一枚で髪色だけを守るより、すでに気に入った絵の髪の領域だけを塗り直す方が、顔は残りやすいです。やり方の骨格は二つです。

- img2img: 元の絵を入力にし、プロンプトの髪色だけを変える。顔や服のタグは元のまま残します。
- inpaint: 髪の範囲をマスクし、その中だけを新しい色で描き直す。

強さの数値やソフト名ごとの手順は、モデルと画面で違うのでここでは決めません。マスクが顔や服にはみ出すと、色がそこにも移ります。髪の外側をマスクに入れない、が先です。`,
      },
      {
        title: '配色の組み合わせ例',
        content: `髪、目、服をそれぞれ一色にします。似合う色の考え方は [パーソナルカラーと髪色](/guides/personal-color-hair-color)、写真から試す場合は [似合う髪色診断](/tools/hair-color-diagnosis) です。

**黒髪 × 暗い目 × 白シャツ**

\`\`\`
1 adult woman, black hair, dark eyes, white shirt,
upper body, looking at viewer, soft daylight
\`\`\`

**金髪 × 青い目 × 紺のニット**

\`\`\`
1 adult woman, blonde hair, blue eyes, navy knit sweater,
upper body, looking at viewer, indoor window light
\`\`\`

**銀髪 × 灰色の目 × 黒のタートル**

\`\`\`
1 adult man, young adult, silver hair, grey eyes, black turtleneck,
portrait, looking at viewer, plain background
\`\`\`

**赤髪 × 緑の目 × ベージュのコート**

\`\`\`
1 adult woman, red hair, green eyes, beige coat,
upper body, city street, overcast
\`\`\`

毛先やメッシュをツインテールに載せる書き方は [ツインテールプロンプト](/guides/twintail-prompt-guide) です。

ネガティブ（共通）:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
    ],
    faq: [
      {
        q: '金髪が黄色っぽくなります',
        a: '`blonde hair` を人物の直後に置き、`(blonde hair:1.2)` まで試します。ネガティブに `yellow hair, orange hair` を入れてください。それでも黄ばむときは `platinum blonde hair` に切り替えます。',
      },
      {
        q: 'メッシュが全体に広がります',
        a: '地の色を先、`streaked hair` と筋の色を後にします。筋の色の重みを地の色より弱くしてください。色を三色以上にすると筋ではなく全面になりやすいです。',
      },
      {
        q: '毛先だけ色を変えたいです',
        a: '`colored tips` と、毛先の色（例: `blue tips`）を、地の色のあとに書きます。`gradient hair` は境目がにじむので、はっきり分けたいときは `colored tips` の方が近いです。',
      },
      {
        q: '髪色が服に移ります',
        a: '服の色を別に書き、`BREAK` で髪と服を分けます。ネガティブに、髪の色が乗った服（例: `silver clothes`）を入れてください。色の固定そのものは色プロンプト一覧の CutOff の節です。',
      },
    ],
  },

  'muscular-prompt-guide': {
    sections: [
      {
        title: '筋肉量は段階で選ぶ',
        content: `「筋肉質 プロンプト」「筋肉 プロンプト」「マッチョ プロンプト」は、強さを一つに決めてから書き始めます。段階を同時に強くすると、細くしたいのに極端な筋肉になります。

このページの例は、服を着た大人です。肌を出す書き方は入れていません。体型全般は [体型プロンプト](/guides/body-type-prompt-guide)、作例の並びは [体型プロンプト集](/prompts/body-type) です。

| 段階 | 英語 | 見え方 |
|---|---|---|
| 引き締め | toned | 服の上から輪郭が少し分かる。筋肉の塊には見えない |
| 運動している体 | athletic | 肩と腕に厚みがある。日常のスポーツウェアで自然 |
| 筋肉質 | muscular | 肩、腕、胴の厚みがはっきりする |
| さらに厚い | very muscular | 服が張る。関節が崩れやすい |
| 競技の体 | bodybuilder | 肩と腕が最も厚い。服の形が優先されにくい |

\`heavyweight\` は体重級の印象で、筋肉の形そのものより体の大きさに寄ることがあります。形を決めたいときは \`muscular\` を先にしてください。`,
      },
      {
        title: '細マッチョ（引き締まった体）',
        content: `細マッチョは、細い腰と広い肩を同時に書くと伝わります。\`muscular\` だけだと段階が上に飛びます。

使う語は \`lean muscular build\`、\`toned\`、\`slim waist\`、\`broad shoulders\` です。\`lean muscular build\` は一つの決まったタグというより、細い筋肉を英語で指定する句です。

**細マッチョの立ち姿**

\`\`\`
1 adult man, young adult, lean muscular build, toned, slim waist, broad shoulders,
white t-shirt, dark trousers, standing, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
bodybuilder, very muscular, obese, fat, chubby
\`\`\`

腰まで細くなりすぎるときは \`slim waist\` を外し、\`toned\` だけに戻します。`,
      },
      {
        title: '部位タグ',
        content: `全身の段階に、見せたい部位を一つ足します。全部を同時に強くすると、腕が太りすぎたり関節が折れたりします。

| 英語タグ | 部位 |
|---|---|
| broad shoulders | 肩幅 |
| muscular arms | 腕全体 |
| biceps | 上腕 |
| thick neck | 首の太さ |
| muscular legs | 脚 |
| defined forearms | 前腕の輪郭 |
| v-taper | 肩が広く腰が狭いシルエット。句として足す |

\`abs\` は、服を着ているとほとんど見えません。形を出したいときは、体に沿う T シャツかタンクトップを書き、肌は出さないでください。腹の線を肌で描く指定はこのページでは使いません。

**肩と前腕だけを足す**

\`\`\`
1 adult man, toned, broad shoulders, defined forearms,
rolled up sleeves, button-up shirt, standing, cowboy shot
\`\`\``,
      },
      {
        title: '男性の筋肉質（ゴツい・大柄）',
        content: `厚い男性の体は \`muscular male\` を軸にします。\`burly\` はがっしり、\`large build\` は骨格ごと大きい、\`tall\` は高さです。高さと厚みは別なので、両方欲しいときだけ並べます。

**大柄で厚い立ち姿**

\`\`\`
1 adult man, muscular male, burly, large build, tall,
broad shoulders, thick neck,
olive t-shirt, work trousers, standing, full body, side lighting
\`\`\`

**自然文**

\`\`\`
An adult man with a large, muscular build, wearing an olive T-shirt and work trousers.
He stands full length in side light. Broad shoulders, thick neck, clothes on.
\`\`\`

小柄との対比は [低身長・小柄プロンプト](/guides/short-height-petite-prompt) と [体格差プロンプト](/guides/body-size-difference-prompt-guide) です。公開作例: [筋肉質の男性と小柄な女性](/prompt/bodytype-diff-muscular-male-petite-female)。`,
      },
      {
        title: '女性の筋肉質・アスリート体型',
        content: `女性の筋肉は \`muscular female\` です。日常の運動なら \`athletic woman\` と \`toned arms\` で足ります。顔や胸を強調する語は入れず、服と姿勢で体の厚みを出します。

服はスポーツウェア、武道着、鎧のように、体が隠れるものを選びます。

**アスリート（長袖のスポーツウェア）**

\`\`\`
1 adult woman, athletic woman, toned arms, broad shoulders,
track jacket, athletic pants, standing, full body, gym interior, bright even light
\`\`\`

**武道着**

\`\`\`
1 adult woman, muscular female, toned,
martial arts gi, standing, arms at sides, full body, dojo, soft daylight
\`\`\`

**鎧**

\`\`\`
1 adult woman, muscular female, broad shoulders,
plate armor, standing, full body, castle hall, side lighting
\`\`\`

公開作例: [タンクトップの力強い立ち姿](/prompt/muscle-woman-tank-top-powergirl)、[格闘技の体づくり](/prompt/athletic-jiu-jitsu-girl-muscles)、[ロングドレスの筋肉質](/prompt/muscular-bodybuilder-long-dress)。ドレスの作例は服が長いので、筋肉は肩と腕に出ます。`,
      },
      {
        title: '筋肉が見える服装・ポーズ・ライティング',
        content: `厚い体は、布が体に沿うか、袖がまくれていると読み取れます。

| 種類 | 英語タグ |
|---|---|
| タンクトップ | tank top |
| T シャツ | t-shirt |
| 袖のないフード | sleeveless hoodie |
| まくり袖 | rolled up sleeves |
| 力こぶのポーズ | flexing |
| 腕組み | arms crossed |
| 横からの光 | side lighting |
| 縁の光 | rim light |
| 腰から上 | cowboy shot |
| 全身 | full body |

ローアングルは体を大きく見せます。カメラの単語は [下からのアングル](/guides/low-angle-prompt-guide)、立ち方は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。

**まくり袖と横光**

\`\`\`
1 adult man, muscular, broad shoulders, muscular arms,
rolled up sleeves, henley shirt, arms crossed,
cowboy shot, side lighting, indoor
\`\`\`

**全身を少し下から**

\`\`\`
1 adult woman, athletic woman, toned,
t-shirt, athletic pants, standing, full body,
from below, slightly low angle, gym interior
\`\`\``,
      },
      {
        title: '崩れやすい点とネガティブ',
        content: `筋肉の語を増やすと、腕がもう一本できたり、肘が逆に曲がったり、血管だけが浮いたりします。段階は一つ、部位は一つ、から始めてください。

血管を出したくないときはネガティブに \`veiny\` を入れます。太さを出したくないときは \`fat, chubby\` です。逆に細マッチョが細すぎるときは、この二つは外します。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
deformed muscles, bad anatomy, extra arms, veiny
\`\`\`

よくある失敗:

- \`bodybuilder\` と \`toned\` を同じ強さで書くと、極端な側に寄る。段階は一つ。
- 顔アップだと肩幅タグが無視される。\`cowboy shot\` か \`full body\`。
- 女性の体が男性の顔になる。\`adult woman\` を人数の位置に残し、\`muscular male\` はネガティブへ。`,
      },
      {
        title: '体格差・身長差と組み合わせる',
        content: `二人の絵では、筋肉の段階と身長を別の文で書きます。片方だけ \`muscular\`、もう片方は \`slim\` や \`petite\` にすると差が残ります。

\`\`\`
1 adult man and 1 adult woman,
muscular man, broad shoulders, white t-shirt,
petite woman, slim, coat,
standing side by side, full body, clear height difference
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
same body type, same height
\`\`\`

身長の差そのものは [体格差プロンプト](/guides/body-size-difference-prompt-guide) と [身長差の構図](/guides/height-difference-illustration-composition-guide) です。`,
      },
    ],
    faq: [
      {
        q: '筋肉が付きすぎます',
        a: '`bodybuilder` と `very muscular` を外し、`toned` か `athletic` に下げます。ネガティブに `bodybuilder, very muscular` を入れてください。部位タグは一つだけ残します。',
      },
      {
        q: '細マッチョになりません',
        a: '`lean muscular build, toned, slim waist, broad shoulders` をセットにし、`muscular` を強くしないでください。全身か腰上でないと、腰の細さは画面に出ません。',
      },
      {
        q: '女性が男性的になりすぎます',
        a: '`muscular female` または `athletic woman` を人数の直後に置き、`muscular male` と `burly` はネガティブにします。顔のタグを男性向けの語にしないでください。',
      },
      {
        q: '服の上から筋肉を出したいです',
        a: '体に沿う `t-shirt`、`tank top`、`rolled up sleeves` と、`side lighting` を足します。`abs` は素肌でないと出にくいので、このページでは服を着た輪郭で見せます。',
      },
    ],
  },

  'high-angle-prompt-guide': {
    sections: [
      {
        title: '見下ろす構図と俯瞰の違い',
        content: `「見下ろす構図」「俯瞰 プロンプト」「上からのアングル」は、カメラが被写体より高い位置にある絵です。キャラクターが相手を見下ろしていることとは別です。視線の \`looking down\` は、目が下を向くだけで、カメラは正面のままになることがあります。

| 欲しいもの | 書く語 |
|---|---|
| カメラが上から見る | from above, high angle |
| 本人の目が下を向く | looking down |
| 本人がカメラを見上げる | looking up at viewer |

下から見上げる側は [下からのアングル](/guides/low-angle-prompt-guide) です。タグは [俯瞰](/tag/俯瞰)、[カメラアングル](/tag/カメラアングル)、作例の並びは [カメラプロンプト集](/prompts/camera) です。`,
      },
      {
        title: '上からのアングルの英語タグ一覧',
        content: `まず \`from above\` を置きます。ほかの語は、どれだけ真上に近づけるかの補助です。

| 英語タグ | カメラの位置 |
|---|---|
| from above | 斜め上。人物の見下ろしで最初に使う |
| high angle | 上からのアングル、という広い言い方。from above と併用しやすい |
| bird's-eye view | 鳥が見る高さ。地面の配置が見える |
| overhead shot | 頭の上に近い |
| top-down view | ほぼ真上。地図のようになる |
| aerial view | 上空。街や地形向き |
| from high above | かなり高い位置。人物は小さくなりやすい |

空撮の作例: [バードアイビューの広場](/prompt/aerial-birds-eye-view-square)。

**斜め上から、座っている大人**

\`\`\`
1 adult woman, sitting on a chair, from above, high angle,
upper body, reading a book, soft window light, fully clothed
\`\`\``,
      },
      {
        title: '角度の強さ（やや俯瞰・斜め俯瞰・真俯瞰）',
        content: `角度を度数で固定できる、とはここでは書きません。モデルは「何度」を守らないことが多いので、タグの組み合わせで強さを変えます。

| 強さ | 書き方 |
|---|---|
| やや俯瞰 | \`from above\` を弱くする。\`slightly high angle\` を添える |
| 斜め俯瞰 | \`from above, high angle\`。顔と肩の上面が見える |
| 真俯瞰 | \`top-down view\` または \`overhead shot\`。頭のてっぺんと床が主役になる |

やや俯瞰で頭だけが大きくなるときは、\`from above\` の重みを下げ、\`full body\` を足してカメラを少し引きます。真俯瞰に \`close-up\` を重ねると、顔のパースが強くなります。`,
      },
      {
        title: '画角との組み合わせ',
        content: `角度と、画面に入る範囲は別のタグです。足まで見たい見下ろしには \`full body\` が要ります。

| 範囲 | 英語タグ | 見下ろしでの見え方 |
|---|---|---|
| 全身 | full body | 頭から足まで。パースの確認に使う |
| 腰上 | cowboy shot | 脚は切れる。肩の上面が出る |
| 胸上 | upper body | 顔と机の上など |
| 寄る | close-up | 額と目が大きくなりやすい |

**全身のやや俯瞰**

\`\`\`
1 adult man, standing, full body, from above, slightly high angle,
coat, city sidewalk, daytime, looking at viewer
\`\`\`

**胸上の見下ろし**

\`\`\`
1 adult woman, from above, high angle, upper body,
sitting at a desk, looking up at viewer, knit sweater, office
\`\`\``,
      },
      {
        title: '視線とポーズ',
        content: `見下ろされている側の視線は \`looking up at viewer\` です。カメラの \`from above\` とセットにすると、「上から見られている」が絵になります。

このページで使う姿勢は、床に座る、草の上、膝を抱える、手をこちらへ伸ばす、までです。

| 英語タグ | 意味 |
|---|---|
| looking up at viewer | カメラを見上げる |
| sitting on floor | 床に座る |
| lying on grass | 草の上に横たわる |
| hugging own knees | 膝を抱える |
| reaching toward viewer | 手をカメラの方へ伸ばす |
| sitting | 椅子や床。家具は別に書く |

姿勢の基礎は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。

**床に座って見上げる**

\`\`\`
1 adult woman, sitting on floor, hugging own knees,
from above, high angle, looking up at viewer,
sweater, jeans, soft indoor light, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '風景・街を見下ろす構図',
        content: `街や風景を上から見せるときは、人物を小さくするか、人を入れないかを先に決めます。場所の単語は [背景プロンプト](/guides/background-prompt-guide) です。

人物の背中越しに街を見るなら \`from behind\` と \`rooftop\`、\`city view\` です。街そのものが主役なら \`cityscape\` と \`aerial view\` で、人はネガティブに回します。

**屋上から街**

\`\`\`
1 adult, from behind, standing on a rooftop, from above,
city view, cityscape, evening, coat, full body
\`\`\`

**人のいない空撮**

\`\`\`
aerial view of a town, cityscape, from high above,
daytime, clear weather, no people
\`\`\`

ネガティブ（空撮）:

\`\`\`
${NEGATIVE_BODY}, text, watermark, close-up face
\`\`\``,
      },
      {
        title: '二人の見下ろす構図・身長差',
        content: `二人を上から見ると、頭の位置の差で身長が比較しやすくなります。人数を先に書き、\`from above\` は弱めにしてください。強くすると二人が床の模様のように潰れます。

\`\`\`
1 adult man and 1 adult woman, standing side by side, full body,
from above, slightly high angle, clear height difference,
coats, city sidewalk, daytime
\`\`\`

身長差の型は [身長差イラストの構図](/guides/height-difference-illustration-composition-guide)、壁に手をつく距離は [壁ドンプロンプト](/guides/kabedon-prompt-guide) です。壁ドンを真上から見ると手が壁に溶けやすいので、その構図は斜め前を先に試してください。`,
      },
      {
        title: '崩れやすいポイントとネガティブ',
        content: `上からのカメラは、頭が大きく、脚が短く見えるパースを作ります。これは故障というより、近い広角の見え方です。直すときは、角度を弱めるか、カメラを引きます。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
huge head, short legs, distorted perspective, extra limbs
\`\`\`

直し方:

1. \`from above\` の重みを 1.1 前後まで下げる。
2. \`full body\` を足して、頭だけのアップをやめる。
3. まだ頭が大きいなら \`slightly high angle\` に弱める。
4. 真俯瞰が欲しいときだけ \`top-down view\` に上げる。`,
      },
      {
        title: 'ローアングルとの使い分け',
        content: `| | 見下ろす（このページ） | 見上げる |
|---|---|---|
| カメラ | 被写体より高い | 被写体より低い |
| 最初のタグ | from above | from below |
| 人物の印象 | 位置が把握しやすい。頭がやや大きい | 体が大きく、堂々と見える |
| 向いているもの | 床、机、街、座っている人 | 立ち姿、建物 |
| 詳細 | このページ | [下からのアングル](/guides/low-angle-prompt-guide) |

両方を同じ強さで書くと、カメラの高さが打ち消し合います。主にする方を一つにしてください。正面・斜め・全身など他の構図は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。`,
      },
    ],
    faq: [
      {
        q: '相手を見下ろす、とカメラの俯瞰は同じですか？',
        a: '違います。相手を見下ろす視線は `looking down`、カメラが上にあるのは `from above` です。両方欲しいときだけ並べてください。',
      },
      {
        q: '頭だけが大きくなります',
        a: '`close-up` を外し、`full body` か引きの構図にします。`from above` の重みを下げ、`slightly high angle` に弱めてください。',
      },
      {
        q: '真俯瞰にしたいです',
        a: '`top-down view` または `overhead shot` を、`from above` より優先します。人物の表情はほとんど見えなくなります。表情が要るなら斜め俯瞰のままにしてください。',
      },
      {
        q: '足が短くなります',
        a: '見下ろしのパースです。`full body` で足先まで入れ、角度をやや俯瞰に戻します。ネガティブに `short legs` を足すと、さらに短くなることがあるので、まずは角度を弱めてください。',
      },
    ],
  },

  'kabedon-prompt-guide': {
    sections: [
      {
        title: '壁ドンに必要な3要素',
        content: `「壁ドン プロンプト」は、壁、手の位置、二人の距離、の三つが揃って初めてそれらしい絵になります。\`kabedon\` だけだと、二人が壁の前に立っているだけになることがあります。

1. 壁: \`against wall\` または \`wall\`
2. 手: \`hand on wall\`、腕を上げるなら \`arm up\`
3. 距離: \`face to face\`、\`close-up\`、体が前に出るなら \`leaning forward\`

このページは大人の恋愛コメディです。驚いた顔や真剣な視線は使います。恐れ、無理に押さえつける、閉じ込められている、という書き方は使いません。学生服の場面も入れません。

二人の構図全般は [二人構図](/guides/two-person-composition-prompt-guide)、男性二人は [BL 構図](/guides/bl-composition-prompt-guide)、タグの作例は [壁ドン](/tag/壁ドン) です。`,
      },
      {
        title: '壁ドンの英語タグ',
        content: `| 英語タグ | 役割 |
|---|---|
| kabedon | 壁ドン、という動作の名前。単独では手が壁につかないことがある |
| hand on wall | 手のひらが壁についている |
| against wall | 背中や体が壁側 |
| arm up | 腕が上がっている |
| leaning forward | する側の体が前に出る |
| looking down | する側の視線が下 |
| looking up | される側の視線が上 |
| blush | 照れ |
| face to face | 向かい合う |
| close-up | 顔が近い。全身の壁は見えにくくなる |

**オフィスで、片手**

\`\`\`
1 adult man and 1 adult woman, kabedon, hand on wall, against wall,
face to face, leaning forward,
the man looking down gently, the woman looking up, blush, surprised,
office, soft daylight, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
scared, crying, angry, school uniform
\`\`\`

公開作例: [身長差の壁ドン](/prompt/height-diff-couple-kabedon-looking-up)。`,
      },
      {
        title: 'する側・される側の書き分け',
        content: `一人ずつ書かないと、両方の手が壁についたり、体が融合したりします。Stable Diffusion では \`BREAK\` で二人を分けるか、先に誰の手かを文で指定します。

\`\`\`
1 adult man, hand on wall, arm up, leaning forward, looking down, gentle smile
BREAK
1 adult woman, against wall, looking up, blush, surprised
BREAK
office wall, face to face, upper body
\`\`\`

NovelAI V4 以降には、キャラクターごとの action タグがあります。公式ドキュメント（Multiple Characters）では、する側を \`source#\`、される側を \`target#\`、お互いを \`mutual#\` と書く、と説明されています。公式の例は \`source#hug\` と \`target#hug\` です。\`kabedon\` を同じ接頭辞で書く使い方は日本語の検証記事にありますが、公式ページの例そのものではないので、効かないときは \`hand on wall\` と \`against wall\` を共通の側にも書いてください。

\`\`\`
1 adult man, source#kabedon, hand on wall, looking down
1 adult woman, target#kabedon, against wall, looking up, blush
\`\`\`

地域分割（regional prompter）を使う場合も、する側の領域に手と腕、される側の領域に背中と壁、を分けます。両方の領域に \`hand on wall\` を入れると、手が二組できます。`,
      },
      {
        title: '身長差の壁ドン',
        content: `高い側が手をつき、低い側が見上げると、壁ドンの距離が読み取れます。\`tall man\` と \`short woman\` のように高さを先に書き、視線は \`looking down\` と \`looking up\` で対にします。

\`\`\`
1 tall adult man and 1 short adult woman,
kabedon, the man's hand on the wall above her shoulder,
the man looking down, the woman looking up, blush,
against wall, apartment entrance, upper body, soft indoor light
\`\`\`

構図の型は [身長差イラストの構図](/guides/height-difference-illustration-composition-guide)、数値や関係性から文を組むときは [身長差メーカー](/tools/height-difference-maker) です。

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
same height, scared, school uniform
\`\`\``,
      },
      {
        title: '一人称視点（POV）の壁ドン',
        content: `\`pov\` はカメラが誰かの目の位置です。見る側が壁ドンするのか、されるのかを、手の主語で分けます。

**カメラの側が手をつく（する側の POV）**

\`\`\`
pov, 1 adult woman, against wall, looking at viewer, blush, surprised,
a hand on the wall beside her head, office, close-up
\`\`\`

この書き方では、画面に出る人物はされる側一人です。する側の体は手だけにします。

**カメラの側が壁にいる（される側の POV）**

\`\`\`
pov, 1 adult man, leaning forward, hand on wall, looking at viewer,
gentle smile, office, close-up
\`\`\`

両方の全身を見せたいときは \`pov\` を外し、前の節の二人書きに戻してください。\`pov\` と \`2 people\` を同じ強さにすると、人数が割れます。`,
      },
      {
        title: 'アングルと構図',
        content: `壁と手の両方を見せるなら、真横か斜め前です。真下や真上にすると、手が壁のテクスチャに溶けます。

| アングル | 英語タグ | 向き |
|---|---|---|
| 横 | from side | 腕の長さと壁の面が見える |
| 斜め | three-quarter view | 顔と手の両方 |
| 低い位置 | from below | する側が大きく見える。詳細は [下からのアングル](/guides/low-angle-prompt-guide) |
| 少し上 | from above | 頭の位置の差。強すぎると手が消える。詳細は [見下ろす構図](/guides/high-angle-prompt-guide) |
| 顔 | close-up | 壁は端にしか出ない |

**横から**

\`\`\`
1 adult man and 1 adult woman, kabedon, hand on wall, against wall,
from side, upper body, looking at each other, blush,
library, quiet daylight
\`\`\`

近い距離のほかの型は [ハグ](/guides/hug-prompt-guide) と [キス](/guides/kiss-prompt-guide) です。足が浮くお姫様抱っこは [お姫様抱っこプロンプト](/guides/princess-carry-prompt-guide) です。壁ドンの例にキスは重ねていません。`,
      },
      {
        title: '場所と表情',
        content: `場所は、オフィス、アパートの入口、図書館、路地、カフェの奥の壁、のどれか一つです。表情は照れ、驚き、真剣な視線、のどれか一つです。恐れの顔はネガティブに入れます。

| バリエーション | 書き方 |
|---|---|
| 片手 | \`hand on wall\` を一つ。\`one hand\` |
| 両手 | 両手を壁につけると指が増えやすい。まずは片手 |
| 肘 | 専用の安定したタグはここでは決めません。\`leaning forward, arm up\` に、肘が壁に触れていることを短い英語で足す |
| あごに軽く触れる | \`hand on another's chin\`。力を入れる描写は足さない |

**カフェの奥、片手、照れ**

\`\`\`
1 adult woman and 1 adult man,
kabedon, one hand on wall, against wall, face to face,
blush, surprised, gentle eye contact,
cafe back wall, warm indoor light, upper body
\`\`\`

**あごに触れる（軽く）**

\`\`\`
1 adult man and 1 adult woman, against wall,
hand on another's chin, the other hand on wall,
blush, looking at each other, office, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
scared, crying, angry, tears, school uniform, classroom
\`\`\`

床に手をつく構図はこのページでは扱いません。`,
      },
      {
        title: '崩れやすい点とネガティブ',
        content: `手が壁の中に入り、腕がもう一本でき、二人の肩が一つの胴になります。壁の単語を背景だけにせず、\`hand on wall\` をする側にだけ置いてください。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
hand merged with wall, extra arms, fused bodies, conjoined,
scared, school uniform
\`\`\`

直し方:

1. する側の手を一文で指定する（\`the man's hand on the wall\`）。
2. アングルを \`from side\` にして、腕の輪郭を見せる。
3. \`close-up\` を外し、肩まで入れて腕の付け根を見せる。
4. まだ溶けるなら、手の指の指定をやめ、\`hand on wall\` だけにする。指を詳しく書くほど手は崩れます。`,
      },
    ],
    faq: [
      {
        q: '壁ドンにならず、ただ並んでいるだけになります',
        a: '`kabedon` に `hand on wall` と `against wall` を足してください。する側には `leaning forward`、距離には `face to face` を一つ添えます。',
      },
      {
        q: '手が壁に溶けます',
        a: '真上や極端な寄りをやめ、`from side` にします。手の主語を一人に限定し、ネガティブに `hand merged with wall, extra arms` を入れてください。',
      },
      {
        q: 'する側とされる側が逆になります',
        a: '手を壁につける人の名前を文で書きます。NovelAI では公式の `source#` / `target#` を試せますが、公式の例は hug です。`kabedon` で効かないときは `hand on wall` をする側だけに残してください。',
      },
      {
        q: '身長差が消えました',
        a: '顔のアップをやめ、`upper body` か全身で肩の高さを見せます。`tall` と `short` を人数の直後に置き、構図の型は身長差イラストのページと併用してください。',
      },
      {
        q: '英語では何と書きますか？',
        a: '動作の名前は `kabedon`、手は `hand on wall`、壁側の体は `against wall` です。この三つを、大人の人数タグのあとに置いてください。',
      },
    ],
  },
}
