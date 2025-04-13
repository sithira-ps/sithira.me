import Subscribe from '@/components/Subscribe'
import { Card, CardContent } from '@/components/ui/card'
import siteMetadata from '@/data/siteMetadata'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'

export default function Home() {
  const postDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const recentPosts = sortedPosts.slice(0, 5)

  return (
    <div>
      {recentPosts.length > 0 ? (
        recentPosts.map((post) => (
          <Link key={post._id} href={post.url}>
            <Card className="mt-8 rounded-none border-0 border-b bg-transparent text-white shadow-none">
              <CardContent className="md:flex">
                <div className="mx-auto min-w-50 pl-0">
                  <p className="text-md mb-4 text-left text-gray-400">
                    {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </p>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-white">{post.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs font-medium text-cyan-500 uppercase">
                    {post.tags && post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <p className="my-4 text-gray-400">
                    {post.summary}
                  </p>
                  <p className="text-sm font-medium text-gray-300 hover:text-cyan-500">
                    Read more →
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div className="text-muted-foreground flex h-full min-h-60 items-center justify-center text-center text-sm">
          No posts available.
        </div>
      )}
      <div className="mt-6 text-right">
        {recentPosts.length > 0 ? (
          <Link href="/blog" className="text-md font-medium text-gray-300 hover:text-cyan-500">
            All Posts →
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      <Subscribe />
    </div>
  )
}
