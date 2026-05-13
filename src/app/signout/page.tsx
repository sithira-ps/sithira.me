import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import SubmitButton from '@/components/admin/SubmitButton'

export default async function SignOutPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-md border border-[var(--color-border)] px-20 py-10 text-center">
        <h1 className="mb-2 text-xl font-bold text-[var(--color-header)]">Sign Out</h1>
        <p className="mb-6 text-sm text-[var(--color-caption)]">Are you sure you want to sign out?</p>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/login' })
          }}
        >
          <SubmitButton className="mx-auto">Sign out</SubmitButton>
        </form>
      </div>
    </div>
  )
}
