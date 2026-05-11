/**
 * theloot — 2.AG-tier PDP content schema.
 *
 * Each PDP section consumes a typed slice of this object. The full
 * ProductPageContent is hydrated from Shopify metafields (namespace
 * "theloot") via lib/pdp-content.ts. When metafields are missing the
 * adapter falls back to safe defaults derived from product fields.
 */

/** Top hero — full-viewport editorial billboard. */
export interface HeroContent {
  /** Big editorial headline. */
  headline: string
  /** Sub-headline / tagline. */
  tagline: string
  /** Category / benefit chips above the headline. */
  tag_chips: string[]
  /** Small wordmark / brand badge. */
  badge?: string
  /** Optional image override (defaults to product.featuredImage). */
  image_url?: string
  /** Optional CTA label override. */
  cta?: string
}

/** Reusable image + text split block. Two stacked instances form the
 * "feature double". */
export interface FeatureSplitContent {
  /** Section eyebrow / kicker (e.g. "INNOVATION"). */
  kicker?: string
  /** Section headline. */
  headline: string
  /** Body paragraph (1–3 sentences). */
  body: string
  /** Image URL — full-bleed within the split column. */
  image_url: string
  /** Optional accordion (details/summary) appended below body. */
  accordion?: Array<{ q: string; a: string }>
  /** Which side the image renders on. */
  side: 'left' | 'right'
}

/** Dark accent full-bleed panel. */
export interface DarkPanelContent {
  /** Eyebrow / kicker text. */
  kicker?: string
  headline: string
  body: string
  image_url: string
  tag_chips: string[]
}

/** Ingredient / feature card. */
export interface IngredientCard {
  label: string
  body: string
  image_url: string
}

/** FAQ section. */
export interface FaqContent {
  heading: string
  sub?: string
  items: Array<{ question: string; answer: string }>
}

/** Full-bleed image with overlay headline. */
export interface FullBleedContent {
  image_url: string
  overlay_headline: string
  badge?: string
}

/** A single stat percent block. */
export interface StatCallout {
  percent: string
  body: string
}

/** A single testimonial card. */
export interface Testimonial {
  rating: number
  quote: string
  author: string
  verified: boolean
}

/** Footer sign-off block. */
export interface FooterContent {
  brand_mark: string
  tagline: string
  newsletter_label: string
}

/**
 * Per-product color palette. Each PDP renders in its own native palette
 * generated specifically for that product — making the LED face mask look
 * clinical-cool, the slow feeder bowl look warm-oat, etc.
 */
export interface ProductPalette {
  /** Page background — typically a warm or cool neutral that complements the product */
  bg: string
  /** Section/card surface — slightly different from bg, used for benefit cards and section dividers */
  surface: string
  /** Primary text color — typically near-black or near-white depending on bg */
  text: string
  /** Secondary text (kickers, body copy) */
  secondary: string
  /** Label/uppercase eyebrow text — usually a desaturated tint */
  mist: string
  /** Accent label text — used for italic 'em' emphasis in headlines */
  accentLabel: string
  /** Dark accent panel background — the DarkPanel section's bg */
  accentDark: string
  /** Signal/highlight color — small accents within dark sections, used sparingly */
  accentSignal: string
}

/** Union of all section content for a single PDP. */
export interface ProductPageContent {
  hero: HeroContent
  feature_splits: FeatureSplitContent[]
  dark_panel: DarkPanelContent
  ingredients: IngredientCard[]
  faq: FaqContent
  full_bleed: FullBleedContent
  stats: StatCallout[]
  testimonials: Testimonial[]
  footer: FooterContent
  palette: ProductPalette
}
