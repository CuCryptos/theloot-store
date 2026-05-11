import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ProductPage2AG } from '@/components/pdp/ProductPage2AG'
import { getProductPageContent } from '@/lib/shopify'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PdpPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getProductPageContent(slug)
  if (!data) notFound()
  const { product, content } = data

  return (
    <>
      <Navbar />
      <ProductPage2AG content={content} product={product} />
      <Footer />
      <CartDrawer />
    </>
  )
}
