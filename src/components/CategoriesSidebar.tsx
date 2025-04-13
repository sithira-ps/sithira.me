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
}

const CategoriesSidebar: FC<CategoriesSidebarProps> = ({ categories }) => {
  const pathname = usePathname()

  return (
    <div className="mx-auto mb-4 flex max-w-7xl gap-10 text-white sm:mt-10">
      {/* Sidebar */}
      <aside className="hidden h-full max-h-[calc(100vh-5rem)] w-64 max-w-[280px] min-w-[280px] overflow-y-auto rounded-md bg-gray-900/70 pt-5 shadow-md sm:flex">
        <div className="px-6 py-4">
          <h2 className="mb-4 font-semibold text-cyan-500 uppercase">Categories</h2>
          <ul className="ml-4 space-y-2 text-sm">
            <Link href={`/blog/category/all`}>
              <li
                className={`${
                  pathname.startsWith('/blog/category/all')
                    ? 'dark:text-primary-400 text-cyan-500'
                    : 'text-gray-900 dark:text-gray-100'
                } cursor-pointer pb-2 uppercase hover:text-cyan-500`}
              >
                All Posts
              </li>
            </Link>
            {categories.map((cat) => {
              const isActive = pathname.startsWith(`/blog/category/${cat.category}`)

              return (
                <Link key={cat.category} href={`/blog/category/${cat.category}`}>
                  <li
                    className={`${
                      isActive
                        ? 'dark:text-primary-400 text-cyan-500'
                        : 'text-gray-900 dark:text-gray-100'
                    } cursor-pointer pb-2 uppercase hover:text-cyan-500`}
                  >
                    {cat.category} ({cat.postsCount})
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default CategoriesSidebar
