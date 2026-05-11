// Mirrors posted-hawaii/lib/shopify-types — extend if you add metaobjects.

export type Money = { amount: string; currencyCode: string }

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifyVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  selectedOptions: { name: string; value: string }[]
  image: ShopifyImage | null
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  tags: string[]
  priceRange: { minVariantPrice: Money }
  images: { edges: { node: ShopifyImage }[] }
  variants: { edges: { node: ShopifyVariant }[] }
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: { handle: string; title: string }
    image: ShopifyImage | null
    price: Money
    selectedOptions: { name: string; value: string }[]
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalAmount: Money
    totalTaxAmount: Money | null
  }
  lines: { edges: { node: ShopifyCartLine }[] }
}

/* ---------- Urban Yogi metaobjects ---------- */

/** Materials block — appears on every PDP. Editor-managed in Shopify metaobjects. */
export type MaterialEntry = {
  label: string         // "Cork — Portuguese harvest"
  body: string          // 1–2 sentences of provenance
  certification?: string // FSC, GOTS, etc
}

/** Ritual / use guide — 3–5 numbered steps. */
export type RitualStep = {
  index: number
  title: string
  body: string
}

/** Shopify metaobject reference type for a product. */
export type ProductMetafields = {
  ritualSteps?: RitualStep[]
  materials?: MaterialEntry[]
  comparison?: { feature: string; us: string; typical: string }[]
  reviewSummary?: { rating: number; count: number }
}
