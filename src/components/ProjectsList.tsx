'use client'

import { useState } from 'react'
import projectsData from '@/data/projectsData'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

const categories = ['All', 'Web', 'Mobile', 'Desktop', 'Other']

export default function ProjectsList() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="">
      <div className="flex flex-wrap justify-center gap-3 pt-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'border-cyan-600 bg-cyan-600 text-white'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="container mt-6 border-t-1 py-12 px-4 md:px-0">
        <div className="-m-4 flex flex-wrap justify-center gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((d) => (
              <Card
                key={d.title}
                className="mx-auto max-w-md rounded-lg border border-[#2a2c31] bg-[#0f1117] text-white"
              >
                <CardContent className="flex flex-col items-start gap-4">
                  <Image src={d.imgSrc} alt={d.title} width={1080} height={720} className="mb-2 w-full rounded-md object-cover" />

                  <h3 className="text-xl font-semibold">{d.title}</h3>

                  <p className="text-muted-foreground text-sm">{d.description}</p>

                  <Link
                    href={d.href}
                    className="flex items-center gap-1 text-sm font-medium text-cyan-500 hover:underline"
                  >
                    Link →
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-muted-foreground flex h-full min-h-60 items-center justify-center text-center text-sm">
              No projects available.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
