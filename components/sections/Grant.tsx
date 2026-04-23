import { Percent, User, Building2 } from "lucide-react"

const PILLARS = [
  {
    icon: Percent,
    title: "経費助成率 3/4",
    body: "中小企業の場合、訓練実施にかかる経費を最大 3/4 助成。大企業は 3/5。",
  },
  {
    icon: User,
    title: "1 人あたり上限 72 万円",
    body: "訓練時間数に応じた賃金助成とは別に、1 人あたり最大 72 万円まで経費助成の対象に。",
  },
  {
    icon: Building2,
    title: "1 事業所 年間 1 億円",
    body: "同一事業所・同一年度での経費助成の合計上限。大規模展開でもスケールメリットが得られます。",
  },
] as const

const STEPS = [
  {
    title: "訓練実施計画届を労働局へ提出",
    body: "訓練開始の 1 ヶ月前までに労働局へ計画届を提出。当社で書類作成をサポートします。",
  },
  {
    title: "契約・研修費のお支払い",
    body: "ご契約・請求書発行。支払い実績が助成金の対象要件となります。",
  },
  {
    title: "研修受講 (通常 3 ヶ月)",
    body: "受講者は期間内に所定のトラックを受講。受講履歴は助成金申請時のエビデンスになります。",
  },
  {
    title: "支給申請",
    body: "受講完了後、所定の様式で支給申請書類を労働局へ提出。こちらも当社でサポート可能。",
  },
  {
    title: "助成金受給",
    body: "申請から通常 3〜4 ヶ月で労働局より助成金が支給されます。",
  },
] as const

export function Grant() {
  return (
    <section
      id="grant"
      aria-labelledby="grant-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Grant
          </p>
          <h2
            id="grant-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            人材開発支援助成金について
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            事業展開等リスキリング支援コース — 2027 年 3 月までの時限措置
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-primary">助成の仕組み</h3>
            <ul className="mt-4 space-y-4">
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-lg border border-border bg-background p-5"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-semibold text-primary">{title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary">
              受給までの流れ
            </h3>
            <ol className="mt-4 space-y-0">
              {STEPS.map((step, idx) => (
                <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {idx < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[17px] top-9 h-full w-px bg-border"
                    />
                  )}
                  <span className="relative z-[1] inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                    {idx + 1}
                  </span>
                  <div className="pt-1">
                    <div className="font-semibold text-primary">{step.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-3xl rounded-lg border-l-4 border-brand-amber bg-secondary p-5 text-sm leading-relaxed text-primary sm:text-base">
          計画申請から受給まで通常 8〜12 ヶ月。当社で申請サポートも承ります。受給が確実なものではないため、実際の受給可否は労働局の審査によります。
        </p>
      </div>
    </section>
  )
}
