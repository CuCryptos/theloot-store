import type { MaterialEntry } from '@/lib/shopify-types'

export function PdpMaterials({ materials }: { materials: MaterialEntry[] }) {
  return (
    <section className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] uppercase tracking-wide text-mist">Materials</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-normal leading-[1.05] tracking-editorial lg:text-5xl">
          Real things, named.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
          {materials.map((m) => (
            <article key={m.label} className="border-t border-ink/15 pt-6">
              <h3 className="font-display text-xl leading-snug">{m.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke">{m.body}</p>
              {m.certification ? (
                <p className="mt-4 text-[11px] uppercase tracking-wide text-mist">
                  Cert · {m.certification}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
