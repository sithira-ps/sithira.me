'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface Category {
  category: string
  postsCount: number
}

interface CategoriesSidebarProps {
  categories: Category[]
  totalPostsCount: number
}

const CategoriesSidebar: FC<CategoriesSidebarProps> = ({ categories, totalPostsCount }) => {
  const pathname = usePathname()

  return (
    <aside className="hidden sm:block w-56 shrink-0">
      <div className="sticky top-8">
        <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wide mb-4">
          Categories
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/blog/category/all"
              className={`block py-1 transition-colors ${
                pathname.startsWith('/blog/category/all')
                  ? 'text-[--color-accent]'
                  : 'text-[--color-text-body] hover:text-[--color-accent]'
              }`}
            >
              All Posts ({totalPostsCount})
            </Link>
          </li>
          {categories.map((cat) => {
            const isActive = pathname.startsWith(`/blog/category/${cat.category}`)
            return (
              <li key={cat.category}>
                <Link
                  href={`/blog/category/${cat.category}`}
                  className={`block py-1 transition-colors ${
                    isActive
                      ? 'text-[--color-accent]'
                      : 'text-[--color-text-body] hover:text-[--color-accent]'
                  }`}
                >
                  {cat.category} ({cat.postsCount})
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export default CategoriesSidebar
