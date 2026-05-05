"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PLANS, getPlan, type PlanId } from "@/lib/pricing/v1"
import { trackEvent } from "@/lib/analytics"
import { RoiResultCards, type RoiResult } from "./RoiResultCards"

const HOURS_PER_YEAR = 1_920 // 8h × 240日 (時間単価算出基準)

const REDUCTION_OPTIONS = [
  { value: 0.2, label: "20%" },
  { value: 0.5, label: "50%" },
  { value: 0.7, label: "70%" },
] as const

type SliderRowProps = {
  id: string
  label: string
  hint?: string
  min: number
  max: number
  step: number
  unit: string
  value: number
  format?: (v: number) => string
  onChange: (next: number) => void
}

function SliderRow({
  id,
  label,
  hint,
  min,
  max,
  step,
  unit,
  value,
  format,
  onChange,
}: SliderRowProps) {
  const display = format ? format(value) : String(value)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-semibold text-primary">
          {label}
        </Label>
        <span className="text-sm font-mono text-primary">
          <span className="text-base font-semibold">{display}</span>{" "}
          <span className="text-muted-foreground">{unit}</span>
        </span>
      </div>
      {hint && (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand-amber print:hidden"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground print:hidden">
        <span>
          {format ? format(min) : min} {unit}
        </span>
        <span>
          {format ? format(max) : max} {unit}
        </span>
      </div>
    </div>
  )
}

export function RoiCalculator() {
  const [headcount, setHeadcount] = useState(10)
  const [salary, setSalary] = useState(6_000_000)
  const [monthlyProjects, setMonthlyProjects] = useState(3)
  const [pagesPerProject, setPagesPerProject] = useState(150)
  const [minutesPerPage, setMinutesPerPage] = useState(5)
  const [reduction, setReduction] = useState<number>(0.5)
  const [planId, setPlanId] = useState<PlanId>("Standard")

  const plan = getPlan(planId)

  const result = useMemo<RoiResult>(() => {
    const hoursPerYearPerPerson =
      (monthlyProjects * pagesPerProject * minutesPerPage * 12) / 60
    const totalHoursPerYear = hoursPerYearPerPerson * headcount
    const hourlyRate = salary > 0 ? salary / HOURS_PER_YEAR : 0
    const totalJpyPerYear = totalHoursPerYear * hourlyRate

    const hoursSavedPerYear = totalHoursPerYear * reduction
    const jpySavedPerYear = totalJpyPerYear * reduction

    const investmentJpy = plan.price * headcount

    const roiYear1Pct =
      investmentJpy > 0 ? ((jpySavedPerYear - investmentJpy) / investmentJpy) * 100 : 0
    const roi3yPct =
      investmentJpy > 0
        ? ((jpySavedPerYear * 3 - investmentJpy) / investmentJpy) * 100
        : 0
    const paybackMonths =
      jpySavedPerYear > 0 ? (investmentJpy / jpySavedPerYear) * 12 : Number.POSITIVE_INFINITY

    return {
      hoursSavedPerYear,
      jpySavedPerYear,
      investmentJpy,
      roiYear1Pct,
      roi3yPct,
      paybackMonths,
    }
  }, [
    headcount,
    salary,
    monthlyProjects,
    pagesPerProject,
    minutesPerPage,
    reduction,
    plan.price,
  ])

  // resource_view (once on mount)
  const viewSentRef = useRef(false)
  useEffect(() => {
    if (viewSentRef.current) return
    viewSentRef.current = true
    trackEvent("resource_view", { name: "roi" })
  }, [])

  // roi_calculator_used (once after first interaction)
  const usedSentRef = useRef(false)
  // roi_param_changed (debounced 600ms per change burst)
  const lastChangedParamRef = useRef<string | null>(null)
  const isInitialMountRef = useRef(true)

  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      return
    }
    if (!usedSentRef.current) {
      usedSentRef.current = true
      trackEvent("roi_calculator_used", {})
    }
    const param = lastChangedParamRef.current
    if (!param) return
    const timer = window.setTimeout(() => {
      trackEvent("roi_param_changed", { param_name: param })
      lastChangedParamRef.current = null
    }, 600)
    return () => window.clearTimeout(timer)
  }, [headcount, salary, monthlyProjects, pagesPerProject, minutesPerPage, reduction, planId])

  const onParamChange = <T,>(name: string, setter: (v: T) => void) =>
    (next: T) => {
      lastChangedParamRef.current = name
      setter(next)
    }

  const handleConsult = () => {
    trackEvent("resource_cta_click", {
      resource: "roi",
      target: "contact",
      plan: planId,
      headcount,
    })
  }

  const yenFmt = (n: number) => `¥${n.toLocaleString("ja-JP")}`
  const monthlyFmt = (n: number) =>
    Number.isInteger(n) ? String(n) : n.toFixed(1)

  return (
    <div
      id="calculator"
      className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Calculator className="size-4 text-brand-amber" aria-hidden />
            貴社の数値を入力
          </div>

          <SliderRow
            id="roi-headcount"
            label="設計担当者の人数"
            min={1}
            max={500}
            step={1}
            unit="名"
            value={headcount}
            onChange={onParamChange<number>("headcount", setHeadcount)}
          />

          <div>
            <Label
              htmlFor="roi-salary"
              className="text-sm font-semibold text-primary"
            >
              設計担当者の年収 (1 名あたり)
            </Label>
            <div className="mt-2 flex items-center gap-3 print:hidden">
              <Input
                id="roi-salary"
                type="number"
                inputMode="numeric"
                min={1_000_000}
                max={20_000_000}
                step={100_000}
                value={salary}
                onChange={(e) => {
                  const v = Number.parseInt(e.target.value, 10)
                  if (Number.isFinite(v)) {
                    onParamChange<number>("salary", setSalary)(v)
                  }
                }}
                className="w-44 text-right font-mono text-base"
              />
              <span className="text-sm text-muted-foreground">円 / 年</span>
            </div>
            <div className="mt-2 hidden text-sm text-primary print:block">
              {yenFmt(salary)} / 年
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              時間単価は「年収 ÷ 1,920 時間 (8h × 240 日)」で算出します。
            </p>
          </div>

          <SliderRow
            id="roi-monthly"
            label="月間担当物件数 (1 名あたり)"
            min={0.5}
            max={10}
            step={0.5}
            unit="件 / 月"
            value={monthlyProjects}
            format={monthlyFmt}
            onChange={onParamChange<number>("monthly_projects", setMonthlyProjects)}
          />

          <SliderRow
            id="roi-pages"
            label="1 物件あたり設計図ページ数"
            min={50}
            max={500}
            step={10}
            unit="ページ"
            value={pagesPerProject}
            onChange={onParamChange<number>("pages_per_project", setPagesPerProject)}
          />

          <SliderRow
            id="roi-mins"
            label="1 ページあたり読解時間 (現状)"
            min={2}
            max={10}
            step={1}
            unit="分 / ページ"
            value={minutesPerPage}
            onChange={onParamChange<number>("minutes_per_page", setMinutesPerPage)}
          />

          <div>
            <Label className="text-sm font-semibold text-primary">
              受講後の時間短縮率 (想定)
            </Label>
            <RadioGroup
              value={String(reduction)}
              onValueChange={(v) =>
                onParamChange<number>("reduction", setReduction)(Number.parseFloat(v))
              }
              className="mt-2 grid grid-cols-3 gap-2 print:hidden"
            >
              {REDUCTION_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`roi-reduction-${opt.value}`}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                >
                  <RadioGroupItem
                    value={String(opt.value)}
                    id={`roi-reduction-${opt.value}`}
                  />
                  <span className="font-semibold text-primary">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
            <div className="mt-2 hidden text-sm text-primary print:block">
              {(reduction * 100).toFixed(0)}%
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              実務経験に基づく仮定値です。組織により実際の効果は変動します。
            </p>
          </div>

          <div>
            <Label className="text-sm font-semibold text-primary">
              導入プランを選択
            </Label>
            <RadioGroup
              value={planId}
              onValueChange={(v) =>
                onParamChange<PlanId>("plan", setPlanId)(v as PlanId)
              }
              className="mt-2 space-y-2 print:hidden"
            >
              {PLANS.map((p) => (
                <label
                  key={p.id}
                  htmlFor={`roi-plan-${p.id}`}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background px-4 py-2.5 transition-colors hover:border-primary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                >
                  <RadioGroupItem
                    value={p.id}
                    id={`roi-plan-${p.id}`}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-primary">{p.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {yenFmt(p.price)} / 人
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {p.scaleLabel}
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <div className="mt-2 hidden text-sm text-primary print:block">
              {plan.name} ({yenFmt(plan.price)} / 人)
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-5">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-amber">
            試算結果
          </div>
          <RoiResultCards result={result} />

          <div className="rounded-lg border border-border bg-secondary p-4 text-xs leading-relaxed text-muted-foreground print:bg-transparent">
            <p>
              <span className="font-semibold text-primary">投資額:</span>{" "}
              {yenFmt(result.investmentJpy)} ({plan.name} × {headcount} 名)
            </p>
            <p className="mt-1">
              ※ 上記は本ツールの計算ロジックに基づく目安値です。実際の効果は組織状況・運用方針により異なります。助成金適用後の実質負担額は別途
              <a href="/v1#simulator" className="underline underline-offset-2 hover:text-primary">
                料金シミュレーター
              </a>
              でご確認ください。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 print:hidden">
            <Button
              size="lg"
              nativeButton={false}
              render={
                <a href="/#contact" onClick={handleConsult} />
              }
              className="bg-brand-amber text-primary hover:bg-brand-amber/90"
            >
              試算結果について相談する
              <ArrowDown className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href="/#pricing"
                  onClick={() =>
                    trackEvent("resource_cta_click", {
                      resource: "roi",
                      target: "pricing",
                    })
                  }
                />
              }
            >
              他のプランも比較する
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
