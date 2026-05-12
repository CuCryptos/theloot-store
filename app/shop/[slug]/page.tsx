import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ProductPage2AG } from '@/components/pdp/ProductPage2AG'
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
} from '@/components/seo/JsonLd'
import { getProductPageContent } from '@/lib/shopify'
import { notFound } from 'next/navigation'

export const revalidate = 60

/**
 * Per-product metadata. Pulls the same Storefront API data we already
 * fetch for rendering, then derives a unique <title>, <description>,
 * and OG image set per product. Big SEO + social-share win for free.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getProductPageContent(slug).catch(() => null)
  if (!data) {
    return { title: 'Not found' }
  }
  const { product } = data
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)
  const cur = product.priceRange.minVariantPrice.currencyCode
  const desc =
    (product.description?.split('.').slice(0, 2).join('.').trim() ||
      `${product.title} — an editorial pick from theloot.`) +
    ` $${price} ${cur}.`
  const heroImage = product.images.edges[0]?.node.url
  return {
    title: product.title,
    description: desc,
    alternates: {
      canonical: `/shop/${product.handle}`,
    },
    openGraph: {
      title: `${product.title} — theloot`,
      description: desc,
      url: `/shop/${product.handle}`,
      type: 'website',
      images: heroImage
        ? [{ url: heroImage, alt: product.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — theloot`,
      description: desc,
      images: heroImage ? [heroImage] : undefined,
    },
  }
}

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
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd product={product} />
      <Navbar />
      <ProductPage2AG content={content} product={product} />
      <Footer />
      <CartDrawer />
    </>
  )
}
