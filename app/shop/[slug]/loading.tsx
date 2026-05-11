import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SkeletonBlock, SkeletonLine } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">
        <section className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Gallery skeleton */}
          <div className="px-6 pt-32 lg:px-0 lg:pt-0">
            <SkeletonBlock aspect="aspect-[4/5]" className="lg:aspect-auto lg:h-[100dvh]" />
          </div>
          {/* Buy box skeleton */}
          <div className="px-6 py-16 lg:px-12 lg:py-20">
            <div className="space-y-4">
              <SkeletonLine width="w-16" height="h-2.5" />
              <SkeletonLine width="w-3/4" height="h-12" />
              <SkeletonLine width="w-16" height="h-3" className="!mt-6" />
              <SkeletonLine width="w-1/2" height="h-2.5" />
            </div>
            <div className="mt-10 space-y-3">
              <SkeletonLine width="w-full max-w-md" height="h-3" />
              <SkeletonLine width="w-5/6 max-w-md" height="h-3" />
              <SkeletonLine width="w-2/3 max-w-md" height="h-3" />
            </div>
            <div className="mt-12 space-y-4">
              <SkeletonLine width="w-12" height="h-2.5" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonLine key={i} width="w-16" height="h-9" />
                ))}
              </div>
            </div>
            <SkeletonLine width="w-full" height="h-14" className="!mt-10" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
