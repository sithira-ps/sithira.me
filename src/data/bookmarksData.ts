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

const bookmarksData: Bookmark[] = [
  {
    title: `Yann LeCun's $1B Bet Against LLMs`,
    description: 'An alternative vision for AI proposed by Turing Award winner Yann LeCun.',
    url: 'https://youtu.be/kYkIdXwW2AE?si=ko1TmqUeOpor_u8G',
    category: 'YouTube',
    addedAt: '2026-05-10',
  },
  {
    title: 'Signs of introspection in large language models',
    description:
      'Anthropic’s research on "introspection" suggests that Large Language Models (specifically Claude Opus 4 and 4.1) can, to a limited degree, monitor and control their own internal neural states.',
    url: 'https://www.anthropic.com/research/introspection',
    category: 'Article',
    addedAt: '2026-05-04',
  },
  {
    title: 'The Hardest Problem AI Ever Solved, with Google DeepMind CEO',
    description: 'Cleo Abram interviewing Demis Hassabis to find the future he wants to build',
    url: 'https://youtu.be/C0gErQtnNFE?si=d09VJDCu9bdlSdS2',
    category: 'YouTube',
    addedAt: '2026-05-01',
    comment: `I don't get tired on watching this man speaks. And Cleo makes it even more interesting. Love this interview.`,
  },
]

export default bookmarksData
