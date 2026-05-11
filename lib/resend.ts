/**
 * Resend client — server-only.
 *
 * Two transactional surfaces:
 *   1. sendContactRelay({ name, email, message }) — /contact form → studio inbox
 *   2. sendOrderConfirmation({ to, orderName, lineItems, total }) — webhook from
 *      Shopify orders/create. Shopify sends its own receipt too; ours is the
 *      brand-voiced one.
 *
 * Env required:
 *   RESEND_API_KEY                re_xxx
 *   RESEND_FROM                   "Urban Yogi <hello@urbanyogi.co>"
 *   RESEND_STUDIO_INBOX           hello@urbanyogi.co  (where /contact lands)
 */

const API = 'https://api.resend.com/emails'

function authHeaders() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY missing')
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  }
}

function from() {
  const f = process.env.RESEND_FROM
  if (!f) throw new Error('RESEND_FROM missing')
  return f
}

async function send(payload: Record<string, unknown>) {
  const res = await fetch(API, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend ${res.status}: ${body}`)
  }
  return res.json()
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

/* ─────────────────────────────────────── /contact relay ─────────────────── */

export async function sendContactRelay(opts: {
  name: string
  email: string
  message: string
}) {
  const inbox = process.env.RESEND_STUDIO_INBOX
  if (!inbox) throw new Error('RESEND_STUDIO_INBOX missing')

  return send({
    from: from(),
    to: inbox,
    reply_to: opts.email,
    subject: `urbanyogi.co · note from ${opts.name}`,
    html: `
      <div style="font-family:Manrope,system-ui,sans-serif;color:#1B1814;line-height:1.6;max-width:560px;margin:0 auto;padding:32px 16px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8A8276;">From the site</p>
        <h1 style="font-family:Newsreader,Georgia,serif;font-style:italic;font-size:32px;margin:8px 0 24px;">${escape(opts.name)} wrote in.</h1>
        <p style="white-space:pre-wrap;font-size:15px;">${escape(opts.message)}</p>
        <hr style="border:none;border-top:1px solid #E8E1D3;margin:32px 0;" />
        <p style="font-size:12px;color:#8A8276;">Reply directly — this email&apos;s reply-to is set to ${escape(opts.email)}.</p>
      </div>
    `,
  })
}

/* ─────────────────────────────────── order confirmation ─────────────────── */

export type OrderLine = { title: string; quantity: number; price: string }

export async function sendOrderConfirmation(opts: {
  to: string
  orderName: string
  lineItems: OrderLine[]
  total: string
}) {
  const rows = opts.lineItems
    .map(
      (l) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #E8E1D3;font-size:14px;">${escape(l.title)}</td>
          <td style="padding:14px 0;border-bottom:1px solid #E8E1D3;font-family:'JetBrains Mono',monospace;font-size:11px;color:#8A8276;text-align:center;">×${l.quantity}</td>
          <td style="padding:14px 0;border-bottom:1px solid #E8E1D3;font-size:14px;text-align:right;">${escape(l.price)}</td>
        </tr>`,
    )
    .join('')

  return send({
    from: from(),
    to: opts.to,
    subject: `Urban Yogi · ${opts.orderName} is on its way`,
    html: `
      <div style="font-family:Manrope,system-ui,sans-serif;color:#1B1814;line-height:1.6;max-width:560px;margin:0 auto;padding:48px 16px;background:#F2EDE4;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8A8276;">Order ${escape(opts.orderName)}</p>
        <h1 style="font-family:Newsreader,Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-.02em;margin:12px 0 32px;">Thank you<br/>for the calm.</h1>
        <p style="font-size:15px;max-width:48ch;">Your pieces are being prepared. We&apos;ll send a tracking note the moment they leave the studio.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:32px;">${rows}
          <tr>
            <td style="padding:18px 0 0;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8A8276;">Total</td>
            <td></td>
            <td style="padding:18px 0 0;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:22px;text-align:right;">${escape(opts.total)}</td>
          </tr>
        </table>
        <p style="margin-top:48px;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:18px;color:#3A332C;">— the Urban Yogi studio</p>
      </div>
    `,
  })
}
