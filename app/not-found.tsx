import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[100dvh] items-center bg-cream text-ink">
        <div className="mx-auto max-w-[680px] px-6 text-center">
          <p className="text-[11px] uppercase tracking-wide text-mist">404 · Not found</p>
          <h1 className="mt-6 font-display text-5xl italic font-normal leading-[1.05] tracking-editorial lg:text-7xl">
            Quiet here.
          </h1>
          <p className="mt-8 max-w-[44ch] mx-auto text-base leading-relaxed text-smoke lg:text-lg">
            The page you were looking for has either moved, is being remade, or never quite existed. Either way, breathe.
          </p>
          <div className="mt-12 flex justify-center gap-6 text-[12px]">
            <Link href="/" className="underline-offset-8 hover:underline">Return home</Link>
            <span className="text-mist">·</span>
            <Link href="/shop" className="underline-offset-8 hover:underline">The shop</Link>
            <span className="text-mist">·</span>
            <Link href="/journal" className="underline-offset-8 hover:underline">The journal</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
