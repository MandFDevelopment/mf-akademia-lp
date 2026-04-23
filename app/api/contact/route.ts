import { NextResponse } from "next/server"
import {
  contactSchema,
  HEADCOUNT_OPTIONS,
  PLAN_OPTIONS,
} from "@/lib/schemas/contact"
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Origins the contact form is allowed to be submitted from.
 *
 * - `NEXT_PUBLIC_SITE_URL` (production canonical origin, if set)
 * - `VERCEL_URL` (per-deployment preview origin, auto-injected by Vercel)
 * - `http://localhost:3000` for local dev
 *
 * A request with NO `Origin` header (e.g. curl, server-to-server) is allowed
 * through — those cannot be driven by a browser on a third-party site.
 */
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true
  const allowed = new Set<string>([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ])
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    allowed.add(process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""))
  }
  if (process.env.VERCEL_URL) {
    allowed.add(`https://${process.env.VERCEL_URL}`)
  }
  return allowed.has(origin.replace(/\/$/, ""))
}

type ChatCardWidget =
  | { decoratedText: { topLabel?: string; text: string; wrapText?: boolean } }
  | { textParagraph: { text: string } }

type ChatCardSection = {
  header?: string
  collapsible?: boolean
  widgets: ChatCardWidget[]
}

const isProd = process.env.NODE_ENV === "production"

function labelFor<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value
}

export async function POST(req: Request) {
  // Block cross-origin submissions — the form is only ever submitted from our
  // own LP. curl / tooling (no Origin header) is still allowed.
  const origin = req.headers.get("origin")
  if (!isAllowedOrigin(origin)) {
    console.warn("[contact] rejected unexpected origin:", origin)
    return NextResponse.json(
      { ok: false, error: "Forbidden" },
      { status: 403 },
    )
  }

  // Rate limit — don't even parse JSON for obvious abuse.
  const key = clientKeyFromHeaders(req.headers)
  const rl = checkRateLimit(key, 3)
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "リクエストが多すぎます。しばらく経ってから再度お試しください。" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))),
        },
      },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 },
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    // Always log full issues server-side for debugging; don't leak schema
    // structure to clients in production.
    console.warn("[contact] validation failed:", parsed.error.issues)
    return NextResponse.json(
      isProd
        ? { ok: false, error: "入力内容をご確認ください。" }
        : {
            ok: false,
            error: "Validation failed",
            issues: parsed.error.issues,
          },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Honeypot: if non-empty, pretend success silently.
  if (data.website && data.website.trim() !== "") {
    console.warn("[contact] honeypot triggered from", key)
    return NextResponse.json({ ok: true, delivered: false })
  }

  const receivedAt = new Date().toISOString()
  const headcountLabel = labelFor(HEADCOUNT_OPTIONS, data.headcount)
  const planLabel = labelFor(PLAN_OPTIONS, data.plan)

  const card = {
    cardsV2: [
      {
        cardId: `mf-akademia-contact-${Date.now()}`,
        card: {
          header: {
            title: "🎓 MF-AKADEMIA 新規お問い合わせ",
            subtitle: data.company,
          },
          sections: [
            {
              header: "基本情報",
              widgets: [
                { decoratedText: { topLabel: "会社名", text: data.company, wrapText: true } },
                { decoratedText: { topLabel: "お名前", text: data.name, wrapText: true } },
                { decoratedText: { topLabel: "メール", text: data.email, wrapText: true } },
                ...(data.phone
                  ? [{ decoratedText: { topLabel: "電話番号", text: data.phone } }]
                  : []),
              ],
            },
            {
              header: "研修情報",
              widgets: [
                { decoratedText: { topLabel: "受講予定人数", text: headcountLabel } },
                { decoratedText: { topLabel: "関心プラン", text: planLabel } },
              ],
            },
            {
              header: "お問い合わせ内容",
              widgets: [
                {
                  textParagraph: {
                    text: data.message?.trim()
                      ? escapeForChat(data.message)
                      : "(記載なし)",
                  },
                },
              ],
            },
            {
              header: "受信日時",
              widgets: [{ decoratedText: { topLabel: "ISO", text: receivedAt } }],
            },
          ] satisfies ChatCardSection[],
        },
      },
    ],
  }

  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn(
      "[contact] GOOGLE_CHAT_WEBHOOK_URL is not configured — accepting submission but not delivering.",
    )
    if (!isProd) {
      console.log("[contact] received (no webhook):", JSON.stringify({ receivedAt, data }))
    }
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(card),
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      // Truncate in case the upstream error echoes the webhook URL back.
      console.error(
        `[contact] Google Chat webhook returned ${res.status}: ${text.slice(0, 200)}`,
      )
      return NextResponse.json({ ok: true, delivered: false })
    }
  } catch (err) {
    console.error("[contact] Google Chat webhook request failed:", err)
    return NextResponse.json({ ok: true, delivered: false })
  }

  return NextResponse.json({ ok: true, delivered: true })
}

/**
 * Google Chat textParagraph renders a subset of HTML. Escape angle brackets so
 * user input cannot inject markup that changes the card structure.
 */
function escapeForChat(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}
