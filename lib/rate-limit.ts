/**
 * Minimal in-memory rate limiter.
 *
 * - Per-process Map: each Vercel serverless instance keeps its own counters.
 *   That's acceptable as a first line of defense; a determined attacker can
 *   still spread load across warm instances. If abuse shows up we'll swap in
 *   Upstash Redis + @upstash/ratelimit.
 * - Sliding 60 s window, max N hits per key.
 * - Stale entries are swept whenever we check a key (cheap, bounded).
 */

const WINDOW_MS = 60_000
const hits = new Map<string, number[]>()

export type RateLimitResult = {
  ok: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(key: string, limit = 3): RateLimitResult {
  const now = Date.now()
  const windowStart = now - WINDOW_MS
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart)

  if (recent.length >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: recent[0] + WINDOW_MS,
    }
  }

  recent.push(now)
  hits.set(key, recent)

  // Opportunistic GC to prevent unbounded growth.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      const kept = v.filter((t) => t > windowStart)
      if (kept.length === 0) hits.delete(k)
      else hits.set(k, kept)
    }
  }

  return {
    ok: true,
    remaining: limit - recent.length,
    resetAt: now + WINDOW_MS,
  }
}

export function clientKeyFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0]!.trim()
  return headers.get("x-real-ip") ?? "unknown"
}
