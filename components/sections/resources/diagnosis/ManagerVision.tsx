import { Activity, BarChart3, Brain, Compass, Zap, Eye } from "lucide-react"

const IDEAL_BEHAVIORS = [
  {
    Icon: BarChart3,
    title: "データ分析",
    body: "どこで業務が詰まっているかを数値で把握する。",
  },
  {
    Icon: Eye,
    title: "見える化",
    body: "AI に分析を投げて結果を組織内に共有する。",
  },
  {
    Icon: Compass,
    title: "技術者目線で俯瞰",
    body: "そのデータを機械・ロボットに流せるかを判断する。",
  },
  {
    Icon: Brain,
    title: "データ思考の温存",
    body: "人間しか判断できない課題を残し、そこに集中する。",
  },
  {
    Icon: Activity,
    title: "体力を残す",
    body: "重要課題に全力で取り組める環境を維持する。",
  },
  {
    Icon: Zap,
    title: "新技術評価",
    body: "広く知見を持って新しい手段を評価できる。",
  },
] as const

export function ManagerVision() {
  return (
    <section
      id="manager-vision"
      aria-labelledby="manager-vision-heading"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
          Section 07 / Mid-Career Engineers
        </p>
        <h2
          id="manager-vision-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
        >
          中年代技術者の真の仕事 ― 忙しさは、仕事ではない
        </h2>
        <p className="mt-3 text-lg font-semibold text-primary sm:text-xl">
          カッコつけないでほしい。
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground">
          <p>
            業界の中年代技術者 (物件マネージャー・所長・設計担当) が今、最も陥っている罠は、「いつも忙しい」状態を仕事だと勘違いすることです。実際には、自分で仕事を回している証ではなく、部下が自走できる仕掛けを作れていないだけ ― という構造が多くあります。
          </p>
        </div>

        <blockquote className="mt-8 border-l-4 border-brand-amber bg-background p-5 italic text-primary">
          「いつも忙しい。それは自分で仕事を回してると勘違いしてて、もっと部下が自走できるような仕掛けが必要だと感じる」
        </blockquote>

        <h3 className="mt-12 text-lg font-semibold text-primary">
          理想の振る舞い 6 項目
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          中年代技術者が「省人マネジメント」できる組織は、これらを当たり前に回しています。
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {IDEAL_BEHAVIORS.map(({ Icon, title, body }, i) => (
            <li
              key={title}
              className="flex gap-4 rounded-xl border border-border bg-background p-5"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <div className="text-xs font-mono text-brand-amber">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-primary sm:text-base">
                  {title}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 space-y-5 text-base leading-relaxed text-foreground">
          <p>
            一方、現実に多くの組織で起きているのは、「忙しい理由を整理しない」連鎖です。整理しないからさらに忙しくなり、見える化を後回しにしているうちに、若手の質問に「とにかくやれ」「自分で考えろ」で済ます ― この応答が、組織の生産性の天井を作っています。
          </p>
        </div>

        <blockquote className="mt-6 border-l-4 border-brand-amber bg-background p-5 italic text-primary">
          「忙しい理由を整理しない。逆に混乱していることを分析してほしい。そしてそれを見える化してみんなに評価してもらってほしい。そのくらいカッコつけないでほしい」
        </blockquote>

        <blockquote className="mt-4 border-l-4 border-destructive/60 bg-background p-5 italic text-destructive">
          「わからないで済ます部下への回答がどれほど愚かなことか」
        </blockquote>
      </div>
    </section>
  )
}
