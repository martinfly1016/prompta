/**
 * Prompt parameter panel monitoring — daily-report §8.
 *
 * Compares parameterized prompt detail pages vs. non-parameterized control:
 *   - Activation: % of sessions that fired `prompt_param_changed`
 *   - Engagement: bounce / engage rate / dwell vs control
 *   - Per-slug touch breakdown (who actually used the panel)
 *
 * Slug list pulled from the live registry — no manual maintenance.
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/param-monitor.ts            # default 7d
 *   npx tsx src/scripts/data-analys/param-monitor.ts --days=14  # widen window
 */
import { google } from 'googleapis'
import { loadGoogleCredentials, GA4_PROPERTY_ID, parseArgs } from './config'
import { getConfiguredSlugs } from '../../lib/prompt-params/registry'

const args = parseArgs()
const DAYS = parseInt(args['days'] || '7', 10)

function fmtDate(d: Date) { return d.toISOString().split('T')[0] }

async function main() {
  const creds = loadGoogleCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
  const ga = google.analyticsdata({ version: 'v1beta', auth })
  const property = 'properties/' + GA4_PROPERTY_ID

  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - DAYS + 1)
  const dateRange = { startDate: fmtDate(start), endDate: fmtDate(end) }

  const PARAM_SLUGS = new Set(getConfiguredSlugs())

  // Q1: per-page engagement (all prompt detail pages)
  const engageQ = await ga.properties.runReport({
    property,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'engagementRate' },
      ],
      dimensionFilter: {
        filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/prompt/' } },
      },
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: '500',
    },
  })

  type Eng = { slug: string; sessions: number; users: number; dwell: number; bounce: number; engage: number }
  const allPages: Eng[] = []
  for (const row of engageQ.data.rows || []) {
    const p = row.dimensionValues?.[0]?.value || ''
    const m = p.match(/^\/prompt\/([^/?#]+)/)
    if (!m) continue
    allPages.push({
      slug: m[1],
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
      dwell: parseFloat(row.metricValues?.[2]?.value || '0'),
      bounce: parseFloat(row.metricValues?.[3]?.value || '0') * 100,
      engage: parseFloat(row.metricValues?.[4]?.value || '0') * 100,
    })
  }

  // Q2: prompt_param_changed events per pagePath (slug touch count + active users)
  const paramQ = await ga.properties.runReport({
    property,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'eventCount' }, { name: 'activeUsers' }, { name: 'sessions' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            { filter: { fieldName: 'eventName', stringFilter: { value: 'prompt_param_changed' } } },
            { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/prompt/' } } },
          ],
        },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: '500',
    },
  })

  type Touch = { slug: string; events: number; users: number; sessions: number }
  const touchedBySlug = new Map<string, Touch>()
  for (const row of paramQ.data.rows || []) {
    const p = row.dimensionValues?.[0]?.value || ''
    const m = p.match(/^\/prompt\/([^/?#]+)/)
    if (!m) continue
    touchedBySlug.set(m[1], {
      slug: m[1],
      events: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
      sessions: parseInt(row.metricValues?.[2]?.value || '0'),
    })
  }

  // Q3: per-param breakdown (custom dims registered 2026-05-16 — events
  // before that date have (not set) values; filtered out below).
  const paramDetailQ = await ga.properties.runReport({
    property,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [
        { name: 'customEvent:prompt_slug' },
        { name: 'customEvent:param_id' },
        { name: 'customEvent:param_value' },
      ],
      metrics: [{ name: 'eventCount' }, { name: 'activeUsers' }],
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'prompt_param_changed' } } },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: '1000',
    },
  })
  type ParamDetail = { slug: string; paramId: string; paramValue: string; events: number; users: number }
  const paramDetails: ParamDetail[] = []
  let notSetEvents = 0
  for (const row of paramDetailQ.data.rows || []) {
    const [slug, pid, pval] = row.dimensionValues!.map((d) => d.value || '')
    const events = parseInt(row.metricValues?.[0]?.value || '0')
    const users = parseInt(row.metricValues?.[1]?.value || '0')
    if (slug === '(not set)' || pid === '(not set)') {
      notSetEvents += events
      continue
    }
    paramDetails.push({ slug, paramId: pid, paramValue: pval, events, users })
  }

  // Aggregation
  const paramPages = allPages.filter((p) => PARAM_SLUGS.has(p.slug))
  const ctrlPages = allPages.filter((p) => !PARAM_SLUGS.has(p.slug))

  function agg(list: Eng[]) {
    const totSess = list.reduce((s, p) => s + p.sessions, 0)
    if (totSess === 0) return { totSess: 0, bounce: 0, engage: 0, dwell: 0 }
    const w = (k: keyof Eng) => list.reduce((s, p) => s + (p[k] as number) * p.sessions, 0) / totSess
    return { totSess, bounce: w('bounce'), engage: w('engage'), dwell: w('dwell') }
  }
  const paramAgg = agg(paramPages)
  const ctrlAgg = agg(ctrlPages)

  const totalParamEvents = Array.from(touchedBySlug.values()).reduce((s, t) => s + t.events, 0)
  const totalParamUsers = Array.from(touchedBySlug.values()).reduce((s, t) => s + t.users, 0)
  const totalParamSessions = Array.from(touchedBySlug.values()).reduce((s, t) => s + t.sessions, 0)
  const activationRate = paramAgg.totSess ? (totalParamSessions / paramAgg.totSess) * 100 : 0

  // Output
  const lines: string[] = []
  lines.push(`# Prompt 参数化效果（${dateRange.startDate} ~ ${dateRange.endDate}，${DAYS}d）`)
  lines.push('')
  lines.push(`参数化配置: ${PARAM_SLUGS.size} slug（含 alias）— 来自 \`getConfiguredSlugs()\``)
  lines.push('')
  lines.push('## 激活指标')
  lines.push(`- 参数化页面 sessions: **${paramAgg.totSess}**`)
  lines.push(`- 触发 \`prompt_param_changed\` 的 sessions: **${totalParamSessions}** (${activationRate.toFixed(1)}%)`)
  lines.push(`- 调参用户数 (activeUsers): **${totalParamUsers}**`)
  lines.push(`- 总事件数: ${totalParamEvents}（平均 ${totalParamUsers ? (totalParamEvents / totalParamUsers).toFixed(1) : '—'} 次/用户）`)
  lines.push(`- 决策线参考: ≥5% 验证机制有效；当前 **${activationRate >= 5 ? '✅ 通过' : '🔴 未达'}**`)
  lines.push('')
  lines.push('## Engagement 对比（参数化 vs 非参数化）')
  lines.push('')
  lines.push('| 组 | sessions | bounce | engage | dwell |')
  lines.push('|---|---|---|---|---|')
  lines.push(`| 参数化 ${PARAM_SLUGS.size} slug | ${paramAgg.totSess} | ${paramAgg.bounce.toFixed(1)}% | ${paramAgg.engage.toFixed(1)}% | ${paramAgg.dwell.toFixed(1)}s |`)
  lines.push(`| 非参数化（所有 prompt 页）| ${ctrlAgg.totSess} | ${ctrlAgg.bounce.toFixed(1)}% | ${ctrlAgg.engage.toFixed(1)}% | ${ctrlAgg.dwell.toFixed(1)}s |`)
  const bounceDelta = paramAgg.bounce - ctrlAgg.bounce
  const engageDelta = paramAgg.engage - ctrlAgg.engage
  lines.push('')
  lines.push(`**Δ bounce**: ${bounceDelta >= 0 ? '+' : ''}${bounceDelta.toFixed(1)}pp ${bounceDelta < -3 ? '🟢' : bounceDelta > 3 ? '🔴' : '⚪'}`)
  lines.push(`**Δ engage**: ${engageDelta >= 0 ? '+' : ''}${engageDelta.toFixed(1)}pp ${engageDelta > 3 ? '🟢' : engageDelta < -3 ? '🔴' : '⚪'}`)
  lines.push('')
  lines.push('> dwell 受少数「开 tab 不关」用户拉偏，bounce / engage 才是干净对比。')
  lines.push('')

  // Per-slug touch breakdown
  if (touchedBySlug.size > 0) {
    lines.push('## 已调参 slug 排行')
    lines.push('')
    lines.push('| slug | events | 调参 users | 调参 sessions | events/user |')
    lines.push('|---|---|---|---|---|')
    const sorted = Array.from(touchedBySlug.values()).sort((a, b) => b.events - a.events)
    for (const t of sorted) {
      const epu = t.users ? (t.events / t.users).toFixed(1) : '—'
      lines.push(`| ${t.slug} | ${t.events} | ${t.users} | ${t.sessions} | ${epu} |`)
    }
    lines.push('')
    const idle = paramPages.filter((p) => !touchedBySlug.has(p.slug) && p.sessions > 0)
    if (idle.length > 0) {
      lines.push(`**0 调参 slug**（${idle.length} 个，有流量但没人动面板）: ${idle.map((p) => p.slug).join(', ')}`)
      lines.push('')
    }
    const zero = paramPages.filter((p) => p.sessions === 0)
    if (zero.length > 0) {
      lines.push(`**0 流量 slug**（${zero.length} 个）: ${zero.map((p) => p.slug).join(', ')}`)
      lines.push('')
    }
  } else {
    lines.push('> 本周期无 `prompt_param_changed` 事件 — GA4 admin 检查 `tool` 自定义维度注册状态。')
    lines.push('')
  }

  // Per-param breakdown (custom dims registered 2026-05-16 — only emits
  // when post-registration event data is available)
  if (paramDetails.length > 0) {
    lines.push('## 细粒度切片（哪个参数被改最多 / 用户改成什么值）')
    lines.push('')

    const byParamId = new Map<string, { events: number; users: number }>()
    for (const d of paramDetails) {
      const cur = byParamId.get(d.paramId) ?? { events: 0, users: 0 }
      cur.events += d.events
      cur.users = Math.max(cur.users, d.users)
      byParamId.set(d.paramId, cur)
    }
    lines.push('### 按 param_id 聚合（全 slug）')
    lines.push('| param_id | events | max users |')
    lines.push('|---|---|---|')
    for (const [pid, agg] of Array.from(byParamId.entries()).sort((a, b) => b[1].events - a[1].events)) {
      lines.push(`| ${pid} | ${agg.events} | ${agg.users} |`)
    }
    lines.push('')

    lines.push('### Top 用户偏好（slug × param_id × value，events ≥ 2）')
    lines.push('| slug | param_id | param_value | events |')
    lines.push('|---|---|---|---|')
    const top = paramDetails.filter((d) => d.events >= 2).slice(0, 20)
    if (top.length === 0) lines.push('| (样本不足，events 全部 < 2) | — | — | — |')
    for (const d of top) {
      lines.push(`| ${d.slug} | ${d.paramId} | ${d.paramValue} | ${d.events} |`)
    }
    lines.push('')
  } else if (notSetEvents > 0) {
    lines.push(`> ⏳ 细粒度切片暂不可用：${notSetEvents} 个事件 prompt_slug/param_id 仍为 (not set) — 这些是 2026-05-16 维度注册前的历史事件，GA4 不 backfill。后续注册之后的新事件会自动带正确值。`)
    lines.push('')
  }

  console.log(lines.join('\n'))

  // Machine-readable summary for downstream report
  console.log('\n## JSON 输出')
  console.log(JSON.stringify({
    window: dateRange,
    paramSlugCount: PARAM_SLUGS.size,
    parameterized: paramAgg,
    control: ctrlAgg,
    activation: {
      sessions: totalParamSessions,
      users: totalParamUsers,
      events: totalParamEvents,
      activationRate: parseFloat(activationRate.toFixed(2)),
    },
    deltaBouncePp: parseFloat(bounceDelta.toFixed(2)),
    deltaEngagePp: parseFloat(engageDelta.toFixed(2)),
    touchedSlugs: Array.from(touchedBySlug.values()),
    paramDetails,
    notSetEvents,
  }, null, 2))
}

main().catch((e) => { console.error(e); process.exit(1) })
