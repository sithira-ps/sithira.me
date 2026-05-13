import { getFileContent } from '@/lib/github'
import NowEditor from './NowEditor'

export const dynamic = 'force-dynamic'

export default async function AdminNowPage() {
  const file = await getFileContent('src/data/now.json')
  if (!file) {
    return <NowEditor initialSections={[{ heading: 'Working on', items: [{ title: '' }] }]} />
  }
  const nowData = JSON.parse(file.content)
  return <NowEditor initialSections={nowData.sections} />
}
