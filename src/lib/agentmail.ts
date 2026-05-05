// Thin AgentMail wrapper — outbound transactional email via the existing
// prompta-agent@agentmail.to inbox.

const AGENTMAIL_API = 'https://api.agentmail.to/v0'
const INBOX_ID = process.env.AGENTMAIL_INBOX_ID || 'prompta-agent@agentmail.to'

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
