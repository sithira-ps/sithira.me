import { allNotes } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Quick thoughts and short messages from Sithira Senanayake.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/notes`,
  },
  openGraph: {
    title: `Notes | ${siteMetadata.title}`,
    description: 'Quick thoughts and short messages.',
    url: `${siteMetadata.siteUrl}/notes`,
    type: 'website',
  },
}

export default function NotesPage() {
  const sortedNotes = allNotes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const noteDateTemplate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="page-title mb-3">Notes</h1>
        <p className="text-summary-body text-lg">
          Quick thoughts, ideas, and messages that come to mind.
        </p>
      </div>

      <div className="space-y-4">
        {sortedNotes.length === 0 ? (
          <p className="text-caption">No notes yet. Check back soon!</p>
        ) : (
          sortedNotes.map((note) => (
            <article
              key={note._id}
              className="group relative bg-[var(--color-offset)] rounded-smA p-6 transition-all duration-200  border border-transparent"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 opacity-100 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <time
                    className="text-caption block mb-1 font-medium tracking-wide"
                    dateTime={note.date}
                  >
                    {new Date(note.date).toLocaleDateString(siteMetadata.locale, noteDateTemplate)}
                  </time>
                  <div className="text-body leading-relaxed">
                    {note.body.raw}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
