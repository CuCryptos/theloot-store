import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Journal — theloot',
  description: 'Field notes on practice, materials, and rest.',
}

// Replace with CMS feed (Sanity / MDX / Shopify metaobjects) before launch.
const ENTRIES = [
  {
    slug: 'a-six-minute-morning',
    tag: 'Ritual',
    title: 'A six-minute morning, written down.',
    dek:
      'A founder\'s practice, broken into the smallest pieces that still feel whole. The pour, the breath, the one note in the journal.',
    date: 'Apr 2026',
    read: 4,
    feature: true,
    image: '/images/journal/hero-morning-ritual.jpg',
  },
  {
    slug: 'why-portuguese-cork',
    tag: 'Materials',
    title: 'Why we chose Portuguese cork.',
    dek: 'A trip to Algarve, a forest that doesn\'t fall, and the eight years it takes a tree to be ready.',
    date: 'Mar 2026',
    read: 7,
    image: '/images/journal/cork-bark.jpg',
  },
  {
    slug: 'magnesium-magnolia',
    tag: 'Rest',
    title: 'Magnesium, magnolia, and the long sleep.',
    dek: 'A short field guide to the three plants we keep returning to, and what they\'re for.',
    date: 'Feb 2026',
    read: 5,
    image: '/images/journal/sleep-tonic.jpg',
  },
  {
    slug: 'on-not-performing',
    tag: 'Practice',
    title: 'On not performing your practice.',
    dek: 'A note on Instagram yoga, the tyranny of the perfect handstand, and what the mat is actually for.',
    date: 'Jan 2026',
    read: 6,
    image: '/images/journal/empty-studio.jpg',
  },
  {
    slug: 'a-letter-to-the-evening',
    tag: 'Ritual',
    title: 'A letter to the evening.',
    dek: 'How the studio closes the day. Not a routine. A small, repeating goodbye.',
    date: 'Dec 2025',
    read: 3,
    image: '/images/journal/evening-still-life.jpg',
  },
  {
    slug: 'on-clay',
    tag: 'Materials',
    title: 'On clay, and what fire makes permanent.',
    dek: 'A morning with the kiln in Stoke-on-Trent. Three hundred years of one family\'s hands.',
    date: 'Nov 2025',
    read: 8,
    image: '/images/journal/clay-vessel.jpg',
  },
]

export default function JournalIndex() {
  const [hero, ...rest] = ENTRIES

  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        {/* Masthead */}
        <section className="px-6 pt-40 pb-12 lg:px-12 lg:pt-48 lg:pb-16">
          <div className="mx-auto flex max-w-[1100px] items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-mist">Journal · Vol. 01</p>
              <h1 className="mt-4 font-display text-5xl italic font-normal leading-[1.02] tracking-editorial lg:text-[88px]">
                Field notes.
              </h1>
            </div>
            <div className="hidden gap-6 text-[11px] uppercase tracking-wide text-mist lg:flex">
              <button className="hover:text-ink">All</button>
              <button className="hover:text-ink">Ritual</button>
              <button className="hover:text-ink">Materials</button>
              <button className="hover:text-ink">Rest</button>
              <button className="hover:text-ink">Practice</button>
            </div>
          </div>
        </section>

        {/* Featured entry */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-16 lg:px-12 lg:py-24">
          <Link
            href={`/journal/${hero.slug}`}
            className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <div className="relative aspect-[5/6] overflow-hidden bg-bone lg:col-span-7">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.01]"
              />
            </div>
            <div className="lg:col-span-5 lg:self-end">
              <p className="text-[11px] uppercase tracking-wide text-mist">
                {hero.tag} · {hero.date} · {hero.read} min
              </p>
              <h2 className="mt-4 font-display text-3xl font-normal leading-[1.1] tracking-editorial lg:text-5xl">
                {hero.title}
              </h2>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-smoke lg:text-lg">
                {hero.dek}
              </p>
              <span className="mt-8 inline-block text-[12px] underline-offset-8 hover:underline">
                Read the entry →
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Index */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">All entries</p>
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-20 lg:grid-cols-2">
              {rest.map((e, i) => (
                <Link
                  key={e.slug}
                  href={`/journal/${e.slug}`}
                  className={`group block ${i % 2 === 1 ? 'lg:mt-24' : ''}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="mt-5 text-[11px] uppercase tracking-wide text-mist">
                    {e.tag} · {e.date}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-snug">{e.title}</h3>
                  <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-smoke">{e.dek}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Letter sign-off */}
        <Reveal as="section" className="border-y border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[700px] text-center">
            <p className="font-display text-2xl italic font-normal leading-[1.3] tracking-editorial text-smoke lg:text-4xl">
              The journal arrives once a season — quietly, by post or pixel, your choice.
            </p>
            <Link
              href="/about"
              className="mt-12 inline-block text-[11px] uppercase tracking-wide text-mist hover:text-ink"
            >
              Subscribe on the about page →
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
