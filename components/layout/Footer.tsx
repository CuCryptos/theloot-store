import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream text-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <p className="font-display text-4xl italic font-normal leading-[1.05] tracking-editorial lg:text-7xl">
          Begin again, slowly.
        </p>

        <div className="mt-20 grid grid-cols-2 gap-12 lg:grid-cols-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-mist">Shop</p>
            <ul className="mt-4 space-y-2 text-base">
              <li><Link href="/shop">All</Link></li>
              <li><Link href="/collections/sleep-rituals">Sleep</Link></li>
              <li><Link href="/collections/recovery">Recovery</Link></li>
              <li><Link href="/collections/movement">Movement</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide text-mist">Studio</p>
            <ul className="mt-4 space-y-2 text-base">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/journal">Journal</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-2">
            <p className="text-[11px] uppercase tracking-wide text-mist">Letter</p>
            <p className="mt-4 max-w-sm font-display italic text-smoke">
              One quiet email a season.
            </p>
            <div className="mt-3"><NewsletterForm /></div>
          </div>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-wide text-mist lg:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>{SITE.tagline}</span>
          <span>Mfg. with care · Printify · CJ</span>
        </div>
      </div>
    </footer>
  )
}
