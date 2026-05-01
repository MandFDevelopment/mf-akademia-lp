import Link from "next/link"
import { ArrowRight, Layers3, Sparkles } from "lucide-react"

type SeriesCard = {
  href: string
  eyebrow: string
  title: string
  tagline: string
  badges: readonly string[]
  icon: typeof Layers3
}

const CARDS: readonly SeriesCard[] = [
  {
    href: "/v1",
    eyebrow: "第1弾",
    title: "BIM × CAD × AI 編",
    tagline:
      "Revit / AutoCAD のオペレーションと AI 連携を、レベル × ツール × 役割の 3 軸で体系化。",
    badges: ["432 本", "総尺 136 時間", "36 トラック構成"],
    icon: Layers3,
  },
  {
    href: "/v3",
    eyebrow: "第3弾",
    title: "AI × 生産設計 編",
    tagline:
      "生産設計の業務フローを 6 Phase に分解し、設計図の読み解きから納品ナレッジ化まで AI で標準化。",
    badges: ["約 290 本", "総尺 約 65 時間", "6 Phase 構成"],
    icon: Sparkles,
  },
]

export function SeriesLineup() {
  return (
    <section
      id="series"
      aria-labelledby="series-heading"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Lineup
          </p>
          <h2
            id="series-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            シリーズ ラインナップ
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            「役割の標準化」と「業務フェーズの標準化」、目的に合わせて選択できる 2 つのコース。
            並列受講・組み合わせも可能です。
          </p>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {CARDS.map(({ icon: Icon, ...card }) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-background p-7 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">
                    {card.eyebrow}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-primary sm:text-[26px]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {card.tagline}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {card.badges.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-primary"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-brand-amber">
                    詳細を見る
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          ※ 第1弾と第3弾は並列販売中。助成金スキーム・お問い合わせ窓口は両商品共通です。
        </p>
      </div>
    </section>
  )
}
