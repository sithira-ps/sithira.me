import { allPosts } from 'contentlayer/generated'
import BlogList from '@/components/BlogList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sithira.me/blog/',
  },
}

export default function BlogPage() {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <h1 className="page-title mb-8">Blog</h1>
      <BlogList posts={sortedPosts} />
    </div>
  )
}
