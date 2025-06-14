import Subscribe from '@/components/Subscribe'
import { Card, CardContent } from '@/components/ui/card'
import siteMetadata from '@/data/siteMetadata'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { genPageMetadata } from './seo'

export const metadata = genPageMetadata({ title: 'Home | Sithira Senanayake - Personal Blog' })

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
      <div className="mx-auto mt-8 mb-8 max-w-7xl pb-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Thoughts by <br/> Sithira Senanayake</h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg">
          {`I'm Sithira Senanayake, a software engineer passionate about technology, science, and
          philosophy. Join me as I share details about my projects, opinions on different topics,
          and thoughs on anything else I find interesting.`}
        </p>

        <p className="mx-auto mb-6 max-w-4xl text-lg">
          {`In this blog, I share my journey, experiences, and the challenges I encounter in my
          day-to-day life. This is primarily for my entertainment, to establish an online presence,
          and to serve as a time capsule to look back on after 20 years.`}
        </p>
        <div className="mt-8">
          <Link href="/about" className="text-cyan-500 hover:text-cyan-600">
            Learn More About Me →
          </Link>
        </div>
      </div>
      <div>
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <Link key={post._id} href={post.url}>
              <Card className="mt-8 rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none dark:border-b-gray-800 dark:text-white">
                <CardContent className="md:flex">
                  <div className="mx-auto min-w-50">
                    <p className="text-md mb-4 text-left text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </p>
                  </div>
                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-white">
                      {post.title}
                    </h2>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs font-medium text-cyan-500 uppercase">
                      {post.tags && post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <p className="my-4 text-gray-600 dark:text-gray-400">{post.summary}</p>
                    <p className="text-sm font-medium text-gray-600 hover:text-cyan-500 dark:text-gray-300">
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
            <Link
              href="/blog"
              className="text-md font-medium text-gray-600 hover:text-cyan-500 dark:text-gray-300"
            >
              All Posts →
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <Subscribe />
    </div>
  )
}
