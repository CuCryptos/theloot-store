/**
 * IngredientGrid — 4-column macro-imagery card grid.
 * "Naturally Powerful Ingredients"-style.
 */
import type { IngredientCard } from '@/lib/pdp-types'

type Props = {
  title?: string
  sub?: string
  items: IngredientCard[]
}

export function IngredientGrid({ title, sub, items }: Props) {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-editorial text-ink">
            {title ?? 'Built from the right things, in the right places.'}
          </h2>
          {sub ? (
            <p className="max-w-md text-base leading-relaxed text-smoke">
              {sub}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((card, i) => (
            <article
              key={`${card.label}-${i}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-bone">
                {card.image_url ? (
                  <img
                    src={card.image_url}
                    alt={card.label}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : null}
              </div>
              <h3 className="mt-5 font-display text-xl tracking-editorial text-ink">
                {card.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-smoke">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
