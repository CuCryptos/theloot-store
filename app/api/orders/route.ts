/**
 * Shopify webhook receiver — orders/create.
 *
 * Configure in Shopify Admin → Settings → Notifications → Webhooks:
 *   Event:    Order creation
 *   Format:   JSON
 *   URL:      https://urbanyogi.co/api/orders
 *
 * Shopify signs each delivery with HMAC-SHA256 using the shared secret. We
 * verify the signature before doing anything. On success, fire our
 * brand-voiced confirmation via Resend (Shopify still sends its own).
 *
 * Env: SHOPIFY_WEBHOOK_SECRET   (Notifications → Webhooks → Reveal secret)
 */

import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { sendOrderConfirmation, type OrderLine } from '@/lib/resend'

export const runtime = 'nodejs'

type ShopifyOrder = {
  name: string
  email: string
  total_price: string
  currency: string
  line_items: { title: string; quantity: number; price: string }[]
}

function verify(rawBody: string, signature: string | null) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret || !signature) return false
  const digest = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64')
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
  } catch {
    return false
  }
}

const fmt = (amount: string, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(amount))

export async function POST(req: Request) {
  const raw = await req.text()
  const sig = req.headers.get('x-shopify-hmac-sha256')
  if (!verify(raw, sig)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
  }

  const order = JSON.parse(raw) as ShopifyOrder
  if (!order.email) return NextResponse.json({ ok: true, skipped: 'no email' })

  const lineItems: OrderLine[] = order.line_items.map((l) => ({
    title: l.title,
    quantity: l.quantity,
    price: fmt(l.price, order.currency),
  }))

  await sendOrderConfirmation({
    to: order.email,
    orderName: order.name,
    lineItems,
    total: fmt(order.total_price, order.currency),
  })

  return NextResponse.json({ ok: true })
}
