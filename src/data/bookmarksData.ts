import bookmarks from './bookmarks.json'

export interface Bookmark {
  title: string
  description: string
  url: string
  category: string
  addedAt: string
  comment?: string
}

export const bookmarkCategories = [
  'All',
  'Development',
  'Design',
  'YouTube',
  'Articles',
  'Tools',
] as const

export type BookmarkCategory = (typeof bookmarkCategories)[number]

const bookmarksData: Bookmark[] = bookmarks

export default bookmarksData
