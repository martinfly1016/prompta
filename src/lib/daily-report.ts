/**
 * Daily report builder for Vercel cron — pulls GA / GSC / DB data and
 * composes a compact markdown summary for email delivery.
 *
 * Designed to run as a serverless function (Node.js runtime), not as a
 * tsx script. Heavy reasoning (root-cause analysis, action items) stays
 * in the interactive /data-analys agent flow; this lib only emits raw
 * numbers + week-over-week deltas + a few rule-based highlights.
 *
 * Total runtime should stay under 30s to leave headroom on Vercel's
 * 60s maxDuration.
 */
import { google } from 'googleapis'
import { PrismaClient } from '@prisma/client'
import { createHash } from 'node:crypto'

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || ''
const GSC_SITE = process.env.GSC_SITE_URL || 'sc-domain:prompta.jp'

// Mirror src/scripts/data-analys/_owner_exclusion.ts. Inlined to avoid
// cross-folder import; if the list changes there, update here too.
const OWNER_TEST_EMAILS = [
  'e2e-test+t1@prompta.jp',
  'e2e-test+t2@prompta.jp',
  'e2e-test+t3@prompta.jp',
  'martinfly1016@gmail.com',
  'yuchao@byte-ad.com',
]
const OWNER_TEST_EMAIL_HASHES = OWNER_TEST_EMAILS.map((e) =>
  createHash('sha256').update(e.toLowerCase().trim()).digest('hex'),
)

function loadCreds(): Record<string, unknown> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var not set')
  // Try inline JSON first (preferred for serverless / Vercel)
  try {
    return JSON.parse(raw)
  } catch {
    // Fall back to file path (dev / local tsx runs)
    try {
      const fs = require('node:fs') as typeof import('node:fs')
      if (fs.existsSync(raw)) return JSON.parse(fs.readFileSync(raw, 'utf8'))
    } catch {
      // ignore — fall through to throw below
    }
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_JSON must be inline JSON (serverless) or a path to a JSON key file (local).',
    )
  }
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function pct(cur: number, prev: number): string {
  if (prev === 0) return cur === 0 ? '±0%' : '新規'
  const p = ((cur - prev) / prev) * 100
  const sign = p >= 0 ? '+' : ''
  return `${sign}${p.toFixed(1)}%`
}

function trend(cur: number, prev: number, posIsGood = true): string {
  if (prev === 0) return cur > 0 ? '🆕' : '⚪'
  const p = ((cur - prev) / prev) * 100
  if (Math.abs(p) < 5) return '⚪'
  const isGood = posIsGood ? p > 0 : p < 0
  if (Math.abs(p) >= 30) return isGood ? '🟢🟢' : '🔴🔴'
  return isGood ? '🟢' : '🔴'
}

interface PeriodWindows {
  thisStart: string
  thisEnd: string
  prevStart: string
  prevEnd: string
}

function computeWindows(): PeriodWindows {
  const end = new Date()
  end.setDate(end.getDate() - 1) // yesterday — today's data is incomplete
  const thisStart = new Date(end)
  thisStart.setDate(end.getDate() - 6)
  const prevEnd = new Date(thisStart)
  prevEnd.setDate(thisStart.getDate() - 1)
  const prevStart = new Date(prevEnd)
  prevStart.setDate(prevEnd.getDate() - 6)
  return {
    thisStart: ymd(thisStart),
    thisEnd: ymd(end),
    prevStart: ymd(prevStart),
    prevEnd: ymd(prevEnd),
  }
}

async function gaTrafficPeriods(ga: any, w: PeriodWindows) {
  async function fetchPeriod(start: string, end: string) {
    const r = await ga.properties.runReport({
      property: 'properties/' + GA4_PROPERTY_ID,
      requestBody: {
        dateRanges: [{ startDate: start, endDate: end }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
        ],
      },
    })
    const row = r.data.rows?.[0]
    return {
      sessions: parseInt(row?.metricValues?.[0]?.value || '0'),
      activeUsers: parseInt(row?.metricValues?.[1]?.value || '0'),
      pageviews: parseInt(row?.metricValues?.[2]?.value || '0'),
      bounceRate: parseFloat(row?.metricValues?.[3]?.value || '0') * 100,
    }
  }
  const [thisP, prevP] = await Promise.all([
    fetchPeriod(w.thisStart, w.thisEnd),
    fetchPeriod(w.prevStart, w.prevEnd),
  ])
  return { thisP, prevP }
}

