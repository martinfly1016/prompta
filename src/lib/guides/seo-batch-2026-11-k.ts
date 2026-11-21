/**
 * Nineteenth SEO batch (2026-11-16): weddings, forests, shoes, magic, and vehicles.
 * Rendered by the existing /guides/[slug] section + table + code-block parser.
 * Adult, safe-for-work only. No example images are invented here.
 * monthlySearchVolume is 0 in GUIDES — these seeds have no published Semrush volume.
 * Tool wording is limited to official pages checked 2026-11-16.
 */

import { NEGATIVE_AGE, type GuideArticle } from './seo-batch-2026-10'

const NEGATIVE_BODY = 'bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature'

export const SEO_BATCH_19_GUIDE_CONTENT: Record<string, GuideArticle> = {
  "wedding-prompt-guide": {
    sections: [
      {
        title: '式の衣装は種類を一つ',
        content: `「ウェディングドレス プロンプト」「白無垢 プロンプト」「タキシード プロンプト」「結婚式 プロンプト」で探しているのは、式の衣装の形と、頭に載せる布と、花束と、式場です。検索では、ドレスの広がり方、ベール、ティアラ、ブーケ、手袋、引き裾、色を変えたドレス、白無垢、色打掛、角隠し、綿帽子、新郎の礼服、チャペル、庭、神社が一緒に出ます。

このページは、結婚式の衣装と、式の場面を担当します。式以外のドレスの丈や、夜の席の長いドレスは [ドレスプロンプト](/guides/dress-prompt-guide) です。役割は一行で分けます。ドレスのページはドレス全般、このページは婚礼です。着物の種類そのものは [着物プロンプト](/guides/kimono-prompt-guide)、仕事のスーツと白衣の部品は [スーツ・白衣プロンプト](/guides/suit-lab-coat-prompt-guide) です。このページの和装は、式の白無垢と色打掛と、新郎の紋付袴までです。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、二人なら \`2 adults\` を先に置きます。\`adult\` を残します。肩から裾まで布がある長いドレス、白無垢、タキシード、モーニングコートのように、式の礼服として閉じた服を書きます。肩を布で覆わない形、背中を大きく開けた形、裾の深い切れ込み、膝上の短い丈は使いません。式のあとで部屋に戻る語や、横になる家具の語は使いません。実在の人物、式場の固有名、作品名、作者名は書きません。

2026年11月時点の書き方です。モデルとバージョンによって、同じ語の効きは違います。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(wedding dress:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(wedding dress:1.2\\)\` と書きます。NovelAI の強調は \`{wedding dress}\` と \`[wedding dress]\` で、この丸括弧とは別です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide)、NovelAI の欄は [NovelAIの呪文の書き方](/guides/novelai-prompt-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。強さの数値も目安で、配布ページの推奨があればそちらです。横長や縦長を文末の \`--ar\` で足せるツールがあります。使えるかは、そのツールの公式ドキュメントを確認してください。

一枚につき、衣装を一つ、場所を一つ、小物を二つまでです。ウェディングドレスと白無垢を同じ強さにすると、袖が着物で裾がドレスになります。比較は、光と立ち位置を固定して、衣装の名詞だけを差し替えます。`,
      },
      {
        title: 'ウェディングドレスの形',
        content: `ドレスは、腰から下の広がりと、袖と、首元を先に決めます。色を先に強くすると、白い面だけが残って、袖の長さが平均になります。形が三枚同じに見えてから、レースか色を一つ足してください。

ここに載せる形は、肩から裾まで布が続く長いドレスです。肩を出した形、背中側が大きく開いた形、裾を深く割った形、膝より上で終わる丈は、このページでは使いません。

| 形 | 書き方 | 手がかり |
|---|---|---|
| Aライン | A-line wedding dress | 自然な英語。腰から裾へ広がる |
| プリンセス、ボールガウン | ball gown wedding dress | 自然な英語。胴が落ち着き、スカートの布が多い |
| マーメイド | mermaid wedding dress | 自然な英語。膝のあたりまで沿い、裾で広がる。裾の割れは書かない |
| エンパイア | empire-waist wedding dress | 自然な英語。胸の下で切り替える |
| 長袖のレース | long-sleeve lace wedding dress | 自然な英語。袖は手首まで |
| 高い首元 | high neckline wedding dress | 自然な英語。首の付け根まで布がある |

マーメイドは裾の形の名前です。海の作品や、人魚のキャラクターの名前は書きません。プリンセスは、スカートの量が多い形の呼び方としてだけ使います。年齢を下げる語は入れません。

レースは裾か袖の一方にします。全身のレースを強くすると、模様が肌の側まで染みます。首元を高くする枚では、ベールを顔の前に重ねません。布が二枚になると、目の位置が平均になります。

**白いAライン。長い袖**

\`\`\`
1 adult woman, adult, white A-line wedding dress, long sleeves,
high neckline, long skirt, standing, full body,
soft daylight, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, kimono, short dress, text
\`\`\`

**布の多いスカート。手首までの袖**

\`\`\`
1 adult woman, adult, white ball gown wedding dress, long sleeves,
high neckline, lace on the sleeves, long skirt,
standing, full body, soft daylight, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, kimono, short dress, text
\`\`\`

Aラインがボールガウンに寄るときは、スカートの量の語を外し、腰から裾への一本の広がりだけを残します。逆に布が足りないときは、ball gown を一つだけ足して、A-line は消します。二つの形の名前を残した枚は、どちらにも見えないスカートになります。その枚は保存せず、形が一つの起点へ戻してください。`,
      },
      {
        title: 'ベール、ティアラ、花束',
        content: `小物は二つまでです。ベール、ティアラ、花束、手袋、引き裾のうち、今日足すのは二つです。五つを同じ強さにすると、頭の上に花が載り、裾の布がもう一人のドレスに見えます。

ベールは頭のうしろか、肩のうしろです。顔の全面を覆うと、髪と白い布の境目が消えます。ティアラは頭の上に一つ。花束は片手に一つ。手袋は手首までの白い手袋を、花束を持たない枚で使います。花束と手袋を同時に強くすると、指が布と茎の両方を握ろうとして増えます。引き裾は、ドレスのうしろに床へ続く布を一つ、と書きます。人の後ろに立つ付き添いを足すと、人数が増えます。引き裾の枚では、人は一人のままです。

| 小物 | 書き方 | 同時に強くしないもの |
|---|---|---|
| ベール | \`bridal veil\` | 顔を全部覆う指定 |
| ティアラ | \`tiara\` | 帽子 |
| 花束 | holding bouquet | 自然な英語。両手で別の物を持たない |
| 手袋 | white gloves | 自然な英語。手首まで。花束とは別の枚 |
| 引き裾 | dress train | 自然な英語。うしろの床に一枚 |

髪の色は、ベールと違う色にします。黒髪に白いベール、のように、境目が残る組み合わせです。金髪と白いベールを同じ強さにすると、頭の輪郭が一つの白い塊になります。式の首飾りは [ネックレスのプロンプト](/guides/necklace-prompt-guide) に一つだけ足します。このページでは、頭の布と花束を先に決めてください。

**ベールと花束。手袋は付けない**

\`\`\`
1 adult woman, adult, black hair, white wedding dress, long sleeves,
high neckline, long skirt, bridal veil behind the head, holding bouquet,
standing, full body, soft daylight, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra fingers, veil over face, text
\`\`\`

**ティアラと引き裾。花束は無い**

\`\`\`
1 adult woman, adult, black hair, white wedding dress, long sleeves,
high neckline, long skirt, tiara, dress train on the floor,
standing, full body, from the side, soft daylight, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, second person, text
\`\`\`

ベールが髪に溶けるときは、ベールを頭のうしろへ戻し、髪の色を黒に固定します。白い髪の語が古いファイルに残っていたら消してください。ティアラが帽子になるときは、帽子の語を正向から消し、頭の上の飾りは tiara だけにします。帽子の種類そのものは [帽子のプロンプト](/guides/hat-prompt-guide) です。このページでは、式の頭の飾りを一つにします。

花束の花の種類は一つです。バラとユリとカスミソウを同じ強さにすると、手の中が色の平均になります。花そのものの書き方は [花のプロンプト](/guides/flower-prompt-guide) です。このページでは、手に持つ束が一つあるかだけを見ます。`,
      },
      {
        title: '色を変えたドレス',
        content: `色は一つです。白が安定してから、桃か、青か、黒かのどれかに差し替えます。白と黒と桃を同じ文に置くと、スカートがまだらになります。

桃と青は、長い袖と高い首元と長いスカートを、白の枚からコピーして残します。色の語だけを変えます。黒は、暗い色の花嫁として、長い袖と高い首元を維持した黒い婚礼のドレスです。ゴシック調の建築をうしろに置く場合も、服の開いた形にはしません。城の窓は無地にし、文字は書きません。

| 色 | 書き方 | 残す形 |
|---|---|---|
| 桃 | blush pink wedding dress | 自然な英語。長袖、高い首元、長いスカート |
| 青 | dusty blue wedding dress | 自然な英語。形は白の枚と同じ |
| 黒 | black wedding dress | 長袖、高い首元、長いスカート |

背景の赤を強くすると、白いドレスがピンクに寄ります。色を試す日は、背景を薄い灰色か、庭の緑の一方にします。緑と桃を同時に強くすると、裾が草色になります。

**黒い長いドレス。袖と首元は閉じる**

\`\`\`
1 adult woman, adult, black wedding dress, long sleeves,
high neckline, long skirt, bridal veil, holding bouquet,
standing, full body, dim chapel, one window light, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, short dress, white dress, text
\`\`\`

**青いドレス。形は白の枚のまま**

\`\`\`
1 adult woman, adult, dusty blue wedding dress, long sleeves,
high neckline, long skirt, standing, full body,
garden, soft daylight, simple flowers, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, short dress, white dress, text
\`\`\`

黒が灰色の普通のワンピースに戻るときは、wedding dress を人数の直後へ移し、コートやジャケットの語が残っていないかを見ます。残った外着は、黒い布を短いジャケットに変えます。外着を消してから、もう一度生成してください。

桃が白に戻るときは、blush pink が文の後ろに落ちています。色の語をドレスの直前へ移し、白を強調する語は外します。白の枚と色の枚は、ファイルを分けて保存します。同じファイルで色だけを上書きすると、翌日にどちらが起点か分からなくなります。`,
      },
      {
        title: '白無垢と色打掛',
        content: `和装の式は、白い礼服か、色のある打ち掛けかを一つにします。両方を同じ強さにすると、袖が白で裾が赤の、どちらでもない着物になります。

白無垢は、自然な英語で white wedding kimono と書きます。shiromuku も自然な英語です。公式タグとしては断定しません。綿帽子は、白い帽子の形のかぶり物で、白無垢と挙式の組み合わせで書かれやすいです。wataboshi と自然な英語で一つ足します。角隠しは、額と髪を覆う白い布です。白無垢だけでなく、色打掛とも一緒に書ける場合があります。tsunokakushi と自然な英語です。綿帽子と角隠しを同じ枚に強くすると、頭に布が二枚重なります。かぶり物は一つです。

色打掛は、色のある打ち掛けです。赤を一つ、柄は鶴か花の一方だけにします。白無垢の上に重ねる指定と、色打掛だけの指定は、ファイルを分けます。重ねる枚では、白を下、赤を上、と順番を書き、柄は上の布だけです。

髪は、まとめ髪を一つ。洋髪のダウンスタイルと、高い日本髪を同じ強さにすると、頭の形が平均になります。髪型の細かい分けは [髪型プロンプト](/guides/hairstyle-prompt-guide) です。このページでは、式のまとめ髪が一つあるかだけを見ます。

| 和装 | 書き方 | かぶり物 |
|---|---|---|
| 白無垢 | white wedding kimono | 綿帽子か角隠しの一方 |
| 色打掛 | red uchikake | 自然な英語。角隠し。柄は一つ |
| 足袋 | \`white tabi\` | 履物は一つ |

着物の帯や浴衣や振袖の一般は、着物のページへ戻します。このページに浴衣の語を残すと、式の白が夏の柄に寄ります。

**白無垢と綿帽子**

\`\`\`
1 adult woman, adult, black hair in an updo, white wedding kimono,
wataboshi, white tabi, standing, shrine, full body, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, wedding dress, floral print, yukata, text
\`\`\`

**赤い色打掛と角隠し**

\`\`\`
1 adult woman, adult, black hair in an updo, red uchikake,
tsunokakushi, white tabi, standing, shrine, full body, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, wedding dress, yukata, text
\`\`\`

白無垢が色のある着物に戻るときは、柄の語と浴衣の語を正向から消し、ネガティブに残します。綿帽子がドレスのベールになるときは、wedding dress と bridal veil が古いファイルから残っています。洋装の語を検索して消してから、white wedding kimono を人数の直後へ置いてください。

色打掛の赤が背景の鳥居まで広がるときは、赤を衣装の語だけに戻し、鳥居は形だけにします。鳥居の色を別に強くすると、袖と鳥居が同じ赤の面になります。`,
      },
      {
        title: 'タキシードと紋付袴',
        content: `新郎の礼服は、タキシードか、モーニングコートか、紋付袴かを一つにします。三つを同じ強さにすると、襟が蝶ネクタイで、裾が袴になります。

外務省のプロトコールの目安では、昼の正礼装がモーニングコート、夜の準礼装がタキシード（ブラック・タイ）です。表は <a href="https://www.mofa.go.jp/mofaj/ms/po/page25_001892.html" rel="nofollow noopener" class="text-sky-600 hover:underline">外務省のプロトコール</a> にあります。日本の結婚式では、新郎が日中でもタキシードを選ぶ場合があります。画面では、時刻の正しさより、形を一つに決めてください。モーニングコートは、前の裾が斜めに短く、うしろが長いコートです。縞のズボンを一つ足します。タキシードは、夜の礼服として、黒い上下と蝶ネクタイです。光沢のある襟を一つ足す場合は、その枚ではモーニングの裾の語を消します。

紋付袴は、黒い羽織袴です。montsuki haori hakama と自然な英語で書きます。家紋の絵と、家名の文字は書きません。文字は崩れます。足元は白い足袋と、鼻緒のある履物を一つです。下駄と草履の一般は着物のページです。

| 礼服 | 書き方 | 手がかり |
|---|---|---|
| タキシード | \`tuxedo\`, \`bow tie\` | 黒い上下。蝶ネクタイは一つ |
| モーニング | morning coat | 自然な英語。斜めの前裾、うしろが長い、縞のズボン |
| 紋付袴 | montsuki haori hakama | 自然な英語。黒い和装。紋の絵は書かない |

**タキシード。全身**

\`\`\`
1 adult man, adult, black tuxedo, white shirt, bow tie,
black trousers, standing, full body, chapel, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, morning coat, hakama, text
\`\`\`

**紋付袴。神社**

\`\`\`
1 adult man, adult, black hair, montsuki haori hakama, white tabi,
standing, shrine, full body, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, tuxedo, wedding dress, text, logo
\`\`\`

蝶ネクタイが長いネクタイに戻るときは、仕事用の suit と necktie が残っています。仕事のスーツの部品はスーツのページです。このページでは bow tie をシャツの直後に置き、necktie はネガティブへ移します。モーニングの裾が普通のジャケットの長さに戻るときは、morning coat を人数の直後へ移し、tuxedo を消します。二つの礼服の名前が同じ行にある枚は、比較に使えません。

父親の礼服としてモーニングを書くときも、人数は \`1 adult man\` です。新郎のタキシードと同じ画面に、もう一人のモーニングを足すと、礼服が平均になります。並びの枚は、次の節で二人だけにします。三人目は書きません。`,
      },
      {
        title: '式の場面',
        content: `場所は一つです。チャペル、庭、神社を同じ強さにすると、ステンドグラスの下に鳥居が生えます。人が歩く枚と、会場だけの枚はファイルを分けます。

通路を歩く枚は、\`2 adults\` から書きます。成人の女性と成人の男性が、肩を並べて通路を歩きます。花束を投げる枚は、持つ人を一人にします。もう一人は隣に立って、手は空です。両手に花束を書くと、指が増えます。投げる瞬間と、歩いている瞬間は別の枚です。

指輪は、歩いている枚には書きません。指の確認は、人が一人で、手が腰の横に見える全身の枚で行います。手だけを画面いっぱいにすると、本数が増えやすいです。指の直し方は [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。

| 場面 | 書き方 | 人数 |
|---|---|---|
| チャペルの通路 | chapel aisle, walking | 自然な英語。二人 |
| 庭 | garden ceremony | 自然な英語。人を置くなら二人まで |
| 神社 | shrine wedding | 自然な英語。和装の二人 |
| 花束を投げる | throwing bouquet | 自然な英語。花束は一人の片手 |

**二人で通路を歩く**

\`\`\`
2 adults, 1 adult woman, adult, white wedding dress, long sleeves,
high neckline, long skirt, bridal veil, holding bouquet,
1 adult man, adult, black tuxedo, bow tie,
walking down the aisle, chapel, full body, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra fingers, kimono, text
\`\`\`

**神社で並ぶ。和装**

\`\`\`
2 adults, 1 adult woman, adult, white wedding kimono, wataboshi,
1 adult man, adult, montsuki haori hakama,
standing side by side, shrine, full body, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, wedding dress, tuxedo, text
\`\`\`

チャペルに看板の文字が出るときは、式場の名前を正向から消し、ネガティブに text を残します。窓は色ガラスを一つまでにして、文字の入った紋章は書きません。庭の枚でアーチを足すときは、花のアーチを一つ。アーチとブーケとティアラを同時に強くすると、頭にも門が載ります。

花束を投げる枚は、歩く枚をコピーしてから、walking を throwing bouquet に替え、男性の手は空のままにします。男性にも花束を持たせると、束が二つになって、どちらが投げたか残りません。`,
      },
      {
        title: '会場だけと、文章で頼むとき',
        content: `会場だけの枚には人数を書きません。\`adult\` も書きません。人のタグが残った背景は、端に顔が出ます。チャペル、庭、神社のどれか一つに、椅子か、花か、砂利かを一つ足します。小物を四つ並べると、式場ではなく、カタログになります。

ChatGPT や Gemini や、FLUX のように文章で書くモデルでは、カンマのタグではなく、見える順番で書きます。成人であること、肩から裾まで布があること、文字を入れないことを、同じ文に残します。画面のボタン名は、2026年11月時点でも版によって違います。最新の手順は公式ドキュメントを確認してください。タグが通るモデルへ戻すときは、通った文を短い英語に翻訳して、別のファイルに保存します。

**庭の会場。人はいない**

\`\`\`
garden wedding venue, wooden chairs in two rows, one flower arch,
soft daylight, wide shot, no people, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, logo
\`\`\`

**チャペルの室内。人はいない**

\`\`\`
chapel interior, aisle, pews, one tall window, soft daylight,
empty seats, wide shot, no people, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, logo
\`\`\`

**文章の例。成人の二人**

\`\`\`
A wedding photo of 2 adults walking down a chapel aisle.
1 adult woman wears a white wedding dress with long sleeves, a high neckline, and a long skirt, with a veil behind her head and a bouquet in one hand.
1 adult man wears a black tuxedo and a bow tie.
Full bodies are visible. Soft daylight. No text and no logo.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, text, logo
\`\`\`

会場だけの枚に、前日の人数が残っているときは、正向の adult を消します。消さずに no people だけを足すと、人数の語の方が勝って、通路の端に人が出ます。人を戻す日は、会場だけの起点をコピーした枝で行い、起点自体には人数を書きません。

文章で頼んだ枚を、タグのモデルへ貼るときは、文を分解します。衣装、小物、場所、光、の四行に戻してから、小物を二つまで削ります。一文のまま貼ると、ベールと引き裾とティアラと花束が全部同じ強さで入ります。`,
      },
      {
        title: 'ベールや指や着物が混ざるとき',
        content: `崩れは、足した語を一つ外して確認します。外しても直らないときは、そのファイルを捨て、衣装が一つの起点から書き直します。混ざった行から引き算しても、ドレスと着物と礼服の語が同じ行に残ります。

よくある崩れは四つです。ベールが髪と溶ける。洋装が着物と混ざる。指輪の手で指が増える。二人が一人になる、または三人になる。ベールは、髪の色を黒に戻し、布は頭のうしろだけにします。着物が混ざる枚は、wedding dress と white wedding kimono の一方を消し、消した方をネガティブに入れます。指は、手のクローズアップをやめ、全身に戻します。指輪は小さな一語だけにして、両手で別々の仕草を書かないでください。人数は、文の先頭の \`2 adults\` を見て、女性一人と男性一人以外の人数の語を消します。

| 崩れ | まず外すもの | 残すもの |
|---|---|---|
| ベールが髪と溶ける | 白い髪、顔を覆うベール | 黒髪と、頭のうしろのベール |
| ドレスが着物になる | 着物の語、またはドレスの語 | 衣装は一つ |
| 指が増える | 手の寄り、二つ目の持ち物 | 全身と、片手の花束 |
| 人数がずれる | 三人目、子供の語 | 先頭の 2 adults |

比較のメモは、衣装、場所、小物の数、の三行です。三行のうち、動かすのは一行です。白のAラインでベールを足す日は、袖と場所を固定します。ベールと色と場所を同じ日に動かすと、頭が白いのか、壁が白いのかが残りません。

今日の一枚目は、衣装の名前が付いた起点です。昨日の色替えを、起点の上に開き直さないでください。起点には、衣装一つ、場所一つ、小物二つまで、成人であること、が残っています。会場だけの起点には、人数が無いことを確認してから生成します。

直した枚を次の入力に使うときは、混ざった袖が残っていないかを先に見ます。着物の袖が残ったドレスの上に、色だけを変えても、袖の形は戻りません。戻り先は、形だけの見本です。見本の名前を、Aライン、白無垢、タキシード、庭のみ、のように保存しておくと、翌日にどのファイルへ戻るかが残ります。`,
      },
    ],
    faq: [
      {
        q: 'ドレスのページとどう分けますか',
        a: 'このページは、婚礼のドレス、白無垢、タキシード、式の場面です。夜の席や昼の外出のドレス全般は、ドレスのページです。ウェディングドレスとイブニングドレスを同じ強さでは書きません。',
      },
      {
        q: '白無垢と色打掛は同時に書けますか',
        a: '同じ強さにはしません。白無垢の枚と、赤い色打掛の枚はファイルを分けます。重ねる場合も、下を白、上を赤、と一つずつにして、柄は上だけにします。',
      },
      {
        q: '綿帽子と角隠しはどう違いますか',
        a: '綿帽子は白い帽子の形で、白無垢と挙式の組み合わせで書かれやすいです。角隠しは額と髪を覆う白い布で、色打掛とも一緒に書ける場合があります。一枚につき、かぶり物は一つです。',
      },
      {
        q: '二人の式が一人になります',
        a: '文の先頭を `2 adults` にし、`1 adult woman` と `1 adult man` を続けます。衣装を長く書くときは、人数の行を消さないでください。三人目の語はネガティブに回します。',
      },
      {
        q: 'ベールが髪と溶けます',
        a: '髪を黒に固定し、ベールは頭のうしろだけにします。白い髪の語と、顔を覆う指定を正向から消してください。ティアラとベールを同じ日に足さないでください。',
      },
    ],
  },
  "forest-prompt-guide": {
    sections: [
      {
        title: '森は種類を一つ、光を一つ',
        content: `「森 プロンプト」「森の中 プロンプト」「暗い森 プロンプト」「夜の森 プロンプト」「背景 森 プロンプト」で探しているのは、どんな森かと、いつ光が差すかと、道や川があるかです。検索では、森の中、暗い森、夜の森、背景としての森、深い森、薄暗い森、森を歩く重ね着が一緒に出ます。竹林、針葉樹、秋の森、霧、密林、木漏れ日も、同じ依頼の中に入ります。

このページは、森そのものを担当します。山や海や空が主役の景色は [風景のプロンプト](/guides/landscape-prompt-guide) です。役割は一行で分けます。風景のページは地形の一覧、このページは林と木です。人物のうしろに場所を短く置くときは [背景プロンプト](/guides/background-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide)、レンズの距離は [カメラのプロンプト](/guides/camera-lens-prompt-guide) です。街路や商店街は [街のプロンプト](/guides/city-town-prompt-guide) です。

人のいない枚には人数を書きません。歩く枚と、木のそばで休む枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。服はカーディガン、シャツ、ロングスカート、スラックス、コート、ブーツのように、閉じた日常着です。検索で一緒に出る「森ガール」は、キャラクターの名前ではなく、ここでは成人のカーディガンと長いスカートの重ね着として書きます。人数は \`1 adult woman\` です。実在の観光地の名前、作品名、ゲームの名前、作者名は書きません。動物の森を題にした作品へ寄せる語も書きません。

2026年11月時点の書き方です。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(forest:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(forest:1.2\\)\` と書きます。NovelAI の強調は \`{forest}\` と \`[forest]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。横長を文末の \`--ar\` で足せるツールがあります。使えるかは公式ドキュメントを確認してください。

一枚につき、森の種類を一つ、光を一つ、地形の線を一つです。竹林と針葉樹と夜を同じ強さにすると、竹の上に雪の空が残ります。比較は、光を固定して、木の名詞だけを差し替えます。`,
      },
      {
        title: '森の種類',
        content: `種類は、何が立っているかで分けます。\`forest\` だけだと、昼の広葉樹にも、夜の針葉樹にも寄ります。幹の形か、葉の形かを一つ足してから、時間を足してください。

| 森 | 書き方 | 手がかり |
|---|---|---|
| 深い森 | \`deep forest\` | 幹が高く、空が狭い |
| 竹林 | \`bamboo forest\` | まっすぐな竹。葉は上 |
| 針葉樹 | pine forest | 自然な英語。細い幹が垂直 |
| 秋の森 | \`autumn forest\` | 葉の色は赤か黄の一方を主にする |
| 霧の森 | \`misty forest\` | 幹のあいだに白い空気 |
| 密林 | \`jungle\` | 広い葉。つるは一つまで |
| 幻想の森 | enchanted forest | 自然な英語。光る要素は一つ |

秋の葉を赤と黄と同じ強さにすると、地面の色が濁ります。主にする色を一つにして、もう一方は地面に落ちた葉として弱く書くか、消します。密林は、広い葉と、湿った空気の色で足ります。水に入る描写や、服が水を吸う語は使いません。幻想の森は、次の節の光と、あとの節の光るキノコに分けます。この表では、森の名前だけを決めます。

ゲームやアニメの森の固有名は書きません。欲しいのが竹なら bamboo forest、欲しいのが針葉なら pine forest です。固有名を足すと、別の作品の建物が混ざります。

密林と深い森は、どちらも緑ですが、手がかりが違います。密林は葉が広く、空がほとんど見えません。深い森は幹が高く、道の奥が狭い、までです。葉の形を書かないと、両方ともただの forest に戻ります。雨の日は、空を曇りにし、葉から落ちる粒を背景にします。服や地面が水を含んだ状態の語は使いません。粒は道の先の空気を少し白くする程度で止めます。白くしすぎると、霧の森と区別ができなくなります。霧を主題にする日は、雨の粒の語を消してから、幹のあいだの白い空気だけを残してください。雪の森は、このページでは枝に薄く乗る白を一つまでです。降り方の詳細は冬のページへ渡し、樹種はこちらに残します。

**深い森。人はいない**

\`\`\`
deep forest, tall trunks, narrow sky, green leaves,
dirt path, soft daylight, wide shot, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, buildings, text
\`\`\`

**竹林。人はいない**

\`\`\`
bamboo forest, dense bamboo, straight green stalks,
narrow path, daytime, soft light, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, pine trees, snow, text
\`\`\`

竹林が普通の広葉樹に戻るときは、bamboo が文の後ろに落ちています。先頭へ移し、oak や generic forest の語が残っていれば消します。針葉樹の枚では、竹の語をネガティブに回してください。同じファイルで竹と松を残すと、幹が半分ずつになります。

密林が公園に見えるときは、芝生とベンチの語を消し、広い葉を手前に一つ残します。奥まで明るくすると、密林ではなく、庭になります。空は葉のすき間だけにしてください。`,
      },
      {
        title: '時間と光',
        content: `光は一つです。木漏れ日、薄暗い森、夜の森を同じ強さにすると、空の半分が昼で、地面が夜になります。昼の語が残った夜の枚は、青空が枝のあいだから見えます。時間を変える日は、昼の語を正向から消してから、夜の語を足します。

木漏れ日は、葉のあいだから差す筋の光です。sunbeams through the canopy と、dappled light を自然な英語で書きます。両方を最大の強さにすると、地面が白い斑点だけになります。筋を一つ、地面のまだらは弱く、で足ります。

薄暗い森と暗い森は、光を消すのではありません。幹の形が見える明るさを一つ残します。まったく黒い画面は、森の種類が読めません。暗くしたいのに形が消える枚は、照明のページの、暗い中に一点を残す書き方へ渡します。このページでは、森の名詞を残したまま、光を一つに下げます。

夜の森は、月光か、ホタルかの一方を光源にします。両方を強くすると、地面に星が散った昼のような画面になります。月は枝のあいだに一つ。ホタルは道のそばの小さな点です。月そのものを画面の中央の巨大な円にすると、空が白飛びします。

| 時間 | 書き方 | 光源 |
|---|---|---|
| 木漏れ日 | sunbeams, dappled light | 自然な英語。昼。筋は一つ |
| 薄暗い | \`dim forest\` | 形が見える弱い光を一つ |
| 暗い | \`dark forest\` | 奥に弱い光を一つ残す |
| 夜 | forest at night | 自然な英語。月光かホタル |

**木漏れ日の道。人はいない**

\`\`\`
forest path, sunbeams through the canopy, dappled light,
green trees, daytime, eye level, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, night, moon, text
\`\`\`

**夜の森。ホタル**

\`\`\`
forest at night, dark trees, moonlight through branches,
fireflies along the path, cool blue air, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, daytime, blue sky, sun, text
\`\`\`

夜の枚に昼が残るときは、daytime と blue sky と sunlight を検索して消します。消したあとに地面が見えないときは、月光を一つ戻します。光まで消すと、幹の線がノイズになります。木漏れ日の枚で月が出るときは、night が古いファイルから残っています。夜の語を消してから、昼の筋だけを残してください。

暗い森が真っ黒なときは、dark を一語だけに減らし、手前の幹の色を濃い茶か濃い緑で一つ書きます。黒一色の語を重ねると、葉も道も同じ面になります。薄暗い森は、暗い森より一段明るく、昼の木漏れ日より一段暗い、中間として分けます。中間を作りたいのに daylight を残すと、ただの昼に戻ります。dim forest の枚では、太陽の円も、青空も書きません。残すのは、葉のすき間の弱い明るさ一つです。その明るさが地面の道まで届いているかを見て、届いていなければ光を消しすぎです。届きすぎて斑点が白い紙のように飛ぶときは、木漏れ日の枚へ移して、dim は外してください。同じファイルで dim と sunbeams を強くすると、時間帯が平均になって、朝とも夕とも読めなくなります。`,
      },
      {
        title: '道と川と空き地',
        content: `視線を奥へ運ぶ線は、一つです。道、小川、空き地を同じ強さにすると、水の上に土が浮かびます。道の枚では川を消します。川の枚では、橋を足すなら一つまでです。橋と鳥居と小屋を同時に書くと、森ではなく、観光地の模型になります。固有の神社名は書きません。

空き地は、木に囲まれた明るい地面です。空き地を広くしすぎると、森が枠だけになって、草原になります。木は画面の左右に残し、空は空き地の上に一つです。

道は土の道か、落ち葉の道かを一つにします。舗装路を強くすると、住宅街に寄ります。街灯を足す枚は、夜の森の別ファイルにして、昼の木漏れ日とは混ぜません。

| 線 | 書き方 | 一緒にしないもの |
|---|---|---|
| 道 | \`forest path\` | 川と同じ強さ |
| 小川 | forest stream | 自然な英語。橋は一つまで |
| 空き地 | forest clearing | 自然な英語。木を左右に残す |
| 落ち葉 | fallen leaves | 自然な英語。色は一つ |

水は、流れる筋として書きます。水しぶきを顔や服にかける語は使いません。岩は乾いた岩か、苔の岩かを一つにします。両方を強くすると、岩の色が平均になります。

**小川と苔。人はいない**

\`\`\`
forest stream, clear water, mossy rocks, tall trees,
soft daylight, eye level, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, bridge crowd, text
\`\`\`

**秋の空き地。葉の色は赤を主にする**

\`\`\`
autumn forest, forest clearing, red leaves, a few yellow leaves on the ground,
tall trees on both sides, soft daylight, wide shot, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, snow, text
\`\`\`

道が途中で二本に分かれるときは、分岐の語を消して、奥へ続く一本に戻します。分岐は、人がどっちへ行くかの物語になって、木の種類が読めなくなります。川が画面の下半分を全部占めるときは、川の語を弱め、左右の幹を前へ戻します。水だけが主役の枚は、風景のページの川や海に渡してください。このページの水は、森の中の細い筋です。`,
      },
      {
        title: '見る位置',
        content: `視点は一つです。目の高さ、見上げ、引き、を同じ強さにすると、幹が弓なりになります。広さは、引きの語を一つにして、さらに広角を重ねません。壁ではなく木が曲がるときも、原因は視点の重ねが多いです。

目の高さは、道に立って奥を見る位置です。見上げは、枝と空のすき間を見る位置で、地面は少なくします。引きは、空き地の全体か、深い森の奥行きです。引きで人が豆粒になる枚は、人を置く日には使いません。人のいる枚は、次の節で、膝から上が読める距離にします。

手前に幹を一本置くと、奥行きが出ます。手前の幹を画面の端の枠にして、中央は道に残します。幹を中央に太く置くと、道が隠れます。枠の幹は左右のどちらか一方です。

| 視点 | 書き方 | 向き |
|---|---|---|
| 目の高さ | \`eye level\` | 道の奥 |
| 見上げ | looking up through the canopy | 自然な英語。地面は少ない |
| 引き | \`wide shot\` | 木が曲がるときは外す |
| 手前の幹 | foreground tree trunk | 自然な英語。左右の一方 |

**針葉樹を見上げる。人はいない**

\`\`\`
pine forest, looking up through the canopy, tall straight trunks,
small patch of sky, soft daylight, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, buildings, text
\`\`\`

**霧の中の引き。人はいない**

\`\`\`
misty forest, wide shot, foreground tree trunk at the left,
path fading into white mist, muted green, overcast, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, harsh sunlight, text
\`\`\`

霧で奥が全部消えるときは、手前の幹の色を濃く残し、霧は道の先だけにします。霧を画面の全面にすると、種類が読めません。見上げの枚で地面の花を詳しく書くと、視点が平均になって、カメラが斜めに落ちます。花は、目の高さの枚へ移してください。`,
      },
      {
        title: '森を歩く大人',
        content: `人がいる枚は、森の種類が三枚そろってからです。人を先に詳しく書くと、木が背景の模様になって、どの森かが残りません。人数は一人です。二人の散歩は、一人の服と森の種類が決まってからにします。このページの見本は一人です。

検索で一緒に出る、森を歩く重ね着は、成人のカーディガン、ロングスカートかスラックス、ブーツ、です。年齢を下げる語は使いません。休む枚は、岩か切り株に座ります。横になる姿勢は書きません。

歩く枚は、道の上に両足があることを書きます。木にもたれる枚は、片手を幹に触れるか、触れずに隣に立つかを一つにします。両手で別の仕草を書くと、指が増えます。荷物は一つまでです。本とカップと花を同時に持たせません。

| 動作 | 書き方 | 服 |
|---|---|---|
| 道を歩く | walking on a forest path | 自然な英語。カーディガンと長いスカート、またはスラックス |
| 木のそばで休む | sitting on a rock beside a tree | 自然な英語。コートかカーディガン |

**道を歩く。成人**

\`\`\`
1 adult woman, adult, cardigan, long skirt, boots,
walking on a forest path, deep forest, dappled light,
full body, eye level, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra fingers, text
\`\`\`

**岩に座る。成人**

\`\`\`
1 adult man, adult, coat, trousers, boots,
sitting on a rock beside a tree, pine forest, soft daylight,
full body, eye level, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra fingers, text
\`\`\`

人が森に負けるときは、人数の行を先頭へ戻し、木の種類は一つに減らします。森が消えて無地になるときは、背景のページの書き方に寄りすぎています。場所の名詞を人のうしろに短く置くだけなら背景のページ、木を描き込むならこのページです。

ブーツの形を詳しく変える日は、森の語を固定します。靴の種類の表は [靴のプロンプト](/guides/shoes-prompt-guide) です。このページでは、足元が道の上にあることまでです。コートの丈は [コートのプロンプト](/guides/coat-prompt-guide) です。`,
      },
      {
        title: '背景だけの森と、幻想の要素',
        content: `背景だけの枚は、人を描きません。うしろに置く森として短く書き、手前は空けます。キャラクターの服までこのファイルに書くと、次に人を合成したときに服が二重になります。人を足す日は、前の節のファイルを使います。

幻想の要素は一つです。光るキノコか、大きな古い木かを選びます。両方を強くすると、キノコが幹の大きさまで膨れます。光る色は一つ。青か、緑か、です。文字の浮かぶ円や、詠唱の名前は書きません。魔法の詠唱そのものは [魔法のプロンプト](/guides/magic-prompt-guide) です。このページの光は、森の中の植物と、古い木です。

古い木は、画面の一方に一本です。顔のような模様や、動く枝は書きません。苔と、太い幹と、低い枝で足ります。

ChatGPT や Gemini や、FLUX のように文章で書くときは、木の種類、時間、光、人を置かないこと、をこの順で一文にします。ボタンの名前は版によって違います。2026年11月時点の画面でも、表示名が違うことがあります。最新の手順は公式ドキュメントを確認してください。

**背景用の森。手前は空ける**

\`\`\`
background forest, soft green trees, shallow detail,
daytime, muted colors, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, sharp foreground face, text
\`\`\`

**光るキノコと、一本の古い木**

\`\`\`
enchanted forest, one ancient tree, glowing mushrooms in blue,
mist near the ground, night, moonlight, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, runes, text
\`\`\`

**文章の例。霧の針葉樹。人はいない**

\`\`\`
A landscape of a misty pine forest with tall straight trunks and a narrow dirt path.
Soft overcast light, muted green, no people, no animals, no text, and no buildings.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, text, buildings
\`\`\`

光るキノコが画面の全面を白くするときは、色を一つに減らし、光は地面のそばだけにします。木の葉まで同じ色に光らせると、種類が消えます。古い木に窓や扉が付くときは、建物の語が残っています。家と塔を消して、幹と苔だけに戻してください。

背景用の森を、人のいる枚のうしろに貼るときは、背景ファイルの no people を消してから人数を足します。消し忘れると、プロンプトの中で人がいるかないかが矛盾します。矛盾した枚は、顔が半分だけ出ます。`,
      },
      {
        title: '木が平らで、色が濁るとき',
        content: `木が平らなときは、手前と奥を分けます。手前の幹を一本、奥の道を一本、光を一つ、に戻します。木の名前を五種類並べても、奥行きは増えません。名前が増えると、葉の色が混ざって、さらに平らになります。

色が濁るときは、主にする色を一つ残して、ほかを消します。秋の赤と、夜の青と、苔の緑が同じ強さだと、地面が茶色い霧になります。昼の枚は緑を主にし、夜の枚は青を主にします。濁った枚の上に、鮮やかの語だけを足しても、混ざった色は残りません。戻り先は、色が一つの見本です。

暗すぎて形が無いときは、光源を一つ戻します。戻しても黒いときは、dark を外して dim に下げ、手前の幹の色を書きます。光の向きの一覧が要る枚は、照明のページを開いて、このページの森の名詞は一つだけ持っていきます。森の名詞を全部置いたまま照明の語を重ねると、実験が二つになります。

| 崩れ | まず外すもの | 残すもの |
|---|---|---|
| 木が平ら | 二つ目以降の樹種 | 手前の幹と、奥の道 |
| 色が濁る | 主色以外 | 昼なら緑、夜なら青 |
| 真っ暗 | 光源を消す語 | 森の種類と、光一つ |
| 建物が混ざる | 家、塔、看板 | 木と道 |

今日の起点は、種類一つ、光一つ、線一つ、です。人を足す枝と、幻想を足す枝は分けます。同じ枝で歩く人を足しながらキノコの色を変えると、どちらの変更で空が白くなったのかが残りません。

直した枚を次の入力に使うときは、平らな木の反復が残っていないかを見ます。同じ形の木が判で押したように並ぶ枚は、樹種を一つに減らし、手前の幹の太さだけを変えます。太さまで同じ語で揃えると、また平面に戻ります。手前は太く、奥は細く、と書き分けてください。`,
      },
    ],
    faq: [
      {
        q: '風景のページとどう分けますか',
        a: 'このページは、森、竹林、夜の森、木漏れ日です。山や海や空が主役の景色は風景のページ、人物のうしろに短く置く場所は背景のページです。同じ文に山と海と森を強く書かないでください。',
      },
      {
        q: '暗い森が真っ黒になります',
        a: '光を消さず、手前の幹の色を一つ残します。dark を重ねるほど形は消えます。それでも黒いときは、照明のページで光源を一つ足し、森の名詞は一つだけ持っていきます。',
      },
      {
        q: '竹林が普通の森になります',
        a: 'bamboo forest を先頭へ移し、広葉樹や松の語を消します。竹と松を同じファイルに残すと、幹が半分ずつになります。',
      },
      {
        q: '夜の森に昼の空が残ります',
        a: 'daytime、blue sky、sunlight を正向から消してから、月光かホタルを一つ足します。昼の起点を上書きせず、夜用のファイルを分けてください。',
      },
      {
        q: '木が平らで奥行きがありません',
        a: '樹種を一つにし、手前の幹を左右の一方に置き、奥へ道を一本残します。名前を増やしても奥行きは増えません。',
      },
      {
        q: 'ゲームの森は書けますか',
        a: '作品名やゲーム名では書きません。竹、針葉樹、霧、夜、のように、画面に見える木と光だけで分けてください。',
      },
    ],
  },
  "shoes-prompt-guide": {
    sections: [
      {
        title: '靴は種類を一つ',
        content: `「靴 プロンプト」「靴 プロンプト 種類」「厚底 靴 プロンプト」で探しているのは、靴の形と、素材と、画面の中で靴を切らずに見せる書き方です。検索では、種類、運動靴、厚底、女性の靴、仕事着と合わせる靴、暗い色の厚底、ローファー、ブーツが一緒に出ます。下駄、草履、サンダル、スリッパ、商品としての一足も、同じ依頼に入ります。

このページは、履いている靴と、靴だけの商品写真を担当します。服の全体の並びは [服装プロンプト一覧](/guides/clothing-prompt-guide)、普段着の組み合わせは [私服・カジュアルのプロンプト](/guides/casual-outfit-prompt-guide)、コートの丈は [コートのプロンプト](/guides/coat-prompt-guide)、フード付きのスウェットは [パーカーのプロンプト](/guides/hoodie-prompt-guide) です。役割は一行で分けます。服装のページは全身の服、このページは足元の種類です。和装の帯や袖は [着物プロンプト](/guides/kimono-prompt-guide)、仕事の長いメイド服は [メイド服プロンプト](/guides/maid-outfit-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。靴だけの写真には人数を書きません。服はブラウス、シャツ、ロングスカート、スラックス、コート、カーディガンのように、閉じた日常着です。足だけを画面いっぱいにする構図と、靴の裏をこちらへ向ける構図は使いません。短い丈で脚を強調する書き方も使いません。実在のメーカー名、印、作品名は書きません。

2026年11月時点の書き方です。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(loafers:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(loafers:1.2\\)\` と書きます。NovelAI の強調は \`{loafers}\` と \`[loafers]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは公式ドキュメントを確認してください。

一枚につき、靴の種類を一つ、色を一つ、見せ方を一つです。ローファーとスニーカーとブーツを同じ強さにすると、左右で違う靴になります。比較は、服と立ち位置を固定して、靴の名詞だけを差し替えます。`,
      },
      {
        title: '靴の種類',
        content: `種類は、履き口の高さと、留め方で分けます。色を先に強くすると、白い塊だけが残って、ひもか帯かが分からなくなります。

| 種類 | 書き方 | 手がかり |
|---|---|---|
| 運動靴、スニーカー | \`sneakers\` | 低い履き口。ゴムの底 |
| ハイカット | high-top sneakers | 自然な英語。足首まで覆う |
| ローファー | \`loafers\` | ひもが無い革靴。仕事か外出の大人 |
| パンプス | \`pumps\` | かかとは低めか中くらい。高いピンは書かない |
| ストラップ | \`mary janes\` | 甲に一本の帯。長いスカートと合わせる |
| アンクルブーツ | \`ankle boots\` | 足首まで |
| ニーブーツ | knee-high boots | 自然な英語。膝まで。それより上は書かない |
| 仕事靴 | \`work boots\` | 厚い革。ひも |
| コンバットブーツ | \`combat boots\` | 頑丈なひも靴。膝より下 |
| 長靴 | \`rain boots\` | 雨の街。色は一つ |
| サンダル | \`sandals\` | 街の歩行。帯は一つ |
| スリッパ | \`slippers\` | 室内の廊下。部屋の奥の家具は書かない |
| 下駄 | \`geta\` | 和装の大人。歯は低い |
| 草履 | \`zori\` | 和装の礼装寄り |
| 厚底 | \`platform shoes\` | 底の厚みは横から見える |

パンプスのかかとは、低いか、中くらいかを一つにします。極端に細い高いかかとは、このページでは使いません。膝より上まで筒が続くブーツも書きません。筒は膝までで止めます。

仕事のメイド服と合わせる靴は、甲に帯のある低い靴か、低いかかとのパンプスです。長いドレスの裾より下に、両足が見えるようにします。暗い色の厚底は、黒いロングスカートとカーディガンの成人の街着に合わせます。短い丈にはしません。

ローファーは、オフィスか、街の外出の大人の靴です。建物の中だけで履き替える布の靴は書きません。

**ローファー。仕事の成人**

\`\`\`
1 adult man, adult, suit jacket, white shirt, necktie, trousers,
loafers, standing, full body, shoes visible, from the side,
office lobby, soft daylight, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, mismatched shoes, text, logo
\`\`\`

**厚底のブーツ。長いスカート**

\`\`\`
1 adult woman, adult, cardigan, long black skirt,
black platform boots, standing, full body, shoes visible, from the side,
city sidewalk, soft daylight, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, short skirt, text, logo
\`\`\`

ハイカットが普通のスニーカーに戻るときは、high-top が文の後ろに落ちています。靴の語を服の直後へ移し、低い履き口の語が残っていれば消します。ニーブーツが足首で止まるときは、スカートやコートが靴を隠しています。裾を膝上で止めず、靴の筒が横から見える立ち位置に戻してください。`,
      },
      {
        title: '素材と色',
        content: `素材は一つ、色は一つです。革と布とゴムを同じ強さにすると、表面がまだらになります。色を三色にすると、左右で違う靴に見えやすくなります。

革は leather、布地の運動靴は canvas、起毛は suede、長靴は rubber と自然な英語です。公式タグとしては断定しません。光沢を強くすると、床まで鏡になって、靴の輪郭が溶けます。光沢は、かかとか、つま先の一方だけにします。

色は、黒、茶、白、のどれかから始めます。二足目の色を変える比較では、形と素材を固定します。白いスニーカーの日に、茶の革を残すと、ひもが茶で胴が白の混成になります。

厚底の厚みは、横から見える底の高さです。底を画面の正面へ向ける語は使いません。横からの全身で、床と靴のあいだに厚い層が見えれば足ります。底の溝を詳しく書きすぎると、溝がひもに化けます。溝は書かず、厚みだけにします。

| 素材と色 | 書き方 | 注意 |
|---|---|---|
| 革 | leather shoes | 自然な英語。色は一つ |
| 布 | canvas sneakers | 自然な英語。印は書かない |
| 起毛 | suede loafers | 自然な英語。光沢は足さない |
| ゴム | rubber rain boots | 自然な英語。色は一つ |
| 厚み | thick platform, from the side | 自然な英語。底は正面へ向けない |

**白い運動靴。布**

\`\`\`
1 adult woman, adult, jacket, long pants, canvas sneakers, white,
standing, full body, shoes visible, from the side,
park path, soft daylight, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, logo, text
\`\`\`

**茶の革のローファー**

\`\`\`
1 adult woman, adult, blouse, long skirt, brown leather loafers,
standing, full body, shoes visible, from the side,
simple background, soft daylight, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, mismatched shoes, text, logo
\`\`\`

白が灰色に濁るときは、床の色と靴の色が同じです。床を薄い灰色以外にするか、靴を黒に変えて、境界を残します。境界が無い枚でひもだけを直しても、靴の形は戻りません。まず色の境目を一つ作ってください。

素材を変える日は、色を固定します。黒の革が黒の布に見えるときは、leather が後ろに落ちているか、canvas が残っています。残った布の語を消して、革を靴の名詞の直前へ置きます。起毛は光を弱くした枚でだけ使います。光沢の語が残ったスエードは、表面がプラスチックの塊になります。長靴のゴムは、しわを一本までにして、しわを何本も書かないでください。しわの線がひもとして数えられ、長靴なのに結ぶ靴になります。色の名前は、靴の語の直前に一つだけ置きます。髪の色や、コートの色と同じ単語を靴にも使うと、境界が髪や裾へ移ります。靴は黒、コートは紺、のように、隣の布と一段階ずらしてください。`,
      },
      {
        title: '靴を画面に残す',
        content: `靴が切れる原因は、構図が胸から上になっていることです。靴を見せる枚は、全身、立っている、靴が見える、横から、の四つをセットにします。この四つを別々の日に足すと、どれが効いたのかが残りません。最初の一手は、この四つを一緒に置き、服は既に決まっているものに固定します。

座った姿勢は、膝で靴が隠れやすいです。このページの見本は立ち姿です。歩く枚でも、両足が地面に接している瞬間にします。片足が画面の外に出る語は使いません。

横からは、左右の形が比較できます。正面からだと、靴が短く見えて、種類が残らないことがあります。種類を決める日は横、色を確認する日も横、と固定します。正面の肖像は、靴が目的ではない枚へ回してください。

足元を大きく寄せた構図は使いません。寄せると、靴ではなく足の形が主題になります。全身の中で、靴が読める距離で止めます。

| 見せ方 | 書き方 | 外すもの |
|---|---|---|
| 全身 | \`full body\` | 胸から上 |
| 立つ | \`standing\` | 座って隠れる姿勢 |
| 靴が見える | shoes visible | 自然な英語。裾で隠さない |
| 横 | from the side | 自然な英語。正面の肖像と混ぜない |

**横からの全身。アンクルブーツ**

\`\`\`
1 adult woman, adult, coat, long skirt, ankle boots,
standing, full body, shoes visible, from the side,
street, overcast, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, upper body, text, logo
\`\`\`

**下駄。和装の成人**

\`\`\`
1 adult woman, adult, kimono, obi, geta, white tabi,
standing, full body, shoes visible, from the side,
shrine path, soft daylight, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, loafers, text
\`\`\`

裾が靴を隠すときは、スカートを長くしたまま、立ち位置を横に変えます。丈を短くして靴を出そうとしないでください。このページは、長い服の下から靴が見える書き方です。和装で革靴が残るときは、前のファイルの loafers を消して、geta を帯の直後に置きます。帯の書き方を増やす日は、着物のページへ戻ってください。

横からの全身でも、手前の足だけが大きく、奥の足が消えることがあります。消える原因は、歩き方を大きく指定したときです。このページの立ち姿は、両足がほぼ揃って地面についている状態にします。一歩を大きく前へ出す語は外してください。揃った立ち姿で左右が同じ形に見えてから、歩く枚を別ファイルで作ります。歩く枚でも、両方の靴が画面の中に残る距離で止め、膝で切れないことを先に確認します。確認の前に厚底へ変えると、切れた靴の底だけが厚くなって、種類の比較になりません。`,
      },
      {
        title: '靴だけの商品写真',
        content: `商品写真には人を置きません。人数の語が残ると、靴の横に膝が出ます。背景は無地。印と文字は書きません。左右は同じ形、同じ色、同じ向きです。片足だけを大きく前に出す構図は、左右の確認ができないので使いません。

見せる面は、横です。底をカメラに向ける語は入れません。ひもがある靴は、ひもが一本につながって見える横を選びます。ほどけたひもを主題にすると、ひもが地面の線と溶けます。商品写真のひもは、結ばれた状態です。

ペアで置きます。一足が二足に増えるときは、pair を one pair に言い換えます。数を書かない複数形は、モデルによって増えることがあります。

| 写真 | 書き方 | 入れないもの |
|---|---|---|
| 無地 | plain background | 自然な英語。街と室内を同時に書かない |
| 横 | side view of shoes | 自然な英語。底は向けない |
| 一足 | one pair | 自然な英語。増えたら数を明示して一つに戻す |
| 印なし | no logo, no text | メーカー名も書かない |

**ローファーの一足。人はいない**

\`\`\`
one pair of brown leather loafers, side view, both shoes matching,
plain light background, studio product photo, no people, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, logo, letters, text, extra shoes
\`\`\`

**長靴の一足。人はいない**

\`\`\`
one pair of yellow rubber rain boots, side view, both shoes matching,
plain background, studio product photo, no people, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, logo, text, extra shoes
\`\`\`

印が出るときは、靴の側面に線の模様を足していないかを見ます。線が文字として読まれることがあります。側面は無地に戻し、ネガティブの text と logo を残します。影がもう一足に見えるときは、光源を一つにして、床の反射の語を消します。反射を強くするほど、下にもう一足生えます。`,
      },
      {
        title: '服と合わせる',
        content: `靴は、服が決まってから一つ足します。同じ日にコートの種類と靴の種類を変えると、丈が違って見えても、どちらのせいなのかが残りません。服を変える日は服装のページ、靴を変える日はこのページ、と分けます。

冬のコートには、アンクルブーツか、膝までのブーツを一つ。雪の降り方そのものは [雪・冬のプロンプト](/guides/snow-winter-prompt-guide) です。このページでは、雪を弱く置くか、置かずに、靴の形を見ます。パーカーには運動靴を一つ。パーカーのフードと、靴を同じ強さで実験しないでください。

仕事のスーツにはローファーか、ひものある革靴を一つ。パンプスを合わせるときは、スカートは膝より下です。和装には下駄か草履の一方。メイドの長いドレスには、甲に帯のある低い靴を一つ。

室内のスリッパは、廊下か、玄関の土間で、立っている大人に履かせます。寝具のある部屋や、横になる姿勢は書きません。部屋の家具を描き込むときは [部屋のプロンプト](/guides/room-prompt-guide) です。このページの室内は、靴が見える床だけです。

| 服 | 靴 | 固定するもの |
|---|---|---|
| コート | ankle boots か knee-high boots | コートの種類 |
| パーカー | \`sneakers\` | フードの状態 |
| スーツ | \`loafers\` | ネクタイ |
| 着物 | \`geta\` か \`zori\` | 帯 |
| 長いメイド服 | \`mary janes\` | 長いドレス |

**冬のコートとブーツ**

\`\`\`
1 adult woman, adult, long coat, scarf, trousers, knee-high boots,
standing, full body, shoes visible, from the side,
quiet street, overcast, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, sneakers, text, logo
\`\`\`

**メイドの長いドレスと、甲の帯**

\`\`\`
1 adult woman, adult, maid outfit, long dress, apron, mary janes,
standing, full body, shoes visible, from the side,
simple indoor hall, soft daylight, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, short dress, text, logo
\`\`\`

スカーフの語は、首に巻く布です。靴の実験では、スカーフの柄を増やしません。柄が増えると、ブーツの色がそれに負けます。メイド服の部品を増やす日は、メイド服のページを開いて、このページからは靴の一語だけを持っていきます。`,
      },
      {
        title: '街と仕事と雨',
        content: `場所は一つです。街、オフィス、雨の道を同じ強さにすると、床がタイルで空が曇る、中間の画面になります。

雨の日は、長靴と、閉じたコートと、傘を一つまでです。傘と鞄とカップを同時に持たせると、手が溶けます。水たまりは地面の反射として弱く書き、服が水を吸った状態の語は使いません。雨粒は背景です。

仕事のロビーは、床が平らで、看板が無い場所にします。受付の文字や、会社の名前は書きません。文字は靴の側面にも移ります。

街は、歩道と、低い建物の壁で足ります。店の看板を書くと、靴より文字が優先されることがあります。

| 場所 | 靴 | 持たないもの |
|---|---|---|
| 街 | \`sneakers\` か platform boots | 看板の文字 |
| 仕事 | \`loafers\` | 受付の文字 |
| 雨 | \`rain boots\` | 水を吸った服の語 |

**雨の街。長靴**

\`\`\`
1 adult man, adult, raincoat, long pants, rubber rain boots,
standing, full body, shoes visible, from the side,
rainy street, overcast, one umbrella, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, text, logo
\`\`\`

**文章の例。仕事の成人とローファー**

\`\`\`
A full-body photo of 1 adult woman standing in an office lobby, seen from the side.
She wears a blouse, a long skirt, and brown leather loafers. Both shoes are visible and match.
Soft daylight, no text, no logo, and no extra people.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, cropped feet, text, logo
\`\`\`

ChatGPT や Gemini や、FLUX のように文章で書くときは、誰が成人か、全身か、横からか、靴の種類と色、左右が同じか、文字を入れないか、をこの順で残します。画面の名前はバージョンによって違います。2026年11月時点でも、ボタンの表示が違うことがあります。最新の手順は公式ドキュメントを確認してください。

通った文章は、タグのファイルへ翻訳して別に保存します。文章のままタグ欄へ貼ると、文の後半の場所だけが残って、靴が切れます。

翻訳するときは、靴の種類、色、素材、全身と横、場所、の五行に戻します。文章の中の雰囲気の形容は、一行だけ残してほかは捨てます。形容を全部タグにすると、靴より空気の語が勝って、足元が小さくなります。小さくなった枚は、商品写真の寄りではなく、失敗です。商品写真は人がいない別ファイルで、人がいる枚は全身の横に戻してください。戻すときに、文章で足した場所の看板が残っていないかも見ます。看板は文字になるので、タグ側では最初から書きません。`,
      },
      {
        title: '靴が切れる、左右が違うとき',
        content: `靴が切れるときは、胸から上の語と、寄りすぎの語を外し、全身と横を残します。裾を短くして解決しないでください。左右が違うときは、種類を一つに減らし、色を一つにします。片方だけ別の色、という指定は、このページでは使いません。確認が終わってから、意図した違いを足したい場合でも、まずは同じ一足で三枚そろえてください。

ひもが溶けるときは、ひもの本数を増やさず、結ばれた横顔に戻します。ほどけた状態、二重に巻いた状態、リボンを大きくした状態は、別の日です。商品写真で文字が出るときは、側面の模様を無地に戻します。

| 崩れ | まず外すもの | 残すもの |
|---|---|---|
| 足元が切れる | 上半身だけの構図 | 全身、横、靴が見える |
| 左右が違う | 二つ目の種類、二つ目の色 | 種類一つ、色一つ |
| ひもが溶ける | ほどけた指定 | 結ばれた横 |
| 印が出る | 側面の線、メーカー名 | 無地と、text のネガティブ |

今日の起点は、種類一つ、色一つ、全身の横です。服を変える枝と、場所を変える枝は分けます。同じ枝でコートをロングにしながら靴を厚底へ変えると、丈の変化と底の厚みが同時に動いて、どちらが画面を変えたのかが残りません。

直した枚を次の入力に使うときは、切れた足首が残っていないかを見ます。切れた絵の上に色だけを塗り替えても、靴は戻りません。戻り先は、全身が納まっている見本です。見本の名前を、ローファー、厚底、長靴、商品、のように保存しておくと、翌日にどのファイルを開くかが残ります。`,
      },
    ],
    faq: [
      {
        q: '服装のページとどう分けますか',
        a: 'このページは、スニーカー、ローファー、ブーツ、厚底、下駄など、足元の種類です。服の並びの全体は服装のページに残し、こちらでは靴を一つだけ差し替えます。',
      },
      {
        q: '靴が画面の外に切れます',
        a: '全身、立っている、靴が見える、横から、をセットで書きます。胸から上の指定を消してください。裾を短くして靴を出そうとしないでください。',
      },
      {
        q: '左右の靴が違います',
        a: '種類を一つ、色を一つに戻します。ローファーとスニーカーを同じ文に残すと、左右で別の靴になります。三枚そろうまで、違いは足しません。',
      },
      {
        q: '厚底が普通の靴になります',
        a: 'platform shoes を服の直後へ移し、横から底の厚みが見える立ち位置にします。底をカメラの正面へ向ける語は使いません。',
      },
      {
        q: '商品写真に文字や印が出ます',
        a: 'メーカー名と側面の線を消し、ネガティブに text と logo を残します。人の語が残っていると膝が出るので、商品の枚では人数も消します。',
      },
      {
        q: '和装の履物はどちらですか',
        a: '下駄か草履の一方です。帯や袖の種類は着物のページ、このページでは履物を一つだけ見ます。洋装の革靴の語は、和装の枚では消してください。',
      },
    ],
  },
  "magic-prompt-guide": {
    sections: [
      {
        title: '魔法は詠唱と形を一つ',
        content: `「魔法 プロンプト」「魔法の杖 プロンプト」「炎の魔法 プロンプト」「氷 魔法 プロンプト」「手から魔法 プロンプト」で探しているのは、唱えている姿勢と、光の形と、属性です。検索では、杖、エフェクト、風、氷、炎、雷、手から出る光、ファンタジーの衣装が一緒に出ます。

このページは、詠唱と、属性と、杖を担当します。粒子や煙やキラキラなど、効果全般の名前は [エフェクトのプロンプト](/guides/effect-prompt-guide) です。役割は一行で分けます。エフェクトのページは画面に乗る効果の一覧、このページは魔法を唱える場面です。ローブや帽子の部品は [ファンタジー衣装プロンプト](/guides/fantasy-outfit-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide)、指の崩れは [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。

人がいる枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、\`adult\` を残します。光だけ、円だけ、の枚には人数を書きません。服は長いローブ、マント、長袖の服のように、閉じた衣装です。実在の作品の呪文名、キャラクター名、作者名は書きません。円の中に文字は書かせません。

2026年11月時点の書き方です。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(magic circle:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(magic circle:1.2\\)\` と書きます。NovelAI の強調は \`{magic circle}\` と \`[magic circle]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。縦長を文末の \`--ar\` で足せるツールがあります。使えるかは公式ドキュメントを確認してください。

一枚につき、姿勢を一つ、光の形を一つ、属性を一つです。炎と氷と雷を同じ強さにすると、手が三色の平均になります。比較は、ローブと立ち位置を固定して、属性の名詞だけを差し替えます。`,
      },
      {
        title: '詠唱の姿勢',
        content: `姿勢は一つです。片手を前に出す、杖を両手で持つ、本を開く、は同時に使いません。三つを書くと、腕が増えます。最初の一手は、casting spell と、手の位置を一つ、です。公式タグとしては、長い句を断定しません。効かなければ、手を前に出す、という短い自然な英語へ戻します。

立つ位置は、足が地面についている立ち姿です。ジャンプや、地面に倒れる姿勢は書きません。戦闘の相手を同じ画面に置くと、人数が増えて、光が二人のあいだで平均になります。このページの見本は、唱える人一人です。

指は、開くか、杖を握るか、です。開いた指と、握った杖を同じ手に書くと、指の数が崩れます。指の実験は、光が顔にかかっていない枚で行います。

| 姿勢 | 書き方 | 持たないもの |
|---|---|---|
| 唱える | \`casting spell\` | 二つ目の動作 |
| 手を前へ | hand extended forward | 自然な英語。杖とは別の枚 |
| 杖を両手で | holding a staff with both hands | 自然な英語。本は持たない |
| 短い杖を片手で | holding a wand | 自然な英語。もう一方の手は空 |

**手の上の光。杖は無い**

\`\`\`
1 adult woman, adult, long robe, long sleeves,
casting spell, hand extended forward, glowing orb above the palm,
standing, full body, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra fingers, staff, text
\`\`\`

**両手で長い杖**

\`\`\`
1 adult man, adult, long robe, cloak,
casting spell, holding a staff with both hands, soft glow at the staff tip,
standing, full body, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra arms, extra fingers, spellbook, text
\`\`\`

光が手から離れて顔の前に浮かぶときは、orb の位置を掌の上、と書き直します。位置を書かない glowing は、目や髪まで光ります。杖の先の光と、掌の玉を同じ枚に残さないでください。光源が二つになると、影の向きが平均になります。`,
      },
      {
        title: '光の形',
        content: `形は一つです。玉、円、手から伸びる筋、粒子、体のまわりの淡い光、のどれかを選びます。二つを同じ強さにすると、円が粉になって、玉が消えません。

玉は、掌の上のまとまった光です。円は、床か、体の前の幾何学です。円の中の文字、読める記号、作品名は書かせません。筋は、伸ばした手から前方へ一つです。人に当てる描写や、傷の描写は書きません。筋は空中で終わります。粒子は、手のまわりの小さな点で、顔にはかけません。淡い光は、ローブの外側を細く縁取る程度です。画面の全面を光らせると、衣装の色が消えます。

| 形 | 書き方 | 置く場所 |
|---|---|---|
| 玉 | glowing orb | 掌の上 |
| 円 | \`magic circle\` | 床か、体の前。文字は無い |
| 筋 | beam of light from the hand | 自然な英語。前方の空中で終わる |
| 粒子 | magical particles | 自然な英語。手のまわり |
| 淡い縁 | soft aura | 自然な英語。顔にはかけない |

エフェクトのページにある、火花や煙や漫画の記号は、このページの詠唱が三枚そろってから、一つだけ借りてきます。同じ日にハートや集中線を足すと、魔法の形が記号に負けます。

**床の円。人は唱えている**

\`\`\`
1 adult woman, adult, long robe, long sleeves,
casting spell, standing, glowing magic circle on the floor,
full body, dim room, one window, no text, no letters
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, letters, runes, text
\`\`\`

**手から前方への筋**

\`\`\`
1 adult man, adult, long robe,
casting spell, hand extended forward, beam of light from the hand,
standing, full body, night sky, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, beam covering face, text
\`\`\`

円が楕円の落書きになるときは、magic circle を人数の直後へ移し、粒子を一度消します。円ができてから、粒子が要る枚だけ戻します。筋が顔を横切るときは、手の高さを胸より下に書き、筋は水平に前方へ、と足します。上へ向けた筋は、顔の前を通りやすいです。

光だけの枚を作るときは、人数を消して、床の円か、空中の玉かを一つにします。人のタグが残った光だけの枚は、端に手が生えます。`,
      },
      {
        title: '属性',
        content: `属性は一つです。炎、氷、雷、風、水、光、闇、大地を表にします。今日使う行は一つです。炎と氷を同じ文に置くと、手がどちらでもない白い炎になります。比べるときは、ファイルを二つにして、ローブと姿勢を固定し、属性の行だけを差し替えます。

色も属性に合わせます。炎は暖色を一つ、氷は淡い青を一つ、雷は短い火花で、画面の全面を白くしません。風は、葉か布が巻く様子で見せ、色を付けるなら緑を弱く一つです。水は、掌の上のまとまった水の玉か、まわりの滴です。滴を顔に飛ばす語は使いません。光の属性は、柔らかい白い縁で、闇は手のまわりの暗い霧です。画面の全部を黒くすると、ローブが消えます。大地は、小さな石が掌のそばに浮くか、足元の塵が巻くか、です。岩を人の大きさにすると、背景の山になります。

| 属性 | 書き方 | 色 |
|---|---|---|
| 炎 | \`fire magic\` | 暖色を一つ。顔にはかけない |
| 氷 | \`ice magic\` | 淡い青。結晶は手のそば |
| 雷 | \`lightning magic\` | 短い火花。全面を白くしない |
| 風 | \`wind magic\` | 葉か布が巻く。緑は弱く |
| 水 | \`water magic\` | 掌の玉。滴は顔に飛ばさない |
| 光 | light magic | 自然な英語。柔らかい白い縁 |
| 闇 | dark magic mist | 自然な英語。手のまわりの霧。画面全体は消さない |
| 大地 | \`earth magic\` | 小さな石。人より大きくしない |

**炎。掌の上**

\`\`\`
1 adult woman, adult, long robe, long sleeves,
casting spell, hand extended forward, fire magic, small flame above the palm,
standing, full body, simple dark background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, flame covering face, ice, text
\`\`\`

**氷。手のそばの結晶**

\`\`\`
1 adult man, adult, long robe, long sleeves,
casting spell, hand extended forward, ice magic, pale blue crystals near the hand,
standing, full body, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, fire, crystals covering face, text
\`\`\`

炎が服に燃え移って見えるときは、炎の語を掌の上に限定し、ローブの色を先に固定します。ローブがまだ決まっていない枚に炎を足すと、布の色が炎の色になります。氷の結晶が画面の枠まで増えるときは、crystals を near the hand に言い換えて、数を書きません。数を書かない複数は、モデルによって増えすぎることがあります。

風と水と大地は、形が見える小物で書きます。風は、落ち葉か、ローブの裾が一方へ寄る、です。人物の髪を大きく乱す語は、顔の輪郭まで動かすので、このページでは使いません。水は掌の上の一つの玉にして、波や滝にはしません。波は背景の海になり、詠唱が読めなくなります。大地の石は、掌より小さく三つまでに見える量で止め、数そのものは書きません。塵を画面の全面に巻くと、霧の背景と区別がつきません。塵は足元の狭い範囲だけです。雷は、手のそばの短い明るい線を一つにして、空の稲妻とは分けます。空の稲妻を足すと、光源が天候側に移って、手の詠唱が消えます。光の属性と闇の霧も、同時には使いません。白い縁と黒い霧を同じ手に置くと、手が輪郭ごと消えます。`,
      },
      {
        title: '杖と本',
        content: `杖は、長い杖か、短い杖かを一つにします。長い杖は両手、短い杖は片手です。両方を持つと、腕が三本になります。

長い杖は staff、短い杖は wand と自然な英語です。公式タグとしては断定しません。杖の先の飾りは一つ。水晶か、単純な金具か、です。両方を書くと、先が二股に見えます。文字の彫られた杖は、文字が崩れるので使いません。

本は、開いた魔導書です。spellbook と自然な英語で、表紙に題名は書かせません。杖と本は別の枚です。本を持つ枚では、もう一方の手は本を支えるだけにして、詠唱の光は本の上か、空いた空間の小さい玉にします。光を大きくすると、ページの形が消えます。ページに文字は出さない、とネガティブの text で抑えます。

| 道具 | 書き方 | 手 |
|---|---|---|
| 長い杖 | holding a staff with both hands | 両手。本は無い |
| 短い杖 | holding a wand in one hand | 自然な英語。反対の手は空 |
| 魔導書 | open spellbook | 自然な英語。題名は書かない。杖は無い |

ファンタジー衣装のページでは、ローブと帽子と杖の部品を見ます。このページでは、そのローブを着たまま、どの光を唱えるかを見ます。帽子のつばが目を隠すときは、帽子を外して、ローブと杖だけに戻します。帽子の種類は [帽子のプロンプト](/guides/hat-prompt-guide) です。

**短い杖。片手**

\`\`\`
1 adult woman, adult, long robe, long sleeves,
casting spell, holding a wand in one hand, soft glow at the wand tip,
standing, full body, simple background, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra hands, staff, spellbook, letters, text
\`\`\`

**開いた本。杖は無い**

\`\`\`
1 adult man, adult, long robe,
holding an open spellbook, small glowing orb above the pages,
standing, full body, simple background, no text, no letters
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, staff, wand, letters, text
\`\`\`

杖がただの棒に戻るときは、holding a staff をローブの直後へ移し、本と円を外します。持っているものが一つだと、手の形は残りやすいです。本のページが白い四角になるときは、文字を書かせようとしていないかを見ます。題名の語を消し、ページは無地の紙として残します。無地で形が三枚そろってから、光の玉を弱く戻してください。`,
      },
      {
        title: '大人の魔法使いと、書庫',
        content: `衣装は長いローブを起点にします。現代のコートと、鎧と、ローブを同じ強さにすると、袖が平均になります。現代の外着はコートのページ、鎧の部品はファンタジー衣装のページです。このページの人は、ローブを着た成人です。

場所を書くときは、塔の書庫か、石の廊下か、夜の空き地かを一つにします。講義の部屋としては書きません。書庫は、高い本棚と、床の円が一つ、です。本の背に題名は書かせません。机の上の道具は、本か、杖かを一つにします。瓶を三色並べると、ローブの色が瓶に負けます。

背景だけの書庫には、人を置きません。円と棚だけで、詠唱の光の位置を先に決めたいときのファイルです。人を足す日は、この節の人ありの見本を使います。

| 場所 | 書き方 | 人 |
|---|---|---|
| 塔の書庫 | arcane library, tall bookshelves | 自然な英語。題名は書かない |
| 石の廊下 | stone corridor | 自然な英語。窓は一つ |
| 夜の空き地 | night clearing | 自然な英語。森の種類は森のページ |
| 円だけ | magic circle on the floor | 人を置かない枚 |

森そのものの樹種は [森のプロンプト](/guides/forest-prompt-guide) です。このページの空き地は、詠唱の背景として短く置くところまでです。

**書庫で唱える成人**

\`\`\`
1 adult woman, adult, long robe, long sleeves,
casting spell, glowing magic circle on the floor,
arcane library, tall bookshelves, standing, full body, no text, no letters
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, letters, modern clothes, text
\`\`\`

**円と棚。人はいない**

\`\`\`
arcane library, tall bookshelves, one magic circle on the floor,
dim warm light, no people, no text, no letters
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, text
\`\`\`

本棚の背が文字で埋まるときは、題名を正向から消し、本は色の帯として置きます。円が棚の模様に溶けるときは、円を床に限定し、棚の装飾の語を消します。石の廊下で窓が三方向になるときは、窓を一つに戻します。光が多方向だと、ローブの色が平均になります。

書庫の高さを出したいときは、棚を上下に長くし、本の冊数は書きません。冊数を書くと、数字が背表紙に出ることがあります。床の円は棚の前の床に一つ、人は円の外に立ちます。円の中に足を置く指定と、円の外に立つ指定を同時にすると、足が線に溶けます。このページの見本は、円のそばに立つ、までです。廊下の枚では、奥へ続く床の線を一つ残し、分岐する通路は書きません。分岐は、人がどちらへ歩くかの話になって、光の形が脇役になります。夜の空き地は、木を左右の枠にして、中央に人と光を残します。樹種を増やしたい日は、森のページへ移って、魔法の語は持っていかないでください。`,
      },
      {
        title: '色と明るさの制御',
        content: `光の色は一つです。属性の色と、ローブの色を同じ語にすると、境界が消えます。ローブは紺か茶、光は青か暖色、のように、隣り合う色をずらします。金の光と金のローブを同時に強くすると、全身が一つの金属面になります。

明るさは、顔が読めるところまでです。玉を大きくすると、顔が隠れます。大きくしたいときは、玉を手の側へ下げ、顔から離します。重みで光だけを上げるときも、目安の 1.1 から 1.3 を一つ超えて重ねません。上げても顔が白いままなら、重みは戻して、玉の位置を変えます。

夜の背景は、空を暗くし、人の顔には弱い環境光を一つ残します。環境光と、魔法の光を同じ強さにすると、どちらが属性の色なのかが残りません。魔法の色は手のそば、顔の読める明るさは別の弱い光、と分けます。

ChatGPT や Gemini や、FLUX のように文章で書くときは、成人、長いローブ、どの手にどの形の光があるか、属性の色、顔に光をかけないこと、文字を入れないこと、をこの順で書きます。画面の表示名はバージョンによって違います。2026年11月時点でも違うことがあります。最新の手順は公式ドキュメントを確認してください。

**文章の例。氷の玉**

\`\`\`
1 adult woman in a long robe with long sleeves stands full body and casts a spell.
A pale blue orb of ice magic floats just above one open hand. Her face stays clear of the glow.
Simple dark background, no text, no letters, no extra people.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra fingers, flame, text, letters
\`\`\`

**粒子だけ。人はいない**

\`\`\`
magical particles in one shade of green, floating in a dark empty space,
soft points of light, no people, no text, no letters
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, text
\`\`\`

粒子だけの枚は、効果の形を決めるためのファイルです。人を足すときは、粒子の色を一つ残して、人数の行を先頭に足します。色を三色に増やしてから人を足すと、顔に粒子が貼りつきます。エフェクトのページで煙や火花を借りるときも、属性は一つに固定したままにしてください。

色を記録するメモは、ローブの色、光の色、背景の色、の三行です。三行のうち、動かすのは一行です。氷の青を濃くする日は、ローブを紺のまま固定し、背景も同じ暗さにします。三行を同時に明るくすると、画面が白飛びした原因が光なのか背景なのかが残りません。白飛びした枚は保存せず、光を掌の大きさに戻した起点からやり直します。起点には、顔が読めることと、光が手か床にあることが残っています。`,
      },
      {
        title: '光が顔を隠し、手が崩れるとき',
        content: `光が顔を隠すときは、光の形を一つに減らし、位置を手か床へ下げます。顔の前を横切る筋、頭を包む光、画面の全面の白、を外します。外しても白いときは、glowing の重みを戻し、ローブの色を先に三枚そろえます。色が決まってから、光を弱く戻します。

手が崩れるときは、持ち物を一つにします。杖と本、開いた指と握った杖、花束と杖、は同時に残しません。指の本数そのものの直し方は、手のページです。このページからは、唱える姿勢を一つだけ持っていき、属性の語は一度外します。属性を持ったまま指を直すと、結晶や炎が指として数えられます。

円の中に文字が出るときは、記号や題名を正向から消し、ネガティブに letters と text を残します。文字を「読めない古代語」と書いても、モデルは文字の形を出そうとします。古代語の指定も消し、円は線だけの幾何学に戻します。

| 崩れ | まず外すもの | 残すもの |
|---|---|---|
| 顔が隠れる | 顔の前の光、二つ目の形 | 手か床の光一つ |
| 指が増える | 二つ目の持ち物 | 姿勢一つ。属性は一度外す |
| 円に文字 | 題名、記号の指定 | 線だけの円 |
| 属性が混ざる | 二つ目の属性 | ローブと、属性一つ |

今日の起点は、成人、長いローブ、姿勢一つ、光の形一つ、です。属性を変える日は、形を固定します。形を変える日は、属性を固定します。同じ日に炎へ変えて、さらに円を足すと、手が白い理由が二つになります。

直した枚を次の入力に使うときは、顔にかかった光が残っていないかを見ます。残った光の上に色だけを変えても、顔は戻りません。戻り先は、光が手の上にある見本です。見本の名前を、玉、円、炎、氷、杖、書庫、のように保存しておくと、翌日にどのファイルへ戻るかが残ります。`,
      },
    ],
    faq: [
      {
        q: 'エフェクトのページとどう分けますか',
        a: 'このページは、詠唱、属性、杖、手から出る魔法です。粒子や煙やキラキラの効果全般はエフェクトのページです。詠唱が三枚そろってから、効果を一つだけ借りてください。',
      },
      {
        q: '炎と氷は同時に書けますか',
        a: '同じ強さでは書きません。比べるときはファイルを分け、ローブと姿勢を固定して、属性の行だけを差し替えます。',
      },
      {
        q: '杖と本を両方持てますか',
        a: '同時には持ちません。長い杖は両手、本の枚では杖を消します。持っているものが一つだと、指が残りやすいです。',
      },
      {
        q: '魔法が顔を隠します',
        a: '光の形を一つにし、玉は掌の上、円は床、筋は顔より下から前方へ、と位置を書きます。顔の前を横切る指定は外してください。',
      },
      {
        q: '手が崩れます',
        a: '持ち物を一つにしてから、手のページで指を直します。炎や結晶を残したまま指を数えないでください。結晶が指として数えられます。',
      },
      {
        q: '書庫が別の建物になります',
        a: '講義の部屋としては書きません。高い本棚と、床の円と、題名の無い本、で塔の書庫に戻します。現代の服の語が残っていたら消してください。',
      },
    ],
  },
  "car-vehicle-prompt-guide": {
    sections: [
      {
        title: '車は種類を一つ',
        content: `「車 プロンプト」「車内 プロンプト」「chatgpt 車 プロンプト」で探しているのは、車の形と、車の中と、写真の見せ方です。検索では、車内、車の中、ワゴン、蒸気機関車、高級に見える車、文章で頼む書き方、小さな模型が一緒に出ます。セダン、スポーツカー、バス、電車の室内も、同じ依頼に入ります。

このページは、乗り物の形と、車内と、模型を担当します。通りや建物の並びは [街のプロンプト](/guides/city-town-prompt-guide) です。役割は一行で分けます。街のページは道と店、このページは車両です。自分の写真を塗装済みの模型にする手順は [フィギュア化プロンプト](/guides/figure-ai-prompt-guide)、光の向きは [光・照明のプロンプト一覧](/guides/lighting-prompt-guide) です。

人のいない枚には人数を書きません。運転席や助手席、車のそばに立つ枚は大人だけです。\`1 adult woman\` か \`1 adult man\` から書き、二人なら \`2 adults\` を先に置きます。\`adult\` を残します。服はコート、シャツ、スラックス、ロングスカートのように閉じた日常着です。運転席ではシートベルトを付け、手はハンドルの上です。メーカー名、車種名、エンブレム、実在の鉄道の形式名は書きません。車体に絵や、既存のキャラクターは描きません。ナンバーや行き先の文字も書きません。

2026年11月時点の書き方です。バージョンによって表示名や仕様が違うことがあります。最新の手順は公式ドキュメント・README を確認してください。表の長い句は自然な英語で、公式タグとしては断定しません。モデルの配布ページに推奨の書き方があれば、それを優先してください。

重みは目安です。\`(sports car:1.2)\` のように、1.1 から 1.3 のあいだで一つだけ上げます。括弧を文字として残すモデルでは \`\\(sports car:1.2\\)\` と書きます。NovelAI の強調は \`{sports car}\` と \`[sports car]\` です。記号は [プロンプトの記号の意味](/guides/prompt-symbols-guide) です。LoRA は末尾の \`<lora:名前:0.6>\` だけにします。横長を文末の \`--ar\` で足せるツールがあります。使えるかは公式ドキュメントを確認してください。

一枚につき、乗り物を一つ、見せ方を一つ、場所を一つです。セダンとバスと機関車を同じ強さにすると、屋根の上に煙突が生えます。比較は、色と角度を固定して、種類の名詞だけを差し替えます。`,
      },
      {
        title: '乗り物の種類',
        content: `種類は、屋根の形と、車輪の数と、長さで分けます。色を先に強くすると、赤い面だけが残って、セダンかワゴンかが分からなくなります。形が三枚同じに見えてから、色を一つ足してください。

印の無い、一般的な形だけを書きます。似ている有名な車へ寄せる名前は使いません。高級に見せたいときは、長いセダン、暗い塗装、余分な飾りが無い、までです。エンブレムの枠は書きません。空いたグリルは無地です。

| 種類 | 書き方 | 手がかり |
|---|---|---|
| セダン | \`sedan\` | 屋根、車室、荷室が三段に見える |
| スポーツカー | \`sports car\` | 車高が低い。印は無い |
| 高い車 | \`suv\` | 車高が高い。屋根が水平 |
| ワゴン | \`station wagon\` | 屋根が荷室まで長い |
| 小さい車 | compact car | 自然な英語。全長が短い |
| 古い車 | \`vintage car\` | 丸い屋根。特定の年代の形式名は書かない |
| トラック | \`box truck\` | 荷台は無地。社名は書かない |
| バス | \`city bus\` | 行き先の文字は書かない |
| 蒸気機関車 | \`steam locomotive\` | 黒い車体、白い蒸気、動輪。形式名は書かない |
| 電車の室内 | \`train interior\` | 座席と手すり。路線名は書かない |
| オートバイ | \`motorcycle\` | 印は無い。人が乗るならヘルメット |

蒸気機関車は、黒い車体、大きな動輪、煙突から白い蒸気、です。国や鉄道会社の形式番号は書きません。番号は文字として崩れます。電車の室内は、座っている人を置く枚と、空の車両の枚を分けます。オートバイは、車体だけの枚と、ヘルメットをかぶった成人が乗る枚を分けます。

**低いスポーツカー。印は無い**

\`\`\`
generic sports car, low body, dark paint, no emblem, no logo,
side view, studio, plain background, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, logo, emblem, letters, text, brand name
\`\`\`

**蒸気機関車。形式名は無い**

\`\`\`
steam locomotive, black metal body, large driving wheels, white steam,
rural railway track, daytime, side view, no people, no text, no numbers, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, numbers, logo, text
\`\`\`

ワゴンがセダンに戻るときは、station wagon を先頭へ移し、トランクが短い語を消します。バスに行先の板が出るときは、路線名を正向から消し、板は無地のままにします。トラックの荷台に社名が出るときも同じです。無地に戻してから、色を一つだけ足してください。

古い車が特定の名車に似すぎるときは、その車を連想する固有名が残っていないかを検索します。残っていたら消し、丸い屋根と、別体のフェンダーと、印が無いこと、だけに戻します。

高い車とワゴンは、屋根の長さで分けます。高い車は、車高が上がり、屋根は短めの水平です。ワゴンは、屋根が後ろの荷室まで続きます。両方の名前を残すと、屋根が中間の長さになって、どちらでもなくなります。小さい車は、全長を短くする語を一つ足すだけで、デフォルメの頭身にはしません。丸く可愛くする語を足すと、模型のページの車と混ざります。実車の小さい車と、台座の模型はファイルを分けてください。バスは窓が横に並ぶことまでにして、窓の数は書きません。数を書くと、行先の板に数字が出ます。オートバイは二輪であることが分かる横顔にして、車の横に置かないでください。同じ画面に四輪と二輪があると、車輪の数が平均になります。`,
      },
      {
        title: '写真の見せ方',
        content: `見せ方は一つです。スタジオの商品写真、道を走る流れ、夜の街、を同じ強さにすると、床が無地で空が夜のネオンになります。

スタジオは、横から、無地の背景、印なし、です。人は置きません。反射は床に弱く一つ。反射を強くすると、下にもう一台生えます。

走る枚は、車体ははっきり、背景だけが流れます。車輪まで強く流すと、円が溶けます。止めて形を確認する枚と、流れを足す枚はファイルを分けます。流れの枚でも、車は一台です。対向車を足すと、台数が平均になります。

夜の街は、街灯を一つ、路面の反射を弱く、看板の文字は無し、です。街の建物を詳しく描く日は、街のページへ渡して、このページの車は一語だけ持っていきます。ネオンを三色にすると、車体の色が平均になります。光の色は一つです。

| 見せ方 | 書き方 | 残すもの |
|---|---|---|
| スタジオ | studio product photo, side view | 自然な英語。無地、印なし |
| 流れ | car body sharp, background motion blur | 自然な英語。車輪は溶かしすぎない |
| 夜の街 | night city street, one street light | 自然な英語。看板の文字は無い |

**スタジオのセダン。人はいない**

\`\`\`
generic sedan, side view, dark paint, no emblem, no logo,
studio product photo, plain background, soft light, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, logo, text, extra car
\`\`\`

**夜の街。車体は一台**

\`\`\`
generic car, night city street, one street light, dark road reflection,
car body sharp, no emblem, no logo, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, logo, text, extra car
\`\`\`

**道を走る。車体ははっきり、背景だけ流す**

\`\`\`
generic sports car, side view, car body sharp, background motion blur,
empty road, daytime, no emblem, no logo, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, warped wheels, logo, text
\`\`\`

流れを足して車輪が円でなくなるときは、この流れのファイルを閉じ、スタジオの横顔へ戻します。止めた形が三枚そろってから、背景の流れだけを弱く戻してください。車体までぼかす語は、流れの枚にも入れません。

夜の街で車体の色が消えるときは、街灯の色と車の色が同じです。車を暗い一色、灯を別の一色にずらして、境界を残します。灯を三色に増やす前に、一台の形が夜でも読めるかを見てください。読めない枚に看板を足しても、車は戻りません。看板は文字になるので、最初から書きません。スタジオの枚で床の反射が強いときは、反射の語を消して、車体の下に薄い影を一つ残します。影が無いと車が浮き、影が濃すぎると第二の車体に見えます。影は車体より淡く、形はコピーしない、と書いてください。`,
      },
      {
        title: '車内',
        content: `車内は、外の車体とは別のファイルです。外の写真の語を残すと、ボンネットの上に座席が貼りつきます。室内で書くのは、座席、ハンドル、窓、シートベルト、です。窓の外は、ぼかした街か、昼の道かを一つにします。外の建物を詳しく書くと、車内ではなく、街のページの画面になります。

運転席の人は大人一人です。シートベルトを肩にかけ、両手はハンドルの上です。片手で別の物を持たせません。杯や、画面のついた道具は書きません。助手席は、運転手が決まってから二人目として足します。二人の枚では、\`2 adults\` を先頭に置き、どちらもシートベルトです。後部座席を同じ強さにすると、人数が増えます。このページの見本は、前の席までです。

電車の室内は、自動車の車内と混ぜません。座席と、縦の手すりと、窓です。路線図と、行先の文字は書かない。人が座る枚は、コートを着た大人一人で、吊り革を一本だけ持ちます。吊り革と手すりと荷物を同時に強くすると、手が三つになります。

| 室内 | 書き方 | 人 |
|---|---|---|
| 運転席 | car interior, driver seat, seatbelt, hands on steering wheel | 自然な英語。大人一人 |
| 助手席 | passenger seat, seatbelt | 自然な英語。二人の枚だけ |
| 電車 | train interior, seats, vertical handrail | 自然な英語。文字は無い |

**運転席。シートベルト**

\`\`\`
1 adult man, adult, coat, shirt,
car interior, driver seat, seatbelt on, hands on the steering wheel,
daytime through the window, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra fingers, letters, logo, text
\`\`\`

**電車の室内。人はいない**

\`\`\`
train interior, rows of seats, one vertical handrail, windows,
daytime, empty car, no people, no text, no logo, no route map
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, letters, numbers, logo, text
\`\`\`

ハンドルの上で指が増えるときは、手の形を増やさず、両手をハンドルに添える、と短く戻します。指の本数そのものは [手・指のプロンプト一覧](/guides/hand-finger-prompt-guide) です。このページでは、手の位置をハンドルに固定するところまでです。窓に文字が映るときは、看板の語を消し、外はぼかした明るさだけにします。`,
      },
      {
        title: '車のそばの大人',
        content: `車の外に人が立つ枚は、車の種類が三枚そろってからです。人を先に詳しく書くと、車が背景の塊になります。人数は一人か、二人までです。もたれる枚は、閉じたドアに肩か腰が触れる立ち姿で、全身が入ります。ドアを開けた室内と、もたれる外観は混ぜません。

移動の場面は、ワゴンのそばに大人二人が立つか、一人が運転席に座って一人がドアの外に立つか、です。両方を同じ枚に書くと、座席と地面がつながります。この見本は、二人とも車の外に立ち、荷物は一つまでです。荷物に文字は書きません。

オートバイに乗る枚は、ヘルメット、ジャケット、長いズボン、ブーツです。顔の代わりにヘルメットを書くと、実在の人物へ寄りにくくなります。車体の印は無しです。

| 場面 | 書き方 | 人数 |
|---|---|---|
| もたれる | leaning on a closed car door | 自然な英語。一人。全身 |
| 移動の立ち姿 | standing beside a station wagon | 自然な英語。二人まで |
| オートバイ | motorcycle, helmet, jacket | 印は無い |

**ドアにもたれる。成人**

\`\`\`
1 adult woman, adult, coat, long skirt, boots,
leaning on a closed car door, generic sedan, no emblem,
standing, full body, daytime, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, logo, text
\`\`\`

**ワゴンのそば。二人**

\`\`\`
2 adults, 1 adult woman, adult, coat, long skirt,
1 adult man, adult, jacket, trousers,
standing beside a station wagon, closed doors, daytime road, full body,
no emblem, no text, no logo
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, logo, letters, text
\`\`\`

もたれた人の足が地面から浮くときは、standing と full body を戻し、車の高さを人より低くしないでください。スポーツカーの低い屋根に人を座らせる指定は、このページでは使いません。もたれるのは、ドアが閉じたセダンかワゴンです。屋根の上に人を乗せる語は消し、地面に両足がある立ち姿へ戻します。`,
      },
      {
        title: '文章で頼むとき',
        content: `ChatGPT や Gemini では、作りたい絵を文章で頼みます。2026年11月時点の公式ヘルプでも、文章で主題と場所と画風を書く案内があります。ChatGPT は <a href="https://help.openai.com/en/articles/11084440-images-in-chatgpt" rel="nofollow noopener" class="text-sky-600 hover:underline">Images in ChatGPT</a>、Gemini は <a href="https://support.google.com/gemini/answer/14286560" rel="nofollow noopener" class="text-sky-600 hover:underline">Gemini の画像生成</a> です。画面の名前は、バージョンによって違うことがあります。最新の手順は公式ドキュメントを確認してください。枚数の上限や、料金は書きません。各サービスの画面で確認します。

FLUX のように文章で書くモデルでも、同じ順です。成人か、人を置かないか。車の種類。印と文字が無いこと。横からか、車内か。光を一つ。固有の車種名は、文章の中にも入れません。

**文章の例。印の無いセダン**

\`\`\`
Create a studio photo of one generic dark sedan, seen from the side.
No brand name, no emblem, no logo, and no license plate text.
Plain background, soft light, no people.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, logo, letters, text
\`\`\`

**文章の例。運転席の成人**

\`\`\`
1 adult man sits in a car driver seat with a seatbelt on and both hands on the steering wheel.
He wears a coat. Daylight comes through the window. No logo, no text, and no extra people.
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
extra people, extra fingers, logo, text
\`\`\`

文章が通ったら、タグのファイルへ四行に分けて保存します。種類、見せ方、人の有無、禁止する文字、です。一文のままタグ欄へ貼ると、夜の街とスタジオが同じ強さで混ざります。人を置く文と、車だけの文は、会話もファイルも分けてください。同じ会話の前の車種名が残ると、次の無地の車に印が戻ることがあります。`,
      },
      {
        title: '模型とジオラマ',
        content: `小さな模型は、実車の写真とは別のファイルです。塗装済みの車の模型、無地の台座、単純な背景、印なし、です。箱にメーカー名は入れません。既存の作品の車も使いません。自分の車の写真を模型の商品写真に変える手順は、フィギュア化のページです。このページでは、写真が無くても成立する、一般的な模型の文を書きます。

ジオラマは、模型の車一台と、地面の要素を一つです。道の断片か、低い木を一つ、です。建物を三軒並べると、街の模型になって、車が小さくなりすぎます。人を添えるなら、塗装された成人の人形一人で、顔は単純にします。人形を詳しく書きすぎると、実写の人が模型の横に立ちます。

| 模型 | 書き方 | 入れないもの |
|---|---|---|
| 車の模型 | painted scale model of a generic car | 自然な英語。印なし |
| 台座 | plain display base | 自然な英語。文字は無い |
| ジオラマ | small diorama, one model car, one road section | 自然な英語。建物は増やさない |

**模型の車。人はいない**

\`\`\`
painted scale model of a generic sedan, side view, plain display base,
studio table, no emblem, no logo, no people, no text
\`\`\`

ネガティブ:

\`\`\`
${NEGATIVE_BODY}, ${NEGATIVE_AGE},
person, people, logo, letters, text
\`\`\`

模型の車輪が実車と同じ溶け方をするときは、流れの語が残っています。模型の枚では motion blur を消し、横から止めた形に戻します。台座に文字が出るときは、商品名を正向から消し、ネガティブに text を残します。フィギュア化のページで自分の写真を渡すときも、車種名とエンブレムは書かず、印は消す、と文に残してください。

模型の色を変える日は、車種の形を固定します。赤い模型と青い模型を同じ文に置くと、塗装が左右で割れます。一台につき色は一つです。台座の色は、車の色とずらします。同じ白にすると、車体の下端が台座に溶けます。ジオラマの地面も、車体と違う明度にして、境界を残してください。境界が無い枚で窓の色だけを直しても、どこまでが車なのかが戻りません。`,
      },
      {
        title: '車輪や文字や左右が崩れるとき',
        content: `車輪が歪むときは、流れの語を外し、横から止めた一台に戻します。円が三枚そろってから、背景だけを弱く流します。車輪のスポークを何本も書くと、本数が平均になって、さらに歪みます。スポークは書かず、円であることを残します。

ナンバーが文字化けするときは、板そのものを書かないか、無地の板とだけ書きます。地名や番号を正向に入れると、存在しない文字が並びます。ネガティブには text と letters と numbers を残します。行き先の板も同じです。

左右が非対称なときは、斜め前の強いパースを外し、真横か、正面の一方にします。斜めは、真横が安定してからにします。ヘッドライトを片方だけ詳しく書くと、もう片方が消えます。ライトは両方同じ、と短く書くか、書かないかです。

車体に絵が乗るときは、キャラクターやイラストの語が残っています。消して、無地の塗装に戻します。印の枠が残るときも、emblem と logo をネガティブに入れ、正向の飾りを消します。

| 崩れ | まず外すもの | 残すもの |
|---|---|---|
| 車輪が歪む | 強い流れ、スポークの本数 | 止めた横顔 |
| 文字が崩れる | 番号、地名、行先 | 無地。text はネガティブ |
| 左右が違う | 強い斜め、片方だけのライト | 真横か正面 |
| 絵や印が乗る | キャラクター、エンブレム | 無地の塗装 |

今日の起点は、種類一つ、真横、印なし、人なし、です。人を足す枝、流れを足す枝、模型の枝は分けます。同じ枝で夜の街に変えて、同時に模型の台座を足すと、大きさが平均になります。

直した枚を次の入力に使うときは、溶けた車輪が残っていないかを見ます。溶けた円の上に色だけを変えても、円は戻りません。戻り先は、スタジオの横顔です。見本の名前を、セダン、機関車、車内、模型、のように保存しておくと、翌日にどのファイルへ戻るかが残ります。`,
      },
    ],
    faq: [
      {
        q: '街のページとどう分けますか',
        a: 'このページは、車、車内、機関車、電車の室内、模型です。通りと建物の並びは街のページです。街を詳しく描く日は、車の名詞を一つだけ持っていきます。',
      },
      {
        q: '車種の名前は書きますか',
        a: '書きません。メーカー名、形式名、エンブレムは入れず、セダンやワゴンのように形で分けます。高級に見せるときも、長い無地のセダンまでです。',
      },
      {
        q: 'ナンバーが文字化けします',
        a: '番号と地名を正向から消し、板は無地にするか、書かないでください。ネガティブに text と letters と numbers を残します。',
      },
      {
        q: '車輪が歪みます',
        a: '流れの語を外して、横から止めた一台に戻します。円が安定してから、背景だけを弱く流します。車体までぼかさないでください。',
      },
      {
        q: 'ChatGPT ではどう頼みますか',
        a: '成人か人なし、車の形、印と文字が無いこと、横かか車内か、光を一つ、の順で文章にします。車種名は文章にも入れません。画面の名前は公式ヘルプで確認してください。',
      },
      {
        q: '模型と実車はどう分けますか',
        a: '模型は台座と、塗装された小さな車です。実車の流れや夜の街の語は模型のファイルに残しません。自分の写真から作る手順はフィギュア化のページです。',
      },
    ],
  },
}
