import { genPageMetadata } from '@/app/seo'
import ProjectsList from '@/components/ProjectsList'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="space-y-2 pt-6 pb-4 text-center md:space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
          Projects
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          List of my personal projects, freelance projects and saas projects.
        </p>
      </div>
      <ProjectsList />
    </>
  )
}
