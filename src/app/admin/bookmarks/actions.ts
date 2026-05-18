'use server'

import { auth } from '@/auth'
import { commitFile, getFileContent } from '@/lib/github'
import { getISTDateString } from '@/lib/utils'

const MAX_TITLE_LENGTH = 200
const MAX_DESCRIPTION_LENGTH = 1000
const MAX_URL_LENGTH = 2000
const MAX_COMMENT_LENGTH = 500
const ALLOWED_CATEGORIES = ['Development', 'Design', 'YouTube', 'Articles', 'Tools']
const URL_PATTERN = /^https?:\/\/.+/

export async function addBookmark(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const title = formData.get('title')
  const description = formData.get('description')
  const url = formData.get('url')
  const category = formData.get('category')
  const comment = formData.get('comment')

  if (typeof title !== 'string' || !title.trim()) throw new Error('Title is required')
  if (title.length > MAX_TITLE_LENGTH) throw new Error(`Title must be under ${MAX_TITLE_LENGTH} characters`)

  if (typeof description !== 'string' || !description.trim()) throw new Error('Description is required')
  if (description.length > MAX_DESCRIPTION_LENGTH) throw new Error(`Description must be under ${MAX_DESCRIPTION_LENGTH} characters`)

  if (typeof url !== 'string' || !url.trim()) throw new Error('URL is required')
  if (url.length > MAX_URL_LENGTH) throw new Error(`URL must be under ${MAX_URL_LENGTH} characters`)
  if (!URL_PATTERN.test(url)) throw new Error('URL must start with http:// or https://')

  if (typeof category !== 'string' || !ALLOWED_CATEGORIES.includes(category)) {
    throw new Error(`Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`)
  }

  if (typeof comment !== 'string' || !comment.trim()) throw new Error('Comment is required')
  if (comment.length > MAX_COMMENT_LENGTH) throw new Error(`Comment must be under ${MAX_COMMENT_LENGTH} characters`)

  const date = formData.get('date')
  if (typeof date !== 'string' || !date.trim()) throw new Error('Date is required')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Date must be in YYYY-MM-DD format')
  const parsedDate = new Date(date + 'T00:00:00Z')
  if (isNaN(parsedDate.getTime())) throw new Error('Invalid date')
  const today = getISTDateString()
  if (date > today) throw new Error('Date cannot be in the future')

  const bookmark = {
    title: title.trim(),
    description: description.trim(),
    url: url.trim(),
    category,
    addedAt: date,
    comment: (comment as string).trim(),
  }

  const maxRetries = 3

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const file = await getFileContent('src/data/bookmarks.json')

    let bookmarks = []
    let sha: string | undefined
    if (file) {
      sha = file.sha
      bookmarks = JSON.parse(file.content)
    }

    bookmarks.unshift(bookmark)

    try {
      await commitFile({
        path: 'src/data/bookmarks.json',
        content: JSON.stringify(bookmarks, null, 2),
        message: `Add bookmark: ${bookmark.title}`,
        sha,
      })
      return { success: true }
    } catch (err) {
      const isConflict = err instanceof Error && err.message.includes('409')
      if (!isConflict || attempt === maxRetries - 1) throw err
    }
  }

  throw new Error('Failed to add bookmark after retries')
}
