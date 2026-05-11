import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'
import { PdpBuyBox } from '@/components/pdp/PdpBuyBox'
import { PdpGallery } from '@/components/pdp/PdpGallery'
import { PdpRitual } from '@/components/pdp/PdpRitual'
import { PdpMaterials } from '@/components/pdp/PdpMaterials'
import { PdpComparison } from '@/components/pdp/PdpComparison'
import { getProductByHandle } from '@/lib/shopify'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PdpPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getProductByHandle(slug)
  if (!data) notFound()
  const { product, meta } = data

  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink pt-24">
        {/* Hero: gallery + sticky buy box */}
        <section className="relative grid grid-cols-1 gap-0 lg:grid-cols-12">
          <PdpGallery
            images={product.images.edges.map((e) => e.node)}
            title={product.title}
          />
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100dvh-6rem)] overflow-y-auto">
            <PdpBuyBox product={product} review={meta.reviewSummary} />
          </div>
        </section>

        {meta.ritualSteps?.length ? (
          <Reveal>
            <PdpRitual steps={meta.ritualSteps} />
          </Reveal>
        ) : null}

        {meta.materials?.length ? (
          <Reveal>
            <PdpMaterials materials={meta.materials} />
          </Reveal>
        ) : null}

        {meta.comparison?.length ? (
          <Reveal>
            <PdpComparison rows={meta.comparison} />
          </Reveal>
        ) : null}
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
