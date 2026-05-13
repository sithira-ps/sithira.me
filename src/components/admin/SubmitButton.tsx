'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export default function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative flex cursor-pointer items-center justify-center rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${className || ''}`}
    >
      <span className={pending ? 'invisible' : ''}>{children}</span>
      {pending && <Loader2 className="absolute h-4 w-4 animate-spin" />}
    </button>
  )
}
