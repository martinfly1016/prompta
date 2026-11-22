import Link from 'next/link'
import { NEGATIVE_AGE } from '@/lib/guides/seo-batch-2026-10'

const NEGATIVE_LINE = `bad anatomy, bad hands, extra fingers, missing fingers, extra arms, extra legs, fused bodies, blurry, lowres, text, watermark, signature, ${NEGATIVE_AGE}`

const FAQ = [
  {
    q: 'シュミレーターとシミュレーターは、どちらが正しいですか？',
    a: 'このページの名前はシミュレーターです。検索ではシュミレーターという表記も並びます。同じツールを指しています。表記を重ねて繰り返す必要はありません。',
  },
  {
    q: '身長差メーカーと何が違いますか？',
    a: 'このページは、二人の身長と体型を動かして、同じ床の上のシルエットを見る場所です。身長差メーカーは、選んだ条件から英語のプロンプト文を組み立てる場所です。並びを見てから文が欲しいときは、メーカーへ戻ってください。',
  },
  {
    q: '無料で使えますか？',
    a: 'シルエットの確認は、ログインなしで動きます。写真から画像を生成するときだけ、1回1ポイントです。ログインすると、全ツール共通で3回分が一度付きます。プロンプト文だけが欲しい身長差メーカーは、ポイントを使いません。',
  },
  {
    q: 'スマホのブラウザでも使えますか？',
    a: '使えます。このページはブラウザの画面で、専用のアプリはありません。スマホでも、身長、体型、ポーズ、フレームを選べます。画面が狭いときは、項目が縦に並びます。',
  },
  {
    q: 'アップロードした写真は保存されますか？',
    a: 'プレビューのシルエットには、選んだ写真の顔は出ません。生成するときだけ、そのリクエストに画像を添付します。公開のプロンプト集や公開ストレージには、写真も生成結果も保存しません。記録に残るのは、身長やポーズなどの設定と、写真があったかどうかまでです。',
  },
  {
    q: 'どんなポーズを比べられますか？',
    a: '並んで立つ、手をつなぐ、見上げる・見下ろす、ハグ、壁ドン、キス直前、背中合わせ、の七つです。座る姿勢や、三人並びは、このプレビューにはありません。',
  },
]

