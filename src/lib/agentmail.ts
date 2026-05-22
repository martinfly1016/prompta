// Thin AgentMail wrapper — outbound transactional email.
// Inbox is configured via AGENTMAIL_INBOX_ID env var.

const AGENTMAIL_API = 'https://api.agentmail.to/v0'

// Single source of truth for the inbox address — used both as the
// AgentMail API path segment and as the user-facing "From" / contact email
// across auth, privacy, terms.
export const FROM_EMAIL = process.env.AGENTMAIL_INBOX_ID || 'terribleassignment338@agentmail.to'
const INBOX_ID = FROM_EMAIL

export const agentmailEnabled = Boolean(process.env.AGENTMAIL_API_KEY)

export interface SendEmailParams {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}

export async function sendEmail(p: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.AGENTMAIL_API_KEY
  if (!key) return { ok: false, error: 'AGENTMAIL_API_KEY not set' }

  const url = `${AGENTMAIL_API}/inboxes/${encodeURIComponent(INBOX_ID)}/messages/send`
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
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'fetch failed' }
  }
}
