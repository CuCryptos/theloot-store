/**
 * FeatureSplit — 50/50 image + text block with optional accordion.
 *
 * `side` controls which column the image renders in.
 */
import type { FeatureSplitContent } from '@/lib/pdp-types'

type Props = { content: FeatureSplitContent }

export function FeatureSplit({ content }: Props) {
  const imageFirst = content.side === 'left'
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-stretch lg:grid-cols-2">
        {/* Image */}
        <div
          className={`relative aspect-[4/5] w-full overflow-hidden bg-bone lg:aspect-auto lg:min-h-[80vh] ${
            imageFirst ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {content.image_url ? (
            <img
              src={content.image_url}
              alt={content.headline}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
        </div>

        {/* Text */}
        <div
          className={`flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-20 lg:py-24 ${
            imageFirst ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="max-w-xl">
            {content.kicker ? (
              <span className="block text-[11px] uppercase tracking-[0.24em] text-clay">
                {content.kicker}
              </span>
            ) : null}
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-editorial text-ink">
              {content.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-smoke sm:text-lg">
              {content.body}
            </p>

            {content.accordion?.length ? (
              <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {content.accordion.map((row) => (
                  <details
                    key={row.q}
                    className="group py-4 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink">
                      <span>{row.q}</span>
                      <span
                        aria-hidden
                        className="text-clay transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-smoke">
                      {row.a}
                    </p>
                  </details>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
