import { Award, Globe, Layers3, Wrench, Building, Users2 } from "lucide-react"

const RECORDS = [
  { icon: Building, title: "建設 BIM コンサルティング 25 年の実績" },
  { icon: Award, title: "ISO 19650 認証取得" },
  { icon: Users2, title: "Autodesk University (AU2020) 登壇実績" },
  { icon: Layers3, title: "エンタープライズ建設業との継続取引" },
  {
    icon: Globe,
    title: "国内外 4 拠点 (日本 / ベトナム / 中国 / フィリピン) 約 94 名体制",
  },
  { icon: Wrench, title: "Revit / AutoCAD / Dynamo 独自アドインの開発・提供" },
] as const

export function Company() {
  return (
    <section
      aria-labelledby="company-heading"
      className="bg-primary py-20 text-primary-foreground sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Company
          </p>
          <h2
            id="company-heading"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            建設 BIM 25 年の専門集団が作った研修
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            株式会社 M&amp;F は、BIM / CAD / AI を軸にした建設 DX 支援を、
            日本・ベトナム・中国・フィリピンの 4 拠点体制でご提供しています。
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECORDS.map(({ icon: Icon, title }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-amber text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="pt-1.5 text-sm leading-relaxed">{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
