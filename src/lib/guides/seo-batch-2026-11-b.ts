/**
 * Tenth SEO batch (2026-11-03): LoRA, ControlNet, model families,
 * NovelAI prompt syntax, and half-up hairstyles.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 * Technical facts are limited to official docs and model cards checked 2026-11-03.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_10_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'stable-diffusion-lora-guide': {
    sections: [
      {
        title: 'LoRA とは',
        content: `「stable diffusion lora 使い方」で最初に分けるのは、チェックポイントと LoRA です。チェックポイントは絵の土台になるモデル本体です。LoRA は、その土台に後から足す小さな追加ファイルで、画風、服、ポーズ、背景のような一部だけを寄せます。土台を入れ替えずに、差分だけをプロンプトから呼び出す、という役割です。

種類は、用途で分けると扱いやすいです。キャラクターの顔立ち、絵の塗り、決まった服、立ち方、背景の質感。一つのファイルが複数を同時に引っ張ることもあります。服の LoRA なのに背景まで変わる、という衝突は後ろの節で直します。学習の手順はこのページでは扱いません。学習は、配布されたファイルを読み込んでプロンプトに書くこととは別の作業です。自分でファイルを作るときは [LoRA学習のやり方](/guides/lora-training-guide) を開き、このページはできたファイルの書き方だけを担当します。

人物を描く行は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はブラウス、カーディガン、コート、スーツのように閉じた日常着を一つ。このページは成人だけです。土台の選び方は [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list)、タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、品質の語は [品質タグ一覧](/guides/quality-tags-prompt-guide) です。ノードで読むときは [ComfyUIの使い方](/guides/comfyui-guide)、欄のある画面は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。

LoRA は「足すファイル」で、プロンプトの文章そのものではありません。文章だけで画風を書くときの入口は [画風プロンプト](/guides/art-style-prompt-guide) です。Illustrious 系の土台に合わせるときは [Illustriousプロンプト](/guides/illustrious-prompt-guide) を先に読んで、LoRA のベースが同じ系統かを確認してください。

チェックポイントを変えると、髪も服も背景もまとめて別の絵になります。LoRA は、そのうちの一つだけを寄せたいときに使います。寄せたいものがプロンプトの単語で足りるなら、ファイルは足しません。足すほど、どの語が効いたのかが見えなくなります。比較は、土台のチェックポイントとシードを固定し、LoRA の有無だけを変えた二枚で始めます。二枚が同じなら、ファイルは読み込まれていません。強さを上げる前に、フォルダとファイル名を見てください。

キャラクターの顔立ちを固定するファイルは、このページでは扱い方だけを書きます。実在の人物や、権利者の許可が必要なキャラクターのファイルは使いません。作例の \`TRIGGER\` は、手元の説明文に書いてある単語の置き場所です。説明が空なら、その位置には何も書かなくて構いません。`,
      },
      {
        title: 'ファイルの置き場所',
        content: `置き場所が違うと、画面の一覧に出ません。WebUI（Automatic1111）と Forge の初期フォルダは、インストール先の \`models/Lora\` です。L が大文字です。ComfyUI は \`ComfyUI/models/loras\` で、末尾が複数形の小文字です。同じファイルを両方で使うときは、それぞれのフォルダへ置くか、起動オプションで同じ実体を指します。パスの上書きは版によって名前が違います。最新の指定は公式の説明を確認してください。

\`\`\`
WebUI / Forge: models/Lora
ComfyUI: ComfyUI/models/loras
拡張子: .safetensors を優先
\`\`\`

読み込むファイルは \`.safetensors\` を優先してください。\`.ckpt\` は古い形式です。置いたあとは、WebUI と Forge では LoRA の一覧を更新し、ComfyUI では画面の更新ボタンを押します。再起動が要る版もあります。

ベースモデルの一致を、フォルダに入れる前に見ます。SD 1.5 用の LoRA は、SDXL や Illustrious のチェックポイントではほぼ効かないか、絵が崩れます。逆も同じです。配布ページの説明に、対応するベースが書いてあります。説明が無いファイルは、先に小さい強さで一枚だけ試してください。

<a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Automatic1111 のリポジトリ</a>、<a href="https://github.com/lllyasviel/stable-diffusion-webui-forge" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Forge のリポジトリ</a>、<a href="https://docs.comfy.org/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ComfyUI のドキュメント</a>が、フォルダとノードの一次情報です。配布ページには成人向けの作例が含まれることがあります。閲覧には注意してください。このページから、成人向けの作品が集まるサイトへはリンクしません。`,
      },
      {
        title: 'WebUI・Forge での書き方',
        content: `WebUI と Forge では、プロンプトの中に次の形で書きます。ファイル名は拡張子なしです。強さは、多くの画面で 1 が「そのファイルの標準」に近い数字です。このページの最初の一手は 0.7 です。目安であり、最適な値ではありません。

\`\`\`
<lora:ファイル名:0.7>
\`\`\`

トリガーワードは、その LoRA の説明に書かれた単語です。説明に無いファイルもあります。このページの型では、トリガーを人物の直後に置き、\`<lora:...>\` は末尾に置きます。位置で効きが変わるかは、UI とモデルの版によって違います。同じシードで順番だけを入れ替えて見比べてください。

LoRA のタブ（Extra Networks と呼ばれる欄）からカードをクリックすると、プロンプトへ同じタグが挿入される画面があります。Forge にも選択用の欄があります。タブの名前は版で変わるので、挿入された文字列が \`<lora:ファイル名:数字>\` になっているかを見てください。手で書いた名前と、ファイル名の大文字小文字がずれていると、一覧にはあるのに効きません。

**トリガーを人物の直後、LoRA を末尾**

\`\`\`
1 adult woman, adult, TRIGGER, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background, soft daylight,
<lora:example-style:0.7>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

\`TRIGGER\` は説明文の単語に置き換えます。説明にトリガーが無いときは、その語を消して \`<lora:...>\` だけを残します。空白や全角がファイル名に混ざっていると、タグが文字のまま絵に出ることがあります。ファイル名を半角の短い名前にしてから、タグを書き直してください。

ファイル名は、拡張子を外した部分です。\`example-style.safetensors\` なら、タグは \`<lora:example-style:0.7>\` です。サブフォルダに置いたとき、画面によってはフォルダ名を含めた文字列が挿入されます。挿入された文字列を、手で短く削らないでください。削ると、一覧にはあるのに見つからなくなります。クリックで入った行を一度消し、もう一度クリックして、同じ文字列が戻るかを見てから保存します。

トリガーを文の末尾に置くと、人物より背景の語に負けて、顔だけが平均に戻ることがあります。このページでは人物の直後を起点にします。直後で効きすぎて服まで変わるなら、トリガーは残したまま、LoRA の数字だけを 0.1 下げます。語の位置と数字を同じ日に動かさないでください。`,
      },
      {
        title: '強さの目安',
        content: `強さは 0.1 刻みで動かします。シードを固定し、プロンプトの他の語は変えません。服と髪を同じ日に動かすと、LoRA が効いたのかタグが効いたのかが残りません。

| 強さ | 目安の見え方 |
|---|---|
| 0.3–0.4 | 気配だけ。物足りないときの起点にはしない |
| 0.6–0.8 | 最初に試す範囲。このページの作例は 0.7 |
| 1.0 | ComfyUI の strength の初期値として 1.0 が入っていることが多い。効きすぎることがある |
| 1.0 を超える | 顔や手が崩れやすい。0.1 ずつ戻す |

1.0 は「正しい強さ」ではありません。画面の初期値が 1.0 でも、プロンプト側の \`<lora:名前:0.7>\` は別に指定できます。両方を同時に上げないでください。WebUI ではタグの数字が強さです。ComfyUI ではノードの \`strength_model\` と \`strength_clip\` が強さで、プロンプトに \`<lora:>\` を重ねない繋ぎが基本です。

比較は三枚で足ります。0.5、0.7、0.9。0.7 で服まで変わるなら 0.5 に下げ、プロンプトに着たい服を書きます。0.9 でまだ画風だけが弱いなら、ファイルのベースが今のチェックポイントと違う可能性を先に疑ってください。強さを 1.4 まで上げても、ベースが違うファイルは絵柄ではなくノイズに寄ります。

モデル・バージョンによって効きが違うことがあります。同じ 0.7 でも、SD 1.5 用と SDXL 用では見え方が違います。最新のノード名や初期値は公式ドキュメントで確認してください。

三枚を並べるときは、ファイル名を画像の横にメモします。0.5 で気配だけ、0.7 で画風が乗り、0.9 で顔の形まで変わる、なら、そのファイルの常用は 0.7 です。0.5 の時点で服が別物になるファイルは、常用を 0.4 まで下げ、着たい服を本文に残します。数字のメモが無いと比較の翌日に、どの枚がどの強さだったかが消え、また 1.0 からやり直すことになります。

ComfyUI で \`strength_model\` だけを動かして絵が変わらないときは、\`strength_clip\` が 0 になっていないかを見ます。逆に、プロンプトの語は効くのに塗りだけが変わらないときは、model 側が 0 です。両方を同じ数字から始めるのは、どちらの軸が効いているかを後で分けられるようにするためです。`,
      },
      {
        title: 'ComfyUI での使い方',
        content: `ComfyUI では、プロンプトの文字列よりノードの繋ぎが先です。基本は、Load Checkpoint の MODEL と CLIP を Load LoRA に入れ、Load LoRA から出た MODEL を KSampler へ、出た CLIP を CLIP Text Encode へ渡します。チェックポイントの CLIP を、LoRA を通さずにテキストへ直結すると、強さを上げても絵が変わりません。

\`\`\`
Load Checkpoint
  MODEL, CLIP
    -> Load LoRA
      MODEL -> KSampler
      CLIP -> CLIP Text Encode（positive / negative）
\`\`\`

\`strength_model\` は画像側、\`strength_clip\` はテキスト側の効きです。最初は両方 0.7 にします。初期表示が 1.0 のときは、その数字を見てから下げてください。片方だけを 0 にすると、もう片方の効果だけが残ります。どちらを下げるかは、顔が崩れるなら model、プロンプトの語が負けるなら clip、という分け方で試します。これは目安です。

\`\`\`
Load LoRA
lora_name: example-style.safetensors
strength_model: 0.7
strength_clip: 0.7
\`\`\`

複数にするときは、Load LoRA を直列に繋ぎます。一つ目の MODEL と CLIP の出力を、二つ目の Load LoRA の入力に入れます。横に並べて、両方をチェックポイントへ直接戻すと、後から繋いだ一方だけが残るか、エラーになります。繋ぎの絵は版で少し違います。最新の手順は公式ドキュメントで確認してください。

トリガーワードは、ComfyUI でも CLIP Text Encode の本文に書きます。\`<lora:名前:0.7>\` を本文に重ねる必要は、Load LoRA を通しているときは基本的にありません。両方書くと、強さが二重になることがあります。本文にタグが残って画像の隅に文字が出るときは、\`<lora:>\` の行を本文から消してください。`,
      },
      {
        title: '複数の LoRA',
        content: `複数を同時に使うときは、役割を分けます。画風が一つ、服が一つ、までが最初の一手です。画風を二つ、同じ強さで重ねると、塗りが平均の場所で止まります。各ファイルの強さは、単体のときより下げます。二つなら、それぞれ 0.4 から 0.6 が目安です。

\`\`\`
1 adult woman, adult, TRIGGER_CLOTH, black hair, white blouse,
upper body, simple background, soft daylight,
<lora:example-style:0.5> <lora:example-cloth:0.5>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

ComfyUI では同じ役割分担を、直列の Load LoRA 二段で作ります。一段目を画風、二段目を服にし、各 strength を 0.5 にします。

\`\`\`
Load Checkpoint -> Load LoRA (style, 0.5) -> Load LoRA (cloth, 0.5) -> KSampler
\`\`\`

三つ目を足すのは、二つで顔が三枚続けて崩れていないあとです。ポーズ用を足すなら、服の強さをさらに 0.1 下げます。全部を 1.0 のまま足すと、どのファイルが顔を壊したのかが残りません。ベースが違うファイルを混在させないでください。SD 1.5 用と SDXL 用を同じ列に置くと、効かないのではなく、形が溶けます。

Illustrious 用と書かれたファイルは、Illustrious 系のチェックポイントで試します。SD 1.5 の欄に置いても、フォルダが合っているだけではベースは合いません。系統の見分けは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。`,
      },
      {
        title: 'プロンプトとの組み合わせ',
        content: `LoRA は、学習された服や背景をプロンプトより優先することがあります。着たい服と置きたい背景は、LoRA の有無にかかわらず本文に書きます。書かないと、ファイル側の平均の服に戻ります。ポーズを画像で固定したいときは、LoRA より [ControlNetの使い方](/guides/controlnet-guide) が先です。ネガティブの考え方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

**画風だけを足した風景（人物なし）**

\`\`\`
landscape, mountains, lake, pine trees, soft daylight, clear sky,
<lora:example-style:0.7>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

**服の指定を本文に残した肖像**

\`\`\`
1 adult woman, adult, TRIGGER_CLOTH, black hair,
white blouse, cardigan, long skirt,
upper body, looking at viewer, simple background,
<lora:example-cloth:0.6>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**ポーズ用は一つ、手の形は単純に**

\`\`\`
1 adult man, adult, short hair, suit, necktie,
standing, arms at sides, full body, simple background,
<lora:example-pose:0.6>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**背景用を足しても、場所は一つ書く**

\`\`\`
1 adult woman, adult, black hair, coat,
upper body, looking at viewer, indoor, window, soft daylight,
<lora:example-background:0.5>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**線の多い塗りに寄せる**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, simple background, lineart, flat color,
<lora:example-line:0.6>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic
\`\`\`

**写真風の肖像。画風 LoRA が写真を打ち消すときは強さを下げる**

\`\`\`
1 adult woman, adult, black hair, white blouse,
portrait, looking at viewer, soft daylight, photorealistic,
<lora:example-photo:0.5>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

\`example-style\` のような名前は、手元のファイル名に置き換えてください。このページの名前のファイルは配布していません。

**自然文の画面では、LoRA タグは使いません**

\`\`\`
1 adult woman, adult, wearing a white blouse and a cardigan.
Upper body portrait, soft daylight, plain background. Keep the clothing on.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

ChatGPT や Gemini、FLUX のように文で指示する画面に \`<lora:>\` を貼っても、ファイルは読み込まれません。ファイルを足す欄があるときだけ、このページのノードかタグを使います。欄が無いときは、画風を文で一つ書いてください。`,
      },
      {
        title: '効かない・崩れるとき',
        content: `直す順番は、フォルダ、ファイル名、ベース、強さ、繋ぎ、です。強さを先に 1.5 へ上げても、フォルダが違うファイルは現れません。

| 症状 | 先に見ること |
|---|---|
| 一覧に出ない | \`models/Lora\` か \`models/loras\` か。拡張子。一覧の更新 |
| 反映されない | タグのファイル名が拡張子なしで一致しているか。トリガー。ベースの一致。ComfyUI は CLIP が Load LoRA を通っているか |
| 顔が崩れる | 強さを 0.1 下げる。画風を二つ重ねていないか |
| 全員が同じ服 | LoRA が服を引っ張っている。着たい服を本文に書き、強さを下げる |
| 文字として \`<lora:>\` が出る | ファイルが見つかっていない。名前の空白と、フォルダ |
| エラーで止まる | ベースが違う。ファイルが壊れている。公式ログの説明を確認 |

シードを固定したまま、疑わしい原因を一つずつ外します。外しても絵が同じなら、その原因ではありません。ComfyUI でノードを増やした日は、プロンプトを増やす前に、Load LoRA を一度外して土台だけに戻してください。土台だけで崩れている絵は、LoRA の問題ではありません。

ポーズが毎回合わないときは、ポーズ LoRA の強さを上げるより、参照画像で骨格を渡す方が残りやすいです。手順は [ControlNetの使い方](/guides/controlnet-guide) です。手の崩れそのものは [手・指のプロンプト](/guides/hand-finger-prompt-guide) に任せ、このページでは LoRA の段数を減らします。

一覧に名前があるのに絵が変わらないときは、タグの強さが 0 になっていないか、ComfyUI ならそのノードが無効になっていないかを見ます。無効のまま繋ぎだけ直しても、効果は止まります。有効に戻してから、0.7 で一枚だけ生成してください。それでも同じなら、CLIP が Load LoRA を通っていません。チェックポイントからテキストへ直結している線を、Load LoRA の CLIP 出力へ差し替えます。

服が全員同じになる症状は、プロンプトが短いときに強く出ます。\`white blouse\` のような具体的な服を、人数の直後に足してから、もう一枚生成します。足しても同じ服なら、そのファイルは服を強く学習しています。画風だけが欲しい日は、そのファイルを外してください。強さを 0.2 まで下げても服が残るファイルは、役割が画風ではない、と判断して外す方が早いです。`,
      },
      {
        title: '利用規約と権利',
        content: `LoRA にもライセンスがあります。商用利用、再配布、生成物の公開が、ファイルごとに違います。配布ページのライセンスを読んでから使ってください。ページの作例だけを見て、使ってよいとは判断しません。モデルの配布ページには成人向けの作例が含まれることがあるため、閲覧に注意してください。

実在の人物や、権利者の許可が必要なキャラクターの LoRA は、使わないでください。配布もしないでください。有名人の顔、存命の作家の絵柄を名指しで再現するファイル、既存の作品の登場人物を再現するファイルは、このサイトの作例には使いません。絵師の名前をプロンプトに書く使い方も、このページでは扱いません。

自分で学習する場合も、学習元の画像に権利があるなら、その条件に従います。学習手順の解説はここには置きません。読み込んだあとの書き方だけを、このページは担当します。

チェックポイント側のライセンスも別です。LoRA が許可されていても、土台のモデルが非商用なら、生成物の扱いが制限されます。土台の確認は [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) から、各モデルのカードへ進んでください。最新の条文は、公式ドキュメントと配布ページで確認してください。商用に出す前の確認順は [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide)、括弧と LoRA タグの記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。`,
      },
    ],
    faq: [
      {
        q: 'LoRA はプロンプトのどこに書きますか',
        a: 'WebUI と Forge では <lora:ファイル名:強さ> を書きます。このページの型では、トリガーワードを人物の直後、LoRA タグを末尾に置きます。ComfyUI では Load LoRA ノードの繋ぎが本体で、同じタグを本文に重ねないのが基本です。',
      },
      {
        q: '強さはいくつがよいですか',
        a: '最初の目安は 0.6 から 0.8 です。作例は 0.7 にしています。最適な値はファイルごとに違います。シードを固定し、0.1 刻みで三枚比べてください。',
      },
      {
        q: '一覧に出ないときはどこを見ますか',
        a: 'WebUI と Forge は models/Lora、ComfyUI は ComfyUI/models/loras です。置いたあとに一覧を更新してください。拡張子は .safetensors を優先します。',
      },
      {
        q: 'SD1.5 用の LoRA を SDXL で使えますか',
        a: '使えません。ベースが違うと、効かないか、形が溶けます。Illustrious 用は Illustrious 系のチェックポイントで試してください。',
      },
      {
        q: '複数の LoRA が崩れるときはどうしますか',
        a: '役割を画風一つ、服一つまでに減らし、各強さを 0.5 前後まで下げます。三つ目は、二つで顔が安定してから足してください。',
      },
    ],
  },

  'controlnet-guide': {
    sections: [
      {
        title: 'ControlNet とは',
        content: `ControlNet は、参照画像の構造を生成へ渡す仕組みです。ポーズ、輪郭、奥行き、線画のように「形」を固定し、プロンプトは見た目、服、画風、光を担当します。形を文章だけで書こうとして語を増やすより、骨格や線を画像で渡した方が、同じ姿勢が残りやすいです。

役割を混ぜないでください。参照画像が姿勢を決めているのに、プロンプトへ同じ姿勢を三種類書くと、腕が平均の位置に戻ります。プロンプトに残すのは、服、髪、人数、画風、光です。姿勢の単語を全部消す必要はありません。参照と矛盾する姿勢だけを外します。

人物は \`1 adult woman\` か \`1 adult man\`、二人なら \`2 adults\` から書き、\`adult\` を残します。服は閉じた日常着です。タグだけで姿勢を書く入口は [ポーズプロンプト](/guides/stable-diffusion-pose-prompt)、画面に入る範囲は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。参照のポーズ作例は [正面を向いたポーズ](/prompt/pose-correct-face-forward) です。画素を残して描き直す手順は [img2imgの使い方](/guides/img2img-guide) です。ノードで組むときは [ComfyUIの使い方](/guides/comfyui-guide)、欄のある画面は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。

ControlNet のモデルは、チェックポイントのベースと一致させます。SD 1.5 用を SDXL に載せても、構造は乗りません。FLUX には、ControlNet とは別の Canny と Depth のモデルが公式リポジトリにあります。系統を混ぜないでください。土台の見分けは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。`,
      },
      {
        title: '種類と目的別の早見',
        content: `種類は、参照画像のどの情報を残すかで選びます。全部を同時に強くすると、参照の色までコピーされて、プロンプトの服が負けます。最初は一つです。

| 種類 | 残すもの | 向く用途 |
|---|---|---|
| OpenPose / DWPose | 体の骨格。Full は手と顔の点も | 姿勢を別の人物へ移す |
| Canny | 輪郭の線。模様も拾いやすい | 形を残して色や服を変える |
| Lineart / Anime lineart | きれいにした線 | 線画の色塗り |
| Depth | 近いものと遠いもの | 部屋や建物の配置を残す |
| Scribble | 荒いスケッチ | ラフから清書する |
| SoftEdge | 柔らかい境界 | 輪郭は残し、線は硬くしない |
| Tile | 元の配置を拡大時に保つ | 高解像度化のとき |
| Inpaint | マスクした範囲と周囲の構造 | 服の一部だけを描き直す |

SD 1.5 の ControlNet 1.1 では、ファイル名が種類と対応しています。公式の一覧にある名前だけを、ここでは挙げます。

\`\`\`
control_v11p_sd15_openpose
control_v11p_sd15_canny
control_v11p_sd15_lineart
control_v11p_sd15s2_lineart_anime
control_v11f1p_sd15_depth
control_v11p_sd15_scribble
control_v11p_sd15_softedge
control_v11f1e_sd15_tile
control_v11p_sd15_inpaint
\`\`\`

OpenPose の公式の説明では、体だけの Openpose と、体・手・顔の Openpose Full を使い分ける、と書かれています。DWPose は、別の前処理で似た骨格を出す名前です。モデルファイル自体は、ベースに合ったものを選んでください。手の点まで渡すと指は安定しやすい一方、参照の手の形に強く引っ張られます。手のタグ側の直しは [手・指のプロンプト](/guides/hand-finger-prompt-guide) です。

SDXL では、種類ごとの専用ファイルの代わりに、複数の条件を一つのネットワークで扱う Union 系が使われます。公開されている例は <a href="https://huggingface.co/xinsir/controlnet-union-sdxl-1.0" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">xinsir/controlnet-union-sdxl-1.0</a> です。カードは 10 種類以上の条件に対応する、と説明しています。どの前処理名が対応するかは、そのカードで確認してください。ファイルサイズはこのページでは書きません。

最初の一枚は、表の一行だけを選びます。OpenPose で姿勢が残ってから、服の色を変える実験に進みます。姿勢が残っていない段階で Canny を足すと、線と骨格が別の方向を向いて、腕が二本分になります。Tile は拡大の段で足すもので、最初の構図決めには使いません。Inpaint は、残したい範囲と描き直す範囲がマスクで分かれているときだけです。マスクが無い写真に Inpaint のモデルを載せても、服だけを変える役にはなりません。

前処理の名前が画面に二つあるときは、抽出結果の見た目で選びます。骨格の点が見えれば OpenPose 系、細い輪郭なら Canny か Lineart、ぼかした境界なら SoftEdge、濃淡の面なら Depth です。名前が似ていても、抽出結果が写真のままなら、その前処理は動いていません。生成の前に、抽出結果だけを保存してください。`,
      },
      {
        title: '準備',
        content: `先にチェックポイントの系統を決め、それに合う ControlNet だけを置きます。SD 1.5、SDXL、FLUX は別物です。

WebUI のフォルダは \`models/ControlNet\` です。ComfyUI は \`ComfyUI/models/controlnet\` です。前処理（preprocessor）は、参照画像から線や骨格を作る側の処理で、ControlNet のモデルファイルとは別です。

\`\`\`
WebUI: models/ControlNet
ComfyUI: ComfyUI/models/controlnet
ComfyUI の前処理: カスタムノード comfyui_controlnet_aux
\`\`\`

Automatic1111 には、ControlNet の拡張が別途要ります。広く使われているのは sd-webui-controlnet です。Forge は ControlNet を統合して同梱しています。Automatic1111 用の拡張を Forge に重ねて入れる必要は、基本的にありません。Forge の公式 README のステータス表では、Union や Flux 用の行が時期によって未実装になっています。使っている版の一覧にモデルが出るかを確認してください。

<a href="https://github.com/Mikubill/sd-webui-controlnet" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">sd-webui-controlnet</a>、<a href="https://github.com/lllyasviel/stable-diffusion-webui-forge" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Forge</a>、<a href="https://github.com/lllyasviel/ControlNet-v1-1-nightly" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ControlNet 1.1 のリポジトリ</a>、<a href="https://docs.comfy.org/tutorials/controlnet/controlnet" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ComfyUI の ControlNet 手順</a>が一次情報です。ComfyUI のコアだけには、すべての前処理は入っていません。公式チュートリアルも、前処理済みの画像を渡す例と、補助ノードを使う例を分けています。線や骨格を自分で作るなら \`comfyui_controlnet_aux\` を入れます。導入後のメニュー名は版で変わるので、公式ドキュメントで確認してください。`,
      },
      {
        title: 'Forge・WebUI での手順',
        content: `手順は短く保ちます。インストールの細部は、版で画面が変わるため、上の一次情報を見てください。

1. チェックポイントを、ControlNet と同じベースにする。
2. モデルファイルを \`models/ControlNet\` に置き、UI を更新する。
3. ControlNet の欄を有効にし、参照画像を置く。
4. 前処理とモデルを、同じ種類で選ぶ。OpenPose の画像に Canny のモデルは合わせません。
5. Pixel Perfect を使い、Control Weight は 0.8 から 1.0、開始は 0、終了は 1 を目安にする。
6. プロンプトには服と画風を書き、生成する。

\`\`\`
Enable: on
Preprocessor: openpose (or the matching type)
Model: the file for that same type and base
Weight: 0.8
Starting step: 0
Ending step: 1
Pixel Perfect: on
\`\`\`

Control Mode は、最初は Balanced です。プロンプトの服が参照に負けるときは「プロンプトを優先」側、姿勢がプロンプトに負けるときは「ControlNet を優先」側へ一つだけ動かします。両方の極端を同じ日に試すと、どちらが効いたのかが残りません。

開始と終了は、生成のどの区間で参照を効かせるかです。0 が最初、1 が最後、という割合で扱う画面が一般的です。最初だけ参照に寄せ、終わりはプロンプトの塗りに任せるなら、終了を 0.8 前後まで下げます。これは目安です。項目名が Step でも Percent でも、画面の説明が 0 から 1 なら割合です。版によってステップ数そのものを入れる欄もあるので、ラベルを読んでください。

参照画像とプロンプトの人数が違うと、人が増減します。一人の骨格に \`2 adults\` を書かないでください。二人の位置のタグ側は [二人構図](/guides/two-person-composition-prompt-guide) です。`,
      },
      {
        title: 'ComfyUI での手順',
        content: `ComfyUI では、Load ControlNet Model で \`models/controlnet\` のファイルを読み、Apply ControlNet で条件付けに重ねます。公式チュートリアルでは、positive の条件付けに Apply ControlNet を繋ぐ形が示されています。negative にも同じ参照を通すかは、ワークフローによって違います。最新の繋ぎは公式ドキュメントで確認してください。

\`\`\`
Load Image
  -> preprocessor (comfyui_controlnet_aux) if the image is not already a pose or a line
Load ControlNet Model
Apply ControlNet
  conditioning: CLIP Text Encode (positive)
  control_net: Load ControlNet Model
  image: the pose, line, or depth
  strength: 0.8
  start_percent: 0
  end_percent: 1
KSampler
\`\`\`

\`strength\` が WebUI の Weight に近い数字です。\`start_percent\` と \`end_percent\` が、開始と終了の割合です。初期は 0 と 1、つまり全区間です。前処理の解像度を生成サイズに合わせる考え方が、WebUI の Pixel Perfect に近い役割です。ノードの名前は版で違います。

SDXL の Union を使うときは、Load ControlNet Model に Union のファイルを指定し、前処理だけを目的の種類にします。SD 1.5 の \`control_v11p_sd15_openpose\` を、SDXL のチェックポイントへ繋がないでください。読み込めても、姿勢は乗りません。

前処理済みの画像を自分で用意できるなら、補助ノードは省略できます。公式チュートリアルも、その前提で例を置いています。省略したときに色が参照のまま残るのは、線や骨格ではなく元の写真を渡しているときです。渡す画像が写真なのか、抽出した線なのかを、先に確認してください。`,
      },
      {
        title: '設定の目安',
        content: `数字は、画面の初期値と、よく使う範囲です。最適値の測定結果ではありません。

| 項目 | 目安 | 役割 |
|---|---|---|
| Control Weight / strength | 0.8–1.0 | 参照の効き。初期は 1.0 の画面が多い |
| Starting / start_percent | 0 | 最初から参照を使う |
| Ending / end_percent | 1 | 最後まで参照を使う |
| Control Mode | Balanced | プロンプトと参照のバランス |
| Pixel Perfect | オン | 前処理の解像度を生成側へ寄せる |

Weight を 1.2 以上にしても姿勢が乗らないときは、モデルのベースが違います。数字を上げる前に、ファイル名の \`sd15\` と、今のチェックポイントの系統を見比べてください。

姿勢は乗るのに、服が参照画像の服のままになるときは、Weight を 0.7 まで下げるか、終了を 0.8 にして、プロンプトの服を人数の直後へ移します。画風まで参照に引っ張られるときも同じです。参照は構造だけに戻し、塗りはプロンプトへ返します。

手だけが崩れるときは、OpenPose Full のように手の点がある前処理へ切り替え、プロンプトの手のポーズは一つにします。点の無い Canny で指を精密に再現しようとすると、線は残っても本数が増えやすいです。指のネガティブは [手・指のプロンプト](/guides/hand-finger-prompt-guide) と併用します。

モデル・バージョンによって効きが違うことがあります。Union が Forge の一覧に出るかも、版に依存します。最新の項目名は公式ドキュメントで確認してください。

比較する日は、抽出済みの骨格や線を固定します。毎回抽出し直すと、関節が少しずつ動き、服を変えたのか姿勢が変わったのかが残りません。固定した参照に対して、プロンプトの服だけを差し替えた二枚を見てください。二枚で姿勢が同じなら、ControlNet は仕事をしています。姿勢まで変わるなら、Weight が低いか、参照が KSampler まで届いていません。

参照の色が残るのは、失敗というより、写真そのものを渡しているときによく起きます。線や骨格のプレビューに、服の模様まで残っているなら、その模様はプロンプトより優先されやすいです。模様を消した線に作り直してから、もう一度同じプロンプトを通してください。Weight を 1.3 まで上げても、渡している画像が構造でなければ、構造にはなりません。`,
      },
      {
        title: 'プロンプトとの組み合わせ',
        content: `六つの型は、ControlNet が構造、プロンプトが見た目、という分け方です。参照画像は、自分で撮影したもの、自分で描いたもの、使用が許されたものだけを使ってください。

**姿勢を成人の人物へ移す**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

姿勢の語は参照に任せ、プロンプトは服と光だけにしています。カメラの高さを文章で足すなら [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) から一つです。

**線画に色を塗る**

\`\`\`
1 adult woman, adult, black hair, white blouse, long skirt,
flat color, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic
\`\`\`

Lineart か Anime lineart を使い、線のモデルに写真の前処理を混ぜません。

**奥行きは残して、服だけを変える**

\`\`\`
1 adult woman, adult, black hair, navy coat,
upper body, looking at viewer, indoor, window
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

Depth で部屋の配置を残し、コートはプロンプト側に書きます。参照画像の服の色が残るときは、Weight を下げます。

**二人の姿勢**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
white blouse, suit, necktie, standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\`

参照の人数と \`2 adults\` を一致させます。二人の距離の語は [二人構図](/guides/two-person-composition-prompt-guide) です。男性二人の姿勢集は [BLポーズ](/guides/bl-pose-collection-guide) ですが、ControlNet を使うときも参照画像の権利は同じです。

**建物の奥行きを残す（人物なし）**

\`\`\`
building exterior, stone wall, front view, soft daylight, clear sky
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

**配置を保ったまま細部を増やす**

\`\`\`
1 adult woman, adult, black hair, white blouse,
portrait, looking at viewer, soft daylight, detailed
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

Tile は、元の配置を崩さずに拡大や再描画へ進むときの種類です。倍率の推奨値はここには書きません。UI の拡大手順に合わせてください。

**自然文。構造は参照画像、文章は見た目**

\`\`\`
1 adult woman, adult, wearing a white blouse and a cardigan.
Keep the pose from the reference image. Change only the clothing and the lighting.
Soft daylight, plain background. Keep the clothing on.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

ChatGPT や Gemini に参照画像を渡せる画面では、姿勢を文章で繰り返さず、残すものと変えるものを一文で分けます。FLUX の Canny と Depth は ControlNet のファイルではありません。公式リポジトリの、そのモデル用の手順を使ってください。`,
      },
      {
        title: 'うまくいかないとき',
        content: `症状ごとに、数字を上げる前に見る場所が違います。

| 症状 | 先に見ること |
|---|---|
| 反映されない | 欄が有効か。モデルと前処理の種類が同じか。ベースが一致しているか。ComfyUI は Apply が positive に繋がっているか |
| 姿勢が崩れる | 参照が写真のままになっていないか。前処理の結果の骨格を見て、関節が欠けていないか。Weight を 0.1 上げるのはそのあと |
| 手が崩れる | 手の点が無い前処理になっていないか。プロンプトの手のポーズを一つにする |
| 画風が参照に引っ張られる | Weight を下げる。終了を 1 より前で切る。プロンプトの画風を人数の直後へ移す |
| 人数が増える | 参照の人数とプロンプトの人数が違う |
| エラーで止まる | SD 1.5 用ファイルを SDXL に載せている、などベースの不一致 |

前処理のプレビューが出る画面では、生成の前にそのプレビューを見てください。骨格が折れている画像を渡すと、生成側も折れます。プレビューが真っ黒なら、前処理のモデルがダウンロードできていません。サイズの数字を変えるより、補助ファイルの取得を先に確認します。取得先は、使っている拡張の説明に従ってください。

LoRA と同時に使うときは、ControlNet で姿勢が三枚安定してから、LoRA の強さを 0.5 前後で足します。同じ日に両方の強さを動かすと、原因が分かれません。書き方は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

反映されない、と見える枚の半分は、欄がオフのままです。WebUI では Enable、ComfyUI では Apply ControlNet が条件付けに繋がっているか、を生成ボタンの前に見ます。繋がっていても、チェックポイントを SDXL に変えたあとで SD 1.5 のファイルが選ばれたままだと、姿勢は乗りません。モデルを切り替えた日は、ControlNet のファイル名をもう一度読んでください。\`sd15\` が残っていたら、そのベース用ではありません。

手が画面の端で切れている参照は、指の点が欠けます。欠けた点を渡すと、生成側も欠けます。参照を引きで撮り直すか、手を骨格の内側に入れてから抽出してください。プロンプトに \`detailed hands\` を足しても、欠けた点は戻りません。`,
      },
      {
        title: '権利の注意',
        content: `参照画像は、自分で撮影したもの、自分で描いたもの、使用が許されたものだけにしてください。他人の写真、既存の作品の画面、権利者の許可が必要なキャラクターの立ち絵を、そのまま ControlNet に入れないでください。構造だけを抽出しても、元の画像の権利が消えるわけではありません。

出力を公開するときは、チェックポイントと ControlNet ファイルのライセンスも確認します。商用利用と、生成物の条件はモデルごとに違います。配布ページには成人向けの作例が含まれることがあります。閲覧に注意してください。このページは、ファイルの入手先を特定の成人向けサイトへは案内しません。

実在の人物の写真から姿勢以外の顔まで移したい、という使い方はここには書きません。姿勢の骨格と、服や光のプロンプトを分ける、までがこのページの範囲です。最新のライセンスは、各モデルの公式ページで確認してください。

公開する前に、参照画像の出所を自分のメモに残します。自分で描いた線画、自分で撮った姿勢、使用が許された素材、のどれかです。メモが無い画像は、生成の前に外してください。抽出した骨格だけを保存して元の写真を捨てても、元の写真に権利があれば、使ってよいことにはなりません。骨格は手段で、許諾の代わりにはなりません。

出力側も同じです。ControlNet のファイルが商用を許していても、チェックポイントが非商用なら、公開の条件は厳しい方に合わせます。両方のカードを開いて、商用の行だけを読んでから、公開用のフォルダへ移してください。試しの枚と公開の枚を混ぜると、後からどちらのライセンスだったかが消えます。`,
      },
    ],
    faq: [
      {
        q: 'ControlNet とプロンプトは何を分担しますか',
        a: 'ControlNet が姿勢や線や奥行きなどの構造、プロンプトが服、髪、画風、光です。同じ姿勢を両方で強く書かないでください。',
      },
      {
        q: 'Forge にも拡張が要りますか',
        a: 'Forge は ControlNet を統合して同梱しています。Automatic1111 には sd-webui-controlnet のような拡張が別途要ります。Union や Flux の対応は版によって違うので、公式リポジトリの説明を確認してください。',
      },
      {
        q: 'モデルはどこに置きますか',
        a: 'WebUI は models/ControlNet、ComfyUI は ComfyUI/models/controlnet です。ComfyUI で線や骨格を作る前処理は、comfyui_controlnet_aux などの補助ノードです。',
      },
      {
        q: 'SD1.5 用の OpenPose を SDXL で使えますか',
        a: '使えません。control_v11p_sd15_openpose は SD 1.5 用です。SDXL では Union のように、そのベース用のファイルを使ってください。',
      },
      {
        q: '効いているのに服が参照のままなのはなぜですか',
        a: 'Weight が高すぎるか、参照が最後まで効いているためです。Weight を下げるか、終了を 1 より前にして、着たい服をプロンプトに書いてください。',
      },
      {
        q: '参照画像は何を使ってよいですか',
        a: '自分で撮影または作成したもの、使用が許されたものだけです。他人の作品や、許可のない人物写真は使わないでください。',
      },
    ],
  },

  'stable-diffusion-model-list': {
    sections: [
      {
        title: 'モデル（チェックポイント）とは',
        content: `「stable diffusion モデル一覧」で並んでいる名前は、ほとんどがチェックポイントです。チェックポイントは、絵を生成する土台のファイルです。LoRA は、その土台に後から足す小さな差分です。土台が違えば、同じプロンプトでもタグの効き方が変わります。このページは、系統の見分けと、系統ごとの書き方を担当します。LoRA の \`<lora:>\` の書き方は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

選ぶときに見るのは三つです。ベースの系統、タグか自然文か、ライセンス。星の数や人気の順位はこのページでは扱いません。配布ページの作例には成人向けが含まれることがあります。閲覧に注意してください。商用利用と、生成物の公開条件は、モデルごとのライセンスを必ず確認してください。

人物の例は、どの系統でも同じ成人の肖像に揃えます。\`1 adult woman, adult\` から書き、服は白いブラウスとカーディガンです。比較するときに服まで変えると、モデルの差なのか服の差なのかが残りません。品質タグの詳細は [品質タグ一覧](/guides/quality-tags-prompt-guide)、アニメの顔の語は [アニメプロンプト](/guides/anime-prompt-guide)、塗りは [画風プロンプト](/guides/art-style-prompt-guide) です。確認の順番は [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide)、サンプラーの目安は [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) です。ファイルを置く画面は [ComfyUIの使い方](/guides/comfyui-guide) と [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。SDXL の解像度、VAE、Refiner は [SDXLとは](/guides/sdxl-guide) に分け、このページは系統の見分けを担当します。`,
      },
      {
        title: 'ベースモデルの系統',
        content: `下の表は、公式のモデルカードか公式リポジトリで確認できた事実だけです。速度や必要なメモリの数字は、カードに書かれていてもこの表には載せていません。環境で変わるためです。

| 系統 | 位置づけ | プロンプト | ライセンス |
|---|---|---|---|
| SD 1.5 | 512×512 を基準に追加学習された画像生成モデル | カンマ区切りのタグが中心 | CreativeML OpenRAIL-M |
| SDXL 1.0 | 1024 を基準にした後続のベース | タグに、短い文を混ぜられる | CreativeML Open RAIL++-M |
| SD 3.5 Large | MMDiT。カードは文章理解の改善を特徴に挙げている | 自然な英語が中心。タグも併用できる | Stability AI Community License |
| FLUX.1 [schnell] | 文章から画像を作る公開モデル | 自然な英語。標準の手順ではネガティブを使わない | Apache 2.0 |
| FLUX.1 [dev] | 同じ系統の別モデル | 自然な英語 | 非商用ライセンス |
| FLUX.2 [dev] | 生成に加え、参照画像の編集も公式の表にある | 自然な英語 | 非商用ライセンス |
| FLUX.2 [klein] 4B | FLUX.2 系統の公開モデル | 自然な英語 | Apache 2.0 |

SD 1.5 のカードは <a href="https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stable-diffusion-v1-5</a>、SDXL は <a href="https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stable-diffusion-xl-base-1.0</a>、SD 3.5 Large は <a href="https://huggingface.co/stabilityai/stable-diffusion-3.5-large" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stable-diffusion-3.5-large</a> です。FLUX.1 の一覧は <a href="https://github.com/black-forest-labs/flux" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">black-forest-labs/flux</a> にあります。FLUX.2 の表は公式リポジトリ black-forest-labs/flux2 です。リンクはそこを確認してください。

SD 3.5 の Community License には、研究・非商用に加え、年間売上の条件を超えると別契約になる、という条文があります。金額の閾値は公式ライセンスで確認してください。FLUX.1 [dev] と FLUX.2 [dev] の非商用ライセンスは、商用に使う前に公式の許諾が要ります。schnell と klein 4B が Apache 2.0 だからといって、dev まで同じ、ではありません。

FLUX.1 [schnell] のカードには、1 から 4 ステップで生成できる、と書かれています。これはカードの記載であり、手元の環境の速度の保証ではありません。他のモデルのステップ数をこの数字に揃えないでください。`,
      },
      {
        title: 'アニメ・イラスト向け',
        content: `アニメ向けは、SDXL を土台に追加学習した系統が中心です。名前が似ていても、推奨タグはカードごとに違います。

| モデル | 系統 | 書き方 | ライセンス |
|---|---|---|---|
| Animagine XL 4.0 | SDXL 1.0 から学習 | タグ。品質の語は末尾。カードは自然文の効きが弱いと書いている | CreativeML Open RAIL++-M |
| Illustrious XL | SDXL 系のイラスト向け | タグと自然文。版によって重視が違う | 版で表記が違う。下記 |
| NoobAI-XL | アニメ向けとして公開されている SDXL 系 | 推奨タグは配布ページで確認 | 配布ページで確認 |

Animagine XL 4.0 のカードは <a href="https://huggingface.co/cagliostrolab/animagine-xl-4.0" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">cagliostrolab/animagine-xl-4.0</a> です。品質として末尾に置くよう書かれている語は、\`masterpiece, high score, great score, absurdres\` です。推奨ネガティブもカードに列があり、次の節で年齢の除外語を足して転記します。カードは CFG 5、ステップ 28、サンプラー Euler a を推奨値として挙げています。他のモデルの数値を、このまま流用しないでください。基準の解像度は 1024 で、縦長と横長の候補がカードに列挙されています。ピクセルの一覧はカードを見てください。

Illustrious の v0.1 カードは fair-ai-public-license です。v1.1 のカードは、ライセンス先として SDXL のライセンスを指しています。派生モデルによって推奨タグもライセンスも違います。よく見る並びとして \`masterpiece, best quality\` に \`absurdres\` や \`highres\`、\`newest\` を足す書き方があります。ベースのカードが必須とは書いていません。v0.1 が対応として挙げている品質タグの転記は [Illustriousプロンプト](/guides/illustrious-prompt-guide) です。読み込んだファイルのカードを優先してください。

NoobAI-XL は、アニメ向けのチェックポイントとして公開されています。このページでは推奨タグを断定しません。ライセンスとタグは配布ページで確認してください。配布ページには成人向けの作例が含まれることがあります。

同じ「アニメ向け」でも、Animagine の末尾のスコアタグを Illustrious 系へ貼ると、カードが知らない語として無視されることがあります。逆に、Illustrious 系でよく見る \`highres\` を Animagine の推奨の代わりにすると、カードが指定した \`high score\` が抜けます。系統の表で名前を決めたあとは、その行の書き方だけをコピーし、隣の行の品質タグは消してください。消さずに両方残すと、どちらが効いたのかが残りません。

派生ファイルは、ベースの名前をファイル名に含んでいないことがあります。読み込んだあと、画面のモデル情報やカードの「fine-tuned from」に SDXL とあるかを見ます。SD 1.5 と書いてあるアニメモデルを、1024 の枠で回すと、体が重複しやすいです。解像度は、アニメか写真かではなく、ベースの系統で決めます。`,
      },
      {
        title: '写真風のモデル',
        content: `写真風は、ベース自身でも指定できます。追加学習された写真向けチェックポイントも多くありますが、配布ページの作例が成人向けに寄っていることがあります。このページでは名前を挙げて推奨せず、ベースで写真風を書く手順にします。製品、風景、成人の肖像、の三つに用途を分けてください。

| 用途 | まず使う系統 | 書き方 |
|---|---|---|
| 成人の肖像 | SDXL、SD 3.5、FLUX | 服を着た胸から上。\`photorealistic\` か、写真だと分かる文 |
| 製品 | 同上 | 物の名前を一つ。人物を入れない |
| 風景 | 同上 | 場所を一つ。人物の行を書かない |
| 写真向けの派生 | ベースが SD 1.5 か SDXL かを配布ページで確認 | ライセンスは配布ページで確認 |

派生を使うときは、SD 1.5 用を SDXL の欄に置かないでください。置き場所が合っていても、系統が違うと絵が溶けます。ライセンスがベースの OpenRAIL のままとは限りません。派生のページに、追加の条件が書いてあることがあります。

写真風でも、このサイトの人物は成人です。年齢を下げる語は入れません。肌の質感の語を足すなら [肌の質感プロンプト](/guides/skin-texture-prompt-guide) を、アニメ塗りへ戻すなら画風のページを開いて、\`photorealistic\` は外してください。両方を同じ強さにすると、顔の半分だけが別の媒体になります。`,
      },
      {
        title: 'モデル別のプロンプト',
        content: `同じ人物で、系統だけを変えます。ファイル名の \`example\` は手元のチェックポイントに読み替えてください。

**SD 1.5。タグと、よく一緒に置かれる品質の語**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background, soft daylight,
masterpiece, best quality
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
worst quality, low quality
\`\`\`

解像度の起点は 512 です。1024 のまま生成すると、体が重複しやすいです。

**SDXL。起点は 1024**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background, soft daylight,
masterpiece, best quality
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
worst quality, low quality
\`\`\`

**Animagine XL 4.0。品質の語は末尾。カードの推奨ネガティブに年齢の語を足している**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background, soft daylight, safe,
masterpiece, high score, great score, absurdres
\`\`\`

ネガティブ:

\`\`\`
lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry,
${NEGATIVE_AGE}
\`\`\`

カードには内容の区分を示す rating の語があります。このサイトの例では、服を着た成人だけを書き、\`safe\` を品質の語の前に一つ置きます。それ以外の区分は使いません。

**Illustrious 系の派生でよく見る並び。必須ではない**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background,
masterpiece, best quality, absurdres, highres
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
worst quality, low quality
\`\`\`

\`newest\` を足す派生もあります。カードが挙げていなければ、足さなくて構いません。

**SD 3.5。自然な英語を先にする**

\`\`\`
1 adult woman, adult, black hair, wearing a white blouse and a cardigan.
Upper body portrait, looking at the camera, plain background, soft daylight.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**FLUX。標準の手順ではネガティブ欄を使いません**

\`\`\`
1 adult woman, adult, black hair, wearing a white blouse and a cardigan.
Upper body portrait, looking at the camera, plain background, soft daylight. Keep the clothing on.
\`\`\`

UI にネガティブ欄がある実装だけ、次を入れます。標準の FLUX 手順ではこの欄自体が無いことが多いです。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**人物なしの製品。系統は問わず、物を一つ**

\`\`\`
a white ceramic cup on a wooden table, soft daylight, product photo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, watermark
\`\`\`

ChatGPT や Gemini で同じ肖像を頼むときは、FLUX の文をそのまま使い、\`<lora:>\` や重みの括弧は外します。`,
      },
      {
        title: '目的別の選び方',
        content: `フローは、目的から系統へ戻すだけです。名前の新しさでは選びません。

| 目的 | 系統 |
|---|---|
| タグでアニメの人物を描く | Animagine XL 4.0 か、Illustrious 系。推奨タグはカード |
| 文章で写真、製品、風景を描く | FLUX、または SD 3.5 |
| 手元の LoRA と拡張が SD 1.5 用 | SD 1.5。SDXL 用の LoRA は流用しない |
| 姿勢を参照画像で固定する | そのベース用の ControlNet。手順は [ControlNetの使い方](/guides/controlnet-guide) |
| 商用で公開する | ライセンスが商用を許す系統だけ。dev と書かれた FLUX は先に許諾を確認 |

アニメにしたいのに FLUX の文をタグの列へ貼ると、人数が落ちます。逆に、SD 3.5 や FLUX に Danbooru 形式の長いタグだけを渡すと、文向けのモデルでは情報が薄くなります。系統が決まったあとに、書き方の節の対応するブロックをコピーしてください。

Illustrious の派生を使う日は、このページの「よく見る並び」より、そのファイルのカードを先に読みます。カードとこの表が違うときは、カードが優先です。品質タグを何個まで積むかは [品質タグ一覧](/guides/quality-tags-prompt-guide) に合わせ、二つを超えて肌が崩れるなら減らします。

選び方を一文にすると、タグで服と髪を固定したいなら SDXL 系のアニメモデル、文章で場面を書きたいなら FLUX か SD 3.5、です。両方を同じ日に試すのは、同じ文章をタグへ翻訳できるかを見るときだけにしてください。翻訳できない文は、そのモデルでは指定になっていません。指定になっていない文を、品質タグで補わないでください。品質タグは上手さの語で、主題の代わりにはなりません。

商用の可否で迷うときは、生成の前にライセンスの行だけをメモします。メモが「配布ページで確認」のままのファイルは、公開用の枚には使いません。個人の試しと、公開用のファイルをフォルダで分けておくと、後からライセンスを読み直す場所が残ります。`,
      },
      {
        title: '入れ方と切り替え',
        content: `チェックポイントのフォルダは、LoRA や ControlNet とは別です。

\`\`\`
WebUI / Forge: models/Stable-diffusion
ComfyUI: ComfyUI/models/checkpoints
拡張子: .safetensors を優先
\`\`\`

\`.safetensors\` を使ってください。\`.ckpt\` は古い形式で、読み込み時の安全性が劣ります。置いたあとに一覧を更新し、WebUI と Forge では上部のモデル選択を切り替えます。ComfyUI では Load Checkpoint のファイル名を変えます。切り替えは、生成の途中ではなく、次の一枚の前に行ってください。

\`\`\`
ComfyUI: Load Checkpoint -> CLIP Text Encode -> KSampler
WebUI / Forge: 画面上部のチェックポイント一覧
\`\`\`

同じフォルダに SD 1.5 と SDXL を置いてよいですが、LoRA と ControlNet は、今選んでいるチェックポイントの系統に合わせます。ファイル名にベースが分かる語を残すと、切り替えのミスが減ります。名前の付け方に公式の必須規則はありません。自分が後から見て系統が分かれば足ります。

VAE は、色が薄いときに、そのモデルのカードが指定するファイルを読み込みます。指定がカードに無いときは、UI の初期のままにしてください。別系統の VAE を当てると、色が割れます。ファイル名の一覧はこのページでは作りません。カードの記載を見てください。`,
      },
      {
        title: 'ライセンスと利用上の注意',
        content: `ライセンスは、モデルを使えるかだけではなく、生成物を公開できるか、商用にできるか、派生モデルを再配布できるか、まで違います。表に書いた名前は、2026-11-03 に公式カードか公式リポジトリで確認したものです。派生ファイルは、ベースのライセンスを継承していないことがあります。読み込んだファイルのページを、その都度見てください。

確認する行は次です。商用が許されるか。生成物に権利主張が残るか。派生を公開するときに同じライセンスが要るか。成人向けの出力を禁じる条項があるか。条文が英語のときは、公式の原文を優先し、このページの要約だけで判断しないでください。

モデルの配布ページには成人向けの作例が含まれることがあるため、閲覧に注意してください。実在の人物、存命の作家、既存の作品のキャラクターを、モデルの売りとして使わないでください。絵師の名前をプロンプトに書いて画風を借りる書き方も、このページでは扱いません。

最新の仕様と条文は、公式ドキュメントと各モデルカードで確認してください。このページの表は、確認した時点の要約です。

要約を使うときは、表のライセンス列が「配布ページで確認」の行を、確認済みと扱わないでください。NoobAI-XL や、写真向けの派生は、その列です。名前を知っていることと、条件を読んだことは別です。読んだ日付をファイル名の横に残すと、次にカードが更新されたときに、古い要約のまま公開する事故が減ります。

生成物を他人の作品へ混ぜる、実在の人物に見せる、既存のキャラクターの名前をプロンプトに足す、はモデルのライセンス以前に、このサイトの作例ではやりません。ライセンスが商用を許していても、その三つの使い方はここには書きません。`,
      },
      {
        title: 'うまくいかないとき',
        content: `絵柄が出ない、色が違う、体が重複する、の三つが、系統の取り違えで起きます。

| 症状 | 先に見ること |
|---|---|
| アニメのタグが無視される | 今のモデルが FLUX や SD 3.5 ではないか。自然文へ戻す |
| 品質タグを足しても変わらない | そのカードが別の語を指定していないか。Animagine は high score と great score |
| 体が二つになる | SD 1.5 なのに 1024 で生成していないか。起点は 512。SDXL の起点は 1024 |
| 色が薄い、色が割れる | カード指定の VAE か。別系統の VAE を外す |
| LoRA が効かない | LoRA のベースが、今のチェックポイントと違う |
| 顔が毎回別人 | チェックポイントを切り替えたあと、前の品質タグが残っている |

品質タグを先頭に置くか末尾に置くかも、モデルで違います。Animagine XL 4.0 のカードは末尾を勧めています。Illustrious のベースは、先頭を必須とは書いていません。一つの並びを全モデルへコピーしないでください。

ネガティブを長くしても、正向に残った矛盾は消えません。系統を疑う日は、ネガティブをこのページの短い行に戻し、チェックポイントだけを変えて三枚見ます。三枚で差が無いなら、見ているファイルが切り替わっていません。一覧の更新を確認してください。ポーズを画像で固定したい段階になったら [ControlNetの使い方](/guides/controlnet-guide)、差分ファイルを足す段階になったら [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

三枚の比較は、同じシード、同じ文、同じ解像度で行います。SD 1.5 の 512 と SDXL の 1024 を同じピクセル数で比べると、系統の差ではなく解像度の差を見ます。系統を見たい日は、それぞれの起点の解像度に戻してから生成してください。起点に戻しても体が重複するなら、プロンプトに人数が二つ書いていないかを見ます。\`1 adult woman\` が二回あると、モデルは二人を描こうとします。

色が薄い枚は、品質タグを足す前に VAE を見ます。カードが VAE のファイル名を指定しているなら、それだけを読みます。指定が無いのに、別の系統で使っていた VAE が選ばれたまま、ということがあります。UI の VAE を初期に戻して一枚生成し、まだ薄いときだけカードの指定を探してください。`,
      },
    ],
    faq: [
      {
        q: 'チェックポイントと LoRA の違いは何ですか',
        a: 'チェックポイントが絵の土台で、LoRA はその土台に足す差分です。LoRA は土台の系統と揃えます。SD 1.5 用を SDXL では使いません。',
      },
      {
        q: 'アニメにはどの系統が向きますか',
        a: 'タグで描くなら、Animagine XL 4.0 や Illustrious 系のような SDXL のアニメ向けモデルです。推奨タグはモデルカードを優先してください。派生によって違います。',
      },
      {
        q: 'FLUX にネガティブは要りますか',
        a: '標準の手順では使いません。自然な英語で、描きたいものを書きます。UI によっては欄が残っていることがあるので、その実装の説明を確認してください。',
      },
      {
        q: 'ファイルはどこに置きますか',
        a: 'WebUI と Forge は models/Stable-diffusion、ComfyUI は ComfyUI/models/checkpoints です。拡張子は .safetensors を優先します。',
      },
      {
        q: '商用で使ってよいモデルはどれですか',
        a: 'ライセンスごとに違います。SDXL は CreativeML Open RAIL++-M、FLUX.1 schnell は Apache 2.0、FLUX.1 dev は非商用、SD 3.5 は Community License です。売上条件や派生の条件は、公式の原文を確認してください。',
      },
    ],
  },

  'novelai-prompt-guide': {
    sections: [
      {
        title: '基本の順番',
        content: `「novelai 呪文」は、NovelAI の画像プロンプトです。Stable Diffusion と同じカンマ区切りでも、強調の記号と、二人を描き分ける欄が別です。このページは書き方の早見と、テーマ別の入口です。個別のタグの衝突は、各ガイドへ渡します。全体のカテゴリは [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list)、Stable Diffusion 側の順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide) です。

このページの型は、品質、人物、髪、服、構図、背景、光です。公式がこの順を必須にしているわけではありません。直すときに、どの層を触ったかが残るように分けています。品質の語はバージョンで違います。\`masterpiece\` や \`best quality\` の対応範囲は [品質タグ一覧](/guides/quality-tags-prompt-guide) です。悪い側は [ネガティブプロンプト](/guides/negative-prompt-guide) と、このページの Undesired Content に置きます。WebUI 側の括弧と BREAK は [プロンプトの記号の意味](/guides/prompt-symbols-guide) にまとめています。

本サイトでは成人のキャラクターを明示するため \`adult\` を入れた書き方で統一しています。公式ドキュメントの例にある \`1girl\` は使いません。

**一人の型**

\`\`\`
best quality,
1 adult woman, adult, black hair, long hair,
white blouse, cardigan,
upper body, looking at viewer,
simple background, soft daylight
\`\`\`

除外したい要素（Undesired Content）:

\`\`\`
${NEGATIVE_AGE},
${NEGATIVE_BODY}
\`\`\`

最新のモデル名は、画面の選択と公式ドキュメントで確認してください。このページでは、機能が載った時期を「V4 以降」「V4.5 以降」と書きます。V5 という名前も、複数人の公式説明に出てきます。細かい上限は版で変わるので、生成前にドキュメントを見てください。

順番を守る理由は、直す場所を一つにするためです。髪が違う日は髪の語だけを動かし、服が違う日は服だけを動かします。品質の語を先頭に五個並べたプロンプトは、髪を一つ変えても絵全体が揺れます。揺れを止めるには、品質を \`best quality\` 一つに戻し、人物から光までの行を短くしてから、今日の一語を足します。短くした型を別名で保存し、実験用の長い呪文とは混ぜないでください。

テーマ別の節は、この型に一語足した入口です。入口の一語で足りなくなったら、リンク先のガイドで衝突を読み、戻ってきたときには足した語を一つだけにします。ガイドを三ページ分コピーすると、\`adult\` が後ろへ押し出されて、人数から崩れます。`,
      },
      {
        title: '強調と弱め',
        content: `公式の強調は、波括弧、角括弧、数値の \`::\` です。Stable Diffusion の \`(tag:1.2)\` は、NovelAI の強調ではありません。貼り替えると、括弧が文字として扱われるか、意図と違う強さになります。

<a href="https://docs.novelai.net/en/image/strengthening-weakening/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Strengthening & Weakening</a> では、\`{ }\` で囲むと注目が 1.05 倍、\`[ ]\` で囲むと 1.05 で割る、と説明されています。重ねるとその都度掛け合わされます。\`{{tag}}\` は 1.05 の二回分です。Undesired Content の中では、\`{ }\` の方がより避けられ、\`[ ]\` の方は避け方が弱くなります。正向と除外で、括弧の意味が逆転して見えるので、除外側ではまず括弧を使わないでください。

\`\`\`
1 adult woman, adult, {{white blouse}}, cardigan, upper body, simple background
\`\`\`

\`\`\`
1 adult woman, adult, white blouse, [cardigan], upper body, simple background
\`\`\`

数値強調は V4 以降です。\`1.5::\` から次の \`::\` までが、その倍率です。1 未満は弱めます。\`::\` は、開きっぱなしの括弧を閉じる役割も公式に書かれています。

\`\`\`
1 adult woman, adult, 1.5::white blouse ::, cardigan, upper body, simple background
\`\`\`

\`\`\`
1 adult woman, adult, white blouse, 0.6::cardigan ::, upper body, simple background
\`\`\`

負の数値は V4.5 以降です。公式の説明では、外したい物を \`-1::hat ::\` のように書くと、その概念を外す方向に働きます。Undesired Content の全面的な代わりではありません。ピンポイントで外すときに使います。

\`\`\`
1 adult woman, adult, black hair, white blouse, -1::hat ::, upper body, simple background
\`\`\`

| 書き方 | 公式の説明 | 時期 |
|---|---|---|
| \`{tag}\` | 1.05 倍 | 強調の基本 |
| \`[tag]\` | 1.05 で割る | 弱める |
| \`1.5::tag ::\` | 数値で強める | V4 以降 |
| \`0.6::tag ::\` | 1 未満で弱める | V4 以降 |
| \`-1::tag ::\` | 負の強調 | V4.5 以降 |
| \`(tag:1.2)\` | NovelAI の強調ではない | Stable Diffusion 側 |

同じタグに、波括弧と数値強調を同じ日に重ねないでください。どちらが効いたのかが残りません。強めすぎると、手が崩れ、服の形が画面いっぱいになります。1.5 で足りなければ、語を人数の近くへ動かす方が先です。モデル・バージョンによって効きが違うことがあります。最新の記号は公式ドキュメントで確認してください。`,
      },
      {
        title: 'キャラクタープロンプト',
        content: `複数人は、V4 以降のキャラクタープロンプトで分けます。公式の説明では、ベースプロンプトが場面と画風、各キャラクターの欄がその人の見た目です。欄は、プロンプトの下の追加ボタンで増やします。情報の漏れは、その人の Undesired Content に、漏れた語を書いて抑えます。

<a href="https://docs.novelai.net/en/image/multiplecharacters/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Multi-Character Prompting</a> では、並び順が上から下、画面では左から右に寄りやすい、と書かれています。\`side-by-side\` のとき、最初の欄が左、次の欄が右、になりやすい、という例です。位置は AI 任せから Custom に変え、キャンバスで指定できます。V4 と V4.5 のカスタム位置は 5×5 のグリッドまで、と同じページにあります。V5 の人数は 22 人まで、V4 は 6 人まで、とも書かれています。上限は変わることがあるので、最新の仕様は公式ドキュメントで確認してください。

公式は、人数のタグをベースに置き、各欄では人数なしの種別だけを書く、と案内しています。本サイトでは、ベースに \`2 adults\`、各欄に \`adult woman\` または \`adult man\` を置きます。

**ベース**

\`\`\`
2 adults, side-by-side, indoors, simple background, soft daylight, best quality
\`\`\`

**一人目の欄**

\`\`\`
adult woman, black hair, white blouse, standing
\`\`\`

**二人目の欄**

\`\`\`
adult man, short hair, suit, necktie, standing
\`\`\`

混ざるときは、左の髪色を右の欄の Undesired に、右の服を左の欄の Undesired に入れます。両方の正向に同じ服を残すと、区別が付きません。位置の指定と、欄の順番が矛盾すると、公式も自然な文で補強するよう書いています。左右が逆の枚は、欄の上下を入れ替えるか、Custom の位置を直してください。重みを両方上げても、左右は直りません。

代替として、\`|\` でベースと各人物を区切る書き方が公式にあります。キャラクター欄が一つでもあると、この記号は無効です。欄と記号を混ぜないでください。このページの作例は欄の方を使います。動作の向きを \`source#\` や \`target#\` で分ける記法も公式にありますが、まず位置と見た目が安定してからにしてください。抱き合う姿勢のタグは [ハグのプロンプト](/guides/hug-prompt-guide) です。`,
      },
      {
        title: '除外したい要素',
        content: `NovelAI の除外は、Undesired Content という欄です。プロンプトとは別のタブ、または分離した入力です。正向に書きたい語を、こちらへは置きません。

<a href="https://docs.novelai.net/en/image/undesiredcontent/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Undesired Content</a> では、避けたいものを列挙し、用意されたプリセットと混ぜられる、と説明されています。プリセットの中身は更新されることがあります。このページでは、成人の人物に毎回残す行だけを固定します。

\`\`\`
${NEGATIVE_AGE},
${NEGATIVE_BODY}
\`\`\`

年齢を下げる語は、正向にも除外の逆側にも入れません。除外にだけ、上の行を残します。手を描かない構図では、\`bad hands\` の行を外して構いません。外しても、年齢の行は残してください。

特定の一人にだけ付いた崩れは、全体の欄ではなく、そのキャラクターの Undesired に書きます。全体に書くと、もう一人の正しい髪まで消えます。帽子だけを外すような一点は、V4.5 以降なら正向の \`-1::hat ::\` の方が公式の説明に近いです。長い一覧は Undesired に残します。

品質の悪い側（\`worst quality\` など）を足すときは [品質タグ一覧](/guides/quality-tags-prompt-guide) の、そのバージョンの列だけを足します。正向の \`best quality\` を除外へコピーしないでください。`,
      },
      {
        title: 'テーマ別の呪文',
        content: `各ブロックは、そのテーマの語を一つだけ足した NovelAI 向けの短い呪文です。段階や衝突は、リンク先のガイドで直します。作品名や特定のキャラクター名は入れません。画風も、作家の名前では書きません。

**髪型。長さは一つ**

詳しくは [髪型プロンプト](/guides/hairstyle-prompt-guide)。上半分だけ結ぶときは [ハーフアップ](/guides/half-up-hair-prompt-guide)。

\`\`\`
1 adult woman, adult, long hair, straight hair, black hair, white blouse, upper body, simple background
\`\`\`

**前髪。目を隠す語とは同時に強くしない**

詳しくは [前髪プロンプト](/guides/bangs-prompt-guide)。

\`\`\`
1 adult woman, adult, black hair, long hair, blunt bangs, white blouse, looking at viewer, upper body
\`\`\`

**目の色。髪の色とは別の語**

詳しくは [目・瞳のプロンプト](/guides/eye-prompt-guide)。

\`\`\`
1 adult woman, adult, black hair, blue eyes, white blouse, portrait, looking at viewer
\`\`\`

**目線。顔の向きとセット**

詳しくは [目線・視線のプロンプト](/guides/gaze-direction-prompt-guide)。

\`\`\`
1 adult woman, adult, black hair, white blouse, upper body, facing viewer, looking at viewer
\`\`\`

**表情。一つだけ**

詳しくは [表情プロンプト](/guides/stable-diffusion-expression-prompt)。

\`\`\`
1 adult woman, adult, black hair, white blouse, smile, looking at viewer, upper body
\`\`\`

**体型。成人のまま一つ**

詳しくは [体型プロンプト](/guides/body-type-prompt-guide)。長身は [高身長プロンプト](/guides/tall-height-prompt-guide)、成人の小柄は [低身長プロンプト](/guides/short-height-petite-prompt)。

\`\`\`
1 adult woman, adult, tall, long hair, white blouse, full body, standing, simple background
\`\`\`

**二人の身長差。差の語はガイドから一つ**

詳しくは [身長差プロンプト](/guides/height-difference-pair-prompt)。

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult, standing side by side, full body, white blouse, suit, simple background
\`\`\`

**衣装。作品名は書かない**

詳しくは [コスプレプロンプト](/guides/cosplay-prompt-guide)。大人の衣装の部品だけを足します。

\`\`\`
1 adult woman, adult, cape, long dress, standing, simple background, soft daylight
\`\`\`

**背景。場所は一つ**

詳しくは [背景プロンプト](/guides/background-prompt-guide)。

\`\`\`
1 adult woman, adult, white blouse, upper body, window, indoor, soft daylight
\`\`\`

**光。方向は一つ**

詳しくは [光・照明のプロンプト](/guides/lighting-prompt-guide)。

\`\`\`
1 adult woman, adult, white blouse, upper body, simple background, soft daylight, backlighting
\`\`\`

**塗り。作家名は使わない**

詳しくは [画風プロンプト](/guides/art-style-prompt-guide)。

\`\`\`
1 adult woman, adult, anime style, cel shading, black hair, white blouse, upper body, simple background
\`\`\`

除外は、どのテーマでも前の節の行を残します。テーマの語を除外にもコピーしないでください。\`backlighting\` と \`soft daylight\` が同時に強いときは、光のガイドに戻して一方を外します。このブロックは、両方の名前を見比べるための並記です。

各レシピは、完成の呪文ではなく、そのガイドへ渡す前の最小の行です。髪型の日に目の色と表情と背景を同時に足すと、髪の長さが肩で止まります。止まった理由が長さの語なのか、背景の窓なのかが残りません。レシピを使うときは、今のプロンプトに無い層を一つ選び、そのブロックの語を一つだけ足します。足して崩れたら、その語を外してガイドの直し方を読みます。外しても変わらない語は、そのモデルでは弱いので、ガイド側の別の言い方を一つだけ試します。

身長、体型、身長差、低身長は、検索では別の語でも、絵の上では体の比率の層です。同じ日に \`tall\` と小柄の語を両方強くしないでください。二人の差を描く日は、一人の体型の語を外し、身長差のガイドの正向を一つにします。コスプレの行に作品名を足したくなったら、そこで止めて、衣装の部品だけに戻します。塗りに作家の名前を足したくなったときも、同じです。`,
      },
      {
        title: '自然文の使い方',
        content: `V4 以降は、タグだけでなく短い英文も通りやすくなっています。長い文章だけにすると、人数や服が落ちることがあります。タグを残したまま、状況を一文だけ足してください。最新のモデルが文をどの程度優先するかは、公式ドキュメントで確認してください。

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan, upper body, simple background.
She stands beside a window in soft daylight.
\`\`\`

\`\`\`
1 adult woman, adult, wearing a white blouse and a cardigan.
Upper body, facing the camera, plain background, soft daylight. Keep the clothing on.
Negative: ${NEGATIVE_AGE}, ${NEGATIVE_BODY}
\`\`\`

ChatGPT や Gemini で下書きした文は、NovelAI に貼る前に、人数と服をタグへ戻します。文の中に作品名や実在の人物名が混ざっていたら、消してから貼ってください。Stable Diffusion の括弧が文中に残っているときも、消します。

一文で足りない状況は、背景のガイドか光のガイドのタグを一つ足す方が、文を長くするより残りやすいです。文を三文以上に増やした日は、タグの行が後ろへ押し出されていないかを見てください。

文とタグを混ぜるときの型は、タグの列を先に完結させ、空行ではなく同じプロンプトの末尾に一文を足します。文の中に、タグで既に書いた服をもう一度書いても構いません。書かないと、文が別の服を発明することがあります。発明された服が正向のタグと違うときは、文を短くして、服の名詞を文から消してください。タグの服が残ります。

ChatGPT で下書きするときは、出力に年齢を下げる語や、作品名が混ざっていないかを貼る前に読みます。混ざっていたら、その文は捨てて、このページの短い型から書き直します。下書きを直して使い続けるより、型に戻した方が、\`adult\` の位置が崩れません。

一文の長さの目安は、状況が一つです。窓の横に立つ、室内の柔らかい光、までです。季節の小物や、二人の動作や、服の素材を同じ文に足すと、タグで固定した髪が落ちます。落ちた髪を強調で戻す前に、文を切ってください。切ったあとに残った一文が、タグの服と矛盾していないかを読みます。矛盾があれば、文側を消します。タグ側を消すと、次のテーマのレシピと形が揃わなくなります。

自然文が通った枚は、タグの列とは別に保存します。翌日タグへ戻すときに、文の中のどの名詞がタグに無かったかを一行で残します。残さないと、通った理由が文の長さだったのか、窓という名詞だったのかが消え、また長い文に戻ります。`,
      },
      {
        title: 'うまくいかないとき',
        content: `タグが効かないときは、強調を上げる前に、その語を人数の直後へ移します。移しても変わらなければ、数値強調を一つだけ、1.2 から 1.5 の範囲で試します。それ以上は、手が崩れてから戻すことになります。

二人の見た目が混ざるときは、キャラクター欄に分け、共有してよい語（背景、光、品質）だけをベースに残します。髪と服は各欄だけです。漏れた色は、相手の欄の Undesired に入れます。\`|\` と欄を同時に使っていないかも確認してください。公式は、同時使用を無効にすると書いています。

体が崩れるときは、強調を外し、プロンプトを順番の節の短い型に戻します。品質の語を五個まで増やしても、崩れた手は戻りません。除外の \`bad hands\` を残したまま、正向の手のポーズを一つ減らしてください。

版を上げたあとに昔のプロンプトが急に変わるときは、数値強調と負の強調が、その版から有効になった可能性があります。V4 未満向けに保存した括弧だけのプロンプトは、そのままにして、V4 以降用を別名で保存してください。同じファイルを両方のモデルで上書きしないでください。

効かないタグの多くは、矛盾する語が正向に残っています。\`looking at viewer\` と、目をそらす語を同じ強さで書くと、目は平均の正面に戻ります。戻った枚を「タグが弱い」と判断して強調を上げると、目の位置だけが崩れます。強調の前に、逆の意味の語を除外へ移すか、消してください。移したあとにまだ弱ければ、1.2 から 1.5 を一つです。

二人の欄が混ざるときも、強調は後です。先に、共有してよい語と、各欄だけの語を分けます。ベースに髪色が残っていると、両方の欄がその色に寄ります。ベースからは髪と服を消し、場面と光と品質だけにします。消した語を各欄へ移してから、もう一枚生成してください。`,
      },
      {
        title: '他のツールへの移植',
        content: `見た目の数字を揃える対応です。計算が同じ、という意味ではありません。NovelAI の \`{tag}\` は 1.05 倍で、Stable Diffusion の \`(tag:1.2)\` とは別の仕組みです。

| Stable Diffusion | NovelAI（V4 以降の数値） |
|---|---|
| \`(tag:1.2)\` | \`1.2::tag ::\` |
| \`(tag:0.8)\` | \`0.8::tag ::\` |
| 括弧の強調を使わない | タグをそのまま置く |
| ネガティブ欄 | Undesired Content |

\`\`\`
Stable Diffusion: 1 adult woman, adult, (white blouse:1.2), cardigan
NovelAI: 1 adult woman, adult, 1.2::white blouse ::, cardigan
\`\`\`

ネガティブの年齢の行は、どちらへ移しても残します。Stable Diffusion 側の全文の型は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、除外の考え方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

\`\`\`
Undesired / Negative:
${NEGATIVE_AGE}, ${NEGATIVE_BODY}
\`\`\`

LoRA の \`<lora:>\` や ControlNet の参照画像は、NovelAI のプロンプト欄には書きません。ファイルで足す機能は、そのツールの画面の方を使ってください。

移植したあとに絵が別人になるのは、数字が違うからではなく、品質タグの位置が違うことが多いです。Stable Diffusion 向けに先頭へ積んだ \`masterpiece, best quality\` を、NovelAI の末尾へ移すか、品質タグのページが示すバージョンの語だけに減らします。減らしたあとに服が落ちるなら、服のタグを人数の直後へ戻します。強調は、その服が残ってから一つです。

保存は、ツールごとにファイルを分けます。NovelAI 用のファイルに Stable Diffusion の括弧が混ざったまま翌日開くと、どちら向けか分からなくなります。ファイル名にツールの名前を入れ、除外の行はどちらのファイルにも残してください。年齢の語を片方だけから消すと、その片方だけが別の年齢感に寄ります。`,
      },
    ],
    faq: [
      {
        q: '強調はどの記号ですか',
        a: '公式は { } が 1.05 倍、[ ] が 1.05 で割る、です。V4 以降は 1.5::タグ :: のような数値も使えます。負の数値は V4.5 以降です。(tag:1.2) は Stable Diffusion の書き方です。',
      },
      {
        q: '二人は一つの欄に書きますか',
        a: 'V4 以降は、ベースに場面、各キャラクターの欄にその人の見た目を分けます。本サイトではベースを 2 adults、各欄を adult woman または adult man にします。',
      },
      {
        q: 'Undesired Content には何を残しますか',
        a: '年齢を下げる語と、体の崩れの語です。正向に残したい服や髪は入れません。一人だけに付いた漏れは、その人の欄の除外へ書きます。',
      },
      {
        q: '自然な文章は使えますか',
        a: 'V4 以降は短い英文も通りやすくなっています。人数と服のタグは残し、状況は一文だけ足してください。長い文章だけにすると、指定が落ちることがあります。',
      },
      {
        q: 'Stable Diffusion の括弧はどう移しますか',
        a: '(tag:1.2) は、V4 以降なら 1.2::tag :: に対応づけます。同じ数値でも計算は同じとは限りません。波括弧の 1.05 倍とは別です。',
      },
    ],
  },

  'half-up-hair-prompt-guide': {
    sections: [
      {
        title: '基本のタグ',
        content: `「ハーフアップ プロンプト」は、髪の上半分だけをまとめ、下半分を下ろす髪型です。全部を結ぶまとめ髪とも、全部を下ろすロングとも違います。タグを一つに決めないと、ポニーテールか、下ろした髪のどちらかに寄ります。

基本の語は \`half updo\` です。人物は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。長さは \`long hair\` か \`medium hair\` を先に置き、その直後に \`half updo\` を置きます。長さが後ろだと、結ぶ位置が肩で止まります。服はブラウス、カーディガン、ブレザー、着物のように閉じた服を一つ。このページは成人だけです。

サイドに残す毛は \`sidelocks\` です。後ろ姿で結びを見せるときは \`from behind\` を構図に足します。色は [髪色プロンプト](/guides/hair-color-prompt-guide)、長さの全体は [ロングヘアプロンプト](/guides/long-hair-prompt-guide)、髪型の入口は [髪型プロンプト](/guides/hairstyle-prompt-guide) です。

**基本**

\`\`\`
1 adult woman, adult, long hair, half updo, black hair,
white blouse, upper body, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

\`ponytail\` を除外に入れるのは、全部の毛が一つに結ばれてしまうときです。最初の一枚では外しておき、ポニーテールになった枚だけ足してください。公開の近い髪型は [ハイライトとサイドの毛](/prompt/ponytail-highlights-sidelocks) と [まとめ髪のポートレート](/prompt/blonde-bun-hairstyle-casual-bar) です。どちらもハーフアップそのものではないので、タグは \`half updo\` に置き換えて使います。

ハーフアップで決めるのは三つです。上で留めること、下を下ろすこと、留める位置が見えること。三つを一つの語にまとめようとすると、全部結ぶか、全部下ろすかに寄ります。\`half updo\` が「上だけ」を担当し、\`long hair\` が「下を残す」を担当し、\`from behind\` が「留めた場所を見せる」を担当します。正面の肖像だけだと、留めた場所が後頭部に隠れて、下ろしたロングに見えます。見えない枚でタグを増やしても、結びは確認できません。

比較は、髪色と服を固定して、\`half updo\` の有無だけを変えた二枚です。二枚が同じなら、語が後ろに落ちているか、\`ponytail\` や \`hair bun\` のような別の結びが正向に残っています。残っている結びを除外へ移してから、もう一度同じシードで生成してください。`,
      },
      {
        title: '種類の一覧',
        content: `種類は、結ぶ位置と、留める部品で分けます。同時に強くしてよいのは、矛盾しない組み合わせだけです。お団子と、左右に一つずつのツーサイドは、別の型です。

| 種類 | 書き方 | 補足 |
|---|---|---|
| 基本のハーフアップ | \`half updo\` | 最初の一手 |
| お団子を一つ | \`half updo, single hair bun\` | 二つになるときは除外へ \`double bun\` |
| 編み込み | \`half up braid\` | 自然な英語では half up half down braid |
| リボン | \`hair ribbon\` | 色はリボンの直前 |
| クリップ | \`hair clip\` | 大きめの留めは claw clip と自然な英語 |
| ワンサイド | \`one side up\` | 片側だけ上げる |
| ツーサイド | \`two side up\` | 両側。お団子二つとは同時に強くしない |
| ロング | \`long hair, half updo\` | 下ろす毛が長い |
| ボブ | \`bob cut, half updo, hair clip\` | 毛が短いのでクリップ向き |
| 男性 | \`1 adult man, half updo\` | 後頭部の一つは man bun と自然な英語 |

\`half up braid\` と \`half up half down braid\` は、上を編んで下を下ろす言い方です。\`french braid\` は編み方の種類で、ハーフアップとは別の層です。両方を同じ強さにすると、編み目が二系統になります。編み込みの本数は [編み込みプロンプト](/guides/braid-prompt-guide) に任せ、このページでは「上だけ編む」を担当します。

くるりんぱのような小さなねじりは、公式タグとしては断定しません。自然な英語では a small twisted half-up と書きます。低めの位置は low half updo と自然な英語です。効かないときは \`half updo\` に戻し、\`from behind\` で位置を確認してください。モデル・バージョンによって効きが違うことがあります。

表の行は、一つだけ選んで正向に置きます。ワンサイドとツーサイドを同じ強さにすると、片側が上がったあと、もう片側も釣られて両方上がります。お団子とツーサイドも、後頭部の数が衝突します。リボンを足すのは、結びの種類が三枚同じになってからです。先に飾ると、結びの形より飾りの形が優先されて、ハーフアップかどうかが判断できません。

男性の行は、長い髪の語を外します。\`long hair\` を残した男性は、下ろした毛が肩を超えて、別の髪型になります。後頭部のまとまりを自然な英語で補強するときは \`man bun\` を一つ、\`half updo\` の直後です。両方を 1.3 以上にすると、毛量が平均より増えます。まずは重みなしで、後ろ姿を一枚見てください。

**お団子を一つ**

\`\`\`
1 adult woman, adult, long hair, half updo, single hair bun, black hair,
white blouse, upper body, simple background
\`\`\`

**片側だけ**

\`\`\`
1 adult woman, adult, long hair, one side up, black hair,
white blouse, from side, upper body, simple background
\`\`\`

**両側**

\`\`\`
1 adult woman, adult, long hair, two side up, black hair,
white blouse, upper body, looking at viewer, simple background
\`\`\`

ネガティブ（両側がお団子二つになるとき）:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
double bun, hair bun
\`\`\``,
      },
      {
        title: '長さで分ける',
        content: `ハーフアップは、下ろす毛の長さで印象が変わります。長さの語を消すと、結んだ部分だけが残って、下ろした毛が肩で切れます。

| 長さ | 書き方 | 起きやすいこと |
|---|---|---|
| ロング | \`long hair, half updo\` | 下の毛がポニーテールにまとまる |
| ミディアム | \`medium hair, half updo\` | 上と下の境界が曖昧 |
| ボブ | \`bob cut, hair clip\` | 結ぶ毛が足りず、クリップの方が残る |
| ショート | \`short hair\` | ハーフアップになりにくい。男性の後頭部以外では無理に足さない |

**ロング**

\`\`\`
1 adult woman, adult, long hair, half updo, straight hair, black hair,
white blouse, upper body, simple background
\`\`\`

**ミディアム**

\`\`\`
1 adult woman, adult, medium hair, half updo, black hair,
white blouse, upper body, simple background
\`\`\`

**ボブはクリップで留める**

\`\`\`
1 adult woman, adult, bob cut, half updo, hair clip, black hair,
white blouse, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail, very long hair
\`\`\`

質感は長さのうしろです。\`straight hair\` か \`wavy hair\` のどちらか一つ。両方を強くすると、毛先だけが別の質感になります。前髪を足すなら [前髪プロンプト](/guides/bangs-prompt-guide) から一つで、\`blunt bangs\` と \`half updo\` は同時に置けます。前髪は結ぶ対象に入れません。

ロングで下の毛が画面の外に切れるときは、\`full body\` に切り替えるか、\`upper body\` のまま毛先を肩の前に出します。\`hair over shoulder\` は自然な英語に近く、公式タグとしては断定しません。効かないときは \`from side\` にして、横から長さを見せてください。ミディアムは、肩のラインと結びの境界が近いので、\`from behind\` の方が上と下の差が分かります。ボブは、結ぶより留める、が先です。\`half updo\` だけを強くしてクリップを書かないと、短い毛が全部後頭部へ集まり、ボブではなく小さいお団子になります。

ショートをハーフアップにしたい枚は、男性の後頭部以外では諦めます。短い毛で上だけを残す指定は、ほぼ全体のまとめ髪になります。全体をまとめたくないなら、\`short hair\` だけにして、このページの語は外してください。外した方が、意図が残ります。`,
      },
      {
        title: 'お団子・編み込み・リボン',
        content: `アレンジは部品を一つです。リボンとクリップと編み込みを同じ強さにすると、後頭部に三つの留まりが出ます。

お団子は \`hair bun\` より \`single hair bun\` の方が、数が一つに寄りやすいです。二つになる枚の除外は \`double bun\` です。\`double bun\` を正向に置くのは、ツーサイドを意図したときだけにしてください。

\`\`\`
1 adult woman, adult, long hair, half updo, single hair bun,
sidelocks, black hair, white blouse, from behind, upper body
\`\`\`

編み込みは \`half up braid\` を先に書きます。\`braid\` だけだと、下ろした毛まで編まれることがあります。

\`\`\`
1 adult woman, adult, long hair, half up braid, black hair,
white blouse, from behind, upper body, simple background
\`\`\`

\`\`\`
1 adult woman, adult, long hair, half updo, french braid, black hair,
white blouse, from side, upper body
\`\`\`

リボンは色を直前に置きます。髪の色と同じ語を、リボンと髪の両方に強くすると、境界がにじみます。

\`\`\`
1 adult woman, adult, long hair, half updo, black hair, white hair ribbon,
white blouse, upper body, simple background
\`\`\`

クリップと、大きめの留めです。claw clip は自然な英語で、公式タグとしては断定しません。

\`\`\`
1 adult woman, adult, medium hair, half updo, hair clip, black hair,
white blouse, upper body, simple background
\`\`\`

\`\`\`
1 adult woman, adult, long hair, half updo, claw clip, black hair,
white blouse, from behind, upper body
\`\`\`

飾りの一覧は [アクセサリープロンプト](/guides/accessory-prompt-guide) です。髪飾りを二つに増やすのは、結びの位置が三枚同じに見えてからです。\`hair ornament\` を足すなら、リボンかクリップのどちらかを外します。

部品を一つに保つのは、後から直すためです。リボンの色が髪に移る枚では、リボンの色の語を外して、結びの形だけを見ます。形が残っていれば、色は次の日に戻します。形が残っていなければ、色の問題ではなく \`half updo\` の位置の問題です。色を先に疑うと、白を黒に変えても結びは直りません。

編み込みを足した日に、お団子の語が残っていると、編んだ束の先に玉が付きます。\`single hair bun\` を消してから \`half up braid\` を足してください。消した語は除外へ移すと、より戻りにくいです。移さずに正向から消すだけでも、多くのモデルでは足ります。両方を試すときは、シードを固定して、除外の有無だけを変えます。

ネガティブ（数が増えたとき）:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
double bun, ponytail
\`\`\``,
      },
      {
        title: 'シーン別のテンプレ',
        content: `八つは、服と構図だけを変えた全文です。髪は \`half updo\` を固定します。変える層を一つの日に二つ動かさないでください。

**カジュアル**

\`\`\`
1 adult woman, adult, long hair, half updo, hair ribbon, black hair,
cardigan, white blouse, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

**オフィス**

\`\`\`
1 adult woman, adult, medium hair, half updo, black hair,
blazer, white blouse, upper body, office, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

**結婚式のゲスト。成人のフォーマル**

\`\`\`
1 adult woman, adult, long hair, half updo, single hair bun,
formal dress, standing, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

ドレスの種類を足すなら [ドレスプロンプト](/guides/dress-prompt-guide) から一つです。このページでは formal dress までにします。

**和装**

\`\`\`
1 adult woman, adult, long hair, half updo, hair ornament, black hair,
kimono, obi, standing, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

着物の部品は [着物プロンプト](/guides/kimono-prompt-guide) です。簪を増やす前に、\`half updo\` が後ろ姿で残っているかを見ます。

**後ろ姿。結びを見せる**

\`\`\`
1 adult woman, adult, long hair, half updo, braid, black hair,
from behind, white blouse, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
facing viewer
\`\`\`

**横顔**

\`\`\`
1 adult woman, adult, long hair, half updo, black hair,
from side, white blouse, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

**男性。後頭部で一つ**

\`\`\`
1 adult man, adult, half updo, man bun, short hair,
suit, necktie, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail, long hair
\`\`\`

男性の顔立ちと服の全体は [男性キャラのプロンプト](/guides/male-character-prompt-guide) です。\`man bun\` は自然な英語です。公式タグとしては断定しません。\`half updo\` が残っていれば、後頭部のまとまりとして併記して構いません。

**写真風**

\`\`\`
1 adult woman, adult, long hair, half updo, black hair,
photorealistic, portrait, white blouse, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail
\`\`\`

写真風では、アニメの \`cel shading\` を残さないでください。残すと、結び目だけが線画になります。

シーンを変える日は、髪の行をコピーしたまま、服と場所だけを差し替えます。カジュアルのカーディガンがオフィスの枚に残っていると、ブレザーの下にカーディガンが重なります。和装の枚に \`white blouse\` が残っていると、袖が洋装に戻ります。差し替える前に、前のシーンの服を消してください。消す語は一つでも、残った語は次の枚の服を決めます。

結婚式のゲストは、成人の formal dress までにします。髪型を華やかにしたいときは、お団子を一つと、飾りの語を一つまでです。リボンとクリップと簪を同時に足すと、後頭部が混み合って、ハーフアップの境界が消えます。和装で簪を足すときも、\`hair ornament\` は一つです。二つ目は、後ろ姿で一つ目の位置が安定してからにしてください。

後ろ姿と横顔は、同じ髪でも確認できるものが違います。後ろ姿は結びの数、横顔は下ろした毛の長さです。正面で判断できない日は、この二つのどちらかに切り替えてからタグを直します。正面のまま \`from behind\` を除外に入れていると、結びは永遠に見えません。除外に入っていないかを、生成の前に見てください。`,
      },
      {
        title: 'ChatGPT・Gemini の自然文',
        content: `文で指示する画面では、\`half updo\` を残してもよいですが、括弧の重みは外します。結ぶ範囲を一文で書いてください。「上半分だけをまとめ、下は下ろす」まで書くと、全部まとめ髪に寄りにくいです。

**カジュアル**

\`\`\`
1 adult woman, adult, long black hair in a half updo.
Only the upper half is tied, the lower half hangs down.
White blouse and a cardigan, upper body, plain background, soft daylight.
Keep the clothing on.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, ponytail
\`\`\`

**結婚式のゲスト**

\`\`\`
1 adult woman, adult, long hair in a half updo with a single bun.
She wears a formal dress. Soft daylight, plain background.
The lower half of the hair stays down. Keep the clothing on.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, ponytail
\`\`\`

**男性**

\`\`\`
1 adult man, adult, short hair in a half updo, a small bun at the back of the head.
Suit and necktie, upper body, plain background.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, ponytail
\`\`\`

NovelAI では、同じ内容をタグへ戻します。\`half updo\` を人数の直後に置き、強調するなら V4 以降の \`1.2::half updo ::\` を一つだけです。記号の詳細は [NovelAIの呪文](/guides/novelai-prompt-guide) です。

\`\`\`
1 adult woman, adult, 1.2::half updo ::, long hair, black hair, white blouse, upper body, simple background
\`\`\`

除外:

\`\`\`
${NEGATIVE_AGE}, ${NEGATIVE_BODY}, ponytail
\`\`\``,
      },
      {
        title: 'うまくいかないとき',
        content: `症状は三つに分かれます。全部がポニーテールになる。全部が下ろした髪になる。お団子が二つになる。

| 症状 | 直し方 |
|---|---|
| ポニーテールになる | 除外に \`ponytail\`。正向の \`half updo\` を長さの直後へ移す |
| 全部下ろしになる | \`half updo\` を人数の近くへ。Stable Diffusion なら \`(half updo:1.2)\` を一つ。1.4 以上にはしない |
| お団子が二つになる | 正向を \`single hair bun\` にし、除外に \`double bun\` |
| 前髪まで結ばれる | \`blunt bangs\` を残し、\`hair pulled back\` は外す |
| 横からだと普通のロング | \`from behind\` で結びが見える構図に変えてから、タグを判断する |

\`hair pulled back\` は、顔の周りの毛を後ろへ送る語です。ハーフアップと同時に強くすると、下ろしたはずの下半分まで後ろへ行きます。顔周りの毛だけを送りたいときは、\`half updo\` が安定してから弱く足します。

\`\`\`
1 adult woman, adult, long hair, (half updo:1.2), black hair,
white blouse, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail, double bun
\`\`\`

重みの括弧は Stable Diffusion 用です。NovelAI では前の節の \`1.2::half updo ::\` に戻してください。ChatGPT や Gemini では括弧を外し、「上半分だけ」と文で書きます。

シードを固定し、直した語は一つだけにします。リボンの色と結び方を同じ日に変えると、どちらがポニーテールを止めたのかが残りません。

全部下ろしに見える枚は、実は上で小さく結ばれていて、正面から見えないだけ、ということがあります。先に \`from behind\` へ切り替えて、結びが無いことを確認してから、重みを上げてください。結びがあるのに正面で見えないだけなら、重みを上げると毛量が増えるだけで、見た目の問題は構図のままです。構図を直したあとに、まだ全部の毛が一つの束なら、除外の \`ponytail\` を足します。

お団子が二つになるのは、\`hair bun\` が数を指定しないためです。\`single hair bun\` に置き換え、\`double bun\` と \`two side up\` が正向に残っていないかを見ます。残っていたら除外へ移します。移したあとも二つなら、参照にしているプロンプトのどこかでツインテールの語が残っています。\`twintails\` を検索して消してください。このページの関連の節では、ツインテールとハーフアップを同時に強くしない、と書いてあります。`,
      },
      {
        title: '関連する髪型',
        content: `ハーフアップは、長さ、編み、前髪、色、飾りの交差点です。このページで足りなくなった層だけ、次を開いてください。同じ日に三ページ分をコピーすると、\`half updo\` が後ろへ押し出されます。

長さをさらに伸ばす、質感をストレートに固定する、は [ロングヘアプロンプト](/guides/long-hair-prompt-guide)。編み目の本数と位置は [編み込みプロンプト](/guides/braid-prompt-guide)。二つに分けて結ぶ髪型は [ツインテールプロンプト](/guides/twintail-prompt-guide) で、\`twintails\` と \`half updo\` は同時に強くしません。前髪は [前髪プロンプト](/guides/bangs-prompt-guide)。色の単色とメッシュは [髪色プロンプト](/guides/hair-color-prompt-guide)。留め具は [アクセサリープロンプト](/guides/accessory-prompt-guide)。

服を足すときは、髪型が三枚同じになってからです。洋装の丈や種類は [ドレスプロンプト](/guides/dress-prompt-guide)、和装は [着物プロンプト](/guides/kimono-prompt-guide)、男性のスーツの全体は [男性キャラのプロンプト](/guides/male-character-prompt-guide) です。髪型の一覧に戻るときは [髪型プロンプト](/guides/hairstyle-prompt-guide) です。

\`\`\`
1 adult woman, adult, long hair, half updo, black hair,
white blouse, upper body, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
ponytail, twintails, double bun
\`\`\`

この短い型に戻してから、今日足したい部品を一つだけ足してください。それが、このページの使い方の全部です。

戻るときの確認は三つです。\`adult\` が残っていること。服が閉じた一着であること。\`half updo\` が長さの直後にあること。この三つが欠けた型は、保存しないでください。欠けたまま関連ガイドのタグを足すと、次に開いたページの責任に見えて、実際は起点が壊れています。起点を直してから、そのページの一語を足します。

色を変える日も同じです。黒髪のハーフアップが三枚同じになってから、[髪色プロンプト](/guides/hair-color-prompt-guide) の単色を一つだけ差し替えます。金髪と黒髪を同じ強さで残すと、メッシュになり、結びの形の確認ができなくなります。メッシュにしたい日は、髪色のページへ移り、このページの \`half updo\` だけを持っていってください。持っていく語は、髪型なら \`half updo\` 一つ、長さなら \`long hair\` 一つ、までです。

関連ページから戻ってきたあとは、足した語が \`half updo\` より前に出ていないかを見ます。前に出ていると、結びが優先されて、下ろした毛が消えます。消えた枚は、長さの語を人数の直後へ戻し、\`half updo\` をその次に置きます。飾りの語は末尾のままです。末尾にあった飾りを先頭へ移すと、クリップの形だけが残って、髪の長さが平均に戻ります。

男性のページからスーツの語を足すときも、\`half updo\` は残します。スーツだけをコピーすると、髪型の行が丸ごと入れ替わって、ショートの分け目に戻ることがあります。戻ったら、このページの基本の型をもう一度貼り、スーツの語は服の位置に一つだけ足してください。`,
      },
    ],
    faq: [
      {
        q: 'ハーフアップの基本タグは何ですか',
        a: 'half updo です。long hair か medium hair の直後に置きます。全部が一つに結ばれるときは、除外に ponytail を入れてください。',
      },
      {
        q: 'お団子が二つになるときはどうしますか',
        a: '正向を single hair bun にし、除外に double bun を入れます。two side up とお団子二つは、別の型なので同時に強くしません。',
      },
      {
        q: '男性のハーフアップはどう書きますか',
        a: '1 adult man, adult, half updo から書きます。後頭部で一つにまとめるときは、man bun を自然な英語で併記します。長い髪の語は外してください。',
      },
      {
        q: 'ボブでもハーフアップにできますか',
        a: '結ぶ毛が短いので、hair clip と一緒に書く方が残りやすいです。very long hair が正向に残っていると、ボブにはなりません。',
      },
      {
        q: 'NovelAI では括弧を使いますか',
        a: 'Stable Diffusion の (half updo:1.2) は、NovelAI では 1.2::half updo :: にします。V4 以降の数値強調です。詳しくは NovelAI の呪文のページを見てください。',
      },
      {
        q: '後ろから見えないときはどうしますか',
        a: 'from behind を足して、結びが見える構図にします。横顔のままタグだけを強くしても、結びは髪の裏側に隠れます。',
      },
    ],
  },
}
