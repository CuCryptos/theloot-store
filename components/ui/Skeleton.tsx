/**
 * Skeleton primitives — quiet, low-contrast, no shimmer.
 * Use them inside route-level loading.tsx files.
 */
export function SkeletonBlock({
  className = '',
  aspect = 'aspect-[4/5]',
}: {
  className?: string
  aspect?: string
}) {
  return (
    <div
      className={`relative overflow-hidden bg-bone ${aspect} ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 animate-[uy-pulse_2.4s_ease-in-out_infinite] bg-[linear-gradient(135deg,rgba(31,28,24,0.04)_0%,rgba(31,28,24,0)_50%,rgba(31,28,24,0.04)_100%)]" />
    </div>
  )
}

export function SkeletonLine({
  width = 'w-2/3',
  height = 'h-3',
  className = '',
}: {
  width?: string
  height?: string
  className?: string
}) {
  return (
    <div
      className={`bg-ink/10 ${width} ${height} ${className}`}
      aria-hidden
    />
  )
}
