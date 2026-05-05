// Stateless 1-hour recovery tokens for paid credit accounts.
// Token format: base64url(emailHash:expSec).hmacSig
// HMAC keyed by NEXTAUTH_SECRET, separate purpose tag from the credits cookie HMAC.

import { createHmac, timingSafeEqual } from 'node:crypto'

const SECRET = process.env.NEXTAUTH_SECRET || 'dev-fallback-do-not-use'
const PURPOSE = 'credit-recovery'
const TTL_SECONDS = 60 * 60 // 1 hour

function sign(payload: string): string {
  return createHmac('sha256', SECRET)
    .update(`${PURPOSE}:${payload}`)
    .digest('hex')
    .slice(0, 32)
}

function b64url(s: string): string {
  return Buffer.from(s, 'utf8').toString('base64url')
}

function fromB64url(s: string): string {
  return Buffer.from(s, 'base64url').toString('utf8')
}

export function signRecoveryToken(emailHash: string): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS
  const payload = `${emailHash}:${exp}`
  const sig = sign(payload)
  return `${b64url(payload)}.${sig}`
}

export function verifyRecoveryToken(token: string): { ok: true; emailHash: string } | { ok: false; reason: string } {
  if (!token || typeof token !== 'string') return { ok: false, reason: 'missing' }
  const [payloadB, sig] = token.split('.')
  if (!payloadB || !sig) return { ok: false, reason: 'malformed' }
  let payload: string
  try {
    payload = fromB64url(payloadB)
  } catch {
    return { ok: false, reason: 'malformed' }
  }
  const expected = sign(payload)
  try {
    if (
      sig.length !== expected.length ||
      !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    ) {
      return { ok: false, reason: 'bad_signature' }
    }
  } catch {
    return { ok: false, reason: 'bad_signature' }
  }
  const [emailHash, expStr] = payload.split(':')
  if (!emailHash || !expStr) return { ok: false, reason: 'malformed' }
  const exp = parseInt(expStr, 10)
  if (!Number.isFinite(exp) || Date.now() / 1000 > exp) {
    return { ok: false, reason: 'expired' }
  }
  return { ok: true, emailHash }
}
