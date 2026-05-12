export interface NowItem {
  title: string
  description?: string
}

export interface NowSection {
  heading: string
  items: NowItem[]
}

export const lastUpdated = '2026-05-12'

export const nowSections: NowSection[] = [
  {
    heading: 'Working on',
    items: [{ title: 'Building and improving this personal blog' }, { title: 'MSc assignments' }],
  },
  {
    heading: 'Learning',
    items: [{ title: 'Data Engineering concepts on DataCamp' }, { title: 'Linux basics' }],
  },
  {
    heading: 'Reading',
    items: [{ title: 'Thinking about reading... 🫠' }],
  },
  {
    heading: 'Listning / Watching',
    items: [{ title: 'Levelup sessions done by Malinda' }],
  },
]
