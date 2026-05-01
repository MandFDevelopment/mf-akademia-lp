export const GRANT_RATIO_SMB = 0.75 // 中小企業 経費助成率 3/4
export const GRANT_CAP_PER_PERSON = 720_000 // 1 人あたり上限 72 万円
export const GRANT_CAP_PER_ESTABLISHMENT = 100_000_000 // 事業所年間上限 1 億円

export type PlanId = "Starter" | "Standard" | "Premium"

export type Plan = {
  id: PlanId
  name: string
  price: number
  /** Display label for the structural scale (e.g. "3 トラック / 36 本", "Phase 1+2 / 96 セッション"). */
  scaleLabel: string
  /** Display label for total runtime (e.g. "11.4 時間", "約 21 時間"). */
  hoursLabel: string
  description: string
  features: string[]
  featured?: boolean
}

export function getPlanFrom(plans: readonly Plan[], id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id)
  if (!plan) throw new Error(`Unknown plan: ${id}`)
  return plan
}

export function formatJpy(amount: number): string {
  return amount.toLocaleString("ja-JP")
}

export function formatWan(amount: number): string {
  const wan = amount / 10_000
  const isInteger = Number.isInteger(wan)
  return `${wan.toLocaleString("ja-JP", {
    minimumFractionDigits: isInteger ? 0 : 1,
    maximumFractionDigits: 1,
  })} 万円`
}

/**
 * Per-person grant (SMB). Capped at GRANT_CAP_PER_PERSON.
 */
export function grantPerPerson(pricePerPerson: number): number {
  return Math.min(
    Math.floor(pricePerPerson * GRANT_RATIO_SMB),
    GRANT_CAP_PER_PERSON,
  )
}

/**
 * Total quote for the given plan × headcount, also capped at the annual
 * per-establishment grant ceiling.
 */
export function calcQuote(plan: Plan, headcount: number) {
  const list = plan.price * headcount
  const perPersonGrant = grantPerPerson(plan.price)
  const grantUncapped = perPersonGrant * headcount
  const grant = Math.min(grantUncapped, GRANT_CAP_PER_ESTABLISHMENT)
  const net = Math.max(list - grant, 0)
  const grantCapped = grant < grantUncapped
  return { list, grant, net, perPersonGrant, grantCapped }
}
