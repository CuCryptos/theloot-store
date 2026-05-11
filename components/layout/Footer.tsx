import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream text-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <p className="font-display text-4xl font-normal leading-[1.05] tracking-editorial lg:text-7xl">
          The trending products <em className="italic text-clayDeep">worth knowing about.</em>
        </p>

        <div className="mt-20 grid grid-cols-2 gap-12 lg:grid-cols-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-mist">Shop</p>
            <ul className="mt-4 space-y-2 text-base">
              <li><Link href="/shop">The edit</Link></li>
              <li><Link href="/shop">All products</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide text-mist">Studio</p>
            <ul className="mt-4 space-y-2 text-base">
              <li><Link href="/about">About</Link></li>
              <li><a href={`mailto:${SITE.email}`}>Contact</a></li>
            </ul>
          </div>

          <div className="col-span-2">
            <p className="text-[11px] uppercase tracking-wide text-mist">The drop</p>
            <p className="mt-4 max-w-sm font-display italic text-smoke">
              One short email each Tuesday. The week&apos;s pick, in one sentence.
            </p>
            <div className="mt-3"><NewsletterForm /></div>
          </div>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-wide text-mist lg:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>{SITE.tagline}</span>
          <span>An independent edit · all picks unaffiliated</span>
        </div>
      </div>
    </footer>
  )
}
