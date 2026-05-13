import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/api/auth/signin')

  return (
    <div className="admin-panel overflow-x-hidden">
      <AdminNav user={session.user} />
      <main className="py-8">{children}</main>
    </div>
  )
}
