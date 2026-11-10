/**
 * Thirteenth SEO batch (2026-11-10): Stable Diffusion getting started,
 * LoRA training, ChatGPT image limits, SDXL, and Midjourney how-to.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 * UI names, folders, and commands are limited to official docs checked 2026-11-10.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_13_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'stable-diffusion-getting-started-guide': {
    sections: [
      {
        title: '使い方は、どこで動かすかから決める',
        content: `「stable diffusion 使い方」で最初に決めるのは、ブラウザのサービスで一枚試すか、自分の PC に入れて枚数を自分で管理するかです。利用方法、始め方、ダウンロード、インストール、ローカル環境、オンラインは、この選択の言い換えです。2026年11月時点で、ソフトの名前は複数あります。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

このページは、環境を一つ選んで、最初の一枚を出し、次のガイドへ渡すところまでです。Forge のパッケージ名、ComfyUI のノードのつなぎ、サンプラーの性質、LoRA の強さは、それぞれのページに残します。同じ手順を二度書くと、どちらが古いか分からなくなります。

| やりたいこと | このページでの扱い |
|---|---|
| まず一枚、インストールなし | ブラウザのサービス。料金と枚数の上限はサービスごとに違う |
| 欄に書いて生成したい | [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide)。元の欄は AUTOMATIC1111 |
| 処理の順番を保存したい | [ComfyUIの使い方](/guides/comfyui-guide) |
| タグの順番を覚える | [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide) |
| どのモデルか | [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) |

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。風景、物、食べ物には人数を書きません。服は閉じた日常着です。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。モデルは .safetensors 形式を選びます。

一枚を仕上げる順番の全体は [AIイラストの作り方](/guides/ai-illustration-how-to-guide)、カテゴリの入口は [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list) です。`,
      },
      {
        title: '画面の選び方',
        content: `ローカルで動かす画面は、2026年11月時点で三つを区別すれば足ります。AUTOMATIC1111 の Stable Diffusion web UI は、txt2img と img2img の欄がある元の画面です。Forge は、その WebUI の上に載るプラットフォームで、続きとして Forge Neo があります。ComfyUI は、ノードを線でつなぐ画面です。どれも、プロンプトの文章そのものは同じ成人の書き方から始められます。

| 画面 | 公式の位置づけ | 向くとき |
|---|---|---|
| AUTOMATIC1111 | Gradio の web UI。README は one click install and run script と書いている | 欄の名前で解説を探したい |
| Forge / Forge Neo | WebUI の上のプラットフォーム。Neo のブランチは \`neo\` | 欄のある画面で、新しいモデルも見たい |
| ComfyUI | ノードのグラフ。Desktop、ポータブル、手動がある | つなぎを JSON で残したい |
| ブラウザのサービス | インストール不要。計算はサービス側 | PC の GPU をまだ持っていない |

ブラウザのサービスは、名前と料金がよく変わります。このページは金額を書きません。公式がデモとして名前を出している例は、SDXL のモデルカードが Clipdrop に触れています。詳細は [SDXLとは](/guides/sdxl-guide) です。見知らぬサイトへモデルファイルをアップロードする手順は書きません。

選んだあとは、その画面だけを一週間使います。Forge を入れた日に ComfyUI も入れると、モデルを置いたフォルダが二つになります。フォルダの綴りは画面で違います。WebUI と Forge の例は \`models/Stable-diffusion\` と \`models/Lora\`、ComfyUI の例は \`models/checkpoints\` と \`models/loras\` です。詳しい対応表は Forge と ComfyUI のガイドにあります。

GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、とだけ覚えてください。AUTOMATIC1111 の README は 4GB video card support と書いています。これはその README の記載で、SDXL や、それより新しいモデルが同じ容量で動く保証ではありません。速度が何倍か、このページでは書きません。`,
      },
      {
        title: 'インストールの概要',
        content: `ダウンロードして入れる、という検索は、ローカルの話です。ここでは公式 README の入口だけを写し、分岐した先は各ガイドへ渡します。2026年11月時点の AUTOMATIC1111 の README は、Windows の自動インストールを次の順で書いています。Python は 3.10.6、Add Python to PATH にチェック、git を入れる、リポジトリを clone する、\`webui-user.bat\` を通常のユーザーで実行する。README は、より新しい Python は torch をサポートしない、と書いています。管理者として bat を実行する、とは書いていません。

\`\`\`
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
\`\`\`

\`\`\`
webui-user.bat
\`\`\`

Windows 10/11 で NVIDIA GPU 向けの別経路として、README は release の \`sd.webui.zip\`（v1.0.0-pre）を展開し、\`update.bat\` のあと \`run.bat\`、とも案内しています。Linux は、依存を入れたあと \`webui.sh\` を実行する、または同じリポジトリを clone して \`webui.sh\` を実行する、と README にあります。Apple シリコンは、README が Installation on Apple Silicon の Wiki へ分けています。NVIDIA の詳細は <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-NVidia-GPUs" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Install and Run on NVidia GPUs</a>、本体は <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">AUTOMATIC1111 の README</a>、Mac は <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Apple Silicon の Wiki</a> です。

Forge は、元の Forge と Forge Neo で導入が別です。元の Forge の README は one-click の 7z を勧め、git に慣れている人には \`https://github.com/lllyasviel/stable-diffusion-webui-forge.git\` を clone して \`webui-user.bat\`、と書いています。Forge Neo の clone はブランチ \`neo\` です。パッケージ名、\`update.bat\`、\`run.bat\`、uv の行は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) に、2026年11月時点の README のまま置いてあります。このページではコマンドを二度写しません。

\`\`\`
Forge の詳細: /guides/stable-diffusion-forge-guide
元のリポジトリ: lllyasviel/stable-diffusion-webui-forge
Neo のブランチ: neo
\`\`\`

ComfyUI は、公式 README が Desktop（Windows と macOS）、Windows のポータブル版、手動インストール、comfy-cli を分けています。手動の依存と起動の例は、次の二行です。ポータブル版の 7z の名前と、Python の版の注意は [ComfyUIの使い方](/guides/comfyui-guide) です。

\`\`\`
pip install -r requirements.txt
python main.py
\`\`\`

<a href="https://github.com/comfyanonymous/ComfyUI" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ComfyUI の README</a> と、入れた日の画面が違ったら、README を採ってください。チェックポイントを置く場所の例は、WebUI が \`models/Stable-diffusion\`、ComfyUI が \`models/checkpoints\` です。

\`\`\`
WebUI / Forge: models/Stable-diffusion
ComfyUI: models/checkpoints
拡張子: .safetensors
\`\`\`

モデルファイルは、配布ページのライセンスを開いてから置きます。系統の見分けは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。出所の分からない URL を、拡張のインストール欄へ貼らないでください。`,
      },
      {
        title: '最初の一枚',
        content: `ソフトがブラウザを開いたら、モデルが一つ選ばれているかを先に見ます。一覧が空なら、前の節のフォルダへ .safetensors を置いて、画面の更新を押します。ComfyUI の公式チュートリアルは、何も選択していない状態で \`R\` を押す、と書いています。ボタン名は版で違います。

最初の比較は、プロンプトと Seed を固定し、Sampling method だけを変えないことです。変えるものを一つにします。目安の一行は、モデルの配布ページに推奨があればそちらを優先します。無ければ、steps は 20 から 30、CFG Scale は 7 前後から一枚だけ試します。A1111 の画面定義では CFG Scale の初期値が 7.0 です。これは目安です。Hires. fix はオフから始めます。拡大は [Hires. fixの使い方](/guides/hires-fix-upscale-guide)、サンプラーの性質は [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) です。

\`\`\`
Sampling steps: 20 から 30（目安）
CFG Scale: 7 前後（A1111 の初期値は 7.0）
Seed: 固定
Hires. fix: オフ
解像度: モデルのカードの基準。SD1.5 系は 512 前後、SDXL は 1024 前後
\`\`\`

ComfyUI でゼロからつなぐときは、公式チュートリアルのノード名が \`Load Checkpoint\`、\`CLIP Text Encode (Prompt)\`、\`Empty Latent Image\`、\`KSampler\`、\`VAE Decode\`、\`Save Image\` です。KSampler の文書上の初期値の例は steps 20、cfg 8.0、denoise 1.0 です。つなぎの表は ComfyUI のガイドにあります。テンプレートから始める方が、最初の一枚は短いです。

生成ボタンを押して、人が切れていないか、指が六本でないか、服が指定と違うか、の三つだけを見ます。三つを同時にプロンプトで直さないでください。直す順番は、人数、服、背景です。顔だけが小さいときは [ADetailerの使い方](/guides/adetailer-face-fix-guide)、元画像から直すときは [img2imgの使い方](/guides/img2img-guide) です。

メモは五行です。モデル名、Sampling method、steps、CFG、Seed。この五行が無い枚は、翌日には再現できません。

アニメかイラストかで迷うときは、画風の語を足す前に、この五行が同じ二枚を先に出します。一枚目は \`anime style\` だけを足し、二枚目は足しません。両方を残した枚は、比較に使いません。日本語の見出しをファイル名に付けても、プロンプト欄の本文は英語のままにします。欄が日本語入力のままだと、カンマの位置が全角になり、タグが一つの長い語として読まれることがあります。カンマは半角です。

ダウンロード、という言葉で探すファイルは、ソフトの入れ物と、モデルファイルの二つです。ソフトは各 README の clone か、公式が案内する圧縮ファイルです。モデルは、そのあとでチェックポイント用のフォルダへ置きます。圧縮ファイルを、モデル用フォルダへ置いただけでは一覧に出ません。展開した中の \`.safetensors\` を置いてください。`,
      },
      {
        title: 'プロンプト、アニメ、イラスト、日本語',
        content: `Stable Diffusion の基本は、カンマで区切った英語です。公式の作例も英語です。日本語の文だけを貼っても、英語のタグより意図が残りにくいことがあります。このページでは英語を基本にし、同じ内容の自然文を一枚だけ比べる材料にします。日本語をメモの見出しに使うのは自由です。生成欄へ入れる本文は、英語に訳してから貼ってください。

順番は、人数、見た目、服、ポーズ、構図、背景、光です。強調したい語だけを人数の直後へ移します。括弧の強調は、A1111 の README が \`(tuxedo:1.21)\` のような数値と、二重の括弧を説明しています。ComfyUI の README は、数値なしの \`()\` の初期強調を 1.1 とし、括弧を文字として残すときは \`\\(\` と \`\\)\` と書いています。記号の違いは [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

アニメとイラストは、画風の語を一つだけ足します。\`anime style\` と写真の語を同じ強さにすると、顔の半分だけが別の媒体になります。アニメ向けに追加学習したモデルは、推奨タグがカードごとに違います。[アニメプロンプト](/guides/anime-prompt-guide) と [Illustriousプロンプト](/guides/illustrious-prompt-guide)、品質の語は [品質タグ一覧](/guides/quality-tags-prompt-guide) です。

下の七つは、そのまま正向と負向に分けて貼れます。LoRA を足す日は、文章を固定し、\`<lora:filename:0.7>\` の一行だけを足します。書き方は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

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

**二人、並んで立つ**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
standing side by side, coat, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\`

**アニメ寄りのイラスト**

\`\`\`
1 adult woman, adult, anime style, cel shading,
black hair, white blouse, cardigan, upper body,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic
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

**静物**

\`\`\`
product photo, ceramic cup on a linen cloth,
soft studio light, simple background, sharp focus
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text, watermark
\`\`\`

**自然文（同じ肖像を、文で書くとき）**

\`\`\`
One adult woman, adult, black hair, white blouse.
Upper body portrait, looking at the camera.
Plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

自然文が通るのは、文を読むモデルに寄せたときです。SD1.5 のタグ用チェックポイントでは、上の英語タグの方が残りやすいことがあります。系統はモデル一覧で確認してください。`,
      },
      {
        title: '無料と、オンラインで試す境界',
        content: `「stable diffusion 無料」で混ざるのは、三つの別の話です。ソフトのリポジトリに料金表が無いこと、モデルのライセンスが商用を許すかどうか、ブラウザのサービスが無料枠を置くかどうか、です。このページは、三番目の金額と枚数を書きません。サービスごとに変わり、ここに写すと古くなるためです。

ローカルに入れた AUTOMATIC1111、Forge、ComfyUI は、公式 README が生成一枚ごとの料金を案内していません。かかるものは、自分の PC と電気です。枚数の上限をソフトが持たない、という意味であって、ライセンスが何でも許すという意味ではありません。商用利用の確認順は [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) です。

オンラインは、インストールできない PC や、まず感触だけ知りたいときの入口です。アカウントの種類で待てる時間や枚数が変わるサービスがあります。数字はこのページに書きません。プロンプトの練習なら、ローカルと同じ英語の文を、そのサービスの入力欄へ貼って一枚出します。設定項目が少ないサービスでは、Sampling steps や CFG が画面に無いことがあります。無い欄を、ローカルの目安で埋めようとしないでください。

オンラインで気に入った文は、メモに残して、ローカルへ移したときに同じ Seed が使えるとは限りません。Seed の意味はソフトで違います。移した日は、文だけを固定し、Seed は新しい画面で取り直します。

モデルファイルを、見知らぬ無料サイトから落とす手順は書きません。Hugging Face の公式モデルカードか、作者が README で案内している配布ページを開いてください。成人向けの作例が並ぶサイトへは、このページからリンクしません。

ローカルが「無料で何枚でも」に見えるのは、ソフト側が枚数の請求画面を出さない、という意味です。PC がモデルを読めないときは、枚数以前に一枚目が出ません。そのときはオンラインで文の形だけ練習し、フォルダの問題が解けてから同じ文をローカルへ戻します。戻す日に、オンラインの画面のボタン名をプロンプトへ書かないでください。ボタン名は、そのサービスだけの言葉です。`,
      },
      {
        title: '入らない、出ない、崩れる',
        content: `「インストール できない」「生成できない」は、変えるものを一つにして切り分けます。同じ失敗のあいだに、拡張とモデルとプロンプトを同時に足さないでください。

起動しないときは、公式が前提にしている条件から見ます。AUTOMATIC1111 の Windows 自動インストールは、Python 3.10.6 と、PATH への追加と、管理者ではない \`webui-user.bat\` です。より新しい Python は torch をサポートしない、と README が書いています。初回は依存の取得が終わるまでブラウザが開きません。窓を閉じると、次も同じ取得からになることがあります。Mac は Apple Silicon の Wiki、Linux は \`webui.sh\` の節です。Forge と ComfyUI は、Python の推奨が別です。A1111 の 3.10.6 を、ComfyUI の README の版だと決めつけないでください。

\`\`\`
起動しないとき
1. README の Python の版と、入っている版
2. PATH（Windows の自動インストール）
3. bat を管理者で動かしていないか
4. 初回の依存取得が終わるまで待ったか
\`\`\`

画面は開くのに画像が無いときは、モデルのフォルダと拡張子です。\`.safetensors\` を、チェックポイント用のフォルダへ置いたかを見ます。LoRA 用の \`models/Lora\` にチェックポイントを置いても、txt2img の一覧には出ません。置いたあとの更新ボタンか \`R\` を押します。

画像は出るが人が崩れるときは、解像度をそのモデルの基準へ戻し、Hires. fix をオフにし、プロンプトを人数と服と背景だけにします。品質の語を五個並べた日は、語を二つまで減らしてからもう一枚です。顔だけなら ADetailer、拡大なら Hires. fix、参照画像で姿勢を固定するなら [ControlNetの使い方](/guides/controlnet-guide) です。

真っ黒、または全体が灰色のときは、VAE がモデルと合っていない場合があります。チェックポイントに VAE が含まれているなら、別の VAE を無理につなぎません。色の日に、サンプラーとプロンプトも変えないでください。

メモリが足りない、と出るときは、幅と高さを小さくして一枚だけ試します。バッチを 1 に戻し、ほかの生成を止めてから、もう一度です。容量の下限を、このページで新しい数字にして測りません。`,
      },
      {
        title: '次に読むページ',
        content: `最初の一枚が保存できたら、足りない層を一つだけ開きます。同じ日に三ページ分のタグをコピーしないでください。先頭の \`adult\` が後ろへ押し出されます。

| 次に困ること | ページ |
|---|---|
| タグの順番、服、構図 | [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide) |
| SDXL の解像度と Refiner | [SDXLとは](/guides/sdxl-guide) |
| 配布された LoRA を書く | [LoRAの使い方](/guides/stable-diffusion-lora-guide) |
| LoRA を自分で作る | [LoRA学習のやり方](/guides/lora-training-guide) |
| 顔が小さい | [ADetailerの使い方](/guides/adetailer-face-fix-guide) |
| 大きくしたい | [Hires. fixの使い方](/guides/hires-fix-upscale-guide) |
| ブラウザの文章で試す | [ChatGPTの画像生成](/guides/chatgpt-image-generation-guide) |

公開する前に、モデルのライセンスと、写した元画像の権利を開きます。実在の人物、他人の作品、作品のキャラクター名は、プロンプトに書きません。このページの作例は、成人の私服と、人のいない風景と静物だけです。

一週間の進め方は、画面を一つ、モデルを一つ、プロンプトを一系統に固定することです。月の最初の日に Forge を入れ、次の日に ComfyUI を入れ、三日目にブラウザのサービスへ同じ文を貼ると、フォルダが三つになり、どれが今の絵の原因かが残りません。気に入った文は、ツール名をファイル名の先頭に付けて保存します。戻るときは、そのファイルの五行メモと、今日の画面の欄の名前が一致するかを先に見ます。一致しない欄は、空欄のままにします。空欄を、別のソフトの初期値で埋めないでください。`,
      },
    ],
    faq: [
      {
        q: 'Stable Diffusion は無料で使えますか',
        a: 'AUTOMATIC1111、Forge、ComfyUI の公式 README は、生成一枚ごとの料金を案内していません。モデルのライセンスと、ブラウザのサービスの枠は別です。金額と枚数の上限は、このページでは書きません。商用の確認順は商用利用のガイドです。',
      },
      {
        q: 'オンラインとローカルはどちらから始めるとよいですか',
        a: 'GPU が無い、またはインストールで止まっているときはブラウザで一枚試します。枚数とモデルを自分で選びたいときはローカルです。料金の比較表はこのページにありません。',
      },
      {
        q: 'Windows と Mac で手順は同じですか',
        a: '同じではありません。AUTOMATIC1111 の README は、Windows の自動インストールに Python 3.10.6 と webui-user.bat、Linux に webui.sh、Apple シリコンは別 Wiki です。Forge と ComfyUI も OS でファイル名が違います。',
      },
      {
        q: '日本語のプロンプトは通りますか',
        a: '公式の作例は英語です。このページでは英語のタグを基本にし、自然文は英語で一枚だけ比べます。日本語はメモの見出しに使い、生成欄の本文は英語に訳してから貼ってください。',
      },
      {
        q: 'インストールできないときは何を見ますか',
        a: 'そのソフトの README が書いてある Python の版、PATH、管理者ではない起動、初回の依存取得が終わるまで閉じないこと、の順です。A1111 の 3.10.6 を、ほかのソフトの推奨だと決めつけないでください。',
      },
      {
        q: 'アニメと実写は同じプロンプトですか',
        a: '人数と服の行は同じにできます。画風は anime style か写真の語の、どちらか一つです。追加学習したアニメモデルの推奨タグは、モデル一覧と配布ページを優先してください。',
      },
    ],
  },

  'lora-training-guide': {
    sections: [
      {
        title: 'このページは、LoRA を作る手順',
        content: `「stable diffusion 学習させる」「lora 学習」「lora 作り方」は、小さな追加ファイルを自分で作る作業です。すでに配布されたファイルを \`<lora:ファイル名:強さ>\` で書く手順は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。このページは作り方だけを担当します。読み込んでも絵が変わらないときのフォルダと強さは、使う側のガイドへ戻してください。

2026年11月時点で、公式の学習手順としてこのページが確認したのは <a href="https://github.com/kohya-ss/sd-scripts" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">kohya-ss/sd-scripts</a> です。README は、対応モデルに Stable Diffusion 1.x/2.x、SDXL、SD3/SD3.5、FLUX.1 などを挙げ、LoRA の学習を機能に含めています。概要は <a href="https://github.com/kohya-ss/sd-scripts/blob/main/docs/train_network.md" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">train_network.md</a>、SDXL は <a href="https://github.com/kohya-ss/sd-scripts/blob/main/docs/sdxl_train_network.md" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">sdxl_train_network.md</a>、データセットの書き方は <a href="https://github.com/kohya-ss/sd-scripts/blob/main/docs/config_README-ja.md" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">設定ガイドの日本語</a> です。バージョンによって引数名が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

README の Windows のインストール節は、ターミナルのコマンドです。学習用 GUI の製品名は、2026年11月時点のその節には出ていません。このページでは GUI の名前を作りません。できた \`.safetensors\` は、sdxl の文書が AUTOMATIC1111 と ComfyUI で使える、と書いています。ComfyUI 側の読み方は使う側のガイドです。公式ドキュメントに、学習専用ノードの一つの名前が標準手順として載っているかは、書いた時点では確認できなかったので、ノード名は挙げません。

カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。ベースのチェックポイントも、出力の LoRA も、.safetensors 形式を選びます。`,
      },
      {
        title: '使ってよい画像',
        content: `学習に使う画像は、自分が撮影したか、自分が描いたか、利用の許諾を文書で持っているものだけです。他人のイラスト、投稿された写真、作品のキャラクター、実在の人物を、同意なしに学習へ入れません。顔が写る写真は、写っている本人の同意が無いなら使いません。このページの作例は、自分のコートと、成人の私服を想定した架空のキャプションです。実在の個人名は書きません。

枚数の必須値は、train_network の概要が一つに決めていません。同じ対象を、光と角度を変えた複数枚で揃えます。枚数が少ないほど、その一枚の背景や、たまたま写った文字まで覚えることがあります。時間の必須値も、公式は固定していません。かかる時間は、枚数、解像度、GPU で変わります。何分で終わるか、このページでは書きません。GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、とだけ覚えてください。VRAM の測定値は書きません。

画像から、作品名、他人の名前、画面の端の文字を外します。切る作業は、学習の前に画像編集で行います。公式 README は、顔の回転を扱うツールとして \`tools/detect_face_rotate.py\` に触れ、このツールは opencv が要る、と書いています。これは顔だけの学習モードという項目名ではありません。顔の特徴を寄せたいときは、顔が分かる構図の、権利がある画像を自分で選び、キャプションにその特徴を書きます。

ベースにするチェックポイントの系統を、先に決めます。SD1.5 用に学習した LoRA は、SDXL のチェックポイントではほぼ効かないか、絵が崩れます。逆も同じです。系統の見分けは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list)、SDXL の解像度は [SDXLとは](/guides/sdxl-guide) です。

フォルダは、学習用と、生成用を分けます。学習用の画像ディレクトリには、\`.txt\` のキャプションと画像だけを置きます。できた \`.safetensors\` は、学習用フォルダへ戻さず、WebUI なら \`models/Lora\`、ComfyUI なら \`models/loras\` です。同じディレクトリに両方があると、次の学習が出力ファイルまで画像として読もうとすることがあります。キャプションの無い出力を、データセットに混ぜないでください。

「簡単」に寄せるなら、最初のファイルは物か、自分の絵の画風です。人の顔は、同意と、背景のばらつきが揃ってからにします。物の LoRA が一つ、トリガーありと無しで違って見えれば、脚本とフォルダは通っています。その確認の前に、顔の枚数を増やしても、失敗の原因が増えるだけです。`,
      },
      {
        title: '学習データの作り方',
        content: `公式の設定は、\`.toml\` を \`--dataset_config\` で渡します。設定ガイドは TOML を勧めています。キャプションは、画像と同じ名前の \`.txt\` に書けます。例のファイルは \`caption_extension = '.txt'\` です。文章を自動で付ける補助として、README は WD14 Tagger の文書を挙げています。日本語の文書は <a href="https://github.com/kohya-ss/sd-scripts/blob/main/docs/wd14_tagger_README-ja.md" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">wd14_tagger_README-ja.md</a> です。自動のタグは、目で読んでから残します。権利の無い名前や、他人の作品名は消します。手書きの \`.txt\` だけでも学べます。

トリガーワードは、その LoRA を呼び出すための、普段の英語に無い語です。\`shuffle_caption = true\` のときは、先頭の語が混ぜられないように \`keep_tokens\` を使います。設定ガイドの例は、\`[general]\` で \`keep_tokens = 1\`、データセット側で上書き、という形です。このページの例では、トリガーを一行目の先頭に置き、\`keep_tokens = 1\` でその一語を固定します。公式の設定例にはプレースホルダの分類語があります。このページの \`class_tokens\` は、成人の語か、物の名前に置き換えてください。

\`\`\`
[general]
shuffle_caption = true
caption_extension = '.txt'
keep_tokens = 1

[[datasets]]
resolution = 512
enable_bucket = true
batch_size = 1

  [[datasets.subsets]]
  image_dir = '/path/to/your-images'
  num_repeats = 10
\`\`\`

\`resolution = 512\` は、設定ガイドの DreamBooth 風の例です。別の例は \`resolution = [768, 768]\` です。SDXL の学習文書は、高解像度と \`enable_bucket = true\` が一般的、と書いています。一つの必須ピクセル数は、その節では指定していません。生成時の 1024 前後は、SDXL のページの話です。学習の解像度を、生成の解像度だと決めつけないでください。\`num_repeats = 10\` は、設定表に例として載る繰り返し回数です。必須の枚数ではありません。

\`\`\`
oakcoat, wool coat, standing, simple background, soft daylight
\`\`\`

\`\`\`
mysubject, 1 adult woman, adult, black hair, white blouse,
upper body, simple background, soft daylight
\`\`\`

上の二行は、画像の横に置くキャプションの例です。\`oakcoat\` と \`mysubject\` は、このページが作ったトリガーの場所です。実在の人の名前にはしないでください。コートの行は、自分が所有する服の写真を想定しています。人の行は、同意のある成人の写真があるときだけ使います。

繰り返しの意味は、公式の議論が二つ書いています。正則化用の画像と枚数の釣り合いを取ること、フォルダごとに重みを変えることです。ステップの説明は、あるバケットの 1 epoch のステップが、そのバケットの枚数かける repeats をバッチサイズで割り、切り上げたもの、epoch 全体はその和、総ステップはそれに epoch 数をかけたもの、という形です。枚数を増やす代わりに repeats だけを大きくすると、同じ数枚を何度も見ることになります。`,
      },
      {
        title: '繰り返し、エポック、学習率の目安',
        content: `数字は、公式ドキュメントの例です。最適な値ではありません。モデルの配布ページに、そのベース向けの推奨があれば、それを優先してください。

train_network の実行例は、\`--network_dim=16\`、\`--network_alpha=1\`、\`--learning_rate=1e-4\`、\`--max_train_epochs=10\`、\`--save_every_n_epochs=1\` です。説明文は、\`network_dim\` を 4 から 128 の範囲で使われることが多い、と書いています。\`network_alpha\` は、一般に \`network_dim\` の半分程度が推奨だが、同じ値にすることもある、デフォルトは 1、と同じ文書にあります。学習率は、alpha が 1 の LoRA では \`1e-4\` から \`1e-3\` がよく使われる、とも書いています。Text Encoder を分けるときは、U-Net より小さめ、とあります。

SDXL の実行例は、脚本が \`sdxl_train_network.py\` で、\`--network_dim=32\`、\`--network_alpha=16\`、\`--learning_rate=1e-4\`、\`--unet_lr=1e-4\`、\`--text_encoder_lr1=1e-5\`、\`--text_encoder_lr2=1e-5\`、\`--max_train_epochs=10\` です。Text Encoder が二つなので、学習率の引数が二つに分かれています。文書は、1 が OpenCLIP ViT-G/14、2 が CLIP ViT-L/14、と書いています。\`--mixed_precision\` は \`bf16\` または \`fp16\` が推奨、\`fp16\` のときは VAE が float16 で不安定になることがあるので \`--no_half_vae\`、とも書いています。

\`\`\`
公式の例（SD1 系の train_network。必須値ではない）
network_dim: 16
network_alpha: 1（半分程度、または dim と同じ、という説明もある）
learning_rate: 1e-4（alpha が 1 のとき 1e-4 から 1e-3 がよく使われる、と文書）
max_train_epochs: 10
save_every_n_epochs: 1
\`\`\`

\`\`\`
公式の例（SDXL の sdxl_train_network。必須値ではない）
network_dim: 32
network_alpha: 16
unet_lr: 1e-4
text_encoder_lr1: 1e-5
text_encoder_lr2: 1e-5
max_train_epochs: 10
mixed_precision: bf16 または fp16
fp16 のとき: --no_half_vae
\`\`\`

10 epoch は実行例です。枚数と \`num_repeats\` が違えば、総ステップは違います。保存が 1 epoch ごとなのは、途中のファイルを比べるためです。一番最後のファイルが、いつも最良、ではありません。

過学習の公式スコアは、このページでは扱いません。見るのは、トリガーを外したプロンプトまで、学習画像の背景や顔に寄っていないかです。寄っていたら、それより前の epoch のファイルを使います。学習率を上げた日に、epoch 数も repeats も変えないでください。どの変更が寄ったのかが消えます。`,
      },
      {
        title: '実行のコマンド',
        content: `Windows の README は、Python 3.10.x と git を前提にし、3.11 と 3.12 は動くがテストしていない、と書いています。clone と仮想環境は次です。PyTorch の行は CUDA の版で変わります。2026年11月時点の README は CUDA 12.4 向けの例と、RTX 50 シリーズでは別の版、と書いています。ここにピン留めの一行を写すと古くなるので、入れた日の Windows Installation のコマンドを使ってください。\`accelerate config\` の答えの例は、このマシン、分散学習なし、最後は fp16、と README にあります。bf16 にするなら最後の答えを変えます。

\`\`\`
git clone https://github.com/kohya-ss/sd-scripts.git
cd sd-scripts
python -m venv venv
\`\`\`

\`\`\`
Windows: .\\venv\\Scripts\\activate
Linux: source venv/bin/activate
\`\`\`

SD1 系の実行例の骨子は、\`train_network.py\` と \`--network_module=networks.lora\` と \`--dataset_config\` と \`--pretrained_model_name_or_path\` です。SDXL は脚本の名前が \`sdxl_train_network.py\` で、ベースには SDXL のモデルを渡します。文書の例は、Hugging Face の ID \`stabilityai/stable-diffusion-xl-base-1.0\`、ローカルの Diffusers 形式、または \`.safetensors\` のパス、です。\`--v2\` は SD1.x/2.x 用で、SDXL の脚本では通常指定しない、と文書が書いています。

\`\`\`
accelerate launch --num_cpu_threads_per_process 1 sdxl_train_network.py \\
  --pretrained_model_name_or_path="stabilityai/stable-diffusion-xl-base-1.0" \\
  --dataset_config="my_sdxl_dataset_config.toml" \\
  --output_dir="output" \\
  --output_name="my_sdxl_lora" \\
  --save_model_as=safetensors \\
  --network_module=networks.lora \\
  --network_dim=32 \\
  --network_alpha=16 \\
  --learning_rate=1e-4 \\
  --max_train_epochs=10 \\
  --save_every_n_epochs=1
\`\`\`

上は、公式の例から、このページの説明に要る引数だけを残したものです。\`--text_encoder_lr1\` や \`--cache_latents\` や \`--gradient_checkpointing\` は、sdxl の文書の完全な例にあります。写し漏らしが心配なら、文書のコードブロックをそのまま使い、パスだけを自分のファイルに変えてください。出力は \`output_dir\` に、\`output_name\` の \`.safetensors\` です。

SD1.5 で同じ形にするときは、脚本を \`train_network.py\` に変え、ベースのパスを SD1.5 のチェックポイントに変え、Text Encoder の学習率は二つの引数に分けません。系統を混ぜないでください。`,
      },
      {
        title: 'できたファイルの使い方',
        content: `ファイルは、WebUI と Forge なら \`models/Lora\`、ComfyUI なら \`models/loras\` です。拡張子は \`.safetensors\` のまま、プロンプトに書く名前からは外します。強さの最初の一手は、使う側のガイドが 0.7 を目安にしています。配布ページに推奨があればそちらです。

\`\`\`
<lora:my_sdxl_lora:0.7>
\`\`\`

テストは二枚です。一枚はトリガーあり、一枚はトリガーなし。Seed、チェックポイント、それ以外の文は固定します。トリガーなしまで学習画像に似るなら、前の epoch に戻ります。トリガーありでも何も変わらないなら、フォルダ、ファイル名、ベースの系統を見ます。強さを上げるのは、そのあとです。

**コートの確認（物。人数は書かない）**

\`\`\`
wool coat on a chair, simple background, soft daylight, oakcoat,
<lora:my_sdxl_lora:0.7>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**成人の肖像で、トリガーを足す**

\`\`\`
1 adult woman, adult, mysubject, black hair, white blouse,
upper body, simple background, soft daylight,
<lora:my_sdxl_lora:0.7>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**成人の男性。学習が服の差分なら、人の文は固定**

\`\`\`
1 adult man, adult, navy jacket, shirt, trousers,
standing, upper body, simple background,
<lora:my_sdxl_lora:0.7>
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**トリガーを外した比較用**

\`\`\`
1 adult woman, adult, black hair, white blouse,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**風景。人物用の LoRA が背景まで汚さないかの確認**

\`\`\`
quiet street, overcast daylight, wide landscape, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**自然文**

\`\`\`
One adult woman, adult, black hair, white blouse, upper body,
plain background, soft daylight. Use the LoRA tag at the end.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

自然文のモデルでは、\`<lora:...>\` の記号が通りません。そのときは ComfyUI の Load LoRA か、WebUI の欄から挿入します。挿入された文字列が \`<lora:ファイル名:数字>\` になっているかを見てください。詳しくは使う側のガイドです。

人のキャプションで学習していないファイルに、\`mysubject\` を書いても、その人にはなりません。トリガーは、学習した画像の共通点を呼ぶ語です。`,
      },
      {
        title: '顔だけを寄せたいとき',
        content: `検索の「顔だけ」は、専用のボタン名としては、train_network の概要に見当たりません。やることは、データとキャプションの範囲を顔に寄せることです。同意のある成人の写真だけを使い、背景が毎回違う枚を混ぜすぎない、キャプションでは顔の特徴をトリガーの直後に書く、服や場所は毎回同じ語にしない、です。同じ部屋の同じ椅子ばかりだと、顔ではなく椅子を覚えます。

\`\`\`
mysubject, 1 adult woman, adult, portrait, black hair,
looking at viewer, simple background
\`\`\`

ネガティブは、学習のキャプションではなく、できたあとの生成で使います。

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

顔の写真が権利の範囲外なら、この節は使わず、服や画風のように、自分の物と自分の絵へ戻ってください。実在の人物の顔を、同意なく再現するファイルは作りません。できたファイルを公開するときは、ベースモデルのライセンスと、写っている人の同意の範囲を、ファイルの説明に書きます。説明が無いファイルを、他人が安全に使える、とは限りません。`,
      },
      {
        title: 'うまくいかないとき',
        content: `直すときは一つだけ変えます。学習率を変えた回は、枚数を増やしません。枚数を増やした回は、dim を変えません。

| 症状 | 先に見ること |
|---|---|
| すぐエラーで止まる | Python の版、venv が有効か、ベースのパス、toml の image_dir |
| 出力が無い | output_dir と output_name。save_model_as が safetensors か |
| 生成で効かない | 置き場所、拡張子をプロンプトに含めていないか、ベースの系統 |
| トリガー無しでも学習画像になる | 前の epoch。repeats と epoch を同時に上げていないか |
| 顔だけを頼んだのに背景が固定される | 背景が毎回同じ写真になっていないか |
| SDXL の絵が崩れる | SD1.5 の脚本とベースを組み合わせていないか。fp16 なら --no_half_vae |

\`\`\`
切り分け
1. ベースの系統（SD1.5 と SDXL を混ぜない）
2. toml の image_dir と caption_extension
3. 1 epoch ごとのファイルを、トリガーありと無しで二枚
4. 効かないときだけ、フォルダ名と <lora:名前:強さ>
\`\`\`

インストールそのものが進まないときは、sd-scripts の README の、自分の OS の節を開きます。組織の PC では、README が案内する PowerShell の実行ポリシーを、自分の判断で変える前に方針を確認してください。このページは、そのコマンドを推奨手順として転記しません。

学習の途中でサンプル画像を出す引数は、版で名前が違います。文書の実行例に無い引数は、\`python sdxl_train_network.py --help\` で綴りを確認してから足してください。見知らぬスクリプトを、sd-scripts のフォルダへ混ぜないでください。

所要時間を短くしたい、という検索には、公式が一つの時間を書いていません。文書が推奨しているのは、SDXL では \`--cache_latents\` や \`--gradient_checkpointing\` のように、計算を省略したりメモリを分けたりするオプションです。これらは速く終わる約束ではなく、VRAM を抑えるための案内です。オンにした日に、キャプションのシャッフルも変えると、キャッシュが効かない組み合わせがあります。\`--cache_text_encoder_outputs\` は、テキストエンコーダを学習しない指定とセット、と SDXL の文書が注意しています。セットを片方だけ足さないでください。

出来たファイルを人に渡すときは、ベースのモデル名、系統、トリガー、学習に使った画像の権利、を同じ説明に書きます。説明が無い \`.safetensors\` は、受け取った側が系統を間違え、崩れた絵の原因をプロンプトだと思い込みます。

キャプションを書き終えたあとに見るのは、トリガーがすべての \`.txt\` の先頭にあるか、\`keep_tokens\` がその一語を守っているか、画像の横に別の名前の \`.txt\` が残っていないか、です。自動タグを足した日は、手書きの文を消していないかを開いて確認します。消えた文は、学習には戻りません。タグの並びが毎回同じ部屋の言葉ばかりなら、その部屋を覚えたファイルになります。部屋の語を、枚ごとに変えるか、キャプションから外してください。外したあとは、前の epoch と比較せず、そのキャプションで最初から短い学習を一回だけやり直します。途中のファイルに、新しいキャプションは遡りません。`,
      },
    ],
    faq: [
      {
        q: 'LoRA の使い方のページと何が違いますか',
        a: '使い方のページは、配布されたファイルをフォルダへ置き、プロンプトへ書く手順です。このページは、kohya-ss/sd-scripts でファイルを作る手順です。強さの直し方は使い方のページへ戻してください。',
      },
      {
        q: '何枚あれば学習できますか',
        a: '公式の train_network は、必須枚数を一つに決めていません。同じ対象を、光と角度を変えた複数枚で揃えます。枚数の代わりに repeats だけを大きくすると、同じ数枚を何度も見ます。',
      },
      {
        q: '学習率はいくつですか',
        a: 'train_network の例は 1e-4 で、alpha が 1 のとき 1e-4 から 1e-3 がよく使われる、と文書にあります。SDXL の例は U-Net が 1e-4、二つの Text Encoder が 1e-5 です。必須値ではなく、配布ページの推奨があればそちらです。',
      },
      {
        q: '画像サイズは 1024 ですか',
        a: '設定ガイドの例には 512 と 768 があります。SDXL の学習文書は高解像度と enable_bucket が一般的、と書き、一つの必須ピクセル数は指定していません。生成時の 1024 前後は SDXL のガイドの話です。',
      },
      {
        q: '顔だけの LoRA は公式のモードですか',
        a: 'train_network の概要に、その名前の項目は見当たりません。同意のある画像を顔の構図で選び、キャプションに特徴を書きます。他人の顔や、他人の絵は使いません。',
      },
      {
        q: 'ComfyUI だけで学習できますか',
        a: '書いた時点で、公式ドキュメントに学習専用ノードの標準の名前は確認できていません。このページは sd-scripts で作り、できた safetensors を ComfyUI の models/loras で読みます。',
      },
    ],
  },

  'chatgpt-image-generation-guide': {
    sections: [
      {
        title: '制限は、枚数が公開されていない',
        content: `「chatgpt 画像生成 制限」と「チャットgpt 画像生成 制限」で知りたいのは、何枚まで、いつ戻るか、無料だとどこまでか、です。2026年11月時点の公式ヘルプは、画像生成の枚数を固定の数字で公開していません。ここに「一日に何枚」と書くと、翌週には違います。最新の上限は公式ヘルプで確認してください。

<a href="https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ChatGPT Free Tier FAQ</a> は、無料の利用者は日常のテキストチャットが無制限で、ただし不正利用の防止はある、と書いています。ファイルのアップロード、画像生成、音声、データ分析、そのほかのツールは、別の利用上限がある、とも書いています。上限に達すると ChatGPT が通知する、とあります。同じ FAQ は、次のツールがメインのチャット上限とは別に上限を持つことがある、と列挙しています。データ分析、ファイルと画像のアップロード、ChatGPT で画像を作ること、です。

<a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a> は、作る機能の名前を ChatGPT Images とし、ChatGPT Images 2.6 はより速く、編集のあいだ細部をより保つ、と説明しています。画像の生成は、依頼の複雑さによって数分かかることがある、とも書いています。待ち時間の倍率や、プランごとの枚数は、この記事にはありません。

混雑時やプランによって上限が変わる、と読んでください。このページは、上限をすり抜ける手順を書きません。使えるのは、通知された時刻まで待つ、プランを見直す、別のツールで同じ下書きを試す、の三つです。`,
      },
      {
        title: '上限の確認と、リセット',
        content: `枚数を自分で数えるより、画面の通知を見ます。Free Tier FAQ は、該当する上限に達すると ChatGPT が知らせる、と書いています。GPT の利用が無料枠のモデル上限に達すると、リセットまで GPT の利用が止まり、リセットの時刻は製品の中に表示される、とも書いています。画像生成は、そのモデル上限とは別のメーターです。文章はまだ返るのに、画像だけ止まった、という状態は、FAQ の「別の利用上限」と矛盾しません。

リセットの時刻が画面に出ていれば、その時刻まで待ちます。時刻の計算式は、FAQ が一つの式にしていないので、このページでも作りません。「何時間で戻るか」は、そのときの通知を見てください。

FAQ は、無料枠で上限に達したあと、Plus、Pro、または Business に更新すると、利用量がリセットされる、と書いています。Plus の利用者は、より高いレート制限がある、とも書いています。料金、枚数の差、無制限かどうかは、この FAQ の該当節には固定の数字がありません。料金表の文言は変わりやすいので、金額はこのページに書きません。更新した瞬間に画像が必ず出る、とも書きません。通知と、製品内の時刻を見てください。

「チャットがいっぱい」は、画像の上限と別です。FAQ は、Context window full と Chat memory full を、その会話で使える情報の量だと説明し、メッセージの本数は固定ではない、と書いています。この通知なら、新しいチャットを始められます。画像の上限の通知なら、新しいチャットに変えても画像は止まったまま、ということがあります。通知の文を、メモに一行残してから、待つのか、チャットを分けるのかを決めてください。

画像のモデル名と、文章のモデル名も混ぜません。書いた時点の Images の記事は ChatGPT Images 2.6、Free Tier FAQ は文章側のアクセスとして GPT-5.6 Luna に触れています。画像を頼んだときに、文章モデルの名前だけを指定しても、画像の上限は別です。`,
      },
      {
        title: '画像を出す手順',
        content: `Images in ChatGPT は、会話の中で作りたい画像を説明するか、More を選んでから Images を選ぶ、と書いています。プロンプトを入れたあと、ChatGPT Images が説明どおりの画像を生成します。生成には数分かかることがあり、そのあいだも ChatGPT を使い続けられる、とあります。Web、iOS、Android で使える、とも書いています。

縦横は、アスペクト比のピッカーで選ぶか、プロンプトの中に希望の比率を書きます。記事は、任意のアスペクト比で生成できる、と書いています。比率の名前が画面とプロンプトで違うときは、ピッカーを優先し、プロンプトには被写体を残してください。

編集は二つです。選択ツールで一部を選んでから変更を書くか、選択を飛ばして会話に変更を書くか、です。特定の範囲だけを変えたいときは、その範囲をプロンプトに含めます。ハイライトは常に正確ではなく、選んだ範囲の外まで編集が及ぶことがある、と記事が注意しています。

作った画像は Images に自動で保存される、とあります。消すときは、その画像を作った会話を消します。Web では会話のタイトルにカーソルを合わせてメニューから Delete、iOS と Android ではタイトルを長押しして Delete、と記事にあります。

公式の DALL·E GPT は引退した、と FAQ の節にあります。画像を作り続けるには ChatGPT Images を使う、と書いています。古い記事の「DALL·E を GPT 一覧から選ぶ」は、今のヘルプの手順ではありません。

テンプレートは、サイドバーの Images から Templates、カテゴリを選んで詳細を足す、と記事にあります。Work mode ではテンプレートはまだ使えない、とも書いています。項目名は版で変わることがあります。違っていたら、今のヘルプを見てください。

スマホのアプリでは、記事がスケッチからの生成も案内しています。メッセージ欄で \`@\` を押して Sketch を選び、描いてから、被写体や色や画風の指示を足して送ります。人を描くなら、指示の中に成人であることを残します。スケッチが粗くても、文章側で服と人数を一つに決めてください。決めていないスケッチは、服の形まで別の絵になります。できたあとの修正は、会話に短く書くか、画像を開いて選択ツールを使います。選択が範囲の外まで変わる、という注意は、スマホでも同じ記事にあります。`,
      },
      {
        title: 'できない、遅い、の直し方',
        content: `「画像生成 できない」「遅い」は、上限、待ち時間、指示の曖昧さ、アカウントの設定が混ざります。すり抜けは書きません。

\`\`\`
画像が出ないとき
1. 通知が画像の上限か、チャットの満杯か、文を読む
2. 上限なら、製品が示す時刻まで待つ
3. 満杯なら、新しいチャットに、指示を短く貼る
4. More から Images、または会話で画像だと書く
5. まだダメなら、OpenAI の障害情報を見てから、時間をおく
\`\`\`

遅い、については、公式記事が「複雑さによって数分かかることがある」と書いています。数分を待たずに、同じ文を連打しないでください。連打は、上限の消費に見えることがあります。数字の保証ではありません。

編集が全体に波及するときは、変えたい範囲を文の先頭に書き、変えないもの（顔、服、人数）をその次に書きます。選択ツールを使っても、記事のとおり範囲の外が変わることがあります。変わったら、元の画像からもう一度、変える項目を一つにします。

リンクされたアカウントでは、保護者側の設定で画像の作成や編集が止められる場合がある、と Images の記事が案内しています。このサイトの作例は成人だけです。止まった理由が設定なら、上限の時刻を待っても戻りません。設定の場所は、今のヘルプの Parental controls を見てください。

無料のまま枚数を増やしたい、という要望には、公式が固定枚数を書いていない以上、このページも枚数を作れません。待つ、FAQ が書く Plus / Pro / Business への更新、別のツール、です。更新で利用量がリセットされる、という FAQ の文は、料金の安さの話ではありません。`,
      },
      {
        title: 'プロンプト例',
        content: `ChatGPT Images は自然な文で指示します。タグの羅列より、被写体、構図、光、変えないもの、避けるものが残ります。人物は成人と書きます。服は閉じた日常着です。実在の人物と、作品のキャラクター名は書きません。文章の型の全体は [ChatGPTプロンプト](/guides/chatgpt-prompt-techniques) です。

**成人の肖像**

\`\`\`
Create an image of 1 adult woman, adult, with black hair and a white blouse.
Upper body portrait, looking at the camera, plain light-gray background, soft daylight.
Keep the clothing modest and everyday.
Avoid: text, watermark, extra fingers, distorted face, child, underage.
\`\`\`

**成人の男性**

\`\`\`
Create an image of 1 adult man, adult, in a navy jacket, shirt, and trousers.
Standing, upper body, plain background, soft daylight, calm expression.
Avoid: text, watermark, extra fingers, distorted face, child, underage.
\`\`\`

**二人**

\`\`\`
Create an image of 2 adults, one adult woman and one adult man, standing side by side.
Both wear coats. Plain background, soft daylight, full figures kept in frame.
Avoid: extra people, text, watermark, extra fingers, child, underage.
\`\`\`

**イラスト寄り**

\`\`\`
Create a clean illustration of 1 adult woman, adult, black hair, white blouse and a cardigan.
Anime-style line art, flat color, upper body, plain background, soft daylight.
Avoid: photorealistic skin, text, watermark, extra fingers, child, underage.
\`\`\`

**静物**

\`\`\`
Create a product photo of a ceramic cup on a linen cloth.
Soft studio light, simple background, sharp focus, no people, no text.
\`\`\`

**風景**

\`\`\`
Create a wide landscape of a quiet lake and pine trees in morning mist.
Soft daylight, no people, no text, no signage.
\`\`\`

**編集（範囲を一つ）**

\`\`\`
Edit the selected background only. Replace it with a plain light-gray backdrop.
Keep the adult subject's face, hair, age, and white blouse unchanged.
Avoid: text, watermark, a different person, child, underage.
\`\`\`

証明写真の体裁に寄せる文は [証明写真プロンプト](/guides/id-photo-ai-prompt-guide)、自分の写真をフィギュア風にする文は [フィギュア化プロンプト](/guides/figure-ai-prompt-guide)、季節のカードは [年賀状プロンプト](/guides/new-year-card-ai-prompt-guide) です。公的書類に出す写真の加工は、証明写真のページの注意に従ってください。このページの肖像は、練習用の生成です。`,
      },
      {
        title: '商用利用と、ほかのツール',
        content: `「商用利用」について、2026年11月時点の Images in ChatGPT と Free Tier FAQ は、枚数の上限も、商用の許否も、固定の数字では書いていません。売ってよいかは、OpenAI の利用規約と、自分のプランの条項を、使った日に開いて確認してください。このページは、許諾された、とも、禁じられた、とも書きません。

確認するときは、生成した会話を残し、どのアカウントで出したかをメモします。規約がアカウントの種類で分かれることがあるためです。他人の写真をアップロードして、その人の顔を商品に使う手順は書きません。自分の写真でも、提出先が加工を禁じている書類には使いません。

上限で止まったあとに、同じ下書きを続ける場所は三つです。時刻まで待つ。FAQ が書くプランの更新を、料金表で自分で読む。別のツールへ、文だけを移す。別のツールの候補は、文章で直すなら [Geminiプロンプト集](/guides/gemini-prompt-collection)、自分の PC で枚数を管理するなら [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) です。Stable Diffusion の商用は、モデルごとにライセンスが違います。[Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) を、ChatGPT の規約の代わりにしないでください。

\`\`\`
移すときに残すもの
被写体（成人であること、服、人数）
構図と光
避けるもの
捨てるもの: ツール固有のボタン名、その日の上限の時刻
\`\`\`

Gemini へ移すときは、同じ自然文から始め、選択ツールの名前は書かないでください。Stable Diffusion へ移すときは、自然文を英語のタグに分け、ネガティブを別欄にします。記号のまま ChatGPT の文へ戻しても、\`<lora:...>\` は読まれません。

「何枚まで」の記事が、体験談の枚数を載せていても、それはそのアカウントとその日の記録です。Free Tier FAQ は、上限が通知され、時刻は製品内に出る、と書くにとどまります。体験談の枚数を、このページの表にはしません。自分の画面の通知と、公式ヘルプの更新日を、メモの二行にしてください。ヘルプの Updated が、このページを書いた日より新しければ、ヘルプを採ります。

遅い日と、上限の日は、文面が違います。遅いだけなら、記事のとおり数分待ちます。上限なら、待ってもその会話の途中で画像は増えません。新しいチャットを開いても、画像のメーターは共有です。文章の下書きは、画像を頼まずに続けられます。FAQ が、テキストチャットと画像生成の上限を分けているためです。`,
      },
      {
        title: '縦横、文字、参考写真',
        content: `縦長が欲しいときは、ピッカーで比率を選ぶか、文に portrait や希望の比率を書きます。記事は任意の比率を案内していますが、選んだ比率の名前が版で違うことがあります。結果が正方形のままなら、文の末尾だけではなく、ピッカーが別の値になっていないかを見ます。主体が小さくなるときは、「人物を大きく、背景だけを広げる」と、変えるものを一つにします。比率の考え方は [縦横のプロンプト](/guides/image-aspect-ratio-916-prompt-guide) にもあります。

\`\`\`
Create a vertical portrait of 1 adult woman, adult, black hair, white blouse.
Keep the subject large and centered. Plain background, soft daylight.
Avoid: text, watermark, extra fingers, child, underage.
\`\`\`

文字を画像の中に入れる機能は、記事が「テキストを足す指示に従える」と書いています。長い文章は崩れやすいので、単語を一つから試します。崩れたら、画像の中の文字を諦め、あとから自分で載せてください。

\`\`\`
Create a simple poster with a ceramic cup and the single word HELLO in plain letters.
Lots of empty margin, no extra words, no people.
\`\`\`

参考写真は、アップロードして、保存した名前を \`@\` で呼ぶ、と記事にあります。例として、犬の写真に名前を付けて後の会話で呼ぶ、という説明です。人の写真を保存するなら、自分の写真か、同意のある写真だけにしてください。作品のキャラクターの絵を、参考として登録する手順は書きません。

GIF は順次公開中で、ループする GIF を頼み、何が動くかを書く、と記事にあります。アップロードしたアニメーション GIF は編集できない、とも書いています。動画の長さや枚数の上限は、この記事に無いので書きません。`,
      },
      {
        title: 'プロンプトを短く保つ',
        content: `上限に近い日は、一回の依頼を一枚にします。同じ文で「四パターン同時」と頼むと、通知が早く出ることがあります。これは観察であり、公式の枚数ではありません。公式が枚数を書いていない以上、パターンは会話を分けて、前回の文を貼り直します。

\`\`\`
一回に一つ
1. 肖像か、静物か、風景か
2. 変える語は一つ
3. 気に入った文をメモし、次はその文から一語だけ変える
\`\`\`

メモの見出しは日本語で構いません。生成に渡す文は、上の例のように英語の自然文が、公式の説明（describe the image）に近いです。日本語の依頼で通ることもありますが、公式の記事の例は英語です。比べるときは、同じ内容の英語を一枚だけ追加します。

\`\`\`
確認のメモ
通知: 画像の上限か、チャットの満杯か
時刻: 画面に出たものを写す
次: 待つ / 新しいチャット / 別のツール
\`\`\`

\`\`\`
1 adult woman, adult。成人の女性、黒髪、白いブラウス、上半身、明るい灰色の背景、柔らかい昼の光。
文字と透かしは入れない。
\`\`\`

この日本語は、英語の肖像例と同じ内容の控えです。結果が英語よりぼやけるなら、英語の方を本文にしてください。避けるものの語は、英語の Avoid の行に残します。

次に読むなら、用途別の型は ChatGPT のプロンプト集、写真の体裁は証明写真、立体風はフィギュア化、タグで枚数を自分の PC に移すなら Stable Diffusion の始め方、です。

同じ会話に画像を積みすぎると、満杯の通知と、画像の上限の通知が同じ日に出ます。FAQ は、満杯なら新しいチャットで続けられる、画像のツールは別の上限、と分けています。メモには、どちらの文だったかを残します。画像の上限の日は、文章でプロンプトの下書きだけを直し、生成は時刻のあとにもう一枚です。下書きのあいだに、被写体を二人に増やしたり、文字を長くしたりしないでください。上限が戻った最初の一枚は、昨日通った短い文のままにします。変わらなければ、止まった原因は文ではなく上限です。変われば、昨日の文がすでに長すぎました。`,
      },
    ],
    faq: [
      {
        q: '何枚まで生成できますか',
        a: '2026年11月時点の Free Tier FAQ と Images in ChatGPT は、固定の枚数を書いていません。上限に達すると ChatGPT が通知し、リセットの時刻は製品内に表示されます。最新の上限は公式ヘルプで確認してください。',
      },
      {
        q: '無料でも画像は作れますか',
        a: 'Free Tier FAQ は、無料でも ChatGPT で画像を作れる、と機能の一覧に書いています。画像生成には、テキストチャットとは別の利用上限があります。枚数は書かれていません。',
      },
      {
        q: '上限はいつリセットされますか',
        a: 'FAQ は、時刻が製品の中に表示される、と書いています。このページでは時間の式を作りません。無料枠で達したあとに Plus、Pro、または Business へ更新すると利用量がリセットされる、とも FAQ にあります。',
      },
      {
        q: '画像生成できないときはどうしますか',
        a: '通知が画像の上限なら、表示された時刻まで待ちます。チャットの満杯なら、新しいチャットに短い指示を貼ります。公式の DALL·E GPT は引退しているので、ChatGPT Images を使います。上限をすり抜ける手順はありません。',
      },
      {
        q: '遅いのは故障ですか',
        a: 'Images の記事は、依頼の複雑さによって数分かかることがある、と書いています。数分を待たずに同じ文を連打しないでください。障害の有無は OpenAI の状態ページで確認します。',
      },
      {
        q: '商用利用はできますか',
        a: '書いた時点の Images の記事と Free Tier FAQ は、商用の許否を固定の数字で書いていません。OpenAI の利用規約と、自分のプランの条項を確認してください。Stable Diffusion のライセンスとは別です。',
      },
    ],
  },

  'sdxl-guide': {
    sections: [
      {
        title: 'SDXL とは',
        content: `「stable diffusion xl」「sdxl とは」は、Stability AI の SDXL 1.0 のベースモデルの話です。2026年11月時点の <a href="https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">モデルカード</a> は、ベースが潜在表現を作り、仕上げのノイズ除去に特化した Refiner が続く、アンサンブルだと説明しています。ベース単体でも使える、とも書いています。Refiner は <a href="https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stable-diffusion-xl-refiner-1.0</a> です。ライセンス名は CreativeML Open RAIL++-M です。ソースは <a href="https://github.com/Stability-AI/generative-models" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Stability-AI/generative-models</a>、論文は <a href="https://arxiv.org/abs/2307.01952" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">arXiv:2307.01952</a> です。

モデルの種類は、二つの固定のテキストエンコーダ、OpenCLIP-ViT/G と CLIP-ViT/L を使う潜在拡散、とカードにあります。系統の表の全体は [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。このページは、SDXL の入れ方と、プロンプトの違いだけを担当します。SD3.5 や FLUX のライセンス文は、モデル一覧と商用利用のガイドに残します。

バージョンによって、画面上の表示名が SDXL、sd_xl_base、Illustrious のように分かれます。Illustrious や Animagine は、SDXL を土台に追加学習した別ファイルです。ベースそのもののカードと、追加学習先のカードを混ぜないでください。最新の手順は公式ドキュメント・README を確認してください。

カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。モデルは .safetensors 形式を選びます。カードのデモとして、Clipdrop が SDXL の推論を無料で提供する、と書かれています。枚数の上限は、その文にはありません。金額はこのページに書きません。`,
      },
      {
        title: 'SD1.5 と FLUX との違い',
        content: `違いを、このページで測った速度にはしません。公式の記述から言えるのは、構造と、解像度の置き方と、プロンプトの寄りです。

| 系統 | 公式の記述から分かること | プロンプト |
|---|---|---|
| SD 1.5 | モデル一覧が、512×512 を基準に追加学習された、と整理 | カンマ区切りのタグが中心 |
| SDXL 1.0 | カードはベースと任意の Refiner。論文は約 1024×1024 の面積で複数の縦横を学習 | カードの例は短い英文。タグも使える |
| FLUX | モデル一覧が、自然な英語が中心、と整理 | 標準の手順ではネガティブを使わない系統がある |

論文の 2.3 節は、画素数が 1024 の二乗に近くなるように高さと幅を 64 の倍数で変えるバケットで、複数の縦横を学習した、と説明しています。付録 I に一覧があります。よく使う近い例は、1024×1024、896×1152、1152×896、832×1216、1216×832 です。これは学習に使った解像度の例であって、すべての画面の初期値ではありません。512×512 のまま SDXL を動かすと、論文が想定した面積から外れます。

FLUX へ移る日は、ネガティブ欄があるとは限りません。SDXL の負向を、FLUX の文の末尾へ貼らないでください。逆に、FLUX の短い英文だけを、タグ専用のアニメ SDXL へ貼ると、カードが勧める語が足りないことがあります。追加学習モデルの書き方は、その配布ページと [Illustriousプロンプト](/guides/illustrious-prompt-guide) です。

商用のライセンス名は、SD1.5 が CreativeML OpenRAIL-M、SDXL が CreativeML Open RAIL++-M、とモデル一覧が分けています。販売の前に [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) を開いてください。

プロンプトの手触りも違います。SD1.5 で通った品質の語を、SDXL の公式ベースへ同じ順で十個貼ると、文のモデルがタグの列を一つの長い条件として平均することがあります。まずカードの例のように、被写体と場所と光を一文にします。タグが必要なのは、配布ページがタグを勧める追加学習ファイルです。FLUX の短い英文は、SDXL の負向欄が無い前提で書かれていることがあります。負向を消すのは、そのモデルの手順を読んでからです。このページの SDXL の例は、負向を残します。

導入、という言葉は、ファイルを置く場所と、最初の幅と高さです。ソフト全体のインストールは、始め方のガイドと、Forge、ComfyUI のガイドにあります。SDXL だけを入れる別のインストーラが、公式カードにある、とは書いていません。`,
      },
      {
        title: '解像度の目安',
        content: `最初の一枚は、1024×1024 か、付録 I にある近い縦横です。幅と高さは 64 の倍数に寄せます。論文は、バケットの中では切り抜きの条件が通常 64 ピクセルの範囲で働く、とも書いています。極端に細長い値は、付録の端にあります。最初から端の値を選ばないでください。

\`\`\`
最初の解像度（論文のバケットの例）
1024×1024
1152×896 または 896×1152
1216×832 または 832×1216
幅と高さは 64 の倍数
\`\`\`

Hires. fix でさらに大きくするときは、最初の解像度をこの範囲に置いたまま、拡大はあとです。Denoising の目安は [Hires. fixの使い方](/guides/hires-fix-upscale-guide) にあります。拡大と、ベースの解像度を同じ日に変えないでください。

空の潜在画像の幅を 512 のままにしている ComfyUI のテンプレートは、SD1.5 のチュートリアル用です。SDXL のチェックポイントを選んだら、幅と高さを上の表へ変えます。変えたあとにノードがエラーになるときは、そのテンプレートが SD1.5 の VAE や CLIP を前提にしていないかを見ます。ノードの基本は [ComfyUIの使い方](/guides/comfyui-guide) です。

サンプラーの最初の範囲は、[Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide) が、多くの SDXL 系で CFG は 5 から 7、ステップは 20 から 30、と整理しています。A1111 の初期値として 7 が入っている画面があります。Animagine XL 4.0 のカードに推奨があるときは、そちらを優先します。このページでは、カードの数字をコピーして別のモデルの最適値にはしません。

幅と高さを変える日は、Seed を固定したまま一枚だけ出します。1024×1024 で顔が収まっている文を、同じ日に 832×1216 へ移すと、全身になる代わりに背景の物が増えることがあります。増えた物をプロンプトで消す前に、縦横を戻して、文が原因でないことを確認してください。付録 I に無いピクセル数でも、64 の倍数で面積が近ければ試せますが、最初の比較は付録にある値だけにします。A1111 の README は、生成画像の寸法は 64 ではなく 8 の倍数でなければならない、と書いています。論文の 64 の倍数は、8 の倍数でもあります。画面が寸法を拒むときは、その README の倍数と、論文のバケットのどちらから外れたかを見てください。

\`\`\`
配布ページに推奨が無いときの最初の一手
steps: 20 から 30
CFG: 5 から 7（A1111 の初期値 7 を一枚試してよい）
Hires. fix: オフ
Seed: 固定
\`\`\`
`,
      },
      {
        title: 'VAE と Refiner',
        content: `ベースのカードの Diffusers の例は、Refiner を読み込むときに \`vae=base.vae\` と、ベースの VAE を渡しています。Refiner は別の VAE を必須とは書いていません。同じリポジトリには、ファイル名に 0.9vae と付くチェックポイントがあります。差し替えの一つの公式手順が、カード本文の独立した節にはなっていません。色がおかしいときだけ、今使っているファイルがどの VAE を含むかを、ファイル名と配布ページで確認してください。コミュニティの修正 VAE の名前は、このページでは挙げません。

学習側では、kohya の SDXL の文書が、fp16 のとき VAE が float16 で不安定になることがあるので \`--no_half_vae\`、と書いています。生成画面の「VAE を float32 で」という項目が、同じ注意に対応することがあります。項目名は版で違います。無い画面で、見知らぬ VAE ファイルを探さないでください。

Refiner は任意です。カードは、ベース単体で使える、と書いています。使うときは、カードの実行例が、全体のステップ \`n_steps = 40\`、ベース側の終わり \`high_noise_frac = 0.8\`、つまり例ではベースが前段、Refiner が残りの低いノイズ、です。これはカードの例であり、最適な配分ではありません。別のやり方として、ベースで希望のサイズの潜在表現を作り、同じプロンプトで SDEdit（img2img）する、とも書いています。こちらの方が関数評価が多く、少し遅い、とカードにあります。何倍遅いかは書きません。

\`\`\`
Refiner を使わない: ベースだけを選ぶ
カードの例: n_steps 40、high_noise_frac 0.8
別経路: ベースの出力を、同じプロンプトで img2img
\`\`\`

画面に Refiner の欄が無い版では、ベースだけで一枚出します。欄がある版でも、最初の日はオフです。Refiner をオンにした日は、プロンプトを変えません。顔が別の人になるなら、Refiner をオフに戻してから、[ADetailerの使い方](/guides/adetailer-face-fix-guide) と img2img のどちらで直すかを分けます。

カード自身は、写真のような完全さは達成しない、読める文字は苦手、顔と人が正しく出ないことがある、と制限に書いています。Refiner を足しても、この制限が消えるとは書かれていません。`,
      },
      {
        title: 'Forge と ComfyUI への入れ方',
        content: `インストールの分岐は [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) です。SDXL のファイルは、チェックポイント用のフォルダへ置きます。WebUI と Forge の例は \`models/Stable-diffusion\`、ComfyUI の例は \`models/checkpoints\` です。LoRA は \`models/Lora\` と \`models/loras\` で、チェックポイントと混ぜません。

\`\`\`
チェックポイント: models/Stable-diffusion または models/checkpoints
LoRA: models/Lora または models/loras
拡張子: .safetensors
\`\`\`

Forge と Forge Neo の、どのモデル名が README の対応表にあるかは、[Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) が引用しています。Neo の README が発展的な SDXL に触れている、という整理はそちらです。このページでは、対応表に無いファイルが動く、とは書きません。

ComfyUI では、\`Load Checkpoint\` でベースを選び、\`Empty Latent Image\` を 1024 前後にします。二つのテキストエンコーダは、チェックポイントの CLIP 出力として一つの \`CLIP Text Encode (Prompt)\` に渡るワークフローが、公式の最初の一枚の形に近いです。\`CLIPTextEncodeSDXL\` のような、重みを分けるノードが版によってあります。ノード名が今の画面に無いときは、基本の CLIP Text Encode で一枚出してから、足りないかを見てください。名前を、見知らぬカスタムノードで補わないでください。

置いたあとに一覧が空なら、フォルダの綴りと、更新か \`R\` です。ファイル名の途中のスペースや、拡張子の前の名前の違いで、ノードに書いた名前と一致しないことがあります。

GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、です。SDXL は SD1.5 より面積の大きい解像度が前提です。容量の下限を、このページで新しい測定値にはしません。メモリが足りない、と出たら、解像度を 1024×1024 より一段だけ付録の近い値へ下げ、バッチを 1 に戻します。512 まで下げるのは、SD1.5 に戻す判断とセットにしてください。`,
      },
      {
        title: 'LoRA は系統を揃える',
        content: `SD1.5 用の LoRA を、SDXL のチェックポイントで読んでも、ほぼ効かないか、絵が崩れます。学習する側も、脚本が分かれています。SDXL は \`sdxl_train_network.py\`、SD1 系は \`train_network.py\` です。手順は [LoRA学習のやり方](/guides/lora-training-guide)、書いたあとの \`<lora:ファイル名:強さ>\` は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。

\`\`\`
<lora:filename:0.7>
\`\`\`

0.7 は、使う側のガイドの最初の一手です。配布ページに推奨の強さがあれば、そちらを優先してください。ファイル名に拡張子は付けません。

追加学習のアニメモデル用 LoRA は、そのアニメモデルのベースに合わせます。SDXL 1.0 の公式ベースで学習したファイルが、Illustrious で同じ強さになる、とは限りません。説明にベースの名前が無いファイルは、小さい強さで一枚だけ試し、崩れれば外します。

\`\`\`
系統の確認
生成のチェックポイント: SDXL 系
LoRA の説明: SDXL または、その追加学習モデルの名前
脚本: sdxl_train_network.py で作ったもの
合わない組み合わせは、強さを上げても直らない
\`\`\`
`,
      },
      {
        title: 'プロンプトのコツ',
        content: `公式ベースのカードの例は、短い英文です。"An astronaut riding a green horse" のような、一つの文です。タグを十個並べる前に、文を一つ書く方が、このベースには近いです。アニメ向けに追加学習したファイルは、配布ページがタグを勧めることがあります。そのときはタグに戻し、文とタグを同じ強さで混ぜすぎないでください。

人物は \`adult\` を残します。負向は、タグ用の画面では別欄です。自然文では Avoid の一行にまとめ、タグ用に戻すときに負向へ分けます。

**短い英文（公式ベースに近い形）**

\`\`\`
An adult woman with black hair and a white blouse, upper body portrait,
plain background, soft daylight.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**タグ（追加学習のアニメ系で、配布ページがタグを勧めるとき）**

\`\`\`
1 adult woman, adult, anime style, black hair, white blouse,
upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**成人の男性**

\`\`\`
1 adult man, adult, navy jacket, shirt, trousers,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**二人**

\`\`\`
2 adults, 1 adult woman and 1 adult man, adult,
standing side by side, coats, plain background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\`

**風景（人を書かない）**

\`\`\`
quiet lakeside, pine trees, morning mist, soft daylight, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**静物**

\`\`\`
product photo, a ceramic cup on linen, soft studio light, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**自然文と負向を一つの控えにするとき**

\`\`\`
One adult woman, adult, black hair, white blouse, upper body,
plain background, soft daylight.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

強調の括弧 \`(white blouse:1.1)\` は、タグが通る画面で、服が色を失うときだけ一つ足します。文のモデルで括弧が文字として残るときは、外してください。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。`,
      },
      {
        title: '崩れるとき',
        content: `カードが制限として書いているのは、完全な写真らしさではないこと、読める文字、構成の難しい配置、顔と人、です。プロンプトを長くする前に、解像度と系統を見ます。

\`\`\`
崩れたとき
1. 解像度を 1024×1024 か付録の近い値へ戻す
2. Refiner と Hires. fix をオフ
3. LoRA が SDXL 系か
4. プロンプトを人数、服、背景だけにする
5. 顔だけなら ADetailer、部分なら img2img
\`\`\`

文字を画像の中に長く書かせるのは、カードが苦手だと認めている作業です。単語を一つにして失敗するなら、文字は画像の外に置きます。手は、物を持たせる前に、何も持たない一枚で確認します。手の語は [手・指のプロンプト](/guides/hand-finger-prompt-guide) です。

色が全体に寄るときは、VAE を一つ戻し、CFG とプロンプトは固定します。CFG を 5 から 7 の外へ大きく動かした日は、解像度を動かしません。

次は、始め方の全体、Forge か ComfyUI のフォルダ、サンプラー、LoRA の系統、商用の確認、のどれか一つです。同じ日に全部を開かないでください。

ローカルへ入れる順番を短くすると、こうです。始め方のガイドで画面を一つ選ぶ。チェックポイント用のフォルダへ、公式ベースか、ライセンスを読んだ SDXL 系の \`.safetensors\` を置く。幅と高さを 1024 前後にする。上の短い英文を一枚出す。足りなければタグを一つ足す。Refiner と LoRA は、その一枚が保存できてからです。ダウンロードしたファイルが zip のままなら、中のチェックポイントだけをフォルダへ移します。zip 自体は、モデル一覧には出ません。

論文の付録は長いので、全部を画面の候補にしなくて構いません。正方形、縦、横の三つが、1024 の二乗に近く、64 の倍数であれば、最初の週は足ります。端の非常に細いバケットは、構図の実験が落ち着いてからにしてください。

ファイル名で迷うときは、公式ベースのリポジトリにある \`.safetensors\` と、誰かが追加学習したファイルを、同じ「SDXL」と呼んでいないかを見ます。追加学習ファイルは、ベースのカードの例文がそのまま最適とは限りません。配布ページの推奨タグが一行でもあれば、その一行を、ベースの英文より先に試します。推奨が無いファイルだけ、このページの短い英文に戻ります。戻した日は、LoRA を外します。LoRA が付いたままベースの文へ戻すと、文章の差ではなくファイルの差を見ます。

VAE を差し替えた日も同じです。色が直ったかどうかを、プロンプトを変えた枚で判断しません。Seed と文を固定し、VAE の有無だけが違う二枚を並べます。二枚が同じなら、その VAE は今のチェックポイントでは効いていません。コミュニティの修正ファイルを、名前だけで正しいと決めないでください。このページは、カードが渡しているベースの VAE と、ファイル名に 0.9vae と付く公式リポジトリのチェックポイントまでを確認しています。`,
      },
    ],
    faq: [
      {
        q: 'SDXL と SD1.5 は何が違いますか',
        a: 'モデルカードはベースと任意の Refiner、二つのテキストエンコーダを説明しています。論文は約 1024×1024 の面積で複数の縦横を学習した、と書いています。SD1.5 は 512 前後が基準、とモデル一覧が整理しています。速度の倍率はこのページでは書きません。',
      },
      {
        q: 'Refiner は必須ですか',
        a: '必須ではありません。カードはベース単体で使える、と書いています。使うときの例は n_steps 40、high_noise_frac 0.8 です。これは例であり、最適値ではありません。',
      },
      {
        q: '解像度は 1024 だけですか',
        a: '1024×1024 が起点です。論文の付録 I には、64 の倍数で面積が 1024 の二乗に近い縦横が並びます。896×1152 や 832×1216 もその例です。512 のままは、その面積から外れます。',
      },
      {
        q: 'SD1.5 の LoRA は使えますか',
        a: 'ほぼ効かないか、絵が崩れます。SDXL は sdxl_train_network.py で学習し、生成のチェックポイントも SDXL 系に揃えます。強さの書き方は LoRA の使い方のガイドです。',
      },
      {
        q: 'VAE は別に要りますか',
        a: 'カードの Refiner の例は、ベースの VAE を渡しています。色がおかしいときだけ、使っているファイルの VAE を確認します。fp16 で学習するときは、kohya の文書が --no_half_vae を案内しています。',
      },
      {
        q: 'プロンプトはタグですか、文ですか',
        a: '公式ベースの例は短い英文です。追加学習のアニメ系は、配布ページがタグを勧めることがあります。両方を同じ強さで混ぜず、カードの推奨を優先してください。',
      },
    ],
  },

  'midjourney-how-to-guide': {
    sections: [
      {
        title: 'Web と Discord のどちらで始めるか',
        content: `「midjourney 使い方」の入口は、2026年11月時点では midjourney.com の Web です。公式の <a href="https://docs.midjourney.com/hc/en-us/articles/33329261836941-Getting-Started-Guide" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Getting Started</a> は、Create ページの Imagine bar に見たいものを書き、Enter か、スマホなら送信ボタンで、四枚の組が出来る、と案内しています。Discord でも作れます。<a href="https://docs.midjourney.com/hc/en-us/articles/33329300781837-Web-vs-Discord" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Web vs Discord</a> は、サブスクリプションがあれば Web と Discord の両方で作れ、機能の多くは両方にあるが名前が違うことがある、と書いています。

このページは、始め方、無料の有無、縦横やバージョンのパラメータ、スマホ、日本語で書くときの注意です。プロンプトの題材を増やす作業は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) に残します。作例の一覧は [Midjourney のプロンプト](/tools/midjourney) です。パラメータの細かい互換は、版で変わるので、<a href="https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Parameter List</a> と <a href="https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Version</a> を、入れた日に見てください。

| 場所 | 公式の説明 | 向くとき |
|---|---|---|
| midjourney.com | Imagine bar。Editor で切り抜きや縦横をまとめて触れる | 一人で、画面のボタンから始めたい |
| Discord | 同じサブスクリプションで利用可。参照画像は URL が要る | すでに Discord にいる |
| niji · journey アプリ | 限定のトライアルが iOS と Android にある、と Free Trials | スマホのアプリで試す案内を探すとき |

バージョンによって、ボタン名が違うことがあります。最新の手順は公式ドキュメントを確認してください。2026年11月時点、と書いた記述は、その日に開いたヘルプの文です。`,
      },
      {
        title: '始め方と、無料トライアル',
        content: `Getting Started は、最初の一枚の前に、プランへ加入する、と書いています。ログイン、プランの選択、加入、の順です。金額はこのページに書きません。プランの比較表は公式の Comparing Plans を、使った日に開いてください。

<a href="https://docs.midjourney.com/hc/en-us/articles/27870399340173-Free-Trials" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Free Trials</a> は、限定のトライアルが niji · journey アプリ（iOS と Android）にあり、Discord と midjourney.com には現在フリートライアルが無い、と書いています。検索の「無料」に対する、2026年11月時点の公式の答えはこれです。Web や Discord が無料で無制限、とは書きません。アプリのトライアルが、Web のサブスクリプションと同じ枚数だ、とも書きません。枚数は公式のその記事に無いので、このページでも作りません。

加入のあと、Create ページを開きます。Imagine bar はページの上部にあります。見たいものを書き、Enter です。スマホでは送信ボタン、と Getting Started が書いています。進行の表示が終わるまで待つ、とその記事にあります。四枚の組が出ます。一枚だけを最初から指定するパラメータは、Parameter List の基本の説明には、画像の枚数としては出ていません。動画の \`--bs\` は別です。画像は四枚の組、と Getting Started の文を優先してください。

Web の Editor は、切り抜き、Pan、縦横を一つの場所で触れる、と Web vs Discord が書いています。Vary Region の inpainting も Editor に入っている、とも書いています。Discord でも Pan と縦横はできますが、手順は分かれる、と同じ記事です。最初の一枚で Editor を開く必要はありません。四枚のうち一枚の、背景だけを変えたい日に Editor を開きます。人物の顔と服を、その回の文に残したままにしてください。

参照画像は、Web ならボタンで Image Prompt、Style Reference、Edit Model の参照に分けられます。Discord は、画像をホストして URL を取り、パラメータと一緒に足します。権利の無い URL を、どちらの欄にも貼らないでください。

Discord では、パラメータをプロンプトの末尾に付ける、と Parameter List が Web と Discord の両方に書いています。スラッシュから始まる入力の正式なコマンド名は、Getting Started が主に Web の Imagine bar を説明しているので、このページではコマンド名を一つに決めません。今のドキュメントの Discord の節を見てください。古い記事のコマンド名が、今の欄と違うことがあります。`,
      },
      {
        title: '最初の一枚',
        content: `パラメータは、説明の文のあとに置きます。Parameter List は、文とのあいだにスペース、ダッシュは二つ、パラメータの中に読点や句点を入れない、パラメータの後ろに説明の文を続けない、と注意しています。\`--ar\` の前にスペースが無い行は、例として失敗に挙げられています。

既定の形は正方形です。Aspect Ratio の記事は、\`--ar\` または \`--aspect\` で変え、既定は 1:1、小数は使えず、139:100 のように整数で書く、と案内しています。縦が欲しいときは、二つ目の数を大きくします。たとえば \`--ar 2:3\` です。

\`\`\`
1 adult woman, adult, black hair, white blouse, upper body portrait,
plain background, soft daylight --ar 2:3
\`\`\`

Raw は、\`--raw\` です。Raw の記事は、標準では Midjourney が独自の調子を足し、Raw にするとその自動の調子を切る、単純なプロンプトではより写真に寄ることが多い、と説明しています。バージョン 5.1 以降で使える、とも書いています。古い記事の \`--style raw\` は、2026年11月時点の Parameter List の表には \`--raw\` として載っています。\`--style raw\` を、今の正式名だと決めつけないでください。

\`\`\`
1 adult man, adult, navy jacket, shirt, trousers, upper body,
plain background, soft daylight --ar 2:3 --raw
\`\`\`

Version の記事は、既定のバージョンが V8.2 で、2026年7月24日に既定になった、と書いています。普段は \`--v\` を省略できます。古いバージョンを試すときだけ \`--v\` を末尾に足し、Version の互換表を見てください。V8.1 は 2026年4月14日に公開され、6月10日から7月23日まで既定だった、とも記事にあります。速度が何倍か、このページでは書きません。

\`\`\`
quiet lakeside, pine trees, morning mist, soft daylight, no people --ar 16:9
\`\`\`

設定の初期値は、Imagine bar の設定アイコンから変えられます。一度変えると、その後のプロンプトに付きます。実験が終わったら、Raw や縦横を、設定側でも戻したかを見てください。プロンプトから消しても、設定に残っていることがあります。`,
      },
      {
        title: 'パラメータ',
        content: `よく検索される名前だけを、公式の呼び方で残します。範囲が記事に無いものは、数字を作りません。

| 書き方 | 公式の説明 |
|---|---|
| \`--ar\` / \`--aspect\` | 縦横。既定は 1:1。小数は不可 |
| \`--v\` / \`--version\` | モデルの版。既定は V8.2（Version 記事） |
| \`--raw\` | Raw。自動の調子を切る。5.1 以降 |
| \`--sref\` | Style Reference。見た目の参照 |
| \`--sw\` | Style Reference の強さ。0 から 1000、既定は 100 |
| \`--niji\` | アニメと東洋の美学向けのモデル |
| \`--no\` | 入れたくないもの |
| \`--s\` / \`--stylize\` | 芸術的な調子。数値の範囲は Stylize の記事で確認 |

Style Reference の記事は、バージョン 6 以降で使え、Discord では \`--sref\` のあとに画像の URL を置く、複数はスペース区切り、ファイルは png、gif、webp、jpg、jpeg、と書いています。\`--sw\` は 0 から 1000 で、既定は \`--sw 100\` です。\`--sref random\` は、ランダムなスタイルコードに置き換わります。自分が権利を持たない画像の URL は貼らないでください。作品のキャラクターや、他人の絵を、参照として使う手順は書きません。

\`\`\`
ceramic cup on linen, soft studio light, simple background --ar 1:1 --sref YOUR_IMAGE_URL --sw 100
\`\`\`

\`YOUR_IMAGE_URL\` は、自分の画像を公式の手順でホストした URL の場所です。Web では、ボタンで Image Prompt、Style Reference、Edit Model の参照に指定できる、と Web vs Discord が書いています。Discord は、先に画像をホストして URL を取る、と同じ記事にあります。

Niji は、Parameter List がアニメと東洋の美学向け、と案内しています。Version 記事は、Niji 7 を 2026年1月9日の公開とし、Spellbrush との共同、と書いています。互換表では \`--niji 6\` と \`--niji 7\` が版の列に分かれ、V8.1 と V8.2 の列は Niji の欄が空いて見えます。\`--v 8.2\` と \`--niji 7\` を同時に書く前に、今の表を見てください。このページのアニメ例は、\`--niji 7\` を単独で末尾に置く形にします。

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
upper body, plain background, soft daylight --niji 7
\`\`\`

\`--no\` は、除外です。人数と服は正向に書き、除外は文字や、成人でない人物に限って短くします。

\`\`\`
1 adult woman, adult, white blouse, upper body, plain background --ar 2:3 --no text, watermark, child
\`\`\`

動画は、Getting Started が画像と動画の両方に触れ、Parameter List が \`--video\` と \`--motion low\`、\`--motion high\` を挙げています。動画の長さや消費の数字は、このページでは写しません。最初の週は静止画だけにしてください。

Stylize の \`--s\` は、Parameter List が芸術的な調子のパラメータとして名前を挙げています。数値の範囲は、このページを書いた時点で Parameter List の表だけでは確認できなかったので、数字は書きません。Stylize の公式記事を開いてから、一つだけ変えてください。Quality の \`--q\` も、Version の互換表では版によって選べる値が違います。V6、V7、V8 の列を見ずに、古い記事の \`--q 1\` をそのまま貼らないでください。Draft の \`--draft\` は、Parameter List が V7 の項目として案内しています。既定の V8.2 に、V7 用のパラメータを足す前に、今の互換表で空欄でないかを見ます。空欄の機能は、このページでは使えると書きません。`,
      },
      {
        title: '日本語で書くとき',
        content: `公式の Getting Started と Parameter List の例は英語です。画面の言語を日本語にする項目名は、それらの記事には一つの正式名として出ていません。このページでは、日本語化の手順を作りません。プロンプトの本文は英語にし、パラメータは英語の記号のまま末尾に置きます。

日本語の文で一枚試すのは、同じ内容の英語と比べるときだけです。パラメータを日本語の語順の中に埋め込まないでください。\`--ar\` は、文が日本語でも末尾です。

\`\`\`
1 adult woman, adult。成人の女性、黒髪、白いブラウス、上半身、無地の背景、柔らかい昼の光 --ar 2:3
\`\`\`

\`\`\`
1 adult woman, adult, black hair, white blouse, upper body,
plain background, soft daylight --ar 2:3
\`\`\`

上の二枚は、同じ意図の比較です。日本語の方がぼやける、またはパラメータが無視されるなら、英語を本文に戻します。メモの見出しだけを日本語にする方が、再現は残ります。

題材の語彙を増やすときは、Midjourney のプロンプトガイドを開きます。このページのパラメータを、あちらの文の途中へ挟まないでください。パラメータは常に末尾です。重みの括弧は、Stable Diffusion の \`(tag:1.2)\` を、Midjourney の文へそのまま貼らないでください。Midjourney の重みは、公式の Multi-Prompts の記事の記法です。未確認の括弧は、最初の一枚では外します。`,
      },
      {
        title: 'スマホ',
        content: `Getting Started は、モバイル機器では送信ボタン、と書いています。midjourney.com の Create ページを、スマホのブラウザで開き、Imagine bar に書いて送信する、という手順です。専用の Midjourney 公式アプリの名前を、Free Trials が挙げているのは niji · journey（iOS と Android）で、それは限定トライアルの案内です。Web のサブスクリプション画面と、niji のアプリを、同じ無料枠だと決めつけないでください。

スマホでは、\`--ar 2:3\` や \`--ar 9:16\` のように縦を先に決めると、あとから Editor で比率を変える回数が減ります。Editor は Web 側の機能で、Web vs Discord は、切り抜き、Pan、縦横をまとめて触れる、と書いています。Discord でも Pan と縦横の変更はあるが、手順は分かれる、とも書いています。

\`\`\`
1 adult woman, adult, black hair, white blouse, upper body,
plain background, soft daylight --ar 9:16
\`\`\`

参照画像をスマホから足すときは、Web のボタンで Style Reference に指定できる、と Web vs Discord が書いています。権利の無い画像は使いません。自分の顔の写真を、商品や公開の絵に使う前に、公式の利用規約を開いてください。規約の金額の条件は、このページでは写しません。書いた時点で、枚数や料金の固定値をヘルプから転記していないためです。

通信が途中で切れても、Create ページに戻ると進行が見えることがあります。見えないときは、同じ文をすぐに十回送らないでください。サブスクリプションの消費のルールは、公式のプランの説明を見てください。このページは消費量を作りません。`,
      },
      {
        title: 'コピーして試すプロンプト',
        content: `人物は成人と書きます。服は閉じた日常着です。パラメータは末尾です。負向に相当するものは \`--no\` に短く置きます。実在の人物と、作品名は書きません。

**成人の肖像**

\`\`\`
1 adult woman, adult, black hair, white blouse, upper body portrait,
looking at the camera, plain background, soft daylight --ar 2:3 --raw
\`\`\`

**成人の男性**

\`\`\`
1 adult man, adult, casual jacket, shirt, trousers, standing, upper body,
plain background, soft daylight --ar 2:3
\`\`\`

**二人**

\`\`\`
2 adults, one adult woman and one adult man, standing side by side, coats,
plain background, soft daylight --ar 3:2 --no extra people, text
\`\`\`

**アニメ寄り（Niji を単独で）**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan, upper body,
plain background, soft daylight --niji 7
\`\`\`

**風景**

\`\`\`
quiet coastal road, overcast sky, wide landscape, no people, soft daylight --ar 16:9
\`\`\`

**静物**

\`\`\`
product photo, ceramic cup on a linen cloth, soft studio light,
simple background, no people, no text --ar 1:1
\`\`\`

**除外を足した肖像**

\`\`\`
1 adult woman, adult, white blouse, upper body, plain background,
soft daylight --ar 2:3 --no text, watermark, child
\`\`\`

プロンプトガイドへ進むときは、気に入った一行だけを持っていきます。\`--ar\` と \`--raw\` と \`--niji\` のうち、今日試した一つだけを残し、残りは外します。三つを同時に変えた枚は、どれが効いたのかが残りません。`,
      },
      {
        title: 'プロンプトガイドとの分担',
        content: `このページでサブスクリプションと Imagine bar とパラメータの位置が分かったら、題材は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。あちらは書き方、こちらは始め方、と分けます。同じ「使い方」でも、パラメータの正式名が違って見えたときは、このページが引用した Parameter List を優先し、プロンプトガイドの古い例は末尾の記号だけを今の名前に読み替えてください。

Stable Diffusion のタグを、Midjourney に全部貼る必要はありません。人数、服、光、背景、末尾の \`--ar\` で一枚出てから、足りない語を一つ足します。ローカルのネガティブ欄は、Midjourney にはありません。除外は \`--no\` です。

\`\`\`
持っていくもの: 人数、服、光、--ar
置いていくもの: Sampling steps、CFG、フォルダパス、<lora:名前:強さ>
除外: --no に短く
\`\`\`

ローカルで同じ文を試すなら [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide)、SDXL の解像度なら [SDXLとは](/guides/sdxl-guide) です。ツールの名前が違うので、\`--ar 2:3\` を Stable Diffusion のプロンプトの中に残したままにしないでください。Stable Diffusion 側の縦横は、幅と高さのピクセルです。

公開する前に、公式の利用規約と、参照画像の権利を見ます。このページの作例は、成人の私服と、人のいない風景と静物だけです。

動画を同じ週に始めるなら、Parameter List の \`--video\` と、\`--motion low\` または \`--motion high\` を、静止画で気に入った文の末尾へ一つだけ足します。\`--ar\` と同時に三つのパラメータを新しくしないでください。ループや終端フレームは \`--loop\` と \`--end\` が Parameter List にあります。長さや消費量は写しません。静止画が四枚の組として安定する前に動画へ移ると、プロンプトの失敗と、動画の失敗が重なります。

日本語の画面が欲しい、という検索には、公式の Getting Started が言語設定の項目名を一つに決めて書いていません。プロンプトを日本語にすることと、ボタンを日本語にすることは別です。ボタン名が英語のままでも、Imagine bar の手順は同じです。分からないボタンは、公式ドキュメントの同じ英語で検索してください。

四枚の組から一枚を残すときは、その枚のプロンプトをそのまま次の欄へ戻します。Web の Creation Actions には Use があり、文と画像を再利用できる、と Web vs Discord が書いています。Discord では、URL をコピーして自分で貼る手順になります。再利用した日に、\`--ar\` を別の比率へ変えると、構図の比較と、文の比較が混ざります。比率は固定し、語を一つだけ足してください。足した語が四枚すべてで無視されるなら、その語は末尾のパラメータより前にあるかを見ます。パラメータの後ろに説明を続けるのは、Parameter List が失敗例にしています。

設定アイコンで Raw や縦横を既定にしたあとは、プロンプトに同じパラメータを重ねなくても付きます。実験が終わって外したつもりでも、設定側に残っていることがあります。次の日の一枚目は、設定を開いて、Raw と比率が昨日の実験のままでないかを確認してから書いてください。`,
      },
    ],
    faq: [
      {
        q: 'Midjourney は無料で使えますか',
        a: '2026年11月時点の Free Trials は、Discord と midjourney.com にフリートライアルは無く、限定のトライアルは niji · journey アプリ（iOS と Android）だと書いています。金額と枚数は、このページでは書きません。',
      },
      {
        q: 'Web と Discord はどちらですか',
        a: 'Getting Started は Web の Imagine bar を手順にしています。Web vs Discord は、サブスクリプションがあれば両方で作れ、名前が違う機能がある、と書いています。参照画像は、Web はボタン、Discord は URL です。',
      },
      {
        q: 'スマホだけで始められますか',
        a: 'Getting Started は、モバイルでは送信ボタン、と書いています。ブラウザで midjourney.com の Create ページを開く手順です。Free Trials がアプリの名として書くのは niji · journey です。Web の加入とは分けて読んでください。',
      },
      {
        q: '日本語のプロンプトは公式の手順ですか',
        a: 'Getting Started と Parameter List の例は英語です。このページでは英語を本文にし、日本語は同じ内容の比較に一枚だけ使います。--ar などのパラメータは、文が日本語でも末尾です。',
      },
      {
        q: '--style raw と --raw はどちらですか',
        a: '2026年11月時点の Parameter List と Raw の記事は --raw と書いています。--style raw は、今の表の正式名としては載っていません。設定の Raw をオンにしても、以降のプロンプトに付きます。',
      },
      {
        q: 'プロンプトの書き方はどのページですか',
        a: '題材を増やすページは Midjourneyプロンプトのガイドです。このページは Imagine bar、加入、無料トライアルの有無、パラメータの位置を担当します。パラメータは常に文の末尾です。',
      },
    ],
  },
}
