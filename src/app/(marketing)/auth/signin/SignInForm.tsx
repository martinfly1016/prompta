'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

interface Props {
  callbackUrl: string
  googleEnabled: boolean
  emailEnabled: boolean
}

const DOMAIN_TYPOS: Record<string, string> = {
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.cmo': 'gmail.com',
  'yahho.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.co.jpp': 'yahoo.co.jp',
  'yahoo.cp.jp': 'yahoo.co.jp',
  'hotmail.con': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'outllook.com': 'outlook.com',
  'icloud.con': 'icloud.com',
  'iclould.com': 'icloud.com',
  'icloud.cm': 'icloud.com',
}

function detectEmailTypo(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return null
  const suggestion = DOMAIN_TYPOS[domain]
  if (!suggestion) return null
  return email.replace(/@.+$/, '@' + suggestion)
}

export function SignInForm({ callbackUrl, googleEnabled, emailEnabled }: Props) {
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null)

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    const suggestion = detectEmailTypo(email.trim())
    if (suggestion && !typoSuggestion) {
      setTypoSuggestion(suggestion)
      return
    }
    setTypoSuggestion(null)
    setPending(true)
    try {
      const res = await signIn('email', {
        email: email.trim(),
        callbackUrl,
        redirect: false,
      })
      if (res?.error) {
        alert('メール送信に失敗しました：' + res.error)
      } else {
        setSent(true)
      }
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">📬</div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">メールを送信しました</h2>
        <p className="text-sm text-gray-700 mb-1">
          <strong>{email}</strong> に
        </p>
        <p className="text-sm text-gray-700 mb-3">サインインリンクをお送りしました。</p>
        <p className="text-xs text-gray-500">
          メールが届かない場合、迷惑メールフォルダもご確認ください。
          <br />
          リンクは 1 時間有効です。
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {googleEnabled && (
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Google でサインイン</span>
        </button>
      )}

      {googleEnabled && emailEnabled && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">または</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      {emailEnabled && (
        <form onSubmit={handleEmail} className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1.5 block">
              メールアドレス
            </span>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setTypoSuggestion(null) }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm"
              disabled={pending}
            />
          </label>
          {typoSuggestion && (
            <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
              <p className="text-amber-800 mb-2">
                もしかして <strong>{typoSuggestion}</strong> ですか？
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setEmail(typoSuggestion); setTypoSuggestion(null) }}
                  className="px-3 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                >
                  修正する
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-white text-gray-600 text-xs font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  このまま送信
                </button>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={pending || !email.trim()}
            className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? '送信中…' : 'メールでサインインリンクを送る'}
          </button>
          <p className="text-xs text-gray-500">
            パスワード不要。メールに届くリンクをクリックするだけでサインインできます。
          </p>
        </form>
      )}

      {!googleEnabled && !emailEnabled && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          サインイン機能の準備中です。しばらくお待ちください。
        </div>
      )}
    </div>
  )
}
