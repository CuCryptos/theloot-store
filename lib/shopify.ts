/**
 * Urban Yogi — Shopify Storefront API client.
 *
 * Same shape as posted-hawaii/lib/shopify.ts. Adds:
 *   - getCollectionByHandle (collection page)
 *   - getProductMetaobjects (ritual / materials / comparison)
 *   - cart pulled from cookie 'uy_cart_id' on server
 */
import type {
  ShopifyProduct,
  ShopifyCart,
  ProductMetafields,
} from './shopify-types'
import {
  parseMetafieldsToContent,
  PDP_METAFIELD_KEYS,
  type StorefrontMetafield,
} from './pdp-content'
import type { ProductPageContent } from './pdp-types'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
}): Promise<T> {
  const res = await fetch(`https://${domain}/api/2026-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Shopify API ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

/* ---------- Fragments ---------- */

export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id handle title productType tags
    priceRange { minVariantPrice { amount currencyCode } }
    images(first: 2) { edges { node { url altText width height } } }
    variants(first: 5) {
      edges { node {
        id title availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
        image { url altText width height }
      } }
    }
  }
`

export const PRODUCT_DETAIL_FRAGMENT = `
  fragment ProductDetailFields on Product {
    id handle title description productType tags
    priceRange { minVariantPrice { amount currencyCode } }
    images(first: 12) { edges { node { url altText width height } } }
    variants(first: 50) {
      edges { node {
        id title availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
        image { url altText width height }
      } }
    }
    ritualSteps:   metafield(namespace: "uy", key: "ritual_steps")  { value }
    materials:     metafield(namespace: "uy", key: "materials")     { value }
    comparison:    metafield(namespace: "uy", key: "comparison")    { value }
    reviewSummary: metafield(namespace: "uy", key: "review_summary"){ value }
  }
`

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id checkoutUrl totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount    { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 50) { edges { node {
      id quantity
      merchandise { ... on ProductVariant {
        id title
        product { handle title }
        image { url altText width height }
        price { amount currencyCode }
        selectedOptions { name value }
      } }
    } } }
  }
`

/* ---------- Products ---------- */

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{
    productByHandle: (ShopifyProduct & {
      ritualSteps:   { value: string } | null
      materials:     { value: string } | null
      comparison:    { value: string } | null
      reviewSummary: { value: string } | null
    }) | null
  }>({
    query: `
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) { ...ProductDetailFields }
      }
      ${PRODUCT_DETAIL_FRAGMENT}
    `,
    variables: { handle },
  })
  if (!data.productByHandle) return null

  const p = data.productByHandle
  const meta: ProductMetafields = {
    ritualSteps:   p.ritualSteps   ? JSON.parse(p.ritualSteps.value)   : undefined,
    materials:     p.materials     ? JSON.parse(p.materials.value)     : undefined,
    comparison:    p.comparison    ? JSON.parse(p.comparison.value)    : undefined,
    reviewSummary: p.reviewSummary ? JSON.parse(p.reviewSummary.value) : undefined,
  }
  return { product: p as ShopifyProduct, meta }
}

/**
 * 2.AG-tier PDP — pull theloot metafields + parse to ProductPageContent.
 * Returns null when product not found. Gracefully degrades when metafields
 * are missing (the adapter fills in product-derived defaults).
 */
export async function getProductPageContent(
  handle: string,
): Promise<{ product: ShopifyProduct; content: ProductPageContent } | null> {
  const identifiers = PDP_METAFIELD_KEYS.map(
    (k) => `{namespace: "theloot", key: "${k}"}`,
  ).join(', ')
  const data = await shopifyFetch<{
    productByHandle:
      | (ShopifyProduct & {
          metafields: StorefrontMetafield[]
        })
      | null
  }>({
    query: `
      query ProductPageContent($handle: String!) {
        productByHandle(handle: $handle) {
          id handle title description productType tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 12) { edges { node { url altText width height } } }
          variants(first: 50) {
            edges { node {
              id title availableForSale
              price { amount currencyCode }
              selectedOptions { name value }
              image { url altText width height }
            } }
          }
          metafields(identifiers: [${identifiers}]) {
            namespace key value
          }
        }
      }
    `,
    variables: { handle },
  })
  if (!data.productByHandle) return null
  const { metafields, ...product } = data.productByHandle
  const content = parseMetafieldsToContent(
    product as ShopifyProduct,
    metafields,
  )
  return { product: product as ShopifyProduct, content }
}

export async function getCollectionByHandle(handle: string) {
  const data = await shopifyFetch<{
    collection: {
      title: string
      description: string
      image: { url: string; altText: string | null } | null
      products: { edges: { node: ShopifyProduct }[] }
    } | null
  }>({
    query: `
      query CollectionByHandle($handle: String!) {
        collection(handle: $handle) {
          title description
          image { url altText }
          products(first: 60) { edges { node { ...ProductCardFields } } }
        }
      }
      ${PRODUCT_CARD_FRAGMENT}
    `,
    variables: { handle },
  })
  return data.collection
}

export async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
  // Prefer products tagged 'featured'; fall back to first 8 if no curation set
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>({
    query: `
      query Featured { products(first: 8, query: "tag:featured") {
        edges { node { ...ProductCardFields } }
      } }
      ${PRODUCT_CARD_FRAGMENT}
    `,
  })
  if (data.products.edges.length > 0) {
    return data.products.edges.map((e) => e.node)
  }
  // Fallback: return first 8 of any products so the storefront isn't empty
  const fallback = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>({
    query: `
      query AllProducts { products(first: 8, sortKey: TITLE) {
        edges { node { ...ProductCardFields } }
      } }
      ${PRODUCT_CARD_FRAGMENT}
    `,
  })
  return fallback.products.edges.map((e) => e.node)
}

export async function getAllProducts(first = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>({
    query: `
      query AllProducts($first: Int!) {
        products(first: $first, sortKey: TITLE) {
          edges { node { ...ProductCardFields } }
        }
      }
      ${PRODUCT_CARD_FRAGMENT}
    `,
    variables: { first },
  })
  return data.products.edges.map((e) => e.node)
}

/* ---------- Cart (Shopify Storefront API) ---------- */

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `mutation { cartCreate { cart { ...CartFields } } } ${CART_FRAGMENT}`,
    cache: 'no-store',
  })
  return data.cartCreate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `query Cart($cartId: ID!){ cart(id:$cartId){ ...CartFields } } ${CART_FRAGMENT}`,
    variables: { cartId },
    cache: 'no-store',
  })
  return data.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `
      mutation($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
      } ${CART_FRAGMENT}
    `,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    cache: 'no-store',
  })
  return data.cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `
      mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
      } ${CART_FRAGMENT}
    `,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: 'no-store',
  })
  return data.cartLinesUpdate.cart
}

export async function removeCartLine(cartId: string, lineId: string) {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `
      mutation($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
      } ${CART_FRAGMENT}
    `,
    variables: { cartId, lineIds: [lineId] },
    cache: 'no-store',
  })
  return data.cartLinesRemove.cart
}
