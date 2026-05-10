import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const itemsXml = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.path}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.path}</guid>
      <description><![CDATA[${post.summary || ''}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteMetadata.title}</title>
    <link>${siteUrl}</link>
    <description>${siteMetadata.description}</description>
    <language>${siteMetadata.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
