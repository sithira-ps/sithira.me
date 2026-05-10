// app/blog/[slug]/page.tsx
import { allPosts } from 'contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'
import { allCoreContent, coreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import { components } from '@/components/MDXComponents'

interface PageParams {
  slug: string
}

interface PageProps {
  params: Promise<PageParams>
  searchParams?: Record<string, string | string[] | undefined>
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export async function generateMetadata(props: PageProps) {
  const { params } = await Promise.resolve(props)
  const slug = (await params).slug
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  const siteUrl = 'https://sithira.me'
  const ogImage = post.coverImage
    ? `${siteUrl}${post.coverImage}`
    : `${siteUrl}/images/sithira-senanayake-2.png`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/blog/${post.path}`,
      siteName: 'Sithira Senanayake | Personal Blog',
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastmod || post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  }
}

export default async function Page(props: PageProps) {
  // Await the entire params object first
  const { params } = await Promise.resolve(props)
  const slug = (await params).slug
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  if (!post?.body.code) return notFound()

  const decodedSlug = decodeURI(slug)

  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allPosts))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === decodedSlug)
  if (postIndex === -1) {
    return notFound()
  }

  const Layout = PostLayout
  const mainContent = coreContent(post)
  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]

  const siteUrl = 'https://sithira.me'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        image: post.coverImage ? `${siteUrl}${post.coverImage}` : undefined,
        datePublished: post.date,
        dateModified: post.lastmod || post.date,
        url: `${siteUrl}/blog/${post.path}`,
        author: {
          '@type': 'Person',
          name: 'Sithira Senanayake',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Person',
          name: 'Sithira Senanayake',
          url: siteUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${post.path}`,
        },
        keywords: post.tags?.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${siteUrl}/blog/${post.path}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
