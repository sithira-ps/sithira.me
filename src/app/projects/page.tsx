import { genPageMetadata } from '@/app/seo'
import ProjectsList from '@/components/ProjectsList'
import projectsData from '@/data/projectsData'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Personal projects, freelance work, and SaaS products by Sithira Senanayake — including AI chat apps, blogs, document management systems, and mobile POS.',
  canonicalUrl: 'https://sithira.me/projects',
})

export default function Projects() {
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects by Sithira Senanayake',
    description:
      'A collection of personal, freelance, and SaaS projects built by Sithira Senanayake.',
    url: 'https://sithira.me/projects',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projectsData.length,
      itemListElement: projectsData.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.description,
          url: project.href,
          applicationCategory: project.category === 'MOBILE' ? 'MobileApplication' : 'WebApplication',
          author: { '@id': 'https://sithira.me/#person' },
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sithira.me' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://sithira.me/projects' },
      ],
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <h1 className="page-title mb-2">Projects</h1>
      <p className="text-summary-body mb-10">
        List of my personal projects, freelance projects and SaaS projects.
      </p>
      <ProjectsList />
    </div>
  )
}
