import { NextRequest, NextResponse } from 'next/server'
import {
  consumeFreeQuota,
  ensureAnonId,
  extractClientIp,
  hashIp,
} from '@/lib/tool-quota'

const TOOL = 'personal-color'

// POST = consume one free use. Returns updated quota state.
// In Phase 1 this just tracks the consumption — actual Gemini analysis ships
// in Phase 3.
export async function POST(req: NextRequest) {
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)
  const state = await consumeFreeQuota(anonId, ipHash, TOOL)
  if (state.blockReason !== 'none') {
    return NextResponse.json(state, { status: 429 })
  }
  return NextResponse.json(state)
}
