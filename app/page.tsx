import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/shopify'

export const revalidate = 60

export default async function HomePage() {
  const featured = (await getFeaturedProducts()).slice(0, 4)
  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        {/* HERO — typographic for now (no hero image yet).
             Replaced in Session 2 with a 2.AG-style full-bleed product photograph. */}
        <section className="relative min-h-[100dvh] flex flex-col justify-end px-6 pb-16 pt-32 lg:px-12 lg:pb-24 lg:pt-40 bg-cream">
          <div className="mx-auto w-full max-w-[1400px]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mist mb-6">
              Volume 01 · theloot
            </p>
            <h1 className="font-display text-5xl font-normal leading-[1.02] tracking-editorial text-ink lg:text-8xl max-w-[20ch]">
              The trending products <em className="italic text-clayDeep">worth knowing about.</em>
            </h1>
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-ink/15 pt-10 lg:grid-cols-12">
              <p className="text-[11px] uppercase tracking-wide text-mist lg:col-span-2">
                A curated edit
              </p>
              <p className="max-w-md text-base leading-relaxed text-smoke lg:col-span-6">
                We surface a small number of trending products each week —
                the ones already moving on TikTok and Amazon, presented with the care
                they should have had from the start.
              </p>
              <Link
                href="/shop"
                className="text-[12px] uppercase tracking-wide text-ink underline-offset-8 hover:underline lg:col-span-4 lg:justify-self-end lg:self-end"
              >
                See what's trending →
              </Link>
            </div>
          </div>
        </section>

        {/* EDIT — the rotating-trending-products grid */}
        <Reveal as="section" className="px-6 py-32 lg:px-12 lg:py-48">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">The Edit · This Week</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-normal leading-[1.05] tracking-editorial lg:text-6xl">
              Five things we'd buy ourselves.
            </h2>

            {featured.length === 0 ? (
              <p className="mt-12 text-base text-smoke">
                Products are being prepared. The first drop ships soon.
              </p>
            ) : (
              <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-2">
                {featured.map((p, i) => {
                  const heroImage = p.images.edges[0]?.node
                  const price = parseFloat(p.priceRange.minVariantPrice.amount)
                  return (
                    <Link
                      key={p.id}
                      href={`/shop/${p.handle}`}
                      className={`group block ${i % 2 === 1 ? 'lg:mt-32' : ''}`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                        {heroImage ? (
                          <Image
                            src={heroImage.url}
                            alt={heroImage.altText ?? p.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
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
                      </div>
                      <div className="mt-6 flex items-baseline justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-mist">
                            {p.productType || 'Object'}
                          </p>
                          <h3 className="mt-1 font-display text-2xl tracking-editorial">{p.title}</h3>
                        </div>
                        <span className="text-sm text-smoke">${price.toFixed(0)}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
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
              The studio
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
