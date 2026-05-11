import type { RitualStep } from '@/lib/shopify-types'

export function PdpRitual({ steps }: { steps: RitualStep[] }) {
  return (
    <section className="bg-paper px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] uppercase tracking-wide text-mist">The ritual</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl italic font-normal leading-[1.05] tracking-editorial lg:text-5xl">
          How to use it well.
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.index} className="border-t border-ink/15 pt-6">
              <span className="text-[11px] uppercase tracking-wide text-mist">
                {String(s.index).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl leading-snug">{s.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-smoke">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
