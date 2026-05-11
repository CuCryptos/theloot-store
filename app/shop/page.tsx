import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProducts } from '@/lib/shopify'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Shop — Urban Yogi',
  description: 'The full edit. Yoga, recovery, and mindfulness essentials, made for the city.',
}

export default async function ShopPage() {
  const products = await getAllProducts(50)

  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink pt-32 pb-32">
        <section className="px-6 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">The Edit · Vol. 01</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-4xl font-normal leading-[1.05] tracking-editorial lg:text-6xl">
              Everything we make,<br />
              <em className="italic text-clayDeep">for the practice ahead.</em>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-smoke">
              {products.length === 0
                ? "The first drop is in production. Come back soon."
                : `${products.length} objects, considered. Choose one — or let the practice choose for you.`}
            </p>
          </div>
        </section>

        {products.length > 0 && (
          <Reveal as="section" className="mt-24 px-6 lg:px-12">
            <div className="mx-auto max-w-[1200px]">
              <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p, i) => {
                  const heroImage = p.images.edges[0]?.node
                  const price = p.priceRange.minVariantPrice.amount
                  return (
                    <Link
                      key={p.id}
                      href={`/shop/${p.handle}`}
                      className={`group block ${i % 3 === 1 ? 'lg:mt-16' : i % 3 === 2 ? 'lg:mt-32' : ''}`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                        {heroImage ? (
                          <Image
                            src={heroImage.url}
                            alt={heroImage.altText ?? p.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
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
                        <span className="text-sm text-smoke">${parseFloat(price).toFixed(0)}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Reveal>
        )}
      </main>
      <CartDrawer />
      <Footer />
    </>
  )
}
