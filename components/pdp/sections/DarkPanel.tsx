/**
 * DarkPanel — full-bleed dark accent section ("Delivers cannabinoids where..."
 * style). Editorial teal background, white type, image right, chips below.
 */
import type { DarkPanelContent } from '@/lib/pdp-types'

type Props = { content: DarkPanelContent }

export function DarkPanel({ content }: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--accent-dark)] text-[var(--bg)]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32">
        <div className="lg:col-span-6">
          {content.kicker ? (
            <span className="block text-[11px] uppercase tracking-[0.24em] text-[var(--accent-signal)]">
              {content.kicker}
            </span>
          ) : null}
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.02] tracking-editorial text-[var(--bg)]">
            {content.headline}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--bg)]/75 sm:text-lg">
            {content.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {content.tag_chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[var(--bg)]/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--bg)]/80"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[var(--accent-dark)] lg:col-span-6 lg:aspect-auto lg:min-h-[420px]">
          {content.image_url ? (
            <img
              src={content.image_url}
              alt={content.headline}
              className="absolute inset-0 h-full w-full object-cover opacity-95"
            />
          ) : null}
          {/* subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--accent-dark)]/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
