import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-[var(--color-header)]">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/notes"
          className="rounded-lg border border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-accent)]"
        >
          <h2 className="mb-2 font-semibold text-[var(--color-header)]">Notes</h2>
          <p className="text-sm text-[var(--color-caption)]">Create quick notes</p>
        </Link>
        <Link
          href="/admin/bookmarks"
          className="rounded-lg border border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-accent)]"
        >
          <h2 className="mb-2 font-semibold text-[var(--color-header)]">Bookmarks</h2>
          <p className="text-sm text-[var(--color-caption)]">Add bookmarks</p>
        </Link>
        <Link
          href="/admin/now"
          className="rounded-lg border border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-accent)]"
        >
          <h2 className="mb-2 font-semibold text-[var(--color-header)]">Now</h2>
          <p className="text-sm text-[var(--color-caption)]">Update your Now page</p>
        </Link>
      </div>
    </div>
  )
}
