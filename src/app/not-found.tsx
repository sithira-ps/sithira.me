import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="page-title text-[--color-accent] mb-4" style={{ fontSize: '4rem' }}>404</h1>
      <p className="text-body mb-8">
        This page doesn&rsquo;t exist. Maybe it was moved, or maybe it never was.
      </p>
      <Link
        href="/"
        className="text-caption hover:text-[--color-accent] transition-colors"
      >
        ← Back to homepage
      </Link>
    </div>
  )
}
