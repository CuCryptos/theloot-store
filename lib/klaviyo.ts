/**
 * Klaviyo client — server-only.
 *
 * Two surfaces we use:
 *   1. subscribeToList(email, listId) — newsletter signup
 *   2. trackBackInStock(email, variantId) — PDP sold-out notify-me
 *
 * Auth is via Klaviyo's Server-side Private API key. Never import this
 * module from a client component; the key must stay server-side.
 *
 * Env required:
 *   KLAVIYO_PRIVATE_KEY           pk_xxx
 *   KLAVIYO_NEWSLETTER_LIST_ID    Klaviyo list id for the seasonal letter
 */

const API = 'https://a.klaviyo.com/api'
const REVISION = '2024-10-15'

function authHeaders() {
  const key = process.env.KLAVIYO_PRIVATE_KEY
  if (!key) throw new Error('KLAVIYO_PRIVATE_KEY missing')
  return {
    Authorization: `Klaviyo-API-Key ${key}`,
    'Content-Type': 'application/json',
    accept: 'application/json',
    revision: REVISION,
  }
}

/**
 * Subscribe an email to the seasonal letter list.
 * Uses the Profiles + Subscriptions API (single profile, double opt-in honored
 * by the list configuration in Klaviyo).
 */
export async function subscribeToList(email: string, listId?: string) {
  const list = listId ?? process.env.KLAVIYO_NEWSLETTER_LIST_ID
  if (!list) throw new Error('KLAVIYO_NEWSLETTER_LIST_ID missing')

  const res = await fetch(`${API}/profile-subscription-bulk-create-jobs/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          custom_source: 'urbanyogi.co/footer',
          profiles: {
            data: [
              {
                type: 'profile',
                attributes: {
                  email,
                  subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
                },
              },
            ],
          },
        },
        relationships: { list: { data: { type: 'list', id: list } } },
      },
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Klaviyo subscribe ${res.status}: ${body}`)
  }
  return { ok: true }
}

/**
 * Track a "Requested Back In Stock" event with the email and variant. The
 * Klaviyo flow on this event metric sends the restock notification.
 */
export async function trackBackInStock(opts: {
  email: string
  variantId: string
  productHandle: string
  productTitle: string
  variantTitle?: string
}) {
  const res = await fetch(`${API}/events/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          properties: {
            VariantID: opts.variantId,
            ProductHandle: opts.productHandle,
            ProductTitle: opts.productTitle,
            VariantTitle: opts.variantTitle ?? null,
            URL: `https://urbanyogi.co/shop/${opts.productHandle}`,
          },
          metric: { data: { type: 'metric', attributes: { name: 'Requested Back In Stock' } } },
          profile: {
            data: { type: 'profile', attributes: { email: opts.email } },
          },
        },
      },
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Klaviyo back-in-stock ${res.status}: ${body}`)
  }
  return { ok: true }
}
