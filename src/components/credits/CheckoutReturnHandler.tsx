'use client'

import { useEffect, useState } from 'react'
import { trackPurchase } from '@/lib/track'

// Owns the Stripe return URL. `?purchase=success` is not treated as a
// purchase until /api/checkout/confirm says the session is paid.
export function CheckoutReturnHandler() {
  const [banner, setBanner] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const purchase = params.get('purchase')
    if (purchase !== 'success' && purchase !== 'cancelled') return

    const sessionId = params.get('session_id')
    let cancelled = false

    async function run() {
      if (purchase === 'cancelled') {
        if (!cancelled) setBanner('購入がキャンセルされました')
        clean()
        return
      }
      if (!sessionId) {
        if (!cancelled) setBanner('決済結果を確認できませんでした。サインイン状態でこのページを開き直してください。')
        clean()
        return
      }
      try {
        const r = await fetch(`/api/checkout/confirm?session_id=${encodeURIComponent(sessionId)}`)
        const data = await r.json().catch(() => ({}))
        if (cancelled) return
        if (data?.confirmed) {
          trackPurchase({
            transactionId: data.transactionId || sessionId,
            value: Number(data.value ?? 0),
            currency: data.currency || 'JPY',
            credits: Number(data.credits ?? 150),
          })
          setBanner('🎉 ポイントが追加されました')
          window.dispatchEvent(new CustomEvent('prompta:credits-updated'))
        } else if (r.status === 401) {
          setBanner('決済は完了している場合があります。同じメールでサインインするとポイントが表示されます。')
        } else {
          setBanner('決済の確認が取れませんでした。反映まで少し待ってからページを更新してください。')
        }
      } catch {
        if (!cancelled) setBanner('決済の確認中に通信エラーが発生しました。')
      } finally {
        clean()
      }
    }

    function clean() {
      const u = new URL(window.location.href)
      u.searchParams.delete('purchase')
      u.searchParams.delete('session_id')
      window.history.replaceState({}, '', u.toString())
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [])

  if (!banner) return null
  return (
    <div className="max-w-3xl mx-auto px-4 pt-4" data-testid="purchase-banner">
      <div className="px-4 py-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-sm text-center">
        {banner}
        <button
          type="button"
          onClick={() => setBanner(null)}
          className="ml-3 text-emerald-600 hover:text-emerald-800"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
