import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()
  const tags = await p.tag.findMany({
    where: { isApproved: false },
    orderBy: { prompts: { _count: 'desc' } },
    include: { _count: { select: { prompts: true } } },
  })
  for (const t of tags as any[]) {
    console.log(`${t._count.prompts}\t${t.slug}\t${t.name}`)
  }
  console.log(`\nTotal unapproved: ${tags.length}`)
  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
