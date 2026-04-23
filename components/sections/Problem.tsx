import { Clock, Users, Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PROBLEMS = [
  {
    icon: Clock,
    title: "熟練者の引退",
    body: "2030 年までに建設労働者の約 3 割が退職年齢に達すると見込まれ、現場ノウハウの継承が急務です。",
  },
  {
    icon: Users,
    title: "若手の定着難",
    body: "BIM/CAD の習得には時間がかかり、十分に戦力化する前に離職してしまうケースが増えています。",
  },
  {
    icon: Cpu,
    title: "AI 活用の遅れ",
    body: "他業界では AI 活用で生産性が 30% 前後改善する例が出る一方、建設業の導入は大きく遅れています。",
  },
] as const

export function Problem() {
  return (
    <section
      id="features"
      aria-labelledby="problem-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Problem
          </p>
          <h2
            id="problem-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            建設業の人材不足は、もう待ってくれない。
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
          「現場で、明日から使える AI スキル」を、
          <wbr />
          誰でも体系的に学べる環境が必要です。
        </p>
      </div>
    </section>
  )
}
