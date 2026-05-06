/**
 * 建設業のこれから — 15 の問い (セルフチェック)
 *
 * 元資料: proposals/02_resource_a_interview_2026-05-05.md §7.2
 * 採点: 4択 [0, 1, 3, 4] (中間2点なし、Maako確定)
 * 逆スコア対象: Q3 / Q9 / Q10 / Q11 / Q15 (否定形質問、文意で危機側=高スコア)
 * ゾーン: 0-19=危機 / 20-34=停滞 / 35-49=覚醒 / 50-60=先導
 */

export type AnswerLevel = 0 | 1 | 2 | 3
export type ScoreDirection = "positive" | "negative"

export type DiagnosisQuestion = {
  id: string
  /** 設問本文 (Maako §7.2 原文ママ) */
  text: string
  direction: ScoreDirection
}

export type ZoneId = "crisis" | "stagnant" | "awaken" | "lead"

export type Zone = {
  id: ZoneId
  /** ゾーンラベル (例: 「危機ゾーン」) */
  label: string
  /** 移行度 (%) — 100% は意図的に設けない (永続改善の思想) */
  pct: 20 | 40 | 60 | 80
  /** 含むスコア範囲 [min, max] (両端含む) */
  range: readonly [number, number]
}

export const ANSWER_LABELS = [
  "まったく違う",
  "違う気がする",
  "そう思う",
  "その通り",
] as const

/** 取材プロンプト指定: 0/1/3/4 (中間 2 点を飛ばす) */
const RAW_SCORES = [0, 1, 3, 4] as const

export const QUESTIONS: readonly DiagnosisQuestion[] = [
  { id: "q01", text: "自社の主要 KPI をデータで可視化していますか?", direction: "positive" },
  { id: "q02", text: "設計担当の熟練ナレッジを若手に体系的に渡せていますか?", direction: "positive" },
  { id: "q03", text: "「BIM は大手の話、うちは 2 次元で回ってる」と思っていませんか?", direction: "negative" },
  { id: "q04", text: "業務の詰まりをデータで分析する仕組みがありますか?", direction: "positive" },
  { id: "q05", text: "中年代技術者が「省人マネジメント」できる体制になっていますか?", direction: "positive" },
  { id: "q06", text: "若手 3 年目が「マネージャー視点」を持てる教育がありますか?", direction: "positive" },
  { id: "q07", text: "AI の出力を「現場で使える形」に翻訳できる人材がいますか?", direction: "positive" },
  { id: "q08", text: "過去案件の知見を社内で検索できますか?", direction: "positive" },
  { id: "q09", text: "設計担当が「忙しいけど整理できない」状態に陥っていませんか?", direction: "negative" },
  { id: "q10", text: "「予算明細に BIM/AI の記載がない」という理由で投資を止めていませんか?", direction: "negative" },
  { id: "q11", text: "経験工学の罠 (背中で覚えろ文化) が残っていませんか?", direction: "negative" },
  { id: "q12", text: "他業種とコラボレーションする習慣がありますか?", direction: "positive" },
  { id: "q13", text: "自社の 3 年後の姿を「具体的に」描けていますか?", direction: "positive" },
  { id: "q14", text: "業界の未来に対して「自分ごと」として動いていますか?", direction: "positive" },
  { id: "q15", text: "投資判断は「見えてないだけ」で止まっていませんか?", direction: "negative" },
] as const

export const ZONES: readonly Zone[] = [
  { id: "crisis", label: "危機ゾーン", pct: 20, range: [0, 19] },
  { id: "stagnant", label: "停滞ゾーン", pct: 40, range: [20, 34] },
  { id: "awaken", label: "覚醒ゾーン", pct: 60, range: [35, 49] },
  { id: "lead", label: "先導ゾーン", pct: 80, range: [50, 60] },
] as const

export const MAX_SCORE = QUESTIONS.length * 4 // 60

/**
 * 回答 1 件のスコア。direction が "negative" の質問は反転 (4-i 軸)。
 * raw [0,1,3,4] → negative 反転後 [4,3,1,0]
 */
export function scoreOf(question: DiagnosisQuestion, level: AnswerLevel): number {
  const raw = RAW_SCORES[level]
  return question.direction === "positive" ? raw : 4 - raw
}

/**
 * 全回答からの合計スコア。answers は QUESTIONS と同順序の AnswerLevel | null 配列。
 * null (未回答) は 0 点として加算しない (= 0 点扱い、結果に未回答が混じる場合は呼び出し側で抑止)。
 */
export function totalScore(
  answers: readonly (AnswerLevel | null)[],
): number {
  let sum = 0
  for (let i = 0; i < QUESTIONS.length; i++) {
    const a = answers[i]
    if (a === null || a === undefined) continue
    sum += scoreOf(QUESTIONS[i], a)
  }
  return sum
}

export function zoneFor(score: number): Zone {
  for (const z of ZONES) {
    if (score >= z.range[0] && score <= z.range[1]) return z
  }
  // 範囲外 (理論上は来ない)。安全のため最も近いゾーンを返す。
  return score < 0 ? ZONES[0] : ZONES[ZONES.length - 1]
}

export function isComplete(
  answers: readonly (AnswerLevel | null)[],
): boolean {
  return (
    answers.length === QUESTIONS.length &&
    answers.every((a) => a !== null && a !== undefined)
  )
}
