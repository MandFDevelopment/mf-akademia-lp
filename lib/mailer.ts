import { Resend } from "resend"
import type { ContactInput } from "@/lib/schemas/contact"
import {
  HEADCOUNT_OPTIONS,
  PLAN_OPTIONS,
} from "@/lib/schemas/contact"

/**
 * Contact-form email delivery via Resend.
 *
 * Env:
 *   - RESEND_API_KEY      — required to actually send; if unset, helpers return
 *                           false without throwing and the API route logs a
 *                           warning.
 *   - RESEND_FROM_EMAIL   — e.g. "MF-AKADEMIA <onboarding@resend.dev>".
 *                           Until DNS is verified we send from resend.dev; once
 *                           m-and-f.jp is verified, swap this env to
 *                           "MF-AKADEMIA <noreply@m-and-f.jp>".
 *   - CONTACT_NOTIFY_TO   — recipient for the internal notification mail.
 */

let resendSingleton: Resend | null = null
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!resendSingleton) resendSingleton = new Resend(key)
  return resendSingleton
}

function labelFor<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value
}

/**
 * Remove CR/LF and other control characters from a string destined for an
 * email header (subject, to, from, reply-to). Protects against header
 * injection (`Bcc:` smuggling via `"...\nBcc: victim@..."` in user input).
 * Zod's `.trim()` only strips leading/trailing whitespace, so interior
 * newlines must be handled here.
 */
function sanitizeHeader(v: string): string {
  return v.replace(/\r/g, " ").replace(/\n/g, " ").trim()
}

/**
 * Compress any thrown value into a bounded, secret-free string for logging.
 * Fetch-level exceptions thrown by some SDKs can carry Authorization headers
 * or full request URLs; keeping the log to `.message` avoids that risk.
 */
function safeErrorMessage(err: unknown, max = 200): string {
  if (err instanceof Error) return err.message.slice(0, max)
  if (typeof err === "string") return err.slice(0, max)
  try {
    return JSON.stringify(err).slice(0, max)
  } catch {
    return "(unserializable error)"
  }
}

function formatJst(date: Date): string {
  const fmt = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  return `${fmt.format(date)} JST`
}

export function buildAutoReplyEmail(data: ContactInput) {
  const headcountLabel = labelFor(HEADCOUNT_OPTIONS, data.headcount)
  const planLabel = labelFor(PLAN_OPTIONS, data.plan)

  const text = `${data.name} 様

この度は MF-AKADEMIA (AI × BIM / CAD リスキリング研修) に
お問い合わせいただき、誠にありがとうございます。

下記の内容でお問い合わせを承りました。
担当者より 2 営業日以内にご連絡いたします。

今しばらくお待ちいただけますようお願い申し上げます。

──────────────────────────────
【お問い合わせ内容】

会社名: ${data.company}
お名前: ${data.name}
メール: ${data.email}
電話番号: ${data.phone?.trim() ? data.phone : "-"}
受講予定人数: ${headcountLabel}
関心のあるプラン: ${planLabel}

お問い合わせ内容:
${data.message?.trim() ? data.message : "-"}
──────────────────────────────

※ 本メールは自動送信です。ご返信は不要です。
※ ご不明な点は下記までお問い合わせください。

━━━━━━━━━━━━━━━━━━━━━━━
株式会社 M&F
MF-AKADEMIA 担当
https://m-and-f.jp
https://mf-akademia-lp.vercel.app
━━━━━━━━━━━━━━━━━━━━━━━
`

  return {
    to: sanitizeHeader(data.email),
    subject: "【MF-AKADEMIA】お問い合わせありがとうございます",
    text,
  }
}

export function buildNotifyEmail(data: ContactInput, receivedAt: Date) {
  const headcountLabel = labelFor(HEADCOUNT_OPTIONS, data.headcount)
  const planLabel = labelFor(PLAN_OPTIONS, data.plan)

  const text = `MF-AKADEMIA の LP から新規お問い合わせがありました。

■ 会社名: ${data.company}
■ 担当者: ${data.name}
■ 人数: ${headcountLabel}
■ プラン: ${planLabel}

■ お問い合わせ内容:
${data.message?.trim() ? data.message : "(記入なし)"}

──────────────
返信: ${data.email}
電話: ${data.phone?.trim() ? data.phone : "記入なし"}
受信: ${formatJst(receivedAt)}
──────────────

※ このメールに直接返信すると、お客様 (${data.email}) 宛に返信されます。
※ 返信先はフォーム入力値そのままです。不審な場合は返信せず、別途確認してください。
※ Google Chat スペースにも同じ内容が通知されています。
`

  // Any user-controlled value that will end up in an RFC 5322 header gets
  // sanitized to reject CR/LF smuggling.
  return {
    subject: sanitizeHeader(
      `【MF-AKADEMIA 新規問い合わせ】${data.company} / ${data.name}`,
    ),
    text,
    replyTo: sanitizeHeader(data.email),
  }
}

async function sendVia(
  context: string,
  payload: {
    from: string
    to: string
    subject: string
    text: string
    replyTo?: string
  },
): Promise<boolean> {
  const resend = getResend()
  if (!resend) {
    console.warn(`[mailer] RESEND_API_KEY not set — skipping ${context} email`)
    return false
  }
  try {
    const res = await resend.emails.send(payload)
    if (res.error) {
      const name = res.error.name ?? "unknown"
      const message = res.error.message ?? ""
      console.warn(
        `[mailer] ${context} email failed: ${name}: ${message.slice(0, 200)}`,
      )
      return false
    }
    return true
  } catch (err) {
    console.warn(`[mailer] ${context} email threw: ${safeErrorMessage(err)}`)
    return false
  }
}

export async function sendAutoReplyEmail(data: ContactInput): Promise<boolean> {
  const from = process.env.RESEND_FROM_EMAIL
  if (!from) {
    console.warn("[mailer] RESEND_FROM_EMAIL not set — skipping auto-reply")
    return false
  }
  const tpl = buildAutoReplyEmail(data)
  return sendVia("auto-reply", { from: sanitizeHeader(from), ...tpl })
}

export async function sendNotifyEmail(
  data: ContactInput,
  receivedAt: Date,
): Promise<boolean> {
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_NOTIFY_TO
  if (!from) {
    console.warn("[mailer] RESEND_FROM_EMAIL not set — skipping notify")
    return false
  }
  if (!to) {
    console.warn("[mailer] CONTACT_NOTIFY_TO not set — skipping notify")
    return false
  }
  const tpl = buildNotifyEmail(data, receivedAt)
  return sendVia("notify", {
    from: sanitizeHeader(from),
    to: sanitizeHeader(to),
    ...tpl,
  })
}
