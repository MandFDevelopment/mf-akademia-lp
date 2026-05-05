import { Clock, Coins, TrendingUp, Trophy, CalendarClock } from "lucide-react"

export type RoiResult = {
  /** 年間削減工数 (時間) */
  hoursSavedPerYear: number
  /** 金額換算 (円, 年間) */
  jpySavedPerYear: number
  /** 投資額 (円) */
  investmentJpy: number
  /** 単年 ROI (%) */
  roiYear1Pct: number
  /** 3年累計 ROI (%) */
  roi3yPct: number
  /** 投資回収期間 (月) */
  paybackMonths: number
}

type RoiResultCardsProps = {
  result: RoiResult
}

const numberFmt = new Intl.NumberFormat("ja-JP")
const decimal1Fmt = new Intl.NumberFormat("ja-JP", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

function formatHours(n: number) {
  return numberFmt.format(Math.round(n))
}

function formatJpy(n: number) {
  return numberFmt.format(Math.round(n))
}

function formatPct(n: number) {
  if (!Number.isFinite(n)) return "—"
  return decimal1Fmt.format(n)
}

function formatMonths(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "—"
  if (n >= 120) return "10 年以上"
  return decimal1Fmt.format(n)
}

export function RoiResultCards({ result }: RoiResultCardsProps) {
  const cards = [
    {
      label: "年間削減工数",
      value: formatHours(result.hoursSavedPerYear),
      unit: "時間 / 年",
      Icon: Clock,
    },
    {
      label: "金額換算 (年間)",
      value: `¥${formatJpy(result.jpySavedPerYear)}`,
      unit: "円 / 年",
      Icon: Coins,
    },
    {
      label: "単年 ROI",
      value: `${formatPct(result.roiYear1Pct)}`,
      unit: "%",
      Icon: TrendingUp,
    },
    {
      label: "3 年累計 ROI",
      value: `${formatPct(result.roi3yPct)}`,
      unit: "%",
      Icon: Trophy,
    },
    {
      label: "投資回収期間",
      value: formatMonths(result.paybackMonths),
      unit: "ヶ月",
      Icon: CalendarClock,
    },
  ] as const

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ label, value, unit, Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-white/10 bg-primary/95 p-5 text-primary-foreground shadow-sm print:border-black print:bg-transparent print:text-black print:shadow-none"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 print:text-black/70">
            <Icon className="size-4 text-brand-amber print:text-black" aria-hidden />
            {label}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-brand-amber sm:text-4xl print:text-black">
              {value}
            </span>
            <span className="text-sm text-white/70 print:text-black/70">{unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
