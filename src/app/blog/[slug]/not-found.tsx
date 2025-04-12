// src/app/blog/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/blog"
        className="rounded-md text-xs bg-transparent px-4 py-2 text-white hover:text-cyan-500"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}
