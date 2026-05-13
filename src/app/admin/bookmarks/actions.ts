'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'

export async function addBookmark(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const bookmark = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    url: formData.get('url') as string,
    category: formData.get('category') as string,
    addedAt: new Date().toISOString().split('T')[0],
    ...(formData.get('comment') ? { comment: formData.get('comment') as string } : {}),
  }

  const token = process.env.GITHUB_PAT
  const resp = await fetch(
    `https://api.github.com/repos/sithira-ps/sithira.me/contents/src/data/bookmarks.json?ref=main`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  let bookmarks = []
  if (resp.ok) {
    const data = await resp.json()
    bookmarks = JSON.parse(Buffer.from(data.content, 'base64').toString())
  }

  bookmarks.unshift(bookmark)

  await commitFile({
    path: 'src/data/bookmarks.json',
    content: JSON.stringify(bookmarks, null, 2),
    message: `Add bookmark: ${bookmark.title}`,
  })

  return { success: true }
}
