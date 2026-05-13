'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'

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
  const today = new Date().toISOString().split('T')[0]
  if (dateInput > today) throw new Error('Date cannot be in the future')

  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const dateStr = `${dateInput}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const fileSlug = `note-${dateInput}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`

  const sanitizedContent = content.trim().replace(/^---/gm, '\\---')
  const mdx = `---\ndate: ${dateStr}\n---\n\n${sanitizedContent}\n`

  await commitFile({
    path: `posts/notes/${fileSlug}.mdx`,
    content: mdx,
    message: `Add note: ${fileSlug}`,
  })

  return { success: true }
}
