// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { extractTocHeadings } from 'pliny/mdx-plugins/index.js'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    coverImage: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath}` },
    path: { type: 'string', resolve: (post) => post._raw.flattenedPath },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath.replace(/^.+?(\/)/, '') },
    filePath: { type: 'string', resolve: (post) => post._raw.sourceFilePath },
    toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
  },
}))

export default makeSource({
  contentDirPath: 'posts/published',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})
