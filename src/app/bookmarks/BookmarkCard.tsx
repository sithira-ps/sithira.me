import { ExternalLink } from 'lucide-react'
import { type Bookmark } from '@/data/bookmarksData'

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

function getFaviconUrl(url: string) {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return null
  }
}

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const favicon = getFaviconUrl(bookmark.url)
  const domain = getDomain(bookmark.url)

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bookmark-card group relative flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] p-4 transition-all hover:border-[var(--color-accent)] hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {favicon && (
            <img src={favicon} alt="" width={16} height={16} className="rounded-sm" />
          )}
          <span className="text-xs text-[var(--color-accent)]">{bookmark.category}</span>
        </div>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
      </div>

      <h3 className="item-title mb-1 line-clamp-2 group-hover:text-[var(--color-accent)]">
        {bookmark.title}
      </h3>

      <p className="mb-3 line-clamp-2 overflow-hidden text-sm text-[var(--color-text)]/60">
        {bookmark.description}
      </p>

      <span className="mt-auto text-xs text-[var(--color-text)]/40">{domain}</span>

      {bookmark.comment && (
        <div className="absolute  inset-x-0 top-18 bottom-0 flex items-center rounded-b-lg bg-[var(--color-body-background)]/90 px-4 py-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-3 text-sm italic text-[var(--color-text)]/70">
            &ldquo;{bookmark.comment}&rdquo;
          </p>
        </div>
      )}
    </a>
  )
}
