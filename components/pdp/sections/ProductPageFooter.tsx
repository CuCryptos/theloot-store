/**
 * ProductPageFooter — brand sign-off block at the end of the PDP. Not the
 * site-level Footer; this is the editorial outro for the product page.
 */
import type { FooterContent } from '@/lib/pdp-types'

type Props = { content: FooterContent }

export function ProductPageFooter({ content }: Props) {
  return (
    <section className="bg-accent text-cream">
      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <span className="font-display text-4xl lowercase tracking-editorial text-cream sm:text-5xl">
              {content.brand_mark}
            </span>
            <p className="mt-6 max-w-md font-display text-2xl leading-snug tracking-editorial text-cream/85 sm:text-3xl">
              {content.tagline}
            </p>
          </div>
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.24em] text-signal">
              The drop
            </span>
            <p className="mt-3 max-w-md text-base leading-relaxed text-cream/80">
              {content.newsletter_label}
            </p>
            <form
              className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              action="/api/newsletter"
              method="POST"
            >
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 rounded-full border border-cream/30 bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/50 focus:border-signal focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-accent transition hover:bg-signal hover:text-accent"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
