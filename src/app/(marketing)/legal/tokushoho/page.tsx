import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記｜prompta.jp',
  description:
    '特定商取引法に基づく表記。事業者名、所在地、連絡先、販売価格、支払方法、返品ポリシー等。',
  alternates: { canonical: `${SITE_CONFIG.url}/legal/tokushoho` },
}

const EFFECTIVE_DATE = '2026-05-09'
const CONTACT_EMAIL = 'prompta.jp@gmail.com'

export default function TokushohoPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '特定商取引法に基づく表記', href: '/legal/tokushoho' }]} />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">特定商取引法に基づく表記</h1>
        <p className="text-sm text-gray-500 mb-10">最終更新日：{EFFECTIVE_DATE}</p>

        <div className="prose prose-sky max-w-none text-gray-700 leading-relaxed">
          <dl className="divide-y divide-gray-200 border-t border-b border-gray-200">
            <Row label="事業者名" value="ByteAD Inc." />
            <Row label="運営責任者" value="YU CHAO" />
            <Row
              label="所在地"
              value="請求があった場合、遅滞なく開示いたします。"
              hint="お手数ですが下記メールアドレスまでご連絡ください。"
            />
            <Row
              label="電話番号"
              value="請求があった場合、遅滞なく開示いたします。"
              hint="お問い合わせは原則メールにて承ります。下記メールアドレス宛にご連絡いただければ、原則 5 営業日以内にご返答いたします。"
            />
            <Row
              label="メールアドレス"
              valueHtml={
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              }
            />
            <Row label="サイト URL" value="https://www.prompta.jp" />
            <Row
              label="販売価格"
              valueHtml={
                <>
                  <strong>10 回パック ¥300（税込）</strong>
                  <br />
                  パーソナルカラー診断 AI ／ 似合う髪色診断 AI のクレジットを 10 回追加できる買い切り型のクレジットパックです。有効期限はありません。
                </>
              }
            />
            <Row label="商品代金以外の必要料金" value="なし（消費税は販売価格に含まれます）" />
            <Row
              label="支払方法"
              value="クレジットカード（Visa / Mastercard / American Express / JCB）"
              hint="決済は Stripe Inc. を経由して行われます。当サイトはクレジットカード情報を保持しません。"
            />
            <Row label="支払時期" value="注文確定時にお支払いが発生します。" />
            <Row
              label="役務（クレジット）の提供時期"
              value="決済完了後、即時にクレジットを付与いたします。"
              hint="通常は数秒〜数十秒以内にご利用可能となります。万一クレジットが付与されない場合は、上記メールアドレスまでご連絡ください。"
            />
            <Row
              label="返品・キャンセル特約"
              valueHtml={
                <>
                  デジタルコンテンツの性質上、購入後の自己都合による返金には対応いたしかねます。
                  <br />
                  ただし、当サイトのシステム不具合により正常にクレジットが付与されなかった場合、または重大なサービス障害により役務の提供ができない場合は、上記メールアドレスへご連絡いただければ調査の上、返金または再付与にて対応いたします。
                </>
              }
            />
            <Row
              label="動作環境"
              value="主要ブラウザの最新版（Google Chrome / Safari / Firefox / Microsoft Edge）"
              hint="モバイルブラウザにも対応していますが、写真アップロードを伴う機能では Wi-Fi 接続を推奨します。"
            />
            <Row
              label="その他の特記事項"
              valueHtml={
                <>
                  本サービスは AI 解析・画像生成サービスです。診断結果および生成画像は、入力画像・撮影条件・モデルの確率的性質により変動する可能性があります。プロのカラリスト・スタイリストによる対面診断の代替ではなく、参考情報としてご利用ください。詳細は
                  <a href="/legal/terms" className="text-sky-600 hover:underline mx-1">
                    利用規約
                  </a>
                  および
                  <a href="/legal/privacy" className="text-sky-600 hover:underline mx-1">
                    プライバシーポリシー
                  </a>
                  をご参照ください。
                </>
              }
            />
          </dl>
        </div>
      </article>
    </>
  )
}

function Row({
  label,
  value,
  valueHtml,
  hint,
}: {
  label: string
  value?: string
  valueHtml?: React.ReactNode
  hint?: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 py-4">
      <dt className="text-sm font-semibold text-gray-900">{label}</dt>
      <dd className="sm:col-span-2 text-sm text-gray-700">
        {valueHtml ?? value}
        {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      </dd>
    </div>
  )
}
