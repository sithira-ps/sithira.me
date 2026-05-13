import { genPageMetadata } from '@/app/seo'
import bookmarksData from '@/data/bookmarksData'
import BookmarkCard from './BookmarkCard'
import { format } from 'date-fns'

export const metadata = genPageMetadata({
  title: 'Bookmarks',
  description:
    'A curated collection of interesting links, articles, videos, and tools from around the internet.',
  canonicalUrl: 'https://sithira.me/bookmarks',
})

function groupByMonth(bookmarks: typeof bookmarksData) {
  const groups: Record<string, typeof bookmarksData> = {}

  for (const bookmark of bookmarks) {
    const key = format(new Date(bookmark.addedAt), 'MMMM yyyy')
    if (!groups[key]) groups[key] = []
    groups[key].push(bookmark)
  }

  return Object.entries(groups).sort(
    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
  )
}

export default function BookmarksPage() {
  const grouped = groupByMonth(bookmarksData)

  return (
    <div>
      <h1 className="page-title mb-1">Bookmarks</h1>
      <p className="mb-12 text-sm text-[var(--color-caption)]">
        Interesting links from around the internet that I find worth sharing.
      </p>

      <div className="space-y-10">
        {grouped.map(([month, bookmarks]) => (
          <section key={month}>
            <h2 className="mb-4 text-sm font-medium tracking-wide text-[var(--color-text)]/50 uppercase">
              {month}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.url} bookmark={bookmark} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
