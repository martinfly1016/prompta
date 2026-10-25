import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { CONTACT_EMAIL } from '@/lib/email'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: '運営者情報',
  description:
    'prompta.jp（プロンプタ）の運営者情報。サイトの目的、運営者、お問い合わせ先を記載しています。',
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
}

export default function AboutPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '運営者情報', href: '/about' }]} />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">運営者情報</h1>
        <p className="text-sm text-gray-500 mb-10">prompta.jp について</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">サイトの概要</h2>
            <p>
              プロンプタ（prompta.jp）は、日本語で AI 画像生成を使う人向けのプロンプト集です。Stable Diffusion、Midjourney、ChatGPT、Claude、DALL·E、Gemini などで使える指示文と、その書き方のガイドを無料で公開しています。
            </p>
            <p className="mt-3">
              掲載しているのは、髪型、服装、体型、構図、背景など、画像の見た目を言葉で指定するための実例です。コピペして自分のモデルやツールで試せることを目的にしています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">運営者</h2>
            <dl className="divide-y divide-gray-200 border-t border-b border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3">
                <dt className="text-sm font-semibold text-gray-900">サイト名</dt>
                <dd className="sm:col-span-2">プロンプタ（prompta.jp）</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3">
                <dt className="text-sm font-semibold text-gray-900">URL</dt>
                <dd className="sm:col-span-2">
                  <a href={SITE_CONFIG.url} className="text-sky-600 hover:underline">{SITE_CONFIG.url}</a>
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3">
                <dt className="text-sm font-semibold text-gray-900">事業者</dt>
                <dd className="sm:col-span-2">ByteAD Inc.</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3">
                <dt className="text-sm font-semibold text-gray-900">運営責任者</dt>
                <dd className="sm:col-span-2">YU CHAO</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3">
                <dt className="text-sm font-semibold text-gray-900">連絡先</dt>
                <dd className="sm:col-span-2">
                  <Link href="/contact" className="text-sky-600 hover:underline">お問い合わせフォーム</Link>
                  <span className="mx-2 text-gray-400">/</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 hover:underline">{CONTACT_EMAIL}</a>
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-gray-500">
              所在地と電話番号は、請求があった場合に遅滞なく開示します。販売条件は{' '}
              <Link href="/legal/tokushoho" className="text-sky-600 hover:underline">特定商取引法に基づく表記</Link>
              {' '}に同じ内容を記載しています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">掲載方針</h2>
            <p>
              ガイドとプロンプトは、服を着た人物、風景、髪型、構図などの安全な作例を中心にしています。性的な表現や、未成年に見える人物を性的に描く指示は公開対象にしていません。誤りや削除の依頼は、お問い合わせから受け付けます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">関連ページ</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link href="/contact" className="text-sky-600 hover:underline">お問い合わせ</Link></li>
              <li><Link href="/legal/privacy" className="text-sky-600 hover:underline">プライバシーポリシー</Link></li>
              <li><Link href="/legal/terms" className="text-sky-600 hover:underline">利用規約</Link></li>
              <li><Link href="/guides" className="text-sky-600 hover:underline">プロンプトガイド一覧</Link></li>
            </ul>
          </section>
        </div>
      </article>
    </>
  )
}
