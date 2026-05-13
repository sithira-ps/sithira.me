import fs from 'fs/promises'
import path from 'path'
import NowEditor from './NowEditor'

export const dynamic = 'force-dynamic'

export default async function AdminNowPage() {
  const filePath = path.join(process.cwd(), 'src/data/now.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  const nowData = JSON.parse(raw)
  return <NowEditor initialSections={nowData.sections} />
}
