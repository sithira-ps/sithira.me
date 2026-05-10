'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 pt-8 pb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[--color-text-muted]">
        <div className="flex items-center gap-4">
          <Link
            href="/feed.xml"
            className="hover:text-[--color-accent] transition-colors"
          >
            RSS
          </Link>
          <Link
            href="https://github.com/SthiraPs"
            className="hover:text-[--color-accent] transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/sithira-senanayake/"
            className="hover:text-[--color-accent] transition-colors"
          >
            LinkedIn
          </Link>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Sithira Senanayake
        </p>
      </div>
    </footer>
  )
}
