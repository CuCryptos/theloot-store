'use client'

import { useState } from 'react'

export function NewsletterForm({
  variant = 'inline',
}: {
  variant?: 'inline' | 'centered'
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('pending')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setStatus('ok')
      setMessage('Quietly added. Look for the first letter at the change of season.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Try again in a moment.')
    }
  }

  const isCentered = variant === 'centered'

  return (
    <form
      onSubmit={onSubmit}
      className={`${
        isCentered ? 'mx-auto' : ''
      } flex max-w-md border-b border-ink/30 pb-1`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
        disabled={status === 'pending'}
        className={`w-full bg-transparent placeholder:text-mist focus:outline-none ${
          isCentered ? 'text-base' : 'text-sm'
        } ${status === 'error' ? 'text-clayDeep' : 'text-ink'}`}
        aria-invalid={status === 'error'}
      />
      <button
        type="submit"
        disabled={status === 'pending'}
        className="text-[12px] disabled:opacity-50"
      >
        {status === 'pending' ? 'Sending…' : status === 'ok' ? 'Thank you' : 'Subscribe →'}
      </button>
      {message ? (
        <p
          className={`absolute mt-10 text-[11px] uppercase tracking-wide ${
            status === 'error' ? 'text-[#9F4F3F]' : 'text-mist'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
