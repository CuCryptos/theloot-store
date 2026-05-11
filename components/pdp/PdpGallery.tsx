'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ShopifyImage } from '@/lib/shopify-types'

export function PdpGallery({
  images,
  title,
}: {
  images: ShopifyImage[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const safe = images.length ? images : [{ url: '', altText: title, width: 1200, height: 1500 }]

  return (
    <div className="lg:col-span-7">
      {/* Main */}
      <div className="grain relative aspect-[4/5] bg-bone">
        {safe[active].url ? (
          <Image
            src={safe[active].url}
            alt={safe[active].altText ?? title}
            fill
            sizes="(min-width:1024px) 60vw, 100vw"
            priority
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg,#D8CFBF 0 18px,#cdc3b0 18px 36px)',
            }}
          />
        )}
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-mono text-cream/80">
          {String(active + 1).padStart(2, '0')} / {String(safe.length).padStart(2, '0')}
        </span>
      </div>

      {/* Thumbs */}
      {safe.length > 1 ? (
        <div className="flex gap-2 px-4 py-3 lg:px-6">
          {safe.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-16 shrink-0 bg-bone ${
                i === active ? 'hairline text-ink' : ''
              }`}
            >
              {img.url && (
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
