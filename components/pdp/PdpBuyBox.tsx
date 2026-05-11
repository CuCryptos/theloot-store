'use client'

import { useMemo, useState } from 'react'
import { useCart } from '@/components/cart/CartProvider'
import { NotifyForm } from '@/components/forms/NotifyForm'
import type { ShopifyProduct } from '@/lib/shopify-types'

export function PdpBuyBox({
  product,
  review,
}: {
  product: ShopifyProduct
  review?: { rating: number; count: number }
}) {
  const variants = product.variants.edges.map((e) => e.node)
  const [variantId, setVariantId] = useState(variants[0]?.id)
  const variant = useMemo(
    () => variants.find((v) => v.id === variantId) ?? variants[0],
    [variantId, variants]
  )
  const { add, isPending } = useCart()

  const optionGroups = useMemo(() => {
    const map = new Map<string, Set<string>>()
    variants.forEach((v) =>
      v.selectedOptions.forEach((o) => {
        if (!map.has(o.name)) map.set(o.name, new Set())
        map.get(o.name)!.add(o.value)
      })
    )
    return [...map.entries()].map(([name, values]) => ({ name, values: [...values] }))
  }, [variants])

  return (
    <div className="px-6 py-16 lg:px-12 lg:py-20">
      <p className="text-[11px] uppercase tracking-wide text-mist">
        {product.productType || 'Object'}
      </p>
      <h1 className="mt-4 font-display text-3xl font-normal leading-[1.05] tracking-editorial lg:text-5xl">
        {product.title}
      </h1>
      <p className="mt-5 text-sm text-ink">
        ${Number(variant?.price.amount ?? product.priceRange.minVariantPrice.amount).toFixed(0)}
      </p>

      {review ? (
        <p className="mt-2 text-[11px] uppercase tracking-wide text-mist">
          {review.rating.toFixed(1)} · {review.count} reviews
        </p>
      ) : null}

      <p className="mt-8 max-w-md text-base leading-relaxed text-smoke">
        {product.description}
      </p>

      <div className="mt-10 space-y-6">
        {optionGroups.map((g) => (
          <fieldset key={g.name}>
            <legend className="text-[11px] uppercase tracking-wide text-mist">
              {g.name}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.values.map((v) => {
                const match = variants.find((x) =>
                  x.selectedOptions.some((o) => o.name === g.name && o.value === v)
                )
                const selected = variant?.selectedOptions.some(
                  (o) => o.name === g.name && o.value === v
                )
                return (
                  <button
                    key={v}
                    onClick={() => match && setVariantId(match.id)}
                    className={`px-4 py-2 text-[12px] ${
                      selected ? 'bg-ink text-cream' : 'hairline text-ink'
                    }`}
                  >
                    {v}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <button
        disabled={!variant?.availableForSale || isPending}
        onClick={() => variant && add(variant.id, 1)}
        className="mt-10 block w-full bg-ink py-4 text-center text-[12px] text-cream disabled:opacity-50"
      >
        {variant?.availableForSale ? (isPending ? 'Adding…' : 'Add to bag') : 'Sold out'}
      </button>

      {variant && !variant.availableForSale ? (
        <div className="mt-8">
          <NotifyForm
            variantId={variant.id}
            productHandle={product.handle}
            productTitle={product.title}
            variantTitle={variant.title}
          />
        </div>
      ) : null}

      <ul className="mt-8 space-y-2 text-[11px] uppercase tracking-wide text-mist">
        <li>· Complimentary shipping over $75</li>
        <li>· 30-day return window</li>
        <li>· Made-to-order via Printify / CJ</li>
      </ul>
    </div>
  )
}
