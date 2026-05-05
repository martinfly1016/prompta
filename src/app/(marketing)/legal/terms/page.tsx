import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: '利用規約｜prompta.jp',
  description:
    'prompta.jp の利用規約。サービス内容、料金、決済、禁止事項、免責事項、準拠法について。',
  alternates: { canonical: `${SITE_CONFIG.url}/legal/terms` },
}

const EFFECTIVE_DATE = '2026-05-05'
const CONTACT_EMAIL = 'prompta-agent@agentmail.to'

export default function TermsPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '利用規約', href: '/legal/terms' }]} />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">利用規約</h1>
        <p className="text-sm text-gray-500 mb-10">最終更新日：{EFFECTIVE_DATE}</p>

        <div className="prose prose-sky max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 1 条（適用）</h2>
            <p>
              本規約は、prompta.jp（以下「当サイト」）が提供するサービス（AI プロンプト集、AI 診断ツール、関連コンテンツ。以下総称して「本サービス」）の利用に関する条件を定めるものです。利用者（以下「ユーザー」）は、本サービスを利用することにより本規約に同意したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 2 条（サービス内容）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI プロンプトの閲覧・コピー（無料）</li>
              <li>パーソナルカラー診断 AI ツール（無料 3 回／日 ＋ 有料クレジットパック）</li>
              <li>その他の AI 関連ツールおよびガイド</li>
            </ul>
            <p className="mt-3">
              本サービスの内容は、当サイトの判断により予告なく変更・追加・終了することがあります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 3 条（アカウント）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>本サービスは、サインインなしでも基本機能を利用できます。</li>
              <li>有料クレジットを跨デバイスで管理する場合、Google アカウントまたはメールアドレスによるサインインが必要です。</li>
              <li>ユーザーは、自身のアカウント情報を適切に管理する責任を負います。</li>
              <li>不正利用が疑われるアカウントは、当サイトの判断で利用を制限することがあります。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 4 条（無料利用枠）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>パーソナルカラー診断ツールは、1 日あたり 3 回まで無料で利用できます。</li>
              <li>無料利用枠は、毎日 9:00 (UTC 基準) にリセットされます。</li>
              <li>同一 IP アドレスからの利用は、1 日あたり 5 回までに制限されることがあります（共有 IP の不正利用防止のため）。</li>
              <li>無料利用枠の悪用（自動化スクリプト等）が確認された場合、利用を制限することがあります。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 5 条（料金・決済）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>10 回パック ¥300（税込）</strong>：パーソナルカラー診断ツールを追加で 10 回利用できる買い切り型のクレジットパック。有効期限はありません。
              </li>
              <li>決済は Stripe Inc. を経由して行われます。当サイトはクレジットカード情報を保持しません。</li>
              <li>クレジットは購入時に登録されたメールアドレスに紐付けられます。同じメールアドレスでサインインまたは復元することで、複数デバイスから利用できます。</li>
              <li>
                <strong>返金ポリシー</strong>：デジタルコンテンツの性質上、購入後の自己都合による返金には対応いたしかねます。当サイトのシステム不具合により正常にクレジットが付与されなかった場合は、お問い合わせ窓口にご連絡ください。
              </li>
              <li>料金は予告なく変更することがあります。変更後の料金は、変更日以降の購入に適用されます。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 6 条（AI 出力の取扱い）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>パーソナルカラー診断ツールは、Google Gemini モデルによる AI 解析結果を提供します。診断結果は参考情報であり、専門のパーソナルカラリストによる対面診断の代替ではありません。</li>
              <li>診断結果の正確性、完全性、特定の目的への適合性について、当サイトは一切の保証を行いません。</li>
              <li>AI 出力に基づくユーザーの判断・行動については、ユーザー自身の責任で行うものとします。</li>
              <li>アップロードされた写真は、解析完了後にサーバーから削除されます。詳細は<a href="/legal/privacy" className="text-sky-600 hover:underline">プライバシーポリシー</a>をご参照ください。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 7 条（禁止事項）</h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>法令または公序良俗に違反する行為</li>
              <li>他者の肖像権・プライバシー権を侵害する写真のアップロード（本人または被写体の同意がない他人の写真等）</li>
              <li>未成年（13 歳未満）の写真をアップロードする行為</li>
              <li>不正アクセス・自動化スクリプト・ボット等を用いた利用</li>
              <li>無料利用枠を不正に回復する目的での Cookie 削除・IP 偽装の繰り返し</li>
              <li>本サービスのコード・コンテンツの無断複製・再配布</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>その他、当サイトが不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 8 条（知的財産権）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>本サービスのコンテンツ（プロンプト集、ガイド、UI デザイン、コード）の著作権その他の知的財産権は当サイトまたは正当な権利者に帰属します。</li>
              <li>ユーザーは、本サービスを利用してプロンプトをコピーし、外部の AI ツールで自由に使用できます。</li>
              <li>ユーザーがアップロードした写真および AI 出力結果については、ユーザー自身が利用権を有します。当サイトはこれを所有しません。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 9 条（サービスの停止・変更）</h2>
            <p>
              当サイトは、以下の場合に本サービスの全部または一部を予告なく停止・変更することがあります：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>システムメンテナンス・障害対応</li>
              <li>第三者サービス（Stripe、Google、AgentMail 等）の障害または仕様変更</li>
              <li>その他、運営上必要と判断した場合</li>
            </ul>
            <p className="mt-3">
              これらに起因してユーザーに生じた損害について、当サイトは責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 10 条（免責事項）</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>本サービスは「現状のまま」提供されます。当サイトは、本サービスの正確性、完全性、有用性、特定の目的への適合性、エラーの不存在について、一切の保証を行いません。</li>
              <li>当サイトの故意または重過失による場合を除き、本サービスの利用または利用不能から生じる一切の損害について、当サイトは責任を負いません。</li>
              <li>当サイトが責任を負う場合であっても、その範囲は当該損害の発生時点でユーザーが当サイトに支払った直近 1 年分の料金を上限とします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 11 条（規約の変更）</h2>
            <p>
              当サイトは、本規約を予告なく変更することがあります。変更後の規約は、当サイト上に掲示した時点で効力を生じます。重要な変更がある場合は、サイト上で通知します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 12 条（準拠法・管轄）</h2>
            <p>
              本規約の解釈および適用は、日本法に準拠します。本サービスに関連して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">第 13 条（お問い合わせ）</h2>
            <p>
              本規約に関するご質問は、以下までご連絡ください。
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
