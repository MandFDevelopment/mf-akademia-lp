"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle2 } from "lucide-react"
import {
  contactSchema,
  HEADCOUNT_OPTIONS,
  PLAN_OPTIONS,
  isPlanValue,
  type ContactInput,
  type HeadcountValue,
  type PlanValue,
} from "@/lib/schemas/contact"
import { readSimulatorShare } from "@/lib/simulator-share"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function headcountFromNumber(n: number): HeadcountValue {
  if (n <= 10) return "1-10"
  if (n <= 50) return "11-50"
  if (n <= 100) return "51-100"
  if (n <= 300) return "101-300"
  return "300+"
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      company: "",
      name: "",
      email: "",
      phone: "",
      headcount: "1-10",
      plan: "Undecided",
      message: "",
      consent: false,
      website: "",
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = form

  // Apply the simulator handoff once on mount.
  useEffect(() => {
    const share = readSimulatorShare()
    if (!share) return
    if (!isPlanValue(share.plan)) return
    if (
      !Number.isFinite(share.headcount) ||
      share.headcount < 1 ||
      share.headcount > 500
    )
      return

    setValue("plan", share.plan, { shouldDirty: false })
    setValue("headcount", headcountFromNumber(share.headcount), {
      shouldDirty: false,
    })
    setValue(
      "message",
      `シミュレーターで試算した ${share.plan} プラン / ${share.headcount} 名 の見積もりについて相談したいです。`,
      { shouldDirty: false },
    )
  }, [setValue])

  const planValue = watch("plan")
  const headcountValue = watch("headcount")
  const consentValue = watch("consent")

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        delivered?: boolean
      }
      if (!res.ok || body.ok === false) {
        const msg = body.error ?? `送信に失敗しました (HTTP ${res.status})`
        throw new Error(msg)
      }
      setSubmitted(true)
      reset()
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "送信に失敗しました。時間をおいて再度お試しください。",
      )
    }
  })

  if (submitted) {
    return (
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-background py-20 sm:py-24"
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary/5 text-primary">
            <CheckCircle2 className="size-8" aria-hidden />
          </span>
          <h2
            id="contact-heading"
            className="mt-6 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
          >
            お問い合わせありがとうございました。
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            担当者より 2 営業日以内にご連絡いたします。
            <br />
            万一ご連絡が届かない場合は、お手数ですが再度お送りいただくか、直接お電話にてご連絡ください。
          </p>
          <Button
            className="mt-8"
            variant="outline"
            onClick={() => setSubmitted(false)}
          >
            追加でお問い合わせする
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            お問い合わせ
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            導入のご相談・お見積もり・資料請求はこちらから。担当者より 2 営業日以内にご連絡いたします。
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-10 space-y-6 rounded-2xl border border-border bg-background p-6 sm:p-8"
        >
          {/* Honeypot: visually hidden, not focusable, ignored by screen readers */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website (leave empty)</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <Field
            id="company"
            label="会社名"
            required
            error={errors.company?.message}
          >
            <Input
              id="company"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              {...register("company")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="name" label="お名前" required error={errors.name?.message}>
              <Input
                id="name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </Field>

            <Field
              id="email"
              label="メールアドレス"
              required
              error={errors.email?.message}
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>
          </div>

          <Field id="phone" label="電話番号" error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(任意)"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="headcount"
              label="受講予定人数"
              required
              error={errors.headcount?.message}
            >
              <Select
                value={headcountValue}
                onValueChange={(v) =>
                  setValue("headcount", v as HeadcountValue, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger id="headcount" aria-invalid={!!errors.headcount}>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {HEADCOUNT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              id="plan"
              label="関心のあるプラン"
              required
              error={errors.plan?.message}
            >
              <Select
                value={planValue}
                onValueChange={(v) =>
                  setValue("plan", v as PlanValue, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger id="plan" aria-invalid={!!errors.plan}>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {PLAN_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field
            id="message"
            label="お問い合わせ内容"
            error={errors.message?.message}
          >
            <Textarea
              id="message"
              rows={5}
              placeholder="(任意) 導入時期・対象部署・特にご相談したい点など"
              aria-invalid={!!errors.message}
              {...register("message")}
            />
          </Field>

          <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary p-4">
            <Checkbox
              id="consent"
              checked={!!consentValue}
              onCheckedChange={(v) =>
                setValue("consent", v === true, {
                  shouldValidate: true,
                })
              }
              aria-invalid={!!errors.consent}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label
                htmlFor="consent"
                className="cursor-pointer text-sm font-medium text-primary"
              >
                個人情報の取り扱いに同意します (必須)
              </Label>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                お預かりした個人情報は、お問い合わせへの回答・ご案内・当社サービス改善のためにのみ使用します。
              </p>
              {errors.consent?.message && (
                <p className="mt-1 text-xs font-medium text-destructive">
                  {errors.consent.message}
                </p>
              )}
            </div>
          </div>

          {submitError && (
            <p
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isSubmitting ? "送信中…" : "お問い合わせを送信"}
          </Button>
        </form>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-primary">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
