'use client'

import { useCart } from '@/components/cart/CartProvider'

/**
 * AddToBagButton — client-side wrapper for the 2.AG Hero CTA. Calls
 * useCart().add(variantId) and opens the cart drawer. Picks up the
 * active palette via the same CSS variables as the rest of the PDP
 * (--text / --bg / --accent-label).
 *
 * Lives in a Client Component because <Hero> is server-rendered and
 * cannot bind onClick.
 */
export function AddToBagButton({
  variantId,
  label = 'Add to bag',
  disabled = false,
}: {
  variantId: string | undefined
  label?: string
  disabled?: boolean
}) {
  const { add, isPending } = useCart()

  const handleClick = async () => {
    if (!variantId || isPending) return
    await add(variantId, 1)
  }

  const isDisabled = disabled || !variantId || isPending

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className="group inline-flex items-center gap-3 rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-medium text-[var(--bg)] transition hover:bg-[var(--accent-label)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? 'Adding…' : label}
      <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
    </button>
  )
}
