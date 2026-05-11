// /component/Pagination.tsx
import Link from 'next/link'

interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath: string
}

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
}: PaginationProps) {
  const createPageLink = (page: number) => {
    return page === 1 ? `/${basePath}` : `/${basePath}/page/${page}`
  }

  const renderPageNumbers = () => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <Link
            key={i}
            href={createPageLink(i)}
            className="mx-1 rounded px-2 py-1"
            style={
              i === currentPage
                ? { backgroundColor: 'var(--color-accent)', color: '#fff' }
                : { color: 'var(--color-text)' }
            }
          >
            {i}
          </Link>
        )
      } else if ((i === currentPage - 2 && i > 1) || (i === currentPage + 2 && i < totalPages)) {
        pages.push(
          <span key={`ellipsis-${i}`} className="px-2" style={{ color: 'var(--color-caption)' }}>
            ...
          </span>
        )
      }
    }

    return pages
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <div className="text-caption flex flex-wrap items-center justify-between gap-2 pt-6 pb-8">
      {prevPage ? (
        <Link href={createPageLink(prevPage)} rel="prev" style={{ color: 'var(--color-accent)' }}>
          ← Prev
        </Link>
      ) : (
        <span style={{ color: 'var(--color-caption)' }}>← Prev</span>
      )}

      <div>{renderPageNumbers()}</div>

      {nextPage ? (
        <Link href={createPageLink(nextPage)} rel="next" style={{ color: 'var(--color-accent)' }}>
          Next →
        </Link>
      ) : (
        <span style={{ color: 'var(--color-caption)' }}>Next →</span>
      )}
    </div>
  )
}
