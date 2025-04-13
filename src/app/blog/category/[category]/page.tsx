// app/blog/page/[page]/page.tsx
import Blog from '../../page';

export default function CategoryFilteedBlogPage({ params }: { params: { category: string } }) {
  const category = params.category || 'all';
  return <Blog pageNumber={1} category={category}/>;
}
