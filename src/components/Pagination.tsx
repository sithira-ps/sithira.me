// /component/Pagination.tsx
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";
import Link from "next/link";

interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath: string
  category: string
}


export default function Pagination({ totalPages, currentPage, basePath, category }: PaginationProps) {
  const createPageLink = (page: number) => {
    return page === 1 ? `/${basePath}/category/${category}` : `/${basePath}/category/${category}/page/${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <Link
            key={i}
            href={createPageLink(i)}
            className={`px-2 py-1 mx-1 rounded ${
              i === currentPage
                ? "bg-cyan-600 text-white"
                : "text-white hover:bg-cyan-800"
            }`}
          >
            {i}
          </Link>
        );
      } else if (
        (i === currentPage - 2 && i > 1) ||
        (i === currentPage + 2 && i < totalPages)
      ) {
        pages.push(
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }

    return pages;
  };

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="pt-6 pb-8 flex justify-between items-center gap-2 text-sm flex-wrap">
      {prevPage ? (
        <Link
          href={createPageLink(prevPage)}
          rel="prev"
          className="text-cyan-500 hover:text-cyan-600"
        >
          ← Prev
        </Link>
      ) : (
        <span className="text-gray-400">← Prev</span>
      )}

<div>
      {renderPageNumbers()}

</div>

      {nextPage ? (
        <Link
          href={createPageLink(nextPage)}
          rel="next"
          className="text-cyan-500 hover:text-cyan-600"
        >
          Next →
        </Link>
      ) : (
        <span className="text-gray-400">Next →</span>
      )}
    </div>
  );
}

