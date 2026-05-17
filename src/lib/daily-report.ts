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
import { WATCH_KEYWORDS, type WatchKeyword } from './seo/watch-keywords'

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

interface WatchKeywordResult {
  config: WatchKeyword
  thisPos: number | null
  prevPos: number | null
  thisImp: number
  prevImp: number
  thisClicks: number
  topPage: string | null
}

async function gscWatchKeywords(
  searchconsole: any,
  w: PeriodWindows,
): Promise<WatchKeywordResult[]> {
  // GSC API: query keyword + page, filter by exact keyword match for each
  // watch entry. Two periods → 2 * N requests but each is fast (~200ms).
  async function fetchPeriod(start: string, end: string) {
    const r = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: {
        startDate: start,
        endDate: end,
        dimensions: ['query', 'page'],
        rowLimit: 25000,
      },
    })
    return r.data.rows || []
  }
  const [thisRows, prevRows] = await Promise.all([
    fetchPeriod(w.thisStart, w.thisEnd),
    fetchPeriod(w.prevStart, w.prevEnd),
  ])

  // Build per-keyword aggregation maps
  type Agg = { pos: number; imp: number; clicks: number; topPage: string }
  function aggregate(rows: any[]): Map<string, Agg> {
    const byKw = new Map<string, { weightedPosSum: number; totalImp: number; clicks: number; pages: Map<string, number> }>()
    for (const row of rows) {
      const kw = row.keys?.[0]
      const page = row.keys?.[1]
      if (!kw || !page) continue
      const imp = row.impressions || 0
      if (imp === 0) continue
      const pos = row.position || 0
      const clicks = row.clicks || 0
      let entry = byKw.get(kw)
      if (!entry) {
        entry = { weightedPosSum: 0, totalImp: 0, clicks: 0, pages: new Map() }
        byKw.set(kw, entry)
      }
      entry.weightedPosSum += pos * imp
      entry.totalImp += imp
      entry.clicks += clicks
      entry.pages.set(page, (entry.pages.get(page) || 0) + imp)
    }
    const out = new Map<string, Agg>()
    for (const [kw, e] of byKw) {
      let topPage = ''
      let maxImp = 0
      for (const [p, i] of e.pages) {
        if (i > maxImp) {
          maxImp = i
          topPage = p
        }
      }
      out.set(kw, {
        pos: e.totalImp > 0 ? e.weightedPosSum / e.totalImp : 0,
        imp: e.totalImp,
        clicks: e.clicks,
        topPage,
      })
    }
    return out
  }
  const thisMap = aggregate(thisRows)
  const prevMap = aggregate(prevRows)

  return WATCH_KEYWORDS.map((config) => {
    const t = thisMap.get(config.keyword)
    const p = prevMap.get(config.keyword)
    return {
      config,
      thisPos: t ? t.pos : null,
      prevPos: p ? p.pos : null,
      thisImp: t ? t.imp : 0,
      prevImp: p ? p.imp : 0,
      thisClicks: t ? t.clicks : 0,
      topPage: t ? t.topPage : null,
    }
  })
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

export interface DailyReportOutput {
  text: string
  html: string
  subject: string
}

export async function buildDailyReport(): Promise<DailyReportOutput> {
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
    const [traffic, refs, gsc, tu, nc, tb, ph, kws] = await Promise.all([
      gaTrafficPeriods(ga, w),
      gaReferralCounts(ga, w, ['chatgpt.com', 'openai', 'perplexity', 'copilot.com', 'qiita.com']),
      gscPeriods(sc, w),
      dbToolUsage(prisma, w),
      dbNewPrompts(prisma, w),
      dbTagBacklog(prisma),
      dbPaywallHits(prisma, w),
      gscWatchKeywords(sc, w),
    ])

    const d = { traffic, refs, gsc, tu, nc, tb, ph, kws }
    const highlights = buildHighlights(d)
    return {
      subject: `Prompta 日報 ${w.thisStart} ~ ${w.thisEnd}`,
      text: formatReport(w, d, highlights),
      html: formatReportHtml(w, d, highlights),
    }
  } finally {
    await prisma.$disconnect()
  }
}

