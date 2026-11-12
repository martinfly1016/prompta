/**
 * Fifteenth SEO batch (2026-11-12): effect, camera and lens, mob crowd,
 * dance, and image-generation prompt how-to.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 * Tool wording is limited to official pages checked 2026-11-12.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_15_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'effect-prompt-guide': {
    sections: [
      {
        title: 'エフェクトは一つだけ足す',
        content: `「エフェクト プロンプト」で探しているのは、人物の説明とは別に、光・魔法・粒子・天候・漫画の記号・動きの線を足す書き方です。検索では、動き、ハート、揺れる、びっくり、衝撃、魔法、キラキラが一緒に出ます。サウンドエフェクトは音です。このページは静止画に見える効果だけを扱い、音の作り方は書きません。

効果は、飾りの層です。人物、服、場所、光の向きが決まってから、効果を一つ足します。同じ日に粒子と効果線と炎と煙を全部強くすると、顔より光が勝って、何を足したのかが残りません。一枚につき、表の一行だけを動かしてください。

このページは効果の名前を担当します。光がどこから来るか、影を残すかは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。向きが決まる前に \`sparkles\` を強くすると、窓の光まで粒子に置き換わることがあります。

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。風景や炎や霧だけの絵には人数を書きません。服はブラウス、コート、シャツ、スラックスのように閉じた日常着です。実在の人物、作品名、詠唱の固有名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。表で「自然な英語」と書いた語は、公式タグとしては断定しません。効かなければ、近い別の語に一つだけ入れ替えます。

重みを使うときは目安です。\`(glowing:1.1–1.3)\` のように、少しだけ上げます。括弧を文字として残す必要があるモデルでは \`\\(\` と \`\\)\` を付けます。上げても効果が増えないときは、語を前へ移してから、重みは戻してください。

記録は、効果の名前と、足す前の一文だけにします。魔法陣で気に入った暗い背景を、次のキラキラの起点に使ってよいですが、魔法陣の語が残ったまま粒子を足すのは、二つの実験です。残った語は、次の実験の前に消します。消したあとに物足りなくても、粒子が同じに三枚見えてから、消した語を一つだけ戻します。戻したときに顔が隠れたら、戻した方を外します。外さずに重みだけを下げると、両方の効果が弱い平均で残り、どちらを残すか決められません。服は無地のまま固定します。柄を先に足すと、粒子と模様の境目が分からなくなります。無地で効果の位置が決まってから、柄は一つだけ足してください。`,
      },
      {
        title: '種類の早見表',
        content: `検索語を、画面のどこに出る効果かに分けます。光そのものの向きは照明のページ、ここでは「あとから乗る見た目」です。

| 検索の言葉 | このページの種類 | 最初の語 |
|---|---|---|
| 光、発光 | 光が漏れる、筋になる | \`glowing\`, light rays |
| 魔法 | 魔法陣、オーラ | \`magic circle\`, glowing aura |
| キラキラ | 粒子 | \`sparkles\`, light particles |
| 炎、水、雷、風 | 天候と小さな火 | lantern flame, distant lightning, \`wind\` |
| 煙、霧 | 空気を白くする | \`fog\`, \`mist\` |
| ハート | 漫画の記号 | floating hearts |
| びっくり、衝撃 | 効果線 | \`emphasis lines\`, impact lines |
| 動き、揺れる | ぶれとなびき | \`motion blur\`, swaying |
| 画面全体 | 写真の加工 | \`lens flare\`, \`bloom\`, film grain |

一度に選ぶのは一行です。魔法陣の枚にハートと集中線を足すと、記号が三種類になって、どれが主題か分からなくなります。

比較は、人物と服と背景を固定して、効果の語だけを差し替えます。無地の背景で効果の形が見えてから、街や森を足してください。模様の背景に粒子を乗せると、粒子と模様の境目が溶けます。

**効果をまだ足さない起点**

\`\`\`
1 adult woman, adult, black hair, white blouse, long coat,
upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
oversaturated, excessive glow, cluttered effects
\`\`\`

この起点に、次の節から語を一つ足します。足した語の名前を、ファイル名に残してください。`,
      },
      {
        title: '光・魔法陣・キラキラ',
        content: `発光は、物が光っている状態です。\`glowing\` は手持ちの灯、魔法陣、粒子のどれにも付きます。何が光るのかを、同じ行に書いてください。\`glowing\` だけだと、顔や目まで光ることがあります。目を光らせたいのでなければ、光る物の名前を先に書きます。

光の筋は light rays、空気中の光束は volumetric light と自然な英語です。公式タグとしては断定しません。筋を出すときは、霧かほこりを弱く一つ足すと、光の通り道が見えやすくなります。向きの名前（逆光、サイド光）は照明のページの語を一つだけ残し、このページでは筋と粒子にします。

魔法陣は \`magic circle\` です。床に置くなら glowing magic circle on the floor、体のまわりの淡い光は glowing aura と自然な英語です。幾何学の模様は geometric pattern と自然な英語です。文字や詠唱の文は書かせません。文字はネガティブの text に残します。攻撃の軌跡や、人に当たる描写は入れません。灯と円と粒子で足ります。

キラキラは \`sparkles\`、細かい粒は light particles、粗い粒は \`glitter\` です。三つを同じ強さにすると、画面が白い粉で埋まります。一つにして、背景は暗めか無地にします。昼の白背景に粒子を足すと、粒子が背景に溶けて見えなくなります。

| 語 | 日本語 | 置き場所 |
|---|---|---|
| \`glowing\` | 発光 | 光る物の名前とセット |
| light rays | 光の筋 | 自然な英語。向きは照明のページ |
| \`magic circle\` | 魔法陣 | 床か、体の前。文字は書かない |
| glowing aura | 淡いオーラ | 自然な英語。輪郭の補助 |
| \`sparkles\` | キラキラ | 一つ。背景は暗め |
| light particles | 光の粒子 | 空気中。密度は上げすぎない |

**魔法陣、大人のコート**

\`\`\`
1 adult man, adult, dark coat, shirt, trousers,
standing, full body, glowing magic circle on the floor,
geometric pattern, soft glow, dark simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, letters, excessive glow, cluttered effects
\`\`\`

**キラキラを一つ**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
sparkles, light particles, upper body,
dark simple background, soft rim light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
oversaturated, excessive sparkles, cluttered effects
\`\`\`

魔法陣が円にならないときは、\`magic circle\` を人数の直後へ移し、粒子の語を一度消します。円ができてから粒子を戻してください。粒子を先に強くすると、円が粉になります。

光る物を書かない \`glowing\` は、目や髪やボタンのどれかが勝手に光ります。光らせたい物の名詞を、\`glowing\` の直前に置いてください。円が楕円になるときは、床であることを書き、カメラを極端に近い距離にしないでください。近い距離は顔の情報が増えて、円が画面の外に切れます。円を見せる枚は、全身か膝上にして、円が床に収まる余白を残します。キラキラを夜の街に足すときは、街灯の語を一つに減らします。街灯がいくつもあると、粒子と灯の区別が消え、画面が白い点の集合になります。昼の白背景で粒子が消えるときも、背景を暗くしてから粒子を戻します。明るさを上げて粒子を出そうとすると、顔の方が先に白く飛びます。`,
      },
      {
        title: '炎・水・雷・風と煙',
        content: `炎、水、雷、風は、画面の天気か、小さな灯として書きます。人に当てる描写、負傷、血は書きません。服が濡れて体に張り付く書き方もしません。水は、窓の外の雨、傘、水面の反射に限ります。

炎は lantern flame か candle flame と自然な英語です。手の中の魔法の灯なら magical flame in a lantern と、灯る場所を箱に入れます。人の体から炎を出す書き方は、このページでは使いません。

水は rain beyond the window、umbrella、reflection on water と自然な英語です。雷は distant lightning、空の出来事として書きます。人に落とす書き方は使いません。風は \`wind\` です。髪とコートの裾が動く理由として、\`hair swaying, coat swaying\` を一つずつ足します。

煙と霧は、奥行きを作る効果です。\`fog\` は画面全体、\`mist\` は薄い層、soft smoke は煙突や灯のそばの細い煙、と自然な英語で分けます。公式タグとしては断定しません。霧を強くすると、顔の輪郭まで消えます。肖像では \`mist\` を弱く一つ、場所の絵では \`fog\` を一つ、と使い分けてください。

| 語 | 日本語 | 避けたい寄り |
|---|---|---|
| lantern flame | ランタンの炎 | 体から出す炎にはしない |
| rain beyond the window | 窓の外の雨 | 服が濡れる描写にはしない |
| distant lightning | 遠い雷 | 人へ落とさない |
| \`wind\` | 風 | 髪と裾の理由として一つ |
| \`fog\` | 霧 | 顔が消えたら弱める |
| \`mist\` | 薄い霧 | 肖像向き |
| soft smoke | 細い煙 | 災害の煙にはしない |

**窓の外の雨と、ランタン**

\`\`\`
1 adult woman, adult, coat, scarf, holding an umbrella,
standing indoors by a window, rain beyond the window,
lantern flame, soft warm light, upper body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
oversaturated, cluttered effects
\`\`\`

**霧の林、人なし**

\`\`\`
forest path, fog, mist, soft light rays,
pine trees, muted green, no people, landscape
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark, oversaturated
\`\`\`

雨の枚で服の形が崩れるときは、雨の語を「窓の外」に戻し、傘を残します。雷の枚で空が真っ白になるときは、distant の意味が残っているかを見て、\`lightning\` だけの行は消します。

天候の効果は、場所の説明とぶつかりやすいです。窓の外の雨は、室内の明るさを落としません。室内まで雨とだけ書くと、床が光を反射し、コートの形が変わります。雨は窓の外、灯は室内、と層を分けた文を残してください。雷は空の遠い位置に留め、人を medium shot で残します。空が主題の枚は、人の行を消した風景として別に保存します。霧は奥を隠し、手前の輪郭は残す、と濃さの差を書きます。画面の全部を同じ濃さにすると、主題の輪郭まで消えます。消えた輪郭を発光で取り戻そうとしないでください。発光を足す前に、霧の語を弱い \`mist\` に戻します。風は、雨や霧と同時に強くしません。`,
      },
      {
        title: 'ハートと漫画の効果',
        content: `ハート、びっくり、衝撃は、漫画の記号です。関係性の場面や、驚きの顔の補助として一つ使います。寝室の場面にはしません。ハートを画面いっぱいに散らすと、顔が記号の下に隠れます。小さい記号を、顔の横に一つ、が起点です。

浮くハートは floating hearts と自然な英語です。公式タグとしては断定しません。笑顔とセットにし、背景は無地にします。ハートを魔法陣や火花と混ぜないでください。記号の種類が二つになると、両方とも中途半端になります。

びっくりは、表情と効果線で書きます。\`surprised\`、wide eyes、\`emphasis lines\` です。びっくりの文字や「！」を書かせると、画面に崩れた文字が出ます。文字はネガティブの text に残し、記号の代わりに効果線を使います。

衝撃は impact lines、動きの集中は \`speed lines\` と自然な英語、または \`speed lines\` です。人が殴られる描写、武器、血は書きません。驚いた顔のまわりの線、または地面に落ちたボールのまわりの線、のように、当たった結果の怪我ではなく、漫画の線だけにします。

| 語 | 日本語 | セットにするもの |
|---|---|---|
| floating hearts | 浮くハート | 笑顔、無地。一つ |
| \`surprised\` | 驚き | wide eyes |
| \`emphasis lines\` | 集中線 | 表情。文字は書かない |
| impact lines | 衝撃の線 | 自然な英語。怪我は書かない |
| \`speed lines\` | 速度線 | 動きの節と一緒に一つ |

**ハートは顔の横だけ**

\`\`\`
1 adult woman, adult, smile, white blouse, cardigan,
small floating hearts, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, cluttered effects, excessive hearts
\`\`\`

**びっくりは効果線**

\`\`\`
1 adult man, adult, surprised, wide eyes, open mouth,
emphasis lines, shirt, cardigan, upper body,
simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, letters, cluttered effects
\`\`\`

効果線が顔を横切るときは、\`emphasis lines\` を後ろへ移すか、一度消して表情だけを残します。線が主題になった枚は、肖像の本番には使いません。

ハートとびっくりを同じ枚に置かないでください。気分の記号が二つあると、笑顔なのか驚きなのかが平均になります。衝撃の線は、落ちたボールや、驚いた顔の周囲の線、までにします。人がぶつかる場面や、武器が当たる文は書かず、線の名前だけを残します。線が太すぎて顔を割るときは、impact lines を消し、\`surprised\` だけに戻します。戻した顔が普通の表情になるときは、wide eyes を一つ足してから、線を弱く戻します。文字の驚き記号は、効果線の代わりになりません。文字は崩れ、別の字形が混ざることがあります。記号が欲しい枚ほど、負向の text を残してください。`,
      },
      {
        title: '動き・揺れと画面の加工',
        content: `動きと揺れは、静止画の中の「動いている途中」です。体のポーズそのものは [ポーズプロンプト](/guides/stable-diffusion-pose-prompt) です。このページでは、ぶれ、速度線、布と髪のなびきを足します。

\`motion blur\` は動いている部分をぼかします。\`motion lines\` は軌跡、\`speed lines\` は背景の速度線です。三つ同時は強いので、ぶれか線のどちらか一つにしてください。全身がぼけたときは、\`motion blur\` を消して、髪とコートだけを swaying に戻します。

揺れるは swaying です。\`hair swaying\`、\`coat swaying\`、foliage swaying と、何が揺れるかを書きます。風の理由が要るときは \`wind\` を一つ足します。風とぶれと速度線を同じ強さにすると、輪郭が全部溶けます。

画面全体の加工は、写真のあと工程に近い語です。\`lens flare\` は光源のにじみ、chromatic aberration は色のずれ、\`bloom\` は明るい部分の膨らみ、film grain は粒状感、と自然な英語です。公式タグとしては断定しません。加工は一つです。フレアと色ずれとブルームを同時に強くすると、顔の色が割れます。フレアの詳細なレンズの話は [カメラのプロンプト](/guides/camera-lens-prompt-guide) に分けます。ここでは「画面に乗る加工を一つ」までです。

| 語 | 日本語 | 強くしすぎたサイン |
|---|---|---|
| \`motion blur\` | 動きぶれ | 全身が溶ける |
| \`motion lines\` | 軌跡 | 線が顔を横切る |
| swaying | 揺れる | 輪郭が全部動く |
| \`lens flare\` | レンズフレア | 光源以外も白くなる |
| \`bloom\` | ブルーム | 肌が白く飛ぶ |
| film grain | 粒状感 | 顔の細部が消える |

**コートが風で揺れる**

\`\`\`
1 adult woman, adult, long coat, scarf, walking,
hair swaying, coat swaying, wind,
motion blur, full body, city sidewalk, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
excessive motion blur, cluttered effects, speed lines
\`\`\`

**粒状感を一つ**

\`\`\`
1 adult man, adult, coat, upper body,
film grain, soft daylight, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
oversaturated, excessive bloom, lens flare, text
\`\`\`

ぶれを足したあとに顔が溶けるのは、効果が勝ったサインです。\`motion blur\` を外し、\`hair swaying\` だけに戻してから、もう一度出してください。

動きの線と、ポーズの語は同じ日に増やしません。歩く、走る、跳ぶ、はポーズのガイドで形を決めてから、このページの \`motion blur\` を一つ足します。形が決まる前にぶれを足すと、手足の位置を確認できません。揺れは、髪かコートか葉、のどれか一つです。三つを同時に揺らすと、輪郭の全部が動いて、静止した部分が無くなります。静止した顔と、動く裾、のように動く場所を限ると、動きが読める絵になります。画面全体の加工を同じ枚に足すのは、その動きが安定したあとです。フレアと粒状感とぶれを同じ強さにすると、何が溶けたのかが残りません。`,
      },
      {
        title: '強さと、光との合わせ方',
        content: `効果の強さは、語の位置と、目安の重みで変えます。前にある語が残りやすいモデルでは、今回の効果を人数の直後へ移します。後ろに置いた粒子は、背景の模様に負けます。

重みの目安は \`(sparkles:1.1)\` から \`(sparkles:1.3)\` までです。それ以上に上げても粒子が増えず、顔の形が崩れることがあります。増えないときは、重みを戻して、背景を無地にしてください。

光との合わせ方は、照明のページで向きを一つ決めてから、このページの効果を一つ足す、です。逆光の枚に \`rim lighting\` が既にあるなら、追加してよいのは \`sparkles\` か \`fog\` のどちらか一つです。\`backlighting\` と \`bloom\` と \`lens flare\` を同じ強さにすると、輪郭が白い帯になります。

入れすぎを戻す負向は、次の語を短く足します。全部を毎回入れる必要はありません。今の絵で溢れているものだけを足してください。

\`\`\`
oversaturated, excessive glow, excessive bloom,
excessive sparkles, cluttered effects, messy particles
\`\`\`

この行は、正向の効果を消すためのものです。正向に \`sparkles\` を残したまま、負向にも sparkles を入れると、粒子が平均の量で止まります。消したい語は、正向から先に消してください。

保存するときは、効果の名前を一つだけメモします。次の日に服の色を変えても、効果の行は残します。効果の行まで消すと、比較が最初に戻ります。

光の向きを変える日も、効果の行は残します。残したうえで、照明のガイドから向きを一つだけ差し替えます。差し替えた向きが効果を消すなら、効果の方を強くするのではなく、向きを元に戻します。向きと効果が両方変わった枚は、どちらのガイドを直すかが決まらないので、保存しません。保存するのは、向きが同じで効果だけが違う二枚か、効果が同じで向きだけが違う二枚です。`,
      },
      {
        title: '自然文と Midjourney',
        content: `ChatGPT、Gemini、FLUX のように文で指示するモデルでは、タグの列をそのまま貼らず、何が光るか、どこに置くか、何を増やさないかを文にします。負向の専用欄が無い場合は、文の最後に避けたいものを書きます。

**自然文**

\`\`\`
1 adult woman, adult, wearing a white blouse and a long coat.
A few small sparkles in the air, dark plain background, soft rim light.
Do not cover the face with particles. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cluttered effects
\`\`\`

Midjourney では、重みの丸括弧を外し、パラメータは文の末尾です。2026年11月時点の公式パラメータ一覧では、\`--ar\` または \`--aspect\` で縦横を変え、\`--no\` で入れたくないものを書きます。パラメータはプロンプトのあと、ダッシュの前に空白を一つ入れ、パラメータの中に読点は入れません。バージョンによって仕様が違うことがあります。

公式の一覧は <a href="https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Midjourney の Parameter List</a> です。

**Midjourney**

\`\`\`
1 adult man, adult, dark coat, standing full length,
a glowing magic circle on the floor, dark plain background,
soft light, no letters on the circle --ar 3:4 --no text
\`\`\`

通った自然文は、タグに戻すときに効果の語を一つだけ残して保存します。文のままイラスト向けの欄へ貼ると、粒子だけが平均の量に戻ることがあります。

戻したタグは、効果の名前がファイル名に残っているかを確認してから次の日に使います。確認せずに服の色だけを変えると、前日の効果が残ったまま色の実験になり、色が濁った原因が分かりません。濁ったときは、効果の行を外して色だけを見ます。色が安定したら、効果を一つ戻します。ハートの枚を魔法の起点にしないでください。記号の色が、円の色に混ざります。混ぜたいときは、両方を消した無地から、新しいファイルで一つずつ足します。`,
      },
    ],
    faq: [
      {
        q: 'エフェクトは何個まで足せますか',
        a: '一枚につき一つが起点です。魔法陣が安定してから粒子を足す、のように、前の効果が三枚同じに見えてから次を足してください。',
      },
      {
        q: 'キラキラが顔を隠します',
        a: 'sparkles を人数の後ろへ移すか、一度消して背景を暗くします。重みを上げる前に、粒子の量を場所で減らしてください。',
      },
      {
        q: 'びっくりの記号が文字になります',
        a: '「！」は書かせず、surprised と emphasis lines にします。文字はネガティブの text に残してください。',
      },
      {
        q: 'サウンドエフェクトも書けますか',
        a: 'このページは静止画の見た目だけです。音の効果は扱いません。動きに見える線やぶれに置き換えてください。',
      },
      {
        q: '光のプロンプトとどう分けますか',
        a: '光の向きと影は照明のガイド、粒子・魔法陣・効果線・画面の加工はこのページです。向きを一つ残してから、効果を一つ足します。',
      },
    ],
  },

  'camera-lens-prompt-guide': {
    sections: [
      {
        title: 'カメラで決める距離とレンズ',
        content: `「プロンプト カメラ」「カメラワーク プロンプト」「レンズ プロンプト」で探しているのは、被写体からカメラまでの距離、レンズの見え方、ピント、写真らしい加工、そして動画にしたときのカメラの動きです。検索では、カメラ位置、カメラフレーム、カメラを引く、距離、引き、広角、望遠、レンズフレア、レンズ越し、レンズの水滴、被写界深度が一緒に出ます。

このページは、距離とレンズと、動画の動きの言葉を担当します。カメラの高さ、見下ろし、見上げは [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide)、[下からのアングル](/guides/low-angle-prompt-guide)、[見下ろす構図・俯瞰](/guides/high-angle-prompt-guide) に残します。カメラ目線は [目線・視線のプロンプト一覧](/guides/gaze-direction-prompt-guide) です。ここでは目線の語を増やしません。

画像から動画にする手順の全体は [画像から動画AIプロンプト](/guides/image-to-video-ai-prompt-guide) です。このページは、その中のカメラの言葉だけを厚くします。

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。建物や商品だけの絵には人数を書きません。服は閉じた日常着です。カメラのメーカー名、レンズの商品名は書きません。焦点距離の数字は、写真の言葉としてだけ使います。

2026年11月時点です。焦点距離や絞りの数字は、モデルが光学計算をしているわけではありません。見た目が変わらなければ、広角、望遠、浅いピント、のように結果の言葉へ戻してください。バージョンによって効きが違うことがあります。

撮影という言葉で探している人は、距離だけでなく、写真として見える加工も一緒に欲しています。フィルムの粒、フレア、白いフチ、定点の高い画角は、その加工です。加工を先に足して距離を書かないと、顔のアップのまま粒だけが乗ります。距離を先に決め、加工は一つ、がこのページの順です。高さや目線を同じ日に変えないでください。高さを変えた絵と、レンズを変えた絵を見比べても、どちらが周囲を広げたのかが残りません。比較は、距離だけを変えた二枚を先に残してから、次の層へ進みます。`,
      },
      {
        title: 'ショットの距離とカメラを引く',
        content: `距離は、画面に体のどこまで入るかです。二つを同じ強さで書かないでください。顔の情報なら近い距離、靴と場所なら引いた距離、です。

カメラを引く、引き、は、被写体を小さくして周囲を入れる指示です。\`wide shot\` か、camera pulled back と自然な英語で書きます。\`close-up\` を残したまま引くと、顔のアップのまま背景だけが矛盾します。引く枚では、近い距離の語を正向から消してください。

| 距離 | 書き方 | 画面に入るもの |
|---|---|---|
| ごく近い | extreme close-up | 目、小物の一部 |
| 顔 | \`close-up\` | 顔 |
| 腰上 | medium shot | 表情と服の上 |
| 膝上 | \`cowboy shot\` | 手と服 |
| 全身 | \`full body\` | 頭から靴 |
| 引き | \`wide shot\` | 全身と周囲 |
| さらに引く | camera pulled back | 自然な英語。場所が広がる |

**街でカメラを引く**

\`\`\`
1 adult woman, adult, long coat, trousers, walking,
camera pulled back, wide shot, full body,
crosswalk, daytime, buildings behind
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
close-up, cropped, out of frame
\`\`\`

引いたのに顔だけが大きいときは、\`wide shot\` を人数の直後へ移し、\`portrait\` や \`close-up\` が残っていないかを見ます。全身が主題なら \`full body\` を残したまま、場所の名詞を一つ減らすと、人が小さくなりすぎません。`,
      },
      {
        title: '位置と高さは別のページ',
        content: `カメラ位置は、距離とは別の軸です。高さ（目の高さ、上、下）と、体の正面か斜めかは、構図のガイドが担当します。このページで高さを詳しく書き直すと、同じ語が二つのページで競合します。

ここでは、位置を一文だけ足すときに使う語を残します。真横は from the side、肩越しは over the shoulder と自然な英語です。公式タグとしては断定しません。肩越しは、手前の人が画面を隠しやすいので、主役が一人の肖像では使いません。二人の位置関係は [二人構図](/guides/two-person-composition-prompt-guide) です。

カメラフレームは、何を枠の中に残すかです。顔の枠なら \`close-up\`、全身の枠なら \`full body\`、場所の枠なら \`wide shot\` です。枠の中にもう一つの枠（窓、扉）を置く書き方は、あとの節です。

高さの語をこのページの例に混ぜるときは、構図のガイドで決めた語を一つだけ残します。\`from above\` と \`from below\` は同時に書きません。目線を変えたくなったら、視線のガイドへ戻ってください。カメラ目線の語を、レンズの語と一緒に強くしないでください。

**真横、腰上**

\`\`\`
1 adult man, adult, coat, shirt, trousers,
from the side, medium shot, standing,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
close-up, from above, from below
\`\`\`

横顔なのに両目が見えるときは、from the side を前へ移し、\`looking at viewer\` が残っていないかを見ます。目線を残す枚は、視線のガイドの組み合わせに戻してください。`,
      },
      {
        title: 'レンズと焦点距離の言葉',
        content: `レンズは、距離のあとで見え方を一つ足す層です。広角は \`wide-angle lens\`、望遠は \`telephoto lens\`、魚眼は \`fisheye lens\`、マクロは \`macro photo\` です。標準的な見え方に戻すときは、これらの語を消して、距離の語だけにします。

広角は周囲が入り、端の形が伸びることがあります。顔の肖像で広角を強くすると、顔の端が伸びます。場所を見せる引きの絵に向きます。望遠は背景が近く感じられ、人物が背景から分離しやすくなります。分離しないときは、次の節の浅いピントを足します。魚眼は樽型のゆがみです。建物や通路向きで、顔の本番には向きません。マクロは小さい物を大きく写します。花、ボタン、杯のように、人の顔以外で試してください。

35mm、85mm のような数字は、写真でよく使われる焦点距離の言葉です。カメラの商品名ではありません。数字だけで絵が変わらないことはよくあります。変わらなければ、\`wide-angle lens\` や \`telephoto lens\` や shallow depth of field に言い換えてください。絞りの数字も同じです。見た目の言葉の方が、意図は残りやすいです。

| レンズ | 書き方 | 向く画面 |
|---|---|---|
| 広角 | \`wide-angle lens\` | 街、室内の広さ |
| 望遠 | \`telephoto lens\` | 人物を背景から離す |
| 魚眼 | \`fisheye lens\` | 通路、ホール。顔は避ける |
| マクロ | \`macro photo\` | 花、小物 |
| 35mm | 35mm lens | 自然な英語。変わらなければ広角へ |
| 85mm | 85mm lens | 自然な英語。変わらなければ望遠へ |

**望遠で人を離す**

\`\`\`
1 adult man, adult, coat, shirt,
telephoto lens, medium shot, shallow depth of field,
street, blurry background, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
fisheye, wide-angle distortion
\`\`\`

**魚眼は通路**

\`\`\`
fisheye lens, barrel distortion,
empty museum hallway, repeating arches, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

広角を足したのに周囲が増えないときは、\`close-up\` が残っていないかを先に見ます。距離が近いままレンズだけを変えても、枠は顔のままです。

焦点距離の数字が無視されるのは、失敗というより、モデルがその数字を画角の計算に使っていないことが多いからです。比較は、数字ありと、広角または望遠の言葉あり、の二枚で足ります。差が見えなければ、数字の行は削除します。残したまま別の語を足すと、プロンプトだけが長くなり、後ろの背景が落ちます。魚眼は差が見えやすい一方で、人の顔を歪めます。顔が主題の枚では使わず、通路やホールの確認用に分けて保存してください。マクロは、画面の大半が小物になる距離です。人の肖像の \`close-up\` とは別のファイルにします。小物の枚に人のタグが残っていると、指や顔が小物の横に出ます。`,
      },
      {
        title: 'ボケ・被写界深度・ミニチュア',
        content: `被写界深度は、どこまでピントが合うかです。浅いのは shallow depth of field、背景の丸いぼけは \`bokeh\`、深いのは deep focus と自然な英語です。公式タグとしては断定しません。浅いピントは、主役を背景から離すときに使います。深いピントは、風景や店内の奥まで見せるときに使います。

両方を同じ強さにすると、中間のぼけで止まります。肖像なら浅い方だけ、街の全景なら深い方だけ、と決めてください。ぼけが顔まで来るときは、\`sharp focus\` を人物の直後に残し、\`bokeh\` は後ろへ移します。

ミニチュアのように見えるのは tilt-shift、または miniature effect と自然な英語です。街や風景を上から見た絵に向きます。人物の肖像で使うと、体の一部だけがピントから外れます。人を出すなら、ぼけは shallow depth of field に戻してください。

| 語 | 日本語 | 向き |
|---|---|---|
| shallow depth of field | 浅い被写界深度 | 人物、商品 |
| \`bokeh\` | 玉ぼけ | 夜の灯、背景 |
| deep focus | 深いピント | 風景、室内の奥 |
| \`sharp focus\` | 主役をシャープに | ぼけとセットで前に置く |
| tilt-shift | ティルトシフト | 風景のミニチュア感 |

**夜の玉ぼけ**

\`\`\`
1 adult woman, adult, coat, scarf, upper body,
shallow depth of field, bokeh, sharp focus,
city lights behind, evening
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
deep focus, blurry face
\`\`\`

顔までぼけたときは、\`bokeh\` を一度消し、\`sharp focus\` と medium shot だけに戻します。玉ぼけは、顔が三枚続けてシャープになってから戻してください。

ぼけは、距離が決まってから足します。顔のアップで玉ぼけを強くすると、背景がほとんど無いので、ぼけの玉が顔の横に浮きます。玉を見せたい枚は、街灯が遠くに見える距離まで引いてから、shallow depth of field を足します。引いたあとに人が小さすぎるときは、medium shot に戻し、街灯は増やしません。深いピントは、道の先の建物を見せるときです。人物の服と、奥の看板の文字を両方シャープにしようとすると、崩れた文字になります。看板の文字は書かせず、建物の形だけにしてください。ミニチュア感は、人を小さくした風景で試します。人の顔が中心の枚には足しません。足すと、目だけがピントから外れます。`,
      },
      {
        title: 'フレア、レンズ越し、フィルム、枠',
        content: `レンズフレアは \`lens flare\` です。強い光源が一つあるときに足します。光源が無い室内でフレアだけを書くと、理由の無い光の輪が出ます。窓か街灯を一つ残してから足してください。色のずれは chromatic aberration、明るい部分の膨らみは \`bloom\`、粒は film grain と自然な英語です。加工は一つです。

レンズ越しは、前景のガラスを通して見る構図です。shot through glass と自然な英語です。レンズに水滴は water droplets on the lens と自然な英語です。水滴はガラスの上です。服や髪が濡れる描写にはしません。水滴を足すときは、傘か軒先を書いて、被写体は乾いたコートのままにします。

フィルムらしい見た目は film photo、その場で出る印画は instant photo、白いフチは white photo border と自然な英語です。定点カメラ、監視カメラ風は、fixed high angle、security camera style と自然な英語です。部屋の隅の高い位置から、広い室内を静止した画角で見る、という見た目です。実在の場所の監視や、個人の特定には使いません。時刻の文字は出さないでください。文字はネガティブに残します。

枠の中の枠は frame within a frame と自然な英語です。窓、扉、アーチの向こうに人を置きます。枠が二つあると、人が小さくなります。人を見せたいなら、枠は一つだけにしてください。

| 語 | 日本語 | 注意 |
|---|---|---|
| \`lens flare\` | レンズフレア | 光源を一つ残す |
| shot through glass | レンズ越し、ガラス越し | 自然な英語 |
| water droplets on the lens | レンズの水滴 | 被写体は濡らさない |
| film photo | フィルム写真 | 粒とセットにしすぎない |
| instant photo | インスタント写真 | フチが出ることがある |
| security camera style | 定点カメラ風 | 文字の時刻は出さない |
| frame within a frame | 枠の中の枠 | 枠は一つ |

**ガラスの水滴、乾いたコート**

\`\`\`
1 adult woman, adult, dry coat, holding an umbrella,
water droplets on the lens, shot through glass,
medium shot, street, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

**扉の枠**

\`\`\`
1 adult man, adult, coat, standing in a doorway,
frame within a frame, full body,
soft indoor light, simple hall
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
close-up, extra people, text
\`\`\`

**定点の待合、文字なし**

\`\`\`
security camera style, fixed high angle, wide shot,
adult commuters in coats walking through a station concourse,
flat indoor light, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, timestamp, watermark, close-up
\`\`\`

フレアが顔を白くするときは、\`lens flare\` を消し、光源の名詞だけを残します。水滴が服に移ったときは、droplets on the lens を前へ戻し、服は dry coat のままにしてください。

レンズの水滴と、窓ガラス越しは、どちらも前景の透明な層です。同時に書くと、層が二枚になって、顔が二重にぶれます。水滴の枚ではガラス越しの語を消し、ガラス越しの枚では水滴を消します。定点カメラ風は、ポートレートの柔らかい光と相性が悪いです。平坦な光、高い位置、広い画角、文字なし、までにして、フィルムの粒やフレアは別の枚にします。枠の中の枠は、窓枠が顔より太くならないかを見ます。枠が主題になったら、人を medium shot に戻し、枠の語を外してください。枠を外したあとに周囲が足りなければ、距離の節の引きに戻ります。加工の語は、そのとき一緒に戻しません。`,
      },
      {
        title: '動画生成のカメラワーク',
        content: `動画のカメラワークは、静止画の距離とは別の文で書きます。一回の生成で、動きは一つです。パンとズームと手持ちを同時に書くと、カメラがどこへ行くのかが平均になります。

2026年11月時点で、公式の説明を確認できた言葉は次のとおりです。バージョンによって画面の名前が違うことがあります。

Runway のヘルプ「Camera Terms, Prompts, and Examples」は、パンを定点での左右の回転、ティルトを上下の回転、ドリーを前後の移動、push in を被写体へ近づく移動、pull back を離れる移動、tracking を被写体に並走、orbit を周回、zoom を焦点距離の変化、handheld を手持ちの揺れ、static をカメラが静止、と分けています。固定にしたいときは、動くのは被写体だけで、カメラは動かない、と文で補強するよう案内しています。

Kling の Camera Movement の公開ページには、horizontal、vertical、zoom、pan、tilt、roll と、それらを組み合わせたマスターショットの名前が並んでいます。つまみの数値はこのページでは書きません。

Luma の学習ハブにある Camera Motion は、画像のあとで Camera と入れて選ぶメニューとして、Pan、Orbit、Crane、Move、Push In、Pull Out を挙げています。記事の日付は古く、今の画面と違うことがあります。

長さ、料金、回数は書きません。各サービスの今の画面と公式の説明を見てください。画像を渡してから動かす手順の全体は [画像から動画AIプロンプト](/guides/image-to-video-ai-prompt-guide) です。

| 言葉 | 意味 | 書き方の例 |
|---|---|---|
| pan | 定点で左右に回す | slow pan left |
| tilt | 定点で上下に回す | tilt up |
| dolly | カメラが前後に動く | dolly in |
| zoom | 画角だけが変わる | slow zoom in |
| tracking | 被写体に並ぶ | tracking shot |
| orbit | 周回 | slow orbit |
| handheld | 手持ちの揺れ | subtle handheld |
| static | カメラは固定 | static camera |

公式の入口は <a href="https://help.runwayml.com/hc/en-us/articles/46749315925395-Camera-Terms-Prompts-Examples" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Runway の Camera Terms</a>、<a href="https://kling.ai/quickstart/ai-camera-control-guide" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Kling の Camera Movement</a>、<a href="https://lumalabs.ai/learning-hub/how-to-use-camera-motion" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Luma の Camera Motion</a> です。

**固定カメラで、コートだけ動かす**

\`\`\`
Use the still image of 1 adult woman, adult, in a long coat.
Keep her face, coat, and the street the same.
The camera is static. Only the coat hem and hair move slightly in the wind.
Do not add people. No text.
\`\`\`

**ゆっくり周回、一人**

\`\`\`
1 adult man, adult, standing in a coat on an empty plaza.
Slow orbit around him. Keep the same face and the same clothes.
No other camera move. No text. No extra people.
\`\`\`

静止画の \`close-up\` を残したまま動画で pull back と書くと、始まりの枠と終わりの枠が矛盾します。引く動画では、静止画の時点で \`wide shot\` か medium shot にしておいてください。

動画でカメラを固定したいのに画面がゆれるときは、動きの語がカメラ側に無いことが原因のことがあります。袖が揺れる、髪が揺れる、のように被写体の動きを書き、カメラは動かない、と対で書いてください。近づく動きが欲しいときは、dolly in か zoom in の片方です。両方を書くと、背景の広がり方が平均になります。公式の説明も、移動と画角の変化を別の語にしています。画面のボタン名が記事と違うときは、ボタンではなく、プロンプトの文の方を一つに減らして試します。ボタンと文で別の方向を指定すると、結果はどちらにも寄りません。長さや回数で比べないでください。このページが比べるのは、動きの語が一つかどうかだけです。

静止画のレンズの語を、動画の文へそのまま全部移さないでください。広角、望遠、水滴、フレアは、静止画の見た目です。動画では、その見た目は入力の画像が既に持っています。動画の文に同じ語を重ねると、カメラの動きより、絵の加工の方が強く読まれることがあります。動画の文に残すのは、動かすものと、カメラの動き一つ、です。加工を変えたくなったら、静止画の方を作り直してから、同じカメラの文を掛けます。`,
      },
      {
        title: '自然文と Midjourney',
        content: `文で指示するモデルでは、距離、レンズ、ピントを一文ずつにします。数字の焦点距離より、望遠か広角か、背景はぼかすか、を先に書いてください。

**自然文**

\`\`\`
1 adult woman, adult, wearing a coat, photographed from farther back.
Wide view of a daytime crosswalk, her whole body visible, buildings behind.
Sharp focus on her, softer background. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, close-up
\`\`\`

Midjourney ではパラメータを文の末尾に置きます。\`--ar\` の前に空白を入れ、パラメータの中に読点は入れません。2026年11月時点の公式の書き方です。バージョンによって仕様が違うことがあります。一覧は <a href="https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Parameter List</a> です。

**Midjourney**

\`\`\`
1 adult man, adult, coat, medium shot, telephoto look,
shallow depth of field, city lights bokeh, evening --ar 3:4 --no text
\`\`\`

カメラ目線にしたいときは、この文へ \`looking at viewer\` を足さず、視線のガイドの文を使ってください。レンズと目線を同じ日に両方強くすると、どちらを直したのかが残りません。

距離の実験が終わったファイルは、レンズの実験へコピーしてから、距離の語は残します。コピーのときに \`close-up\` を消し忘れると、望遠を足しても枠は顔のままです。動画の文へコピーするときも、静止画の距離を一文で残します。残さないと、固定カメラの動画が勝手に寄ります。寄った結果を、レンズの失敗と混同しないでください。動画の寄りはカメラの動き、静止画の寄りは距離の語、です。ファイル名に、静止画か動画かを先に書いておくと、次に開いたときにどちらを直すか迷いません。`,
      },
    ],
    faq: [
      {
        q: 'カメラを引くには何と書きますか',
        a: 'wide shot か、camera pulled back と自然な英語で書き、close-up や portrait は正向から外します。近い距離の語が残っていると、引きが負けます。',
      },
      {
        q: '35mm や 85mm は書かない方がよいですか',
        a: '写真の言葉としては書けます。見た目が変わらなければ、広角、望遠、浅い被写界深度に言い換えてください。カメラの商品名は書きません。',
      },
      {
        q: 'カメラ目線はこのページですか',
        a: 'いいえ。カメラ目線は目線のガイドです。このページは距離、レンズ、ピント、動画のカメラの動きです。',
      },
      {
        q: '動画のパンとズームは同時に書けますか',
        a: '一回につき一つにしてください。公式の用語も、回転と移動と画角の変化を分けています。バージョンによって画面の名前は違います。',
      },
      {
        q: 'レンズの水滴で服まで濡れます',
        a: 'water droplets on the lens と、乾いたコートであることを同じ文に書きます。水滴はガラスの上、です。服が変わるときは、水の語を一度消してください。',
      },
    ],
  },

  'mob-crowd-prompt-guide': {
    sections: [
      {
        title: 'モブは背景の人',
        content: `「モブ プロンプト」で探しているのは、主役ではない人です。背景の群衆、通行人、観客、顔を描かない人、ぼけた奥の人、です。主役を一人残したまま、街や祭や駅や会場を人がいる場所にするための書き方です。

モブは、名前も衣装の細部も持たせません。持たせると、二人目の主役になります。書くのは、場所、大人であること、顔を描かないこと、主役からピントを外すこと、です。

このページは、背景の人の密度を担当します。場所の名詞そのものは [背景プロンプト](/guides/background-prompt-guide)、主役が二人のときの位置は [二人構図](/guides/two-person-composition-prompt-guide) です。二人のガイドで人数が決まってから、端の通行人を足す、という順にしてください。最初から群衆を書くと、主役の顔が群衆の平均になります。

全員大人です。\`adult crowd\`、\`adult passersby\` と書き、\`adult\` を残します。学校の場面、子どもが混ざる行事の書き方は入れません。実在の人物、特定のイベント名、作品の観客席は書きません。

顔を簡略にするのは、個人を特定しないためでもあります。実在の通行人に似せる指示は書きません。シルエット、後ろ姿、ピント外れ、で足ります。

モブが主役に見えるときは、奥の人の情報量が多いです。髪、年齢、服の色、持ち物、表情は、主役の列にだけ書きます。奥の列は、大人の集団、顔は省略、ピントは外す、の三つで止めます。三つを超えて「赤い帽子の人」と書くと、その人が二人目の主役として手前に出てきます。検索で、顔のない群衆、ぼけた背景の人、シルエット、と並ぶのは、この情報量を落とすためです。落としたあとに場所が空いたように見えても、密度の語を一気に \`crowd\` まで上げないでください。空いた分は、a few から一段だけ戻します。一段で足りないときだけ、次の段へ進みます。`,
      },
      {
        title: '群衆のタグ',
        content: `密度の語と、顔の描き方の語は、別の列です。密度を先に一つ、顔の省略を一つ、までにしてください。

\`crowd\` は群衆、\`passersby\` は通り過ぎる人、background people は奥の人、と自然な英語です。\`audience\` は観客です。舞台か客席の語と一緒でないと、ただの人混みに戻ることがあります。\`silhouettes\` は影絵、faceless crowd は顔のパーツを描かない集団、blurry background people は奥でぼけた人、です。公式タグとして常に同じ結果になる、とは断定しません。

\`solo focus\` は、一人に注目を残す語としてよく使われます。保証ではありません。主役の服と、\`sharp focus\` を前に置いたうえで足してください。

| 語 | 日本語 | 向き |
|---|---|---|
| \`crowd\` | 群衆 | 密度が欲しいとき |
| \`passersby\` | 通行人 | 通りすがり。少なめに寄る |
| background people | 背景の人 | 自然な英語。奥に置く |
| \`audience\` | 観客 | 舞台、客席とセット |
| faceless crowd | 顔を描かない | 自然な英語 |
| blurry background people | ぼけた奥の人 | 自然な英語。ピントとセット |
| \`silhouettes\` | シルエット | 逆光の奥 |
| \`solo focus\` | 一人に注目 | 主役の服より後ろでもよい |

密度の語を二つ同じ強さにしないでください。\`crowd\` と \`passersby\` を同時に強くすると、少ない列と多い列が混ざります。

**奥の人は顔なし**

\`\`\`
1 adult woman, adult, coat, standing, medium shot, sharp focus,
faceless crowd, blurry background people, adult passersby,
city sidewalk, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
duplicate face, cloned face, extra main character
\`\`\`

顔のパーツがまだ残るときは、faceless を前へ移し、背景の人の服の色を書かないでください。色を書くと、その人が二人目の主役になります。`,
      },
      {
        title: '主役をぼかさない',
        content: `群衆で失敗しやすいのは、主役の顔まで平均になることです。ピントの層を、群衆の層より前に置きます。

\`sharp focus\` を主役の直後、shallow depth of field をその次、blurry background を人混みの語と一緒、です。深いピントの deep focus を残すと、奥の顔まで描こうとして、顔が複製されます。群衆の枚では deep focus を正向から外してください。

主役の服は無地の一色にします。群衆の服の色を指定しないでください。赤いコートの主役と、色を指定しない奥の人、に分けると、視線が主役に戻ります。奥の人に髪型や年齢の細部を書くと、その細部が主役の髪に混ざります。

画面の端でよいときは、\`medium shot\` か \`cowboy shot\` で主役を大きく残します。\`wide shot\` にすると、主役とモブの大きさが近づきます。場所を見せたい枚だけ引いてください。距離の語の詳細は [カメラのプロンプト](/guides/camera-lens-prompt-guide) です。

**ピントは手前**

\`\`\`
1 adult man, adult, navy coat, sharp focus, medium shot,
shallow depth of field, blurry background,
adult crowd, faceless crowd, train station concourse
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
deep focus, duplicate face, extra main character, fused bodies
\`\`\`

主役が奥の人と合体するときは、人数の行を \`1 adult man, adult\` に戻し、\`crowd\` を一度消します。一人の絵が三枚安定してから、faceless crowd を後ろへ足し直してください。

主役の服を無地の一色にする理由は、比較のためだけではありません。模様があると、奥の人の服の柄とつながって、体の境界が消えます。境界が消えた枚を、負向の語だけで直そうとすると、正向ではまだ模様が勝っています。先に模様を消し、無地に戻してから、もう一度出します。それでもつながるときは、密度を下げます。ピントの語を増やして密度を残すより、人を減らした方が、顔の複製は止まりやすいです。複製が止まった枚を保存し、そのファイルから密度を一段だけ戻します。戻す前に、奥の人の髪色が混ざっていないかを見てください。`,
      },
      {
        title: '人数は目安',
        content: `人数の数字は、ぴったりには揃いません。少ない通行人なら a few adult passersby、多いなら \`adult crowd\` と、密度の言葉で書いてください。十人、二十人と書いても、枠の広さで数が変わります。数を固定したい集合写真は、このページのモブではありません。二人までの描き分けは二人構図のガイドです。

横に広い枠の方が、奥の人が入りやすいことがあります。縦の全身で \`crowd\` を書くと、人が上下に積まれて、体がつながります。群衆を足す枚は、主役が腰上で、背景に横の余白がある状態から始めてください。

モブの服は書きません。書くなら、coats のように集団の一語だけです。一人ずつコートの色を割り振ると、その人数ぶん主役が増えます。

| 欲しい密度 | 書き方 | 向かないこと |
|---|---|---|
| ほとんど無人 | empty, a few adult passersby | \`crowd\` を残さない |
| 通りすがり | \`passersby\` | 顔の細部 |
| にぎわい | \`adult crowd\` | 一人ずつの髪色 |
| 客席 | \`audience\`, adult audience | 舞台の語が無い状態 |

数字を消したあとに人がゼロになるときは、a few adult passersby を一つだけ戻します。\`crowd\` まで戻すと、また顔が複製されます。密度は一段ずつ上げてください。

密度を上げる前に、枠の余白を見ます。余白が無い腰上の縦構図では、人を足す場所が主役の肩の後ろしかありません。そこへ \`crowd\` を書くと、肩から人が生えたように見えます。余白を作るなら、主役を左右のどちらかに寄せ、反対側を通路にします。寄せる語は、構図のガイドで一つ選んで戻ってきます。このページでは、寄せる作業と密度の作業を同じ日に混ぜません。市場や祭のように横に長い場所は、余白を作りやすいです。オフィスの通路は幅が狭いので、a few で止めてください。狭い通路で \`crowd\` を書くと、人が上下に積まれます。積まれた枚は、密度を下げる以外の直しを先にしないでください。`,
      },
      {
        title: '場面の型',
        content: `場所は一つです。横断歩道と駅と祭を同じ強さにすると、床が三種類になります。次の型から一つ選び、主役の服は前の節のまま固定します。

横断歩道は crosswalk、昼のビル、adult pedestrians です。祭は festival、adult attendees、提灯か屋台を一つだけです。浴衣を着せるなら主役だけにし、奥の人は色を指定しません。駅は train station concourse、adult commuters、コートの集団です。人が押し合う書き方は入れません。歩き抜けている密度にします。

ライブ会場は concert hall、stage、adult audience、\`solo focus\` です。主役をステージに置くなら、客はぼけた奥です。主役を客席に置くなら、ステージの灯を遠くにします。両方をシャープにしないでください。

オフィスは office、adult office workers、シャツとスラックスです。カフェは cafe interior、adult patrons。市場は outdoor market、adult shoppers。室内を二つ同時に書かないでください。

**祭、主役だけ色を指定**

\`\`\`
1 adult woman, adult, navy yukata, sharp focus, medium shot,
festival at night, paper lanterns, adult attendees,
faceless crowd, blurry background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
duplicate face, extra main character, deep focus
\`\`\`

**客席はぼけた大人**

\`\`\`
1 adult man, adult, on stage, shirt, trousers, solo focus,
spotlight, concert hall, adult audience, blurry background people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
duplicate face, cloned face, extra main character, text
\`\`\`

**市場の通行**

\`\`\`
1 adult woman, adult, coat, shopping bag, sharp focus,
outdoor market, adult shoppers, passersby, blurry background, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
duplicate face, extra main character, fused bodies
\`\`\`

場所を変えた日は、群衆の語を増やしません。場所が三枚同じに見えてから、密度を一段だけ動かします。

場面を選ぶときは、床の種類が一つになるかを確認します。横断歩道は舗装、祭は夜の通り、駅はコンコース、会場は客席とステージ、オフィスは通路、カフェは床と窓、市場は屋台の列、です。屋台とデスクを同じ文に書くと、床が混ざります。夜の祭に昼の語が残っているときも同じです。時間は一つ、床は一つ、主役の服は一つ、とメモしてから生成します。メモに無い名詞がプロンプトに残っていたら、生成の前に消してください。残した名詞は、次の場面に持ち込まれます。持ち込まれた名詞を負向で消すより、正向から消した方が、場所は安定します。

祭の提灯、駅の看板、市場の値札は、文字になりやすい名詞です。形だけが欲しいときは、灯、柱、屋根、のように文字の出ない部品へ言い換えます。言い換えても文字が出るときは、その部品を一度消し、無地に近い床と壁だけに戻します。戻した枚で主役の顔が安定してから、部品を一つ戻します。看板の文言を書かせるのは、このページの仕事ではありません。文字は負向に残し、読めない看板の絵は採用しません。`,
      },
      {
        title: '顔が複製されたとき',
        content: `同じ顔が奥に並ぶ、主役が二人いる、体がつながる、は別の失敗です。負向にまとめて長く書いても、正向の矛盾は消えません。

同じ顔は、奥の人に髪型を書いていないかを先に見ます。書いていたら消します。それでも複製するときは、duplicate face と cloned face を負向に足します。主役が二人になるときは、正向の人数が \`1 adult woman\` または \`1 adult man\` のままか、\`2 adults\` が残っていないかを見ます。残っていたら、モブの枚では外します。体がつながるときは、密度を \`crowd\` から \`passersby\` へ下げ、枠を腰上に戻します。

\`\`\`
duplicate face, cloned face, identical faces,
extra main character, extra people in the foreground,
fused bodies
\`\`\`

この行は、今の失敗に合うものだけを負向へ足すためのメモです。正向に \`crowd\` を残したまま、負向で people を全部消そうとすると、背景だけが無人になります。消したいのは手前の二人目です。奥の密度は正向に残してください。

顔のパーツが崩れた奥の人を、もう一度描き直そうとしないでください。モブは、描き直す対象ではありません。faceless か blurry に戻して、主役の顔だけを残します。

描き直したくなるのは、奥の人が主役より目立つときです。目立つ理由は、ピントが深い、服の色を書いた、表情を書いた、のどれかです。三つを一度に直すと、どの削除が効いたのかが残りません。まず表情の語を消し、次に服の色を消し、最後にピントを浅くします。各段で一枚だけ出します。三段目まで行かずに目立たなくなったら、そこで止めます。止めたプロンプトを別の場面へコピーするときは、場所の名詞だけを差し替えます。密度と顔の省略は、コピー先でも同じままにします。場面ごとに省略の強さを変えると、比較が最初に戻ります。`,
      },
      {
        title: 'ツールごとの書き方',
        content: `Stable Diffusion や NovelAI では、上のタグ列です。強調の記号は、それぞれのガイドに任せます。このページでは、密度の語に重みを掛けるのは最後です。目安より強くすると、人が手前に出てきます。目安として掛けるなら \`(crowd:1.1)\` までにして、顔が複製したら外します。

ChatGPT や Gemini では、どこに誰がいるかを文で分けます。手前に大人の主役が一人、奥に顔を描かない通行人、ピントは手前、です。負向の欄が無いときは、文の最後に、二人目の主役を足さない、顔を複製しない、と書きます。

Midjourney では、同じ内容を短い文にして、重みの括弧は外します。パラメータは文末です。\`--no\` に読点は入れません。

**自然文**

\`\`\`
1 adult woman, adult, in a navy coat, sharp in the foreground.
Behind her, an adult crowd of passersby with indistinct faces, on a daytime sidewalk.
Do not add a second main character. No duplicated faces. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, duplicate face, extra main character
\`\`\`

**Midjourney**

\`\`\`
1 adult man, adult, navy coat, sharp focus, medium shot,
blurred adult crowd behind him at a station, faceless background people --ar 3:4 --no text
\`\`\`

通った文は、タグに戻すときに密度の語を一つだけ残します。\`crowd\` と \`passersby\` の両方を残すと、次のモデルで密度が平均に戻ります。

ツールを替えた日に密度の語を変えないでください。タグで \`passersby\` だった文を、自然文では大勢の群衆、と訳すと、ツールの差ではなく密度の差を見ています。翻訳は、少ないまま少ない、に対応させます。Midjourney で人が手前に出すぎるときは、文の中で奥にいると明示し、\`--no\` は text に留めます。人数をパラメータで固定する書き方は、このページでは使いません。バージョンによって画面が違い、数字は揃わないからです。揃わない数字を強くするより、密度の言葉を一段下げてください。

自然文では、手前と奥を文の順序で分けます。最初の文が主役、次の文が奥の通行人、です。順序を逆にすると、群衆が手前に出て、主役が小さくなります。Midjourney でも同じで、文の前半に主役の服とピントを書き、後半に奥の人を書きます。後半に書いた服の色は、前半の主役へ移ることがあります。奥の人の色は書かず、ぼけることだけを書きます。タグ列でも、色の語は主役の行にだけ置き、\`crowd\` の行には置かないでください。

ぼかしの語が効かないモデルでは、奥の人をシルエットに言い換えます。逆光の語を一つ足すと、顔のパーツが影に落ちやすくなります。逆光で主役の顔まで影になるときは、主役にだけ弱い正面の光を足し、奥はシルエットのままにします。両方を同じ光にすると、また顔が揃います。光の詳しい向きは照明のガイド、ここでは主役と奥で光を分けないことだけを守ります。分けた枚を、次の場面の起点にしてください。`,
      },
      {
        title: 'オフィスとカフェの型',
        content: `室内のモブは、窓の外の群衆より顔が描かれやすいです。距離が近いからです。オフィスとカフェでは、奥の人を小さくするか、ピントを外すかを先に書いてください。

オフィスは、デスクの列と、歩いている大人の数人、です。会議の全員をシャープにすると、集合写真になります。集合写真が欲しいときは、このページではなく、人数を分けて書くガイドへ戻ってください。

カフェは、窓側の主役と、奥の客のシルエット、です。カップや皿を主役の手に持たせると、指が崩れます。持たせるなら、袋のように指が見えにくい物を一つまでです。手の崩れは [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) に分けます。

**オフィスの通路**

\`\`\`
1 adult woman, adult, shirt, trousers, cardigan, sharp focus,
office aisle, a few adult office workers, blurry background people,
indoor daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
duplicate face, extra main character, crowd
\`\`\`

**カフェの窓側**

\`\`\`
1 adult man, adult, coat, sitting by a cafe window, sharp focus,
adult patrons as silhouettes, blurry background, daytime
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
duplicate face, cloned face, extra main character, text
\`\`\`

室内で人が多すぎるときは、\`crowd\` を消して a few に戻します。窓の外まで人を書くと、ガラスの反射と人が混ざるので、外の人は次の実験まで足しません。

室内で窓の反射に顔が増えるときは、窓を背景の明るさとして残し、外の通行人は書きません。外の人と室内の人を同じ枚にすると、ガラスの上に別の顔が乗ります。カフェの枚でそれが起きたら、外の語を消し、室内のシルエットだけに戻します。オフィスで全員がカメラを向くときは、主役以外の視線を書かず、後ろ姿か、ピントの外、に戻します。視線の語は、主役の一人にだけ残してください。視線を全員に書くと、集合写真になり、モブではなくなります。

集合写真にしたいときは、このページの密度の語を消し、人数を分けて書くガイドへ戻ります。モブの枚に集合写真の語が残っていると、奥の人が前列へ歩いてきます。歩いてきた枚は、失敗として別名で残し、本番からは \`crowd\` を一段弱い語に戻します。戻したあとに場所が寂しく見えても、顔が複製されていないことを先に確認します。複製が無い寂しさは、次の段で密度を上げる理由になります。複製がある寂しさは、まだ省略が足りないサインです。`,
      },
    ],
    faq: [
      {
        q: 'モブと群衆はどう違いますか',
        a: 'このページでは、どちらも主役以外の人です。少ない通りすがりは passersby、密度が欲しいときは adult crowd と書き分けます。',
      },
      {
        q: '人数を数字で指定できますか',
        a: 'ぴったりには揃いません。少ない、多い、の言葉で一段ずつ変えてください。二人までの描き分けは二人構図のガイドです。',
      },
      {
        q: '背景の顔が主役と同じになります',
        a: '奥の人の髪や服の色を消し、faceless か blurry にします。重複は duplicate face を負向に足し、正向の人数が一人のままかを確認します。',
      },
      {
        q: 'solo focus は必ず効きますか',
        a: '注目を残す語として使えますが、保証ではありません。sharp focus と浅いピントを前に置き、深いピントの語は外してください。',
      },
      {
        q: '学校の行事の群衆は書けますか',
        a: 'このページでは書きません。大人の街、祭、駅、会場、オフィス、カフェ、市場に限ってください。',
      },
    ],
  },

  'dance-prompt-guide': {
    sections: [
      {
        title: 'ダンスはジャンルと形',
        content: `「ダンス プロンプト」「ai ダンス プロンプト」で探しているのは、踊っている途中の形です。\`dancing\` だけだと、立ったまま体を少し揺らす絵で止まることがあります。ジャンルを一つ、体の形を一つ、何が揺れるかを一つ、までにしてください。

検索では、動画、ブレイクダンス、社交ダンスが一緒に出ます。このページは、静止画のポーズを先に書き、そのあと画像から動画へ渡すときの動きの言葉を分けます。特定の曲名、振り付けの作品名、実在のダンサーの名前は書きません。ジャンルの一般的な形だけです。

ポーズ全般の立ち方と手の位置は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、画像を動かして渡す手順の全体は [画像から動画AIプロンプト](/guides/image-to-video-ai-prompt-guide)、舞台の光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

人物は大人だけです。\`1 adult woman\`、\`1 adult man\`、二人なら \`2 adults\` と書き、\`adult\` を残します。衣装は、袖があり、体を覆う服です。学校の場面は書きません。

2026年11月時点です。ジャンル名の効きはモデルで違います。形が出ないときは、ジャンル名を残したまま、片足、腕の位置、膝の高さのように、見える形を一つ足してください。

\`dancing\` が立ち姿で止まるのは、語が雰囲気だからです。モデルは、踊っている人の平均として、両足が床についた姿勢を出しやすいです。平均から離すには、床から離れた足、曲がった膝、床についた手、のように、平均ではない形を一つ書きます。ジャンル名は、その形がどの系統かを補助します。系統だけを書いて形が無いと、平均に戻ります。形だけを書いて系統が無いと、ただの片足立ちになります。両方を一つずつ残し、三つ目の形は足しません。三つ目を足した枚は、どの形が勝ったのかが残らないので、比較に使いません。`,
      },
      {
        title: 'ジャンルの早見',
        content: `ジャンルは一つです。バレエと街舞を同じ強さにすると、靴と膝の高さが平均になります。

| ジャンル | 書き方 | 形の補助 |
|---|---|---|
| バレエ | \`ballet\` | arabesque pose（自然な英語） |
| ヒップホップ | hip-hop dance | 自然な英語。膝を落とす |
| ブレイクダンス | \`breakdance\` | freeze pose（自然な英語） |
| 社交ダンス | \`ballroom dancing\` | 二人。支え合う腕 |
| ジャズ | jazz dance | 自然な英語。片足と腕 |
| 日本の舞 | Japanese traditional dance | 自然な英語。着物か袴 |
| 舞台 | stage performance | 大人の演者。客席は遠く |

バレエのポーズ名は、アラベスクのように形が決まっている語が残りやすいです。名前だけで脚の位置が違うときは、one leg extended behind と自然な英語で補います。公式タグとしては断定しません。

ヒップホップは、膝を曲げた低い構えです。wide stance、knees bent と自然な英語を一つ足します。ブレイクダンスは、床に近いアクロバティックな形です。\`breakdance\` だけだと立ち姿に戻ることがあるので、freeze pose か one hand on the floor を一つ足します。倒立は手と床の接触で指が崩れやすいので、最初は片膝を床につけた形から試してください。

社交ダンスは二人です。一人の枚に \`ballroom dancing\` と書いても、相方が勝手に増えることがあります。\`2 adults\` を先に書いてください。日本の舞は、着物か袴と、扇を一つまでです。舞台は、演者が大人で、客はぼけた奥にします。客の書き方は [モブ・群衆のプロンプト](/guides/mob-crowd-prompt-guide) です。

**低い構え**

\`\`\`
1 adult man, adult, hip-hop dance, knees bent, wide stance,
hoodie, loose trousers, sneakers, full body,
simple studio, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing still, extra people
\`\`\`

ジャンルを変える日は、形の補助語も一緒に変えます。バレエの arabesque を残したまま hip-hop と書くと、脚の位置が混ざります。

低い構えが普通の立ち姿に戻るときは、knees bent が後ろに落ちています。人数の直後へ移し、\`standing\` が残っていないかを見ます。床に手をつく形が立ったままになるときも、one hand on the floor を前へ移します。移しても立ったままなら、そのモデルではジャンル名が立ち姿に寄っています。形の語を残してジャンル名を一度消し、形だけで三枚見てから、ジャンル名を弱く戻します。戻したときに衣装が変わるなら、衣装の節の語を先に固定してから戻してください。`,
      },
      {
        title: 'ポーズと動きの言葉',
        content: `静止画の動きは、体の形と、布のなびきを分けます。形は one leg raised、arms outstretched、spinning、knees bent と自然な英語です。なびきは flowing sleeves、coat hem moving、long skirt moving です。\`motion blur\` は、形が見えてから一つ足します。最初からぶれを強くすると、手足の位置が溶けます。

\`dancing\` は雰囲気の語です。形の語より後ろに置いてもかまいません。形が出ない枚で \`dancing\` の重みだけを上げても、立ち姿のまま明るくなることがあります。目安として上げるなら \`(dancing:1.1–1.3)\` までです。形の語を足す方が先です。

回転は \`spinning\` です。両足が床から離れた絵は、脚の本数が増えやすいです。片足は床、もう一方が動いている、と分けてください。skirt を書くなら、足首までの長いスカートにします。短い裾の語は使いません。

| 形 | 書き方 | 崩れやすい点 |
|---|---|---|
| 片足を上げる | one leg raised | 自然な英語。軸足を書く |
| 腕を広げる | arms outstretched | 指が開きすぎる |
| 回る | \`spinning\` | 脚が増える。ぶれは弱く |
| 膝を落とす | knees bent | 自然な英語 |
| 床に手 | one hand on the floor | 指。最初は片膝も床 |
| 袖が流れる | flowing sleeves | 形が決まってから |

**片足、長い袖**

\`\`\`
1 adult woman, adult, jazz dance, one leg raised,
arms outstretched, long-sleeved shirt, trousers, dance shoes,
full body, simple background, motion blur
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
standing still, extra legs, extra people
\`\`\`

**床に近い形**

\`\`\`
1 adult man, adult, breakdance, freeze pose,
one hand on the floor, one knee down, jacket, trousers, sneakers,
full body, studio floor
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra legs, standing still
\`\`\`

指が崩れる振りは、手のひらを大きく開く形を避け、袖の中や、頭の上でまとめた腕にします。手だけの直しは手のガイドへ分けてください。

回転の枚は、停止した形の枚とファイルを分けます。停止した片足の形が安定する前に \`spinning\` を足すと、脚の位置を確認できません。停止が三枚同じに見えてから、回転の語を足し、\`motion blur\` はさらにそのあとです。ぶれを先に足した枚は、失敗の記録として別名で残し、本番のファイルには混ぜません。袖のなびきも同じで、衣装の形が安定してから足します。衣装が普段のシャツに戻っている枚に、袖のなびきだけを足しても、舞台の袖にはなりません。先に衣装の名詞を戻してください。`,
      },
      {
        title: '着た衣装でジャンルを分ける',
        content: `衣装はジャンルの目印です。肌を出す語、体に張り付く語、肩を出す語は使いません。袖と、脚を覆う布で分けます。

バレエは、長い袖の稽古着と、足首までのスカート、バレエシューズです。ヒップホップとブレイクダンスは、フード付きの上着、ゆったりしたズボン、スニーカーです。ジャズは、長い袖のシャツとズボン、ダンスシューズです。社交ダンスは、長い袖のドレスと、男性のテールコート、シャツ、ズボンです。日本の舞は、着物か袴、足袋、帯です。帯を緩める書き方はしません。舞台の演目も、長い袖の衣装にします。

靴を書かないと、足が床に溶けます。全身の枚では、靴の種類を一つ残してください。

| ジャンル | 衣装 | 靴 |
|---|---|---|
| バレエ | long-sleeved rehearsal dress, ankle-length skirt | ballet shoes |
| ヒップホップ | \`hoodie\`, loose trousers | \`sneakers\` |
| ブレイクダンス | \`jacket\`, trousers | \`sneakers\` |
| 社交 | long-sleeved dress, tailcoat | dress shoes |
| ジャズ | long-sleeved shirt, trousers | dance shoes |
| 日本の舞 | \`kimono\` または hakama | tabi socks |
| 舞台 | long-sleeved stage costume | 靴を一つ |

**バレエ、長い稽古着**

\`\`\`
1 adult woman, adult, ballet, arabesque pose,
long-sleeved rehearsal dress, ankle-length skirt, ballet shoes,
full body, dance studio, soft window light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra legs, standing still
\`\`\`

**着物で舞う**

\`\`\`
1 adult woman, adult, Japanese traditional dance,
kimono, obi, tabi socks, holding a folding fan,
one arm raised, full body, wooden stage, soft spotlight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, extra arms, extra people
\`\`\`

衣装が現代の私服に戻るときは、ジャンル名を人数の直後へ移し、背景の家具を一つ減らします。スタジオの鏡が衣装より強いときは、mirror の語を消して、無地の壁に戻してください。

衣装をジャンルの境界に使います。同じ白い布でも、足首までのスカートとバレエシューズならバレエ、ゆったりしたズボンとスニーカーなら街舞、着物と足袋なら日本の舞、です。境界の語を二つ書くと、靴が二種類になります。社交の二人では、ドレスとテールコートを別の人に対応させます。両方を一人に書くと、裾と上着が一人の体に重なります。\`2 adults\` のあとで、どちらがどちらの服かを、書く順で対応させてください。タグ列では、服を交互に増やさず、種類を一人につき一つに留めます。靴を省略すると、その対応が床の色に負けます。`,
      },
      {
        title: '舞台の光',
        content: `舞台の光は、向きを一つです。スポットライトは \`spotlight\`、客席側からの弱い光は soft front light と自然な英語です。公式タグとしては断定しません。逆光で顔が潰れる手順は、照明のガイドに戻ります。このページでは、顔が見える明るさを残します。

客を入れるなら、adult audience を遠く、\`blurry background\` で一つです。客の顔を描くと、演者がモブに混ざります。客が要らない練習なら、dance studio と無地の床で止めてください。

粒子やキラキラを足したくなったら、[エフェクトのプロンプト](/guides/effect-prompt-guide) で一つだけ選んで戻ってきます。舞台の枚に粒子とスポットと効果線を同時に足さないでください。

**スポットは一つ**

\`\`\`
1 adult woman, adult, stage performance,
long-sleeved stage costume, full body, one arm raised,
spotlight, dark stage, wooden floor
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, cluttered effects
\`\`\`

顔が影になるときは、\`spotlight\` を残したまま、soft front light を弱く一つ足します。両方を同じ強さにすると、舞台の暗さが消えて、昼のスタジオに戻ります。

客席を入れる枚と、練習室の枚はファイルを分けます。練習室に adult audience が残っていると、鏡の中まで人が増えます。鏡を書くなら、鏡に映るのは主役一人、と文で添え、客の語は消します。映る人数を指定しない鏡は、画面の人数を増やします。舞台の床の反射も同じで、反射まで書くと足が二組になります。反射が要る演出は、足の形が安定したあとの別実験にしてください。光の色を変えるのも、その実験とは別の日です。色と人数と反射を同じ日に動かすと、顔が暗い原因が残りません。`,
      },
      {
        title: '二人で踊る',
        content: `二人の踊りは、\`2 adults\` から書きます。\`1 adult woman, 1 adult man, adult\` と、両方に大人であることを残します。社交ダンスは、支え合う腕を一つだけ書きます。両手の指を全部開く形は、指が融合します。片手を背中に、もう一方はつないだ手、のように、見える手を減らしてください。

二人の距離が空きすぎるときは、ballroom hold と自然な英語を一つ足します。公式タグとしては断定しません。顔がくっつきすぎるときは、upper body apart の意味を文で補い、キスの語は入れません。このページの二人は、踊りの形です。

身長の差で構図を作りたいときは、[二人構図](/guides/two-person-composition-prompt-guide) に渡します。踊りのジャンルが決まる前に、身長の語を強くしないでください。

**社交ダンス、二人の大人**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
ballroom dancing, ballroom hold,
long-sleeved dress, tailcoat, shirt, trousers, dress shoes,
full body, dance hall, soft spotlight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra arms, fused bodies
\`\`\`

相方の顔が主役と同じになるときは、服の色を分け、duplicate face を負向に足します。三人目が出るときは、\`audience\` が正向に残っていないかを見て、練習のホールなら客の語を消します。

二人の腕が融合するのは、支えの形を細かく書きすぎたときです。手のひら、指の一本、肘の角度、まで書くと、関節が平均の位置でつながります。ballroom hold のようなまとめの語を一つ残し、指の語は空にします。指を直したくなったら、踊りの枚を止めて、手のガイドの単純な手からやり直します。踊りの複雑な手と、手の修正を同じ日にやらないでください。同じ日にやると、直した指が、踊りの形ごと消えることがあります。

二人の距離が空き、手が届かない絵は、ホールが広すぎます。背景を無地の床に戻し、\`full body\` は残したまま、余白の語を消します。余白を残したまま手をつなぐと、腕だけが伸びます。伸びた腕は、負向で消すより、背景を狭くした方が戻ります。狭い床で頭が切れるときは、距離を一段引いて、手の語は増やしません。引いた枚で三人目が出たら、客の語が戻っていないかを先に確認します。

衣装の袖が体に張り付くときは、袖の語が弱いのではなく、別の衣装の語が混ざっています。長い袖と、ゆったりしたズボンは、ジャンルが違うファイルから混入しやすいです。混入した語を負向に積む前に、正向を衣装の節の一行に戻します。戻した一行で形が足りなければ、形の語を一つ足します。足すのは、そのジャンルの表にある補助だけです。表に無いアクロバットを同じ日に足すと、衣装の確認ができません。

確認が終わった衣装は、色だけを変えてよい層です。色を変える日は、形とジャンルと袖の有無を固定します。固定したまま色が衣装の種類を変えてしまうときは、色がジャンルの語より前にあります。色を後ろへ移し、ジャンルを人数の直後に戻してください。戻しても袖が消えるときは、long-sleeved を色より前に置きます。袖の語が後ろにあると、色の面が先に勝って、袖の形が平均の半袖に戻ることがあります。`,
      },
      {
        title: '動画にするときの動き',
        content: `静止画で形が安定してから、動画にします。動画のプロンプトでは、変えないもの（顔、衣装、場所）と、動かすもの（袖、上げた腕、裾）と、カメラを一つ、に分けます。ジャンル名だけを「踊って」と書くと、立ち姿の小刻みな揺れで止まることがあります。

カメラは一つです。体のスピンと、パンと、ズームを同じ文に書かないでください。形を見せたいなら、カメラは固定し、動くのは袖と腕だけ、と書きます。回り込みが欲しいなら、slow orbit だけにします。用語の対応は [カメラのプロンプト](/guides/camera-lens-prompt-guide) です。

2026年11月時点で、Runway のヘルプは、固定ならカメラは動かず、動くのは被写体だけ、と文で補強するよう案内しています。Kling は Camera Movement、Luma は Camera と入れて選ぶメニュー、と公開ページにあります。画面の名前はバージョンで違います。長さや料金は書きません。検索でモデル名が並んでも、このページが渡すのは動きの言葉です。各公式の今の説明を見てください。

公式のカメラ用語は <a href="https://help.runwayml.com/hc/en-us/articles/46749315925395-Camera-Terms-Prompts-Examples" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Runway の Camera Terms</a> です。

**固定カメラ、袖だけ**

\`\`\`
Use the still image of 1 adult woman, adult, in a long-sleeved rehearsal dress and an ankle-length skirt.
Keep her face, costume, and the studio the same.
The camera is static. Only the raised arm and the sleeves move in a slow dance gesture.
Do not add people. No text.
\`\`\`

**周回は一つ**

\`\`\`
1 adult man, adult, hoodie and loose trousers, knees bent in a hip-hop stance.
Slow orbit. Keep the same face and the same clothes.
No other camera move. No extra people. No text.
\`\`\`

静止画が全身なのに、動画の文が顔のアップから始まると、枠が矛盾します。動画の文にも、full body を残すか、静止画の距離に合わせてください。

動画で形が崩れるときは、静止画の時点で手足が画面の端に切れていないかを見ます。切れた手は、動画の中で本数が変わりやすいです。全身が枠に入った静止画を渡してから、動かす場所を袖か上げた腕かに限ります。限った場所以外は、同じまま、と書きます。カメラを動かす枚と、体を動かす枚は分けてください。両方を同じ生成で試すと、袖の動きなのかカメラの周回なのかが残りません。分けてから、残したい方の語だけを次の文へ移します。`,
      },
      {
        title: '自然文と Midjourney',
        content: `文で書くモデルでは、ジャンル、見える形、袖のある衣装、全身、をこの順で一文ずつにします。曲名は書きません。

**自然文**

\`\`\`
1 adult woman, adult, performing a Japanese traditional dance on a wooden stage.
She wears a kimono and holds a folding fan, one arm raised, full body.
Soft spotlight, no extra people, no text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, extra arms
\`\`\`

Midjourney では重みの括弧を外し、パラメータは文末です。\`--ar\` の前に空白、パラメータの中に読点は入れません。2026年11月時点の公式の書き方で、バージョンによって仕様が違うことがあります。

**Midjourney**

\`\`\`
1 adult man, adult, breakdance freeze, one hand on the floor,
jacket, trousers, sneakers, full body, plain studio --ar 3:4 --no text
\`\`\`

通った文は、タグに戻すときにジャンルを一つ、形を一つ、に減らして保存します。動画用のカメラの文と、静止画のタグを同じ欄に混ぜないでください。

静止画で保存する名前は、ジャンル、形、衣装の三つが分かれるものにします。動画用の文は、そのファイルをコピーして、カメラの語を一つ足した別名にします。コピー元の静止画へカメラの文を書き戻さないでください。書き戻すと、次に静止画のモデルへ貼ったとき、orbit や static が絵の中の文字や余分な人として解釈されることがあります。ジャンルを変えるときは、新しいファイルを起点から作り、前のジャンルの形の語を持ち込みません。持ち込むと、バレエの片足が街舞の低い構えに残ります。

動画の動きは、袖か腕か裾のどれか一つにします。全身が踊っている、とだけ書くと、静止画で決めた形が別のポーズに置き換わります。置き換わったクリップは、カメラの失敗ではなく、形の語が動画の文に無いことが原因です。静止画の形を、動画の文の前半に短く残してください。後半にカメラを一つ書きます。前半が無い動画の文は、どんなにカメラが正しくても、別の踊りになります。`,
      },
    ],
    faq: [
      {
        q: 'dancing だけだと立ち姿になります',
        a: 'ジャンル名に、片足、膝の高さ、床に手、のように見える形を一つ足します。重みを上げる前に、形の語を人数の近くへ移してください。',
      },
      {
        q: 'バレエの衣装が肌の多い形になります',
        a: 'long-sleeved rehearsal dress と ankle-length skirt、バレエシューズを書きます。短い裾や、体に張り付く語は正向に入れません。',
      },
      {
        q: '二人の踊りで三人目が出ます',
        a: '2 adults を先頭に残し、客席の語を消します。指が融合するときは、見える手を、つないだ片手と背中の手、に減らしてください。',
      },
      {
        q: '動画ではどのツールの言葉を使いますか',
        a: '固定は static、周回は orbit、のように動きを一つ書きます。Runway、Kling、Luma の画面名は公式で確認し、バージョンで違うことがあります。長さや料金はこのページでは書きません。',
      },
      {
        q: '曲名を書くと振りが再現されますか',
        a: '曲名や作品の振り付け名は書きません。ジャンルと、見える体の形で指定してください。',
      },
    ],
  },

  'image-generation-prompt-guide': {
    sections: [
      {
        title: '画像生成の書き方はこのページ',
        content: `「画像生成 プロンプト」「ai画像生成 プロンプト」で探しているのは、絵を一枚作るための指示の順番と、そのまま使える例です。検索では、コツ、例、書き方、ツール、順番、視点、髪型、人物、アングル、ポーズ、作り方が一緒に出ます。このページで順番と例を持ち、視点・髪型・ポーズの細部は専用のガイドへ渡します。

担当を分けます。文章でも画像でも使う指示の型は [プロンプトの書き方](/guides/prompt-writing-guide)、一枚を仕上げる手順は [AIイラストの作り方](/guides/ai-illustration-how-to-guide)、アニメ寄りのカテゴリ入口は [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list)、Stable Diffusion のタグと重みの詳細は [Stable Diffusionの呪文](/guides/stable-diffusion-prompt-guide) です。同じ手順を四ページに重複させると、どれが古いか分からなくなります。

コツは次の四つです。主題を先に書く。一度に足すのは一層だけ。矛盾する語を残さない。崩れた箇所だけを負向へ足す。ツール名を増やすより、この四つを一枚で守る方が、次の枚に再現できます。

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。風景、食べ物、商品、図形には人数を書きません。実在の人物、生きている作家の名、作品のキャラクター名、ブランド名は書きません。画風は「水彩」「写真」のように技法の名前で書きます。

2026年11月時点です。モデルとバージョンによって、前の語が強く残る度合いは違います。ここに書く順番は起点であり、唯一の正解ではありません。

作り方のループは短いです。順番のメモを書く。主題と構図だけで一枚出す。外見を一つ足す。背景を一つ足す。光を一つ足す。画風を最後に一つ足す。各段で前の段の語は残します。段を飛ばして画風から始めると、主題が画風の平均に吸い込まれます。人物なら成人の人数と服、人以外なら物の数と、人を入れないこと、を最初の段で書いてください。最初の段に無い条件は、後ろで思い出しにくくなります。思い出した条件を末尾に足しても、主題が既に決まっている枚では無視されることがあります。無視されたら、次の段へ進まず、その条件を主題の直後へ移して同じ段をやり直します。`,
      },
      {
        title: '要素を書く順番',
        content: `画像の指示は、次の順でメモしてから、ツールの欄へ移します。主題、外見、ポーズ、背景、光、画風、品質、です。前にある層が残りやすい傾向のモデルが多いので、今回どうしても外したくない層だけを、主題の直後へ移します。全部を先頭にすると、何が効いたのかが残りません。

| 順 | 層 | 書くこと | 人以外の例 |
|---|---|---|---|
| 1 | 主題 | 誰か、何か | 一杯のスープ、一つの瓶 |
| 2 | 外見 | 服、色、素材 | 器の色、ラベルなし |
| 3 | ポーズ | 立つ、置く、注ぐ | 湯気が上がる |
| 4 | 背景 | 場所を一つ | 木のテーブル |
| 5 | 光 | 向きを一つ | 窓の昼光 |
| 6 | 画風 | 写真か絵か | 料理写真 |
| 7 | 品質 | 短く、最後 | 細部はあとで足す |

人物の外見には、髪の長さを一つ、服を二つまで、です。髪型の種類の一覧は [髪型プロンプト](/guides/hairstyle-prompt-guide)、ポーズの一覧は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、視点と距離は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) と [カメラのプロンプト](/guides/camera-lens-prompt-guide) です。このページでは、各層を一つずつ置くことだけを練習します。

品質の語を先頭に積む書き方は、Stable Diffusion のガイドと [品質タグ](/guides/quality-tags-prompt-guide) に残します。このページの順では、品質は最後です。先頭に品質だけが長いと、主題が後ろへ押されます。

矛盾の例は、夜と昼、写真と線画、近い距離と引き、を同じ強さで書くことです。一つを正向から外してから、もう一度出してください。

順番を守っても無視される層は、矛盾していることが多いです。夜の街に昼の窓、引きの風景に顔のアップ、写真に線画、です。無視された側を強くする前に、反対の語を正向から消します。消しても無視されるときは、無視された語を主題の直後へ移します。移しても変わらなければ、そのモデルでは弱い語なので、言い換えて一つだけ試します。言い換えも動かなければ、その層は今日は閉じ、別の層は開きません。閉じた語を残したまま次の層を足すと、弱い語が次の結果を濁します。濁った枚は、起点の見本に戻してからやり直してください。

**順番の見本、大人の肖像**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
standing, upper body, simple background,
soft daylight, illustration, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

この見本は、層を全部弱く置いた起点です。今日直す層以外は、この行から動かさないでください。`,
      },
      {
        title: 'タグと自然文を並べる',
        content: `同じ絵を、タグの列と、文の両方で保存します。Stable Diffusion や NovelAI はタグ、ChatGPT や Gemini や FLUX 系は文、が通ることが多いです。Midjourney は文に近く、重みの丸括弧は外します。通った方を、もう一方へ翻訳して残すと、ツールを替えた日にゼロから書き直さずに済みます。

タグは、カンマで層を分けます。文は、層ごとに句点かピリオドで分けます。翻訳するときに層を増やさないでください。タグにあって文に無い層は、次の実験で消えた理由になります。

丸括弧の重みは、Stable Diffusion で使うことがあります。目安は \`(soft daylight:1.1–1.3)\` です。括弧を文字として残すときは \`\\(\` と書きます。NovelAI の強調は \`{ }\`、弱めは \`[ ]\` で、丸括弧の意味とは違います。記号の対応は [プロンプトの記号の意味](/guides/prompt-symbols-guide) と [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) に任せ、このページでは混ぜません。

**同じ絵のタグ**

\`\`\`
1 adult man, adult, short black hair, shirt, trousers,
standing, full body, city sidewalk, daytime,
soft daylight, illustration
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**同じ絵の自然文**

\`\`\`
1 adult man, adult, short black hair, wearing a shirt and trousers.
Standing, full body, on a daytime city sidewalk.
Soft daylight, illustration.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

文で通ったのにタグに戻すと崩れるときは、文にあってタグに無い形容を一つだけ足します。一度に三層を翻訳しないでください。`,
      },
      {
        title: '人物とイラストの例',
        content: `人物は、成人であること、服、構図、を主題の近くに置きます。髪の色を変える実験では、服と背景を固定します。ポーズを変える実験では、髪を固定します。同時に動かすと、別人になります。

イラストは、画風を一つにします。\`illustration\` と \`photorealistic\` を同じ強さにすると、顔の半分だけが別の媒体になります。線画にしたい枚では、写真の語を負向へ移します。

**イラスト、上半身**

\`\`\`
1 adult woman, adult, bob hair, navy cardigan, white blouse,
sitting, upper body, cafe window, daytime,
soft daylight, illustration, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic
\`\`\`

髪を変えたくなったら、髪型のガイドで長さを一つ選んで戻ってきます。このページの例は、ボブか短髪か、までです。アングルを変えたいときも、構図のガイドで高さを一つ選んでから、この例の服の行へ戻してください。

失敗しやすいのは、\`sitting\` と書きながら椅子が無いことです。座るなら cafe window のように、座れる場所を一つ残します。場所が無いと、姿勢が浮きます。

人物の例を風景の例に流用しないでください。流用すると、海岸の端に直前の服が残ります。ファイルを分けるだけでなく、欄に貼る前に、人数の行が無いかを見ます。イラストの枚で写真の語が残ると、顔の輪郭だけが実写に寄ります。寄った枚は、画風の語を一つに戻してから保存します。髪を変える日は、この例の服と窓を固定し、髪型のガイドから長さを一つだけ持ってきます。ポーズを変える日は、髪を固定します。両方を同じ日に持ってくると、窓辺の人が別人になり、どの層のガイドが効いたのかが残りません。`,
      },
      {
        title: '風景・食べ物・商品',
        content: `人を描かない枚では、人数の行を入れません。人のタグが残った風景は、端に顔が出ます。負向だけで人を消そうとする前に、正向から人の語を消してください。

風景は、場所を一つ、時間を一つ、です。山と海と街を同時に強くすると、地平線が三本になります。食べ物は、皿の上の一つの料理と、湯気か光源を一つ、です。食材を五品並べると、形が混ざります。商品は、一つの物体、無地の台、影を一つ、です。ラベルの文字は書かせません。文字は崩れ、ブランドにも寄りやすいです。

| 種類 | 主題の書き方 | 足さないもの |
|---|---|---|
| 風景 | one place, one time of day | 人、文字 |
| 食べ物 | one dish | 二人目の手 |
| 商品 | one object, no letters | ロゴの文字 |

**朝の海岸、人なし**

\`\`\`
quiet coastline, morning light,
soft sunlight, low clouds, pale blue water,
landscape photo, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, people
\`\`\`

砂の乾湿は書かず、光と空で朝を作ります。服の状態を連想させる語は、風景の行に入れません。

**スープ**

\`\`\`
a bowl of vegetable soup on a wooden table,
steam rising, ceramic bowl, simple garnish,
soft window light, food photo, no letters
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, people, hands
\`\`\`

**瓶一つ、文字なし**

\`\`\`
one frosted glass bottle, blank label, no letters,
soft shadow, pale gray backdrop, product photo,
centered, studio light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, logo, watermark, people
\`\`\`

商品の影が二方向に落ちるときは、光源の語が二つ残っています。窓かスタジオか、片方を消してください。`,
      },
      {
        title: 'ロゴ風・アイコン・背景素材',
        content: `ロゴ風は、文字を描かせない図形です。単語を書かせると、綴りが崩れ、既存の商標に寄ることがあります。円、角、一本の線、のように部品を二つまでにして、色は二つまでです。

アイコンは、一つの物を、フラットな色で、余白を広く、です。影と立体を足すと、アイコンではなく商品写真に戻ります。背景素材は、模様か紙の質感で、継ぎ目を気にするなら単純な繰り返しにします。人のシルエットを背景素材に混ぜないでください。モブのページの仕事になります。

| 種類 | 書き方 | 品質より先に決めること |
|---|---|---|
| ロゴ風 | geometric emblem, no letters | 形は二つまで |
| アイコン | flat icon, one object | 余白、色は一つ |
| 背景素材 | seamless paper texture | 人を入れない |

**図形の印**

\`\`\`
simple geometric emblem, one circle and one horizontal bar,
two flat colors, navy and cream, no letters, no words,
centered, plain background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, letters, watermark, people
\`\`\`

**杯のアイコン**

\`\`\`
flat icon of a single cup, one solid color,
wide margin, no shadow, no letters, plain background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, photorealistic, people
\`\`\`

**紙の質感**

\`\`\`
seamless paper texture, warm off-white, subtle fibers,
even light, no people, no text, background material
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, people, watermark
\`\`\`

文字が出たときは、主題の名詞が単語として読まれています。no letters を主題の直後へ移し、引用符で単語を強調する書き方はやめてください。

アイコンとロゴ風と背景素材は、同じ無地でも目的が違います。アイコンは一つの物、ロゴ風は部品が二つの印、背景素材は画面いっぱいに続く質感、です。質感の枚に印を置くと、繰り返しの途中で印が切れます。印の枚に質感を足すと、平らな色が紙のムラに負けます。三つはファイルを分け、今日開くのは一つだけにしてください。色を増やすのも、形が三枚同じに見えてからです。色を先に三色にすると、形のどちらが印なのかが分からなくなります。`,
      },
      {
        title: '失敗と、詳しいガイドへの分かれ',
        content: `崩れた箇所は、一箇所だけ直します。手、文字、人数、画風の混在、背景が無視される、は原因が違います。

手は、物を持たせすぎていないかを見ます。持たせない構図に戻してから、[手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) へ進みます。文字は、正向の単語を減らし、text を負向に残します。人数が増えるのは、人の語が風景の枚に残っているか、モブを頼んでいないのに crowd があるか、です。画風が混ざるのは、写真とイラストが両方残っているときです。背景が消えるのは、背景の名詞が品質の語より後ろで、かつ弱いときです。背景の語を主題の近くへ一つだけ移します。場所の一覧は [背景プロンプト](/guides/background-prompt-guide) です。

入れたくないものを書く欄が無いツールでは、文の最後に「文字なし、人なし」のように、消したいものを肯定の条件で書きます。欄があるツールでは、短く足します。最初から長い禁止の列にしないでください。禁止のテンプレは [ネガティブプロンプト](/guides/negative-prompt-guide) です。

視点を変える、髪型を変える、ポーズを変える、は、それぞれ専用のガイドで語を一つ選んでから、このページの順番へ戻します。三つのガイドの表を同じ日に結合しないでください。

直す順番は、主題が残っているか、矛盾が無いか、層が一つ増えていないか、です。増えた層を外しても直らないときだけ、負向を一語足します。

例文を結合しないでください。肖像の服と、スープの湯気と、瓶の無地背景を一つの欄に貼ると、テーブルの上に人が立ち、瓶に顔が出ます。種類が違う例は、ファイルも分けます。今日使うのは一つです。使った例に、髪型のガイドから語を一つ足すのは、人物のファイルだけです。風景のファイルに髪型は足しません。足した語の出所を、ファイル名の端に書いておくと、次にどのガイドへ戻るかが残ります。出所が分からなくなった文は、起点の見本まで戻してから、層を一つだけ足し直します。

戻すときの見本は、人物なら肖像の起点、物なら瓶か杯か海岸のどれか一つ、です。見本を混ぜた文から層を引き算しても、混ざった名詞は残ります。残った名詞が次の層に勝つので、引き算より、空の見本へ足し算する方が短いです。足し算は一日に一層です。層の名前をメモの先頭に書いてから生成すると、翌日にどのガイドを開くかが残ります。メモが無い生成は、例文の保存に使いません。`,
      },
      {
        title: 'ツールごとのメモ',
        content: `Stable Diffusion は、カンマ区切りのタグと、負向の欄です。重みを使うなら目安の範囲に留め、記号の意味は記号のガイドを見てください。品質タグを先頭に積む運用は、品質のガイド側です。このページの例を貼るときは、主題の行を消さないでください。

Midjourney は、文の末尾にパラメータです。2026年11月時点の公式では、\`--ar\` または \`--aspect\` で縦横、\`--no\` で入れたくないものを書きます。ダッシュの前に空白を入れ、パラメータの中に読点は入れません。バージョンによって仕様が違うことがあります。一覧は <a href="https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Parameter List</a> です。

ChatGPT の画像は、会話の文で指示します。負向の専用欄が無い場合があります。避けたいものは文の中に書いてください。上限の見方は [ChatGPTの画像生成](/guides/chatgpt-image-generation-guide) に任せ、このページでは枚数を書きません。Gemini も文です。用途別の文例の置き場所は [Geminiプロンプト集](/guides/gemini-prompt-collection) です。

NovelAI は、タグに近い列でも、強調の括弧が違います。\`{ }\` と \`[ ]\` を、Stable Diffusion の丸括弧のまま貼らないでください。二人を欄で分ける機能も、NovelAI のガイド側です。

FLUX 系は、自然な英語の文が通ることが多いです。タグ列をそのまま貼って崩れるときは、上の自然文の見本に戻してください。画面の名前は、使っている版の説明を見てください。

**Midjourney、商品**

\`\`\`
one frosted glass bottle, blank label, no letters,
soft shadow, pale gray backdrop, product photo --ar 1:1 --no text
\`\`\`

**自然文、風景**

\`\`\`
A quiet coastline in the morning, low clouds, pale blue water, soft sunlight.
Landscape photo. No people. No text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, people
\`\`\`

ツールを替えた日は、層の中身を変えません。タグだった見本を文に翻訳するだけにして、髪や場所を同時に変えないでください。変えると、ツールの差なのか文章の差なのかが残りません。

ツールの差を見る日は、例文を固定します。同じ瓶の文を、タグにしたものと、文のままのもので出します。瓶の色を同時に変えないでください。色を変えると、ツールが文字を消したのか、色の指定が勝ったのかが分かりません。パラメータを足すときも、\`--ar\` だけを足して、瓶の形容は固定です。負向の欄が無いツールで文字が出るときは、文の先頭近くに、文字は入れない、と書きます。末尾だけに書くと、主題の名詞の方が先に読まれることがあります。読まれた名詞が文字として出るときは、その名詞を形の説明に言い換えてください。

言い換えの例は、瓶を「背の高いガラスの容器」、杯を「取っ手のある器」、です。商品名やブランドは書きません。書きたい文字があるポスターや表紙は、このページのロゴ風では作りません。文字が仕事の中心になる制作は、生成のあとで別の工程に回し、画像側は文字のない下地に留めます。下地に文字が残った枚は、採用せず、no letters を前へ移した枚だけを残します。残す前に、人の行が混ざっていないかも見ます。`,
      },
    ],
    faq: [
      {
        q: 'プロンプトはどの順番で書きますか',
        a: '主題、外見、ポーズ、背景、光、画風、品質の順が起点です。外したくない層だけを主題の直後へ移します。全部を先頭にすると、どれが効いたのかが残りません。',
      },
      {
        q: 'タグと自然文はどちらですか',
        a: 'Stable Diffusion と NovelAI はタグが通ることが多く、ChatGPT、Gemini、FLUX 系は文が通ることが多いです。Midjourney は文に近く、重みの括弧は外して、パラメータは文末です。',
      },
      {
        q: 'このページと呪文一覧はどう違いますか',
        a: 'このページは、画像を作る順番と、人物以外も含む例文です。呪文一覧は、アニメ寄りのカテゴリから詳しいガイドへ進む入口です。文章全般の型は、プロンプトの書き方のガイドです。',
      },
      {
        q: '日本語のままでは駄目ですか',
        a: '文で受けるツールでは、日本語で層を書いても伝わる場合があります。タグの欄では英語の方が残りやすいことが多いので、通った文は英語のタグにも翻訳して保存してください。',
      },
      {
        q: '品質の語は先頭ですか',
        a: 'このページの順では最後です。先頭に積む運用は、Stable Diffusion の品質タグのガイドに任せます。主題が後ろへ押されたら、品質の語を減らしてください。',
      },
      {
        q: 'ロゴに文字を入れたいです',
        a: 'このページのロゴ風は、文字のない図形です。単語を書かせると綴りが崩れ、既存の商標に寄りやすくなります。',
      },
    ],
  },
}

