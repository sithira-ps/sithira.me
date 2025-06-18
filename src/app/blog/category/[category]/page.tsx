// app/blog/category/[category]/page.tsx
import Blog from '../../page'

export default async function CategoryFilteedBlogPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const categoryValue = category || 'all'
  return <Blog pageNumber={1} category={categoryValue} />
}
