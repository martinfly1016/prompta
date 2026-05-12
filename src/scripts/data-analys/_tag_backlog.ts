import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()
  const total = await p.tag.count()
  const approved = await p.tag.count({ where: { isApproved: true } })
  const newSince = await p.tag.count({ where: { createdAt: { gte: new Date('2026-05-05') } } })
  const newApproved = await p.tag.count({ where: { createdAt: { gte: new Date('2026-05-05') }, isApproved: true } })
  const top = await p.tag.findMany({
    where: { isApproved: false },
    orderBy: { prompts: { _count: 'desc' } },
    take: 8,
    include: { _count: { select: { prompts: true } } },
  })
  console.log(
    JSON.stringify(
      {
        total,
        approved,
        noindex: total - approved,
        noindexPct: ((total - approved) / total * 100).toFixed(1) + '%',
        newSince,
        newApproved,
        topUnapproved: top.map((t: any) => ({ slug: t.slug, name: t.name, prompts: t._count.prompts })),
      },
      null,
      2
    )
  )
  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
