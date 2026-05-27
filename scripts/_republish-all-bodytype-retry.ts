// @ts-nocheck
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const ALL = [
  'bodytype-diff-yuri-tall-curvy-petite-slim',
  'bodytype-diff-reverse-tall-athletic-female-shorter-slim-male',
  'bodytype-diff-bodybuilder-female-slim-male-extreme',
]
const p = new PrismaClient()
;(async () => {
  for (const slug of ALL) {
    const r = await p.prompt.update({ where: { slug }, data: { isPublished: true } })
    console.log(`republished: ${r.slug}`)
  }
  // verify all 6 are published + tagged
  const all = await p.prompt.findMany({
    where: { slug: { startsWith: 'bodytype-diff-' } },
    select: { slug: true, isPublished: true, tags: { select: { name: true } } },
  })
  console.log('\n=== final state ===')
  for (const x of all) {
    console.log(`  ${x.isPublished ? '✅' : '❌'} ${x.slug} — tags: ${x.tags.map(t => t.name).join(', ')}`)
  }
  await p.$disconnect()
})()
