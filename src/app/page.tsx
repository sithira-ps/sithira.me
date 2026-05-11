import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Sithira Senanayake | Software Engineer & Personal Blog',
  },
  description:
    'Personal blog by Sithira Senanayake — a software engineer writing about technology, web development, science, and philosophy.',
  alternates: {
    canonical: 'https://sithira.me/',
  },
  openGraph: {
    title: 'Sithira Senanayake | Software Engineer & Personal Blog',
    description:
      'Personal blog by Sithira Senanayake — a software engineer writing about technology, web development, science, and philosophy.',
    url: 'https://sithira.me/',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Sithira Senanayake | Software Engineer & Personal Blog',
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
    creator: '@_Sithira',
  },
}

export default function Home() {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const recentPosts = sortedPosts.slice(0, 5)

  const postDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <section>
      <div className="prose mb-20 max-w-none text-center">
        <p>
          I&apos;m <span className="text-underline">Sithira Senanayake</span>, a software engineer
          passionate about technology, science, and philosophy. Join me as I share details about my
          projects, opinions on different topics, and thoughts on anything else I find interesting.
        </p>
        <p>
          In this blog, I share my journey, experiences, and the challenges I encounter in my
          day-to-day life. This is primarily for my entertainment, to establish an online presence,
          and to serve as a time capsule to look back on after 20 years.
        </p>
      </div>

      {recentPosts.map((post) => (
        <article
          key={post._id}
          className="py-6"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="item-title">
              <Link
                href={post.url}
                style={{ color: 'var(--color-header)', textDecoration: 'none' }}
                className="hover:!text-[var(--color-accent)]"
              >
                {post.title}
              </Link>
            </h2>
            <time className="text-caption shrink-0" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
          </div>
          <p className="text-summary-body mt-2 leading-relaxed">{post.summary}</p>
        </article>
      ))}
    </section>
  )
}
