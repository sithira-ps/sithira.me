import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const posts = allPosts.filter((post) => !post.draft)
  const tags = [...new Set(posts.flatMap((post) => post.tags || []))]
  return tags.map((tag) => ({ tag: tag.toLowerCase() }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { tag } = await props.params
  const decodedTag = decodeURIComponent(tag)
  const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  return {
    title: `Posts tagged "${displayTag}"`,
    description: `All blog posts about ${displayTag} by Sithira Senanayake.`,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/tags/${tag}`,
    },
    openGraph: {
      title: `Posts tagged "${displayTag}" | ${siteMetadata.title}`,
      description: `All blog posts about ${displayTag} by Sithira Senanayake.`,
      url: `${siteMetadata.siteUrl}/tags/${tag}`,
      type: 'website',
    },
  }
}

export default async function TagPage(props: PageProps) {
  const { tag } = await props.params
  const decodedTag = decodeURIComponent(tag)

  const posts = allPosts
    .filter(
      (post) =>
        !post.draft && post.tags?.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (posts.length === 0) return notFound()

  const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  const postDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const tagSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Posts tagged "${displayTag}"`,
    description: `All blog posts about ${displayTag}`,
    url: `${siteMetadata.siteUrl}/tags/${tag}`,
    isPartOf: { '@id': 'https://sithira.me/#website' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteMetadata.siteUrl}/blog/${post.path}`,
        name: post.title,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteMetadata.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Tags', item: `${siteMetadata.siteUrl}/tags` },
        {
          '@type': 'ListItem',
          position: 3,
          name: displayTag,
          item: `${siteMetadata.siteUrl}/tags/${tag}`,
        },
      ],
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tagSchema) }}
      />
      <h1 className="page-title mb-2">
        Tagged: <span className="text-[var(--color-accent)]">{displayTag}</span>
      </h1>
      <p className="text-caption mb-8">
        Found {posts.length} post{posts.length !== 1 ? 's' : ''} tagged with &ldquo;{displayTag}&rdquo;
      </p>

      {posts.map((post) => (
        <article
          key={post._id}
          className="py-6"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <Link
            href={post.url}
            className="group block no-underline"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2
                className="item-title group-hover:!text-[var(--color-accent)]"
                style={{ color: 'var(--color-header)' }}
              >
                {post.title}
              </h2>
              <time className="text-caption shrink-0" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </div>
            {post.summary && (
              <p className="text-summary-body mt-2 leading-relaxed">{post.summary}</p>
            )}
          </Link>
        </article>
      ))}

      <div className="mt-8">
        <Link href="/tags" className="text-caption !no-underline hover:!text-[var(--color-accent)]" style={{ textDecoration: 'none' }}>
          &larr; All tags
        </Link>
      </div>
    </div>
  )
}
