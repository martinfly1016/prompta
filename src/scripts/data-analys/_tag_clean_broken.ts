import { PrismaClient } from '@prisma/client'

async function main() {
  const p = new PrismaClient()
  const all = await p.tag.findMany({
    select: { id: true, slug: true, name: true, _count: { select: { prompts: true } } },
  })
  const broken = (all as any[]).filter(t =>
    t.slug.includes('�') || t.name.includes('�') || /経営.{0,2}画/.test(t.name)
  )

  if (!broken.length) {
    console.log('No broken-slug tags found.')
    await p.$disconnect()
    return
  }

  for (const t of broken) {
    const codepoints = [...t.slug].map(c => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase()).join(' ')
    console.log(`Match: id=${t.id} slug="${t.slug}" name="${t.name}" prompts=${t._count.prompts}`)
    console.log(`  slug codepoints: ${codepoints}`)
  }

  for (const t of broken) {
    await p.tag.delete({ where: { id: t.id } })
    console.log(`Deleted id=${t.id} (had ${t._count.prompts} prompts)`)
  }

  await p.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
