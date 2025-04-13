import { Card, CardContent } from "@/components/ui/card";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 4;

interface BlogProps {
  posts: typeof allPosts;
  pageNumber?: number;
  category: string
}

export default function BlogList({ posts, pageNumber = 1, category = 'all' }: BlogProps) {
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <div className="flex gap-10 max-w-7xl w-full mx-auto sm:mt-10 text-white">
        <section className="flex-1 space-y-2">
            {currentPosts && currentPosts.length > 0 ? (
                currentPosts.map((post, idx) => (
                <Card key={idx} className="bg-transparent border-0 border-b border-[#2a2c31] rounded-none">
                    <CardContent className="p-0 w-full">
                    <Link href={post.url} className="block">
                        <p className="text-xs text-muted-foreground">
                        {format(new Date(post.date), "MMMM do, yyyy")}
                        </p>
                        <h3 className="text-xl font-semibold mt-1">{post.title}</h3>
                        <div className="flex gap-3 mt-1 text-xs font-medium text-cyan-500 flex-wrap uppercase">
                        {post.tags && post.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                        {post.summary}
                        </p>
                        <div className="mt-4">
                        <span className="text-gray-300 hover:text-cyan-500 text-sm font-medium">
                            Read more →
                        </span>
                        </div>
                    </Link>
                    </CardContent>
                </Card>
                ))
            ) : (
                <div className="flex items-center justify-center text-muted-foreground text-sm text-center h-full">
                No posts available.
                </div>
            )}

            { currentPosts.length > 0 &&
                <Pagination totalPages={totalPages} currentPage={pageNumber} basePath={'blog'} category={category} />
            }
        </section>
    </div>
  );
}
