'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'

export async function createNote(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const content = formData.get('content') as string
  const tagsRaw = formData.get('tags') as string
  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : ['note']

  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const fileSlug = `note-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`

  const mdx = `---\ndate: ${dateStr}\ntags: [${tags.map((t) => `'${t}'`).join(', ')}]\n---\n\n${content}\n`

  await commitFile({
    path: `posts/notes/${fileSlug}.mdx`,
    content: mdx,
    message: `Add note: ${fileSlug}`,
  })

  return { success: true }
}