function buildHighlights(d: any): string[] {
  const { traffic, refs, gsc, tu, nc, tb, ph, kws } = d
  const out: string[] = []
  // Watch keyword regressions / breakthroughs
  for (const k of (kws as WatchKeywordResult[]) || []) {
    if (k.thisPos === null || k.prevPos === null) continue
    const delta = k.thisPos - k.prevPos
    // top10-defense regression: ANY drop out of top 10 is a red flag
    if (k.config.cluster === 'top10-defense' && k.prevPos <= 10 && k.thisPos > 10) {
      out.push(`🔴 「${k.config.keyword}」跌出 top 10 (${k.prevPos.toFixed(1)} → ${k.thisPos.toFixed(1)}) — 立即排查`)
    }
    // Big breakthrough (drop ≥ 10 positions)
    if (delta <= -10 && k.thisImp >= 5) {
      out.push(`🟢 「${k.config.keyword}」排名大涨 ${(-delta).toFixed(1)} 位 (${k.prevPos.toFixed(1)} → ${k.thisPos.toFixed(1)})`)
    }
    // Big regression (climb ≥ 10 positions)
    if (delta >= 10 && k.prevImp >= 5) {
      out.push(`🔴 「${k.config.keyword}」排名跌 ${delta.toFixed(1)} 位 (${k.prevPos.toFixed(1)} → ${k.thisPos.toFixed(1)})`)
    }
  }
  const chatGptCur = refs.thisM['chatgpt.com'] || 0
  const chatGptPrev = refs.prevM['chatgpt.com'] || 0
  if (chatGptPrev > 0 && (chatGptCur - chatGptPrev) / chatGptPrev > 0.3) {
    out.push(`🟢 chatgpt.com referral +${(((chatGptCur - chatGptPrev) / chatGptPrev) * 100).toFixed(0)}% (${chatGptCur} vs ${chatGptPrev}) — GEO 信号加速`)
  }
  if (gsc.thisP.clicks > 0 && traffic.thisP.sessions > 0) {
    const gscDelta = ((gsc.thisP.clicks - gsc.prevP.clicks) / Math.max(gsc.prevP.clicks, 1)) * 100
    const gaDelta = ((traffic.thisP.sessions - traffic.prevP.sessions) / Math.max(traffic.prevP.sessions, 1)) * 100
    if (gscDelta < -20 && gaDelta > 0) {
      out.push(`⚠️ GSC clicks ${gscDelta.toFixed(0)}% vs GA sessions +${gaDelta.toFixed(0)}% — 数据延迟假象，等 24-48h 数据补齐再判`)
    }
  }
  if (tu.thisPay._count === 0) {
    out.push(`🔴 本周 0 新付费成交 · 累计真实付费 ${tu.realPaid}/${tu.totalRealUsers} · 本周新注册 ${tu.newSignups7d}`)
  }
  if (tu.newSignups7d >= 3) {
    out.push(`🟢 本周新注册 ${tu.newSignups7d} 个真实用户 — 跟踪 7 日内是否撞 welcome credit 上限`)
  }
  if (nc.total >= 30) {
    out.push(`📦 本周入库 ${nc.total} 条 prompt`)
  }
  if (tb.noindexPct > 80) {
    out.push(`🔴 noindex tag 占比 ${tb.noindexPct.toFixed(0)}% > 80% — 需要批量审批清理`)
  }
  if (ph.pc.exhausted === 0 && ph.hc.exhausted === 0) {
    out.push(`⚪ 本周真实撞墙样本 = 0（paywall 决策样本仍不足）`)
  }
  if (out.length === 0) out.push('（无显著异常）')
  return out
}