async function gaReferralCounts(ga: any, w: PeriodWindows, sources: string[]) {
  async function fetchPeriod(start: string, end: string) {
    const r = await ga.properties.runReport({
      property: 'properties/' + GA4_PROPERTY_ID,
      requestBody: {
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: {
          orGroup: {
            expressions: sources.map((src) => ({
              filter: { fieldName: 'sessionSource', stringFilter: { value: src } },
            })),
          },
        },
        limit: '50',
      },
    })
    const m: Record<string, number> = Object.fromEntries(sources.map((s) => [s, 0]))
    for (const row of r.data.rows || []) {
      const src = row.dimensionValues?.[0]?.value || ''
      m[src] = parseInt(row.metricValues?.[0]?.value || '0')
    }
    return m
  }
  const [thisM, prevM] = await Promise.all([
    fetchPeriod(w.thisStart, w.thisEnd),
    fetchPeriod(w.prevStart, w.prevEnd),
  ])
  return { thisM, prevM }
}

async function gscPeriods(searchconsole: any, w: PeriodWindows) {
  async function fetchPeriod(start: string, end: string) {
    const r = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: {
        startDate: start,
        endDate: end,
        rowLimit: 1,
      },
    })
    const row = r.data.rows?.[0]
    return {
      clicks: row?.clicks || 0,
      impressions: row?.impressions || 0,
      ctr: (row?.ctr || 0) * 100,
      position: row?.position || 0,
    }
  }
  const [thisP, prevP] = await Promise.all([
    fetchPeriod(w.thisStart, w.thisEnd),
    fetchPeriod(w.prevStart, w.prevEnd),
  ])
  return { thisP, prevP }
}

async function dbToolUsage(prisma: PrismaClient, w: PeriodWindows) {
  const since = new Date(w.thisStart + 'T00:00:00Z')
  const prevSince = new Date(w.prevStart + 'T00:00:00Z')
  const prevEnd = since

  const exclude = { OR: [{ emailHash: null }, { emailHash: { notIn: OWNER_TEST_EMAIL_HASHES } }] }

  async function tool(toolName: string) {
    const thisCalls = await prisma.toolUsage.findMany({
      where: { tool: toolName, createdAt: { gte: since }, ...exclude },
      select: { type: true, anonId: true, emailHash: true },
    })
    const prevCount = await prisma.toolUsage.count({
      where: { tool: toolName, createdAt: { gte: prevSince, lt: prevEnd }, ...exclude },
    })
    return {
      total: thisCalls.length,
      free: thisCalls.filter((c) => c.type === 'free').length,
      paid: thisCalls.filter((c) => c.type === 'paid').length,
      uniqueAnon: new Set(thisCalls.map((c) => c.anonId)).size,
      uniqueEmail: new Set(thisCalls.filter((c) => c.emailHash).map((c) => c.emailHash)).size,
      prevTotal: prevCount,
    }
  }

  const [pc, hc] = await Promise.all([tool('personal-color'), tool('hair-color')])

  // Payments + balances + new signups
  const thisPay = await prisma.stripePayment.aggregate({
    where: { status: 'paid', createdAt: { gte: since } },
    _count: true,
    _sum: { amountJpy: true },
  })
  const prevPay = await prisma.stripePayment.aggregate({
    where: { status: 'paid', createdAt: { gte: prevSince, lt: prevEnd } },
    _count: true,
    _sum: { amountJpy: true },
  })

  // PaidCredits stats (real users, excluding owner)
  const allCredits = await prisma.paidCredits.findMany({
    select: { email: true, balance: true, totalEarned: true, lastPurchase: true, createdAt: true },
  })
  const TEST = new Set([...OWNER_TEST_EMAILS, 'admin@example.com'])
  const real = allCredits.filter((c) => !TEST.has(c.email))
  const realPaid = real.filter((c) => c.lastPurchase).length
  const newSignups7d = real.filter((c) => c.createdAt >= since).length

  return { pc, hc, thisPay, prevPay, totalRealUsers: real.length, realPaid, newSignups7d }
}

