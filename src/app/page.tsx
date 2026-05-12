import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allPosts, allNotes } from 'contentlayer/generated'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Sithira Senanayake | Software Engineer & Personal Blog',
  },
  description:
    'Personal blog by Sithira Senanayake - a software engineer writing about technology, web development, science, and philosophy.',
  alternates: {
    canonical: 'https://sithira.me/',
  },
  openGraph: {
    title: 'Sithira Senanayake | Software Engineer & Personal Blog',
    description:
      'Personal blog by Sithira Senanayake - a software engineer writing about technology, web development, science, and philosophy.',
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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

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
        <div className="mb-20">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-header)' }}>
              Recent Notes
            </h2>
            <Link
              href="/notes"
              className="text-caption text-sm !no-underline transition-colors hover:text-[var(--color-accent)]"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {sortedNotes.map((note) => (
              <article
                key={note._id}
                className="group rounded-smA relative border border-transparent bg-[var(--color-offset)] p-6 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)] opacity-100 transition-opacity" />
                  <div className="min-w-0 flex-1">
                    <time
                      className="text-caption mb-1 block font-medium tracking-wide"
                      dateTime={note.date}
                    >
                      {new Date(note.date).toLocaleDateString(
                        siteMetadata.locale,
                        noteDateTemplate
                      )}
                    </time>
                    <div className="text-body leading-relaxed">{note.body.raw}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      {recentPosts.length > 0 && (
        <div className="mb-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-header)' }}>
              Recent Articles
            </h2>
            <Link
              href="/blog"
              className="text-caption text-sm !no-underline transition-colors hover:text-[var(--color-accent)]"
            >
              View all →
            </Link>
          </div>

          {recentPosts.map((post) => (
            <div key={post._id}>
              <article className="py-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
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
                  <p className="text-summary-body mt-2 leading-relaxed">{post.summary}</p>
                </Link>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
