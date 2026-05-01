import { FileSearch, AlertTriangle, Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PROBLEMS = [
  {
    icon: FileSearch,
    title: "100 ページの読み込みに 2 日",
    body: "設計図書 100 ページの読み込みに、毎回 2 日かかる。プロジェクト初日に与件全体を把握しきれないまま、後追いで仕様を追いかけている。",
  },
  {
    icon: AlertTriangle,
    title: "特記事項の見落とし",
    body: "特記事項の見落としで、後工程に手戻りが発生する。仕様書の隅に書かれた条件が、出図後に問題化するパターンが減らない。",
  },
  {
    icon: Cpu,
    title: "AI を生産設計に活かせない",
    body: "AI を使いたいが、生産設計の現場では何から始めればいいか分からない。ChatGPT を触ってはみたが、実務に組み込む手前で止まっている。",
  },
] as const

export function Problem() {
  return (
    <section
      id="features"
      aria-labelledby="problem-heading-v3"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Problem
          </p>
          <h2
            id="problem-heading-v3"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            生産設計の現場で、繰り返されている 3 つの痛点。
          </h2>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Card className="h-full border-border shadow-none">
                <CardHeader className="pb-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="mt-4 text-lg text-primary">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {body}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 max-w-3xl rounded-lg border-l-4 border-brand-amber bg-secondary p-6 text-center text-base leading-relaxed text-primary sm:text-lg">
          「AI で、生産設計を標準化する」を、
          <wbr />
          実務シーン単位で学べる講座を作りました。
        </p>
      </div>
    </section>
  )
}
