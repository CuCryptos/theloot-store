/**
 * Dynamic robots.txt — Next.js App Router convention.
 *
 * Allows all crawlers everywhere except the API routes and the Next
 * internals. Points at the dynamic sitemap.
 *
 * Served at https://theloot.co/robots.txt
 */
import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://theloot.co'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
