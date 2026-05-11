import { NextRequest, NextResponse } from 'next/server'
import {
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeCartLine,
} from '@/lib/shopify'

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get('cartId')
  if (!cartId) return NextResponse.json({ cart: null })
  try {
    const cart = await getCart(cartId)
    return NextResponse.json({ cart })
  } catch {
    return NextResponse.json({ cart: null })
  }
}

export async function POST(req: NextRequest) {
  const { action, cartId, variantId, quantity, lineId } = await req.json()

  let activeId: string | null = cartId
  if (!activeId) {
    const fresh = await createCart()
    activeId = fresh.id
  }

  try {
    let cart
    switch (action) {
      case 'add':
        cart = await addToCart(activeId!, variantId, quantity ?? 1)
        break
      case 'update':
        cart = await updateCartLine(activeId!, lineId, quantity)
        break
      case 'remove':
        cart = await removeCartLine(activeId!, lineId)
        break
      default:
        return NextResponse.json({ error: 'unknown action' }, { status: 400 })
    }
    return NextResponse.json({ cart })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'cart error' },
      { status: 500 }
    )
  }
}
