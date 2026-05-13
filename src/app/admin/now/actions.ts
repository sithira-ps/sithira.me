'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'

const MAX_SECTIONS = 20
const MAX_ITEMS_PER_SECTION = 30
const MAX_HEADING_LENGTH = 200
const MAX_TITLE_LENGTH = 300
const MAX_DESCRIPTION_LENGTH = 1000

export async function updateNow(sections: { heading: string; items: { title: string; description?: string }[] }[]) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('At least one section is required')
  }
  if (sections.length > MAX_SECTIONS) {
    throw new Error(`Maximum ${MAX_SECTIONS} sections allowed`)
  }

  for (const section of sections) {
    if (typeof section.heading !== 'string' || !section.heading.trim()) {
      throw new Error('Each section must have a heading')
    }
    if (section.heading.length > MAX_HEADING_LENGTH) {
      throw new Error(`Section headings must be under ${MAX_HEADING_LENGTH} characters`)
    }
    if (!Array.isArray(section.items) || section.items.length === 0) {
      throw new Error('Each section must have at least one item')
    }
    if (section.items.length > MAX_ITEMS_PER_SECTION) {
      throw new Error(`Maximum ${MAX_ITEMS_PER_SECTION} items per section`)
    }
    for (const item of section.items) {
      if (typeof item.title !== 'string' || !item.title.trim()) {
        throw new Error('Each item must have a title')
      }
      if (item.title.length > MAX_TITLE_LENGTH) {
        throw new Error(`Item titles must be under ${MAX_TITLE_LENGTH} characters`)
      }
      if (item.description != null && typeof item.description !== 'string') {
        throw new Error('Item description must be a string')
      }
      if (typeof item.description === 'string' && item.description.length > MAX_DESCRIPTION_LENGTH) {
        throw new Error(`Item descriptions must be under ${MAX_DESCRIPTION_LENGTH} characters`)
      }
    }
  }

  const data = {
    lastUpdated: new Date().toISOString().split('T')[0],
    sections,
  }

  const maxRetries = 3
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await commitFile({
        path: 'src/data/now.json',
        content: JSON.stringify(data, null, 2) + '\n',
        message: `Update Now page: ${data.lastUpdated}`,
      })
      return { success: true }
    } catch (err) {
      const isConflict = err instanceof Error && err.message.includes('409')
      if (!isConflict || attempt === maxRetries - 1) throw err
    }
  }

  throw new Error('Failed to update Now page after retries')
}
