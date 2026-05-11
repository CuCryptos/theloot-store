/**
 * FullBleedImage — full-width dramatic photograph with overlay headline.
 */
import type { FullBleedContent } from '@/lib/pdp-types'

type Props = { content: FullBleedContent }

export function FullBleedImage({ content }: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--text)]">
      <div className="relative min-h-[70vh] w-full sm:min-h-[80vh]">
        {content.image_url ? (
          <img
            src={content.image_url}
            alt={content.overlay_headline}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/80 via-[var(--text)]/30 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-end px-6 py-16 sm:min-h-[80vh] sm:px-10 lg:px-16 lg:py-24">
          {content.badge ? (
            <span className="mb-6 inline-flex w-fit rounded-full border border-[var(--bg)]/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--bg)]">
              {content.badge}
            </span>
          ) : null}
          <h2 className="max-w-3xl font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.98] tracking-editorial text-[var(--bg)]">
            {content.overlay_headline}
          </h2>
        </div>
      </div>
    </section>
  )
}
