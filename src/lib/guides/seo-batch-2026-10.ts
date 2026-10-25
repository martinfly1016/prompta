/**
 * First SEO batch (2026-10-25): expression, angle, pose, background, age.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 */

export interface GuideSection {
  title: string
  content: string
}

export interface GuideFaq {
  q: string
  a: string
}

export interface GuideArticle {
  sections: GuideSection[]
  faq: GuideFaq[]
}

const NEGATIVE_FACE = 'bad anatomy, bad hands, extra fingers, missing fingers, deformed face, asymmetric eyes, extra eyes, cross-eyed, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'stable-diffusion-expression-prompt': {
    sections: [
      {
        title: 'Stable Diffusion の表情プロンプトで何を決めるか',
        content: `「stable diffusion 表情 プロンプト」で探しているのは、笑顔や怒りを英語タグで指定し、顔が別の感情にすり替わらない書き方です。表情は画風より後ろ、人物の直後に置くと反映されやすくなります。

このページは日常で使う表情だけを扱います。性的な表情タグは載せていません。結果はモデルとシードで変わるので、ここにあるタグは「よく使われる書き方」であり、特定の作例の再現レシピではありません。

先に全体の書き方を見るなら [Stable Diffusion プロンプトの書き方](/guides/stable-diffusion-prompt-guide)、アニメ寄りの顔なら [アニメプロンプトガイド](/guides/anime-prompt-guide) をあわせて読んでください。実在の作例は [無表情から微笑み](/prompt/expression-neutral-to-subtle-smile)、[痛みの表情](/prompt/slender-tall-woman-pain-expression)、[怒りの立ち姿](/prompt/angry-tall-slender-illustration-pose) にあります。`,
      },
      {
        title: '笑顔・喜び',
        content: `口を開けるかどうかで印象が分かれます。\`smile\` だけだと口を閉じた微笑みになることが多く、声を出して笑うなら \`laughing\` や \`:d\` を足します。

| 英語タグ | 意味 | 使いどころ |
|---|---|---|
| smile | 笑顔 | 最初の一手。口元は閉じ気味になりやすい |
| light smile | 軽い微笑み | 証明写真や静かなポートレート |
| gentle smile | やさしい笑み | 柔らかい光と相性が良い |
| grin | 歯を見せて笑う | 元気、いたずら |
| smirk | 片側だけの薄い笑い | 自信、からかい。強くしすぎない |
| laughing | 声を出して笑う | 口が開く。歯の崩れに注意 |
| :d | 口を開けた笑顔 | アニメ系で口の形が安定しやすい |
| closed eyes, smile | 目を閉じて笑う | 幸せそう、安心 |
| one eye closed | 片目をつぶる | ウインクの土台 |
| wink | ウインク | \`smile\` と一緒に書く |
| cheerful | 朗らか | 表情全体の雰囲気 |
| happy | うれしそう | 単独より smile と併用 |

口を閉じたいときは \`closed mouth\`、少し開けたいときは \`parted lips\` を足します。`,
      },
      {
        title: '怒り・不機嫌・真剣',
        content: `怒りは眉と口をセットで書くと伝わります。\`angry\` だけだと叫び顔になるモデルもあるので、静かな怒りには \`frown\` や \`serious\` を使います。

| 英語タグ | 意味 | 使いどころ |
|---|---|---|
| angry | 怒り | 眉が寄る。強すぎるときは重みを下げる |
| annoyed | いらだち | 軽い不機嫌 |
| frown | 眉をひそめる | 不満、心配と紙一重 |
| scowl | しかめ面 | 睨み |
| glaring | 睨む | 目に力を入れる |
| v-shaped eyebrows | 怒り眉 | 眉の形を直接指定 |
| furrowed brow | 眉間のしわ | 考え込みや怒り |
| clenched teeth | 歯を食いしばる | 我慢、戦闘前 |
| pout | ふくれ面 | すねた口 |
| sulking | すねる | 口と視線が下がりやすい |
| serious | 真剣 | 無表情に近いが目に力がある |
| determined | 決意 | 戦闘、スポーツ |
| disgusted | 嫌悪 | 眉と口角が下がる |

戦闘シーンの実例は [怒りの立ち姿](/prompt/angry-tall-slender-illustration-pose) を参照してください。`,
      },
      {
        title: '悲しみ・涙・安心',
        content: `涙は \`tears\` だけだと目がうるむ程度で止まることがあります。流すなら \`streaming tears\` や \`crying\` を足し、顔の崩れ用ネガティブを同時に入れます。

| 英語タグ | 意味 | 使いどころ |
|---|---|---|
| sad | 悲しい | 口角が下がる |
| crying | 泣いている | 目と口が動きやすい |
| tears | 涙 | 量はモデル依存 |
| teary eyes | うるんだ目 | 泣き出す前 |
| tearing up | 涙ぐむ | crying より弱い |
| streaming tears | 涙が流れる | 量を増やしたいとき |
| crying with eyes open | 目を開けて泣く | 目を閉じた泣き顔を避けたいとき |
| holding back tears | 涙をこらえる | 表情は笑顔に寄りすぎることがある |
| melancholy | もの悲しい | 雰囲気語。顔だけは変わりにくい |
| disappointed | がっかり | 眉が八の字になりやすい |
| gloomy | どんより | 照明も暗くなりやすい |
| relieved | 安心した | 力の抜けた口元 |
| tearful smile | 泣き笑い | smile と tears の併用でも近い |

切ない表情の公開プロンプト: [痛みの表情](/prompt/slender-tall-woman-pain-expression)、[悲劇的な表情](/prompt/slim-pain-expression-glamor-tragic)。`,
      },
      {
        title: '照れ・驚き・無表情・考え中',
        content: `照れは赤面タグを足すだけでも伝わります。赤が服や背景に乗るときは、赤面の重みを 1.1 前後に落とすか、服の色を別に指定します。

| 系統 | 英語タグ | 意味 |
|---|---|---|
| 照れ | blush | 頬が赤い |
| 照れ | nose blush | 鼻にかかった赤み |
| 照れ | full-face blush | 顔全体の赤み。強すぎるとのべっとしやすい |
| 照れ | embarrassed | 恥ずかしがっている |
| 照れ | shy | はにかみ |
| 照れ | flustered | あたふた |
| 驚き | surprised | 驚き。目と口が開く |
| 驚き | shocked | ショック |
| 驚き | wide-eyed | 見開いた目 |
| 驚き | confused | 困惑 |
| 驚き | puzzled | 首をかしげた戸惑い |
| 無表情 | expressionless | 無表情 |
| 無表情 | poker face | 感情を出さない |
| 状態 | sleepy | 眠い |
| 状態 | yawning | あくび |
| 状態 | thinking | 考え中 |
| 状態 | bored | 退屈 |
| 目 | half-closed eyes | 半目 |
| 目 | narrowed eyes | 目を細める |
| 目 | jitome | ジト目 |
| 目 | sparkling eyes | きらきらした目 |
| 口 | open mouth | 口を開ける |
| 口 | closed mouth | 口を閉じる |
| 口 | tongue out | 遊びで舌を出す。性的な文脈では使わない |

無表情から微笑みへの変化は [expression-neutral-to-subtle-smile](/prompt/expression-neutral-to-subtle-smile) がそのまま使えます。`,
      },
      {
        title: '視線と、表情が映える構図',
        content: `表情を見せるなら顔が画面の十分な面積を占める構図にします。全身のまま微表情だけを指定すると、顔が小さくてタグが負けます。

| 英語タグ | 意味 |
|---|---|
| looking at viewer | カメラを見る |
| looking away | 視線をそらす |
| looking down | うつむく |
| looking up | 上を見る |
| looking back | 振り返る |
| side glance | 横目 |
| face focus | 顔を主題にする |
| close-up | 顔のアップ |
| portrait | バストアップ前後 |
| from side | 横顔。表情は半分しか見えない |
| upper body | 表情と姿勢の両方 |

アングル自体は [下からのアングルプロンプト](/guides/low-angle-prompt-guide) にまとめてあります。顔のアップとローアングルを同時に強くすると、あごが不自然に伸びることがあります。どちらかを主、もう一方を弱くします。`,
      },
      {
        title: 'コピペ例',
        content: `品質タグはモデルに合わせて削ってください。アニメ系では \`masterpiece, best quality\` が効きやすく、実写系では照明とレンズの方が効くことが多いです。

**穏やかな微笑み（バストアップ）**

\`\`\`
1 adult woman, gentle smile, closed mouth, looking at viewer,
upper body, soft daylight, detailed eyes, detailed face
\`\`\`

**静かな怒り**

\`\`\`
1 adult woman, serious, frown, furrowed brow, closed mouth,
looking at viewer, portrait, cool lighting
\`\`\`

**涙をこらえている**

\`\`\`
1 adult woman, holding back tears, teary eyes, slight frown,
looking down, portrait, soft window light
\`\`\`

**照れ笑い**

\`\`\`
1 adult woman, shy, light smile, blush, looking away,
upper body, warm indoor light
\`\`\`

重みは \`(smile:1.2)\` から試し、1.4 を超えると口や目が変形しやすくなります。数字は目安で、モデルごとに違います。`,
      },
      {
        title: 'ネガティブプロンプトと、表情が勝たないとき',
        content: `表情用のネガティブは、顔の欠陥と「別の感情」の両方を入れます。笑顔が欲しいのに真顔になるときは、ネガティブに \`expressionless, serious, frown\` を足すと切り替わりやすくなります。逆に真剣顔が笑顔になるときは \`smile, grin, laughing\` をネガティブへ回します。

\`\`\`
${NEGATIVE_FACE}, extra face, multiple heads
\`\`\`

うまく出ないときの順番は次のとおりです。

1. 表情タグを人物のすぐ後ろに移す。
2. 構図を \`portrait\` か \`close-up\` にして顔を大きくする。
3. 対立する感情タグをネガティブに入れる。
4. 重みを 1.1 から 1.3 のあいだで一つだけ変える。
5. それでも固定したい顔なら、表情タグより ControlNet や img2img の参照の方が確実です。

ポーズと同時に指定するなら [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、年齢で顔つきが幼く寄りすぎるときは [年齢プロンプト](/guides/age-prompt-guide) を見てください。背景を変えて感情を補強するなら [背景プロンプト](/guides/background-prompt-guide) です。`,
      },
    ],
    faq: [
      { q: '表情プロンプトは日本語でも効きますか？', a: 'Stable Diffusion 系は英語タグの方が学習量が多いです。「笑顔」だけより `smile` の方が安定します。自然文が得意なモデル（一部の SDXL、DALL·E、Gemini）では "a calm closed-mouth smile" のように文で書いても伝わります。' },
      { q: 'smile を入れても真顔のままです', a: '顔が小さい構図だと表情タグが負けます。`portrait` か `close-up` を足し、ネガティブに `expressionless` を入れてください。重みは `(smile:1.2)` からで十分です。' },
      { q: '赤面が服まで赤くなります', a: '`full-face blush` を `blush` に弱めるか、服の色を `white shirt` のように具体的に書き、blush の重みを 1.1 以下にします。' },
      { q: 'NovelAI と Stable Diffusion でタグは同じですか？', a: 'Danbooru 由来のタグ（smile、crying、blush、jitome）は両方で使われます。NovelAI は括弧の重み付けに慣れている一方、SDXL 系の実写モデルは `gentle smile` のような英語句の方が素直なことがあります。' },
      { q: '複数の表情を混ぜてよいですか？', a: '`light smile, blush` のように近い感情は混ぜられます。`laughing, crying, angry` を同時に強くすると顔が崩れます。一つを主、もう一つを補助にしてください。' },
    ],
  },

  'low-angle-prompt-guide': {
    sections: [
      {
        title: 'アングルプロンプトで視点を固定する',
        content: `「アングル プロンプト」「下からのアングル」で探しているのは、カメラをどこに置くかの英語です。被写体のポーズや表情とは別の層なので、プロンプトでは人物のあと、背景の前に置きます。

下からのアングルは建物や全身の立姿を大きく見せるための構図です。スカートやshortsの内側、下着が映り込む構図はこのページでは扱いません。人物に使うときは服が閉じた状態であることを書き、ネガティブで写り込みを除外してください。

カメラカテゴリの作例は [カメラ・アングル一覧](/prompts/camera)、タグでは [ローアングル](/tag/ローアングル)、[カメラアングル](/tag/カメラアングル)、[俯瞰](/tag/俯瞰) があります。`,
      },
      {
        title: '下からのアングル',
        content: `低い位置から見上げるとき、安定して効きやすいのは \`from below\` です。\`low angle\` は広さのある言い方で、モデルによってはほぼ正面のままになることがあります。地面すれすれまで下げるなら \`worm's-eye view\` を足します。

| 英語タグ | 意味 | 効かせ方 |
|---|---|---|
| from below | 下から見上げる | まずこれを置く |
| low angle | ローアングル | from below と併用すると意図が明確 |
| slightly low angle | 少しだけ低い | あごの伸びを抑えたいとき |
| worm's-eye view | 地面近くから見上げる | 空や天井が入りやすい |
| looking up | 本人の視線が上 | カメラ位置とは別。混同しない |
| gazing down at viewer | 被写体が見下ろす | 低いカメラとセットにすると「見上げられている」になる |
| on stairs | 階段の上にいる | 高さの差が絵に出やすい |
| looking up at the building | 建物を見上げる | 人物なしの建築写真向き |
| heroic pose | 立姿を大きく見せる | 全身と一緒に |
| full body | 全身 | 顔アップだとローアングルの意味が薄い |
| sky background | 空が背景 | 見上げの説明になる |
| ceiling | 天井が見える | 室内の真下に近いアングル |

人物を階段や舞台の上に置くと、タグだけのときより「下から見ている」が絵になります。公開作例: [歴史写真のローアングル](/prompt/low-angle-wide-shot-historical-photography)、[プロペラ機を見上げる](/prompt/vintage-propeller-aircraft-low-angle)、[骨格のローアングル](/prompt/surreal-skeleton-low-angle)、[巫女のローアングル](/prompt/miko-cosplay-cat-low-angle)。`,
      },
      {
        title: '上から・正面・横・後ろ',
        content: `上下だけでなく、回り込む角度も単語が分かれています。\`from above\` は人物を見下ろすカメラ、\`bird's-eye view\` はほぼ真上です。

| 英語タグ | 意味 |
|---|---|
| from above | 上から見下ろす |
| high angle | ハイアングル |
| bird's-eye view | 真上に近い俯瞰 |
| top-down view | 真上 |
| overhead shot | 頭上から |
| from front | 正面 |
| straight-on | 真正面 |
| eye level | 目線の高さ |
| from side | 横から |
| profile | 横顔 |
| three-quarter view | 斜め前 |
| from behind | 後ろから |
| looking back | 振り返ってこちらを見る |
| over the shoulder | 肩越し |
| dutch angle | カメラを傾ける |
| dutch tilt | dutch angle と同系統 |
| fisheye | 魚眼。端が曲がる |
| wide shot | 引きの画面 |
| cowboy shot | 太ももあたりまで |
| close-up | 寄る |

俯瞰のタグページは [俯瞰](/tag/俯瞰)、後ろ姿は [後ろ姿](/tag/後ろ姿) です。表情と視線の単語は [表情プロンプト](/guides/stable-diffusion-expression-prompt) に分けてあります。`,
      },
      {
        title: '距離とアングルは別のタグ',
        content: `「下から」と「全身」は同時に指定できます。どちらかしか書かないと、顔アップのまま角度だけが少し変わる、という結果になりがちです。

| 距離 | 英語タグ | 画面に入る範囲 |
|---|---|---|
| 顔 | face close-up, portrait | 表情が見える。アングルの効果は小さい |
| 胸上 | upper body | 姿勢が少し分かる |
| 腰上 | cowboy shot | 手の位置まで入る |
| 全身 | full body | アングルの差が一番出る |
| 引き | wide shot, long shot | 背景の割合が増える |
| 主観 | pov | 誰かの目線。from below と混ぜると混乱しやすい |

構図の補助として \`rule of thirds\`、\`centered subject\`、\`leading lines\` を足せます。これはカメラの高さではなく、画面の中の配置です。`,
      },
      {
        title: 'コピペ例',
        content: `**建物を下から見上げる（人物なし）**

\`\`\`
looking up at a modern concrete building, from below, worm's-eye view,
blue sky, sharp architectural lines, no people
\`\`\`

**服を着た大人の立姿を少し低く**

\`\`\`
1 adult woman, fully clothed, long coat, standing, full body,
from below, slightly low angle, looking at viewer,
city street, daytime
\`\`\`

**室内を少し上から**

\`\`\`
1 adult, sitting at a desk, from above, high angle,
upper body, reading a book, soft window light, cozy room
\`\`\`

**後ろ姿から振り返る**

\`\`\`
1 adult, from behind, looking back over shoulder,
full body, fully clothed, quiet street, overcast
\`\`\`

Midjourney では同じ英語のうしろに \`--ar 2:3\` を付けると縦位置の全身が作りやすくなります。`,
      },
      {
        title: '下から撮るときのネガティブと失敗',
        content: `低いカメラは、短いスカートや開いた脚と組み合わさると意図せず下着側の構図になります。人物に下からのアングルを使うときは、服が閉じていることを書き、次をネガティブに入れてください。

\`\`\`
upskirt, panties, underwear, lingerie, nsfw, nude, explicit,
bad anatomy, extra legs, distorted face, long neck, huge chin
\`\`\`

よくある失敗:

- \`low angle\` だけだと正面のまま。\`from below\` を主タグにする。
- 顔アップのまま下からにすると、あごだけが伸びる。\`full body\` にするか、\`slightly low angle\` に弱める。
- \`looking up\` は視線であり、カメラ位置ではない。カメラを下げるなら \`from below\`。
- 極端な \`worm's-eye view\` は手と足が前景で巨大になる。ネガティブに \`bad hands, extra fingers\` を入れる。
- 二人を下から見ると体が融合しやすい。[二人構図ガイド](/guides/two-person-composition-prompt-guide) の人数指定を先に書いてください。

ポーズの単語は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、場所は [背景プロンプト](/guides/background-prompt-guide) です。`,
      },
    ],
    faq: [
      { q: '下からのアングルで一番効くタグはどれですか？', a: '人物にも風景にも、まず `from below` です。物足りなければ `low angle` か `worm\'s-eye view` を一つ足します。三つを全部強くすると顔と足が同時に歪みやすくなります。' },
      { q: 'looking up と from below の違いは？', a: '`looking up` は人物の視線が上向きです。`from below` はカメラが低い位置にあります。見上げられている絵が欲しいなら `from below, gazing down at viewer` のように両方を役割別に書きます。' },
      { q: 'ローアングルなのに正面のままです', a: '顔のアップになっているか、`low angle` だけを使っていることが多いです。`full body, from below` に変え、可能なら `on stairs` や `sky background` で「下から見ている状況」を足してください。' },
      { q: '俯瞰とハイアングルは同じですか？', a: '近いですが、`high angle` は斜め上、`bird\'s-eye view` と `top-down view` は真上に近いです。部屋の見取り図のようにしたいなら top-down、人物を少し見下ろすなら high angle です。' },
      { q: 'Midjourney でも同じ単語でよいですか？', a: 'from below、low angle、bird\'s-eye view、dutch angle はそのまま使えます。Midjourney は文としても理解するので、"shot from near the ground, looking up" のように一文にしても構いません。' },
    ],
  },

  'stable-diffusion-pose-prompt': {
    sections: [
      {
        title: 'ポーズプロンプトは「姿勢」と「手」を分ける',
        content: `「stable diffusion ポーズ プロンプト」は、立つか座るか、腕をどこに置くかを英語で固定するためのページです。表情やカメラ位置とは別なので、混ぜすぎると全部が中途半端になります。

ここにあるのは服を着た状態で使える姿勢です。開脚や体の強調を目的にしたポーズは入れていません。手は最も崩れやすいので、ネガティブと一緒に使ってください。

体型の単語は [体型プロンプト](/guides/body-type-prompt-guide)、二人の位置関係は [二人構図](/guides/two-person-composition-prompt-guide)、カメラは [アングルプロンプト](/guides/low-angle-prompt-guide) です。`,
      },
      {
        title: '立つ・座る・寝転ぶ',
        content: `| 英語タグ | 意味 | 補足 |
|---|---|---|
| standing | 立つ | 基本。何も書かないとこれになりやすい |
| contrapposto | 片足に体重 | 立ち姿に流れが出る |
| standing on one leg | 片足立ち | バランスを崩しやすい |
| walking | 歩く | 足が交差して融合しやすい |
| running | 走る | 腕と足の数が増えやすい |
| jumping | 跳ぶ | 地面から離れる |
| sitting | 座る | 椅子があるかは別タグ |
| sitting on chair | 椅子に座る | 家具を明示する |
| seiza | 正座 | アニメ系で通りやすい |
| wariza | 割座 | 膝を崩した座り |
| crossed legs | 足を組む | 椅子とセット |
| kneeling | 膝立ち | 両膝 |
| on one knee | 片膝 | |
| squatting | しゃがむ | 足の形が崩れやすい |
| hugging own legs | 膝を抱える | 手と脚が融合しやすい |
| lying | 横たわる | 向きは次の行 |
| on back | 仰向け | |
| on side | 横向き | |
| on stomach | うつ伏せ | 顔が埋まりやすい |
| leaning against wall | 壁にもたれる | 背景に壁が要る |
| bowing | お辞儀 | 上体が前に倒れる |
| fighting stance | 構える | 格闘。武器は別タグ |
| yoga pose | ヨガの姿勢 | 具体名を足すと安定 |

公開作例: [岩の上に座る](/prompt/sitting-pose-rocky-ledge-relaxed)、[短縮法の座り](/prompt/foreshortening-sitting-pose-technique)、[自信のある立ち姿](/prompt/slender-shirt-confident-pose)、[戦士の後ろ姿](/prompt/full-body-warrior-stance-rear-view)、[正面を向いた姿勢の修正](/prompt/pose-correct-face-forward)。`,
      },
      {
        title: '腕・手・向き',
        content: `手を「何もしていない」と書くより、置く場所を一つ決めた方が指が減ります。ピースや指差しは指の数が要求されるので、最初のテストには向きません。

| 英語タグ | 意味 |
|---|---|
| arms at sides | 両腕を体の横に |
| arm at side | 片腕を横に |
| crossed arms | 腕を組む |
| hands on hips | 腰に手 |
| hand on hip | 片方だけ腰 |
| arms behind back | 後ろで組む |
| arms behind head | 頭の後ろ |
| arm up | 片腕を上げる |
| arms up | 両腕を上げる |
| outstretched arms | 両腕を広げる |
| reaching | 手を伸ばす |
| waving | 手を振る |
| pointing | 指差し。指が崩れやすい |
| peace sign | ピース。同様に崩れやすい |
| thumbs up | 親指を立てる |
| holding book | 本を持つ。手が隠れやすい |
| from front | 体が正面 |
| from side | 体が横 |
| from behind | 後ろ姿 |
| looking back | 振り返る |
| twisted torso | 上体をひねる |
| walking towards viewer | こちらへ歩いてくる |

後ろ姿の全身は [戦士の後ろ姿](/prompt/full-body-warrior-stance-rear-view) が参考になります。`,
      },
      {
        title: 'コピペ例',
        content: `**腕を下ろした全身**

\`\`\`
1 adult, fully clothed, standing, arms at sides, full body,
facing viewer, simple studio background, even lighting
\`\`\`

**腰に手、斜め前**

\`\`\`
1 adult, fully clothed, contrapposto, hand on hip,
three-quarter view, full body, soft daylight, city sidewalk
\`\`\`

**椅子に座って本を読む**

\`\`\`
1 adult, sitting on chair, crossed legs, holding a book,
upper body, looking down at the book, library, warm light
\`\`\`

**壁にもたれて歩く前**

\`\`\`
1 adult, fully clothed, leaning against wall, one leg bent,
relaxed, full body, from side, afternoon street
\`\`\`

OpenPose などの ControlNet がある場合は、文章で姿勢を長々と書くより骨格画像を渡した方が手と脚は安定します。プロンプト側は服装と場所に寄せてください。`,
      },
      {
        title: 'ネガティブプロンプトと崩れ方',
        content: `ポーズ用のネガティブは部位の増減が中心です。

\`\`\`
bad anatomy, bad hands, extra fingers, missing fingers, fused fingers,
extra arms, extra legs, missing legs, disconnected limbs,
long neck, twisted neck, extra knees
\`\`\`

失敗の切り分け:

- 腕が三本になる: 解像度が低い、または \`arms up\` と \`crossed arms\` が同時に強い。姿勢タグは一つに絞る。
- 座っているのに立っている: \`sitting\` より \`sitting on chair\` と椅子の絵になる背景を書く。ネガティブに \`standing\` を入れる。
- 歩いているのに足が溶ける: \`walking\` の重みを上げすぎない。\`full body\` と十分な解像度（SD1.5 なら 768 辺、SDXL なら 1024 辺が目安）にする。
- 指が六本: 手を画面の主役にしない。\`hands on hips\` や \`holding book\` で指を隠す。ピースサインは後から足す。
- 二人のポーズが融合する: 単体で通してから [二人構図](/guides/two-person-composition-prompt-guide) の人数タグを足す。

表情を足すなら [表情プロンプト](/guides/stable-diffusion-expression-prompt)、年齢で体格が変わってしまうときは [年齢プロンプト](/guides/age-prompt-guide) です。`,
      },
    ],
    faq: [
      { q: 'ポーズだけ指定しても同じ姿勢になりますか？', a: 'なりません。`sitting` は「座っていることが多い」程度で、椅子の有無や足の組み方は別タグです。姿勢を一つ、手の位置を一つ、カメラ距離を一つ、まで分解すると再現しやすくなります。' },
      { q: '手がいつも崩れます', a: '指を見せるポーズ（peace sign、pointing）を外し、`arms at sides` か `hands on hips` にします。ネガティブに `extra fingers, missing fingers, fused fingers` を入れ、解像度を上げてください。それでも固定したいなら OpenPose です。' },
      { q: '正座やあぐらはどのタグですか？', a: '正座は `seiza`、膝を崩す割座は `wariza`、あぐらに近い指定は `crossed legs` を床に座らせて使います。アニメ系モデルの方が和の座り方に反応しやすいです。' },
      { q: '全身とバストアップ、どちらでポーズを試すべきですか？', a: '姿勢の確認は `full body` です。バストアップだと足のタグが無視されます。表情を見たあとで全身に戻す、という二段にすると両方を確認できます。' },
      { q: 'Midjourney のポーズ指定は違いますか？', a: 'standing、sitting、walking、arms crossed はそのまま使えます。`--stylize` が高いとポーズより画風が優先されるので、姿勢を守りたいときは stylize を下げるか、"exact pose: sitting on a chair, legs crossed" のように文で強調します。' },
    ],
  },

  'background-prompt-guide': {
    sections: [
      {
        title: '背景プロンプトは場所を一つに決める',
        content: `「背景 プロンプト」で必要なのは、人物のうしろに何が見えるかの英語です。場所を二つ同時に強くすると、教室なのに森が混ざる、といった絵になります。場所を一つ、時間か光を一つ、という順で足してください。

人物のうしろに背景を付ける場合と、背景だけを描く場合ではネガティブが違います。写真から背景を消す・置き換える作業は生成とは別で、[背景削除](/prompt/background-removal-transparent-png) と [スタジオ背景への置き換え](/prompt/background-replace-studio-neutral) が写真加工側の実例です。

色の指定そのものは [色プロンプト](/guides/color-prompt-guide)、タグの一覧は [背景](/tag/背景) です。室内を暗くする光源と、黒く潰さない書き方は [暗い部屋プロンプト](/guides/dark-room-prompt-guide) に分けてあります。`,
      },
      {
        title: '単色・スタジオ・ぼかし',
        content: `人物を主役にするなら、場所を描き込む前に単色かスタジオから始めると判断が楽です。

| 英語タグ | 意味 |
|---|---|
| simple background | 情報の少ない背景 |
| white background | 白 |
| black background | 黒 |
| grey background | グレー |
| solid color background | 単色 |
| gradient background | グラデーション |
| studio background | 撮影スタジオ |
| photo studio | スタジオ機材が出やすい |
| seamless paper backdrop | 紙のバック紙 |
| bokeh | 玉ぼけ |
| depth of field | 被写界深度。背景がぼけやすい |
| blurry background | 背景をぼかす |
| indoors | 室内である、という大枠 |
| outdoors | 屋外である、という大枠 |

作例: [赤い背景の猫](/prompt/black-cat-red-background-pop-art)、[花のぼけ](/prompt/bokeh-flowers-magical-dark-dress)、[スタジオ照明の人物](/prompt/studio-lighting-portrait-detailed)。`,
      },
      {
        title: '室内',
        content: `| 英語タグ | 意味 |
|---|---|
| bedroom | 寝室 |
| kitchen | キッチン |
| living room | 居間 |
| bathroom | 浴室。人物と組み合わせるときは服を着た状態と書く |
| hallway | 廊下 |
| classroom | 教室 |
| library | 図書館 |
| office | オフィス |
| cafe | カフェ |
| restaurant | レストラン |
| Japanese-style room | 和室 |
| tatami | 畳 |
| shrine interior | 神社の内 |
| train interior | 電車内 |
| stage | 舞台 |
| gym | 体育館、またはジム。モデルで意味が割れる |

室内なのに外の空が出るときは、\`outdoors, sky\` をネガティブに入れ、\`indoors\` を場所タグの前に置きます。`,
      },
      {
        title: '屋外・街・自然',
        content: `| 英語タグ | 意味 |
|---|---|
| street | 通り |
| alley | 路地 |
| crosswalk | 横断歩道 |
| park | 公園 |
| garden | 庭 |
| rooftop | 屋上 |
| train station | 駅 |
| cityscape | 都市の景色 |
| skyscraper | 高層ビル |
| shrine | 神社 |
| temple | 寺 |
| beach | 海岸 |
| ocean | 海 |
| forest | 森 |
| bamboo forest | 竹林 |
| flower field | 花畑 |
| cherry blossoms | 桜 |
| mountain | 山 |
| lake | 湖 |
| river | 川 |
| snow | 雪 |
| countryside | 田舎 |
| night city | 夜の街 |
| neon lights | ネオン。背景が情報過多になりやすい |

時間と天気は場所のうしろに足します。

| 英語タグ | 意味 |
|---|---|
| daytime | 昼 |
| sunset | 夕方 |
| blue hour | 薄暮 |
| night | 夜 |
| overcast | 曇り |
| rain | 雨 |
| fog | 霧 |
| sunlight | 日光 |
| window light | 窓光 |
| backlighting | 逆光 |

夕焼けのタグは [夕焼け](/tag/夕焼け) です。`,
      },
      {
        title: '背景だけを描く',
        content: `人物モデルは、背景だけ頼んでも人を置きにいきます。背景専用にするときは、主役が景色であることを書き、人をネガティブに回します。

\`\`\`
empty classroom, after school, sunset light through windows,
scenery, no people, detailed background
\`\`\`

ネガティブ:

\`\`\`
person, people, human, 1girl, 1boy, face, hands, portrait
\`\`\`

それでも人が出るモデルはあります。その場合は人物向けではないチェックポイントに変える方が早く、プロンプトの語数を増やしても消えません。

人物つきで場所を決める例:

\`\`\`
1 adult, fully clothed, standing, full body,
quiet library, bookshelves, window light, depth of field
\`\`\`

\`\`\`
1 adult, fully clothed, walking, city street, overcast,
from side, full body, muted colors
\`\`\`

場所を変えたあとに体の線が変わるのは、背景タグが体型タグより強く勝っているサインです。体型を守るなら [体型プロンプト](/guides/body-type-prompt-guide) の単語を人物の直後に戻してください。`,
      },
      {
        title: 'ネガティブと、背景が勝ってしまうとき',
        content: `人物を残したいときのネガティブは、画質と「別の場所」だけにします。

\`\`\`
${NEGATIVE_FACE}, extra people, crowd, cluttered background
\`\`\`

背景が単色にならない、逆に背景ばかり細かい、という両方が起きます。

- 白背景に家具が出る: \`simple background, white background\` を前へ。ネガティブに \`furniture, room, outdoors\`。
- 指定した部屋にならない: 場所は一つ。\`bedroom, cafe, forest\` を同時に書かない。
- 人物が小さくなる: \`full body\` または \`upper body\` を明示し、\`wide shot\` を外す。
- 文字や看板が崩れる: ネガティブに \`text, letters, signage, watermark\`。背景に読める文字を期待しない。
- 色が隣ににじむ: [色プロンプト](/guides/color-prompt-guide) の分け方を使う。

アングルを同時に変えるなら [アングルプロンプト](/guides/low-angle-prompt-guide) を一つだけ足してください。`,
      },
    ],
    faq: [
      { q: 'simple background と white background の違いは？', a: '`simple background` は情報を減らす指示で、色は白とは限りません。白くしたいなら `white background` を足します。両方書くとより単色に寄ります。' },
      { q: '背景だけ生成したいのに人が出ます', a: '`scenery, no people` を入れ、ネガティブに `person, 1girl, 1boy, face` を入れてください。人物に強いモデルでは消え残ることがあるので、そのときはモデルを変えます。' },
      { q: '室内を指定したのに空が見えます', a: '`indoors` を場所の前に置き、ネガティブに `outdoors, sky` を入れます。窓から空が見えるのは正常なので、窓自体を消したいときだけ `window` もネガティブにします。' },
      { q: '背景を後から差し替えたい', a: '生成時の背景タグとは別の作業です。写真加工の [背景をスタジオに置き換えるプロンプト](/prompt/background-replace-studio-neutral) と [背景を透明にするプロンプト](/prompt/background-removal-transparent-png) を使ってください。' },
      { q: 'Midjourney で背景をぼかしたい', a: '`shallow depth of field, blurred background` を足すか、被写体を "in the foreground" と書きます。`--stylize` が高いと背景の描き込みが増えるので、ぼかしたいときは下げます。' },
    ],
  },

  'age-prompt-guide': {
    sections: [
      {
        title: 'このページが扱う年齢',
        content: `「年齢 プロンプト」で、見た目の世代を英語で固定する方法をまとめます。このページは **20歳以上の大人** だけを扱います。未成年に見える人物、子ども、学生を幼く描くためのタグは載せていません。

アニメ系モデルは何も書かないと若い顔に寄ります。大人を描きたいときは、年齢を人物の直後に置き、幼く見せる単語をネガティブに入れます。数値はモデルが厳密な年齢として守るわけではなく、「若い大人」「中年」「高齢」の方向を示すために使います。

体格そのものは [体型プロンプト](/guides/body-type-prompt-guide)、大人の低身長は [低身長・小柄プロンプト](/guides/short-height-petite-prompt)、顔の感情は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。高齢の公開作例は [50年の経年](/prompt/age-progression-elderly-50years) と [絵を描く高齢の男性](/prompt/colorful-paint-thoughtful-elderly-man) です。`,
      },
      {
        title: '数字と世代の単語',
        content: `数字だけを置くと、年齢ではなく枚数や番号として読まれることがあります。\`25-years-old\` のようにハイフンでつなぐか、\`25 years old\` と書き、世代の単語を一つ添えます。

| 意図 | 英語タグ | 補足 |
|---|---|---|
| 20代前半 | 20s, young adult | 大人であることを young adult で固定 |
| 25歳前後 | 25-years-old, young adult | 数字は目安 |
| 20代後半 | late 20s, adult | |
| 30代 | 30s, adult | |
| 35歳前後 | 35-years-old, adult | |
| 40代 | 40s, mature | mature は「大人びた」で、高齢とは限らない |
| 50代 | 50s, middle-aged | |
| 60代 | 60s, senior | しわと白髪を別タグで足すと伝わる |
| 70代以降 | 70s, elderly | \`old\` だけだと曖昧 |
| 高齢の女性 | elderly woman | woman とセット |
| 高齢の男性 | elderly man | man とセット |
| 中年の女性 | middle-aged woman | |
| 中年の男性 | middle-aged man | |
| 大人の女性 | adult woman | 性別と成人を同時に固定 |
| 大人の男性 | adult man | 美少年化を避けたいときの土台 |

\`mature\` は 30代から40代の「落ち着いた大人」として使われることが多く、\`elderly\` の代わりにはなりません。`,
      },
      {
        title: '顔と肌で世代を補強する',
        content: `数字が無視されるときは、顔の特徴を一つだけ足します。盛りすぎると別人ができます。

| 英語タグ | 意味 | 向き |
|---|---|---|
| adult face | 大人の顔 | 幼く寄るのを抑える |
| defined jawline | 輪郭がはっきり | 20代から40代 |
| subtle smile lines | 薄い笑いじわ | 30代以降をにおわせる |
| fine lines | 細いしわ | 中年 |
| wrinkles | しわ | 高齢。若い大人には入れない |
| grey hair | 白髪交じり | 中年から |
| white hair | 白い髪 | 高齢、または染めた髪。文脈依存 |
| short grey hair | 短い白髪 | 高齢の人物で安定しやすい |
| beard | ひげ | 成人男性の補助。年齢そのものではない |
| light makeup | 薄い化粧 | 成人の顔立ちの補助 |
| detailed skin | 肌の情報を増やす | 実写系。アニメだと年齢は変わりにくい |

アニメのつるんとした肌のまま \`40-years-old\` と書いても、顔は若いままになることがあります。世代を動かしたいなら \`fine lines\` か \`grey hair\` のどちらかを足してください。両方を一度に強くすると、指定年齢よりかなり上に見えます。`,
      },
      {
        title: 'コピペ例（すべて成人）',
        content: `**25歳前後の大人**

\`\`\`
1 adult woman, 25-years-old, young adult, gentle smile,
portrait, natural light, detailed face
\`\`\`

**40代**

\`\`\`
1 adult man, 40s, mature, short hair, light stubble,
calm expression, upper body, office, window light
\`\`\`

**60代**

\`\`\`
1 woman, 60s, middle-aged, silver-streaked hair, fine lines,
kind expression, sitting, cardigan, indoor daylight
\`\`\`

**高齢**

\`\`\`
1 elderly man, white hair, wrinkles, thoughtful expression,
sitting, painting at a table, warm room light
\`\`\`

同じ顔のまま年を取る指定は、プロンプト一発より img2img や参照画像の方が近いです。[50年の経年](/prompt/age-progression-elderly-50years) はその種の写真加工です。生成モデルに \`aged up\` とだけ書いても、顔の同一性が保たれるとは限りません。`,
      },
      {
        title: '大人の顔を幼くしないネガティブ',
        content: `大人を指定しているのに顔が幼くなるときは、次をネガティブプロンプトに入れます。これらは「描かない」側の語であり、ポジティブには使いません。

\`\`\`
child, kid, toddler, baby, teen, underage,
school uniform, baby face
\`\`\`

未成年を指す俗語タグも、ポジティブには書かず、ネガティブ側にまとめて除外します。このページにはその綴りを載せていません。

画質用と一緒にするなら:

\`\`\`
${NEGATIVE_FACE}, child, teen, underage, baby face
\`\`\`

逆に、高齢を指定したのにしわが出すぎるときは、ネガティブに \`deep wrinkles, extremely old\` を入れ、ポジティブの \`wrinkles\` を \`fine lines\` に弱めます。

やってはいけない書き方:

- 未成年の年齢数字を入れて「大人顔」と打ち消す。数字の方がシーンを未成年側に引きます。このページでは使いません。
- \`girl\` \`boy\` だけに頼る。モデルによっては未成年の見た目に寄ります。成人なら \`adult woman\` \`adult man\` と書きます。
- 学生服と成人年齢を混ぜて「年上に見える学生」を作る。制服タグはこのページの年齢指定と組み合わせません。服装は [服装プロンプト集](/prompts/clothing) の成人向けの服で指定してください。

ポーズを足すなら [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) を、成人の立姿を下から見るなら [アングルプロンプト](/guides/low-angle-prompt-guide) の服が閉じた例を使ってください。`,
      },
    ],
    faq: [
      { q: '20 years old と 20s はどちらがよいですか？', a: '特定の見た目に寄せたいときは `25-years-old` のように一つの数字、幅を持たせたいときは `20s` です。どちらも `adult` か `young adult` を添えないと、モデルがより若い顔を出すことがあります。' },
      { q: '年齢を書いても顔が若いままです', a: 'アニメ系でありがちな結果です。年齢タグを人物の直後に移し、`adult` を足し、ネガティブに `child, baby face` を入れてください。それでも動くのが小さいときは `fine lines` か `grey hair` を一つだけ足します。' },
      { q: 'mature は何歳ですか？', a: '決まった歳ではありません。実務上は 30代から40代の落ち着いた大人、として反応することが多い単語です。高齢は `elderly` や `60s` 以降の数字を使ってください。' },
      { q: '子どもや10代のプロンプトはなぜありませんか？', a: 'Prompta では未成年の見た目を作るための年齢タグを公開していません。このページは 20歳以上の大人の書き方だけです。' },
      { q: '同じ人物を高齢にした絵はプロンプトだけで作れますか？', a: '一発の生成では顔が別人になりやすいです。写真があるなら [経年変化の写真加工プロンプト](/prompt/age-progression-elderly-50years) のように、元画像を渡す方が同一性を残しやすいです。' },
    ],
  },
}
