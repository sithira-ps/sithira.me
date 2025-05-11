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
  params: PageParams
  searchParams?: Record<string, string | string[] | undefined>
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export async function generateMetadata(props: PageProps) {
  // Await the entire params object first
  const { params } = await Promise.resolve(props)
  const slug = params.slug
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  return { title: post.title }
}

export default async function Page(props: PageProps) {
  // Await the entire params object first
  const { params } = await Promise.resolve(props)
  const slug = params.slug
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

  return (
    <Layout content={mainContent} next={next} prev={prev}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
    </Layout>
  )
}
