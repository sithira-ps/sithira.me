import projectsData from "@/data/projectsData";
import { Card, CardContent } from "@/components/ui/card";
import { genPageMetadata } from "@/app/seo";
import Link from "next/link";
import Image from "next/image";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card key={d.title} className="bg-[#0f1117] border border-[#2a2c31] rounded-lg text-white max-w-md mx-auto p-6">
                <CardContent className="flex flex-col gap-4 items-start">
                  <Image
                    src="/google-logo.png" // Save your Google logo in public/
                    alt="Google Logo"
                    width={120}
                    height={40}
                    className="mb-2"
                  />

                  <h3 className="text-xl font-semibold">A Search Engine</h3>

                  <p className="text-sm text-muted-foreground">
                    What if you could look up any information in the world?
                    Webpages, images, videos and more. Google has many features
                    to help you find exactly what you’re looking for.
                  </p>

                  <Link
                    href="#"
                    className="text-cyan-500 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
