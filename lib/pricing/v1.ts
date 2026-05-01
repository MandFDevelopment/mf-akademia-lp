import { getPlanFrom, type Plan, type PlanId } from "./types"

export const PLANS: Plan[] = [
  {
    id: "Starter",
    name: "Starter",
    price: 480_000,
    scaleLabel: "3 トラック / 36 本",
    hoursLabel: "11.4 時間",
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
    scaleLabel: "9 トラック / 108 本",
    hoursLabel: "34 時間",
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
    scaleLabel: "18 トラック / 216 本",
    hoursLabel: "68 時間",
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
  return getPlanFrom(PLANS, id)
}

export type { Plan, PlanId } from "./types"
export {
  GRANT_RATIO_SMB,
  GRANT_CAP_PER_PERSON,
  GRANT_CAP_PER_ESTABLISHMENT,
  formatJpy,
  formatWan,
  grantPerPerson,
  calcQuote,
} from "./types"
