import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { CONTACT_EMAIL } from '@/lib/email'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'prompta.jp へのお問い合わせ。フォームまたはメールで、掲載内容・削除依頼・運営への連絡を受け付けています。',
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
}

export default function ContactPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'お問い合わせ', href: '/contact' }]} />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          掲載内容の訂正、削除依頼、その他の連絡はフォームから送ってください。メールだけでも受け付けています。
        </p>

        <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          <p>
            メール：{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 hover:underline">{CONTACT_EMAIL}</a>
          </p>
          <p className="mt-1">
            運営者の表示は <Link href="/about" className="text-sky-600 hover:underline">運営者情報</Link> を見てください。
          </p>
        </div>

        <ContactForm email={CONTACT_EMAIL} />
      </article>
    </>
  )
}
