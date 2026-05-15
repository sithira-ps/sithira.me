import bookmarks from './bookmarks.json'

export interface Bookmark {
  title: string
  description: string
  url: string
  category: string
  addedAt: string
  comment: string
}

export const bookmarkCategories = [
  'Article',
  'Research Paper',
  'YouTube',
  'Project',
  'Tool',
  'Social Media Post',
  'Other',
] as const

export type BookmarkCategory = (typeof bookmarkCategories)[number]

const bookmarksData: Bookmark[] = bookmarks

export default bookmarksData
