import { NextResponse } from 'next/server'
import { subscribeToList } from '@/lib/klaviyo'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string }
    if (!email || !EMAIL.test(email)) {
      return NextResponse.json(
        { error: 'Email looks unfinished. Add a domain after the @.' },
        { status: 400 }
      )
    }
    await subscribeToList(email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('newsletter signup', err)
    return NextResponse.json(
      { error: "Couldn't reach the studio. Try again in a moment." },
      { status: 500 }
    )
  }
}
