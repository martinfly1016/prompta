'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          message: String(data.get('message') ?? ''),
          website: String(data.get('website') ?? ''),
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.ok) {
        setStatus('error')
        setError(typeof body.error === 'string' ? body.error : '送信に失敗しました。')
        return
      }
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setError('送信に失敗しました。時間をおいて再度お試しください。')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          ウェブサイト
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-900 mb-1">お名前</label>
        <input
          id="contact-name"
          name="name"
          required
          maxLength={80}
          autoComplete="name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-900 mb-1">メールアドレス</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-900 mb-1">内容</label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
        <p className="mt-1 text-xs text-gray-500">10文字以上で入力してください。</p>
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
      >
        {status === 'sending' ? '送信中…' : '送信する'}
      </button>
      {status === 'sent' && (
        <p className="text-sm text-green-700" role="status">送信しました。内容を確認し、返信が必要な場合はご連絡します。</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-700" role="alert">
          {error} 届かない場合は <a className="underline" href={`mailto:${email}`}>{email}</a> まで直接お送りください。
        </p>
      )}
    </form>
  )
}
