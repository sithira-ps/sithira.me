import { allPosts } from 'contentlayer/generated'
import BlogList from '@/components/BlogList'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles about software engineering, web development, DevOps, AI, science, and philosophy by Sithira Senanayake.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/blog`,
  },
  openGraph: {
    title: `Blog | ${siteMetadata.title}`,
    description:
      'Articles about software engineering, web development, DevOps, AI, science, and philosophy.',
    url: `${siteMetadata.siteUrl}/blog`,
    type: 'website',
  },
}

export default function BlogPage() {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteMetadata.siteUrl}/blog#blog`,
    name: 'Sithira Senanayake\'s Blog',
    description:
      'Articles about software engineering, web development, DevOps, AI, science, and philosophy.',
    url: `${siteMetadata.siteUrl}/blog`,
    author: { '@id': 'https://sithira.me/#person' },
    isPartOf: { '@id': 'https://sithira.me/#website' },
    blogPost: sortedPosts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteMetadata.siteUrl}/blog/${post.path}`,
      datePublished: post.date,
      description: post.summary,
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteMetadata.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteMetadata.siteUrl}/blog` },
      ],
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <h1 className="page-title mb-8">Blog</h1>
      <BlogList posts={sortedPosts} />
    </div>
  )
}
