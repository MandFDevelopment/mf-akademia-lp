import Link from "next/link"
import type { Metadata } from "next"
import { ArrowDown, ChevronLeft } from "lucide-react"
import { Nav } from "@/components/sections/Nav"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { DiagnosisQuestions } from "@/components/sections/resources/diagnosis/DiagnosisQuestions"
import { ExperienceEngineeringTrap } from "@/components/sections/resources/diagnosis/ExperienceEngineeringTrap"
import { ManagerVision } from "@/components/sections/resources/diagnosis/ManagerVision"
import { YouthVision } from "@/components/sections/resources/diagnosis/YouthVision"
import { FutureVision } from "@/components/sections/resources/diagnosis/FutureVision"

export const metadata: Metadata = {
  title: "建設業のこれから — 15 の問い | MF-AKADEMIA",
  description:
    "業界 25 年の専門集団が、貴社の現在地を 15 の問いで見つめます。スコアではなく、貴社が今どこに立っているかを率直にお伝えします。所要時間 約 3 分。",
  alternates: {
    canonical: "/resources/diagnosis",
  },
  openGraph: {
    title: "建設業のこれから — 15 の問い | MF-AKADEMIA",
    description:
      "踏み出す勇気ではない。見えていないだけ。15 のセルフチェック + 業界ビジョン。",
    url: "/resources/diagnosis",
    type: "article",
  },
}

const EXECUTIVE_EXCUSES = [
  "BIM は大手の話、2 次元 CAD で回ってる",
  "効果が見えない",
  "BIM やったけど 3 次元で見て、それで?",
  "BIM を導入することで儲かる? 儲かるならやるけど?",
  "全部他人事、自分ごとに回せない",
  "予算明細に BIM や AI などは記載がないからできない",
  "現場の中年代技術者は仕事増やされるのが嫌で抵抗",
  "新しいこと覚える暇ない",
  "誰がやってくれるの? それは安い?",
] as const

