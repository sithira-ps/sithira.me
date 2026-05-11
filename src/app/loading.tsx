export default function Loading() {
  return (
    <div className="animate-pulse space-y-6 py-8">
      <div className="h-8 w-3/4 rounded bg-[var(--color-offset)]" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-4/6 rounded bg-[var(--color-offset)]" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-3/4 rounded bg-[var(--color-offset)]" />
      </div>
    </div>
  )
}
