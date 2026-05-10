import { allPosts } from 'contentlayer/generated'
import BlogList from '@/components/BlogList'

interface PageProps {
  params: Promise<{ page: string }>
}

export async function generateStaticParams() {
  const posts = allPosts.filter((post) => !post.draft)
  const totalPages = Math.ceil(posts.length / 8)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export default async function BlogPaginatedPage(props: PageProps) {
  const { page } = await props.params
  const pageNumber = parseInt(page, 10)

  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <h1 className="page-title mb-8">Blog</h1>
      <BlogList posts={sortedPosts} pageNumber={pageNumber} />
    </div>
  )
}
