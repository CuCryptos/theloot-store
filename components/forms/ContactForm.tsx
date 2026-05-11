'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'ok' | 'err'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setStatus('err')
        setError(data.error ?? 'Something slipped.')
        return
      }
      setStatus('ok')
      e.currentTarget.reset()
    } catch {
      setStatus('err')
      setError("Couldn't reach the studio. Try again in a moment.")
    }
  }

  if (status === 'ok') {
    return (
      <p className="font-display text-2xl italic text-smoke">
        Got it. We&apos;ll write back within two days — usually sooner.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Name</span>
        <input
          name="name"
          required
          minLength={2}
          className="mt-2 w-full border-b border-ink/30 bg-transparent pb-2 text-base focus:border-ink focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Email</span>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full border-b border-ink/30 bg-transparent pb-2 text-base focus:border-ink focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-2 w-full border-b border-ink/30 bg-transparent pb-2 text-base focus:border-ink focus:outline-none"
        />
      </label>

      {error ? <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-terra">{error}</p> : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start bg-ink px-8 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
