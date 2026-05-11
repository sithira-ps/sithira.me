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
    <div>
      <h1 className="page-title mb-2">Notes</h1>
      <p className="text-summary-body mb-8">
        Quick thoughts, ideas, and messages that come to mind.
      </p>

      <div className="space-y-6">
        {sortedNotes.length === 0 ? (
          <p className="text-caption">No notes yet. Check back soon!</p>
        ) : (
          sortedNotes.map((note) => (
            <article
              key={note._id}
              className="rounded-lg border border-[var(--color-border)] p-4"
            >
              <time className="text-caption mb-2 block text-sm" dateTime={note.date}>
                {new Date(note.date).toLocaleDateString(siteMetadata.locale, noteDateTemplate)}
              </time>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                {note.body.raw}
              </div>
              {note.tags && note.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  )
}
