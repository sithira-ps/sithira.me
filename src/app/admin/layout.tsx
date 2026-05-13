import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/api/auth/signin')

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-[var(--color-body-background)]">
      <AdminNav user={session.user} />
      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  )
}
