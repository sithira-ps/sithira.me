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
                <h3
                  className="font-sans text-base font-semibold mb-1"
                  style={{ color: 'var(--color-header)' }}
                >
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-caption)' }}>
                  {d.description}
                </p>
                <Link
                  href={d.href}
                  className="inline-flex items-center gap-1.5 text-sm"
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
        <div className="flex h-40 items-center justify-center text-sm" style={{ color: 'var(--color-caption)' }}>
          No projects available.
        </div>
      )}
    </div>
  )
}
