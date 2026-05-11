/**
 * FAQ — left heading column, right details/summary list.
 */
import type { FaqContent } from '@/lib/pdp-types'

type Props = { content: FaqContent }

export function FAQ({ content }: Props) {
  return (
    <section className="bg-[var(--bg)]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-32">
        <div className="lg:col-span-5">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent-label)]">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-editorial text-[var(--text)]">
            {content.heading}
          </h2>
          {content.sub ? (
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--secondary)]">
              {content.sub}
            </p>
          ) : null}
        </div>
        <div className="lg:col-span-7">
          <div className="divide-y divide-[var(--text)]/10 border-y border-[var(--text)]/10">
            {content.items.map((item) => (
              <details
                key={item.question}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-[var(--text)] sm:text-lg">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="text-2xl text-[var(--accent-label)] transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--secondary)] sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
