'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV, SITE } from '@/lib/constants'
import { useCart } from '@/components/cart/CartProvider'

export function Navbar() {
  const { cart, open } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const count = cart?.totalQuantity ?? 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 lg:px-12">
        <ul className="hidden gap-7 text-[12px] text-ink/80 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-ink transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="font-display text-[20px] italic leading-none tracking-editorial whitespace-nowrap text-ink"
        >
          {SITE.name.toLowerCase()}
        </Link>

        <button
          onClick={open}
          aria-label={`Open bag${count > 0 ? `, ${count} item${count === 1 ? '' : 's'}` : ''}`}
          className="group relative inline-flex items-center gap-2 rounded-full border border-ink/20 bg-cream/70 px-4 py-2 text-[12px] uppercase tracking-wider text-ink backdrop-blur-sm transition-all hover:border-ink/60 hover:bg-cream"
        >
          {/* Bag icon */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
          >
            <path d="M6 7h12l-1 13H7L6 7Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Bag</span>
          {count > 0 ? (
            <span className="ml-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink px-1.5 text-[10px] font-medium text-cream tabular-nums">
              {count}
            </span>
          ) : null}
        </button>
      </nav>
    </header>
  )
}
