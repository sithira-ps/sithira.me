'use client'

import projectsData from '@/data/projectsData'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export default function ProjectsList() {
  return (
    <div className="space-y-6">
      {projectsData.length > 0 ? (
        projectsData.map((d) => (
          <div
            key={d.title}
            className="group overflow-hidden"
            style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <Image
                src={d.imgSrc}
                alt={d.title}
                width={200}
                height={130}
                className="w-full sm:w-48 h-32 object-cover rounded-md shrink-0"
              />
              <div>
                <h3 className="item-title mb-1">{d.title}</h3>
                <p className="text-caption leading-relaxed mb-3">
                  {d.description}
                </p>
                <Link
                  href={d.href}
                  className="text-caption inline-flex items-center gap-1.5"
                  style={{ color: 'var(--color-accent)' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.href.startsWith('https://github.com') ? 'Source' : 'Demo'}
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-caption flex h-40 items-center justify-center">
          No projects available.
        </div>
      )}
    </div>
  )
}
