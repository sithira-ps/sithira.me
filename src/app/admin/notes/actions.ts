'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'
import { getISTDateString, getISTTimeComponents } from '@/lib/utils'

const MAX_CONTENT_LENGTH = 10000

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

  const dateInput = formData.get('date')
  if (typeof dateInput !== 'string' || !dateInput.trim()) throw new Error('Date is required')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) throw new Error('Date must be in YYYY-MM-DD format')
  const parsedDate = new Date(dateInput + 'T00:00:00Z')
  if (isNaN(parsedDate.getTime())) throw new Error('Invalid date')
  const today = getISTDateString()
  if (dateInput > today) throw new Error('Date cannot be in the future')

  const { h, m, s } = getISTTimeComponents()
  const dateStr = `${dateInput}T${h}:${m}:${s}`
  const fileSlug = `note-${dateInput}-${h}${m}${s}`

  const sanitizedContent = content.trim().replace(/^---/gm, '\\---')
  const mdx = `---\ndate: ${dateStr}\n---\n\n${sanitizedContent}\n`

  await commitFile({
    path: `posts/notes/${fileSlug}.mdx`,
    content: mdx,
    message: `Add note: ${fileSlug}`,
  })

  return { success: true }
}
