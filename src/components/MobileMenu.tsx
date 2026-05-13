'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AlignLeft, X } from 'lucide-react'

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/notes', label: 'Notes' },
  { href: '/bookmarks', label: 'Bookmarks' },
  { href: '/now', label: 'Now' },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-toggle"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} strokeWidth={1.5} /> : <AlignLeft size={24} strokeWidth={1.5} />}
      </button>

      {isOpen && (
        <nav className="mobile-menu-dropdown">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname.startsWith(link.href) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
