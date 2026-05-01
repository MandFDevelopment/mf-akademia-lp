import { Building, Award, Layers3 } from "lucide-react"

const TRUST = [
  { icon: Building, label: "建設 BIM 25 年" },
  { icon: Award, label: "ISO 19650 認証取得" },
  { icon: Layers3, label: "エンタープライズ建設業との継続取引" },
] as const

export function SeriesIntro() {
  return (
    <section
      aria-labelledby="series-intro-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
          About
        </p>
        <h2
          id="series-intro-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
        >
          BIM 25 年の専門集団が作る、AI リスキリング研修。
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          MF-AKADEMIA は、株式会社 M&amp;F が建設 BIM コンサルティング 25 年で蓄積したノウハウをもとに、
          建設業の AI リスキリングを「役割」と「業務フェーズ」の両方から体系化したシリーズです。
          BIM / CAD のオペレーション標準化から、生産設計の AI 標準化まで、目的に合わせて選べます。
        </p>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {TRUST.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-md border border-border bg-secondary px-4 py-3 text-left text-sm text-primary"
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
