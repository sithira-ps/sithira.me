import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { format } from 'date-fns'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 8

interface BlogProps {
  posts: typeof allPosts
  pageNumber?: number
  category: string
}

export default function BlogList({ posts, pageNumber = 1, category = 'all' }: BlogProps) {
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  return (
    <div className="w-full">
      <section className="space-y-1">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <article
              key={post._id}
              className="py-6"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-sans text-base font-semibold">
                  <Link
                    href={post.url}
                    style={{ color: 'var(--color-header)', textDecoration: 'none' }}
                    className="hover:!text-[var(--color-accent)]"
                  >
                    {post.title}
                  </Link>
                </h3>
                <time
                  className="font-sans text-xs shrink-0"
                  style={{ color: 'var(--color-caption)' }}
                >
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </time>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-2 text-xs font-sans font-medium uppercase" style={{ color: 'var(--color-caption)' }}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {post.summary}
              </p>
            </article>
          ))
        ) : (
          <div className="flex h-40 items-center justify-center text-center text-sm" style={{ color: 'var(--color-caption)' }}>
            No posts available.
          </div>
        )}

        {currentPosts.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            basePath={'blog'}
            category={category}
          />
        )}
      </section>
    </div>
  )
}
