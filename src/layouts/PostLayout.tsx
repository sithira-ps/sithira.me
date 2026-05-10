import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Post } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Post>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { date, title, tags } = content

  return (
    <>
      <ScrollTopAndComment />
      <article className="prose max-w-none">
        <header>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
          </time>
          <h1 className="!mt-1" style={{ color: 'var(--color-header)' }}>
            {title}
          </h1>
          {tags && tags.length > 0 && (
            <div className="text-tag flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: '1px 8px',
                    borderRadius: '3px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {children}

        {siteMetadata.comments && (
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border)' }} id="comment">
            <Comments />
          </div>
        )}

        <footer className="text-caption mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex justify-between items-center">
            {prev && prev.path ? (
              <Link href={`/blog/${prev.path}`}>← {prev.title}</Link>
            ) : (
              <span />
            )}
            {next && next.path ? (
              <Link href={`/blog/${next.path}`}>{next.title} →</Link>
            ) : (
              <span />
            )}
          </div>
          <div className="mt-4">
            <Link href="/blog">← All posts</Link>
          </div>
        </footer>
      </article>
    </>
  )
}
