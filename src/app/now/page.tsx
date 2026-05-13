import { genPageMetadata } from '@/app/seo'
import { nowSections, lastUpdated } from '@/data/nowData'

export const metadata = genPageMetadata({
  title: 'Now',
  description:
    'What Sithira Senanayake is currently working on, learning, and focused on right now.',
  canonicalUrl: 'https://sithira.me/now',
})

export default function NowPage() {
  const formatted = new Date(lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div>
      <h1 className="page-title mb-1">Now</h1>
      <p className="mb-12 text-sm text-[var(--color-caption)]">
        What I&rsquo;m focused on right now.
      </p>

      <div className="prose max-w-none space-y-8">
        {nowSections.map((section) => (
          <section key={section.heading}>
            <h3>{section.heading}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item.title}>
                  <span className="text-summary-body"> {item.title}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <span className="flex justify-end text-xs opacity-70">Last updated: {formatted}</span>

      <p className="mt-12 text-xs opacity-50">
        Inspired by{' '}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          nownownow.com
        </a>
      </p>
    </div>
  )
}