async function dbNewPrompts(prisma: PrismaClient, w: PeriodWindows) {
  const since = new Date(w.thisStart + 'T00:00:00Z')
  const prompts = await prisma.prompt.findMany({
    where: { createdAt: { gte: since }, isPublished: true },
    select: { category: { select: { slug: true } }, tool: { select: { slug: true } } },
  })
  const cats: Record<string, number> = {}
  const tools: Record<string, number> = {}
  for (const p of prompts) {
    if (p.category?.slug) cats[p.category.slug] = (cats[p.category.slug] || 0) + 1
    if (p.tool?.slug) tools[p.tool.slug] = (tools[p.tool.slug] || 0) + 1
  }
  return { total: prompts.length, cats, tools }
}

async function dbTagBacklog(prisma: PrismaClient) {
  const total = await prisma.tag.count()
  const approved = await prisma.tag.count({ where: { isApproved: true } })
  const noindex = total - approved
  const noindexPct = total ? (noindex / total) * 100 : 0
  return { total, approved, noindex, noindexPct }
}

async function dbPaywallHits(prisma: PrismaClient, w: PeriodWindows) {
  const since = new Date(w.thisStart + 'T00:00:00Z')
  const exclude = { OR: [{ emailHash: null }, { emailHash: { notIn: OWNER_TEST_EMAIL_HASHES } }] }

  async function tool(toolName: string) {
    const usages = await prisma.toolUsage.findMany({
      where: { tool: toolName, createdAt: { gte: since }, ...exclude },
      select: { anonId: true, type: true },
    })
    const byAnon = new Map<string, { free: number; paid: number }>()
    for (const u of usages) {
      const cur = byAnon.get(u.anonId) ?? { free: 0, paid: 0 }
      if (u.type === 'free') cur.free++
      else cur.paid++
      byAnon.set(u.anonId, cur)
    }
    const counts = Array.from(byAnon.values())
    return {
      uniqueAnons: byAnon.size,
      exhausted: counts.filter((c) => c.free >= 3).length,
      paid: counts.filter((c) => c.paid > 0).length,
    }
  }
  const [pc, hc] = await Promise.all([tool('personal-color'), tool('hair-color')])
  return { pc, hc }
}

export async function buildDailyReport(): Promise<string> {
  const creds = loadCreds()
  const auth = new google.auth.GoogleAuth({
    credentials: creds as any,
    scopes: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/webmasters.readonly',
    ],
  })
  const ga = google.analyticsdata({ version: 'v1beta', auth })
  const sc = google.searchconsole({ version: 'v1', auth })
  const prisma = new PrismaClient()
  const w = computeWindows()

  try {
    const [traffic, refs, gsc, tu, nc, tb, ph] = await Promise.all([
      gaTrafficPeriods(ga, w),
      gaReferralCounts(ga, w, ['chatgpt.com', 'openai', 'perplexity', 'copilot.com', 'qiita.com']),
      gscPeriods(sc, w),
      dbToolUsage(prisma, w),
      dbNewPrompts(prisma, w),
      dbTagBacklog(prisma),
      dbPaywallHits(prisma, w),
    ])

    return formatReport(w, { traffic, refs, gsc, tu, nc, tb, ph })
  } finally {
    await prisma.$disconnect()
  }
}

