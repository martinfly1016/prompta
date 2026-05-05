import { NextRequest, NextResponse } from 'next/server'
import {
  ensureAnonId,
  extractClientIp,
  getQuotaState,
  hashIp,
} from '@/lib/tool-quota'

const TOOL = 'personal-color'

export async function GET(req: NextRequest) {
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)
  const state = await getQuotaState(anonId, ipHash, TOOL)
  return NextResponse.json(state)
}
