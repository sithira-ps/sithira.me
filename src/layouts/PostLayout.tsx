import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Post } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface TocHeading {
  value: string
  url: string
  depth: number
}

interface TocNode {
  value: string
  url: string
  depth: number
  children: TocNode[]
}

function buildTree(headings: TocHeading[]): TocNode[] {
  const root: TocNode[] = []
  const stack: TocNode[] = []

  for (const heading of headings) {
    const node: TocNode = { ...heading, children: [] }
    while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
      stack.pop()
    }
    if (stack.length === 0) {
      root.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }
    stack.push(node)
  }
  return root
}

function TocBranch({ nodes }: { nodes: TocNode[] }) {
  return (
    <ul className="toc-branch list-none pl-0">
      {nodes.map((node) => (
        <li key={node.url} className="toc-node">
          <a
            href={node.url}
            className="text-sm"
            style={{ color: 'var(--color-text)', textDecoration: 'none' }}
          >
            {node.value}
          </a>
          {node.children.length > 0 && <TocBranch nodes={node.children} />}
        </li>
      ))}
    </ul>
  )
}

function TocTree({ headings }: { headings: TocHeading[] }) {
  const tree = buildTree(headings)
  return (
    <div className="toc-tree mt-3 ml-5" style={{ fontFamily: 'var(--font-sans)' }}>
      <TocBranch nodes={tree} />
    </div>
  )
}

interface LayoutProps {
  content: CoreContent<Post>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { date, title, tags, toc } = content

  return (
    <>
      <ScrollTopAndComment />
      <article className="prose max-w-none">
        <header>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
          </time>
          <h1 className="!mt-1" style={{ color: 'var(--color-header)' }}>
            {title}
          </h1>
          {tags && tags.length > 0 && (
            <div className="text-tag mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: '1px 8px',
                    borderRadius: '3px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {toc && (toc as { value: string; url: string; depth: number }[]).length > 0 && (
          <details className="not-prose my-8" aria-label="Table of contents">
            <summary
              className="cursor-pointer text-sm font-semibold uppercase select-none"
              style={{ color: 'var(--color-caption)', fontFamily: 'var(--font-sans)' }}
            >
              Table of Contents
            </summary>
            <TocTree headings={toc as { value: string; url: string; depth: number }[]} />
          </details>
        )}

        {children}

        {siteMetadata.comments && (
          <div
            className="mt-12 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
            id="comment"
          >
            <Comments />
          </div>
        )}

        <footer
          className="not-prose mt-12 grid grid-cols-2 font-sans"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {prev && prev.path ? (
            <Link
              href={`/blog/${prev.path}`}
              className="group block p-2 pr-10 lg:pr-30"
              style={{ borderRight: '1px solid var(--color-border)', textDecoration: 'none' }}
            >
              <span
                className="text-xs transition-colors group-hover:!text-orange-400"
                style={{ color: 'var(--color-caption)' }}
              >
                Previous
              </span>
              <span
                className="block truncate text-sm transition-colors group-hover:!text-orange-400"
                style={{ color: 'var(--color-text)' }}
              >
                {prev.title}
              </span>
            </Link>
          ) : (
            <span style={{ borderRight: '1px solid var(--color-border)' }} />
          )}
          {next && next.path ? (
            <Link
              href={`/blog/${next.path}`}
              className="group width-4 block p-2 pl-10 text-right lg:pl-30"
              style={{ textDecoration: 'none' }}
            >
              <span
                className="text-xs transition-colors group-hover:!text-orange-400"
                style={{ color: 'var(--color-caption)' }}
              >
                Next
              </span>
              <span
                className=" block truncate text-sm transition-colors group-hover:!text-orange-400"
                style={{ color: 'var(--color-text)' }}
              >
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </footer>
      </article>
    </>
  )
}
