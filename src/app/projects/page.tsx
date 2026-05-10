import { genPageMetadata } from '@/app/seo'
import ProjectsList from '@/components/ProjectsList'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-[--color-accent] mb-4">
        Projects
      </h1>
      <p className="text-[--color-text-muted] mb-10">
        List of my personal projects, freelance projects and SaaS projects.
      </p>
      <ProjectsList />
    </div>
  )
}
