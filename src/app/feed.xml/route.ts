import { getLatestPrompts, getGuides } from '@/lib/data'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 3600 // refresh hourly like sitemap

export async function GET() {
  const [prompts, guides] = await Promise.all([
    getLatestPrompts(30),
    getGuides(),
  ])

  const items = [
    ...prompts.map(p => ({
      title: p.title,
      link: `${SITE_CONFIG.url}/prompt/${p.slug}`,
      description: p.description,
      pubDate: new Date(p.createdAt).toUTCString(),
      category: p.categoryName,
    })),
    ...guides.map(g => ({
      title: g.title,
      link: `${SITE_CONFIG.url}/guides/${g.slug}`,
      description: g.description,
      pubDate: new Date().toUTCString(),
      category: 'ガイド',
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
   .slice(0, 50)

  const escXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escXml(SITE_CONFIG.name)} — AIプロンプト集</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escXml(SITE_CONFIG.description)}</description>
    <language>ja</language>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.map(item => `    <item>
      <title>${escXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${escXml(item.category)}</category>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`).join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
