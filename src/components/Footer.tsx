import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 text-center text-caption">
      <nav className="mb-2 flex items-center justify-center gap-2 text-sm">
        <Link href="/notes">Notes</Link>
        <span className="text-[var(--color-caption)]">|</span>
        <Link href="/bookmarks">Bookmarks</Link>
        <span className="text-[var(--color-caption)]">|</span>
        <Link href="/now">Now</Link>
      </nav>
      <p>Sithira Senanayake &middot; &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
