import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { emailHash } from '@/lib/paid-credits'
import { SITE_CONFIG } from '@/lib/constants'

// Phase 1 — /account MVP (2026-05-11)
// Server-rendered single source of truth for "what I bought / have / used".
// Requires login; otherwise redirects to /auth/signin?callbackUrl=/account.

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'アカウント — クレジット残高・購入履歴・使用履歴 | プロンプタ',
  description: 'プロンプタのクレジット残高、購入履歴、使用履歴を確認できるアカウントページ。',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_CONFIG.url}/account` },
}

const TOOL_LABELS: Record<string, { icon: string; label: string; href: string }> = {
  'personal-color': { icon: '🎨', label: 'パーソナルカラー診断', href: '/tools/personal-color-analysis' },
  'hair-color': { icon: '💇', label: '似合う髪色診断', href: '/tools/hair-color-diagnosis' },
}

function fmtDate(d: Date | null | undefined): string {
  if (!d) return '—'
  return new Date(d).toLocaleString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/auth/signin?callbackUrl=/account')
  }
  const email = session.user.email
  const eh = emailHash(email)

  const [credits, payments, usages, generations] = await Promise.all([
    prisma.paidCredits.findUnique({ where: { emailHash: eh } }),
    prisma.stripePayment.findMany({
      where: { emailHash: eh },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.toolUsage.findMany({
      where: { emailHash: eh, type: 'paid' },
      orderBy: { createdAt: 'desc' },
      take: 30,
    }),
    prisma.generationOutput.findMany({
      where: { emailHash: eh, outputBlobUrl: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 12,
      select: { id: true, tool: true, outputBlobUrl: true, createdAt: true, outputJson: true },
    }),
  ])

  const balance = credits?.balance ?? 0
  const totalEarned = credits?.totalEarned ?? 0
  const totalUsed = credits?.totalUsed ?? 0
  const welcomeGranted = !!credits?.welcomeBonusAt
  const lastPurchase = credits?.lastPurchase ?? null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-sky-600">← ホーム</Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">アカウント</h1>
      <p className="text-sm text-gray-500 mb-8">サインイン中：{email}</p>

      {/* Hero: Balance */}
      <section className="mb-8 p-6 sm:p-8 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 border border-sky-100 rounded-2xl">
        <p className="text-xs font-medium text-sky-700 uppercase tracking-wider mb-2">保有クレジット</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-bold text-gray-900">{balance}</span>
          <span className="text-lg text-gray-500">回</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-5">
          <span>累計獲得 <strong className="text-gray-900">{totalEarned}</strong></span>
          <span>累計使用 <strong className="text-gray-900">{totalUsed}</strong></span>
          {welcomeGranted && (
            <span className="inline-flex items-center gap-1 text-emerald-700">
              🎁 ウェルカム特典 {credits?.welcomeBonus ?? 0} クレジット受領済
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/personal-color-analysis"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-sky-700 text-sm font-semibold rounded-lg border border-sky-200 hover:bg-sky-50 transition-colors"
          >
            🎨 パーソナルカラーで使う
          </Link>
          <Link
            href="/tools/hair-color-diagnosis"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-violet-700 text-sm font-semibold rounded-lg border border-violet-200 hover:bg-violet-50 transition-colors"
          >
            💇 髪色診断で使う
          </Link>
          {balance < 5 && (
            <Link
              href="/tools/personal-color-analysis#purchase"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              💳 クレジットを補充する
            </Link>
          )}
        </div>
      </section>

      {/* Purchase history */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">購入履歴</h2>
        {payments.length === 0 ? (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 text-center">
            まだ購入履歴がありません。ウェルカム特典のクレジットでツールをお試しください。
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">日時</th>
                  <th className="px-4 py-3 text-right font-medium">金額</th>
                  <th className="px-4 py-3 text-right font-medium">クレジット</th>
                  <th className="px-4 py-3 text-left font-medium">状態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map(p => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-gray-700">{fmtDate(p.createdAt)}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">¥{p.amountJpy.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">+{p.creditsGranted}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                        p.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                        p.status === 'refunded' ? 'bg-rose-50 text-rose-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {p.status === 'paid' ? '完了' : p.status === 'refunded' ? '返金済' : p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {lastPurchase && (
          <p className="mt-2 text-xs text-gray-500">最終購入：{fmtDate(lastPurchase)}</p>
        )}
      </section>

      {/* Generation gallery (Phase 2) */}
      {generations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">生成した画像</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {generations.map(g => (
              <a
                key={g.id}
                href={g.outputBlobUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-200 hover:border-sky-300 transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.outputBlobUrl!}
                  alt={`${g.tool} 生成画像`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-[10px] p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{TOOL_LABELS[g.tool]?.icon ?? '🔧'} {TOOL_LABELS[g.tool]?.label ?? g.tool}</span>
                    <span className="opacity-80">{new Date(g.createdAt).toLocaleDateString('ja-JP')}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            ※ 画像クリックで原寸大表示。2026-05-12 以降の生成画像のみ表示されます。
          </p>
        </section>
      )}

      {/* Usage history */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">使用履歴（最近 30 件）</h2>
        {usages.length === 0 ? (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 text-center">
            まだ使用履歴がありません。
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            {usages.map(u => {
              const tool = TOOL_LABELS[u.tool]
              return (
                <div key={u.id} className="px-4 py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tool?.icon ?? '🔧'}</span>
                    <div>
                      {tool ? (
                        <Link href={tool.href} className="font-medium text-gray-900 hover:text-sky-600">
                          {tool.label}
                        </Link>
                      ) : (
                        <span className="font-medium text-gray-900">{u.tool}</span>
                      )}
                      <div className="text-xs text-gray-500">{fmtDate(u.createdAt)}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">-1 クレジット</span>
                </div>
              )
            })}
          </div>
        )}
        <p className="mt-2 text-xs text-gray-400">
          ※ 2026-05-12 以降のクレジット消費が記録されます。それ以前の使用は表示されません。
        </p>
      </section>

      {/* Account info + legal */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">アカウント情報</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">メールアドレス</span>
            <span className="font-medium text-gray-900">{email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">アカウント作成日</span>
            <span className="text-gray-700">{fmtDate(credits?.createdAt)}</span>
          </div>
        </div>
      </section>

      {/* Legal links */}
      <section className="text-center text-xs text-gray-400 space-x-3">
        <Link href="/legal/terms" className="hover:text-gray-600">利用規約</Link>
        <span>·</span>
        <Link href="/legal/privacy" className="hover:text-gray-600">プライバシーポリシー</Link>
        <span>·</span>
        <Link href="/legal/tokushoho" className="hover:text-gray-600">特定商取引法に基づく表記</Link>
      </section>
    </div>
  )
}
