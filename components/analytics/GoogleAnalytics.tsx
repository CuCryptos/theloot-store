/**
 * GoogleAnalytics — GA4 gtag.js loader.
 *
 * No-ops when NEXT_PUBLIC_GA4_ID is unset (dev / preview / local).
 * Otherwise loads gtag.js with strategy="afterInteractive" and emits
 * config + a page_view on every route load (Next handles that natively
 * via the App Router data hooks — we don't need send_page_view=false).
 *
 * Wire-up note: matches the same env-gated pattern as MetaPixel —
 * paste the GA4 Measurement ID (G-XXXXXXXXXX) into Vercel as
 * NEXT_PUBLIC_GA4_ID. Redeploy. Done.
 */
import Script from 'next/script'

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_ID
  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
