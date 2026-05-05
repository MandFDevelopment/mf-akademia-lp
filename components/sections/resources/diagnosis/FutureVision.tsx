import { Briefcase, Building2, GraduationCap, Sparkles } from "lucide-react"

type FutureCardData = {
  Icon: typeof Briefcase
  audience: string
  title: string
  /** Maako 引用 (原文ママ) を 1〜2 件 */
  quotes: readonly string[]
  /** 補足の地の文 (任意) */
  body?: string
}

const FUTURE_CARDS: readonly FutureCardData[] = [
  {
    Icon: Briefcase,
    audience: "経営者",
    title: "「先が見えている」と言える顔",
    quotes: [
      "色々なフェーズや問題、マイルストーンにおいて、余裕のある次へのステップが見えてる",
      "とても生き生きした、どちらかというとかっこいい仕事できそうな顔してる。自信に満ちてる",
      "だってその先が見えてるんだもん",
    ],
    body: "「踏み出す勇気がない」のではなく「先が見えていない」だけだった経営者が、3 年で逆側に立つ。これが移行診断の最終ゴールです。",
  },
  {
    Icon: GraduationCap,
    audience: "中年代技術者",
    title: "技術者としての研鑽が、むしろ進む",
    quotes: [
      "やっとデータ思考、BIM の本当の正体、AI の正体や使い方が理解できて、むしろ更に技術者としての研鑽ができている",
    ],
    body: "AI が技術者の仕事を奪うのではなく、データ思考が体に染みた中年代技術者だからこそ、技術者としての研鑽が一段深くなる ― これが Maako の現場感覚です。",
  },
  {
    Icon: Sparkles,
    audience: "若手",
    title: "中年代では思いつかない発想で",
    quotes: [
      "中年代技術者では思いつかないようなデータ思考で、新しい技術を建設業に取り入れている",
      "他業種を巻き込み、コラボレーションで共有・共感・共創している",
    ],
    body: "若手は、中年代の劣化版ではなく別物の戦力になります。データ思考をネイティブに持つ世代が、3 つの「共」(共有・共感・共創) を業界外と回せるようになる。",
  },
  {
    Icon: Building2,
    audience: "会社全体",
    title: "AI と融合 = 確実に強くなる",
    quotes: [],
    body: "仕事の幅が広がる。受注が増える。品質が上がる。利益率が上がる。AI と融合した会社は、確実に強くなる ― これは精神論ではなく、組織の能力分布が変わることの結果です。",
  },
] as const

export function FutureVision() {
  return (
    <section
      id="future-vision"
      aria-labelledby="future-vision-heading"
      className="bg-primary py-20 text-primary-foreground sm:py-24 print:bg-transparent print:text-black"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber print:text-black">
          Section 09 / Three Years From Now
        </p>
        <h2
          id="future-vision-heading"
          className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          3 年後、貴社の経営者は「先が見えている」と言えますか
        </h2>

        {/* 短い前置き — 日本独自性 */}
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg print:text-black">
          日本でしかできない建物があります。それを支える人材を育てることに、業界としての価値があります。3 年後の貴社の姿を、職位別に描きます。
        </p>

        {/* 4 枚カード */}
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {FUTURE_CARDS.map(({ Icon, audience, title, quotes, body }) => (
            <li
              key={audience}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7 print:border-black print:bg-transparent"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-amber/15 text-brand-amber print:bg-transparent print:text-black">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber print:text-black">
                  {audience}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold leading-snug sm:text-xl">
                {title}
              </h3>

              {quotes.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {quotes.map((q) => (
                    <li
                      key={q}
                      className="border-l-4 border-brand-amber/70 pl-4 text-sm italic leading-relaxed text-white/90 sm:text-base print:border-black print:text-black"
                    >
                      「{q}」
                    </li>
                  ))}
                </ul>
              )}

              {body && (
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base print:text-black">
                  {body}
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Maakoの最後の確信 */}
        <div className="mt-14 rounded-2xl border border-brand-amber/40 bg-brand-amber/10 p-6 sm:p-8 print:border-black print:bg-transparent">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber print:text-black">
            Maako の最後の確信
          </p>
          <blockquote className="mt-4 text-xl font-semibold leading-relaxed text-white sm:text-2xl print:text-black">
            「日本の建設業でそれができる企業が出てくるかは別問題。でも僕はそう思ってる」
            <footer className="mt-3 text-xs font-normal not-italic text-white/60 print:text-black/70">
              — Maako (M&amp;F 創業者)
            </footer>
          </blockquote>

          <p className="mt-8 text-base leading-relaxed text-white/85 sm:text-lg print:text-black">
            貴社が、その第一号になりますか。
          </p>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-white/50 print:text-black/60">
          ※ 引用根拠: 第 15 章「顧客を教育する」(印刷 p.397)「ストーリーを語れ!」。3 年後の景色は、機能の説明ではなく、組織が変わった結果としての顔つきとして語る。
        </p>
      </div>
    </section>
  )
}
