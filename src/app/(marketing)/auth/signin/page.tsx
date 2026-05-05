import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { SignInForm } from './SignInForm'

export const metadata: Metadata = {
  title: 'サインイン｜prompta.jp',
  description: 'Google または メールでサインインして、AI ツールの購入クレジットを管理。',
  alternates: { canonical: `${SITE_CONFIG.url}/auth/signin` },
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: { callbackUrl?: string; error?: string }
}

export default function SignInPage({ searchParams }: PageProps) {
  const callbackUrl = searchParams.callbackUrl || '/'
  const error = searchParams.error
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  const emailEnabled = Boolean(process.env.AGENTMAIL_API_KEY)

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">サインイン</h1>
          <p className="text-sm text-gray-600">
            購入クレジットを管理し、複数デバイスで同期できます。
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm">
            {error === 'OAuthSignin' || error === 'OAuthCallback' || error === 'OAuthCreateAccount'
              ? 'Google サインイン中にエラーが発生しました。もう一度お試しください。'
              : error === 'EmailSignin'
                ? 'メール送信に失敗しました。アドレスをご確認ください。'
                : error === 'Verification'
                  ? 'リンクの有効期限が切れているか、既に使用されています。'
                  : 'サインインに失敗しました。'}
          </div>
        )}

        <SignInForm
          callbackUrl={callbackUrl}
          googleEnabled={googleEnabled}
          emailEnabled={emailEnabled}
        />

        <p className="mt-8 text-xs text-gray-500 text-center">
          サインインすると、
          <a href="/legal/terms" className="text-sky-600 hover:underline">
            利用規約
          </a>
          と
          <a href="/legal/privacy" className="text-sky-600 hover:underline">
            プライバシーポリシー
          </a>
          に同意したものとみなされます。
        </p>
      </div>
    </div>
  )
}
