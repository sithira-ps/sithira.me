// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import { extractTocHeadings } from 'pliny/mdx-plugins/index.js'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `published/**/*.mdx`,
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
    url: { type: 'string', resolve: (post) => `/blog/${post._raw.sourceFileName.replace(/\.mdx$/, '')}` },
    path: { type: 'string', resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '') },
    slug: { type: 'string', resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '') },
    filePath: { type: 'string', resolve: (post) => post._raw.sourceFilePath },
    toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
  },
}))

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: `notes/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (note) => note._raw.sourceFileName.replace(/\.mdx$/, '') },
    filePath: { type: 'string', resolve: (note) => note._raw.sourceFilePath },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post, Note],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeSlug, rehypeKatex],
  },
})
