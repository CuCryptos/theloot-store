# theloot — Headless Shopify Storefront

Sibling project to `posted-hawaii`. Same chassis, different brand.

## Stack

- **Next.js 16** (App Router, RSC)
- **React 19** + React Compiler
- **Tailwind v4** with `@config` pointing at `tailwind.config.ts`
- **TypeScript 5**
- **Shopify Storefront API** (Cart API only — no Snipcart)
- **Printify + CJ Dropshipping** as suppliers, fulfilled via Shopify

## Environment

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://theloot.co

# Shopify Storefront
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=theloot.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=

# Shopify webhooks (orders/create signs HMAC with this)
SHOPIFY_WEBHOOK_SECRET=

# Klaviyo (newsletter + back-in-stock)
KLAVIYO_PRIVATE_KEY=
KLAVIYO_NEWSLETTER_LIST_ID=

# Resend (transactional)
RESEND_API_KEY=
RESEND_FROM="theloot <hello@theloot.co>"
RESEND_STUDIO_INBOX=hello@theloot.co
```

## Folder map

```
theloot/
├─ app/
│  ├─ api/cart/route.ts          # Storefront Cart API proxy
│  ├─ collections/[handle]/      # Sleep Rituals, Recovery, etc.
│  ├─ shop/[slug]/               # PDP — the conversion surface
│  ├─ journal/[slug]/            # Editorial / SEO
│  ├─ about/                     # Founder page
│  ├─ fonts.ts                   # Newsreader · Manrope · JetBrains Mono
│  ├─ globals.css                # Tailwind v4 + reveal/marquee/drawer
│  ├─ layout.tsx                 # Wraps in <CartProvider>
│  └─ page.tsx                   # Homepage
├─ components/
│  ├─ cart/CartProvider.tsx      # 'use client' — localStorage cart id
│  ├─ cart/CartDrawer.tsx        # right-sliding drawer + free-ship meter
│  ├─ layout/Navbar.tsx          # transparent over cinema, solid on scroll
│  ├─ layout/Footer.tsx          # editorial 88px italic block
│  ├─ pdp/PdpGallery.tsx         # main image + thumbs + index counter
│  ├─ pdp/PdpBuyBox.tsx          # sticky on desktop, options + add-to-bag
│  ├─ pdp/PdpRitual.tsx          # No. 01 / 02 / 03 use guide
│  ├─ pdp/PdpMaterials.tsx       # black-bg material cards
│  ├─ pdp/PdpComparison.tsx      # honest comparison table
│  └─ ui/Reveal.tsx              # IntersectionObserver fade-up
├─ lib/
│  ├─ shopify.ts                 # Storefront API client + cart mutations
│  ├─ shopify-types.ts           # Product, Cart, ProductMetafields
│  └─ constants.ts               # NAV, FREE_SHIP_THRESHOLD, SITE
├─ tailwind.config.ts            # earth-tone palette + type variables
└─ package.json                  # mirrors posted-hawaii
```

## Brand tokens

| Role          | Hex       | Tailwind     |
|---------------|-----------|--------------|
| Primary bg    | `#F2EDE4` | `cream`      |
| Soft bg       | `#E8E1D3` | `bone`       |
| Primary text  | `#1B1814` | `ink`        |
| Secondary     | `#3A332C` | `smoke`      |
| Mono labels   | `#8A8276` | `mist`       |
| Sage          | `#8A9A7B` | `sage`       |
| Sage deep     | `#5C6B53` | `sageDeep`   |
| Terracotta    | `#B86A4C` | `terra`      |
| Gold accent   | `#B69464` | `gold`       |
| Dusty rose    | `#C49A93` | `rose`       |

Type pairing: **Newsreader** (display, italic) × **Manrope** (body) × **JetBrains Mono** (labels).

## Shopify metaobjects (required for PDP)

Create these in Shopify Admin → Settings → Custom data:

| Namespace | Key              | Type | Notes |
|-----------|------------------|------|-------|
| `uy`      | `ritual_steps`   | JSON | `[{index, title, body}, ...]` |
| `uy`      | `materials`      | JSON | `[{label, body, certification?}, ...]` |
| `uy`      | `comparison`     | JSON | `[{feature, us, typical}, ...]` |
| `uy`      | `review_summary` | JSON | `{rating, count}` |

Editor-managed; no code change to update. `getProductByHandle` parses these into `meta` alongside the product.

## Cart flow (Storefront API only)

1. `useCart().add(variantId)` POSTs to `/api/cart` with `action=add`.
2. Route handler creates a cart on first add (`cartCreate`), persists `cart.id` to `localStorage` as `uy_cart_id`.
3. `<CartDrawer>` opens; subsequent mutations target the same cart.
4. Checkout button hits `cart.checkoutUrl` — Shopify-hosted checkout closes the loop.

No Snipcart, no custom checkout. Shopify owns money.

## Dropshipping integration

Printify + CJ products sync into Shopify via their respective Shopify apps. The storefront treats them like any other product — they show up in `getProducts()`, `getCollectionByHandle()`, etc. **No special path on the storefront.** Fulfillment routing is configured in Shopify admin.

## What still needs wiring

- Real product photography (lifestyle, not on-white) — currently striped placeholders
- Logo files (4 directions in `brand/logos/`)
- Configure the Shopify webhook in Admin → Settings → Notifications → Webhooks → "Order creation" pointing at `/api/orders`, and paste the revealed secret into `SHOPIFY_WEBHOOK_SECRET`
- Create the Klaviyo metric "Requested Back In Stock" and build a flow on it for the PDP notify-me

## Server endpoints

| Route                     | Purpose                                    | Service  |
|---------------------------|--------------------------------------------|----------|
| `POST /api/cart`          | Storefront Cart API proxy (create/add/etc) | Shopify  |
| `POST /api/newsletter`    | Footer + About email capture               | Klaviyo  |
| `POST /api/back-in-stock` | PDP notify-me (sold-out variants)          | Klaviyo  |
| `POST /api/contact`       | `/contact` form → studio inbox             | Resend   |
| `POST /api/orders`        | Shopify webhook → branded order email      | Resend   |

## Smoke test

```bash
cd theloot
npm install
npm run check       # lint + typecheck + build
npm run dev
```
