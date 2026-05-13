'use server'

import { auth } from '@/auth'
import { commitFile } from '@/lib/github'

export async function updateNow(sections: { heading: string; items: { title: string; description?: string }[] }[]) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const data = {
    lastUpdated: new Date().toISOString().split('T')[0],
    sections,
  }

  await commitFile({
    path: 'src/data/now.json',
    content: JSON.stringify(data, null, 2) + '\n',
    message: `Update Now page: ${data.lastUpdated}`,
  })

  return { success: true }
}
