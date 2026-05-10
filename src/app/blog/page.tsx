import { allPosts } from 'contentlayer/generated'
import BlogList from '@/components/BlogList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sithira.me/blog/',
  },
}

export default function BlogPage({
  pageNumber = 1,
  category = 'all',
}: {
  pageNumber: number
  category: string
}) {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const filteredPost =
    category === 'all' ? sortedPosts : sortedPosts.filter((post) => post.tags?.includes(category))

  return (
    <div>
      <h1 className="font-sans text-2xl font-bold mb-8" style={{ color: 'var(--color-header)' }}>Blog</h1>
      <BlogList posts={filteredPost} pageNumber={pageNumber} category={category} />
    </div>
  )
}
