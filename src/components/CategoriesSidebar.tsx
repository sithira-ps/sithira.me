'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Category {
  category: string;
  postsCount: number;
}

interface CategoriesSidebarProps {
  categories: Category[];
}

const CategoriesSidebar: FC<CategoriesSidebarProps> = ({ categories }) => {
  const pathname = usePathname();
    
  return (
    <div className="flex gap-10 max-w-7xl mx-auto sm:mt-10 text-white mb-4 ">
      {/* Sidebar */}
      <aside className="hidden pt-5 shadow-md sm:flex w-64 bg-gray-900/70 h-full max-h-[calc(100vh-5rem)] max-w-[280px] min-w-[280px] rounded-md overflow-y-auto">
        <div className="px-6 py-4">
          <h2 className="text-cyan-500 font-semibold mb-4 uppercase">Categories</h2>
          <ul className="space-y-2 text-sm ml-4">
            <Link   href={`/blog/category/all`} >
                <li className={`${pathname.startsWith('/blog/category/all') 
                    ? "text-cyan-500 dark:text-primary-400"
                    : "text-gray-900 dark:text-gray-100" }
                    hover:text-cyan-500 cursor-pointer pb-2 uppercase`}>
                    All Posts
                </li>
            </Link>
            {categories.map((cat) => {
                const isActive = pathname.startsWith(`/blog/category/${cat.category}`);

                return (
                    <Link  key={cat.category} href={`/blog/category/${cat.category}`} >
                        <li className={`${isActive ? "text-cyan-500 dark:text-primary-400"
                            : "text-gray-900 dark:text-gray-100" }
                            hover:text-cyan-500 cursor-pointer pb-2 uppercase`}>
                            {cat.category} ({cat.postsCount})
                        </li>
                    </Link>
                )
                })}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default CategoriesSidebar;