function formatReport(w: PeriodWindows, d: any): string {
  const { traffic, refs, gsc, tu, nc, tb, ph } = d
  const lines: string[] = []

  lines.push(`# Prompta 日報 ${w.thisStart} ~ ${w.thisEnd}`)
  lines.push('')
  lines.push(`データ取得時刻: ${new Date().toISOString()} (UTC)`)
  lines.push(`比較期間: ${w.prevStart} ~ ${w.prevEnd}`)
  lines.push('')

  // §1 traffic
  lines.push('## 1. 站点流量')
  lines.push('')
  lines.push('| 指标 | 本周 | 上周 | Δ | 状态 |')
  lines.push('|---|---|---|---|---|')
  lines.push(`| GA sessions | ${traffic.thisP.sessions} | ${traffic.prevP.sessions} | ${pct(traffic.thisP.sessions, traffic.prevP.sessions)} | ${trend(traffic.thisP.sessions, traffic.prevP.sessions)} |`)
  lines.push(`| GA 活跃用户 | ${traffic.thisP.activeUsers} | ${traffic.prevP.activeUsers} | ${pct(traffic.thisP.activeUsers, traffic.prevP.activeUsers)} | ${trend(traffic.thisP.activeUsers, traffic.prevP.activeUsers)} |`)
  lines.push(`| GA PV | ${traffic.thisP.pageviews} | ${traffic.prevP.pageviews} | ${pct(traffic.thisP.pageviews, traffic.prevP.pageviews)} | ${trend(traffic.thisP.pageviews, traffic.prevP.pageviews)} |`)
  lines.push(`| GA bounce | ${traffic.thisP.bounceRate.toFixed(1)}% | ${traffic.prevP.bounceRate.toFixed(1)}% | ${(traffic.thisP.bounceRate - traffic.prevP.bounceRate).toFixed(1)}pp | ${trend(traffic.thisP.bounceRate, traffic.prevP.bounceRate, false)} |`)
  lines.push(`| GSC clicks | ${gsc.thisP.clicks} | ${gsc.prevP.clicks} | ${pct(gsc.thisP.clicks, gsc.prevP.clicks)} | ${trend(gsc.thisP.clicks, gsc.prevP.clicks)} |`)
  lines.push(`| GSC 曝光 | ${gsc.thisP.impressions} | ${gsc.prevP.impressions} | ${pct(gsc.thisP.impressions, gsc.prevP.impressions)} | ${trend(gsc.thisP.impressions, gsc.prevP.impressions)} |`)
  lines.push(`| GSC CTR | ${gsc.thisP.ctr.toFixed(2)}% | ${gsc.prevP.ctr.toFixed(2)}% | ${(gsc.thisP.ctr - gsc.prevP.ctr).toFixed(2)}pp | ${trend(gsc.thisP.ctr, gsc.prevP.ctr)} |`)
  lines.push(`| GSC 平均排名 | ${gsc.thisP.position.toFixed(2)} | ${gsc.prevP.position.toFixed(2)} | ${(gsc.thisP.position - gsc.prevP.position).toFixed(2)} | ${trend(gsc.prevP.position, gsc.thisP.position)} |`)
  lines.push('')
  lines.push('> GSC 数据有 24-48h 延迟。GA 与 GSC 强烈背离时（如 GA +5% / GSC -30%）首先怀疑 GSC 数据未补齐，不要急下结论。')
  lines.push('')

  // §2 GEO
  lines.push('## 2. GEO / Referral 信号')
  lines.push('')
  lines.push('| Source | 本周 | 上周 | Δ |')
  lines.push('|---|---|---|---|')
  for (const src of ['chatgpt.com', 'openai', 'perplexity', 'copilot.com', 'qiita.com']) {
    const cur = refs.thisM[src] || 0
    const prv = refs.prevM[src] || 0
    if (cur === 0 && prv === 0) continue
    lines.push(`| ${src} | ${cur} | ${prv} | ${pct(cur, prv)} ${trend(cur, prv)} |`)
  }
  lines.push('')

  // §3 tools
  lines.push('## 3. 工具使用（排除 owner）')
  lines.push('')
  lines.push('| 工具 | 调用本周 | free | paid | uniqAnon | uniqEmail | 上周 | Δ |')
  lines.push('|---|---|---|---|---|---|---|---|')
  lines.push(`| personal-color | ${tu.pc.total} | ${tu.pc.free} | ${tu.pc.paid} | ${tu.pc.uniqueAnon} | ${tu.pc.uniqueEmail} | ${tu.pc.prevTotal} | ${pct(tu.pc.total, tu.pc.prevTotal)} |`)
  lines.push(`| hair-color | ${tu.hc.total} | ${tu.hc.free} | ${tu.hc.paid} | ${tu.hc.uniqueAnon} | ${tu.hc.uniqueEmail} | ${tu.hc.prevTotal} | ${pct(tu.hc.total, tu.hc.prevTotal)} |`)
  lines.push('')
  lines.push(`**累计真实用户**: ${tu.totalRealUsers} 个注册 · ${tu.realPaid} 个付费`)
  lines.push(`**本周新注册**: ${tu.newSignups7d} 个`)
  lines.push('')

  // §3.5 payments
  const thisRev = tu.thisPay._sum.amountJpy || 0
  const prevRev = tu.prevPay._sum.amountJpy || 0
  lines.push('## 3.5 收入')
  lines.push('')
  lines.push(`- **本周**: ${tu.thisPay._count} 笔 · ¥${thisRev}`)
  lines.push(`- **上周**: ${tu.prevPay._count} 笔 · ¥${prevRev}`)
  lines.push('')

  // §3.6 paywall hits DB fallback
  lines.push('## 3.6 Paywall DB 兜底（≥3 free 撞墙数）')
  lines.push('')
  lines.push('| 工具 | uniqueAnon | exhausted | paid |')
  lines.push('|---|---|---|---|')
  lines.push(`| personal-color | ${ph.pc.uniqueAnons} | ${ph.pc.exhausted} | ${ph.pc.paid} |`)
  lines.push(`| hair-color | ${ph.hc.uniqueAnons} | ${ph.hc.exhausted} | ${ph.hc.paid} |`)
  lines.push('')

  // §4 new content
  lines.push('## 4. 新内容（7d）')
  lines.push('')
  lines.push(`- 入库 **${nc.total}** 条 prompt`)
  if (nc.total > 0) {
    const catStr = Object.entries(nc.cats)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([k, v]) => `${k}:${v}`)
      .join(' · ')
    const toolStr = Object.entries(nc.tools)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([k, v]) => `${k}:${v}`)
      .join(' · ')
    lines.push(`- 分类: ${catStr}`)
    lines.push(`- 工具: ${toolStr}`)
  }
  lines.push('')
  lines.push(`**Tag backlog**: ${tb.approved} approved / ${tb.total} 总 / **${tb.noindexPct.toFixed(1)}% noindex**`)
  lines.push('')

  // §5 highlights
  lines.push('## 5. 自动高亮')
  lines.push('')
  const highlights: string[] = []
  const chatGptCur = refs.thisM['chatgpt.com'] || 0
  const chatGptPrev = refs.prevM['chatgpt.com'] || 0
  if (chatGptPrev > 0 && (chatGptCur - chatGptPrev) / chatGptPrev > 0.3) {
    highlights.push(`🟢 chatgpt.com referral +${(((chatGptCur - chatGptPrev) / chatGptPrev) * 100).toFixed(0)}% (${chatGptCur} vs ${chatGptPrev}) — GEO 信号加速`)
  }
  if (gsc.thisP.clicks > 0 && traffic.thisP.sessions > 0) {
    const gscDelta = ((gsc.thisP.clicks - gsc.prevP.clicks) / Math.max(gsc.prevP.clicks, 1)) * 100
    const gaDelta = ((traffic.thisP.sessions - traffic.prevP.sessions) / Math.max(traffic.prevP.sessions, 1)) * 100
    if (gscDelta < -20 && gaDelta > 0) {
      highlights.push(`⚠️ GSC clicks ${gscDelta.toFixed(0)}% vs GA sessions +${gaDelta.toFixed(0)}% — 数据延迟假象，等 5/19 复查`)
    }
  }
  if (tu.thisPay._count === 0) {
    highlights.push(`🔴 本周 0 新付费成交 · 累计真实付费 ${tu.realPaid}/${tu.totalRealUsers} · 本周新注册 ${tu.newSignups7d}`)
  }
  if (tu.newSignups7d >= 3) {
    highlights.push(`🟢 本周新注册 ${tu.newSignups7d} 个真实用户 — 跟踪 7 日内是否撞 welcome credit 上限`)
  }
  if (nc.total >= 30) {
    highlights.push(`📦 本周入库 ${nc.total} 条 prompt`)
  }
  if (tb.noindexPct > 80) {
    highlights.push(`🔴 noindex tag 占比 ${tb.noindexPct.toFixed(0)}% > 80% — 需要 R{next} 清理`)
  }
  if (ph.pc.exhausted === 0 && ph.hc.exhausted === 0) {
    highlights.push(`⚪ 本周真实撞墙样本 = 0（paywall 决策样本仍不足）`)
  }
  if (highlights.length === 0) highlights.push('（无显著异常）')
  for (const h of highlights) lines.push(`- ${h}`)
  lines.push('')

  lines.push('---')
  lines.push('')
  lines.push('> 完整深度分析（行动建议 + 头部词排名 + 参数化效果）：在终端跑 `/data-analys daily-report`')
  lines.push('> 这封自动日報只覆盖核心数据快照，不含 AI 解读。')

  return lines.join('\n')
}
