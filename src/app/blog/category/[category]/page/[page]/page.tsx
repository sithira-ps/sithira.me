// app/blog/page/[page]/page.tsx
import Blog from '../../../../page'

export default function BlogPage({ params }: { params: { page: string; category: string } }) {
  const pageNumber = parseInt(params.page, 10) || 1
  const category = params.category || 'all'
  return <Blog pageNumber={pageNumber} category={category} />
}
