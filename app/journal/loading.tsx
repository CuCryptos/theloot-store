import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SkeletonBlock, SkeletonLine } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        <section className="px-6 pt-40 pb-12 lg:px-12 lg:pt-48 lg:pb-16">
          <div className="mx-auto max-w-[1100px] space-y-4">
            <SkeletonLine width="w-32" height="h-2.5" />
            <SkeletonLine width="w-1/2 max-w-[12ch]" height="h-14" />
          </div>
        </section>
        <section className="border-t border-ink/10 px-6 py-16 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <SkeletonBlock aspect="aspect-[5/6]" className="lg:col-span-7" />
            <div className="space-y-4 lg:col-span-5 lg:self-end">
              <SkeletonLine width="w-32" height="h-2.5" />
              <SkeletonLine width="w-3/4" height="h-10" />
              <SkeletonLine width="w-full" height="h-3" className="!mt-6" />
              <SkeletonLine width="w-5/6" height="h-3" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