export default function DiagnosisResourcePage() {
  return (
    <>
      <Nav mode="detail" />
      <main className="bg-background">
        {/* [1] Hero */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.22),transparent_55%),linear-gradient(180deg,#070D24_0%,#0F1B3C_60%,#132554_100%)] print:hidden"
          />
          <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-brand-amber print:text-black"
            >
              <ChevronLeft className="size-4" aria-hidden />
              MF-AKADEMIA トップへ戻る
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber print:text-black">
              Resource A / Diagnosis
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              建設業のこれから — 15 の問い
              <span className="mt-3 block text-xl font-medium text-white/85 sm:text-2xl print:text-black/80">
                — 貴社はどちら側に立つか
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg print:text-black">
              <span className="font-semibold text-brand-amber print:text-black">
                踏み出す勇気ではない。見えていないだけ。
              </span>
              <br />
              業界 25 年の専門集団が、貴社の現在地を 15 の問いで見つめます。スコアではなく、貴社が今どこに立っているかを率直にお伝えします。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/60 print:text-black/70">
              <span className="rounded-full border border-white/20 px-3 py-1">
                所要時間 約 3 分
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                全 15 問
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                結果は同ページに表示
              </span>
            </div>
            <div className="mt-10 print:hidden">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href="#diagnosis" />}
                className="bg-brand-amber text-primary hover:bg-brand-amber/90"
              >
                問いに答える
                <ArrowDown className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* [2] 業界の現状 — 経営会議で出ている言葉 */}
        <section
          id="excuses"
          aria-labelledby="excuses-heading"
          className="bg-background py-20 sm:py-24"
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Section 02 / Industry Reality
            </p>
            <h2
              id="excuses-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
            >
              踏み出さない経営者の、9 つのセリフ
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground">
              これらは Maako (M&amp;F 創業者) が業界 25 年の中で、現場で繰り返し聞いてきた言葉です。皆さまの社内会議でも、いずれかが出ていないでしょうか。
            </p>

            <ol className="mt-8 space-y-3 text-sm sm:text-base">
              {EXECUTIVE_EXCUSES.map((line, i) => (
                <li key={line} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-brand-amber/50 bg-secondary font-mono text-[11px] font-semibold text-brand-amber"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <blockquote className="flex-1 border-l-2 border-border pl-4 italic text-foreground">
                    「{line}」
                  </blockquote>
                </li>
              ))}
            </ol>

            <div className="mt-10 text-center">
              <p className="text-xl font-semibold text-primary sm:text-2xl">
                こうした言葉が、貴社の経営会議で出ていませんか?
              </p>
            </div>
          </div>
        </section>

        {/* [3] 序章メッセージ — 踏み出す勇気ではない */}
        <section
          id="prologue"
          aria-labelledby="prologue-heading"
          className="bg-secondary py-20 sm:py-24"
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Section 03 / Prologue
            </p>
            <h2
              id="prologue-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
            >
              業界の最大のリスクは、人材不足ではない
            </h2>

            <blockquote className="mt-8 rounded-2xl border-l-4 border-brand-amber bg-background p-6 text-xl font-semibold leading-relaxed text-primary sm:p-8 sm:text-2xl">
              「踏み出す勇気ではなくて見えない、ただそれだけ」
            </blockquote>

            <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground">
              <p>
                業界の最大のリスクは、人材不足でも、業界全体の怠慢でもありません。経営者が
                <span className="font-semibold">「今のままで進めるしかない」と思考停止</span>
                していること ― これが本当のリスクです。新技術への投資、工業化への投資、人材育成への投資、いずれも「わかっちゃいるけど一歩踏み出せない」状態で止まっています。
              </p>
              <p>
                しかし、止まっている本当の理由は、勇気の欠如ではありません。
                <span className="font-semibold">踏み出した先がどうなるかが、見えていない</span>
                だけです。視界の問題なのです。視界が開けば判断は自動的に変わる ― これは、業界の数百社を見てきた Maako の実感です。
              </p>
              <p>
                海外勢は、踏み込まない方が良いということを、ちゃんと理解しています (日本は地震が多いから)。日本の建設業に求められる精度・段取り・品質管理は、海外の効率性優先のモデルでは届きません。だからこそ、日本の建設業は、独自の進化を遂げる必要があります。
              </p>
              <p>
                次のセクションの 15 の問いは、貴社の「視界がどこまで開いているか」を見つめるものです。スコアの高低を競うものではなく、現在地を率直に確認するためのツールです。
              </p>
            </div>
          </div>
        </section>

        {/* [4][5] セルフチェック + 結果 (インタラクティブ) */}
        <section
          id="diagnosis"
          aria-labelledby="diagnosis-heading"
          className="bg-background py-20 sm:py-24"
        >
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Section 04 / Self-Check
            </p>
            <h2
              id="diagnosis-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
            >
              15 の問い ― 貴社はどちら側か
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              4 択でお答えください。各設問は、業界 25 年の現場感覚から組み立てた経営者向けセルフチェックです。「正解」を当てるテストではなく、現状を直視するためのものです。
            </p>

            <div className="mt-10">
              <DiagnosisQuestions />
            </div>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              ※ 移行度は 20% / 40% / 60% / 80% の 4 段階で示します。100% は意図的に設けていません ― 完成は永続改善の敵だからです。
            </p>
          </div>
        </section>

        {/* [6] 経験工学の罠と希望 */}
        <ExperienceEngineeringTrap />

        {/* [7] 中年代技術者の真の仕事 */}
        <ManagerVision />

        {/* [8] 若手と業界の魅力 */}
        <YouthVision />

        {/* [9] 3年後の貴社の姿 */}
        <FutureVision />

        {/* [10] お問い合わせ CTA */}
        <section
          id="cta"
          aria-labelledby="cta-heading"
          className="bg-secondary py-20 sm:py-24 print:hidden"
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Next Step
            </p>
            <h2
              id="cta-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
            >
              先が、見えてきましたか
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              貴社の結果や、3 年後の姿について、率直に話しませんか。押し売りはしません。「踏み出した先の景色」を、もう少し鮮明にする会話のきっかけになれば幸いです。
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href="/#contact" />}
                className="bg-brand-amber text-primary hover:bg-brand-amber/90"
              >
                MF-AKADEMIA について相談する
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="/#pricing" />}
              >
                料金プランを見る
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#diagnosis" />}
              >
                もう一度答える
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
