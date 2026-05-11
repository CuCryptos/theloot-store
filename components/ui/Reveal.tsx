'use client'

import { useEffect, useRef } from 'react'

/**
 * Wrap any block in <Reveal> to fade-up when it enters the viewport.
 * Pairs with .reveal in globals.css.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          io.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  // @ts-expect-error — generic ref on dynamic tag
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>
}
