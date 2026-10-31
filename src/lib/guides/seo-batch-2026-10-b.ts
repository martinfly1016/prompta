/**
 * Second SEO batch (2026-10-25): short adult height, kiss, hug,
 * dark room, Illustrious XL.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 */

import type { GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'
const NEGATIVE_CHILD = 'child, kid, toddler, baby, loli, shota, teen, underage, baby face'

export const SEO_BATCH_2_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'short-height-petite-prompt': {
    sections: [
      {
        title: '低身長・小柄は、大人の一人絵で指定する',
        content: `「低身長 プロンプト」「小柄 プロンプト」「背が低い」で探しているのは、一人のキャラクターを大人のまま低く見せる英語タグです。このページは **20歳以上の大人** だけを扱います。身長を下げるために年齢を下げる書き方は使いません。子ども・10代に見えるタグはポジティブに置かず、ネガティブプロンプトに入れます。

身長は比較がないと絵に出ません。一人が画面の中央に立っているだけだと、モデルは平均的な脚の長さに戻します。\`petite\` を入れたうえで、全身を入れ、ドアやカウンターなど高さの分かるものを一緒に置いてください。

二人の差を描く場合は [身長差プロンプト](/guides/height-difference-pair-prompt) と [身長差メーカー](/tools/height-difference-maker) です。一人を高く見せる書き方は [高身長プロンプト](/guides/tall-height-prompt-guide) です。体型全般の単語は [体型プロンプト](/guides/body-type-prompt-guide)、世代の単語は [年齢プロンプト](/guides/age-prompt-guide) に分けてあります。`,
      },
      {
        title: '低身長・小柄の英語タグ',
        content: `最初の一手は \`petite\` です。小柄な体格を指すタグで、低身長の土台に使います。\`short\` だけだと髪や袖の短さと混ざることがあります。身長の意味で使うなら \`petite\` か \`short stature\` とセットにしてください。

| 英語タグ | 意味 | 使い方 |
|---|---|---|
| petite | 小柄 | 最初に置く。大人の低身長の基本 |
| short stature | 低身長 | petite の補助。単独より一緒の方が方向が分かりやすい |
| small body | 体が小さい | 体格も縮む。頭身まで崩れたら外す |
| small frame | 骨格が小さい | 細さ寄り。身長そのものではない |
| short | 短い・低い | 曖昧。髪や袖と混ざるので単独で使わない |
| short legs | 脚が短い | 低身長の補助。強くするとバランスが崩れる |
| tiny | とても小さい | 人そのものが縮み、デフォルメに寄りやすい |
| chibi | ちびキャラ | 2〜3頭身のデフォルメ。写実的な低身長には使わない |
| dwarf | ドワーフ | ファンタジーの種族。人間の低身長ではない |
| tall | 高身長 | 低身長の絵ではネガティブ側 |

cm の数字（例: 150cm）は、モデルが実寸として守るとは限りません。小さい数字ほど低く、という相対のヒントにはなることがあります。数字だけに頼らず、\`petite\` と全身構図を先に書いてください。

\`shortstack\` は「背が低く、胸が大きい」方向に体の比率を動かしやすいタグです。控えめな大人の小柄には使わず、\`petite\` と \`slim\` を組み合わせてください。`,
      },
      {
        title: '大人だと分かるマーカー',
        content: `アニメ系モデルは、何も書かないと若い顔に寄ります。低身長タグを足すと、その寄りがさらに強くなります。人数の直後に、成人であることを一つ書いてください。

| 英語タグ | 意味 |
|---|---|
| adult woman | 大人の女性。人数と成人を同時に固定しやすい |
| adult man | 大人の男性 |
| young adult | 若い大人。20代の顔に寄せる |
| 20s | 20代。年齢の数字より世代として読まれやすい |
| 25-years-old | 25歳前後の目安。厳密な年齢ではない |
| adult | 成人。性別タグと一緒に |
| adult face | 大人の顔立ち |
| defined jawline | 輪郭をはっきりさせる。幼い丸顔を抑える補助 |

服装は大人の服にします。ニット、コート、シャツ、スラックス、ワンピース、スーツ。学生服やセーラー服は、低身長タグと一緒にすると学生に見えやすいので、このページの例には入れません。衣装としてのセーラー服は [コスプレプロンプト](/guides/cosplay-prompt-guide) 側の話題です。

やってはいけない書き方:

- 年齢を下げて身長を下げる。\`petite\` の代わりに若い年齢を書かない。
- \`girl\` や \`boy\` だけで成人を省略する。モデルによっては未成年の見た目に寄ります。Danbooru 系で人数タグが必要なときは、\`1girl\` に \`adult\` を必ず添え、下のネガティブを入れます。
- \`tiny\` と \`chibi\` を同時に強くする。頭身がデフォルメになります。`,
      },
      {
        title: '身長が見える構図',
        content: `バストアップでは脚の長さが画面にないので、低身長タグはほぼ無視されます。全身か、膝から上が最低ラインです。

| 英語タグ | 役割 |
|---|---|
| full body | 全身。低身長を確認する基本 |
| standing | 立っている。比較しやすい |
| looking up | 上を見る。背の低さが表情に出る |
| from above | 少し見下ろす。やりすぎると頭が大きくなる |
| doorway | ドア枠。身長の物差しになる |
| kitchen counter | カウンター。腰の高さが分かる |
| sitting on a tall chair | 足が床に届きにくい。小柄さが出る |
| legs dangling | 座って足が浮く |
| next to a door | ドアと並べる |
| cowboy shot | 膝上。全身より身長は伝わりにくい |

一人で伝わらないときは、もう一人の大人を高く置きます。その書き方は [身長差プロンプト](/guides/height-difference-pair-prompt) です。数値とポーズをフォームで組み立てるなら [身長差メーカー](/tools/height-difference-maker) を使ってください。

見下ろしを強くしすぎると、低身長ではなく広角のパースになります。\`from above\` は弱く、\`full body\` を主にしてください。アングルの単語は [下からのアングル](/guides/low-angle-prompt-guide) と [見下ろす構図・俯瞰](/guides/high-angle-prompt-guide) にまとめてあります。低身長の確認にはローアングルは向きません。`,
      },
      {
        title: '体型と組み合わせる',
        content: `低身長と体型は別の軸です。\`petite\` だけだと細身にも、頭が大きくなる方向にも振れます。体型は一つだけ足します。

| 意図 | 英語タグ |
|---|---|
| 細身の小柄 | petite, slim |
| すらりとした小柄 | petite, slender |
| 普通体型の低身長 | petite, average build |
| 筋肉のある低身長 | petite, athletic, short stature |
| 丸みのある小柄 | petite, plump |
| 脚の比率で低く見せる | petite, short legs |

体型を盛りすぎると身長タグが負けます。まず \`petite, full body\` で高さを確認し、そのあと体型を一つ足す、という順が崩れにくいです。筋肉や丸みの単語の一覧は [体型プロンプト](/guides/body-type-prompt-guide) です。`,
      },
      {
        title: 'コピペ例（すべて成人）',
        content: `品質タグはモデルに合わせて削ってください。ここにあるのは身長と成人の指定です。

**大人の小柄・全身**

\`\`\`
1 adult woman, young adult, 20s, petite, short stature,
slim, standing, full body, next to a doorway,
looking up, casual knit sweater, long skirt, soft daylight
\`\`\`

**大人の低身長の男性**

\`\`\`
1 adult man, 25-years-old, adult, petite, short stature,
average build, standing, full body, hands in pockets,
coat, city street, overcast
\`\`\`

**高い椅子に座る**

\`\`\`
1 adult woman, young adult, petite, small frame,
sitting on a tall chair, legs dangling, full body,
cafe, window light, blouse, trousers
\`\`\`

**カウンターと比較する**

\`\`\`
1 adult woman, adult, petite, short stature, slim,
standing at a kitchen counter, the counter reaches her chest,
full body, indoors, casual clothes, warm lamp
\`\`\`

二人にして差を見せる例は、このページでは置きません。[身長差メーカー](/tools/height-difference-maker) で高い人と低い人を選んでください。`,
      },
      {
        title: 'ネガティブプロンプト',
        content: `低身長が普通の身長に戻るときは、高身長側の単語をネガティブに入れます。顔や体が子どもに寄るときは、子ども側の単語をネガティブに入れます。両方を同時に入れてください。

\`\`\`
${NEGATIVE_BODY}, tall, towering, long legs, leggy, giant,
${NEGATIVE_CHILD}, chibi, school uniform
\`\`\`

\`school uniform\` をネガティブに入れるのは、学生服が未成年の見た目を引っ張るためです。大人の服をポジティブに書いたうえで除外します。

うまく出ないときの順番です。

1. \`petite\` を人数の直後に移す。
2. 構図を \`full body, standing\` にし、ドアかカウンターを一つ足す。
3. \`adult woman\` または \`adult man\` を入れる。
4. ネガティブに \`tall, long legs\` と、上の子ども向けタグを入れる。
5. 重みは \`(petite:1.2)\` から一つだけ。1.4 を超えると頭身が崩れやすくなります。数字は目安です。
6. \`chibi\` や \`tiny\` をポジティブから外す。

デフォルメのちびキャラが欲しいときだけ \`chibi\` を使い、このページの低身長例とは混ぜません。`,
      },
    ],
    faq: [
      { q: 'petite と short stature はどちらを使いますか？', a: 'まず `petite` です。まだ背が低くならないときに `short stature` を足します。`short` 単独は髪や袖と混ざるので、身長の意味では使わないでください。' },
      { q: '150cm と書けばその身長になりますか？', a: 'なりません。cm は実寸として守られないことが多く、相対的なヒントどまりです。`petite`、`full body`、ドアやカウンターとの比較を先に書いてください。' },
      { q: '低身長にすると顔が子どもっぽくなります', a: '低身長タグは若い顔に寄りやすいです。`adult woman` または `adult man` と `young adult` を人数の直後に置き、ネガティブに `child, kid, toddler, baby, loli, shota, teen, underage, baby face` を入れてください。年齢を下げる書き方は使わないでください。' },
      { q: 'ちびキャラと低身長の違いは？', a: '`chibi` は頭が大きく体が小さいデフォルメです。写実的な低身長には `petite` と `short stature` を使い、`chibi` はネガティブに回します。' },
      { q: '二人の身長差はこのページで書けますか？', a: '一人の低身長がこのページです。二人の差は [身長差プロンプト](/guides/height-difference-pair-prompt) と [身長差メーカー](/tools/height-difference-maker) を使ってください。' },
    ],
  },

  'kiss-prompt-guide': {
    sections: [
      {
        title: 'このページのキスは、大人のロマンチック表現だけ',
        content: `「キス プロンプト」「キス顔」「プロンプト キス」向けに、頬・額・手・結婚式・キス待ちの顔・相手目線（POV）をまとめます。性的なキスは扱いません。舌、開いた口での深いキス、首や体へのキスの書き方は載せていません。登場人物は **大人だけ** です。

キスには二種類あります。二人の顔が触れるキスと、一人がカメラに向かって口をすぼめるキス待ちの顔です。検索語の「キス顔」は後者を指すことが多いです。

表情の単語は [表情プロンプト](/guides/stable-diffusion-expression-prompt)、二人の距離感は [カップルポーズ](/guides/two-person-composition-prompt-guide)、背の差で届かせる構図は [身長差プロンプト](/guides/height-difference-pair-prompt) です。タグの一覧は [キス](/tag/キス) です。`,
      },
      {
        title: '二人のキスの基本',
        content: `\`kiss\` だけでは、どちらを向いているかが決まらず、顔が横を向いたまま唇だけが近づくことがあります。向き、目、人数をセットにします。

| 英語タグ | 意味 | 使いどころ |
|---|---|---|
| kiss | キス | 基本。これだけでは種類は決まらない |
| face-to-face | 向かい合う | 二人のキスの土台 |
| closed eyes | 目を閉じる | 入れないと目が開いたままになりやすい |
| from side | 横から | 両方の横顔が見え、顔が溶けにくい |
| profile | 横顔 | from side より顔の輪郭を指定する |
| couple | 二人の関係 | 雰囲気。ポーズそのものではない |
| blush | 赤面 | 照れ。服の色に赤が乗るときは重みを下げる |
| upper body | 上半身 | 顔と手が画面に残る |
| close-up | 顔のアップ | 唇は見えるが、手が画面外に出やすい |

人数は \`1 adult woman and 1 adult man\`、\`2 adult women\`、\`2 adult men\` のように成人で書きます。Danbooru 系のモデルは \`1girl\` や \`1boy\` の人数タグに反応しやすいので、使う場合は \`adult\` を添え、子ども向けタグをネガティブに入れてください。

横からの構図の単語は [下からのアングル](/guides/low-angle-prompt-guide) にもあります。キスではローアングルより \`from side\` を優先します。`,
      },
      {
        title: '頬・額・手・結婚式・キスの直前',
        content: `種類は一つだけ足します。二つ同時に強くすると、頬にキスしているのに額がくっつく、という絵になります。

| 英語タグ | 意味 |
|---|---|
| kissing cheek | 頬にキス |
| kissing forehead | 額にキス |
| kissing hand | 手にキス |
| imminent kiss | 唇が触れる直前 |
| after kiss | キスの直後。唇はすでに離れている |
| blowing kiss | 投げキッス。接触しない |
| double cheek kiss | 両頬への挨拶のキス |
| wedding | 結婚式の場面 |
| wedding dress | 婚礼衣装 |
| veil | ベール |
| tuxedo | タキシード |
| tiptoe | つま先立ち。背が届かない側に足す |
| height difference | 身長差。つま先立ちと一緒に使う |

背が届かないキスは、低い側に \`tiptoe\`、高い側がかがむことを一文で書きます。差そのものの調整は [身長差メーカー](/tools/height-difference-maker) です。壁に手をついて顔を近づける構図は [壁ドンプロンプト](/guides/kabedon-prompt-guide) に分けてあります。

このページでは使わないタグ: \`french kiss\`、舌、唾液、首へのキス。閉じたロマンチックなキスにしたいときは、これらをネガティブに入れます。`,
      },
      {
        title: 'キス顔・キス待ち・POV',
        content: `キス顔は、二人目を描かずに「今からキスされる側」または「カメラに向かって口をすぼめた一人」を描く書き方です。\`kiss\` だけだと二人目が出現します。一人にしたいときは人数を 1 にし、ネガティブに二人目を入れます。

| 英語タグ | 意味 |
|---|---|
| incoming kiss | 画面のこちらへ向かってくるキス。POV 向き |
| imminent kiss | 触れる直前。二人でも一人でも使われる |
| puckered lips | 口をすぼめる |
| closed eyes | 目を閉じる |
| blush | 照れ |
| looking at viewer | カメラを見る |
| pov | 相手の目線 |
| portrait | 顔が画面の中心 |
| leaning forward | 前に傾く |
| hand on own cheek | 自分の頬に手を添える。キス待ちの仕草 |

\`tongue out\` や開いた口は、このページのキス待ちには入れません。口は \`puckered lips\` か \`closed mouth\` にします。表情の隣接タグは [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。`,
      },
      {
        title: '手の位置',
        content: `キスの種類が決まったあとに、手を一つだけ指定します。指定しないと、手が顔にめり込んだり、増えた腕が肩と頬の両方を掴んだりします。

| 英語タグ | 意味 |
|---|---|
| hand on another's cheek | 相手の頬に手を添える |
| hand on another's shoulder | 相手の肩に手を置く |
| holding hands | 手をつないだまま |
| hands clasped | 両手を重ねる。額キスと相性が良い |
| arm around shoulder | 肩に腕を回す。頬キスの補助 |
| own hand near chest | キス待ちで自分の胸元に手を置く |

腕の回し方を主にした構図は [ハグプロンプト](/guides/hug-prompt-guide) です。キスとハグを同時にフルで指定すると、顔と腕の両方が崩れやすくなります。主をキス、手は上の表から一つ、にしてください。`,
      },
      {
        title: 'コピペ例',
        content: `すべて成人で、服を着た状態です。品質タグはモデルに合わせて足してください。

**頬キス**

\`\`\`
1 adult woman and 1 adult man, couple, kissing cheek,
face-to-face, closed eyes, blush, from side, upper body,
fully clothed, soft daylight
\`\`\`

**額キス**

\`\`\`
2 adults, kissing forehead, closed eyes, gentle smile,
hands clasped, from side, upper body, fully clothed,
warm indoor light
\`\`\`

**手へのキス**

\`\`\`
1 adult man and 1 adult woman, kissing hand,
both standing, full body, formal clothes, from side,
calm expressions, indoor daylight
\`\`\`

**結婚式**

\`\`\`
1 adult bride and 1 adult groom, wedding, kiss,
wedding dress, veil, tuxedo, closed eyes, face-to-face,
from side, full body, garden, soft daylight
\`\`\`

**キス待ちの顔（一人）**

\`\`\`
1 adult woman, young adult, incoming kiss, puckered lips,
closed eyes, blush, looking at viewer, portrait,
closed mouth, fully clothed
\`\`\`

**POV**

\`\`\`
1 adult, pov, incoming kiss, leaning forward,
puckered lips, closed eyes, blush, portrait, fully clothed
\`\`\`

つま先立ちで届かせる二人は、[身長差プロンプト](/guides/height-difference-pair-prompt) のキス構図に、このページの \`kissing forehead\` か \`kiss\` を一つ足してください。`,
      },
      {
        title: '顔が溶けるときと、ネガティブ',
        content: `二人の顔が近いと、目が四つになったり、口がつながったりします。\`from side\` にすると輪郭が分かれやすくなります。アップにしすぎたときも同じです。

\`\`\`
${NEGATIVE_BODY}, extra faces, multiple heads, fused faces,
${NEGATIVE_CHILD}, french kiss, tongue, saliva, open mouth
\`\`\`

キス待ちを一人に保つときは、さらに \`2people, second person, extra person\` をネガティブに足します。

うまく出ないときの順番です。

1. 種類を一つにする（頬なら \`kissing cheek\` だけ）。
2. \`from side\` と \`closed eyes\` を足す。
3. 人数を成人の書き方で固定する。
4. 手は一つだけ。
5. 上のネガティブを入れる。
6. それでも二人目が出るキス待ちは、\`kiss\` を外して \`incoming kiss, puckered lips\` だけにする。

公開作例の二人構図は [カップルポーズ](/guides/two-person-composition-prompt-guide) から辿れます。`,
      },
    ],
    faq: [
      { q: 'キス顔と、二人のキスは同じタグですか？', a: '同じではありません。二人の接触は `kiss` か `kissing cheek` のように場所を書きます。一人のキス待ちは `incoming kiss` と `puckered lips` を使い、ネガティブに二人目を入れてください。' },
      { q: '目が開いたままになります', a: '`closed eyes` をキスのタグの直後に置いてください。`looking at viewer` と同時に強くすると目が開きやすいので、二人のキスでは `looking at viewer` を外します。POV の一人絵では残してかまいません。' },
      { q: 'フレンチキスはなぜ例がありませんか？', a: 'このページは頬、額、手、結婚式、キス待ち、POV のロマンチックな表現だけを扱います。舌や開いた口のキスはポジティブに書かず、閉じたキスにしたいときのネガティブに `french kiss, tongue, saliva` を入れます。' },
      { q: '背が届きません', a: '低い側に `tiptoe`、高い側がかがむことを書き、`height difference` を一つ足します。数値で組みたいときは [身長差メーカー](/tools/height-difference-maker) を使ってください。' },
      { q: '子どもに見える二人になってしまいます', a: '人数を `adult woman` `adult man` で書き、ネガティブに `child, kid, toddler, baby, loli, shota, teen, underage, baby face` を入れてください。学生服はこのページの例と組み合わせません。' },
    ],
  },

  'hug-prompt-guide': {
    sections: [
      {
        title: 'ハグは、誰が誰のどこに腕を回すかで決まる',
        content: `「ハグ プロンプト」「抱き合う」「バックハグ」「後ろから抱きつく」は、腕の位置を書かないと、ただ二人が近く立っている絵になります。\`hug\` を入れたうえで、腰・背中・肩・首のどれに腕を回すかを一つ指定してください。

このページは服を着た大人のハグです。カップル、友人、大人の家族（大人のきょうだい、大人の親子）を扱います。未成年の見た目はネガティブに回します。

二人の構図全般は [カップルポーズ](/guides/two-person-composition-prompt-guide)、後ろからの作例は [BL カップルの後ろからハグ](/prompt/bl-couple-hug-from-behind)、ポーズの基礎は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。壁に手をつく近い距離は [壁ドンプロンプト](/guides/kabedon-prompt-guide)、タグの一覧は [ハグ](/tag/ハグ) です。`,
      },
      {
        title: 'ハグの種類',
        content: `Danbooru 系では \`hug\` が基本で、\`hugging\` や \`embrace\` は近い意味として使われます。種類は一つにします。

| 英語タグ | 意味 | 補足 |
|---|---|---|
| hug | 抱きしめる | 最初の一手 |
| mutual hug | お互いが抱き返す | 両方が腕を回している |
| hug from behind | 後ろから抱きつく | バックハグ。横顔が見える角度とセット |
| waist hug | 腰に腕を回す | 腕の高さを腰に固定しやすい |
| arm hug | 腕や肩に抱きつく | 体の正面まで密着しない。成功率はモデル依存 |
| side hug | 横から肩を抱く | 友人向き。正面の密着より弱い |
| imminent hug | 抱きつく直前 | まだ腕が届いていない |
| incoming hug | 画面のこちらへ抱きついてくる | 一人が前に出る |
| group hug | 三人以上 | 人数を別に書かないと三人に寄りやすい |
| cheek-to-cheek | 頬を寄せる | ハグと併用すると顔の位置が決まる |
| heads together | 頭を寄せる | 密着の補助 |
| head on shoulder | 肩に頭を預ける | 座ったハグと相性が良い |
| glomp | 飛びつく | 動きが大きい。腕が増えやすい |
| standing | 立ったまま | 全身で確認する |
| sitting | 座って | ソファと書くと場所が決まる |
| princess carry | お姫様抱っこ | ハグではない。混同しやすいので同時に強くしない |

お姫様抱っこの構図は [カップルポーズ](/guides/two-person-composition-prompt-guide) にあります。足が地面から離れる書き方は [お姫様抱っこプロンプト](/guides/princess-carry-prompt-guide)、指を絡める恋人繋ぎは [恋人繋ぎ・手をつなぐプロンプト](/guides/hand-holding-prompt-guide) です。このページの例は、足が地面かソファにあるハグに限っています。`,
      },
      {
        title: '腕を回す位置',
        content: `腕タグは「片腕」と「両腕」で別です。\`arm\` は片腕、\`arms\` は両腕、として書かれることが多いです。欲しいのは通常、両腕です。

| 英語タグ | 意味 |
|---|---|
| arms around waist | 両腕を腰に回す |
| arm around waist | 片腕を腰に回す |
| arms around back | 両腕を背中に回す |
| arm around back | 片腕を背中に回す |
| arms around shoulder | 両腕を肩に回す |
| arm around shoulder | 片腕を肩に回す。横からの友人ハグ |
| arms around neck | 両腕を首に回す |
| arm around neck | 片腕を首に回す |
| hands on another's back | 相手の背中に手を置く |
| hands resting on the arms around one's waist | 腰に回された腕の上に、前の人の手を重ねる |
| chin on shoulder | 肩のあたりに顎をのせる。バックハグの補助 |

一箇所だけにしてください。\`arms around neck, arms around waist\` を同じ強さで書くと、腕が二組できます。

指まで指定すると手は崩れやすくなります。まず腕の高さだけを決め、指はネガティブで守ってください。手の基礎は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。`,
      },
      {
        title: 'バックハグ・後ろから抱きつく',
        content: `\`hug from behind\` だけだと、二人ともカメラに背を向けることがあります。\`behind\` が「後ろ姿」として読まれるためです。横から見て、前にいる人の顔と、後ろの人の腕が両方分かるようにします。

入れるものは次の四つです。

1. \`hug from behind\`
2. \`arms around waist\`（後ろの人の腕）
3. \`from side\` または \`three-quarter view\`
4. 前の人の反応を一つ（\`hands resting over the other person's hands\`、\`leaning back\`、\`closed eyes\` のどれか）

顔を両方見せたいときは \`from side\` を優先し、\`from behind\` というカメラタグは足しません。カメラの \`from behind\` とポーズの \`hug from behind\` は別の語です。

作例は [BL カップルの後ろからハグ](/prompt/bl-couple-hug-from-behind) です。身長差を足すなら [身長差プロンプト](/guides/height-difference-pair-prompt) の「高い人が低い人を包む」構図と組み合わせてください。`,
      },
      {
        title: 'カップル・友人・大人の家族',
        content: `同じ \`hug\` でも、関係の単語で距離と表情が変わります。関係は一つだけ書きます。

| 関係 | 英語タグ | 距離の目安 |
|---|---|---|
| カップル | couple, romantic | 腰か背中に両腕。顔が近い |
| 友人 | friends, casual | 肩に片腕。全身で並ぶ |
| 大人のきょうだい | adult siblings, family | 肩か背中。明るい表情 |
| 大人の親子 | adult parent and adult child, family | 肩に腕。二人とも成人と書く |
| 仲間 | teammates, side hug | 肩を組む程度 |

家族に子どもを混ぜないでください。\`adult parent and adult child\` は、子どもに見えない大人二人、という意味で使います。\`child\` はネガティブに入れます。

服装を関係に合わせると安定します。カップルは私服かフォーマル、友人はカジュアル、家族は部屋着。服を書かないと、モデルが体の接触だけで画面を埋めます。必ず \`fully clothed\` を入れてください。`,
      },
      {
        title: 'コピペ例',
        content: `**向かい合って抱き合う**

\`\`\`
1 adult woman and 1 adult man, couple, mutual hug,
arms around back, closed eyes, standing, full body,
fully clothed, from side, soft daylight
\`\`\`

**バックハグ**

\`\`\`
2 adults, couple, hug from behind, arms around waist,
from side, the front person leaning back slightly,
hands resting over the arms at the waist, upper body,
fully clothed, warm indoor light
\`\`\`

**友人の肩ハグ**

\`\`\`
2 adults, friends, side hug, arm around shoulder,
standing, full body, fully clothed, casual clothes,
both smiling, city street, daytime
\`\`\`

**大人のきょうだい**

\`\`\`
2 adults, adult siblings, family, hug,
arms around shoulder, standing, full body,
fully clothed, living room, soft daylight, gentle smile
\`\`\`

**座って、頭を預ける**

\`\`\`
2 adults, couple, sitting on a sofa, hug,
head on shoulder, arms around shoulder, fully clothed,
upper body, warm lamp, closed eyes
\`\`\`

三人以上は \`group hug\` と人数（\`3 adults\`）を両方書き、ネガティブに \`extra person\` は入れません。人数が足りないときだけ、人数タグの重みを 1.2 にしてください。`,
      },
      {
        title: '腕が増えるときと、ネガティブ',
        content: `ハグで一番多い失敗は腕の本数です。ポジティブで腕の高さを一つに決め、ネガティブで余分な腕と、子ども向けの見た目を外します。

\`\`\`
${NEGATIVE_BODY}, missing arms, fused arms, extra hands,
conjoined, merged bodies, ${NEGATIVE_CHILD}
\`\`\`

症状ごとの直し方です。

- 二人とも背中しか見えない: \`from side\` を足し、カメラの \`from behind\` を外す。
- 腕が腰と首の両方にある: 腕タグを一つに減らす。
- 前の人の手が消える: \`hands resting over the arms at the waist\` を一文で足す。タグを増やしすぎない。
- 体が溶けて一人に見える: \`2 adults\` を先頭に戻し、\`from side, full body\` にする。
- 子どもに見える: \`adult\` を人数の直後へ。上のネガティブを確認する。
- お姫様抱っこになる: \`princess carry, carrying, feet off the ground\` をネガティブに入れる。

重みは \`(hug from behind:1.2)\` から試し、腕タグと同時に 1.4 へ上げないでください。上げるのは一つだけです。`,
      },
    ],
    faq: [
      { q: 'hug と hug from behind はどう使い分けますか？', a: '正面や横から抱き合うときは `hug` または `mutual hug` です。後ろから回り込むときは `hug from behind` と `arms around waist` と `from side` をセットにしてください。`behind` だけだと後ろ姿になります。' },
      { q: 'arm around waist と arms around waist の違いは？', a: '`arm` は片腕、`arms` は両腕として使われることが多いです。通常のハグは `arms around waist` か `arms around back` を一つ選んでください。両方同時には書きません。' },
      { q: '友人とカップルでタグを変える必要はありますか？', a: '変えた方が距離が安定します。カップルは `couple` と腰か背中、友人は `friends` と `arm around shoulder` です。関係タグを二つ重ねないでください。' },
      { q: '家族のハグに子どもを描けますか？', a: 'このページでは描きません。大人のきょうだい、または大人の親子として `adult` を書き、ネガティブに `child, kid, toddler, baby, loli, shota, teen, underage, baby face` を入れてください。' },
      { q: '既存のバックハグ作例はどこにありますか？', a: '[BL カップルの後ろからハグ](/prompt/bl-couple-hug-from-behind) が公開プロンプトです。二人構図の他のポーズは [カップルポーズ](/guides/two-person-composition-prompt-guide) にまとめてあります。' },
    ],
  },

  'dark-room-prompt-guide': {
    sections: [
      {
        title: '暗い部屋は、場所と光を分けて書く',
        content: `「暗い部屋 プロンプト」「薄暗い部屋」「暗い雰囲気」は、\`dark\` 一語では足りません。\`dark\` は服の色、髪、雰囲気、夜の屋外にも付きます。部屋であることを先に書き、そのあと光の量を書いてください。

このページは室内の暗さです。場所の一覧そのものは [背景プロンプト](/guides/background-prompt-guide)、暗さのタグ一覧は [暗い](/tag/暗い) です。人物を置く例は服を着た大人にしています。光の向き・影の一覧は [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

暗さは四段で足します。場所、光の量、光源、影。四つを一度に盛りすぎると、何が暗くしているのか分からなくなります。まず場所と光源を一つずつです。`,
      },
      {
        title: '暗さの強さ',
        content: `真っ黒と、物が見える薄暗さは別のタグです。部屋の中身を残したいなら \`dimly lit\` から始めてください。

| 英語タグ | 意味 | 向く場面 |
|---|---|---|
| dark room | 暗い部屋 | 場所が部屋であることを同時に指定 |
| dark interior | 暗い室内 | 部屋の種類を別に書くとき |
| dimly lit | 薄暗い | 家具や顔を残したいとき |
| dimly lit room | 薄暗い部屋 | dark room よりディテールが残りやすい |
| dim lighting | 抑えた照明 | 光源とセットで使う |
| low light | 低照度 | 光量そのもの |
| low key lighting | ローキー | 暗い中に明るい一点を残す |
| chiaroscuro | 強い明暗 | 顔の半分が影になりやすい |
| heavy shadows | 濃い影 | 影の量。光源がないと黒く潰れる |
| deep shadows | 深い影 | heavy shadows に近い |
| dark atmosphere | 暗い雰囲気 | 場所は変わらない。部屋の指定は別 |
| moody lighting | 雰囲気のある光 | 単独だと暗さが足りないことがある |
| silhouette | シルエット | 顔の情報はほぼ消える |
| night | 夜 | 時間。室内とは限らない |

\`dark atmosphere\` だけだと、明るい部屋のまま色が渋くなることがあります。部屋タグとセットにしてください。

明るさの反対語はネガティブに回します。ポジティブに \`sunlight\` や \`bright room\` を残すと、暗い部屋タグが負けます。`,
      },
      {
        title: '光源を一つにする',
        content: `暗い部屋が「ただ灰色」になるのは、光がどこから来るかが書いていないときです。光源は一つ。補助が欲しくなったら、主の光源が決まってから二つ目を弱く足します。

| 英語タグ | 意味 |
|---|---|
| single light source | 光源が一つ |
| small lamp | 小さなランプ |
| desk lamp | デスクライト |
| lamp light | ランプの光 |
| warm lamp light | 暖色のランプ |
| candlelight | ろうそく |
| fireplace | 暖炉 |
| moonlight through window | 窓からの月明かり |
| window light | 窓光。夜と書かないと昼になる |
| streetlight through blinds | ブラインド越しの街灯 |
| screen glow | 画面の光 |
| phone screen light | 電話の画面 |
| neon light through window | 窓の外のネオン |
| rim lighting | 輪郭光。人物を背景から離す |
| edge light | 端に当たる光。rim lighting に近い |
| volumetric light | 光の筋。強くすると霧で濁る |
| practical light | 画面内の実在する照明器具 |

月明かりと暖色ランプを同じ強さで書くと、色が混ざって茶色くなりやすいです。色温度は一つにしてください。色の分け方は [色プロンプト](/guides/color-prompt-guide) です。`,
      },
      {
        title: '雰囲気と、部屋の種類',
        content: `雰囲気語は光源のあとです。先に置くと、部屋より色味だけが変わります。

| 意図 | 英語タグ |
|---|---|
| 静かな夜 | quiet, calm, night |
| 落ち着いた室内 | cozy, dimly lit, warm lamp light |
| 映画のワンシーン | cinematic lighting, low key lighting |
| 孤独 | alone, quiet room, single chair |
| 雨の夜 | rain on window, night, indoors |
| ミステリー | low key lighting, single light source |
| 作業机 | desk, desk lamp, papers |

部屋の種類は [背景プロンプト](/guides/background-prompt-guide) の室内一覧から一つ選びます。寝室なら \`bedroom\`、居間なら \`living room\`。\`dark room, bedroom, cafe\` のようには書きません。

ホラーや怪我、血を連想させる単語はこのページでは使いません。暗さは照明の問題として書きます。`,
      },
      {
        title: '黒つぶれと、濁った色を避ける',
        content: `\`dark\` を重ねるほど、壁も顔も同じ黒になります。見えなくなった絵は「暗い」のではなく、階調が潰れています。残すものは、輪郭光と、名前の付いた光源です。

濁って見えるときの典型は次です。

- 暖色と寒色の光源が同じ強さで喧嘩している。
- \`volumetric light\` と \`fog\` と \`dark\` が同時にかかり、全体が灰色の霧になる。
- \`extremely dark, pure black, pitch black\` で情報を消している。
- 品質タグだけが強く、光のタグがない。モデルは平均的な明るさに戻します。
- ネガティブに \`dark\` が入っている。意図と逆です。

直し方は、ポジティブを \`dimly lit room, desk lamp, rim lighting\` のように短くし、ネガティブで昼光と、濁りだけを外すことです。

\`\`\`
sunlight, daylight, bright room, overexposed, flash,
flat lighting, muddy colors, fog, haze
\`\`\`

モノクロにしたいときだけ \`monochrome\` をポジティブに入れ、そのときはネガティブから色の禁止を外します。

プロンプトを増やしても黒が引き締まらないモデルはあります。学習時に暗い階調を足す手法として noise offset が知られていて、モデルカードにその旨が書かれたチェックポイントがあります。このページでは学習手順は扱いません。使うモデルのカードを確認してください。`,
      },
      {
        title: 'コピペ例',
        content: `人物を置く例は成人で、服を着ています。背景だけにしたいときは [背景プロンプト](/guides/background-prompt-guide) の「背景だけ」のネガティブを使ってください。

**デスクライトの薄暗い部屋**

\`\`\`
dimly lit room, bedroom, single light source, desk lamp,
warm lamp light, soft shadows, night, indoors,
1 adult, fully clothed, sitting at a desk, upper body,
rim lighting
\`\`\`

**月明かりの居間**

\`\`\`
dark living room, moonlight through window, dimly lit,
cool light, quiet, night, 1 adult, fully clothed,
standing, full body, looking at the window
\`\`\`

**ローキーのポートレート**

\`\`\`
dark room, low key lighting, single light source,
rim lighting, 1 adult, fully clothed, portrait,
calm expression, black background barely showing the wall
\`\`\`

**雨の窓と画面の光**

\`\`\`
dimly lit bedroom, night, rain on window,
screen glow on the face, 1 adult, fully clothed,
sitting, upper body, quiet
\`\`\`

**人物なしの暗い室内**

\`\`\`
empty dark room, dimly lit, one small lamp,
wooden floor, night, indoors, scenery, no people
\`\`\`

人物なしのネガティブには \`person, people, 1girl, 1boy, face\` を足します。人物に強いモデルでは消え残ることがあります。`,
      },
      {
        title: 'ネガティブと、明るさに戻るとき',
        content: `昼に戻るときは、明るい光源をネガティブに集めます。人物を残す例では、顔の欠陥用も足します。

\`\`\`
${NEGATIVE_BODY}, sunlight, daylight, bright room,
overexposed, flash, flat lighting, muddy colors,
outdoor, blue sky
\`\`\`

症状ごとの直し方です。

- 昼間の窓になる: \`night, indoors\` を場所の前へ。ネガティブの \`sunlight, daylight\` を確認する。
- 服だけが黒くなる: \`dark room\` を足し、\`dark clothes\` や \`black dress\` を外す。
- 顔が見えない: \`dimly lit\` に弱め、\`rim lighting\` を一つ足す。\`pitch black\` を外す。
- 色が茶色く濁る: 光源を暖色か寒色のどちらか一つにする。ネガティブに \`muddy colors\`。
- 屋外の夜道になる: \`indoors, room\` を先頭に。ネガティブに \`street, outdoors\`。
- 霧で全体が灰色: \`volumetric light, fog, haze\` を外す。

背景の他の場所へ切り替えるときは [背景プロンプト](/guides/background-prompt-guide) に戻って、場所を一つだけ残してください。`,
      },
    ],
    faq: [
      { q: 'dark room と dimly lit room の違いは？', a: '`dark room` は暗い部屋そのものです。家具や顔が潰れやすいときは `dimly lit room` に変えて、ランプか窓の光を一つ足してください。' },
      { q: 'dark と書いたのに服の色だけが黒くなります', a: '`dark` は色にも付きます。`dark room` または `dimly lit room` と、部屋の種類（bedroom など）を書き、服の色は別に指定してください。' },
      { q: '全体が灰色で濁ります', a: '光源を一つに減らし、暖色と寒色を混ぜないでください。`rim lighting` で人物の輪郭だけを残し、ネガティブに `muddy colors, fog, flat lighting` を入れます。' },
      { q: 'ネガティブに dark を入れてもよいですか？', a: '暗い部屋が目的なら入れないでください。ネガティブに入れるのは `sunlight, daylight, bright room, overexposed` です。' },
      { q: '背景だけの暗い部屋はどこで書けばよいですか？', a: '場所の選び方は [背景プロンプト](/guides/background-prompt-guide) です。このページの「人物なし」の例に、人を消すネガティブを足してください。タグの一覧は [暗い](/tag/暗い) です。' },
    ],
  },

  'illustrious-prompt-guide': {
    sections: [
      {
        title: 'Illustrious XL は、SDXL のイラスト向けモデル',
        content: `Illustrious（Illustrious XL）は、OnomaAI が Stable Diffusion XL を基に学習したイラスト向けモデルです。公開されているモデルカードで確認できる範囲だけを、このページでは事実として書きます。チェックポイントごとに差がある部分は、一般的な書き方として分けて書きます。

<a href="https://huggingface.co/OnomaAIResearch/Illustrious-xl-early-release-v0" class="text-sky-600 hover:underline">v0.1 の Hugging Face カード</a>では、Kohaku XL Beta 5 から続けて学習し、データセットは Danbooru2023 だと説明されています。基本モデルには決まった画風がなく、それは意図した挙動だと書かれています。

<a href="https://huggingface.co/OnomaAIResearch/Illustrious-XL-v1.0" class="text-sky-600 hover:underline">v1.0 のカード</a>では、v0.1 から学習したこと、Danbooru 形式のタグと自然言語の両方を扱えること、ネイティブ解像度として 1536×1536 を挙げ、512×512 から 1536×1536 まで（例として 1248×1824）を追加学習なしで扱える、と書かれています。知識の時点は 2024年6月まで、学習時期は 2024年7月、とカードにあります。

<a href="https://huggingface.co/OnomaAIResearch/Illustrious-XL-v1.1" class="text-sky-600 hover:underline">v1.1 のカード</a>では、v1.0 の続きで、自然言語をより重視して安定化させたモデルだと説明されています。知識のカットオフは 2024年7月まで、と書かれています。

v0.1 カードの更新文には、v0.1（2024年5月に学習）、v1.0（2024年7月）、v1.1（2024年8月）、v2.0（2024年9月）、v3（2024年11月）、v-parameterization の v3.5、という名前が並んでいます。v2 以降のプロンプト仕様はこのページではカード本文を確認できていないので、書きません。読み込んだファイルのモデルカードを見てください。

Stable Diffusion 全般の書き方は [Stable Diffusion プロンプト](/guides/stable-diffusion-prompt-guide)、ネガティブの基礎は [ネガティブプロンプト](/guides/negative-prompt-guide) です。`,
      },
      {
        title: 'タグの順番は、公式の固定順ではない',
        content: `v0.1 カードの公開作例は、\`1boy\` や \`1girl\` から始まり、品質タグは付いていないか、末尾の \`masterpiece\` だけです。カードは「品質タグを先頭に置け」とは書いていません。

一方で、Illustrious 系のファインチューンでは、品質タグを先頭、構図を末尾にする書き方が広く使われています。順番を変えても結果がほぼ変わらなかった、という公開の比較もあります。それは特定のファインチューンとシードの話で、すべてのチェックポイントの仕様ではありません。

編集しやすい並びとして、このページのテンプレは次の順にしています。公式の必須順ではなく、直すときにどこを触るか分かるように分けたものです。

1. 人数（\`1girl\` や \`1boy\`）。成人を描くなら \`adult\` を添える。
2. 髪・目など、見た目のタグ。
3. 服装。
4. ポーズと表情。
5. 場所と光。
6. 構図（\`upper body\`、\`portrait\`、\`full body\` のいずれか）。
7. 品質タグ。ファインチューンのカードが先頭を推奨しているなら、そこへ移す。

v0.1 カードは、\`close-up\`、\`upside-down\`、\`cowboy shot\` を使いすぎないよう書っています。互いにぶつかって結果が乱れる、という理由です。同じカードは、用途に応じて \`upper body\`、\`cowboy shot\`、\`portrait\`、\`full body\` のいずれかを使うよう勧めています。全部は同時に入れません。`,
      },
      {
        title: '品質タグ',
        content: `v0.1 カードが対応していると書いている品質タグは、\`worst quality\`、\`bad quality\`、\`average quality\`、\`good quality\`、\`best quality\`、\`masterpiece (quality)\` です。括弧付きの表記はカードの文言どおりです。同じカードの作例では、括弧なしの \`masterpiece\` が末尾に置かれています。括弧を付けるかどうかは、実際に読み込んだチェックポイントの作例に合わせてください。

悪い側（\`worst quality\` や \`bad quality\`）は、ネガティブプロンプトに置くのがカードの作例です。ポジティブとネガティブの両方に同じ品質タグを入れないでください。

品質タグを何個も積むと良くなる、という仕様はカードにありません。ファインチューンによっては、品質タグの足しすぎと長すぎるネガティブが絵をぼかす、とモデルページに注意が書いてあります。読み込んだモデルのページにその注意があるなら、\`masterpiece, best quality\` 程度で止めてください。注意がないベースモデルでも、まずその二つから試し、足しても変わらなければ戻す、というやり方が安全です。

\`amazing quality\` や \`very aesthetic\` は、v0.1 カードの対応リストには含まれていません。一部のファインチューンの作例では使われています。ベースの仕様としてこのページでは推奨しません。モデル別の並びは [品質タグ一覧](/guides/quality-tags-prompt-guide) です。`,
      },
      {
        title: 'Danbooru タグと、自然言語',
        content: `v0.1 は Danbooru2023 で学習されている、とカードにあります。作例もカンマ区切りのタグです。具体的な名詞（髪、服、人数、構図）は、短いタグの方がこの世代には合いやすい、と考えてください。これはカードの学習データと作例からの読み方です。

v1.0 のカードは、平易な英語の文と、正確なタグと、その両方を使える、と書いています。v1.1 は自然言語をより重視した、と書いています。長い文章だけにすると、タグで固定したい服や人数が落ちることがあります。一般的な分け方は次です。

- タグにする: 人数、髪、服の名前、\`sitting\`、\`upper body\` のような決まった見た目。
- 短い文にする: タグにない状況。例: \`standing beside a door that reaches her shoulders\`。
- 混ぜるとき: 文は一つ。タグの列の途中に長い文を何本も挟まない。

NovelAI の波括弧（\`{tag}\`）は、Illustrious のカードには出てきません。Automatic1111 などの \`(tag:1.2)\` は UI の重み付けで、Illustrious 専用の機能ではありません。使うアプリの説明に従ってください。

アニメ寄りの顔の単語は [アニメプロンプト](/guides/anime-prompt-guide)、表情は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。`,
      },
      {
        title: 'ネガティブプロンプト',
        content: `v0.1 カードの作例に付いているネガティブは、次の並びです。カードからそのまま転記しています。

\`\`\`
worst quality, comic, multiple views, bad quality, low quality, lowres,
displeasing, very displeasing, bad anatomy, bad hands, scan artifacts,
monochrome, greyscale, signature, twitter username, jpeg artifacts,
2koma, 4koma, guro, extra digits, fewer digits
\`\`\`

モノクロの絵が欲しいときは \`monochrome, greyscale\` を外します。漫画のコマが欲しいときは \`comic, 2koma, 4koma, multiple views\` を外します。\`guro\` はカードの作例に含まれる、傷つけ合う表現を避けるための語です。このサイトのテンプレでも残しています。

短い実用版として、人物画では次を出発点にしてください。v0.1 の作例から、用途が限られる語を外した一般的な短縮です。

\`\`\`
worst quality, bad quality, low quality, lowres, bad anatomy, bad hands,
extra digits, fewer digits, signature, watermark, username, jpeg artifacts
\`\`\`

成人の人物では、さらに [年齢プロンプト](/guides/age-prompt-guide) と同じく \`child, kid, toddler, baby, loli, shota, teen, underage, baby face\` を足します。カードの標準ネガティブにはこの行はありません。このサイトの人物テンプレとしての追加です。

v1.0 と v1.1 のカード本文には、推奨ネガティブの一覧がありません。ファインチューンが独自のネガティブを公開している場合は、そちらを優先してください。`,
      },
      {
        title: '絵師タグと、画風タグ',
        content: `Danbooru には作者名のタグがあり、v0.1 はそのデータセットで学習されています。作者名を入れると、そのタグに結びついた画風へ寄ることがあります。これは「その人が描いた」という意味ではありません。

公開する絵や、自分の作品として扱う絵では、実在の作者名を使わず、見た目の単語で書いてください。

| 意図 | 英語タグの例 |
|---|---|
| セル画風 | anime style, cel shading, clean lineart |
| 水彩 | watercolor, soft edges |
| 厚塗り | painterly, visible brushstrokes |
| フラットな色 | flat color, simple shading |
| 写真寄り | realistic, detailed skin |

v0.1 カードは、基本モデルにデフォルトの画風がない、と書いています。画風タグを空にすると、学習データの平均的なイラストになります。特定の作者に寄せたい場合でも、その人の名前をこのページでは例に出しません。

既存のキャラクター名も、Danbooru タグとして反応することがあります。公開・販売するなら、名前を使わず、髪や服の要素に分解してください。分解の考え方は [コスプレプロンプト](/guides/cosplay-prompt-guide) にあります。`,
      },
      {
        title: 'テンプレと、サンプリングについてカードが言っていること',
        content: `v0.1 カードの推奨は、サンプラー Euler a、ステップ 20〜28、CFG 5〜7.5 です。用途によって変わる、とも書かれています。v1.0 と v1.1 のカード本文には、この数値の繰り返しがありません。同じ数字をすべてのバージョンの公式値とは扱わないでください。ファインチューンは、それぞれのモデルページの数値を使います。

解像度について v1.0 カードは、1536×1536 をネイティブとし、512 から 1536 の範囲と、1248×1824 のような非正方形を追加の改造なしで扱える、と書いています。VRAM や UI の上限までカードは保証していません。まず 1024 前後で構図を確認し、カードが挙げる範囲で上げる、という手順が安全です。

**成人の上半身（タグ中心）**

\`\`\`
1girl, adult, young adult, long black hair, brown eyes,
white blouse, dark skirt, sitting, gentle smile,
looking at viewer, indoors, window light,
upper body, masterpiece, best quality
\`\`\`

**成人の全身（短い文を一つ混ぜる）**

\`\`\`
1boy, adult, short hair, coat, standing, full body,
standing beside a door that reaches his shoulders,
simple background, masterpiece, best quality
\`\`\`

**背景を少し描き込む**

\`\`\`
1girl, adult, casual clothes, walking, city street, overcast,
from side, full body, masterpiece, best quality
\`\`\`

ネガティブは前の節の短縮版に、成人向けの除外を足してください。低身長や暗い部屋など主題ごとのタグは、[低身長・小柄](/guides/short-height-petite-prompt) と [暗い部屋](/guides/dark-room-prompt-guide) を足し、品質タグの並びはこのページのままにしてください。`,
      },
    ],
    faq: [
      { q: '品質タグは先頭ですか、末尾ですか？', a: 'v0.1 のカードは順番を固定していません。公開作例は人数から始まり、`masterpiece` を付ける場合も末尾です。ファインチューンのページが先頭を推奨しているなら、そのページに従ってください。このページのテンプレは末尾に置いています。' },
      { q: '自然な英語の文章だけでよいですか？', a: 'v1.0 のカードは、文とタグと両方を使えると書いています。v1.1 は自然言語をより重視した、と書いています。人数や服のようにタグがあるものはタグのまま残し、タグにない状況だけを短い文にするのが、バージョン差に強い書き方です。' },
      { q: 'masterpiece (quality) の括弧は必要ですか？', a: 'v0.1 カードの対応リストには `masterpiece (quality)` と書かれ、同じカードの作例は括弧なしの `masterpiece` です。読み込んだチェックポイントの作例に合わせてください。' },
      { q: '絵師の名前を入れると、その人の絵になりますか？', a: 'なりません。Danbooru の作者タグが学習に含まれているため、画風が寄ることがある、という範囲です。公開する作品では作者名を使わず、`cel shading` や `watercolor` のような見た目のタグを使ってください。' },
      { q: 'Euler a、20〜28 steps、CFG 5〜7.5 は全バージョン共通ですか？', a: 'その数値は v0.1 のカードに書かれています。v1.0 と v1.1 のカード本文には同じ推奨がありません。ファインチューンは各モデルページの指定を使ってください。' },
    ],
  },
}
