/**
 * Eighth SEO batch (2026-10-31): adult male characters, ID photos,
 * hands and fingers, lighting, and Christmas.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume stays 0 in GUIDES — exact volumes are not published here.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_8_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'male-character-prompt-guide': {
    sections: [
      {
        title: '男性キャラプロンプトの基本',
        content: `「男性 プロンプト」「男性キャラ プロンプト」「イケメン プロンプト」で最初に決めるのは、人数と性別です。先頭は \`1 adult man, male focus\` にします。\`adult\` を残してください。人数を書かないと、画面の端に別の人が足されます。

学生服や学ランは使いません。このページは、スーツ、私服、鎧、袴など、成人の服装だけを扱います。美形の成人男性は \`handsome adult man\` と自然な英語で足せます。年齢を下げる語は入れません。

書く順番は、体型、顔、髪、服、ポーズです。体型を服より後ろに置くと、ジャケットの形が平均に戻って、肩幅が消えやすくなります。髪を顔より前に強くすると、目の形が髪に負けます。一度に足すのは、体型を一つ、髪を一つ、服の部品を二つまでです。

アニメ塗りと写真では、同じ順番を使います。イラストは \`male focus\` を前に置いた方が、顔が中性に寄りにくいです。写真は、navy suit のように色と素材を自然な英語で足した方が、布の質が出ます。Midjourney は重みの括弧を外し、全身なら文の末尾で縦横を指定します。

作例の並びは [体型プロンプト集](/prompts/body-type)、体型の単語そのものは [体型プロンプト](/guides/body-type-prompt-guide) です。2人の体格差・身長差は [体格差プロンプト](/guides/body-size-difference-prompt-guide) に渡します。このページでは一人だけを書きます。ショットの大きさは [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

比較するときは、服と背景を固定して、体型か髪かの一方だけを差し替えます。両方を動かすと、顔が変わった理由が残りません。気に入った枚は、タグの順番を崩さずにコピーし、次の一語だけを足してください。先頭の人数が後ろに回っている枚は、服がどれだけ正しくても一度捨てます。人数を戻してから、同じ服でもう一度出します。メモには、変えた語の名前だけを残すと、次の日に同じ顔へ戻れます。

顔が安定したあとに足してよいのは、メガネか、ひげか、無地の背景か、の一つです。三つを同じ日に試すと、どの変更で輪郭が変わったのかが残りません。無地で顔が決まった枚だけを、オフィスやカフェへ移してください。背景を先に凝ると、顔の情報が場所の模様に負けます。

服の色を変えるのは、顔と髪が三枚続けて同じに見えてからです。一枚だけ似ている状態で色を変えると、次の枚で髪の長さまで動きます。同じに見えないときは、足した語を一つ外して、無地の背景に戻してください。

無地に戻しても顔が違うときは、髪の色の語が残っていないかを見ます。色を変えた記憶が文の途中にあると、長さの指定より色が勝って、輪郭まで動きます。色の語を外し、長さだけに戻してから、もう一度無地で出してください。

**アニメ塗りの型**

\`\`\`
1 adult man, male focus, short hair, suit, necktie,
standing, looking at viewer, upper body, anime style
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

**写真の型**

\`\`\`
1 adult man, male focus, short hair, navy suit, white dress shirt, necktie,
standing, plain gray background, upper body, photorealistic
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\``,
      },
      {
        title: '体型の一覧',
        content: `体型は一つにします。細身と筋肉質を同じ強さで並べると、どちらでもない平均の体になります。服は着たままにしてください。肌を出す書き方は入れません。

細身は slim と自然な英語です。公式タグとしては断定しません。肩だけ広くしたいときは broad shoulders と自然な英語で一つ足します。運動している体は athletic build と自然な英語です。\`muscular\` は肩と腕の厚みがはっきりする段階です。それ以上に盛る書き方は [筋肉質プロンプト](/guides/muscular-prompt-guide) に分けてあります。\`muscular\` を外して athletic build に戻すと、日常の服の形が残りやすくなります。

身長は \`tall\` です。数字のセンチは、モデルが測る値にはなりません。一人を高く見せる調整は [高身長プロンプト](/guides/tall-height-prompt-guide) です。ふくよかさは plump や heavyset と自然な英語です。丸みの段階は [ぽっちゃりプロンプト](/guides/plump-body-prompt-guide) に任せ、このページでは服の上から分かる体の量だけを書きます。

体型を変える比較では、髪と服と背景を固定します。背景まで変えると、体の差なのか場所の差なのかが分からなくなります。モデルによって効きが弱いことがあります。そのときは体型の語を人数の直後に戻し、服の部品を一つ減らしてください。

| 体型 | 書き方 | 置き方 |
|---|---|---|
| 細身 | slim（自然な英語） | 人数の直後。\`muscular\` と同時に強くしない |
| 引き締まった体 | athletic build（自然な英語） | 日常の服と一緒に |
| 筋肉質 | \`muscular\` | 強くしすぎたら外す。詳細は筋肉質のガイド |
| 肩幅 | broad shoulders（自然な英語） | 一つ。胸の形は書かない |
| 長身 | \`tall\` | 全身と一緒に。詳細は高身長のガイド |
| ふくよか | plump / heavyset（自然な英語） | 詳細はぽっちゃりのガイド。服は着たまま |

体型が服に負けたら、体型の語を \`male focus\` の直後へ移します。重みは \`(slim:1.2)\` のように一つだけ上げてください。二つを同時に 1.3 以上にすると、関節が伸びやすくなります。

体型の確認は全身で行い、顔の確認は上半身に切り替えます。全身のまま顔の語を足すと、顔より脚の長さが優先されることがあります。細身なのに肩だけ広い、という差は、slim を残したまま broad shoulders を一つ足した枚で見てください。両方を強くすると、胴が細いまま肩だけが板のように広がります。その枚は、肩の語を外してから重みを下げます。

全身で体型を確認した枚は、上半身用にコピーして、顔と髪の確認用と分けて残します。一つの文を全身と顔で共用すると、顔を直したときに脚の長さまで変わります。体型の語は、両方で同じ位置に置いてください。`,
      },
      {
        title: '顔立ちと年齢感',
        content: `年齢は、20代、30代、40代のどれかを一つ書きます。\`adult man in his 20s\`、\`adult man in his 30s\`、\`adult man in his 40s\` は自然な英語です。公式タグとしては断定しません。\`adult\` は残します。世代の単語そのものは [年齢プロンプト](/guides/age-prompt-guide) です。

顔の輪郭は sharp jawline と自然な英語で足せます。目の形は \`tsurime\` と \`tareme\` です。つり目とたれ目を両方強くすると、眉の位置が平均になります。片方だけにしてください。目の色やハイライトは [目・瞳のプロンプト一覧](/guides/eye-prompt-guide) に渡します。このページでは、目の形を一つまでです。

ひげは段階で分けます。\`stubble\` は無精ひげ、\`beard\` はあごひげ、\`mustache\` は口ひげです。三つを同じ強さにすると、顔の下半分が黒く潰れます。メガネは \`glasses\` です。眼鏡の形を左右で変えないでください。

いわゆるイケオジは、年齢を下げずに書きます。\`adult man in his 40s, stubble, slicked back hair, suit\` です。若い顔にひげだけを足しても、40代にはなりません。年齢の語を髪より前に置いてください。

公開作例の高齢の男性は [絵を描く男性](/prompt/colorful-paint-thoughtful-elderly-man) です。このページのテンプレは20代から40代が中心で、作例は顔のしわと落ち着いた服の参考に使えます。

**40代のスーツ**

\`\`\`
1 adult man, male focus, adult man in his 40s, stubble, slicked back hair,
suit, necktie, glasses, looking at viewer, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

若く見えすぎるときは、年齢の語を前に戻し、ネガティブの年齢の語を残します。髪を長くするだけでは年齢は上がりません。

ひげを足す前に、年齢の句が先頭近くにあるかを見てください。年齢が後ろにあると、\`stubble\` は若い顔の上の点になります。メガネは顔の輪郭が決まってから足します。輪郭とメガネとひげを同時に動かすと、別人の顔が三枚分混ざります。40代にしたいのに目が大きいときは、目を大きくする語を外し、\`tareme\` か \`tsurime\` の一方だけを残してください。`,
      },
      {
        title: '髪型の一覧',
        content: `髪型は一つです。短髪とロングを同じ強さにすると、長さが肩のあたりで止まります。色は [髪色プロンプト](/guides/hair-color-prompt-guide)、長さや前髪の細かい差は [髪型プロンプト](/guides/hairstyle-prompt-guide) です。このページでは、男性の輪郭が残る髪型だけを並べます。

\`short hair\` が基本です。\`undercut\` は横と後ろを短くした形、\`messy hair\` は寝ぐせ寄りの短髪、\`slicked back hair\` は後ろへ流した髪です。七三は side-parted hair、センターパートは center-parted hair と自然な英語です。どちらも公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは \`short hair\` に戻して、分け目の語を一つだけ残してください。

ウルフカットは wolf cut、マッシュは mushroom cut と自然な英語です。公式タグとしては断定しません。両方を書くと、毛先の長さが平均になります。ロングの男性は \`long hair\` と \`ponytail\` です。ロングと短髪を同時に強くしないでください。

| 髪型 | 書き方 | 注記 |
|---|---|---|
| 短髪 | \`short hair\` | 最初の一手 |
| 刈り上げ | \`undercut\` | 横を短くするとき |
| 無造作 | \`messy hair\` | 強くすると寝ぐせに寄る |
| オールバック | \`slicked back hair\` | スーツと一緒にしやすい |
| 七三 | side-parted hair（自然な英語） | 公式タグとしては断定しない |
| センターパート | center-parted hair（自然な英語） | 公式タグとしては断定しない |
| ウルフカット | wolf cut（自然な英語） | マッシュと同時に強くしない |
| マッシュ | mushroom cut（自然な英語） | 公式タグとしては断定しない |
| ロング | \`long hair\`, \`ponytail\` | 結ぶなら ponytail を一つ |

髪が女性の長さに寄るときは、\`short hair\` を \`male focus\` の直後に戻します。色を先に強くすると、長さより色が優先されることがあります。

色を変える比較では、長さのタグを固定します。黒髪の短髪と、金髪の短髪を見比べるとき、\`undercut\` まで同時に変えないでください。分け目の語が効かないモデルでは、\`short hair\` に戻してから side-parted hair を自然な英語で弱く足します。それでも分かれないときは、分け目は諦め、長さと色だけで次に進みます。髪型のガイドにある前髪の語を、このページでは一つまでにしてください。`,
      },
      {
        title: '服装の一覧',
        content: `服は、場面を一つ決めてから部品を足します。スーツと私服を同じ強さにすると、ジャケットの下にパーカーが溶けます。部品は二つまでです。

スーツは \`suit\` と \`necktie\` です。ジャケット、シャツ、ズボンの分け方は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide)、タグの並びは [スーツ](/tag/スーツ) です。シャツは白いドレスシャツを自然な英語で white dress shirt と書きます。襟の左右を別の形にはしません。

私服は \`hoodie\`、\`jacket\`、\`coat\` です。ニットは knit sweater、ジーンズは jeans と自然な英語です。公式タグとしては断定しません。パーカーとコートを両方強くすると、袖が二重になります。季節の外着は一つにしてください。

和装は hakama と自然な英語です。帯や羽織の詳細は [着物プロンプト](/guides/kimono-prompt-guide) です。ファンタジーは騎士か魔法使いを一つにし、部品は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) に合わせます。執事は butler outfit と tailcoat を自然な英語で書きます。公式タグとしては断定しません。エプロンとカチューシャは執事には足しません。

| 場面 | 先に書く語 | 足す部品 |
|---|---|---|
| スーツ | \`suit\`, \`necktie\` | white dress shirt（自然な英語） |
| 私服 | \`hoodie\`, \`jacket\`, \`coat\` | knit sweater, jeans（自然な英語） |
| 和装 | hakama（自然な英語） | 詳細は着物のガイド |
| 騎士・魔法使い | \`armor\` または \`robe\` | 詳細はファンタジー衣装のガイド |
| 執事 | butler outfit, tailcoat（自然な英語） | シャツと \`necktie\`。公式タグとしては断定しない |

服が現代のTシャツに戻るときは、場面の語を人数の直後に戻し、背景の小物を一つ外します。背景が強いと、服より場所が優先されます。

スーツの枚で私服の語が残っていたら、\`hoodie\` と jeans を消してから再生成します。私服の枚でネクタイが残るときは、\`necktie\` をネガティブには入れず、ポジティブから外すだけで足りることが多いです。和装と鎧は、現代の街と一緒に強くしないでください。場所が現代だと、袴の裾がズボンに戻ります。場所を木の廊下か石の広間に変えてから、衣装を見てください。`,
      },
      {
        title: 'ポーズと表情',
        content: `ポーズは一つです。腕組みとポケットを同じ強さにすると、手が両方をやろうとして指が増えます。手の位置の一覧と、指が溶けるときの直し方は [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。立ち方の全般は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、表情の単語は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。

腕は \`arms crossed\`、ポケットは \`hands in pockets\`、あごに手を添えるのは \`hand on own chin\` です。壁にもたれるのは leaning against a wall、椅子に座るのは sitting on a chair と自然な英語です。公式タグとしては断定しません。もたれるときは、背景に壁があることを書いてください。壁が無いと、体が斜めに傾くだけになります。

表情は \`looking at viewer\` を土台に、\`smile\` か \`serious\` のどちらかです。笑顔と真剣を同時に強くすると、口が中途半端に開きます。口を閉じるなら \`closed mouth\` を一つ足します。

手を胸の前や、脚の付け根や、太ももの上には置きません。相手の体に手を置く構図も、このページでは書きません。一人の立ち姿か、椅子に座った姿にしてください。

**腕を組んだ立ち姿**

\`\`\`
1 adult man, male focus, short hair, jacket, jeans,
arms crossed, standing, looking at viewer, serious, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

全身で指が点になるときは、\`full body\` を外して \`upper body\` にします。手の形が要るポーズだけ、画面の中で手を少し大きくしてください。大きくしすぎると、指は増えやすくなります。

表情は、ポーズが決まってから一つ足します。\`smile\` を先に強くすると、腕の位置が平均の下ろした形に戻ることがあります。真剣な顔でポケットに手を入れるときは、\`serious\` と \`hands in pockets\` の重みを同じにせず、手のタグを前に置いてください。壁にもたれる自然な英語が効かないときは、背景に plain wall と書き、体の語は standing だけに減らします。椅子が描かれないときは、sitting on a chair を背景より前に戻してください。`,
      },
      {
        title: 'コピーできるテンプレ集',
        content: `ここからは、場面ごとの全文です。どれも \`1 adult man\` から始まり、服を着ています。変えてよいのは、年齢、髪、服、背景を一つずつです。一度に全部を差し替えないでください。

テンプレを自分のキャラに寄せるときは、髪の色、服の色、場所、の順で一枚ずつ変えます。三枚目で顔が別の人になったら、二枚目に戻ります。年齢の句を足すのは、髪と服が安定してからです。ファンタジーの鎧と、カフェの私服を一つの文に混ぜないでください。場面が違うテンプレは、別のプロンプトとして保存します。

保存名は、年齢と髪と服が分かるものにします。カフェなのか鎧なのかが名前で分かると、混ぜる事故が減ります。公開作例の顔を、自分のテンプレの顔として写さないでください。部品の順番だけを借り、年齢と服はこちらの文で書き直します。

テンプレの背景が石の広間やカフェのまま自分の話に合わないときは、背景の語だけを無地に戻します。人物の行は触りません。人物の行まで書き換えると、それまでの年齢と髪の確認が無効になります。無地で顔が同じなら、そのあとで場所を一文だけ足してください。

ファンタジーの騎士は、酒場の公開作例 [ダークファンタジーの戦士](/prompt/dark-fantasy-tavern-warrior) と部品の考え方が近いです。作品名や実在の人物名は書きません。鎧の部品は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) で確認できます。

**ビジネスのスーツ**

\`\`\`
1 adult man, male focus, adult man in his 30s, short hair,
navy suit, white dress shirt, necktie, standing, office lobby,
looking at viewer, closed mouth, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

**私服のカフェ**

\`\`\`
1 adult man, male focus, messy hair, hoodie, jeans,
sitting on a chair, holding cup, cafe interior, smile, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

**黒髪のクール**

\`\`\`
1 adult man, male focus, short hair, black hair, undercut,
black jacket, black shirt, standing, night street, serious, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

**金髪のジャケット**

\`\`\`
1 adult man, male focus, blonde hair, messy hair, stubble,
brown jacket, knit sweater, jeans, standing, city sidewalk, smile, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

**40代のオールバック**

\`\`\`
1 adult man, male focus, adult man in his 40s, slicked back hair, stubble,
gray suit, necktie, glasses, standing, plain gray background,
looking at viewer, serious, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\`

**ファンタジーの騎士**

\`\`\`
1 adult man, male focus, short hair, knight, armor, cape,
standing, stone hall, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine, modern clothes
\`\`\`

**袴の和装**

\`\`\`
1 adult man, male focus, black hair, ponytail, hakama,
standing, wooden corridor, looking at viewer, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine, modern clothes
\`\`\`

**実写のポートレート**

\`\`\`
1 adult man, male focus, adult man in his 30s, short hair, light stubble,
charcoal suit, white dress shirt, necktie,
plain gray background, soft daylight, looking at viewer, upper body, photorealistic
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes,
shirtless, topless, 1girl, female, woman, feminine
\`\`\``,
      },
      {
        title: '崩れやすいときの直し方',
        content: `女性っぽくなる、または中性的になりすぎるときは、\`male focus\` を先頭の近くに戻します。肩は broad shoulders と自然な英語で一つ足し、髪は \`short hair\` に戻してください。女性を示す語は、ネガティブにだけ入れます。ポジティブには書きません。

若く見えすぎるときは、\`adult man in his 30s\` か \`adult man in his 40s\` を人数の直後へ移します。ネガティブの年齢の語は残してください。目を大きくする語を足すと、年齢は下がりやすくなります。

筋肉が過剰なときは、\`muscular\` を消して athletic build に戻します。肩幅だけ残したいなら broad shoulders を一つです。\`muscular\` に重みを足したまま服を増やすと、服の縫い目が割れます。

顔が別人になるときは、変える語を一つに減らします。髪の色と、ひげと、メガネを同時に動かさないでください。背景が人物より強いときは、背景を plain gray background のような無地に戻してから、服を足します。

ネガティブを長くしても、先頭の \`1 adult man\` の代わりにはなりません。人数が消えた絵は、まず人数を戻してください。

女性っぽさが残る枚は、髪を \`short hair\` に戻し、肩の自然な英語を一つ足したうえで、もう一度だけ出します。それでも顔が中性なら、服の部品を一つ減らします。服が多いと、性別の語より布の形が優先されることがあります。筋肉が服を突き破る枚は、\`muscular\` を消した版を先に保存し、厚みが欲しくなったときだけ athletic build を戻します。`,
      },
      {
        title: 'ChatGPT・Geminiの自然文',
        content: `ChatGPT や Gemini では、タグをカンマで並べるより、一人の成人を文章で書いた方が安定することが多いです。Midjourney に渡すときも、同じ内容を短い文にできます。重みの括弧は外してください。

残すものは、成人であること、年齢の幅、髪の長さ、服の部品、場所、カメラの距離です。作品名や、生きている絵師の名前では顔を指定しません。

**自然文の例**

\`\`\`
1 adult man. A Japanese man in his 30s, adult, with short neat black hair and a calm closed-mouth expression.
He wears a navy suit, a white dress shirt, and a necktie. Long sleeves, no exposed skin beyond the face and hands.
Upper body, plain gray background, soft daylight, looking at the viewer. Photorealistic portrait.
\`\`\`

Stable Diffusion や NovelAI に戻すときは、この文を、人数、\`male focus\`、髪、スーツ、\`necktie\`、上半身、のタグ列に分解してください。自然文のまま重みだけを足しても、タグの順番は戻りません。

Gemini に写真を渡す回と、文章だけで新規に描く回は、プロンプトを分けてください。写真を渡すときは、顔を変えないことを先頭に書きます。文章だけなら、成人、年齢の幅、髪、服、場所、距離、の順です。Midjourney では、この自然文から括弧を外し、縦の肖像なら文の末尾で縦横を指定します。同じ文を Stable Diffusion にそのまま貼ると、語順が平均になることがあります。`,
      },
    ],
    faq: [
      {
        q: '男性キャラが女性っぽくなります',
        a: '先頭を `1 adult man, male focus` に戻し、髪は `short hair`、肩は broad shoulders と自然な英語で一つ足します。`1girl` や feminine はネガティブにだけ入れてください。ポジティブに女性を示す語を残すと、顔が平均になります。',
      },
      {
        q: '体型の語を書いても標準体に戻ります',
        a: '体型は人数の直後に一つだけ置きます。slim と `muscular` を同じ強さにしないでください。服の部品を二つまでに減らし、重みは `(slim:1.2)` から試します。細かい段階は体型プロンプトと筋肉質プロンプトに分けてあります。',
      },
      {
        q: '20代と40代が同じ顔になります',
        a: '`adult man in his 40s` のような年齢の句を髪より前に置き、`stubble` か `beard` を一つ足します。目を大きくする語は外してください。ネガティブの年齢の語は毎回残します。',
      },
      {
        q: 'ウルフカットや七三が通りません',
        a: 'wolf cut と side-parted hair は自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは `short hair` に戻し、分け目か毛先の語を一つだけ残してください。',
      },
      {
        q: '二人の身長差もこのページで書けますか',
        a: 'このページは一人です。二人の体格差・身長差は体格差プロンプトへ渡してください。人数を 2 にすると、このページの服と髪型の指定が平均になります。',
      },
    ],
  },

  'id-photo-ai-prompt-guide': {
    sections: [
      {
        title: '証明写真でできることとできないこと',
        content: `「証明写真 プロンプト」「chatgpt 証明写真 プロンプト」で必要なのは、自分の写真を証明写真風に整える指示と、提出できない場面の区別です。このページは、成人の本人の写真だけを対象にします。他人の写真は使いません。

パスポート、マイナンバーカード、運転免許証などの公的書類には、AIで生成したり加工したりした写真を使わず、規格に沿って撮影した写真を使ってください。外務省や都道府県の案内では、パスポート写真について、画像処理ソフトなどで加工した写真（美白、顔や背景の修正、左右の反転など）は不可とされています。必ず提出先の最新の規定を確認してください。

履歴書や就活の写真は、応募先の指示に従ってください。本人と大きく違う加工は避けます。AIの写真がどこかで受理される、とはこのページでは書きません。

タグの並びは [証明写真](/tag/証明写真)、写真を編集する作例の置き場は [写真加工プロンプト集](/prompts/photo-edit) です。文章で指示する型は [ChatGPTプロンプト](/guides/chatgpt-prompt-techniques) と [Geminiプロンプト集](/guides/gemini-prompt-collection) です。

| やりたいこと | このページでの扱い |
|---|---|
| 背景を白・青・グレーにする | 本人の顔を残す指示として書ける |
| スーツに整える、髪や服の乱れを直す | 顔の形を変えない条件とセットにする |
| 明るさを均一にする | 影を弱くする指示として書ける |
| パスポート・マイナンバー・免許などの公的書類 | 加工写真は使わない。撮影した写真を使う |
| 別人に見える美白や顔の形の変更 | 避ける |
| 子どもの写真 | 使わない |

運転免許証や在留の書類など、発行元が別に決まっている写真も同じです。画面でそれっぽく見えても、提出用にはしません。

作業は二段に分けます。一段目は、自分の写真で背景色と肩の位置を見る練習です。二段目は、発行元の窓口や案内に書かれた方法で撮影することです。一段目の画像を、二段目の代わりに印刷しないでください。練習で気に入った明るさは、撮影のときの照明の参考にはできます。ファイルそのものを提出する、ではありません。

練習で見る項目は、背景が一色か、肩が水平か、頭頂が切れていないか、です。肌の色が元の写真と違う枚は、明るさの成功例にしません。明るさは、影が弱くなったかだけで判断します。白く飛んだ肌は、最初の写真からやり直してください。

肩の位置だけを直す回では、背景色の文を入れません。背景の文が残っていると、肩を揃える指示より背景の塗り直しが優先され、顔の輪郭が動くことがあります。`,
      },
      {
        title: '基本プロンプト（ChatGPTとGemini）',
        content: `最初の文で、変えないものを全部書きます。顔の特徴、髪型、表情、年齢感です。変えるものは、背景、明るさ、服の乱れ、のどれか一つから始めてください。一度に全部を頼むと、顔まで描き直されます。

ChatGPT は、背景の均一さと、肩の位置の指示を文章で受けやすいことがあります。Gemini の画像編集（Nano Banana）は、アップロードした写真の顔を残したまま、背景や服だけを変える指示に向きやすいことがあります。どちらがいつも上、というわけではありません。同じ写真で、変える項目を一つにして見比べてください。

保持する要素は、指示の先頭に置きます。「顔は一切変えない」が後ろに行くと、無視されやすくなります。

一回の指示で変える項目は一つです。背景が揃った枚を保存し、その枚を次の入力にして服だけを変えます。元のスナップに戻さず、加工を重ねすぎると、目の位置がずれます。ずれたら、最初の写真からやり直してください。途中の枚を直し続けるより、早いです。

二枚目以降を入力にするときは、その枚の顔が元の写真と同じかを先に見ます。目の位置がずれていたら、その枝は捨てます。正しい顔の枚だけを、次の服の変更に使います。服を変えたあとに顔が動いたら、服の指示を短くして、同じ顔の枚からもう一度です。

**ChatGPT**

\`\`\`
添付した私の写真を、成人（adult）の本人のまま証明写真風に整えてください。
顔の特徴、髪型、表情、年齢感は変えません。左右を反転しません。美白や小顔もしません。
背景だけを均一な白にし、顔に落ちている影を弱くし、肩が水平に見えるように明るさを揃えてください。
正面、無帽、肩まで。文字や枠は入れないでください。
\`\`\`

**Gemini（Nano Banana）**

\`\`\`
Edit the uploaded photo of me, an adult. Keep my identity, facial features, hairstyle, expression, and age appearance exactly the same.
Do not mirror the image. Do not reshape the face. Do not whiten the skin.
Change only the background to plain white, reduce the shadow on the face, and even the lighting.
Front view, no hat, upper body including the shoulders. No text, no frame.
\`\`\``,
      },
      {
        title: '背景色の白・青・グレー',
        content: `背景は一色です。白、青、グレーを同時に書かないでください。履歴書では白が一般的に使われることが多いです。青やグレーは、証明写真の背景として案内されることがあります。応募先や発行元の指定が優先です。

影を消すときは、no shadow と plain background を自然な英語で足します。公式タグとしては断定しません。背景の布や壁の模様が残るときは、色の名前を繰り返さず、「背景以外は変えない」を前に戻してください。場所の語そのものは [背景プロンプト](/guides/background-prompt-guide) です。

背景色の指定は、応募先の用紙に合わせてください。白が一般的、と書かれている履歴書でも、会社が青を指定していることがあります。色の名前を「きれいな色」にしないでください。白、薄い青、薄いグレー、のどれかです。グラデーションや、窓の光が残る背景は、証明写真風の均一さから外れます。

影が顔の片側に残るときは、背景色を変える前に、影を弱くする文だけを足します。色と影を同時に直すと、どちらが顔を動かしたのかが分かりません。青とグレーで迷うときは、指定が無い限り白で一度揃えてから、次の色を別の指示にします。

**白**

\`\`\`
添付した成人（adult）の本人写真の背景だけを、均一な白にしてください。
顔、髪型、服、表情は変えません。影はほぼ残さないでください。無帽、正面、肩まで。
\`\`\`

**青**

\`\`\`
添付した成人（adult）の本人写真の背景だけを、均一な薄い青にしてください。
顔、髪型、服、表情は変えません。背景の模様と、顔の下の濃い影は残さないでください。無帽、正面、肩まで。
\`\`\`

**グレー**

\`\`\`
添付した成人（adult）の本人写真の背景だけを、均一な薄いグレーにしてください。
顔、髪型、服、表情は変えません。無帽、正面、肩まで。文字は入れないでください。
\`\`\``,
      },
      {
        title: '服装をスーツに整える',
        content: `服を変える回は、顔と髪型を先に固定します。ジャケット、シャツ、ネクタイの有無を一つずつ書いてください。シャツは、襟元が整った長袖、と文章で書きます。肌の露出を増やす服は使いません。

男性と女性で、ジャケットの形を混ぜないでください。どちらも成人の本人です。スーツの部品のタグは [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。オフィスカジュアルにするときは、ネクタイを外し、ジャケットと無地のシャツだけにします。

柄の大きいシャツは、縮小したときに汚れに見えることがあります。無地を先に決めてから、ジャケットの色を一つ足してください。ネクタイの色を赤と青で同時に書かないでください。結び目が平均の形になります。長袖であることは、毎回残します。袖が消えた枚は、服の色を足す前に、長袖の文を先頭近くへ移します。

**男性のスーツ**

\`\`\`
添付した成人男性（1 adult man）の写真の服だけを、ネイビーのスーツ、白い長袖シャツ、ネクタイに変えてください。
顔の特徴、髪型、表情、年齢感は一切変えません。襟元は整え、長袖のままにしてください。
背景は均一な白、正面、無帽、肩まで。
\`\`\`

**女性のスーツ**

\`\`\`
添付した成人女性（1 adult woman）の写真の服だけを、ネイビーのジャケットと、襟元が整った白い長袖ブラウスに変えてください。
スカート丈や肌の露出は増やしません。顔の特徴、髪型、表情、年齢感は一切変えません。
背景は均一な白、正面、無帽、肩まで。
\`\`\`

**ネクタイなし**

\`\`\`
添付した成人（adult）の本人写真の服だけを、ジャケットと、襟元が整った長袖シャツにしてください。ネクタイは付けません。
顔と髪型は変えません。背景は均一な薄いグレー、正面、肩まで。
\`\`\``,
      },
      {
        title: '髪と身だしなみ',
        content: `髪は、前髪の位置と、後れ毛を整えるところまでです。長さを変える、色を変える、顔の輪郭に合わせて切り直す、は別の編集です。証明写真風に整える回では、今の髪型を保ったまま、はみ出した毛を減らす、と書いてください。

肩は水平に、頭は正面です。片側の肩が上がっているときは、「肩の高さを揃える」と一つだけ足します。姿勢と髪を同時に大きく動かすと、顔の位置までずれます。

肌や顔の形は過度に変えません。美白、小顔、目を大きくする、しわを消す、は書かないでください。本人と違う顔は、履歴書でも避けます。髪型のタグを新規に描く場合は [髪型プロンプト](/guides/hairstyle-prompt-guide) です。この節は、既存の写真を整える指示です。

前髪を整える指示と、髪型を別の形にする指示は別です。分け目を逆にする、耳にかかる長さを変える、は顔の印象まで動きます。証明写真風の回では、はみ出した毛を減らす、までに止めてください。肩のラインを直すときも、頭の大きさは変えない、と一文足します。頭が小さくなると、枠に入れたときに余白が不自然になります。

**前髪と後れ毛**

\`\`\`
添付した成人（adult）の本人写真で、前髪とはみ出した後れ毛だけを整えてください。
髪の長さ、色、分け目、顔の形、肌の質感は変えません。美白はしません。
肩は水平、正面、無帽。背景がすでにある場合は背景も変えないでください。
\`\`\``,
      },
      {
        title: 'サイズと構図の目安',
        content: `サイズは一般的な目安です。必ず提出先の最新の規定を確認してください。画素の指定だけで、印刷したミリが合うわけではありません。印刷するときは、コンビニの証明写真プリントなどを使い、仕上がりを測ってください。特定の店舗名が必要、とは書きません。

構図は、頭頂からあごまでが写り、正面で、帽子がなく、肩まで入る、です。頭頂を切らないでください。あごを引きすぎると、顔の下が影になります。

| 用途 | 寸法の目安 | このページでの扱い |
|---|---|---|
| 履歴書 | 縦40mm×横30mm が一般的 | 応募先の指示に従う。顔を別人にしない |
| パスポート | 縦45mm×横35mm。無帽、正面、無地の背景、6か月以内の撮影 | 加工写真は不可。AI写真は使わない |
| マイナンバーカード | 縦45mm×横35mm | 一般的な目安。AIで加工した写真は使わない |
| 運転免許証（申請用） | 縦30mm×横24mm | 一般的な目安。AIで加工した写真は使わない |

パスポートの加工禁止は、外務省や都道府県の案内に書かれている内容です。美白、顔や背景の修正、左右の反転も、加工として避けてください。マイナンバーカードと運転免許証の寸法は、案内が更新されることがあります。

画面上の比率は、頭の上に余白を少し残し、あごの下に肩が見える、です。顔だけを極端に拡大すると、証明写真の枠に合いません。

印刷する前に、画面のピクセルではなく、出力した紙の縦横を測ってください。画面いっぱいに大きく見えても、紙では顔が小さいことがあります。コンビニの証明写真プリントは、データの比率と、機械の枠が違うことがあります。仕上がりを受け取ったら、頭頂とあごが切れていないかを見て、切れていればデータを作り直します。公的書類の枠に、この練習データを入れないでください。`,
      },
      {
        title: '用途別のテンプレ',
        content: `用途を混ぜないでください。履歴書の回で、背景色と服と髪を全部変えると、どの指示が顔を動かしたのかが分かりません。一回につき、変えるものは一つです。

社員証や名刺、SNSのプロフィールは、公的書類ではありません。それでも、本人と大きく違う顔にはしないでください。プロフィール写真の公開作例は [ビジネスのヘッドショット](/prompt/linkedin-professional-headshot) です。

日本の免許サイズに近づける練習用の作例は [日本の免許サイズ](/prompt/id-photo-chatgpt-japan-license)、青背景の寸法の練習用は [アジアの2インチ青背景](/prompt/id-photo-asia-2-inch-blue)、パスポート規格の練習用は [パスポート規格の練習](/prompt/passport-id-photo-icao-compliant) です。公的書類の提出用ではなく、練習・イメージ確認用です。

**履歴書**

\`\`\`
添付した成人（adult）の本人写真を、履歴書用の証明写真風に整えてください。
顔の特徴、髪型、表情は変えません。背景は均一な白、明るい均一な光、正面、無帽、肩まで。
美白や小顔はしません。応募先の指定がある場合は、その指定を優先します。
\`\`\`

**就活**

\`\`\`
添付した成人（adult）の本人写真を、就職活動の写真風に整えてください。
顔は一切変えません。ネイビーのジャケットと、襟元が整った長袖シャツに見えるよう、服の乱れだけを直してください。
背景は均一な白または薄い青。無帽、正面、穏やかな表情。本人と違う顔にはしないでください。
\`\`\`

**社員証**

\`\`\`
添付した成人（adult）の本人写真を、社員証用の顔写真風に整えてください。
顔、髪型、年齢感は維持します。背景は均一な薄いグレー、正面、無帽、肩まで。
文字、社名、枠は入れないでください。
\`\`\`

**名刺・SNSのプロフィール**

\`\`\`
添付した成人（adult）の本人写真を、名刺やSNSのプロフィール向けに整えてください。
顔の特徴と髪型は変えません。背景は均一な薄いグレー、柔らかい均一な光、正面、肩まで。
公的書類用ではありません。過度な美白はしないでください。
\`\`\`

新規に人物を描く英語の例は、本人の写真ではありません。成人であることを人数に書きます。

**英語・女性**

\`\`\`
1 adult woman, passport photo style, plain white background, front view,
upper body, neat blouse, long sleeves, neutral expression, even lighting
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, hat, text, shadow
\`\`\`

**英語・男性**

\`\`\`
1 adult man, passport photo style, plain white background, front view,
upper body, suit, necktie, neutral expression, even lighting
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, hat, text, shadow
\`\`\``,
      },
      {
        title: 'プライバシーと注意点',
        content: `顔写真をアップロードする前に、そのサービスの利用規約と、学習に使われるかどうかの設定を確認してください。確認できない場合は、そのサービスに提出用の顔を渡さない、が安全です。

他人の写真は使いません。子どもの写真は使わない。位置情報などのメタデータが残っているファイルは、アップロード前に外すか、メタデータの無い書き出しにしてください。

生成した結果を、公的書類の写真として印刷しないでください。練習で背景色や肩の位置を見る用途と、提出用の撮影は、別の作業です。

出力をSNSに出すときは、加工であることを自分で分かったうえで載せてください。このページは、加工の有無を隠す手順は書きません。

学習設定が見つからないサービスでは、本番の顔写真を上げないでください。試しに使うなら、提出しない練習用の、すでに公開してよい写真にします。メタデータは、撮影場所や端末名を含むことがあります。書き出し直してから渡すと、その情報が外れます。外し方が分からないときは、そのファイルを上げない、が先です。`,
      },
      {
        title: 'うまくいかないときの直し方',
        content: `別人になるときは、「顔は一切変えない」を指示の先頭に戻します。服、背景、髪を同じ回で頼まないでください。部分ごとに一回ずつ生成し、顔が残った枚だけを次の入力にします。

背景が残るときは、色の名前を一つにし、「模様、家具、窓は残さない」と足します。背景の語を後ろに置くと、元の部屋が勝つことがあります。

服が不自然なときは、ジャケットとシャツだけに減らします。ネクタイ、バッジ、模様を同時に足さないでください。袖が消えるときは、長袖、と文章で残します。

左右が反転したときは、その枚は捨てます。反転した写真をパスポート用に直す、という使い方はしません。公的書類は、撮影した写真に戻してください。

直しは、失敗の種類ごとに一回です。別人、背景の残り、服の崩れ、を一つの文で同時に直そうとしないでください。別人の回は、顔の文だけを先頭に足して、服の文は消します。背景の回は、色を一つにします。服の回は、ジャケットとシャツだけにします。三つの失敗が同時に出た枚は、最初の写真から、背景だけの指示でやり直します。

**顔を固定してやり直す**

\`\`\`
顔は一切変えないでください。添付した成人（adult）の本人の、目、鼻、口、輪郭、年齢感、髪型を維持します。
今回変えるのは背景だけです。均一な白、影は弱く、正面、無帽、肩まで。美白はしません。
\`\`\``,
      },
    ],
    faq: [
      {
        q: 'パスポートにAIの証明写真を使えますか',
        a: '使わないでください。パスポート、マイナンバーカード、運転免許証などの公的書類は、AIで生成または加工した写真ではなく、規格に沿って撮影した写真を使います。外務省や都道府県の案内では、美白や顔・背景の修正、反転などの加工は不可とされています。提出前に、発行元の最新の規定を確認してください。',
      },
      {
        q: '履歴書のサイズは何ミリですか',
        a: '縦40mm×横30mmが一般的です。応募先の指示が優先です。本人と大きく違う加工は避けてください。このページは、AIの写真が受理されるとは書きません。',
      },
      {
        q: 'ChatGPTとGeminiのどちらを使いますか',
        a: '変えないもの（顔、髪型、表情）を先頭に書く、という型は共通です。背景の均一さを文章で頼むときは ChatGPT、アップロード写真の顔を残して背景や服だけを変えるときは Gemini の画像編集が向きやすいことがあります。同じ写真で、変える項目を一つにして見比べてください。',
      },
      {
        q: '背景の部屋が消えない',
        a: '背景色は白、青、グレーのどれか一つにします。「模様も家具も残さない」を足し、服や髪の変更は次の回に分けてください。一度に頼むと、顔まで描き直されます。',
      },
      {
        q: 'サイト内のパスポート作例はそのまま提出できますか',
        a: 'できません。公的書類の提出用ではなく、練習・イメージ確認用です。提出は、発行元の規定に沿って撮影した写真を使ってください。',
      },
    ],
  },

  'hand-finger-prompt-guide': {
    sections: [
      {
        title: '手が崩れる理由と基本方針',
        content: `「手 プロンプト」「指 プロンプト」で最初に知ることは、手が小さい関節の集まりだということです。画面の端で、指が五本あるかどうかをモデルが取り違えることがあります。割合の数字はこのページでは書きません。崩れは、ネガティブを足しただけでは完全には止まりません。

基本方針は二つです。手を画面いっぱいに写さない。写すなら、ポーズを単純にする。ピースとポケットと物を持つを、同じ強さで同時に書かないでください。

登場人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。胸の前、脚の付け根、太ももの上には手を置きません。相手の体に手を置くのは、握手の節だけです。指を口に入れるポーズは書きません。

立ち方の全般は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、顔の感情は [表情プロンプト](/guides/stable-diffusion-expression-prompt)、画面に入る体の範囲は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。男性の立ち姿は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。作例の並びは [アニメプロンプト集](/prompts/anime) です。

手を直す記録は、変えた語を一つだけ残します。ネガティブを足した枚、\`upper body\` に変えた枚、ポーズを一つに減らした枚、を同じプロンプトにまとめないでください。良くなった理由が消えます。指が多い枚と、指が溶けて境界の無い枚は、直しが違います。多いときは単純なポーズに戻し、溶けているときは持つ物を一つにするか、手を画面の端に出します。同じ失敗の枚に、同じ修正を三回重ねても、原因の語は動きません。

画面の中で手が見える面積は、顔より小さく保つのが基本です。顔の横で合図をするときだけ、手を顔に近づけます。手のひらを正面から大きく見せるのは、形が単純なときだけにしてください。側面から見える手の方が、指の重なりが少なく、本数が安定することがあります。複雑な形を正面で大きくすると、関節が平均の位置に溶けます。

手を画面の外に出す構図も、有効な回避です。ポケットや、後ろで組む姿勢は、指を見せない代わりに崩れも目立ちません。指の形そのものを見せたい回と、見せなくてよい回を、プロンプトの名前で分けてください。見せたい回だけ、上半身で手を少し内側に入れます。入れすぎると、また大きくなって本数が増えます。

内側に入れる目安は、手のひらが顔の横で、画面の端にかからない程度です。端にかかると、指の先が枠で切れて、本数が足りない絵に見えます。切れた枚は、手の位置の語を少し下げるか、上半身の距離をわずかに引いてください。引きすぎると、今度は手が点になります。

**単純な腰の位置**

\`\`\`
1 adult woman, hand on own hip, standing, smile, upper body,
white blouse, long skirt, plain background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\``,
      },
      {
        title: '崩れ対策のネガティブ',
        content: `手のネガティブは、毎回この並びを残します。\`bad hands\`、\`extra fingers\`、\`missing fingers\`、\`fewer digits\`、\`extra digits\`、\`fused fingers\`、\`mutated hands\`、\`bad anatomy\` です。年齢の語も一緒に残します。ネガティブだけでは完全には防げません。ポジティブのポーズを単純にすることと、セットで使ってください。

品質のタグをポジティブとネガティブの両方に置かないでください。品質側の並びは [品質タグ一覧](/guides/quality-tags-prompt-guide)、ネガティブの考え方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

手専用の埋め込みを使うモデルもあります。名前はモデルごとに違うので、このページでは特定のファイル名を指定しません。使うときは、そのモデルの説明に従い、効果を強くしすぎないでください。強くすると、手以外の顔まで平滑になります。

**コピー用のネガティブ**

\`\`\`
bad hands, extra fingers, missing fingers, fewer digits, extra digits, fused fingers, mutated hands, bad anatomy,
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\`

指の本数をポジティブで「五本」と書いても、モデルが数として読むとは限りません。自然文の節では、言葉で本数を書きます。タグ列では、ポーズを単純にする方が先です。

ネガティブを長くすることと、手の形を指定することは、別の作業です。ネガティブに指の名前を十個並べても、ピースとポケットが同時に残っていれば、手は両方を描こうとします。先にポジティブを一つにしてください。埋め込みを強くしすぎた枚は、顔の輪郭まで平滑になります。そのときは効果を下げるか、外して、ポーズの単純さだけで見ます。手だけを直したいのに顔が変わった枚は、採用しません。

ネガティブは、手の語を残したまま、品質の語を増やしすぎないでください。品質を強くすると、指の形より肌の平滑さが優先され、関節の境目が消えます。手の失敗が残る枚は、品質ではなく、ポーズを一つに減らした版と比べます。良くなった方の、変えた語だけを次に残します。`,
      },
      {
        title: '構図と解像度で手を残す',
        content: `手を画面の小さい面積にすると、指の誤りは目立ちにくくなります。\`upper body\` は腰から上です。顔の \`close-up\` では、手を書かない方が安定します。手の形が主題のときだけ、手を少し大きくしてください。画面の半分を手にすると、指は増えやすくなります。

解像度を上げると、指の境界が残りやすくなることがあります。解像度だけでは、ポーズが複雑なときの融合は止まりません。まずポーズを一つにしてから、サイズを上げてください。

部分修正は、崩れた手の領域だけを描き直す方法です。インペイントと呼ばれます。手を検出して、その部分だけ描き直す拡張もあります。製品名はこのページでは固定しません。マスクは手の周囲だけにし、顔まで含めないでください。

物を持たせると、指の形が道具の輪郭に沿って安定することがあります。持つものは一つです。杯と本を同時に持たせないでください。

**上半身で手を小さく**

\`\`\`
1 adult man, hands in pockets, standing, jacket, upper body,
looking at viewer, plain background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\`

クローズアップで手を枠の外に出すときは、\`close-up, face\` と書き、手のタグは外します。手と顔を同じ強さでアップにしないでください。

解像度を上げるのは、ポーズが一つに決まってからです。複雑な手のまま画素を増やしても、融合した指がきれいに拡大されるだけです。インペイントのマスクは、崩れた手の周囲だけにします。顔、もう片方の手、服の柄までマスクに入れると、直したかった所以外が描き直されます。マスクを小さくしすぎて、指の先が外れると、古い指が残ります。一回で全部を覆おうとせず、悪い指から直してください。

部分修正のあとは、直した手と、直していないもう片方の手の大きさを見ます。片方だけが大きくなっている枚は、マスクの範囲が広すぎます。服の柄が変わった枚も、マスクが服まで入っています。手の輪郭の外側を少しだけ含める、で止めてください。顔はマスクに入れません。`,
      },
      {
        title: '手の位置の一覧',
        content: `位置は一つです。腰とポケットと腕組みを同時に強くすると、腕が三本に見えます。自分の体に置くタグと、相手に置くタグは混ぜません。この節は、自分の手だけです。

| 位置 | 書き方 | 注記 |
|---|---|---|
| 腰に手 | \`hand on own hip\` | 片手。胸には置かない |
| 両手を腰 | \`hands on own hips\` | 片手のタグと同時に強くしない |
| 頬杖 | \`hand on own chin\` | 肘の置き場を椅子か机で書く |
| 頬に手 | \`hand on own cheek\` | 頬杖と両方強くしない |
| ポケット | \`hands in pockets\` | 服にポケットがあること |
| 腕組み | \`arms crossed\` | 指は隠れやすい。隠れてもよいときだけ |
| 後ろで組む | \`arms behind back\` | 手は見えにくい。指の確認には不向き |
| 手を合わせる | \`own hands together\` | 胸の前で重ねない。腰の前で合わせる |
| 片手を上げる | \`hand up\` | \`arms up\` は両腕 |
| 両腕を上げる | \`arms up\` | 単純な上げ方にする |
| 顔を覆う | \`hand on own face\` | covering face with hands は自然な英語 |
| 自分の髪に触る | touching own hair（自然な英語） | 公式タグとしては断定しない |

顔を覆う自然な英語は、モデルによって効きが弱いことがあります。そのときは \`hand on own face\` だけに戻してください。髪に触る語も同様です。

位置のタグは、服と矛盾しないようにします。ポケットなのにポケットの無い服、後ろで組むのに両手が杯を持っている、は同時に書けません。頬杖は、肘を置く家具が無いと、腕が空中で折れます。椅子か机を一つ書いてください。顔を覆う枚は、表情の確認には使いません。表情が要る回は、\`hand on own chin\` に戻して、口と目を残します。腰のタグを胸の高さとして書き換えないでください。位置の言葉を増やすほど、手は平均の場所に戻ります。

一覧から選ぶときは、日本語の意味が近くても、タグは一つです。頬に手を添えると、あごに手を置くは、同時に書くと肘の位置が平均になります。ポケットと腕組みも同じです。表の一行を試し、足りなければ次の行に移り、前の行の語は消してください。残したまま次を足すと、腕の本数が増えます。

**頬杖**

\`\`\`
1 adult woman, hand on own chin, sitting on a chair, smile,
blouse, long sleeves, upper body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\``,
      },
      {
        title: '指のジェスチャー一覧',
        content: `ジェスチャーも一つです。ピースと指さしを同時にすると、両手の形が平均になります。ピースは \`v\` です。\`peace sign\` と自然な英語でも書けます。公式の短いタグは \`v\` の方です。モデルによって、自然な英語の方が残ることがあります。

| ジェスチャー | 書き方 | 注記 |
|---|---|---|
| ピース | \`v\` | peace sign は自然な英語 |
| ダブルピース | \`double v\` | 両手。片手の \`v\` と同時に強くしない |
| 手を振る | \`waving\` | 片腕。もう片方は下ろす |
| サムズアップ | \`thumbs up\` | 拳の形が崩れやすい。アップで確認 |
| 指さし | \`pointing\` | 指す先を一つ書く |
| こちらを指す | \`pointing at viewer\` | 手が大きくなりやすい |
| ハート | \`heart hands\` | 両手。胸の強調には使わない |
| 敬礼 | \`salute\` | 成人の肖像。場面は屋外か無地 |
| 握りこぶし | \`clenched hand\` | 指は隠れやすい |
| 手のひら | \`open hand\` | 五本の境界が見える。単純な向きにする |

指を口元に置くポーズは書きません。人差し指を上げるだけの合図が必要なら、\`hand up\` に戻してください。

ジェスチャーは、顔より前に置くと残りやすいです。後ろに回すと、笑顔だけが残って、手は下りたままになります。ピースの手を画面の端で切らないでください。切れると、指の本数が枠の外で増えたように見えます。\`pointing at viewer\` は手が大きくなりやすいので、\`upper body\` のまま、もう片方の手は書かないでください。敬礼は帽子の語と同時に強くすると、手が帽子に溶けます。帽子が要らなければ外します。

指さしは、指す先を背景の一つの物にします。先を書かないと、指がカメラに向かう形と、横を向く形が混ざります。こちらを指す形は、手が大きくなりやすいので、上半身のままもう片方の手は下ろした説明だけにします。ハートの形は、胸の強調ではなく、両手で作る輪郭だけにしてください。

**ピース**

\`\`\`
1 adult woman, v, peace sign, smile, looking at viewer,
upper body, knit sweater, plain background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\`

**手を振る**

\`\`\`
1 adult man, waving, smile, standing, jacket,
upper body, looking at viewer, daytime, street
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\``,
      },
      {
        title: '手を伸ばす・POV',
        content: `手を伸ばすのは \`outstretched arm\`、こちらへ届くのは \`reaching towards viewer\` です。\`pov\` は、カメラが手の持ち主に近い見え方です。成人の、中立な場面だけにします。例は、手を貸して立ち上がる手伝い、または杯を渡す、です。

POV で手を画面いっぱいにすると、指は増えやすくなります。手は画面の三分の一までにして、背景に場所を残してください。相手の体に触れた状態では書きません。渡す直前、または空いている手を差し出す、で止めてください。

POV の枚は、背景を単純にします。街の看板や、人が多い広場だと、伸びた腕より背景の線が優先されます。カフェの机か、公園の道のように、奥行きが一つある場所にしてください。杯は一つです。杯の中の絵や文字は書かせません。手を貸す枚では、相手の顔を書かないでください。相手を書くと、このページの一人の手の指定が、二人の接触に変わります。二人の手は、握手の節だけです。

手を伸ばす枚は、杯か、空いた手か、を先に決めてから場所を書きます。場所を先に長く書くと、腕が背景の奥に溶けて、手元が小さくなります。手元を見せたいなら、文の前半に腕の動作を置き、場所は短くしてください。相手の体に触れた瞬間は描かず、渡す直前で止めます。

**杯を渡す**

\`\`\`
1 adult man, outstretched arm, reaching towards viewer, handing a cup,
cafe, upper body, knit sweater, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\`

**手を貸す**

\`\`\`
1 adult woman, pov, outstretched arm, offering a hand,
park path, winter coat, daytime, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\``,
      },
      {
        title: '物を持つ',
        content: `持つものは一つです。\`holding cup\`、\`holding phone\`、\`holding book\`、\`holding umbrella\` です。剣は \`holding sword\` で、部品の詳細は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) に渡します。両手で持つは holding with both hands と自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは \`holding cup\` のように、持つ物を一つに戻してください。

電話と本を同時に書かないでください。手が二つ必要になり、指が融合します。傘は、持っている手と、もう片方の手を下ろすことを書いてください。

本は、開いているか閉じているかを一つにします。両方を書くと、ページが手のひらに溶けます。電話は、画面をこちらに向けるか、耳に当てるかを一つにします。画面の中の文字は、崩れやすいので書かせません。剣は、現代のカフェと一緒に強くしないでください。場面が混ざると、剣が棒に戻ります。持つ物が手より大きいときは、\`full body\` ではなく \`upper body\` で、物の全体が入りきるかを見てから全身に戻します。

傘の柄が手を貫通して見えるときは、持つ手を一つに減らし、もう片方は下ろします。本のページが指と溶けるときは、本を閉じた状態に戻します。電話の画面をこちらに向ける指定は、文字が要らないときだけにしてください。剣を持つ回は、現代の部屋の語を全部外してから、もう一度出します。

| 持つ物 | 書き方 | 注記 |
|---|---|---|
| 杯 | \`holding cup\` | カフェと一緒にしやすい |
| 電話 | \`holding phone\` | 画面の中の文字は書かせない |
| 本 | \`holding book\` | 開くか閉じるかを一つ |
| 傘 | \`holding umbrella\` | 天候とセット |
| 剣 | \`holding sword\` | 現代の服と同時に強くしない |
| 両手 | holding with both hands（自然な英語） | 公式タグとしては断定しない |

**本を持つ**

\`\`\`
1 adult woman, holding book, standing, coat, upper body,
looking at viewer, library aisle, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\`

**傘**

\`\`\`
1 adult man, holding umbrella, standing, winter coat, scarf,
street, overcast, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\``,
      },
      {
        title: '2人の手',
        content: `二人にするときは \`2 adults\` と書きます。\`adult\` を残してください。このページで書く二人の手は、握手だけです。handshake と自然な英語で書きます。公式タグとしては断定しません。

手をつなぐ、指を絡める、は [恋人繋ぎプロンプト](/guides/hand-holding-prompt-guide) に渡します。このページでは手順を重ねません。握手と手つなぎを同じ強さにすると、指が両方の形を取ろうとして増えます。

握手は、胸より下、腰の高さです。引く、組む、抱える、は書きません。背景は無地か、屋外の歩道にしてください。

**握手**

\`\`\`
2 adults, handshake, standing, suit, winter coat,
upper body, plain background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, fewer digits, extra digits, fused fingers, mutated hands, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes
\`\`\`

一人のポーズに戻すときは、\`2 adults\` を消し、\`1 adult man\` か \`1 adult woman\` に戻してから、手のタグを一つだけ残します。

握手の高さが胸まで上がった枚は、捨てます。腰の高さ、と自然な英語で一文足してから再生成してください。二人の服が溶けて一着になるときは、服の語を減らし、\`2 adults\` を先頭に戻します。人数が一人に戻った枚は、握手の語が残っていても採用しません。人数と、手の形が、同じ枚で同時に正しい必要があります。

握手の服は、二人で同じにしないでください。同じスーツを二人に書くと、体の境界が消えます。片方はジャケット、もう片方は冬のコート、のように色か形を一つ違えます。違いを三つにすると、今度は手が平均になります。違いは一つ、手の形は握手だけ、です。`,
      },
      {
        title: 'ChatGPT・Gemini・Midjourneyの自然文',
        content: `自然文では、左右と、指の本数を言葉で書きます。タグの \`v\` だけでは、ChatGPT や Gemini が両手でピースを作ることがあります。右手か左手かを文の前半に置いてください。

Midjourney では、同じ内容を短い文にし、重みの括弧は外します。縦の構図なら、文の末尾で縦横を指定します。指が溶けるときは、ジェスチャーを一つ減らして再生成してください。

**右手のピース**

\`\`\`
1 adult woman. She faces the viewer, adult, wearing a knit sweater with long sleeves.
Her right hand makes a peace sign beside her face. The left hand rests on her own hip, not on her chest.
Upper body, plain background, soft daylight. Five fingers on each visible hand.
No text.
\`\`\`

Stable Diffusion に戻すときは、\`1 adult woman, v, hand on own hip, upper body\` に分解し、ネガティブの手の語を残してください。自然文の「五本」は、タグ列ではネガティブの役割です。

左右を書き忘れた文は、両手で同じジェスチャーになりやすいです。右手と左手で別の形にするときは、文を二つに分け、そのあと一つの段落にまとめます。Midjourney で指が増えるときは、ジェスチャーを一つ消し、もう片方の手は pockets か hip の自然な説明だけにします。Gemini で写真の手を直す回は、このページの新規生成とは別です。顔を変えないことを先頭に書き、直す手を右手か左手かで指定してください。

自然文をタグに戻すときは、左右の文を別々に対応させます。右手の合図、左手の位置、人数、距離、の四つだけを残し、形容の文は捨てます。形容を残すと、タグ列が長くなり、左右の指定が後ろに沈みます。沈んだ指定は、次の枚では前に戻してください。`,
      },
    ],
    faq: [
      {
        q: 'ネガティブを入れても指が増えます',
        a: 'ネガティブだけでは完全には防げません。ポーズを一つにし、`upper body` で手を画面いっぱいにしないでください。崩れた領域だけをインペイントするか、手を検出して描き直す拡張を、顔を含めずに使います。',
      },
      {
        q: 'ピースは v と peace sign のどちらですか',
        a: '短いタグは `v` です。peace sign は自然な英語として足せます。モデルによって効きが弱いことがあります。ダブルピースは `double v` で、片手の `v` と同時に強くしません。',
      },
      {
        q: '手をつなぐポーズはどこにありますか',
        a: '二人で手をつなぐ手順は恋人繋ぎプロンプトです。このページの二人は握手（handshake、自然な英語）だけにしています。',
      },
      {
        q: '物を持たせると指が溶けます',
        a: '持つものは一つにしてください。`holding cup` か `holding book` か `holding umbrella` のどれかです。両手で持つは holding with both hands と自然な英語で、公式タグとしては断定しません。',
      },
      {
        q: 'POVで手だけが巨大になります',
        a: '`outstretched arm` と `reaching towards viewer` を残し、手は画面の三分の一までにします。成人の、杯を渡すか手を貸す場面にして、相手の体には触れさせないでください。',
      },
    ],
  },

  'lighting-prompt-guide': {
    sections: [
      {
        title: '光のプロンプトは四つの軸に分ける',
        content: `「光 プロンプト」「照明 プロンプト」「逆光 プロンプト」は、画像の光の話です。検索語の「ライティング」は、文章を書く意味で使われることがあります。このページの見出しは、光・照明・影です。文章の書き方は扱いません。

軸は四つです。光の向き、光の質、光源または時間帯、影です。四つを一度に強くすると、明るい平均の絵に戻ります。一枚につき、軸を一つか二つだけ足してください。

登場人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、服を着た状態にします。寝室の場面は使いません。肌を光らせる書き方もしません。

暗い室内の一点だけを強くする手順は [暗い部屋プロンプト](/guides/dark-room-prompt-guide) に残します。このページは、向きと影の一覧です。場所そのものは [背景プロンプト](/guides/background-prompt-guide)、カメラの距離は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。作例の並びは [カメラプロンプト集](/prompts/camera)、タグは [逆光](/tag/逆光) です。

**向きを一つ、質を一つ**

\`\`\`
1 adult woman, soft lighting, window light, upper body,
white blouse, long skirt, looking at viewer, plain room
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

光の語は、人物の直後に置きます。背景の後ろに回すと、窓だけが明るくなって、顔は平均の明るさに戻ることがあります。

一枚を保存する前に、どの軸を足したかをメモします。向きを変えたのか、質を変えたのか、時間を変えたのか、です。メモが無いと、良い明るさが出ても次の枚で再現できません。軸を二つ足して悪くなったら、後から足した方を消します。両方を残したまま重みだけを上げないでください。人物の服の色は、光の比較が終わるまで固定します。

比較用の服は、無地の一色が安全です。柄があると、光の斑点と柄の境目が区別できません。無地で向きが決まったあとに、柄を一つ足します。柄を足して光が消えたら、柄を外して光の語を前に戻します。背景の家具も、比較が終わるまでは増やしません。

窓の枠が顔より明るい枚は、窓の語を弱めるか、人物を窓から半歩離した説明に変えます。枠の明るさを上げ続けると、顔はシルエットのままです。顔が見えた明るさで止めてください。

止めた明るさの語は、その枚のプロンプトから消さないでください。次の実験で服だけを変えるとき、光の行を一緒に消すと、顔が再び暗くなります。光の行は固定、服の行だけを差し替える、を光の実験が終わったあとのルールにします。`,
      },
      {
        title: '光の向き',
        content: `向きは一つです。順光と逆光を同じ強さにすると、影の位置が平均になって、どちらにも見えません。

順光、つまり正面からの光は front lighting と自然な英語です。逆光は \`backlighting\` です。横からの光は side lighting、頭上は top lighting、下からは underlighting と自然な英語です。公式タグとしては断定しません。下からの光は、顔が不自然に明るくなり、ホラー寄りに見えやすいです。肖像では、先に side lighting を試してください。

輪郭を光で縁取るのは \`rim lighting\` です。頭の後ろの光の輪は halo of light behind と自然な英語です。宗教や特定の作品の後光としては書きません。明るさの輪だけです。

| 向き | 書き方 | 見え方 |
|---|---|---|
| 順光・正面 | front lighting（自然な英語） | 顔の影が少ない |
| 逆光 | \`backlighting\` | 輪郭が明るく、顔は暗くなりやすい |
| サイド光 | side lighting（自然な英語） | 顔の半分に影 |
| トップ光 | top lighting（自然な英語） | 目の下が影になりやすい |
| 下から | underlighting（自然な英語） | ホラー寄り。肖像では弱く |
| リムライト | \`rim lighting\` | 輪郭の縁。顔の明るさは別 |
| 後光 | halo of light behind（自然な英語） | 公式タグとしては断定しない |

逆光で顔が黒く潰れるときは、\`rim lighting\` を残したまま、soft front fill light を自然な英語で弱く足します。正面光を同じ強さにすると、逆光が消えます。

向きの比較は、同じ場所で行います。夕焼けの逆光と、室内の順光を見比べても、向きの差なのか場所の差なのかが分かりません。下からの光を試すときは、肖像の本番とは別の枚にしてください。顔の印象が変わるので、本番のプロンプトに残さない方が安全です。後光の自然な英語が輪にならないときは、\`rim lighting\` に戻します。輪の中に模様や文字は書かせません。

順光で顔が平面に見えるときは、正面の光を少し弱め、横からの自然な英語を弱く一つ足します。両方を同じ強さにしないでください。下からの光を試したプロンプトは、別名で保存し、肖像の本番ファイルには混ぜません。本番に戻すときは、下からの語が残っていないかを先に見ます。`,
      },
      {
        title: '光の質',
        content: `質は、硬い光か柔らかい光かです。両方を同じ強さにすると、影の境界が中途半端になります。

\`soft lighting\` は境界の薄い光です。硬い光は hard light と自然な英語です。\`dramatic lighting\` は明暗の差が大きい光、\`cinematic lighting\` は画面全体の光の設計、\`studio lighting\` は撮影机の光です。\`studio lighting\` は自然な英語としても通ります。公式タグとして常に同じ結果になる、とは書きません。

Rembrandt lighting は、顔の片方に三角の小さな光が残る置き方で、自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは side lighting に戻してください。

ハイキーは high-key lighting、ローキーは low-key lighting と自然な英語です。ハイキーは影を少なく、ローキーは暗い中に明るい一点を残します。ローキーの室内は [暗い部屋プロンプト](/guides/dark-room-prompt-guide) と重なります。部屋の暗さが主題なら、あちらへ渡してください。

| 質 | 書き方 | 向く画面 |
|---|---|---|
| 柔らかい | \`soft lighting\` | 肖像、窓辺 |
| 硬い | hard light（自然な英語） | 影の境界をはっきりさせる |
| ドラマチック | \`dramatic lighting\` | 明暗の差。顔が潰れやすい |
| 映画の光 | \`cinematic lighting\` | 向きと一緒に一つ足す |
| スタジオ | \`studio lighting\` | 無地背景の肖像 |
| レンブラント | Rembrandt lighting（自然な英語） | 公式タグとしては断定しない |
| ハイキー | high-key lighting（自然な英語） | 明るい背景 |
| ローキー | low-key lighting（自然な英語） | 暗い背景の一点 |

画風と光を同時に変えないでください。塗りの種類は [画風プロンプト](/guides/art-style-prompt-guide) です。光の比較では、画風を固定します。

柔らかい光が硬い影になるモデルでは、\`soft lighting\` を人物の直後に移し、\`dramatic lighting\` を一旦外します。ドラマチックが残ったまま柔らかいを足しても、影の境界は平均になりません。スタジオの光は、背景を無地にしてから見てください。背景に窓があると、スタジオの語より窓が勝ちます。レンブラントの自然な英語が効かない枚を、重み 1.4 で押さないでください。側光に戻した方が、顔の情報は残ります。

柔らかい光を確認するときは、影の境界が顔のどこにあるかを見ます。境界が鼻の横に一本だけあるなら、側光に寄っています。境界が無いなら、柔らかい光が勝っています。どちらも中途半端な灰色なら、ドラマチックの語が残っていないかを確認し、残っていれば外します。`,
      },
      {
        title: '時間帯と自然光',
        content: `時間は一つです。昼と夕焼けを同じ強さにすると、空の色が平均になります。

\`sunlight\` は日光、\`sunset\` は夕焼け、\`twilight\` は黄昏、\`moonlight\` は月明かりです。黄金色の時間は golden hour、青い時間は blue hour、曇りは overcast と自然な英語です。公式タグとしては断定しません。

木漏れ日は \`dappled sunlight\`、筋の光は \`sunbeam\` と \`light rays\` です。窓の光は window light と自然な英語です。窓と木漏れ日を両方強くすると、光の斑点が顔の上に乗りすぎます。

| 時間・自然光 | 書き方 | 注記 |
|---|---|---|
| 日光 | \`sunlight\` | 向きとセット |
| 黄金の時間 | golden hour（自然な英語） | 公式タグとしては断定しない |
| 夕焼け | \`sunset\` | 逆光と相性がよい |
| 黄昏 | \`twilight\` | 夕焼けと同時に強くしない |
| 青い時間 | blue hour（自然な英語） | 公式タグとしては断定しない |
| 月 | \`moonlight\` | 夜とセット |
| 木漏れ日 | \`dappled sunlight\` | 木を背景に書く |
| 光の筋 | \`sunbeam\`, \`light rays\` | 両方強くしない |
| 窓 | window light（自然な英語） | 室内でも寝室にはしない |
| 曇り | overcast（自然な英語） | 影が薄い |

色の温度を服の色と混ぜないでください。夕焼けのオレンジが白い服に移るときは、服の色を先に書き、光は [色プロンプト](/guides/color-prompt-guide) の分け方で後ろに回します。

時間帯は空の色で確認します。空が写らない上半身では、\`sunset\` が肌の色にだけ乗ることがあります。そのときは背景に空か窓を少し入れて、時間が見えるようにします。木漏れ日は、木が背景に無いと斑点だけが顔に残ります。木を書くか、\`dappled sunlight\` を外すか、どちらかにしてください。曇りと日光を同時に強くすると、影の濃さが平均になります。

時間帯の確認は、空か窓が入る構図で行います。顔のアップだけでは、夕日が肌の色にしか見えず、時間だと判断できません。時間が見えた枚だけを、上半身の本番にコピーし、空の語は弱く残します。木漏れ日は、木を背景に書いた枚で斑点が顔に乗りすぎないかを見ます。乗りすぎたら、斑点の語を外します。`,
      },
      {
        title: '人工光と光の効果',
        content: `人工の光も一つが基本です。ネオンとスポットとキャンドルを同じ強さにすると、光源の数が増え、顔の上に光の点が散ります。

\`neon lights\` は看板や街の光、\`spotlight\` は一点の照射、\`string lights\` は連なった小さな電球です。キャンドルは candle on a table と自然な英語で、食卓の上にします。寝室や浴室の場面には置きません。公式タグとしては断定しません。

\`lens flare\` はレンズのフレア、\`bokeh\` は玉ぼけ、\`light particles\` は光の粒、\`glowing\` は自ら光る部分です。\`volumetric lighting\` は空気中に見える光の筋で、自然な英語としても書けます。フレアと玉ぼかしを両方強くすると、顔のディテールが霞みます。

| 光源・効果 | 書き方 | 注記 |
|---|---|---|
| ネオン | \`neon lights\` | 夜の街。雨の描写は足さない |
| スポット | \`spotlight\` | 暗い背景とセットにしやすい |
| 電球の連なり | \`string lights\` | 冬の街や室内の飾り付け |
| キャンドル | candle on a table（自然な英語） | 食卓。寝室にはしない |
| フレア | \`lens flare\` | 強くすると顔が飛ぶ |
| 玉ぼけ | \`bokeh\` | 背景側に置く |
| 光の粒 | \`light particles\` | 一つまで |
| 発光 | \`glowing\` | 何が光るかを一つ書く |
| 空気中の筋 | \`volumetric lighting\` | 自然な英語でも可。向きとセット |

公開作例では、スタジオの肖像は [スタジオ照明の肖像](/prompt/studio-lighting-portrait-detailed)、映画の光の設定は [シネマティックな照明](/prompt/cinematic-lighting-fujifilm-setup)、赤い光の肖像は [赤い光の肖像](/prompt/dramatic-red-light-blonde-portrait) です。海の灯台は [嵐の灯台](/prompt/lighthouse-stormy-seascape)、夜の森の光は [星明かりの入り江](/prompt/aurora-forest-starlight-lagoon) が、人物以外の光の参考になります。

人工光を足す前に、自然光の語が残っていないかを見ます。\`sunlight\` と \`neon lights\` が両方あると、昼の街に看板の光が溶けます。夜にするなら \`night\` を残し、日光は外してください。キャンドルは炎を一つにします。炎を三本書くと、顔の上が明るく飛びます。食卓であることと、炎の数は、別の語です。フレアは、向きが決まってから弱く足します。最初の枚からフレアを入れると、何の光かが見えません。

ネオンは色を一つにします。青と赤を同じ強さにすると、顔の上で色が混ざります。スポットは、当たっている場所を顔か、床か、で一つにします。両方を書くと、光源が二つに見えます。キャンドルの炎は食卓の上に一つです。炎を持つポーズにはしません。`,
      },
      {
        title: '影の付け方と消し方',
        content: `影を付けるときは \`shadow\` を一つ足します。硬い影は hard shadow、柔らかい影は soft shadow と自然な英語です。公式タグとしては断定しません。両方を同じ強さにすると、境界が平均になります。

目元の影は shadow over eyes、顔の片側が陰るのは shaded face と自然な英語です。目元だけを暗くしたいのに \`dark\` を全体にかけると、背景まで黒くなります。\`dark\` は [暗い部屋プロンプト](/guides/dark-room-prompt-guide) 側の語として残し、この節では影の位置を書いてください。

影を消したいときは、ネガティブに \`harsh shadow, dark face\` を入れ、ポジティブに even lighting を自然な英語で足します。逆光で顔が暗いときは、\`backlighting\` を残し、\`rim lighting\` と soft front fill light を自然な英語で弱く足します。正面の光を同じ重みにすると、逆光が消えて順光になります。

**影を弱くする**

\`\`\`
1 adult man, even lighting, soft lighting, plain gray background,
suit, necktie, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
harsh shadow, dark face, school uniform, short skirt, revealing clothes, bedroom
\`\`\`

影の形が服の色と混ざるときは、服を無地に戻してから、影の語を一つだけ残します。

影を消す枚と、影を付ける枚は、プロンプトを分けて保存します。同じ文の中で \`shadow\` と even lighting を両方強くすると、頬の下だけが灰色に残ります。目元の影が要る肖像は、shadow over eyes を自然な英語で一つ足し、背景の \`dark\` は外します。背景まで暗いと、目元の影との差が無くなります。逆光の補助光は、顔が見えた時点で足すのを止めます。明るくし続けると、逆光ではなく順光になります。

影を付ける枚では、影の位置を顔の左か右かで書きます。位置を書かないと、影が背景の隅に逃げます。影を消す枚では、影の語をポジティブから全部外してから、均一な明るさの自然な英語を足します。外し忘れると、消す指示と付ける指示が同時に残ります。`,
      },
      {
        title: '組み合わせテンプレ',
        content: `組み合わせは、軸を二つまでです。三つ目を足すときは、前の枚で足りないものだけにしてください。人物は成人で、服を着ています。

雪の夜の電球は [クリスマスのプロンプト一覧](/guides/christmas-prompt-guide)、暗い部屋の一点は [暗い部屋プロンプト](/guides/dark-room-prompt-guide) へ続きます。この節では、光の組み合わせだけを短くします。

テンプレを混ぜるときは、人物の服を固定し、光の行だけを差し替えます。服まで変えると、明るさの差が服の色の差に見えます。雪の夜の電球を、室内のスポットと一つの文にしないでください。場所が平均になって、雪も部屋も中途半端になります。暗い部屋のスポットは、このページでは組み合わせの一例です。部屋の暗さの段階を細かく書くときは、暗い部屋のガイドに戻ってください。

組み合わせのテンプレは、光の行だけを差し替えて使います。人物の年齢や服をテンプレごとに変えると、光の見本になりません。気に入った光は、その二語をメモし、自分の人物の文の直後に貼ります。テンプレの背景まで一緒に貼ると、場所が混ざります。

**逆光と夕焼け**

\`\`\`
1 adult woman, backlighting, sunset, rim lighting,
long coat, standing, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**窓辺の柔らかい光**

\`\`\`
1 adult man, soft lighting, window light, upper body,
knit sweater, sitting on a chair, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**木漏れ日**

\`\`\`
1 adult woman, dappled sunlight, sunbeam, standing, park,
white blouse, long skirt, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**ネオンの夜**

\`\`\`
1 adult man, neon lights, night, city street, cinematic lighting,
jacket, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**スタジオ**

\`\`\`
1 adult woman, studio lighting, soft lighting, plain gray background,
blouse, long sleeves, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**映画風のサイド光**

\`\`\`
1 adult man, side lighting, cinematic lighting, dramatic lighting,
coat, standing, upper body, serious
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**月明かり**

\`\`\`
1 adult woman, moonlight, night, soft lighting,
winter coat, standing, street, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**雪の夜の電球**

\`\`\`
1 adult man, string lights, snow, night, soft lighting,
winter coat, scarf, standing, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**暗い部屋のスポット**

\`\`\`
1 adult woman, spotlight, dark, low-key lighting,
sitting on a chair, blouse, long sleeves, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**縁の光と正面の補助**

\`\`\`
1 adult man, rim lighting, soft front fill light, sunset,
suit, standing, upper body, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom, dark face
\`\`\``,
      },
      {
        title: '崩れ対策とモデルの差',
        content: `光の指定が効かないときは、光の語を人物の直後へ移します。重みは \`(backlighting:1.2)\` のように、1.1 から 1.3 の一つです。1.4 を超えると、その光だけが白く飛んで、服の色が消えます。

光源が増えすぎるときは、ネオン、スポット、窓、月のうち一つを残して、残りを消します。効果の \`lens flare\` と \`light particles\` も、光源とは別の層です。光源が決まるまで、効果は足しません。

実写寄りのモデルは、window light や studio lighting のような自然な英語が残りやすいことがあります。アニメ寄りのモデルは、\`backlighting\` や \`rim lighting\` のような短いタグの方が、輪郭の光として残りやすいことがあります。同じ文を両方に貼っても、影の硬さは揃いません。比較するときは、モデルを固定してください。

品質のタグを光より前に置くと、光が平均の明るさに戻ることがあります。品質の位置は [品質タグ一覧](/guides/quality-tags-prompt-guide) に合わせ、光は人物の直後です。

顔が暗い枚は、捨てる前に、補助の正面光を弱く一語だけ足して再生成します。語を三つついでに足さないでください。

モデルを変えたときは、プロンプトは同じにして、光の語の位置だけを見ます。位置を変えて、モデルも変えると、どちらが効いたのかが残りません。アニメ寄りで輪郭の光が弱いときは、\`rim lighting\` を前に移し、自然な英語の窓の説明は一旦外します。実写寄りでタグが無視されるときは、window light のような自然な英語を一文にして、短いタグを減らします。両方の書き方を、同じモデルの中で混ぜすぎないでください。

同じモデルで三枚出して、光の位置が三枚とも違うときは、語が後ろにあります。前に移してから、もう三枚です。モデルを替えた直後は、成功した前のモデルの重みを持ち越さないでください。重みは 1.1 からやり直し、そのモデルで残る位置を探します。`,
      },
      {
        title: 'ChatGPT・Gemini・Midjourneyの自然文',
        content: `自然文では、光が来る方向、時間、顔に残す明るさ、をこの順で書きます。タグ名をカンマで長く並べるより、一つの文の方が、ChatGPT や Gemini では向きが残りやすいことがあります。

Midjourney では括弧の重みを外し、同じ方向だけを残します。縦の肖像なら、文の末尾で縦横を指定します。

**夕日は後ろ、顔は補助光**

\`\`\`
1 adult woman, adult, standing outdoors at sunset in a long coat and long skirt.
The sun is behind her, slightly to the left, so the edge of her hair and shoulder is bright.
Her face is still visible from a soft reflected fill, not in deep shadow.
Upper body, looking at the viewer. No text.
\`\`\`

Stable Diffusion に戻すときは、\`1 adult woman, backlighting, sunset, rim lighting\` に分解し、顔が暗いときだけ soft front fill light を自然な英語で足してください。

自然文では、左か右かを必ず書きます。「後ろから」だけだと、真後ろになって顔が消えやすいです。斜め後ろ、と角度を一つ足し、顔に残す明るさを次の文で書きます。Midjourney では、この二文を一つの文にまとめ、括弧は使いません。時間帯を夕日から夜に変えるときは、文を書き直します。夕日の語を残したまま夜を足すと、空の色が平均になります。`,
      },
    ],
    faq: [
      {
        q: '逆光にすると顔が真っ黒になります',
        a: '`backlighting` と `rim lighting` は残し、soft front fill light を自然な英語で弱く足します。正面光を同じ重みにすると、逆光が消えます。ネガティブには `dark face` を足せます。',
      },
      {
        q: '光の語を書いても明るさが変わりません',
        a: '光の語を人物の直後に移し、重みは 1.1 から 1.3 の一つにしてください。光源は一つに減らします。実写寄りのモデルとアニメ寄りのモデルでは、自然な英語と短いタグの残り方が違います。',
      },
      {
        q: '影を消したい',
        a: 'ポジティブに even lighting を自然な英語で入れ、ネガティブに `harsh shadow, dark face` を入れます。`shadow` をポジティブに残したままでは消えません。',
      },
      {
        q: 'ライティングは文章の意味ですか',
        a: '検索では文章作成の意味で使われることがあります。このページは画像の光・照明・影です。見出しの「光・照明」を、文章の型とは分けて読んでください。',
      },
      {
        q: '暗い部屋の書き方はどこですか',
        a: '室内の暗さを段階で書く手順は暗い部屋プロンプトです。このページは向き、質、時間、影の一覧で、暗い部屋のスポットはその中の一つの組み合わせです。',
      },
    ],
  },

  'christmas-prompt-guide': {
    sections: [
      {
        title: 'クリスマスプロンプトの基本',
        content: `「クリスマス プロンプト」「クリスマス 呪文」は、衣装、背景、光、小物をこの順で足します。四つを一度に強くすると、赤一色の平均的な絵になります。最初の一枚は、衣装を一つ、背景を一つ、光を一つ、小物を一つまでです。

人物を置くときは成人だけです。\`1 adult woman\`、\`1 adult man\`、または \`2 adults\` から書き、\`adult\` を残します。年少者を待つ場面や、年少者を混ぜた集合は書きません。ブランドのキャラクター名も書きません。サンタクロースとトナカイは、一般的なモチーフとしてだけ使います。

ミニスカや肌の露出が多い衣装は使いません。袖は長く、丈は足首まで、を衣装の条件にします。

年始の挨拶絵は [AI年賀状プロンプト](/guides/new-year-card-ai-prompt-guide)、場所の語は [背景プロンプト](/guides/background-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。冬の服のタグは [冬服](/tag/冬服) です。

最初の一枚で見るのは、衣装が長袖か、背景が一つに読めるか、小物が手に持たせすぎていないか、です。赤いかどうかは、その次です。赤を先に強くすると、ツリーもコートも同じ色になり、形の差が消えます。人物を置く回と、置かない回は、プロンプトを分けて保存します。人数のタグが残ったまま「人は描かない」と書いても、端に人が残ることがあります。

人物を置く最初の枚は、小物を一つ、背景を一つ、に固定して衣装だけを見ます。衣装が長袖で、丈が足首までなら、その枚を保存してから背景を足します。衣装が短くなった枚に背景を足しても、丈は戻りません。先に衣装の文を直してください。

長袖と足首までの丈が揃った枚を、衣装の基準として別名で保存します。以降の背景や小物は、その基準の文に足していきます。基準を上書きすると、丈の条件が次の実験で消えます。消えたときは、保存した基準に戻ってから、足した語を一つずつ載せ直してください。

基準の枚と、小物を足した枚を並べて、丈と袖が同じかを見ます。違うときは小物の枚を捨て、基準に小物を一つだけ足して再生成します。ツリーの大きさで人物が小さくなるときも、同じです。人物の行を前に戻し、ツリーは後ろの一文に下げます。

**アニメ塗りの型**

\`\`\`
1 adult woman, santa hat, red dress, long sleeves, ankle-length,
christmas tree, string lights, gift box, standing, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**写真の型**

\`\`\`
1 adult man, santa hat, winter coat, scarf, christmas tree,
soft lighting, standing, upper body, photorealistic
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\``,
      },
      {
        title: '衣装の一覧',
        content: `衣装は一つです。サンタの帽子と、冬のコートを同じ強さにしても構いません。形が違うドレスとコートを同時に強くしないでください。

\`santa hat\` は帽子、\`santa costume\` は衣装です。衣装には \`long sleeves\` と、long red coat を自然な英語で足します。赤いドレスにするときは、red dress, long sleeves, ankle-length と自然な英語で丈を書きます。公式タグとしては、丈の句は断定しません。

\`winter coat\`、\`scarf\`、\`mittens\` は冬の防寒です。ニットは knit sweater と自然な英語です。トナカイのカチューシャは reindeer antlers headband と自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは \`santa hat\` に戻してください。耳飾りと帽子を両方強くすると、頭の上で部品が重なります。

丈が短くなった枚は、ankle-length の自然な英語を衣装の直後に戻します。袖が消えた枚は、\`long sleeves\` を人数の近くに戻します。コートとドレスを一枚の中で見比べないでください。別のプロンプトです。男性の枚でドレスの語が残っていたら、消してから \`winter coat\` を足します。残った語は、ネガティブに入れなくても、ポジティブから外せば消えることが多いです。

帽子の色を赤以外にするときは、衣装の赤と分けて書きます。両方を赤のままにすると、帽子とコートの境目が消えます。冬のコートを主にする回は、赤い帽子を弱くするか、外します。外した方が、マフラーとコートの形は残りやすいです。

男性も同じ条件です。長袖の赤いコート、または冬のコートとマフラーです。肌を出す書き方は入れません。

アクセサリーの細かい部品は [アクセサリープロンプト](/guides/accessory-prompt-guide)、丈のあるドレスの種類は [ドレスプロンプト](/guides/dress-prompt-guide) です。このページでは、赤いか、防寒か、を先に決めます。

| 衣装 | 書き方 | 条件 |
|---|---|---|
| サンタ帽 | \`santa hat\` | 他の帽子と同時に強くしない |
| サンタの衣装 | \`santa costume\`, \`long sleeves\` | long red coat は自然な英語 |
| 赤いドレス | red dress, long sleeves, ankle-length（自然な英語） | 丈は足首まで |
| 冬コート | \`winter coat\` | \`scarf\`, \`mittens\` と一緒にしやすい |
| ニット | knit sweater（自然な英語） | 公式タグとしては断定しない |
| トナカイのカチューシャ | reindeer antlers headband（自然な英語） | 帽子と両方強くしない |

**長袖の赤**

\`\`\`
1 adult woman, santa hat, santa costume, long sleeves, long red coat,
standing, christmas tree, full body, smile
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

**男性の冬コート**

\`\`\`
1 adult man, santa hat, winter coat, scarf, mittens,
standing, snow, smile, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\``,
      },
      {
        title: '背景と部屋',
        content: `背景は一つを主にします。ツリーと雪の街を同じ強さにすると、室内と屋外が平均になります。

\`christmas tree\` はツリー、\`christmas ornaments\` は飾り、\`christmas lights\` は電飾です。暖炉は \`fireplace\` です。部屋は居間か、ツリーの前の床にしてください。寝室にはしません。リースは wreath と自然な英語です。公式タグとしては断定しません。

雪の街は \`snow\` と \`snowing\` です。夜の電球の連なりは \`string lights\` で、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。ヨーロッパ風の市は christmas market と自然な英語です。公式タグとしては断定しません。屋台の看板に文字を書かせないでください。文字はあとから乗せます。

| 背景 | 書き方 | 注記 |
|---|---|---|
| ツリー | \`christmas tree\` | 室内の主背景 |
| 飾り | \`christmas ornaments\` | ツリーとセット |
| 電飾 | \`christmas lights\` | \`string lights\` と両方強くしない |
| 暖炉 | \`fireplace\` | 居間。寝室にはしない |
| リース | wreath（自然な英語） | 公式タグとしては断定しない |
| 雪 | \`snow\`, \`snowing\` | 屋外。室内と同時に強くしない |
| 市 | christmas market（自然な英語） | 文字は書かせない |

**ツリーの前**

\`\`\`
1 adult woman, knit sweater, long skirt, santa hat,
christmas tree, christmas ornaments, fireplace, standing, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\`

暖炉の火を強くすると、顔がオレンジ一色になります。火は弱く、電飾を主にしてください。

室内と屋外を一枚で混ぜないでください。ツリーの前に雪が降る、はどちらかを主にします。室内なら \`snowing\` を外し、屋外なら \`fireplace\` を外します。市の自然な英語が屋台の文字になるときは、文字を禁止する文を足すか、市の語を外して \`christmas tree\` に戻します。リースは、ドアか壁かを一つ書いてください。置き場が無いと、頭の飾りと混ざります。

室内の枚で窓の外に雪を見せたいときも、降る雪の語は弱くします。強くすると、室内の床まで雪になり、暖炉と矛盾します。市の場面は、人を小さくしすぎないように、成人の一人を手前に置いてから屋台を後ろにします。文字の看板は書かせません。`,
      },
      {
        title: '小物とモチーフ',
        content: `小物は二つまでです。三つを同じ強さにすると、手が全部を持とうとして指が増えます。

\`gift box\` は箱、\`candy cane\` は杖の砂糖菓子、\`holly\` はひいらぎです。ケーキは christmas cake、ジンジャーブレッドは gingerbread、食卓のキャンドルは candle on a table と自然な英語です。公式タグとしては断定しません。キャンドルは食卓に置き、寝室や浴室には置きません。

\`reindeer\` はトナカイ、\`snowflakes\` は雪の結晶です。トナカイを人と同時に大きく描くと、人が小さくなります。人を主にする回は、トナカイを背景の小物にしてください。

小物を手に持たせるときは、一つだけです。箱と杖菓子とケーキを同時に持たせると、指が道具の数だけ増えます。飾る小物と、持つ小物を分けてください。持つのは \`gift box\`、飾るのは \`holly\`、のように役割を分けます。キャンドルは食卓の上に置き、人が持つ光源にはしません。炎が手の近くにあると、指の輪郭が飛びます。ケーキの上の文字も書かせないでください。

小物を増やすのは、衣装と背景が安定した次の回です。最初から箱と結晶とひいらぎを入れると、どれが季節を作ったのかが分かりません。一つ足して季節が出たら、そこで止めます。二つ目は、まだ物足りないときだけです。

| 小物 | 書き方 | 注記 |
|---|---|---|
| 贈り物 | \`gift box\` | \`gift\` より箱の形が残りやすい |
| 杖菓子 | \`candy cane\` | 手に持つか、飾りかを一つ |
| ひいらぎ | \`holly\` | リースと同時に強くしない |
| ケーキ | christmas cake（自然な英語） | 公式タグとしては断定しない |
| 菓子 | gingerbread（自然な英語） | 文字のアイシングは書かせない |
| キャンドル | candle on a table（自然な英語） | 食卓だけ |
| トナカイ | \`reindeer\` | 人を主にするなら小さく |
| 結晶 | \`snowflakes\` | 雪とセットにしやすい |

**箱を一つ**

\`\`\`
1 adult man, winter coat, scarf, holding a gift box,
christmas tree, smile, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom
\`\`\``,
      },
      {
        title: '人物なしのイラスト',
        content: `人物を書かない回は、人数のタグを置きません。ネガティブに人物を入れ、年齢の語も残します。カードの地紙や、アイコンの背景に使えます。

ツリーだけ、雪だるま、贈り物とひいらぎの静物、のどれか一つにしてください。雪だるまは snowman と自然な英語です。公式タグとしては断定しません。人の顔のタグを雪だるまに足すと、成人の肖像が混ざります。

水彩や絵本のような塗りは [画風プロンプト](/guides/art-style-prompt-guide) で一つだけ足します。画風を三つの名前で同時に強くしないでください。特定のスタジオや、生きている絵師の名前は書きません。

人物なしの枚で顔が端に出たら、ネガティブの人物の語を前に移し、\`santa hat\` が人の頭として解釈されていないかを見ます。帽子だけのタグは、人がいない構図では外した方が安定します。雪だるまの顔に、人の目のタグを足さないでください。目の色や \`looking at viewer\` は、成人の肖像用です。静物は、中央に一つ、余白を周囲に、で足ります。飾りを四種類並べると、何の絵かが見えなくなります。

人物なしの絵は、カードの地紙と、アイコンの背景で使い道が違います。地紙は余白を広く、アイコンはモチーフを中央に大きくします。同じプロンプトで両方は出ません。比率を変えるときは、文も書き分けてください。雪だるまに人の服の語を足すと、成人の肖像が混ざります。

**ツリーだけ**

\`\`\`
christmas tree, christmas ornaments, christmas lights, gift box,
snowflakes, centered, no person, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, human, face, text, watermark
\`\`\`

**雪だるま**

\`\`\`
a single snowman, scarf, santa hat, snow, night, string lights,
centered, no person, storybook colors
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, human, face, text, watermark
\`\`\``,
      },
      {
        title: 'クリスマスカードとSNSアイコン',
        content: `カードは、絵を先に作り、文字はあとから乗せます。絵の中に挨拶文を書かせると、画数が崩れた字が残ります。余白は copy space と自然な英語です。公式タグとしては断定しません。余白の位置は、上か下かを一つにしてください。

正方形はアイコン、縦長は物語の一枚や端末の壁紙に向きます。縦横の指定は [9:16のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) です。クリスマスカードは、はがきに近い縦でも足ります。細長い画面のまま印刷すると、左右の飾りが切れます。

Gemini や ChatGPT では、余白と「文字は入れない」を文の前半に置きます。

**余白のあるカード**

\`\`\`
A vertical Christmas card illustration with copy space at the top.
A christmas tree, a gift box, and holly at the bottom. Soft lighting, snowflakes.
No people, no letters, no words, no logo. Leave the upper third empty for a greeting to be added later.
\`\`\`

文字を乗せる作業は、画像編集か組版で行います。生成の回でフォント名を指定しても、字は安定しません。

余白が絵で埋まるときは、小物を一つ減らします。余白の語を強くするより、下に置くモチーフを減らした方が、上の空きは残りやすいです。アイコンにするときは、正方形であることと、顔やツリーを中央に置くことを先に書きます。縦長のカード用の絵を、あとから正方形に切り取ると、余白の位置がずれます。最初から、使う比率で生成してください。文字を乗せるファイルと、絵だけのファイルは、別名で保存します。

余白の位置を下に変えたいときは、モチーフを上に移す文を一つ足し、前の余白の位置の文は消します。両方残すと、余白が中央に平均されます。アイコンでツリーが端に寄るときは、中央、を文の前半に戻します。文字は、保存した絵だけのファイルには入れません。`,
      },
      {
        title: '自分の写真をクリスマス風にする',
        content: `自分の写真を使うときは、顔と髪型を変えないことを先頭に書きます。変えるものは、背景をツリーにする、帽子を足す、冬の服に見えるようにする、のどれか一つです。成人の本人の写真だけを使ってください。

アップロードの前に、利用規約と学習の設定を確認します。他人の写真は使いません。子どもの写真は使わない。

服を冬物に替える作例は [冬の服への着せ替え](/prompt/season-winter-outfit-swap) です。顔を残す条件は、証明写真のページと同じで、変えないものを先に書きます。

帽子を足す回で、髪型の長さが変わるのは失敗です。長さを変えない、と先頭に足してやり直します。背景をツリーにした枚で、服の色まで赤く染まるときは、服は変えない、を背景の文より前に置きます。冬の服に替える回は、元の服の柄が残ることがあります。そのときは、長袖の冬コート、と服の名前を一つに減らし、マフラーは次の回にします。三つの変更を同じ指示にまとめないでください。

自分の写真では、帽子を足した枚と、背景を変えた枚を別々に残します。両方を気に入ったら、良い方の顔が元の写真に近いかを見て、近い枚だけを次の入力にします。近い枚が無いときは、最初の写真に戻って、変更を一つに減らします。

**背景だけツリー**

\`\`\`
添付した成人（adult）の本人写真の背景だけを、クリスマスツリーと小さな電飾に変えてください。
顔の特徴、髪型、表情、服は変えません。文字は入れないでください。
\`\`\`

**帽子を足す**

\`\`\`
添付した成人（adult）の本人写真に、赤いサンタ帽だけを追加してください。
顔、髪型の長さ、服、背景は変えません。帽子以外の飾りは足しません。
\`\`\`

**冬の服に見えるように**

\`\`\`
添付した成人（adult）の本人写真の服だけを、長袖の冬コートとマフラーに変えてください。
顔の特徴と髪型は変えません。肌の露出は増やしません。背景は均一な薄いグレーのままでも構いません。
\`\`\``,
      },
      {
        title: 'カップルと友達',
        content: `二人は \`2 adults\` です。並んで立つ、手袋をした手を見せる、箱を渡す、のどれか一つにしてください。年少者は混ぜません。

二人の距離の全般は [二人構図](/guides/two-person-composition-prompt-guide)、つないだ手の指は [恋人繋ぎプロンプト](/guides/hand-holding-prompt-guide) です。このページでは、冬の服で並ぶところまでを書きます。

公開作例の冬の二人は [装飾のある冬の衣装](/prompt/elegant-winter-couple-ornate-clothing)、雪のファンタジーの衣装は [雪のガウン](/prompt/snow-queen-fantasy-gown) です。衣装の部品を増やすときは、一人ずつ確認してから二人に戻してください。

**並んで立つ**

\`\`\`
2 adults, winter coat, scarf, mittens, standing side by side,
christmas tree, string lights, smile, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, bedroom, extra people
\`\`\`

箱を渡す回は、\`holding a gift box\` を一人の側にだけ書きます。両方に持たせると、箱が二つに増えて、手が融合しやすくなります。

二人の身長や体の厚みは、このページでは書きません。体の差が要るときは、二人構図のガイドへ渡してから、冬の服だけを戻してください。並びは横並びを基本にします。前後に重ねると、腕が一本に見えます。笑顔にするなら \`smile\` を一人ずつではなく、\`2 adults\` の直後に一つです。表情を二人で別々に強くすると、顔が平均になります。手袋は \`mittens\` で、指を絡める描写は足しません。

二人の枚で人数が三人に増えたら、先頭の人数を戻し、背景の人混みの語が無いかを見ます。市や街を後ろに書くと、通行人が足されます。通行人が要らなければ、背景をツリーの前の床に変えてください。表情は一つにまとめ、左右で別の感情を書かないでください。`,
      },
      {
        title: '季節感が弱いときの直し方',
        content: `季節感が出ないときは、小物を二つから三つに増やします。帽子だけだと、赤い帽子の肖像で止まります。ツリーか雪かを一つ足し、\`gift box\` か \`holly\` を一つ足してください。四つ目は足しません。

赤だらけになるときは、コートを \`winter coat\` の暗い色に戻し、赤は \`santa hat\` だけにします。配色の分け方は [色プロンプト](/guides/color-prompt-guide) です。赤と緑を同じ強さにすると、どちらも濁ります。主色を一つ決めてください。

雪が強すぎるときは、\`snowing\` を外して \`snow\` を地面だけに残します。結晶の \`snowflakes\` を顔の前に強く置くと、目が隠れます。結晶は背景側です。

電飾が顔より明るいときは、\`christmas lights\` を後ろに回し、\`soft lighting\` を顔の側に弱く足します。光の調整は [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

自然文で直すときは、足りない小物の名前を一つだけ足して再生成します。衣装と背景と小物を同時に書き換えないでください。

雪が顔を隠す枚は、\`snowflakes\` を外し、地面の \`snow\` だけを残して見ます。それでも白い粒が目に乗るときは、上半身ではなく、少し引いた全身にして、結晶を背景側に戻します。赤と緑が濁る枚は、緑を一旦消し、赤は帽子だけにします。緑を戻すのは、赤の範囲が決まってからです。

小物を足す順番は、地面の雪、箱、ひいらぎ、です。一度に足さず、季節が読めた段で止めます。読めたあとに電飾を足すと、明るい点が顔に乗ることがあります。そのときは電飾を外し、柔らかい光だけを残します。ツリーの飾りの色は、衣装の赤と違う色を一つにしてください。同じ赤だと、飾りと衣装の境目が消えます。電飾を消したいときは、\`christmas lights\` を外し、\`soft lighting\` だけを残してください。`,
      },
    ],
    faq: [
      {
        q: 'サンタの衣装はどこまで書けますか',
        a: '`santa hat` と `santa costume` に、`long sleeves` と long red coat を自然な英語で足します。赤いドレスにするときは ankle-length までを書いてください。ミニスカや肌の露出が多い衣装は使いません。',
      },
      {
        q: '年少者を混ぜた集合は描けますか',
        a: 'このページでは描きません。人物は `1 adult woman`、`1 adult man`、`2 adults` だけです。二人の距離は二人構図のガイドへ渡してください。',
      },
      {
        q: 'カードに文字が崩れます',
        a: '絵の中には文字を入れません。copy space を自然な英語で余白だけ確保し、挨拶文はあとから乗せます。余白は上か下かを一つにしてください。',
      },
      {
        q: '自分の写真の顔が別人になります',
        a: '変えないもの（顔、髪型）を先頭に書き、今回変えるものを背景か帽子か服のどれか一つにします。アップロード前に、利用規約と学習の設定を確認してください。',
      },
      {
        q: '赤一色になって季節の小物が見えません',
        a: '赤は帽子だけに減らし、コートは `winter coat` に戻します。小物は `gift box` か `holly` を一つ足します。色の分離は色プロンプトのガイドです。',
      },
    ],
  },
}
