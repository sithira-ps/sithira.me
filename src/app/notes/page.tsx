import { allNotes } from 'contentlayer/generated'
import { Metadata } from 'next'
import { format } from 'date-fns'
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

function groupByMonth(notes: typeof allNotes) {
  const sorted = [...notes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const groups: Record<string, typeof allNotes> = {}
  for (const note of sorted) {
    const key = format(new Date(note.date), 'MMMM yyyy')
    if (!groups[key]) groups[key] = []
    groups[key].push(note)
  }

  return Object.entries(groups)
}

export default function NotesPage() {
  const grouped = groupByMonth(allNotes)

  const noteDateTemplate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return (
    <div className="max-w-3xl">
      <h1 className="page-title mb-1">Notes</h1>
      <p className="mb-12 text-sm text-[var(--color-caption)]">
        Quick thoughts, ideas, and messages that come to mind.
      </p>

      {grouped.length === 0 ? (
        <p className="text-caption">No notes yet. Check back soon!</p>
      ) : (
        <div className="space-y-10">
          {grouped.map(([month, notes]) => (
            <section key={month}>
              <h2 className="mb-4 text-sm font-medium tracking-wide text-[var(--color-text)]/50 uppercase">
                {month}
              </h2>
              <div className="space-y-4">
                {notes.map((note) => (
                  <article
                    key={note._id}
                    className="group rounded-smA relative border border-transparent bg-[var(--color-offset)] p-6 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)] opacity-100 transition-opacity" />
                      <div className="min-w-0 flex-1">
                        <time
                          className="text-caption mb-1 block font-medium tracking-wide"
                          dateTime={note.date}
                        >
                          {new Date(note.date).toLocaleDateString(
                            siteMetadata.locale,
                            noteDateTemplate
                          )}
                        </time>
                        <div className="text-body leading-relaxed">{note.body.raw}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
