'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6" style={{ fontSize: '1rem' }}>
      {links.map((link) => {
        const isActive =
          link.href === '/'
            ? pathname === '/'
            : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href === '/blog' ? '/blog/category/all' : link.href}
            className={`nav-link${isActive ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
