import type { Metadata } from 'next'
import { fraunces, inter } from './fonts'
import './globals.css'
import { CartProvider } from '@/components/cart/CartProvider'

export const metadata: Metadata = {
  title: 'theloot — A quieter way to shop trending.',
  description:
    'Yoga, recovery, and small rituals for an unhurried life.',
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
      </body>
    </html>
  )
}
