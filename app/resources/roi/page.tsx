import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, ChevronLeft, FileSpreadsheet } from "lucide-react"
import { Nav } from "@/components/sections/Nav"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { RoiCalculator } from "@/components/sections/resources/RoiCalculator"

export const metadata: Metadata = {
  title: "BIM × AI 研修 ROI 試算ツール | MF-AKADEMIA",
  description:
    "貴社の数値を入れるだけで、設計担当者の生産性向上効果と投資対効果 (単年・3 年累計 ROI / 投資回収期間) を試算できる無料ツールです。",
  alternates: {
    canonical: "/resources/roi",
  },
  openGraph: {
    title: "ROI 試算ツール | MF-AKADEMIA",
    description:
      "貴社の数値で投資対効果を算出 — 設計担当者の年間削減工数・3 年累計 ROI を即時試算。",
    url: "/resources/roi",
    type: "article",
  },
}

const SAMPLE_CASE_INPUTS = [
  { label: "想定企業", value: "中堅建設会社" },
  { label: "設計担当者", value: "10 名" },
  { label: "1 名あたり年収", value: "¥6,000,000" },
  { label: "月間担当物件数", value: "3 件 / 月" },
  { label: "1 物件あたりページ数", value: "150 ページ" },
  { label: "1 ページ読解時間 (現状)", value: "5 分" },
  { label: "受講後の短縮率", value: "50%" },
  { label: "導入プラン", value: "Premium (¥1,020,000 / 人)" },
] as const

const SAMPLE_CASE_RESULTS = [
  { label: "年間削減工数", value: "2,250 時間 / 年" },
  { label: "金額換算 (年間)", value: "¥7,031,250 / 年" },
  { label: "投資額", value: "¥10,200,000" },
  { label: "単年 ROI", value: "−31.1 %" },
  { label: "3 年累計 ROI", value: "+106.8 %" },
  { label: "投資回収期間", value: "17.4 ヶ月" },
] as const