function formatReport(w: PeriodWindows, d: any, highlights: string[]): string {
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
  for (const h of highlights) lines.push(`- ${h}`)
  lines.push('')

  // §6 watch keywords
  const kws = d.kws as WatchKeywordResult[]
  if (kws && kws.length > 0) {
    lines.push('## 6. 重点关键词追踪')
    lines.push('')
    const byCluster = new Map<string, WatchKeywordResult[]>()
    for (const k of kws) {
      const c = k.config.cluster
      if (!byCluster.has(c)) byCluster.set(c, [])
      byCluster.get(c)!.push(k)
    }
    for (const [cluster, list] of byCluster) {
      lines.push(`### ${cluster}`)
      lines.push('| 关键词 | 本周 pos | 上周 pos | Δ | imp 本/上 | clicks |')
      lines.push('|---|---|---|---|---|---|')
      for (const k of list) {
        const cur = k.thisPos !== null ? k.thisPos.toFixed(1) : '—'
        const prv = k.prevPos !== null ? k.prevPos.toFixed(1) : '—'
        let delta = '—'
        if (k.thisPos !== null && k.prevPos !== null) {
          const d = k.thisPos - k.prevPos
          delta = `${d >= 0 ? '+' : ''}${d.toFixed(1)}`
        } else if (k.thisPos !== null && k.prevPos === null) {
          delta = '🆕'
        }
        lines.push(`| ${k.config.keyword} | ${cur} | ${prv} | ${delta} | ${k.thisImp}/${k.prevImp} | ${k.thisClicks} |`)
      }
      lines.push('')
    }
  }

  lines.push('---')
  lines.push('')
  lines.push('> 完整深度分析（行动建议 + 头部词排名 + 参数化效果）：在终端跑 `/data-analys daily-report`')
  lines.push('> 这封自动日報只覆盖核心数据快照，不含 AI 解读。')

  return lines.join('\n')
}

// ---------- HTML formatter ----------

const HTML_STYLES = {
  body: 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;color:#222;line-height:1.5;max-width:760px;margin:0 auto;padding:24px 16px;',
  h1: 'font-size:22px;margin:0 0 4px;color:#111;',
  meta: 'color:#666;font-size:13px;margin-bottom:24px;',
  h2: 'font-size:16px;margin:24px 0 8px;color:#111;border-bottom:1px solid #e5e7eb;padding-bottom:6px;',
  table: 'border-collapse:collapse;width:100%;font-size:13px;margin:8px 0 16px;',
  th: 'text-align:left;padding:8px 10px;background:#f9fafb;border-bottom:2px solid #e5e7eb;font-weight:600;color:#374151;',
  thNum: 'text-align:right;padding:8px 10px;background:#f9fafb;border-bottom:2px solid #e5e7eb;font-weight:600;color:#374151;',
  td: 'padding:8px 10px;border-bottom:1px solid #f3f4f6;',
  tdNum: 'padding:8px 10px;border-bottom:1px solid #f3f4f6;text-align:right;font-variant-numeric:tabular-nums;',
  good: 'color:#16a34a;font-weight:600;',
  bad: 'color:#dc2626;font-weight:600;',
  neutral: 'color:#6b7280;',
  note: 'background:#fffbeb;border-left:3px solid #f59e0b;padding:8px 12px;font-size:12px;color:#78350f;margin:8px 0 16px;',
  hl: 'margin:6px 0;padding:8px 12px;border-radius:6px;font-size:13px;',
  hlGood: 'background:#f0fdf4;border-left:3px solid #16a34a;',
  hlBad: 'background:#fef2f2;border-left:3px solid #dc2626;',
  hlWarn: 'background:#fffbeb;border-left:3px solid #f59e0b;',
  hlNeutral: 'background:#f9fafb;border-left:3px solid #9ca3af;',
  footer: 'margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;',
  code: 'background:#f3f4f6;padding:2px 6px;border-radius:3px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;',
}

function deltaStyle(p: number, posIsGood = true): string {
  if (Math.abs(p) < 5) return HTML_STYLES.neutral
  const isGood = posIsGood ? p > 0 : p < 0
  return isGood ? HTML_STYLES.good : HTML_STYLES.bad
}

