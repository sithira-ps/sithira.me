import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="font-serif text-6xl font-bold text-[--color-accent] mb-4">404</h1>
      <p className="text-[--color-text-body] mb-8 text-lg">
        This page doesn&rsquo;t exist. Maybe it was moved, or maybe it never was.
      </p>
      <Link
        href="/"
        className="font-sans text-sm text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
      >
        ← Back to homepage
      </Link>
    </div>
  )
}
