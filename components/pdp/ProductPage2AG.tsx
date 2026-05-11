/**
 * ProductPage2AG — top-level orchestrator for the 2.AG-tier PDP.
 *
 * Composes typed section components in editorial order. Each section
 * is independently optional via the metafield adapter; defaults always
 * fill in so the layout never collapses.
 *
 * Per-product palette: the entire component is wrapped in a `<main>` that
 * sets `--bg`, `--surface`, `--text`, `--secondary`, `--mist`,
 * `--accent-label`, `--accent-dark`, `--accent-signal` as CSS custom
 * properties. Section components reference them via Tailwind arbitrary
 * value utilities like `bg-[var(--bg)]`. This makes every PDP render in
 * its own native palette without a config-level theme rebuild.
 */
import type { CSSProperties } from 'react'
import type { ProductPageContent } from '@/lib/pdp-types'
import type { ShopifyProduct } from '@/lib/shopify-types'
import { Hero } from './sections/Hero'
import { FeatureSplit } from './sections/FeatureSplit'
import { DarkPanel } from './sections/DarkPanel'
import { IngredientGrid } from './sections/IngredientGrid'
import { FAQ } from './sections/FAQ'
import { FullBleedImage } from './sections/FullBleedImage'
import { StatsCallout } from './sections/StatsCallout'
import { TestimonialGrid } from './sections/TestimonialGrid'
import { ProductPageFooter } from './sections/ProductPageFooter'

type Props = {
  content: ProductPageContent
  product: ShopifyProduct
}

export function ProductPage2AG({ content, product }: Props) {
  const { palette } = content
  const style = {
    '--bg': palette.bg,
    '--surface': palette.surface,
    '--text': palette.text,
    '--secondary': palette.secondary,
    '--mist': palette.mist,
    '--accent-label': palette.accentLabel,
    '--accent-dark': palette.accentDark,
    '--accent-signal': palette.accentSignal,
  } as CSSProperties

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]" style={style}>
      <Hero hero={content.hero} product={product} />

      {content.feature_splits.map((fs, i) => (
        <FeatureSplit key={`fs-${i}`} content={fs} />
      ))}

      <DarkPanel content={content.dark_panel} />

      <IngredientGrid items={content.ingredients} />

      <FullBleedImage content={content.full_bleed} />

      <StatsCallout
        title="Numbers that matter."
        items={content.stats}
      />

      <FAQ content={content.faq} />

      <TestimonialGrid items={content.testimonials} />

      <ProductPageFooter content={content.footer} />
    </main>
  )
}
