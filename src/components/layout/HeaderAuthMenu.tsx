'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

export function HeaderAuthMenu() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => setHydrated(true), [])

  // When user signs in, sync the email to the credits cookie + show balance
  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.email) return
    fetch('/api/auth/sync-credits', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.balance === 'number') setCredits(d.balance)
      })
      .catch(() => {})
  }, [status, session?.user?.email])

  // Avoid hydration mismatch — render placeholder until client mounted
  if (!hydrated) {
    return <div className="w-20 h-9" aria-hidden />
  }

  if (status === 'loading') {
    return <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" aria-hidden />
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
      >
        ログイン
      </Link>
    )
  }

  const initials = (session.user.name || session.user.email || '?').slice(0, 2).toUpperCase()
  const displayName = session.user.name || session.user.email

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="アカウントメニュー"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt=""
            className="w-7 h-7 rounded-full border border-gray-200"
          />
        ) : (
          <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold flex items-center justify-center">
            {initials}
          </span>
        )}
        <span className="hidden sm:inline text-sm text-gray-700 max-w-[120px] truncate">
          {displayName}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500">サインイン中</p>
            <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
            {typeof credits === 'number' && (
              <Link
                href="/account"
                className="mt-1 inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md transition-colors"
              >
                💎 保有クレジット {credits} 回 →
              </Link>
            )}
          </div>
          <Link
            href="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 whitespace-nowrap font-medium"
          >
            👤 アカウント
          </Link>
          <Link
            href="/tools/personal-color-analysis"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 whitespace-nowrap"
          >
            🎨 パーソナルカラー診断
          </Link>
          <Link
            href="/tools/hair-color-diagnosis"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 whitespace-nowrap"
          >
            💇 似合う髪色診断
          </Link>
          <Link
            href="/prompts"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 whitespace-nowrap"
          >
            📚 プロンプト一覧
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="block w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 border-t border-gray-100 mt-1"
          >
            サインアウト
          </button>
        </div>
      )}
    </div>
  )
}
