// @ts-nocheck
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
;(async () => {
  const todo = await p.tag.findMany({
    where: { isApproved: true, OR: [{ seoIntro: null }, { seoIntro: '' }] },
    select: { slug: true, name: true, _count: { select: { prompts: true } } },
    orderBy: { prompts: { _count: 'desc' } },
  })
  console.log(`tags needing seoIntro: ${todo.length}`)
  for (const t of todo) console.log(`  ${t._count.prompts}\t${t.slug}\t${t.name}`)
  await p.$disconnect()
})()
