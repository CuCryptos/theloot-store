/**
 * MetaPixel — Meta (Facebook) Pixel base code.
 *
 * No-ops in dev or when NEXT_PUBLIC_META_PIXEL_ID is unset, so the build
 * stays clean before the Pixel is created in Events Manager.
 *
 * After you create the Pixel:
 *   1. Copy the 15-16 digit Pixel ID from business.facebook.com/events_manager
 *   2. Add to Vercel env: NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
 *   3. Redeploy. PageView fires automatically on every route.
 *
 * Event tracking (AddToCart, Purchase) is wired separately at the cart
 * action level — see components/cart/CartProvider.tsx for the hooks.
 */
import Script from 'next/script'

export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!pixelId) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
