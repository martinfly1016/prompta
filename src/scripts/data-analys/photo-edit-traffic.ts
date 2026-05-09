/**
 * Photo-edit prompt traffic tracker.
 *
 * Per-slug sessions/dwell/bounce for category=photo-edit prompts. Used by
 * /data-analys daily-report §7 to identify tool-ization candidates: a
 * single prompt with sustained organic traffic is a strong signal that the
 * underlying task is worth turning into a freemium AI tool (the way
 * personal-color-analysis and hair-color-diagnosis did).
 *
 * Usage:
 *   npx tsx src/scripts/data-analys/photo-edit-traffic.ts --days=7
 *   npx tsx src/scripts/data-analys/photo-edit-traffic.ts --days=28
 *
 * Thresholds (per `--days=7`):
 *   🟢 strong candidate  — ≥ 30 sessions/7d AND avg dwell ≥ 60s
 *   🟡 watch             — ≥ 10 sessions/7d
 *   ⚪ below noise        — < 10 sessions/7d
 *
 * If a slug stays 🟢 for 2 consecutive weekly reports → propose tool-ization
 * (see project_photo_edit_content_roadmap.md memory).
 */

// @ts-nocheck — googleapis types are loose
import { loadGoogleCredentials, parseArgs, GA4_PROPERTY_ID, SITE_URL } from './config'
import { PrismaClient } from '@prisma/client'

const STRONG_SESS = 30
const STRONG_DWELL = 60
const WATCH_SESS = 10

async function main() {
  const args = parseArgs()
  const days = parseInt(args['days'] || '7', 10)

  const prisma = new PrismaClient()

  // 1. Photo-edit prompt slugs from DB
  const prompts = await prisma.prompt.findMany({
    where: { isPublished: true, category: { slug: 'photo-edit' } },
    select: { slug: true, title: true, tool: { select: { slug: true } }, createdAt: true },
  })
  const slugSet = new Set(prompts.map((p) => p.slug))
  const meta = new Map(prompts.map((p) => [p.slug, p]))

  // 2. GA4 — pagePath traffic for /prompt/* in the window
  const { google } = await import('googleapis')
  const auth = new google.auth.GoogleAuth({
    credentials: loadGoogleCredentials(),
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
  const ga = google.analyticsdata({ version: 'v1beta', auth })
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - days)

  const resp = await ga.properties.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: fmt(start), endDate: fmt(today) }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: { matchType: 'BEGINS_WITH', value: '/prompt/' },
        },
      },
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 200,
    },
  })

  // 3. Join: keep only photo-edit prompts
  type Row = {
    slug: string
    title: string
    tool: string
    sessions: number
    users: number
    dwell: number
    bounce: number
    rating: '🟢' | '🟡' | '⚪'
  }
  const rows: Row[] = []
  for (const r of resp.data.rows || []) {
    const path = r.dimensionValues?.[0]?.value || ''
    const slug = path.replace(/^\/prompt\//, '').split('/')[0].split('?')[0]
    if (!slugSet.has(slug)) continue
    const m = meta.get(slug)!
    const sessions = parseInt(r.metricValues?.[0]?.value ?? '0', 10)
    const users = parseInt(r.metricValues?.[1]?.value ?? '0', 10)
    const dwell = parseFloat(r.metricValues?.[2]?.value ?? '0')
    const bounce = parseFloat(r.metricValues?.[3]?.value ?? '0') * 100
    const rating: Row['rating'] =
      sessions >= STRONG_SESS && dwell >= STRONG_DWELL
        ? '🟢'
        : sessions >= WATCH_SESS
          ? '🟡'
          : '⚪'
    rows.push({ slug, title: m.title, tool: m.tool?.slug ?? '', sessions, users, dwell, bounce, rating })
  }

  // 4. Slugs with zero traffic — surface as ⚪ for completeness (pages exist but Google not delivering)
  const seen = new Set(rows.map((r) => r.slug))
  for (const p of prompts) {
    if (seen.has(p.slug)) continue
    rows.push({
      slug: p.slug,
      title: p.title,
      tool: p.tool?.slug ?? '',
      sessions: 0,
      users: 0,
      dwell: 0,
      bounce: 0,
      rating: '⚪',
    })
  }

  // Sort by sessions desc
  rows.sort((a, b) => b.sessions - a.sessions)

  // 5. Output
  const counts = { strong: rows.filter((r) => r.rating === '🟢').length, watch: rows.filter((r) => r.rating === '🟡').length, idle: rows.filter((r) => r.rating === '⚪').length }
  console.log(JSON.stringify({
    days,
    siteUrl: SITE_URL,
    totalPhotoEditPrompts: prompts.length,
    counts,
    rows: rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      tool: r.tool,
      sessions: r.sessions,
      users: r.users,
      avgDwellSec: Math.round(r.dwell),
      bouncePct: Math.round(r.bounce * 10) / 10,
      rating: r.rating,
    })),
  }, null, 2))

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
