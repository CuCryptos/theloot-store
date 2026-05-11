import { NextResponse } from 'next/server'
import { sendContactRelay } from '@/lib/resend'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { name, email, message } = (await req.json()) as {
      name?: string
      email?: string
      message?: string
    }
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Tell us what to call you.' }, { status: 400 })
    }
    if (!email || !EMAIL.test(email)) {
      return NextResponse.json({ error: 'Email looks unfinished.' }, { status: 400 })
    }
    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'A few more words — we want to read it properly.' },
        { status: 400 },
      )
    }
    await sendContactRelay({ name: name.trim(), email: email.trim(), message: message.trim() })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact relay', err)
    return NextResponse.json(
      { error: "Couldn't reach the studio. Try again in a moment." },
      { status: 500 },
    )
  }
}
