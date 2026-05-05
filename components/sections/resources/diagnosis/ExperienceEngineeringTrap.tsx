import { ArrowDown } from "lucide-react"

const FLOW = [
  {
    step: "配筋情報",
    desc: "現場で発生するナレッジ",
  },
  {
    step: "AI で整理",
    desc: "データ抽出・分類・要約",
  },
  {
    step: "Excel 完成",
    desc: "「ハイ、答え出ました」",
  },
] as const

export function ExperienceEngineeringTrap() {
  return (
    <section
      id="experience-trap"
      aria-labelledby="experience-trap-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
          Section 06 / Experience Engineering
        </p>
        <h2
          id="experience-trap-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
        >
          経験工学の罠と希望 ― なぜ MF-AKADEMIA が必要か
        </h2>

        <p className="mt-6 text-base leading-relaxed text-foreground">
          建築は経験工学です。これは Maako の確信であり、業界の本質であり、最大の敵でもあります。AI とデータ思考だけで建設業が変わると考えると、必ずどこかで裏切られます。一方で、経験だけに頼り続けると、若手は永遠に立ち上がりません。両方が要るのです。
        </p>

        {/* AI エンジニアの罠 — フロー図 */}
        <div className="mt-10 rounded-2xl border border-border bg-secondary p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-primary">
            よくある「AI エンジニアの罠」
          </h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {FLOW.map((node) => (
              <div
                key={node.step}
                className="rounded-xl border border-border bg-background p-4 text-center"
              >
                <div className="font-mono text-[11px] uppercase tracking-wider text-brand-amber">
                  {node.step}
                </div>
                <div className="mt-1 text-sm font-medium text-primary">
                  {node.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-4 flex w-fit items-center gap-2 text-muted-foreground">
            <ArrowDown className="size-4" aria-hidden />
            <span className="text-xs">しかし</span>
          </div>

          <div className="mt-4 rounded-xl border border-destructive/30 bg-background p-5 text-center text-sm leading-relaxed text-foreground">
            配筋を見たことがない技術者は、その Excel を見ても
            <br className="hidden sm:inline" />
            「現場で何が起きるか」を想像できない。
          </div>

          <div className="mx-auto mt-4 flex w-fit items-center gap-2 text-muted-foreground">
            <ArrowDown className="size-4" aria-hidden />
            <span className="text-xs">結果</span>
          </div>

          <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-center text-base font-semibold text-destructive">
            AI の出力が、現場で活きない。
          </div>
        </div>

        <blockquote className="mt-8 border-l-4 border-brand-amber bg-secondary/50 p-5 italic text-primary">
          「AI エンジニアが良かれと思って作ったけど、現場でなにも役に立たないものを作った、というイメージ」
          <footer className="mt-2 text-xs not-italic text-muted-foreground">
            — Maako (M&amp;F 創業者) 取材より
          </footer>
        </blockquote>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground">
          <p>
            <span className="font-semibold">建築は経験工学</span>
            ― この一文が意味するのは、答えだけ出してもダメで、答えを見て「現場の絵」が頭に浮かぶ人間が必要だということです。経験工学の本質は、答えを見て、現場の絵が浮かぶ能力にあります。
          </p>
          <p>
            では、経験ある人材を残し続ければ良いかというと、それも行き詰まっています。背中で覚えろ文化のままでは、若手は育つ前に辞めます。経験は要らなくならない。しかし、経験の習得スピードは数倍にできる ― これが MF-AKADEMIA の存在意義です。
          </p>
          <p>
            AI を使うエンジニアではなく、
            <span className="font-semibold">経験ある建築屋が AI 教育を設計する</span>
            。これは業界では非常に珍しい組み立てです。だから、答えを出すだけのツールにならず、現場で活きる人材を作るカリキュラムになります。
          </p>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          ※ 引用根拠: 第 7 章「USP」(印刷 p.230-232)「USP はひとつの文章で表現するのが理想的」。MF-AKADEMIA の USP は、機能の列挙ではなく「経験ある建築屋が設計した AI 教育」という単一の特異性に集約されます。
        </p>
      </div>
    </section>
  )
}
