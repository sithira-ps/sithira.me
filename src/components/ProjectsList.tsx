"use client";

import { useState } from "react";
import projectsData from "@/data/projectsData";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const categories = ["All", "Web", "Mobile", "AI"];

export default function ProjectsList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <div className="">
        <div className="flex justify-center gap-3 pt-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                  ${
                    selectedCategory === category
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {category}
              </button>
            ))}
        </div>

        <div className="container py-12 border-t-1 mt-6">
          <div className="-m-4 flex flex-wrap justify-center gap-6">
            {filteredProjects.map((d) => (
              <Card
                key={d.title}
                className="bg-[#0f1117] border border-[#2a2c31] rounded-lg text-white max-w-md mx-auto p-6"
              >
                <CardContent className="flex flex-col gap-4 items-start">
                  <Image
                    src={d.imgSrc}
                    alt={d.title}
                    width={120}
                    height={40}
                    className="mb-2"
                  />

                  <h3 className="text-xl font-semibold">{d.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {d.description}
                  </p>

                  <Link
                    href={d.href}
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


  );
}
