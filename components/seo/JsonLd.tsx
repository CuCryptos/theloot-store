/**
 * JSON-LD structured data helpers for SEO.
 *
 * Renders schema.org JSON-LD into a <script type="application/ld+json">
 * tag. Used in Server Components only (no client interactivity).
 */
import type { ShopifyProduct } from '@/lib/shopify-types'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://theloot.co'

// ---------- Organization (sitewide) ----------

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'theloot',
    alternateName: 'theloot.co',
    url: SITE,
    logo: `${SITE}/images/brand/logo-square.png`,
    description:
      'An independent edit of the trending products worth knowing about. New picks every Tuesday.',
    email: 'hello@theloot.co',
    sameAs: ['https://www.facebook.com/theloot.co'],
  }
  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not user-controlled — safe to inject literally.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ---------- WebSite (sitewide, enables SiteLinks Search Box later) ----------

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'theloot',
    url: SITE,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ---------- Product (PDP) ----------

export function ProductJsonLd({ product }: { product: ShopifyProduct }) {
  const variant = product.variants.edges[0]?.node
  const images = product.images.edges.map((e) => e.node.url).slice(0, 6)
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: stripHtml(product.description ?? '').slice(0, 5000),
    image: images,
    sku: variant?.id?.split('/').pop() ?? product.handle,
    brand: { '@type': 'Brand', name: 'theloot' },
    offers: {
      '@type': 'Offer',
      url: `${SITE}/shop/${product.handle}`,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: variant?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ---------- BreadcrumbList (PDP) ----------

export function BreadcrumbJsonLd({
  product,
}: {
  product: ShopifyProduct
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'theloot',
        item: SITE,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${SITE}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${SITE}/shop/${product.handle}`,
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
