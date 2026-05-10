import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allPosts } from 'contentlayer/generated'
import { genPageMetadata } from './seo'

export const metadata = genPageMetadata({ title: 'Home | Sithira Senanayake - Personal Blog' })

export default function Home() {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const recentPosts = sortedPosts.slice(0, 8)

  const postDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <section>
      {recentPosts.map((post) => (
        <article key={post._id} className="prose max-w-none mb-12">
          <header>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
            <h1 className="!mt-1">
              <Link
                href={post.url}
                className="no-underline"
                style={{ color: 'var(--color-header)', textDecoration: 'none' }}
              >
                {post.title}
              </Link>
            </h1>
          </header>
          <p>{post.summary}</p>
        </article>
      ))}
    </section>
  )
}
