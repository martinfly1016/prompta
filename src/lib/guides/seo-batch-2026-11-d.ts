/**
 * Twelfth SEO batch (2026-11-09): ComfyUI, Forge / Forge Neo,
 * AI illustration how-to, Hires. fix, and ADetailer.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 * UI names, folders, and commands are limited to official docs checked 2026-11-09.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_12_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'comfyui-guide': {
    sections: [
      {
        title: 'ComfyUI とは',
        content: `「comfyui 使い方」で最初に知ることは、ComfyUI がノードをつないで画像を作るローカル向けの画面だということです。2026年11月時点の公式 README では、Windows、Linux、macOS で使え、Desktop アプリ、Windows のポータブル版、手動インストール、クラウドが案内されています。読み方を公式が一つに決めている記述は見当たりません。日本語では「コンフィユーアイ」と読まれることがあります。

WebUI や Forge は、txt2img の欄にプロンプトを書いて生成ボタンを押す形です。ComfyUI は、モデルを読むノード、文章を数値にするノード、ノイズから描くノード、画像に戻すノードを線でつなぎます。同じ処理でも、線のつなぎを保存して使い回せます。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

公式 README では、大きなオープンソースのモデルでも 4GB の VRAM と 8GB の RAM から実行できる場合がある、と案内しています。これは公式の説明です。すべてのモデルと設定で同じになる、という意味には読みません。GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、とだけ覚えてください。速度の倍率はこのページでは書きません。

| 画面 | プロンプトの置き場 | 向くとき |
|---|---|---|
| ComfyUI | ノードのテキスト欄。ワークフローを JSON で保存 | 処理の順番を自分でつなぎたい |
| Forge / WebUI | txt2img と img2img の入力欄 | 欄が決まっている画面で書きたい |
| 対話型のアプリ | 一つの文章 | スマホで文章のまま試したい |

ノードの細部に入る前に、タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、Forge の欄は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。初めて一枚を出す手順の全体は [AIイラストの作り方](/guides/ai-illustration-how-to-guide) です。画面を選ぶところからなら [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) を先に読んで、このページはノードのつなぎだけを担当します。

<a href="https://github.com/comfyanonymous/ComfyUI" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ComfyUI の README</a> と、<a href="https://docs.comfy.org/get_started/first_generation" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">最初の一枚の公式チュートリアル</a> を、このページの手順と違って見えたときは公式を採ってください。`,
      },
      {
        title: 'インストール方法',
        content: `導入で迷うときは、公式 README が分けている名前のまま選んでください。Desktop は Windows と macOS です。Linux の Desktop は、2026年11月時点の README の Desktop の行には書かれていません。ポータブル版は Windows 向けで、README は通常の利用者には Desktop を勧めています。

| 公式の呼び方 | 対象 | 始め方 |
|---|---|---|
| Desktop Application | Windows と macOS | 公式のダウンロードページから入れる |
| Windows Portable | Windows。Nvidia、AMD、Intel、CPU の配布がある | 7z を展開して起動 |
| Manual Install | Windows と Linux。Apple シリコンは別節 | リポジトリを clone し、依存を入れて \`python main.py\` |
| comfy-cli | README に載っている CLI | \`pip install comfy-cli\` のあと \`comfy install\` |

Desktop の入手先は <a href="https://www.comfy.org/download" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">comfy.org のダウンロード</a> です。ポータブル版の Nvidia 用は、README が \`ComfyUI_windows_portable_nvidia.7z\` を案内しています。展開には 7-Zip か、新しい Windows のエクスプローラーを使う、と書かれています。展開できないときは、ファイルのプロパティでブロックを外す、という手順も README にあります。このポータブルは Python 3.13 と PyTorch の CUDA 13.0 が同梱、と README にあります。起動しないときは Nvidia のドライバを更新する、とも書かれています。10 シリーズ以前向けの別パッケージは Python 3.12 と CUDA 12.6 で、README は 20 シリーズ以降には使わない、と注意しています。

手動インストールは、README が「このリポジトリを git clone する」と書いています。クローン先は README がある \`https://github.com/comfyanonymous/ComfyUI\` です。そのあと、ターミナルを ComfyUI のフォルダで開き、依存を入れて起動します。

\`\`\`
pip install -r requirements.txt
python main.py
\`\`\`

comfy-cli を使う場合、README のコマンドはこの二行です。

\`\`\`
pip install comfy-cli
comfy install
\`\`\`

Python は、README が 3.13 をよく対応している版とし、カスタムノードの依存で困るときは 3.12 を試し、3.14 は動くが一部のカスタムノードで問題が出ることがある、と書いています。Nvidia 向けの PyTorch のインストールコマンドは README の NVIDIA の節にあり、版で変わります。ここに写すと古くなるので、入れた日の README のコマンドをそのまま使ってください。AMD、Intel、Apple シリコンも README に節があります。Apple シリコンは、README が M1、M2、M3、M4 と最近の macOS を案内し、最後は \`python main.py\` で起動します。

チェックポイントは、手動インストールでは \`models/checkpoints\`、ポータブル版では \`ComfyUI\\models\\checkpoints\` に置きます。最初の一枚のチュートリアルは、例のファイル名として \`v1-5-pruned-emaonly-fp16.safetensors\` を Hugging Face から取る、と書いています。モデルは .safetensors 形式を選びます。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。`,
      },
      {
        title: 'モデルの置き場所',
        content: `一覧に出ないときは、フォルダ名の綴りを先に見ます。公式の \`extra_model_paths.yaml.example\` が、ComfyUI 側の相対パスとして次の名前を書いています。ベースは、ComfyUI を入れたフォルダです。

| 種類 | 公式例のパス |
|---|---|
| チェックポイント | \`models/checkpoints/\` |
| LoRA | \`models/loras/\` |
| VAE | \`models/vae/\` |
| アップスケーラー | \`models/upscale_models/\` |
| ControlNet | \`models/controlnet/\` |

同じ例のファイルは、A1111 側を指すときの名前も分けています。チェックポイントは \`models/Stable-diffusion\`、VAE は \`models/VAE\`、LoRA は \`models/Lora\`、アップスケーラーは \`models/ESRGAN\` などです。ComfyUI の小文字の \`models/loras\` と、WebUI の \`models/Lora\` は別フォルダです。ファイルを一つだけ置いて両方の一覧に出したいときは、\`extra_model_paths.yaml\` で検索先を足します。例のファイルをその名前にコピーして編集する、と README が案内しています。ポータブル版では、ComfyUI のディレクトリにある例を \`extra_model_paths.yaml\` に改名します。

置いたあとに一覧が空なら、何も選択していない状態で \`R\` を押します。公式チュートリアルは、モデルを置いたあと \`R\` でフォルダを読み直す、と書いています。見つからないファイルは、Issues の Missing Models にフォルダ名が出ることがあります。チュートリアルは、そのフォルダへ移してから Refresh か \`R\`、と案内しています。

LoRA の書き方と強さは [LoRAの使い方](/guides/stable-diffusion-lora-guide) に任せます。このページでは、ファイルが \`models/loras\` にあり、ノードがそれを読めるところまでです。系統の違いは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。`,
      },
      {
        title: '最初の1枚：基本ノードの流れ',
        content: `公式の最初の一枚のチュートリアルは、空のキャンバスに次のノードを自分でつなぎ、Stable Diffusion 1.5 の例で 512×512 を出します。ノード名はチュートリアルの表のままです。

| ノード | 役割 | 追加メニューの経路 |
|---|---|---|
| \`Load Checkpoint\` | モデルを読む。出力は MODEL、CLIP、VAE | model > loaders |
| \`CLIP Text Encode (Prompt)\` | 文章を条件にする。正向と負向で二つ | model > conditioning |
| \`Empty Latent Image\` | 幅と高さを持つ空の潜在画像 | model > latent |
| \`KSampler\` | モデルと両方の条件で描く | model > sampling |
| \`VAE Decode\` | 潜在画像を普通の画像にする | model > latent |
| \`Save Image\` | 表示して保存する | image |

つなぎは、Load Checkpoint の MODEL を KSampler の model へ、CLIP を二つの CLIP Text Encode の clip へ、正向の CONDITIONING を positive へ、負向を negative へ、Empty Latent Image の LATENT を latent_image へ、KSampler の LATENT を VAE Decode の samples へ、Load Checkpoint の VAE を VAE Decode の vae へ、VAE Decode の IMAGE を Save Image へ、です。

\`\`\`
Load Checkpoint
  MODEL → KSampler.model
  CLIP → CLIP Text Encode (Prompt) ×2
  VAE → VAE Decode.vae
Empty Latent Image.LATENT → KSampler.latent_image
正向 CONDITIONING → KSampler.positive
負向 CONDITIONING → KSampler.negative
KSampler.LATENT → VAE Decode.samples
VAE Decode.IMAGE → Save Image
\`\`\`

チュートリアルは、KSampler の初期値の例として steps が 20、cfg が 8.0 と書いています。Empty Latent Image の幅と高さは 1024 から始まり、そのチュートリアルでは 512 に変えます。batch_size は 1 のままです。ノード文書の KSampler も、steps の初期値 20、cfg の初期値 8.0、denoise の初期値 1.0 を書いています。denoise が 1.0 のときは、入力の形をほぼ残さない新規の生成です。

\`\`\`
KSampler のメモ（公式文書の初期値）
steps: 20
cfg: 8.0
denoise: 1.0
Empty Latent Image: チュートリアルの例は 512×512
\`\`\`

実行は、最初の一枚のチュートリアルでは Run、アップスケールのチュートリアルでは Queue と書かれています。ボタン名は版で違います。ショートカットは README が \`Ctrl + Enter\` で現在のグラフを生成キューに入れる、macOS では Ctrl を Cmd に替える、と書いています。必須の入力が空だと、チュートリアルは Required input missing と、ノード名と入力名が出る、と説明しています。

設定から表示言語を変更できる場合があります。言語の項目名は、2026年11月時点の README と最初の一枚のチュートリアルには一つの正式名として出ていないので、画面の設定を開いて確認してください。テンプレートから始めるときは、公式がサイドバーの Templates、またはメニューの Workflow から Browse Workflow Templates、と案内しています。`,
      },
      {
        title: 'プロンプトの書き方',
        content: `プロンプトは、二つの \`CLIP Text Encode (Prompt)\` に分けます。一つが描きたいもの、もう一つが避けたいものです。公式 README は、括弧で強調できると書いています。\`(good code:1.2)\` のように数値を付けられ、数値なしの \`()\` の初期強調は 1.1 です。括弧を文字として残すときは \`\\(\` と \`\\)\` でエスケープします。BREAK は、この README の強調の説明には出てきません。記号の違いは [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

人物は \`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服は閉じた日常着です。風景、物、食べ物には人数を書きません。下の六つは、そのまま負向の欄へ分けて貼れます。モデルの配布ページに推奨のサンプラーがあれば、KSampler の欄はそちらを優先してください。

**成人の肖像**

\`\`\`
1 adult woman, adult, portrait, black hair, white blouse,
soft daylight, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**成人の男性、私服**

\`\`\`
1 adult man, adult, casual jacket, shirt, trousers,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**風景**

\`\`\`
quiet lakeside, pine trees, morning mist, soft daylight,
wide landscape, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**商品写真**

\`\`\`
product photo, ceramic cup on a linen cloth,
soft studio light, simple background, sharp focus
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text, watermark
\`\`\`

**食べ物**

\`\`\`
food photo, a bowl of vegetable soup, wooden table,
natural window light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**ファンタジーの情景**

\`\`\`
fantasy landscape, stone bridge, lanterns, evening light,
distant mountains, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

強調の例は、光だけを少し上げるときです。服の語と同時に強くすると、どちらが効いたのかが残りません。

\`\`\`
1 adult woman, adult, portrait, white blouse, (soft daylight:1.2),
simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

自然文で同じ肖像を書くときは、括弧の倍率を外します。ChatGPT や Gemini ではこの一文です。

\`\`\`
1 adult woman in a white blouse, portrait, black hair,
looking at the camera, plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: 'ワークフローの保存・読み込み・共有',
        content: `公式 README のショートカットは、\`Ctrl + S\` がワークフローの保存、\`Ctrl + O\` が読み込みです。macOS では Ctrl を Cmd に替えます。保存した JSON は、ノードの位置と、欄に入れた文章と、選んだファイル名をまとめたものです。相手の PC に同じモデルファイルが無いと、ノードは残ってもファイル名だけが欠けます。

生成した PNG をキャンバスへドラッグすると、README は、使ったワークフローとシードを含む一式が戻る、と書いています。最初の一枚のチュートリアルも、Save Image が書いた PNG にはワークフローが入るのが初期状態で、ドラッグするか、メニューの File から Open する、と案内しています。ワークフローの入っていない PNG を落とすと、Load Image のノードになることがあります。

\`\`\`
保存: Ctrl+S（macOS は Cmd+S）
読み込み: Ctrl+O（macOS は Cmd+O）
PNG: キャンバスへドラッグしてワークフローを戻す
\`\`\`

JSON を人に渡すときは、モデルのファイル本体は含まれません。受け取る側は、Missing Models に出たフォルダへ、自分で入手したファイルを置きます。テンプレートは、サイドバーの Templates から開き、足りないモデルがあるとダウンロードを促す、と公式のテンプレート説明にあります。ダウンロードボタンが出ないファイルは、自分で配布ページから取って、表示されたフォルダへ移します。

共有された JSON やカスタムノードは、出所が分かるものだけを開いてください。見知らぬ JSON が、見知らぬカスタムノードのインストールを求めることがあります。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。`,
      },
      {
        title: 'よく使う追加：LoRA・img2img・Hires・ControlNet',
        content: `基本の一枚が保存できてから、線を一本ずつ足します。同じ日に LoRA と ControlNet と拡大を全部足すと、崩れた理由が残りません。

LoRA は、公式ノード文書の名前が Load LoRA (Model and CLIP) です。Load Checkpoint の MODEL と CLIP をこのノードに通し、その先を KSampler と CLIP Text Encode へつなぎます。ファイルは \`models/loras\` です。プロンプト側の \`<lora:名前:強さ>\` は WebUI の書き方で、ComfyUI ではノードがファイルを読みます。強さの考え方は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

\`\`\`
Load Checkpoint → Load LoRA (Model and CLIP)
  MODEL → KSampler.model
  CLIP → CLIP Text Encode (Prompt)
\`\`\`

img2img は、新規の Empty Latent Image の代わりに、Load Image を VAE Encode へ通し、その LATENT を KSampler に入れます。ノード文書は、denoise が低いほど入力の形を残す、と説明しています。初期値の 1.0 のままだと、ほぼ描き直しです。目安は 0.4 から 0.6 で、モデルの配布ページに推奨があればそちらを優先します。手順の全体は [img2imgの使い方](/guides/img2img-guide) です。

\`\`\`
Load Image → VAE Encode → KSampler
denoise: 0.5（目安。1.0 はほぼ新規）
VAE Decode → Save Image
\`\`\`

高画質化は二通りです。画素のモデルで拡大するときは、公式チュートリアルが Load Upscale Model と Upscale Image (Using Model) をつなぎ、ファイルを \`models/upscale_models\` に置く、と書いています。ノード文書の見出しは Upscale Image (using Model) で、Using の大文字小文字が違います。画面の検索では Upscale Image で探してください。潜在のまま拡大してからもう一度描くときは、Upscale Latent のあとに二段目の KSampler を置き、denoise を 1.0 より小さくします。詳しくは [Hires. fix の使い方](/guides/hires-fix-upscale-guide) です。

\`\`\`
画素: VAE Decode → Load Upscale Model → Upscale Image (using Model) → Save Image
潜在: KSampler → Upscale Latent → KSampler（denoise は 1 未満）→ VAE Decode
\`\`\`

ControlNet は、公式ノード文書に Load ControlNet Model があります。Apply ControlNet は、同じ文書が DEPRECATED と書いています。古い記事のノード名のまま足すと、赤い欠けや別の名前になっていることがあります。今のテンプレートのノード名を画面で確認してください。参照画像の考え方は [ControlNetの使い方](/guides/controlnet-guide) です。サンプラーの名前は [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) です。`,
      },
      {
        title: 'カスタムノードと ComfyUI-Manager',
        content: `足りないノードは、まず公式のテンプレートで同じ処理ができないかを見ます。カスタムノードは、第三者が足すプログラムです。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。モデルは .safetensors 形式を選びます。

ComfyUI 本体の README は、Manager を次の手順で有効にすると書いています。

\`\`\`
pip install -r manager_requirements.txt
python main.py --enable-manager
\`\`\`

同じ README が案内している Manager の場所は <a href="https://github.com/Comfy-Org/ComfyUI-Manager" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Comfy-Org/ComfyUI-Manager</a> です。いっぽう Manager リポジトリの README は、既存の ComfyUI へ足す方法として \`ComfyUI/custom_nodes\` で次を実行して再起動する、と書いています。

\`\`\`
git clone https://github.com/ltdrdata/ComfyUI-Manager comfyui-manager
\`\`\`

二つの README で手順が違います。今動かしている版の README を見て、片方だけを実行してください。両方を重ねると、フォルダが二重になることがあります。Manager の README は、実体が \`ComfyUI/custom_nodes/comfyui-manager\` にあること、中身を \`custom_nodes\` 直下に展開しないことを注意しています。

Manager のメニュー名は、README が Manager ボタン、Install Custom Nodes、Install Models と書いています。このページが名前を出してよい追加は Manager 自身だけです。顔のノードは [ADetailerの使い方](/guides/adetailer-face-fix-guide) で、Impact Pack の FaceDetailer として別に確認します。それ以外の第三者ノードは、このページでは勧めません。

インストールしたノードが消えたワークフローを開くと、ノードがエラー表示になることがあります。公式チュートリアルが名前を挙げている欠落は Required input missing と、Missing Models です。色が赤く見える場合もありますが、色の意味は版で違うので、表示された英文のノード名を先に読んでください。`,
      },
      {
        title: 'うまくいかないとき',
        content: `直すときは、変えるものを一つにします。モデルを入れ替えた日に、ノードのつなぎもプロンプトも変えないでください。

ノードがエラー表示になる、または Required input missing と出るときは、メッセージにある入力へ線を足します。チュートリアルの例は、\`KSampler is missing a required input: latent_image\` のように、ノード名と入力名が出る、というものです。カスタムノードの名前が欠けているときは、そのノードを入れた配布元が信頼できるかを確認してから、Manager で同じ名前を探します。出所が分からないノードは入れません。

モデルが一覧に無いときは、\`models/checkpoints\` か、Missing Models が示したフォルダを見ます。拡張子の前の名前が、ノードに書かれた名前と一字でも違うと出ません。置いたあとは \`R\` です。

メモリが足りない、と出るときは、Empty Latent Image の幅と高さを小さくして一枚だけ試します。公式 README は 4GB の VRAM と 8GB の RAM という下限を案内していますが、新しいモデルはその範囲に収まらないことがあります。バッチを 1 に戻し、同時に開いているほかの生成を止めてから、もう一度だけ実行してください。数字のベンチマークはこのページでは測りません。

画像が真っ黒、または全体が灰色に寄るときは、VAE がモデルと合っていない場合があります。VAE のファイルは \`models/vae\` です。チェックポイントに VAE が含まれている場合は、別の VAE を無理につなぎません。色だけがおかしいときにサンプラーとプロンプトを同時に変えると、原因が増えます。VAE を一つ戻して、同じ seed でもう一枚出してください。

\`\`\`
確認の順
1. 赤い、または欠けている入力の名前を読む
2. モデルのフォルダとファイル名
3. 幅と高さを小さくして一枚
4. VAE は、色だけがおかしいとき
\`\`\``,
      },
    ],
    faq: [
      {
        q: 'ComfyUI と WebUI や Forge はどちらを先に覚えるとよいですか',
        a: '欄に書いて生成する画面が欲しいときは Forge です。処理の順番を保存して組み替えたいときは ComfyUI です。プロンプトの文章は、どちらでも同じ成人の書き方から始められます。',
      },
      {
        q: 'インストールしたのにモデルが出ません',
        a: '手動インストールなら models/checkpoints、ポータブル版なら ComfyUI\\models\\checkpoints です。置いたあと R で読み直します。Missing Models にフォルダ名が出ていれば、そのフォルダへ移してください。',
      },
      {
        q: 'ワークフローの JSON を開いても絵が作れません',
        a: 'JSON はつなぎの記録で、モデル本体は含まれません。欠けているファイル名を、信頼できる配布元から入手して、表示されたフォルダへ置きます。',
      },
      {
        q: '日本語の画面にできますか',
        a: '設定から表示言語を変更できる場合があります。項目名は版で違うので、設定画面を開いて確認してください。最新の手順は公式ドキュメントを見てください。',
      },
      {
        q: '括弧の強調と BREAK は使えますか',
        a: '公式 README は (語句:1.2) のような強調を説明しています。BREAK はその説明に出てきません。記号の違いはプロンプトの記号のガイドを見てください。',
      },
      {
        q: 'カスタムノードはどこから入れますか',
        a: 'ComfyUI-Manager だけを、今の版の README の手順で入れます。見知らぬ配布元のノードやモデルは入れないでください。モデルは .safetensors を選びます。',
      },
    ],
  },

  'stable-diffusion-forge-guide': {
    sections: [
      {
        title: 'Forge とは',
        content: `「stable diffusion forge」には、元の Forge と、その続きとして公開されている Forge Neo があります。2026年11月時点で、元の Forge の README は、AUTOMATIC1111 の Stable Diffusion WebUI の上に載るプラットフォームで、開発を容易にし、リソース管理を最適化し、推論を速くし、実験的な機能を調べるため、と説明しています。Forge Neo の README は、その文を引用したうえで、Neo は Forge の latest の続きで、最適化と使いやすさ、新しいモデルを GUI で動かすことを目的にする、と書いています。速度が何倍か、このページでは書きません。公式の説明を、測定結果としては扱いません。

| 名前 | リポジトリ | 位置づけ |
|---|---|---|
| AUTOMATIC1111 WebUI | AUTOMATIC1111/stable-diffusion-webui | 元の欄のある画面 |
| Forge | lllyasviel/stable-diffusion-webui-forge | WebUI の上のプラットフォーム。README は one-click の 7z を案内 |
| Forge Neo | Haoming02/sd-webui-forge-classic の \`neo\` | latest の続き。clone 時のブランチは neo |
| classic | 同じリポジトリの別ブランチ | README の見出しに Classic がある。既定の導入は neo |

バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。対応モデルは README の一覧で確認してください。Neo の README が名前を挙げている例には、発展的な SDXL、Flux.2-Klein の 4B と 9B（FLUX.2-Dev ではない、と注記）、Qwen-Image、Z-Image があります。同じ README の Removed Features には SD2 と SD3 が挙がっています。ここに無いモデルが動く、とは書きません。

拡張機能は、A1111 用がそのまま動くとは限りません。Neo の README は、第三者の拡張の不具合は、拡張側が UI に合わせるものだ、と書いています。顔の自動補正は [ADetailerの使い方](/guides/adetailer-face-fix-guide) で、Neo 向けには別のフォークがあります。ノードで組みたいときは [ComfyUIの使い方](/guides/comfyui-guide) です。

<a href="https://github.com/lllyasviel/stable-diffusion-webui-forge" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Forge の README</a> と <a href="https://github.com/Haoming02/sd-webui-forge-classic" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Forge Neo の README</a> が、このページと違って見えたときは公式を採ってください。

選び方は、今あるフォルダを壊さないことです。A1111 が入っている PC に Neo を重ねて同じ \`models\` を直接書き換えないでください。Neo の \`--model-ref\` は、そのフォルダを足すのではなく置き換えます。共有したいときは、README のそのフラグか、\`--forge-ref-a1111-home\` のように参照先を指す方法を、今の README で読んでからにしてください。参照の旗を、意味を確認せずに \`COMMANDLINE_ARGS\` へ貼ると、見ているフォルダが昨日と別になります。

プロンプトの文章は、WebUI と Neo で同じ成人の書き方から始められます。違うのは、対応するモデルの一覧と、動く拡張です。文章を完成させてからソフトを選ぶと、起動できない日に文章まで捨てることになります。先にこのページのプロンプトをメモへ保存し、インストールは別の時間にやってください。Forge と ComfyUI とブラウザのどれにするかまだ決めていないときは、[Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) で選んでから、このページの導入へ戻ってください。`,
      },
      {
        title: 'インストール',
        content: `元の Forge と Neo では、README の導入が別です。混ぜないでください。

元の Forge の README は、git と Python が入った one-click のパッケージを勧め、推奨として CUDA 12.1 + PyTorch 2.3.1 の \`webui_forge_cu121_torch231.7z\` を挙げています。展開したあと \`update.bat\` で更新し、\`run.bat\` で起動する、と書かれています。更新を飛ばすと、直っていない版のままになる、とも書かれています。Git に慣れている人向けの別手順は、\`https://github.com/lllyasviel/stable-diffusion-webui-forge.git\` を clone して \`webui-user.bat\` を実行する、です。

\`\`\`
update.bat
run.bat
\`\`\`

Forge Neo の README の Installation は、次のコマンドです。ブランチは \`neo\` です。

\`\`\`
git clone https://github.com/Haoming02/sd-webui-forge-classic sd-webui-forge-neo --branch neo
\`\`\`

Python の案内は、README の中で行が分かれています。Features の節は推奨 Python を 3.13.15 と書き、インストール手順の uv は \`--python 3.13\`、非推奨として残している手順は Python 3.13.12 のダウンロードを案内しています。入れた日の README の、今開いている節を見てください。推奨として書かれている uv の手順はこれです。

\`\`\`
cd sd-webui-forge-neo
uv venv venv --python 3.13 --seed
\`\`\`

そのあと \`webui-user.bat\` で起動します。README は、初回起動時に必要なパッケージを自動で入れ、終わるとブラウザで開く、と書いています。\`--uv\` を \`webui-user.bat\` の \`COMMANDLINE_ARGS\` に足す、という任意の手順もあります。uv 自体のインストールは README が別ページへ案内しています。

Linux と macOS は、README が Wiki を参照しています。2026年11月時点の Unix の Wiki は、git と uv を入れたあと、clone と venv は上と同じで、起動は次です。

\`\`\`
./webui-user.sh
\`\`\`

Wiki は、macOS では \`TORCH_COMMAND\` の行のコメントを外し、CUDA 版ではない通常の PyTorch を入れる、と書いています。Linux では開発ツールが要ることがある、とも書いています。詳しくは <a href="https://github.com/Haoming02/sd-webui-forge-classic/wiki/Unix" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Forge Neo の Unix の Wiki</a> です。

\`\`\`
Windows: webui-user.bat
Linux / macOS: ./webui-user.sh
初回: 依存パッケージを自動で入れる
\`\`\`

GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、です。Neo の README は、使っている GPU が最新の PyTorch に対応しないときは古い PyTorch を手動で入れる、と Wiki へ案内しています。具体的な容量の下限は、このページでは公式が一つの数字にしていないので書きません。

初回の \`webui-user.bat\` は、依存の取得が終わるまでブラウザが開きません。途中で窓を閉じると、次の起動がまた同じ取得からになることがあります。終わったあとに出るアドレスは、README がブラウザで開くと書いているローカルの画面です。別の PC からそのアドレスを開く設定は、このページでは扱いません。

Python の版がエラーに出たら、venv の中の版と、README の Installation の版を並べます。OS に入っている Python と、\`uv venv\` で作った venv は別です。\`webui-user.bat\` が venv を見ているかは、起動ログの先頭のパスで確認します。パスが OS の Python を指しているときは、venv の二行に戻ってから、もう一度だけ起動してください。同じ失敗を、拡張を足しながら繰り返さないでください。拡張は、素の起動が一度成功してからです。`,
      },
      {
        title: 'モデル・LoRA・VAE の置き場所',
        content: `Forge Neo の README は、\`--model-ref\` で指す models フォルダの例として \`Stable-diffusion\`、\`Lora\`、\`VAE\`、\`ESRGAN\` を挙げています。この指定は、models フォルダを足すのではなく置き換える、と注意しています。アップスケーラーは、同じ README が .pth と .safetensors を ESRGAN フォルダに置く、と書いています。

ComfyUI の \`extra_model_paths.yaml.example\` が A1111 側として書いているパスは、チェックポイントが \`models/Stable-diffusion\`、VAE が \`models/VAE\`、LoRA が \`models/Lora\`、アップスケーラーが \`models/ESRGAN\` です。A1111 の Features の古い説明は、ESRGAN を webui.py と同じ場所の ESRGAN ディレクトリに置く、とも書いています。版で場所が違います。今の画面の更新ボタンを押しても出ないときは、両方の綴りを見てください。

| 種類 | 公式例で見るフォルダ名 |
|---|---|
| チェックポイント | \`models/Stable-diffusion\` |
| LoRA | \`models/Lora\` |
| VAE | \`models/VAE\` |
| アップスケーラー | \`ESRGAN\`（Neo の README）。A1111 の例では \`models/ESRGAN\` |

モデルは .safetensors 形式を選びます。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。配布ページのライセンスは、生成の前に開きます。系統の見分けは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list)、LoRA の強さは [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

\`\`\`
models/Stable-diffusion
models/Lora
models/VAE
ESRGAN または models/ESRGAN
\`\`\``,
      },
      {
        title: 'txt2img の画面と設定',
        content: `Forge は WebUI の上に載る、と README が説明しています。欄の名前は A1111 の画面が元です。2026年11月時点の A1111 の hints.js には、Sampling steps、Sampling method、CFG Scale、Seed、Hires. fix があります。生成情報のキーには Sampler と Schedule type も出ます。画面の見出しが Sampler なのか Sampling method なのかは版で違います。違っていたら、今の README と画面のツールチップを見てください。

| 項目 | 公式の説明から分かること |
|---|---|
| Sampling method | 画像を作るアルゴリズム。hints.js の項目名 |
| Schedule type | 生成情報のキー。サンプラーと組で保存される |
| Sampling steps | 反復の回数。少なすぎると結果が悪くなる、と hints |
| CFG Scale | プロンプトへどれだけ寄せるか |
| Seed | 同じ条件と同じ値なら同じ結果、と hints |
| Hires. fix | 小さい解像度で作ってから拡大し、細部を足す |

最初の比較は、プロンプトと Seed を固定し、Sampling method だけを変えます。目安の一行は、モデルの配布ページに推奨があればそちらを優先します。無ければ、steps は 20 から 30、CFG Scale は 7 前後から一枚だけ試します。これは目安です。A1111 の画面定義では CFG Scale の初期値が 7.0 です。

\`\`\`
Sampling method: Euler a
Schedule type: 画面の初期のまま
Sampling steps: 28
CFG Scale: 7
Seed: 固定
Hires. fix: オフ
\`\`\`

チェックポイントは、txt2img の上部で選びます。一覧に無いときは、前の節のフォルダを確認してから更新ボタンです。LoRA は、A1111 のソースが \`<lora:名前:倍率>\` の形でプロンプトへ足します。Neo の README は、時間で強さを変える別記法として \`<lora:name:[w1@t1, w2@t2, ...]>\` も書いています。最初は基本の形だけで、ファイル名に拡張子は付けません。

\`\`\`
<lora:filename:0.6>
\`\`\`

プロンプトの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、サンプラーの性質は [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) です。

比較のメモは、画像の横に五行だけ残します。Sampling method、Schedule type、Sampling steps、CFG Scale、Seed です。Hires. fix をオンにした日は、Upscaler と Denoising strength を六行目に足します。メモが無い枚は、翌日には再現できません。Seed を -1 のままにすると、良い絵の条件が残りません。気に入った一枚の Seed を、次の行の実験でも固定してください。

チェックポイントを変える日は、Sampling method を動かしません。拡張を入れた日は、プロンプトを動かしません。一つの失敗に三つの変更が重なると、どの変更を戻せばよいかが消えます。戻すときは、最後に足したものから一つずつ外します。`,
      },
      {
        title: 'プロンプトの書き方',
        content: `txt2img の正向と、Negative prompt の欄に分けて貼ります。人物は \`adult\` を残します。風景と物には人数を書きません。LoRA を足す日は、下の文章を固定し、\`<lora:filename:0.6>\` の一行だけを足して二枚比べます。

**成人の肖像**

\`\`\`
1 adult woman, adult, portrait, black hair, white blouse,
soft daylight, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**成人の男性**

\`\`\`
1 adult man, adult, navy jacket, shirt, trousers,
standing, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**風景**

\`\`\`
coastal road, overcast sky, wide landscape, no people,
soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**室内の静物**

\`\`\`
still life, closed book and a ceramic cup, wooden desk,
window light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**食べ物**

\`\`\`
food photo, toast and tea on a tray, morning light,
simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**街の遠景**

\`\`\`
quiet city street after rain, distant buildings,
overcast daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

LoRA を肖像に足す例です。\`filename\` は、\`models/Lora\` に置いたファイルの、拡張子を除いた名前に置き換えます。

\`\`\`
1 adult woman, adult, portrait, white blouse, soft daylight,
<lora:filename:0.6>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

自然文にするときは、カンマの列を一文にします。

\`\`\`
1 adult woman, portrait, white blouse, black hair,
plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: 'img2img・inpaint・Hires. fix',
        content: `txt2img で顔と構図が安定してから、別のタブへ移ります。img2img は元画像をどれだけ残すかを Denoising strength で決めます。A1111 の hints は、0 では何も変わらず、1 では関係の薄い画像になる、と説明しています。手順は [img2imgの使い方](/guides/img2img-guide) です。

Hires. fix は、hints が、小さい解像度で一部を作り、拡大してから、構図を変えずに細部を足す二段の処理、と説明しています。Hires steps は 0 なら元のステップ数を使う、とも書いてあります。倍率と Denoising の目安、崩れたときの順番は [Hires. fix の使い方](/guides/hires-fix-upscale-guide) です。このページでは、最初の一枚では Hires. fix をオフにします。

\`\`\`
最初の一枚: Hires. fix はオフ
形が決まってから: img2img または Hires. fix
顔だけ: ADetailer のページへ
\`\`\`

inpaint は、マスクした範囲だけを描き直します。顔の検出からマスクを作る拡張は、次の節と ADetailer のページに分けます。元画像は、自分で作ったものか、使用が許されたものだけです。`,
      },
      {
        title: '拡張機能',
        content: `A1111 向けの ADetailer の README は、Extensions の Install from URL に \`https://github.com/Bing-su/adetailer.git\` を入れて Install する、と書いています。Forge Neo では、同じ拡張が動くとは限りません。ADetailer Neo の README は、自分たちを Forge Neo で動く公式のフォークだと書いています。顔の節は [ADetailerの使い方](/guides/adetailer-face-fix-guide) を開いて、入れているのが Neo かどうかを確認してください。

URL から入れるときは、リポジトリの所有者を自分で読みます。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。インストールしたあとは、Installed から再起動します。ADetailer の README は、UI の再起動だけでは足りず、ターミナルごと止めてから起動し直す、と書いています。

\`\`\`
Extensions → Install from URL
URL を確認して Install
再起動は、画面だけでなく起動したターミナルも
\`\`\`

動かない拡張機能もあります。Neo の README は、取り除いた機能についての報告や、第三者拡張の不具合は扱わない、と書いています。動かないものを別のよく似た名前で何度も入れないでください。一覧が増えるほど、どの拡張が起動を止めているのかが見えなくなります。`,
      },
      {
        title: 'うまくいかないとき',
        content: `起動しないときは、Python の版を先に見ます。Neo の推奨の手順は 3.13 系です。README の中で 3.13.15、3.13、3.13.12 と書き方が分かれているので、エラー文に出た版と、今の README の Installation を並べてください。\`webui-user.bat\` を、venv を作る前に押している場合は、uv の二行に戻ります。

モデルが一覧に無いときは、\`models/Stable-diffusion\` の綴りを見ます。L の大文字小文字を、LoRA は \`Lora\`、ComfyUI は \`loras\` と取り違えないでください。更新ボタンのあとでも出ないファイルは、拡張子が .safetensors かを見ます。

メモリが足りないときは、幅と高さを一段小さくし、Hires. fix をオフにして一枚だけ出します。バッチを増やしたまま拡大しないでください。公式が一つの速度を保証しているわけではありません。

画像が崩れるときは、プロンプトを短くし、CFG Scale を 7 へ戻し、Hires. fix をオフにします。顔だけが悪いときは拡大の Denoising を下げるか、ADetailer のページへ進みます。四つの原因を同じ生成で直そうとしないでください。

\`\`\`
起動しない: Python の版と README の Installation
モデルが出ない: models/Stable-diffusion と更新
メモリ: 解像度を下げ、Hires. fix をオフ
崩れる: CFG を戻し、変える項目は一つ
\`\`\``,
      },
      {
        title: 'ComfyUI との使い分け',
        content: `Forge は、欄が決まった画面です。Sampling method や Hires. fix を、決まった場所で切り替えます。ComfyUI は、その処理をノードの線として保存します。同じプロンプトを両方で試すときは、文章を固定し、画面の違いだけを見ます。

初めて一枚を出すなら、このページの txt2img で Seed を固定した一枚を残してください。処理の順番を人に渡したい、テンプレートをドラッグで戻したい、という段階で [ComfyUIの使い方](/guides/comfyui-guide) を開きます。スマホの文章から始める手順は [AIイラストの作り方](/guides/ai-illustration-how-to-guide) です。

\`\`\`
欄で書きたい: Forge
線で保存したい: ComfyUI
文章のまま試したい: 対話型のアプリ
\`\`\``,
      },
    ],
    faq: [
      {
        q: 'Forge と Forge Neo は同じソフトですか',
        a: '同じではありません。元の Forge は lllyasviel のリポジトリで、one-click の 7z が README の基本です。Forge Neo は Haoming02 の sd-webui-forge-classic で、clone 時のブランチは neo です。',
      },
      {
        q: 'classic ブランチはどれですか',
        a: 'Forge Neo の README の見出しに Classic があります。インストール手順に書いてある既定のブランチは neo です。指定を変える前に、今の README を見てください。',
      },
      {
        q: 'どのモデルが使えますか',
        a: '対応モデルは README の一覧で確認してください。Neo の README は SDXL や Flux.2-Klein、Qwen-Image、Z-Image などを挙げ、Removed Features に SD2 と SD3 を書いています。',
      },
      {
        q: 'A1111 の拡張機能はそのまま入りますか',
        a: '入っても動かない拡張機能もあります。Forge Neo の顔補正は ADetailer Neo を、その README に従って入れてください。出所の分からない URL は Install from URL に貼らないでください。',
      },
      {
        q: '日本語化の拡張は必要ですか',
        a: '2026年11月時点の Forge と Forge Neo の README には、特定の日本語化拡張の名前がインストール手順として出ていません。このページでは名前を指定しません。',
      },
      {
        q: '起動はしても画像が崩れます',
        a: 'Hires. fix をオフにし、CFG Scale を 7 に戻し、プロンプトを短くして一枚出します。顔だけなら ADetailer のページ、解像度なら Hires. fix のページへ分けてください。',
      },
    ],
  },

  'ai-illustration-how-to-guide': {
    sections: [
      {
        title: 'AIイラストができるまでの流れ',
        content: `「aiイラスト 作り方」で必要なのは、道具の名前を並べることではなく、一枚を仕上げる順番です。このページは、目的を決めて、ツールを一つ選び、プロンプトを書き、数枚を比べ、崩れた箇所だけを直し、公開する前に権利を見る、という手順です。呪文のカテゴリ一覧は [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list)、言葉の意味は [プロンプトとは](/guides/what-is-prompt) のままです。このページは作り方（手順）を担当します。Stable Diffusion をどの画面で始めるかは [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) にまとめ、ここでは一枚を仕上げる順番だけを書きます。

順番は七つです。目的、ツール、文章、比較、修正、寸法、公開前の確認。同じ日に七つを動かさないでください。目的がアイコンなら、全身の構図はまだ書きません。

1. 目的を一つ決める。アイコン、ブログの挿絵、背景、キャラクター、のどれかです。
2. ツールを一つ決める。文章で試すのか、PC のローカルで欄を使うのかです。
3. 主題から順に書く。服、ポーズ、背景、光、画風、品質の順です。
4. 数枚出して、変えた語を一行だけメモする。
5. 顔、手、構図のどれか一つを直す。
6. 大きさと縦横を、用途に合わせてから拡大する。
7. 公開する前に、サービスの規約と、モデルのライセンスを開く。

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。動物、風景、食べ物には人数を書きません。服は閉じた日常着です。

目的が曖昧なままツールを開くと、設定の名前を覚える作業になります。アイコンなら、胸から上で、顔が枠の中に収まることを先に書きます。ブログの挿絵なら、人を描くのか、物だけなのかを先に決めます。背景なら、人の行を入れません。キャラクターなら、一人に決めて、服を一つにします。目的を一文でメモの先頭に書いてから、次の節へ進んでください。一文が書けないときは、まだ生成しません。

比較で残すのは、変えた語の名前だけです。「なんとなく良くなった」は、次の日に再現できません。気に入った枚の文章を、そのままコピーして、次の実験の土台にします。土台を毎回ゼロから書き直すと、良くなった理由が文章のどこにあったのかが消えます。

\`\`\`
目的 → ツール → 文章 → 数枚 → 一箇所だけ直す → サイズ → 権利
\`\`\``,
      },
      {
        title: 'ツールの選び方',
        content: `選ぶ基準は、スマホで文章のまま出したいか、PC でタグと設定を残したいか、です。料金と、無料で試せる回数は、サービスごとに違い、変更されるため公式で確認してください。このページでは金額も回数も書きません。

| 種類 | 例 | 向くとき |
|---|---|---|
| 対話型 | ChatGPT、Gemini。スマホのアプリから文章を送れる | タグを覚える前に、一枚のイメージを見たい |
| ローカルの欄 | Forge、AUTOMATIC1111 の WebUI | Seed やステップを固定して比べたい |
| ローカルのノード | ComfyUI | 同じ処理を JSON で残したい |

対話型の文章の型は [ChatGPTプロンプト](/guides/chatgpt-prompt-techniques) と [Geminiプロンプト集](/guides/gemini-prompt-collection) です。画面の場所は版で変わるので、操作に迷ったら <a href="https://help.openai.com/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">OpenAI のヘルプ</a> と <a href="https://support.google.com/gemini" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini のヘルプ</a> を開いてください。PC の導入は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) と [ComfyUIの使い方](/guides/comfyui-guide) です。

\`\`\`
文章のまま: ChatGPT または Gemini
Seed を固定: Forge
線で保存: ComfyUI
\`\`\`

GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、です。ローカルが起動しない日は、対話型の自然文だけで目的の確認を済ませ、同じ文章をあとからタグに分けます。

対話型で見た絵を、ローカルの完成だと扱わないでください。同じ文でも、モデルが違えば顔も服も変わります。対話型の役割は、主題と服と背景が矛盾していないかを、タグを覚える前に見ることです。矛盾が残った文をタグに分解しても、矛盾は残ります。文の段階で服を一つに減らし、その文だけを保存します。

ローカルを選んだあとも、最初の日は Forge か ComfyUI の片方だけです。両方を同じ午後に入れると、モデルのフォルダ名の違いで時間が終わります。フォルダの綴りは、それぞれの使い方のページに表があります。このページでは綴りを暗記させません。`,
      },
      {
        title: 'プロンプトの基本の組み立て',
        content: `書く順は、主題、服装、ポーズ、背景、光、画風、品質です。前にある語が残りやすいので、今回変えたいものだけを主題の直後へ移します。全部を先頭にすると、どれが効いたのかが残りません。

| 順 | タグの例 | 自然文での言い方 |
|---|---|---|
| 主題 | \`1 adult woman, adult\` | 一人の成人 |
| 服装 | \`white blouse, cardigan\` | 白いブラウスとカーディガン |
| ポーズ | \`standing, upper body\` | 立って、胸から上 |
| 背景 | \`simple background\` | 無地の背景 |
| 光 | \`soft daylight\` | 柔らかい昼の光 |
| 画風 | \`anime style\` | アニメ塗り |
| 品質 | モデルのカードが挙げる語だけ | 必要なら一文で画質 |

タグと自然文を一つの欄に混ぜると、カンマの列と文章が両方とも平均になります。Stable Diffusion と NovelAI では下のタグ、ChatGPT と Gemini ではその下の一文、と保存を分けてください。タグの細目は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、アニメの顔は [アニメプロンプト](/guides/anime-prompt-guide) です。

品質の語は、主題が空のまま増やしても絵の中身は決まりません。モデルのカードが品質の語を挙げているときだけ、その語を最後に一つ足します。カードが無言なら、品質の語は足しません。画風は \`anime style\` か、写真に寄せる語かを一つにします。両方を同じ強さで置くと、線と肌が半分ずつになります。

色は、形が三枚そろってから一つです。髪の色と服の色を同じ日に変えると、どちらが移ったのかが残りません。色の名前で迷うときは、このページの作例では白、紺、黒のように少ない色だけを使っています。

\`\`\`
1 adult woman, adult, white blouse, cardigan,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

\`\`\`
1 adult woman in a white blouse and a cardigan.
Upper body, standing, plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: '作例',
        content: `八つの目的を、それぞれ一枚の起点にします。服や場所を変える実験では、人数の行を残したまま、変える語を一つにしてください。気に入った起点は、ファイル名かメモの見出しを目的の名前にして保存します。アイコンの文を、あとから風景の実験に流用しないでください。流用すると、胸から上の語が風景の端に人を足します。

各作例のネガティブは、人体の崩れと年齢の語を共通にしています。物と風景では、それに people と text を足して、人が混ざるのを抑えます。ネガティブを毎回ゼロから考えないでください。正向だけを目的に合わせて差し替えます。

**アニメ調の成人キャラ（タグ）**

\`\`\`
1 adult woman, adult, anime style, black hair, white blouse, cardigan,
upper body, looking at viewer, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**同じキャラの自然文**

\`\`\`
1 adult woman, anime style, black hair, white blouse and a cardigan.
Upper body, looking at the camera, plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**大人の男性キャラ**

\`\`\`
1 adult man, adult, short black hair, navy jacket, shirt,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**SNS のアイコン（胸から上）**

\`\`\`
1 adult woman, adult, bust-up portrait, black hair, white blouse,
looking at viewer, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped head, text
\`\`\`

**アイコンの自然文**

\`\`\`
1 adult woman, bust-up portrait for an icon, black hair, white blouse,
looking at the camera, plain background, soft daylight.
Keep the face fully inside the frame.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, cropped head, text
\`\`\`

**ブログの挿絵（物）**

\`\`\`
editorial still life, closed notebook and a pen, wooden desk,
soft window light, simple background, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**背景だけ**

\`\`\`
empty cafe interior, wooden chairs, morning light,
no people, wide shot
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**ちびキャラ（成人の頭身だけを下げる）**

頭身の細かい段階は [ちびキャラのプロンプト](/guides/chibi-deformed-prompt-guide) です。年齢は成人のままです。

\`\`\`
1 adult woman, adult, chibi, white blouse, cardigan,
standing, full body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**食べ物**

\`\`\`
food photo, a slice of apple tart on a plate,
soft daylight, simple background, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**季節のイラスト（自然文）**

\`\`\`
1 adult woman in a long wool coat, standing on a quiet street,
autumn leaves, soft daylight, upper body, plain colors.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**季節のタグ**

\`\`\`
1 adult woman, adult, long wool coat, autumn street,
falling leaves, upper body, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: 'スマホで作る',
        content: `スマホでは、タグの列より一つの文が安定します。人数、服、範囲、背景、光を、この順で同じ文に入れてください。括弧の倍率は付けません。\`adult\` は残します。

上手くいかない文は、形容を三個足す前に、主題を短くします。「きれい」「高品質」だけを足しても、誰が何を着ているのかは決まりません。逆に、服を五種類書くと、袖が平均になります。一回の送信で動かすのは、服か背景かの一方です。

\`\`\`
1 adult man in a navy jacket and a shirt, upper body,
standing, plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

気に入った文は、メモに残してから PC のタグへ分けます。分けたあとに意味を足さないでください。足すと、スマホで見た絵と PC の絵の差が、文章の差なのかツールの差なのか分からなくなります。対話の型の続きは [ChatGPTプロンプト](/guides/chatgpt-prompt-techniques) です。

スマホの画面では、送信の前に人数と服だけを読み直します。文が長いときは、光と画風の形容を一度消して、主題と服と範囲だけを送ります。その一枚で誰が何を着ているかが分かってから、光を一文で戻します。アプリのボタン名は版で変わるので、このページではボタンを指定しません。入力欄に文を置く、という操作だけを共通にします。

生成の待ち時間や、一日に何枚まで、という制限はサービスが変えます。公式のヘルプを、使った日にもう一度開いてください。制限の数字を、このページから写して計画を立てないでください。`,
      },
      {
        title: 'PC で作る',
        content: `PC では、Seed を固定してから二枚目を出します。Forge では txt2img にタグを貼り、Sampling steps と CFG Scale をメモします。ComfyUI では、同じ文章を \`CLIP Text Encode (Prompt)\` に貼り、ワークフローを \`Ctrl+S\` で保存します。導入がまだなら、それぞれのページのインストールから戻ってください。

最初の解像度は、用途の完成サイズより小さくて構いません。顔と服が安定した枚だけを、あとから拡大します。拡大の手順は [Hires. fix の使い方](/guides/hires-fix-upscale-guide) です。

\`\`\`
Forge: txt2img にタグ、Seed を固定
ComfyUI: CLIP Text Encode にタグ、Ctrl+S で保存
拡大は、顔が決まってから
\`\`\`

ローカルのモデルは .safetensors を選び、信頼できる配布元のものだけを置きます。どの系統か迷ったら [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) を先に読んでください。

PC の最初の成功は、きれいな一枚ではなく、同じ Seed で二枚目が近いことです。近い二枚が残せたら、服の語を一つ変えます。近い二枚が残る前に、拡大や顔の拡張を入れると、直した理由が残りません。Forge なら txt2img の一枚、ComfyUI なら基本のノードの一枚、で止めてください。

フォルダにモデルを置いたのに一覧が空のときは、使い方のページのフォルダ名に戻ります。このページのプロンプトは、ファイルが見えてから貼ります。空の一覧にプロンプトを何度も送っても、文章は検査されません。`,
      },
      {
        title: 'うまくいかないとき',
        content: `崩れは、種類でページを分けます。同じ生成で全部を直そうとしないでください。

顔が小さい、目が不揃い、というときは、まず胸から上に構図を戻し、\`detailed face\` を一つ足します。それでも残るときは [ADetailerの使い方](/guides/adetailer-face-fix-guide) です。指が溶けるときは [手と指のプロンプト](/guides/hand-finger-prompt-guide) です。検出モデルで手を描き直す機能は、顔のページで短く触れ、このページでは手の文章を先に直します。

思った構図にならないときは、\`upper body\` と \`full body\` が両方残っていないかを見ます。ショットの語は一つです。構図の一覧は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

色が隣の物に移るときは、色の語を減らし、区切りが必要なら [プロンプトの記号の意味](/guides/prompt-symbols-guide) の BREAK を見ます。ComfyUI の README は BREAK を標準の強調としては説明していません。WebUI でだけ試してください。

\`\`\`
顔: 構図を近づけてから ADetailer
手: 手のプロンプトを先に短くする
構図: upper body か full body を一つ
色: 色の語を減らし、必要なら BREAK
\`\`\``,
      },
      {
        title: '公開・利用前の確認',
        content: `生成できたことと、公開してよいことは別です。サービスの規約、モデルのライセンス、元画像の権利を、公開の前に開きます。確認の順番は [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) です。このページは許可の一覧ではありません。

見るものは四つです。使ったサービスが出力の利用をどう書いているか。ローカルなら、チェックポイントと LoRA の配布ページのライセンス。img2img の元画像が自分のものか。実在の人物や、権利のあるキャラクターに似せていないか。一つでも空欄なら、公開用のフォルダへ移しません。

メモには、使ったモデルの名前と、開いたライセンスの日付を一行で残します。名前が無い枚は、あとからどのファイルで作ったのかが分かりません。対話型のアプリで作った枚は、アプリの名前と、その日の規約を見たことだけを残します。規約の全文をこのページへ写すことはしません。原文が改定されたときは、原文の側を採ってください。

\`\`\`
規約 → モデルのライセンス → 元画像 → 人物や作品に似せていないか
\`\`\`

無料で試せる範囲は、サービスごとに違い、変更されるため公式で確認してください。料金の表はこのページには置きません。`,
      },
    ],
    faq: [
      {
        q: '初心者はどのツールから始めますか',
        a: '文章のまま一枚見たいときは ChatGPT か Gemini です。Seed を固定して比べたいときは Forge、処理を保存したいときは ComfyUI です。料金と無料の範囲は公式で確認してください。',
      },
      {
        q: 'アニメキャラはどう書きますか',
        a: '1 adult woman または 1 adult man から書き、anime style を一つ、服を一つ、構図を一つにします。年齢を下げる語は入れません。',
      },
      {
        q: 'スマホだけでも作れますか',
        a: '対話型のアプリなら、自然文を送って画像を作れます。画面の名前は版で変わるので、公式ヘルプを見てください。タグの固定と比較は PC の Forge や ComfyUI の方が向きます。',
      },
      {
        q: '何枚くらい比べればよいですか',
        a: '変える語を一つにして、二枚か三枚です。枚数の正解はありません。メモが無い十枚より、変えた語を書いた三枚の方が次に使えます。',
      },
      {
        q: '作った絵を売ってよいですか',
        a: 'モデルとサービスのライセンス次第です。確認の順番は商用利用のガイドにあります。このページは許可を出しません。',
      },
    ],
  },

  'hires-fix-upscale-guide': {
    sections: [
      {
        title: '高画質化の方法',
        content: `「stable diffusion hires fix」で先に分けるのは、拡大のタイミングです。一段目の構図が決まる前に拡大すると、崩れた形を大きくしてから二度目の描画が走ります。このページは四つの方法の使い分けと、目安の設定だけを書きます。速度が何倍か、メモリが何 GB 減るかは書きません。GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、です。

バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。2026年11月時点の確認先は、A1111 の Features、Forge が WebUI の上に載るという README、ComfyUI のアップスケールのチュートリアルです。

| 方法 | いつ使うか | 公式で見る名前 |
|---|---|---|
| Hires. fix | txt2img の一段目のあと、同じ生成の中で拡大して細部を足す | txt2img の Hires. fix |
| img2img で拡大 | すでに保存した画像の寸法を変えて描き直す | img2img の Denoising strength |
| Extras | 描き直さず、アップスケーラーだけで画素を増やす | Upscaler 1 / Upscaler 2 |
| ComfyUI | ノードで、画素のモデルか潜在の拡大を選ぶ | Load Upscale Model、Upscale Latent |

一段目のサンプラーは [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) に短い説明があります。このページが手順の本体です。元画像から直す強さは [img2imgの使い方](/guides/img2img-guide)、ノードの基本は [ComfyUIの使い方](/guides/comfyui-guide)、欄の場所は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。

<a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">A1111 の Features</a> と、このページの項目名が違って見えたときは、開いている版の画面を採ってください。`,
      },
      {
        title: 'Hires. fix とは・基本設定',
        content: `Features は、Hires. fix を、低い解像度で一部を描き、選んだ方法で拡大し、img2img に近い二度目の処理で細部を足す便宜機能だと説明しています。txt2img の Hires. fix にチェックを入れると有効です。hints.js は、小さい解像度で作り、拡大してから、構図を変えずに細部を足す、と書いています。

2026年11月時点の A1111 の画面定義では、欄の名前と初期値が次のとおりです。

| 項目 | 初期値 | 読み方 |
|---|---|---|
| Upscaler | 潜在の既定（ソースでは Latent） | 拡大のアルゴリズム |
| Hires steps | 0 | hints は、0 なら元のステップ数を使う、と説明。処理側も 0 のとき一段目の steps を使う |
| Denoising strength | 0.7 | 二度目の描画の強さ。0 に近いほど一段目を残す |
| Upscale by | 2 | 倍率。ソースの範囲は 1 から 4 |
| Resize width to / Resize height to | 0 | 両方 0 なら Upscale by を使う、と Features |

Features は、Resize width to と Resize height to が両方 0 のとき Scale by を使い、片方だけ 0 のときはもう片方から計算し、両方に数字があると少なくともその寸法まで拡大して一部を切る、と説明しています。画面の倍率のラベルは Upscale by です。古い説明の Scale by と同じ欄です。

目安は、画素のアップスケーラーでは Denoising strength を 0.3 から 0.5、Latent と付く名前ではそれより高め、Upscale by は 1.5 から 2 です。画面の初期値 0.7 と 2 は、目安とは別の初期位置です。モデルの配布ページに推奨値があればそれを優先してください。

最初の拡大は、Upscaler を一つに固定し、Denoising strength だけを 0.4 と 0.5 の二枚で見ます。二枚の差が顔の差なら、強さが原因です。二枚が同じように崩れているなら、一段目の顔がすでに崩れているので、Hires. fix をオフに戻します。Upscale by を同じ実験で 1.5 から 2 に動かさないでください。倍率と強さが同時に変わると、どちらのせいなのかが残りません。

Hires steps を 0 のままにするのは、一段目の Sampling steps を二段目にも使うためです。一段目を 28 で気に入ったなら、二段目もまず 28 です。二段目だけを 10 にすると、拡大の荒さと、ステップ不足の荒さが混ざります。速くしたい気持ちが先に出る日は、拡大自体をオフにしてください。

\`\`\`
最初の一枚: Hires. fix オフ
形が決まってから: Upscale by 1.5
画素の Upscaler: Denoising strength 0.4
Hires steps: 0（元と同じ）か、一段目より少なめ
\`\`\``,
      },
      {
        title: 'Upscaler の種類と選び方',
        content: `Upscaler の一覧は、潜在空間の名前と、画素のアップスケーラーがつながったものです。2026年11月時点の A1111 のソースで、潜在の名前は次です。

\`\`\`
Latent
Latent (antialiased)
Latent (bicubic)
Latent (bicubic antialiased)
Latent (nearest)
Latent (nearest-exact)
\`\`\`

Features の比較表は、Latent と Latent (antialiased)、Latent (bicubic)、Latent (nearest) を並べています。表の括弧の中のカンマの有無は、ソースの名前と一致しない行があります。画面に出ている綴りを選んでください。潜在の見た目だけを確認するときは、Features が Denoising strength を 0、Hires steps を 1 にすると近似が見える、と書いています。本番の目安ではありません。

画素側で、同じ時点のソースに名前があるものは None、Lanczos、Nearest、ESRGAN の \`ESRGAN_4x\` です。Real-ESRGAN は、設定の初期選択が \`R-ESRGAN 4x+\` と \`R-ESRGAN 4x+ Anime6B\` です。それ以外の Real-ESRGAN の名前はソースに定義があっても、初期のチェックからは外れています。SwinIR というモジュールファイルは、同じ時点の modules 一覧には無かったので、同梱とは書きません。

選び方は順位ではありません。写真の段差が気になるときは Lanczos や R-ESRGAN 4x+ を一枚、アニメの線を残したいときは R-ESRGAN 4x+ Anime6B を一枚、同じ Seed で比べます。Latent は、拡大した潜在に対してもう一度描くので、Denoising strength を上げないと細部が乗りにくいです。逆に、画素のアップスケーラーで Denoising を 0.7 のままにすると、顔が別の形に寄ることがあります。

追加のアップスケーラーファイルには、それぞれのライセンスがあります。配布ページで確認してください。Forge Neo の README は、.pth と .safetensors を ESRGAN フォルダに置く、と書いています。A1111 の Features は、ESRGAN を webui.py と同じ場所のディレクトリに置く、とも書いています。出ないときは両方の場所を見てください。モデルは .safetensors を選べるならそれを優先し、信頼できる配布元のものだけを入れます。

ファイルを足した日は、プロンプトを変えません。一覧に新しい名前が出たことを確認し、同じ Seed の一枚だけをその名前で出します。名前が出ないファイルを、フォルダを行き来させながらプロンプトも直すと、直った理由が残りません。ライセンスの文が配布ページに無いファイルは、公開用の絵には使いません。個人の試しで見ることと、人に渡すことは別です。

ComfyUI のアップスケール用フォルダは \`models/upscale_models\` で、WebUI の ESRGAN とは綴りが違います。同じファイルを両方で使うときは、コピーするか、ComfyUI の \`extra_model_paths.yaml\` で A1111 側の \`models/ESRGAN\` を指します。指し方の例は、ComfyUI の例のファイルにコメントとしてあります。`,
      },
      {
        title: '設定の目安',
        content: `下はメモです。カードに数字があるモデルでは、カードの一行を先に使います。無ければ、この目安から一項目だけ動かします。

\`\`\`
画素のアップスケーラー（目安）
Upscaler: R-ESRGAN 4x+
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.4
\`\`\`

\`\`\`
アニメ寄りの画素（目安）
Upscaler: R-ESRGAN 4x+ Anime6B
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.35
\`\`\`

\`\`\`
Latent（目安。画素より Denoising を高めに）
Upscaler: Latent
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.55
\`\`\`

\`\`\`
寸法を直接書くとき
Resize width to と Resize height to を両方 0 以外
Upscale by は、Features の説明では両方に数字があるとき主役ではない
切れるのが嫌なら、まず Upscale by だけ
\`\`\`

一段目の幅と高さは、完成サイズではありません。SD 1.5 のモデルカードは、512×512 での追加学習を書いています。A1111 の Features は、SD1/2 が 512px または 768px で学習されたため、最初から非常に大きい解像度にすると破綻する、と説明し、Hires. fix をその回避として紹介しています。SDXL の幅と高さは、使うモデルの配布ページを優先してください。ComfyUI の最初の一枚のチュートリアルは、Empty Latent Image が 1024 から始まり、SD 1.5 の例では 512 に変える、と書いています。縦長の比率は [縦横のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) です。`,
      },
      {
        title: 'img2img・Extras での拡大',
        content: `保存済みの一枚を大きくするときは、Hires. fix をオンにし直すのではなく、img2img にその画像を置きます。Denoising strength は、形を残すなら 0.3 から 0.5 が目安です。1 に近いと別の絵です。寸法だけ先に二倍へすると、Resize mode の差と強さの差が同時に出ます。手順は [img2imgの使い方](/guides/img2img-guide) です。

描き直したくないときは Extras です。2026年11月時点の後処理スクリプトは、Upscale の欄に Upscaler 1 と Upscaler 2、Upscaler 2 visibility を置いています。2 の visibility が 0 なら、実質的に 1 だけです。ここには Denoising strength がありません。線や肌の質は、一段目の絵のまま拡大されます。質を足したいときは Hires. fix か img2img に戻してください。肌の語自体は [肌の質感プロンプト](/guides/skin-texture-prompt-guide)、品質の語は [品質タグ一覧](/guides/quality-tags-prompt-guide) です。

img2img で寸法を変える日は、プロンプトを最終の絵として全部書き、Denoising strength だけを動かします。元画像に写っている服を、プロンプトから消すと、その部分が平均の服に戻ります。拡大が目的の日は、服の語を新しく発明しないでください。Hires. fix で気に入った Denoising を、img2img にそのまま写して一枚見るのは構いません。写したうえで、さらに Upscaler の種類まで変えると、比較になりません。

Extras の結果が粗いときは、別の Upscaler 1 を同じ画像に一枚だけ掛けます。Hires. fix のプロンプトは、Extras では使われません。粗い原因をプロンプトの語だと思って品質の語を足しても、Extras の画素は変わりません。

\`\`\`
描き直して細部を足す: Hires. fix または img2img
画素だけ増やす: Extras の Upscaler 1
二つを混ぜる: Upscaler 2 visibility を 0 より上へ。同じ日に Denoising は動かさない
\`\`\`

Extras は生成のプロンプトを使いません。プロンプトで直したい崩れは、Extras の前に txt2img へ戻します。`,
      },
      {
        title: 'ComfyUI での高画質化',
        content: `公式のアップスケールのチュートリアルは、アップスケール用のモデルを \`ComfyUI/models/upscale_models\` に置き、\`Load Upscale Model\` と \`Upscale Image (Using Model)\` をつなぎます。ノード文書の見出しは \`Upscale Image (using Model)\` で、Using の大文字が違います。検索は Upscale Image です。実行は、そのチュートリアルでは Queue、または \`Ctrl+Enter\`（macOS は Cmd）です。

\`\`\`
Load Image または VAE Decode
→ Load Upscale Model（models/upscale_models）
→ Upscale Image (using Model)
→ Save Image
\`\`\`

潜在のまま拡大してからもう一度描くときは、\`Upscale Latent\` のあとに二段目の KSampler を置きます。ノード文書は、denoise の初期値が 1.0 で、低いほど入力の形を残す、と説明しています。二段目は 1.0 未満にします。画素のアップスケーラーに相当する二段目の目安は 0.3 から 0.5、Latent の拡大のあとはそれより高め、です。

\`\`\`
KSampler（denoise 1.0）
→ Upscale Latent
→ KSampler（denoise 0.45、目安）
→ VAE Decode
→ Save Image
\`\`\`

ファイルのライセンスは配布ページで確認します。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。詳しいノードの基本は [ComfyUIの使い方](/guides/comfyui-guide) です。チュートリアルの全文は <a href="https://docs.comfy.org/tutorials/basic/upscale" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ComfyUI のアップスケール解説</a> です。SD 1.5 の学習解像度の記述は <a href="https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">SD 1.5 のモデルカード</a> で確認できます。`,
      },
      {
        title: 'プロンプト例',
        content: `六つとも、一段目のプロンプトと、拡大のメモを組にしています。メモの数字は目安です。カードに推奨があればカードを使います。人物は \`adult\` を残します。

**顔の近い肖像**

\`\`\`
1 adult woman, adult, portrait, black hair, white blouse,
soft daylight, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

\`\`\`
Upscaler: R-ESRGAN 4x+
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.35
\`\`\`

**全身。顔は小さくなりやすい**

全身のまま顔だけを直す手順は [ADetailerの使い方](/guides/adetailer-face-fix-guide) です。先にこのメモで形を安定させてください。

\`\`\`
1 adult woman, adult, full body, long coat, standing,
simple background, soft daylight, detailed face
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped
\`\`\`

\`\`\`
Upscaler: R-ESRGAN 4x+
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.3
\`\`\`

**壁紙の風景**

\`\`\`
wide landscape, lake and pine trees, morning mist,
soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

\`\`\`
Upscaler: R-ESRGAN 4x+
Upscale by: 2
Hires steps: 0
Denoising strength: 0.4
\`\`\`

**商品写真**

\`\`\`
product photo, ceramic cup on linen, soft studio light,
simple background, sharp focus
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

\`\`\`
Upscaler: Lanczos
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.3
\`\`\`

**細かいファンタジーの背景**

\`\`\`
fantasy background, stone bridge, lanterns, evening light,
no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

\`\`\`
Upscaler: Latent
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.55
\`\`\`

**アニメ調の成人**

\`\`\`
1 adult man, adult, anime style, short hair, jacket, shirt,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

\`\`\`
Upscaler: R-ESRGAN 4x+ Anime6B
Upscale by: 1.5
Hires steps: 0
Denoising strength: 0.35
\`\`\``,
      },
      {
        title: 'うまくいかないとき',
        content: `崩れるときは、Denoising strength を 0.1 だけ下げて一枚出します。Upscaler の種類は同じ日に変えません。二重の輪郭が出るときは、画素のアップスケーラーのまま Denoising が高すぎることがあります。0.3 まで下げ、まだ二重なら Hires. fix をオフにして一段目を保存し、Extras の Upscaler 1 だけを試します。

遅いと感じるときは、Upscale by を 2 から 1.5 に下げ、Hires steps を 0 のままにします。0 は元のステップ数なので、一段目の Sampling steps が大きければ二段目も同じだけ動きます。steps を半分にする実験は、一段目を固定してから Hires steps に小さい数字を一つ入れる、です。何倍速いかは環境で変わるので書きません。

メモリが足りないときは、一段目の幅と高さを下げ、Upscale by を 1.5 にし、バッチを 1 にします。Latent と画素を同じ日に往復しないでください。

顔が別人になるときは、Denoising strength を下げます。全身で顔が小さいまま直らないときは、拡大を強くするより [ADetailerの使い方](/guides/adetailer-face-fix-guide) です。プロンプトに品質の語を増やしても、二段目の Denoising は下がりません。

\`\`\`
崩れる: Denoising を 0.1 下げる
二重: 0.3 まで下げる。ダメなら Extras だけ
遅い: Upscale by を 1.5。倍率の自慢はしない
顔が変わる: Denoising を下げる。全身なら ADetailer
\`\`\``,
      },
      {
        title: '解像度と縦横比の考え方',
        content: `完成の縦横は、用途が決めてから拡大の倍率を掛けます。アイコンは正方形に近く、記事の横幅は横長、スマホの壁紙は縦長、です。比率のタグと、画面の幅と高さは別の指定です。タグだけを \`full body\` にしても、幅と高さが横長のままだと足が切れます。

目安として、SD 1.5 はモデルカードの 512×512 付近から始め、SD1/2 について Features が書く 768px も「学習されたサイズ」の説明です。最適値という順位ではありません。SDXL は配布ページの推奨を開いてから、Empty Latent Image や txt2img の幅と高さを合わせます。縦長の書き方は [縦横のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) です。

\`\`\`
1. 用途の縦横を決める
2. 学習サイズに近い一段目で顔と構図を決める
3. Upscale by 1.5 から 2
4. カードに解像度の行があれば、その行を優先
\`\`\``,
      },
    ],
    faq: [
      {
        q: 'Hires. fix と Extras はどう違いますか',
        a: 'Hires. fix は拡大したあとに Denoising strength でもう一度描きます。Extras の Upscaler 1 は画素を増やすだけで、プロンプトでは描き直しません。',
      },
      {
        q: 'Hires steps の 0 は何ですか',
        a: 'A1111 の hints は、0 なら元のステップ数を使う、と説明しています。処理側も 0 のとき一段目の steps を使います。',
      },
      {
        q: 'Denoising strength はいくつが正しいですか',
        a: '正しい一つはありません。画素のアップスケーラーでは 0.3 から 0.5、Latent ではそれより高め、が目安です。画面の初期値は 0.7 です。配布ページに推奨があればそちらを優先してください。',
      },
      {
        q: 'Upscale by を最初から 4 にしてよいですか',
        a: '目安は 1.5 から 2 です。ソース上のスライダーは 4 まで動けますが、大きい倍率はメモリと時間を使います。一段目が安定してから 0.5 ずつ上げてください。',
      },
      {
        q: 'ComfyUI ではどのノードですか',
        a: '画素のモデルは Load Upscale Model と Upscale Image (using Model) です。公式チュートリアルの見出しは Using の大文字が違うことがあります。潜在でもう一度描くときは Upscale Latent のあとに KSampler を置き、denoise を 1 未満にします。',
      },
      {
        q: '顔だけが崩れます',
        a: 'Denoising strength を下げて一枚見ます。全身で顔が小さいときは、ADetailer のページへ分けてください。品質タグを足すだけでは二段目の強さは変わりません。',
      },
    ],
  },

  'adetailer-face-fix-guide': {
    sections: [
      {
        title: '顔が崩れる主な原因',
        content: `「adetailer 使い方」の前に、顔が崩れる理由を分けます。拡張を入れる前に直る崩れまで、検出と再描画に渡さないでください。渡すと、プロンプトの矛盾が顔だけ別の絵になります。

実在の人物の顔を再現・差し替える用途には使わないでください。このページの人物は、文章で指定した成人だけです。

直す順番をメモの上から下へ固定します。まず構図で顔を大きくする。次に CFG と LoRA の強さを戻す。その次に Hires. fix の Denoising を下げる。最後に、顔だけが残っているときだけ検出を入れます。順番を飛ばして拡張から始めると、プロンプトの矛盾が顔のマスクの中だけで増えます。増えた顔は、本体の絵と表情が合いません。

一人の実験が終わるまで、二人の絵には進みません。二人は検出が複数になり、どの顔にどの文章が当たったのかが任意になります。一人で denoising の目安が分かってから、二人の節を開いてください。

| 見え方 | 先に見ること | 拡張の前にやること |
|---|---|---|
| 全身で顔が小さい | 顔の画素が足りない | 胸から上にする。または一段目の解像度を目安の範囲で上げる |
| 全体がぼやける | 幅と高さが、モデルの学習サイズから離れすぎ | [Hires. fix の使い方](/guides/hires-fix-upscale-guide) で一段目を決めてから拡大 |
| LoRA を足したときだけ崩れる | 強さが高すぎる、土台と系統が違う | 強さを下げ、ファイルを一つにする。[LoRAの使い方](/guides/stable-diffusion-lora-guide) |
| 肌がプラスチックのように溶ける | CFG が高すぎる、steps が極端 | CFG Scale を 7 前後へ戻す。[サンプラー](/guides/stable-diffusion-sampler-guide) |
| 目と口が別の指示を両方満たそうとする | プロンプトの矛盾 | 表情の語を一つにする |

バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。数字は目安で、モデルの配布ページに推奨値があればそれを優先します。

<a href="https://github.com/Bing-su/adetailer" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ADetailer の README</a> は、顔や手や人物を検出してマスクを作り、その範囲を inpaint する拡張だと説明しています。`,
      },
      {
        title: 'まずプロンプトで直す',
        content: `検出の前に、顔が画面の中で読める大きさを確保します。\`detailed face\` は、顔の情報を増やす自然な英語として一つまでです。公式タグだと断定はしません。表情の語は [表情プロンプト](/guides/stable-diffusion-expression-prompt)、目の色は [目のプロンプト](/guides/eye-prompt-guide) で、このページでは同時に強くしません。

**胸から上**

\`\`\`
1 adult woman, adult, upper body, detailed face, black hair,
white blouse, looking at viewer, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**全身。顔が小さくなりやすいので、あとで近づける前提**

\`\`\`
1 adult woman, adult, full body, detailed face, long coat,
standing, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
cropped, extra faces
\`\`\`

**アニメ調の成人**

\`\`\`
1 adult man, adult, anime style, upper body, detailed face,
short hair, jacket, shirt, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**写真寄りの肖像**

\`\`\`
1 adult woman, adult, photorealistic, portrait, detailed face,
natural skin, white blouse, soft daylight, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

四つを同時に平均しないでください。直したいのが大きさなら構図だけ、肌なら \`natural skin\` だけを動かします。ネガティブの年齢の語は残します。入れないものの全体は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

\`detailed face\` を足しても全身のままなら、顔の画素はほとんど増えません。語は、構図が胸から上になってから効きます。全身が必要な絵は、この四つのどれかで顔が安定した Seed を保存し、その Seed のまま full body に戻します。戻したときに顔が小さいのは、画素の問題です。語をさらに三個足す前に、解像度の節へ進んでください。

表情の語は一つです。\`smile\` と、口を閉じる語と、怒りを同じ強さで置くと、口が平均になります。表情を変える実験は、ADetailer の欄ではなく、まず本体の正向で一語だけ差し替えます。本体で表情が決まらないときに、顔だけの欄へその一語を移します。`,
      },
      {
        title: '設定で直す',
        content: `プロンプトを固定したまま、設定を一つ動かします。

解像度は、SD 1.5 ならモデルカードが書く 512×512 付近、それより大きい完成が欲しいときは Hires. fix で二段にします。最初から完成サイズで全身を出すと、顔の画素が減ります。Hires. fix の Denoising strength が高すぎると、拡大のときに顔が別人になります。画素のアップスケーラーでは 0.3 から 0.5 が目安です。

CFG Scale は、A1111 の初期値が 7.0 です。それより大きくしたまま顔が溶けるなら、7 に戻して一枚出します。steps を同じ日に半分にしないでください。LoRA の強さは、顔が崩れるなら 0.6 より下へ一つ下げ、ファイルは一つにします。

\`\`\`
顔が小さい: upper body にする。または Hires. fix を Upscale by 1.5
顔が別人: Hires の Denoising strength を 0.35 へ
溶ける: CFG Scale を 7
LoRA: 強さを一つ下げる。ファイルは一つ
\`\`\`

この四つのあとでも顔だけが悪いときに、次の節へ進みます。

設定のメモは、解像度、Hires. fix の有無、Denoising strength、CFG Scale、LoRA の強さ、の五行です。五行のうち動かした行に印を付けます。印が二つある枚は、採用しても原因が残りません。LoRA を外して顔が戻るなら、拡張の問題ではありません。ファイルの強さか、土台との不一致です。拡張を入れる前に、LoRA 無しの一枚を残してください。その一枚がすでに崩れているなら、拡張は崩れを拡大します。`,
      },
      {
        title: 'ADetailer とは・導入',
        content: `ADetailer の README は、動きを三段階で説明しています。画像を作る。検出モデルで対象を見つけてマスクを作る。そのマスクで inpaint する。検出モデルの例として、README の表は \`face_yolov8n.pt\`、\`face_yolov8s.pt\`、\`hand_yolov8n.pt\`、\`person_yolov8n-seg.pt\`、\`person_yolov8s-seg.pt\`、\`mediapipe_face_full\`、\`mediapipe_face_short\`、\`mediapipe_face_mesh\` を挙げています。YOLO の顔モデルは 2D と realistic の顔、手は手、person は人物、mediapipe は realistic の顔、と表にあります。精度の数値はこのページでは写しません。

追加の YOLO は、README が \`models/adetailer\` に置き、拡張子は \`.pt\`、と書いています。配布元の一つとして README が挙げるのは <a href="https://huggingface.co/Bingsu/adetailer" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Hugging Face の Bingsu/adetailer</a> です。モデルは信頼できる配布元のものだけを入れてください。

A1111 への入れ方は、README が Extensions の Install from URL に次の URL を入れる、と書いています。

\`\`\`
https://github.com/Bing-su/adetailer.git
\`\`\`

Install のあと、Installed で更新を確認して UI を再起動し、さらにターミナルごと起動し直す、と README は書いています。画面の再起動だけでは足りないことがあります。

\`\`\`
Extensions → Install from URL
URL を確認して Install
Installed から再起動
起動したターミナルも止めて、もう一度起動
\`\`\`

手のモデル \`hand_yolov8n.pt\` は、指の文章を直したあとで試します。手のプロンプトは [手と指のプロンプト](/guides/hand-finger-prompt-guide) です。このページの本筋は顔です。

顔のモデルを二つ同時にオンにしないでください。\`face_yolov8n.pt\` と \`face_yolov8s.pt\` を同じ生成で比べるときは、別々の一枚にします。s の方が常に良い、という順位は README の表からは読みません。表は対象の種類を書いているだけで、こちらの絵での優劣は Seed を固定した二枚で見ます。mediapipe の顔は、README が realistic の顔と書いています。アニメの線の顔に最初から mediapipe を選ぶ理由は、表にはありません。アニメの一枚は YOLO の顔から試します。

モデルファイルを \`models/adetailer\` 以外に置いても、ADetailer の一覧は見にいきません。チェックポイント用の \`models/Stable-diffusion\` と混ぜないでください。拡張子は README が \`.pt\` と指定しています。画像用の .safetensors を、このフォルダの検出モデルだと期待しないでください。画像を描くチェックポイントの話と、検出モデルの話は別です。`,
      },
      {
        title: 'ADetailer の設定',
        content: `README の表にある名前と、2026年11月時点のソースが画面の項目として対応づけている名前は、少し違います。両方を置きます。空欄のプロンプトは、README が「入力と同じものを使う」と説明しています。

| README の説明 | ソース上の項目名 | メモ |
|---|---|---|
| ADetailer model | ADetailer model | None で無効 |
| ADetailer prompt / negative prompt | ADetailer prompt / ADetailer negative prompt | 空なら本体と同じ |
| Detection model confidence threshold | ADetailer confidence | ソースの初期値は 0.3 |
| inpaint 側のぼかしに対応 | ADetailer mask blur | ソースの初期値は 4 |
| inpaint の描き直しの強さ | ADetailer denoising strength | ソースの初期値は 0.4 |
| マスクした範囲だけ | ADetailer inpaint only masked | ソースの初期値はオン |
| 別の幅と高さ | ADetailer use inpaint width height | 初期値はオフ |
| 別の steps | ADetailer use separate steps | 初期値はオフ |
| 別の CFG | ADetailer use separate CFG scale | 初期値はオフ |

目安は、ADetailer denoising strength を 0.3 から 0.5 です。ソースの初期値 0.4 はその範囲に入ります。顔が別人になるなら 0.3 へ下げ、ほとんど変わらないなら 0.5 を一枚だけ試します。confidence を上げると、弱い検出はマスクから外れます。検出されないときは、下げる前に、顔が画面に写っているかを見ます。

\`\`\`
ADetailer model: face_yolov8n.pt
ADetailer prompt: 空（本体と同じ）から始める
ADetailer denoising strength: 0.4
ADetailer confidence: 0.3
ADetailer inpaint only masked: オン
ADetailer use separate steps: オフ
ADetailer use separate CFG scale: オフ
\`\`\`

\`\`\`
顔が変わりすぎるとき
ADetailer denoising strength: 0.3
ADetailer mask blur: 4 のまま
プロンプトは空に戻す
\`\`\`

複数の顔に別の文章を当てる機能は、README が Advanced の Wiki へ案内している \`[SEP]\` です。Wiki は、検出順にプロンプトを分け、検出順はかなり任意なので注意する、と書いています。順序を指定したつもりでも、左右が入れ替わることがあります。

\`\`\`
adult woman, detailed face, natural skin [SEP] adult man, detailed face, short hair
\`\`\``,
      },
      {
        title: 'ADetailer 用プロンプト例',
        content: `ADetailer prompt に入れる文は、顔の範囲だけを描写します。服と背景をここに繰り返すと、マスクの外の情報まで顔の描き直しに混ざります。空欄で本体と同じで足りるなら、空欄のままが先です。

**顔だけの文章**

\`\`\`
adult woman, detailed face, natural skin, soft smile
\`\`\`

ネガティブ（ADetailer negative prompt）:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**表情だけを変える**

表情の語の一覧は [表情プロンプト](/guides/stable-diffusion-expression-prompt) です。本体のプロンプトの表情と矛盾する語は、本体側から外してください。

\`\`\`
adult woman, detailed face, gentle smile, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**写真寄りの顔**

\`\`\`
adult man, detailed face, natural skin, calm expression
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**二人。検出順は任意**

Wiki の \`[SEP]\` で分けます。どちらが先に検出されるかは固定されません。

\`\`\`
adult woman, detailed face, soft smile [SEP] adult man, detailed face, calm expression
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

本体側の二人の文は、これと別に txt2img へ置きます。

\`\`\`
2 adults, adult woman and adult man, standing, upper body,
white blouse, navy jacket, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

自然文で顔だけを書くときは、括弧を付けません。

\`\`\`
An adult woman, detailed face, natural skin, soft smile.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\``,
      },
      {
        title: 'Forge Neo・ComfyUI での使い方',
        content: `Forge Neo では、A1111 向けの ADetailer が動くとは限りません。ADetailer Neo の README は、Forge Neo で動く公式のフォークだと書いています。初回起動で検出モデルを \`models/adetailer/\` に置く、とも書いています。YOLO は \`.pt\` です。以前に別の ADetailer を入れているときは、README が Settings と UI Defaults を見直すか、\`config.json\` と \`ui-config.json\` を消して全部を初期化する、と注意しています。消すと、顔以外の設定も戻ります。

\`\`\`
Forge Neo: Haoming02/ADetailer-Neo
モデルの置き場所: models/adetailer/
以前の版がある: 設定を見直す。初期化は他の欄も戻る
\`\`\`

導入の URL は <a href="https://github.com/Haoming02/ADetailer-Neo" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ADetailer Neo</a> です。Forge 本体の入れ方は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。

ComfyUI では、Impact Pack の README が \`FaceDetailer\` を、顔を検出して改善するノードだと説明しています。同じ README は、\`UltralyticsDetectorProvider\` は Impact Pack 本体には無く、Impact Subpack を別に入れる、と書いています。顔のノードだけを探すときは FaceDetailer の名前で検索し、検出モデルの読み込みで Subpack を求められたときだけ、README の手順で Subpack を足します。

\`\`\`
git clone https://github.com/ltdrdata/ComfyUI-Impact-Pack comfyui-impact-pack
\`\`\`

クローンは \`ComfyUI/custom_nodes\` で実行する、と README が書いています。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。FaceDetailer 以外の第三者ノードは、このページでは勧めません。ノードの基本は [ComfyUIの使い方](/guides/comfyui-guide)、Impact Pack の README は <a href="https://github.com/ltdrdata/ComfyUI-Impact-Pack" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ltdrdata/ComfyUI-Impact-Pack</a> です。`,
      },
      {
        title: 'うまくいかないとき',
        content: `効かないときは、ADetailer model が None のままになっていないかを見ます。None は無効です。ファイルが \`models/adetailer\` に無いときも、一覧に出ません。拡張を入れたあとにターミナルごと再起動したかを確認します。

顔が別人になるときは、ADetailer denoising strength を 0.3 に下げ、ADetailer prompt を空に戻します。空なら本体のプロンプトを使います。顔だけの文章に、服や背景や別の髪型を書くと、マスクの中で別人になります。

境目が出るときは、ADetailer mask blur を、初期値の 4 から大きくする方向で一つだけ変えます。Denoising と blur を同じ日に動かさないでください。inpaint only masked をオフにすると、描き直す範囲が広がり、背景まで動くことがあります。

検出されないときは、顔が小さすぎないかを見ます。全身のまま confidence だけを下げても、画素が無ければマスクは不安定です。先に upper body か Hires. fix で顔を大きくします。二人のときに左右が逆なのは、Wiki が検出順は任意だと書いているためです。\`[SEP]\` の左右を入れ替えて一枚見るか、プロンプトを分けずに空欄へ戻します。

\`\`\`
効かない: model が None でないか。再起動したか
別人: denoising 0.3。顔の文章を空に戻す
境目: mask blur を一つだけ動かす
検出されない: 顔を大きくしてから confidence
\`\`\`

手は \`hand_yolov8n.pt\` を短く試すだけにして、指の文章は手のガイドへ戻してください。実在の人物の顔を、この拡張で差し替える使い方はしません。`,
      },
    ],
    faq: [
      {
        q: 'ADetailer は最初から入れるべきですか',
        a: 'いいえ。胸から上にする、Hires. fix の Denoising を下げる、CFG を 7 に戻す、を先にします。顔だけが残るときに入れます。',
      },
      {
        q: 'どの検出モデルを選びますか',
        a: 'README の表では face_yolov8n.pt と face_yolov8s.pt が顔、hand_yolov8n.pt が手、person の seg が人物、mediapipe_face_full などが realistic の顔です。最初は face_yolov8n.pt で一枚見てください。',
      },
      {
        q: 'プロンプト欄は空でよいですか',
        a: 'README は、空なら入力と同じプロンプトを使う、と説明しています。顔だけを書きたいときだけ、服や背景を繰り返さない短い文を入れます。',
      },
      {
        q: 'Forge Neo ではどの拡張ですか',
        a: 'ADetailer Neo です。README が、Forge Neo で動くフォークだと書いています。A1111 向けの URL をそのまま入れて動く、とは限りません。',
      },
      {
        q: 'ComfyUI では何というノードですか',
        a: 'Impact Pack の README は FaceDetailer を、顔を検出して改善するノードだと説明しています。検出モデル用の UltralyticsDetectorProvider は、同じ README が Subpack 側だと書いています。',
      },
      {
        q: '二人の顔に別の表情を指定できますか',
        a: '公式 Wiki の [SEP] で、検出された順にプロンプトを分けられます。順番は任意だと Wiki が注意しているので、左右が入れ替わることがあります。',
      },
    ],
  },
}
