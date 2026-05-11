'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ShopifyCart } from '@/lib/shopify-types'

type CartCtx = {
  cart: ShopifyCart | null
  isOpen: boolean
  isPending: boolean
  open: () => void
  close: () => void
  add: (variantId: string, quantity?: number) => Promise<void>
  update: (lineId: string, quantity: number) => Promise<void>
  remove: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartCtx | null>(null)

const STORAGE_KEY = 'uy_cart_id'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isOpen, setOpen] = useState(false)
  const [isPending, setPending] = useState(false)

  // Hydrate cart on mount via /api/cart route handler.
  useEffect(() => {
    const cartId = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (!cartId) return
    fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data?.cart && setCart(data.cart))
      .catch(() => {})
  }, [])

  const persist = useCallback((c: ShopifyCart) => {
    setCart(c)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, c.id)
  }, [])

  const mutate = useCallback(
    async (
      action: 'add' | 'update' | 'remove',
      payload: Record<string, unknown>
    ) => {
      setPending(true)
      try {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, cartId: cart?.id ?? null, ...payload }),
        })
        const data = await res.json()
        if (data.cart) persist(data.cart)
      } finally {
        setPending(false)
      }
    },
    [cart?.id, persist]
  )

  const value = useMemo<CartCtx>(
    () => ({
      cart,
      isOpen,
      isPending,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: async (variantId, quantity = 1) => {
        await mutate('add', { variantId, quantity })
        setOpen(true)
      },
      update: (lineId, quantity) => mutate('update', { lineId, quantity }),
      remove: (lineId) => mutate('remove', { lineId }),
    }),
    [cart, isOpen, isPending, mutate]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
