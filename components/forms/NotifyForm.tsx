'use client'

import { useState } from 'react'

export function NotifyForm({
  variantId,
  productHandle,
  productTitle,
  variantTitle,
}: {
  variantId: string
  productHandle: string
  productTitle: string
  variantTitle?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('pending')
    setMessage('')
    try {
      const res = await fetch('/api/back-in-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, variantId, productHandle, productTitle, variantTitle }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setStatus('ok')
      setMessage("You'll hear from us the day it returns.")
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Try again in a moment.')
    }
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-mist">Notify when it returns</p>
      <form onSubmit={onSubmit} className="mt-3 flex border-b border-ink/30 pb-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
          disabled={status === 'pending' || status === 'ok'}
          className="w-full bg-transparent text-sm placeholder:text-mist focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'pending' || status === 'ok'}
          className="text-[12px] disabled:opacity-50"
        >
          {status === 'pending' ? 'Sending…' : status === 'ok' ? 'Saved' : 'Notify me →'}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-[11px] uppercase tracking-wide ${
            status === 'error' ? 'text-[#9F4F3F]' : 'text-mist'
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