function pctCell(cur: number, prev: number, posIsGood = true): string {
  if (prev === 0) {
    if (cur === 0) return `<td style="${HTML_STYLES.tdNum}${HTML_STYLES.neutral}">±0%</td>`
    return `<td style="${HTML_STYLES.tdNum}${HTML_STYLES.good}">新規</td>`
  }
  const p = ((cur - prev) / prev) * 100
  const sign = p >= 0 ? '+' : ''
  return `<td style="${HTML_STYLES.tdNum}${deltaStyle(p, posIsGood)}">${sign}${p.toFixed(1)}%</td>`
}

function ppCell(curPct: number, prevPct: number, posIsGood = true): string {
  const d = curPct - prevPct
  const sign = d >= 0 ? '+' : ''
  return `<td style="${HTML_STYLES.tdNum}${deltaStyle(d, posIsGood)}">${sign}${d.toFixed(1)}pp</td>`
}

function highlightStyle(h: string): string {
  if (h.startsWith('🟢') || h.startsWith('📦')) return HTML_STYLES.hl + HTML_STYLES.hlGood
  if (h.startsWith('🔴')) return HTML_STYLES.hl + HTML_STYLES.hlBad
  if (h.startsWith('⚠️')) return HTML_STYLES.hl + HTML_STYLES.hlWarn
  return HTML_STYLES.hl + HTML_STYLES.hlNeutral
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  )
}

