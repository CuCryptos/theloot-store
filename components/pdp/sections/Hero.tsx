/**
 * Hero — full-viewport 2.AG-style PDP hero.
 *
 * Left: brand mark, headline, tagline, tag chips, CTA.
 * Right: full-bleed product image.
 */
import type { HeroContent } from '@/lib/pdp-types'
import type { ShopifyProduct } from '@/lib/shopify-types'

type Props = {
  hero: HeroContent
  product: ShopifyProduct
}

export function Hero({ hero, product }: Props) {
  const price = product.priceRange.minVariantPrice
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-cream">
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-12">
        {/* Left column — text */}
        <div className="relative z-10 flex flex-col justify-between px-6 pt-28 pb-12 sm:px-10 lg:col-span-6 lg:px-16 lg:pt-32 lg:pb-16">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-smoke">
            <span className="font-display text-lg lowercase tracking-tight text-ink">
              {hero.badge ?? 'theloot'}
            </span>
            <span className="h-px w-10 bg-mist" />
            <span>edit no. 001</span>
          </div>

          <div className="mt-12 max-w-xl lg:mt-0">
            <div className="mb-6 flex flex-wrap gap-2">
              {hero.tag_chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-ink/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-smoke"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] tracking-editorial text-ink">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-smoke sm:text-lg">
              {hero.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-clayDeep">
                {hero.cta ?? 'Add to bag'}
                <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
              </button>
              <span className="text-sm text-smoke">
                ${parseFloat(price.amount).toFixed(0)} {price.currencyCode}
              </span>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-mist lg:mt-0">
            <span>Free shipping over $75</span>
            <span>30-day returns</span>
          </div>
        </div>

        {/* Right column — image */}
        <div className="relative lg:col-span-6">
          {hero.image_url ? (
            <img
              src={hero.image_url}
              alt={hero.headline}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-bone" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cream/40 via-transparent to-transparent lg:bg-none" />
        </div>
      </div>
    </section>
  )
}
