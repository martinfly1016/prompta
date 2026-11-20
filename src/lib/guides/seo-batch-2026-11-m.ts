/**
 * Twenty-first SEO batch (2026-11-18): manga panels, necklaces,
 * blonde hair, nurse workwear, and miko attire.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Tool wording is limited to official pages checked 2026-11-18.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_21_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'manga-panel-prompt-guide': {
    sections: [
      {
        title: 'コマ割りは、枠を足す日と止める日を分ける',
        content: `「コマ割り プロンプト」「漫画 プロンプト」「コマ割り 防止 プロンプト」「プロンプト コマ割り しない」で探しているのは、同じ言葉の反対側です。半分は、枠と余白のある漫画のページを作りたい人です。もう半分は、一枚絵のつもりなのに画面が割れて、顔が二つになった人です。このページは、足す日と止める日をファイルで分けます。

検索では、ネガティブ、防止、しない、指定、Stable Diffusion、漫画風、が一緒に出ます。欲しい結果を先に一文で決めてください。今日は枠を足すのか、枠を消すのか、です。両方の語を同じ強さにすると、枠が半分だけ残ります。

このページは、枠の有無を担当します。線の太さそのものは [線画のプロンプト](/guides/line-art-prompt-guide)、画風の入口は [画風プロンプト](/guides/art-style-prompt-guide) です。役割は一行で分けます。線のページは輪郭、画風のページは塗り、このページはコマです。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\`、二人なら \`2 adults\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある日常着です。実在の漫画の題名、登場人物、出版社、作者名は書きません。「〇〇風」で既存の作品へ寄せる書き方も使いません。年齢を下げる場面は使いません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(comic:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(comic:1.2\\)\` と書きます。NovelAI の強調は \`{comic}\` と \`[comic]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、NovelAI の欄は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。強さの数値も目安で、配布ページの推奨があればそちらです。縦長や横長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

一枚の中に、コマの数と、距離と、表情を全部書くと、顔がコマをまたいで混ざります。複雑なページは、一コマずつ出して、編集ソフトで並べる方が残りやすいです。プロンプトだけでページ全体を完成させる、とは書きません。`,
      },
      {
        title: '枠を足すときの語',
        content: `枠を足す日は、漫画であることを短い語で一つ、枠の見た目を一つ、余白を一つ、までです。全部を同じ強さにすると、枠線が二重になり、余白が灰色になります。

\`comic\` と \`manga\` は、短い語として使われることがあります。公式タグとしては断定しません。効かなければ、自然な英語の comic page か manga page に言い換えて一つだけ残します。長い句は、最初から自然な英語です。

| 狙い | 書き方 | 扱い |
|---|---|---|
| 漫画 | \`comic\` / \`manga\` | 短い語。両方を同じ強さにしない |
| 複数の枠 | multiple panels | 自然な英語。公式タグとしては断定しない |
| 四コマ | 4koma | 自然な英語。枚数は次の節 |
| 枠の配置 | panel layout | 自然な英語 |
| 枠線 | border | 短い語。装飾の額縁と混ざるときは外す |
| コマのあいだの白 | white gutters | 自然な英語。余白が灰色のときはこれを一つ |
| 画面の分割 | split screen | 自然な英語。防止の日は負向へ |

枠線の色を黒にしたいときは、自然な英語で black panel borders を一つ足します。白背景と同時に、景色の名詞を三つ置かないでください。余白が建物で埋まると、コマの境目が消えます。

**縦に四つの枠。歩く大人**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
walking, comic, 4koma, multiple panels, panel layout,
black panel borders, white gutters, monochrome, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, photorealistic, extra people, color
\`\`\`

**横に二つの枠。男性の立ち姿**

\`\`\`
1 adult man, adult, black hair, shirt, long trousers,
standing, comic, multiple panels, horizontal panel layout,
black panel borders, white gutters, monochrome, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, photorealistic, extra people, color
\`\`\`

枠が二重になるときは、border と black panel borders の一方を消します。余白が灰色のときは、景色の名詞を減らし、white gutters を枠の語の直後へ移します。\`manga\` と \`comic\` を両方残した枚は、保存せず、どちらか一つへ戻してください。`,
      },
      {
        title: '枚数と縦横、コマごとの距離',
        content: `枚数は一つだけ書きます。四コマと九つの格子を同じ強さにすると、枠の数が平均になって、端のコマが欠けます。四コマの日は 4koma を一つ。格子にしたい日は、自然な英語で equal panel grid を一つ。大ゴマ一つと小さい枠、という差を文章だけで固定するのは難しいので、その日は下絵を渡す段へ移ります。

縦か横かは、画面の形と一緒に決めます。縦に積む日は、自然な英語で vertical panel layout を一つ。横に並べる日は horizontal panel layout を一つ。両方を残すと、斜めに割れた余白になります。縦長と横長の考え方は [9:16のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) です。このページでは、枠の方向だけを足します。ピクセル数は、使っている画面の説明を見て決めてください。このページでは解像度の数字を指定しません。

距離は、コマごとに変えたいものです。引き、中、寄り、を同じ文に全部書くと、全部のコマが中間の距離になります。一枚の中で距離を混ぜる実験は、枠が三枚安定してから、自然な英語を一つだけ足します。引きは wide shot、中は medium shot、寄りは close-up です。いずれも自然な英語で、公式タグとしては断定しません。向きの一覧は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

| 決めたいこと | 一つだけ足す語 | 同時に強くしないもの |
|---|---|---|
| 四コマ | 4koma | equal panel grid |
| 縦に積む | vertical panel layout | horizontal panel layout |
| 横に並べる | horizontal panel layout | vertical panel layout |
| 引き | wide shot | close-up を同じ強さにしない |
| 中 | medium shot | 全身と顔のアップを同時に |
| 寄り | close-up | wide shot を同じ強さにしない |

距離をコマごとに確実に分けたい日は、この表を一枚の文に全部入れません。次の節のあと、一コマずつ別のファイルにします。一枚目は引き、二枚目は寄り、とファイル名に距離を書いて保存してください。`,
      },
      {
        title: '白黒と、吹き出しはあとから',
        content: `漫画の日は、色を一つに決めてから枠を足します。白黒なら \`monochrome\` を一つ。灰色の階調なら \`greyscale\` を一つ。両方を同じ強さにすると、黒と灰色の境界が平均になります。網点の見た目は、自然な英語で screentone を一つ。公式タグとしては断定しません。色を塗る日は、この三語を外して、服の色を一つだけ残します。

吹き出しと文字は、画像の中に書かせない方があとで読めます。生成された文字は、字形が崩れたまま残ることが多いです。セリフは編集ソフトで、枠が決まってから載せます。枠を足す日の負向には、\`text\` と、自然な英語の speech bubble を残します。speech bubble は公式タグとしては断定しません。効きやすいことがあります。効かなければ、吹き出しの形を正向から消して、文字の負向だけを残してください。

| 層 | 書き方 | 外すもの |
|---|---|---|
| 白黒 | \`monochrome\` | 色名、\`greyscale\` を同じ強さにしない |
| 灰色の階調 | \`greyscale\` | 輪郭だけの日には使わない |
| 網点 | screentone | 自然な英語。写真の語 |
| 文字を出さない | \`text\` を負向 | セリフの文そのもの |
| 吹き出しを出さない | speech bubble を負向 | 自然な英語 |

**白黒の一コマ。網点は一つ**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan, long skirt,
standing, upper body, manga, monochrome, screentone,
simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, color, photorealistic, multiple panels, extra people
\`\`\`

この一コマは、ページの中の一枠として保存します。同じ日に 4koma を足すと、一コマのファイルがまた分割されます。分割したい日は、前の節のファイルへ戻してください。

**湯のみだけの枠。人はいない**

\`\`\`
a teacup on a saucer, comic panel, black panel borders,
white gutters, monochrome, simple background, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, people, person, face, color, photorealistic
\`\`\`

湯のみに店名を書くと、文字が模様になります。名は正向から消し、\`text\` を負向に残します。人が端に出るときは、人数の語が正向に残っていないかを見て、残っていれば消し、負向の people を残します。`,
      },
      {
        title: 'コマ割りを止める',
        content: `「コマ割り 防止」「コマ割り しない」「コマ割り ネガティブ」で探しているのは、こちらの節です。一枚絵の肖像や、商品や、背景なのに、画面が左右や上下に割れるときに開きます。原因は、古いファイルに comic や multiple panels が残っているか、モデルが複数の顔を並べやすい日か、です。

止める日は、正向を一人、一場面、に戻します。自然な英語で one scene と single image を、人数の近くに一つずつまで。公式タグとしては断定しません。景色の名詞は一つ。枠の語は正向から全部消します。

負向に回すと効きやすいことがある語は、comic、multiple views、split screen、4koma、border、panel、collage です。全部を一度に信じないでください。効きやすいことがあります。三枚続けてまだ割れるときは、正向の one scene を文の先頭へ移し、負向は comic と multiple views の二つに減らして、もう一枚見ます。語を七つ足したままでは、どれが効いたか残りません。

| 正向に残す | 負向へ回す | 見ること |
|---|---|---|
| 人数は一人 | comic, manga | 古いファイルの漫画語 |
| one scene | multiple views, split screen | 自然な英語。効くとは断定しない |
| single image | 4koma, panel, border, collage | 枠の語が正向に残っていないか |

**肖像の一枚。枠で割らない**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
portrait, upper body, one scene, single image,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
comic, manga, multiple views, split screen, 4koma, border, panel, collage,
extra people, speech bubble
\`\`\`

**道具の一枚。人はいない**

\`\`\`
a closed book on a wooden table, one scene, single image,
simple background, soft daylight, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
comic, manga, multiple views, split screen, 4koma, border, panel, collage,
people, person, face, speech bubble
\`\`\`

まだ割れるときは、参照画像の中に枠が写っていないかを見ます。枠のついた下絵を渡したまま、負向で comic を消しても、線の方が勝ちます。一枚絵の日は、下絵を外してください。`,
      },
      {
        title: '一コマずつ作って編集で並べる',
        content: `ページ全体を一文で書くより、コマを一枚ずつ出して、編集ソフトで白いままの余白へ置く方が、顔と枠が残りやすいです。手順は四つです。枠の下絵を自分で描く。コマの中身を一枚ずつ出す。同じ髪と服の文を、コマのあいだで変えない。吹き出しは最後に手で足す。

髪と服の行は、コマごとにコピーします。二枚目で髪色だけを変えると、別人になります。変えてよいのは、距離と、そのコマの動作と、背景の名詞一つ、です。

手描きの枠を渡すときは、[ControlNetの使い方](/guides/controlnet-guide) の手順を先に読みます。2026年11月時点の ControlNet 1.1 の README では、Lineart のモデルが手で描いた線も受け取ると書かれています。モデルファイルは \`control_v11p_sd15_lineart\` です。前処理の名前は Lineart と Lineart_Coarse です。Canny は Canny の輪郭マップ用で、モデルファイルは \`control_v11p_sd15_canny\`、受け付ける前処理は Canny と README にあります。出典は <a href="https://github.com/lllyasviel/ControlNet-v1-1-nightly" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ControlNet 1.1 のリポジトリ</a> です。すでに黒い線の下絵なら Lineart、写真から輪郭を取りたいなら Canny、と分けます。画面の表示名は、版によって違うことがあります。

領域ごとに別の文を書きたいときは、Stable Diffusion WebUI 用の Regional Prompter を検討できます。2026年11月時点の公式 README では、AUTOMATIC1111 の WebUI 向けのスクリプトで、分割した領域に別のプロンプトを指定できる、と書かれています。領域の文は \`BREAK\` で区切ります。有効にする欄の名前は Active、分割方向は Divide mode の Horizontal と Vertical、比率は Divide Ratio、全領域で共有する文は Use base prompt、と README にあります。普段の計算は Attention、LoRA を領域で分けやすい代わりに遅くなる計算は Latent、とも書かれています。出典は <a href="https://github.com/hako-mikan/sd-webui-regional-prompter" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Regional Prompter の README</a> です。バージョンによって表示名や仕様が違うことがあります。Forge など別の画面では、README の更新記録のとおり対応が分かれます。このページでは、インストール手順のクリック順は書きません。最新の欄の名前は README を見てください。

**引きの一コマ。このファイルは距離だけが違う**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
walking, wide shot, full body, one scene, single image,
quiet street, monochrome, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, multiple panels, comic, 4koma, extra people, color
\`\`\`

**寄りの一コマ。髪と服は同じ行**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
close-up, portrait, one scene, single image,
simple background, monochrome, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, multiple panels, comic, 4koma, extra people, color
\`\`\`

二枚を並べる余白は、編集ソフトの白い帯です。生成の中で余白まで描かせると、帯の太さが左右で変わります。帯はあとから揃えてください。`,
      },
      {
        title: '文章で四コマを頼む',
        content: `ChatGPT や Gemini では、作りたい絵を文章で頼みます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。最新の手順は公式ドキュメントを確認してください。枚数の上限や、料金は書きません。各サービスの画面で確認します。画像生成の欄の歩き方は [ChatGPTの画像生成](/guides/chatgpt-image-generation-guide) です。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。枠は四つか、一枚か。縦か横か。白黒か。文字は入れないか。

四コマを一文で頼んでも、顔が揃わないことがあります。揃わないときは、コマを四つの別の依頼に分け、髪と服の文をコピーし、動作だけを変えます。既存の作品名は書きません。

**文章の例。縦の四コマ**

\`\`\`
Draw a vertical four-panel black-and-white comic of one adult woman
with black hair, a white blouse, and a long skirt.
Panel 1, she stands on a quiet street.
Panel 2, she walks.
Panel 3, a medium shot of her holding a closed book.
Panel 4, a close-up of her face.
Keep the same adult in every panel. White gutters. No text and no speech bubbles.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, color, extra people, photorealistic
\`\`\`

**背景だけの一コマ。人はいない**

\`\`\`
a quiet street with simple buildings, one comic panel,
black panel borders, white gutters, monochrome, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, people, person, face, color, photorealistic
\`\`\`

文章で頼んだ結果をタグのモデルへ貼るときは、髪、服、枠、距離、の四行に戻します。一文のまま貼ると、四コマと一枚絵の語が同じ強さで残ります。`,
      },
      {
        title: '顔が混ざる、文字が崩れる、枠が不揃い',
        content: `失敗は、だいたい四つです。コマをまたいで顔が混ざる。文字が読めない。余白の太さが揃わない。コマごとに服や髪が別人になる。四つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

顔が混ざるのは、一枚の中に表情と距離を複数書いたときです。その枚は、一コマずつのファイルへ分けます。分けたあとも混ざるときは、正向の人数が二人になっていないかを見ます。一人のファイルに \`2 adults\` が残っていると、隣のコマに二人目の顔が出ます。

文字が崩れるのは、セリフを正向に書いたときです。文を消し、負向の \`text\` と speech bubble を残し、編集ソフトで載せます。店の看板も同じです。看板の店名は書きません。

余白が不揃いなのは、生成に余白まで任せたときです。枠線は下絵か、編集ソフトの帯に戻します。white gutters を重くしても、帯の幅はミリでは決まりません。

人物が変わるのは、コマごとに髪の行を書き直したときです。最初のコマで残った髪と服の行を、次のコマへそのままコピーします。コピーした行に、別の色が一つでも残っていると、その色が勝ちます。

**同じ人物の確認用。動作だけが違う**

\`\`\`
1 adult man, adult, black hair, shirt, long trousers,
holding a closed book, medium shot, one scene, single image,
simple background, monochrome, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
speech bubble, multiple panels, comic, extra people, color
\`\`\`

三枚続けて顔が割れるモデルでは、タグを足すより、一コマずつのファイルへ移ってください。割れた枚を起点に保存しないでください。起点は、枠が無い一枚か、下絵どおりの一枠か、のどちらかです。`,
      },
    ],
    faq: [
      {
        q: 'コマ割りを出す語と、止める語は同じファイルですか',
        a: '分けてください。枠を足す日は comic か manga を一つ、止める日はそれらを正向から消し、comic や multiple views や split screen や 4koma や border や panel や collage を負向へ回します。効きやすいことがあります。両方を同じ強さにすると、枠が半分だけ残ります。',
      },
      {
        q: '四コマのセリフも画像の中に書けますか',
        a: '書かない方があとで読めます。負向に text と speech bubble を残し、吹き出しは編集ソフトで足してください。speech bubble は自然な英語で、効きやすいことがあります。',
      },
      {
        q: '縦長と横長はどう指定しますか',
        a: '縦に積む日は vertical panel layout、横に並べる日は horizontal panel layout を一つだけです。画面の形の考え方は 9:16 のガイドです。このページでは解像度の数字は指定しません。',
      },
      {
        q: 'Regional Prompter は必須ですか',
        a: '必須ではありません。2026年11月時点の公式 README にある WebUI 用のスクリプトで、BREAK で領域の文を分けます。欄の名前は版で違うことがあります。一コマずつ出して編集で並べる方法でもページは作れます。',
      },
      {
        q: '既存の漫画の絵柄を指定してよいですか',
        a: '題名、登場人物、出版社、作者名は書きません。白黒、網点、枠、余白、という見た目の語だけを使ってください。',
      },
    ],
  },
  'necklace-prompt-guide': {
    sections: [
      {
        title: 'ネックレスは首元を大きく書く',
        content: `「ネックレス プロンプト」「ネックレス 種類 プロンプト」で探しているのは、鎖と石とモチーフを、首元で見える大きさに書く方法です。検索では、種類、十字架、チェーン、真珠、細い、金、シルバー、豪華、が一緒に出ます。欲しいのは、首飾りの形です。服の柄に負けた点ではありません。

このページは、首飾りを担当します。イヤリング、指輪、髪飾りの全体は [アクセサリーのプロンプト](/guides/accessory-prompt-guide) です。役割は一行で分けます。アクセサリーのページは首以外、このページはネックレスです。髪の色は [髪色プロンプト](/guides/hair-color-prompt-guide)、眼鏡は [眼鏡・メガネのプロンプト](/guides/glasses-prompt-guide)、帽子は [帽子のプロンプト](/guides/hat-prompt-guide)、式の装いは [ウェディングのプロンプト](/guides/wedding-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。無地の方が、鎖の線が残ります。首に巻いて締める小物は、このページでは書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。

重みは目安です。\`(necklace:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(necklace:1.2\\)\` と書きます。NovelAI の強調は \`{necklace}\` と \`[necklace]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`necklace\` だけでは、鎖が服の縫い目になります。素材を一つ、モチーフを一つ、構図は胸から上、の三つが揃ってから、石の名前を足します。全身と同時に強くすると、石は点になります。`,
      },
      {
        title: '種類の一覧',
        content: `種類は一つです。真珠と十字架とロケットを同じ強さにすると、ペンダントの形が平均になります。今日のファイルは、表の一行です。

\`necklace\` と \`pendant\` は、短い語として使われることがあります。公式タグとしては断定しません。それ以外の長い句は、自然な英語です。

| 種類 | 書き方 | 扱い |
|---|---|---|
| ネックレス | \`necklace\` | 短い語。素材を直後に付ける |
| ペンダント | \`pendant\` | 短い語。\`necklace\` と一緒に一つ |
| チェーン | chain necklace | 自然な英語 |
| 真珠 | pearl necklace | 自然な英語 |
| ビーズ | beaded necklace | 自然な英語。粒は一種 |
| ロケット | locket | 自然な英語。開閉は書かない |
| ラリエット | lariat necklace | 自然な英語。Y 字は一つ |
| 重ね | layered necklaces | 自然な英語。二本まで |
| 首に沿う細い飾り | \`choker\` | ファッションの範囲だけ。引き綱の意味では使わない |

長さは、センチでは書きません。首の付け根に沿う短さ、鎖骨のあたりで止まる中間、胸の上まで下りる長さ、を自然な英語で一つだけ足します。short necklace、mid-length necklace、long necklace です。公式タグとしては断定しません。三つを同じ強さにすると、鎖が二重になります。

首に沿う細い飾りは \`choker\` を一つ、ファッションとしてだけ書きます。ネックレスと同時に強くすると、首元で一本に融合します。どちらか一方にしてください。

**真珠。中間の長さ**

\`\`\`
1 adult woman, adult, black hair, pearl necklace, mid-length necklace,
white blouse, long skirt, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo
\`\`\`

**ラリエット。モチーフは雫が一つ**

\`\`\`
1 adult woman, adult, black hair, lariat necklace, one teardrop pendant,
white blouse, portrait, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo
\`\`\`

真珠の粒が服の水玉になるときは、服の柄を消し、白の無地へ戻します。ラリエットが二本に分かれるときは、layered necklaces が古いファイルに残っています。重ねの語を消してください。`,
      },
      {
        title: 'モチーフ',
        content: `モチーフは一つです。十字架、ハート、星、月、鍵、羽、花、勾玉、のうち、今日足すのは一つです。名前は自然な英語で、名詞のあとに necklace か pendant を付けます。公式タグとしては断定しません。

| モチーフ | 自然な英語 | 同時に書かないもの |
|---|---|---|
| 十字架 | cross necklace | ハートと星 |
| ハート | heart pendant | 十字架 |
| 星 | star pendant | 月を同じ強さにしない |
| 月 | moon pendant | 星を同じ強さにしない |
| 鍵 | key pendant | 別の道具 |
| 羽 | feather pendant | 羽を三枚に増やさない |
| 花 | flower pendant | 花束そのもの |
| 勾玉 | magatama pendant | 別の和風の小物を三つ |

十字架は、小さなペンダントとして書きます。紋章や、団体の印にはしません。印の形を胸に足す指定は、このページでは使いません。

**細い銀の十字架**

\`\`\`
1 adult woman, adult, black hair, thin chain necklace, small cross pendant,
silver necklace, white blouse, portrait, upper body,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo, emblem
\`\`\`

**勾玉が一つ**

\`\`\`
1 adult woman, adult, black hair, magatama pendant, thin chain necklace,
white blouse, portrait, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo
\`\`\`

モチーフが溶けるときは、形の語を二つ残していないかを見ます。残っていたら一つに戻し、\`(pendant:1.2)\` を一つだけ足します。1.4 を超えると、石が顔より大きくなることがあります。超えた枚は、重みを外して保存し直してください。`,
      },
      {
        title: '素材、石、細さと豪華さ',
        content: `金属は一つ、石は一つ、です。金と銀とローズゴールドを同じ強さにすると、鎖の色が平均の茶色になります。石を三色置いても、ペンダントは虹の模様になります。

素材と石の名前は、自然な英語です。公式タグとしては断定しません。服の色と金属の色を分けてください。白いブラウスに金、紺の無地に銀、のように、境目が残る組み合わせにします。色が隣へ移るときの分け方は [色プロンプト](/guides/color-prompt-guide) です。

| 素材・石 | 自然な英語 | 注記 |
|---|---|---|
| 金 | gold | 服が金の日は境界が消える |
| 銀 | silver | 白髪の日は境目を確認 |
| ローズゴールド | rose gold | 金と同時に強くしない |
| 真珠 | pearl | 粒の大きさは一つ |
| ダイヤモンド | diamond | 一粒まで |
| サファイア | sapphire | 石の色は一つ |
| エメラルド | emerald | 服の緑と分ける |
| ルビー | ruby | 服の赤と分ける |
| アメジスト | amethyst | 紫は石だけ |

細い日は thin chain necklace を一つ。豪華に見せる日は、自然な英語で ornate necklace を一つ。両方を同じ強さにすると、細い鎖の上に太い模様が乗って、鎖が二層になります。豪華な日は石を一つまでにしたまま、金属の面積だけを足します。石を五種類に増やすと、豪華ではなく、判別できない塊になります。

**金の一粒。石はサファイア**

\`\`\`
1 adult woman, adult, black hair, gold necklace, one sapphire pendant,
white blouse, long skirt, portrait, upper body,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo
\`\`\`

**豪華な金。石は一つ**

\`\`\`
1 adult woman, adult, black hair, ornate gold necklace, one pendant,
white blouse, portrait, upper body, simple background, studio light
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, thin chain, text, logo
\`\`\`

光は soft daylight か studio light のどちらか一方です。両方を強くすると、石のハイライトが二方向に割れて、石が二つに見えます。`,
      },
      {
        title: '男性と、二本までの重ね',
        content: `男性の首飾りも、成人から書きます。\`1 adult man\` と \`adult\` を残し、シャツと長いズボンを閉じたままにします。鎖は細いか、中間の一本か、を一つ。モチーフを足すなら一つまでです。

重ねは二本までです。自然な英語で two layered necklaces と書き、上の一本は短く、下の一本だけにペンダント、と役割を分けます。三本にすると、鎖が一本の幅の金属になります。女性の枚でも、男性の枚でも、本数の上限は同じです。

| 誰 | 残すもの | 外すもの |
|---|---|---|
| 成人の男性 | シャツ、長いズボン、鎖一本 | モチーフを二つ |
| 二本重ね | 短い上段、下段にペンダント一つ | 三本目 |
| 一本に戻す | \`necklace\` を一つ | layered necklaces |

**男性の銀のチェーン**

\`\`\`
1 adult man, adult, black hair, thin silver chain necklace,
shirt, long trousers, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo
\`\`\`

**二本まで。下だけに丸いペンダント**

\`\`\`
1 adult woman, adult, black hair, two layered necklaces,
short upper chain, one round pendant on the lower chain,
white blouse, portrait, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
third necklace, asymmetrical jewelry, text, logo
\`\`\`

男性の枚に、女性の例のブラウスが残っていると、襟元の形が中間になります。服の行は、そのファイルの人に合わせて書き直してください。鎖の行だけをコピーします。`,
      },
      {
        title: '寄りと、人のいない商品',
        content: `首飾りが主題なら、構図は \`portrait\` か \`upper body\` か \`close-up\` の一つです。\`full body\` が残っていると、鎖は点になります。耳まで入れる日は、髪が鎖を隠さないように、髪を耳より後ろへまとめます。まとめ方の名前は髪型のページです。このページでは、髪は黒の一つに固定して、鎖を優先します。

商品だけの日は、人を置きません。ベルベットの皿の上に一本、か、布を張った展示用の台の上に一本、です。台は胴体の描写にはしません。人の語を残すと、台の上に顔が出ます。ブランド名、店名、印は書きません。

| 見せ方 | 残すもの | 消すもの |
|---|---|---|
| 人の胸から上 | 人数、無地の服、鎖 | \`full body\` |
| 皿の上の商品 | 鎖一本、布、光 | 人数、印 |
| 展示の台 | 布を張った台、鎖一本 | 顔、印 |

**胸から上の寄り**

\`\`\`
1 adult woman, adult, black hair, close-up, upper body,
gold necklace, one pendant, white blouse,
plain background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
full body, extra necklace, asymmetrical jewelry, text, logo
\`\`\`

**皿の上。人はいない**

\`\`\`
a single gold necklace with one pendant, on a dark velvet tray,
product photo, soft studio light, centered, no person, no logo, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, logo, text, extra necklace
\`\`\`

**布を張った台。人はいない**

\`\`\`
a single silver chain necklace on a fabric-covered display stand,
product photo, soft studio light, centered, no person, no logo, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, face, logo, text, extra necklace
\`\`\`

皿のシワが鎖に見えるときは、布を無地の一色に戻します。台の形が人体になるときは、人の語が正向に残っています。消して、負向の people を残してください。`,
      },
      {
        title: '文章で頼む、飾りを消す',
        content: `ChatGPT や Gemini では、部位、素材、モチーフ、寄り、を同じ文に入れます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

消したい日は、正向から \`necklace\` と \`pendant\` と金属の名前を全部外し、負向に jewelry と necklace を入れます。イヤリングだけ残す日は、ネックレスの語だけを負向へ回します。一部を残すルールは、アクセサリーのページの消す節と同じです。首飾りの種類を足し直すときは、このページへ戻ってください。

**文章の例。細い金と一粒**

\`\`\`
A close-up portrait of one adult woman with black hair and a plain white blouse.
She wears one thin gold necklace with a single small pendant at the base of the neck.
Soft daylight. The necklace is clearly visible. She is an adult. No text and no logo.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra necklace, asymmetrical jewelry, text, logo
\`\`\`

**飾りを外した肖像**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
portrait, upper body, simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
jewelry, necklace, pendant, choker, text, logo
\`\`\`

文章で通った文は、タグに戻すときに素材とモチーフを一つずつに削ります。削らずに貼ると、金と銀と真珠が同じ強さで入ります。`,
      },
      {
        title: '鎖が服に溶けるとき',
        content: `失敗は、だいたい三つです。鎖が服の縫い目とつながる。ペンダントの形が溶ける。左右で太さや長さが違う。三つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

鎖が服と溶けるのは、服に柄があるか、金属の色と服の色が同じときです。服を無地に戻し、金属と服で色を分けます。\`(necklace:1.2)\` は、無地に戻してから一つです。先に重くすると、柄の線まで太くなります。

ペンダントが溶けるのは、モチーフが二つあるときです。一つに戻します。それでも溶けるときは、close-up へ切り替え、\`full body\` を負向に残します。

左右が非対称なのは、二本の鎖が途中で融合しているときです。本数を一本に戻すか、二本なら上と下の役割を文で分けます。負向に、自然な英語の asymmetrical jewelry を一つ残すと効きやすいことがあります。効かなければ、本数を減らす方が先です。

比較は、服と光を固定して、鎖の行だけを差し替えます。差し替えた行をメモの一行に残すと、翌日にどちらが起点か分かります。溶ける枚を起点に保存しないでください。`,
      },
    ],
    faq: [
      {
        q: 'ネックレスが点にしかなりません',
        a: 'full body を外し、portrait か upper body か close-up にします。gold necklace のように素材を付け、服は無地にしてください。重みは (necklace:1.2) から一つです。',
      },
      {
        q: '十字架とハートは同時に書けますか',
        a: '同じ強さにすると形が平均になります。cross necklace か heart pendant の一方にしてください。石の色も一つです。',
      },
      {
        q: '男性のネックレスはどう書きますか',
        a: '1 adult man と adult から書き、シャツと長いズボンを残します。鎖は一本、モチーフは一つまでです。',
      },
      {
        q: '重ね付けは何本までですか',
        a: '二本までです。上は短い鎖、下だけにペンダント、と役割を分けてください。三本目は鎖が融合します。',
      },
      {
        q: '首飾りを消すには',
        a: '正向から necklace と pendant を消し、負向に jewelry, necklace, pendant を入れます。イヤリングを残す日は、首の語だけを負向へ回してください。',
      },
      {
        q: '商品写真に人の顔が出ます',
        a: '正向の人数を消し、負向に people, person, face を残します。印と店名は書かず、logo と text も負向に残してください。',
      },
    ],
  },
  'blonde-hair-prompt-guide': {
    sections: [
      {
        title: '金髪は色を髪に結びつける',
        content: `「金髪 プロンプト」「プロンプト 金髪」「stable diffusion 金髪」で探しているのは、金色を髪だけに残す書き方です。検索では、プラチナ、アッシュ、ハニー、明るい金、暗い金、が一緒に出ます。欲しいのは、髪の色です。服や背景まで黄色く染めた結果ではありません。

このページは、金髪の色味を担当します。黒も赤も含む色の全体は [髪色プロンプト](/guides/hair-color-prompt-guide) です。役割は一行で分けます。髪色のページは全色と、メッシュやインナーカラーの深さ、このページは金の範囲です。黒の濃さと光は [黒髪のプロンプト](/guides/black-hair-prompt-guide) です。金と黒は、地の色が違う兄弟のページです。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある無地です。実在の人物と、作者名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。

重みは目安です。\`(blonde hair:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(blonde hair:1.2\\)\` と書きます。NovelAI の強調は \`{blonde hair}\` と \`[blonde hair]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`blonde\` だけだと、ブラウスまで金色になります。人数の直後に \`blonde hair\` と、髪まで書いてください。色味は一つです。プラチナとハニーを同じ強さにすると、中間の黄色で止まります。`,
      },
      {
        title: '色味の一覧',
        content: `色味は、地の金が決まってから一つだけ足します。隣の色は負向に回すと、寄りが減ることがあります。効きはモデルで違います。

\`blonde hair\` は、短い語として使われることがあります。公式タグとしては断定しません。それより長い句は、自然な英語です。

| 色味 | 書き方 | 寄りやすい方向 |
|---|---|---|
| 金髪 | \`blonde hair\` | オレンジ、茶色。\`blonde\` だけにしない |
| 明るい金 | light blonde hair | 自然な英語。白に寄る |
| 暗い金 | dark blonde hair | 自然な英語。茶色に寄る |
| プラチナ | platinum blonde hair | 自然な英語。白、銀 |
| アッシュ | ash blonde hair | 自然な英語。灰色 |
| ハニー | honey blonde hair | 自然な英語。オレンジ |
| ゴールデン | golden blonde hair | 自然な英語。黄色 |
| ストロベリー | strawberry blonde hair | 自然な英語。赤 |
| くすんだ金 | dirty blonde hair | 自然な英語。茶色 |

プラチナを選んだ日は、普通の \`blonde hair\` を同じ強さで残しません。残すと、白金の半分だけが黄色になります。アッシュの日は、暖色の honey を正向から外します。

**プラチナ。大人の顔**

\`\`\`
1 adult woman, adult, platinum blonde hair, long hair, adult face,
white blouse, cardigan, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
yellow hair, orange hair, white hair, silver hair
\`\`\`

**アッシュ。クールな金**

\`\`\`
1 adult woman, adult, ash blonde hair, long hair, adult face,
navy blouse, portrait, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
yellow hair, orange hair, honey blonde hair
\`\`\`

**ハニー。暖かい金**

\`\`\`
1 adult woman, adult, honey blonde hair, long hair, adult face,
white blouse, long skirt, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ash blonde hair, grey hair, white hair
\`\`\`

色味を変える比較は、髪型と服を固定して、色の行だけを差し替えます。三行を同じ日に動かすと、長さが変わったのか色が変わったのかが残りません。`,
      },
      {
        title: '髪型と目の色',
        content: `金髪が安定してから、長さと結びを一つ足します。長さの細目は [ロングヘアプロンプト](/guides/long-hair-prompt-guide)、結びは [編み込み・三つ編みプロンプト](/guides/braid-prompt-guide)、前髪は [前髪プロンプト](/guides/bangs-prompt-guide)、半分結ぶ形は [ハーフアップのプロンプト](/guides/half-up-hair-prompt-guide) です。このページでは、金の行を人数の直後に残したまま、髪型の語を一つだけ借りてきます。

目の色も一つです。金の髪に、青と緑と金を同じ強さで書くと、虹彩が平均の灰色になります。目の形とハイライトは [目・瞳のプロンプト一覧](/guides/eye-prompt-guide) です。ここでは、色の名前を一つだけ足します。

| 足すもの | 書き方 | 金の行 |
|---|---|---|
| 長い髪 | \`long hair\` | \`blonde hair\` の直後 |
| 編み | braid を一つ | 色味は変えない |
| 前髪 | bangs を一つ | 前髪のページの形を一つ |
| 青い目 | blue eyes | 自然な英語でも、目は一色 |
| 緑の目 | green eyes | 青と同時に強くしない |
| 茶色の目 | brown eyes | 髪の茶色と服の茶色を分けない日は避ける |

**長いプラチナと、青い目**

\`\`\`
1 adult woman, adult, platinum blonde hair, long hair, blue eyes, adult face,
white blouse, portrait, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
yellow hair, orange hair, green eyes, brown eyes
\`\`\`

目の色が髪に移るときは、目の語を顔の近くへ移し、髪の色味は一つに戻します。前髪の形を三種類書くと、金の範囲が前髪だけで別の色になります。前髪は一つです。`,
      },
      {
        title: '毛先、根元、二色',
        content: `金の地に、別の色を足す日は、地を先に書きます。毛先だけ、根元だけ、左右の二色、のうち一つです。三つを同じ強さにすると、頭の中ほどで色が平均になります。

メッシュとインナーカラーの深さは、髪色のページに残します。このページでは、地が金であるときの毛先と根元だけを書きます。筋を細かく分け始めたら、[髪色プロンプト](/guides/hair-color-prompt-guide) へ移ってください。

| 狙い | 自然な英語 | 地の色 |
|---|---|---|
| 毛先だけ | colored tips | \`blonde hair\` を先に |
| 根元が見える | darker roots | 地毛の色を一つ |
| 二色 | two-tone hair | 金と、もう一色 |
| グラデーション | gradient hair | 端の色を一つ |

公式タグとしては断定しません。効かなければ、文で「毛先だけが別の色」と書き、タグの列は地の金だけに戻します。

**毛先だけ薄いピンク。地は金**

\`\`\`
1 adult woman, adult, blonde hair, long hair, colored tips, pale pink tips,
adult face, white blouse, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
fully pink hair, white hair, orange hair
\`\`\`

**根元だけ暗い。毛先は金**

\`\`\`
1 adult woman, adult, blonde hair, long hair, darker roots,
adult face, white blouse, portrait, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
white hair, fully brown hair, orange hair
\`\`\`

毛先の色が服へ移るときは、服を無地の白に戻し、毛先の色を一つに減らします。根元が全体を茶色にするときは、darker roots を弱める前に、\`brown hair\` が地の行に残っていないかを見ます。残っていたら消してください。`,
      },
      {
        title: '男性の金髪と、光',
        content: `男性も、同じ色味の表を使います。\`1 adult man\` と \`adult\` を残し、短い髪か、耳にかかる長さか、を一つ。色味は女性のファイルから一行だけコピーします。服の行までコピーすると、ブラウスが残ります。

光は、金が安定してから一つです。逆光と縁の光は、髪の輪郭を明るくします。向きの一覧は [光・照明のプロンプト](/guides/lighting-prompt-guide) です。このページでは、backlight か rim light かを一つ。公式タグとしては断定しません。両方を同じ強さにすると、輪郭が白く飛んで、プラチナと白髪の区別が消えます。

| 誰 | 髪 | 光 |
|---|---|---|
| 成人の男性 | 色味を一つ、長さを一つ | まだ足さない |
| 輪郭を明るくする | 色味は固定 | rim light を一つ |
| 後ろから | 色味は固定 | backlight を一つ |

**男性のダークブロンド**

\`\`\`
1 adult man, adult, dark blonde hair, short hair, adult face,
shirt, long trousers, portrait, upper body,
simple background, soft daylight, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
yellow hair, white hair, silver hair, long hair
\`\`\`

**縁の光。色味はプラチナのまま**

\`\`\`
1 adult woman, adult, platinum blonde hair, long hair, adult face,
rim light, white blouse, portrait, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
yellow hair, orange hair, white hair, overexposed
\`\`\`

逆光で顔が真っ黒になるときは、光を一つ弱めるか、soft daylight に戻します。光を三種類足しても、顔は戻りません。`,
      },
      {
        title: 'アニメと写真、文章で頼む',
        content: `画風は一つです。\`anime style\` と \`photorealistic\` を同じ強さにすると、髪の半分だけが別の媒体になります。アニメの日は写真の語を負向へ。写真の日は、セル塗りの語を正向から外します。

ChatGPT や Gemini では、成人であること、色味、長さ、無地の服、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

**アニメ。アッシュのロング**

\`\`\`
1 adult woman, adult, ash blonde hair, long hair, adult face,
anime style, white blouse, cardigan, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, yellow hair, orange hair
\`\`\`

**写真。ハニーの肖像**

\`\`\`
1 adult woman, adult, honey blonde hair, long hair, adult face,
photorealistic, white blouse, portrait, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
anime style, cel shading, white hair, grey hair
\`\`\`

**文章の例。プラチナと青い目**

\`\`\`
Draw one adult woman with long platinum blonde hair and blue eyes.
She has an adult face, a white blouse, and a cardigan.
Upper body, plain background, soft daylight.
Keep the blonde color on the hair only. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
yellow hair, orange hair, white hair, extra people
\`\`\`

文章で通った色味は、タグへ戻すときに表の一行へ翻訳します。プラチナとハニーを両方残した翻訳は、保存しません。`,
      },
      {
        title: '黄ばむ、白くなる、服へ移る、若く見える',
        content: `失敗は、だいたい四つです。オレンジに黄ばむ。プラチナが白や銀になる。金色が服へ移る。顔が若く見える。四つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

黄ばむときは、\`blonde hair\` を人数の直後へ移し、負向に yellow hair と orange hair を残します。ハニーを選んでいる日は、オレンジを全部消すと色味そのものが消えます。ハニーの日は、黄ばみの負向を外し、色味の語を一つに戻してください。

白や銀になるときは、platinum blonde hair の隣に \`white hair\` や \`silver hair\` が残っています。正向から消し、負向に残します。アッシュが灰色で止まるときも、grey hair を同じ強さで残していないかを見ます。

服へ移るときは、\`blonde\` が hair から離れていないか、服が黄色でないか、を見ます。服を白か紺の無地に戻します。分け方の手順は [色プロンプト](/guides/color-prompt-guide) です。

若く見えるときは、人数の \`adult\` を消しません。\`adult face\` を顔の近くに残します。年齢を下げる語は、正向にも負向の解除にも使いません。負向の年齢の語は残したまま、顔の行だけを足してください。

三枚続けて服が黄色いなら、髪の語を \`blonde hair\` の一つに減らし、色味の形容をいったん外します。形容を戻すのは、服が無地に戻ってからです。`,
      },
    ],
    faq: [
      {
        q: 'blonde と blonde hair はどちらですか',
        a: 'blonde hair を人数の直後に置いてください。blonde だけだと服や背景まで金色になることがあります。色味は platinum blonde hair や ash blonde hair のように、一つだけ足します。長い句は自然な英語で、公式タグとしては断定しません。',
      },
      {
        q: 'プラチナが白髪になります',
        a: '正向から white hair と silver hair を消し、負向に残します。普通の blonde hair を同じ強さで残しているときも、半分だけ黄色になるので外してください。',
      },
      {
        q: 'メッシュやインナーカラーはどこですか',
        a: '地が金の毛先と根元だけはこのページです。筋や内側の色の深さは髪色のページです。両方の語を同じ強さにすると、頭の中ほどで色が平均になります。',
      },
      {
        q: '男性の金髪でも年齢は成人ですか',
        a: 'はい。1 adult man と adult を残し、adult face を付けます。色味の表は共通で、服の行はシャツと長いズボンに書き直してください。',
      },
      {
        q: '逆光で輪郭が真っ白になります',
        a: 'rim light と backlight は一方だけです。飛びすぎるときは soft daylight に戻し、白髪の語が正向に残っていないかを確認してください。',
      },
    ],
  },
  'nurse-uniform-prompt-guide': {
    sections: [
      {
        title: 'ナース服は仕事着として書く',
        content: `「ナース服 プロンプト」「プロンプト ナース服」で探しているのは、仕事の場面の服です。検索では、キャップ、スクラブ、聴診器、廊下、が一緒に出やすいです。このページで書くのは、丈のある仕事着と、働く姿勢です。性的な言い回し、短い丈、ストッキングを強調する書き方、寝具の場面は使いません。

このページは、看護の仕事着を担当します。衣装の一覧は [コスプレプロンプト](/guides/cosplay-prompt-guide)、医師の白衣は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。役割は一行で分けます。白衣のページは医師と研究者、コスプレのページは衣装の入口、このページはナース服です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\`、二人なら \`2 adults\` から書き、\`adult\` を残します。このページは絵の書き方です。看病の手順や、薬の話は書きません。実在の病院の名前は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。

重みは目安です。\`(nurse:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(nurse:1.2\\)\` と書きます。NovelAI の強調は \`{nurse}\` と \`[nurse]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`nurse\` だけだと、丈と上下が決まりません。スクラブの上下か、膝まで隠れる白いワンピースか、を先に一つ選んでください。両方を同じ強さにすると、上着だけがワンピースになります。`,
      },
      {
        title: 'スクラブと、丈のある白い服',
        content: `現代の仕事着は、上下が分かれたスクラブです。自然な英語で medical scrubs と書き、上着とズボンを両方残します。公式タグとしては断定しません。色は一つです。白、淡い青、紺、緑、のうち一つ。柄を足すと、ポケットの線が模様に溶けます。

昔の見た目は、膝丈か、それより長い白いワンピースに、キャップを一つ、です。自然な英語で white nurse dress, knee-length or longer, nurse cap と書きます。公式タグとしては断定しません。短い丈の語は正向に置きません。負向には short skirt を残します。

| 仕事着 | 自然な英語 | 同時に強くしないもの |
|---|---|---|
| スクラブの上下 | medical scrubs, scrub top, trousers | ワンピース |
| 淡い青 | pale blue scrubs | 二色目 |
| 紺 | navy scrubs | 柄 |
| 白いワンピース | white nurse dress, knee-length or longer | スクラブを同じ強さにしない |
| キャップ | nurse cap | 帽子を二種類 |

**淡い青のスクラブ。ズボンあり**

\`\`\`
1 adult woman, adult, black hair, pale blue medical scrubs,
scrub top, trousers, standing, hospital corridor,
full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, logo, extra people
\`\`\`

**膝まで隠れる白いワンピースとキャップ**

\`\`\`
1 adult woman, adult, black hair, white nurse dress, knee-length or longer,
long sleeves, nurse cap, standing, hospital corridor,
full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, logo, extra people
\`\`\`

ワンピースがスクラブの上着だけになるときは、trousers が古いファイルに残っています。レトロな日はズボンの語を消し、knee-length or longer を服の直後へ置いてください。スクラブの日は、dress を消します。`,
      },
      {
        title: 'キャップ、カーディガン、名札',
        content: `小物は二つまでです。キャップ、カーディガン、名札、のうち今日足すのは二つです。三つを同じ強さにすると、頭と胸の布がつながります。

キャップは、レトロなワンピースの日に一つ。スクラブの日は、キャップを外した方が現代の仕事着に残ります。両方の日でキャップを必須にしないでください。

カーディガンは、スクラブの上に羽織る無地を一つ。色はスクラブと違う一色にします。同じ色だと、上着の境界が消えます。

名札は、字が読めない空白の札にします。自然な英語で blank name badge と書きます。公式タグとしては断定しません。名前、部署、番号は書きません。文字を正向に書くと、字形が崩れたまま胸に残ります。負向の \`text\` は外さないでください。

| 小物 | 書き方 | 置く日 |
|---|---|---|
| キャップ | nurse cap | レトロな白いワンピース |
| カーディガン | plain cardigan | スクラブの上。色は一つ |
| 名札 | blank name badge | 字は書かない |

**スクラブの上のカーディガン。名札は空白**

\`\`\`
1 adult woman, adult, black hair, navy medical scrubs, scrub top, trousers,
plain white cardigan, blank name badge, standing,
nurse station, full body, soft daylight, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, letters, logo, extra people
\`\`\`

名札に文字が出るときは、部署名を正向から消し、blank name badge を胸の近くへ移します。キャップが王冠のように大きくなるときは、別の帽子の語が残っています。帽子は nurse cap だけにしてください。`,
      },
      {
        title: '道具と、廊下や受付',
        content: `道具は一つです。聴診器、クリップボード、ペンライト、ワゴン、のうち今日持つのは一つです。四つを同じ強さにすると、手が四つの持ち手を共有して、指が増えます。

場所も一つです。病院の廊下、ナースステーション、診療所の受付、を同時に書くと、窓とカウンターが混ざります。建物の固有名は書きません。室内の一般的な呼び方だけを使います。

| 道具 | 自然な英語 | 場所の例 |
|---|---|---|
| 聴診器 | stethoscope | 廊下 |
| クリップボード | clipboard | 受付 |
| ペンライト | penlight | ステーション |
| ワゴン | medical cart | 廊下。人は横に立つ |

公式タグとしては断定しません。聴診器は首にかけるか、手に持つか、を一つ。両方だと、管が二本になります。

**聴診器を首に。廊下**

\`\`\`
1 adult man, adult, black hair, white medical scrubs, scrub top, trousers,
stethoscope, standing, hospital corridor, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, logo, extra people
\`\`\`

**クリップボード。受付**

\`\`\`
1 adult woman, adult, black hair, pale blue medical scrubs, scrub top, trousers,
holding a clipboard, standing, clinic reception, full body, soft daylight, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, letters, logo, extra people
\`\`\`

クリップボードの紙に文字が出るときは、書類の中身を正向から消し、\`text\` を負向に残します。ワゴンの段が溶けるときは、ワゴンを背景に下げ、人が持つ道具はクリップボードだけに戻してください。`,
      },
      {
        title: '歩く、話す、二人で働く',
        content: `姿勢は一つです。歩きながら、同時に三人と話す、とは書きません。歩く日は、クリップボードを持って廊下を歩く、まで。話す日は、同僚と二人でステーションに立つ、まで。

二人の日は、文の先頭を \`2 adults\` にします。\`1 adult woman\` と \`1 adult man\` を続け、\`adult\` を残します。一人のファイルに二人の語を足すと、顔が平均の位置で重なります。ファイルを分けてください。

| 姿勢 | 人数 | 道具 |
|---|---|---|
| 歩いている | 一人 | クリップボード |
| 話している | 二人 | 手は空でもよい |
| 並んで立っている | 二人 | 聴診器は一人だけ |

**歩いている。クリップボード**

\`\`\`
1 adult woman, adult, black hair, navy medical scrubs, scrub top, trousers,
walking, holding a clipboard, hospital corridor, full body, soft daylight, no readable text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, logo, extra people
\`\`\`

**二人のチーム。ステーション**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
both wearing pale blue medical scrubs, scrub top, trousers,
standing and talking, nurse station, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, logo, extra people
\`\`\`

二人の服の色が入れ替わるときは、色を一人ずつ書かず、both wearing の一色に戻します。色を二人で別々に強くすると、スクラブの境目が平均になります。`,
      },
      {
        title: '文章で頼む',
        content: `ChatGPT や Gemini では、成人であること、スクラブの上下か丈のある白いワンピースか、場所、道具を一つ、文字を入れないこと、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

画風は一つです。アニメの日は \`anime style\`、写真の日は \`photorealistic\`。両方を残した枚は、比較に使いません。

**文章の例。スクラブで歩く**

\`\`\`
Draw one adult woman with black hair, wearing pale blue medical scrubs,
a scrub top, and trousers. She walks in a hospital corridor and holds a clipboard.
The clipboard has no readable text. Full body, soft daylight.
She is an adult. No logos and no emblems.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
short skirt, red cross, text, logo, extra people
\`\`\`

**写真。白いワンピース**

\`\`\`
1 adult woman, adult, black hair, white nurse dress, knee-length or longer,
long sleeves, nurse cap, photorealistic, standing,
hospital corridor, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
anime style, short skirt, red cross, text, logo
\`\`\`

**アニメ。スクラブの立ち姿**

\`\`\`
1 adult man, adult, black hair, navy medical scrubs, scrub top, trousers,
anime style, standing, nurse station, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, short skirt, red cross, text, logo
\`\`\`

文章をタグへ戻すときは、上下かワンピースかを先に一行にします。道具は、そのあと一つです。`,
      },
      {
        title: '標章を避ける、形が崩れるとき',
        content: `胸の印として、赤十字の標章は正向に書きません。標章の使用は、制限されている場合があります。このページでは、条件の細目は書きません。正向に赤十字の形を足す指定もしません。負向に red cross を残します。他の団体の印や、ロゴも書きません。

崩れは、だいたい四つです。スクラブがワンピースになる。白い服の丈が短くなる。キャップが消える。文字が名札や紙に出る。今日直すのは一つです。

スクラブがワンピースになるときは、scrub top と trousers を服の直後へ戻し、dress を正向から消します。レトロな日はその逆です。

丈が短くなるときは、knee-length or longer を服の直後へ置き、負向の short skirt を残します。丈を短くする語が古いファイルにあれば消します。

キャップが消えるときは、レトロな日だけ nurse cap を頭の近くへ移します。スクラブの日にキャップを足しても、現代の上下には残りにくいです。その日はキャップを外してください。

文字が出るときは、名前と番号を消し、blank name badge と no readable text を残し、負向の \`text\` を維持します。

医師の白衣に切り替えたいときは、このページの服の行を消してから [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) を開きます。両方の服を残すと、白衣の下にスクラブのポケットが二重に出ます。衣装の種類を見渡すときは [コスプレプロンプト](/guides/cosplay-prompt-guide) です。`,
      },
    ],
    faq: [
      {
        q: 'スクラブと白いワンピースは同じファイルですか',
        a: '分けてください。スクラブの日は medical scrubs と scrub top と trousers、レトロな日は white nurse dress と knee-length or longer と nurse cap です。両方を同じ強さにすると、上着だけがワンピースになります。',
      },
      {
        q: '赤十字のマークは描けますか',
        a: '正向には書きません。標章の使用は制限されている場合があります。細目はこのページでは書きません。負向に red cross を残し、他のロゴも正向に足さないでください。',
      },
      {
        q: '名札の名前は指定できますか',
        a: '指定しません。blank name badge と no readable text を書き、負向の text を残します。部署名や番号を正向に書くと、崩れた文字が胸に残ります。',
      },
      {
        q: '男性のナース服も同じですか',
        a: '同じ仕事着です。1 adult man と adult から書き、スクラブなら上下、レトロな白い服なら丈を隠す指定を残します。道具は一つです。',
      },
      {
        q: 'キャップは毎回必要ですか',
        a: 'レトロな白いワンピースの日に一つです。スクラブの日は外した方が、現代の上下が残ります。',
      },
    ],
  },
  'miko-prompt-guide': {
    sections: [
      {
        title: '巫女は装束の部品から書く',
        content: `「巫女 プロンプト」「プロンプト 巫女」「巫女服 プロンプト」で探しているのは、白い上衣と赤い袴を、成人の装束として書く方法です。検索では、袴、白衣、千早、鳥居、神楽、が一緒に出ます。欲しいのは、部品の名前です。服を短くした別の衣装ではありません。

このページは、装束と、架空の境内を担当します。着物の種類と帯は [着物プロンプト](/guides/kimono-prompt-guide)、衣装の入口は [コスプレプロンプト](/guides/cosplay-prompt-guide) です。役割は一行で分けます。着物のページは種類、コスプレのページは衣装の一覧、このページは巫女装束です。

実在の神社には、撮影や装束について、その場所ごとの決まりがあります。このページの語は、架空の境内を描くためのものです。社名、紋、実在の場所の名前は書きません。信仰をからかう書き方は使いません。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\`、二人なら \`2 adults\` から書き、\`adult\` を残します。年齢を下げる英語は使いません。\`miko\` は装束の短い語として使われることがあります。公式タグとしては断定しません。年齢は \`adult\` で固定します。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。表の長い句は自然な英語で、公式タグとしては断定しません。

重みは目安です。\`(miko:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(miko:1.2\\)\` と書きます。NovelAI の強調は \`{miko}\` と \`[miko]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

\`miko\` だけでも白い上衣と赤い袴に寄ることがあります。寄らないモデルでは、部品を一行ずつ足します。足す前に、今日のファイルが立ち姿か、神楽か、掃除か、を一つ決めてください。`,
      },
      {
        title: '白衣、袴、千早',
        content: `部品は、上衣、袴、足元、髪、の順です。千早は神楽の日だけ、上衣の上に足します。全部を同じ強さにすると、袖が二重になります。

| 部品 | 書き方 | 扱い |
|---|---|---|
| 装束の入口 | \`miko\` | 短い語。年齢は \`adult\` |
| 白い小袖 | white kosode | 自然な英語。公式タグとしては断定しない |
| 白い上衣 | white kimono top | 自然な英語。小袖と同時に強くしない |
| 赤い袴 | red hakama | 自然な英語。\`hakama\` は短い語として使われることがある |
| 長い袴 | long hakama | 自然な英語。丈が短い日には使わない |
| 千早 | chihaya | 自然な英語。神楽のとき、上衣の上 |
| 髪を後ろで束ねる | hair tied back | 自然な英語 |
| 舞のときのかんざし | small hair ornament | 自然な英語。頭の上の冠にはしない |
| 足袋 | \`tabi\` | 短い語として使われることがある |
| 草履 | zori | 自然な英語。履物の細目は着物のページ |

白衣（はくい）は、ここでは白い上衣のことです。医師の白衣とはファイルを分けます。医師の外套は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。

袴の色は赤を一つ。白にしたい日は、赤を正向から消し、white hakama を一つだけにします。両方を残すと、片足だけ色が違います。

**立ち姿。白い上衣と赤い袴**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama, tabi, zori,
standing, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, short hem, text, logo, extra people
\`\`\`

**神楽の千早。髪飾りは小さい一つ**

\`\`\`
1 adult woman, adult, black hair, hair tied back, small hair ornament,
miko, white kosode, red hakama, long hakama, chihaya,
standing, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, crown, text, logo, extra people
\`\`\`

千早が羽織と二重になるときは、別の上着の語が残っています。神楽の日は chihaya を一つ、防寒の上着は別のファイルにしてください。頭の飾りが西洋の冠になるときは、冠の語を消し、small hair ornament だけを残します。`,
      },
      {
        title: '境内と季節',
        content: `場所は、架空の境内を一つです。鳥居、石灯籠、参道、のうち背景の名詞は二つまで。社名は書きません。鳥居と石灯籠と社殿と池を同じ強さにすると、人が小さくなり、装束が見えなくなります。

動作も一つです。落ち葉を竹ぼうきで掃く。榊の枝を持つ。神楽鈴を持つ。三つを同じ日に足すと、手が三つの持ち手を共有します。

季節は一つです。秋の落ち葉、雪、正月、を同時に強くすると、地面の色が平均になります。雪の景色は [雪・冬のプロンプト](/guides/snow-winter-prompt-guide)、正月の余白と文字を入れない書き方は [年賀状のプロンプト](/guides/new-year-card-ai-prompt-guide) です。このページでは、装束を固定したまま季節の名詞を一つ借りてきます。鳥居、参道、本殿を背景として書くときは [神社のプロンプト](/guides/shrine-prompt-guide) です。このページは装束を残します。年賀状の文字は、このページでも画像の中に書かせません。

| 場面 | 残すもの | 外すもの |
|---|---|---|
| 境内に立つ | 鳥居か石灯籠か一つ | 社名 |
| 落ち葉を掃く | 竹ぼうき | 鈴と枝 |
| 枝を持つ | 榊を一つ | ぼうき |
| 鈴を持つ | 神楽鈴を一つ | 枝 |
| 秋 | 落ち葉 | 雪 |
| 雪 | 雪を一つ | 桜を同じ強さにしない |

**竹ぼうきで落ち葉を掃く**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama, tabi, zori,
sweeping fallen leaves with a bamboo broom,
shrine grounds, stone lantern, autumn leaves, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, text, logo, extra people
\`\`\`

**雪の参道。持つ物は無し**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama,
standing, shrine path, torii, snow, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, autumn leaves, text, logo, extra people
\`\`\`

鳥居が二本になるときは、背景の名詞を一つに減らします。雪の日に落ち葉が残るときは、秋の語を正向から消してください。`,
      },
      {
        title: '立ち姿、神楽、二人',
        content: `姿勢は一つです。立ち姿が安定するまでは、舞を足しません。舞の日は、神楽鈴を一つ、腕の位置は大きく広げすぎない、まで。指の細かい形は、鈴が三枚安定してからにしてください。

二人の日は、\`2 adults\` から書きます。一人が掃き、もう一人が立つ、のように動作を一つずつ。三人目は書きません。男性が袴で並ぶ日は、\`1 adult man\` を明示し、上衣と袴の色をその人の行に書きます。女性の行をそのまま男性に貼ると、袖の長さが中間になります。

| 姿勢 | 人数 | 持つもの |
|---|---|---|
| 立つ | 一人 | 無し、または枝が一つ |
| 神楽 | 一人 | 神楽鈴が一つ。千早 |
| 掃除と立ち姿 | 二人 | ぼうきは一人だけ |

**神楽。鈴は一つ**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama, chihaya, tabi, zori,
holding kagura bells, kagura dance, standing, shrine grounds,
full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, text, logo, extra people
\`\`\`

**二人。一人が掃き、一人が立つ**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
both in white kosode and red hakama, long hakama,
1 adult woman sweeping leaves with a bamboo broom,
1 adult man standing, shrine grounds, torii, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, text, logo, extra people
\`\`\`

舞のファイルにぼうきが残っていると、鈴と柄が一本になります。神楽の日は、掃除の語を検索して消してください。`,
      },
      {
        title: '敬意のある空想',
        content: `色だけを借りた空想は、装束のファイルとは分けます。白と赤を、丈のあるローブに移す日は、\`miko\` を外します。外さないと、袴とローブが同じ腰で重なります。

空想の日も、成人だけです。丈は長く、布は閉じています。からかう言い回しや、装束を短くする語は使いません。魔法の光を足すなら一つ。詠唱の姿勢と属性は [魔法のプロンプト](/guides/magic-prompt-guide)、ローブや鎧の部品は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide) です。このページでは、白と赤を一つずつ残すところまでです。

| ファイル | 残す | 外す |
|---|---|---|
| 装束 | \`miko\`、白い上衣、赤い袴 | ローブ |
| 空想 | 丈のある白と赤のローブ | \`miko\`、袴 |

**白と赤の長いローブ。装束の語は外す**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
long white robe, red sash, long hem, standing,
forest clearing, soft daylight, full body
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
miko, hakama, skirt, short hem, text, logo, extra people
\`\`\`

ローブの日に鳥居を残すと、装束のファイルと境目が消えます。場所も分けてください。光を足す日は、ローブが三枚同じに見えてからです。`,
      },
      {
        title: '文章で頼む',
        content: `ChatGPT や Gemini では、成人であること、白い上衣、赤い長い袴、髪を後ろで束ねること、架空の境内、文字を入れないこと、を文で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。枚数の上限や、料金は書きません。

画風は一つです。アニメの日と、写真の日はファイルを分けます。

**文章の例。境内に立つ**

\`\`\`
Draw one adult woman with black hair tied back,
wearing a white kosode and a long red hakama, with tabi and zori.
She stands on fictional shrine grounds with one torii and one stone lantern.
Full body, soft daylight. She is an adult.
No shrine name, no logo, and no text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, short hem, text, logo, extra people
\`\`\`

**アニメ**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama,
anime style, standing, shrine grounds, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, skirt, dress, text, logo
\`\`\`

**写真**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama, tabi, zori,
photorealistic, standing, shrine path, full body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
anime style, skirt, dress, text, logo
\`\`\`

文章をタグへ戻すときは、上衣、袴、足元、の三行に分けます。一文のまま貼ると、千早とぼうきと鈴が同じ強さで入ります。`,
      },
      {
        title: '袴がスカートになる、色が入れ替わる',
        content: `失敗は、だいたい三つです。袴がスカートになる。白と赤が入れ替わる。衿の左右が逆になる。今日直すのは一つです。

袴がスカートになるときは、自然な英語の skirt や dress が正向に残っています。消して、red hakama と long hakama を服の直後へ置きます。負向に skirt と dress と short hem を残します。丈が膝上で止まる枚は、長い袴の語を人数の近くへ移してください。

色が入れ替わるときは、白い袴と赤い上衣を同時に書いています。基本は、上衣が白、袴が赤、です。白袴の日は赤を正向から完全に消します。半分だけ消すと、袖の先だけ赤が残ります。

衿の合わせは、右前が基本です。着る人から見て右の衿を下にし、左の衿を上に重ねます。左右が逆になると、着崩れに見えます。モデルは左右を逆にしやすいので、三枚見て、逆の枚は保存しません。帯と衿の部品の細目は [着物プロンプト](/guides/kimono-prompt-guide) です。このページでは、右前であることだけを確認します。

**色を固定した立ち姿**

\`\`\`
1 adult woman, adult, black hair, hair tied back,
miko, white kosode, red hakama, long hakama, white top, red pleated hakama,
standing, full body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
skirt, dress, short hem, red top, white hakama, text, logo
\`\`\`

白袴のファイルでは、この負向の white hakama は外します。外し忘れると、白にしたい日まで赤に戻ります。比較のメモは、上衣の色、袴の色、丈、の三行です。三行のうち、動かすのは一行です。`,
      },
    ],
    faq: [
      {
        q: 'miko だけでも白衣と赤袴になりますか',
        a: '寄るモデルはあります。寄らないときは white kosode と red hakama と long hakama を足してください。いずれも公式タグとしては断定しません。年齢は adult のままです。',
      },
      {
        q: '千早は毎回必要ですか',
        a: '神楽の日だけ、上衣の上に一つです。立ち姿や掃除の日に残すと、袖が二重になります。',
      },
      {
        q: '実在の神社の名前は書けますか',
        a: '書きません。実在の神社には、撮影や装束について場所ごとの決まりがあります。このページは架空の境内だけです。紋や社名も正向に足さないでください。',
      },
      {
        q: '袴がスカートになります',
        a: 'skirt と dress を正向から消し、負向に残します。red hakama と long hakama を服の直後へ置いてください。',
      },
      {
        q: '衿の左右が逆です',
        a: '右前が基本です。着る人から見て右の衿を下にし、左の衿を上に重ねます。帯と衿の部品は着物のページです。逆になっている枚は保存しないでください。',
      },
    ],
  },
}
