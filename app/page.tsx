import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProducts } from '@/lib/shopify'

export const revalidate = 60

// Editorial cover shots — same unified studio vocabulary across all five
// premium products. Used on the homepage grid; PDPs keep their own native
// per-product photography.
const EDITORIAL_COVERS: Record<string, string> = {
  'the-cordless-light-mask':         '/images/editorial/cover-the-cordless-light-mask.png',
  'the-slow-feeder-lick-mat':        '/images/editorial/cover-the-slow-feeder-lick-mat.png',
  'the-cryo-facial-roller':          '/images/editorial/cover-the-cryo-facial-roller.png',
  'the-one-handed-pepper-mill':      '/images/editorial/cover-the-one-handed-pepper-mill.png',
  'the-invisible-posture-corrector': '/images/editorial/cover-the-invisible-posture-corrector.png',
}

export default async function HomePage() {
  // Defensive: if Shopify Storefront API times out at build/SSR, fall back to
  // empty grid so the page still renders. ISR will repopulate on next request.
  let allProducts: Awaited<ReturnType<typeof getAllProducts>> = []
  try {
    allProducts = await getAllProducts(50)
  } catch (err) {
    console.error('[HomePage] getAllProducts failed, rendering empty edit:', err)
  }

  // Homepage grid = only the premium drops with editorial covers, in
  // EDITORIAL_COVERS order so the layout is deterministic week-to-week.
  const coverOrder = Object.keys(EDITORIAL_COVERS)
  const premiumPicks = coverOrder
    .map((handle) => allProducts.find((p) => p.handle === handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const grid = premiumPicks.slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        {/* HERO — full-bleed editorial still life with overlay copy */}
        <section className="relative min-h-[100dvh] w-full overflow-hidden bg-cream">
          {/* Image */}
          <Image
            src="/images/editorial/hero-edition-01.png"
            alt="Volume 01 — the editor's still life: a matte phototherapy mask, a folded magazine, a ceramic cup of black coffee on linen"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Soft scrim — keeps the image readable but ensures text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/60 lg:bg-gradient-to-r lg:from-cream/70 lg:via-cream/20 lg:to-transparent" />

          {/* Copy overlay */}
          <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1500px] flex-col justify-end px-6 pb-16 pt-32 lg:justify-center lg:px-12 lg:pb-0 lg:pt-0">
            <div className="max-w-[640px]">
              <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-ink/70">
                Volume 01 · theloot
              </p>
              <h1 className="font-display text-5xl font-normal leading-[1.02] tracking-editorial text-ink lg:text-7xl xl:text-8xl">
                The trending products <em className="italic text-clayDeep">worth knowing about.</em>
              </h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
                An editorial edit of the products already moving on TikTok, Amazon, and Reddit — picked, used, and presented the way the best magazines would have.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-clayDeep"
                >
                  See this week&apos;s edit
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/about"
                  className="text-[12px] uppercase tracking-wide text-ink underline-offset-8 hover:underline"
                >
                  How the edit works
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom rail — small editorial caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-ink/10 bg-cream/40 px-12 py-4 backdrop-blur-sm lg:block">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
              <span>Edition 01 · May 2026</span>
              <span>An independent edit · curated weekly</span>
              <span>Free shipping over $75</span>
            </div>
          </div>
        </section>

        {/* EDIT — the rotating-trending-products grid */}
        <Reveal as="section" className="px-6 py-32 lg:px-12 lg:py-48">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-mist">The Edit · This Week</p>
                <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-normal leading-[1.05] tracking-editorial lg:text-6xl">
                  What we&apos;d buy <em className="italic text-clayDeep">this week.</em>
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-[12px] uppercase tracking-wide text-ink underline-offset-8 hover:underline"
              >
                See all picks →
              </Link>
            </div>

            {grid.length === 0 ? (
              <p className="mt-12 text-base text-smoke">
                Products are being prepared. The first drop ships shortly.
              </p>
            ) : (
              <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-y-24">
                {grid.map((p, i) => {
                  const cover = EDITORIAL_COVERS[p.handle] ?? p.images.edges[0]?.node.url
                  const price = parseFloat(p.priceRange.minVariantPrice.amount)
                  return (
                    <Link
                      key={p.id}
                      href={`/shop/${p.handle}`}
                      className={`group block ${i % 2 === 1 ? 'lg:mt-24' : ''}`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={p.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
                            priority={i < 2}
                          />
                        ) : (
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(135deg,#E2DBCB 0 18px,#d8d0bd 18px 36px)',
                            }}
                          />
                        )}
                        <span className="absolute left-5 top-5 rounded-full bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink backdrop-blur-sm">
                          {p.productType || 'Edit'}
                        </span>
                      </div>
                      <div className="mt-6 flex items-baseline justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-mist">
                            No. {String(i + 1).padStart(2, '0')}
                          </p>
                          <h3 className="mt-1 font-display text-2xl tracking-editorial">{p.title}</h3>
                        </div>
                        <span className="whitespace-nowrap text-sm text-smoke">${price.toFixed(0)}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </Reveal>

        {/* HOW IT WORKS — three short rules */}
        <Reveal as="section" className="border-t border-ink/10 bg-paper px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">How the edit works</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-normal leading-[1.1] tracking-editorial lg:text-5xl">
              Three rules, every drop.
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
              <article className="border-t border-ink/15 pt-6">
                <span className="text-[11px] uppercase tracking-wide text-mist">01</span>
                <h3 className="mt-3 font-display text-2xl leading-snug">Trending, then tested.</h3>
                <p className="mt-4 text-base leading-relaxed text-smoke">
                  We start with the same shortlists you&apos;ve seen — TikTok Shop, Amazon Movers, Reddit threads. Then we order one, use it, and only list it if it earns the spot.
                </p>
              </article>
              <article className="border-t border-ink/15 pt-6">
                <span className="text-[11px] uppercase tracking-wide text-mist">02</span>
                <h3 className="mt-3 font-display text-2xl leading-snug">Editorial over urgency.</h3>
                <p className="mt-4 text-base leading-relaxed text-smoke">
                  No countdown timers. No fake reviews. Every product gets its own page — proper photography, a real write-up, and the same price you&apos;d pay anywhere else.
                </p>
              </article>
              <article className="border-t border-ink/15 pt-6">
                <span className="text-[11px] uppercase tracking-wide text-mist">03</span>
                <h3 className="mt-3 font-display text-2xl leading-snug">One drop, every Tuesday.</h3>
                <p className="mt-4 text-base leading-relaxed text-smoke">
                  A short letter Tuesday morning with the week&apos;s pick. That&apos;s the only email you&apos;ll get. We don&apos;t restock everything. We don&apos;t chase trends back.
                </p>
              </article>
            </div>
            <Link
              href="/about"
              className="mt-16 inline-block text-[12px] uppercase tracking-wide text-ink underline-offset-8 hover:underline"
            >
              More on how the edit works →
            </Link>
          </div>
        </Reveal>

        {/* MANIFESTO — single quote */}
        <Reveal as="section" className="border-y border-ink/10 px-6 py-32 lg:px-12 lg:py-48">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="font-display text-3xl italic leading-[1.25] tracking-editorial text-ink lg:text-5xl">
              The internet finds things faster than any store can list them.<br />
              We slow that down, just enough.
            </p>
            <p className="mt-12 text-[11px] uppercase tracking-wide text-mist">
              theloot · editorial
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
