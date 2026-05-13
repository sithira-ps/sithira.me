import { signIn } from '@/auth'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/admin')

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-[var(--color-header)]">Admin Login</h1>
        <p className="mb-6 text-sm text-[var(--color-caption)]">Sign in with GitHub to continue</p>
        <form
          action={async () => {
            'use server'
            await signIn('github', { redirectTo: '/admin' })
          }}
        >
          <button
            type="submit"
            className="rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </div>
  )
}
