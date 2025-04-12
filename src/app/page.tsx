import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Card className="border-0 border-t border-b bg-transparent rounded-none text-white shadow-none">
        <CardContent className="flex">
          <div className="min-w-50 mx-auto pl-0">
            <p className="text-md text-gray-400 mb-4 text-left">
              August 5, 2023
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Release of Tailwind Nextjs Starter Blog v2.0
            </h2>
            <div className="flex gap-3 mt-1 text-xs font-medium text-cyan-500 flex-wrap">
              NEXT-JS
            </div>
            <p className="text-gray-400 mb-4">
              Release of Tailwind Nextjs Starter Blog template v2.0, refactored
              with Nextjs App directory and React Server Components setup.
              Discover the new features and how to migrate from V1.
            </p>
            <Link
              href="#"
              className="text-gray-300 hover:text-cyan-500 text-sm font-medium"
            >
              Read more →
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-right mt-6">
        <Link
          href="/blog"
          className="text-gray-300 hover:text-cyan-500 text-md font-medium"
        >
          All Posts →
        </Link>
      </div>

      <div className="max-w-96 mx-auto">
        <p className="mb-2 text-sm">Subscribe to the newsletter</p>
        <div className="flex gap-4">
          <Input type="email" placeholder="Enter your email" />
          <Button className="bg-cyan-500 text-white hover:bg-cyan-600">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
