/**
 * Twenty-fifth SEO batch (2026-11-22): male body type, backlight / front light,
 * and men's hairstyles.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Wording is original. Tool names are limited to software the site already names.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_25_GUIDE_CONTENT: Record<string, GuideArticle> = {
  'male-body-type-prompt-guide': {
    sections: [
      {
        title: '男性の体型は、着た服の輪郭で書く',
        content: `「男性 体型 プロンプト」「体型 プロンプト 男性」「体格 プロンプト 男性」「プロンプト 体型 男」で探しているのは、成人の男性の細さ、普通、がっしり、大柄を英語で分ける書き方です。検索では、太った男性、細身の男性、体格がいい、大きい男、痩せた男、が同じ語の近くに並びます。欲しいのは体の輪郭です。肌の露出ではありません。

このページは、服を着た成人男性の体型だけを担当します。体型の入口は [体型プロンプト](/guides/body-type-prompt-guide) のままです。役割は一行で分けます。入口のページは女性も含む全体、このページは男性の階段です。一人の男性を髪と服から組み立てる入口は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。作例の並びは [体型プロンプト集](/prompts/body-type) です。

人がいる枚は大人だけです。\`1 adult man, adult\` から書き、\`adult\` を残します。服はスーツ、シャツ、長いズボン、カーディガン、コート、鎧のように、閉じて丈のあるものです。肩幅や胸の厚みは、服の張りとシルエットで書きます。肌を出す書き方、体の部位を強調する書き方は使いません。実在の人物、作者名、作品名、ブランド名は書きません。年齢を下げる書き方は使いません。体型をからかう言い方もしません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。短い語は、タグを空白で区切るモデルで使われることがあります。どちらが公式かは断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(stocky build:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(stocky build:1.2\\)\` と書きます。NovelAI の強調は \`{stocky build}\` と \`[stocky build]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

体型は一つです。細身と筋肉質を同じ強さで並べると、どちらでもない平均の体になります。今日足す階段は一つにして、髪と背景は固定してください。

検索の「体格がいい」「大きい男」は、背の高さと、肩の幅が混ざっています。背を変えたい日は次の節の高さの語、幅を変えたい日はこのページの段、と先に分けます。分けずに \`tall\` と stocky と \`muscular\` を同じ行へ置くと、三つの平均になって、どの語も残りません。大きい、という言葉を英語の large 一語にすると、顔まで大きくなることがあります。体の幅なら large build、背なら \`tall\`、と名詞まで書いてください。

細い側の「痩せた男」も、一段にします。slim で足りる枚に skinny を足すと、肩が落ちて服の形が消えやすいです。足りないときは重みを 1.2 まで一つ上げ、語を増やしません。ふくよかの段は、服のゆとりで見ます。丸みをからかう語や、体の部位の名前は正向に置きません。置きたくなったら、このページの loose shirt に戻してください。

比較用の基準は、黒の短髪、白いシャツ、長いズボン、無地の背景、の一枚です。この一枚を保存してから、体型の行だけを差し替えます。髪を金色にしたり、背景を街にしたりした枚は、体型の成功例に数えません。成功した段の名前をファイル名に残すと、翌日に同じ肩幅へ戻れます。戻るときは、足した段の隣の語が残っていないかを先に音読します。残っていれば消してから、もう一枚だけ出します。`,
      },
      {
        title: '体型の階段',
        content: `階段は、細い方から厚い方へ一段ずつです。隣の段を同じ強さで残すと、中間で止まります。身長の \`tall\` はこの表に混ぜません。背の高さは次の節です。

| 日本語 | 短い語 | 自然な英語 | 読み方 |
|---|---|---|---|
| 細身 | \`slim\` | slim build | 短い語。全身の幅を細くする |
| ほっそり | slender | slender build | 自然な英語。縦の細さ |
| 引き締まった細身 | lean | lean build | 自然な英語。厚い塊には見えない |
| 普通 | average build | average build | 自然な英語。強調しない出発点 |
| 運動している体 | athletic build | athletic build | 自然な英語。日常の服で厚みが少し |
| 筋肉質 | \`muscular\` | muscular build | 短い語として使われることがある |
| がっしり | stocky | stocky build | 自然な英語。幅と厚み。背の高さとは別 |
| 骨太 | burly | burly build | 自然な英語。骨格の厚み |
| 大柄 | large build | large build | 自然な英語。\`tall\` とは別 |
| ふくよか | heavyset | heavyset build | 自然な英語。丸みの詳細は別ページ |
| 丸み | \`plump\` | plump build | 短い語。詳細はぽっちゃりのページ |

\`skinny\` は細い側に強く寄ることがあります。細身の日は \`slim\` か slender を一つにして、\`skinny\` は残しません。筋肉の段階を盛る書き方は [筋肉質プロンプト](/guides/muscular-prompt-guide) です。このページでは \`muscular\` を一段として置くところまでです。

**細身。シャツと長いズボン**

\`\`\`
1 adult man, adult, slim build, short black hair, adult face,
buttoned shirt, trousers, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
muscular, stocky, heavyset, feminine, woman
\`\`\`

**がっしり。コートの肩が張る**

\`\`\`
1 adult man, adult, stocky build, broad shoulders, short black hair, adult face,
wool coat, trousers, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, slender, skinny, feminine, woman
\`\`\`

比較は、服の種類と色と背景を固定して、体型の行だけを差し替えます。コートが黒い枚と、シャツが白い枚を見比べても、体の差なのか服の差なのかが残りません。`,
      },
      {
        title: '身長は体型と別の軸',
        content: `背の高さは、幅とは別です。\`tall\` は高く、average height は普通、\`short\` は低く、いずれも自然な英語か短い語です。公式タグとしては断定しません。センチの数字は、モデルが測る値にはなりません。数字を大きくしても、画面の中の背は平均に戻ることがあります。

一人を高く見せる調整は [高身長プロンプト](/guides/tall-height-prompt-guide)、成人の小柄は [低身長・小柄プロンプト](/guides/short-height-petite-prompt) です。このページでは、体型の段が決まってから、高さの語を一つ足します。\`tall\` と \`short\` を同じ強さにすると、中間の背になります。

| 高さ | 書き方 | 一緒に残すもの |
|---|---|---|
| 高い | \`tall\` | \`full body\`。詳細は高身長のページ |
| 普通 | average height | 自然な英語。\`tall\` は消す |
| 低い | \`short\` | \`adult\` を残す。詳細は低身長のページ |

**大柄で、背も高い。全身**

\`\`\`
1 adult man, adult, large build, tall, short black hair, adult face,
buttoned shirt, trousers, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, short, petite, feminine, woman
\`\`\`

**細身で、背は普通。全身**

\`\`\`
1 adult man, adult, slender build, average height, short black hair, adult face,
cardigan, trousers, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
tall, muscular, heavyset, feminine, woman
\`\`\`

高さだけを変える日は、体型の語をコピー元から消さないでください。消すと、背が伸びたのか、体が細くなったのかが分かりません。`,
      },
      {
        title: '肩幅と腕は、服のフィットで書く',
        content: `肩の広さは broad shoulders、狭い肩は narrow shoulders、と自然な英語です。公式タグとしては断定しません。胸の厚みは、fitted shirt のように服が体に沿うこと、または loose shirt のようにゆとりがあること、で書きます。腕は rolled-up sleeves と自然な英語で、袖をまくった状態を一つ足します。肌の形そのものは書きません。

| 見たいもの | 書き方 | 消すもの |
|---|---|---|
| 肩が広い | broad shoulders | 自然な英語。胸の部位語は書かない |
| 肩が狭い | narrow shoulders | 自然な英語。broad shoulders |
| 服が沿う | fitted shirt | 自然な英語。ゆとりの語 |
| 服にゆとり | loose shirt | 自然な英語。fitted |
| 袖をまくる | rolled-up sleeves | 自然な英語。一つだけ |

**肩が広く、シャツが沿う。腰から上**

\`\`\`
1 adult man, adult, athletic build, broad shoulders, fitted shirt, rolled-up sleeves,
short black hair, adult face, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
narrow shoulders, loose shirt, feminine, woman
\`\`\`

肩の語と体型の語を両方 1.3 以上にすると、胴が細いまま肩だけが板のように広がることがあります。上げるのは一方だけです。腕の太さを語で盛るより、袖のまくりを一つ残した全身で見てください。`,
      },
      {
        title: '年齢感は、成人の世代を一つ',
        content: `世代は一つです。young adult man、middle-aged man、elderly man は自然な英語です。公式タグとしては断定しません。\`adult\` は消しません。年齢を下げる語は正向に置きません。

若い成人と中年を同じ強さにすると、顔の年齢が平均で止まります。老年の日は、髪の色を gray hair か white hair の一方にして、黒髪の語は消します。髪の色の全体は [髪色プロンプト](/guides/hair-color-prompt-guide) です。

| 世代 | 書き方 | 髪 |
|---|---|---|
| 若い成人 | young adult man | 自然な英語。\`adult\` は残す |
| 中年 | middle-aged man | 自然な英語。顔のしわは一つまで |
| 老年 | elderly man | 自然な英語。gray hair か white hair |

**中年。普通の体。スーツ**

\`\`\`
1 adult man, adult, middle-aged man, average build, short black hair, adult face,
suit, necktie, standing, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
elderly, feminine, woman
\`\`\`

顔のしわを強くすると、体型より顔が主題になります。体型の確認中は、しわの語を足しません。`,
      },
      {
        title: '体型と服装',
        content: `服は場面を一つです。スーツ、普段着、コート、鎧を同じ強さにすると、襟と板金が溶きます。普段着の部品は [私服・カジュアルのプロンプト](/guides/casual-outfit-prompt-guide)、鎧は [鎧・騎士のプロンプト](/guides/armor-knight-prompt-guide)、コートの丈は [コートのプロンプト](/guides/coat-prompt-guide) です。このページでは、体型が見える服を一つ選ぶところまでです。

| 場面 | 服 | 体型の出方 |
|---|---|---|
| 仕事 | \`suit\`, \`necktie\` | 肩の線がジャケットに出る |
| 休日 | cardigan, trousers | 自然な英語。ゆとりが見える |
| 外 | \`coat\` | 肩幅がコートに負けることがある |
| 鎧 | \`armor\` | 板の厚みと体型を混同しない |

**細身のスーツ。全身**

\`\`\`
1 adult man, adult, lean build, short black hair, adult face,
suit, necktie, trousers, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
muscular, heavyset, feminine, woman
\`\`\`

**がっしりした鎧。全身**

\`\`\`
1 adult man, adult, burly build, broad shoulders, short black hair, adult face,
armor, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, slender, feminine, woman
\`\`\`

コートが体型を隠すときは、体型の語を人数の直後へ移し、コートの語は一つに減らします。鎧の日は、板の部品を二つまでにして、体型の段は一つ残します。`,
      },
      {
        title: '体型と、ポーズとアングル',
        content: `体型の確認は全身が先です。顔の確認は腰から上に切り替えます。下から見るのは from below、腰から上のやや引きは cowboy shot、と自然な英語です。公式タグとしては断定しません。\`full body\` は短い語として使われることがあります。

下からのアングルは、脚が長く見えて、体型の幅が分かりにくくなります。幅を比べる日は正面の全身に戻してください。アングルの一覧は [構図・アングルのプロンプト一覧](/guides/composition-angle-prompt-guide) です。

| 構図 | 書き方 | 向く確認 |
|---|---|---|
| 全身 | \`full body\` | 幅と高さ |
| 腰から上の引き | cowboy shot | 自然な英語。肩と胴 |
| 下から | from below | 自然な英語。高さの印象。幅の比較には不向き |

**がっしり。下から。全身**

\`\`\`
1 adult man, adult, stocky build, broad shoulders, short black hair, adult face,
coat, trousers, standing, full body, from below, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, slender, feminine, woman
\`\`\`

**普通の体。cowboy shot**

\`\`\`
1 adult man, adult, average build, short black hair, adult face,
buttoned shirt, trousers, standing, cowboy shot, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
muscular, heavyset, feminine, woman
\`\`\`

ポーズは standing を一つ残します。腕を組む、手を腰に当てる、を同じ日に足すと、指が増えます。手の直しは [手・指のプロンプト](/guides/hand-finger-prompt-guide) です。`,
      },
      {
        title: '段を一つ残して、隣を消す',
        content: `段を決めたあとにやることは、隣の段を消すことです。細身のファイルに stocky が残っていると、翌日のコピーで肩が戻ります。消す語は、その段の反対側だけにします。細身の負向に置くのは muscular、stocky、heavyset です。がっしりの負向に置くのは slim、slender、skinny です。全部の体型語を負向に入れると、残したい段まで消えます。

ファイルは段の名前で分けます。細身、普通、がっしり、大柄、ふくよか、を一つのプロンプトに上書きしないでください。上書きすると、負向の slim が、細身の枚へ逆流します。逆流した枚は、正向と負向に同じ意味がある、という矛盾です。矛盾は、音読して一方を消してから再生成します。再生成の前に、服と背景が基準のシャツと無地のままかも見ます。街や鎧のまま直すと、消した語の効果が分かりません。

重みを上げるのは、語の位置を直したあとです。人数の直後にすでに段があるのに 1.4 まで上げると、関節が伸びます。1.1 で変化が無ければ 1.2、それでも無ければ位置を疑います。位置が正しいのに変化が無いモデルでは、自然な英語の build まで書いた句に言い換えます。短い語と句を両方残すと、同じ指示が二回入って、その段が強く出すぎます。今日残す書き方は、短い語か、自然な英語の句か、どちらか一つです。

二人の絵に進む日は、一人の段が三枚そろったファイルをコピーして、人数だけを \`2 adults\` に変えます。二人に別の段を一度に割り当てると、どちらが効いたのかが残りません。高い側を stocky、低い側を slim、と分けるのは、それぞれの一人絵が安定してからです。その手順は体格差のページに渡します。このページの仕事は、一人の段を、服の輪郭で固定するところまでです。

中年や老年の顔を足したあとも、段の行は動かしません。顔のしわが肩の線より目立つ枚は、体型の確認には使いません。確認用は、しわの語が無い複製に戻します。複製を作らずに元のファイルへしわを書き込むと、体型の基準が顔の実験で汚れます。汚れた基準からは、次の段へ進めません。`,
      },
      {
        title: '細マッチョ、ふくよか、二人の差',
        content: `細くて引き締まった体の詳細は [筋肉質プロンプト](/guides/muscular-prompt-guide) の細マッチョです。このページでは、lean build を一段置いて、強い筋肉の語は渡しません。丸みの段階は [ぽっちゃりプロンプト](/guides/plump-body-prompt-guide) です。ここでは heavyset を、服のゆとりで書くところまでです。

二人の縦の差は [身長差プロンプト](/guides/height-difference-pair-prompt)、肩幅や筋肉量の差は [体格差プロンプト](/guides/body-size-difference-prompt-guide) です。数字とポーズから文を組むときは [身長差メーカー](/tools/height-difference-maker)、並びをシルエットで見るときは [身長差シミュレーター](/tools/height-difference-maker/simulate) です。一人の文に二人の差の語を足しても、人数は増えません。

**ふくよか。ゆとりのあるシャツ。全身**

\`\`\`
1 adult man, adult, heavyset build, short black hair, adult face,
loose shirt, trousers, standing, full body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
slim, skinny, muscular, feminine, woman
\`\`\`

**文章で頼む。細身の成人男性**

\`\`\`
Draw 1 adult man, clearly an adult, with a slim build.
He wears a buttoned shirt and long trousers, standing, full body, looking at the camera.
Plain background, soft daylight.
Do not add another person. Keep him fully clothed.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, muscular, feminine, woman
\`\`\`

ChatGPT や Gemini では、上の自然文を使います。Stable Diffusion や NovelAI では、前の節のタグに戻してください。タグと自然文を同じ強さでつなぐと、体型の指示が二回入って平均になります。

**うまく出ないとき**

体型が服に負けるときは、体型の語を \`adult\` の直後へ移し、服の部品を一つ減らします。女性的な顔になるときは、\`male focus\` を人数の近くへ足し、負向の feminine と woman を残します。筋肉が盛りすぎるときは、\`muscular\` を外して athletic build か lean build に戻します。全員が細身に戻るときは、普通や厚い段の語が文の後ろに落ちていないかを見て、人数の直後へ戻します。四つを同じ日に直さないでください。直す症状は一つです。

直したあとの確認は、全身の正面で行います。下からの一枚だけで「肩が広くなった」と判断すると、パースの広がりを体型と勘違いします。正面の全身で肩の線が見えてから、下からの枚は別名で保存します。保存するプロンプトには、変えた語の名前をコメントではなく、ファイル名に残してください。モデルは、文の中のメモも指示として読むことがあります。

服の色を変えるのは、体型が三枚そろってからです。黒いコートでがっしりに見えた枚を、白いシャツに変えたときに細く戻るなら、体型の語がコートの後ろに落ちています。語を人数の直後へ戻し、コートは一語だけ残します。鎧の日も同じです。板の部品を増やした日は、体型の判断をしないでください。板の厚みと、体の厚みは別です。板を一つに戻してから、burly か stocky かを見ます。

年齢の語を足した日も、体型の行は動かしません。中年の顔にしたら肩が落ちた、という枚は、世代の語を一旦外して体型だけに戻します。戻った肩が元の幅なら、世代の語が体型より前に強すぎた、ということです。世代は体型のうしろへ移し、重みは付けません。`,
      },
    ],
    faq: [
      {
        q: '男性の体型は、どの英語を先に書けばよいですか',
        a: '人数の直後に、slim、lean、average build、athletic build、muscular、stocky、burly、large build、heavyset のどれか一つです。隣の段を同じ強さで残すと、中間の体になります。',
      },
      {
        q: '細身と痩せすぎは同じですか',
        a: 'このページでは同じにしません。細身は slim か slender です。skinny は細い側に強く寄ることがあるので、作例には残していません。',
      },
      {
        q: 'がっしりと高身長は同時に書けますか',
        a: '書けます。体型を一つ、高さを一つ、です。stocky と tall は別の軸です。両方を 1.3 以上にすると、肩だけが広がることがあります。上げるのは一方だけにしてください。',
      },
      {
        q: '服を着たままで体型は出ますか',
        a: '出します。fitted shirt や loose shirt、broad shoulders のように、服の沿い方と肩の幅で書きます。肌を出す書き方は使いません。',
      },
      {
        q: '女性っぽい顔になります',
        a: 'male focus を人数の近くへ足し、負向に feminine と woman を残します。髪を長くする語が残っているときは、先に髪を短く戻してください。髪型の詳細は男性の髪型のページです。',
      },
      {
        q: '二人の体格差はこのページですか',
        a: '一人の体型がこのページです。二人の差は体格差プロンプトと身長差メーカー、並びの確認は身長差シミュレーターです。',
      },
    ],
  },

  'backlight-prompt-guide': {
    sections: [
      {
        title: '逆光と順光は、光の向きが違う',
        content: `「逆光 プロンプト」「逆光 英語 プロンプト」「順光 プロンプト」「逆光 補正 プロンプト」「プロンプト 逆光 シルエット」「後光 プロンプト」で探しているのは、光が前から来るか、後ろから来るか、です。検索では、英語、ネガティブ、補正、防ぐ、シルエット、が同じ語の近くに並びます。欲しいのは向きです。肌の透けではありません。

このページは、逆光と順光と、そのあいだの斜めを担当します。光の入口は [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) のままです。役割は一行で分けます。入口のページは質や時間も含む一覧、このページは向きと、顔が暗いときの補正です。暗い室内の光源は [暗い部屋のプロンプト](/guides/dark-room-prompt-guide)、夕日を景色の主題にするときは [風景のプロンプト](/guides/landscape-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はコート、ブラウス、シャツ、長いスカート、長いズボンのように、閉じて丈のあるものです。布を透かす書き方は使いません。人がいない枚は、景色か窓か街だけにして、人数の行は置きません。実在の人物、作者名、作品名は書きません。

2026年11月時点の書き方です。モデルによって、同じ語でも顔の明るさが違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(backlighting:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(backlighting:1.2\\)\` と書きます。NovelAI の強調は別の括弧です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

向きは一つです。順光と逆光を同じ強さにすると、影の位置が平均になって、どちらにも見えません。`,
      },
      {
        title: '向きの早見',
        content: `短い語と、文で説明する語を混ぜると、どちらが向きなのかが残りません。今日足す向きは一つです。

| 日本語 | 短い語 | 自然な英語 | 見え方 |
|---|---|---|---|
| 逆光 | \`backlighting\` | backlit, light from behind | 輪郭が明るく、顔は暗くなりやすい |
| 順光 | front lighting | light from the front | 自然な英語。顔の影が少ない |
| 半逆光 | three-quarter backlight | light from behind and to the side | 自然な英語。片側の輪郭 |
| サイド光 | side lighting | light from the side | 自然な英語。顔の半分に影 |
| 輪郭の縁 | \`rim lighting\` | rim light | 縁だけ。顔の明るさは別 |

\`backlighting\` は短い語として使われることがあります。front lighting は自然な英語です。公式タグとしては断定しません。\`rim lighting\` を逆光と同じ強さにすると、縁は出ても、後ろからの光の広がりが平均になります。縁だけが欲しい日は \`backlighting\` を弱めるか、消します。

**順光。顔が見える肖像**

\`\`\`
1 adult woman, adult, front lighting, soft daylight, black hair, adult face,
white blouse, long skirt, upper body, looking at viewer,
simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
backlighting, silhouette, dark face
\`\`\`

**逆光。コートの輪郭**

\`\`\`
1 adult man, adult, backlighting, rim lighting, short black hair, adult face,
long coat, trousers, standing, upper body, looking at viewer,
bright background, soft haze
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
front lighting, flat lighting
\`\`\`

比較は、場所を固定して、向きの行だけを差し替えます。夕焼けの逆光と、室内の順光を見比べても、向きの差なのか場所の差なのかが分かりません。`,
      },
      {
        title: 'シルエットにする',
        content: `シルエットは、中の模様を消して、輪郭だけを残す書き方です。\`silhouette\` は短い語として使われることがあります。against the light は自然な英語です。公式タグとしては断定しません。逆光の語が無いシルエットは、ただ黒い絵になることがあります。\`backlighting\` か sunset を一つ残してください。

人がいるシルエットでも、\`adult\` は残します。服の色は、シルエットではほぼ見えません。色を確認したい日は、シルエットの語を外して、次の節の補正に移ります。布を透かして中の形を見せる書き方は使いません。

| したいこと | 書き方 | 消すもの |
|---|---|---|
| 人の輪郭だけ | \`silhouette\`, \`backlighting\` | 顔の模様、服の柄 |
| 光に向かって立つ | against the light | 自然な英語。順光 |
| 夕日の前 | \`sunset\`, \`silhouette\` | 昼の \`sunlight\` |

**夕日の前。二人の輪郭。服は着たまま**

\`\`\`
2 adults, 1 adult woman, 1 adult man, adult,
silhouette, backlighting, against the light, sunset,
long coat, standing, full body, side by side,
simple sky
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
front lighting, detailed face, text
\`\`\`

**人のいない海岸。夕日**

\`\`\`
sunset beach, backlighting, bright sun near the horizon,
calm sea, empty sand, no people,
wide shot, simple sky
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text, watermark
\`\`\`

海岸は、水平線と夕日と空だけにします。人が端に出るときは、正向から人数を消し、負向の people を残します。

シルエットの確認は、輪郭が一つに読めるかどうかです。コートの裾と、脚と、頭が分かれていれば、中のボタンが見えなくても成功です。中のボタンや、服の柄まで見える枚は、まだシルエットではありません。\`silhouette\` を人数の直後へ移し、服の色の形容を一つ消します。逆に、頭と胴の境目まで消えて一本の柱になる枚は、逆光が強すぎます。\`backlighting\` の重みを上げず、sunset を残したまま \`silhouette\` を弱めるか、人の立ち位置を「光の前に立つ」から「光を斜めうしろにする」へ一文だけ変えます。斜めは、次の表の半逆光です。真後ろと斜めを同じ日に両方強くしないでください。

二人のシルエットは、頭の高さが分かれることを先に見ます。肩が溶けて一人に見えるときは、side by side を残し、抱き合う語は入れません。抱擁のシルエットは [ハグのプロンプト](/guides/hug-prompt-guide) で距離を決めてから、このページの光だけを借ります。光の語を三つ持っていくと、距離の実験が濁ります。持つのは \`backlighting\` か \`sunset\` の一方です。`,
      },
      {
        title: '顔が暗いときの補正',
        content: `逆光のまま顔を見せたいときは、向きを消さずに、前からの弱い光を足します。fill light、well-lit face、soft front fill light は自然な英語です。公式タグとしては断定しません。正面の光を逆光と同じ強さにすると、逆光が消えて順光になります。

重みを使うなら、補助光は 1.1 から 1.3 を目安に一つだけ上げます。これは目安で、モデルの配布ページに推奨があればそちらを優先します。1.3 より大きくすると、顔だけが昼の肖像になって、輪郭の縁が消えることがあります。

| 症状 | 足す語 | 残す語 |
|---|---|---|
| 顔が黒い | soft front fill light | \`backlighting\`, \`rim lighting\` |
| 目だけ見えない | well-lit face | 自然な英語。逆光は残す |
| 全体が暗い | fill light | 自然な英語。一つ |

**逆光のまま、顔に弱い補助光**

\`\`\`
1 adult woman, adult, backlighting, rim lighting, soft front fill light,
black hair, adult face, white blouse, long skirt,
upper body, looking at viewer, bright window behind
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
silhouette, dark face, flat lighting
\`\`\`

**補助光を少しだけ強くする目安**

\`\`\`
1 adult man, adult, backlighting, rim lighting, (soft front fill light:1.2),
short black hair, adult face, coat, trousers,
upper body, looking at viewer, sunset
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
silhouette, dark face
\`\`\`

顔が見えた時点で、補助光を足すのを止めます。明るくし続けると、逆光ではなく順光になります。`,
      },
      {
        title: '逆光を防ぐ',
        content: `逆光にしたくないときは、正向に front lighting を置き、負向に \`backlighting\` を入れます。正向に逆光が残ったまま負向で消そうとすると、両方の平均になります。先に正向から \`backlighting\` と \`rim lighting\` と silhouette を消してください。

窓のうしろに人が立っている文は、逆光になりやすいです。順光にしたい日は、窓を顔の前に置くか、窓の語を消して、正面の光だけにします。

**順光にして、逆光を負向へ**

\`\`\`
1 adult woman, adult, front lighting, soft daylight, black hair, adult face,
white blouse, long skirt, upper body, looking at viewer,
simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
backlighting, rim lighting, silhouette, dark face
\`\`\`

**窓は横。正面の光**

\`\`\`
1 adult man, adult, front lighting, side lighting, short black hair, adult face,
buttoned shirt, trousers, upper body, looking at viewer,
plain room, window to the side
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
backlighting, silhouette
\`\`\`

横の光と正面の光を同じ強さにすると、また平均になります。順光が主題の日は、side lighting を弱いか、無しにしてください。`,
      },
      {
        title: '光の筋と、明るさの輪',
        content: `レンズの光点は lens flare、筋は light rays、頭のうしろの明るさの輪は halo of light と自然な英語です。公式タグとしては断定しません。後光という言葉で探している明るさは、この輪です。宗教の図像や、特定の作品の輪には書きません。輪の中に模様や文字は書かせません。

三つを同じ強さにすると、画面が白い斑点で埋まります。今日足す効果は一つです。効果の入口は [エフェクトのプロンプト](/guides/effect-prompt-guide) です。

| 効果 | 書き方 | 注意 |
|---|---|---|
| 光点 | lens flare | 自然な英語。顔に乗せすぎない |
| 筋 | light rays | 自然な英語。森や窓と一緒に一つ |
| 明るさの輪 | halo of light | 自然な英語。宗教の図像にはしない |

**夕日と、髪の縁の光**

\`\`\`
1 adult woman, adult, backlighting, rim lighting, light rays, sunset,
black hair, adult face, long coat, standing, upper body,
looking at viewer, simple sky
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, logo, dark face
\`\`\`

**頭のうしろに、模様のない輪**

\`\`\`
1 adult man, adult, backlighting, halo of light, short black hair, adult face,
coat, upper body, looking at viewer,
dark simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
text, letters, logo, religious symbols
\`\`\`

輪が文字や紋様になるときは、halo of light を外して \`rim lighting\` に戻します。紋様を正向に書かないでください。`,
      },
      {
        title: '時間と場所の型',
        content: `場所は一つ、時間は一つです。海岸の夕日、窓、夜の街、森の光、を同じ強さにすると、地平線が三本になります。森の種類は [森のプロンプト](/guides/forest-prompt-guide)、通りは [街のプロンプト](/guides/city-town-prompt-guide) です。

| 場所 | 向き | 残すもの |
|---|---|---|
| 海岸の夕日 | \`backlighting\`, \`sunset\` | 人はシルエットか、人数を消す |
| 窓 | \`backlighting\` か front lighting | どちらか一つ。窓の位置を書く |
| 夜の街 | street lights | 自然な英語。逆光と看板を同時に強くしない |
| 森 | light rays | 自然な英語。木は一本の役割に留める |

**夜の街。街灯がうしろ**

\`\`\`
1 adult man, adult, backlighting, rim lighting, street lights,
short black hair, adult face, long coat, trousers,
standing, full body, city street at night
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
daylight, text, signage letters
\`\`\`

**森。筋の光。人はいない**

\`\`\`
forest, light rays, backlighting, morning mist,
tall trees, no people, wide shot
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
people, person, text
\`\`\`

**文章で頼む。窓の逆光と、顔の補助光**

\`\`\`
Draw 1 adult woman, clearly an adult, standing by a bright window.
The light comes from behind her, with a soft fill on her face so her features stay visible.
She wears a white blouse and a long skirt. Upper body, looking at the camera.
Do not make the fabric transparent. Do not add text.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, silhouette, dark face
\`\`\`

ChatGPT や Gemini では、この自然文です。Stable Diffusion では \`backlighting\` と soft front fill light のタグに戻します。Midjourney では重みの括弧を外し、避けたいものは文末の \`--no\` に短くします。\`--no\` の読み方は [ネガティブプロンプト](/guides/negative-prompt-guide) です。

モデルによって、逆光は顔を真っ黒にし、別のモデルではほぼ順光のままです。顔が黒いモデルでは補正の節を、逆光が消えるモデルでは \`backlighting\` を人数の直後へ移して、正面の語を消します。同じ日に場所も変えないでください。`,
      },
      {
        title: '向きを固定してから場所を足す',
        content: `向きが三枚そろってから、場所を一つ足します。そろっていない枚に夕日や夜の街を足すと、明るさの原因が場所なのか向きなのか残りません。そろった、の判断は、顔の明るさと、輪郭の縁が、同じ場所の無地で再現できることです。再現できないときは、場所を足すのを止めます。

足す場所は、表の一行です。海岸の夕日を選んだ日は、窓の語を消し、夜の街を選んだ日は sunset を消します。消し忘れは、空の色がオレンジと青の平均になる形で出ます。平均の空を見てから語を足しても直りません。先に正向を読んで、時間の語を一つに戻します。

人がいる枚と、人がいない枚はフォルダを分けます。人の \`adult\` が残った森は、木のあいだに顔が出ます。顔を消すために負向を長くする前に、正向の人数が無いかを見ます。人数が無いのに顔が出るときは、people を負向に足して、木の名詞は一つに減らします。木を三種類書くと、光の筋より葉が勝って、向きの実験が止まります。

補正の補助光は、シルエットのフォルダへコピーしません。コピーすると、輪郭だけの枚に顔の模様が戻ります。シルエットで顔を見せたくなったら、その枚はシルエットをやめて、補正の節のプロンプトを新規に作ります。新規には \`backlighting\` と \`rim lighting\` と soft front fill light を置き、\`silhouette\` は入れません。二つの目的を一つの文のメモに併記しないでください。モデルはメモと本文を区別しないことがあります。

保存する名前は、向き、場所、人の有無、が分かるものにします。逆光・無地・成人、順光・窓・成人、夕日・人なし、のように分けておくと、次にこのページへ戻ったとき、どの節から再開するかが残ります。再開するときは、昨日の負向に入れた語が、今日の目的と逆でないかを先に見ます。逆光を作りたい日に、負向の \`backlighting\` が残っていたら、それが順光の実験の残りです。消してから生成します。

半逆光は、真後ろが強すぎるときの一段です。three-quarter backlight を自然な英語で一つ足し、\`backlighting\` は残すか、弱めるか、どちらかにします。両方を 1.3 にすると、また真後ろに戻ることがあります。片側の頬だけが明るい、で止めてください。両頬が同じ明るさなら、それは順光です。順光の語が残っていないかを見て、残っていれば消します。

サイド光は、このページでは向きの比較にだけ使います。顔の半分が影なら成功です。影の境界をさらに硬くしたい日は、照明の入口のページで光の質を一つ借ります。質の語をこのページで増やし始めると、向きの実験が止まります。借りの語は side lighting と一緒に一つまでです。

後光の輪を足す日も、場所は無地のままにします。夜の街に輪を足すと、街灯と輪が同じ白い円になって、どちらを足したのかが分かりません。輪が円として読めてから、背景を一段だけ暗くします。暗くしすぎて輪が消えたら、暗さを戻して、輪の語は残します。輪の中に模様が出た枚は捨て、\`rim lighting\` のプロンプトから作り直します。`,
      },
      {
        title: 'うまく出ないとき',
        content: `顔が黒いのにシルエットにしたくないときは、\`silhouette\` を消して、soft front fill light を 1.1 から足します。逆光が順光になるときは、front lighting が正向に残っていないかを見て、残っていれば消します。輪郭の縁だけが白く飛んで色が消えるときは、\`rim lighting\` の重みを上げず、光の筋を一つ外します。

看板の文字が出る夜景は、文字の語を正向から消し、負向に text を足します。文字のテンプレは [ネガティブプロンプト](/guides/negative-prompt-guide) です。人がいないはずの森に顔が出るときは、正向の人数を消し、負向の people を残します。

四つを同じ日に直さないでください。向き、補正、効果、場所、のどれか一つです。

直した枚は、向きの名前でフォルダを分けます。順光、逆光、半逆光、シルエット、を一つのファイルに上書きすると、負向に入れた \`backlighting\` が、逆光の枚へ逆流します。逆流した枚は、正向にも負向にも同じ語がある、という矛盾になります。矛盾を見つけたら、正向を先に読んで、残す向きを一つに戻します。戻してから、場所の名詞を一つだけ足します。場所を先に足すと、窓や街灯が向きより勝って、顔の明るさの原因が残りません。

窓の枠が顔より明るい枚は、枠を足すのを止め、人を窓から半歩離した文に変えます。枠の明るさを上げ続けると、顔はシルエットのままです。顔が見えた明るさで止めて、その文を消さないでください。次に服の色だけを変えるとき、光の行まで消すと、顔が再び暗くなります。光の行は固定、服の行だけを差し替える、を補正が終わったあとのルールにします。

夜の街で看板が主題になるときは、看板の名詞を消し、street lights を一つ残します。文字が要る案内図は、このページの仕事ではありません。光の向きが決まってから、文字のない背景として保存します。森の筋が顔を横切るときは、light rays を木のうしろに限定する文を一つ足し、人の顔の上には置きません。顔の上の筋は、補助光と喧嘩して、目が白く飛びます。`,
      },
    ],
    faq: [
      {
        q: '逆光の英語は何ですか',
        a: '短い語では backlighting が最初の一手です。backlit や light from behind は自然な英語です。公式タグとしては断定しません。順光は front lighting と自然な英語で、同じ強さにしないでください。',
      },
      {
        q: '逆光で顔が暗くなります',
        a: 'backlighting と rim lighting を残したまま、soft front fill light を自然な英語で弱く足します。重みは 1.1 から 1.3 が目安です。正面の光を同じ強さにすると、逆光が消えます。',
      },
      {
        q: '逆光を防ぐにはどう書きますか',
        a: '正向に front lighting を置き、負向に backlighting を入れます。正向に逆光の語が残っていると、負向だけでは平均になります。',
      },
      {
        q: 'シルエットとリムライトは同じですか',
        a: '同じにしません。silhouette は中の模様を消す輪郭です。rim lighting は縁の光で、顔の情報は別に残せます。両方を同じ強さにすると、中途半端な暗さになります。',
      },
      {
        q: '後光はどう書きますか',
        a: 'halo of light と自然な英語で、模様のない明るさの輪にします。宗教の図像や、輪の中の文字は書きません。輪が紋様になるときは rim lighting に戻してください。',
      },
      {
        q: '順光の英語は front light ですか',
        a: 'このページでは front lighting と、light from the front を自然な英語として使います。短い別名が効くモデルもあります。効きはモデル次第なので、一枚だけ比べて、残す語は一つにしてください。',
      },
    ],
  },

  'male-hairstyle-prompt-guide': {
    sections: [
      {
        title: '男性の髪型は、長さを先に一つ',
        content: `「男性 髪型 プロンプト」「髪型 プロンプト 男」「男 キャラ 髪型 一覧 プロンプト」「髪型 プロンプト 男 前髪」で探しているのは、成人男性の短い髪、前髪、ウルフ、分け目です。検索では、短髪、マッシュ、センター分け、ツーブロック、オールバック、前髪の形、が同じ語の近くに並びます。欲しいのは髪型です。年齢を下げる書き方ではありません。

このページは、成人男性の髪だけを担当します。髪型の入口は [髪型プロンプト](/guides/hairstyle-prompt-guide) のままです。役割は一行で分けます。入口のページは長さも結びも色も見渡す表、このページは男性の一覧です。一人の男性を服と一緒に組み立てる入口は [男性キャラのプロンプト一覧](/guides/male-character-prompt-guide) です。短い髪の全体は [ショートヘアのプロンプト](/guides/short-hair-prompt-guide)、前髪の形の全体は [前髪プロンプト](/guides/bangs-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult man, adult\` から書き、\`adult\` と \`adult face\` を残します。服はシャツ、スーツ、コート、カーディガン、長いズボンのように、閉じて丈のあるものです。実在の人物、作者名、作品名、店の名前は書きません。年齢を下げる書き方は使いません。

2026年11月時点の書き方です。モデルによって、男性と書いた髪が長く戻ることがあります。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨があれば、それを優先してください。カスタムノード・拡張機能・モデルは信頼できる配布元のものだけを入れる。モデルは .safetensors 形式を選ぶ、と決めてからファイルを足してください。

重みは目安です。\`(short hair:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(short hair:1.2\\)\` と書きます。NovelAI の強調は別の括弧です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。

長さ、スタイル、前髪、質感、色、は同じ日に全部動かしません。今日足すのは一つです。

検索で並ぶ名前は、長さの話と、分け目の話と、毛先の向きの話が混ざっています。短髪は長さ、センター分けと七三は分け目、オールバックは流れ、マッシュ風は毛先が内へ丸いこと、ウルフは段の差、ツーブロックは横の短さ、です。一つのプロンプトに名前を三つ書くと、分け目の位置が平均になって、どれも中途半端になります。今日の名前は一つ、と決めてから表を開いてください。

比較用の基準は、黒、無地のシャツ、灰色か白の背景、正面の上半身、です。この一枚が三枚同じに見えてから、スタイルを一つ差し替えます。背景を街にした枚で前髪を判断すると、看板の線と髪の線が混ざります。判断が終わった枚だけを、コートや夜の背景へ移します。移すときは髪の行をコピーして、服の行だけを変えます。髪の行を書き直しながら服も変えると、伸びた原因が残りません。

男性と書いたのに髪が肩まで伸びるモデルでは、語を増やす前に \`short hair\` を人数の直後へ移します。移しても伸びるときは、負向の long hair を残したまま、重みは 1.2 まで一つです。1.3 より上で顔まで縦に伸びるなら、重みは戻して、長さの語が文の後ろに落ちていないかを見ます。落ちていれば、服の前へ戻します。`,
      },
      {
        title: '長さの表',
        content: `長さは一つです。とても短い、短い、中間、長い、を同じ強さにすると、肩のあたりで髪が切れます。

| 日本語 | 短い語 | 自然な英語 | 見え方 |
|---|---|---|---|
| とても短い | \`very short hair\` | buzzed short hair | 耳より短い |
| 短い | \`short hair\` | short hair on an adult man | 耳のまわり |
| 中間 | medium hair | hair to the nape | 自然な英語。うなじまで |
| 長い | \`long hair\` | long hair on an adult man | 肩を越える。男性の束は別ページ |

\`very short hair\` と \`short hair\` は短い語として使われることがあります。公式タグとしては断定しません。長い髪の日は \`short hair\` を消します。男性の束と髷の位置は [ポニーテールのプロンプト](/guides/ponytail-prompt-guide) です。このページでは、束にする前の長さを決めるところまでです。

**短い黒髪。上半身**

\`\`\`
1 adult man, adult, short hair, black hair, adult face,
buttoned shirt, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, very long hair, feminine, woman
\`\`\`

**うなじまでの髪**

\`\`\`
1 adult man, adult, medium hair, black hair, adult face,
cardigan, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
very short hair, buzz cut, feminine, woman
\`\`\``,
      },
      {
        title: 'スタイルの表',
        content: `スタイルは、長さが三枚そろってからです。今日のスタイルは一つです。

| 日本語 | 書き方 | 読み方 |
|---|---|---|
| ツーブロック | undercut | 自然な英語。横を短く、上が長い |
| ウルフ | \`wolf cut\` | 短い語として使われることがある。短い段と長い段 |
| マッシュ風 | rounded short hair, ends curving inward | 自然な英語。毛先が内へ丸い短い髪 |
| オールバック | slicked back hair | 自然な英語。後ろへ流す |
| 七三分け | side part | 自然な英語。横に分ける |
| センター分け | center part | 自然な英語。中央で分ける |
| 刈り上げ | \`buzz cut\` | 短い語として使われることがある |
| 尖った短髪 | \`spiky hair\` | 短い語。短さと一緒に |
| 男性の束 | man bun | 自然な英語。一つ。詳細は束のページ |
| 後ろの束 | \`ponytail\` | 男性の束の位置は束のページ |

マッシュという言葉を、そのまま英語の公式タグとしては断定しません。毛先が内側へ丸い短い髪、と自然な英語で書いてください。ウルフは、モデルによって動物の耳が足されることがあります。その日は負向に animal ears を入れます。

**横を短くした短髪**

\`\`\`
1 adult man, adult, short hair, undercut, black hair, adult face,
buttoned shirt, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, wolf cut, feminine, woman
\`\`\`

**後ろへ流した髪**

\`\`\`
1 adult man, adult, slicked back hair, black hair, adult face,
suit, necktie, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
bangs, messy hair, feminine, woman
\`\`\`

**ウルフ。耳は人間のまま**

\`\`\`
1 adult man, adult, wolf cut, black hair, short layers, adult face,
coat, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
animal ears, long hair, feminine, woman
\`\`\``,
      },
      {
        title: '前髪の表',
        content: `前髪は、長さとスタイルが決まってから一つです。前髪の形の全体は [前髪プロンプト](/guides/bangs-prompt-guide) です。このページでは、男性の額の扱いを一つ選ぶところまでです。

| 日本語 | 書き方 | 注意 |
|---|---|---|
| 分けた前髪 | parted bangs | 自然な英語。分け目と一緒に一つ |
| 流した前髪 | swept bangs | 自然な英語。横へ流す |
| 目のあいだ | hair between eyes | 自然な英語。目を隠す語と同時に強くしない |
| 額を出す | forehead, no bangs | 自然な英語。前髪の語は消す |
| 片目にかかる | hair over one eye | 自然な英語。両目は隠さない |

額を出したい日に \`bangs\` が残っていると、額は隠れます。no bangs は自然な英語で、\`bangs\` を消したあとに足します。両方を同じ強さにすると、眉のところで平均になります。

**流した前髪。短い黒髪**

\`\`\`
1 adult man, adult, short hair, swept bangs, black hair, adult face,
buttoned shirt, portrait, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, hair over both eyes, feminine, woman
\`\`\`

**額を出す。オールバック**

\`\`\`
1 adult man, adult, slicked back hair, forehead, no bangs, black hair, adult face,
suit, necktie, portrait, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
bangs, blunt bangs, feminine, woman
\`\`\`

前髪が無視されるときは、語を増やすより、前髪の行を髪の長さの直後へ移します。重みは 1.2 までを目安に、一つだけです。`,
      },
      {
        title: '質感と、髪の色',
        content: `質感は一つです。messy hair は乱れた髪、wavy hair は波、curly hair はカール、tousled hair は自然な英語で、手で崩したような乱れ、です。公式タグとしては断定しません。直毛と波を同じ強さにすると、毛先が中間で止まります。直毛のページは [ストレートヘアのプロンプト](/guides/straight-hair-prompt-guide) です。

色は一つです。黒は [黒髪のプロンプト](/guides/black-hair-prompt-guide)、金は [金髪のプロンプト](/guides/blonde-hair-prompt-guide)、ほかの色は [髪色プロンプト](/guides/hair-color-prompt-guide)、筋と内側は [メッシュ・インナーカラーのプロンプト](/guides/mesh-inner-color-hair-prompt-guide) です。このページでは \`black hair\` を基準にして、色を変える日だけ差し替えます。

| 質感 | 書き方 | 消すもの |
|---|---|---|
| 乱れ | \`messy hair\` | slicked back hair |
| 波 | \`wavy hair\` | 直毛の語 |
| カール | \`curly hair\` | \`wavy hair\` |
| 崩した乱れ | tousled hair | 自然な英語。一つ |

**波のある短髪**

\`\`\`
1 adult man, adult, short hair, wavy hair, black hair, adult face,
cardigan, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
straight hair, long hair, feminine, woman
\`\`\`

**センター分け。中間の長さ**

\`\`\`
1 adult man, adult, medium hair, center part, black hair, adult face,
buttoned shirt, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
side part, very short hair, feminine, woman
\`\`\``,
      },
      {
        title: '実写と、アニメの言葉',
        content: `実写は photorealistic と自然な肌、アニメは \`anime style\` を一つです。両方を同じ強さにすると、顔の半分だけが別の媒体になります。実写の日は、毛の一本を盛るより、長さと分け目を先に固定します。アニメの日は、\`male focus\` を人数の近くに残すと、顔が中性に寄りにくいです。

| 媒体 | 足す語 | 髪の置き方 |
|---|---|---|
| 実写 | photorealistic | 自然な英語。長さ、分け目、色 |
| アニメ | \`anime style\`, \`male focus\` | 短い語を人数の近くへ |

**実写。七三の短髪**

\`\`\`
1 adult man, adult, photorealistic, short hair, side part, black hair, adult face,
suit, necktie, portrait, looking at viewer,
simple gray background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
anime, illustration, long hair, feminine, woman
\`\`\`

**アニメ。刈り上げ**

\`\`\`
1 adult man, male focus, adult, anime style, buzz cut, black hair, adult face,
buttoned shirt, upper body, looking at viewer,
simple background
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
photorealistic, long hair, feminine, woman
\`\`\`

**男性の束。肩までの髪は束のページへ渡す前の確認**

\`\`\`
1 adult man, adult, long hair, ponytail, black hair, adult face,
coat, upper body, from side, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
twintails, short hair, feminine, woman
\`\`\`

束の高さとリボンは [ポニーテールのプロンプト](/guides/ponytail-prompt-guide) で一つに決めてから、この長さの行を持っていってください。`,
      },
      {
        title: '名前を一つにして、ファイルを分ける',
        content: `一覧は、全部を一つのプロンプトに入れる表ではありません。今日の名前を一つ選び、その行だけを基準の短髪へ足します。足して崩れたら、足した行を外します。外しても形が戻らないときは、負向に反対の長さが残っているかを見ます。短髪の日に very long hair を負向へ入れすぎると、毛先だけでなく、前髪の量まで消えることがあります。負向の長さは、long hair を一つ、で始めます。

ファイル名は、長さ、スタイル、前髪、のどれを変えたかが残るものにします。短髪、横を短く、流した前髪、額を出す、を一つのファイルに上書きすると、no bangs が前髪の枚へ逆流します。逆流は、正向を音読すれば見つかります。両方の指示が見えたら、今日の目的と違う方を消してから再生成します。

色と媒体は、形のフォルダが三つそろってから別の複製で試します。複製を作らずに \`anime style\` を書き込むと、実写で決めた分け目が、アニメの枚と混ざります。混ざった枚は、どちらの媒体の成功例でもありません。捨てて、基準の黒と無地から作り直します。作り直すときは、\`adult\` と \`adult face\` がまだ先頭付近にあるかを確認します。服の説明が長くなって人数が後ろへ落ちている枚は、髪が正しくても一度捨てます。

男性の束に進む日は、このページの \`long hair\` が安定した複製だけを、束のページへ持っていきます。短髪のファイルに \`ponytail\` を足すと、長さが中間で止まり、束が小さく頭に張り付きます。束の高さ、横の結び、リボンは、束のページで一つに決めてください。このページへ戻るときは、束の語を残したまま短髪の実験をしないでください。残った束が、次の刈り上げに混ざります。

前髪の専用ページへ移るときも、持つ語は一つです。swept bangs を持っていくなら、センター分けは残しません。両方を持っていくと、眉の上で分け目が二本になります。戻ってきたら、持っていった語がまだ一つだけかを数えてから、次のスタイルへ進みます。数が二つになっていたら、今日の名前ではない方を消します。

マッシュ風の毛先は、内へ丸いことが本体です。丸さを出すためにカールの語を同じ強さで足すと、頭全体が巻き毛になります。丸い毛先の日は \`curly hair\` を消し、rounded short hair と ends curving inward だけを残します。丸さが足りないときは、重みを 1.2 まで一つ上げ、カールは足しません。上げてもストレートのままなら、そのモデルでは句が弱いので、短い髪の長さを先に固定した別の枚で、もう一度だけ試します。長さが動いた枚は、丸さの判断に使いません。

ツーブロックは、横の短さと上の長さの差です。横だけを短くしたつもりが、全体の刈り上げになるときは、\`buzz cut\` が正向に残っていないかを見ます。残っていれば消し、undercut を長さの直後へ移します。オールバックと同時に強くすると、横の短さが流れて消えます。流したい日は slicked back hair だけ、横を短くしたい日は undercut だけ、とファイルを分けます。

ウルフの段差は、短い層と少し長い層です。\`long hair\` を同じ強さで残すと、段差が消えて長い髪になります。ウルフの日は long hair を負向に入れ、短すぎて段が見えないときは \`very short hair\` を負向に一つ足します。両方を正向に残した枚は、段の成功例にしません。動物の耳が出た枚は、髪の形が正しくても採用せず、animal ears を負向に足した複製で出します。

七三とセンターは、分け目の位置だけが違います。side part の枚に center part を足すと、分け目が額の中央で二本に見えます。今日の分け目は一つ、とファイル名に書いてから生成します。分け目が無視されるモデルでは、語を前髪より前、長さの直後へ移します。移しても中央に戻るときは、重みを 1.2 まで一つだけ上げ、前髪の種類は動かしません。前髪と分け目を同じ日に強くすると、どちらが効いたのかが残りません。

尖った短髪は \`spiky hair\` を \`very short hair\` と一緒に置きます。\`long hair\` が残った尖りは、跳ねた長髪になって、短髪の一覧から外れます。負向の long hair を残し、正向の長さはとても短いに戻してください。束にしたい日は、尖りのファイルとは別に、長い髪の複製を作ってから束のページへ進みます。尖りの語を残した束は、根元が立って、結んだ形が崩れます。`,
      },
      {
        title: '文章で頼むときと、直す順番',
        content: `ChatGPT や Gemini では、タグの列を貼らず、長さ、分け方、色、服を文にします。Stable Diffusion に戻すときは、このページの表の英語へ翻訳して、自然文は消します。

**マッシュ風の短い髪。文章**

\`\`\`
Draw 1 adult man, clearly an adult, with short black hair.
The ends curve gently inward, like a rounded short cut, with a bit of the forehead visible.
He wears a buttoned shirt. Upper body, looking at the camera.
Plain background, soft daylight. Do not add another person.
Negative: ${NEGATIVE_BODY}, ${NEGATIVE_AGE}, long hair, feminine, woman
\`\`\`

**尖った短髪**

\`\`\`
1 adult man, adult, very short hair, spiky hair, black hair, adult face,
buttoned shirt, upper body, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
long hair, wolf cut, feminine, woman
\`\`\`

**七三。乱れは無し**

\`\`\`
1 adult man, adult, short hair, side part, neat hair, black hair, adult face,
suit, necktie, portrait, looking at viewer,
simple background, soft daylight
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
messy hair, long hair, center part, feminine, woman
\`\`\`

女性的に見えるときは、\`male focus\` を足し、長い髪の語が残っていないかを先に見ます。髪が伸びるときは、\`long hair\` を負向に入れ、正向の長さを \`short hair\` か \`very short hair\` の一方に戻します。前髪が消えるときは、前髪の行を長さの直後へ移し、no bangs が残っていれば消します。ウルフで動物の耳が出るときは、animal ears を負向に残したまま、狼そのものの語を正向から消します。

三つを同じ日に直さないでください。長さ、スタイル、前髪、のどれか一つです。色を変えるのは、形が三枚そろってからです。

色を変えた日に長さが動いたら、その枚は捨てます。金にした記憶が文の途中に残っていると、次の黒の枚まで毛先が明るくなります。色の語を外し、\`black hair\` だけに戻してから、長さが元の位置にあるかを見てください。戻ってから、金髪のページか黒髪のページで色味を一つ借ります。色味の形容をこのページで増やし始めると、分け目の実験が止まります。

前髪を左右で非対称にする日は、hair over one eye を一つだけにして、反対側の目は隠さないと文に書きます。両目を隠す語が残っていると、顔の向きが平均で止まります。額を出す実験は、前髪のファイルとは別名で保存します。同じファイルを上書きすると、no bangs が、前髪を足したい枚へ逆流します。逆流した枚は、正向に bangs と no bangs の両方がある、という矛盾です。矛盾は、音読して一方を消してから再生成します。

実写で髪がプラスチックのように光るときは、質感の語を tousled hair か \`messy hair\` の一方に戻し、ツヤの語は足しません。ツヤを足す日は、ストレートのページへ移って、このページの長さだけを持っていきます。アニメで顔が中性に戻るときは、\`male focus\` が服の後ろに落ちていないかを見て、人数の隣へ戻します。媒体の語と髪の語を同じ日に動かした枚は、成功例にしません。`,
      },
    ],
    faq: [
      {
        q: '男性の短髪は、どの英語が近いですか',
        a: '耳のまわりは short hair、それより短い刈りは very short hair か buzz cut です。公式タグとしては断定しません。long hair が正向に残っていると、肩まで伸びます。',
      },
      {
        q: 'ツーブロックとオールバックの英語は何ですか',
        a: '横を短くする形は undercut、後ろへ流す形は slicked back hair と、このページでは自然な英語で書きます。両方を同じ強さにすると、横も流れも中間になります。',
      },
      {
        q: 'マッシュはどう書きますか',
        a: '公式の英語タグとしては断定しません。rounded short hair と、ends curving inward を自然な英語で一つずつ書きます。前髪で額を隠したい日と、額を出したい日は分けてください。',
      },
      {
        q: 'ウルフカットで動物の耳が出ます',
        a: 'wolf cut を残したまま、負向に animal ears を入れます。狼や動物そのものの語が正向に残っていないかも見てください。',
      },
      {
        q: '前髪だけを変えたいです',
        a: '長さは固定して、parted bangs、swept bangs、hair between eyes、hair over one eye のどれか一つにします。額を出す日は bangs を消してから、forehead と no bangs を自然な英語で足します。',
      },
      {
        q: '女性向けの髪型ガイドと何が違いますか',
        a: '髪型プロンプトのページは長さと結びの入口です。ツインテール、ポニーテール、三つ編み、前髪の専用ページは、それぞれの形です。このページは成人男性の長さ、分け、前髪に限っています。',
      },
    ],
  },
}
