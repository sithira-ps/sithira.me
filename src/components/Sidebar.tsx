'use client'

import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allPosts } from 'contentlayer/generated'
import { Mail, Rss, Briefcase, Asterisk } from 'lucide-react'

export default function Sidebar() {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const featuredPosts = sortedPosts.slice(0, 5)

  const years = [...new Set(sortedPosts.map((p) => new Date(p.date).getFullYear()))].sort(
    (a, b) => b - a
  )

  return (
    <aside className="Sidebar border-r border-[var(--color-caption)] pr-5">
      {/* Bio */}
      <p>
        A weblog by Sithira Senanayake about exploring and building software, sharing knowledge, and
        documenting the journey.
      </p>

      {/* Navigation Links */}
      <nav>
        <ul className="flex list-none justify-between p-0">
          <li className="!ml-0 before:!content-none">
            <Link href={`mailto:${siteMetadata.email}`} className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Email
            </Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href="/feed.xml" className="flex items-center gap-1.5">
              <Rss className="h-3.5 w-3.5" />
              RSS
            </Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href="/about" className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* About */}
      <div>
        <h2>About the author</h2>
        <p>
          Sithira is a software engineer and amateur human passionate about technology, science, and
          philosophy. Currently building things on the web.
        </p>
      </div>

      {/* Featured */}
      <div>
        <h2>Featured</h2>
        <ul className="list-none p-0">
          {featuredPosts.map((post) => (
            <li key={post._id} className="mb-1 !ml-0">
              <span className="flex items-center">
                <Asterisk size={12} className="mr-1" />
                <Link href={post.url} className="w-80 truncate">
                  {post.title}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Elsewhere */}
      <div>
        <h2>Elsewhere</h2>
        <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-0.5 p-0">
          {siteMetadata.github && (
            <li className="!ml-0 before:!content-none">
              <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          )}
          {siteMetadata.instagram && (
            <li className="!ml-0 before:!content-none">
              <a href={siteMetadata.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          )}
          {siteMetadata.linkedin && (
            <li className="!ml-0 before:!content-none">
              <a href={siteMetadata.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          )}
          {siteMetadata.x && (
            <li className="!ml-0 before:!content-none">
              <a href={siteMetadata.x} target="_blank" rel="noopener noreferrer">
                X / Twitter
              </a>
            </li>
          )}
          {siteMetadata.medium && (
            <li className="!ml-0 before:!content-none">
              <a href={siteMetadata.medium} target="_blank" rel="noopener noreferrer">
                Medium
              </a>
            </li>
          )}
          {siteMetadata.facebook && (
            <li className="!ml-0 before:!content-none">
              <a href={siteMetadata.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Tags */}
      <div>
        <h2>Tags</h2>
        <ul className="flex list-none flex-wrap gap-x-2 gap-y-1.5 p-0">
          {(() => {
            const tagCounts: Record<string, number> = {}
            sortedPosts.forEach((post) => {
              post.tags?.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1
              })
            })
            return Object.entries(tagCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([tag, count]) => (
                <li
                  key={tag}
                  className="!ml-0 flex items-center before:!content-none after:ml-2 after:text-[var(--color-caption)] after:content-['|'] last:after:hidden"
                >
                  <Link
                    href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                    className="text-tag no-underline hover:!text-[var(--color-accent)]"
                  >
                    {tag} ({count})
                  </Link>
                </li>
              ))
          })()}
        </ul>
      </div>

      {/* Archives */}
      <div>
        <h2>Archives</h2>
        <ul className="flex list-none flex-wrap gap-x-1 gap-y-0 p-0">
          {years.map((year, idx) => (
            <li key={year} className="!ml-0 inline before:!content-none">
              <Link href="/blog">{year}</Link>
              {idx < years.length - 1 && (
                <span style={{ color: 'var(--color-border)', margin: '0 2px' }}>/</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
