'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV, SITE } from '@/lib/constants'
import { useCart } from '@/components/cart/CartProvider'

export function Navbar() {
  const { cart, open } = useCart()
  const [scrolled, setScrolled] = useState(false)

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
        <ul className="hidden gap-7 text-[12px] text-smoke lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="font-display text-[20px] italic leading-none tracking-editorial whitespace-nowrap"
        >
          {SITE.name.toLowerCase()}
        </Link>

        <button
          onClick={open}
          className="text-[12px] text-smoke hover:text-ink transition-colors"
        >
          Bag {cart?.totalQuantity ? `(${cart.totalQuantity})` : ''}
        </button>
      </nav>
    </header>
  )
}
