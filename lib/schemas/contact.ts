import { z } from "zod"

export const HEADCOUNT_VALUES = [
  "1-10",
  "11-50",
  "51-100",
  "101-300",
  "300+",
] as const

export const PLAN_VALUES = [
  "Starter",
  "Standard",
  "Premium",
  "Undecided",
] as const

export type HeadcountValue = (typeof HEADCOUNT_VALUES)[number]
export type PlanValue = (typeof PLAN_VALUES)[number]

type Option<V extends string> = { value: V; label: string }

export const HEADCOUNT_OPTIONS: ReadonlyArray<Option<HeadcountValue>> = [
  { value: "1-10", label: "1〜10 名" },
  { value: "11-50", label: "11〜50 名" },
  { value: "51-100", label: "51〜100 名" },
  { value: "101-300", label: "101〜300 名" },
  { value: "300+", label: "301 名以上" },
]

export const PLAN_OPTIONS: ReadonlyArray<Option<PlanValue>> = [
  { value: "Starter", label: "Starter (48 万円/人)" },
  { value: "Standard", label: "Standard (96 万円/人)" },
  { value: "Premium", label: "Premium (144 万円/人)" },
  { value: "Undecided", label: "未定・相談したい" },
]

export function isPlanValue(v: unknown): v is PlanValue {
  return typeof v === "string" && (PLAN_VALUES as readonly string[]).includes(v)
}

export function isHeadcountValue(v: unknown): v is HeadcountValue {
  return (
    typeof v === "string" &&
    (HEADCOUNT_VALUES as readonly string[]).includes(v)
  )
}

export const contactSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "会社名を入力してください")
    .max(100, "会社名は 100 文字以内で入力してください"),
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください")
    .max(50, "お名前は 50 文字以内で入力してください"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません")
    .max(200, "メールアドレスは 200 文字以内で入力してください"),
  phone: z
    .string()
    .trim()
    .max(30, "電話番号は 30 文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  headcount: z.enum(HEADCOUNT_VALUES, {
    message: "受講予定人数を選択してください",
  }),
  plan: z.enum(PLAN_VALUES, { message: "関心のあるプランを選択してください" }),
  message: z
    .string()
    .trim()
    .max(2000, "お問い合わせ内容は 2000 文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "個人情報の取り扱いに同意してください",
    }),
  /**
   * Honeypot — must be empty. Real users never see this input; bots tend to
   * fill every field they find, so a non-empty value is a strong spam signal.
   */
  website: z
    .string()
    .max(0, "不正なリクエストです")
    .optional()
    .or(z.literal("")),
})

export type ContactInput = z.infer<typeof contactSchema>
