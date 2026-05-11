export default function BlogLoading() {
  return (
    <div className="animate-pulse space-y-8 py-8">
      <div className="h-10 w-1/3 rounded bg-[var(--color-offset)]" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2 border-b border-[var(--color-border)] pb-6">
          <div className="h-3 w-24 rounded bg-[var(--color-offset)]" />
          <div className="h-6 w-3/4 rounded bg-[var(--color-offset)]" />
          <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
          <div className="h-4 w-2/3 rounded bg-[var(--color-offset)]" />
        </div>
      ))}
    </div>
  )
}
