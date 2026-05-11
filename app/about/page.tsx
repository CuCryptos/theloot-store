import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

export const metadata = {
  title: 'About — theloot',
  description:
    'A small studio building yoga, recovery, and ritual objects for an unhurried life.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        {/* Statement */}
        <section className="px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">About · Vol. 01</p>
            <h1 className="mt-4 max-w-[20ch] font-display text-5xl font-normal leading-[1.02] tracking-editorial lg:text-[88px]">
              We make a small <em className="italic text-clayDeep">number</em> of careful things.
            </h1>
            <p className="mt-12 max-w-[60ch] text-lg leading-relaxed text-smoke">
              theloot is a studio of three. We design objects for the practice of slowing down — yoga mats, sleep tonics, ritual vessels. Each one is made on order in partnership with workshops we've personally vetted, then sent quietly to your door.
            </p>
          </div>
        </section>

        {/* Founder portrait + story */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                <Image
                  src="/images/about/founder-portrait.jpg"
                  alt="Founder portrait — three-quarter profile against cream plaster, soft window light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-wide text-mist">
                Mira Aoki, founder · Brooklyn, 2024
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-wide text-mist">Origin</p>
              <h2 className="mt-4 max-w-[20ch] font-display text-3xl italic font-normal leading-[1.1] tracking-editorial lg:text-5xl">
                It began with a borrowed mat.
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-smoke lg:text-lg">
                <p>
                  In the winter of 2021, Mira was a textile designer who couldn't sleep. A friend lent her a cork mat — heavy, fragrant, slightly warm to the touch — and the practice that followed felt different. The object had a presence the plastic mats didn't. It asked something of her.
                </p>
                <p>
                  That mat became the first thing we made — a re-engineered version of it, sourced directly from a Portuguese cooperative whose family had harvested cork for four generations. From there came the tonics, the bolsters, the diffusers. Each one solving a small piece of the same question: what does a life of practice feel like at home?
                </p>
                <p>
                  The studio is still three people. We will not grow much. The objects will.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pillars — three principles */}
        <Reveal as="section" className="border-t border-ink/10 bg-paper px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">What we hold</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-3xl font-normal leading-[1.1] tracking-editorial lg:text-5xl">
              Three things, every time.
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
              {[
                {
                  no: '01',
                  title: 'Made on order.',
                  body: 'Nothing is warehoused. Every object is produced when you ask for it — in partnership with Printify and CJ workshops we audit twice a year. The wait is part of the practice.',
                },
                {
                  no: '02',
                  title: 'Materials, named.',
                  body: 'The cork comes from Algarve. The linen from Lithuania. The clay from a single kiln in Stoke-on-Trent. We will tell you exactly where it comes from. That should be normal; it isn\'t.',
                },
                {
                  no: '03',
                  title: 'Quiet over loud.',
                  body: 'No drops. No urgency timers. No "buy now, you deserve it." Two emails a season. One catalog a year. We trust you to find your way back.',
                },
              ].map((p) => (
                <article key={p.no} className="border-t border-ink/15 pt-6">
                  <span className="text-[11px] uppercase tracking-wide text-mist">{p.no}</span>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{p.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-smoke">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Partners — supply chain */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">Partners</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-3xl italic font-normal leading-[1.1] tracking-editorial lg:text-5xl">
              The hands behind the objects.
            </h2>
            <div className="mt-14 border-t border-ink/15">
              {[
                { name: 'Coopérativa do Algarve',  what: 'Cork mats and accessories', where: 'Algarve, Portugal' },
                { name: 'Linum Estonia',           what: 'Linen blankets and bolsters', where: 'Tallinn, Estonia' },
                { name: 'Maple & Salt Apothecary', what: 'Tinctures and tonics',         where: 'Hudson, New York' },
                { name: 'Stoke Studio Ceramics',   what: 'Cups, vessels, diffusers',     where: 'Stoke-on-Trent, UK' },
              ].map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-1 gap-2 border-b border-ink/10 py-6 lg:grid-cols-3"
                >
                  <span className="font-display text-xl">{p.name}</span>
                  <span className="text-base text-smoke">{p.what}</span>
                  <span className="text-[11px] uppercase tracking-wide text-mist lg:text-right">
                    {p.where}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Letter CTA */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[700px] text-center">
            <p className="text-[11px] uppercase tracking-wide text-mist">A quiet letter</p>
            <p className="mt-6 font-display text-3xl italic font-normal leading-[1.2] tracking-editorial lg:text-5xl">
              One email a season. Mostly journal entries. Occasionally an object.
            </p>
            <div className="mt-12"><NewsletterForm variant="centered" /></div>
            <p className="mt-12 text-[11px] uppercase tracking-wide text-mist">
              <Link href="/journal">Read the journal first →</Link>
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
