/**
 * Seventh SEO batch (2026-10-30): fantasy outfits, composition hub,
 * 2027 new-year cards, dresses, and eyes.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume stays 0 in GUIDES — exact volumes are not published here.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_7_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'fantasy-outfit-prompt-guide': {
    sections: [
      {
        title: 'ファンタジー衣装プロンプトの基本',
        content: `「ファンタジー衣装 プロンプト」「ファンタジー 服装 プロンプト」で必要なのは、職業を先に決め、その職業が着る部品を順に足すことです。順番は、職業、衣装のパーツ、素材と色、小物、背景です。\`fantasy\` だけだと、現代のコートやワンピースに金属の飾りが乗ることがあります。

同じ順番を、Stable Diffusion、NovelAI、Midjourney に渡すときも崩しません。イラスト向けのモデルは、職業のタグを前に置いた方が、鎧やローブの形が残ります。写真向けのモデルは、silver plate armor のように素材を自然な英語で補った方が、金属の反射が出ます。Midjourney は重みの括弧を外し、縦の全身なら文の末尾で縦横を指定します。人数を省略すると、画面の端にもう一人が足されることがあります。そのときは 1 adult を前に戻してください。作品の題名や、生きている絵師の名前では衣装を指定しません。欲しいのは、板金か布か、マントがあるか、です。部品を足す前に、今の画面で足りないものを一つだけ言える状態にしてください。

生成したら、職業が読めるか、部品が二つ以内か、現代の服が無いか、をこの順で見ます。職業が読めない絵は、部品を足す前に職業の語を前へ移します。

ネガティブは、現代の服と、肌の露出が多い服と、年齢の語を、毎回残します。ポジティブを長くしても、この三つの代わりにはなりません。

職業の語は人物の直後に置きます。後ろに長く続くと、鎧が布のドレスに戻ったり、杖がただの棒になったりします。最初の一手は、職業を一つ、部品を二つまでです。効いたら素材か小物を一つ足します。

登場人物は大人だけです。人数は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。作品名、スタジオ名、実在の人物名は書きません。中世ヨーロッパ風のRPG、と場所の雰囲気で足ります。特定作品の衣装を要素に分ける考え方は [コスプレプロンプト](/guides/cosplay-prompt-guide) です。

アニメ塗りと写真の切り替えは [画風プロンプト](/guides/art-style-prompt-guide)、全身で見せる角度は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide)、立ち方は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。作例の並びは [服装プロンプト集](/prompts/clothing)、タグは [ファンタジー衣装](/tag/ファンタジー衣装) です。

**職業から背景までの型**

\`\`\`
1 adult woman, knight, silver armor, cape, standing,
stone castle courtyard, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\``,
      },
      {
        title: '職業別の一覧',
        content: `職業は一つにします。騎士と魔法使いを同じ強さで並べると、ローブの上に板金が溶けて、どちらでもない服になります。近い職業でも、部品のセットは別です。

僧侶は white robe を先に置き、cleric robe は自然な英語で一語だけ足します。剣は外し、持つなら杖を一つです。吟遊詩人は楽器を一つにします。lute と笛を同時に書くと、手が両方を握ろうとして指が増えます。錬金術師はガラス瓶を一つ、机の上か手に置きます。瓶の中の色を三色書くと、ローブの色がそれに負けます。レンジャーの弓は、構えているのか、背負っているのかを一つにしてください。holding a bow は自然な英語です。矢筒は quiver と自然な英語で、公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは弓を外し、cloak と leather armor だけに戻します。

職業を変える比較では、背景と向きを固定します。背景まで変えると、衣装の差なのか場所の差なのかが分からなくなります。

一覧に無い職業を足すときも、自然な英語で役割を一つ書き、部品は既存の表から二つまで借りてください。新しい部品を一度に発明しないでください。

| 職業 | 先に書く語 | 足す部品 |
|---|---|---|
| 騎士 | \`knight\`, \`armor\` | \`full armor\`, \`cape\`, knight helmet（自然な英語） |
| 剣士 | \`knight\` より剣を主に。swordswoman は自然な英語 | \`holding sword\`, leather armor（自然な英語） |
| 魔法使い・魔女 | \`robe\`, \`witch hat\` | \`staff\`, \`holding staff\`, spellbook（自然な英語） |
| 僧侶・聖職者 | \`white robe\` | cleric robe（自然な英語）。公式タグとしては断定しない |
| 弓使い・レンジャー | ranger outfit（自然な英語） | \`cloak\`, bow（自然な英語）。\`hood\` は顔を隠すときだけ |
| 盗賊・暗殺者 | \`hood\`, \`cloak\` | leather armor（自然な英語） |
| 吟遊詩人 | bard（自然な英語） | lute（自然な英語）, \`cape\` |
| 錬金術師 | alchemist（自然な英語） | glass flask（自然な英語）, \`robe\` |

剣士の公開作例は [自信のある剣士](/prompt/fantasy-swordswoman-confident)、暗殺者は [フードの革鎧](/prompt/hooded-assassin-leather-armor) です。戦士の体の厚みは [筋肉質プロンプト](/guides/muscular-prompt-guide) を見て、鎧の部品とは別の層にしてください。体の語を先に強くすると、鎧の形が平均に戻ります。

**騎士の短い例**

\`\`\`
1 adult man, knight, armor, cape, holding sword,
standing, stone hall, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

僧侶は \`white robe\` を先に置き、cleric robe は自然な英語で一つ足すだけにします。両方を強くすると、白い布が二重になります。レンジャーは ranger outfit を自然な英語で書き、弓は holding a bow と自然な英語で手に結びます。\`holding sword\` と同時に強くしないでください。`,
      },
      {
        title: '騎士・鎧のパーツ',
        content: `鎧は、全身を覆うか、動きやすい軽装かを先に分けます。\`full armor\` は板金で体の線を覆う方です。軽装は light armor と自然な英語で、革と布が残ります。両方を同じ強さにすると、金属の量が平均になります。

軽装にしたいときは full armor を外し、light armor を自然な英語で書きます。革は leather armor と自然な英語で一つ足すと、板金より布と革が残ります。すね当ては greaves、靴の上の金属は sabaton と自然な英語です。どちらも公式タグとしては断定しません。兜を書くと、目と口が隠れます。表情が要る肖像では knight helmet を外し、pauldrons と cape だけを残してください。肩当てを左右で別の形にすると、モデルは平均を取って、片方の形がもう片方へ溶けます。色は銀か黒かを、鎧全体で一つにします。金を混ぜると、光の位置が決まらず、全体が黄ばみます。

板金が布に戻ったら、full armor を前に戻し、装飾の金を一旦外します。金の模様は、金属の種類が決まってから足します。

左右が非対称な鎧は、部品を armor と cape に戻してから、pauldrons だけを足して再生成します。非対称のまま重みを上げても揃いません。

部品は一度に二つまで足します。兜、肩、マント、篭手を全部強くすると、左右が非対称になったり、肩の板が胸の前で融合したりします。競合する記事でも、騎士として読ませるには兜・鎧・マント・すね当てのセットが要る、と整理されています。すね当ては greaves と自然な英語です。公式タグとしては断定しません。まずは \`armor\` と \`cape\` です。

| 部品 | 書き方 | 置き方 |
|---|---|---|
| 鎧全体 | \`armor\`, \`full armor\` | 職業の直後 |
| 篭手 | \`gauntlets\` | 手の前。剣と同時に強くしない |
| 肩当て | \`pauldrons\` | 一つ。左右別色にしない |
| マント | \`cape\` | 肩から。\`cloak\` と両方強くしない |
| フード付き外套 | \`cloak\`, \`hood\` | 軽装・盗賊向き |
| 兜 | knight helmet（自然な英語） | 顔を見せるなら外す |
| 盾 | \`shield\` | 片手。剣と同時なら \`holding sword\` は弱く |

肌の露出が多い鎧は使いません。使わない語は bikini armor と revealing armor です。ネガティブには \`revealing clothes\` を入れます。

**全身の板金**

\`\`\`
1 adult woman, knight, full armor, silver armor, gauntlets, pauldrons, cape,
standing, castle gate, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

姫騎士は、成人の騎士に冠の小さい形を足した呼び方です。年齢を下げる語は入れません。

\`\`\`
1 adult woman, knight, silver armor, tiara, cape,
standing, castle courtyard, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

ティアラの素材は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。公開作例は [金のマントの騎士](/prompt/knight-princess-gold-cape) と [鎧の騎士](/prompt/knight-armor-fantasy-0) です。タグは [鎧](/tag/鎧) です。兜を書くと顔の情報が減ります。表情が要るときは knight helmet を外し、\`upper body\` に切り替えます。`,
      },
      {
        title: '魔法使い・魔女',
        content: `魔法使いは、ローブ、帽子、杖の三つで足ります。\`robe\` は長い布です。\`witch hat\` はつばの広い帽子です。\`staff\` は持たせたいとき \`holding staff\` とセットにします。\`staff\` だけだと、杖が背中に浮くことがあります。

効果の光は、杖の先か、床の円陣かのどちらかです。magic circle は自然な英語です。円陣と杖の光を両方強くすると、画面の中央が白く飛んで、ローブの色が消えます。色は青か金かを一つにしてください。魔導書を開くときは spellbook を自然な英語で書き、holding staff とは同時に強くしません。本と杖で手が二本分必要になり、指が融合します。帽子のつばが目を隠すときは、witch hat の重みを下げ、portrait ではなく upper body にして、顔の領域を確保します。男性の魔法使いは 1 adult man, robe, holding staff から書き、帽子は無くても成立します。

杖が棒になるときは、holding staff を robe の直後に置き、本や円陣は外します。持っているものが一つだと、手の形は残りやすいです。

光の色がローブに移ったら、光の語を外し、robe の色を先に確定します。光は、色が決まってから弱く戻します。

魔導書は spellbook、魔法陣は magic circle と自然な英語です。公式タグとしては断定しません。効果の光を足すときは、色を一つにします。青と金を同じ強さにすると、ローブの色まで混ざります。色の分離は [色プロンプト](/guides/color-prompt-guide) の BREAK を見てください。

**ローブと杖**

\`\`\`
1 adult woman, robe, witch hat, holding staff,
standing, candlelit study, upper body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

タグは [魔法使い](/tag/魔法使い) です。男性の魔法使いは \`1 adult man, robe, holding staff\` から書き、\`witch hat\` は外しても成立します。帽子とフードを両方強くすると、頭の上で布が二重になります。`,
      },
      {
        title: '種族別の衣装',
        content: `種族は衣装の前に一つだけ書きます。エルフと獣人と竜人を並べると、耳の形が平均になります。人の姿にするときも成人です。\`adult\` を残します。

ドワーフは dwarf と自然な英語です。背を低く書くことと、種族であることは別です。このページでは鎧か革かを決め、身長の数値は書きません。竜人は dragonkin、鱗は scales と自然な英語です。鱗と full armor を同じ強さにすると、金属の模様と鱗が区別できなくなります。鱗を見せるなら軽装にしてください。獣人の耳は、成人の人の姿の上に、動物を一つだけ足します。耳とティアラを両方強くすると、頭の上で部品が重なります。耳を残す回は冠の語を外します。猫と犬の耳を同時に書かないでください。形が平均になって、どちらにも見えなくなります。

耳や鱗が消えたときは、職業の部品を一つ減らしてから、種族の語を前に移します。部品が多いと、耳より鎧が優先されます。

種族の語が服より先に顔を変えてしまうときは、職業の部品を優先し、耳や鱗は portrait で別に確認します。

| 種族 | 書き方 | 衣装の足し方 |
|---|---|---|
| エルフ | \`elf\`, \`pointy ears\` | \`circlet\`。森なら \`cloak\` |
| 獣人 | \`animal ears\` | 成人の人の姿。耳の動物は一つ |
| ドワーフ | dwarf（自然な英語） | \`armor\` か leather armor（自然な英語）。背の低さは別の話題 |
| 竜人 | dragonkin（自然な英語） | 鱗は scales と自然な英語で、鎧と同時に強くしない |

公式タグとして断定するのは \`elf\`、\`pointy ears\`、\`circlet\`、\`animal ears\` です。ドワーフと竜人は自然な英語です。モデルによって効きが弱いことがあります。そのときは耳か鱗を一つだけ残し、職業の部品を優先してください。

**エルフ**

\`\`\`
1 adult woman, elf, pointy ears, circlet, cloak, leather armor,
standing, forest path, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

編み込みと一緒にする公開作例は [エルフの戦士](/prompt/elf-warrior-braided-hair) です。髪の編み方は [編み込みプロンプト](/guides/braid-prompt-guide) に任せ、このページでは耳と衣装を優先します。

獣人は耳の種類を一つにします。cat ears は自然な英語です。\`animal ears\` と同時に二種類の動物を書かないでください。耳が頭の上で混ざります。`,
      },
      {
        title: '王族・貴族',
        content: `王族は、冠と布で読み分けます。\`crown\` は王や女王の冠、\`tiara\` は額の小さい冠です。両方を同じ強さにすると、頭の上に金属が二段になります。どちらか一つにしてください。

王と王子は 1 adult man から書きます。crown か circlet を一つ、royal cape を自然な英語で足し、長いドレスの語は入れません。ドレスを着せるのは、成人の女性の例だけです。室内の家具は増やしません。玉座、絨毯、窓を全部書くと、人が肖像の大きさまで下がります。金の装飾を増やすときは、冠と裾で同じ gold を使い、銀を混ぜないでください。二色の金属は、光が定まらず、布の白まで黄ばみます。式の場面で花を足すなら、手に持つ花束を一つまでにして、床の模様とは分けます。

冠が小さいときは、portrait に切り替えて crown か tiara を確認し、問題なければ full body に戻します。全身のまま冠だけを直そうとすると、ドレスの丈が動きます。

宮廷の背景が現代のホールになるときは、throne room を前に移し、ネガティブの modern clothes を維持します。

マントは royal cape と自然な英語です。\`cape\` だけでも近いです。長いドレスの種類、丈、袖は [ドレスプロンプト](/guides/dress-prompt-guide) に分けてあります。このページでは、冠とマントと、場が宮廷であることを書きます。

王子と王は \`1 adult man\` です。\`crown\` か circlet を一つ、royal cape を自然な英語で足します。年齢を下げる語は入れません。

**女王の宮廷**

\`\`\`
1 adult woman, crown, royal cape, long dress, gold trim,
standing, throne room, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

gold trim と throne room は自然な英語です。衣装の金を増やすときは、冠の金属と服の金を同じ色名にしてください。別の金を二色書くと、片方が黄銅に寄ります。`,
      },
      {
        title: 'ダークファンタジーと中世の村人',
        content: `暗いトーンは、傷んだ革と、彩度の低い色で作ります。worn leather、muted colors は自然な英語です。\`cloak\` と \`hood\` を残すと、街の人ではなく旅人に寄ります。村人にするなら、鎧の語を外し、linen tunic を自然な英語で一つ書きます。

村人は鎧を全部外します。linen tunic、belt、boots を自然な英語で、色は茶か灰かを一つにします。muted colors を残すと、彩度が落ちて、暗い街の色に揃います。旅人と村人を一枚にすると、フードの有無が平均になって、どちらも中途半端な外套になります。酒場では、カウンターを一つまでにして、人の職業の語を前に残します。夜の室内でも、看板の文字は書かせません。ネガティブの text を外すと、読めない文字が壁に残ります。傷や血はこのページでは足しません。暗さは、色を落とし、光源をランプ一つにすることで足ります。

画面がただ暗いだけになったら、光源をランプ一つに戻し、色は茶と灰を残します。暗さの語を増やしても、衣装の形は戻りません。

革が新品の黒になるときは、worn leather を自然な英語で残し、full armor が混ざっていないかを確認します。

背景を酒場にするときは tavern interior と自然な英語です。場所の名詞は [背景プロンプト](/guides/background-prompt-guide) を見て、家具を三つ以上並べないでください。机、樽、ランプを全部強くすると、人が小さくなります。

**傷んだ革の旅人**

\`\`\`
1 adult man, hood, cloak, worn leather armor, muted colors,
standing, tavern interior, upper body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

血や傷の描写はこのページでは扱いません。暗さは色と素材で足ります。現代の街に戻るときは、次の節のネガティブを先に確認してください。`,
      },
      {
        title: '男性キャラのファンタジー衣装',
        content: `男性も成人です。\`1 adult man\` から書き、\`adult\` を残します。女性の例から冠やドレスだけを消すと、腰のラインが残ることがあります。職業の部品を、男性の例として書き直してください。

男性の魔法使いは 1 adult man, robe, holding staff です。帽子が無くても、ローブと杖だけで役割は読めます。男性のレンジャーは 1 adult man に ranger outfit と cloak を足し、弓は一つです。三つを見比べるときは、顔の向きと背景を固定し、衣装の語だけを差し替えます。比較の途中で tiara や long dress が残っていると、男性の例にも布の裾が混ざります。女性のプロンプトをコピーしたあとは、その二つの語を消してから生成してください。体を厚くする語は、軽装の回だけにします。板金の下に体の線を二重に出すと、鎧の合わせ目が崩れます。

男性の例でスカートの線が残ったら、long dress と tiara を検索して消し、armor か robe を書き直します。コピー元の語を残さないでください。

男性の三職業は、別ファイルで保存します。一つのプロンプトに knight と robe と ranger を残さないでください。

騎士は \`armor, cape\`、魔法使いは \`robe, holding staff\`、レンジャーは ranger outfit と \`cloak\` です。三つを一つのプロンプトに混ぜません。

**男性の騎士**

\`\`\`
1 adult man, knight, armor, cape, gauntlets,
standing, castle wall, full body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

体を厚くしたいときは [筋肉質プロンプト](/guides/muscular-prompt-guide) の段階を一つだけ足します。\`full armor\` と同時に筋肉の語を強くすると、金属の下に体の線が二重に出ます。軽装のときだけ、体の語を残してください。`,
      },
      {
        title: '崩れ対策と自然文',
        content: `現代の服が混ざるときは、ポジティブの末尾に \`fantasy\` を残し、ネガティブへ \`modern clothes, t-shirt, jeans\` を入れます。それでもシャツの襟が出るときは、職業の語をプロンプトの前の方へ移し、重みは \`(knight:1.2)\` から一つです。1.4 を超えると、鎧の形が壊れます。

直したあとも現代の服が残るときは、背景を見ます。都市や室内の現代的な場所が残っていると、衣装より場所が勝って、ジャケットに戻ります。城、森、酒場のどれか一つに戻してから、もう一度生成してください。崩れた範囲だけを描き直すときは、兜や手など、壊れている部分に限定します。画面全体を毎回やり直すと、決まっていたマントの色まで動きます。モデルによって fantasy の効きが弱いことがあります。そのときはタグを増やすより、modern clothes をネガティブに足す方を先に試します。武器と盾は、直す回では同時に戻さないでください。

自然文で直した内容は、タグのプロンプトにも同じ語で戻します。文だけで直すと、次にタグへ戻したとき、同じ崩れが再発します。

Midjourney の縦長で足が切れるときも、タグ側と同じく、全身と靴を文に残してから縦横を指定します。

鎧が融合する、左右が揃わないときは、部品を減らします。\`gauntlets\` と \`pauldrons\` と兜を一度に外し、\`armor, cape\` に戻してから、一つずつ戻します。全身より \`upper body\` の方が、肩の板は揃いやすいです。

武器の持ち方が違うときは、\`holding sword\` か \`holding staff\` を手の描写の位置に置きます。sword だけだと地面に刺さります。手の指が増えるときは、ネガティブの \`bad hands, extra fingers\` を残したまま、盾を外してください。盾と剣を同時に強くすると、手が一本に融合します。

**剣を持たせる直し**

\`\`\`
1 adult woman, knight, armor, cape, holding sword,
standing, castle courtyard, upper body, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

ChatGPT と Gemini では、同じ順を文にします。Midjourney は人の例から重みを外し、文の末尾に \`--ar 2:3\` を足します。縦の全身は 2:3 の方が、足まで残りやすいです。

\`\`\`
1 adult woman, a knight in silver armor and a cape, standing in a stone courtyard.
She is an adult. Full body, fantasy illustration, no modern clothes.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

モデルによって、\`fantasy\` の効きが弱いことがあります。そのときは城か森の背景を一つ足し、現代の街の語は書かないでください。`,
      },
    ],
    faq: [
      {
        q: 'ファンタジー衣装が現代の服になります',
        a: '職業の語を前に置き、`fantasy` を残します。ネガティブに `modern clothes, t-shirt, jeans` を入れてください。背景が都市のままなら、城か森に変えます。',
      },
      {
        q: '鎧がドレスや布に崩れます',
        a: '`armor` または `full armor` を職業の直後に置きます。部品は一度に二つまでです。まだ布になるなら `upper body` にして、兜と盾を外してください。',
      },
      {
        q: '姫騎士はどう書きますか？',
        a: '`1 adult woman, knight, silver armor, tiara, cape` です。年齢を下げる語は入れません。長いドレスに替えるときは [ドレスプロンプト](/guides/dress-prompt-guide) を見て、鎧の語は外します。',
      },
      {
        q: '杖や剣が手から離れます',
        a: '`holding staff` か `holding sword` を使います。武器の名前だけでは地面に置かれます。盾と同時に強くすると手が融合するので、まず武器だけにしてください。',
      },
      {
        q: '作品名を書いてよいですか？',
        a: '書きません。中世ヨーロッパ風のRPG、城、森、酒場のように、場所と職業で足ります。特定の衣装を要素に分ける手順は [コスプレプロンプト](/guides/cosplay-prompt-guide) です。',
      },
    ],
  },

  'composition-angle-prompt-guide': {
    sections: [
      {
        title: '構図・アングルは四つの軸に分ける',
        content: `「構図 プロンプト 一覧」「アングル プロンプト 一覧」で必要なのは、カメラの指定を四つの軸に分けることです。ショットの大きさ、カメラの高さ、体の向き、視線です。四つを一度に強くすると、近い語が打ち消し合って、いつもの正面のバストアップに戻ります。

四つの軸は、チェックリストとして使います。今の絵に足りないのが、大きさなのか、高さなのか、向きなのか、視線なのかを一つに決めてから、その語だけを足します。四つを一度に書き換えると、どれが効いたのかが分かりません。Stable Diffusion と NovelAI では、前にある語が残りやすいので、今回直したい軸を人物の直後へ移します。Midjourney では、同じ内容を短い文にして、縦の全身なら 2:3 を指定します。にじジャーニーも縦横の指定は同じです。PixAI では、自然文より英語タグの方が、full body や from side が残りやすいことがあります。どちらでも、矛盾する語を残したまま重みだけを上げないでください。

一枚ごとに、変えた軸の名前をメモします。メモが無いと、良い絵が出ても、どの語が効いたのかを次の枚に再現できません。

軸を一つ足して絵が悪化したら、その語を消して前の枚に戻ります。悪化した語を残したまま、次の軸を足さないでください。

正面・斜め・全身の一覧は、このページが受け持ちます。下からと上からの段の細かい調整は、専用のガイドへ渡します。

順番は、ショット、高さ、向き、視線です。\`full body\` を後ろに置くと、\`close-up\` に負けて足が切れます。高さの \`from above\` と \`from below\` は同時に使いません。

登場人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。下から見上げる調整は [下からのアングル](/guides/low-angle-prompt-guide)、上から見下ろす調整は [見下ろす構図・俯瞰](/guides/high-angle-prompt-guide) に分けてあります。このページは、正面・斜め・全身を含む組み合わせの一覧です。

立ち方そのものは [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、二人の位置は [二人構図](/guides/two-person-composition-prompt-guide) です。作例の並びは [カメラプロンプト集](/prompts/camera)、タグは [カメラアングル](/tag/カメラアングル) と [全身](/tag/全身) です。

**四つの軸を一つずつ**

\`\`\`
1 adult woman, full body, straight-on, facing viewer, looking at viewer,
standing, white blouse, long skirt, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped, out of frame, close-up
\`\`\``,
      },
      {
        title: 'ショットサイズの一覧',
        content: `ショットは、体のどこまでを画面に入れるかです。顔の情報と、足まで入るかは、ここで決まります。二つを同じ強さで書かないでください。

大きさは、確認したい情報で選びます。目の色やまつげを見るなら close-up、服の正面を見るなら upper body、靴と丈を見るなら full body です。確認が終わったら、本番の大きさに戻します。全身の確認に portrait を使い続けると、足が無い絵のまま次の工程へ進みます。very wide shot は、人物を小さくして場所を見せるときだけです。人物の服が主題なら wide shot で止めてください。引きすぎると、衣装のタグが全部負けます。cowboy shot は、手に持った道具を膝上まで入れたいときの大きさです。全身の代用にはしません。切れた足を、あとから伸ばすより、最初から full body にした方が、靴の形は揃います。

本番の大きさが決まったら、その大きさの語をプロンプトの先頭側へ固定し、確認用の close-up は別のプロンプトとして保存します。

wide shot と full body は同時に残して構いません。close-up と full body は、どちらかを消してから生成します。

タグの全身と、引きの wide shot を両方残すと、足まで入ったまま場所も少し見えます。接写は、その確認が終わってから外します。

| 大きさ | 書き方 | 向いているもの |
|---|---|---|
| 接写 | \`close-up\` | 目、表情、小さなアクセサリー |
| 肖像 | \`portrait\` | 胸から上。表情と服の襟元 |
| 上半身 | \`upper body\` | 腰のあたりまで。手のポーズ |
| 太もも付近 | \`cowboy shot\` | 膝上まで。武器や手 |
| 全身 | \`full body\` | 靴まで。身長や丈 |
| 引き | \`wide shot\` | 人物と場所が両方見える |
| さらに引き | very wide shot（自然な英語） | 風景が主。人物は小さい |

\`cowboy shot\` は腰から膝のあいだで切る呼び方です。全身が欲しいときにこれを強くすると、靴が切れます。非常に引いた画面は very wide shot と自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは \`wide shot\` に戻してください。

接写の公開作例は顔の情報向け、引きの公開作例は [真上に近い俯瞰](/prompt/aerial-birds-eye-view-square) のように、人物より場所が主になるときです。`,
      },
      {
        title: 'カメラの高さ',
        content: `高さは、カメラが目の位置か、それより上か、下かです。視線の \`looking up\` とは別です。本人が上を見ていても、カメラは正面のままになることがあります。

高さの語は、ショットの直後に一つだけ置きます。eye level は自然な英語で、目の高さです。何も書かないときの初期値に近いので、正面の普通の肖像では省略しても構いません。変えたいときだけ from above か from below を足します。bird's-eye view と worm's-eye view は自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。効かないときは、from above か from below に戻し、真上や地面すれすれは、それぞれの専用ガイドの段で調整します。このページの高さは、他の軸と組み合わせるための入口です。段の細かい表は、見下ろすガイドと、下からのガイドに残してあります。

高さを変えたのに絵が同じなら、逆の高さの語が残っていないかを先に検索します。from above と from below の両方が残っていると、正面に戻ります。

目の高さに戻すときは、from above も from below も消し、eye level を自然な英語で一つだけ残します。

高さの語を前に置いても無視されるときは、ショットが close-up になっていないかを先に見ます。顔のアップでは、高さはほぼ消え、あごの形だけが変わります。

目の高さは eye level と自然な英語です。少し上は \`from above\`、ほぼ真上は bird's-eye view と自然な英語です。少し下は \`from below\`、地面すれすれは worm's-eye view と自然な英語です。公式タグとしてこのページで断定するのは \`from above\` と \`from below\` です。

各高さの細かい調整は、ここでは二、三行にとどめます。見下ろしで頭だけが大きくなる直し、真上との違いは [見下ろす構図・俯瞰プロンプト](/guides/high-angle-prompt-guide) です。あごが伸びる、空を入れる、階段で高さを作る、は [下からのアングルプロンプト](/guides/low-angle-prompt-guide) です。

\`from above\` と \`from below\` を同時に書くと、高さはほぼ正面に戻ります。主にする方を一つにしてください。正面・斜め・全身など、高さ以外の軸は次の節からです。`,
      },
      {
        title: '体の向き',
        content: `向きは、体の正面をカメラに向けるか、横か、後ろかです。視線と一緒にすると、振り返りになります。

向きを変えるときは、ショットの大きさを固定します。全身のまま斜めにする、上半身のまま横顔にする、のように、変える軸は一つです。three-quarter view は自然な英語です。斜め45度、と文で書いても近いです。横顔の profile では、両目が揃うことを期待しないでください。奥の目は隠れます。後ろ姿で表情も欲しいときは、from behind だけでは足りず、looking back を足します。振り返りでも、体の正面をカメラに向ける facing viewer は外します。両方を残すと、肩の向きが平均になって、斜め後ろでも斜め前でもない形になります。髪が長いときは、後ろ姿の方が髪の長さを確認しやすいです。

斜めが正面に戻るときは、three-quarter view を前へ移し、facing viewer を外します。正面を向ける語が残っていると、斜めは負けます。

後ろ姿で顔が完全に隠れて困るときは、looking back を足し、from behind は残します。facing viewer は足しません。

横顔の公開確認は、目が一つに見えることと、体の正面がカメラを向いていないことです。両目が見えていたら、from side が負けています。

| 向き | 書き方 | 見え方 |
|---|---|---|
| 正面 | \`straight-on\`, \`facing viewer\` | 左右が揃う。服の正面が見える |
| 斜め | three-quarter view（自然な英語） | 顔の側面と体の厚み |
| 横顔 | \`from side\`, \`profile\` | 輪郭。両目は揃わない |
| 後ろ姿 | \`from behind\` | 背中と髪。表情は見えない |
| 振り返り | \`looking back\` | 体は後ろ、顔はカメラ |

斜めは three-quarter view と自然な英語です。公式タグとしては断定しません。\`from side\` と \`profile\` は近いです。両方を強くすると、首が横に伸びることがあります。一つにしてください。

後ろ姿の公開作例は [振り返る全身の戦士](/prompt/full-body-warrior-stance-rear-view) です。\`from behind\` と \`looking at viewer\` を同じ強さにすると、体の向きが平均になります。振り返りにするなら \`looking back\` を使い、\`looking at viewer\` は外します。

**斜めの上半身**

\`\`\`
1 adult woman, upper body, three-quarter view, looking at viewer,
standing, white blouse, long skirt, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped, from behind
\`\`\``,
      },
      {
        title: '視線',
        content: `視線は、目がどこを見ているかです。体の向きが正面でも、目だけをそらせます。

視線は最後に足します。先に体の向きが決まっていないと、目だけがカメラを向いて、首がねじれます。looking at viewer は、正面か斜めと一緒に使います。横顔でカメラを見させたいときも、looking back の方が首の向きは自然です。looking away は、体が正面のまま目をそらす指定です。そらす先の名詞を三つ書くと、背景が勝って、目が小さくなります。そらす先は、窓か空かを一つにしてください。looking up と looking down は、カメラの高さとは独立です。上を見ている人を、目の高さのカメラで撮る、という組み合わせが普通にあります。高さを変える必要がなければ、from above は足しません。

目がカメラを見たままなら、looking away を前へ移し、looking at viewer を消します。視線の語は、最後に書いた方が残るとは限りません。

視線の語を足して首がねじれたら、体の向きを straight-on に戻し、視線だけを残して再生成します。

目の形や色を同じプロンプトで直したいときは、視線の語を残したまま、目のガイドの色を一つだけ足します。形と視線を同時に強くしないでください。

| 視線 | 書き方 |
|---|---|
| カメラを見る | \`looking at viewer\` |
| そらす | \`looking away\` |
| 上 | \`looking up\` |
| 下 | \`looking down\` |
| 振り返って見る | \`looking back\` |

目の色や形は [目・瞳のプロンプト一覧](/guides/eye-prompt-guide) です。視線の語と、つり目やハイライトは別の層なので、このページでは視線だけを決めます。表情の感情は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。

\`looking up\` は目の向きであり、カメラを下に置くことではありません。下からのカメラが欲しいときは \`from below\` を高さの位置に書き、視線は必要なときだけ足します。両方を強くすると、あごが伸びます。`,
      },
      {
        title: '傾き・レンズ・ボケ',
        content: `水平を崩すのは \`dutch angle\` です。画面が斜めに回転します。体の three-quarter view とは別です。両方を強くすると、どこが斜めなのかが平均になります。

dutch angle は、水平の線が斜めになる指定です。建物の縦線が画面の中で傾きます。体を斜めに向ける three-quarter view とは、傾くものが違います。ポスターのように傾けたいときだけ dutch angle を足し、普段の肖像では外します。pov は、見ている側の手が画面の手前に出やすい指定です。相手の全身が主題なら使いません。広角で端の人が伸びるときは、wide-angle lens を外して wide shot に戻します。魚眼は、顔を歪ませるための指定なので、証明写真のような正面には向きません。ボケは、背景の名詞を一つに減らしてから depth of field を足します。名詞が多いと、ぼかしより物体の描き込みが優先されます。

背景までぼけるのが目的なら、人物の品質の語を強くしすぎないでください。人物側の重みが勝つと、背景のボケは消えます。

レンズ名を三つ書くと、どれも効かなくなります。広角、魚眼、望遠のうち、残すのは一つです。

ボケを足して顔まで甘いときは、blurry background を外し、depth of field だけにします。両方を強くすると、ピントの位置が顔から外れます。

\`pov\` は、見ている人の位置から描く呼び方です。手だけが大きくなることがあります。人物の全身が要るときは外してください。

広角は wide-angle lens、魚眼は fisheye、望遠は telephoto と自然な英語です。公式タグとしては断定しません。広角は端の体が伸び、望遠は背景が近くなります。モデルによって効きが弱いことがあります。そのときはレンズ名を外し、\`wide shot\` か \`portrait\` に戻します。

ボケは \`depth of field\` と \`blurry background\` です。両方を強くすると、顔までぼけます。人物をシャープにしたいときは \`depth of field\` だけにして、背景の名詞は一つに減らします。場所の選び方は [背景プロンプト](/guides/background-prompt-guide) です。

**少し傾けた肖像**

\`\`\`
1 adult man, portrait, straight-on, looking at viewer, dutch angle,
white shirt, simple background, depth of field
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped, blurry
\`\`\``,
      },
      {
        title: '組み合わせテンプレ',
        content: `組み合わせは、四つの軸から必要なものだけを残します。下の十個は、すべて成人です。一度に一つを生成し、混ざったら前の軸の語を消してから次を試します。ネガティブは各ブロックの末尾です。

十個の型は、服を白やコートに固定してあります。衣装を差し替えるときは、軸の語は残し、服の語だけを替えてください。軸ごと書き換えると、どの型を試したのかが分からなくなります。二人の型は、距離を詰めたいときだけ二人構図のガイドへ進みます。このページの二人は、並んで立って、全身が切れていないことの確認です。俯瞰と下からの型は、高さの入口です。頭の大きさや、あごの伸びを直す手順は、専用のガイドに書いてあります。同じ型を写真風にするときは、末尾に photorealistic を一つ足し、アニメの塗りは外します。両方を残すと、線と写真が平均になります。

十個のうち、自分の用途に近い型を二つだけ残して保存します。十個を毎回全部生成する必要はありません。比較は、その二つの差だけを見ます。

型の服を和服や鎧に替えるときも、ショットと向きの語は残します。服の語だけを替えて、軸は動かさないでください。

二人の型で腕が増えたら、このページでは全身が切れていないことだけを見て、腕の位置は二人構図のガイドへ移します。

**全身 × 正面**

\`\`\`
1 adult woman, full body, straight-on, facing viewer, looking at viewer, standing, white blouse, long skirt, loafers, simple background
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, out of frame
\`\`\`

**上半身 × 斜め**

\`\`\`
1 adult woman, upper body, three-quarter view, looking at viewer, standing, cardigan, long skirt, simple background
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped
\`\`\`

**横顔のアップ**

\`\`\`
1 adult woman, close-up, profile, from side, looking away, black hair, simple background
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, extra eyes
\`\`\`

**後ろ姿 × 風景**

\`\`\`
1 adult man, full body, from behind, standing, coat, forest path, wide shot
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, looking at viewer
\`\`\`

**振り返り × カウボーイショット**

\`\`\`
1 adult woman, cowboy shot, from behind, looking back, standing, coat, street
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, close-up
\`\`\`

**俯瞰の全身**

\`\`\`
1 adult woman, full body, from above, standing, white blouse, long skirt, plaza
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, from below
\`\`\`

高さの細かい段は [見下ろす構図・俯瞰](/guides/high-angle-prompt-guide) です。

**二人で並ぶ**

\`\`\`
2 adults, 1 adult woman, 1 adult man, full body, straight-on, standing, side by side, simple background
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, extra arms
\`\`\`

二人の距離と腕は [二人構図](/guides/two-person-composition-prompt-guide) です。

**下から見上げる全身**

\`\`\`
1 adult man, full body, from below, standing, coat, sky background
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, from above
\`\`\`

あごや空の調整は [下からのアングル](/guides/low-angle-prompt-guide) です。

**肖像 × 正面**

\`\`\`
1 adult woman, portrait, straight-on, facing viewer, looking at viewer, white blouse, simple background
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, full body
\`\`\`

**引きのワイド**

\`\`\`
1 adult woman, wide shot, full body, straight-on, standing, coat, station plaza
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, close-up
\`\`\``,
      },
      {
        title: '全身にならない・角度が無視されるとき',
        content: `足が切れる、全身にならないときは、\`full body\` を前の方へ移し、靴を shoes と自然な英語で一つ書きます。\`standing\` を残し、画面の縦横は 2:3 か 9:16 にします。縦長の考え方は [9:16のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) です。まだ切れるなら \`wide shot\` を足し、ネガティブに \`cropped, out of frame\` を入れます。\`cowboy shot\` と \`close-up\` は外してください。

直す順番も、軸を一つずつです。まずショットを full body と wide shot に戻し、次に向き、最後に高さです。一度に重みを三つ上げると、体がねじれたまま大きくなります。靴の語は shoes で足ります。靴の種類を三つ書くと、足の形が平均になって、また切れます。縦長にしても足が切れるときは、人物の前後に余白を足す文を、自然な英語で leave space above the head and below the shoes と一行足します。9:16 は、はがきやポスターより細い画面です。全身の確認が目的なら、まず 2:3 で足まで入れてから、必要ならさらに縦にします。矛盾するタグを消す作業は、重みを上げる前に終わらせてください。

足が切れた画像を、同じプロンプトのまま引き伸ばして足を足さないでください。形が伸びます。full body を入れて、生成からやり直します。

重みは 1.1 から始め、1.3 で足りなければ、語の位置を前に移します。数値を 1.5 以上にしないでください。

縦横を 2:3 にしたあとも切れるときは、人物の前後の余白を文で足し、cowboy shot が残っていないかを消します。

**足まで入れる直し**

\`\`\`
1 adult woman, full body, wide shot, standing, shoes, long skirt, white blouse, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped, out of frame, close-up, cowboy shot
\`\`\`

角度が無視されるときは、高さや向きの語をプロンプトの前の方へ移し、重みは 1.1 から 1.3 です。\`(from side:1.2)\` のように一つだけです。1.4 を超えると、体がねじれます。

矛盾する組み合わせは、生成前に消します。\`from above\` と \`from below\`、\`close-up\` と \`full body\` は同時に強くしません。\`looking at viewer\` と \`from behind\` も、振り返りでない限り同時に強くしません。

モデルによって、自然な英語の three-quarter view や eye level の効きが弱いことがあります。そのときは \`from side\` を弱く足すか、\`straight-on\` に戻して、斜めは背景の線で補います。Danbooru 由来の \`from above\` や \`full body\` の方が、イラスト向けモデルでは残りやすいです。写真向けモデルは、文の "eye-level camera" の方が素直なことがあります。`,
      },
      {
        title: 'ChatGPT・Gemini・Midjourney の自然文',
        content: `タグが苦手なモデルでは、カメラの位置を一文にします。ショット、高さ、向き、視線の順は同じです。人数は成人と書きます。

自然文では、数字で高さを言うと伝わりやすいです。腰の高さ、目の高さ、頭より少し上、地面すれすれ、のどれか一つです。45度は斜めの向きであって、画面を傾ける dutch angle ではありません。文の中で両方を「斜め」と呼ぶと、モデルが混同します。傾けるときは、画面の水平を傾ける、と別に書いてください。NovelAI と PixAI で自然文が肖像に戻るときは、同じ文をやめて、full body と standing のタグに戻します。にじジャーニーは、文でもタグでも、末尾の縦横が全身の残り方を決めます。縦を指定し忘れた横長では、足が先に切れます。成人であることは、文の中に adult として残します。

文で良い結果が出たら、その文を、ショット、高さ、向き、視線の四語に翻訳して保存します。次にイラスト向けモデルへ渡すとき、文のままでは全身が残りません。

文の中の角度は、腰の高さ、斜め、全身、視線、の四つが読めるかを音読して確認してから生成します。

腰の高さ、斜め45度、全身、カメラを見る、の四つの情報が文に揃ってから生成します。一つでも欠けると、肖像の正面に戻ります。

\`\`\`
1 adult woman standing in a plaza, full body.
The camera is at waist height, three-quarter view, about 45 degrees.
She looks at the camera. She is an adult. Leave the shoes in frame.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, out of frame
\`\`\`

Midjourney では重みを外し、縦の全身なら末尾を \`--ar 2:3\` にします。にじジャーニーも同じ縦横です。NovelAI や PixAI では、上の英語タグの方へ戻してください。自然文だけだと、\`full body\` が肖像に戻ることがあります。

\`\`\`
1 adult man, full body, from side, profile, standing, coat, simple background --ar 2:3
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped, out of frame
\`\`\`

「カメラは腰の高さ、斜め45度から全身」のように、高さを体の部位で言うと、eye level より伝わることがあります。真上と真下は、この文に混ぜず、それぞれのガイドへ戻します。`,
      },
    ],
    faq: [
      {
        q: '全身にならない、足が切れます',
        a: '`full body` を前に置き、`standing` と靴を書きます。縦は 2:3 か 9:16 です。ネガティブに `cropped, out of frame` を入れ、`close-up` と `cowboy shot` は外してください。',
      },
      {
        q: '正面と斜めはどう書き分けますか？',
        a: '正面は `straight-on` か `facing viewer` です。斜めは three-quarter view と自然な英語です。`from side` は横顔なので、斜めと同時に強くしないでください。',
      },
      {
        q: '上からと下からを同時に書けますか？',
        a: '書けません。`from above` と `from below` は打ち消し合います。見下ろしの段は [見下ろす構図・俯瞰](/guides/high-angle-prompt-guide)、見上げは [下からのアングル](/guides/low-angle-prompt-guide) です。',
      },
      {
        q: 'アングルを書いても正面のままです',
        a: '向きの語を前に移し、重みは 1.1 から 1.3 の一つだけにしてください。`close-up` と `full body` のように矛盾するショットが残っていないかも見ます。',
      },
      {
        q: 'NovelAI と Midjourney で同じですか？',
        a: '`full body` や `from side` や `from behind` は両方で使われます。Midjourney は文と `--ar 2:3` が素直なことがあります。自然な英語の three-quarter view は、モデルによって効きが弱いことがあります。',
      },
    ],
  },

  'new-year-card-ai-prompt-guide': {
    sections: [
      {
        title: 'AIで年賀状を作る流れ',
        content: `「年賀状 AI プロンプト」「年賀状 プロンプト 2027」は、2027年の未年（ひつじ年、丁未）の絵柄を先に作り、文字はあとから乗せる流れです。絵の中に賀詞を書かせると、画数が崩れた字が残り、印刷してから直せません。

最初の一枚は、文字なし、余白あり、題材二つまで、で生成します。気に入った構図が出てから、作風だけを差し替えます。最初から和風と水彩と金箔を全部入れると、どれが余白を潰したのかが分かりません。印刷所に出す前に、絵のファイルと、賀詞を乗せたファイルを分けて保存します。絵の方を上書きすると、文字を外した版が残りません。私製はがき以外の寸法を使うときは、そのテンプレートのピクセルを優先します。300dpi は目安であり、画面で見るだけの画像なら、もっと小さくても足ります。印刷する回だけ、解像度を上げてください。写真を使う回は、この流れの最後に回し、イラストが安定してから合成します。

気に入った絵は、文字を乗せる前のファイル名で保存します。賀詞入りの画像だけが残ると、文面を変えるたびに絵から作り直すことになります。

縦長で生成した絵を、よこ長のテンプレートに無理に広げないでください。よこ長が必要なら、horizontal postcard で生成し直します。

手順は四つです。絵柄を生成する。文字は入れない。はがきのサイズに合わせる。印刷前に余白と解像度を見る。私製はがきの一般的な寸法は、たて約100mm、よこ約148mmです。300dpi に置くと、たとえば 1181×1748 ピクセル前後です。たて書きなら縦長、よこ書きならその逆です。販売店や印刷所のテンプレートが優先なので、入稿前にその指定を確認してください。

縦横の考え方そのものは [9:16のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) が近いです。年賀状は 9:16 より少し正方形に近い縦です。細長い画面のまま入稿すると、上下が切れます。

住所、郵便番号、電話番号、本名はプロンプトに書きません。使う写真は、自分に権利があるものだけです。相手の写真を年賀状にするときは、その人の同意を取ってください。過去の季節に、生成AIで年賀状を作るキャンペーンがあったことはあります。今年も同じ企画が行われるとは、このページでは書きません。ロゴや企業名もプロンプトに入れません。`,
      },
      {
        title: '基本テンプレ',
        content: `絵柄は、干支、縁起物、作風、配色、余白、文字なし、の順です。羊を入れる回と、入れない回を混ぜないでください。両方を同じ強さにすると、角の生えた別の動物が残ります。

型の中で毎回変えてよいのは、干支の有無、縁起物を一つ、作風を一つ、配色を一つ、です。余白と、文字なしは固定します。羊を入れる回と入れない回は、別のプロンプトとして保存します。一つの文の中で no sheep と sheep を両方書くと、角だけが残ることがあります。入れない回は、羊のブロックを使わず、縁起物のブロックを使ってください。縦長が基本です。よこ長の挨拶を先に決めたときだけ、horizontal postcard を自然な英語で足します。縦と横を同時に書くと、余白の位置が平均になって、賀詞が絵に重なります。配色は赤と白を基本にし、金を足すなら赤を少し弱めてください。

余白の位置を変えるときは、題材の語は固定します。羊も門松も余白も同時に動かすと、どの変更でバランスが崩れたのかが分かりません。

配色を変える回は、赤と白を基準に一色だけ足します。三色を同時に指定すると、余白の白まで色が乗ります。

干支は \`sheep\`、正月は \`new year\` です。門松は \`kadomatsu\` です。それ以外の縁起物は、次の表で自然な英語にします。余白は empty space for a greeting と自然な英語です。公式タグとしては断定しません。

**タグの型**

\`\`\`
sheep, new year, kadomatsu, pine and plum, red and white,
empty space for a greeting, no text, vertical postcard, illustration
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, letters, watermark
\`\`\`

**自然文の型**

\`\`\`
A vertical Japanese New Year postcard illustration for 2027, the year of the sheep.
One round fluffy sheep, a kadomatsu, pine and plum, red and white.
Leave empty space for a greeting. No text, no letters, no address.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, letters
\`\`\`

人物を入れる回は、この型に \`1 adult woman\` か \`2 adults\` を足します。人を入れない回は、羊か縁起物だけにしてください。`,
      },
      {
        title: '作風別のコピペ',
        content: `作風は一つです。水彩と浮世絵とドットを同じ強さで並べると、線の太さが平均になります。浮世絵や水彩の媒体そのものは [画風プロンプト](/guides/art-style-prompt-guide) です。この節は、同じ年賀状の題材のまま作風だけを入れ替えます。

十個の作風は、題材を羊と門松に寄せて揃えてあります。比較するときは、羊の形が決まったあとで、作風の語だけを差し替えます。水彩が薄いときは、watercolor (medium) を残して photorealistic をネガティブに維持します。ドットが普通のイラストに戻るときは、解像度の数字を足さず、pixel art と limited palette だけにします。数字を大きくすると、ドットが細かくなって、普通の塗りに戻ります。切り絵と版画は、どちらも色数が少ない点で似ています。切り絵は紙の重なり、版画は黒い輪郭、と効果を一つに決めてください。毛糸とフェルトが布の写真になるときは、felt craft を外し、round fluffy sheep だけを残します。モデルによって、手仕事の質感は効きが弱いことがあります。

作風を変えても羊の形が変わるときは、作風の語が強すぎます。羊の語を前に戻し、作風は一つ、重みは付けずに再生成してください。

浮世絵と水彩を一枚に混ぜないでください。媒体は一つ、題材は二つまで、がこの節の上限です。

各ブロックの前半が Stable Diffusion 向けのタグ、後半が ChatGPT や Gemini 向けの文です。文字はどちらにも書かせません。

**和風**

\`\`\`
sheep, new year, kadomatsu, pine bamboo and plum, red and gold, Japanese pattern, empty margin, no text
A Japanese New Year card illustration, one fluffy sheep, kadomatsu, traditional patterns, red and gold, blank space for calligraphy, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, letters
\`\`\`

**水彩**

\`\`\`
sheep, new year, watercolor (medium), soft red and white, pine and plum, empty margin, no text
A watercolor New Year card of one round sheep and plum blossoms, soft red and white, blank greeting space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, photorealistic
\`\`\`

**浮世絵風**

\`\`\`
sheep, new year, ukiyo-e, flat color, wave pattern, sunrise, empty margin, no text
A woodblock-print look New Year card, ukiyo-e flat colors, one sheep, sunrise, blank space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, photorealistic
\`\`\`

**切り絵風**

\`\`\`
sheep, new year, paper cut art, red and white, layered paper, empty margin, no text
A paper-cut New Year card, layered red and white paper, one sheep silhouette, blank greeting space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text
\`\`\`

paper cut art は自然な英語です。公式タグとしては断定しません。

**版画風**

\`\`\`
sheep, new year, woodblock print, limited colors, black keyline, empty margin, no text
A woodblock print New Year card, limited colors, one sheep, black outlines, blank space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, photorealistic
\`\`\`

woodblock print は自然な英語です。\`ukiyo-e\` と同時に強くすると、色面のルールが二つになります。どちらか一つにしてください。

**ドット絵**

\`\`\`
sheep, new year, pixel art, limited palette, kadomatsu, empty margin, no text
A pixel-art New Year card, one blocky round sheep, a kadomatsu, limited colors, blank space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text, photorealistic
\`\`\`

**ミニマル**

\`\`\`
sheep, new year, minimal, wide empty margin, red accent, white background, no text
A minimal New Year card, lots of white space, one small sheep, a single red accent, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text
\`\`\`

**毛糸・フェルト風**

\`\`\`
sheep, new year, felt craft, yarn texture, round, soft, red and white, empty margin, no text
A felt and yarn New Year craft, one round wool sheep, soft texture, red and white, blank space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, text
\`\`\`

felt craft と yarn texture は自然な英語です。モデルによって効きが弱いことがあります。そのときは \`sheep\` と round だけを残してください。

**干支の羊**

\`\`\`
one sheep, round fluffy body, curled horns, wool, new year, kadomatsu, red and white, no text
One cute New Year sheep, round and fluffy, short curled horns, wool, kadomatsu, no people, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, beard, long horns, slender legs, text
\`\`\`

羊は動物として描きます。人の姿にはしません。

**羊を入れない和モダン**

\`\`\`
new year, kadomatsu, sunrise, pine and plum, modern Japanese pattern, gold line, empty margin, no sheep, no text
A modern Japanese New Year card without a sheep, kadomatsu, sunrise, pine and plum, gold line on white, blank greeting space, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, sheep, goat, text, letters
\`\`\``,
      },
      {
        title: '羊をヤギにしない',
        content: `未年の動物は羊です。細長い脚、長い角、あごひげが足されると、ヤギに見えます。ポジティブでは、丸い体、短い巻いた角、密な毛を書きます。ネガティブでは goat、beard、long horns、slender legs を残します。

ヤギに寄るサインは、あごの下の毛、長い角、細い脚、の三つです。一つでも出たら、その生成は採用せず、ネガティブを足してやり直します。角がデザインとして欲しいときも、短く巻いた形までにして、長い角の語はポジティブに書きません。毛の量を thick wool と自然な英語で足すと、体の輪郭が丸くなります。毛を書きすぎて顔が埋まるときは、thick wool を外し、round fluffy body だけにします。脚は standing と profile の組み合わせが数えやすいです。正面の羊は、前脚が二本に見えても、実際には融合していることがあります。横から四本を確認してから、正面の構図に移ってください。人の服を着せる指定は、この節では足しません。羊は動物のままにします。

角が無くなりすぎたときは、long horns はネガティブに残したまま、short curled horns を弱く戻します。角の語を全部消すと、また別の動物の耳に寄ることがあります。

毛の質感が写真になるときは、photorealistic をネガティブに足し、イラストの羊に戻します。

round fluffy sheep、curled horns、thick wool は自然な英語です。\`sheep\` はタグとして置きます。角を強調しすぎると、また長くなります。角が要らない構図なら、curled horns を外してください。

**丸い羊に戻す**

\`\`\`
one sheep, round fluffy body, thick wool, short curled horns, standing, simple background, new year
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, goat, beard, long horns, slender legs, extra legs
\`\`\`

脚の本数が増えるときは、\`standing\` を残し、ネガティブの extra legs を維持します。横向きの \`profile\` の方が、四本の脚は数えやすいです。正面からだと、前脚が融合します。`,
      },
      {
        title: '縁起物・和柄の英語',
        content: `縁起物は二つまでです。三つを同じ強さにすると、画面の中央が埋まり、賀詞の余白が消えます。配色は [色プロンプト](/guides/color-prompt-guide) を見て、赤と金を同時に強くしすぎないでください。

表の語は、一度に二つまでです。松竹梅を三つに分けて全部強くすると、画面が植物で埋まります。pine, bamboo and plum は一続きの自然な英語として、一つの題材に数えます。富士山を入れるときは、山を遠くに置き、門松を手前に一つ、と前後を書いてください。同じ大きさで並べると、山が門松のサイズまで縮みます。青海波や麻の葉は、背景の模様であって、主役ではありません。模様を強くすると、羊や鶴の輪郭が模様に溶けます。模様は弱く、主役を一つ、が安全です。水引は、結び目の形まで指定すると崩れやすいので、色を赤と白にすることだけを書いて、結びの種類は印刷後の装飾に回しても構いません。金箔は、全面に敷くと余白が消えます。線を一本、と範囲を限定します。

表に無い題材を足すときも、自然な英語で一つだけにします。日本語の題材名を、タグとして効くとは書かないでください。

鶴と羊を同じ大きさで並べると、両方が中途半端になります。主役を一つにして、もう一方は小さくします。

| 題材 | 書き方 |
|---|---|
| 松竹梅 | pine, bamboo and plum（自然な英語） |
| 初日の出 | \`sunrise\` |
| 富士山 | Mount Fuji（自然な英語） |
| 門松 | \`kadomatsu\` |
| 鏡餅 | kagami mochi（自然な英語） |
| 梅 | plum blossom（自然な英語） |
| 鶴 | crane（自然な英語） |
| 扇 | folding fan（自然な英語） |
| 青海波 | seigaiha wave pattern（自然な英語） |
| 麻の葉 | asanoha hemp-leaf pattern（自然な英語） |
| 金箔 | gold leaf（自然な英語） |
| 水引 | mizuhiko decorative cord（自然な英語） |

\`sunrise\` と \`kadomatsu\` 以外は、自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは日本語の題材を一つに減らし、\`new year\` と赤白の配色だけを残します。

**門松と初日の出**

\`\`\`
kadomatsu, sunrise, pine, new year, red and white, empty margin, no text, no sheep
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, letters, watermark
\`\`\`

富士山を入れるときは、山を背景の一つにして、羊を小さくします。山と羊と門松を同じ大きさにすると、はがきに入りきりません。`,
      },
      {
        title: 'ChatGPT・Gemini で作る年賀状',
        content: `ChatGPT と Gemini では、タグの列より、はがきであること、文字を入れないこと、余白の位置を文で書きます。用途別の書き方の全体は [Geminiプロンプト集](/guides/gemini-prompt-collection) です。この節は年賀状だけです。

文章で頼むときも、出力してほしくないものを先に書きます。文字なし、住所なし、人を増やすな、の三つです。気に入った文ができたら、作風の語だけを差し替えて、同じ余白の指示を残します。写真を渡すときは、その画像に写っている人数を、文の中で「成人が一人」または「ペットだけ」と固定します。複数の人が写った写真を、黙って渡さないでください。誰を残すかがモデルに伝わらず、顔が混ざります。同意を取っていない相手の顔は、年賀状の素材にしません。生成された絵に、元の写真の背景が残って邪魔なときは、背景を門松と梅に替える文を足し、顔は維持する、と繰り返します。羊を写真の横に置くときは、羊の節のネガティブも文の末尾に残します。

同じ文を二回生成して、羊の形と余白の位置が近いものを採用します。一枚目で文字が残っていたら、その画像は編集せず、no text を足して最初から生成します。

写真を使わない文でも、成人以外の人を足さない、と一行残しておくと、背景に人が増えるのを防げます。

自分の写真を年賀状風にするときは、写っているのが成人一人か、ペットだけであることを確認します。その写真を使う権利と、写っている人の同意が必要です。住所は書きません。顔を別人に変えない、と文に残します。

**写真を年賀状の絵柄にする**

\`\`\`
Use the uploaded photo of one adult, or of a pet only.
Keep the adult face and age if a person is present. Do not add any other person.
Place them beside a kadomatsu and plum blossoms, red and white, vertical postcard.
Leave the upper area empty for a greeting. No text, no letters, no address.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, letters, extra person
\`\`\`

羊のイラストを文章だけで頼むときは、丸い毛、短い巻いた角、ヤギにしない、を同じ文に入れます。生成後に角の長さを見て、長いときはネガティブの long horns を足してやり直してください。`,
      },
      {
        title: '賀詞はあとから入れる',
        content: `画像の中の日本語は、画数が足りない字や、存在しない字になりやすいです。賀詞は、生成が終わってから、はがきソフトや印刷所のテンプレートで乗せます。プロンプト側は no text、空の余白、までです。

賀詞の位置は、絵を生成する前に決めておきます。上に謹賀新年を置くなら、絵は下半分に集めます。下に置くなら、空けるのは下です。中央に大きな羊を置いたまま、中央に文字も乗せる計画は、余白が足りずに失敗します。迎春と賀正は短いので、余白が狭いときに選ばれがちです。相手が目上なら、文字数が増えても謹賀新年を優先し、絵の方を小さくしてください。絵の中に印鑑や署名を描かせる必要はありません。それも文字と同じで、崩れた形が残りやすいです。差出人の名前は、印刷の工程で、正しい字体で入れます。英語の Happy New Year を絵の中に書かせるのも、同じ理由で避けます。アルファベットも、ネガティブの letters で抑えます。

賀詞の字体は、画像生成には任せません。明朝や楷書は、はがきの編集画面で選んでください。絵の中の文字を、あとから別の文字に置き換えるより、最初から空にしておく方がきれいです。

余白に薄い模様が残って文字が読みにくいときは、模様の語を外し、empty margin を維持して再生成します。

よく使う賀詞は、謹賀新年、迎春、賀正です。目上の人へ出す年賀状では、迎春や賀正より、謹賀新年を選ぶのが無難です。このページはマナーの全文ではありません。相手との関係で迷うときは、郵便局やマナーの案内を別に確認してください。

余白は、賀詞を置く側を一文で指定します。上部に空けるなら "leave the top third empty" と自然な英語です。中央に絵を置いたまま文字も中央に頼むと、羊の上に崩れた字が重なります。

ネガティブの \`text, letters, watermark\` は、年賀状では外さないでください。署名の欄を絵の中に作らせる必要はありません。差出人は印刷の工程で足します。`,
      },
      {
        title: '印刷前のチェック',
        content: `出す前に、動物の脚、文字の残骸、余白、色、解像度を見ます。脚が増えている羊は、前の節のネガティブに戻します。絵の中に一字でも残っていたら、no text を足して生成し直す方が、あとから消すよりきれいです。

チェックは、拡大して見ます。羊の脚、角の長さ、絵の端に残った点のような文字、余白が端まで無いか、赤が真っ黒に潰れていないか、です。点のような文字は、no text を足して生成し直します。消しゴムで消すと、その部分の模様だけが不自然になります。RGB から CMYK へ変換したあとに赤が沈むときは、変換前の絵で赤を少し明るくしておくと、印刷後の赤が意図に近づきます。これは一般的な色の性質であり、特定の印刷機の数値ではありません。入稿先が RGB のまま受け付けるなら、変換は不要です。解像度を上げるために、小さい絵を単純に引き伸ばすと、ドットや水彩のにじみが荒れます。必要な大きさで、最初から生成し直す方を選んでください。

家庭のプリンタで試すときも、端の数ミリを切る前提で、賀詞と絵を内側に置きます。画面いっぱいに広げた絵は、印刷すると片側が欠けます。

裁断で切れそうな位置に、羊の角や門松の先が無いかを見ます。端に触れている部品は、内側へ寄せて再生成します。

端から数ミリは、印刷で切れる前提にします。賀詞も絵も、端に寄せすぎないでください。はがきの周囲に細い枠を描かせると、裁断で片側だけ太くなります。枠は印刷テンプレート側に任せます。

多くの画像生成は RGB です。印刷所が CMYK を求めるときは、入稿前に変換します。変換すると赤が少し沈むので、赤と金の境目が重要な絵は、変換後にもう一度見てください。解像度は、100×148mm を 300dpi で置く例として 1181×1748 ピクセル前後を目安にし、印刷所の数値があればそちらに合わせます。

**よこ長で余白を広く**

\`\`\`
new year, kadomatsu, plum blossom, horizontal postcard, wide empty margin, red and white, no text
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, letters, watermark, goat
\`\`\``,
      },
      {
        title: 'お正月の人物イラスト',
        content: `人物を入れるときは成人だけです。振袖の部品は [着物プロンプト](/guides/kimono-prompt-guide) です。このページでは、年賀状の余白と、文字を入れないことだけを足します。

人物を入れる年賀状は、イラストの回が安定してからにします。振袖の袖、帯、簪は、着物のガイドで一つずつ確認し、このページでは余白と文字なしを足すだけです。二人の初詣も、成人の二人に限定します。人数が曖昧だと、画面の端に第三者が足されます。ネガティブの extra person を、二人の例では維持してください。社の背景は、鳥居か石段かを一つにします。両方を強くすると、人が小さくなり、賀詞の余白が建物で埋まります。日の出を後ろに置くときは、sunrise を一つ、顔に逆光が強すぎるなら光を弱める文を足します。服の色と日の出の橙が混ざるときは、色のガイドの BREAK を、着物と空のあいだに入れてください。

人物入りの年賀状で顔が小さいときは、全身を維持したまま、背景の建物を一つ減らします。顔のアップに切り替えると、振袖の袖が画面の外に出ます。

振袖の人物と、羊を一枚に入れるときは、どちらかを小さくします。両方を主役にすると、余白が消え、賀詞の場所が無くなります。

**振袖の成人**

\`\`\`
1 adult woman, furisode, long sleeves, obi, kanzashi,
standing, shrine, new year, full body, empty margin, no text
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, letters, school uniform, short skirt
\`\`\`

初詣の二人は、成人の二人です。手をつなぐ詳細は [二人構図](/guides/two-person-composition-prompt-guide) に任せ、年賀状では全身と余白を優先します。

\`\`\`
2 adults, 1 adult woman, 1 adult man, kimono, haori, hakama,
standing, shrine, new year, full body, sunrise, empty margin, no text
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, text, letters, extra person, school uniform
\`\`\`

背景の社は [背景プロンプト](/guides/background-prompt-guide) を見て、建物を一つにします。鳥居、本殿、石段を全部強くすると、人が小さくなり、賀詞の場所が消えます。崩れの一般的な除け方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。`,
      },
    ],
    faq: [
      {
        q: '年賀状の文字が崩れます',
        a: '絵の中には書かせません。no text と空の余白を指定し、謹賀新年などの賀詞は印刷の工程で乗せます。目上の人には、迎春や賀正より謹賀新年を選ぶのが無難です。',
      },
      {
        q: '羊がヤギになります',
        a: '丸い体、密な毛、短い巻いた角を書き、ネガティブに `goat, beard, long horns, slender legs` を入れます。角を強調しすぎないでください。',
      },
      {
        q: '2027年は何年ですか？',
        a: '未年（ひつじ年、丁未）です。干支の絵にするなら `sheep` と `new year` です。羊を入れない和風にもできます。',
      },
      {
        q: 'はがきのサイズは？',
        a: '私製はがきの一般的な寸法は約100×148mmです。300dpi なら 1181×1748 ピクセル前後が目安です。印刷所のテンプレートがあるときは、その数値を優先してください。',
      },
      {
        q: '写真を使ってよいですか？',
        a: '権利がある写真だけです。人は成人一人、またはペットだけにして、写っている人の同意を取ってください。住所や電話番号はプロンプトに書きません。',
      },
    ],
  },

  'dress-prompt-guide': {
    sections: [
      {
        title: 'ドレスプロンプトの基本',
        content: `「ドレス プロンプト」で必要なのは、種類を一つ決めてから、丈、袖と襟元、素材、色、装飾の順に足すことです。\`dress\` だけだと、普段着のワンピースと夜の長いドレスのあいだで平均になります。

順番を守ると、失敗したときに戻す場所が決まります。形が違うなら種類、裾の位置が違うなら丈、肩が違うなら袖、光沢が違うなら素材、です。全部を一度に書き換えません。Stable Diffusion と NovelAI では、種類のタグを人物の直後に置きます。ChatGPT や Gemini では、同じ順を一文にします。Midjourney は括弧の重みを外し、全身なら 2:3 を指定します。色を先に書く癖があると、白い画面に赤い布が乗っただけで、袖の長さが初期値のままになります。色は、種類と丈が決まってから足してください。成人であることは、タグでも文でも adult として残します。人数を書かないと、鏡の中や背景にもう一着のドレスを着た人が足されることがあります。

一枚保存するたびに、種類と丈の語をファイル名の代わりにメモします。メモが無いと、次に色だけを変えたつもりが、種類まで別のドレスになります。

ネガティブの short dress は、膝あたりの回でも残して構いません。膝あたりは knee-length が決め、それより短くする語は入れません。

膝あたりが目的の回だけ、long dress を外します。それ以外の夜のドレスは、long dress を消さないでください。

種類の語は人物の直後です。色を先に強くすると、形より色面が勝ち、袖の長さが無視されます。最初の一手は、種類を一つ、丈を一つです。効いたら素材か色を足します。

登場人物は大人だけです。\`1 adult woman\` から書き、\`adult\` を残します。男性の礼服と並べるときは \`1 adult man\` を足します。一覧の作例は [服装プロンプト集](/prompts/clothing)、タグは [ドレス](/tag/ドレス) です。

**種類から装飾まで**

\`\`\`
1 adult woman, evening gown, long dress, long sleeves, satin, navy,
standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress, modern clothes, t-shirt, jeans
\`\`\``,
      },
      {
        title: '種類の一覧',
        content: `種類は一つです。イブニングとウェディングを同じ強さにすると、白と夜の色が混ざります。

近い種類でも、スカートの量と丈が違います。ボールガウンは布の量、マーメイドは裾で広がる長い形、Aラインは腰からまっすぐ広がる形です。エンパイアは、切り替えの位置が胸の下です。シャツドレスは、前がシャツの構造になったワンピースで、夜の席には向きません。昼の一枚にするときにだけ使います。カクテルは膝あたりと書き、短い丈の語はポジティブに入れません。サンドレスは昼の外出です。夜のホールの語と一緒にすると、布の厚さが平均になります。ゴシック調は、色を黒にし、袖を長くする、までです。別の服種の名前を足すと、このページで使わない形に寄ります。迷ったら evening gown と long dress に戻してください。そこが、夜のドレスの基準です。

種類が曖昧なときは、evening gown と long dress の基準に戻し、そこから一語だけ別の種類に差し替えます。基準が無いと比較になりません。

マーメイドやエンパイアが普通のロングに戻るときは、その自然な英語を前に移し、evening gown が残っていないかを確認します。

種類の名前を二つ残したまま色だけを変えないでください。色の比較は、種類を一つに固定してから行います。

| 種類 | 書き方 | 注記 |
|---|---|---|
| イブニング | \`evening gown\` | 長い。夜の席 |
| カクテル | cocktail dress（自然な英語） | 膝あたり。knee-length と一緒に |
| ボールガウン | ball gown（自然な英語） | スカートの量が多い |
| ウェディング | \`wedding dress\` | 白を維持するなら他の色を減らす |
| サンドレス・ワンピース | \`sundress\`, one-piece dress（自然な英語） | 昼。\`dress\` より用途が狭い |
| シャツドレス | shirt dress（自然な英語） | 襟付きの布。公式タグとしては断定しない |
| Aライン | A-line dress（自然な英語） | 裾が広がる |
| マーメイド | mermaid dress（自然な英語） | 長い。裾で広がる |
| エンパイア | empire-waist dress（自然な英語） | 胸の下で切り替える |
| ゴシック調 | \`gothic dress\`, \`long sleeves\` | 長い袖。別の服種の名前は使わない |

cocktail dress、ball gown、A-line dress、mermaid dress、empire-waist dress、shirt dress は自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。そのときは \`long dress\` か \`evening gown\` に戻してください。

ゴシック調に別の服種の名前は使いません。使わない語は lolita です。\`gothic dress\` と \`long sleeves\` で足ります。

**夜の長いドレス**

\`\`\`
1 adult woman, evening gown, long dress, satin, black, long sleeves,
standing, full body, indoor hall
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress, t-shirt, jeans
\`\`\`

公開作例は [フォーマルな夜のドレス](/prompt/formal-evening-gown) と [赤いカクテル丈](/prompt/red-cocktail-dress-elegant-4bys) です。カクテルは膝あたりと書き、短い丈の語は使いません。`,
      },
      {
        title: '丈・袖・襟元',
        content: `丈は \`long dress\` を基本にします。膝あたりは knee-length と自然な英語です。語を書かないと、生成の途中で丈が短くなります。ネガティブには \`short dress\` を残します。

丈を見るときは、必ず full body にします。肖像のまま long dress と書いても、裾は画面の外なので、短くなっていても気づけません。確認が終わったら、必要に応じて portrait に戻します。膝あたりの回は、knee-length を種類の直後に置き、long dress は入れません。袖は、長袖か、パフか、半袖かを一つです。パフは肩の体積が変わるので、フリルとは別の日に試します。襟元の high neckline は、首まで布がある形です。square neckline は、襟ぐりが四角い形です。どちらも自然な英語で、公式タグとしては断定しません。モデルによって効きが弱いことがあります。効かないときは、long sleeves を残して、襟の語は外してください。肩を出す形の語は、使わないリストのままにします。

裾の位置を決めたあとは、その語を消さないでください。装飾を足す作業の途中で long dress を消すと、丈だけが最初の問題に戻ります。

半袖が長袖になるときは、long sleeves が残っていないかを消し、short sleeves を種類の直後に置きます。

襟元の語が無視されるときは、装飾を外してから high neckline を自然な英語で戻します。フリルがあると、襟の線は置き換わります。

袖は \`long sleeves\`、\`puffy sleeves\`、\`short sleeves\` です。パフは肩の量が変わるので、フリルと同時に強くすると、肩が布の塊になります。半袖は \`short sleeves\` までにして、肩を大きく出す形は使いません。

襟元は high neckline、四角い襟ぐりは square neckline と自然な英語です。公式タグとしては断定しません。使わない語は off-shoulder、bare shoulders、backless、strapless、bodycon、side slit、high slit、see-through、sheer、short dress です。肩や背中を大きく開ける形、極端に短い丈、透ける布は、このページの例に入れません。

**長袖のロング**

\`\`\`
1 adult woman, long dress, long sleeves, high neckline, navy,
standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress
\`\`\`

high neckline が無視されるときは、\`long sleeves\` を先に残し、装飾の \`frills\` を一旦外します。飾りが増えると、襟の線がフリルに置き換わります。`,
      },
      {
        title: '素材と装飾',
        content: `素材は一つです。サテンは satin、絹は silk、レースは \`lace\`、チュールは tulle、シフォンは chiffon と自然な英語です。\`lace\` 以外は公式タグとして断定しません。satin と tulle を同じ強さにすると、光沢と透明感が平均になって、どちらの布か分かりません。

素材を決めるときは、光沢があるかないかを先に言います。光沢が欲しいなら satin、やわらかい透けない薄さなら chiffon、張りのある広がりなら tulle、です。silk は satin と近い光沢になることがあります。両方を強くすると、ハイライトの位置が二つになります。レースは、裾か袖かを場所で一つにします。場所を書かない lace は、モデルによって胸元まで広がります。リボンは腰に一つ、と位置を書きます。髪のリボンが目的なら、ドレスの ribbon は外して、髪型のガイドへ戻ってください。刺繍とスパンコールは、夜のホールで光を足すときだけです。昼の通りでは、両方外した方が布の色は安定します。装飾を足すたびに、前の装飾を一つ消す、をルールにしてください。

光沢を比べるときは、色を黒か白に固定します。色も素材も同時に変えると、サテンの光なのか色の明るさなのかが区別できません。

チュールの量だけを増やしたいときは、tulle を残して frills を外します。フリルが増えると、布の種類ではなく段の数だけが増えます。

レースの範囲が広がりすぎたら、lace hem と自然な英語で裾だけに限定し、全身の lace は外します。

装飾は \`frills\` か \`ribbon\` を一つです。刺繍は embroidery、スパンコールは sequins と自然な英語です。両方を強くすると、スカート全面が同じ模様で埋まります。

| 足すもの | 書き方 | 強くしすぎたとき |
|---|---|---|
| レース | \`lace\` | 肌の線まで模様になる。範囲を裾だけにする |
| フリル | \`frills\` | 袖と同時だと肩が溶ける |
| リボン | \`ribbon\` | 腰に一つ。髪のリボンと分けて書く |
| 刺繍 | embroidery（自然な英語） | 色が布からにじむ |
| スパンコール | sequins（自然な英語） | 画面全体が光る。夜のホールと一緒に |

レースの範囲を書きたいときは、自然な英語で lace hem のように場所を一つ足します。場所を書かない \`lace\` は、モデルによって袖まで広がることがあります。`,
      },
      {
        title: '色と柄',
        content: `色は、ドレスの語の直前に一つ置きます。\`white dress\`、\`black dress\`、\`red dress\` はタグとして安定しやすいです。紺は navy dress、金は gold dress と自然な英語です。公式タグとして断定するのは白、黒、赤の三つです。

白、黒、赤は、タグとして dress の前に置くと残りやすいです。紺と金は、navy dress、gold dress と自然な英語です。金はハイライトと混ざって、布の範囲が分かりにくくなります。金を使うときは、背景を暗い単色にしてください。グラデーションは、上をどの色、下をどの色、と一つずつ書きます。方向を書かない gradient dress は、モデルによって左右のグラデーションになり、丈の形が歪みます。花柄は、花の種類を一つまでにしてください。バラと桜を同時に書くと、柄が平均になって、どちらにも見えない模様になります。柄が床に移ったときは、floral print を外して無地に戻し、色が安定してから柄を弱く戻します。髪の色と服の色を同じ語にしないでください。境界が消えます。

無地で形が決まってから、柄を足します。最初から花柄にすると、形の崩れが柄に隠れて、直し箇所が見えません。

黒のドレスが灰色になるときは、背景を明るい単色にし、black dress を前に戻します。暗い背景では、黒の範囲が背景とつながります。

赤と白を一枚で比べるときは、プロンプトを二つに分けます。一枚の中に white dress と red dress を残さないでください。

グラデーションは gradient dress と自然な英語です。始点と終点を書くなら、[色プロンプト](/guides/color-prompt-guide) の順に合わせて、服と背景の色を混ぜないでください。花柄は floral print と自然な英語です。\`floral print\` を強くすると、顔や床まで花が移ることがあります。そのときは柄を外し、無地に戻します。

**白いロング**

\`\`\`
1 adult woman, white dress, long dress, long sleeves, lace hem,
standing, full body, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress, red dress
\`\`\`

白を維持するときは、背景の赤を強くしないでください。ネガティブの \`red dress\` は、この白い例だけの除けです。赤いドレスが欲しい回では外します。公開作例の立ち姿は [エレガントなドレス](/prompt/elegant-dress-woman) です。`,
      },
      {
        title: 'シーン別のテンプレ',
        content: `シーンは、場所を一つ足すだけです。場所の名詞を増やすと、ドレスの形が負けます。ファンタジーの城は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) と役割を分け、このページでは布のドレスを主にします。

場所は、ドレスの種類が決まってから一語だけ足します。パーティーは室内の夜、結婚式は式のホール、舞踏会は ballroom、外出は通り、城は castle hall です。どれも自然な英語を含みます。式のホールに花とキャンドルと窓を全部書くと、人が小さくなります。花を足すなら、背景ではなく手に持つ一つ、までにしてください。結婚式の男性は tuxedo を一つ、シャツと靴はスーツのガイドに任せます。このページで男性の部品を増やすと、花嫁の丈が負けます。ファンタジーの城では、鎧の語を混ぜません。冠を足すなら circlet を一つ、マントを足すなら cape を一つです。鎧とドレスを同じ強さにすると、布が金属に溶けます。

場所を変えてドレスの形が変わったら、場所の語を外して、種類と丈だけでもう一枚作ります。場所が原因なのか、ドレスの語が原因なのかを分けてください。

式の二人は、成人の二人であることを文でもタグでも残します。人数が 2 adults から消えると、第三者が足されます。

城のドレスに鎧の部品を足したくなったら、ファンタジー衣装のガイドへ移り、このページのプロンプトは布のまま残します。

パーティーは、夜の長いドレスの型に、indoor evening hall を自然な英語で一つ足すだけです。場所を増やすと、袖の長さが負けます。

**結婚式の二人**

新郎の礼服は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。ここでは並びと、花嫁の \`wedding dress\` だけを固定します。

\`\`\`
2 adults, 1 adult woman, wedding dress, long dress, 1 adult man, tuxedo,
standing, side by side, full body, indoor wedding hall
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress, extra person
\`\`\`

**舞踏会**

\`\`\`
1 adult woman, ball gown, long dress, tulle, ivory,
standing, full body, ballroom
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress
\`\`\`

ballroom と tulle と ivory は自然な英語です。

**お出かけのワンピース**

\`\`\`
1 adult woman, sundress, knee-length, short sleeves, floral print,
standing, full body, sunny street
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress, evening gown
\`\`\`

**ファンタジーの長いドレス**

\`\`\`
1 adult woman, long dress, cape, circlet, silver embroidery,
standing, full body, castle hall, fantasy
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress, revealing clothes, modern clothes, t-shirt, jeans
\`\`\`

雪の城の公開作例は [雪の女王のガウン](/prompt/snow-queen-fantasy-gown)、海の長いドレスは [マーメイドのガウン](/prompt/mermaid-ocean-kingdom-gown) です。どちらも丈は \`long dress\` で固定します。`,
      },
      {
        title: '髪型・アクセサリーと合わせる',
        content: `髪とドレスは別の層です。アップにするなら hair up、長く下ろすなら [ロングヘアプロンプト](/guides/long-hair-prompt-guide) の \`long hair\` を一つ足します。両方を強くすると、結んだ髪と下ろした髪が同時に出ます。

髪を変えるときは、ドレスの種類と丈を固定したまま、髪型の語だけを差し替えます。アップとロングを見比べるのが目的なら、色と袖は同じにします。ネックレスは、肖像で確認し、全身で消えていないかを別の一枚で見ます。一枚の全身で、石の形まで両立させようとすると、どちらも中途半端になります。ティアラは額、冠は頭の上、です。同時に書くと金属が二段になります。和服や仕事着やエプロンの服と、ドレスを一枚に混ぜないでください。比較したいときは、プロンプトを別に保存します。一つのプロンプトの中に kimono と evening gown が残っていると、袖が両方の形を平均します。髪飾りの詳細は髪型のガイド、石の詳細はアクセサリーのガイドです。

アクセサリーが消えるときは、構図を portrait にして確認し、全身のプロンプトとは別に保存します。一枚に全部を詰め込まないでください。

ティアラを足して髪型が崩れたら、髪の語を先に確定し、tiara は肖像の別プロンプトで確認します。

ロングヘアを足してドレスの袖が隠れたら、髪のガイドで長さを確定し、袖の確認は髪をまとめた版で行います。

首元は necklace、額は \`tiara\` です。素材と石の種類は [アクセサリープロンプト](/guides/accessory-prompt-guide) に任せ、このページでは数を一つにします。ティアラと \`crown\` は同時に強くしません。

和服の式と並べて迷うときは [着物プロンプト](/guides/kimono-prompt-guide)、仕事着の黒と並べるときは [スーツプロンプト](/guides/suit-lab-coat-prompt-guide)、エプロンのある仕事着は [メイド服プロンプト](/guides/maid-outfit-prompt-guide) です。ドレスのページでは、それらの語を混ぜません。

髪をまとめた夜のドレスは、\`hair up, evening gown, long dress, necklace\` です。pearl は自然な英語です。肖像にするとネックレスは残りやすく、丈は見えません。丈を確認する回は \`full body\` に戻し、石の語は外します。\`tiara\` と \`crown\` は、この回のネガティブに回してください。`,
      },
      {
        title: '形が崩れるとき',
        content: `普段着に寄るときは、\`evening gown\` か \`long dress\` を前に戻し、ネガティブに \`t-shirt, jeans\` を入れます。ワンピースが欲しい回だけ \`sundress\` を残し、夜の語は外します。

崩れた箇所に名前をつけてから直します。裾が上がった、布が溶けた、色が移った、袖が消えた、のどれかです。裾が上がったときは long dress と、ネガティブの short dress です。布が溶けたときは素材を一つに減らします。色が移ったときは BREAK で、服の色と背景を分けます。袖が消えたときは long sleeves を種類の直後に戻します。四つを同時に重み付けすると、スカートの枚数だけが増えます。重みは 1.2 を一つ、までです。それでも直らないときは、装飾の frills と lace を全部外して、無地の long dress に戻し、そこから一つずつ戻します。戻すたびに、前の画像と見比べて、どの語で崩れたかをメモしてください。

直したプロンプトは、崩れる前のプロンプトを消さずに残します。戻り先が無いと、直しの途中で別の崩れが起きたとき、最初の安定した形に戻れません。

BREAK の行には、分けたい色を一つずつ置きます。三色を一行に戻すと、BREAK を入れた意味が無くなります。

無地の long dress に戻して安定したら、戻したい装飾は一つずつ、別の保存として足します。

丈が短くなるときは、\`long dress\` を種類の直後に置き、ネガティブの \`short dress\` を維持します。knee-length の回は、\`long dress\` を外して knee-length だけにします。両方を強くすると、裾の位置が平均になります。

布が溶けるときは、素材を一つに減らします。satin と \`lace\` と \`frills\` のうち、残すのは一つです。色が床や髪に移るときは、[色プロンプト](/guides/color-prompt-guide) のように、色と服のあいだで BREAK を入れます。

\`\`\`
1 adult woman, (long dress:1.2), navy
BREAK
simple background, standing, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
school uniform, short skirt, short dress
\`\`\`

重みは 1.2 までです。1.4 を超えると、スカートの枚数が増えます。`,
      },
      {
        title: 'ChatGPT・Gemini の自然文',
        content: `自然文でも、種類、丈、袖、色の順は同じです。成人であることを文に残します。

自然文では、種類の日本語と、英語のタグを同じ文に書いても構いません。evening gown のように、残したい語は英語のまま残すと、タグに戻したときにずれません。丈は、足首まで、床に触れる、のように長さの結果を書きます。短い、とは書かないでください。写真を渡す文では、変えてよいものを服だけに限定し、顔、年齢、姿勢は維持します。背景まで変えると、別人の写真になります。使う写真は、成人が写った、権利のあるものだけです。相手の写真でドレスを試すときは、その人の同意を取ってから渡します。生成後に顔が変わっていたら、その画像は使わず、維持する指示を強くしてやり直してください。ゴシック調の文でも、使わない服種の名前は入れません。

写真の試着で背景まで変わったら、その結果は捨てて、服以外は維持する、と文に足してやり直します。顔が変わった画像を、あとから顔だけ貼り戻す前提にはしません。

自然文の結果をタグに翻訳するときは、種類、丈、袖、色の四語に収めてから、装飾を一つ足すか決めます。

写真の試着文にも、long sleeves と long dress に相当する長さを日本語で残します。長さが無い文は、丈が短く戻ります。

\`\`\`
1 adult woman in a navy evening gown with long sleeves and a long skirt.
She is an adult, standing full length in a quiet hall. Satin fabric, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, short dress, t-shirt, jeans
\`\`\`

自分の写真でドレスを試すときは、その写真が成人のものであり、使う権利があることを確認します。顔と年齢は残し、服だけを替えます。

\`\`\`
Edit the outfit of the adult in this photo into a long evening gown, long sleeves, navy satin.
Keep the adult face, age, and pose. Full length if the frame allows. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, short dress
\`\`\`

ゴシック調の公開作例は [銀髪のゴシックドレス](/prompt/silver-hair-gothic-dress) です。\`gothic dress, long sleeves\` と書き、別の服種の名前は足しません。`,
      },
    ],
    faq: [
      {
        q: 'ドレスの種類を英語で指定するには？',
        a: '`evening gown`、cocktail dress（自然な英語）、ball gown（自然な英語）、`wedding dress` から一つです。丈は `long dress` か knee-length で固定します。',
      },
      {
        q: '丈が短くなります',
        a: '`long dress` を種類の直後に置き、ネガティブに `short dress` を入れます。膝あたりが目的のときだけ knee-length を使い、`long dress` は外してください。',
      },
      {
        q: '普段着になります',
        a: '`evening gown` か `long dress` を前に戻し、ネガティブに `t-shirt, jeans` を入れます。`sundress` が残っていると昼のワンピースに寄ります。',
      },
      {
        q: 'ウェディングとイブニングを同時に書けますか？',
        a: '同じ強さにはしません。白の式なら `wedding dress`、夜の席なら `evening gown` です。色が混ざったら、使わない方をネガティブに回してください。',
      },
      {
        q: 'ゴシック調はどう書きますか？',
        a: '`gothic dress, long sleeves` です。lolita という語は使いません。公開作例は [銀髪のゴシックドレス](/prompt/silver-hair-gothic-dress) です。',
      },
    ],
  },

  'eye-prompt-guide': {
    sections: [
      {
        title: '目・瞳プロンプトの基本',
        content: `「目 プロンプト」「瞳 プロンプト」で必要なのは、色、形、瞳孔とハイライト、まつげとメイク、視線の順に、一度に一つずつ足すことです。\`blue eyes\` と \`red eyes\` を同じ強さで並べると、オッドアイでもグラデーションでもない、濁った色になります。

目は、顔の面積が足りないと全部負けます。最初の確認は close-up か portrait で行い、色と形が決まってから全身に戻します。全身のまま目の語を足しても、点の色が少し変わるだけです。順番を飛ばして、まつげとハイライトを先に書くと、色が初期値の茶のまま、線だけが太くなります。色を一つ決めてから、次の層へ進んでください。Stable Diffusion と NovelAI では、目のタグを髪の直後に置きます。写真向けのモデルは、detailed iris を自然な英語で足した方が、虹彩の模様が残ります。イラスト向けでは、色のタグの方が素直です。どちらでも、左右で別の指示を混ぜる前に、両目が同じ色の一枚を作っておきます。それが、崩れたときの戻り先です。

色が決まったプロンプトは、コピーしてから形を足します。同じプロンプトを上書きすると、色の戻り先が無くなります。

全身の絵で目の色が負けても、close-up の確認用プロンプトは消さないでください。色の基準は、その一枚です。

目の語は、髪の色のあと、表情の前です。後ろに長く続くと、服の色に負けて、いつもの茶に戻ります。最初の一手は、色を一つ、形を一つです。

登場人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。顔が小さいと目の指定は全部負けます。確認するときは \`portrait\` か \`close-up\` にします。構図の軸は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide)、感情は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。

**色から視線まで**

\`\`\`
1 adult woman, blue eyes, looking at viewer, portrait, black hair, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\``,
      },
      {
        title: '目の色の一覧',
        content: `色は一つを \`eyes\` につなげます。髪の色と同じ語を、髪と目の両方に強くすると、境界がにじみます。髪の色は [髪色プロンプト](/guides/hair-color-prompt-guide)、色名の一般は [色プロンプト](/guides/color-prompt-guide) です。

表の色は、単体で一度生成してから組み合わせに進みます。青が紫に寄るときは、purple eyes が残っていないかを確認します。残っていなければ、light や dark を外して、blue eyes だけに戻します。黒は、瞳孔と白目の境界が消えやすい色です。close-up で境界が見えることを確認してから、portrait に戻してください。銀と薄い灰は、白く飛ばす指定ではありません。silver eyes か pale grey eyes と書き、白目だけになる語は避けます。黄と橙は、照明の暖色と混ざります。背景を昼の白にすると、瞳の色が照明に負けません。赤と髪の赤が隣り合うときは、髪を黒か茶に一度固定し、目の赤が安定してから髪の色を戻します。公開作例は、色が一つに決まっているかの見本です。複数の色が混ざった作例は、この表の確認には使いません。

表の色を順番に試すときは、髪と背景を固定します。髪まで変えると、目の色の差が髪の色の差に見えてしまいます。

白く飛ばした瞳は採用しません。silver eyes か pale grey eyes に書き換えて、ハイライトが残るかを close-up で見ます。

| 色 | 書き方 | 注記 |
|---|---|---|
| 青 | \`blue eyes\` | 明るい青は light を前に |
| 赤 | \`red eyes\` | 髪が赤だと境界が消える |
| 緑 | \`green eyes\` | |
| 紫 | \`purple eyes\` | |
| 黄 | \`yellow eyes\` | 金に寄るときは gold を足しすぎない |
| 茶 | \`brown eyes\` | 書かないときの初期値に近い |
| 黒 | \`black eyes\` | 瞳孔と同化しやすい。\`portrait\` で確認 |
| 灰 | \`grey eyes\` | |
| 水 | \`aqua eyes\` | \`blue eyes\` と両方強くしない |
| 橙 | \`orange eyes\` | |
| 桃 | \`pink eyes\` | |
| 銀・白 | silver eyes、pale grey eyes（自然な英語） | \`white eyes\` は白目だけに読まれることがある |

\`white eyes\` は、ハイライトのない空白に見えることがあります。銀なら silver eyes、薄い灰なら pale grey eyes と自然な英語で書いてください。公式タグとして断定するのは、表の青から桃までです。銀と白は自然な英語です。モデルによって効きが弱いことがあります。

公開作例は [青い瞳の肖像](/prompt/blue-eyes-slender-digital-portrait)、[黄色い瞳](/prompt/elegant-short-hair-yellow-eyes)、[橙の瞳](/prompt/futuristic-headdress-orange-eyes)、[赤い瞳の戦士](/prompt/warrior-fantasy-red-eyes-mj) です。

**青を固定する**

\`\`\`
1 adult woman, blue eyes, black hair, looking at viewer, close-up, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed, red eyes
\`\`\`

このネガティブの \`red eyes\` は、青を守る回だけです。赤が目的のときは外します。`,
      },
      {
        title: 'オッドアイとグラデーション',
        content: `左右で色が違うのは \`heterochromia\` です。どちらの目がどちらの色かは、自然な英語で "right eye blue, left eye gold" のように書きます。公式タグとしては、左右の割り当てまで断定しません。モデルが左右を入れ替えることがあります。入れ替わったまま使えないときは、その目だけを後から描き直します。

オッドアイを試す前に、青だけの一枚と、金だけの一枚を残しておきます。左右が混ざったときに、どちらの色が正しいかの見本になるためです。right eye と left eye は、モデルから見た左右が、絵を見る人の左右と逆に感じられることがあります。入れ替わったら、語を逆に書き換えてもう一度試すより、逆になった目だけを描き直す方が、もう一方の形は残ります。グラデーションは、瞳の内側の色と外側の色を一つずつ書きます。方向を書かない gradient eyes は、左右のオッドアイと区別がつきません。multicolored eyes は、色が複数あることの総称なので、単体だと何色になるかが安定しません。色の名前を二つまで足して、総称は外してください。三つ目の色を足すと、濁ります。

左右の見本を残してからオッドアイを作ると、入れ替わりに気づきやすくなります。見本が無いと、どちらが正しい色なのかを後から判断できません。

グラデーションが左右の色違いになってしまったら、heterochromia を消して、gradient eyes と色を二つだけに戻します。

\`gradient eyes\` は、一つの瞳の中で色が変わる形です。\`multicolored eyes\` は、色が複数ある呼び方です。\`heterochromia\` と \`gradient eyes\` を同じ強さにすると、左右の違いと、瞳の中のグラデーションが混ざります。どちらか一つにしてください。

**左右で色を変える**

\`\`\`
1 adult woman, heterochromia, blue eyes, gold eyes, right eye blue, left eye gold,
looking at viewer, close-up, black hair
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\`

左右の指定は自然な英語です。入れ替わりが続くときは、色を一度片方だけにして、もう一方は描き直しに回してください。重みを 1.4 まで上げると、瞳の形が先に壊れます。`,
      },
      {
        title: '目の形',
        content: `形は一つです。つり目とたれ目を同時に強くすると、目尻の角度が平均になります。

形のタグは、色が決まったあとに一つだけ足します。つり目の確認が終わったら、そのプロンプトをコピーして、tsurime を tareme に差し替えます。ゼロから書き直すと、色や髪型まで変わって、形の違いが見えません。ジト目は、感情のガイドにある気のない表情と近く、笑顔と同時に強くすると目尻が平均になります。半目は、眠さと、細く開いた形の両方に読めます。眠さが欲しくないときは、half-closed eyes を外して、形のタグだけを残します。丸い目とアーモンド型は自然な英語です。公式タグとしては断定しません。モデルによって効きが弱いことがあります。効かないときは、tsurime か tareme に戻して、角度で形を作ってください。見開いた wide-eyed は、驚きの表情に寄ります。平静な肖像では外します。

形の比較は、同じ色、同じ髪、同じ向きで行います。向きが横顔になると、目尻の角度は見えません。比較は正面の portrait に固定します。

ジト目と笑顔を同時に書かない、は表情のガイドと同じです。気のない目が欲しい回は、笑顔の語を先に消します。

| 形 | 書き方 | 印象 |
|---|---|---|
| つり目 | \`tsurime\` | 目尻が上がる |
| たれ目 | \`tareme\` | 目尻が下がる |
| ジト目 | \`jitome\` | 半目に近い、気のない視線 |
| 半目 | \`half-closed eyes\` | 細く開く |
| 見開く | \`wide-eyed\` | 驚いた形に寄りやすい |
| 丸い | round eyes（自然な英語） | 公式タグとしては断定しない |
| アーモンド | almond eyes（自然な英語） | 同上 |
| 細める | narrowed eyes（自然な英語） | \`jitome\` と両方強くしない |

感情と一緒に変えるときは [表情プロンプト](/guides/stable-diffusion-expression-prompt) を見て、笑顔と \`jitome\` を同じ強さにしないでください。笑っている目と、気のない目は打ち消し合います。

**つり目**

\`\`\`
1 adult woman, tsurime, blue eyes, looking at viewer, portrait, black hair
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, tareme
\`\`\`

たれ目は、つり目の例の \`tsurime\` を \`tareme\` に差し替え、ネガティブに \`tsurime\` を入れます。男性の例では、まつげの語を足しすぎないでください。\`long eyelashes\` を同じ強さにすると、つり目の角度が化粧の線に置き換わります。`,
      },
      {
        title: '瞳孔・ハイライト・光',
        content: `瞳孔とハイライトは、色が決まったあとに一つ足します。縦長の瞳孔は \`slit pupils\`、星は \`star-shaped pupils\`、記号は \`symbol-shaped pupils\` です。星と記号を同時に強くすると、瞳の中が模様で埋まります。

瞳孔の形は、色と目の形が決まってから一つです。縦長、星、記号を同時に書くと、瞳の中が模様で埋まり、白目との境界が消えます。星を試すなら、記号の語は入れません。光らせる指定と、きらきらの指定も、同時には強くしません。sparkling eyes はハイライトの数、glowing eyes は光がにじむ感じ、です。キャッチライトは、瞳の中の小さい反射です。自然な英語の catchlight in eyes は、公式タグとしては断定しません。モデルによって効きが弱いことがあります。効かないときは、sparkling eyes に戻します。光の色を指定するなら、瞳の色と同じ系統を一つにしてください。別の色の光を足すと、オッドアイのように見えます。使わない形のリストは、ポジティブにもネガティブの飾りにも足しません。空白の瞳が欲しいときの代替は、銀か薄い灰です。

光が強すぎるときは、色のタグは残して、光の語だけを外します。色ごと消すと、次に戻したとき、別の色からやり直しになります。

星型がただの丸に戻るときは、star-shaped pupils を前に移し、glowing eyes を外します。光の指定が、形より優先されることがあります。

きらきらは \`sparkling eyes\`、光って見えるのは \`glowing eyes\` です。キャッチライトは catchlight in eyes と自然な英語です。公式タグとしては断定しません。\`glowing eyes\` を強くすると、光が髪や服まで広がります。色を一つに決めてから足してください。

使わない語は heart-shaped pupils、empty eyes、ahegao、rolling eyes です。ハイライトを消して空白に見せる指定も、このページでは使いません。白く飛ばしたいときは、前の節の silver eyes に戻します。

**星の瞳**

\`\`\`
1 adult woman, blue eyes, star-shaped pupils, sparkling eyes, looking at viewer, close-up
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\`

光を弱く足すときは、星の例の \`star-shaped pupils, sparkling eyes\` を外し、\`glowing eyes\` と catchlight in eyes だけにします。光が顔の外まで出るときは、\`glowing eyes\` を外し、catchlight in eyes だけを残します。`,
      },
      {
        title: 'まつげとアイメイク',
        content: `まつげは \`eyelashes\`、長さを足すなら \`long eyelashes\` です。アイラインは \`eyeliner\`、アイシャドウは \`eyeshadow\` です。三つを同じ強さにすると、目の形が線の太さに負けます。まず \`eyelashes\` だけで確認してください。

まつげは、形のタグのあとに足します。つり目に long eyelashes を同じ強さで足すと、目尻の角度が線の太さに負けて、たれ目に近づくことがあります。そのときはまつげを外して、形を先に確定します。アイラインは、上だけにしたいとき、自然な英語で upper eyeliner と書きます。公式タグとしては断定しません。上下を同時に太くすると、目が小さく見えます。アイシャドウは、瞳の色と違う色を一つまでです。同じ色にすると、どこまでが瞳かが分からなくなります。眼鏡は、色の確認が終わってから戻します。レンズの反射で色が消えたときは、眼鏡を外した版を正とし、フレームを細くする語をアクセサリーのガイドから一つだけ借りてください。男性の肖像で化粧を足すときは、eyelashes か eyeliner かを一つにします。

線を足して目が小さくなったら、eyeliner を外して eyelashes だけに戻します。線の種類を一度に二つ足さないでください。

眼鏡を戻して色が消えたら、色の確定版を残したまま、眼鏡ありの版は参考として分けて保存します。

眼鏡は \`glasses\` です。フレームの素材や形は [アクセサリープロンプト](/guides/accessory-prompt-guide) に任せ、このページでは目の色がレンズの向こうで残るかを見ます。\`glasses\` と \`close-up\` を一緒にすると、反射で瞳の色が消えることがあります。そのときは眼鏡を外して色を確定し、あとから戻します。

**まつげを足す**

\`\`\`
1 adult woman, brown eyes, long eyelashes, eyeliner, looking at viewer, portrait
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\`

アイシャドウの色を瞳の色と変えるときは、[色プロンプト](/guides/color-prompt-guide) のように色の語を服と混ぜないでください。\`eyeshadow\` だけだと、モデルによって服の色がまぶたに移ります。`,
      },
      {
        title: '男性・写真・デフォルメ',
        content: `男性は \`1 adult man\` から書きます。色と形は同じ表です。化粧の語は、必要なときだけ一つにします。

男性の目は、色と形の表をそのまま使います。写真風にするときは、肌の語を増やしすぎないでください。肌の詳細が勝つと、虹彩がのっぺりします。detailed iris は自然な英語で、close-up のときだけ残します。デフォルメで目を大きくする指定は、顔の比率を変える指定でもあります。全身と同時に強くすると、頭身まで変わり、成人の体の比率から外れます。目だけを大きくしたいなら portrait に固定し、adult を残し、ネガティブの年齢の語も残します。大きめの目は、年齢を下げるための指定ではありません。年齢が下がって見えたら、目の大きさを弱めて、ネガティブを維持したままやり直します。chibi を足す回は、このページの目の確認には使いません。頭身の変更は、別の目的のときだけにしてください。

写真風とイラスト風は、別のプロンプトとして保存します。photorealistic を残したままアニメの塗りを足すと、虹彩の描き方が平均になります。

大きめの目を足して顔が幼く見えたら、large eyes を外し、成人の指定とネガティブの年齢の語を残して再生成します。

写真風は \`photorealistic\` と、detailed iris を自然な英語で足します。詳細な虹彩は、顔が \`close-up\` のときだけ残ります。全身のまま detailed iris を書いても、点に戻ります。

\`\`\`
1 adult man, grey eyes, detailed iris, photorealistic, close-up, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\`

男性の肖像は、写真風の例から \`photorealistic\` と detailed iris を外し、\`brown eyes, tsurime, portrait\` にします。ネガティブには \`long eyelashes\` を足して、化粧の線が目の形を上書きしないようにします。

デフォルメで目を大きくするときは、大きめの目、と自然な英語で large eyes と書きます。頭の大きさや目の大きさを変えても、人物は成人のままです。\`adult\` を残し、ネガティブの年齢の語も残します。年齢が下がって見えるのを、目の大きさだけで避けきれないことがあるためです。\`chibi\` と全身を同時に強くすると、体の比率まで変わります。目だけを変えるなら \`portrait\` にしてください。

\`\`\`
1 adult woman, blue eyes, large eyes, looking at viewer, portrait, adult, black hair
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\``,
      },
      {
        title: '瞳が崩れる・色が変わるとき',
        content: `左右の大きさが違う、瞳孔が崩れる、寄り目になるときは、ネガティブに \`asymmetrical eyes, deformed pupils, cross-eyed\` を残します。顔が小さいのが原因のことが多いので、\`full body\` を外し、\`upper body\` か \`close-up\` にします。

崩れの種類で、戻す語が違います。左右の大きさが違うときは、構図を close-up にして、ネガティブの asymmetrical eyes を残します。瞳孔の形が溶けるときは deformed pupils です。寄り目は cross-eyed です。三つをいつもネガティブに残しておいても、普通の肖像は壊れません。色が髪に移るときは、BREAK で行を分け、髪の色の語を目の行から消します。同じ行に red eyes と red hair があるのが、にじみの一番多い形です。オッドアイの左右が逆のときは、重みを上げずに、逆の目だけを描き直します。描き直しの範囲に、眉や髪まで含めると、決まっていた形が動きます。範囲は瞳の中だけにしてください。製品の顔修正の名前は書きません。領域を指定して再生成する、で手順は足ります。品質のタグを目の色より前に置くと、目の指定が負けます。品質タグのガイドの順番に戻してください。

描き直しは一回に一箇所です。左右の目を同時に直すと、揃っていた方の形まで動きます。崩れている側だけを範囲にします。

BREAK のあとにも、年齢のネガティブは全体に残します。行を分けても、除けたい年齢の語は消しません。

顔の周辺だけを描き直す機能は、ツールによって名前が違います。このページでは製品名を指定しません。目の領域だけを指定して、色と形の語を短くして再生成する、で足ります。品質の語の置き場所は [品質タグ](/guides/quality-tags-prompt-guide)、除け方の全体は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

色が髪に移るときは、髪の色と目の色のあいだで BREAK を入れます。

**色を分ける**

\`\`\`
1 adult woman, red eyes, close-up, looking at viewer
BREAK
black hair, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
asymmetrical eyes, deformed pupils, cross-eyed
\`\`\`

オッドアイの左右が逆のときも、プロンプトの重みを上げるより、逆になった目だけを描き直す方が形は残ります。

寄り目を戻すときは、\`looking at viewer, portrait\` に戻し、ネガティブの \`cross-eyed\` を残します。symmetrical face は自然な英語です。公式タグとしては断定しません。効かないときは外して、\`close-up\` とネガティブだけにしてください。`,
      },
      {
        title: '自然文と視線の組み合わせ',
        content: `ChatGPT と Gemini では、色、形、視線を一文にします。成人であることを残します。カメラの位置は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) の語を、文の後半に足します。

自然文でも、色、形、視線の順を守ります。形は、つり目なら目尻が少し上がる、たれ目なら目尻が少し下がる、と結果で書きます。タグの tsurime を文の中に残しても構いません。残しておくと、タグのプロンプトへ戻すときにずれません。視線をカメラから外す文は、体の向きと一緒に書きます。横を向いて、目はカメラ、は首がねじれます。横を向くなら、見える方の目は一つ、と書いて、オッドアイの確認は正面の文に戻します。構図のガイドにある from side を、目の色の確認文に混ぜないでください。ハイライトは、両目に一つずつ、と数を書くと、片目だけ光ることが減ります。成人であることは、文の前半に adult として残します。

文で指定した視線は、タグの looking at viewer か looking away かに翻訳して残します。文のままイラスト向けモデルへ渡すと、視線だけが正面に戻ります。

横顔の文では、目の色の確認をしない、と自分用のメモに残します。色の確認は、正面の close-up に戻してから行います。

\`\`\`
1 adult woman, close-up portrait, blue eyes, slight upward eye shape, looking at the camera.
She is an adult. Black hair, soft daylight, catchlight in both eyes.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, asymmetrical eyes, deformed pupils, cross-eyed
\`\`\`

横顔で目の色を確認しないでください。\`profile\` では目が一つになり、オッドアイは判定できません。色の確認は \`straight-on\` か \`close-up\` に戻します。

視線をそらす文は、"looking away from the camera" と自然な英語で足し、\`looking at viewer\` は同時に書きません。両方を残すと、また正面を向きます。`,
      },
    ],
    faq: [
      {
        q: '目の色が髪や服に移ります',
        a: '色は目の直後に一つだけ書き、髪の色とのあいだに BREAK を入れます。`blue eyes` と `red eyes` を同じ強さで並べないでください。',
      },
      {
        q: 'オッドアイの左右が逆になります',
        a: '`heterochromia` に加え、right eye と left eye を自然な英語で書きます。入れ替わることがあります。逆の目だけを描き直し、重みは 1.3 を超えないでください。',
      },
      {
        q: '白い瞳にすると空白になります',
        a: '`white eyes` は白目だけに読まれることがあります。銀は silver eyes、薄い灰は pale grey eyes と自然な英語で書いてください。',
      },
      {
        q: '瞳が崩れます、左右で大きさが違います',
        a: 'ネガティブに `asymmetrical eyes, deformed pupils, cross-eyed` を入れ、構図を `close-up` か `upper body` にします。全身のまま目の細部は残りません。',
      },
      {
        q: 'つり目とたれ目は同時に指定できますか？',
        a: '同時にはしません。`tsurime` か `tareme` の一方です。感情と混ぜるときは [表情プロンプト](/guides/stable-diffusion-expression-prompt) を見て、笑顔と `jitome` を同じ強さにしないでください。',
      },
    ],
  },
}
