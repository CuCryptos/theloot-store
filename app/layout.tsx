import type { Metadata } from 'next'
import { fraunces, inter } from './fonts'
import './globals.css'
import { CartProvider } from '@/components/cart/CartProvider'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const TITLE = 'theloot — The trending products worth knowing about.'
const DESC =
  'An independent edit of trending products. New picks every Tuesday — picked, photographed properly, and shipped at the price you’d pay anywhere else.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: '%s — theloot',
  },
  description: DESC,
  applicationName: 'theloot',
  authors: [{ name: 'theloot' }],
  generator: 'Next.js',
  keywords: [
    'theloot',
    'trending products',
    'curated shop',
    'editorial commerce',
    'tiktok products',
    'amazon trending',
    'product edit',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'theloot',
    title: TITLE,
    description: DESC,
    images: [
      {
        url: '/images/editorial/hero-edition-01.png',
        width: 1536,
        height: 1024,
        alt: 'theloot Volume 01 — editorial still life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/images/editorial/hero-edition-01.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/brand/logo-square.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/images/brand/logo-square.png',
  },
  category: 'shopping',
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
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
        <MetaPixel />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
