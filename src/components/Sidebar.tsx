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
        <ul className="flex list-none flex justify-between p-0">
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
          <li className="!ml-0 before:!content-none">
            <Link href={siteMetadata.github}>GitHub</Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href={siteMetadata.instagram || '#'}>Instagram</Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href={siteMetadata.linkedin}>LinkedIn</Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href={siteMetadata.x || '#'}>X / Twitter</Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href={siteMetadata.medium || '#'}>Medium</Link>
          </li>
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
