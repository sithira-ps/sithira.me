import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-caption pt-20 pb-6 text-center">
      <nav className="mb-2 flex items-center justify-center gap-2 text-sm">
        <Link href="/blog" >Blog</Link>
        <span className="text-[var(--color-caption)]/70">|</span>
        <Link href="/projects">Projects</Link>
        <span className="text-[var(--color-caption)]/70">|</span>
        <Link href="/about">About</Link>
        <span className="text-[var(--color-caption)]/70">|</span>
        <Link href="/notes">Notes</Link>
        <span className="text-[var(--color-caption)]/70">|</span>
        <Link href="/bookmarks">Bookmarks</Link>
        <span className="text-[var(--color-caption)]/70">|</span>
        <Link href="/now">Now</Link>
      </nav>
      <p>Sithira Senanayake &middot; &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
