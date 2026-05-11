import type { Metadata } from 'next'
import { fraunces, inter } from './fonts'
import './globals.css'
import { CartProvider } from '@/components/cart/CartProvider'
import { MetaPixel } from '@/components/analytics/MetaPixel'

export const metadata: Metadata = {
  title: 'theloot — The trending products worth knowing about.',
  description:
    'A curated edit of the trending products worth knowing about — one drop every Tuesday.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
        <MetaPixel />
      </body>
    </html>
  )
}
