import { Card, CardContent } from '@/components/ui/card'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { format } from 'date-fns'
import Pagination from '@/components/Pagination'
import Image from 'next/image'

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
    <div className="mx-auto flex w-full max-w-7xl gap-10 sm:mt-10">
      <section className="flex-1 space-y-2">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((post, idx) => (
            <Card
              key={idx}
              className="rounded-none border-0 border-b border-b-gray-300 bg-transparent px-4 shadow-none dark:border-b-gray-800"
            >
              <CardContent className="w-full p-0">
                <Link href={post.url} className="block lg:flex justify-between gap-4">
                  <div className="">
                    <Image
                      alt="sithira-senanayake-avatar"
                      src={post.coverImage}
                      className="mt-2  w-full lg:w-50 rounded-md object-cover"
                      width={180}
                      height={100}
                    />
                  </div>
                  <div className="w-full lg:w-2/3 mt-4 sm:mt-0">
                    <h3 className="mt-1 text-xl font-semibold">{post.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs font-medium text-cyan-500 uppercase">
                      {post.tags && post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm">{post.summary}</p>
                  </div>
                </Link>
                <div className="mt-4 flex items-center justify-between">
                  <p className="dark:text-muted-foreground text-xs">
                    {format(new Date(post.date), 'MMMM do, yyyy')}
                  </p>
                  <span className="text-sm font-medium text-gray-600 hover:text-cyan-500 dark:text-gray-300">
                    Read more →
                  </span>
                </div>
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
