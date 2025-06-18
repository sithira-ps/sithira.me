// app/blog/category/[category]/page/[page]/page.tsx
import Blog from '../../../../page'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string; category: string }>
}) {
  const { page, category } = await params
  const pageNumber = parseInt(page, 10) || 1
  const categoryValue = category || 'all'
  return <Blog pageNumber={pageNumber} category={categoryValue} />
}
