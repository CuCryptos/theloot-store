export function PdpComparison({
  rows,
}: {
  rows: { feature: string; us: string; typical: string }[]
}) {
  return (
    <section className="border-t border-ink/10 px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] uppercase tracking-wide text-mist">An honest comparison</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-normal leading-[1.05] tracking-editorial lg:text-5xl">
          What sets it apart.
        </h2>

        <div className="mt-14 border-t border-ink/15">
          <div className="grid grid-cols-3 border-b border-ink/15 py-4 text-[11px] uppercase tracking-wide text-mist">
            <span>Feature</span>
            <span className="text-ink">Urban Yogi</span>
            <span>Typical</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.feature}
              className="grid grid-cols-3 items-start gap-4 border-b border-ink/10 py-6"
            >
              <span className="text-[11px] uppercase tracking-wide text-mist">{r.feature}</span>
              <span className="text-base leading-snug">{r.us}</span>
              <span className="text-sm italic text-mist">{r.typical}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
