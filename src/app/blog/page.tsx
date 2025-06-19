// blog/page.tsx

import { allPosts } from 'contentlayer/generated'
import BlogList from '@/components/BlogList'
import CategoriesSidebar from '@/components/CategoriesSidebar'

interface Category {
  category: string
  postsCount: number
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

  const categories: Category[] = (() => {
    const map: Record<string, number> = {}
    allPosts.forEach((post) => {
      ;(post.tags || []).forEach((tag) => {
        map[tag] = (map[tag] || 0) + 1
      })
    })
    return Object.entries(map).map(([category, postsCount]) => ({
      category,
      postsCount,
    }))
  })()

  return (
    <div className="mx-auto flex max-w-7xl gap-10">
      <CategoriesSidebar categories={categories} totalPostsCount={allPosts.length} />
      <BlogList posts={filteredPost} pageNumber={pageNumber} category={category} />
    </div>
  )
}
