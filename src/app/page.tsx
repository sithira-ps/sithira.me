import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allPosts, allNotes } from 'contentlayer/generated'
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

  const sortedNotes = allNotes
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const postDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const noteDateTemplate: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  }

  const noteColors = [
    'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
    'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
  ]

  return (
    <section>
      <div
        className="prose mb-20 max-w-none text-center"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
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
        <Link href="/about" className="!no-underline">
          Learn more about me →
        </Link>
      </div>

      {sortedNotes.length > 0 && (
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-header)' }}>
              Recent Notes
            </h2>
            <Link
              href="/notes"
              className="text-sm !no-underline hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-caption)' }}
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedNotes.map((note, index) => (
              <article
                key={note._id}
                className={`rounded-lg border p-4 transition-transform hover:scale-[1.02] ${noteColors[index % noteColors.length]}`}
              >
                <time className="mb-2 block text-xs font-medium opacity-70" dateTime={note.date}>
                  {new Date(note.date).toLocaleDateString(siteMetadata.locale, noteDateTemplate)}
                </time>
                <p className="line-clamp-3 text-sm leading-relaxed">{note.body.raw}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-header)' }}>
            Recent Articles
          </h2>
          <Link
            href="/blog"
            className="text-sm !no-underline hover:text-[var(--color-accent)]"
            style={{ color: 'var(--color-caption)' }}
          >
            View all →
          </Link>
        </div>

        {recentPosts.map((post) => (
          <div key={post._id}>
            <article className="py-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
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
          </div>
        ))}
      </div>
    </section>
  )
}
