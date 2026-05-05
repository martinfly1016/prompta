import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'プライバシーポリシー｜prompta.jp',
  description:
    'prompta.jp のプライバシーポリシー。個人情報の取得・利用・第三者提供・保持期間・ユーザー権利について。',
  alternates: { canonical: `${SITE_CONFIG.url}/legal/privacy` },
}

const EFFECTIVE_DATE = '2026-05-05'
const CONTACT_EMAIL = 'prompta-agent@agentmail.to'

export default function PrivacyPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'プライバシーポリシー', href: '/legal/privacy' }]} />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-gray-500 mb-10">最終更新日：{EFFECTIVE_DATE}</p>

        <div className="prose prose-sky max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. はじめに</h2>
            <p>
              prompta.jp（以下「当サイト」）は、ユーザーの個人情報の保護を重視し、関連法令を遵守したうえで、本プライバシーポリシーに従って個人情報を取り扱います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. 取得する情報</h2>
            <p>当サイトは以下の情報を取得することがあります。</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>メールアドレス</strong>：サインイン、購入、クレジット復元のために取得します。Google サインインの場合、Google アカウントのメールアドレスとプロフィール情報（名前、アイコン）を取得します。
              </li>
              <li>
                <strong>IP アドレス・User-Agent ハッシュ</strong>：無料利用枠の不正利用防止を目的に、ハッシュ化して 24 時間保持します。生の IP アドレスは保存しません。
              </li>
              <li>
                <strong>アップロード写真</strong>：パーソナルカラー診断ツールでアップロードされた写真は、Google Gemini API への解析リクエストに利用されます。当サイトのサーバーには保存されません。
              </li>
              <li>
                <strong>決済情報</strong>：Stripe 経由で処理されます。カード番号などの決済情報は当サイトに保存されません。当サイトはメールアドレスと取引 ID のみ保持します。
              </li>
              <li>
                <strong>ツール利用ログ</strong>：いつ・どのツールを利用したかの匿名統計（ユーザー特定情報なし）。
              </li>
              <li>
                <strong>Cookie</strong>：認証セッション、無料利用枠の管理、購入クレジットの紐付けに使用します。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. 利用目的</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>サービスの提供と機能の運用</li>
              <li>無料利用枠の管理および不正利用の防止</li>
              <li>有料クレジットの発行・利用・復元</li>
              <li>サービスに関するお知らせ・サインインリンクの送信</li>
              <li>サービス改善のための統計分析（個人を特定しない形）</li>
              <li>法令遵守および紛争対応</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. 第三者への提供</h2>
            <p>
              当サイトは以下のサービスを利用し、必要最小限の情報を共有します。各サービスのプライバシーポリシーは、それぞれの提供元のものが適用されます。
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">提供先</th>
                    <th className="px-3 py-2 text-left">用途</th>
                    <th className="px-3 py-2 text-left">共有する情報</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2">Google LLC</td>
                    <td className="px-3 py-2">OAuth サインイン / Gemini API 解析 / Analytics 4</td>
                    <td className="px-3 py-2">
                      OAuth: 認可情報；Gemini: アップロード写真；GA: 匿名利用ログ
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Stripe Inc.</td>
                    <td className="px-3 py-2">決済処理</td>
                    <td className="px-3 py-2">メールアドレス、購入額、取引 ID</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">AgentMail</td>
                    <td className="px-3 py-2">取引メール送信（サインイン・復元リンク）</td>
                    <td className="px-3 py-2">送信先メールアドレス、メール本文</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Vercel Inc.</td>
                    <td className="px-3 py-2">ホスティング・配信</td>
                    <td className="px-3 py-2">アクセスログ（標準的な Web ホスティング情報）</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Railway / Prisma</td>
                    <td className="px-3 py-2">データベース運用</td>
                    <td className="px-3 py-2">本ポリシーで取得した情報の保存</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              法令に基づく開示要請を除き、上記以外の第三者への個人情報の提供・販売は行いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. データ保持期間</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>アップロード写真</strong>：解析完了後、即時削除されます。当サイトのサーバーには保存されません。Google Gemini API 側の保持ポリシーは Google のポリシーに従います。
              </li>
              <li>
                <strong>IP / UA ハッシュ</strong>：24 時間後に自動削除されます。
              </li>
              <li>
                <strong>アカウント情報・購入履歴</strong>：アカウントが有効な期間 + 法令で定められた期間保持します。
              </li>
              <li>
                <strong>削除依頼</strong>：ユーザーからの削除依頼を受けた場合、必要な処理を行い速やかに削除します（法令上の保存義務がある場合を除く）。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. ユーザーの権利</h2>
            <p>
              ユーザーは、当サイトが保有する自身の個人情報について、以下の権利を行使できます：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>開示請求</li>
              <li>訂正・削除請求</li>
              <li>利用停止請求</li>
              <li>第三者提供記録の開示請求</li>
            </ul>
            <p className="mt-3">
              請求は{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 hover:underline">
                {CONTACT_EMAIL}
              </a>{' '}
              までご連絡ください。本人確認のうえ、合理的な期間内に対応します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cookie について</h2>
            <p>
              当サイトでは、サービスの提供および分析のために以下の Cookie を使用します：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>必須 Cookie</strong>：サインインセッション、無料利用枠の管理、購入クレジットの紐付け（無効化するとサービスを利用できません）
              </li>
              <li>
                <strong>分析 Cookie</strong>：Google Analytics 4 による匿名アクセス分析
              </li>
            </ul>
            <p className="mt-3">
              ブラウザの設定で Cookie を無効化できますが、サインインや購入クレジットの利用ができなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. セキュリティ</h2>
            <p>
              当サイトは、個人情報の漏洩・滅失・毀損を防止するため、合理的な安全管理措置を講じます。具体的には、HTTPS による通信暗号化、パスワードのハッシュ化、API キーの暗号化保存、最小権限原則によるアクセス制御を実施しています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. 子どものプライバシー</h2>
            <p>
              当サイトは 13 歳未満を対象としていません。13 歳未満のユーザーから個人情報を取得したことが判明した場合、速やかに削除します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. 本ポリシーの改定</h2>
            <p>
              本ポリシーは、法令の変更やサービスの内容変更に応じて改定する場合があります。重要な変更がある場合は、サイト上で通知します。本ポリシーの最終更新日は本ページの上部に記載しています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. お問い合わせ</h2>
            <p>
              本プライバシーポリシーに関するご質問は、以下までご連絡ください。
            </p>
            <p className="mt-3">
              <strong>運営者</strong>：prompta.jp
              <br />
              <strong>連絡先</strong>：
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </article>
    </>
  )
}
