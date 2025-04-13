import { Card, CardContent } from '@/components/ui/card'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { format } from 'date-fns'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 4

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
    <div className="mx-auto flex w-full max-w-7xl gap-10 text-white sm:mt-10">
      <section className="flex-1 space-y-2">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((post, idx) => (
            <Card
              key={idx}
              className="rounded-none border-0 border-b border-[#2a2c31] bg-transparent"
            >
              <CardContent className="w-full p-0">
                <Link href={post.url} className="block">
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(post.date), 'MMMM do, yyyy')}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{post.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs font-medium text-cyan-500 uppercase">
                    {post.tags && post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm">{post.summary}</p>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-300 hover:text-cyan-500">
                      Read more →
                    </span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-center text-sm">
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
