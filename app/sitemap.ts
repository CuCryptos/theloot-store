/**
 * Dynamic sitemap.xml — Next.js App Router convention. Generated at
 * build time, revalidated daily. Lists static routes + every product
 * handle pulled from Shopify so Google Search Console picks up the
 * full catalog.
 *
 * Served at https://theloot.co/sitemap.xml
 */
import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/shopify'

export const revalidate = 86400 // 24h

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://theloot.co'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/shop`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Product routes — failure tolerant. If Shopify is slow at build, we
  // still ship the static routes so the sitemap is at least partially
  // useful.
  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const products = await getAllProducts(100)
    productRoutes = products.map((p) => ({
      url: `${SITE}/shop/${p.handle}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (err) {
    console.error('[sitemap] getAllProducts failed:', err)
  }

  return [...staticRoutes, ...productRoutes]
}