function formatReportHtml(w: PeriodWindows, d: any, highlights: string[]): string {
  const { traffic, refs, gsc, tu, nc, tb, ph } = d
  const out: string[] = []
  out.push(`<div style="${HTML_STYLES.body}">`)
  out.push(`<h1 style="${HTML_STYLES.h1}">Prompta 日報 ${w.thisStart} 〜 ${w.thisEnd}</h1>`)
  out.push(`<div style="${HTML_STYLES.meta}">比較期間 ${w.prevStart} 〜 ${w.prevEnd}　・　データ取得時刻 ${new Date().toISOString()} (UTC)</div>`)

  // §1 站点流量
  out.push(`<h2 style="${HTML_STYLES.h2}">1. 站点流量</h2>`)
  out.push(`<table style="${HTML_STYLES.table}">`)
  out.push(`<thead><tr>
    <th style="${HTML_STYLES.th}">指标</th>
    <th style="${HTML_STYLES.thNum}">本周</th>
    <th style="${HTML_STYLES.thNum}">上周</th>
    <th style="${HTML_STYLES.thNum}">Δ</th>
  </tr></thead><tbody>`)
  const rows: Array<[string, number, number, boolean, boolean]> = [
    ['GA sessions', traffic.thisP.sessions, traffic.prevP.sessions, true, false],
    ['GA 活跃用户', traffic.thisP.activeUsers, traffic.prevP.activeUsers, true, false],
    ['GA PV', traffic.thisP.pageviews, traffic.prevP.pageviews, true, false],
    ['GSC clicks', gsc.thisP.clicks, gsc.prevP.clicks, true, false],
    ['GSC 曝光', gsc.thisP.impressions, gsc.prevP.impressions, true, false],
  ]
  for (const [label, cur, prev, posIsGood] of rows) {
    out.push(`<tr>
      <td style="${HTML_STYLES.td}">${label}</td>
      <td style="${HTML_STYLES.tdNum}">${cur}</td>
      <td style="${HTML_STYLES.tdNum}">${prev}</td>
      ${pctCell(cur, prev, posIsGood)}
    </tr>`)
  }
  // bounce & CTR & position are percentages/scores (use ppCell)
  out.push(`<tr>
    <td style="${HTML_STYLES.td}">GA bounce</td>
    <td style="${HTML_STYLES.tdNum}">${traffic.thisP.bounceRate.toFixed(1)}%</td>
    <td style="${HTML_STYLES.tdNum}">${traffic.prevP.bounceRate.toFixed(1)}%</td>
    ${ppCell(traffic.thisP.bounceRate, traffic.prevP.bounceRate, false)}
  </tr>`)
  out.push(`<tr>
    <td style="${HTML_STYLES.td}">GSC CTR</td>
    <td style="${HTML_STYLES.tdNum}">${gsc.thisP.ctr.toFixed(2)}%</td>
    <td style="${HTML_STYLES.tdNum}">${gsc.prevP.ctr.toFixed(2)}%</td>
    ${ppCell(gsc.thisP.ctr, gsc.prevP.ctr, true)}
  </tr>`)
  out.push(`<tr>
    <td style="${HTML_STYLES.td}">GSC 平均排名</td>
    <td style="${HTML_STYLES.tdNum}">${gsc.thisP.position.toFixed(2)}</td>
    <td style="${HTML_STYLES.tdNum}">${gsc.prevP.position.toFixed(2)}</td>
    ${ppCell(gsc.thisP.position, gsc.prevP.position, false)}
  </tr>`)
  out.push('</tbody></table>')
  out.push(`<div style="${HTML_STYLES.note}">GSC 数据有 24-48h 延迟。GA 与 GSC 强烈背离时（如 GA +5% / GSC -30%）首先怀疑 GSC 数据未补齐。</div>`)

  // §2 GEO
  out.push(`<h2 style="${HTML_STYLES.h2}">2. GEO / Referral 信号</h2>`)
  out.push(`<table style="${HTML_STYLES.table}">`)
  out.push(`<thead><tr>
    <th style="${HTML_STYLES.th}">Source</th>
    <th style="${HTML_STYLES.thNum}">本周</th>
    <th style="${HTML_STYLES.thNum}">上周</th>
    <th style="${HTML_STYLES.thNum}">Δ</th>
  </tr></thead><tbody>`)
  for (const src of ['chatgpt.com', 'openai', 'perplexity', 'copilot.com', 'qiita.com']) {
    const cur = refs.thisM[src] || 0
    const prv = refs.prevM[src] || 0
    if (cur === 0 && prv === 0) continue
    out.push(`<tr>
      <td style="${HTML_STYLES.td}"><code style="${HTML_STYLES.code}">${escapeHtml(src)}</code></td>
      <td style="${HTML_STYLES.tdNum}">${cur}</td>
      <td style="${HTML_STYLES.tdNum}">${prv}</td>
      ${pctCell(cur, prv, true)}
    </tr>`)
  }
  out.push('</tbody></table>')

  // §3 tools
  out.push(`<h2 style="${HTML_STYLES.h2}">3. 工具使用（排除 owner）</h2>`)
  out.push(`<table style="${HTML_STYLES.table}">`)
  out.push(`<thead><tr>
    <th style="${HTML_STYLES.th}">工具</th>
    <th style="${HTML_STYLES.thNum}">调用</th>
    <th style="${HTML_STYLES.thNum}">free</th>
    <th style="${HTML_STYLES.thNum}">paid</th>
    <th style="${HTML_STYLES.thNum}">uniq anon</th>
    <th style="${HTML_STYLES.thNum}">uniq email</th>
    <th style="${HTML_STYLES.thNum}">上周</th>
    <th style="${HTML_STYLES.thNum}">Δ</th>
  </tr></thead><tbody>`)
  for (const [label, t] of [['personal-color', tu.pc], ['hair-color', tu.hc]] as const) {
    out.push(`<tr>
      <td style="${HTML_STYLES.td}"><code style="${HTML_STYLES.code}">${label}</code></td>
      <td style="${HTML_STYLES.tdNum}">${t.total}</td>
      <td style="${HTML_STYLES.tdNum}">${t.free}</td>
      <td style="${HTML_STYLES.tdNum}">${t.paid}</td>
      <td style="${HTML_STYLES.tdNum}">${t.uniqueAnon}</td>
      <td style="${HTML_STYLES.tdNum}">${t.uniqueEmail}</td>
      <td style="${HTML_STYLES.tdNum}">${t.prevTotal}</td>
      ${pctCell(t.total, t.prevTotal, true)}
    </tr>`)
  }
  out.push('</tbody></table>')
  out.push(`<div style="font-size:13px;color:#374151;">
    <strong>累计真实用户</strong>: ${tu.totalRealUsers} 个注册 · ${tu.realPaid} 个付费<br/>
    <strong>本周新注册</strong>: ${tu.newSignups7d} 个
  </div>`)

  // §3.5 收入
  out.push(`<h2 style="${HTML_STYLES.h2}">3.5 收入</h2>`)
  const thisRev = tu.thisPay._sum.amountJpy || 0
  const prevRev = tu.prevPay._sum.amountJpy || 0
  out.push(`<table style="${HTML_STYLES.table}">`)
  out.push(`<thead><tr>
    <th style="${HTML_STYLES.th}">期间</th>
    <th style="${HTML_STYLES.thNum}">笔数</th>
    <th style="${HTML_STYLES.thNum}">金额</th>
  </tr></thead><tbody>`)
  out.push(`<tr>
    <td style="${HTML_STYLES.td}">本周</td>
    <td style="${HTML_STYLES.tdNum}">${tu.thisPay._count}</td>
    <td style="${HTML_STYLES.tdNum}">¥${thisRev}</td>
  </tr>`)
  out.push(`<tr>
    <td style="${HTML_STYLES.td}">上周</td>
    <td style="${HTML_STYLES.tdNum}">${tu.prevPay._count}</td>
    <td style="${HTML_STYLES.tdNum}">¥${prevRev}</td>
  </tr>`)
  out.push('</tbody></table>')

  // §3.6 paywall hits
  out.push(`<h2 style="${HTML_STYLES.h2}">3.6 Paywall DB 兜底（≥3 free 撞墙数）</h2>`)
  out.push(`<table style="${HTML_STYLES.table}">`)
  out.push(`<thead><tr>
    <th style="${HTML_STYLES.th}">工具</th>
    <th style="${HTML_STYLES.thNum}">unique anon</th>
    <th style="${HTML_STYLES.thNum}">exhausted</th>
    <th style="${HTML_STYLES.thNum}">paid</th>
  </tr></thead><tbody>`)
  for (const [label, t] of [['personal-color', ph.pc], ['hair-color', ph.hc]] as const) {
    out.push(`<tr>
      <td style="${HTML_STYLES.td}"><code style="${HTML_STYLES.code}">${label}</code></td>
      <td style="${HTML_STYLES.tdNum}">${t.uniqueAnons}</td>
      <td style="${HTML_STYLES.tdNum}">${t.exhausted}</td>
      <td style="${HTML_STYLES.tdNum}">${t.paid}</td>
    </tr>`)
  }
  out.push('</tbody></table>')

  // §4 new content
  out.push(`<h2 style="${HTML_STYLES.h2}">4. 新内容（7d）</h2>`)
  out.push(`<div style="font-size:13px;color:#374151;">入库 <strong>${nc.total}</strong> 条 prompt</div>`)
  if (nc.total > 0) {
    const catStr = Object.entries(nc.cats)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([k, v]) => `${escapeHtml(k)}:${v}`)
      .join(' · ')
    const toolStr = Object.entries(nc.tools)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([k, v]) => `${escapeHtml(k)}:${v}`)
      .join(' · ')
    out.push(`<div style="font-size:12px;color:#6b7280;margin-top:4px;">分类: ${catStr}</div>`)
    out.push(`<div style="font-size:12px;color:#6b7280;margin-top:4px;">工具: ${toolStr}</div>`)
  }
  out.push(`<div style="font-size:13px;color:#374151;margin-top:8px;">
    <strong>Tag backlog</strong>: ${tb.approved} approved / ${tb.total} 总 / <strong>${tb.noindexPct.toFixed(1)}%</strong> noindex
  </div>`)

  // §5 highlights
  out.push(`<h2 style="${HTML_STYLES.h2}">5. 自动高亮</h2>`)
  for (const h of highlights) {
    out.push(`<div style="${highlightStyle(h)}">${escapeHtml(h)}</div>`)
  }

  // §6 watch keywords
  const kws = d.kws as WatchKeywordResult[]
  if (kws && kws.length > 0) {
    out.push(`<h2 style="${HTML_STYLES.h2}">6. 重点关键词追踪</h2>`)
    const byCluster = new Map<string, WatchKeywordResult[]>()
    for (const k of kws) {
      const c = k.config.cluster
      if (!byCluster.has(c)) byCluster.set(c, [])
      byCluster.get(c)!.push(k)
    }
    const clusterLabels: Record<string, string> = {
      'top10-defense': 'Top-10 防御',
      'head-ai': 'Head AI 词 (5/12 ship)',
      'tools-hair': 'Hair-color 工具长尾',
      'tools-pc': 'Personal-color 工具长尾',
      'tools-pc-seasonal': 'パーソナルカラー 季节子页',
      'photo-edit': 'Photo-edit cluster',
      'new-tool-candidate': '新工具候选',
      'opportunity': '机会词',
    }
    for (const [cluster, list] of byCluster) {
      const label = clusterLabels[cluster] || cluster
      out.push(`<div style="font-size:13px;font-weight:600;color:#374151;margin:16px 0 6px;">${escapeHtml(label)}</div>`)
      out.push(`<table style="${HTML_STYLES.table}">`)
      out.push(`<thead><tr>
        <th style="${HTML_STYLES.th}">关键词</th>
        <th style="${HTML_STYLES.thNum}">本周 pos</th>
        <th style="${HTML_STYLES.thNum}">上周 pos</th>
        <th style="${HTML_STYLES.thNum}">Δ</th>
        <th style="${HTML_STYLES.thNum}">imp 本/上</th>
        <th style="${HTML_STYLES.thNum}">clicks</th>
      </tr></thead><tbody>`)
      for (const k of list) {
        const cur = k.thisPos !== null ? k.thisPos.toFixed(1) : '—'
        const prv = k.prevPos !== null ? k.prevPos.toFixed(1) : '—'
        let deltaCell = `<td style="${HTML_STYLES.tdNum}${HTML_STYLES.neutral}">—</td>`
        if (k.thisPos !== null && k.prevPos !== null) {
          const d = k.thisPos - k.prevPos
          // For position, lower is better → positive delta is bad
          const sty = d < -2 ? HTML_STYLES.good : d > 2 ? HTML_STYLES.bad : HTML_STYLES.neutral
          deltaCell = `<td style="${HTML_STYLES.tdNum}${sty}">${d >= 0 ? '+' : ''}${d.toFixed(1)}</td>`
        } else if (k.thisPos !== null && k.prevPos === null) {
          deltaCell = `<td style="${HTML_STYLES.tdNum}${HTML_STYLES.good}">🆕</td>`
        } else if (k.thisPos === null && k.prevPos !== null) {
          deltaCell = `<td style="${HTML_STYLES.tdNum}${HTML_STYLES.bad}">⚫ 消失</td>`
        }
        out.push(`<tr>
          <td style="${HTML_STYLES.td}">${escapeHtml(k.config.keyword)}</td>
          <td style="${HTML_STYLES.tdNum}">${cur}</td>
          <td style="${HTML_STYLES.tdNum}">${prv}</td>
          ${deltaCell}
          <td style="${HTML_STYLES.tdNum}">${k.thisImp}/${k.prevImp}</td>
          <td style="${HTML_STYLES.tdNum}">${k.thisClicks}</td>
        </tr>`)
      }
      out.push('</tbody></table>')
    }
    out.push(`<div style="font-size:11px;color:#9ca3af;margin-top:4px;">维护 watch list: <code style="${HTML_STYLES.code}">src/lib/seo/watch-keywords.ts</code></div>`)
  }

  // footer
  out.push(`<div style="${HTML_STYLES.footer}">
    完整深度分析（行动建议 + 头部词排名 + 参数化效果）：在终端跑
    <code style="${HTML_STYLES.code}">/data-analys daily-report</code><br/>
    这封自动日報只覆盖核心数据快照，不含 AI 解读。
  </div>`)

  out.push('</div>')
  return out.join('\n')
}
