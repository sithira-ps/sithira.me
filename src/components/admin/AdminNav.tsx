'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'


const navItems = [
  { href: '/admin/notes', label: 'Notes' },
  { href: '/admin/bookmarks', label: 'Bookmarks' },
  { href: '/admin/now', label: 'Now' },
]

export default function AdminNav({ user }: { user: { name?: string | null; username?: string } }) {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[var(--color-border)] py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="text-lg font-semibold text-[var(--color-header)] no-underline"
          >
            Admin
          </Link>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm no-underline transition-colors ${
                  pathname === item.href
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-caption)] hover:text-[var(--color-header)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-caption)]">{user.username ?? 'Admin'}</span>
          <Link
            href="/signout"
            className="text-xs text-[var(--color-caption)] no-underline hover:text-[var(--color-header)]"
          >
            <LogOut size={16} />
          </Link>
        </div>
      </div>
       
    </nav>
  )
}
