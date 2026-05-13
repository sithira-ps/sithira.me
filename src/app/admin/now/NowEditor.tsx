'use client'

import { useState } from 'react'
import { updateNow } from './actions'
import { X } from 'lucide-react'

interface NowItem {
  id: string
  title: string
  description?: string
}

interface NowSection {
  id: string
  heading: string
  items: NowItem[]
}

function withId<T>(obj: T): T & { id: string } {
  return { ...obj, id: crypto.randomUUID() }
}

export default function NowEditor({ initialSections }: { initialSections: { heading: string; items: { title: string; description?: string }[] }[] }) {
  const [sections, setSections] = useState<NowSection[]>(() =>
    initialSections.map((s) => withId({ heading: s.heading, items: s.items.map((item) => withId(item)) }))
  )
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')

  function updateSection(index: number, heading: string) {
    const updated = [...sections]
    updated[index] = { ...updated[index], heading }
    setSections(updated)
  }

  function updateItem(sectionIndex: number, itemIndex: number, field: 'title' | 'description', value: string) {
    const updated = [...sections]
    const items = [...updated[sectionIndex].items]
    items[itemIndex] = { ...items[itemIndex], [field]: value || undefined }
    updated[sectionIndex] = { ...updated[sectionIndex], items }
    setSections(updated)
  }

  function addItem(sectionIndex: number) {
    const updated = [...sections]
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: [...updated[sectionIndex].items, withId({ title: '' })],
    }
    setSections(updated)
  }

  function removeItem(sectionIndex: number, itemIndex: number) {
    const updated = [...sections]
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: updated[sectionIndex].items.filter((_, i) => i !== itemIndex),
    }
    setSections(updated)
  }

  function addSection() {
    setSections([...sections, withId({ heading: '', items: [withId({ title: '' })] })])
  }

  function removeSection(index: number) {
    setSections(sections.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setMessage('')

    const cleaned = sections
      .filter((s) => s.heading.trim())
      .map((s) => ({
        heading: s.heading.trim(),
        items: s.items.filter((item) => item.title.trim()).map((item) => ({
          title: item.title.trim(),
          ...(item.description?.trim() ? { description: item.description.trim() } : {}),
        })),
      }))
      .filter((s) => s.items.length > 0)

    try {
      await updateNow(cleaned)
      setMessage('Now page updated! It will be live after deployment (~2-3 min).')
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Something went wrong'}`)
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-header)]">Edit Now Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section, si) => (
          <div key={section.id} className="rounded-lg border border-[var(--color-border)] p-4">
            <div className="mb-2 flex items-center gap-2">
              <input
                type="text"
                value={section.heading}
                onChange={(e) => updateSection(si, e.target.value)}
                placeholder="Section heading"
                className="flex-1 rounded-md border border-[var(--color-border)] bg-transparent px-3 py-1.5 text-sm font-semibold text-[var(--color-header)] placeholder:text-[var(--color-caption)] focus:border-[var(--color-accent)] focus:ring-0 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeSection(si)}
                className="text-xs text-[var(--color-caption)] hover:text-[var(--color-accent)]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2">
              {section.items.map((item, ii) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(si, ii, 'title', e.target.value)}
                    placeholder="Item"
                    className="min-w-0 flex-1 rounded-md border border-[var(--color-border)] bg-transparent px-3 py-1.5 text-sm text-[var(--color-body)] placeholder:text-[var(--color-caption)] focus:border-[var(--color-accent)] focus:ring-0 focus:outline-none"
                  />
                  {/* <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => updateItem(si, ii, 'description', e.target.value)}
                    placeholder="Description (optional)"
                    className="min-w-0 flex-1 rounded-md border border-[var(--color-border)] bg-transparent px-3 py-1.5 text-sm text-[var(--color-body)] placeholder:text-[var(--color-caption)] focus:border-[var(--color-accent)] focus:ring-0 focus:outline-none"
                  /> */}
                  <button
                    type="button"
                    onClick={() => removeItem(si, ii)}
                    className="text-xs text-[var(--color-caption)] hover:text-[var(--color-accent)]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addItem(si)}
                className="mt-4 text-xs text-[var(--color-accent)]"
              >
                + Add item
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addSection} className="text-sm text-[var(--color-accent)]">
          + Add section
        </button>

        <div>
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
          >
            {pending ? 'Saving...' : 'Update Now Page'}
          </button>
        </div>

        {message && (
          <p
            className={`text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
