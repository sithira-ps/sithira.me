import { signIn, auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Github } from '@/components/social-icons/icons'
import SubmitButton from '@/components/admin/SubmitButton'

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/admin')

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-md border border-[var(--color-border)] px-24 py-10 text-center">
        <h1 className="mb-2 text-xl font-bold text-[var(--color-header)]">Admin Login</h1>
        <p className="mb-6 text-sm text-[var(--color-caption)]">Sign in with GitHub to continue</p>
        <form
          action={async () => {
            'use server'
            await signIn('github', { redirectTo: '/admin' })
          }}
        >
          <SubmitButton>
            <span className="flex items-center gap-2">
              <Github className="h-4 w-4 fill-current" />
              Sign in with GitHub
            </span>
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
