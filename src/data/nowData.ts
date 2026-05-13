import data from './now.json'

export interface NowItem {
  title: string
  description?: string
}

export interface NowSection {
  heading: string
  items: NowItem[]
}

export const lastUpdated: string = data.lastUpdated

export const nowSections: NowSection[] = data.sections
