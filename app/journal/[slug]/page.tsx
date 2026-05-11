import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Reveal } from '@/components/ui/Reveal'

// Stand-in content store. Replace with Sanity / MDX / Shopify article connector
// before launch. The page rendering is the contract; the data shape can change.
const ENTRIES: Record<
  string,
  { tag: string; title: string; dek: string; date: string; read: number; body: string[] }
> = {
  'a-six-minute-morning': {
    tag: 'Ritual',
    title: 'A six-minute morning, written down.',
    dek: 'A founder\'s practice, broken into the smallest pieces that still feel whole.',
    date: 'Apr 2026',
    read: 4,
    body: [
      'The first thing is the kettle. Not because the tea matters — though it does — but because the kettle is loud, and the loudness is what wakes me without alarm. I learned this from a friend in Kyoto. She called it being summoned by water.',
      'The second thing is sitting down. The rule is that I cannot stand up again for six minutes. The rule is generous: I can do anything I like inside it. Read. Stare. Cry, sometimes. The rule is just that the body stays.',
      'The third thing is the journal. One sentence. The sentence does not have to be true or beautiful. The sentence has to exist. Today\'s was: the wind has stopped.',
      'The fourth thing is standing up, and remembering — as the body lifts — that this is the moment most days lose. The transition from stillness to motion. We make it small here. We notice it.',
      'That is the morning. Six minutes. It is not a practice that will appear on Instagram. It is the one I have done every day this year.',
    ],
  },
  'why-portuguese-cork': {
    tag: 'Materials',
    title: 'Why we chose Portuguese cork.',
    dek: 'A trip to Algarve, a forest that doesn\'t fall, and the eight years it takes a tree to be ready.',
    date: 'Mar 2026',
    read: 7,
    body: [
      'Cork is harvested by stripping the outer bark of a living tree. The tree is not felled. It is not even cut. A skilled harvester opens the bark with a single curved axe, peels it like a coat, and walks away. The tree exhales, regrows its bark, and is ready again in eight to nine years.',
      'I went to Algarve in October to watch this happen. The harvesters, mostly men in their fifties, wore long sleeves against the heat and worked in pairs. One man would open the bark; the other would catch the slabs. They moved slowly. They had to. A wrong cut kills the tree.',
      'A single tree yields cork for two centuries. The tree at the entrance to the cooperative had been harvested seventeen times. Its bark was thinner each time, but its trunk was thick as a horse.',
      'This is why the mat is made of cork. Not because it is fashionable. Because the supply chain is, in the literal sense of the word, sustainable: a forest in southern Europe that has stood for four hundred years and will stand for four hundred more.',
    ],
  },
  'magnesium-magnolia': {
    tag: 'Rest',
    title: 'Magnesium, magnolia, and the long sleep.',
    dek: 'A short field guide to the three plants we keep returning to, and what they\'re for.',
    date: 'Feb 2026',
    read: 5,
    body: [
      'There is no single plant that solves sleep. There are, however, three that have helped most of the people I trust most.',
      'The first is magnolia bark. It calms the part of the nervous system that prepares to leap from a tiger. Most of us, most evenings, are not running from tigers. The bark reminds the body of this.',
      'The second is passionflower. It does what chamomile pretends to do — gentle, repeating, no morning fog. We use it in the evening tonic at a third of the dose most herbalists recommend, because gentle, applied nightly, is more effective than strong, applied once.',
      'The third, technically a mineral, is magnesium glycinate. The body uses it to relax muscle. Most of us are quietly deficient. The glycinate form does not upset the stomach.',
      'These are the three. There are others. They will come, slowly, as the catalog grows.',
    ],
  },
}

export const dynamicParams = true

export async function generateStaticParams() {
  return Object.keys(ENTRIES).map((slug) => ({ slug }))
}

export default async function JournalEntry({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = ENTRIES[slug]
  if (!entry) notFound()

  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        {/* Masthead */}
        <article className="mx-auto max-w-[760px] px-6 pt-40 pb-24 lg:pt-48 lg:pb-32">
          <p className="text-[11px] uppercase tracking-wide text-mist">
            {entry.tag} · {entry.date} · {entry.read} min
          </p>
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.05] tracking-editorial lg:text-6xl">
            {entry.title}
          </h1>
          <p className="mt-8 font-display text-xl italic leading-relaxed text-smoke lg:text-2xl">
            {entry.dek}
          </p>

          {/* Lead image */}
          <div
            className="relative mt-16 aspect-[5/6] bg-bone"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg,#E2DBCB 0 18px,#d8d0bd 18px 36px)',
            }}
          />
          <p className="mt-3 text-[11px] uppercase tracking-wide text-mist">
            Photographed for Urban Yogi · 2026
          </p>

          {/* Body */}
          <Reveal>
            <div className="mt-20 space-y-7 text-lg leading-relaxed text-ink">
              {entry.body.map((p, i) => (
                <p key={i} className={i === 0 ? 'first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Sign off */}
          <div className="mt-24 border-t border-ink/15 pt-8 text-[11px] uppercase tracking-wide text-mist">
            <p>— The studio</p>
          </div>
        </article>

        {/* Related */}
        <Reveal as="section" className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-wide text-mist">More from the journal</p>
            <h2 className="mt-4 font-display text-3xl italic font-normal leading-[1.05] tracking-editorial lg:text-5xl">
              Continue reading.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
              {Object.entries(ENTRIES)
                .filter(([s]) => s !== slug)
                .slice(0, 3)
                .map(([s, e], i) => (
                  <Link key={s} href={`/journal/${s}`} className="group block">
                    <div
                      className="relative aspect-[4/5] bg-bone"
                      style={{
                        backgroundImage:
                          i % 2 === 0
                            ? 'repeating-linear-gradient(0deg,#E8E0CE 0 22px,#dccfba 22px 44px)'
                            : 'repeating-linear-gradient(135deg,#E2DBCB 0 18px,#d8d0bd 18px 36px)',
                      }}
                    />
                    <p className="mt-4 text-[11px] uppercase tracking-wide text-mist">
                      {e.tag} · {e.date}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug">{e.title}</h3>
                  </Link>
                ))}
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
