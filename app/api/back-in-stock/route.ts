import { NextResponse } from 'next/server'
import { trackBackInStock } from '@/lib/klaviyo'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { email, variantId, productHandle, productTitle, variantTitle } =
      (await req.json()) as {
        email?: string
        variantId?: string
        productHandle?: string
        productTitle?: string
        variantTitle?: string
      }
    if (!email || !EMAIL.test(email)) {
      return NextResponse.json({ error: 'Add a valid email.' }, { status: 400 })
    }
    if (!variantId || !productHandle || !productTitle) {
      return NextResponse.json({ error: 'Missing variant.' }, { status: 400 })
    }
    await trackBackInStock({ email, variantId, productHandle, productTitle, variantTitle })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('back-in-stock', err)
    return NextResponse.json(
      { error: "Couldn't save your request right now." },
      { status: 500 }
    )
  }
}
