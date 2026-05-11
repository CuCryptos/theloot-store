/**
 * TestimonialGrid — 4 quote cards + 1 placeholder "video" card.
 */
import type { Testimonial } from '@/lib/pdp-types'

type Props = {
  title?: string
  items: Testimonial[]
}

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <span className="inline-flex text-clay" aria-label={`${r} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < r ? '' : 'opacity-25'}>
          ★
        </span>
      ))}
    </span>
  )
}

export function TestimonialGrid({ title, items }: Props) {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-editorial text-ink">
            {title ?? 'Loved by people who notice the details.'}
          </h2>
          <span className="text-[11px] uppercase tracking-[0.22em] text-smoke">
            Verified buyers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 4).map((t, i) => (
            <article
              key={`${t.author}-${i}`}
              className="flex flex-col justify-between rounded-sm bg-cream p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-9"
            >
              <div>
                <Stars rating={t.rating} />
                <p className="mt-5 font-display text-lg leading-snug tracking-editorial text-ink sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.18em]">
                <span className="text-smoke">{t.author}</span>
                {t.verified ? (
                  <span className="text-clay">Verified</span>
                ) : null}
              </div>
            </article>
          ))}
          {/* Placeholder video card */}
          <article className="relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-sm bg-accent p-7 text-cream sm:p-9 lg:col-span-1 lg:row-span-2">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent via-accentLight to-accent opacity-90" />
            <div className="relative z-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 text-cream">
                ▶
              </span>
              <p className="mt-6 font-display text-xl leading-snug tracking-editorial">
                Watch how it shipped.
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-signal">
                30-sec unboxing
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
