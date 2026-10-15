// Transactional email.
// Resend is the primary transport. AgentMail is used only when
// RESEND_API_KEY is unset — a Resend HTTP failure does not fall back,
// so a bad From address cannot silently send from the old inbox.

import { SITE_CONFIG } from '@/lib/constants'

const AGENTMAIL_API = 'https://api.agentmail.to/v0'
const RESEND_API = 'https://api.resend.com/emails'
const DEFAULT_EMAIL_FROM = 'Prompta <noreply@mail.prompta.jp>'

// Resend From header. Display name is part of the string; the send API
// accepts "Name <email@domain>" and the domain must be verified in Resend.
export const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || DEFAULT_EMAIL_FROM

// Public contact address on the legal pages. This is not the transactional
// From address and must not follow AGENTMAIL_INBOX_ID.
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim() || SITE_CONFIG.email

// AgentMail's From address is the inbox id itself. EMAIL_FROM cannot be
// reused here because it includes a display name.
const AGENTMAIL_INBOX_ID =
  process.env.AGENTMAIL_INBOX_ID?.trim() || 'terribleassignment338@agentmail.to'

export const agentmailEnabled = Boolean(process.env.AGENTMAIL_API_KEY?.trim())
export const emailEnabled = Boolean(
  process.env.RESEND_API_KEY?.trim() || process.env.AGENTMAIL_API_KEY?.trim(),
)

export interface SendEmailParams {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}

export async function sendEmail(p: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
  const resendKey = process.env.RESEND_API_KEY?.trim()
  if (resendKey) return sendViaResend(resendKey, p)
  return sendViaAgentMail(p)
}

async function sendViaResend(
  key: string,
  p: SendEmailParams,
): Promise<{ ok: boolean; error?: string }> {
  const payload: {
    from: string
    to: string[]
    subject: string
    text: string
    html?: string
    reply_to?: string
  } = {
    from: EMAIL_FROM,
    to: [p.to],
    subject: p.subject,
    text: p.text,
  }
  if (p.html) payload.html = p.html
  if (p.replyTo) payload.reply_to = p.replyTo

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const txt = await res.text()
      return { ok: false, error: `Resend ${res.status}: ${txt.slice(0, 200)}` }
    }
    return { ok: true }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'fetch failed'
    return { ok: false, error: message }
  }
}

async function sendViaAgentMail(p: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.AGENTMAIL_API_KEY?.trim()
  if (!key) return { ok: false, error: 'RESEND_API_KEY not set' }

  const url = `${AGENTMAIL_API}/inboxes/${encodeURIComponent(AGENTMAIL_INBOX_ID)}/messages/send`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: p.to,
        subject: p.subject,
        text: p.text,
        html: p.html,
        reply_to: p.replyTo,
      }),
    })
    if (!res.ok) {
      const txt = await res.text()
      return { ok: false, error: `AgentMail ${res.status}: ${txt.slice(0, 200)}` }
    }
    return { ok: true }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'fetch failed'
    return { ok: false, error: message }
  }
}
