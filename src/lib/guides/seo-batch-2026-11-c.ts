/**
 * Eleventh SEO batch (2026-11-04): clothing tags, commercial-use checks,
 * prompt symbols, img2img, and sampler / CFG / steps.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 * License sentences are limited to official pages checked 2026-11.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_11_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'clothing-prompt-guide': {
    sections: [
      {
        title: '服装プロンプトの基本の書き方',
        content: `「stable diffusion 服装」で必要なのは、服の名前を部位ごとに分け、閉じた日常着として書くことです。順番は、人物、トップス、ボトムス、靴、小物、シーンです。\`dress\` や \`suit\` を一語だけ置くと、袖の長さも丈も平均の服に戻ります。

人物は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。動物や静物だけを描くときは人数を書きません。このページは成人の、着た服だけです。丈は膝より下を起点にします。\`long skirt\`、\`pleated long skirt\`、\`wide-leg pants\` のように、どこまで布があるかを書きます。

一回の生成で動かす服は、一部位だけです。トップスを変える日は、ボトムスと靴と背景を固定します。四部位を同時に書き換えると、袖が違って見えても、スカートの丈のせいなのかブラウスのせいなのかが残りません。表のタグは、その部位の最初の一手です。メモ欄に「公式タグとしては断定しない」とある語は、自然な英語として足し、効かなければ表の左列の短いタグへ戻します。戻すときに、効かなかった語を正向に残さないでください。残った語は、次の部位の比較を濁します。色は、形が三枚揃ってから一つ足します。色を先に強くすると、布の輪郭より色面が優先されます。

種類ごとの入口は別にあります。ワンピースと夜のドレスは [ドレスプロンプト](/guides/dress-prompt-guide)、和服は [着物プロンプト](/guides/kimono-prompt-guide)、鎧やローブは [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide)、仕事のメイド服は [メイド服プロンプト](/guides/maid-outfit-prompt-guide)、スーツと白衣の部品は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide)、特定の衣装を部品に分ける考え方は [コスプレプロンプト](/guides/cosplay-prompt-guide) です。作例の並びは [服装プロンプト集](/prompts/clothing) です。

ネックレスや帽子の細かい素材は [アクセサリープロンプト](/guides/accessory-prompt-guide)、男性の髪と体型は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide)、色の名前は [色プロンプト](/guides/color-prompt-guide) です。括弧と BREAK の意味は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、元画像を残して服だけ直す手順は [img2imgの使い方](/guides/img2img-guide) です。

**順番の型**

\`\`\`
1 adult woman, adult, white blouse, cardigan, long skirt, loafers,
standing, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes, extra clothes
\`\`\`

ChatGPT や Gemini では、同じ順を一文にします。記号の重みは付けません。

\`\`\`
1 adult woman in a white blouse, a cardigan, and a long skirt, with loafers.
Full body, standing, plain background, soft daylight.
Keep the clothes closed and knee-length or longer.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, revealing clothes
\`\`\``,
      },
      {
        title: 'トップス・アウター一覧',
        content: `トップスは上半身の一枚、アウターはその上に羽織る一枚です。両方を同じ強さで三種類書くと、袖が平均になります。最初はトップスを一つ、アウターを一つまでです。

重ねる順番は、肌に近い布を先に、羽織る布を後に書きます。ブラウスの上のカーディガン、シャツの上のジャケット、です。逆に書くと、外側の布が内側に潜り込んで、前立てが二重になることがあります。フード付きのトップスは、帽子の節と同時に強くしません。ニットの名前を二つ、\`sweater\` と \`cardigan\` を同じ強さにすると、前が開いているのか閉じているのかが平均になります。開いて羽織るなら cardigan、被って着るなら sweater、と一つに決めてから素材を足します。仕事着のジャケットは、下に \`dress shirt\` か \`blouse\` を残します。ジャケットだけだと、内側が別の色の平均になります。

| 英語タグ | 日本語 | メモ |
|---|---|---|
| t-shirt | Tシャツ | 半袖の無地。柄は別の語 |
| long-sleeve shirt | 長袖シャツ | 袖の長さを残したいとき |
| button-up shirt | ボタンシャツ | 前を閉じたシャツ |
| dress shirt | ドレスシャツ | スーツの下に書く |
| blouse | ブラウス | 柔らかい肩。形は次の語で足す |
| oxford shirt | オックスフォード | カジュアルな襟付きシャツ |
| flannel shirt | フランネルシャツ | 厚い綿。冬の重ね着 |
| henley shirt | ヘンリーネック | 前立てが短いシャツ |
| polo shirt | ポロシャツ | 襟付きのニット |
| sweater | セーター | 単独だと丈が不定 |
| knit sweater | ニットセーター | 編み目を出したいとき |
| crewneck sweater | クルーネック | 丸い首元 |
| v-neck sweater | Vネックセーター | 下のシャツを書く |
| turtleneck | タートルネック | 首まで閉じる |
| pullover | プルオーバー | 前を開けないニット |
| cardigan | カーディガン | 前を開けて羽織る |
| knit vest | ニットベスト | 袖なし。下にシャツを書く |
| waistcoat | ウェストコート | スーツの中のベスト |
| vest | ベスト | 形が広い。用途を一文で足す |
| hoodie | フーディ | フード付き。帽子と衝突しやすい |
| sweatshirt | スウェット | フードなしの厚手 |
| tunic | チュニック | 腰より長いトップス |
| overshirt | オーバーシャツ | シャツの上のシャツ |
| shirt jacket | シャツジャケット | 薄手の羽織り |

アウターは、トップスが決まってから足します。\`coat\` だけだと、トレンチにもダウンにも寄ります。

| 英語タグ | 日本語 | メモ |
|---|---|---|
| jacket | ジャケット | 短いアウターの総称 |
| denim jacket | デニムジャケット | ジーンズと色が混ざりやすい |
| leather jacket | レザージャケット | 光沢が顔に移ることがある |
| blazer | テーラードのジャケット | 仕事着。下にシャツを書く |
| coat | コート | 丈を long coat で足す |
| overcoat | オーバーコート | 長いフォーマル寄りのコート |
| trench coat | トレンチコート | 雨の日。ベルトは任意 |
| wool coat | ウールコート | 冬。厚みが出る |
| pea coat | Pコート | 短めのウール |
| duffle coat | ダッフルコート | トグルが付くことがある |
| parka | パーカ | フード付きの防寒 |
| down jacket | ダウンジャケット | 膨らみ。袖が太くなりやすい |
| windbreaker | ウィンドブレーカー | 薄いアウトドア |
| raincoat | レインコート | 雨。表面が光る |
| cape | ケープ | 袖が消えやすい |
| cloak | クローク | ファンタジーに寄る。現代なら coat |

**ブラウスとカーディガン**

\`\`\`
1 adult woman, adult, white blouse, beige cardigan, long skirt,
upper body, looking at viewer, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**シャツの上にデニムジャケット**

\`\`\`
1 adult man, adult, oxford shirt, denim jacket, trousers,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\``,
      },
      {
        title: 'ボトムス一覧',
        content: `ボトムスは、パンツかスカートかを一つに決めます。両方を同じ強さにすると、裾が融合します。スカートは \`long skirt\`、\`pleated long skirt\`、\`knee-length skirt\`、\`midi skirt\` のように、膝から下へ布がある呼び方を使います。

| 英語タグ | 日本語 | メモ |
|---|---|---|
| trousers | トラウザーズ | 長ズボンの総称 |
| slacks | スラックス | 仕事着のズボン |
| dress pants | ドレスパンツ | スーツの下 |
| tailored trousers | テーラード | 折り目が出やすい |
| pleated trousers | プリーツパンツ | 前にひだ |
| wide-leg pants | ワイドパンツ | 裾が広い。靴が見えにくい |
| straight pants | ストレートパンツ | 幅が一定 |
| chinos | チノパン | カジュアルな綿 |
| jeans | ジーンズ | デニム。色を navy か blue で一つ |
| cargo pants | カーゴパンツ | ポケット。アウトドア |
| wool trousers | ウールのズボン | 冬の厚手 |
| culottes | キュロット | パンツとスカートのあいだ |
| long skirt | ロングスカート | 足首に近い丈 |
| maxi skirt | マキシスカート | さらに長い |
| midi skirt | ミディスカート | ふくらはぎ付近 |
| knee-length skirt | 膝丈スカート | 膝で止める起点 |
| pleated long skirt | ロングプリーツ | ひだと長さを両方 |
| a-line skirt | Aラインスカート | 裾が広がる。丈は別に書く |

**ワイドパンツ**

\`\`\`
1 adult woman, adult, white blouse, wide-leg pants, loafers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**ロングのプリーツスカート**

\`\`\`
1 adult woman, adult, knit sweater, pleated long skirt, ankle boots,
full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\``,
      },
      {
        title: 'ワンピース・ドレス・セットアップ',
        content: `ワンピースは上下がつながった一枚です。トップスとスカートを同じ強さで残すと、腰で服が二枚になります。一枚にする回は、上下の語を外して \`shirt dress\` や \`long dress\` を一つにします。

セットアップは、ジャケットとスカート、またはジャケットとパンツを同じ布として書く組です。\`suit\` だけより、部品を書いた方が襟と袖が残ります。部品の表は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。夜の長いドレスの種類は [ドレスプロンプト](/guides/dress-prompt-guide) に任せ、このページでは日常の一枚と、仕事の組を書きます。

| 英語タグ | 日本語 | メモ |
|---|---|---|
| long dress | ロングドレス | 裾を床に近づける |
| shirt dress | シャツワンピース | 前立てのある一枚 |
| sweater dress | ニットワンピース | 長めのセーター |
| wrap dress | 巻きワンピース | 前が重なる |
| a-line dress | Aライン | 裾が広がる。丈を足す |
| tea-length dress | ティレングス | ふくらはぎ付近 |
| maxi dress | マキシドレス | 足首まで |
| evening gown | イブニング | 夜の長いドレス。詳細はドレスのページ |
| coat dress | コートドレス | コートのような前立て |
| skirt suit | スカートスーツ | ジャケットとスカート |
| pantsuit | パンツスーツ | ジャケットとパンツ |
| two-piece suit | ツーピース | 上下が対の布 |

**シャツワンピース**

\`\`\`
1 adult woman, adult, shirt dress, long dress, loafers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes, extra clothes
\`\`\`

**ジャケットとスカートの組**

\`\`\`
1 adult woman, adult, blazer, blouse, knee-length skirt, pumps,
full body, standing, office, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\``,
      },
      {
        title: '靴・帽子・バッグ',
        content: `靴は、全身のときにだけ足します。\`portrait\` のまま \`loafers\` を強くしても、靴は描かれません。帽子は髪の結びと衝突します。フード付きの \`hoodie\` と \`hat\` を同時に強くしないでください。バッグは持つ手を一つにします。手の形は [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。石や金属の細かい名前は [アクセサリープロンプト](/guides/accessory-prompt-guide) へ渡します。

| 英語タグ | 日本語 | メモ |
|---|---|---|
| loafers | ローファー | カジュアルの起点 |
| oxford shoes | オックスフォード | 紐のある革靴 |
| brogues | ブローグ | 飾り穴のある革靴 |
| derby shoes | ダービー | 紐靴。仕事にも使う |
| dress shoes | ドレスシューズ | フォーマルの革靴 |
| leather shoes | 革靴 | 素材が広い。形を足す |
| pumps | パンプス | 閉じた靴。丈の短い服とは組まない |
| ballet flats | バレエフラット | 薄い底 |
| sneakers | スニーカー | 休日。革靴と同時に書かない |
| ankle boots | アンクルブーツ | くるぶし |
| boots | ブーツ | 総称。丈を足す |
| Chelsea boots | チェルシー | サイドにゴム |
| rain boots | レインブーツ | 雨の日 |
| hiking boots | ハイキングブーツ | アウトドア |
| beret | ベレー帽 | 髪が隠れやすい |
| fedora | 中折れ帽 | つば。顔に影 |
| flat cap | ハンチング | 横に広い |
| baseball cap | ベースボールキャップ | つばが前 |
| beanie | ニット帽 | 冬 |
| sun hat | サンハット | つばが広い |
| wide-brim hat | つば広帽子 | 顔が暗くなりやすい |
| handbag | ハンドバッグ | 手に持つ |
| tote bag | トート | 大きい布 |
| shoulder bag | ショルダー | 肩ひも |
| backpack | リュック | 背面。後ろ姿と相性が良い |
| clutch | クラッチ | 小さい。夜の服 |
| briefcase | ブリーフケース | 仕事 |
| belt | ベルト | 腰。服の色と分ける |
| gloves | 手袋 | 冬。指が隠れ、形は単純に |
| scarf | スカーフ | 首。コートと色が混ざる |
| eyeglasses | 眼鏡 | 顔の上。帽子と同時に強くしない |
| sunglasses | サングラス | 目が隠れる |

**ローファーまで入れた全身**

\`\`\`
1 adult woman, adult, white blouse, cardigan, long skirt, loafers,
full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes, extra shoes
\`\`\`

**ベレーとトート**

\`\`\`
1 adult woman, adult, beret, coat, long skirt, tote bag,
full body, standing, city street, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\``,
      },
      {
        title: '素材・柄・色の指定',
        content: `素材は服の名詞の直後に一つ、柄は一つ、色は部位ごとに一つです。\`denim jacket, leather jacket\` を同じ強さにすると、表面が平均の光沢になります。色を二つ以上付けるときは、服の塊を BREAK で分けます。BREAK は大文字です。記号の一覧は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、色名の辞典は [色プロンプト](/guides/color-prompt-guide) です。

モデルの配布ページに、色の分け方の推奨があればそれを優先します。BREAK が効かない UI では、色を一つに戻してから再生成してください。

| 英語タグ | 日本語 | メモ |
|---|---|---|
| denim | デニム | ジャケットかパンツの片方 |
| knit | ニット | セーター、カーディガン |
| linen | リネン | 夏。しわが描かれる |
| wool | ウール | 冬のコートとズボン |
| cotton | コットン | シャツの起点 |
| silk | シルク | 光沢。夜の服 |
| leather | レザー | ジャケットか靴。両方にはしない |
| tweed | ツイード | ジャケットの織り |
| corduroy | コーデュロイ | 畝。パンツかジャケット |
| fleece | フリース | 薄い防寒 |
| cashmere | カシミヤ | 柔らかいニット |
| satin | サテン | 夜のドレスの光沢 |
| velvet | ベルベット | 光を吸いやすい |
| chambray | シャンブレー | 薄いデニム風のシャツ |
| canvas | キャンバス | トートやスニーカー |
| plaid | プレイド | チェック。色は二色まで |
| striped | ストライプ | 方向が平均になりやすい |
| floral print | 花柄 | 小さい花。大きな花は顔に乗る |
| polka dot | 水玉 | 間隔が崩れることがある |
| gingham | ギンガム | 小さい格子 |
| checkered | チェック | plaid と同時に強くしない |
| herringbone | ヘリンボーン | 杉綾。ツイードと近い |
| houndstooth | 千鳥格子 | 白黒が混ざりやすい |
| argyle | アーガイル | ベストやソックスに寄りやすい |
| solid color | 無地 | 柄を消したいとき |
| navy | 紺 | 仕事着の起点 |
| black | 黒 | コートと靴が同化する |
| white | 白 | シャツ。背景も白いと消える |
| gray | グレー | 無地の仕事着 |
| beige | ベージュ | カーディガン、コート |
| brown | 茶 | 革と木が混ざる |
| olive | オリーブ | アウトドア |
| burgundy | バーガンディ | ニット、スカーフ |
| cream | クリーム | 白と混ざる |
| charcoal | チャコール | 濃いグレーのスーツ |
| camel | キャメル | コート |
| forest green | フォレストグリーン | ニット、コート |

**デニムの質感を一つ**

\`\`\`
1 adult woman, adult, denim jacket, white t-shirt, jeans, sneakers,
full body, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**赤のコートと紺のスカートを分ける**

\`\`\`
1 adult woman, adult, red wool coat
BREAK
navy pleated long skirt, black loafers, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\``,
      },
      {
        title: 'コーデ別テンプレ',
        content: `コーデは場面を一つにします。休日とオフィスを同じプロンプトに書くと、ネクタイとスニーカーが同時に出ます。下の八つは成人の、閉じた服です。一度に一つだけ生成し、服の語以外は動かさないでください。

| 系統 | 英語の置き方 | メモ |
|---|---|---|
| casual | casual outfit | 休日。スニーカーかローファー |
| smart casual | smart casual | シャツとジャケット。ネクタイは任意 |
| business attire | business attire | オフィス。blazer と trousers |
| streetwear | streetwear | フーディとスニーカー。一組だけ |
| outdoor wear | outdoor wear | パーカかウィンドブレーカー |
| formal wear | formal wear | 長いドレスかスーツ。場面は夜か式 |
| minimalist outfit | minimalist outfit | 無地を一つ。柄を消す |
| retro fashion | retro fashion | 年代を一つ。服の部品は残す |

**休日カジュアル**

\`\`\`
1 adult woman, adult, casual outfit, knit sweater, jeans, sneakers,
full body, standing, city street, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**オフィス**

\`\`\`
1 adult woman, adult, business attire, blazer, blouse, knee-length skirt, pumps,
full body, standing, office, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**雨の日**

\`\`\`
1 adult woman, adult, raincoat, long skirt, rain boots,
holding a closed umbrella, full body, city street, overcast
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**冬のコート**

\`\`\`
1 adult woman, adult, wool coat, turtleneck, long skirt, ankle boots, scarf,
full body, standing, winter street, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**アウトドア**

\`\`\`
1 adult man, adult, outdoor wear, parka, cargo pants, hiking boots,
full body, standing, forest path, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**フォーマル**

\`\`\`
1 adult woman, adult, formal wear, evening gown, long dress,
full body, standing, simple background, soft spotlight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**男性カジュアル**

\`\`\`
1 adult man, adult, casual outfit, oxford shirt, chinos, loafers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**男性スーツ**

\`\`\`
1 adult man, adult, business attire, suit jacket, white dress shirt, necktie, trousers, dress shoes,
full body, standing, office, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

男性の髪や体型を足すときは [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) から一つだけです。厨房や診療の仕事着は、次の自然な英語を一語だけ足します。\`chef uniform\`、\`nurse uniform\`。形が広いので、白衣の部品は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) の \`lab coat\` とシャツを優先してください。

**自然文**

\`\`\`
1 adult man in business attire: a suit jacket, a white dress shirt, a necktie, trousers, and dress shoes.
Full body, standing in a quiet office, soft daylight.
Keep the outfit closed.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, revealing clothes
\`\`\``,
      },
      {
        title: '服装を固定する・変えるコツ',
        content: `服を固定するときは、シードを固定し、チェックポイントを固定し、服の行以外を動かしません。良い一枚のシードをメモして、次の枚では髪か背景だけを変えます。シードの置き方は [サンプラーのページ](/guides/stable-diffusion-sampler-guide) です。

服だけを変えるときは、元の画像を img2img に置き、Denoising strength を軽く、プロンプトには「最終的に着ていてほしい服」を全部書きます。着ていた服の語を残したまま新しい服を足すと、二枚が重なります。部分だけ塗るなら inpaint で、服の領域だけをマスクします。手順は [img2imgの使い方](/guides/img2img-guide) です。姿勢まで画像で固定するなら [ControlNetの使い方](/guides/controlnet-guide) が先です。

\`\`\`
seed: 固定した数字
変える行: white blouse, cardigan, long skirt
残す行: 1 adult woman, adult, black hair, full body, simple background
\`\`\`

**服の色だけを差し替えた正向**

\`\`\`
1 adult woman, adult, black hair, navy blouse, cardigan, long skirt, loafers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes, extra clothes
\`\`\`

LoRA で服が上書きされるときは、着たい服を本文に残し、ファイルの強さを下げます。書き方は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。`,
      },
      {
        title: 'うまくいかないとき',
        content: `服が描かれないときは、ショットが \`portrait\` のままになっていないかを見ます。靴と丈は \`full body\` に戻してから再生成します。別の服になるときは、前の衣装の語が残っています。検索して消し、新しい服を人物の直後へ移します。

色が混ざるときは、色を一つに戻すか、BREAK で上下を分けます。重みを上げる前に、色の数を減らしてください。上げすぎると布の形より色面が勝ちます。

露出が増えるときは、正向に閉じた服を残し、ネガティブへ \`revealing clothes\` を足します。丈を短くする語は、このページの作例には入れません。膝より下の \`long skirt\` か \`knee-length skirt\` を正向に戻してください。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes, extra clothes, extra sleeves
\`\`\`

手がバッグで崩れるときは、バッグを外して全身の服を先に確定します。帽子で顔が隠れるときは、\`wide-brim hat\` を外すか、\`portrait\` で顔を確認してから全身へ戻します。

直したあとに戻す語は、一つだけです。ネガティブへ \`revealing clothes\` を足した日は、正向の服を同時に三語増やしません。露出が減ったように見えても、丈が別のスカートへ変わっていることがあります。比較は、ネガティブを足す前の枚と、足したあとの枚を、同じ seed で並べます。二枚の服の名前が同じなら、そのネガティブは形を壊していません。名前が変わっていたら、正向の服を人物の直後へ戻してから、もう一度だけ生成します。表に無い服を足したくなったときは、近い行の英語を一つ借り、メモに「自然な英語」と書いてください。借りた語が三枚効かないなら、表の短いタグへ戻します。戻さずに重みだけを上げると、効かない語が色面として残ります。色面が残った枚は、比較の基準に使いません。`,
      },
    ],
    faq: [
      {
        q: '服装プロンプトはどの順番で書けばよいですか',
        a: '人物、トップス、ボトムス、靴、小物、シーンの順です。今回強調したい服だけを人物の直後へ移してください。全部を先頭にすると、どれが効いたのかが残りません。',
      },
      {
        q: 'ワンピースと、トップス＋スカートはどう使い分けますか',
        a: '一枚のときは shirt dress や long dress だけにします。上下を別の色にするときはブラウスとスカートを書き、ワンピースの語は外します。夜の種類はドレスのガイドです。',
      },
      {
        q: '服の色が混ざるときはどうしますか',
        a: '色を一つに戻すか、大文字の BREAK で上下を分けます。小文字の break や全角では分かれません。記号の意味はプロンプトの記号のガイドを見てください。',
      },
      {
        q: '服装だけを変えるにはどうしますか',
        a: 'シードと人物の行を固定し、服の行だけを書き換えます。元画像があるときは img2img で、最終的に着ている服を全部書いてください。',
      },
      {
        q: 'このページとコスプレのページはどう違いますか',
        a: 'このページは日常の私服、オフィス、フォーマルのタグです。特定の衣装を部品に分ける手順はコスプレのガイド、作例の並びは服装カテゴリです。',
      },
      {
        q: '男性の服も同じタグですか',
        a: 'シャツ、ジャケット、トラウザーズ、革靴は共通です。髪と体型は男性キャラのガイドで一つずつ足してください。人数は 1 adult man です。',
      },
    ],
  },

  'stable-diffusion-commercial-use-guide': {
    sections: [
      {
        title: '結論',
        content: `「stable diffusion 商用利用」の答えは、モデルごとに違います。同じ画面で生成できても、SD 1.5、SDXL、SD 3.5、FLUX はライセンスが別です。サービス経由で使うときは、モデルのライセンスに加えて、そのサービスの規約が乗ります。

このページは、許可の一覧表ではありません。確認する順番と、2026年11月時点に公式ページで読めた文の範囲を置いています。売上が条件に当たるか、登録が要るか、出力を商用に使ってよいかは、引用した文のあとに必ず原文を開いてください。原文とこの要約が違って見えたときは、原文を採ります。派生ファイルを混ぜた生成は、ベースの行だけでは判断できません。六つの確認を、生成の前に紙かメモへ書き、空欄が残るファイルは公開用のフォルダへ移しません。空欄のまま「たぶんベースと同じ」と書かないでください。たぶん、は後から原文を探せなくします。

本ページは一般的な情報で、法的助言ではありません。重要な用途では規約原文や専門家に確認してください。ライセンスは改定されることがあるため、利用時点の原文を確認してください。下の表は 2026年11月時点に公式ページで読んだ範囲です。

確認は、次の六つをこの順で見ます。飛ばすと、土台は許可でも、LoRA や元画像で止まります。

\`\`\`
1. ツールやサービスの規約
2. ベースモデルのライセンス
3. 派生モデルと LoRA の、配布ページの記載
4. img2img や ControlNet に入れた参照画像の権利
5. 生成物が、既存の作品や実在の人物に似ていないか
6. 公開先（ストア、SNS、広告）の規約
\`\`\`

系統の名前は [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list)、LoRA の読み方は [LoRAの使い方](/guides/stable-diffusion-lora-guide)、参照画像の繋ぎは [ControlNetの使い方](/guides/controlnet-guide) と [img2imgの使い方](/guides/img2img-guide) です。タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、別サービスのパラメータは [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。`,
      },
      {
        title: 'ライセンス一覧',
        content: `表は 2026年11月時点です。金額や登録の要否は、利用する日の原文を開いてください。派生ファイルは、この表のベースと違う条件になっていることがあります。

| 対象 | 2026年11月時点に公式ページで読んだこと |
|---|---|
| SD 1.5 | モデルカードの License は The CreativeML OpenRAIL M license。利用制限の枠があるライセンスです。カードの Uses には research purposes の記述もあります |
| SDXL 1.0 | モデルカードの License は CreativeML Open RAIL++-M。ライセンス本文は、特定の場面では使わない、という use-based restrictions を置く、と前文に書いています |
| SD 3.5 Large など | Stability AI Community License。カードは、研究・非商用、および年間の総売上が 100 万米ドル未満の個人・組織の商用が無料、100 万米ドル超は Enterprise、と書いています |
| FLUX.1 [schnell] | モデルカードは apache-2.0 で、personal, scientific, and commercial purposes に使える、と書いています |
| FLUX.1 [dev] | FLUX.1 [dev] Non-Commercial License。モデルの利用は非商用。出力については本文に別の文があります。下に引用します |

SD 1.5 のカードは、商用であること自体を禁じる一文を、このページの確認範囲では License の欄に置いていません。Uses の「研究目的」という記述と、ライセンス本文の利用制限は別の層です。販売や広告に使う前に、OpenRAIL の利用制限の一覧を原文で見てください。SDXL も同じで、ライセンス名は商用禁止ライセンスではなく、禁止される使い方の一覧があるライセンスです。前文は、派生モデルも少なくとも同じ利用制限を含む、と書いています。

SD 3.5 Large のカードは、Community License が研究・非商用と、年間総売上 100 万米ドル未満の商用に無料、それを超える場合は Enterprise License へ連絡する、と書いています。<a href="https://stability.ai/license" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Stability AI のライセンスページ</a>の FAQ も、商用かつ年間売上が 100 万米ドルを超える場合を有料の条件として書いています。研究のみなら、組織の売上にかかわらず Community License の範囲、という FAQ もあります。同じ FAQ は、その研究を商用の製品やサービスに使うなら Stability AI への登録が必要で、売上によっては Enterprise になると書いています。別の公式記事は、モデルを商用の製品やサービスに組み込み、年間売上が 100 万米ドル未満の場合は支払いではなく届出のフォームを求める、と書いています。登録がすべての生成に必要か、製品への組み込みに必要かは、利用時点の原文で読んでください。

<a href="https://huggingface.co/stabilityai/stable-diffusion-3.5-large" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">SD 3.5 Large のモデルカード</a>は、出力の所有についても公式の案内を指しています。ライセンスページの FAQ には、Stability との関係では、Core Models またはその Derivative Works の出力は利用者が所有し、適用法と AUP に従う限り使える、という趣旨の回答があります。これは保証ではなく、FAQ の文です。

FLUX.1 [dev] は、モデルカードが、生成された出力は FLUX.1 [dev] Non-Commercial License に書かれた範囲で personal, scientific, and commercial purposes に使える、と書いています。<a href="https://huggingface.co/black-forest-labs/FLUX.1-dev" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">FLUX.1 [dev] のカード</a>と、GitHub の LICENSE 本文（v1.1.1、2026年11月に確認）には、次の文が並んでいます。

\`\`\`
Outputs are not considered Derivatives under this License.
We claim no ownership rights in and to the Outputs.
You may use Output for any purpose (including for commercial purposes), except as expressly prohibited herein.
You may not use the Output to train, fine-tune or distill a model that is competitive with the FLUX.1 [dev] Model or the FLUX.1 Kontext [dev] Model.
\`\`\`

同じライセンスは、モデルと Derivatives の利用・配布は Non-Commercial Purpose に限る、とも書いています。Restrictions には、モデル、またはモデルが生成した data を、commercial or production purposes に使わない、という制限も含まれます。出力を商用に使ってよいかは、この「出力は商用目的にも使える」という文と、「生成された data を商用に使わない」という制限の両方を原文で読んでから判断してください。モデル自体を商用に使う許諾は、本文が www.bfl.ai を見るように書いています。競合するモデルの学習に出力を使うことは、禁止する文がそのままあります。

FLUX.2 系は、この表には入れていません。名前の整理はモデル一覧の、確認した日の行を見たうえで、利用時点の公式カードを開いてください。

\`\`\`
確認したページ（2026年11月）
SD 1.5 card: https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5
SDXL card: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0
SDXL license: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md
SD 3.5 Large: https://huggingface.co/stabilityai/stable-diffusion-3.5-large
Stability license: https://stability.ai/license
Community license update: https://stability.ai/news-updates/license-update
SD 3.5 announcement: https://stability.ai/news-updates/introducing-stable-diffusion-3-5
FLUX.1 schnell: https://huggingface.co/black-forest-labs/FLUX.1-schnell
FLUX.1 dev license: https://github.com/black-forest-labs/flux/blob/main/model_licenses/LICENSE-FLUX1-dev
\`\`\``,
      },
      {
        title: '派生モデル・LoRA の確認方法',
        content: `ベースが商用できるライセンスでも、派生のチェックポイントや LoRA が別の条件になっていることがあります。見る場所は、ファイルの配布ページに書かれたライセンス名です。作例の絵の雰囲気では判断しません。配布ページには成人向けの作例が含まれることがあります。閲覧に注意してください。このページは、成人向けの作品が集まるサイトへはリンクしません。

\`\`\`
配布ページで見る行
ベースモデル名
ライセンス名
商用の可否
生成物の条件
再配布の条件
成人向け出力の禁止があるか
\`\`\`

説明が無いファイルは、公開用の枚に使いません。試し用のフォルダと、公開用のフォルダを分けておくと、後から読み直す場所が残ります。LoRA の強さや書き方は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。\`<lora:名前:0.7>\` は呼び方であり、ライセンスの許可ではありません。`,
      },
      {
        title: '入力画像の権利',
        content: `img2img と ControlNet は、入れた画像の構図や線を出力に残します。元画像は、自分で撮影したもの、自分で作ったもの、使用が許されたものだけにしてください。他人の作品、許可のない人物の写真、既存のキャラクターの絵は入れません。

文化庁の考え方でも、既存の著作物そのものを画像生成の指示として入れる行為は、利用者がその著作物を認識していた場合の例に挙がっています。権利の整理は次の節です。手順としての Denoising は [img2imgの使い方](/guides/img2img-guide)、姿勢の参照は [ControlNetの使い方](/guides/controlnet-guide) です。

\`\`\`
参照画像のメモ
撮影者または制作者:
許可の範囲:
人物が写っている場合の同意:
このファイルを使った生成の日付:
\`\`\``,
      },
      {
        title: '著作権・肖像権の考え方',
        content: `日本の著作権について、このページが参照するのは文化庁の「AIと著作権に関する考え方について」（令和6年3月15日、文化審議会著作権分科会法制度小委員会）です。文書自身が、法的な拘束力はなく、特定のサービスの確定的な評価でもない、と書いています。<a href="https://www.bunka.go.jp/seisaku/bunkashingikai/chosakuken/pdf/94037901_01.pdf" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">文化庁のPDF</a>を、利用時点の版で読んでください。

生成・利用段階の要点として文書が整理しているのは、既存の著作物との類似性と依拠性です。人間が AI を使わずに作る場合と同様、両方が認められると侵害になり得る、という整理です。類似性は、アイデアや作風が共通するだけでは足りず、表現上の本質的な特徴を直接感得できるか、という既存の判断を生成物にも当てはめる、と書かれています。依拠性は、利用者が既存の著作物を認識していた場合に加え、学習データに含まれ、似た生成物が出た場合の推認にも触れています。このページは、その整理を一般論として置くだけで、個別の画像が侵害かどうかは判断しません。

実在の人物に似せる、他人の顔を置き換える、既存の作品名やキャラクター名をプロンプトに入れる、はこのサイトの作例ではやりません。ライセンスが商用を許していても、肖像や第三者の権利は別です。

\`\`\`
公開前に自分で見る項目
既存の作品に、構図や衣装や顔が寄っていないか
実在の人物に見える顔になっていないか
入力した固有名詞が残っていないか
\`\`\``,
      },
      {
        title: 'Midjourney・FLUX など他ツールとの違い',
        content: `Midjourney は、モデルファイルのライセンスではなく、サービスの Terms of Service です。2026年11月に読んだ Terms の版表示は、Version Effective Date: May 27, 2026 でした。<a href="https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Terms of Service</a>の Content Rights は、利用者がサービスで作った Assets を、適用法の下で可能な範囲で所有する、と書いています。例外として、年間売上が 1,000,000 米ドルを超える会社、またはその従業員は、Assets を所有するために Pro または Mega のプランである必要がある、と書いています。別の公式記事も、年間の総売上が 1,000,000 米ドルを超える事業は、会社として商用に使うために Pro または Mega が必要、と書いています。料金の数字はこのページには書きません。他人の画像をアップスケールしても、所有は元の制作者のまま、という例外も Terms にあります。会員を後から下げたり解約したりしても、作った Assets の所有は残る、とも書いています。プラン名や売上条件は改定されるので、利用時点の原文を見てください。書き方は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。

FLUX.1 [schnell] は、上の表のとおりカードが Apache 2.0 と商用可能な用途を書いています。FLUX.1 [dev] は、モデルは非商用ライセンス、出力の文は前の節の引用です。schnell で許可されているから dev も同じ、ではありません。

NovelAI は別の利用規約です。2026年11月に https://novelai.net/terms を開くと、Effective: December 8th, 2025 とあり、利用者が生成した Content の権利は利用者に残り、運営は所有権を主張しない、と書かれていました。禁止事項やサブスクリプションの条件は別の条項です。料金は書きません。原文を確認してください。

\`\`\`
比べるときはこの三つだけ
どの契約か（モデルのライセンスか、サービスの規約か）
売上やプランの条件が書かれているか
出力の所有と、モデル自体の利用が別の文になっていないか
\`\`\``,
      },
      {
        title: '用途別の確認ポイント',
        content: `ここは許可の一覧ではありません。用途が変わると、見る契約が変わります。各行は、公開の前に開く場所です。

| 用途 | 確認する点 |
|---|---|
| ブログの挿絵 | ベースと LoRA のライセンス、記事に載せる範囲、実在の人物に似ていないか |
| 同人誌やグッズの販売 | 販売が商用に当たるかは契約の定義を読む。派生ファイルの再配布条項は別 |
| 広告バナー | 広告先の媒体規約と、モデル側の利用制限。実在の商品や人物に寄せない |
| 社内資料 | 社内でも、商用の事業に使うなら売上条件の対象になる契約がある |
| 受託制作 | 納品先の利用範囲と、自分側のライセンスの両方。クライアントのロゴや写真の権利 |

受託では、生成に使ったモデル名を納品メモに残します。後からライセンスを読み直すときに、ファイル名が無いと確認できません。`,
      },
      {
        title: '商用向けプロンプト例',
        content: `下は、権利の確認が済んだあとに使う、架空の題材です。実在の人物、実在の商品、既存のキャラクターは書きません。人物がいる行は \`adult\` を残します。

**仕事の肖像**

\`\`\`
1 adult woman, adult, business attire, blazer, blouse, looking at viewer,
upper body, plain gray background, soft daylight, photorealistic
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

**机の上の製品写真（人物なし）**

\`\`\`
product photo, a plain ceramic cup on a wooden table,
soft daylight, simple background, centered
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, logo, watermark
\`\`\`

**風景の横長バナー（人物なし）**

\`\`\`
landscape, wide banner, hills, river, soft morning light, clear sky, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

**料理の写真（人物なし）**

\`\`\`
food photo, a bowl of soup on a table, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

**平坦なアイコン（人物なし）**

\`\`\`
flat icon set, a simple cup, a simple leaf, a simple book,
solid background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark, photorealistic
\`\`\`

**オフィスの場面**

\`\`\`
1 adult man, adult, business attire, suit jacket, white dress shirt,
sitting at a desk, laptop closed, office, soft daylight, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

自然文で同じ肖像を頼むときは、記号の重みを付けません。

\`\`\`
1 adult woman in business attire, blazer and blouse, looking at the camera.
Upper body, plain gray background, soft daylight, photorealistic.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, revealing clothes
\`\`\``,
      },
      {
        title: '販売・公開前チェックリスト',
        content: `生成の記録と、クレジットの文面を、画像と同じフォルダに残します。記録が無い枚は、公開用のフォルダへ移しません。

記録は、綺麗な文である必要はありません。モデル名、ライセンス名、原文を見た日、LoRA の有無、参照画像の出所、の五行が埋まっていれば足ります。クレジットの例は、義務がある場合の文面ではなく、フォルダに残すための例です。義務かどうかは、そのライセンスのクレジット条項を読んでから足してください。条項が無いライセンスに、別のモデルのクレジット文をコピーしないでください。チェックリストの最後の行は、売上やプランの条件です。個人の試しと、事業の公開では、当たる行が違います。試しの枚を、条件を見ないまま事業のフォルダへ移さないでください。

\`\`\`
生成記録
日付:
ツールまたはサービス名:
モデル名とバージョン:
ライセンス名（原文を見た日）:
LoRA 名と、配布ページのライセンス:
seed:
参照画像の出所と許可:
公開先:
\`\`\`

クレジットの例です。ライセンスがクレジットを義務にしていなくても、後から読む人のために残します。義務かどうかは原文です。

\`\`\`
Image generated with an AI model.
Model: （モデル名）
License checked on: 2026-11-（日）
\`\`\`

\`\`\`
公開前
[ ] サービスの規約を開いた
[ ] ベースモデルの原文を開いた
[ ] 派生と LoRA の記載を開いた
[ ] 参照画像の権利を書いた
[ ] 既存作品と実在人物に寄せていない
[ ] 公開先の規約を開いた
[ ] 売上やプランの条件に自分が当たるか見た
\`\`\`

本ページは一般的な情報で、法的助言ではありません。重要な用途では規約原文や専門家に確認してください。

チェックが全部埋まっても、生成物が既存の作品に似ていれば、ライセンスの行とは別に止まります。似ているかどうかの判断は、文化庁の文書が一般論として整理している類似性と依拠性に戻って、自分の画像と既存の作品を並べて見てください。このページは、その判断をしません。並べて見て迷う枚は、公開用のフォルダから外します。外した理由を記録の一行に残すと、同じ参照画像を次の週に再度置かずに済みます。サービス経由で生成した枚は、ローカルのモデル名だけでは足りません。サービス名と、その日の規約を見たメモを、モデル名の隣に書いてください。規約の画面が後から変わることがあるので、見た日を省かないでください。料金の数字は、この記録にも書かなくて構いません。条件に当たるかどうかの行だけを残します。`,
      },
    ],
    faq: [
      {
        q: 'Stable Diffusion は商用利用できますか',
        a: 'バージョンで違います。SD 1.5 は CreativeML OpenRAIL-M、SDXL 1.0 は CreativeML Open RAIL++-M、SD 3.5 は Community License です。利用制限、売上、登録の有無は、2026年11月時点の公式ページでも文が分かれています。原文を確認してください。',
      },
      {
        q: '年間売上の条件はどのモデルですか',
        a: '2026年11月時点で、SD 3.5 の Community License に 100 万米ドルの記載があります。Midjourney の Terms には、100 万米ドルを超える会社の所有と商用に Pro または Mega が必要、という記載があります。SD 1.5 と SDXL のライセンス名は別です。',
      },
      {
        q: 'FLUX.1 dev の出力は商用に使えますか',
        a: 'ライセンス本文には、出力を商用目的を含む任意の目的に使ってよい、という文と、モデルが生成した data を商用に使わない、という制限が両方あります。原文を読んでから判断してください。モデル自体の商用利用は非商用ライセンスの範囲外です。',
      },
      {
        q: 'LoRA だけ許可されていれば公開できますか',
        a: 'いいえ。土台のチェックポイント、LoRA、入力画像の、いちばん厳しい条件に合わせます。記載が無いファイルは公開用に使いません。',
      },
      {
        q: 'このページは法的な助言ですか',
        a: 'いいえ。一般的な情報です。ライセンスは改定されます。重要な用途では原文と、必要なら専門家に確認してください。',
      },
    ],
  },

  'prompt-symbols-guide': {
    sections: [
      {
        title: '記号一覧',
        content: `「プロンプト 記号」は、ツールごとに意味が違います。Stable Diffusion の WebUI で重みになる括弧が、ChatGPT ではただの記号です。このページは、WebUI と Forge、ComfyUI、NovelAI、Midjourney、文章モデルを一枚に並べます。数値は、2026年11月に読んだ Automatic1111 の Features に書いてあった倍率です。版によって表示名や仕様が違うことがあります。最新の仕様は公式ドキュメントで確認してください。

タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、NovelAI の数値強調の詳細は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide)、パラメータは [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。品質の語は [品質タグ一覧](/guides/quality-tags-prompt-guide)、入れない側は [ネガティブプロンプト](/guides/negative-prompt-guide)、ファイルの呼び出しは [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

記号は、服と人物が三枚同じに見えてから一つだけ足します。人物、服、背景を固定したまま、括弧を付けた枚と外した枚を並べてください。二枚が同じなら、そのモデルでは括弧より語の位置の方が先です。強調したい名詞を人物の直後へ移し、括弧は外したまま再生成します。倍率を上げる前に、括弧と数字が半角かも見ます。全角のままでは、記号が文字として画面の隅に出ることがあります。ChatGPT で通った文を、WebUI の括弧へ機械的に変換しないでください。変換は、下のツール別の表に戻ってから一つずつです。メモには、付けた記号の名前だけを残します。括弧と BREAK と AND を同じ日に足すと、どの記号が色を分けたのかが残りません。

| 記号 | 意味 | 使えるツール | 例 |
|---|---|---|---|
| (word) | 注意を 1.1 倍 | WebUI / Forge | 丸括弧を一組 |
| ((word)) | 1.1 を重ねて 1.21 倍 | WebUI / Forge | 二重の丸括弧 |
| [word] | 注意を 1.1 で割る | WebUI / Forge | 角括弧 |
| (word:1.5) | 指定した倍率 | WebUI / Forge。数値は丸括弧だけ | 1.5 は強い |
| バックスラッシュ | 括弧を文字として残す | WebUI / Forge | タグ名に括弧があるとき |
| BREAK | 大文字で、次の 75 トークンのかたまりを始める | WebUI / Forge | 色を分ける |
| AND | 大文字で、プロンプトを合成する | WebUI の composable diffusion | 場面を二つ |
| 角括弧とコロン | ステップの途中で文を入れ替える | WebUI の prompt editing | from と to と when |
| 波括弧 | NovelAI では約 1.05 倍 | NovelAI | SD の丸括弧とは別 |
| 二重コロン | プロンプトを分けて重みを付ける | Midjourney | 公式のパラメータは別ページ |
| カンマ | タグの区切り | SD と NovelAI | 空白だけにしない |
| アンダースコア | タグ内の空白の代わり。どちらも通ることが多い | モデルによる | 片方に揃える |

\`#\` をコメントとして消す仕様は、Features の説明にはありません。行に残すと、文字としてプロンプトに入ります。

<a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Features</a>が、括弧、BREAK、AND、prompt editing の一次情報です。`,
      },
      {
        title: '括弧と重み付け',
        content: `Features の Attention/emphasis は、次のように書いています。\`(word)\` は 1.1 倍、\`((word))\` は 1.21 倍、\`[word]\` は 1.1 で割る、\`(word:1.5)\` は 1.5 倍です。数値の指定は丸括弧だけで、角括弧には数値を書けません。書かないときの丸括弧は 1.1 とみなします。

1.4 を超えると、強調した語以外の形が崩れやすくなります。このページの作例は 1.2 までです。目安であり、最適な値ではありません。モデルの配布ページに推奨があればそれを優先してください。

二重の丸括弧は、1.1 を二回掛けた 1.21 です。三重にすると、Features の式ではさらに 1.1 を掛けた値になります。このページでは三重を使いません。数値で 1.2 と書いた方が、後から読んだときに倍率が残ります。丸括弧を重ねた枚と、\`(word:1.2)\` の枚は、近いこともあれば、コンマの位置で違って見えることもあります。比較はどちらか一方に揃えてください。角括弧で弱めた語がまだ残るときは、正向からその語を消す方が確実です。弱める記号は、消す前の確認に使います。ネガティブへ移す語と、角括弧で残す語を同じ日に増やさないでください。ComfyUI で同じ 1.2 を書いても、WebUI の 1.2 と画素が一致するとは限りません。一致させたいときは、シードとモデルを揃えたうえで、片方の UI だけで三枚比べます。

\`\`\`
1 adult woman, adult, (navy blazer:1.2), white blouse, long skirt,
upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

弱めるときは、消したい語を角括弧に入れるか、数値を 1 より小さくします。\`(word:0.25)\` は、Features では 0.25 で割った倍率、つまり弱くする例として載っています。

\`\`\`
1 adult woman, adult, white blouse, [hat], long skirt,
upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

ComfyUI の CLIP Text Encode では、\`(word:1.2)\` の形が重みとして通る実装が一般的です。計算が WebUI と完全に同じとは限りません。公式ノードの説明は、重みの式そのものより、conditioning の繋ぎを書いています。`,
      },
      {
        title: 'BREAK',
        content: `BREAK は大文字です。Features は、BREAK が今のかたまりを埋めて、その後の文を新しいかたまりから始める、と書いています。通常の長さは 75 トークンずつです。小文字の break、全角のＢＲＥＡＫでは、区切りになりません。

短いプロンプトに BREAK を入れても、かたまりが埋まって見えるだけで、絵が変わらないことがあります。色が混ざっている枚で、上下の名詞がまだ同じかたまりにいるかを先に見てください。BREAK の前後に空行を入れたつもりが、プロンプト欄では一行になっていることもあります。欄の中では、BREAK の前後を半角スペースか改行のどちらにするかを、その UI の説明に合わせます。このページの作例は、BREAK を単独の行にしています。二人の作例は、一人目と二人目の服を分けています。画面の左右を固定する機能ではないので、左右が入れ替わることがあります。位置が要るときは、記号を増やす前に二人構図のガイドへ移ってください。ComfyUI で同じ文を CLIP Text Encode に一つだけ入れると、BREAK の行がただの単語になることがあります。そのときは、encode を二つに分け、Conditioning (Concat) でつなぎます。ノードを増やした日は、プロンプトの語を動かさないでください。

色が混ざるときは、上下の服を BREAK で分けます。服のタグ自体は [服装プロンプト一覧](/guides/clothing-prompt-guide) です。

\`\`\`
1 adult woman, adult, red wool coat
BREAK
navy long skirt, black loafers, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

二人を描き分けるときも、人物ごとにかたまりを分けられます。これは領域を画面の左右に固定する機能ではありません。位置まで画像で固定する手順は別です。二人の距離は [二人構図](/guides/two-person-composition-prompt-guide) です。

\`\`\`
2 adults, 1 adult woman, adult, black hair, white blouse, long skirt
BREAK
1 adult man, adult, short hair, suit jacket, necktie, trousers
standing side by side, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, revealing clothes
\`\`\`

ComfyUI では、BREAK という語が標準のコア構文として必ず分割されるわけではありません。公式の <a href="https://docs.comfy.org/built-in-nodes/ConditioningConcat" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Conditioning (Concat)</a> は、conditioning_from を conditioning_to へ結合するノードです。複数の CLIP Text Encode をこのノードでつなぐのが、かたまりを分けるときの公式ノードのやり方です。ComfyUI では標準では使えない場合があります。ノード名は版で違います。`,
      },
      {
        title: 'AND・縦線・コロン',
        content: `AND は大文字です。Features は、複数のプロンプトを合成する composable diffusion として説明しています。例は \`a cat AND a dog\` です。重みは、かたまりのうしろに \`:1.2\` のように付け、書かないときは 1 です。0.1 より小さい値はほとんど効かない、とも書いています。

AND は、BREAK の代わりではありません。BREAK はトークンのかたまりを分け、AND はプロンプトの合成です。色滲みを直す目的なら、先に BREAK を一回だけ試します。AND を足すのは、背景の明るさのように、主題と別の条件を弱く足したいときです。両方を同じプロンプトに入れると、どちらが色を分けたのかが残りません。prompt editing の when は、ステップの割合かステップ数です。0.5 は半分より後、と覚えるより、小数なら割合、整数ならステップ、と Features の文のまま使ってください。切り替えたあとの語が描かれる力は、when が遅いほど小さい、とも書いています。服の色を途中で変える作例は、形が決まってから試します。形が揺れているあいだに when を動かすと、色の差なのか形の差なのかが残りません。全角コロンは、この区切りになりません。

\`\`\`
1 adult woman, adult, white blouse, long skirt, simple background
AND
soft daylight, plain wall :0.6
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

prompt editing の基本は、Features が \`[from:to:when]\` と書いています。from と to は任意の文、when が切り替わるタイミングです。0.0 から 1.0 の小数はステップ数の割合、小数点のない正の整数はステップ数です。\`[to:when]\` は後から語を足し、\`[from::when]\` は後から語を外します。ネストもできる、と書いています。

\`\`\`
1 adult woman, adult, [white blouse:navy blouse:0.5], long skirt,
upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

縦線は、Features の Prompt matrix では、組み合わせごとに別の画像を作るスクリプトです。プロンプト本文の角括弧の中を縦線で分ける書き方は、ステップごとに語を入れ替える用途で説明されることがあります。このページで読んだ Features の本文は、縦線を Prompt matrix として説明していて、角括弧の入れ替えとは別の節です。同じ記号でも機能が違います。手元の版の説明を確認してください。

全角のコロンや、全角の括弧は、これらの区切りになりません。半角に戻してから再生成します。`,
      },
      {
        title: 'エスケープと特殊文字',
        content: `タグ名そのものに括弧があるときは、バックスラッシュで括弧を文字として残します。Features の例は、丸括弧をエスケープしてプロンプトに残す、という説明です。下は、作品名ではない、服の呼び方の例です。

エスケープが要るのは、タグの綴りの一部として括弧がいるときだけです。強調のための丸括弧と、タグ名の括弧を同じ語に重ねないでください。重ねると、バックスラッシュが重みの位置をずらします。一度、括弧のない短いタグへ戻して絵が安定してから、エスケープ付きの名前を一語だけ足します。LoRA の山括弧は、呼出しの記号です。本文の説明に山括弧を書くときは、コードとして置くか、呼出しの行としてプロンプトの末尾に置きます。説明の文の途中に山括弧を混ぜると、ファイル名がタグとして残り、画面の隅に文字が出ることがあります。出たときは、\`<lora:...>\` の行を本文から外し、Load LoRA か一覧からの挿入に戻してください。アンダースコアと空白は、同じタグの書き方として両方通ることが多い、というところまでがこのページの範囲です。どちらが公式の唯一の綴りかは、モデルごとに違います。

\`\`\`
1 adult woman, adult, coat_\\(wool\\), long skirt,
upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

エスケープしないと、括弧が重みの記号として消費され、タグ名の一部が消えます。LoRA の \`<lora:名前:0.7>\` も、本文に残すと呼出しです。ファイル名の括弧は、エスケープの対象になることがあります。LoRA のタグは生成後に本文から取り除かれる、と Features は書いています。呼び方の詳細は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

\`\`\`
1 adult woman, adult, white blouse, long skirt,
<lora:example-style:0.7>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

カンマは区切り、アンダースコアはタグの中の空白の代わりです。\`long hair\` と \`long_hair\` は、どちらも通るモデルが多いです。両方を同じ強さで書くと、同じ意味が二重になることがあります。片方に揃えてください。どちらが残るかはモデルによります。`,
      },
      {
        title: 'ツール別の違い',
        content: `同じ括弧を、別のツールへ貼らないでください。NovelAI の波括弧は、Features が NAI の倍率を 1.05 と書いています。\`{word}\` は WebUI の \`(word:1.05)\` に近い、という対照です。\`1.5::タグ::\` の書き方は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) に任せ、このページでは繰り返しません。

貼り替えの手順は、記号を全部外してから、そのツールの列の記号を一つ戻す、です。WebUI の丸括弧が残った NovelAI の文は、強調にならないだけでなく、括弧がタグの一部として残ります。Midjourney では、重みの括弧を外し、必要なパラメータだけを文の外に置きます。パラメータの意味をこのページで増やしません。ChatGPT と Gemini では、強調したい名詞を文の前の方へ書き、「入れないもの」は否定の文にします。記号を残した自然文は、モデルが記号を絵の中の文字として描くことがあります。描かれたら、記号を消して同じ文を再生成してください。表の「注意」の列は、そのツールで最初に外すものです。列を飛ばして、別のツールの倍率をコピーしないでください。

| ツール | 強調 | 弱める | 区切り | 注意 |
|---|---|---|---|---|
| WebUI / Forge | 丸括弧、または数値 | 角括弧 | BREAK と AND | 大文字と半角 |
| ComfyUI | CLIP Text Encode の (word:1.2) | 数値を 1 未満 | Conditioning Concat | BREAK は標準では使えない場合がある |
| NovelAI | 波括弧、または数値強調 | 角括弧 | カンマ | SD の 1.1 とは倍率が違う |
| Midjourney | 二重コロンの重み | --no | 文として書く | 括弧の重みは外す |
| ChatGPT / Gemini | なし | 文で「入れない」 | 句点 | 記号は重みにならない |

Midjourney の \`::\`、\`--no\`、\`--ar\` は、パラメータのページへまとめてあります。倍率の数字をこのページで追加しません。

\`\`\`
1 adult woman in a navy blazer and a long skirt, upper body, plain background.
Do not add extra people.
\`\`\`

この自然文には、括弧の重みを付けていません。文章モデルでは、\`(blazer:1.2)\` は強調にならず、文字として残ることがあります。`,
      },
      {
        title: '実用テンプレ',
        content: `下は、記号を一つだけ足した成人の作例です。記号を三つ同時に試すと、どれが効いたのかが残りません。

保存するときは、ファイル名に記号の種類を入れます。色分け、強調、弱め、途中切り替え、と分けておくと、翌日にどのテンプレから再開するかが残ります。テンプレの服を別の色に差し替えるときは、記号の行は残し、色の単語だけを変えます。記号ごと書き換えると、服の差なのか記号の差なのかが消えません。人物はどのテンプレも成人です。人数を省いたコピーは、端に別の人が足されることがあります。自然文のテンプレは、括弧を付けずに保存してください。後から WebUI 用が必要になったら、ツール別の表に戻って丸括弧を一つだけ足します。

**色を分ける**

\`\`\`
1 adult woman, adult, beige cardigan
BREAK
navy pleated long skirt, loafers, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**ジャケットだけ少し強く**

\`\`\`
1 adult man, adult, (charcoal suit jacket:1.2), white dress shirt, necktie, trousers,
upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**帽子を弱める**

\`\`\`
1 adult woman, adult, coat, long skirt, [wide-brim hat],
full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**途中で背景の明るさを変える**

\`\`\`
1 adult woman, adult, white blouse, long skirt,
[soft daylight:overcast daylight:0.5], simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**NovelAI 寄りの波括弧は、SD では使わない**

\`\`\`
1 adult woman, adult, {white blouse}, long skirt
\`\`\`

上の波括弧は、NovelAI 用です。WebUI に貼ると、強調にならないことがあります。WebUI では丸括弧に戻してください。

**自然文**

\`\`\`
1 adult woman, white blouse and long skirt, full body, plain background.
Keep the blouse and the skirt as separate colors.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '効かないとき',
        content: `小文字の break は、Features の BREAK になりません。全角の括弧、全角のコロン、全角の数字も、区切りとして読まれないことがあります。一度、半角だけに置換して再生成してください。

効かないときの順番は、半角、大文字、矛盾する語、ツール、の四つです。半角に直しただけで絵が変わるなら、倍率はまだ触りません。矛盾する語を消しただけで変わるなら、括弧は外したままにします。ツールが違うと分かったときは、そのツールの表の記号へ翻訳してから、元の倍率の数字は捨てます。1.1 と 1.05 は別の体系です。数字を残したまま波括弧へ移すと、意図より強くなります。チェックの五行は、生成の前にプロンプトの下へコメントではなく、別のメモとして残します。プロンプト欄に \`#\` で書くと、その行がタグとして混ざることがあります。

五行が全部済んでも絵が変わらないときは、記号を全部外した短いプロンプトへ戻します。人物、服、背景だけの三行で一枚出し、その枚に記号を一つ戻します。戻した一つで絵が動くなら、他の記号はまだ足しません。動かないなら、その記号はそのモデルでは弱いので、ツール別の表の別の列を見ます。弱い記号を 1.8 まで上げて通そうとすると、服の形が先に崩れます。崩れた枚は、倍率の成功例として保存しないでください。保存するのは、記号を外した基準と、一つだけ足して形が残った枚の対です。対が無いフォルダは、翌日にどの括弧が要るかが分かりません。

重みを 1.6 や 1.8 まで上げても服が変わらないときは、括弧の外に逆の語が残っています。\`coat\` を強調したまま \`dress\` が残っていると、平均の服になります。強調の前に、矛盾する語を消します。

WebUI で効いた括弧を ComfyUI や NovelAI や Midjourney へ貼っても、同じ倍率にはなりません。ツールの表に戻って、そのツールの記号だけを残してください。\`#\` でメモを書いた行がプロンプトに混ざっているときも、その行を消します。

\`\`\`
チェック
BREAK は大文字か
括弧とコロンは半角か
数値は丸括弧の中か
逆のタグが残っていないか
貼った先のツールは、その記号を使うか
\`\`\``,
      },
    ],
    faq: [
      {
        q: '丸括弧は何倍ですか',
        a: 'Automatic1111 の Features では、(word) が 1.1 倍、((word)) が 1.21 倍、(word:1.5) が指定した倍率です。角括弧は 1.1 で割ります。数値は丸括弧にだけ書きます。',
      },
      {
        q: 'BREAK が効きません',
        a: '大文字か、半角か、を見てください。小文字や全角では新しいかたまりになりません。ComfyUI では標準では使えない場合があり、Conditioning (Concat) で分けます。',
      },
      {
        q: '角括弧と縦線は何ですか',
        a: 'Features の Prompt matrix は、縦線で別画像の組み合わせを作ります。プロンプト本文の角括弧は prompt editing で、from、to、when をコロンで書きます。同じ縦線でも機能が違うことがあります。',
      },
      {
        q: 'NovelAI の波括弧は Stable Diffusion と同じですか',
        a: '同じではありません。Features は NAI の倍率を 1.05 と書いています。1.5::タグ:: の書き方は NovelAI のガイドを見てください。',
      },
      {
        q: 'ChatGPT で括弧は強調になりますか',
        a: 'なりません。着たい服と、入れたくないものを文で書いてください。',
      },
    ],
  },

  'img2img-guide': {
    sections: [
      {
        title: 'img2img とは',
        content: `「stable diffusion img2img」は、すでにある画像を出発点にして、プロンプトの方向へ少しずつ描き直す機能です。txt2img はノイズから始めます。img2img は、元画像の形をどのくらい残すかを Denoising strength で決めます。0 に近いと元のまま、1 に近いと別の絵です。

このページの数字は目安です。モデルの配布ページに推奨値があればそれを優先してください。バージョンによって表示名や仕様が違うことがあります。最新の仕様は公式ドキュメントで確認してください。

最初の一枚は、Denoising strength だけを変えるための基準です。プロンプトを長くする前に、元画像と、0.4 の一枚と、0.6 の一枚を同じシードで残します。三枚の差が、その画像で強さがどのくらい効くかの物差しになります。物差しが無い状態で服の語を五個足すと、強さのせいなのか語のせいなのかが残りません。人物が写る画像では、完成図の人数を \`adult\` で書きます。ラフに人数が描いてあっても、プロンプト側の人数を省くと、清書の段階で人数が増減します。背景だけの画像では、人数の行を入れません。入れた行は、空の風景の端に人を足します。

人物を描くときは \`adult\` を残します。元画像は、自分で撮影したもの、自分で作ったもの、使用が許されたものだけです。顔を他人と入れ替える使い方は書きません。姿勢を線で固定するなら [ControlNetの使い方](/guides/controlnet-guide)、服のタグは [服装プロンプト一覧](/guides/clothing-prompt-guide)、サンプラーは [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide)、ライセンスは [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) です。

\`\`\`
txt2img: プロンプトだけから始める
img2img: 画像 + プロンプト + Denoising strength
\`\`\``,
      },
      {
        title: '基本の手順',
        content: `WebUI と Forge では、img2img のタブに画像を置き、最終的に欲しい絵をプロンプトに書き、Denoising strength を決めてから生成します。プロンプトは「変えたい部分」だけにしないでください。残したい服や背景も、最終形として書きます。書かないと、元画像の平均に戻ります。

タブの名前は、版によって img2img のままのことも、別の表記のこともあります。生成ボタンの前に、今の欄が txt2img ではなく、画像を受け取る側かを確認します。画像を置いたつもりが、プレビューだけで latent に渡っていないことがあります。渡っていれば、Denoising を 0.2 に下げたときに元画像に近い絵が戻ります。戻らないときは、手順の 1 に戻って、画像の欄が空でないかを見てください。寸法は、元画像の縦横に近い値から始めます。最初から二倍の辺へ広げると、Resize mode の差と Denoising の差が同時に出ます。拡大は、形が三枚安定してから Hires. fix か、inpaint の Only masked に分けます。

Features が Resize mode として説明している名前は三つです。Just resize は、縦横を無視して目標の寸法へ引き伸ばします。Crop and resize は、縦横比を保ったまま目標を埋め、はみ出した部分を切ります。Resize and fill は、縦横比を保ったまま画像全体が収まるようにし、余白を元画像の端で埋めます。潜在空間で拡大する処理は、同じ wiki では Hires. fix のアップスケーラーとして説明されています。img2img の Resize mode に似た名前が出る版もあります。表示名は画面で確認してください。

\`\`\`
1. 自分に権利がある画像を置く
2. 最終的な絵をプロンプトに書く
3. Resize mode を、引き伸ばしたくないなら Crop and resize か Resize and fill
4. Denoising strength を目安の範囲から一つ
5. seed を固定して、強さだけを 0.05 ずつ動かす
\`\`\`

ステップ数は 20 から 30 を目安にします。CFG は、多くの SDXL 系で 5 から 7、A1111 の初期値として 7 が入っている画面があります。どちらも目安です。

\`\`\`
Steps: 28
CFG: 7
Denoising strength: 0.45
Resize mode: Crop and resize
\`\`\``,
      },
      {
        title: 'Denoising strength の目安',
        content: `表は目安です。同じ 0.4 でも、モデルと元画像で結果は違います。比較はシードを固定し、この数字だけを動かします。

0.05 刻みで動かすのは、0.4 の前後だけにします。0.2 から 0.8 までを一度に七枚出すと、どの枚が境目だったかが残りません。境目は、服の色は変わったが顔の輪郭は残っている、という一枚です。その数字をメモして、次の日の起点にします。境目より上では、顔を残す目的を諦めて、inpaint に切り替えてください。全体の強さで顔を守ろうとすると、服の色も戻ります。蒸留されたモデルや、ステップ数が極端に少ないモデルでは、同じ 0.4 でも変化が大きく見えることがあります。カードが denoise や strength の推奨を書いているときは、表よりカードを先にします。

| 強さの目安 | 残り方 | 向いていること |
|---|---|---|
| 0.15–0.30 | ほぼ元のまま | ノイズを少し整える、ごく薄い修正 |
| 0.30–0.50 | 形は残り、色や細部が動く | 服の色、時間帯、軽い清書 |
| 0.50–0.70 | 構図は残り、中身が変わる | 画風の変更。顔は別人になりやすい |
| 0.70–0.85 | 元はヒント程度 | ラフから別の絵。形は保証されない |
| 1.0 付近 | txt2img に近い | 元の形を残す目的には使わない |

0.3 から 0.5 は、軽い変更の起点としてよく使われます。服の色だけを変えるときも、この範囲から始めてください。顔を残したいときは、画像全体の強さを上げず、次の節の inpaint に移ります。`,
      },
      {
        title: 'プロンプトの書き方',
        content: `プロンプトは、完成図を書きます。ラフの線を「消して」とは書きません。清書された服装と背景を書きます。画風を変えるときは [画風プロンプト](/guides/art-style-prompt-guide) の語を一つだけ足します。

六つの作例は、目的が違います。ラフの清書、写真の塗り、時間帯、服の色、画風、細部です。一つの元画像に六つを連続で掛けないでください。元画像をコピーして、目的ごとにファイルを分けます。分けないと、夕方にした枚の上に画風を掛け、さらに色を変えて、どの段階の強さが残っているのかが消えます。服の色を変える作例は、閉じた服から閉じた服です。布の領域を減らす指示は書きません。写真をアニメ寄りにする作例は、自分の写真か、写っている成人の同意がある写真だけです。他人の顔を別の顔にする手順は、この六つの中にありません。自然文は、画像を一緒に渡せるチャット向けです。渡す画像の権利は、タグの作例と同じです。

**ラフから清書**

\`\`\`
1 adult woman, adult, white blouse, cardigan, long skirt,
standing, full body, clean line, flat color, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

Denoising の目安は 0.55 から 0.7 です。線を残すなら、この範囲の下側から始めます。

**自分の写真を、成人の肖像のアニメ寄りにする**

\`\`\`
1 adult woman, adult, white blouse, cardigan,
upper body, looking at viewer, anime style, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

写真は自分のもの、または写っている成人の同意があるものだけです。Denoising の目安は 0.45 から 0.6 です。

**昼の背景を夕方にする（人物の服は維持）**

\`\`\`
1 adult woman, adult, white blouse, long skirt,
standing, full body, city street, sunset, warm light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

空だけを変えるなら、空を inpaint した方が服は安定します。全体でやるときの目安は 0.35 から 0.5 です。

**服の色だけを変える**

\`\`\`
1 adult woman, adult, navy blouse, beige cardigan, long skirt, loafers,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes, extra clothes
\`\`\`

着ていた色の語は消します。目安は 0.3 から 0.5 です。閉じた服から、閉じた服へ変えます。

**画風だけを変える**

\`\`\`
1 adult man, adult, oxford shirt, trousers,
upper body, simple background, watercolor
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

写真と水彩を同時に残すと、半分ずつになります。目安は 0.5 から 0.65 です。

**細部を整える**

\`\`\`
1 adult woman, adult, white blouse, long skirt,
full body, standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

形を動かしたくないときの目安は 0.15 から 0.3 です。解像度そのものを上げる処理は、Hires. fix の節がサンプラーのページにあります。

自然文で同じ清書を頼むときは、完成図だけを書きます。

\`\`\`
Redraw this sketch as a finished illustration of 1 adult woman
in a white blouse, a cardigan, and a long skirt.
Keep the standing pose. Plain background.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, revealing clothes
\`\`\``,
      },
      {
        title: 'inpaint で部分修正',
        content: `inpaint は、マスクした部分だけを描き直します。Features は、img2img のタブでマスクを描く、と説明しています。Inpaint area は二つです。Whole picture は、画像全体を目標の解像度へ合わせてから塗ります。Only masked は、マスクの領域だけを拡大して塗り、元の画像へ貼り戻します。大きい絵の一部だけを直すときは Only masked です。

マスクは、直したい輪郭より一回り内側から描き始めます。外側まで塗ると、隣の服や背景まで書き換わります。一度に顔と手と服をマスクしないでください。三箇所を同じ生成で塗ると、どのマスクが崩したのかが残りません。顔が終わってから手、手が終わってから服の色、とファイルを分けます。色を残したい布は Masked content を original から試し、形ごと替えたい領域は fill を試します。これは初期値の違いであって、最終の絵を保証する設定ではありません。縁のぼかしを上げすぎると、マスクの外の色がにじみます。にじんだら、ぼかしを初期値へ戻してから、マスクの形を描き直します。

Masked content は、塗る前にマスクの下へ何を置くかです。Features の表の列は、fill、original、latent noise、latent nothing です。最終絵そのものではなく、処理の途中の初期値です。元の色を残して服の色だけを動かすなら original から試し、まったく別の形にしたいなら fill や latent noise を試します。どれが正しい初期値、という単一の答えは wiki にはありません。

マスクの縁をぼかす数値がある画面が多いです。項目名は版で違います。最初は画面の初期値のまま、境界が目立つときだけ少し上げます。

Masking mode は、Inpaint masked がマスクの下を塗り、Inpaint not masked がマスクの外を塗ります。直したい側と逆になっていないかを見てください。

Features は、img2img のタブに Color Sketch という塗りの道具がある、とも書いています。版によって Inpaint sketch のような名前のタブがあることがあります。表示名は画面で確認してください。

**顔のまわりだけ**

\`\`\`
1 adult woman, adult, looking at viewer, white blouse,
soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

顔を残すなら、Denoising の目安は 0.25 から 0.4、Inpaint area は Only masked です。高くすると別人になります。

**手だけ**

\`\`\`
1 adult woman, adult, hands at sides, white blouse, long skirt
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

手のタグは [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。マスクは手首までにして、服の領域へ広げすぎないでください。

**服の色の領域だけ**

\`\`\`
1 adult woman, adult, navy blouse, long skirt, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
revealing clothes
\`\`\`

マスクは布の上だけです。肌の領域まで塗ると、服の形が変わります。`,
      },
      {
        title: 'ComfyUI での img2img',
        content: `ComfyUI では、Load Image の画像を VAE Encode に入れ、その LATENT を KSampler の latent_image に繋ぎます。KSampler の denoise を 1.0 未満にすると、元の潜在表現が残ります。1.0 のままだと、txt2img に近い動きになります。ノード名は版で違うことがあります。最新の繋ぎは公式ドキュメントで確認してください。

空の latent を KSampler に残したまま Load Image だけを置いても、画像は使われません。線が latent_image に届いているかを、ノードのプレビューで見てから生成します。VAE は、チェックポイントと同じ系統のものを Encode と Decode の両方に使います。Encode だけ別の VAE にすると、色が戻ったときに別の絵になります。positive と negative の CLIP Text Encode は、WebUI の二つの欄と同じ役割です。片方を空にすると、入れないものの指定が消えます。denoise を動かす日は、sampler と steps と cfg を固定します。四つの欄を同時に動かすと、WebUI で Denoising だけを動かした比較になりません。

\`\`\`
Load Image
  -> VAE Encode
    -> KSampler latent_image
KSampler denoise: 0.45
MODEL は Load Checkpoint から
positive / negative は CLIP Text Encode から
\`\`\`

\`\`\`
1 adult woman, adult, white blouse, long skirt,
full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

denoise の目安は、WebUI の Denoising strength と同じ考え方です。0.3 から 0.5 を軽い変更の起点にします。`,
      },
      {
        title: 'ControlNet との使い分け',
        content: `img2img は、元画像の画素をノイズの出発点にします。Denoising を上げると、ポーズも服も一緒に動きます。ControlNet は、線や骨格だけを条件にして、画素そのものは txt2img に近い自由度を残します。ポーズを固定して服を全部変えたいときは ControlNet、色や清書のように画素を残したいときは img2img です。両方を使うときは、img2img の強さと ControlNet の Weight を同じ日に動かさないでください。手順は [ControlNetの使い方](/guides/controlnet-guide) です。

選び方は、残したい情報の種類です。色と顔の画素を残すなら img2img。関節の位置だけを残して服を書き換えるなら ControlNet。両方残したいときは、先に ControlNet だけでポーズが三枚安定してから、img2img の denoise を 0.3 付近で一枚だけ足します。最初から両方を 0.8 にすると、線も画素も中途半端に勝ち、顔が平均の位置で止まります。参照画像の権利は、どちらの機能でも同じです。線画を抽出しても、元画像の権利が無ければ公開用には使いません。

\`\`\`
残したいのが色と顔: img2img、Denoising 0.3–0.5
残したいのがポーズだけ: ControlNet、プロンプトに最終の服
両方: 片方の数字を固定してから、もう片方を 0.05 だけ動かす
\`\`\``,
      },
      {
        title: 'うまくいかないとき',
        content: `何も変わらないときは、Denoising が低すぎるか、プロンプトが元画像と同じ語だけです。0.05 だけ上げ、変えたい名詞を一つ足します。

崩れた枚を、さらに高い Denoising で「直そう」としないでください。崩れた構図が次の出発点になり、顔の位置が平均から外れます。戻す先は、崩れる前の枚です。その枚の seed と、一つ下の Denoising をメモしてから再生成します。縦横の変形は、強さを上げても直りません。Resize mode を変えて、同じ seed で一枚だけ出します。顔が別人で、服の色は目的どおり、という割れ方は、全体の成功ではありません。服の色が良かった枚を保存し、顔は別の inpaint で 0.3 付近からやり直します。一枚の中で全部を直そうとすると、良かった色まで戻ります。

崩れるときは、強さが高すぎます。0.1 下げて、シードは固定したまま再生成します。顔が別人になるときも、全体の強さを上げず、顔を Only masked で 0.25 から 0.4 に戻します。

縦横が伸びるときは、Just resize のままです。Crop and resize か Resize and fill に変えて、引き伸ばしと切り取りのどちらが許容かを選びます。元画像と目標の縦横比が違うほど、Just resize の変形は目立ちます。

\`\`\`
変わらない: Denoising を 0.05 上げる。プロンプトに最終形があるか
崩れる: 0.1 下げる。seed は固定
顔が別人: 全体を下げ、顔だけ inpaint
縦横が違う: Resize mode を Crop and resize か Resize and fill
\`\`\``,
      },
      {
        title: '元画像の権利の注意',
        content: `元画像に権利が無いと、Denoising を下げても、出力に元の表現が残ります。自分で撮影・作成したもの、許可のあるものだけを置いてください。他人の顔を別の顔に置き換える使い方は、このページでは扱いません。公開するときは、モデルのライセンスも [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) で確認します。

許可のメモは、画像ファイルの横に残します。誰が撮影したか、人の顔が写っているならその人の同意があるか、生成に使った日、です。メモが無い画像は、Denoising が低くても公開用のフォルダへ移しません。ラフが自分の手描きでも、下絵に他人の作品をトレスしている場合は、その下絵を置いたことと同じです。置き場を分けるのは、手順の一部です。権利の判断そのものは、このページではしません。迷う画像は、生成の前に外してください。

Denoising を 0.2 まで下げた枚は、元画像に近いほど、元の権利が出力に残ります。近いから安全、にはなりません。権利がある画像だけを、低い強さで整える、という向きで使ってください。高い強さで元を消そうとしても、構図や顔の特徴が残ることがあります。消したい相手が他人の作品なら、強さを上げる前に、その画像を欄から外します。外したあとの生成は、txt2img としてプロンプトだけで始める方が、手順が残ります。img2img の欄に空のまま生成しないでください。空だと、直前の画像が残っている版があります。欄が空かを、生成の直前にもう一度見ます。

\`\`\`
置いてよい画像
自分が撮影した写真
自分が描いたラフ
書面か画面で許可された素材
置かない画像
他人の作品
許可のない人物写真
既存のキャラクターの絵
\`\`\``,
      },
    ],
    faq: [
      {
        q: 'Denoising strength はいくつから始めますか',
        a: '軽い変更は 0.3 から 0.5 が目安です。形をほとんど残すなら 0.15 から 0.3、画風を変えるなら 0.5 から 0.7 を試します。モデルカードに推奨があればそちらを優先してください。',
      },
      {
        q: 'プロンプトは差分だけ書けばよいですか',
        a: '完成図を書いてください。残したい服や背景を省くと、元画像の平均に戻るか、その部分が別の物になります。',
      },
      {
        q: '顔だけを直すにはどうしますか',
        a: 'inpaint で顔のまわりだけをマスクし、Inpaint area は Only masked、Denoising は 0.25 から 0.4 を目安にします。全体の強さを上げると別人になります。',
      },
      {
        q: 'Resize mode の違いは何ですか',
        a: 'Features にあるのは Just resize、Crop and resize、Resize and fill です。引き伸ばし、切り取り、余白の埋め方の違いです。潜在空間の拡大は Hires. fix 側の説明にあります。',
      },
      {
        q: '他人の写真を使ってよいですか',
        a: '許可があるものだけです。他人の顔を入れ替える手順は、このページにはありません。',
      },
    ],
  },

  'stable-diffusion-sampler-guide': {
    sections: [
      {
        title: 'サンプラーとは',
        content: `「stable diffusion sampling method」は、ノイズをどの手順で絵にしていくかです。プロンプトが題材、サンプラーが手順、ステップ数がその回数、CFG がそのプロンプトへどれだけ寄せるか、です。一つずつ変えないと、良い絵の理由が残りません。

このページの数字は目安です。モデルの配布ページに推奨値があればそれを優先してください。バージョンによって表示名や仕様が違うことがあります。最新の仕様は公式ドキュメントで確認してください。

比較用のプロンプトは、成人一人か、人物のいない風景のどちらかに固定します。服はブラウスとカーディガン、またはジャケットとシャツのように閉じた一組です。サンプラーを変える日に服も変えると、手順の差が服の差に隠れます。良い組み合わせが見つかっても、その枚の sampler、schedule、steps、cfg、seed を画像の横に書いてから次へ進みます。書かないと、翌日には初期値の 7 と、ランダムな seed に戻って、同じ絵を探せなくなります。カードが別の数字を書いているモデルでは、このページの目安よりカードの一行を先にメモしてください。

系統の違いは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list)、タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、画像から直す強さは [img2imgの使い方](/guides/img2img-guide) です。括弧の倍率は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、品質の語は [品質タグ一覧](/guides/quality-tags-prompt-guide)、Illustrious のタグは [Illustriousプロンプト](/guides/illustrious-prompt-guide) です。

\`\`\`
比べるときのルール
seed を固定する
動かす項目は一つ
プロンプトは固定する
\`\`\``,
      },
      {
        title: '主なサンプラーの違い',
        content: `違いは、速いか遅いかの計測ではなく、ステップを足したときに絵が落ち着きやすいかどうかです。祖先系（ancestral）の Euler a は、ステップを足しても同じ絵に収束しにくい、と扱われます。DPM++ 2M は、ステップを足すと変化が小さくなりやすい系統です。これは性質の説明であり、どのサンプラーが常に美しい、という順位ではありません。

| 名前 | 性質の目安 | 試し方 |
|---|---|---|
| Euler | 単純な手順。変化がなだらかなことが多い | 最初の一枚の起点 |
| Euler a | 祖先系。ステップを足しても収束しにくい | 枚数を変えると比較が崩れる |
| DPM++ 2M | ステップを足すと落ち着きやすいことが多い | 本番の候補 |
| DPM++ SDE | 祖先の要素が混ざる系統 | 2M と比較するときだけ |
| DPM++ 2M SDE | 2M と SDE の名前を両方持つ | Schedule とセットで見る |
| DDIM | 古い系統。再現の比較に残ることがある | カードが名指しするとき |
| UniPC | 別実装の手順 | カードが名指しするとき |
| LCM | 少ないステップ向けの系統 | カードが LCM と書くモデルだけ |

蒸留されたモデル、turbo、LCM と書かれたモデルは、カードが低い CFG と少ないステップを指定していることが多いです。通常の 20 から 30 ステップを、そのカードに書かずに当てはめないでください。FLUX は、モデルカードの推奨に従います。FLUX.1 [dev] のカードの実行例には、guidance_scale 3.5 と 50 ステップが書かれています。これは例であり、すべての FLUX の最適値ではありません。

名前が似ているサンプラーを、同じ日に四つ並べないでください。Euler と Euler a の二枚、次の日に DPM++ 2M と DPM++ 2M SDE の二枚、のように対で見ます。SDE が付く名前は、祖先の要素が混ざることがあり、ステップを変えると絵が動きやすい、というところまでを性質として覚えます。速度の順位や、メモリの消費はこの表に書きません。環境で変わる数字を、性質の説明に混ぜると、カードの推奨と取り違えます。UniPC や LCM は、カードが名前を書いているときだけ候補にします。名前を知っているだけでは、通常の 28 ステップの代替にはなりません。`,
      },
      {
        title: 'Schedule type',
        content: `Automatic1111 の 1.9.0 では、Sampling method と Schedule type が分かれて選べるようになりました。以前の名前にあった Karras や Exponential は、サンプラー側とスケジュール側に分割されています。1.9.0 のリリースには、SGM Uniform の追加も書かれています。Normal や Simple は、後の版や別の UI の一覧に並ぶことがあります。表示名は画面で確認してください。

Automatic は、そのサンプラーの既定のスケジュールを使う選択として説明されています。比較のあいだは、Automatic のままにするか、名前を一つに固定するか、どちらかに揃えます。両方を同時に動かさないでください。

Karras に変えた日は、Sampling method を固定します。逆に、サンプラーを Euler a から DPM++ 2M へ変える日は、Schedule type を触りません。二軸を同時に動かすと、旧名の「DPM++ 2M Karras」へ戻したつもりが、別の組み合わせになります。Forge や他の UI では、欄の見出しが Sampling method と Schedule type のままとは限りません。見出しが一つに戻っている版では、名前の末尾に Karras や Exponential が残っていることがあります。その場合は、末尾をスケジュール、前半をサンプラーとしてメモし、画面の表示名をそのまま記録します。翻訳した名前で保存すると、次に開いたときに欄へ戻せません。

\`\`\`
WebUI 1.9 以降の分け方の例
Sampling method: DPM++ 2M
Schedule type: Karras
旧名の DPM++ 2M Karras は、この二つに分かれる
\`\`\`

ComfyUI の KSampler では、sampler_name と scheduler が別の欄です。名前の対応は UI ごとに違います。

\`\`\`
KSampler
seed: 固定した数字
steps: 28
cfg: 7
sampler_name: euler
scheduler: normal
denoise: 1.0
\`\`\`

denoise が 1.0 のときは txt2img に近い動きです。img2img では 1 未満にします。`,
      },
      {
        title: 'ステップ数の目安',
        content: `多くのチェックポイントでは、20 から 30 ステップが最初の範囲です。目安であり、最適な値ではありません。Animagine XL 4.0 のモデルカードは、Sampling Steps を 25 から 28、推奨 28、と書いています。カードがあるモデルは、その数字を起点にしてください。

20 と 28 と 32 の三枚で十分です。10 から 50 までを五刻みで並べても、祖先系では枚ごとに別の絵になり、ステップの「足りなさ」は読めません。収束しやすい名前で三枚見て、28 と 32 がほとんど同じなら、そのプロンプトでは 28 で止めます。まだ形が荒いなら、ステップを足す前にサンプラーを DPM++ 2M へ変えて、同じ 28 で一枚だけ出します。荒さが手順の種類のせいなら、枚数を増やしても同じ方向には揃いません。カードが 4 ステップや 8 ステップと書いているモデルは、28 を試す対象から外します。そのカードの数字の前後を、二枚だけ比べてください。

ステップを 40 や 50 に上げても、祖先系の Euler a では絵が別物の方向へ動き続けます。落ち着かせたい比較では、先に DPM++ 2M へ変えてから、ステップを 20、28、32 の三枚で見ます。

\`\`\`
最初の範囲: 20–30
カードに 28 とあれば 28 を起点
Euler a で枚数が変わると比較にならない
\`\`\`

少ないステップ専用と書かれたモデルに 28 を当てると、カードの想定と違います。カードのステップ数を読んでから、その前後を二枚だけ比べます。`,
      },
      {
        title: 'CFG スケールの目安',
        content: `CFG は、プロンプトへ寄せる強さです。高いと色が焼け、指定した語以外が消えます。低いと、プロンプトが平均の絵に戻ります。A1111 の画面では、初期値として 7 が入っていることが多いです。多くの SDXL 系では 5 から 7 が最初の範囲、という扱いが実用上の目安です。Animagine XL 4.0 のカードは、CFG Scale を 4 から 7、推奨 5、と書いています。

焼ける、の見え方は、指定した色が周囲の服や背景へ染み、影が単一の色に寄ることです。その枚の CFG を採用しない、という判断で足ります。数値を 0.5 刻みで下げるより、まず 1 下げた一枚を見ます。プロンプト側の \`(word:1.4)\` を同じ日に外すと、CFG の差が括弧の差と混ざります。括弧は固定し、CFG だけを動かしてください。ガイダンスの名前が cfg ではなく guidance の画面では、欄のラベルをメモに残します。FLUX の例の 3.5 や 0.0 を、SDXL の欄へ貼らないでください。系統が違うと、同じ数字が別の強さになります。

\`\`\`
A1111 の初期値としてよく見る数字: 7
SDXL 系の最初の範囲の目安: 5–7
Animagine XL 4.0 のカード: 4–7、推奨 5
\`\`\`

蒸留や LCM や turbo と書かれたモデルは、カードが 1 や 2 に近い CFG を指定していることがあります。7 のまま生成しないでください。FLUX.1 [dev] のカードの例は guidance_scale 3.5 です。FLUX.1 [schnell] のカードの例は guidance_scale 0.0 です。系統が違うので、数字をコピーしあわないでください。

\`\`\`
1 adult woman, adult, white blouse, cardigan, long skirt,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

このプロンプトを固定し、CFG だけを 5、6、7 で三枚並べます。色が焼ける枚の CFG は、次から使いません。`,
      },
      {
        title: 'seed 値と比較のしかた',
        content: `seed は、ノイズの初期値です。同じプロンプト、同じサンプラー、同じステップ、同じ CFG、同じ seed なら、同じ環境では近い絵に戻ります。環境や版が変わると、完全な一致にはならないことがあります。

固定した数字は、プロンプトのファイルの一行目に書きます。画像のメタデータだけに頼ると、別のソフトで保存したときに seed が落ちることがあります。比較の四手順は、戻すことを含みます。サンプラーを変えた二枚を見たあとは、勝った方を残して、CFG の三枚に進む前にプロンプトが同じかを確認します。プロンプトを一語でも直していたら、その三枚は CFG の比較になりません。-1 のまま「ランダムで良いのが出るまで」を繰り返すと、手順の比較になりません。良い絵が出た瞬間に、その枚の seed をコピーして、次の一項目だけを動かす材料にしてください。

多くの画面では、-1 が毎回変わる指定です。比較するときは、気に入った枚の数字をコピーして固定します。表示は版で違います。

\`\`\`
比較の手順
1. 良い枚の seed を固定する
2. Sampling method だけを変えて二枚
3. 戻して、CFG だけを変えて三枚
4. 戻して、steps だけを変えて三枚
\`\`\`

四項目を同時に変えた枚は、採用しても理由が残りません。メモは画像の横に、sampler、schedule、steps、cfg、seed の五行で残します。`,
      },
      {
        title: 'Hires. fix・VAE',
        content: `Hires. fix は、Features が、低い解像度で構図を作ってから拡大し、img2img に近い二度目の描画で細部を足す、と説明しています。欄の名前は、Upscale by（Scale by）、Hires steps、Denoising です。倍率の目安は 1.5 から始め、Denoising は軽い変更として 0.3 から 0.5 です。Hires steps は、一段目と同じか、それより少なめから試します。顔が崩れるときは Denoising を下げます。これは目安です。

一段目の顔が決まっていない状態で Hires. fix をオンにすると、崩れた顔を拡大してから二度目の描画が走ります。先に Hires をオフにして、seed を固定した一段目を一枚残してください。その枚が安定してから、倍率 1.5 と Denoising 0.4 を一枚だけ足します。アップスケーラーの種類を同じ日に変えないでください。Latent と付いた名前と、画素のアップスケーラーは、拡大の仕方が違います。VAE を疑うのは、サンプラーも CFG も Hires も固定したまま、色だけが全体に薄い、または全体に飽和しているときです。顔の形が悪いだけのときに VAE を入れ替えると、原因がもう一つ増えます。カードが VAE のファイル名を書いているときだけ、その名前へ合わせます。

\`\`\`
Hires. fix
Upscale by: 1.5
Hires steps: 16
Denoising: 0.4
\`\`\`

潜在空間で拡大する選択肢は、アップスケーラーの一覧に Latent と付いた名前で並びます。画素のアップスケーラーとは、拡大の仕方が違います。Denoising を 0 に近づけると、拡大そのものの見た目が残り、細部はほとんど足されません。

VAE は、潜在表現を画像の画素へ戻す部品です。チェックポイントに内蔵されていることも、別ファイルを指定することもあります。色が極端に薄い、または極端に飽和するときは、モデルカードが名指しする VAE と、今選んでいる VAE が違っていないかを見ます。カードが無言なら、内蔵のままにして、サンプラーを先に比較してください。速度やメモリの数字は、環境で変わるので書きません。`,
      },
      {
        title: 'モデル別の設定例',
        content: `下はメモ用です。カードに数字がある行だけ、その数字を使います。それ以外は目安です。

メモは、モデル名を最初の行にします。SD 1.5 の目安を、SDXL のチェックポイントへ貼らないでください。Animagine XL 4.0 の 5 と 28 と Euler a は、そのカードの Optimal Settings です。別のアニメ系へコピーする前に、その配布ページに推奨の行があるかを見ます。行が無ければ、SDXL の写真寄りの目安ではなく、アニメ寄りの比較として Euler a の 28 を一枚、DPM++ 2M の 28 を一枚、同じ seed で出します。下絵の 20 ステップは、構図を見るためです。仕上げの Hires を、下絵の seed が気に入る前に掛けないでください。ComfyUI の欄は、WebUI の五つの値を対応させるメモであって、同じ画素になる保証ではありません。人物なしの風景は、人数の行を消したあとに、同じ sampler と cfg で一枚だけ出して、人物用の設定が風景で破綻しないかを見ます。

**SD 1.5 のアニメ寄り（目安）**

\`\`\`
Sampling method: Euler a
Schedule type: Automatic
Steps: 28
CFG: 7
\`\`\`

\`\`\`
1 adult woman, adult, anime style, black hair, white blouse, cardigan,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**SDXL のアニメ寄り（Animagine XL 4.0 のカード）**

カードは、CFG 4 から 7 で推奨 5、ステップ 25 から 28 で推奨 28、Preferred Sampler は Euler Ancestral（Euler a）と書いています。出典は <a href="https://huggingface.co/cagliostrolab/animagine-xl-4.0" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Animagine XL 4.0 のモデルカード</a>の Optimal Settings です。Illustrious 系は、この数字を流用せず、[Illustriousプロンプト](/guides/illustrious-prompt-guide) と、その配布ページの推奨を見てください。

\`\`\`
Sampling method: Euler a
Steps: 28
CFG: 5
出典: Animagine XL 4.0 のモデルカード、Optimal Settings
\`\`\`

\`\`\`
1 adult woman, adult, white blouse, long skirt,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**SDXL の写真寄り（目安）**

\`\`\`
Sampling method: DPM++ 2M
Schedule type: Karras
Steps: 30
CFG: 6
\`\`\`

\`\`\`
1 adult man, adult, business attire, suit jacket, white dress shirt,
upper body, plain gray background, soft daylight, photorealistic
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**下絵**

\`\`\`
Steps: 20
CFG: 6
Hires. fix: オフ
\`\`\`

**仕上げ**

\`\`\`
Steps: 28
CFG: 6
Hires. fix: Upscale by 1.5, Denoising 0.4, Hires steps 16
\`\`\`

**ComfyUI の KSampler（txt2img の例）**

\`\`\`
seed: 12345
steps: 28
cfg: 6
sampler_name: dpmpp_2m
scheduler: karras
denoise: 1.0
\`\`\`

欄の名前は版で違います。scheduler の karras は、WebUI の Karras に対応することが多いですが、完全に同じ結果にはなりません。

人物なしの風景で同じ設定を見るときは、人数の行を消します。

\`\`\`
landscape, hills, river, soft daylight, clear sky
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\``,
      },
      {
        title: 'うまくいかないとき',
        content: `ざらつくときは、ステップが少なすぎるか、祖先系のまま枚数だけを増やしています。DPM++ 2M で 28 を一枚試し、まだざらつくなら Hires. fix の Denoising を 0.35 まで下げます。

直す順番は、seed の固定、サンプラー、CFG、ステップ、Hires、VAE です。後ろの項目を、前が動いたまま触らないでください。色が焼けて、しかも毎回違うときは、CFG と seed の両方が動いています。先に seed を固定し、焼けが残るなら CFG を 1 下げます。顔が崩れて、しかも Hires がオンなら、Hires をオフにした一段目へ戻ります。一段目の顔がすでに崩れているなら、Hires の Denoising を下げても一段目は直りません。プロンプトの人数と服を短くして、一段目を取り直してください。チェックの四行は、生成ボタンの前に画面と突き合わせます。

取り直した一段目は、成人の人数と、閉じた服と、単純な背景だけにします。品質の語を四つ重ねた状態で顔を直そうとすると、どの語が顔を焼いたのかが残りません。品質の語は、顔が三枚安定してから [品質タグ一覧](/guides/quality-tags-prompt-guide) に戻って二つまで足します。二つで色が焼けるなら、CFG を先に 1 下げて、品質の語は増やしません。同じ失敗を、別のサンプラーで繰り返さないでください。失敗の枚の設定メモを残し、次の枚ではそのメモの一項目だけを変えます。メモが無い失敗は、比較の材料になりません。材料が無いときは、このページの下絵の設定へ戻して、人物か風景のどちらか一方で一枚だけ出します。

色が焼けるときは、CFG を 1 下げます。プロンプトの重みを同じ日に上げないでください。両方を上げると、どちらが焼いたのかが残りません。

毎回絵が変わるときは、seed が -1 のままです。数字を固定し、サンプラーが Euler a なら、ステップ数も固定します。Euler a はステップを変えると別の絵になります。

顔が崩れるときは、Hires. fix の Denoising を下げるか、一度オフにして一段目の顔を確定します。CFG を 8 より上に上げたまま Hires を掛けると、崩れが拡大されることがあります。7 前後へ戻してから、倍率だけを 1.5 にします。

\`\`\`
ざらつく: DPM++ 2M、steps 28 を一枚
色が焼ける: CFG を 1 下げる
毎回変わる: seed を固定。Euler a なら steps も固定
顔が崩れる: Hires の Denoising を下げる
\`\`\``,
      },
    ],
    faq: [
      {
        q: 'サンプラーはどれを選べばよいですか',
        a: 'カードが名指ししていればその名前です。無言なら、Euler a で下絵、DPM++ 2M で落ち着かせる比較、が目安です。順位ではありません。',
      },
      {
        q: 'Schedule type は何ですか',
        a: 'Automatic1111 1.9.0 以降、Sampling method と分かれた欄です。Karras や Exponential は、以前はサンプラー名の一部でした。Automatic は既定のスケジュールです。',
      },
      {
        q: 'ステップ数と CFG の目安はいくつですか',
        a: '多くのモデルでステップ 20 から 30、CFG は 7 が A1111 の初期値、SDXL 系は 5 から 7 が最初の範囲です。Animagine XL 4.0 のカードは CFG 5、ステップ 28、Euler a です。カードがあればそちらを優先してください。',
      },
      {
        q: 'seed を固定すると何が揃いますか',
        a: '同じ環境で、他の項目を一つだけ変えた比較ができます。-1 のままだと毎回ノイズが変わり、サンプラーの差が読めません。',
      },
      {
        q: 'Hires. fix で顔が崩れるときはどうしますか',
        a: 'Denoising を 0.3 から 0.5 の下側へ下げます。それでも崩れるときは、一度オフにして一段目を確定してから、倍率 1.5 だけを試してください。',
      },
    ],
  },
}
