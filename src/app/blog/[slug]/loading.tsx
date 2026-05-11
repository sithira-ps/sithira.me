export default function PostLoading() {
  return (
    <div className="animate-pulse space-y-6 py-8">
      <div className="h-3 w-28 rounded bg-[var(--color-offset)]" />
      <div className="h-10 w-4/5 rounded bg-[var(--color-offset)]" />
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded bg-[var(--color-offset)]" />
        <div className="h-5 w-20 rounded bg-[var(--color-offset)]" />
      </div>
      <div className="space-y-3 pt-6">
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-3/4 rounded bg-[var(--color-offset)]" />
      </div>
      <div className="space-y-3 pt-4">
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-full rounded bg-[var(--color-offset)]" />
        <div className="h-4 w-2/3 rounded bg-[var(--color-offset)]" />
      </div>
    </div>
  )
}
