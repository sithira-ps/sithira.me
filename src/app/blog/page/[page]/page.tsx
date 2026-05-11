import { allPosts } from 'contentlayer/generated'
import BlogList from '@/components/BlogList'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageProps {
  params: Promise<{ page: string }>
}

const POSTS_PER_PAGE = 8

export async function generateStaticParams() {
  const posts = allPosts.filter((post) => !post.draft)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { page } = await props.params
  const pageNumber = parseInt(page, 10)
  const siteUrl = siteMetadata.siteUrl

  return {
    title: `Blog - Page ${pageNumber}`,
    description: `Browse blog posts by Sithira Senanayake - Page ${pageNumber}`,
    alternates: {
      canonical: pageNumber === 1 ? `${siteUrl}/blog` : `${siteUrl}/blog/page/${pageNumber}`,
    },
    robots: {
      index: pageNumber > 1,
      follow: true,
    },
    openGraph: {
      title: `Blog - Page ${pageNumber} | ${siteMetadata.title}`,
      description: `Browse blog posts by Sithira Senanayake - Page ${pageNumber}`,
      url: `${siteUrl}/blog/page/${pageNumber}`,
      siteName: siteMetadata.title,
      type: 'website',
    },
  }
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
