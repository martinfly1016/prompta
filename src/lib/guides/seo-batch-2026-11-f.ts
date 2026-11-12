/**
 * Fourteenth SEO batch (2026-11-11): ComfyUI Manager, AUTOMATIC1111 WebUI,
 * AI illustration tool choice, negative prompts, and VAE.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is set in GUIDES only where Semrush published a number.
 * UI names, folders, and commands are limited to official docs checked 2026-11-11.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_14_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'comfyui-manager-guide': {
    sections: [
      {
        title: 'Manager は、ノードを足すための画面',
        content: `「comfyui manager」で探しているのは、ComfyUI 本体の入れ方ではなく、あとから足すカスタムノードの検索、インストール、更新です。2026年11月時点の公式ドキュメントは、Desktop、Windows のポータブル版、手動インストールで手順が違う、と分けています。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

このページは Manager だけを担当します。ComfyUI 本体の Desktop、ポータブル、手動の導入と、基本ノードのつなぎは [ComfyUIの使い方](/guides/comfyui-guide) です。\`<lora:名前:強さ>\` と Load LoRA は [LoRAの使い方](/guides/stable-diffusion-lora-guide) です。同じ手順を二度書くと、どちらが古いか分からなくなります。

| 検索の言葉 | このページでの扱い |
|---|---|
| インストール、どこ | 版ごとの有効化。本体の導入は ComfyUI のガイド |
| 使い方 | 旧版の Manager ボタンと、新版 UI の Install |
| ない、表示されない | 起動フラグと、フォルダのパス |
| アップデート | 本体と Manager パッケージは別 |
| github | 公式が書く clone 先。不明な URL は貼らない |

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。風景や静物には人数を書きません。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。モデルは .safetensors 形式を選びます。

公式の入口は <a href="https://docs.comfy.org/ja/manager/install" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ComfyUI-Manager のインストール</a> と <a href="https://github.com/Comfy-Org/ComfyUI-Manager" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Comfy-Org/ComfyUI-Manager の README</a> です。`,
      },
      {
        title: '版ごとのインストール',
        content: `Desktop は、インストールのたびに Manager を入れ、\`--enable-manager\` 付きで起動する、と公式が書いています。自分で clone する作業はありません。設定は、そのインストールの Manage パネルを開き、Startup Args タブです。Startup Arguments から \`--enable-manager\` を消すと、Manager なしで起動できます。残したまま \`--disable-manager-ui\` を足すと、バックグラウンドの処理は続き、UI だけが隠れます。

\`\`\`
Desktop: 追加の clone は不要
起動フラグの例: --enable-manager
UI を隠す例: --enable-manager --disable-manager-ui
\`\`\`

Windows のポータブル版では、新しい Manager はコアに入っているが、有効化が要る、と公式が書いています。依存を入れてから、フラグ付きで起動します。

\`\`\`
.\\python_embeded\\python.exe -m pip install -r ComfyUI\\manager_requirements.txt
\`\`\`

\`\`\`
.\\python_embeded\\python.exe -s ComfyUI\\main.py --windows-standalone-build --enable-manager
\`\`\`

手動インストールも、コアに入っているが有効化が要る、と同じページが書いています。仮想環境を有効にしてから、依存とフラグです。Windows は \`venv\\Scripts\\activate\`、Linux と macOS は \`source venv/bin/activate\` です。

\`\`\`
pip install -r manager_requirements.txt
python main.py --enable-manager
\`\`\`

旧版の UI に戻すフラグは \`--enable-manager-legacy-ui\` で、\`--enable-manager\` が先に要ります。公式は、pip で入った版だけが新版 UI へ切り替えられ、カスタムノード経由で入った版は新版 UI への切り替えをサポートしない、と書いています。Desktop では、サーバー設定、UI 設定、旧版マネージャーインターフェースを使用、という経路も案内されています。

まだ git で足す経路も、同じインストールページのレガシーな方法として残っています。\`ComfyUI/custom_nodes\` で clone し、依存を入れて再起動する、です。clone 先の URL は、ドキュメントが Comfy-Org、README 本文が ltdrdata、と二通り書いています。今開いている公式ページの URL を使ってください。

\`\`\`
cd ComfyUI/custom_nodes
git clone https://github.com/Comfy-Org/ComfyUI-Manager comfyui-manager
\`\`\`

README が書いている clone は、次の URL です。フォルダ名はどちらも \`comfyui-manager\` です。

\`\`\`
git clone https://github.com/ltdrdata/ComfyUI-Manager comfyui-manager
\`\`\`

置いた実体は \`ComfyUI/custom_nodes/comfyui-manager\` です。\`custom_nodes\` 直下へ中身を展開しないでください。\`ComfyUI-Manager/ComfyUI-Manager\` や \`ComfyUI-Manager-main\` も、公式が避けるパスです。検索で v4 という語を見ても、このページの手順には使いません。公式のインストールページは、Desktop、ポータブル、手動、とフラグで説明しています。`,
      },
      {
        title: 'ボタンと、ノードの入れ方',
        content: `旧版 README の使い方は、メインメニューの Manager ボタンを押す、です。開いたメニューに Install Custom Nodes と Install Models があります。Install または Try Install を押して入れます。足りないノードは、メニューの Install Missing Custom Nodes です。ワークフローに無いノードを含む拡張の一覧が出ます。

\`\`\`
旧版: Manager ボタン
ノード: Install Custom Nodes
モデル: Install Models
不足: Install Missing Custom Nodes
\`\`\`

新版 UI の公式ページは、左のフィルター、上の検索、右の詳細、と分けています。検索は Node Pack と Node を切り替えます。入れるときはノードカードを選び、Install を押すか、Version で版を選んでから入れます。更新があるものは Update available で絞り、Version のあと Update です。

足りないノードを含むワークフローを開くと、案内が出ることがあります。Install All でまとめて入れるか、Open Manager で中身を見てから入れます。キャンバス上では、対象ノードのプレビューにある Missing からも探せます。外すときは Uninstall です。

\`\`\`
新版: Install / Update / Uninstall
不足の案内: Install All または Open Manager
キャンバス: Missing
\`\`\`

新版 UI は、レジストリに登録されたノードだけを入れる、と公式が書いています。git の URL から入れる欄は、新版 UI にはありません。登録されていない名前は、先にレジストリへ登録する、と FAQ が書いています。見知らぬ URL を、旧版の欄へ貼らないでください。

<a href="https://docs.comfy.org/ja/manager/pack-management" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">カスタムノード（新規 UI）</a> と、今の画面のボタン名が違ったら、開いている版のドキュメントを採ってください。顔の補正だけは、[ADetailerの使い方](/guides/adetailer-face-fix-guide) で Impact Pack の FaceDetailer として確認します。それ以外の第三者ノードは、このページでは名前を出しません。`,
      },
      {
        title: '更新と security_level',
        content: `Manager は本体とは別の Python パッケージで、対応する版は \`manager_requirements.txt\` に固定されている、と公式が書いています。Desktop は Desktop の更新に合わせて Manager も保たれ、エンジンの更新は Manage パネルです。ポータブルと手動は、本体を更新しても Manager のパッケージが古いまま残ることがあります。依存をもう一度入れて、\`--enable-manager\` で再起動します。

\`\`\`
cd ComfyUI/custom_nodes/comfyui-manager
git pull
\`\`\`

上の二行は、自分で \`custom_nodes\` に clone した場合の更新です。終わったら ComfyUI を再起動します。旧版メニューの Update All は、スナップショットを保存してから更新する操作です。新版 UI の更新は、Update ボタンです。セキュリティの表では、ComfyUI の更新は低いリスクの機能として分類されています。

\`config.ini\` の \`security_level\` は、\`strong\`、\`normal\`、\`normal-\`、\`weak\` です。\`strong\` は高リスクと中リスクを許可しません。\`normal\` は高リスクを許可せず、中リスクは使えます。\`normal-\` は、\`--listen\` が付いていて \`127.\` で始まらないとき、高リスクを許可しません。\`weak\` はすべての機能が使えます。高リスクには、git の URL、pip、既定チャンネルに無いノード、ノードの修正が含まれます。

\`\`\`
security_level = normal
\`\`\`

ファイルの場所は、起動ログに出ます。公式のトラブルシューティングは、ComfyUI v0.3.76 以降がユーザーディレクトリの \`__manager/config.ini\`、それより前が \`default/ComfyUI-Manager/config.ini\`、と書いています。ユーザーディレクトリの既定は \`ComfyUI/user\` です。\`This action is not allowed with this security level configuration\` は、この設定で拒否されたときです。

Desktop の Startup Args には、別の表示名があります。Manager Security Level は Strict、Standard（推奨）、Relaxed、Permissive です。Manager Network Mode は Public（既定）、Private、Offline、Personal cloud です。\`--listen\` でネットワークに出しているときは、より厳しいレベルが重要、と公式が書いています。Desktop の表示名と、\`config.ini\` の \`security_level\` の語は、公式が一つの対応表にしていません。このページでも対応づけません。

git の URL やナイトリーを入れるために \`weak\` へ下げる、という案内はトラブルシューティングにあります。出所の分からない URL のために、このページでは下げません。信頼できる配布元だけを、今のレベルで入れられる範囲に留めてください。`,
      },
      {
        title: '表示されない、ない、ときの確認',
        content: `Manager が無い、ボタンが出ない、というときは、先に起動フラグを見ます。ポータブルと手動は、\`--enable-manager\` が無いと有効になりません。\`--disable-manager-ui\` が付いていると、処理は残って UI が隠れます。Desktop で Startup Arguments から \`--enable-manager\` を消しているときも、同じです。

次にパスです。カスタムノードとして入れた場合、実体は \`ComfyUI/custom_nodes/comfyui-manager\` です。直下に \`__init__.py\` が散らばっている、二重のフォルダになっている、\`ComfyUI-Manager-main\` という名前のまま、のいずれかだと、動いて見えても更新として認識されない、と公式が注意しています。消してから、今の公式ページの手順で入れ直してください。

\`\`\`
確認の順
1. --enable-manager が付いているか
2. --disable-manager-ui が付いていないか
3. custom_nodes/comfyui-manager か
4. 直下への展開、二重フォルダ、main のまま、ではないか
\`\`\`

依存を入れた環境と、起動している環境が違うと、フラグを付けても読み込めません。ポータブルは \`python_embeded\` の Python、手動は有効にした仮想環境、です。本体を更新したあとに Manager だけ古い、というときは、前の節の依存の入れ直しです。

ノードを入れたあと、ワークフローのノードが赤く欠けることがあります。新版は Missing、旧版は Install Missing Custom Nodes です。表示された名前が、信頼できる配布元のものかを読んでから入れます。名前が分からないノードは入れません。色の意味は版で違うので、英文のノード名を先に読んでください。

<a href="https://docs.comfy.org/ja/manager/troubleshooting" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">トラブルシューティング</a> に、パスと \`security_level\` の説明があります。ここに無いエラー文は、そのページと起動ログを見てください。`,
      },
      {
        title: '安全に入れる',
        content: `カスタムノードは、ComfyUI の中で動くプログラムです。モデルファイルも、読み込むだけで中でコードが動く形式があります。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。モデルは .safetensors 形式を選びます。

入れる前に、名前、配布元、何をするノードかを読みます。レジストリに無いからといって、検索で最初に出た URL を git の欄へ貼らないでください。新版 UI がその欄を外しているのは、公式がセキュリティと安定のため、と書いている理由です。\`security_level\` を \`weak\` にするのは、その制限を外す操作です。外す前に、入れるものが公式のレジストリか、自分で中身を読んだものかに限ってください。

モデルの置き場所は、ComfyUI のガイドの \`models/checkpoints\` と \`models/loras\` です。Manager の旧版にある Install Models は、一覧からモデルを取る操作です。一覧に成人向けが混ざることがあります。このページでは、特定のモデル名を勧めません。配布ページのライセンスと、成人向けの有無を見てから置いてください。

スナップショットは、旧版の Update All や Save snapshot で残ります。更新の直前に残しておくと、ノードが動かなくなったときに戻せます。戻す操作も、公式の表では中リスクです。戻したあとに、同じ不明な URL を再度入れないでください。

共有されたワークフローの JSON は、つなぎの記録です。足りないノードの名前が並んでいても、全部を一度に入れないでください。公式テンプレートで同じ絵が作れるなら、カスタムノードは要りません。要るものだけを、名前を読んでから入れます。`,
      },
      {
        title: 'プロンプトは、ノードを足す前に固定する',
        content: `Manager を入れた日に、プロンプトもモデルも変えると、絵の変化がノードのせいなのか文章のせいなのかが残りません。下の文を先に保存し、ノードは一つだけ足します。正向と負向は、\`CLIP Text Encode (Prompt)\` を二つ使い、負向を KSampler の negative へつなぎます。つなぎの全体は ComfyUI のガイドです。

括弧を文字として残すときは \`\\(\` と \`\\)\` です。LoRA は \`<lora:filename:0.7>\` の形で、ファイル名に拡張子は付けません。強調の \`{ }\` や \`[ ]\` は NovelAI 側の記号なので、ComfyUI の欄へそのまま混ぜません。

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
people, text
\`\`\`

自然文で同じ肖像を頼むときは、括弧を外します。ChatGPT や Gemini には専用の負向欄が無いので、文の中に「入れない」を書きます。

\`\`\`
An adult woman, black hair, white blouse, soft daylight, plain background.
No text. No extra people. Adults only.
\`\`\``,
      },
      {
        title: 'このページで扱わないこと',
        content: `ComfyUI の Desktop インストーラのダウンロード、ポータブル版の圧縮ファイルの名前、Python の版は、[ComfyUIの使い方](/guides/comfyui-guide) に残します。このページへ移したのは、Manager の有効化、ボタン、更新、表示されないとき、です。

第三者のノードパックを、用途別に推薦するリストは作りません。顔の FaceDetailer だけは、ADetailer のガイドがすでに公式のパック名として確認しています。それ以外は、画面に出た名前を、配布元を読んでから自分で選びます。

速度が何倍か、必要な VRAM のランキング、料金は書きません。GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、とだけ覚えてください。クラウドのノートブックで動かす手順は、このページでは書きません。クラウド環境の規約を確認してください。

プロンプトの順番と、負向のテンプレの全体は [ネガティブプロンプト](/guides/negative-prompt-guide) です。カテゴリの入口は [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list) です。`,
      },
    ],
    faq: [
      {
        q: 'Manager は最初から入っていますか',
        a: 'Desktop は、公式が、インストールごとに Manager を入れ --enable-manager 付きで起動する、と書いています。ポータブルと手動は、コアに入っているが有効化が要る、と同じページが書いています。',
      },
      {
        q: 'ボタンが表示されないときは何を見ますか',
        a: '先に --enable-manager があるか、--disable-manager-ui が付いていないかを見ます。カスタムノードとして入れた場合は、ComfyUI/custom_nodes/comfyui-manager かを見ます。直下への展開や二重フォルダは、公式が避けるパスです。',
      },
      {
        q: 'Install Custom Nodes と Install はどちらですか',
        a: '旧版 README のメニュー名は Install Custom Nodes、Install Models、Install Missing Custom Nodes です。新版 UI の公式ページは Install、Update、Install All、Open Manager、Missing です。開いている版の名前を使ってください。',
      },
      {
        q: 'security_level は weak にしますか',
        a: '不明な git の URL のために下げません。公式は git の URL を高リスクに分類しています。信頼できる配布元だけを、今のレベルで入れられる範囲に留めてください。',
      },
      {
        q: '更新は本体と一緒ですか',
        a: '公式は、Manager を本体とは別のパッケージだと書いています。Desktop は Manage パネルからエンジンを更新します。ポータブルと手動は、依存をもう一度入れて --enable-manager で再起動します。clone した場合は custom_nodes/comfyui-manager で git pull です。',
      },
    ],
  },

  'stable-diffusion-webui-guide': {
    sections: [
      {
        title: 'WebUI は、欄のある元の画面',
        content: `「stable diffusion web ui」「stable diffusion webui」「a1111」は、AUTOMATIC1111 の Stable Diffusion web UI を指します。公式 README は、Gradio の web interface で、one click install and run script だと書いています。Python と git は自分で入れます。2026年11月時点の Releases で先頭に出ている最新リリースは v1.10.1 で、公開日は 2025年2月9日です。それより新しいタグが Releases に並んだら、そちらを見てください。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

このページは、元の画面の導入、起動、タブ、日本語化、Forge や ComfyUI との位置づけです。環境を選ぶ全体は [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide)、Forge と Forge Neo のパッケージは [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide)、ノードは [ComfyUIの使い方](/guides/comfyui-guide) です。

| 言葉 | このページ |
|---|---|
| インストール、ダウンロード、起動方法 | README の Windows、Linux、Mac の入口 |
| 日本語化、日本語化できない | ja_JP Localization と、None への戻し方 |
| forge 違い | 欄の元が WebUI で、Forge はその上 |

人物は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。モデルは .safetensors 形式を選びます。README は、チェックポイントを safetensors 形式で読める、とも書いています。

本体は <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">AUTOMATIC1111 の README</a>、機能の一覧は <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Features</a>、リリースは <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.10.1" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">v1.10.1</a> です。`,
      },
      {
        title: 'インストールと起動',
        content: `Windows の自動インストールは、README が次の順です。Python 3.10.6 を入れ、Add Python to PATH にチェックする。git を入れる。リポジトリを clone する。\`webui-user.bat\` を、通常のユーザーで実行する。README は、より新しい Python は torch をサポートしない、と書いています。管理者として bat を実行する、とは書いていません。

\`\`\`
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
\`\`\`

\`\`\`
webui-user.bat
\`\`\`

Windows 10/11 で NVIDIA GPU 向けの別経路は、release の \`sd.webui.zip\`（v1.0.0-pre）を展開し、\`update.bat\` のあと \`run.bat\` です。詳細は README が Install and Run on NVidia GPUs の Wiki へ分けています。Linux は、依存を入れたあと \`webui.sh\` を実行する、または同じリポジトリを clone して \`webui.sh\` を実行する、と README にあります。オプションは \`webui-user.sh\` です。Apple シリコンは、Installation on Apple Silicon の Wiki です。AMD と Intel も、README が別の Wiki へ分けています。

\`\`\`
webui.sh
\`\`\`

初回は依存の取得が終わるまで、ブラウザが開きません。窓を閉じると、次も同じ取得からになることがあります。起動したあとのアドレスは、コンソールに出ます。README は 4GB video card support と書いています。これはその README の記載で、SDXL や、それより新しいモデルが同じ容量で動く保証ではありません。速度が何倍か、このページでは書きません。GPU・メモリが多いほど大きい画像や新しいモデルを扱いやすい、とだけ覚えてください。

クラウドの実行環境は、README がオンラインサービスの Wiki を案内しています。このページでは手順を書きません。クラウド環境の規約を確認してください。`,
      },
      {
        title: 'タブと、最初の一枚',
        content: `README と Features が名前を出している欄は、txt2img、img2img、Extras、PNG Info、Checkpoint Merger、Settings です。拡張は Extensions タブから入れます。日本語化の README も、Extensions、Available、Settings というタブ名で手順を書いています。Training は README の機能一覧にあります。見出しが版で違っていたら、今の画面を採ってください。

txt2img が、文章から一枚出す欄です。img2img は元画像からです。Extras は、README が顔の補正とアップスケーラーを置くタブとして書いています。PNG Info は、生成パラメータを画像から戻すタブです。Checkpoint Merger は、最大三つまでのチェックポイントを一つにまとめるタブです。Settings は、VAE や表示言語を含む設定です。

最初の比較は、プロンプトと Seed を固定し、変えるものを一つにします。目安は、モデルの配布ページに推奨があればそちらを優先します。無ければ、steps は 20 から 30、CFG Scale は 7 前後です。画面定義の CFG Scale の初期値は 7.0 です。これは目安です。Hires. fix はオフから始めます。拡大は [Hires. fixの使い方](/guides/hires-fix-upscale-guide)、サンプラーは [Stable Diffusionのサンプラー](/guides/stable-diffusion-sampler-guide)、元画像は [img2imgの使い方](/guides/img2img-guide) です。

\`\`\`
Sampling steps: 20 から 30（目安）
CFG Scale: 7 前後（初期値は 7.0）
Seed: 固定
Hires. fix: オフ
\`\`\`

負向は、README が Negative prompt という別のテキスト欄だと書いています。体と年齢の行は、下の作例のまま残します。書き方の全体は [ネガティブプロンプト](/guides/negative-prompt-guide) です。強調は、README が \`(tuxedo:1.21)\` と、二重の括弧を説明しています。記号の違いは [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。`,
      },
      {
        title: 'フォルダと COMMANDLINE_ARGS',
        content: `チェックポイントは \`models/Stable-diffusion\`、LoRA は \`models/Lora\`、VAE は \`models/VAE\`、拡張は \`extensions\` です。VAE のディレクトリは、本体の \`modules/sd_vae.py\` が models の下の VAE を指しています。LoRA の既定ディレクトリは、コマンドラインの説明が \`models/Lora\` と書いています。ComfyUI の \`models/loras\` や \`models/vae\` とは綴りが違います。ファイルを一つだけ置いて両方の一覧に出したいときは、ComfyUI 側の \`extra_model_paths.yaml\` で検索先を足します。やり方は ComfyUI のガイドです。

\`\`\`
models/Stable-diffusion
models/Lora
models/VAE
extensions
\`\`\`

\`webui-user.bat\` の \`COMMANDLINE_ARGS\` は、起動時の追加引数です。README が例にしているのは、xformers を使うときの \`--xformers\` です。Wiki の引数一覧には、\`--vae-dir\`、\`--vae-path\`、\`--no-half-vae\`、\`--api\`、\`--ckpt-dir\` もあります。意味を確認せずに長い行を貼ると、見ているフォルダが変わります。最初は空のまま起動し、必要になってから一つ足してください。

\`\`\`
set COMMANDLINE_ARGS=--xformers
\`\`\`

上の一行は、README が xformers の速度向上として書いている引数です。対応するカードでないときは、外して起動します。\`--medvram\` などのメモリ用の旗は、Wiki の一覧に説明があるものだけを、今の Wiki で読んでから足してください。このページでは、測っていない旗を推奨しません。

モデルは .safetensors を優先します。出所の分からない URL を、Extensions のインストール欄へ貼らないでください。拡張は、信頼できる配布元のものだけです。顔の自動補正は [ADetailerの使い方](/guides/adetailer-face-fix-guide) で、Extensions の Install from URL の手順を確認します。`,
      },
      {
        title: '日本語化',
        content: `日本語の表示は、本体に最初から入っている言語ではなく、拡張の言語ファイルです。公式の拡張一覧 \`index.json\` にある名前は ja_JP Localization で、url は AI-Creators-Society のリポジトリです。その README は、AUTOMATIC1111 版で使う、と書いています。Forge やほかの画面では、一部しか訳されない場合があります。

手順は、その README が次の順です。Extensions を開き、Available を開く。Extension index URL が、README に書かれた index.json であることを確認し、Load From: を押す。Hide extensions with tags は、localization 以外にチェックを付ける。localization には付けません。一覧の ja_JP Localization の Install を押す。\`Installed into...\` と出たら、設定へ移ります。

\`\`\`
Extensions → Available → Load From:
Hide extensions with tags: localization 以外を隠す
Install: ja_JP Localization
\`\`\`

適用は、Settings の Localization (requires restart) です。README のドロップダウンの例は \`ja-JP\` です。拡張の名前は ja_JP Localization なので、ハイフンとアンダースコアが違って見えます。一覧に出た名前を選んでください。出てこないときは、README が右側の再読込を案内しています。保存は Apply settings、再起動は Restart Gradio and Refresh components です。画面が Reload UI というボタンのときは、そちらが再読み込みです。

\`\`\`
Settings → Localization (requires restart) → ja-JP
Apply settings
Restart Gradio and Refresh components
\`\`\`

二言語の表示は、README が Bilingual Localization を標準で組み込んでいる、と書いています。Settings の Bilingual Localization で \`ja_JP\` を選びます。そのとき、Settings、User interface、Localization は \`None\` にしておく、と注意があります。両方を同時に有効にしないでください。

英語へ戻すときは、Localization を None にして、Apply settings のあと再読み込みします。拡張を外すときは、Installed のチェックを外すか、\`extensions\` の中のそのフォルダを、WebUI を止めてから消します。消す前に、他の拡張のフォルダと間違えないでください。

一覧の URL と、README の Install from URL の例は、別のリポジトリを指していることがあります。Available からのインストールを優先し、URL を手で貼るときは、index.json の url 欄を見てください。拡張の索引は <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui-extensions" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stable-diffusion-webui-extensions</a>、言語ファイルは <a href="https://github.com/AI-Creators-Society/stable-diffusion-webui-localization-ja_JP" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">ja_JP Localization</a> です。`,
      },
      {
        title: 'A1111、Forge、ComfyUI',
        content: `三つは、同じプロンプトの文章から始められます。違うのは、画面と、フォルダの綴りと、更新のされ方です。

| 画面 | 公式の位置づけ | このサイトのページ |
|---|---|---|
| AUTOMATIC1111 | 欄のある元の WebUI | このページ |
| Forge / Forge Neo | WebUI の上のプラットフォーム。Neo のブランチは \`neo\` | [Forgeの使い方](/guides/stable-diffusion-forge-guide) |
| ComfyUI | ノードのグラフ | [ComfyUIの使い方](/guides/comfyui-guide) |

Forge の README は、AUTOMATIC1111 の WebUI の上に載る、と説明しています。欄の名前は近いです。拡張は、A1111 用がそのまま動くとは限りません。日本語化も、言語ファイルの README が A1111 向けだと書いているので、Forge では一部だけになる場合があります。速度が何倍か、このページでは書きません。

ComfyUI は、txt2img というタブがありません。\`CLIP Text Encode (Prompt)\` と KSampler で、同じ文章を処理します。モデルのフォルダは \`models/checkpoints\` です。WebUI の \`models/Stable-diffusion\` へ置いたファイルは、ComfyUI の一覧にはそのまま出ません。

どれか一つを先に一週間使います。同じ午後に三つ入れると、モデルを置いた場所が三つになります。欄で比べたいときは WebUI か Forge、処理を JSON で残したいときは ComfyUI です。選び方の全体は [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide)、どの公式ツールでイラストを出すかは [AIイラスト生成ツールの選び方](/guides/ai-illustration-generator-guide) です。`,
      },
      {
        title: 'コピペできるプロンプト',
        content: `順番は、人数、見た目、服、ポーズ、構図、背景、光です。カンマは半角です。下の六つは、txt2img の正向と Negative prompt に分けて貼れます。LoRA を足す日は、文章を固定し、\`<lora:filename:0.7>\` だけを足します。

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
people, text
\`\`\`

自然文で同じ肖像を書くときは、括弧の倍率を外します。

\`\`\`
An adult woman, black hair, white blouse, soft daylight, plain background.
Looking at the viewer. No text. Adults only.
\`\`\``,
      },
      {
        title: '起動しない、日本語にならない',
        content: `起動しないときは、README が前提にしているものから見ます。Python 3.10.6、PATH、管理者ではない \`webui-user.bat\`、初回の依存が終わるまで閉じないこと、です。より新しい Python は torch をサポートしない、と README が書いています。ComfyUI の Python の版を、この README の版だと決めつけないでください。

\`\`\`
起動: Python 3.10.6、PATH、webui-user.bat
日本語: ja_JP Localization を入れてから Localization
戻す: None → Apply settings → 再読み込み
\`\`\`

日本語にならないときは、拡張が Installed にあるか、Localization が None のままか、Apply settings の前に再読み込みしていないか、を見ます。二言語を使う日は、User interface の Localization を None にしたまま、Bilingual Localization 側だけを有効にします。Forge で一部だけ日本語なら、言語ファイルが A1111 向けだから、です。Forge 用の完全な翻訳がある、とはこの README は書いていません。

モデルが一覧に無いときは、\`models/Stable-diffusion\` に \`.safetensors\` があるかを見て、画面の更新を押します。圧縮ファイルを置いただけでは出ません。VAE で色が薄いときは [Stable DiffusionのVAE](/guides/stable-diffusion-vae-guide) です。タグの細目は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide) です。`,
      },
    ],
    faq: [
      {
        q: 'Python は 3.10.6 以外でもよいですか',
        a: 'README の Windows 自動インストールは Python 3.10.6 で、より新しい Python は torch をサポートしない、と書いています。ほかのソフトの推奨版を、この README の版だと決めつけないでください。',
      },
      {
        q: '日本語化はどの拡張ですか',
        a: '公式の index.json の名前は ja_JP Localization で、url は AI-Creators-Society のリポジトリです。Extensions、Available、Load From: のあと、localization 以外のタグを隠し、Install します。Settings の Localization の例は ja-JP です。',
      },
      {
        q: 'Forge も同じ拡張で全部日本語になりますか',
        a: '言語ファイルの README は AUTOMATIC1111 版向けだと書いています。Forge では一部しか訳されない場合があります。戻すときは Localization を None にします。',
      },
      {
        q: '最新バージョンは何ですか',
        a: '2026年11月時点の Releases で先頭に出ているのは v1.10.1（2025年2月9日公開）です。それより新しいタグが並んだら、Releases を見てください。',
      },
      {
        q: 'Colab で入れる手順はありますか',
        a: 'このページでは書きません。クラウド環境の規約を確認してください。ローカルは README の clone と webui-user.bat、または webui.sh です。',
      },
    ],
  },

  'ai-illustration-generator-guide': {
    sections: [
      {
        title: '先に、何を優先するかを一つ決める',
        content: `「ai イラスト 生成」「ai イラスト 作成」「ai イラスト 自動生成 サイト」で並ぶ名前は、文章で頼むサービスと、自分の PC でタグを書くソフトに分かれます。このページは、公式のツールを選ぶ流れと、ツールごとのプロンプトです。一枚を仕上げる順番は [AIイラストの作り方](/guides/ai-illustration-how-to-guide) です。あちらが手順、こちらが選び方、と分けます。

2026年11月時点の確認です。料金、回数、プランの上限は書きません。最新は公式で確認してください。バージョンによって表示名や仕様が違うことがあります。

| 優先したいこと | 先に開くもの |
|---|---|
| 自然文で頼みたい | ChatGPT、Gemini、Copilot、Firefly、Canva |
| アニメ調をパラメータで寄せたい | Midjourney の \`--niji\`、またはローカルのアニメ向けモデル |
| 細かく制御したい | Forge、WebUI、ComfyUI |
| 商用で使いたい | 各公式の規約。Stable Diffusion は商用利用のガイド |

人物は大人だけです。文章でも \`adult\` を残し、子供の人物は書きません。実在の人物、存命の作家、既存の作品のキャラクターは使いません。服は閉じた日常着です。

カテゴリ別のタグは [AIイラストの呪文一覧](/guides/ai-illustration-prompt-list) です。`,
      },
      {
        title: '自然文で頼む公式のツール',
        content: `ChatGPT の公式ヘルプは、画像機能の名前を ChatGPT Images とし、会話の中で頼むか、More から Images を選んで文章を入れる、と書いています。Web、iOS、Android で使える、とも書いています。すべての tiers で使える、という文は、そのヘルプにあります。枚数は書かれていないので、このページでも書きません。上限の見方は [ChatGPTの画像生成](/guides/chatgpt-image-generation-guide) です。

Gemini の公式ヘルプは、画像の生成と編集にサインインが必要で、対応する言語と国に限られる、と書いています。コンピュータでは gemini.google.com のサイドバーから Images を開き、テンプレートか文章で生成する、という手順です。年齢や回数の条件は、そのヘルプが変わるので、ここでは写しません。文例の続きは [Geminiプロンプト集](/guides/gemini-prompt-collection) です。

Microsoft の公式サポートは、Microsoft Copilot の Create から Create an image を選び、Describe the image you want to create に文章を入れ、Style に Anime を含む選択肢がある、と書いています。対象の Microsoft 365 のサブスクリプションが要る、とも書いています。料金は書きません。Designer は、個人利用で Microsoft アカウントでのサインインが要る、と別の公式 FAQ が書いています。

Adobe Firefly の公式ヘルプは、ブラウザかモバイルで開き、サインインし、Image の Generate image で文章から画像を作る、と書いています。Content type には Art、Photo、または自動、があります。モデル名は選んだモデルで設定が変わります。

Canva の Magic Media は、エディタの Magic Media から Images または Graphics を選び、文章、Styles、Layouts のあと Generate images または Generate graphics、と公式ヘルプが案内しています。Magic Studio のページは、使える機能がプランで違う、と書いています。回数は写しません。

<a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Images in ChatGPT</a>、<a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Gemini の画像生成</a>、<a href="https://helpx.adobe.com/firefly/web/work-with-images/generate-images/generate-images-from-text-descriptions.html" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Firefly の文章から画像</a>、<a href="https://www.canva.com/magic/" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Canva Magic Studio</a> です。2026年11月時点・最新は公式で確認してください。`,
      },
      {
        title: 'Midjourney と、ローカルの Stable Diffusion',
        content: `Midjourney の公式ドキュメントは、パラメータを文章の末尾に置く、と書いています。アニメ寄りのモデルは、パラメータ一覧が \`--niji\` と案内しています。除外は \`--no\` で、これも末尾です。\`--no modern clothing\` のように語を分けると、意図と違う除外になる、と公式が注意しています。着てほしい服は正向に書き、\`--no\` は短くします。

無料で試す、という検索への公式の文は、niji・journey アプリ（iOS と Android）に limited trial があり、Discord と midjourney.com には現在 free trial が無い、です。回数と料金は写しません。始め方の画面は [Midjourneyの使い方](/guides/midjourney-how-to-guide)、文章の詳細は [Midjourneyプロンプト](/guides/midjourney-prompt-guide) です。

\`\`\`
公式の trial の範囲は、niji・journey アプリに限る、とドキュメントが書いている
Discord と midjourney.com の free trial は、同じ文が「現在は無い」と書いている
\`\`\`

ローカルは、欄なら [Stable Diffusion WebUIの使い方](/guides/stable-diffusion-webui-guide) か [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide)、ノードなら [ComfyUIの使い方](/guides/comfyui-guide) です。タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、モデルの系統は [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。Seed とステップを固定して比べたいときは、ローカルが向きます。文章のまま一枚見たいときは、前の節のサービスです。

<a href="https://docs.midjourney.com/hc/en-us/articles/27870399340173-Free-Trials" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Midjourney の Free Trials</a> です。クラウドのノートブックで WebUI を動かす手順は書きません。クラウド環境の規約を確認してください。`,
      },
      {
        title: '比べるときの列',
        content: `列は、提供元、使う場所、指示の書き方、得意なこと、注意点だけです。料金と回数の列は作りません。注意点の商用は、どの行も「規約を確認」です。この表が商用できる、とは書いていません。

| 提供元 | 使う場所 | 指示の書き方 | 得意なこと | 注意点 |
|---|---|---|---|---|
| OpenAI ChatGPT | Web、iOS、Android | 自然文。More から Images も可 | 会話の中で直せる | 商用は規約を確認。枚数は公式 |
| Google Gemini | Web とアプリ。要サインイン | 自然文。Images から | 文章で直せる | 言語と国の条件は公式。商用は規約 |
| Microsoft Copilot | Web とアプリの Create | 自然文。Style を選べる | 説明文から画像 | 対象のサブスクリプションは公式。料金は書かない |
| Adobe Firefly | Web、モバイル | 自然文。Art か Photo | 文章から画像や動画 | 商用は Adobe の規約 |
| Canva | エディタの Magic Media | 自然文。Styles と Layouts | デザインの中に置く | 機能はプランで違う。商用は規約 |
| Midjourney | Web と Discord。trial は niji・journey アプリ | 自然文と、末尾のパラメータ | 絵の雰囲気、\`--niji\` | trial の有無は公式。商用は規約 |
| ローカル Stable Diffusion | Forge、WebUI、ComfyUI | 英語のタグが基本 | Seed と比較、負向欄 | モデルごとのライセンス |

同じ文章を、自然文のサービスとローカルのタグの両方へ、同じ日に貼らないでください。カンマの列と、文章が、両方とも平均になります。保存は二つに分けます。

検索で並ぶ「おすすめ」「アプリ」「サイト」「スマホ」「アニメ」「やり方」は、この表の行を選ぶための言葉です。スマホで今すぐ一枚なら、Web とアプリの行です。アニメの絵柄をパラメータで寄せるなら Midjourney の行か、ローカルのアニメ向けモデルです。やり方の手順そのものは、作り方のページに残します。サイトを何十個も並べた一覧は作りません。公式が手順を公開しているものだけを、上の列に置いています。

アプリと Web でボタンの位置が違う日は、文章の方を先に保存します。ボタンが変わっても、成人の人数と、閉じた服と、背景を一つ、は文章の中に残ります。画面の名前を覚えるより、その三つの文を先に固定してください。`,
      },
      {
        title: 'アニメ調のプロンプト',
        content: `アニメ調は、画風の語を一つだけ足します。\`anime style\` と写真の語を同じ強さにすると、顔の半分だけが別の媒体になります。ローカルのアニメ向けモデルは、推奨タグがカードごとに違います。[アニメプロンプト](/guides/anime-prompt-guide) と [Illustriousプロンプト](/guides/illustrious-prompt-guide) を見て、このページの人数と服は残してください。

**ChatGPT や Gemini や Firefly や Canva**

\`\`\`
An illustration of 1 adult woman, adult, black hair, white blouse and a cardigan.
Anime style, clean line art, soft daylight, plain background, upper body.
No text. No extra people. Adults only.
\`\`\`

**Midjourney**

\`\`\`
1 adult woman, adult, black hair, white blouse, cardigan,
anime illustration, soft daylight, plain background, upper body
--niji --no text, extra people
\`\`\`

**Stable Diffusion のタグ**

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

**成人の男性、アニメ寄り**

\`\`\`
1 adult man, adult, anime style, short black hair,
shirt, casual jacket, upper body, simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic
\`\`\`

Copilot の Style で Anime を選んだ日は、文章の中にも anime illustration を残すと、選んだ Style と文章が矛盾しにくくなります。Style を Photorealistic にしたまま、文章だけをアニメにしないでください。`,
      },
      {
        title: '肖像、二人、風景、静物',
        content: `アニメ以外は、画風の語を外すか、一つだけにします。二人は人数を先に書きます。風景と静物には人を書きません。

**自然文の肖像**

\`\`\`
An adult woman with black hair and a white blouse, soft daylight, plain background.
Upper body, looking at the viewer. No text. Adults only.
\`\`\`

**自然文の静物**

\`\`\`
A ceramic cup on a linen cloth, soft studio light, plain background, sharp focus.
No people. No text. No logo.
\`\`\`

**Midjourney の風景**

\`\`\`
quiet lakeside, pine trees, morning mist, soft daylight, wide landscape
--ar 3:2 --no people, text
\`\`\`

**Stable Diffusion の二人**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
standing side by side, coat, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\`

**Stable Diffusion の風景**

\`\`\`
quiet lakeside, pine trees, morning mist, soft daylight,
wide landscape, no people
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

**Stable Diffusion の静物**

\`\`\`
product photo, ceramic cup on a linen cloth,
soft studio light, simple background, sharp focus
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, text
\`\`\`

気に入った自然文は、メモに残してから、ローカル用のタグへ分けます。分けたあとに意味を足さないでください。足すと、サービスで見た絵と、ローカルの絵の差が、文章の差なのかモデルの差なのか分からなくなります。`,
      },
      {
        title: '商用で使いたいとき',
        content: `このページは、どのツールも商用できる、とは書きません。生成物を販売、広告、納品に使うときは、そのサービスの利用規約を開いてください。規約は変わります。2026年11月時点の画面の要約だけで判断しないでください。

Stable Diffusion は、モデルごとにライセンスが違います。SD1.5、SDXL、SD3.5、FLUX の確認順は [Stable Diffusionの商用利用](/guides/stable-diffusion-commercial-use-guide) です。ベースが商用できても、あとから足した LoRA や、配布ページの追加条件で変わることがあります。ChatGPT の規約を、Stable Diffusion のライセンスの代わりにしないでください。

実在の人物の顔、既存のキャラクター、商標のあるロゴは、規約が生成を許していても、このページの作例には入れません。参照画像をアップロードする機能は、ChatGPT、Gemini、Firefly、Copilot、Midjourney にあります。自分で撮影または作成したもの、使用が許されたものだけを渡してください。

公開する前に、文章に残した「入れない」が、出力に反映されているかを見ます。文字が残っている、人が増えている、服が指定と違う、の三つが残った枚は、公開用に使いません。`,
      },
      {
        title: '作り方のページとの分担',
        content: `このページでツールが決まったら、一枚の手順は [AIイラストの作り方](/guides/ai-illustration-how-to-guide) です。目的、文章、数枚、一箇所だけ直す、権利、という順番はあちらに残します。ここでは選び方と、貼れる文だけを書きます。

ローカルを選んだあとの最初の一枚は [Stable Diffusionの使い方](/guides/stable-diffusion-getting-started-guide) です。負向のテンプレは [ネガティブプロンプト](/guides/negative-prompt-guide)、VAE で色が薄いときは [Stable DiffusionのVAE](/guides/stable-diffusion-vae-guide) です。

\`\`\`
自然文で一枚: ChatGPT または Gemini
アニメのパラメータ: Midjourney の --niji
Seed を固定: WebUI または Forge
つなぎを保存: ComfyUI
\`\`\`

同じ週に全部を契約して比べる必要はありません。一つで、成人の肖像が三枚続けて意図と近いかを見てから、次のツールへ移ってください。三枚が違う理由が、文章の曖昧さなら、ツールを変えても同じ曖昧さが残ります。

比べるときの持ち出しは、人数、服、背景、光の四語だけです。髪の色まで変えてからツールを替えても、差の理由が増えます。四語が三枚で同じに見えたら、そのツールは今の文を受け取れています。受け取れないときは、タグと自然文のどちらで書いたかを先に見直し、ツールの契約は増やしません。

ローカルを選んだ週は、モデルファイルを一つだけ置きます。アニメ向けと写真向けを同じ日に入れると、文章の比較がモデルの比較になります。ファイルは .safetensors を選び、配布ページのライセンスを読んでからフォルダへ移します。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。`,
      },
    ],
    faq: [
      {
        q: '無料で、登録なしで使えますか',
        a: 'このページは、登録不要とは書きません。Gemini の公式ヘルプはサインインが必要だと書いています。Midjourney の公式は、limited trial が niji・journey アプリにあり、Discord と midjourney.com には現在 free trial が無い、と書いています。回数は写しません。2026年11月時点・最新は公式で確認してください。',
      },
      {
        q: 'スマホだけでイラストを作れますか',
        a: 'ChatGPT Images は公式ヘルプが web、iOS、Android と書いています。Gemini もアプリの手順があります。Midjourney の trial は、公式が niji・journey の iOS と Android と書いています。細かいタグの比較は、PC の WebUI か Forge の方が欄を固定しやすいです。',
      },
      {
        q: 'アニメ調はどのツールですか',
        a: '自然文なら、文章に anime illustration と書きます。Copilot は Style に Anime があると公式サポートが書いています。Midjourney はパラメータ一覧の --niji です。タグで制御するなら、ローカルのアニメ向けモデルです。',
      },
      {
        q: '商用に使ってよいですか',
        a: 'このページは商用できるとは書きません。各サービスの規約と、Stable Diffusion はモデルごとのライセンスを確認してください。確認の入口は商用利用のガイドです。',
      },
      {
        q: '作り方のページと何が違いますか',
        a: 'このページは、どの公式ツールを選ぶかと、ツールごとの文です。一枚を仕上げる順番は AIイラストの作り方です。',
      },
    ],
  },

  'negative-prompt-guide': {
    sections: [
      {
        title: 'ネガティブプロンプトとは',
        content: `ネガティブプロンプトは、生成してほしくない条件を書く欄です。Stable Diffusion では、正向の条件へ寄せ、負向の条件から離す、という対で絵が進みます。CFG は、条件へどれだけ寄せるかの強さです。数値を大きくすれば負向が必ず消える、という関係ではありません。最適の数値は、モデルの配布ページに推奨があればそちらを優先します。このページでは倍率を発明しません。

2026年11月時点でも、欄の名前はツールで違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

人物の作例は大人だけです。\`adult\` を正向に残し、負向には年齢の語を残します。服は閉じた日常着です。実在の人物や、既存のキャラクターは使いません。

品質の語の置き場所は [品質タグ一覧](/guides/quality-tags-prompt-guide)、タグの順番は [Stable Diffusionプロンプト](/guides/stable-diffusion-prompt-guide)、記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

正向は、描きたいものの一覧です。負向は、その反対を全部書く欄ではありません。描きたくないものが正向に残っていると、負向に同じ意味を足しても、両方の平均になります。先に正向から矛盾を消して、負向は体と年齢の短い行に留めてください。検索で「とは」「書き方」「テンプレ」「コピペ」と並ぶニーズは、この順です。定義、欄の場所、短い行、全文、です。

CFG を上げると、条件への寄りが強くなります。寄りが強いときに負向が長いと、避けたい形の輪郭だけが残ることがあります。その日は CFG を初期値の付近へ戻し、負向は短くしてから、もう一枚だけ出します。初期値は画面とモデルで違います。A1111 の CFG Scale の初期値は 7.0 です。これは目安で、最適な倍率ではありません。`,
      },
      {
        title: 'どこに書くか',
        content: `AUTOMATIC1111 の README は、Negative prompt を、見たくないものを書く別のテキスト欄だと説明しています。txt2img と img2img の、正向の下にあります。Forge は WebUI の上に載る、と Forge の README が説明しているので、同じ欄が残っていることが多いです。見出しが違うときは、今の画面の欄を使ってください。導入は [Stable Diffusion WebUIの使い方](/guides/stable-diffusion-webui-guide) と [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide) です。

ComfyUI には、その名前の欄がありません。公式チュートリアルのノードは \`CLIP Text Encode (Prompt)\` で、正向と負向に二つ置きます。負向の CONDITIONING を KSampler の negative へつなぎます。つなぎは [ComfyUIの使い方](/guides/comfyui-guide) です。

\`\`\`
WebUI / Forge: Negative prompt の欄
ComfyUI: CLIP Text Encode (Prompt) → KSampler の negative
\`\`\`

NovelAI の除外欄は Undesired Content です。強調の \`{ }\` と \`1.5::タグ::\` の詳細は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) に残しています。年齢の行は、どちらへ移しても残します。

Midjourney には負向の欄がありません。公式の No パラメータは、文章の末尾の \`--no\` です。\`--no fruit, apple\` のように、除外したい語をカンマで続けます。公式は、\`--no modern clothing\` が語ごとに読まれ、服そのものを消す側に働くことがある、と注意しています。着てほしい服は正向に書き、\`--no\` は文字や余分な人のように短くします。パラメータは末尾です。

\`\`\`
quiet lakeside, pine trees, morning mist --no people, text
\`\`\`

ChatGPT と Gemini の公式ヘルプは、文章を書く手順で、専用の負向欄を案内していません。避けたいものは、文の中に「〜は入れない」と書きます。画像機能の入口は [AIイラスト生成ツールの選び方](/guides/ai-illustration-generator-guide) です。

欄を移すときは、語を翻訳しすぎないでください。WebUI のカンマ区切りを、Midjourney の \`--no\` へ全部移すと、末尾が長くなり、公式が注意する語の分割が起きます。移すのは、文字、余分な人、写真っぽさ、のどれか一つです。年齢の条件は、Stable Diffusion と NovelAI では負向の英語で残し、自然文では「成人だけ」「子供は入れない」と文に書きます。

空の負向で一枚出してから、汎用の行を足した一枚と比べると、そのモデルで負向が効いているかが分かります。二枚が同じなら、今のモデルは短い負向をほぼ無視しています。無視しているモデルに、長いテンプレを足しても、主題は変わりません。そのときは正向の矛盾を先に直します。`,
      },
      {
        title: '定番テンプレ',
        content: `最初の負向は短くします。体、指、ぼやけ、文字、年齢、です。品質の語を十個並べる前に、この行だけで一枚出してください。モデルの配布ページが別の行を指定しているときは、そちらを優先し、年齢の語だけは残します。

汎用:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

手と指を足すとき:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
fused fingers, poorly drawn hands, mutated hands, extra limbs
\`\`\`

文字と透かしを足すとき:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
username, logo, letters, words
\`\`\`

人数を一つに保つとき:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, multiple views, duplicate
\`\`\`

背景だけ、人を出したくないとき:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text, logo
\`\`\`

SDXL や Illustrious で、品質の語がカードと違うとき:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

最後の行は、汎用と同じです。品質タグを負向へ大量に足す代わりに、カードが指定する品質の語を正向へ置き、体と年齢は負向に残します。Illustrious の品質の並びは [Illustriousプロンプト](/guides/illustrious-prompt-guide)、SDXL の解像度は [SDXLとは](/guides/sdxl-guide) です。同じ語を正向と負向の両方には置かないでください。`,
      },
      {
        title: '手、文字、人数、背景',
        content: `手は、負向を長くするより、正向の手の指示を一つに減った方が先に効くことが多いです。持つ物と、指のジェスチャーを同時に強くすると、指が増えます。手のポーズの全体は [手・指のプロンプト](/guides/hand-finger-prompt-guide) です。顔が小さい全身で指まで直したいときは [ADetailerの使い方](/guides/adetailer-face-fix-guide) で、顔の領域だけを分けます。

文字は、正向に文字を書いていないのに出るときだけ、文字の行を足します。ロゴや署名を正向に残したまま、負向で消そうとすると、両方とも中途半端になります。

人数は、正向の \`1 adult woman\` や \`2 adults\` が先です。負向の extra people は、正向に人数が無い絵では、人が消える側に働くことがあります。二人の絵では extra people を残し、一人の絵では複数人の語を足しすぎないでください。

背景の絵では、people を負向に置き、正向から人数を消します。人数が正向に残った背景は、端に顔が出ます。場所の語は [背景プロンプト](/guides/background-prompt-guide) です。

**手を組まない肖像**

\`\`\`
1 adult woman, adult, portrait, black hair, white blouse,
soft daylight, simple background, looking at viewer
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
fused fingers, poorly drawn hands
\`\`\`

**文字を出したくない案内図ではなく、静物**

\`\`\`
product photo, ceramic cup on a linen cloth,
soft studio light, simple background, sharp focus
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, username, logo, letters
\`\`\``,
      },
      {
        title: '強調は 1.1 から 1.4 を目安にする',
        content: `A1111 の README は、\`(tuxedo:1.21)\` のように数値で注意を強める書き方と、二重の括弧を説明しています。負向でも同じ記号が読まれます。強くしたい語だけを \`(\` と \`)\` で包みます。括弧を文字として残したいときは \`\\(\` です。

目安は 1.1 から 1.4 です。これは目安で、モデルの配布ページに推奨があればそちらを優先します。1.4 より大きくすると、その語の形だけが勝ち、指や顔が別の崩れ方をすることがあります。全部の語を 1.4 にすると、どれが効いたのかが残りません。

\`\`\`
(extra fingers:1.2), (extra people:1.2),
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

NovelAI の数値強調は、WebUI の \`(tag:1.2)\` とは記号が違います。そのまま貼ると、括弧が文字として残るか、無視されます。NovelAI のガイドの形に戻してから、Undesired Content へ入れてください。

ComfyUI の README は、数値なしの括弧の初期強調を 1.1 とし、文字として残すときはバックスラッシュだと書いています。WebUI で 1.2 にした行を、ComfyUI へ移すときは、効き方を一枚だけで見ます。同じ日にステップも変えないでください。

入れすぎの副作用は、次の三つです。正向の主題が負向に負けて、人が小さくなる。品質の語と体の語が喧嘩して、肌が平面になる。欄が長くなり、先頭の年齢の語が後ろへ押し出される。長くした日は、年齢の行がまだ先頭付近にあるかを見てください。`,
      },
      {
        title: '症状から足す語',
        content: `直すときは、症状を一つにします。手と、文字と、人数を、同じ日に全部足さないでください。足しても変わらない語は、そのモデルでは弱いので、翌日には外します。

| 症状 | 負向に足す語 | 先に見ること |
|---|---|---|
| 指が多い、指が溶ける | \`extra fingers\`, \`fused fingers\`, \`poorly drawn hands\` | 正向の手の指示を一つに減らす |
| 文字、署名、透かし | \`text\`, \`watermark\`, \`signature\`, \`letters\` | 正向に文字の語が残っていないか |
| 人が増える | \`extra people\` | 正向の人数が先頭にあるか |
| 背景に顔が出る | \`people\`, \`person\` | 背景の正向から人数を消す |
| ぼやける | \`blurry\`, \`lowres\` | 解像度を、カードの基準に戻す |
| 色が白い、灰色 | 負向では直さない | [VAE](/guides/stable-diffusion-vae-guide) |

色が抜ける症状は、負向の語を足しても戻りません。VAE か、チェックポイントに含まれる VAE を見てください。負向を長くした枚で色を判断しないでください。

EasyNegative のような除外用の追加ファイルは、モデルの配布ページで推奨されている場合だけ使います。ダウンロード先は、このページでは書きません。推奨がカードに無いときに、名前だけで探すと、別の系統のファイルを読むことがあります。配布ページの一文を、ファイル名の横に残してください。`,
      },
      {
        title: 'ツール別の全文',
        content: `下は、正向と負向をセットにした全文です。Stable Diffusion の負向には、年齢の語を毎回残します。

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
1 adult man, adult, casual jacket, shirt, trousers,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**二人**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
standing side by side, coat, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
\`\`\`

**アニメ寄り**

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

**NovelAI の除外欄へ移す行**

\`\`\`
${NEGATIVE_AGE},
${NEGATIVE_BODY}
\`\`\`

正向の順番は、NovelAI のガイドの、品質、人物、髪、服、構図、背景、光です。上の行は Undesired Content に置きます。

**Midjourney**

\`\`\`
1 adult woman, adult, black hair, white blouse, soft daylight, plain background
--no text, extra people
\`\`\`

**自然文**

\`\`\`
An adult woman, black hair, white blouse, soft daylight, plain background.
No text. No extra people. Adults only. Do not include children.
\`\`\``,
      },
      {
        title: '短く戻す',
        content: `負向が正向より長くなったら、汎用の一行へ戻します。戻した一枚と、長い一枚を、Seed を固定して比べます。違いが無ければ、足した語はそのモデルでは効いていません。

古いテンプレは、品質の語を負向の先頭に重ねます。worst quality や low quality を強い数値で並べる書き方です。カードが別の品質語を正向に指定するモデルでは、その重ねが正向と矛盾します。矛盾した枚は、肌が平面になったり、主題が小さくなったりします。品質の列は、カードと品質タグのガイドを見てから足し、体と年齢の行はどのテンプレでも残します。

NovelAI では、同じ行を Undesired Content に置きます。WebUI の括弧の数値を、NovelAI の強調へ翻訳せずに貼ると、括弧が文字として残ることがあります。翻訳は NovelAI のガイドの記号に合わせて、年齢の行だけはどちらでも同じ英語のまま残してください。除外したい要素の考え方は、欄の名前が違うだけで、短い行から始める点は同じです。

手の崩れは、負向の語より、画面に手を大きく出すかどうかで先に変わります。胸から上の肖像にして指を画面の外へ出すと、指の語を足す前に崩れが減ることがあります。それでも溶けるときだけ、手の行を一つ足します。足したあとも同じなら、その語は外して、解像度をカードの基準へ戻します。

\`\`\`
戻す行: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}
残すもの: 今日の症状の語を一つ
外すもの: 症状と関係ない品質の語
\`\`\`

品質タグを負向の先頭に十個置く書き方は、古いテンプレに残っています。カードが別の品質語を正向に指定しているモデルでは、その十個が正向と矛盾します。矛盾した日は、品質の列を外し、体と年齢だけを残してください。

手のガイド、プロンプトのガイド、NovelAI のガイドは、それぞれ負向の一部を持っています。三つを同じ日に連結しないでください。連結すると、年齢の行が三回繰り返され、主題が後ろへ下がります。今日開いている症状のページを一つだけ足します。`,
      },
    ],
    faq: [
      {
        q: 'ネガティブプロンプトは必須ですか',
        a: '必須という公式の一文はありません。Stable Diffusion では、体と年齢の短い行から始めると、崩れと、意図しない年齢の出力を避けやすくなります。長くすることが品質の保証にはなりません。',
      },
      {
        q: 'ChatGPT や Gemini に負向欄はありますか',
        a: '公式ヘルプの手順は、文章を書く、です。専用の負向欄はその手順に見当たりません。避けたいものは「〜は入れない」と文に書きます。',
      },
      {
        q: '強調はいくつにしますか',
        a: '目安は 1.1 から 1.4 です。モデルの配布ページに推奨があればそちらを優先します。全部の語を強くすると、どれが効いたのかが残りません。',
      },
      {
        q: 'EasyNegative は入れますか',
        a: 'モデルの配布ページで推奨されている場合だけです。このページはダウンロード先を書きません。推奨が無いときは、汎用の行だけにしてください。',
      },
      {
        q: 'NovelAI ではどこに貼りますか',
        a: 'Undesired Content です。WebUI の (tag:1.2) をそのまま貼らず、NovelAI のガイドの強調に戻してから入れてください。年齢の行は残します。',
      },
      {
        q: '入れすぎるとどうなりますか',
        a: '主題が負けて人が小さくなる、品質と体の語が喧嘩する、年齢の行が後ろへ押し出される、ことがあります。汎用の一行へ戻し、症状の語を一つだけ足してください。',
      },
    ],
  },

  'stable-diffusion-vae-guide': {
    sections: [
      {
        title: 'VAE は、潜在と画素の変換',
        content: `「stable diffusion vae」の VAE は、絵の画素と、拡散が扱う潜在表現を、行き来する変換です。AUTOMATIC1111 の設定文は、VAE を、RGB の画像を潜在表現へ、そして戻すニューラルネットワークだと説明しています。サンプリングのあいだに拡散が触っているのは、画素そのものではなく、その潜在表現です。img2img では、入力画像を潜在へ入れるときと、サンプリングのあと画素へ戻すときの両方で使います。

チェックポイントは、この変換を中に含んでいることが多いです。別ファイルの VAE は、その変換だけを差し替えるためのものです。色がおかしいときだけ差し替え、毎回必須、とは限りません。2026年11月時点のファイル名と、画面の項目名は版で違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。

モデルの配布ページで指定された VAE を優先します。指定が無いときは、チェックポイントに含まれる VAE のまま一枚出します。コミュニティの修正 VAE の名前は、このページでは挙げません。モデルは .safetensors 形式を選びます。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れてください。

検索では、とは、おすすめ、入れ方、設定、おかしくなる、出てこない、が並びます。このページの順は、変換の説明、症状、フォルダ、選択、Automatic と None、系統の違い、です。おすすめの一覧は作りません。配布ページが名前を書いているファイルが、そのモデルのおすすめです。出てこないときは、フォルダの綴りと、画面の更新を先に見ます。

アニメ向けと実写向けで、同じ公式 VAE が最適だとは書きません。派生モデルは、ベースと違うファイルを指定していることがあります。その指定が、公式の二つの名前と違っても、カードの一文を優先します。名前を覚えてからカードを読む、という順にしないでください。

公式の例は <a href="https://huggingface.co/stabilityai/sd-vae-ft-mse-original" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stabilityai/sd-vae-ft-mse-original</a> と <a href="https://huggingface.co/stabilityai/sdxl-vae" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">stabilityai/sdxl-vae</a> です。前者のカードは、元の CompVis のコード向けだと書いています。後者は SDXL の VAE です。`,
      },
      {
        title: '色が抜ける、荒れる、ときの見方',
        content: `合っていない VAE の症状としてよく言われるのは、色が白く抜ける、全体が灰色に寄る、ノイズが残る、です。これは目安です。同じ症状は、CFG を大きくした日や、プロンプトを長くした日にも起きます。切り分けは、Seed と文章を固定し、VAE の選択だけを変えた二枚を並べることです。

二枚が同じなら、その VAE は今のチェックポイントでは効いていません。チェックポイントに含まれる VAE に戻して、もう一枚出します。二枚で色だけが違うなら、VAE が原因の候補です。その日はサンプラーとプロンプトを動かさないでください。

ComfyUI の公式トラブルシューティングは、別の系統のモデルを混ぜると、VAE Decode の段階でチャンネル数のエラーになることがある、と書いています。例として、SD 系は 4 チャンネル、Flux は 16 チャンネル、と区別しています。エラー文にチャンネル数が含まれるときは、負向を足す前に、チェックポイントと VAE が同じ系統かを見てください。

\`\`\`
切り分け
1. Seed とプロンプトを固定
2. VAE だけを戻す
3. 色が同じなら、VAE は原因ではない
4. チャンネル数のエラーなら、系統が違う
\`\`\`

黒い四角になる、という症状は、A1111 の設定文が、VAE の中で NaN が出たときに、精度を戻すオプションと一緒に説明しています。項目名は版で違います。見知らぬファイルを探す前に、今選んでいる VAE を Automatic か、チェックポイント側へ戻してください。`,
      },
      {
        title: 'ファイルの置き場所',
        content: `A1111 のソースは、VAE のディレクトリを models の下の \`VAE\` にしています。同じ読み込みは、チェックポイントの隣の \`.vae.pt\`、\`.vae.ckpt\`、\`.vae.safetensors\` も探します。Forge は WebUI の上に載る、と README が説明していて、フォルダの例に \`VAE\` があります。画面に選択が無いときは、\`models/VAE\` に置いたうえで、今の README を見てください。

\`\`\`
WebUI / Forge: models/VAE
チェックポイントの隣: 同じ名前の .vae.safetensors
ComfyUI: models/vae
\`\`\`

ComfyUI の Load VAE の公式ノード文書は、\`ComfyUI/models/vae\` を読む、と書いています。\`extra_model_paths.yaml\` の追加パスも読みます。置いたあと、一覧が空なら、画面の更新か再起動です。綴りは小文字の \`vae\` で、WebUI の \`VAE\` とは別フォルダです。

\`\`\`
ComfyUI/models/vae
\`\`\`

圧縮ファイルをフォルダへ置いただけでは、一覧に出ません。展開した中の \`.safetensors\` を置いてください。SD1.5 向けと SDXL 向けを、同じフォルダに置いてよいですが、ファイル名に系統が分かる語を残します。名前の規則に公式の必須はありません。自分が後から見て区別できれば足ります。

<a href="https://docs.comfy.org/built-in-nodes/VAELoader" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">Load VAE</a> と <a href="https://docs.comfy.org/built-in-nodes/VAEDecode" rel="nofollow noopener" target="_blank" class="text-sky-600 hover:underline">VAE Decode</a> です。`,
      },
      {
        title: '選択の仕方',
        content: `A1111 の設定は、セクション VAE の中の SD VAE です。内部名は \`sd_vae\`、初期値は Automatic です。説明文は、Automatic がチェックポイントと同じファイル名の VAE を使い、None がチェックポイントに含まれる VAE を使う、と書いています。一覧には、見つかった VAE が並びます。

画面の上部へ出したいときは、Settings、User interface、Quicksettings list に \`sd_vae\` を足します。既定のクイック設定は \`sd_model_checkpoint\` だけです。Apply settings のあと、再読み込みが要ります。Wiki の Quick Settings の例にも SD VAE が挙がっています。

\`\`\`
Settings → VAE → SD VAE
初期値: Automatic
None: チェックポイントに含まれる VAE
Quicksettings list に足す名前: sd_vae
\`\`\`

Forge でも、この欄が残っていることがあります。無い画面で、WebUI の項目名を探して空振りしたときは、\`models/VAE\` と README を見てください。このページは、Forge 独自のボタン名を断定しません。

ComfyUI でチェックポイントに含まれる VAE を使うときは、Load Checkpoint の VAE 出力を VAE Decode の vae へつなぎます。別ファイルにするときは、Load VAE の vae を、VAE Decode の vae へつなぎます。VAE Decode の samples は、KSampler の LATENT です。出力は IMAGE です。

\`\`\`
含まれる VAE: Load Checkpoint の VAE → VAE Decode.vae
別ファイル: Load VAE → VAE Decode.vae
KSampler.LATENT → VAE Decode.samples
\`\`\`

ノード名は Load VAE と VAE Decode です。古い記事の別名で検索して赤いノードになるときは、キャンバスの検索で Load VAE を探してください。基本のつなぎは [ComfyUIの使い方](/guides/comfyui-guide) です。`,
      },
      {
        title: 'Automatic、None、含まれている VAE',
        content: `Automatic は、チェックポイントと同じファイル名の VAE を使う、という A1111 の説明です。隣にファイルが無いときは、チェックポイント側の VAE に落ちます。None は、別ファイルを使わず、チェックポイントに含まれる VAE です。色を直す実験の起点は、None か Automatic に戻した一枚です。

含まれている VAE は、チェックポイントの中の変換です。ファイル名に vae と付くチェックポイントは、配布ページが別の VAE を同梱していることがあります。SDXL の公式リポジトリには、ファイル名に 0.9vae と付くチェックポイントがあります。差し替えの手順が、カードの独立した節にはなっていないので、色がおかしいときだけ、今のファイルがどの VAE を含むかを配布ページで確認します。詳細の範囲は [SDXLとは](/guides/sdxl-guide) に残し、このページは置き場所と選択です。

別ファイルを選んだ日は、その選択が次の起動まで残ることがあります。昨日の SDXL 用を、今日の SD1.5 に付けたままにしないでください。クイック設定に \`sd_vae\` を出していると、生成の前に名前を確認できます。

一覧に名前が出ないときは、フォルダを足す前に、拡張子と綴りを見ます。WebUI は \`models/VAE\`、ComfyUI は \`models/vae\` です。同じファイルを両方で使うときは、コピーするか、ComfyUI の \`extra_model_paths.yaml\` で WebUI 側のフォルダを指します。指し方の例は、ComfyUI の例のファイルにあります。指したあとも空なら、画面の更新か再起動です。別の名前のファイルを、その場でダウンロードし始めないでください。

\`\`\`
起点: Automatic または None
同名のファイルがあるとき: Automatic がそれを使う
系統を変えた日: 選択が残っていないか見る
\`\`\`

fp16 で学習するときの \`--no_half_vae\` は、生成画面の項目とは別の話です。kohya の文書が、fp16 のとき VAE が不安定になることがあるので、その旗を案内しています。生成で色がおかしいときに、学習用の旗を \`COMMANDLINE_ARGS\` へ貼る必要はありません。A1111 の Wiki には \`--no-half-vae\` という起動引数もあります。意味を確認してから、一つだけ足してください。`,
      },
      {
        title: 'SD1.5 と SDXL は混ぜない',
        content: `stabilityai/sd-vae-ft-mse-original は、カードが、元の CompVis のコード向けの重みだと書いています。ファイル名の例は \`vae-ft-mse-840000-ema-pruned.safetensors\` です。同じカードは、Diffusers 向けは別のリポジトリだと案内しています。WebUI や Forge や ComfyUI へ置くときは、.safetensors を選び、.ckpt だけが置かれているページでは、配布ページの説明を読んでからにしてください。

stabilityai/sdxl-vae は、SDXL の VAE です。カードの表は、ファイル名 \`sdxl_vae.safetensors\` を SDXL で使っているものとして挙げています。評価の数値は、このページでは写しません。数値は環境とデータで意味が変わるためです。

SD1.5 向けの ft-MSE を、SDXL のチェックポイントに付け替えると、色が抜ける、という報告がよくあります。公式のカードは、それぞれ別の学習結果として公開しています。入れ替えは、配布ページが同じ系統と書いていない限り避けてください。チャンネル数のエラーが出る組み合わせは、ComfyUI の文書が Flux と SD 系のように、系統が違う例を挙げています。エラーが無くても、色が違うなら、それは合っているという意味ではありません。

\`\`\`
SD1.5 の例: stabilityai/sd-vae-ft-mse-original
SDXL の例: stabilityai/sdxl-vae
優先: モデルの配布ページが指定したファイル
\`\`\`

アニメ向けや、実写向けの派生モデルは、ベースと違う VAE を指定していることがあります。その名前が公式の二つと違っても、配布ページの指定を優先します。このページは、派生のファイル名を推薦リストにしません。系統の見分けは [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。`,
      },
      {
        title: '色を比べるためのプロンプト',
        content: `VAE を変える日は、下の文と Seed を固定します。服の色を白にしているので、白が灰色になっていないかを見ます。人物は大人だけです。

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
1 adult man, adult, casual jacket, shirt, trousers,
standing, upper body, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE}
\`\`\`

**アニメ寄り**

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

**二人**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
standing side by side, coat, simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people
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
people, text
\`\`\`

自然文で同じ杯を頼むときは、VAE の名前を文章に書きません。サービス側の変換は、ローカルのファイル選択と別です。

\`\`\`
A ceramic cup on a linen cloth, soft studio light, plain background.
No people. No text.
\`\`\`

白が灰色のときは、プロンプトの \`white blouse\` を増やす前に、VAE を戻します。語を増やした枚で、VAE の良し悪しを判断しないでください。`,
      },
      {
        title: '関連ページとの分担',
        content: `SDXL の Refiner と、0.9vae というファイル名の範囲は [SDXLとは](/guides/sdxl-guide) です。あのページの短い VAE の節は残し、置き場所と SD VAE と Load VAE はこのページです。

Forge のフォルダ表は [Stable Diffusion Forgeの使い方](/guides/stable-diffusion-forge-guide)、ComfyUI の \`models/vae\` は [ComfyUIの使い方](/guides/comfyui-guide) です。モデルを選ぶ表は [Stable Diffusionモデル一覧](/guides/stable-diffusion-model-list) です。

\`\`\`
色がおかしい: このページ
SDXL の Refiner: SDXL のページ
フォルダの全体: Forge か ComfyUI のページ
系統: モデル一覧
\`\`\`

負向を長くしても、白いブラウスが灰色のままなら、負向は原因ではありません。[ネガティブプロンプト](/guides/negative-prompt-guide) は、指や文字や人数の話です。色の日は、負向を汎用の一行に戻してから VAE を見てください。

入れたのに一覧へ出ないときは、拡張子の前までを見ます。\`.safetensors\` が、圧縮ファイルの中に残ったままになっていないか、フォルダが \`VAE\` と \`vae\` のどちらに置いたか、です。置いたあとの更新を押しても空なら、再起動してからもう一度だけ見ます。そのあとで、別の配布ページのファイルを探し始めないでください。

色が直った二枚は、ファイル名と、Automatic か None か、選んだ名前かを、メモに一行残します。残さないと、次のモデルへ移ったときに、昨日の選択が付いたままになります。メモが無い枚は、VAE の比較に使いません。`,
      },
    ],
    faq: [
      {
        q: 'VAE は必ず別ファイルが要りますか',
        a: '要りません。チェックポイントに含まれる VAE で色が問題なければ、Automatic か None のままで足ります。配布ページがファイル名を指定しているときだけ、そのファイルを優先します。',
      },
      {
        q: 'ファイルはどこに置きますか',
        a: 'WebUI と Forge の例は models/VAE です。ComfyUI の Load VAE は models/vae を読みます。綴りが違うので、片方に置いただけではもう片方の一覧に出ません。',
      },
      {
        q: 'SD VAE の Automatic と None は何ですか',
        a: 'A1111 の説明は、Automatic がチェックポイントと同じファイル名の VAE、None がチェックポイントに含まれる VAE です。初期値は Automatic です。上部に出すときは Quicksettings list に sd_vae を足します。',
      },
      {
        q: 'SD1.5 の VAE を SDXL に使えますか',
        a: '公式のカードは、別の学習結果として公開しています。配布ページが同じ系統と書いていない限り、入れ替えません。色が抜けるときは、指定された VAE に戻してください。',
      },
      {
        q: 'ComfyUI ではどのノードですか',
        a: '別ファイルは Load VAE、画素に戻すのは VAE Decode です。チェックポイントに含まれる VAE を使うときは、Load Checkpoint の VAE 出力を VAE Decode へつなぎます。',
      },
    ],
  },
}
