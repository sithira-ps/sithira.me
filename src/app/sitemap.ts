import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const now = new Date().toISOString().split('T')[0]

  const posts = allPosts.filter((post) => !post.draft)

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.path}`,
    lastModified: post.lastmod || post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const tags = [...new Set(posts.flatMap((post) => post.tags || []))]
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/tags`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  return [...staticRoutes, ...blogRoutes, ...tagRoutes]
}