export default function RoiResourcePage() {
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
              Resource A / ROI Simulator
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              BIM × AI 研修 ROI 試算ツール
              <span className="mt-2 block text-xl font-medium text-white/80 sm:text-2xl print:text-black/70">
                — 貴社の数値で投資対効果を算出
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg print:text-black">
              貴社の数値を入れるだけで、設計担当者の生産性向上効果と投資対効果 (単年・3 年累計 ROI、投資回収期間) を試算できます。
            </p>
            <div className="mt-8 print:hidden">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href="#calculator" />}
                className="bg-brand-amber text-primary hover:bg-brand-amber/90"
              >
                試算ツールへ進む
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* [2] 建設業の人材コスト構造の解説 */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Background — 1
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              建設業の人材コスト構造
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground">
              <p>
                建設業における設計担当者の人件費は、他業界と比べて
                <span className="font-semibold">「経験年数による生産性の差が極端に大きい」</span>
                という特殊性を持ちます。新人と中堅で生産量が 2〜3 倍違うのは珍しくなく、人件費を時間単価で見ると、組織全体の生産性は属人的なスキル分布に強く依存します。
              </p>
              <p>
                とくに設計図の読解は、施工性の検討・特記事項の把握・取り合いの予測など、
                <span className="font-semibold">「測りにくい工数」</span>
                の典型です。表面的な作業時間としては記録に残りにくく、見積や工程表にも明示されにくいため、経営側からは「なんとなく時間がかかっている」状態として可視化されません。結果として、改善対象として議論の俎上に乗りにくい、というのが業界一般の傾向です。
              </p>
              <p>
                しかし、この「測りにくい工数」は、若手ほど時間がかかる構造のため、組織として人材を増やしても比例して生産量が伸びません。新人を採用しても戦力化までの期間が長く、その間の人件費は固定的に発生し続けます。
                <span className="font-semibold">
                  人件費は固定費に近く、生産性の差は粗利に直接ヒットする
                </span>
                — これが建設業の設計人件費の本質的な構造です。
              </p>
              <p className="text-sm text-muted-foreground">
                ※ 上記は M&amp;F の建設 BIM コンサルティング 25 年の実務経験から得られた感覚値および業界一般としての傾向です。具体的な業界統計は企業ごと地域ごとにばらつきが大きいため、本ツールでは
                <span className="font-medium">「貴社の実際の数値」</span>を入力していただく方式を採用しています。
              </p>
            </div>
          </div>
        </section>

        {/* [3] 設計図読解の業界実態 */}
        <section className="bg-secondary py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Background — 2
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              設計図読解の現場実態
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground">
              <p>
                中規模の物件で、設計図一式が
                <span className="font-semibold">100 ページを超えるのは一般的</span>
                です。意匠図・構造図・設備図に加え、特記仕様書、各種詳細図、別添資料を含めると、初見で全体把握するだけで実務者に
                <span className="font-semibold">2 日以上かかる</span>
                というのが、現場で繰り返し聞かれる感覚値です。新人や担当替えのタイミングでは、これがそのまま立ち上がりの遅延として現れます。
              </p>
              <p>
                さらに、読解スピードと精度は
                <span className="font-semibold">完全に属人化</span>
                しています。中堅以上は「どこを見れば取り合いの問題が出るか」「どの特記事項が後工程に効くか」を経験で知っているため、ページをめくる速度自体が違います。一方、新人は全ページを真面目に読みながらも、後で問題になる箇所を見落とすケースが少なくありません。OJT で先輩が一緒に読み込むコストは、組織として見ると相当な金額になります。
              </p>
              <p>
                AI スキルが入ると、この構造のうち
                <span className="font-semibold">「読解の入口」が変わります</span>
                。設計図全体の要約、特記事項の抽出、過去物件との差分比較、用語の即時検索といった作業を AI が担うことで、新人でも経験者と同じ「初手の地図」を持って読解に入れるようになります。属人的なスピード差が縮まれば、組織全体の年間工数として計上できる差が出ます。
              </p>
              <p className="text-sm text-muted-foreground">
                ※ 上記の「100 ページ / 2 日以上」は、Maako (M&amp;F 創業者) が長年の建設 BIM コンサルティングで現場から聞き取ってきた感覚値です。実際の規模・所要時間は物件規模・組織習熟度により変動します。下記の試算ツールでは、貴社固有の数値を入力して試算できます。
              </p>
            </div>
          </div>
        </section>

        {/* [4][5] 試算ツール本体 (計算機 + 結果カード) */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
                Calculator
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                あなたの会社の ROI を試算
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                左側の入力欄に貴社の数値を入れると、右側に試算結果が即時に反映されます。すべての項目はあとから変更できます。
              </p>
            </div>
            <div className="mt-10">
              <RoiCalculator />
            </div>
          </div>
        </section>

        {/* [6] 前提条件の透明な開示 */}
        <section className="bg-secondary py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Assumptions
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              前提条件と計算ロジックの開示
            </h2>
            <div className="mt-8 rounded-xl border border-border bg-background p-6 sm:p-8">
              <p className="text-base leading-relaxed text-foreground">
                本ツールは、MF-AKADEMIA 導入による効果を試算する
                <span className="font-semibold">補助ツール</span>
                です。実際の効果は貴社の組織状況・運用方針・既存スキル分布により異なります。算出結果は意思決定のための参考値としてご利用ください。
              </p>

              <h3 className="mt-8 text-base font-semibold text-primary">
                計算ロジック
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground">
                <li>
                  <span className="font-mono text-xs text-brand-amber">[1]</span>{" "}
                  時間単価 = 年収 ÷ 1,920 時間 (8h × 240 営業日)
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[2]</span>{" "}
                  年間読解工数 (1 名) = 月間担当物件数 × 1 物件読解時間 × 12
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[3]</span>{" "}
                  1 物件読解時間 = 設計図ページ数 × 1 ページあたり読解時間
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[4]</span>{" "}
                  全体の年間工数 = (1 名年間工数) × 設計担当者人数
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[5]</span>{" "}
                  削減工数 = 全体年間工数 × 短縮率
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[6]</span>{" "}
                  削減金額 = 削減工数 × 時間単価
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[7]</span>{" "}
                  投資額 = プラン単価 × 受講人数
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[8]</span>{" "}
                  単年 ROI (%) = (削減金額 − 投資額) ÷ 投資額 × 100
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[9]</span>{" "}
                  3 年累計 ROI (%) = (削減金額 × 3 − 投資額) ÷ 投資額 × 100
                </li>
                <li>
                  <span className="font-mono text-xs text-brand-amber">[10]</span>{" "}
                  投資回収期間 (月) = 投資額 ÷ 削減金額 × 12
                </li>
              </ul>

              <h3 className="mt-8 text-base font-semibold text-primary">
                短縮率の根拠
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                受講後の時間短縮率「20% / 50% / 70%」は、
                <span className="font-semibold">Maako (M&amp;F 創業者) の建設 BIM コンサルティング 25 年の実務経験に基づく仮定値</span>
                です。実際の効果は受講前の組織習熟度、AI ツールの活用度、業務プロセスの設計により大きく変動するため、保守的に試算したい場合は 20%、標準的には 50%、十分に組織に浸透した状態で 70% を目安にしてください。
              </p>

              <h3 className="mt-8 text-base font-semibold text-primary">
                助成金について
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                本ツールの「投資額」はプラン定価ベースで算出しています。人材開発支援助成金 (事業展開等リスキリング支援コース) の適用を前提とした実質負担額は、
                <Link
                  href="/v1#simulator"
                  className="text-primary underline underline-offset-2 hover:text-brand-amber"
                >
                  料金シミュレーター
                </Link>
                でご確認いただけます。
              </p>
            </div>
          </div>
        </section>

        {/* [7] 試算例 */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
              Sample Case
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              試算例: Premium プラン 10 名導入の参考ケース
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              「ツールの数値感をつかみたい」方向けに、想定中堅建設会社の試算例を 1 例だけ掲載します。
              <span className="font-semibold text-primary">これはあくまで 1 つの仮定値での例</span>
              です。貴社の実際の数値での試算は、上記のツールをご利用ください。
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary p-6">
                <h3 className="text-sm font-semibold text-primary">
                  入力した前提
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  {SAMPLE_CASE_INPUTS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3 border-b border-border pb-1.5 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="font-mono text-foreground">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-xl border border-border bg-primary p-6 text-primary-foreground print:bg-transparent print:text-black">
                <h3 className="text-sm font-semibold text-brand-amber print:text-black">
                  試算結果
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  {SAMPLE_CASE_RESULTS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-1.5 last:border-b-0 last:pb-0 print:border-black/20"
                    >
                      <dt className="text-white/70 print:text-black/70">{row.label}</dt>
                      <dd className="font-mono text-base font-semibold text-brand-amber print:text-black">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[11px] leading-relaxed text-white/60 print:text-black/60">
                  ※ 単年では投資額に届きませんが、3 年累計で投資額の約 2 倍の削減効果に達する例です。建設業の人材育成は単年回収より 2〜3 年スパンで設計するのが業界一般の考え方です。
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground print:hidden">
              ↑ これは 1 例です。{" "}
              <a
                href="#calculator"
                className="font-semibold text-primary underline underline-offset-2 hover:text-brand-amber"
              >
                貴社の数値で実際に計算する
              </a>
            </p>
          </div>
        </section>

        {/* [8] CTA */}
        <section className="bg-primary py-16 text-primary-foreground sm:py-20 print:bg-transparent print:text-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber print:text-black">
              Next Step
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              試算結果を踏まえて、次のステップへ
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base print:text-black">
              数値の前提や、貴社固有の事情を踏まえた相談は、お問い合わせフォームからお気軽にお寄せください。
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 print:hidden">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href="/#contact" />}
                className="bg-brand-amber text-primary hover:bg-brand-amber/90"
              >
                試算結果について相談する
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="/#pricing" />}
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                他のプランも比較する
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={
                  <Link href="/resources/guide" />
                }
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <BookOpen className="mr-2 size-4" />
                MF-AKADEMIA 説明資料を見る
              </Button>
            </div>

            <p className="mt-10 text-xs text-white/50 print:text-black/60">
              <FileSpreadsheet className="mr-1 inline size-3 align-text-bottom" aria-hidden />
              本ページはブラウザの「印刷 → PDF に保存」で配布用 PDF として保存できます。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
