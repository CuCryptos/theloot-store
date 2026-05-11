/**
 * StatsCallout — 3-column percent stats on dark teal panels.
 */
import type { StatCallout } from '@/lib/pdp-types'

type Props = {
  title?: string
  items: StatCallout[]
}

export function StatsCallout({ title, items }: Props) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        {title ? (
          <h2 className="mb-12 max-w-2xl font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.02] tracking-editorial text-ink">
            {title}
          </h2>
        ) : null}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((stat, i) => (
            <div
              key={`${stat.percent}-${i}`}
              className="flex flex-col justify-between rounded-sm bg-accent p-8 text-cream sm:p-10 lg:min-h-[280px]"
            >
              <span className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-editorial text-signal">
                {stat.percent}
              </span>
              <p className="mt-8 text-sm leading-relaxed text-cream/80 sm:text-base">
                {stat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
