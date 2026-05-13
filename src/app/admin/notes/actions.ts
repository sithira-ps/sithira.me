'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'

const MAX_CONTENT_LENGTH = 10000
const MAX_TAG_LENGTH = 50
const MAX_TAGS = 10
const TAG_PATTERN = /^[a-zA-Z0-9\-_ ]+$/

function escapeYamlString(str: string): string {
  return str.replace(/'/g, "''")
}

export async function createNote(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const content = formData.get('content')
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('Content is required')
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    throw new Error(`Content must be under ${MAX_CONTENT_LENGTH} characters`)
  }

  const tagsRaw = formData.get('tags')
  let tags: string[]
  if (typeof tagsRaw === 'string' && tagsRaw.trim()) {
    tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean).slice(0, MAX_TAGS)
    for (const tag of tags) {
      if (tag.length > MAX_TAG_LENGTH) {
        throw new Error(`Each tag must be under ${MAX_TAG_LENGTH} characters`)
      }
      if (!TAG_PATTERN.test(tag)) {
        throw new Error('Tags may only contain letters, numbers, hyphens, underscores, and spaces')
      }
    }
  } else {
    tags = ['note']
  }

  const dateInput = formData.get('date')
  if (typeof dateInput !== 'string' || !dateInput.trim()) throw new Error('Date is required')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) throw new Error('Date must be in YYYY-MM-DD format')
  const parsedDate = new Date(dateInput + 'T00:00:00Z')
  if (isNaN(parsedDate.getTime())) throw new Error('Invalid date')
  const today = new Date().toISOString().split('T')[0]
  if (dateInput > today) throw new Error('Date cannot be in the future')

  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const dateStr = `${dateInput}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const fileSlug = `note-${dateInput}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`

  const escapedTags = tags.map((t) => `'${escapeYamlString(t)}'`).join(', ')
  const sanitizedContent = content.trim().replace(/^---/gm, '\\---')
  const mdx = `---\ndate: ${dateStr}\ntags: [${escapedTags}]\n---\n\n${sanitizedContent}\n`

  await commitFile({
    path: `posts/notes/${fileSlug}.mdx`,
    content: mdx,
    message: `Add note: ${fileSlug}`,
  })

  return { success: true }
}
