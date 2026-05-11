'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Wire to your error logger (Sentry / etc) here.
    console.error('Urban Yogi error boundary:', error)
  }, [error])

  return (
    <main className="flex min-h-[100dvh] items-center bg-cream text-ink">
      <div className="mx-auto max-w-[680px] px-6 text-center">
        <p className="text-[11px] uppercase tracking-wide text-mist">
          Something interrupted us
        </p>
        <h1 className="mt-6 font-display text-5xl font-normal leading-[1.05] tracking-editorial lg:text-7xl">
          A small <em className="italic text-clayDeep">disruption.</em>
        </h1>
        <p className="mt-8 max-w-[44ch] mx-auto text-base leading-relaxed text-smoke lg:text-lg">
          The studio is letting us know it isn't quite reachable right now. The page can usually be brought back with a quiet retry.
        </p>
        <div className="mt-12 flex justify-center gap-6 text-[12px]">
          <button onClick={reset} className="underline-offset-8 hover:underline">
            Try again
          </button>
          <span className="text-mist">·</span>
          <Link href="/" className="underline-offset-8 hover:underline">Return home</Link>
        </div>
        {error.digest ? (
          <p className="mt-12 text-[11px] uppercase tracking-wide text-mist">
            Ref · {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  )
}
