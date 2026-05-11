import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all blog post topics and tags on Sithira Senanayake\'s blog.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/tags`,
  },
  openGraph: {
    title: `Tags | ${siteMetadata.title}`,
    description: 'Browse all blog post topics and tags on Sithira Senanayake\'s blog.',
    url: `${siteMetadata.siteUrl}/tags`,
    siteName: siteMetadata.title,
    type: 'website',
  },
  twitter: {
    title: `Tags | ${siteMetadata.title}`,
    card: 'summary',
    creator: '@_Sithira',
  },
}

export default function TagsPage() {
  const posts = allPosts.filter((post) => !post.draft)
  const tagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  const tagsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Tags',
    description: 'All topics covered on sithira.me',
    url: `${siteMetadata.siteUrl}/tags`,
    isPartOf: { '@id': 'https://sithira.me/#website' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteMetadata.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Tags', item: `${siteMetadata.siteUrl}/tags` },
      ],
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tagsSchema) }}
      />
      <h1 className="page-title mb-8">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
            className="text-tag no-underline hover:!text-[var(--color-accent)]"
            style={{
              border: '1px solid var(--color-border)',
              padding: '4px 12px',
              borderRadius: '4px',
            }}
          >
            {tag} ({count})
          </Link>
        ))}
      </div>
    </div>
  )
}
