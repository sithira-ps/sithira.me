'use client'

import { useState } from 'react'
import { createNote } from './actions'

export default function AdminNotesPage() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await createNote(formData)
      setMessage('Note created! It will be live after deployment (~2-3 min).')
      form.reset()
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Something went wrong'}`)
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-header)]">Create Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="mb-1 block text-sm text-[var(--color-caption)]">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none"
            placeholder="What's on your mind?"
          />
        </div>

        <div>
          <label htmlFor="tags" className="mb-1 block text-sm text-[var(--color-caption)]">
            Tags (comma-separated, defaults to &quot;note&quot;)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none"
            placeholder="note, thought"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        >
          {pending ? 'Publishing...' : 'Publish Note'}
        </button>

        {message && (
          <p className={`text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
