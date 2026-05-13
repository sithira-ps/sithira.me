'use client'

import { useState } from 'react'
import { addBookmark } from './actions'

const categories = ['Development', 'Design', 'YouTube', 'Articles', 'Tools']

export default function AdminBookmarksPage() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await addBookmark(formData)
      setMessage('Bookmark added! It will be live after deployment (~2-3 min).')
      form.reset()
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Something went wrong'}`)
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-header)]">Add Bookmark</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm text-[var(--color-caption)]">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="url" className="mb-1 block text-sm text-[var(--color-caption)]">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm text-[var(--color-caption)]">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm text-[var(--color-caption)]">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="comment" className="mb-1 block text-sm text-[var(--color-caption)]">
            Comment (optional)
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={2}
            className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-body)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        >
          {pending ? 'Saving...' : 'Add Bookmark'}
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
