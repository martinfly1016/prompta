import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'メール送信完了｜prompta.jp',
  alternates: { canonical: `${SITE_CONFIG.url}/auth/verify-request` },
  robots: { index: false, follow: false },
}

export default function VerifyRequestPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="text-5xl mb-4">📬</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">メールを送信しました</h1>
        <p className="text-sm text-gray-700 mb-3">
          ご入力いただいたメールアドレスに、サインインリンクを送信しました。
        </p>
        <p className="text-xs text-gray-500 mb-8">
          メールが届かない場合、迷惑メールフォルダもご確認ください。
          <br />
          リンクは 1 時間有効です。
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-600 shadow-sm transition-all"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  )
}
