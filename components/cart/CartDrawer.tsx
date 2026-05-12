'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartProvider'
import { FREE_SHIP_THRESHOLD } from '@/lib/constants'

export function CartDrawer() {
  const { cart, isOpen, close, update, remove, isPending } = useCart()
  const subtotal = Number(cart?.cost.subtotalAmount.amount ?? 0)
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-ink/20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`drawer-panel fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[440px] flex-col bg-cream ${
          isOpen ? 'open' : ''
        }`}
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 pt-6 pb-4">
          <span className="text-[11px] uppercase tracking-wide text-mist">
            Bag · {cart?.totalQuantity ?? 0}
          </span>
          <button onClick={close} className="text-[12px] text-ink">Close</button>
        </header>

        <div className="px-6 pt-4 pb-3">
          {remaining > 0 ? (
            <p className="text-sm text-smoke">
              ${remaining.toFixed(0)} away from free shipping
            </p>
          ) : (
            <p className="text-sm text-clayDeep">Free shipping unlocked</p>
          )}
          <div className="mt-2 h-px bg-ink/10">
            <div className="h-px bg-clay transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
          {cart?.lines.edges.length ? (
            cart.lines.edges.map(({ node: line }) => (
              <li key={line.id} className="flex gap-4 py-5">
                <div className="relative h-24 w-20 shrink-0 bg-bone">
                  {line.merchandise.image && (
                    <Image
                      src={line.merchandise.image.url}
                      alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                      fill sizes="80px" className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <Link href={`/shop/${line.merchandise.product.handle}`} className="font-display text-base leading-snug">
                      {line.merchandise.product.title}
                    </Link>
                    <span className="text-xs">${Number(line.merchandise.price.amount).toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 hairline text-ink px-2 py-1">
                      <button onClick={() => update(line.id, Math.max(1, line.quantity - 1))} disabled={isPending} className="text-xs">−</button>
                      <span className="text-xs w-4 text-center">{line.quantity}</span>
                      <button onClick={() => update(line.id, line.quantity + 1)} disabled={isPending} className="text-xs">+</button>
                    </div>
                    <button onClick={() => remove(line.id)} className="text-[11px] text-mist underline-offset-4 hover:underline">Remove</button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="py-16 text-center">
              <p className="font-display italic text-smoke">Your bag is quiet.</p>
              <Link href="/shop" className="mt-4 inline-block text-[12px]">Begin shopping →</Link>
            </li>
          )}
        </ul>

        {cart?.lines.edges.length ? (
          <footer className="border-t border-ink/10 px-6 py-5">
            <div className="flex justify-between text-[11px] uppercase tracking-wide text-mist">
              <span>Subtotal</span><span className="text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <a href={cart.checkoutUrl} className="mt-4 block bg-ink py-4 text-center text-[12px] text-cream">
              Checkout · Shopify
            </a>
            <p className="mt-3 text-center text-[11px] uppercase tracking-wide text-mist">
              Tax & shipping calculated next
            </p>
          </footer>
        ) : null}
      </aside>
    </>
  )
}
