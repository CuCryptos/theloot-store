/**
 * theloot — PDP content adapter.
 *
 * Reads Shopify metafields under namespace "theloot" and produces a
 * fully-typed ProductPageContent for the 2.AG-tier PDP. Falls back to
 * sane defaults derived from the product itself when metafields are
 * missing.
 */
import type { ShopifyProduct } from './shopify-types'
import type {
  ProductPageContent,
  HeroContent,
  FeatureSplitContent,
  DarkPanelContent,
  IngredientCard,
  FaqContent,
  FullBleedContent,
  StatCallout,
  Testimonial,
  FooterContent,
  ProductPalette,
} from './pdp-types'

/** Metafields as returned by Shopify Storefront `metafields(identifiers:)`. */
export type StorefrontMetafield = {
  namespace: string
  key: string
  value: string
} | null

export const PDP_METAFIELD_KEYS = [
  'hero',
  'feature_splits',
  'dark_panel',
  'ingredients',
  'faq',
  'full_bleed',
  'stats',
  'testimonials',
  'footer',
  'palette',
] as const

export type PdpMetafieldKey = (typeof PDP_METAFIELD_KEYS)[number]

/* ---------- safe JSON parse ---------- */

function safeJson<T>(value: string | undefined | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function indexMetafields(
  metafields: StorefrontMetafield[] | null | undefined,
): Record<string, string> {
  const out: Record<string, string> = {}
  if (!metafields) return out
  for (const mf of metafields) {
    if (mf && mf.namespace === 'theloot') out[mf.key] = mf.value
  }
  return out
}

/* ---------- defaults ---------- */

function pickImage(product: ShopifyProduct, index = 0): string {
  const imgs = product.images.edges
  if (!imgs.length) return ''
  return imgs[Math.min(index, imgs.length - 1)].node.url
}

function defaultHero(product: ShopifyProduct): HeroContent {
  return {
    headline: product.title,
    tagline:
      product.description.split('.').slice(0, 1).join('.').trim() ||
      'A quietly extraordinary object for the everyday.',
    tag_chips: product.tags.slice(0, 3).length
      ? product.tags.slice(0, 3)
      : ['Curated', 'Trending', 'In Stock'],
    badge: 'theloot',
    image_url: pickImage(product, 0),
    cta: 'Add to bag',
  }
}

function defaultFeatureSplits(product: ShopifyProduct): FeatureSplitContent[] {
  return [
    {
      kicker: 'WHY IT WORKS',
      headline: 'Designed for the way you actually live.',
      body:
        product.description.slice(0, 220) ||
        'A considered object. Built to be used daily, kept for years.',
      image_url: pickImage(product, 1),
      accordion: [
        { q: 'Materials', a: 'Premium-grade, sustainably sourced.' },
        { q: 'Care', a: 'Wipe clean. Store dry. Use often.' },
      ],
      side: 'right',
    },
    {
      kicker: 'IN PRACTICE',
      headline: 'A small ritual, repeated.',
      body:
        'Slip it into your morning. Slip it into your evening. The kind of object that disappears into the rhythm of a good day.',
      image_url: pickImage(product, 2),
      side: 'left',
    },
  ]
}

function defaultDarkPanel(product: ShopifyProduct): DarkPanelContent {
  return {
    kicker: 'THE EDGE',
    headline: 'Where editorial design meets daily utility.',
    body:
      'We chose this from thousands of options because it does one thing — and does it the way the best objects always have.',
    image_url: pickImage(product, 3),
    tag_chips:
      product.tags.length >= 3
        ? product.tags.slice(0, 3)
        : ['Premium', 'Tested', 'Curated'],
  }
}

function defaultIngredients(product: ShopifyProduct): IngredientCard[] {
  const imgs = product.images.edges.map((e) => e.node.url)
  const fallbackImg = imgs[0] || ''
  return [
    {
      label: 'Material',
      body: 'Chosen for feel, weight, longevity.',
      image_url: imgs[1] || fallbackImg,
    },
    {
      label: 'Form',
      body: 'Considered down to the millimeter.',
      image_url: imgs[2] || fallbackImg,
    },
    {
      label: 'Finish',
      body: 'Hand-checked before shipping.',
      image_url: imgs[3] || fallbackImg,
    },
    {
      label: 'Function',
      body: 'Built for the way it gets used.',
      image_url: imgs[4] || fallbackImg,
    },
  ]
}

function defaultFaq(): FaqContent {
  return {
    heading: "Questions? We're here to help.",
    sub: 'Real answers from real people. No bots.',
    items: [
      {
        question: 'How fast does it ship?',
        answer:
          'Most orders leave our partner warehouses within 1–2 business days and arrive in 5–9 days.',
      },
      {
        question: 'What is your return policy?',
        answer:
          '30-day no-questions returns. If you don’t love it, send it back.',
      },
      {
        question: 'Is it guaranteed?',
        answer:
          'Every product is curated and tested. We back it with a 1-year warranty on materials and workmanship.',
      },
      {
        question: 'How do I care for it?',
        answer:
          'Most items in this category are wipe-clean. Specific care instructions ship with each piece.',
      },
    ],
  }
}

function defaultFullBleed(product: ShopifyProduct): FullBleedContent {
  return {
    image_url: pickImage(product, product.images.edges.length - 1),
    overlay_headline: 'Considered objects. Curated relentlessly.',
    badge: 'theloot edit',
  }
}

function defaultStats(): StatCallout[] {
  return [
    { percent: '93%', body: 'of customers would buy again' },
    { percent: '99%', body: 'shipped within 48 hours' },
    { percent: '0', body: 'compromise on materials' },
  ]
}

function defaultTestimonials(): Testimonial[] {
  return [
    {
      rating: 5,
      quote: 'Better than I expected. Used it the first day and now every day.',
      author: 'Maya R.',
      verified: true,
    },
    {
      rating: 5,
      quote: 'The packaging alone tells you this brand actually cares.',
      author: 'Jordan T.',
      verified: true,
    },
    {
      rating: 4,
      quote: 'Solid build. Took the place of two other things on my counter.',
      author: 'Sam K.',
      verified: true,
    },
    {
      rating: 5,
      quote: 'I bought one. Then bought another for my mom. She loves it.',
      author: 'Priya N.',
      verified: true,
    },
  ]
}

function defaultFooter(): FooterContent {
  return {
    brand_mark: 'theloot',
    tagline: 'A quieter way to shop trending.',
    newsletter_label: 'Get the weekly drop — one product, every Tuesday.',
  }
}

/**
 * Default palette = current Urban Yogi-inherited token values. Used as a
 * fallback when a product has no `theloot.palette` metafield so the layout
 * still renders coherently.
 */
export function defaultPalette(): ProductPalette {
  return {
    bg: '#F5F1EB',        // cream
    surface: '#EFE9DD',   // bone / paper hybrid
    text: '#1F1C18',      // ink
    secondary: '#4A453E', // smoke
    mist: '#A39C8E',      // mist
    accentLabel: '#6F5E45', // clayDeep
    accentDark: '#1F2A28',  // accent
    accentSignal: '#7FA89A', // signal
  }
}

/**
 * Normalize a parsed palette JSON object. Accepts both camelCase
 * (accentLabel) and snake_case (accent_label) keys so the Anthropic
 * generator output and TypeScript clients both work.
 */
function normalizePalette(
  raw: Record<string, unknown> | null,
): ProductPalette | null {
  if (!raw) return null
  const pick = (a: string, b: string): string | undefined => {
    const v = (raw[a] ?? raw[b]) as unknown
    return typeof v === 'string' ? v : undefined
  }
  const bg = pick('bg', 'bg')
  const surface = pick('surface', 'surface')
  const text = pick('text', 'text')
  const secondary = pick('secondary', 'secondary')
  const mist = pick('mist', 'mist')
  const accentLabel = pick('accentLabel', 'accent_label')
  const accentDark = pick('accentDark', 'accent_dark')
  const accentSignal = pick('accentSignal', 'accent_signal')
  if (
    !bg || !surface || !text || !secondary ||
    !mist || !accentLabel || !accentDark || !accentSignal
  ) {
    return null
  }
  return { bg, surface, text, secondary, mist, accentLabel, accentDark, accentSignal }
}

/* ---------- parser ---------- */

export function parseMetafieldsToContent(
  product: ShopifyProduct,
  metafields: StorefrontMetafield[] | null | undefined,
): ProductPageContent {
  const mf = indexMetafields(metafields)

  const hero = safeJson<Partial<HeroContent>>(mf.hero)
  const featureSplits = safeJson<FeatureSplitContent[]>(mf.feature_splits)
  const darkPanel = safeJson<Partial<DarkPanelContent>>(mf.dark_panel)
  const ingredients = safeJson<IngredientCard[]>(mf.ingredients)
  const faq = safeJson<Partial<FaqContent>>(mf.faq)
  const fullBleed = safeJson<Partial<FullBleedContent>>(mf.full_bleed)
  const stats = safeJson<StatCallout[]>(mf.stats)
  const testimonials = safeJson<Testimonial[]>(mf.testimonials)
  const footer = safeJson<Partial<FooterContent>>(mf.footer)
  const paletteRaw = safeJson<Record<string, unknown>>(mf.palette)
  const palette = normalizePalette(paletteRaw) ?? defaultPalette()

  const heroDefaults = defaultHero(product)

  return {
    hero: {
      ...heroDefaults,
      ...(hero || {}),
      image_url: hero?.image_url || heroDefaults.image_url,
    },
    feature_splits:
      featureSplits && featureSplits.length
        ? featureSplits
        : defaultFeatureSplits(product),
    dark_panel: { ...defaultDarkPanel(product), ...(darkPanel || {}) },
    ingredients:
      ingredients && ingredients.length ? ingredients : defaultIngredients(product),
    faq: { ...defaultFaq(), ...(faq || {}) },
    full_bleed: { ...defaultFullBleed(product), ...(fullBleed || {}) },
    stats: stats && stats.length ? stats : defaultStats(),
    testimonials:
      testimonials && testimonials.length ? testimonials : defaultTestimonials(),
    footer: { ...defaultFooter(), ...(footer || {}) },
    palette,
  }
}
