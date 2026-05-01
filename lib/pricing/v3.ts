import { getPlanFrom, type Plan, type PlanId } from "./types"

// NOTE: 第3弾 (AI × 生産設計 編) の価格は仮値。
// 価格・構成はマーケ側 (Maako) で確定後に差し替えること。
// Phase / セッション数は AI_BIM_CAD研修動画_432本/ 配下のカリキュラム設計に合わせる。
export const PLANS: Plan[] = [
  {
    id: "Starter",
    name: "Starter",
    price: 480_000,
    scaleLabel: "Phase 1+2 / 96 セッション",
    hoursLabel: "約 21 時間",
    description:
      "まずは設計図書の読み解きとプロジェクト初期設定から AI 活用を始めたい方向け。",
    features: [
      "Phase 1+2 / 約 96 セッション / 約 21 時間",
      "設計図の読み解き & プロジェクト初期設定",
      "計画申請サポート (無償)",
    ],
  },
  {
    id: "Standard",
    name: "Standard",
    price: 960_000,
    scaleLabel: "Phase 1-4 / 216 セッション",
    hoursLabel: "約 47 時間",
    description:
      "図面作成・整合確認まで AI で標準化したい生産設計チーム向け。",
    features: [
      "Phase 1-4 / 約 216 セッション / 約 47 時間",
      "図面作成・整合確認の AI 活用まで網羅",
      "計画申請サポート (無償)",
      "受講履歴レポート",
    ],
    featured: true,
  },
  {
    id: "Premium",
    name: "Premium",
    price: 1_020_000,
    scaleLabel: "全 6 Phase / 約 300 セッション",
    hoursLabel: "約 65 時間",
    description:
      "関係者協議・納品ナレッジ化まで含めた生産設計の AI 標準化を、全社で進めたい方向け。",
    features: [
      "全 6 Phase / 約 300 セッション / 約 65 時間",
      "関係者協議・納品ナレッジ化までフルカバー",
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
