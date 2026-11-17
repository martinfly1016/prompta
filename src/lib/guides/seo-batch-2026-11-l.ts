/**
 * Twentieth SEO batch (2026-11-17): line art, pixel art, thick paint,
 * watercolor, and rooftops.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Tool wording is limited to official pages checked 2026-11-17.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_20_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'line-art-prompt-guide': {
    sections: [
      {
        title: '線画は輪郭だけを残す',
        content: `「線画 プロンプト」「太い線画 プロンプト」「stable diffusion 線画」「chatgpt 線画 プロンプト」で探しているのは、色と影を消して、輪郭の線だけを残す書き方です。検索では、細い線、太い線、単純な線画、生成AIの線画、ChatGPT、Stable Diffusion、Gemini、NovelAI が一緒に出ます。欲しいのは、白い紙の上の線です。

このページは、線の有無と太さを担当します。塗り絵として印刷する線の型は [塗り絵プロンプト](/guides/ai-coloring-page-prompt) です。役割は一行で分けます。塗り絵のページは塗るための閉じた輪郭、このページは線画全般です。画風の入口は [画風プロンプト](/guides/art-style-prompt-guide) です。このページは、線の層だけを深くします。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は白いブラウス、カーディガン、長いスカート、シャツ、長いズボンのように、閉じて丈のある日常着です。実在の人物、作品名、作者名は書きません。年齢を下げる場面は使いません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(lineart:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(lineart:1.2\\)\` と書きます。NovelAI の強調は \`{lineart}\` と \`[lineart]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、NovelAI の欄は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。強さの数値も目安で、配布ページの推奨があればそちらです。横長や縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

2026年11月時点の NovelAI の Art Styles のチュートリアルには、線のタグとして \`lineart\`、下書きとして \`sketch\`、媒体として \`ink (medium)\` が並んでいます。画風の語はプロンプトの前の方に置く、とも書かれています。出典は <a href="https://docs.novelai.net/en/image/tutorial-artstyles/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Art Styles のチュートリアル</a> です。同じ文書群の Director Tools には、画像を線の段階へ戻す Line Art と、線に色を載せる Colorize があります。画面の名前は版で違うことがあります。

一枚につき、線の種類を一つ、太さを一つ、背景は白です。\`lineart\` と \`sketch\` を同じ強さにすると、清書と下書きの中間で、線が途切れます。\`monochrome\` と \`greyscale\` も、両方を強くすると黒と灰色の境界が平均になります。漫画のベタが欲しい日はどちらか一つ、輪郭だけが欲しい日は \`lineart\` と白い背景だけ、に戻してください。`,
      },
      {
        title: '太い線と細い線',
        content: `太さは、線の層が安定してから一つだけ足します。太い線と細い線を同じ文に置くと、輪郭の半分だけが太くなります。比較は、人物と服と白背景を固定して、太さの語だけを差し替えます。

太い線は、離れて見ても輪郭が残る線です。顔の中の線まで太くすると、目が黒い塊になります。細い線は、輪郭を細く保つ線です。細くしすぎると、髪の先で線が切れます。太さを場所によって変える、という結果を書きたいときは、自然な英語で line weight を一つ足します。公式タグとしては断定しません。効かなければ外して、太い日と細い日をファイルで分けてください。

| 狙い | 書き方 | 残りやすい失敗 |
|---|---|---|
| 線画 | \`lineart\` | 色が残る。負向へ色と影 |
| 下書き | \`sketch\` | 線が途切れる。清書の日は外す |
| 墨の線 | \`ink\` | 自然な英語。NovelAI では ink (medium) がチュートリアルにある |
| 白黒 | \`monochrome\` | \`greyscale\` と同時に強くしない |
| 灰色の階調 | \`greyscale\` | 輪郭だけの日には使わない |
| 太い線 | thick lines | 自然な英語。顔の中まで潰れる |
| 細い線 | thin lines | 自然な英語。髪で切れる |
| 影を置かない | no shading | 自然な英語。灰色が残るときは負向へ |
| 白い紙 | \`white background\` | 景色の名詞を同時に強くしない |
| きれいな輪郭 | clean lines | 自然な英語。公式タグとしては断定しない |

影を塗る語、写真の語、水彩の語は、線画の日には正向から外します。線のファイルと、塗りのファイルは分けて保存します。同じファイルで上書きすると、翌日にどちらが線の起点か分からなくなります。

**太い線。白い紙**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
standing, full body, lineart, monochrome, thick lines,
clean lines, white background, no shading, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, photorealistic, extra people
\`\`\`

**細い線。男性の立ち姿**

\`\`\`
1 adult man, adult, black hair, shirt, long trousers,
standing, full body, lineart, monochrome, thin lines,
clean lines, white background, no shading, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, photorealistic, extra people
\`\`\`

太い線で目が潰れるときは、thick lines を輪郭の意味に戻し、顔の中の線を増やす語を消します。\`detailed\` や \`intricate\` が残っていると、まつ毛まで太い線になります。細い線が途切れるときは、thin lines を一つ残したまま、\`sketch\` を外し、clean lines を人数の近くへ移します。太さの語を二つ残した枚は、保存せず、太い起点か細い起点かへ戻してください。`,
      },
      {
        title: '色の線と、塗り絵の輪郭',
        content: `線に色を付ける日と、黒一色の日は分けます。色の線は、輪郭の色を一つだけ変えます。赤と青と緑を同じ強さにすると、輪郭が虹の平均になります。色を塗る指定を同時に強くすると、線画ではなく彩色イラストに戻ります。

塗り絵の輪郭は、閉じた線と、白い中と、影が無いことです。中を塗る人のために、灰色の陰影を置きません。主題は、大人の人物か、人のいない物か、です。線の閉じ方の印刷向けの型は [塗り絵プロンプト](/guides/ai-coloring-page-prompt) に任せ、このページでは線画としての輪郭を一つ書きます。

| 種類 | 書き方 | 同時に強くしないもの |
|---|---|---|
| 色のついた線 | colored lineart | 自然な英語。色は一つ |
| 黒い線のまま | \`lineart\`, \`monochrome\` | 色名 |
| 塗り絵の輪郭 | coloring book outline | 自然な英語。影、灰色、写真 |
| 単純な線 | simple lineart | 自然な英語。小物を増やさない |

色は、黒以外を一つです。青い線なら blue lineart、と自然な英語で一つ。服の色と線の色を別に強くすると、服が塗られて線の色が負けます。色の線の日は、服を「閉じた白い服」とだけ書き、色の指定は線に寄せます。

**青い線。服は閉じた白**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
standing, full body, colored lineart, blue lines,
white background, no shading, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
shading, gradient, photorealistic, full color, extra people
\`\`\`

**湯のみの輪郭。人はいない**

\`\`\`
a teacup on a saucer, coloring book outline, thick lines,
clean lines, white background, no shading, no color, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, photorealistic, people, person
\`\`\`

青い線が服の青に化けるときは、blue lines を lineart の直後へ移し、服の色名を消します。湯のみに花柄を三種類書くと、輪郭が模様で埋まります。模様は一つまでです。人が端に出るときは、正向に人数が残っていないかを見て、残っていれば消し、負向の people を残します。`,
      },
      {
        title: '人物、物、背景だけの型',
        content: `線画は、主題を一つにします。人物の線、物の線、背景だけの線を同じ強さにすると、椅子の脚が人の脚とつながります。今日のファイルは、三つのどれか一つです。

人物は、立ち姿か、胸から上か、を一つ。手に物を持たせると、指と輪郭が同じ線になって増えます。持つ日は、持つ物を一つ、持たない日は手を空にします。物の線は、机の上の一つです。杯、椅子、自転車、本、のどれか一つ。背景だけの線は、通りか、部屋の中か、を一つ。人の語を残した背景は、端に顔の輪郭が出ます。

| 主題 | 残すもの | 外すもの |
|---|---|---|
| 大人の人物 | 人数、閉じた服、線、白背景 | 景色の名詞を三つ |
| 物 | 物を一つ、線、白背景 | 人数 |
| 背景だけ | 場所を一つ、線 | 人数、物を三つ |

背景の場所の名詞そのものは [背景プロンプト](/guides/background-prompt-guide) です。このページでは、その場所を線だけにするか、を見ます。

**椅子を一つ。人はいない**

\`\`\`
a wooden chair, lineart, monochrome, clean lines,
thick lines, white background, no shading, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, people, person, photorealistic
\`\`\`

**通りの線だけ。人はいない**

\`\`\`
a quiet street, simple buildings, lineart, monochrome,
clean lines, white background, no shading, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, people, person, photorealistic
\`\`\`

椅子の脚が四本を超えるときは、椅子を一つに戻し、机やランプを消します。通りに看板の文字が出るときは、店名を正向から消し、text を負向に残します。建物を五軒まで細かく書くと、線の密度が軒ごとに変わります。建物は「単純な建物」とまとめて、軒数は書きません。`,
      },
      {
        title: '文章で頼むときと、自分の写真',
        content: `ChatGPT や Gemini では、作りたい絵を文章で頼みます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。最新の手順は公式ドキュメントを確認してください。枚数の上限や、料金は書きません。各サービスの画面で確認します。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。線だけか。太いか細いか。白い紙か。影が無いか。色を一色だけ足すなら、その色を一つ。

写真を渡して線画にするときは、自分で撮った写真だけです。他人の顔、有名人、作品のキャラクターは渡しません。頼む内容は、顔と服と姿勢を保ったまま、線画にすること、です。年齢を変える依頼はしません。写真の中の文字や、看板の店名は、残さなくてよい、と書きます。

**文章の例。太い線の立ち姿**

\`\`\`
Draw one adult woman with black hair, a white blouse, and a long skirt,
standing full length on a white background.
Use thick black line art only. No shading and no color.
Keep one adult. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, extra people, photorealistic
\`\`\`

**自分の写真を線にする文章**

\`\`\`
Use my own photo of me, an adult.
Keep my face, clothes, and pose.
Redraw it as thin black line art on a white background, with no shading.
Do not add other people or text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, extra people, text
\`\`\`

文章の中にタグの列を混ぜると、線の指示と服の指示が平均になります。ChatGPT と Gemini では文章だけ、Stable Diffusion と NovelAI では上のタグ、と保存を分けてください。写真を渡したあとに顔が別人になる枚は、使わず、保つものを顔と服と姿勢の三つに戻してやり直します。`,
      },
      {
        title: 'ControlNet で線を渡す',
        content: `線の形を文章だけで固定できないときは、参照画像の線を渡します。手順の全体は [ControlNetの使い方](/guides/controlnet-guide) です。このページは、線画のプロンプト側を担当します。参照が線を決め、プロンプトは服と人数と「線画のままにするか、色を塗るか」を決めます。

2026年11月時点の ControlNet 1.1 の README は、写真から詳細な線と粗い線を作る前処理を Lineart と Lineart_Coarse と呼んでいます。モデルファイル名は \`control_v11p_sd15_lineart\` と、アニメの線画用の \`control_v11p_sd15s2_lineart_anime\` です。手で描いた線も受け取る、と README にあります。出典は <a href="https://github.com/lllyasviel/ControlNet-v1-1-nightly" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ControlNet 1.1 のリポジトリ</a> です。

同じ時点の sd-webui-controlnet の前処理の表示名には、\`lineart_realistic\`、\`lineart_coarse\`、\`lineart_anime\`、\`lineart_anime_denoise\`、\`lineart_standard (from white bg & black line)\` があります。拡張のリポジトリは <a href="https://github.com/Mikubill/sd-webui-controlnet" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">sd-webui-controlnet</a> です。バージョンによって表示名や仕様が違うことがあります。開いている画面の名前を採ってください。欄のある WebUI の入れ方は [Stable Diffusion WebUIの使い方](/guides/stable-diffusion-webui-guide) です。

前処理は一つです。詳細な線と粗い線を同時に強くすると、輪郭が二重になります。線のモデルに、写真の色を残す前処理を混ぜないでください。プロンプト側で色を塗る日は、線のタグを弱め、服の色を一つ足します。線画のまま出したい日は、このページの白い背景と、色と影の負向を残します。

抽出結果が写真のままなら、その前処理は動いていません。生成の前に、線だけの画像を保存してから、プロンプトを貼ります。参照の線と矛盾するポーズをプロンプトに三種類書くと、腕が平均の位置に戻ります。ポーズの語は、参照と喧嘩しない一つだけにしてください。`,
      },
      {
        title: '灰色のにじみ、途切れる線、ハッチ',
        content: `線画が失敗する形は、だいたい三つです。紙が灰色ににじむ。輪郭が途中で切れる。影の代わりに細かいハッチが画面を埋める。三つを同じ日に直すと、どの語が効いたか残りません。今日直すのは一つです。

灰色のにじみは、色と影が正向に残っているか、\`greyscale\` が輪郭だけの枚に残っているか、です。色の名前、写真、水彩、塗り、を消し、負向に color と shading と gradient を置きます。白い背景を、線の語の近くへ移します。背景の景色を強くしたまま白を書いても、紙は灰色の街になります。

途切れる線は、\`sketch\` と細い線が同時に強いときです。清書が欲しい日は \`sketch\` を外し、clean lines を一つ残します。線を太くして切れを隠すと、今度は目が潰れます。切れを直す日は、太さを変えません。

ハッチが多いのは、\`detailed\` や \`cross-hatching\` や \`sketch\` が、線画の枚に残っているときです。影を線で描く指定は、輪郭だけの日には外します。ハッチが欲しい漫画の日は、ファイルを分け、\`monochrome\` を一つだけ足します。輪郭のファイルへ戻すときは、ハッチの語を正向から消します。

**灰色を消して、輪郭へ戻す**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
standing, full body, lineart, monochrome, clean lines,
white background, no shading, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, greyscale, hatching, sketch, photorealistic
\`\`\`

三枚続けて灰色なら、モデル側が彩色寄りです。タグを五つ足すより、線の語を lineart と white background の二つに減らしてから、もう一枚見てください。それでも色が残るときは、そのモデルでは線画が弱いので、参照画像の線を渡す段へ移ります。線のファイルに塗りの語を残したまま ControlNet を足しても、灰色は消えません。`,
      },
      {
        title: '単純な線と、描き込む線',
        content: `単純な線画と、描き込んだ線画は、別のファイルです。単純な線は、輪郭が少なく、白い紙が広いです。描き込みは、髪の束か、服の縫い目か、窓枠のどれか一つまで線を足した状態です。両方を同じ強さにすると、顔は単純なまま、背景だけが細かくなります。

検索で一緒に出る単純な線画は、この単純な側です。小物を足す前に、人なら立ち姿と服、物ならその物一つ、で三枚同じに見えるかを見てください。同じに見えてから、縫い目か、髪の束か、を一つ足します。最初から詳細を盛る語を置くと、線の本数が増えて、太い線の日でも顔の中が黒くなります。

描き込みを足す場所は、一つです。髪に足した日は、服の縫い目を足しません。服に足した日は、背景の窓を足しません。背景だけを描き込む日は、人を置きません。人の線と、街の窓の線を同じ密度にすると、どちらが主題か残らなくなります。

白い紙の広さも、単純さの一部です。人物を画面いっぱいに書くと、余白が消えて、線が端で切れます。全身の日は、頭の上と足の下に紙が残るように、full body と white background を両方残します。胸から上の日は、全身の語を消します。両方残すと、体が枠で切れた中途半端な全身になります。

色の線で描き込むときも、色は一つのままです。青い線のまま、髪の束だけを増やす。線の色を場所によって変えると、彩色イラストに戻ります。塗り絵の輪郭として使う日は、描き込みを増やしすぎないでください。塗る人の色が乗る余地が、線で埋まります。閉じた輪郭を印刷向けに整える型は [塗り絵プロンプト](/guides/ai-coloring-page-prompt) です。このページでは、描き込みを一つ増やすか、単純なまま止めるか、だけを決めます。

線が端で切れる枚は、描き込みが足りないのではなく、余白が足りないことが多いです。詳細の語を足す前に、主題を少し小さく戻します。文章なら余白を残す、と書き、タグなら white background を前に寄せて、画面いっぱいに描く語を消します。

保存は、太い線で単純な枚と、細い線で描き込んだ枚を分けます。一つのファイルで詳細の語だけを上下させると、翌日にどちらの太さが起点だったか分からなくなります。比較するときも、太さと描き込みを同じ日に動かさないでください。動かすのは、いつも一つです。

**単純なコップ。描き込まない**

\`\`\`
a cup, simple lineart, thick lines, clean lines,
white background, no shading, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
color, shading, gradient, intricate, people, person
\`\`\`

コップに取っ手と模様と受け皿を同時に足すと、単純な線ではなくなります。取っ手が欲しい日は、模様を消して、取っ手だけを一つ足します。線がまだ太いのに中が黒いときは、thick lines を残したまま、詳細の語を消してください。細かい模様は、細い線のファイルへ移してから足します。

単純な線が物足りないときも、語を一度に三つ足しません。足す候補は、髪の束、襟元の縫い目、袖の折れ、背景の窓枠、です。今日選ぶのはそのうち一つです。足したあとに顔の線まで増えていたら、その一つは強すぎたので外します。外しても輪郭が足りないときは、clean lines を残したまま、太さだけを一段細くしたファイルへ移ります。太い単純な線と、細い描き込みは、同じ画面の左右に共存させません。

人物の線で迷ったら、手を空に戻します。持たせた物の輪郭が指と数を共有して、線の本数だけが増えるからです。物の線画は、人がいないファイルで先に形を決めてから、必要なら人物のファイルへ一つだけ移します。移すときに、物のファイルの背景語まで貼ると、白い紙が景色に置き換わります。移すのは物の名前だけです。`,
      },
    ],
    faq: [
      {
        q: '太い線と細い線は同時に書けますか',
        a: '同じ強さにはしません。太い日は thick lines、細い日は thin lines です。両方残すと、輪郭の半分だけが太くなります。太さを場所で変えたいときは、line weight を一つだけ試して、効かなければ外してください。',
      },
      {
        q: '線画なのに灰色の影が残ります',
        a: '正向から色、写真、水彩、greyscale を消し、white background を線の近くへ移します。負向には color、shading、gradient を残してください。景色の名詞を強くしたままでは、紙は白くなりません。',
      },
      {
        q: 'ChatGPT や Gemini ではタグですか',
        a: '文章です。成人、服、白い背景、線だけ、影が無い、を一文にします。Stable Diffusion と NovelAI のタグ列は、別のファイルに保存してください。枚数の上限や料金は、各サービスの画面で確認します。',
      },
      {
        q: '自分の写真を線画にできますか',
        a: '自分で撮った成人の写真だけです。顔と服と姿勢を保つ、と書き、他人や作品のキャラクターは渡しません。年齢を変える依頼はしません。',
      },
      {
        q: 'ControlNet の前処理はどれですか',
        a: '2026年11月時点の ControlNet 1.1 の README は Lineart と Lineart_Coarse です。sd-webui-controlnet の表示名には lineart_realistic、lineart_coarse、lineart_anime などがあります。版で名前が違うときは、開いている画面を採ってください。',
      },
    ],
  },

  'pixel-art-prompt-guide': {
    sections: [
      {
        title: 'ドット絵は粒の見え方を書く',
        content: `「ドット絵 プロンプト」「chatgpt ドット絵 プロンプト」「gemini ドット絵 プロンプト」「stable diffusion ドット絵」で探しているのは、粒が見える絵の書き方です。検索では、Gemini、NovelAI、ChatGPT、生成AI、Stable Diffusion のドット絵が一緒に出ます。欲しいのは、限られた色と、揃った粒と、単純な輪郭です。

このページは、ドット絵の語を担当します。頭と体の比率そのものは [デフォルメ・ちびキャラ](/guides/chibi-deformed-prompt-guide)、枠と余白は [アイコンのAIプロンプト](/guides/icon-prompt-guide) です。役割は一行で分けます。ちびのページは頭身、アイコンのページは使う枠、このページは粒です。画風の入口は [画風プロンプト](/guides/art-style-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。頭を大きくする \`chibi\` を足しても、年齢は成人のままです。服はブラウス、カーディガン、長いスカート、シャツ、長いズボンのように閉じた日常着です。既存のゲームの名前、そのキャラクター、作品の「風」は書きません。実在の人物と作者名も書きません。

2026年11月時点の書き方です。モデルは、プロンプトの数字をマス目の数として数えません。8-bit は粗い粒の語感、16-bit はそれより少し細かい語感、として置きます。どちらも公式の解像度仕様ではありません。ピクセル数を書いても、その大きさのファイルになるとは限りません。数字は、このページの例には入れません。バージョンによって表示名や仕様が違うことがあります。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(pixel art:1.2)\` のように、1.1 から 1.3 で一つだけ上げます。括弧を文字として残すときは \`\\(pixel art:1.2\\)\` です。NovelAI は \`{pixel art}\` と \`[pixel art]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけです。正方形に近い枠は、文末の \`--ar\` を置けるツールに限って書きます。使えるかは公式ドキュメントを確認してください。

2026年11月時点の NovelAI の Art Styles のチュートリアルには、\`pixel art\` がデジタルの媒体として載っています。同じ箇所は、\`dithering\` と一緒に試す、とも書いています。画風の語は前の方に置く、ともあります。出典は <a href="https://docs.novelai.net/en/image/tutorial-artstyles/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Art Styles のチュートリアル</a> です。ディザは、限られた色のあいだを粒でつなぐ見え方です。写真のぼかしとは別です。

一枚につき、粒の語を一つ、色の制限を一つ、主題を一つです。\`pixel art\` と \`photorealistic\` を同じ強さにすると、顔だけ滑らかで服だけ粒、になります。`,
      },
      {
        title: '色数、ディザ、頭身',
        content: `色は、少なくする、と書きます。色の名前を六つ並べると、粒が色の平均になって、パレットが増えます。色は二つまでです。黒の輪郭を一つ足す日は、その黒を三色目に数えて、ほかの色を一つ減らします。

ディザは、二色の境目を市松や点でつなぐ見え方です。\`dithering\` を強くすると、顔の中まで点になります。境目だけに欲しい日は、dithering を一つ、顔の詳細の語は外します。滑らかなグラデーションの語と同時に強くしないでください。点とぼかしが打ち消し合います。

頭身を下げる日は \`chibi\` を一つ。頭身の細かい段階はちびのページです。このページでは、粒の絵で頭を大きくするか、普通の立ち姿の粒にするか、を分けます。両方を同じ強さにすると、頭の大きさが平均になります。

| 見え方 | 書き方 | 置き方 |
|---|---|---|
| ドット絵 | \`pixel art\` | 主題の直後 |
| 粗い粒の語感 | \`8-bit\` | 解像度の仕様ではない |
| 少し細かい語感 | \`16-bit\` | 数字のサイズ指定ではない |
| 昔のゲームの画面の語感 | retro game style | 自然な英語。作品名は付けない |
| 色を少なく | \`limited palette\` | 色名は二つまで |
| 点で色をつなぐ | \`dithering\` | 顔の詳細とは同時に強くしない |
| 斜め上から見た粒 | \`isometric pixel art\` | 自然な英語。部屋か街か一つ |
| 一体の絵 | \`sprite\` | 自然な英語。背景は無地 |
| 頭を大きく | \`chibi\` | 年齢は成人のまま |

8-bit と 16-bit を同じ強さにすると、粒の大きさが平均になります。粗い日と、少し細かい日は、ファイルを分けてください。

**粗い粒。大人の立ち姿**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
standing, full body, pixel art, 8-bit, limited palette,
retro game style, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, gradient, extra people, text
\`\`\`

**頭を大きくした粒。男性**

\`\`\`
1 adult man, adult, chibi, black hair, shirt, long trousers,
standing, full body, pixel art, limited palette,
simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, extra people, text
\`\`\`

色が濁るときは、色名を二つに減らし、\`vibrant\` や \`rainbow\` を消します。ディザが顔を埋めるときは、dithering を外して、limited palette だけを残します。頭身が普通に戻るときは、chibi が文の後ろに落ちています。人数の直後へ移して、写真の語が残っていないかを見てください。`,
      },
      {
        title: 'スプライト、道具、タイル、部屋',
        content: `用途は一つです。一体のキャラクター、道具の絵、地面のタイル、斜め上から見た部屋、を同じ強さにすると、人がタイルの模様になります。今日のファイルは、四つのどれかです。

一体の絵は、無地の背景と、全身と、立ち姿です。道具は、人が持っていない状態の一つです。瓶、鍵、本、ランプ、のどれか。地面のタイルは、草か土か床の一つで、人がいません。部屋は、机と椅子と窓のように、家具を三つまでです。四つ目を足すと、粒の大きさが家具ごとに変わります。

| 用途 | 書き方 | 人 |
|---|---|---|
| 一体 | \`sprite\`, \`pixel art\`, simple background | 大人。全身 |
| 道具 | \`pixel art\`, \`limited palette\` | 置かない |
| タイル | \`pixel art\`, one ground texture | 置かない |
| 部屋 | \`isometric pixel art\` | 置かない日と、置く日を分ける |

部屋に人を置く日は、大人を一人だけ、家具は二つまでに減らします。人と家具を同じ細かさで書くと、顔の粒が机の木目に負けます。

**瓶を一つ。人はいない**

\`\`\`
a small corked bottle, pixel art, limited palette,
item icon, simple background, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, text, people, person
\`\`\`

**草のタイル。人はいない**

\`\`\`
a grass ground tile, pixel art, limited palette,
flat color, simple, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, gradient, text, people, person
\`\`\`

**斜め上の部屋。人はいない**

\`\`\`
isometric pixel art, a small room, one desk, one chair, one window,
limited palette, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, text, people, person
\`\`\`

瓶にラベルの文字が出るときは、文字の語を消し、text を負向に残します。タイルの端に花や石を足すと、繰り返したときに模様が合いません。タイルの日は、地面を一つだけにします。部屋の窓の外に街を書き込むと、粒が二種類になります。窓の外は、空の色を一つ、までです。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、文章で主題と粒の見え方を書きます。2026年11月時点の公式ヘルプでも、文章で主題と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は版で違うことがあります。最新の手順は公式ドキュメントを確認してください。枚数の上限や、料金は書きません。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。粒の絵であること。色は少ないこと。背景は無地か、部屋か。作品名は入れないこと。ピクセル数の指定は、守られる仕様として書きません。粗い粒か、少し細かい粒か、の語感にします。

自分の写真を粒の絵にするときは、自分で撮った成人の写真だけです。顔と服を保つ、と書き、他人や作品のキャラクターは渡しません。

**文章の例。無地の背景の一体**

\`\`\`
Draw one adult woman with black hair, a white blouse, and a long skirt,
standing full length on a plain background.
Make it pixel art with a limited palette and clearly visible square pixels.
No text. Keep one adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, gradient, extra people, text
\`\`\`

文章に作品名を足したくなったら、その語は入れずに、服の色と立ち姿だけを残します。タグの列を文章の途中へ貼ると、粒の指示が平均になります。ChatGPT と Gemini では文章、Stable Diffusion と NovelAI ではタグ、とファイルを分けてください。`,
      },
      {
        title: '粒をあとから揃える',
        content: `生成した絵の粒は、大きさが揃っていないことがあります。縁がにじんで、写真の縮小のように見える日です。そのときは、プロンプトを増やす前に、画像編集の一般的な手順を一つだけ検討します。

補間を最近傍にして縮小すると、にじんだ縁が粒に戻りやすい、という扱いが画像編集であります。メニューの名前は、使っているソフトで違います。このページは、特定の製品の手順や、縮小の倍率を断定しません。倍率の推奨がソフトの説明にあれば、そちらを見てください。拡大するときも、同じ最近傍を使うと、粒がぼかされにくいです。滑らかな補間のまま拡大すると、折角そろえた縁が再びにじみます。

プロンプト側で先にやることは、背景を無地にすることと、写真と水彩の語を消すことです。編集の前に主題が混ざっている絵は、縮小しても混ざったままです。

ゲームの画面へ貼るタイルは、端の模様が繰り返して合うかを、編集ソフトのタイル表示で見ます。合い方の機能名は製品で違います。合わないときは、プロンプトの小物を減らしてから、もう一度生成します。このページは、その機能の操作手順までは書きません。

透過して欲しい背景は、生成のあとで自分で抜く前提にしてください。文章で「背景を透明に」と書いても、ファイルが透過になるとは限りません。無地の一色にしてから、編集で抜く方が残りやすいです。`,
      },
      {
        title: 'ぼかしと、粒の大きさがばらつくとき',
        content: `失敗は二つに分かれます。縁がなめらかにぼける。粒の大きさが、顔と背景で違う。

ぼけるときは、正向の \`blurry\` ではなく、負向に blurry、smooth、gradient、photorealistic を置きます。正向に \`smooth\` や \`soft shading\` が残っていると、粒が塗りの平均になります。\`pixel art\` を主題の直後へ移し、画風の語を一つにします。水彩や厚塗りの語が古いファイルに残っていたら消してください。

粒の大きさがばらつくときは、主題が二つある日です。人物と街、瓶と部屋、を同時に強くしていませんか。主題を一つに戻し、背景を無地にするか、部屋だけにするか、を選びます。\`8-bit\` と \`16-bit\` が両方残っているときも、粒が平均になります。粗い方か、少し細かい方か、一つを消します。

顔だけ写真になるときは、\`detailed face\` や \`photorealistic\` が残っています。ドット絵の顔は、目を二つの粒の塊として許容します。顔だけ高精細にする語は、このページでは使いません。

**ぼかしを外して、粒へ戻す**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
standing, full body, pixel art, limited palette,
simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, gradient, soft shading, extra people, text
\`\`\`

三枚続けてぼけるときは、タグを pixel art と limited palette と simple background の三つまで減らします。減っても写真のままなら、そのモデルは粒が弱いです。語を十個まで足しても、顔の滑らかさはモデル側に残ります。その日は、編集の最近傍で縁を整えるか、モデルを変えるか、です。作品名を足して粒を借りる書き方は、使いません。`,
      },
      {
        title: '一体と、タイルと、部屋を混ぜない',
        content: `ドット絵の依頼は、一体のキャラクター、道具、地面のタイル、斜め上の部屋、の四つに分かれます。検索側も、キャラクターと、乗り物や動物や背景や道具を、同じ記事の中で並べがちです。このページでは、その四つを一つの欄にまとめません。今日開くファイルは一つです。

一体の絵は、無地の背景で、全身が見えます。腕が枠で切れている枚は、アイコンの枠の指定が混ざっています。枠と余白は [アイコンのAIプロンプト](/guides/icon-prompt-guide) です。このページの一体は、枠の丸さではなく、粒の立ち姿です。頭を大きくする日は \`chibi\` を人数の直後に置き、年齢は成人のままです。頭身の段階をさらに分けるときは [デフォルメ・ちびキャラ](/guides/chibi-deformed-prompt-guide) に戻ります。

道具は、画面の中央に一つです。瓶、鍵、本、ランプを二個置くと、粒の大きさが道具ごとに変わります。ラベルの文字は入れません。文字が欲しくなったら、絵の中には書かず、あとで自分で載せます。

タイルは、繰り返して敷く地面です。端に花や石や影を足すと、繰り返したときに境界が目立ちます。タイルの日は、地面の種類を一つ、影の語は外します。部屋の家具をタイルの枚に書き始めると、地面ではなく風景になります。

部屋は、家具を三つまでです。机、椅子、窓、のように役割が違うものを選び、同じ椅子を四脚書きません。窓の外は、空の色を一つまでです。街の稜線を窓の外に足すと、粒が二種類になります。部屋に人を置く日は、家具を二つに減らし、大人を一人だけにします。

既存のゲームの名前で粒の雰囲気を借りる書き方は、使いません。作品の「風」も書きません。粗い、少し細かい、色が少ない、無地、斜め上、の語で足ります。名前を足しても、モデルがその作品の画面サイズを再現するわけではありません。権利の問題と、粒が揃わない問題が、同時に残ります。

自分の写真を粒にするときも、同じ分け方です。渡すのは自分の成人の写真だけです。顔と服を保つ、背景は無地にする、作品名は入れない、の三つを文章で書きます。写真の背景の街まで粒にすると、顔の粒が建物に負けます。背景を残したい日は、人物の写真ではなく、人のいない部屋のファイルに分けてください。

**鍵を一つ。文字は無い**

\`\`\`
a simple key, pixel art, limited palette,
item icon, simple background, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, blurry, smooth, text, letters, people, person
\`\`\`

鍵の歯を細かく書きすぎる語を足すと、歯の粒だけが小さくなります。単純な鍵に戻して、歯は一塊として許容してください。文字が軸に出るときは、正向の単語を減らし、text を負向に残します。一体のキャラクターのファイルへこの鍵を貼り足すと、手の中で鍵が人の指と溶けます。持つ日は、別のファイルで、大人一人と鍵一つだけにします。

粒の絵でありがちな頼み方は、色の数と、輪郭の色と、背景の有無を、同じ文で細かく指定しすぎることです。色を少なく、輪郭は暗く、背景は無地、までで一度生成します。そこで粒が揃ってから、色の名前を一つだけ足します。最初から服の色、髪の色、目の色、靴の色、空の色を全部書くと、limited palette と矛盾して、パレットが増えます。

ディザは、その次の段です。境目が帯のように汚いときに、\`dithering\` を一つ足します。顔の中が点になったら外します。NovelAI のチュートリアルが pixel art と一緒に試す、と書いているのは、この段の話です。最初の一枚から必須、という意味ではありません。Stable Diffusion では、同じ語が弱いことがあります。弱いときは語を増やさず、編集の最近傍で縁を見てから、プロンプトへ戻ります。

アニメの塗りの語を粒の枚に残すと、輪郭だけがドットで、中が平たい塗りになります。\`cel shading\` や \`anime coloring\` は、粒の日には外します。頭身の \`chibi\` は残してよいです。残すのは頭の大きさであって、塗りの種類ではありません。塗りの入口へ戻りたくなったら、粒の語を消してから [画風プロンプト](/guides/art-style-prompt-guide) を開きます。消さずに開くと、次のページの語までこのファイルに貼り足してしまいます。

道具と動物と人を同じ日に比べるときも、粒の語は固定します。変えるのは主題だけです。猫の日は人を置かず、瓶の日は猫を置かず、大人の日は瓶を持たせません。三つを並べた比較は、どれが粒の差なのかが残りません。背景の無地も固定します。無地をやめるのは、タイルか部屋のファイルへ移った日だけです。

文章で頼むときも、この分け方を崩しません。一文の中に、一体のキャラクターと、地面のタイルと、斜め上の部屋を同時に書かないでください。書きたいのが部屋なら、人の文は別の保存です。ピクセル数や、色の正確な個数は、守られる仕様として書きません。粗い粒か、少し細かい粒か、色は少ないか、までです。数字を足して粒が揃ったように見えても、それはモデルが数を数えた結果ではありません。揃って見えるのは、色が少なく、背景が無地で、主題が一つのときです。その三つが崩れた枚に数字を足しても、粒の大きさは戻りません。戻すときは数字を消して、三つだけを残したファイルからやり直します。やり直した枚で縁だけがまだにじむときは、プロンプトを足す前に、最近傍の縮小を一度だけ検討します。縮小のあとで主題が混ざったままなら、編集では直りません。主題を一つに戻してから、もう一度生成します。`,
      },
    ],
    faq: [
      {
        q: '8-bit と 16-bit は解像度の指定ですか',
        a: '仕様ではありません。8-bit は粗い粒の語感、16-bit は少し細かい語感です。モデルはマス目を数えません。ピクセル数を書いても、その大きさになるとは限らないので、このページの例には数字を入れていません。',
      },
      {
        q: 'ドットなのに縁がぼけます',
        a: '正向から写真、水彩、smooth、soft shading を消し、pixel art を主題の直後へ移します。負向に blurry、smooth、gradient、photorealistic を残してください。8-bit と 16-bit は同時に強くしません。',
      },
      {
        q: 'ChatGPT や Gemini ではどう書きますか',
        a: '文章で、成人か人なし、粒の絵、少ない色、無地の背景、を書きます。作品名や、その「風」は入れません。枚数の上限や料金は各サービスの画面で確認します。',
      },
      {
        q: '生成のあとで粒を揃えてよいですか',
        a: '画像編集で、補間を最近傍にして縮小すると、にじんだ縁が粒に戻りやすい扱いがあります。メニュー名と倍率は製品の説明を見てください。このページは特定のソフトの手順を断定しません。',
      },
      {
        q: 'ちびのドット絵でも年齢は成人ですか',
        a: '成人です。chibi は頭身の語で、年齢を下げません。先頭は 1 adult woman か 1 adult man のまま、adult を残します。',
      },
    ],
  },

  'thick-paint-prompt-guide': {
    sections: [
      {
        title: '厚塗りは境目を溶かす',
        content: `「厚塗り プロンプト」「厚塗り 英語 プロンプト」「novelai 厚塗り」で探しているのは、色の境目をなじませ、筆の跡と立体を残す書き方です。検索では、NovelAI、英語のタグ、Stable Diffusion、AIイラストの厚塗りが一緒に出ます。欲しいのは、平らな塗りではなく、絵の具が重なった見え方です。

このページは、厚い塗りを担当します。アニメ塗りの全般は [アニメプロンプト](/guides/anime-prompt-guide)、画風の入口は [画風プロンプト](/guides/art-style-prompt-guide) です。役割は一行で分けます。アニメのページは段のはっきりした塗り、このページは境目を溶かす塗りです。水彩の紙とにじみは [水彩のプロンプト](/guides/watercolor-prompt-guide) です。光がどちらから来るかは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はブラウス、カーディガン、長いスカート、シャツ、あるいは全身を覆うローブや鎧のように、閉じたものです。肌を広く出す鎧は使いません。実在の人物、存命の作家、作品名は書きません。

2026年11月時点の書き方です。バージョンによって、同じ語の効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。

重みは目安です。\`(painterly:1.2)\` のように 1.1 から 1.3 で一つです。文字として残すときは \`\\(painterly:1.2\\)\`、NovelAI は \`{painterly}\` と \`[painterly]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、欄の説明は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけです。文末の \`--ar\` は、使えるツールだけです。公式ドキュメントを確認してください。

2026年11月時点の NovelAI の Art Styles のチュートリアルには、描き方のタグとして \`painterly\`、媒体として \`oil painting (medium)\` と \`painting (medium)\` が並んでいます。画風の語はプロンプトの前の方に置く、とも書かれています。品質の語が別の絵柄へ引っ張るときは、品質タグの自動追加を切る、という注意もあります。出典は <a href="https://docs.novelai.net/en/image/tutorial-artstyles/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Art Styles のチュートリアル</a> です。\`impasto\` はこのチュートリアルの一覧には見当たりません。厚い絵の具の塊を自然な英語で足す語として扱い、公式タグとしては断定しません。効かなければ \`painterly\` だけに戻します。

一枚につき、塗りの語は二つまでです。\`painterly\` と \`flat color\` を同じ強さにすると、影の段数だけが平均になります。`,
      },
      {
        title: 'アニメ塗り、ブラシ、水彩との違い',
        content: `厚塗りを安定させるには、隣の塗りと何が違うかを先に分けます。アニメ塗りは、影を二段か三段に分け、境目を残します。ブラシ塗りは、筆の一本が見えるけれど、絵の具を塊まで盛りません。水彩は、紙の白とにじみです。厚塗りは、境目を溶かし、筆の厚みと、光による立体を残します。

四つを一つの欄に置くと、輪郭だけがアニメで、肌だけが写真になります。今日のファイルは、厚塗りです。比較する日は、人物と服を固定して、塗りの名詞だけを差し替えます。

| 塗り | 境目 | 書き方 | 厚塗りの日に外すもの |
|---|---|---|---|
| 厚塗り | 溶かす | \`painterly\`。厚い塊は impasto と自然な英語 | \`flat color\` |
| アニメ塗り | 段で分ける | \`cel shading\`, \`flat color\` | 厚塗りの語 |
| ブラシの跡 | 筆は見えるが塊は少ない | visible brush strokes。自然な英語 | 水彩のにじみ |
| 水彩 | にじむ | \`watercolor\` | \`impasto\` |
| 油絵の媒体 | 絵の具の重さ | \`oil painting (medium)\`。NovelAI のチュートリアルにある | 平塗りの語 |
| 半写実 | 写真と絵のあいだ | semi-realistic。自然な英語 | 写真そのものの語を同じ強さにしない |

半写実は、肌を写真の複製にすることではありません。筆の跡を残したまま、立体を少し写真に寄せます。\`photorealistic\` を同じ強さにすると、筆が消えます。半写実の日は、写真の語を負向に置くか、正向から外すか、を先に決めてください。両方を正向に残した枚は、比較に使いません。

筆の跡だけが欲しくて、絵の具の塊が顔を埋めるときは、impasto を外し、visible brush strokes を一つ残します。塊の重さが欲しいときは、逆に brush の細かい語を減らし、painterly を人数の近くへ移します。

アニメ塗りへ戻したい日は、このページの語を全部消してから、アニメのページの \`cel shading\` を一つ足します。消さずに足すと、影の境目が溶けたまま輪郭だけが太くなります。`,
      },
      {
        title: '肖像、ファンタジー、静物、景色',
        content: `主題は一つです。肖像、物語の衣装、静物、景色を同じ強さにすると、杯が顔の横で別の絵になります。今日は四つのどれかです。

肖像は、胸から上、閉じた服、単純な背景です。ファンタジーは、全身を覆うローブか、閉じた鎧かを一つ。静物は、杯か果物かを一つで、人を置きません。景色は、山か湖かを一つで、人を置きません。光は、塗りの語が三枚安定してから一つ足します。先に光を強くすると、筆より照明の平均になります。

| 主題 | 残す塗り | 人 |
|---|---|---|
| 肖像 | \`painterly\`, visible brush strokes | 大人。胸から上 |
| 物語の衣装 | \`painterly\`, semi-realistic | 大人。全身。閉じた服 |
| 静物 | \`oil painting (medium)\` | 置かない |
| 景色 | \`painterly\`, dramatic lighting | 置かない |

dramatic lighting は自然な英語です。向きの一覧は光のページを見て、このページでは光を一つだけ足します。

**胸から上。筆の跡**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, simple background, painterly,
visible brush strokes, soft lighting, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, extra people, text
\`\`\`

**閉じた鎧。男性**

\`\`\`
1 adult man, adult, full armor, closed helmet visor area simplified,
long cloak, standing, full body, painterly, semi-realistic,
dramatic lighting, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, photorealistic, extra people, text
\`\`\`

**杯と林檎。人はいない**

\`\`\`
a ceramic cup and two apples on a table,
oil painting (medium), painterly, impasto,
simple background, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, people, person, text, photorealistic
\`\`\`

**山と湖。人はいない**

\`\`\`
a mountain and a lake, painterly, visible brush strokes,
dramatic lighting, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, people, person, text
\`\`\`

鎧の隙間から肌が大きく出るときは、full armor と long cloak を戻し、開いた部分の語を消します。杯が三個に増えるときは、果物を外して杯だけにします。山が平らな塗りに戻るときは、painterly を景色の直後へ移し、\`anime coloring\` が残っていないかを見てください。`,
      },
      {
        title: '光は塗りのあとで一つ',
        content: `厚塗りは、光で立体を作ります。光の語を三つ同時に強くすると、顔の半分が白く飛んで、筆の跡が消えます。向きは一つ、質は一つ、までです。カタログは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

柔らかい光は、筆の境目をさらになじませます。ドラマチックな光は、明るい面と暗い面を分けます。両方を同じ強さにすると、影の濃さだけが平均になります。逆光は輪郭を明るくしますが、顔の情報がシルエットに寄ります。肖像の日は、逆光を強くする前に、胸から上の顔が見えている枚を三枚残してください。

| 光 | 書き方 | 厚塗りとの関係 |
|---|---|---|
| 柔らかい | \`soft lighting\` | 筆の境目がなじむ |
| コントラスト | dramatic lighting | 自然な英語。面が分かれる |
| 窓 | \`window light\` | 室内の肖像 |
| 夕日 | \`sunset\` | 景色か、屋外の肖像の一方 |

光の色を服の色と別に二色足すと、肌が第三の色になります。光の色は一つ、服の色は一つ、です。

**窓の光。肖像**

\`\`\`
1 adult man, adult, black hair, shirt,
upper body, simple background, painterly,
visible brush strokes, window light, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, extra people, text
\`\`\`

顔が白く飛ぶときは、dramatic lighting を外し、soft lighting か window light の一方に戻します。飛ぶ日に impasto を足すと、白い絵の具が額に載ります。光を弱めてから、筆の語を戻してください。背景まで同じ光で塗り込むと、人物と壁の境目が消えます。背景は単純なままにして、光は人物に寄せます。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、塗りの結果を文章で書きます。2026年11月時点の公式ヘルプでも、文章で主題と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は版で違うことがあります。枚数の上限や、料金は書きません。各サービスの画面で確認します。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。厚い筆であること。平らな塗りではないこと。光を一つ。作家の名前は入れないこと。

**文章の例。窓の光の肖像**

\`\`\`
Paint one adult woman with black hair and a white blouse,
shown from the chest up, on a plain background.
Use thick painterly brushstrokes, not flat anime colors.
One soft window light. Keep one adult. No text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, extra people, text
\`\`\`

文章の中に作家名を入れたくなったら、その名前は書かずに、筆が厚いか、影が溶けるか、に言い換えます。タグの列を文章へ混ぜると、平塗りと厚塗りが平均になります。Stable Diffusion と NovelAI では上のタグ、文章のモデルではこの節の文、と保存を分けてください。`,
      },
      {
        title: '色が濁る、肌がプラスチックになる',
        content: `色が濁るのは、色の名前が多すぎるときです。赤、青、黄、紫を同じ強さにすると、影の色が茶色の平均になります。色は二つまでです。濁りの語を負向に一つ足すなら、自然な英語で muddy colors です。公式タグとしては断定しません。効かなければ、色名を減らす方が先です。

肌がプラスチックのように滑らかすぎるのは、筆が消えて、写真の肌の平均が残ったときです。\`photorealistic\` と \`smooth skin\` を正向から消し、painterly を人数の近くへ戻します。肌の質感の語そのものは [肌の質感](/guides/skin-texture-prompt-guide) です。このページでは、厚塗りの筆を肌の上に残すところまでです。プラスチックの見え方を直すために、年齢を下げる語は入れません。

平塗りに戻るのは、\`flat color\` や \`cel shading\` や \`anime coloring\` が残っているときです。厚塗りの日は、これらを負向へ移します。逆に、筆の塊が顔を埋めるときは、impasto を外します。埋まりとプラスチックは逆の失敗なので、同じ日に両方の語を足さないでください。

**濁りを減らして、筆を戻す**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, simple background, painterly,
visible brush strokes, soft lighting, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, photorealistic, smooth skin,
muddy colors, extra people, text
\`\`\`

三枚続けて平らなら、品質の語を二つまで減らします。品質の語が特定の絵柄へ引っ張る、という注意は NovelAI のチュートリアルにもあります。品質を消しても筆が戻らないモデルは、厚塗りが弱いです。語を増やすより、\`painterly\` 一つで三枚見てから、次の語を足してください。`,
      },
      {
        title: '英語の語は二つまで並べる',
        content: `厚塗りの英語は、全部を足すリストではありません。検索では、筆の跡、絵の具の厚み、半写実、豊かな陰影、ドラマチックな光が同じ表に並びます。並んでいることと、一枚に同時に書くことは、別です。今日足すのは、その中から二つです。

起点は \`painterly\` です。NovelAI のチュートリアルに載っているので、まずこれを人数か主題の近くに置きます。二つ目は、目的で選びます。筆の一本が見えれば visible brush strokes。絵の具の塊の重さが欲しければ、自然な英語の impasto か thick painting。油絵の媒体に寄せるなら \`oil painting (medium)\`。半写実に寄せるなら semi-realistic。陰影を濃くするなら、自然な英語の rich shading を一つ。光そのものは、塗りの語が安定してから、別の日に一つ足します。

rich shading は、影の色を増やす語としてではなく、立体が残る、という結果の語として置きます。色名を一緒に四つ足すと、陰影が濁ります。影の色を指定するなら、服の色と喧嘩しない一つだけです。指定しない日の方が、モデルの影が濁りにくいことがあります。

semi-realistic を足した日は、\`photorealistic\` を正向に残しません。半写実は、筆が残った立体です。写真の語を同じ強さにすると、筆が先に消えて、肌だけが滑らかになります。その失敗は、プラスチックの肌に見えます。直しは、写真の語を消して painterly を戻すことです。肌の細かい語へ進むのは、筆が三枚残ってからです。細目は [肌の質感](/guides/skin-texture-prompt-guide) です。

アニメ塗りの語が混ざる失敗は、品質タグの自動追加でも起きます。NovelAI のチュートリアルは、品質の語が別の絵柄へ引っ張るときは、その追加を切るか、弱めるか、と注意しています。厚塗りのテストの日は、品質の語を二つまでにして、\`painterly\` の有無だけを見ます。品質を五個並べた枚は、筆のテストになりません。

光を二つ目の枠として使う日は、塗りの語を \`painterly\` 一つに減らします。dramatic lighting と window light と sunset を同時に書かないでください。光のカタログは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。このページに光の語を増やしても、向きの細かい違いは光のページの方が残ります。

作家の名前で厚塗りを指定しない理由は、名前がその人の仕事の代わりになるからです。境目が溶ける、筆が残る、影が一段ではなく連続する、と結果で書いてください。英語の表に載っている語を、上から順に全部貼るのも、同じ失敗です。全部貼った枚は、どの語が筆を戻したのかが残りません。

**筆を一つに戻した肖像**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, simple background, painterly, rich shading, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
flat color, cel shading, photorealistic, smooth skin, extra people, text
\`\`\`

rich shading を足して色が濁ったときは、その語を外し、\`painterly\` と soft lighting の組へ戻します。濁りは、陰影の語を増やすほど悪化することがあります。二つで三枚見て、三枚目が平らなら、二つ目を visible brush strokes に入れ替えます。impasto への入れ替えは、顔が埋まっていない枚が残ってからです。

厚塗りを英語で探すときに並びがちな語を、役割で置き直します。painterly は塗り方です。oil painting は媒体です。impasto は絵の具の厚みです。visible brush strokes は筆の見え方です。semi-realistic は写真との距離です。dramatic lighting は光です。この六つは、同じ層ではありません。媒体を変える日は oil painting だけを動かし、塗り方の painterly は残します。光を変える日は、媒体も筆の語も動かしません。層を二つ同時に動かすと、厚塗りになったのか、夕方になったのかが残りません。

ブラシ塗りと呼ばれる、筆は見えるが塊までは盛らない見え方は、visible brush strokes を残して impasto を外した状態です。水彩のにじみとは別なので、\`watercolor\` は正向に置きません。にじみが欲しい日は、このページを閉じて水彩のページへ移ります。移るときに painterly を残すと、水彩の紙の上に厚い塊が載ります。

静物と景色で筆が戻らないときは、人物の顔が原因ではありません。杯や山にも、平塗りの語が残っていることがあります。\`flat color\` と \`cel shading\` を負向に置いたまま、主題を cup か mountain の一つにします。人を足して筆を安定させようとしないでください。人を足すと、筆のテストが解剖学のテストに変わります。筆が三枚残ってから、大人の肖像へ戻ります。

戻した肖像では、服を閉じた一種類に固定します。ブラウス、鎧、ローブを同じ文に置くと、筆より衣装の平均が目立ちます。光も、戻した日は soft lighting か window light の一方だけです。夕景へ変えるのは、その次のファイルです。ファンタジーの日は、全身を覆う閉じた鎧か、長いローブかを一つにして、肌の広い開きは書きません。景色の日は、山か湖かを一つにして、城の固有名や、作家名を足しません。

英語の短いタグが効かないモデルでは、同じ内容を自然な一文に言い換えます。境目を溶かす、筆の跡を残す、平らな塗りにはしない、です。言い換えても平らなら、そのモデルでは厚塗りが弱いので、語数を増やす実験はそこで止めます。止めずに品質の語を積み上げると、チュートリアルが注意している、別の絵柄への引っ張りが強くなります。引っ張りを疑う日は、品質の語を全部外した枚を一枚だけ残します。その枚で筆が出るなら、品質は二つまで戻してよいです。その枚でも平らなら、品質ではなくモデルの側です。モデルを変える段では、人物の服と人数を固定したまま、\`painterly\` だけを持っていきます。服まで変えると、モデルの差が服の差に隠れます。隠れたまま語を足すと、厚い塗りではなく、衣装の説明が長くなっただけになります。説明が長くなった日は、語を数えて、塗りの層が二つを超えていないかを見ます。超えていたら、光か媒体かを外して、\`painterly\` と筆の語の組に戻します。戻した組で三枚見てから、次の層を一つだけ足してください。足す層は、その日に直したい失敗と対応させます。平らなら筆、濁りなら色を減らす、プラスチックなら写真の語を消す、です。三つの直しを一つの文にまとめません。まとめた文は、翌日から読んでも、どの失敗を直した日なのかが残りません。ファイル名も、平ら、濁り、肌、のように失敗の名前で分けておきます。分けておけば、次にこのページを開いたときに、足す語が一つに決まります。`,
      },
    ],
    faq: [
      {
        q: '厚塗りの英語は何ですか',
        a: '起点は painterly です。NovelAI の Art Styles のチュートリアルには painterly と oil painting (medium) が載っています。impasto と visible brush strokes と thick painting は自然な英語で、公式タグとしては断定しません。平塗りの flat color とは同時に強くしないでください。',
      },
      {
        q: 'アニメ塗りと同時に書けますか',
        a: '同じ強さにはしません。厚塗りの日は cel shading と flat color を外し、負向に残します。アニメ塗りへ戻す日は、厚塗りの語を消してから cel shading を一つ足します。',
      },
      {
        q: 'NovelAI ではどこに置きますか',
        a: '画風の語は前の方です。2026年11月時点のチュートリアルが、そう書いています。品質タグの自動追加が別の絵柄へ引っ張るときは、その切り替えを切るか、品質の語を弱めてから painterly を見てください。倍率の詳細は NovelAI のガイドです。',
      },
      {
        q: '肌がプラスチックのように滑らかです',
        a: 'photorealistic と smooth skin を消し、painterly を人数の近くへ戻します。肌の語の細目は肌の質感のガイドです。年齢を下げる語では直しません。',
      },
      {
        q: '色が茶色く濁ります',
        a: '色の名前を二つまでに減らします。光の色をさらに二色足さないでください。muddy colors は自然な英語で、効かなければ色名を減らす方が先です。',
      },
    ],
  },

  'watercolor-prompt-guide': {
    sections: [
      {
        title: '水彩は紙と、にじみを書く',
        content: `「水彩 プロンプト」「水彩風 プロンプト」「透明水彩 プロンプト」で探しているのは、薄い色の重なりと、にじんだ端と、紙の白です。検索では、水彩風、水彩塗り、透明水彩、AIの水彩が一緒に出ます。欲しいのは、写真の複製ではなく、紙の上の絵の具です。

このページは、水彩の媒体を担当します。花の種類そのものは [花のプロンプト](/guides/flower-prompt-guide)、景色の種類は [風景のプロンプト](/guides/landscape-prompt-guide)、線だけの輪郭は [線画のプロンプト](/guides/line-art-prompt-guide) です。役割は一行で分けます。花のページは花、景色のページは地形、線のページは輪郭、このページは水彩の塗りです。画風の入口は [画風プロンプト](/guides/art-style-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はブラウス、カーディガン、長いスカート、シャツのように閉じた日常着です。実在の人物、作家名、作品名は書きません。

2026年11月時点の書き方です。バージョンによって効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。

重みは目安です。\`(watercolor:1.2)\` のように 1.1 から 1.3 で一つです。文字として残すときは \`\\(watercolor:1.2\\)\`、NovelAI は \`{watercolor}\` と \`[watercolor]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は \`<lora:名前:0.6>\` だけ、文末の \`--ar\` は使えるツールだけです。

2026年11月時点の NovelAI の Art Styles のチュートリアルには、媒体として \`watercolor (medium)\` が並んでいます。画風の語は前の方に置く、とも書かれています。出典は <a href="https://docs.novelai.net/en/image/tutorial-artstyles/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Art Styles のチュートリアル</a> です。括弧を重みと読む画面では、括弧を外して watercolor medium と自然な英語にします。

一枚につき、にじみの語を一つ、紙の語を一つ、主題を一つです。\`watercolor\` と \`photorealistic\` を同じ強さにすると、顔だけ写真で背景だけにじみ、になります。

濡れた紙の上に次の色を置く技法は、自然な英語で wet-on-wet と書きます。これは絵の具の重ね方の名前です。服が濡れた状態の語としては使わないでください。乾いた筆のかすれと同時に強くすると、にじみとかすれが平均になります。かすれの日は、wet-on-wet を外します。`,
      },
      {
        title: '透明水彩と、不透明な水彩',
        content: `透明な水彩は、下の紙や、下の色が透けます。端がにじみ、白い紙を残します。不透明な水彩は、ガッシュに近く、色がマットに乗って、下の紙が隠れます。両方を同じ強さにすると、花びらの半分だけが不透明になります。

比較は、主題を固定して、透明か不透明かの名詞だけを差し替えます。透明の日に色を濃くしたくなったら、不透明へファイルを移します。同じファイルで両方の語を残さないでください。

| 種類 | 書き方 | 残りやすい結果 |
|---|---|---|
| 水彩の総称 | \`watercolor\` | 単体だと写真に戻ることがある |
| 水彩の絵 | watercolor painting | 自然な英語 |
| 透明 | transparent watercolor | 自然な英語。紙の白が残る |
| NovelAI の媒体 | \`watercolor (medium)\` | 括弧が衝突する画面では外す |
| 不透明、ガッシュ | \`gouache\` | 自然な英語。色がマットに乗る |
| 不透明の言い方 | opaque watercolor | 自然な英語。公式タグとしては断定しない |
| にじみ | \`bleeding colors\`, soft edges | 顔まで溶けることがある |
| 濡れた紙への重ね | wet-on-wet | 画材の名前。服の状態ではない |
| 紙 | \`paper texture\` | 全体が薄くなりすぎたら外す |
| 淡い色 | \`pastel\` | 色名を増やしすぎない |

紙の語を強くすると、色が全部薄くなることがあります。薄くなりすぎた枚は、paper texture を外して、transparent watercolor だけを残します。逆に紙が見えない枚は、photorealistic を消してから、paper texture を一つ戻します。

淡い色は、色を二つまでです。パステルを六色並べると、画面が灰色の平均になります。余白を残す日は、自然な英語で white space を一つ足し、背景の小物を消します。`,
      },
      {
        title: '肖像、花、景色',
        content: `人物のにじみは、服の端と背景に寄せます。顔の中まで wet-on-wet を強くすると、目が色の溜まりになります。顔を保つ日は、soft edges を服の側に書き、目の語は一つだけ残します。

花は、種類を一つです。椿、菊、枝の花、のどれか。花の細かい分けは [花のプロンプト](/guides/flower-prompt-guide) です。このページでは、その花を透明な水彩にするか、を見ます。景色は、湖か、港か、を一つ。地形の一覧は [風景のプロンプト](/guides/landscape-prompt-guide) です。

| 主題 | 水彩の置き方 | 人 |
|---|---|---|
| 肖像 | 顔は残し、服の端をにじませる | 大人。胸から上 |
| 花 | 透明、余白、紙 | 置かない |
| 景色 | 空を wet-on-wet、地形は一つ | 置かない |

**胸から上。服の端だけやわらかく**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, simple background, transparent watercolor,
soft edges, paper texture, pastel, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, extra people, text
\`\`\`

**椿を一枝。人はいない**

\`\`\`
a single camellia branch in a glass, transparent watercolor,
paper texture, white space, soft edges, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, people, person, text
\`\`\`

**湖と山。空だけにじませる**

\`\`\`
a lake and distant mountains, transparent watercolor,
wet-on-wet sky, paper texture, soft edges, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, people, person, text
\`\`\`

顔が溶けるときは、wet-on-wet を背景だけに戻し、肖像の正向からは外します。椿が三種類の花に増えるときは、枝を一つに戻します。湖の水面に街が写り始めるときは、建物の語を消して、山と湖だけにします。`,
      },
      {
        title: '食べ物、動物、葉書',
        content: `食べ物は、皿を一つです。カステラ、茶碗、果物、のどれか。動物は、猫か、小鳥かを一つ。人が抱く日は、大人を一人だけ足して、動物の種類を増やしません。葉書は、余白の広い紙と、景色を一つ、文字は無し、です。賀詞や店名は書きません。

不透明に寄せる日は、食べ物のように色の面がはっきりした主題が扱いやすいです。透明に寄せる日は、花か空です。葉書の日は、透明のまま余白を広くします。枠の中に文字を足すと、絵の具の上に別のフォントが乗ります。

| 主題 | 書き方 | 人 |
|---|---|---|
| 食べ物 | \`gouache\`, opaque watercolor | 置かない |
| 動物 | \`watercolor\`, soft edges | 置かない |
| 葉書 | watercolor postcard, white space | 置かない。文字も置かない |

**カステラ。不透明**

\`\`\`
a slice of castella on a plate, gouache, opaque watercolor,
matte paint, paper texture, simple background, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, people, person, text
\`\`\`

**座った猫。人はいない**

\`\`\`
a seated cat, watercolor painting, soft edges,
paper texture, pastel, simple background, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, people, person, text
\`\`\`

**港の葉書。文字は無い**

\`\`\`
a small harbor and hills, watercolor postcard,
wide paper margin, transparent watercolor, white space,
no text, no letters, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, text, letters, people, person
\`\`\`

皿に料理を三品置くと、色が濁ります。一切れに戻してください。猫の毛を一本ずつ書く語を強くすると、水彩が写真の毛になります。毛の詳細は外して、soft edges を残します。葉書に地名を書くと、文字が崩れます。地名は入れません。`,
      },
      {
        title: '線を残して、淡く塗る',
        content: `線と水彩を同じ枚に置く日は、線を先に一つ、塗りを淡く一つ、です。\`lineart\` と \`impasto\` を同時に強くすると、線が絵の具の下で切れます。厚い塗りは厚塗りのページへ戻し、このページではインクの線と、薄い水彩だけにします。

線の太さの細目は [線画のプロンプト](/guides/line-art-prompt-guide) です。このページでは、線が残っているか、塗りが紙の白を残しているか、を見ます。線を全部消す日は、no hard outlines と自然な英語で一つ足し、lineart は消します。両方を残すと、輪郭の有無が平均になります。

**インクの線と、薄い塗り**

\`\`\`
1 adult man, adult, black hair, shirt, long trousers,
standing, full body, ink outline, transparent watercolor,
soft edges, paper texture, white background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, impasto, extra people, text
\`\`\`

線が塗りの中で切れるときは、watercolor の重みを下げ、ink outline を人数の近くへ移します。線が太くなりすぎて塗り絵の黒枠になるときは、thick lines を外し、細い線のページの語は使わず、ink outline だけを残します。顔の中の線まで水彩がかぶるときは、塗りを服と背景に限定する文へ戻します。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、紙と、にじみと、主題を文章で書きます。2026年11月時点の公式ヘルプでも、文章で主題と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は版で違うことがあります。枚数の上限や、料金は書きません。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。透明な水彩か、不透明か。紙が見えるか。主題は一つ。文字は無いか。

**文章の例。余白のある椿**

\`\`\`
Paint a single camellia branch in a glass as transparent watercolor.
Leave white paper around it, with soft bleeding edges and visible paper texture.
No people and no text.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, people, person, text
\`\`\`

文章で「もっと鮮やかに」とだけ足すと、紙の白が消えてポスターの色になります。鮮やかさの前に、透明か不透明かを一つ残してください。タグの列を文章の途中へ貼ると、ガッシュと透明水彩が平均になります。`,
      },
      {
        title: '写真に寄る、色が飽和する、紙が消える',
        content: `失敗は三つです。写真になる。色が飽和して紙が無くなる。紙の目が最初からない。

写真になるときは、\`photorealistic\` や \`photograph\` や \`detailed skin\` が残っています。水彩の日はこれらを消し、watercolor を主題の直後へ移します。負向に photorealistic を残します。人物の顔を写真のまま残したい、という依頼は、水彩の枚ではしません。顔も紙の絵として描きます。

色が飽和するのは、\`vibrant\` や \`vivid\` や色名の多さです。透明水彩の日は、色を二つまでにして、white space を一つ残します。飽和を直すために不透明の語を足すと、別の媒体になります。透明のファイルのまま、色名を減らしてください。

紙が消えるのは、paper texture が文の後ろに落ちているか、デジタルの滑らかさの語が勝っているか、です。paper texture を媒体の直後へ移し、\`smooth\` や \`glossy\` を消します。移しても紙が見えないモデルは、水彩の紙が弱いです。語を五個足すより、watercolor と paper texture の二つで三枚見てください。

**紙と透明へ戻す**

\`\`\`
a single camellia branch, transparent watercolor,
paper texture, white space, soft edges, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, photograph, glossy, vibrant, people, person, text
\`\`\`

三枚続けて写真なら、そのモデルは媒体の語より写真が強いです。人物を足す前に、花か景色の無人物で紙が出るかを確認します。紙が出ないモデルに人物を足すと、顔だけが写真の平均になります。`,
      },
      {
        title: '余白を残し、色は二つ',
        content: `水彩がポスターのように濃くなるのは、余白を書いていないときです。紙の白は、塗らなかった場所です。主題の周りに白が残る、と書かないと、色が端まで伸びて、紙の質感だけが残ります。自然な英語では white space を一つ足します。公式タグとしては断定しません。効かなければ、背景の小物を消して、主題を一つに戻してください。

色は二つまでです。淡い、という結果が欲しいときに色名を六つ並べると、淡さではなく灰色の平均になります。\`pastel\` を置く日は、色名をさらに足しません。pastel が弱いモデルでは、色を一つだけ名前で書き、ほかは書きません。飽和を上げる語は、透明水彩の日には外します。濃い面が欲しい日は、ファイルをガッシュ側へ移します。透明の枚の中で鮮やかさだけを上げないでください。

にじみを足す場所も、一つです。景色なら空。花なら花びらの外側。肖像なら服の端か背景。顔の中、皿の料理の境界、動物の目、にはにじみを強くしません。形が必要な境界と、溶けてよい境界を同じ語で塗ると、目と空が同じ溶け方になります。

紙の目は、paper texture を媒体の近くに一つです。紙の種類の商品名や、メーカー名は書きません。粗い紙、滑らかな紙、という結果を自然な英語で一つ足すことはできます。効かなければ外して、paper texture だけに戻します。紙の語を三つにすると、色が全部薄くなり、主題が背景の紙に負けます。

線を残す日は、余白と紙を残したまま、線の語を一つ足します。線の太さをこのページで細かく分け始めると、線画のページと役割が重なります。太さは [線画のプロンプト](/guides/line-art-prompt-guide)、花の種類は [花のプロンプト](/guides/flower-prompt-guide)、地形の種類は [風景のプロンプト](/guides/landscape-prompt-guide) です。このページに戻ってきたときに見るのは、紙が残っているか、色が二つか、にじみが境界を一つだけ溶かしているか、です。

葉書の余白は、絵の余白より広く取ります。枠の中に文字を置く指定はしません。文字が欲しければ、生成のあとで自分で載せます。地名や店名を文章に書くと、葉書の空に文字の形がにじみます。

**余白を広くした菊。人はいない**

\`\`\`
a single chrysanthemum, transparent watercolor,
white space, paper texture, pastel, soft edges, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, vibrant, glossy, people, person, text
\`\`\`

菊の品種を三つ書くと、余白が花で埋まります。一輪に戻してください。pastel を足して灰色になるときは、色名がほかに残っていないかを見ます。残っていれば消し、pastel だけにします。紙が真っ白で色が乗らないときは、white space を外さずに、主題の花を文の前へ移します。余白の語が主題より前にあると、花そのものが小さくなりすぎることがあります。

透明と不透明を往復するときは、花を固定します。透明の枚は、紙の白と、端のにじみです。不透明の枚は、同じ花を \`gouache\` に変えて、white space を外します。外さないと、ガッシュなのに端だけが水のように薄くなります。往復の途中で花の種類を変えないでください。種類が変わると、媒体の差なのか、花の差なのかが残りません。

食べ物を水彩にする日は、湯気を強くしない方が紙が残ります。湯気は、にじみと似た白いぼかしになって、皿の境界を消します。湯気が欲しい日は、紙の語を一つ残したまま、にじみの語を外します。動物の日は、毛の一本を書かず、耳と目と体の塊を残します。毛を詳細にすると、紙より写真の毛が優先されます。葉書の日は、景色を一つに減らしてから余白を広くします。港と山と街を同じ葉書に書くと、余白が建物で埋まります。

肖像で紙を残すコツは、背景を無地にすることです。部屋の家具を書くと、家具の線が写真に戻り、顔だけが水彩になります。家具が必要な日は、人を消して、部屋だけの水彩にファイルを分けます。人のファイルに戻すときは、家具の語を持ってきません。

花の枚で紙が出て、肖像で消えるときは、肖像側の写真の語を先に疑います。detailed face や photorealistic が残っていると、花のファイルで見つけた紙は、人の顔に負けます。肖像の正向を、成人、閉じた服、透明水彩、紙、無地、まで減らしてから、もう一度見ます。減った状態で紙が出たら、服の端のにじみを一つ戻します。顔の中のにじみは、戻しません。

不透明側で色が浮くときは、opaque watercolor と gouache を同時に強くしていませんか。媒体の名前は一つです。同時に置くと、マットな面と、透明な端が同じ花びらに出ます。食べ物の一切れで媒体を決めてから、花へコピーすると、花の種類の差を見ずに媒体だけを比べられます。コピーするときに、皿の語まで残さないでください。残った皿は、花の余白を食器の白と勘違いさせます。余白は紙の白です。食器の白と分けるために、花のファイルには皿を書きません。食べ物のファイルには花を書きません。葉書のファイルには、どちらも書きません。三つの白を混ぜた枚は、どの白が紙なのかが残りません。残らない枚は、比較に使いません。比較は、同じ花、同じ余白、媒体の名前だけが違う二枚です。二枚の差が色の濃さだけなら、媒体は伝わっています。差が花の形なら、種類の語が片方に残っています。形を揃えてから、もう一度媒体だけを変えます。揃う前ににじみの語を足すと、形の差とにじみの差が同時に動きます。動いた枚は捨てて、媒体の名前が一つの起点へ戻ります。起点には、紙の語が一つ、余白の語が一つ、色の名前が無いか一つ、までしか残しません。そこから外した語を、日記のように横に書いておきます。横に書いた語を、翌日の正向へまとめて戻さないでください。戻すのは、起点が三枚そろったあとの一つだけです。一つ戻して紙が消えたら、その語はこのモデルでは紙と両立しません。消えた枚は残さず、起点の三枚だけを保存します。`,
      },
    ],
    faq: [
      {
        q: '透明水彩とガッシュはどう分けますか',
        a: '透明は transparent watercolor で、紙の白が残ります。不透明は gouache か opaque watercolor です。同じ強さにはしません。NovelAI のチュートリアルには watercolor (medium) が載っています。括弧が重みと衝突する画面では、括弧を外してください。',
      },
      {
        q: 'wet-on-wet は何の語ですか',
        a: '濡れた紙に次の色を置く、画材の重ね方です。服が濡れた状態の語としては使わないでください。顔の中まで強くすると目が溶けます。景色では空だけ、肖像では背景だけ、に限ると残りやすいです。',
      },
      {
        q: '水彩なのに写真になります',
        a: 'photorealistic と photograph を消し、watercolor を主題の直後へ移します。負向に photorealistic を残してください。鮮やかさの語を足すと、紙の白が先に消えます。',
      },
      {
        q: '線画の上に水彩を載せられますか',
        a: 'インクの線を一つ、薄い透明水彩を一つ、までです。厚塗りの impasto とは同時に強くしません。線の太さの細目は線画のページです。',
      },
      {
        q: 'ChatGPT や Gemini ではどう書きますか',
        a: '文章で、主題を一つ、透明か不透明か、紙の質感、にじみ、文字が無いこと、を書きます。人を置くときは成人と明記します。枚数の上限や料金は各サービスの画面で確認します。',
      },
    ],
  },

  'rooftop-prompt-guide': {
    sections: [
      {
        title: '屋上は部品を一つにする',
        content: `「屋上 プロンプト」「プロンプト 屋上」で探しているのは、建物の上の場所です。街を見渡す床、柵、貯水槽、階段室の扉、植栽、夕景と夜景が一緒に出ます。このページは、都市の建物の屋上だけを担当します。学校の屋上は、このページでは使いません。使わない場所です。

通りと店の並びは [街のプロンプト](/guides/city-town-prompt-guide) です。役割は一行で分けます。街のページは通り、このページは屋上です。人物のうしろに場所を短く置くときは [背景プロンプト](/guides/background-prompt-guide) です。このページの背景は、屋上そのものが主題のときだけです。光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide)、見る高さは [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、二人なら \`2 adults\` を先に置いて、\`adult\` を残します。服はブラウス、カーディガン、長いスカート、スーツ、長いコートのように閉じた外出着です。実在の建物の名前、看板の店名、作品名は書きません。

2026年11月時点の書き方です。バージョンによって効きは違います。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。

重みは目安です。\`(rooftop:1.2)\` のように 1.1 から 1.3 で一つです。文字として残すときは \`\\(rooftop:1.2\\)\`、NovelAI は \`{rooftop}\` と \`[rooftop]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は \`<lora:名前:0.6>\` だけ、文末の \`--ar\` は使えるツールだけです。公式ドキュメントを確認してください。

一枚につき、屋上の種類を一つ、部品を二つまで、時間を一つです。金網と手すりと貯水槽と扉と植栽を全部同じ強さにすると、床が部品の平均になります。\`rooftop\` だけだと、屋根の斜面になることがあります。床が平らな建物の上、と結果を書き、必要な部品を二つ足してください。`,
      },
      {
        title: '柵、槽、庭、テラス',
        content: `部品は、今日足すものを二つにします。金網の柵、手すり、貯水槽、階段室の扉、植栽、テラスの床、のどれかです。三つ目は、二つが三枚続いてから足します。

金網は、人が寄りかかる境界です。手すりは、金属の棒が横に走る境界です。両方を同じ強さにすると、柵の網目が手すりの棒と溶けます。貯水槽は、屋上の設備として一つ。扉は、階段室から出る扉を一つ。庭は、プランターの緑を一つ。テラスは、椅子と机がある平らな床です。庭とテラスを同じ強さにすると、椅子が植木の中に入ります。

| 部品 | 書き方 | 同時に強くしないもの |
|---|---|---|
| 屋上 | \`rooftop\` | 通りの店並み |
| 金網 | \`chain-link fence\` | 手すりを同じ強さにしない |
| 手すり | \`railing\` | 金網 |
| 貯水槽 | water tank | 自然な英語。槽を二つ置かない |
| 階段室の扉 | stairwell door | 自然な英語。扉を二枚置かない |
| 屋上庭園 | \`rooftop garden\` | カフェの机 |
| テラス | \`terrace\` | 庭の植栽を増やしすぎない |
| 街の稜線 | \`city skyline\` | 看板の文字 |

オフィスや集合住宅の屋上で、金網が欲しいときは、chain-link fence を一つ足します。床は、自然な英語で concrete floor と一つ書けることがあります。効かなければ、rooftop と fence だけに戻します。

**金網と貯水槽。人はまだ置かない**

\`\`\`
office building rooftop, chain-link fence, one water tank,
concrete floor, stairwell door, daytime, city skyline far away,
no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text, signage
\`\`\`

槽が二基に増えるときは、水槽の語を一つに戻し、アンテナや室外機を消します。扉が建物の正面玄関になるときは、stairwell door を屋上の床の端、と書き、通りの語を消します。庭の花を五種類書くと、床が見えなくなります。緑は、プランターを一つ、までです。`,
      },
      {
        title: '時間と天候は一つ',
        content: `時間は、昼、夕景、青い時刻、夜、のどれか一つです。天候は、晴れ、雨、雪、のどれか一つです。夕景と夜と雨を同じ強さにすると、空の色が平均になります。

夕景は、空が暖色で、街はまだシルエットに近いです。青い時刻は、空が青く、窓の明かりが付きはじめます。夜は、街の明かりが主体です。雨は、傘か、長いコートかを一つ。雪は、コートと、積もった床の白を一つ。星は、街の明かりを弱めた夜にだけ足します。ネオンを強くした夜に星を足すと、空が両方の平均になります。

| 時間や天候 | 書き方 | 残す部品 |
|---|---|---|
| 夕景 | \`sunset\` | 手すりか金網の一方 |
| 青い時刻 | blue hour | 自然な英語。窓の明かりは弱く |
| 夜の街 | \`night\`, city lights | 自然な英語の city lights。看板の文字は書かない |
| 雨 | \`rain\` | 傘かコート。人を置く日だけ |
| 雪 | \`snow\` | 床の白。人を置くなら長いコート |
| 星 | starry sky | 自然な英語。ネオンとは同時に強くしない |

雨の日に、服が水を吸った状態の語は使いません。傘とコートで、天候が分かれば足ります。雪の結晶を顔の前に大きく書くと、表情が隠れます。雪は、床と空に寄せます。

**夜の街。人はいない**

\`\`\`
rooftop, railing, night, city lights, city skyline,
concrete floor, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text, sunset, signage
\`\`\`

**夕景のテラス。人はいない**

\`\`\`
rooftop terrace, railing, sunset, city skyline,
potted plant, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text, night, signage
\`\`\`

夜なのに空がオレンジのままなら、sunset が古いファイルに残っています。消して、night を rooftop の直後へ移します。雨の日に夕景の語が残っていると、傘の色が空に溶けます。天候を足す日は、時間の語を一つだけ残してください。`,
      },
      {
        title: '見る位置を一つ',
        content: `位置は、人のうしろから街を見る、空を入れた低い位置、屋上を見下ろす高い位置、のどれか一つです。三つを同じ強さにすると、床のパースが平均になります。高さの語の細目は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

うしろから見る日は、背中と、その先の街です。顔は見えません。低い位置は、柵と空が主題で、人を置くなら全身の立ち姿にします。体の一部を強調する語は使いません。高い位置は、床と槽と扉の配置が見える、背景向けです。人の顔の日に高い位置を強くすると、頭が小さくなって槽と混ざります。

| 位置 | 書き方 | 向く主題 |
|---|---|---|
| うしろから街 | from behind, looking at the city | 大人の立ち姿 |
| 低い位置と空 | \`low angle\`, sky | 柵と空。人は全身 |
| 高い位置 | \`high angle\` | 床と設備。背景向け |

うしろからの日に、顔をこちらへ向ける語を足すと、首が平均の角度で止まります。顔が欲しい日は、from behind を消して、胸から上にファイルを分けます。

**うしろから、夕景の街**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan, long skirt,
standing, full body, from behind, hands on the railing,
looking at the city, rooftop, sunset, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, school uniform
\`\`\`

**低い位置。柵と空。人はいない**

\`\`\`
rooftop, chain-link fence, low angle, wide sky,
daytime, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text
\`\`\`

手が柵に溶けるときは、次の節の直しに回します。この節で直すのは、位置が二つ残っていないか、だけです。low angle と high angle が両方ある枚は、保存せず、どちらかの起点へ戻してください。`,
      },
      {
        title: '大人の立ち姿、会話、休憩、カフェ',
        content: `人の場面は一つです。柵にもたれる一人、会話する二人、休憩する一人、屋上のカフェの一人、を同じ強さにすると、人数が平均になります。

もたれる一人は、手が柵の上です。会話する二人は、\`2 adults\` から書き、並んで立つことだけを足します。手をつなぐ、物を渡し合う、は次の日です。休憩は、スーツの大人と、紙のコップを一つ。カフェは、長い袖の服で、机に座って杯を一つ。夜のカフェは、街の明かりを背景に一つ。店名の看板は書きません。

| 場面 | 人数 | 部品 |
|---|---|---|
| 柵にもたれる | 大人一人 | 手すりか金網 |
| 会話 | \`2 adults\` | 屋上庭園 |
| 休憩 | 大人一人 | オフィスの屋上、貯水槽は遠く |
| カフェ | 大人一人 | テラスの机と椅子 |

**二人の会話。屋上庭園**

\`\`\`
2 adults, 1 adult woman, adult, coat, long skirt,
1 adult man, adult, coat, trousers,
standing, talking, rooftop garden, potted plants, railing,
daytime, full body, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, school uniform
\`\`\`

**休憩。紙のコップ**

\`\`\`
1 adult man, adult, suit, necktie, long sleeves,
standing, holding a paper cup, office building rooftop,
chain-link fence, water tank in the distance, daytime, full body, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, school uniform
\`\`\`

**夜のカフェ。杯を一つ**

\`\`\`
1 adult woman, adult, long coat, long skirt,
sitting at a small table, holding a cup, rooftop cafe,
railing, night, city lights, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, logo, school uniform
\`\`\`

**雨。傘とコート**

\`\`\`
1 adult man, adult, long coat, holding an umbrella,
standing, full body, rooftop, railing, rain, daytime, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, school uniform
\`\`\`

二人の顔が溶けるときは、talking を残して、抱える動作の語を消します。コップを持つ手の指が増えるときは、杯を机に置いて、手は空に戻します。カフェの看板に文字が出るときは、店名を消し、text と logo を負向に残します。雨の日に人数を増やすと、傘がもう一人の頭に載ります。雨は一人です。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、屋上の種類と、時間と、人の有無を文章で書きます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は版で違うことがあります。枚数の上限や、料金は書きません。各サービスの画面で確認します。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。屋上の部品を二つまで。時間を一つ。看板の文字は無いか、です。使わない場所は、うしろの質問にまとめます。

**文章の例。夕景に背を向けた一人**

\`\`\`
Draw one adult woman in a white blouse, a cardigan, and a long skirt,
standing full length on an office rooftop, seen from behind.
Her hands rest on a railing as she looks at the city at sunset.
No text. Keep one adult.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, school uniform
\`\`\`

文章に通りの店名を足すと、屋上ではなく繁華街になります。場所は屋上の床に戻してください。タグの列を文章の途中へ貼ると、夜と夕景が平均になります。`,
      },
      {
        title: '柵が体に溶ける、街のパースが歪む',
        content: `柵が体に溶けるのは、金網の網目と、服の線と、腕が同じ細かさになったときです。人が柵の前に立つ日は、金網を一つだけにして、貯水槽と扉を消します。手は、柵の上に置くか、ポケットに入れるか、を一つ。両方を書くと、腕が二本分になります。網目が服の柄になるときは、服を無地に戻します。

それでも溶けるときは、人を胸から上にして、柵を画面の下端だけにします。全身と金網と夜景を同じ強さにした枚は、情報が多く、境界が先に負けます。背景だけの枚で柵の形を確認してから、人を足してください。

街のパースが歪むのは、低い位置と高い位置と、広い街並みを同時に強くしたときです。位置を一つに戻し、看板の文字を消します。建物の窓を一枚ずつ書く語も外します。稜線は、city skyline を一つ、までです。歪みの語を直すために、別の都市の有名な建物の名前は入れません。

パースの細目は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。このページでは、屋上の床が一つの消失点に戻るか、を見ます。

**柵を一つに戻す。胸から上**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, hands on the railing, rooftop, daytime, city skyline, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra arms, chain-link fence, text, school uniform
\`\`\`

この負向の chain-link fence は、手すりと金網が同時に出て溶ける日だけです。金網が主題の枚では、負向に入れません。主題の柵まで消えます。ファイルを、手すりの枚と、金網の枚に分けてください。

三枚続けて床が斜めの屋根になるときは、terrace か concrete floor を rooftop の直後へ足し、瓦屋根の語が残っていないかを見ます。残っていたら消します。屋上は、人が立てる平らな床です。`,
      },
      {
        title: 'オフィスと集合住宅の屋上',
        content: `屋上の依頼は、建物の種類が先に混ざります。オフィスの屋上、集合住宅の屋上、庭のあるテラス、夜のカフェ、を一つの文に書くと、床の素材が平均になります。今日の建物は一つです。通りの店並みは [街のプロンプト](/guides/city-town-prompt-guide)、人物のうしろに短く場所を置くだけなら [背景プロンプト](/guides/background-prompt-guide) です。

オフィスの屋上は、平らな床、金網か手すり、遠い貯水槽、階段室の扉、です。休憩の大人を置く日は、スーツと紙のコップを一つ。槽を人物のすぐ横に大きく書くと、頭と槽が同じ高さで溶けます。槽は遠く、人は柵の側、と分けます。

集合住宅の屋上は、同じ部品で足ります。建物の名前や、実在の団地の名前は書きません。洗濯物や、看板や、表札の文字も書きません。文字が出る枚は、正向の単語を減らしてから、もう一度生成します。

庭は、プランターを一つです。花の種類を増やす日は、花のページへ主題を移し、このページではプランターが床の上にあるかだけを見ます。テラスの机と椅子を庭に足すと、庭ではなくカフェになります。カフェの日は、植栽を消して、机と杯と大人一人にします。

夜は、街の明かりを一つ。夕景は、空の暖色を一つ。両方を残した枚は、どちらの時間のテストでもありません。雨の日は、傘と長いコートで天候を示し、服が水を含んだ状態の語は使いません。雪の日は、床の白と長いコートです。星を足す日は、ネオンの語を消します。

見る位置も建物と一緒に固定します。うしろから街を見る枚、空を入れた低い位置の枚、床を見下ろす枚、は三つのファイルです。低い位置で人の全身を置く日は、体の一部を強調する語を足しません。全身の閉じた服と、柵と、空、までです。

**集合住宅の屋上。人はいない**

\`\`\`
apartment building rooftop, concrete floor, chain-link fence,
one water tank in the distance, stairwell door, daytime,
city skyline far away, no text, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text, signage, letters
\`\`\`

扉が正面玄関の大きさになるときは、stairwell door を床の端の小さな扉、と自然な英語で一つ書き直します。効かなければ、扉の語を外して、金網と槽だけに戻します。槽が画面の中央で人の代わりになるときは、in the distance を槽の直後へ移し、金網を前に残します。看板の文字が出る枚は、街の稜線を弱めて、空を広くしてください。稜線の細かい窓は、歪みの原因にもなります。

人を足す順序も、建物が先です。人のいない枚で、床と柵と時間が三枚そろってから、大人を一人足します。先に人を書くと、服の色が空に勝って、貯水槽や扉が消えます。二人にする日は、一人の枚をコピーして、\`2 adults\` に変えます。会話以外の動作は足しません。カフェの日は、庭のプランターの語が残っていないかを先に見ます。残っていると、机の上に植木が載ります。

雨と雪は、人を置いたあとの天候です。人のいないテストに雨を足すと、床の反射だけが主題になって、柵の形が確認できません。柵が三枚残ってから、傘か、雪の床かを一つ足します。傘を二本にしないでください。人数が増えます。夜の明かりと夕景の空は、天候のファイルに同時に残しません。時間は、建物を決めた日の語を、最後まで固定します。

低い位置で空を広くする枚は、人の顔のテストに使いません。顔が欲しい日は、胸から上で、柵を下端だけにします。全身と空と夜景を同じ強さにすると、足が床から離れます。離れた枚は保存せず、standing と full body を戻して、空の語を一つ外します。屋上は、足が床についている場所です。

オフィスと集合住宅で結果が似るのは、部品が同じだからです。差を付けたい日は、部品を増やすのではなく、時間を変えます。オフィスは昼の休憩、集合住宅は夕景の手すり、庭は昼のプランター、カフェは夜の机、です。四つの時間を一つの文にまとめないでください。看板や表札で差を付けようとすると、文字が先に崩れます。差は、空の色と、床の上の物二つまで、で足ります。

人を二人にするのは、昼の庭か、夕景の手すりのように、床が見えている枚だけです。夜のカフェを二人にすると、杯と手が増えて、街の明かりより指が主題になります。カフェは一人のまま、杯は一つです。雨の傘も一人です。会話が必要な日は、天候を外して、並んで立つことだけを残します。並んだ二人のあいだに槽や扉を置くと、会話ではなく設備の紹介になります。設備を見せる日は、人を消した背景のファイルへ戻ります。人のファイルで見せてよい部品は、手すりか金網の一方と、遠くの空だけです。空が近すぎて床が斜めになるときは、低い位置の語を外して、立っている大人の全身に戻します。床が写っていない全身は、屋上ではなく、空を背景にした肖像です。肖像にしたい日は、このページではなく、人物の服のページへ主題を移します。このページに残る枚は、足の下に床がある枚だけです。`,
      },
    ],
    faq: [
      {
        q: '学校の屋上は書けますか',
        a: '学校の屋上は、このページでは扱いません。使わない場所です。使わない語は、学校、教室、制服、学生です。大人の代替は、オフィスや集合住宅の屋上と、金網の柵です。',
      },
      {
        q: 'rooftop だけだと屋根の斜面になります',
        a: '平らな床が欲しいときは、terrace か concrete floor を一つ足します。金網か手すりかを一つ添えると、人が立てる屋上に残りやすいです。部品は二つまでにしてください。',
      },
      {
        q: '金網と体が溶けます',
        a: '金網と手すりを同時に強くしないでください。服は無地に戻し、手の位置は柵の上か、空か、を一つにします。それでも溶けるときは、胸から上にして、柵は下端だけにします。',
      },
      {
        q: '夜景の建物が歪みます',
        a: '低い位置と高い位置を同時に書かないでください。看板の文字と、窓を一枚ずつ書く語を消し、city skyline を一つ残します。パースの細目は構図のガイドです。',
      },
      {
        q: 'ChatGPT や Gemini ではどう書きますか',
        a: '文章で、成人か人なし、屋上の部品を二つ、時間を一つ、看板の文字が無いこと、を書きます。使わない場所は、前の質問のとおりです。枚数の上限や料金は各サービスの画面で確認します。',
      },
    ],
  },
}
