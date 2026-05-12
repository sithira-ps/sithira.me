import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { format } from 'date-fns'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 8

interface BlogProps {
  posts: typeof allPosts
  pageNumber?: number
}

export default function BlogList({ posts, pageNumber = 1 }: BlogProps) {
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
              <Link
                href={post.url}
                className="group block no-underline"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3
                    className="item-title group-hover:!text-[var(--color-accent)]"
                    style={{ color: 'var(--color-header)' }}
                  >
                    {post.title}
                  </h3>
                  <time className="text-caption shrink-0">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </time>
                </div>

                <p className="text-summary-body mt-2 mb-2 leading-relaxed">{post.summary}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="text-tag mt-1.5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="after:ml-2 after:content-['|'] last:after:content-['']"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))
        ) : (
          <div className="text-caption flex h-40 items-center justify-center text-center">
            No posts available.
          </div>
        )}

        {currentPosts.length > 0 && (
          <Pagination totalPages={totalPages} currentPage={pageNumber} basePath={'blog'} />
        )}
      </section>
    </div>
  )
}
