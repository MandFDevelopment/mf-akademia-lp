export const GRANT_RATIO_SMB = 0.75 // 中小企業 経費助成率 3/4
export const GRANT_CAP_PER_PERSON = 720_000 // 1 人あたり上限 72 万円
export const GRANT_CAP_PER_ESTABLISHMENT = 100_000_000 // 事業所年間上限 1 億円

export type PlanId = "Starter" | "Standard" | "Premium"

export type Plan = {
  id: PlanId
  name: string
  price: number
  tracks: number
  hours: number
  description: string
  features: string[]
  featured?: boolean
}

export const PLANS: Plan[] = [
  {
    id: "Starter",
    name: "Starter",
    price: 480_000,
    tracks: 3,
    hours: 11.4,
    description: "まずは特定の役割 / ツールに絞って導入したい方向け。",
    features: [
      "3 トラック 36 本 / 11.4 時間",
      "単一ツール・単一役割を想定",
      "計画申請サポート (無償)",
    ],
  },
  {
    id: "Standard",
    name: "Standard",
    price: 960_000,
    tracks: 9,
    hours: 34,
    description: "複数の役割・ツールをまとめて底上げしたいチーム向け。",
    features: [
      "9 トラック 108 本 / 34 時間",
      "複数役割 / 両ツール対応",
      "計画申請サポート (無償)",
      "受講履歴レポート",
    ],
    featured: true,
  },
  {
    id: "Premium",
    name: "Premium",
    price: 1_020_000,
    tracks: 18,
    hours: 68,
    description: "全社展開・BIM マネージャ育成まで視野に入れた方向け。",
    features: [
      "18 トラック 216 本 / 68 時間",
      "全ツール・全役割カバー",
      "計画申請サポート (無償)",
      "受講履歴レポート",
      "カスタム映像の追加制作 (別途見積)",
    ],
  },
]

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id)
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
