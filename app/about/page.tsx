import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

export const metadata = {
  title: 'About — theloot',
  description:
    'An independent edit of the trending products worth knowing about. One drop, every Tuesday.',
}

const RULES = [
  {
    no: '01',
    title: 'Trending, then tested.',
    body:
      'Each pick comes off the same shortlists you’ve already seen — TikTok Shop, Amazon Movers, Reddit threads. Then we order one, use it for a week, and only list it if it earns the spot.',
  },
  {
    no: '02',
    title: 'Editorial over urgency.',
    body:
      'No countdown timers. No drop-shipping fonts. No fake reviews. Every product gets its own page — proper photography, a real write-up, and the price you’d pay anywhere else for the same item.',
  },
  {
    no: '03',
    title: 'One drop, every Tuesday.',
    body:
      'A short letter on Tuesday morning with the week’s pick. That’s the only email you’ll get from us. We don’t restock everything. We don’t chase trends back.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        {/* Statement */}
        <section className="px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">About</p>
            <h1 className="mt-4 max-w-[22ch] font-display text-5xl font-normal leading-[1.02] tracking-editorial lg:text-[88px]">
              An edit of the things <em className="italic text-clayDeep">already moving.</em>
            </h1>
            <p className="mt-12 max-w-[60ch] text-lg leading-relaxed text-smoke">
              The internet finds the next interesting product faster than any store can list it. By the time the algorithm gets one to you, it&apos;s in a fifteen-second video with bad packaging and a generic landing page. theloot is a small editorial project that picks a handful of those products each week, photographs them properly, and writes them up the way a magazine would.
            </p>
          </div>
        </section>

        {/* Manifesto — three principles */}
        <Reveal as="section" className="border-t border-ink/10 bg-paper px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">How the edit works</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-normal leading-[1.1] tracking-editorial lg:text-5xl">
              Three rules, every drop.
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
              {RULES.map((p) => (
                <article key={p.no} className="border-t border-ink/15 pt-6">
                  <span className="text-[11px] uppercase tracking-wide text-mist">{p.no}</span>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{p.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-smoke">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Honesty disclosures */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">In plain English</p>
            <h2 className="mt-4 max-w-[20ch] font-display text-3xl italic font-normal leading-[1.1] tracking-editorial lg:text-5xl">
              What we are. What we aren&apos;t.
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-mist">We are</p>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-ink">
                  <li>— A small editorial team that picks products.</li>
                  <li>— An independent shop. We fulfil through vetted manufacturing partners so we can ship globally without holding inventory.</li>
                  <li>— Transparent about pricing. The price you see is the same price the same product sells for elsewhere on the open internet.</li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-mist">We aren&apos;t</p>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-ink">
                  <li>— The manufacturer of any product listed.</li>
                  <li>— Affiliated with any brand we pick. Selections are editorial.</li>
                  <li>— A drop-shipping spam site dressed up. The whole point of this project is to not be one.</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Letter CTA */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[700px] text-center">
            <p className="text-[11px] uppercase tracking-wide text-mist">The drop</p>
            <p className="mt-6 font-display text-3xl italic font-normal leading-[1.2] tracking-editorial lg:text-5xl">
              One short email each Tuesday. The week&apos;s pick, in a sentence.
            </p>
            <div className="mt-12"><NewsletterForm variant="centered" /></div>
            <p className="mt-12 text-[11px] uppercase tracking-wide text-mist">
              <Link href="/shop">See this week&apos;s edit →</Link>
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