export function HeightDifferenceSimulatorGuide() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="bg-white border-t border-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-sm sm:text-base text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">身長差シミュレーターの使い方</h2>
          <p>
            身長差シミュレーターと体格差シミュレーターは、このページのシルエットです。二人のセンチと体型を動かすと、同じ床の上で頭の線と肩の幅が変わります。プレビューは平面のシルエットで、立体の回転ビューではありません。2026年11月時点のこの画面の動きです。
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>人物Aと人物Bの身長を決めます。入力できる範囲は 120cm から 210cm です。名前は、画面上の見分けにだけ使います。</li>
            <li>体型を、細身、標準、がっちり、横幅広め、のどれか一つにします。変わるのは肩の幅です。肌の模様は出ません。</li>
            <li>ポーズを一つ選びます。並んで立つ、手をつなぐ、見上げる・見下ろす、ハグ、壁ドン、キス直前、背中合わせ、です。座る姿勢はこの一覧にありません。</li>
            <li>フレームを、全身、膝上、腰上、のどれかにします。全身は足まで、膝上と腰上は上が切れないように頭を残す切り方です。</li>
            <li>頭の線と肩を見たら、構図を確定します。英語の文だけが欲しいときは身長差メーカーへ戻ります。写真から画像にするときだけ、次のステップで1枚以上を添付します。</li>
          </ol>
          <p>
            確定するまでは、身長もポーズもやり直せます。確定したあとは、その身長、体型、ポーズ、フレームが生成の指示に固定されます。モデルがセンチを完全に守るとは限りません。シルエットは、文を書く前の見当です。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">頭、肩、目線、ポーズで見ること</h2>
          <p>
            最初に見るのは、二人の足が同じ床についていることです。足が揃っていれば、その上の差は身長の差として読めます。次に頭のてっぺんの線です。差のセンチは、画面にも数字で出ます。数字と線が違う方向を向いていたら、入力の取り違えです。
          </p>
          <p>
            肩は、体型の四種類で幅が変わります。細身は狭く、横幅広めは広く、標準とがっちりはそのあいだです。がっちりは肩が広いシルエットで、筋肉の形を肌の上に描くモードではありません。肩の線を見てから、プロンプトでは服の沿い方を書いてください。
          </p>
          <p>
            見上げる・見下ろすは、低い方の目が上を向き、高い方の目が下を向くシルエットです。顔のパーツの精密な位置ではなく、目の点が上下に寄ります。キス直前は、二人の頭が互いに寄り、足は床に残ります。ハグは、腕が相手の方へ伸び、足は同じ床です。壁ドンは、壁の帯が出て、高い方の腕が壁の方へ上がり、低い方の目が上を向きます。背中合わせは、目が外側を向きます。手をつなぐは、内側の腕が中央で会います。並んで立つは、腕が体の横です。
          </p>
          <p>
            この七つ以外の姿勢は、プレビューでは再現しません。膝枕、おんぶ、椅子に座る、三人で並ぶ、は別の画面です。座った高さの文が欲しいときは、見た並びをメモしてから、座り方のガイドでポーズの語を足してください。体重のキログラムを入れる欄もありません。横の量は、四種類の体型だけです。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">身長差の見え方の目安</h2>
          <p>
            下の表は、立った大人二人を同じ床に置いたときの、作画で言葉にする目安です。頭の大きさ、姿勢、靴で前後します。このプレビューは頭の大きさを固定し、身長のセンチだけを縦に伸ばす簡略な形なので、画面の線を優先してください。表は統計ではありません。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold border-b border-gray-200">差の目安</th>
                  <th className="px-3 py-2 text-left font-semibold border-b border-gray-200">低い方の頭頂が届きやすい位置</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border-b border-gray-100">約 10cm</td>
                  <td className="px-3 py-2 border-b border-gray-100">高い方の目の高さの近く</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-b border-gray-100">約 15cm</td>
                  <td className="px-3 py-2 border-b border-gray-100">高い方の鼻の高さの近く</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-b border-gray-100">約 20cm</td>
                  <td className="px-3 py-2 border-b border-gray-100">高い方のあごの近く</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-b border-gray-100">約 30cm</td>
                  <td className="px-3 py-2 border-b border-gray-100">高い方の肩の近く</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            10cm を試すなら、170cm と 160cm のように、差だけを変えます。30cm を試すなら、180cm と 150cm です。同じ差でも、150cm と 180cm、160cm と 190cm では、画面に入る余白が違います。フレームを全身にしたまま、高い方の頭が切れないかを見てください。切れるときは、腰上や膝上に変える前に、二人の数字が範囲内かを確認します。
          </p>
          <p>
            目線の高さは、頭のてっぺんとは別です。差が 10cm でも、低い方が見上げるポーズにすると、顔の向きの印象は数字より大きくなります。先に並んで立つで頭の線を見て、そのあと見上げる・見下ろすへ切り替えてください。ポーズを変えただけでセンチが変わったように見えるときは、入力は同じで、目の点だけが動いています。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">体格差で見る肩幅</h2>
          <p>
            体格差シミュレーターとして使うときは、身長を固定して、体型だけを変えます。片方を細身、もう片方を横幅広めにすると、肩の線の差が一番読みやすいです。がっちりは、その中間より広い肩です。標準は、差を強調しない出発点です。
          </p>
          <p>
            身長差と体格差を同じ操作で両方変えると、縦の差なのか横の差なのかが残りません。今日見る軸は一つです。縦を見る日は体型を二人とも標準に戻し、横を見る日はセンチを同じにして体型だけを変えます。両方を文に書くのは、シルエットで別々に見てからです。
          </p>
          <p>
            肩幅は服の上から書きます。プロンプトで肌の形を指定しなくても、broad shoulders や slim build のように、輪郭の語で差は出せます。書き方の段階は体格差のガイドと、男性の体型のガイドに分けてあります。この画面は、その語を選ぶ前の見当です。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">結果をプロンプトにする</h2>
          <p>
            シルエットで頭の位置が決まったら、
            <Link href="/tools/height-difference-maker" className="text-sky-700 font-medium hover:underline">身長差メーカー</Link>
            で同じセンチとポーズを選び、英語の文をコピーします。メーカーはポイントを使わず、文だけを組み立てます。写真から一枚にするときだけ、このページの生成が1ポイントです。
          </p>
          <p>
            文の型は、成人の人数、高い人と低い人、差の語、ポーズ、全身、です。下は、170cm と 160cm で見上げる構図にしたときの例です。服は閉じた日常着にしています。
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap">{`2 adults, 1 adult man, 1 adult woman, adult,
height difference, the man around 170cm, the woman around 160cm,
the shorter adult looks up, the taller adult looks down gently,
long coat, buttoned shirt, trousers, long skirt,
standing, full body, simple background`}</pre>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap">{NEGATIVE_LINE}</pre>
          <p>
            センチはヒントです。モデルが定規で測る値にはなりません。差が消えるときは、height difference を一つ残し、same height を負向に足します。詳しい失敗の分け方は
            <Link href="/guides/height-difference-pair-prompt" className="text-sky-700 font-medium hover:underline">身長差プロンプト</Link>
            、肩幅や筋肉量の語は
            <Link href="/guides/body-size-difference-prompt-guide" className="text-sky-700 font-medium hover:underline">体格差プロンプト</Link>
            です。腕の位置は
            <Link href="/guides/hug-prompt-guide" className="text-sky-700 font-medium hover:underline">ハグ</Link>
            、顔を近づける距離は
            <Link href="/guides/kiss-prompt-guide" className="text-sky-700 font-medium hover:underline">キス</Link>
            、壁に手をつく構図は
            <Link href="/guides/kabedon-prompt-guide" className="text-sky-700 font-medium hover:underline">壁ドン</Link>
            に分けてあります。構図の型は
            <Link href="/guides/height-difference-illustration-composition-guide" className="text-sky-700 font-medium hover:underline">身長差イラストの構図</Link>
            です。
          </p>
          <p>
            生成に写真を使うときは、顔の参照として添付し、体の高さはロックしたセンチに描き直す指示が入ります。写真が無い方は、見た目メモの文から作ります。メモに実在の人物の名前は書かないでください。二人とも成人、と人数の行に残します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">フレームと、二人の関係の選び方</h2>
          <p>
            フレームは、どこまでを画面に残すかです。全身は、二人の足と、高い方の頭の上の余白までを入れます。差が 30cm 近くあると、高い方の頭が上に寄り、低い方の足元の余白が広く見えます。そのときは人数を変える前に、フレームが全身のままかを確認します。膝上は、おおよそ膝のあたりで下を切り、頭は残します。腰上は、腰のあたりで切り、頭の線で差を読みます。腰上なのに高い方の頭が切れる設定は、この画面では避ける指示が入っています。切れて見えるときは、数字が範囲の端でないかを先に見てください。
          </p>
          <p>
            関係の項目は、生成するときの文へ関係の説明を足すためのものです。シルエットの形そのものは、ポーズと身長と体型で決まります。推しカップル、男女カップル、二人の男性、二人の女性、を切り替えても、頭の線はセンチが同じなら同じです。文にするときに、誰と誰かを分けるための欄だと考えてください。この解説では、登場人物は成人だけにします。年齢を下げる関係の書き方は、プロンプトへコピーしません。
          </p>
          <p>
            画風は、アニメ塗り、写真風、漫画の線、から一つです。画風を変えても、頭の位置の計算は変わりません。比べる日は画風を固定し、身長か体型かの一方だけを動かします。背景も、シンプル、カフェ、夜の街、のように画面の一覧から一つです。背景を凝った日に頭の位置を判断すると、床の線が見えにくくなります。判断が終わるまでは、シンプルな背景に戻してください。
          </p>
          <p>
            左右を入れ替えたいときは、人物の入れ替えを使います。入れ替えると、名前と身長と体型と、選んでいた写真の割り当てが一緒に移ります。移したあとに、高い方がどちら側にいるかを、色ではなく名前で確認します。シルエットの色は見分け用で、生成される服の色ではありません。
          </p>
          <p>
            差の倍率は、高い方を低い方で割った数字として画面に出ます。これは見た目の感想ではなく、入力したセンチからの計算です。倍率が 1 に近いときは、並んで立つと頭の線がほぼ揃います。その状態で身長差の文を書いても、絵は平均の背に戻りやすいです。差を見せたい日は、表の 15cm か 20cm を目安に、もう一度センチを開いてください。目安は、画面の線で確かめてから文にします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">メーカーへ戻るとき</h2>
          <p>
            身長差メーカーは、同じサイトの別ページです。こちらで見たセンチとポーズを、あちらの入力へ自分で写します。写す項目は、高い方のセンチ、低い方のセンチ、ポーズの名前、です。体型を文章にするときは、細身か、肩が広いか、をメーカーの体格差モードと一緒に見てください。モードを体格差にすると、肩幅の差の語が文へ足されます。縦の差だけが欲しい日は、身長差のモードのままにします。
          </p>
          <p>
            キス直前を文にするときは、高い方がかがむことと、低い方がつま先で伸びることを、顔が触れる前の距離として書きます。ハグは、足が床に残った抱擁です。壁ドンは、高い方の手が壁につき、低い方が見上げます。これらのポーズ名は、このプレビューにあるものだけを使ってください。一覧に無い姿勢を、プレビューで確認したことにはしません。
          </p>
          <p>
            椅子に座った差を書きたいときは、立ったシルエットで頭の差を見たメモを残し、座るポーズの語は別のガイドから足します。座ると、見える差は立ったときより小さくなりやすいです。立った 20cm のメモを、座った文へそのまま「肩に届く」と書かないでください。座った状態は、この画面では測っていません。
          </p>
          <p>
            三人の並びや、逆に低い側を強調する文も、メーカーのモードにあります。このプレビューは二人だけです。三人をシルエットで確認したことにはなりません。文を三人にする前に、二人の頭の線が意図どおりかを先に見て、三人目は文の上で足してください。

見終わった設定は、メモに残してからページを閉じます。残すのは、二人のセンチ、体型の名前、ポーズの名前、フレーム、です。ブラウザを閉じると、動かしていたスライダーは最初の値に戻ります。戻った状態を、さっき見た差だと思わないでください。メモと、もう一度開いた画面が一致してから、メーカーへ同じ数字を写します。写し間違いは、文のセンチと、シルエットの差が別の値になる形で出ます。文を生成する前に、メモの差と、画面の差の数字を並べて読んでください。

読み方の順番は、毎回同じにします。最初に足が同じ床か。次に頭のてっぺんの線。その次に肩の幅。最後に、選んだポーズで腕と目がどこを向いているか。この順を飛ばして腕だけを見ると、差のセンチを見落としたまま文を書いてしまいます。腕が届いて見えるハグでも、頭の線が揃っていれば、身長差の文にはなりません。頭の線が開いてから、腕の位置をポーズの名前としてメモします。メモに「目の高さと肩の高さのどちらを見たか」を一行残すと、翌日に同じ構図へ戻れます。戻るときは、フレームが全身だったか腰上だったかも一緒に書いてください。腰上で見た差を、全身の文の肩の位置だと思わないためです。

数字の差と、表の言葉は、別々に残します。画面が 20cm でも、頭の線が鼻ではなくあごに見えるなら、メモには「20cm、あごの近く」と両方書きます。表は目安で、このシルエットの頭の大きさは固定です。実在の二人の頭の大きさとは違います。文にするときは、画面で見た位置を優先し、表の行をそのまま事実としては書かないでください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">写真を添付するとき</h2>
          <p>
            写真は、構図を確定したあとで選びます。形式は JPG、PNG、WebP で、1枚あたり 8MB までです。人物Aか人物Bの少なくとも1枚が必要です。無い方は、見た目メモから生成します。プレビューのシルエットには、選んだ顔は合成されません。選んだ画像は、そのブラウザの中で表示するだけです。
          </p>
          <p>
            生成のリクエストにだけ、画像を添付します。応答で返った画像も、公開のプロンプト集や公開のストレージへは上げません。保存される記録は、身長、体型、ポーズ、フレーム、関係性、写真があったかどうか、までです。顔の画像そのものは、その記録には入れません。
          </p>
          <p>
            ログインしていない状態で生成を押すと、サインインへ移ります。ポイントが足りないときは、生成は始まりません。シルエットを動かす操作では、ポイントは減りません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">よくある質問</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Q. {item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">A. {item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
