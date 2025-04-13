import Subscribe from "@/components/Subscribe";
import { Card, CardContent } from "@/components/ui/card";
import siteMetadata from "@/data/siteMetadata";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function Home() {

  const postDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentPosts = sortedPosts.slice(0, 5);
    
  return (
    <div>
    {recentPosts.length > 0 ? (
 recentPosts.map((post) => (
        <Link key={post._id} href={post.url}>
          <Card className="mt-8 border-0 border-b bg-transparent rounded-none text-white shadow-none">
            <CardContent className="md:flex">
                    <div className="min-w-50 mx-auto pl-0">
                      <p className="text-md text-gray-400 mb-4 text-left">
                                          {new Date(post.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {post.title}
                      </h2>
                      <div className="flex gap-3 mt-1 text-xs font-medium text-cyan-500 flex-wrap uppercase">
                        {post.tags && post.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}                      
                      </div>
                      <p className="text-gray-400 my-4">
                        Release of Tailwind Nextjs Starter Blog template v2.0, refactored
                        with Nextjs App directory and React Server Components setup.
                        Discover the new features and how to migrate from V1.
                      </p>
                      <p
                        className="text-gray-300 hover:text-cyan-500 text-sm font-medium"
                      >
                        Read more →
                      </p>
                    </div>
            </CardContent>
          </Card>         
        </Link>
      ))) 
      : (
                <div className="flex items-center justify-center text-muted-foreground text-sm text-center h-full min-h-60">
                No posts available.
                </div>
            )}
      <div className="text-right mt-6">
        {recentPosts.length > 0 ? (
        <Link
          href="/blog"
          className="text-gray-300 hover:text-cyan-500 text-md font-medium"
        >
          All Posts →
        </Link>
): <div></div>}
      </div>

      <Subscribe/>
    </div>
  );
}
