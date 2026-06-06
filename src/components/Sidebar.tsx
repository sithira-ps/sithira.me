import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allPosts, allNotes } from 'contentlayer/generated'
import bookmarksData from '@/data/bookmarksData'
import { Rss, Bookmark, Asterisk, StickyNote, Clock } from 'lucide-react'

export default function Sidebar() {
  const sortedPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const featuredPosts = sortedPosts.slice(0, 3)

  const recentNotes = allNotes
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

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
            <Link href="/notes" className="flex items-center gap-1.5">
              <StickyNote className="h-3.5 w-3.5" />
              Notes
            </Link>
          </li>

          <li className="!ml-0 before:!content-none">
            <Link href="/bookmarks" className="flex items-center gap-1.5">
              <Bookmark className="h-3.5 w-3.5" />
              Bookmarks
            </Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href="/now" className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Now
            </Link>
          </li>
          <li className="!ml-0 before:!content-none">
            <Link href="/feed.xml" className="flex items-center gap-1.5">
              <Rss className="h-3.5 w-3.5" />
              RSS
            </Link>
          </li>
        </ul>
      </nav>

      {/* Recent Bookmarks */}
      {bookmarksData.length > 0 && (
        <div>
          <h2>Recent Bookmarks</h2>
          <ul className="list-none p-0">
            {bookmarksData.slice(0, 3).map((bookmark) => (
              <li key={bookmark.url} className="mb-2 !ml-0">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="flex items-start gap-1.5">
                    <Bookmark size={12} className="mt-1 shrink-0" />
                    <span className="line-clamp-1 text-sm leading-snug group-hover:text-[var(--color-accent)]">
                      {bookmark.title}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/bookmarks"
            className="text-sm text-[var(--color-caption)] hover:text-[var(--color-accent)]"
          >
            View all bookmarks →
          </Link>
        </div>
      )}

      {/* Recent Notes */}
      {recentNotes.length > 0 && (
        <div>
          <h2>Recent Notes</h2>
          <ul className="list-none p-0">
            {recentNotes.map((note) => (
              <li key={note._id} className="mb-2 !ml-0">
                <Link href="/notes" className="group block">
                  <span className="flex items-start gap-1.5">
                    <StickyNote size={12} className="mt-1 shrink-0" />
                    <span className="line-clamp-1 text-sm leading-snug group-hover:text-[var(--color-accent)]">
                      {note.body.raw.trim()}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/notes"
            className="text-sm text-[var(--color-caption)] hover:text-[var(--color-accent)]"
          >
            View all notes →
          </Link>
        </div>
      )}

      {/* Recent Articles */}
      <div>
        <h2>Recent Articles</h2>
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
