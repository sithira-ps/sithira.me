'use client'

// app/blog/page.tsx or components/BlogPage.tsx
import { Card, CardContent } from "@/components/ui/card";
import siteMetadata from "@/data/siteMetadata";
import { allPosts, Post } from "contentlayer/generated";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CoreContent } from "pliny/utils/contentlayer.js";

const POSTS_PER_PAGE = 5


interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Post>[]
  title: string
  initialDisplayPosts?: CoreContent<Post>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

const categories = [
  { name: "NEXT-JS", count: 6 },
  { name: "GUIDE", count: 5 },
  { name: "TAILWIND", count: 3 },
  { name: "FEATURE", count: 2 },
  { name: "MARKDOWN", count: 1 },
  { name: "CODE", count: 1 },
  { name: "FEATURES", count: 1 },
  { name: "MATH", count: 1 },
  { name: "OLS", count: 1 },
  { name: "GITHUB", count: 1 },
  { name: "HELLO", count: 1 },
  { name: "HOLIDAY", count: 1 },
  { name: "CANADA", count: 1 },
  { name: "IMAGES", count: 1 },
  { name: "WRITINGS", count: 1 },
  { name: "BOOK", count: 1 },
  { name: "REFLECTION", count: 1 },
  { name: "MULTI-AUTHOR", count: 1 },
];

const posts = allPosts;
const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }
const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function Blog() {
  const POSTS_PER_PAGE = 6;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);



  return (
    <div className="flex gap-10 max-w-7xl mx-auto sm:mt-10 text-white">
      {/* Sidebar */}
      <aside className="hidden pt-5 shadow-md sm:flex w-64 bg-gray-900/70 h-full max-h-screen max-w-[280px] min-w-[280px] rounded-md">
        <div className="px-6 py-4">
          <h2 className="text-cyan-500 font-semibold mb-4">ALL POSTS</h2>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="hover:text-cyan-500 cursor-pointer pb-1 pl-4"
              >
                {cat.name} ({cat.count})
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Blog posts */}
      <section className="flex-1 space-y-8">
        {allPosts.map((post, idx) => (
          <Card
            key={idx}
            className="bg-transparent border-0 border-b border-[#2a2c31] rounded-none pb-6"
          >
            <CardContent className="p-0">
              <p className="text-xs text-muted-foreground">
                                      {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}

              </p>
              <h3 className="text-xl font-semibold mt-1">{post.title}</h3>
              <div className="flex gap-3 mt-1 text-xs font-medium text-cyan-500 flex-wrap">
                {/* {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))} */}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {post.summary}
              </p>
              <div className="mt-4">
                <Link
                  href={post.url}
                  className="text-gray-300 hover:text-cyan-500 text-sm font-medium"
                >
                  Read more →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </section>
    </div>
  );
}
