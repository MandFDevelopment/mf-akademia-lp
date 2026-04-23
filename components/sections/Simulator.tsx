"use client"

import { useMemo, useState } from "react"
import { Calculator, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  PLANS,
  calcQuote,
  formatJpy,
  formatWan,
  getPlan,
  type PlanId,
} from "@/lib/pricing"
import { writeSimulatorShare } from "@/lib/simulator-share"

const MIN_HEADCOUNT = 1
const MAX_HEADCOUNT = 500

export function Simulator() {
  const [planId, setPlanId] = useState<PlanId>("Standard")
  const [headcountInput, setHeadcountInput] = useState<string>("10")

  const headcount = useMemo(() => {
    const n = Number.parseInt(headcountInput, 10)
    if (!Number.isFinite(n) || n < MIN_HEADCOUNT) return MIN_HEADCOUNT
    if (n > MAX_HEADCOUNT) return MAX_HEADCOUNT
    return n
  }, [headcountInput])

  const plan = getPlan(planId)
  const quote = useMemo(() => calcQuote(plan, headcount), [plan, headcount])

  const handleConsult = () => {
    writeSimulatorShare({ plan: planId, headcount })
  }

  return (
    <section
      id="simulator"
      aria-labelledby="simulator-heading"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Simulator
          </p>
          <h2
            id="simulator-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            お見積もり試算
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            プランと受講人数を選ぶと、助成金 (中小企業 3/4) 適用後の
            <span className="font-medium text-primary">実質負担額</span>
            を即時に算出します。
          </p>
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <Label className="text-sm font-semibold text-primary">
                プランを選択
              </Label>
              <RadioGroup
                value={planId}
                onValueChange={(v) => setPlanId(v as PlanId)}
                className="mt-3 space-y-2"
              >
                {PLANS.map((p) => (
                  <label
                    key={p.id}
                    htmlFor={`sim-${p.id}`}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors hover:border-primary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <RadioGroupItem
                      value={p.id}
                      id={`sim-${p.id}`}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-primary">{p.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatWan(p.price)} / 人
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {p.tracks} トラック / {p.hours} 時間
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label
                htmlFor="sim-headcount"
                className="text-sm font-semibold text-primary"
              >
                受講人数 ({MIN_HEADCOUNT}〜{MAX_HEADCOUNT})
              </Label>
              <div className="mt-3 flex items-center gap-3">
                <Input
                  id="sim-headcount"
                  type="number"
                  inputMode="numeric"
                  min={MIN_HEADCOUNT}
                  max={MAX_HEADCOUNT}
                  value={headcountInput}
                  onChange={(e) => setHeadcountInput(e.target.value)}
                  onBlur={() => setHeadcountInput(String(headcount))}
                  className="w-32 text-right text-lg font-semibold"
                />
                <span className="text-sm text-muted-foreground">名</span>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col justify-between rounded-xl bg-primary p-6 text-primary-foreground sm:p-7">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Calculator className="size-4" aria-hidden />
                <span>試算結果 ({plan.name} × {headcount} 名)</span>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                  <dt className="text-white/70">定価合計</dt>
                  <dd className="font-mono text-base">¥{formatJpy(quote.list)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                  <dt className="text-white/70">助成金受給額 (3/4)</dt>
                  <dd className="font-mono text-base text-brand-amber">
                    − ¥{formatJpy(quote.grant)}
                  </dd>
                </div>
              </dl>

              <div>
                <div className="text-xs uppercase tracking-wider text-white/60">
                  実質負担額
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-brand-amber sm:text-4xl">
                    ¥{formatJpy(quote.net)}
                  </span>
                </div>
                {!quote.grantCapped && (
                  <div className="mt-1 text-xs text-white/60">
                    1 人あたり ¥{formatJpy(Math.round(quote.net / headcount))}
                  </div>
                )}
              </div>

              {quote.grantCapped && (
                <p className="rounded-md border border-brand-amber/40 bg-brand-amber/10 p-3 text-xs text-brand-amber">
                  ※ 1 事業所・年度あたり助成金の上限 1 億円に達したため、上限額で試算しています。
                </p>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <Button
                size="lg"
                nativeButton={false}
                onClick={handleConsult}
                render={<a href="#contact" />}
                className="w-full bg-brand-amber text-primary hover:bg-brand-amber/90"
              >
                この見積もりで相談する
                <ArrowDown className="ml-2 size-4" />
              </Button>
              <p className="text-[11px] leading-relaxed text-white/50">
                ※ 試算値は中小企業 (経費助成率 3/4) を前提にした目安です。実際の助成額は計画内容・受講実績により変動します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
