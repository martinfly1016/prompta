// @ts-nocheck
// One-off: retroactively grant welcomeBonus = 3 credits to all existing
// NextAuth users who haven't received it. Phase 0 pivot (2026-05-11).
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { grantWelcomeBonusIfEligible } from '../src/lib/paid-credits'

async function main() {
  const db = new PrismaClient()
  const users = await db.user.findMany({
    select: { id: true, email: true },
  })
  console.log(`Found ${users.length} users to consider`)
  let granted = 0
  let skipped = 0
  for (const u of users) {
    if (!u.email) continue
    const result = await grantWelcomeBonusIfEligible(u.email)
    if (result.granted) {
      console.log(`[grant] ${u.email} → balance=${result.balance}`)
      granted++
    } else {
      console.log(`[skip ] ${u.email} (already received)`)
      skipped++
    }
  }
  console.log(`\nDone: ${granted} granted, ${skipped} skipped`)
  await db.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
