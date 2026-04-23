/**
 * Origin allow-list for /api/contact.
 *
 * Browsers attach an `Origin` header automatically on cross-origin fetches.
 * Non-browser callers (curl, server-to-server) don't — those can't be driven
 * by a malicious third-party page, so we let them through.
 *
 * Allowed:
 *   - `http://localhost:3000`, `http://localhost:3001`, `http://127.0.0.1:3000` (local dev)
 *   - `NEXT_PUBLIC_SITE_URL` env var (future custom domain)
 *   - `https://${VERCEL_URL}` (Vercel per-deployment URL injected at build)
 *   - Anything matching one of `VERCEL_ORIGIN_PATTERNS`:
 *       - the production alias `mf-akademia-lp.vercel.app`
 *       - any team-scoped deploy/branch URL ending in
 *         `-mf-moriyas-projects.vercel.app`. The team suffix is mandatory so an
 *         attacker can't register a look-alike project on another team.
 *
 * Rejected (examples):
 *   - `https://evil.example`
 *   - `https://mf-akademia-lp-evil.malicious.com` (TLD spoof)
 *   - `https://mf-akademia-lp.vercel.app.evil.com` (suffix spoof)
 *   - `https://other-site.vercel.app` (different project, no team scope)
 *   - `https://mf-akademia-lp-copycat.vercel.app` (Vercel account squatting)
 *   - `https://mf-akademia-abc-attacker-projects.vercel.app` (foreign team)
 *   - `http://mf-akademia-lp.vercel.app` (http, not https)
 *
 * To connect a custom domain (e.g. `akademia.m-and-f.jp`):
 *   1. Set Vercel env `NEXT_PUBLIC_SITE_URL=https://akademia.m-and-f.jp`
 *   2. Redeploy. No code change needed — this function already honors that env.
 */

const TEAM_SLUG = "mf-moriyas-projects"

export const VERCEL_ORIGIN_PATTERNS: readonly RegExp[] = [
  // 1. Production alias — exact match.
  /^https:\/\/mf-akademia-lp\.vercel\.app$/,
  // 2. Team-scoped deploy/preview URL. Vercel prepends the project slug
  //    (possibly truncated) + a hash, and appends `-<team>.vercel.app`.
  //    The trailing team slug is required, which prevents another Vercel user
  //    from registering `mf-akademia-lp-<anything>.vercel.app` to slip past.
  new RegExp(
    `^https:\\/\\/mf-akademia(?:-lp)?-[a-z0-9-]+-${TEAM_SLUG.replace(/-/g, "\\-")}\\.vercel\\.app$`,
  ),
]

const STATIC_ALLOWED_ORIGINS: readonly string[] = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
]

/**
 * Normalize a URL-like string to its origin (`scheme://host[:port]`).
 * Returns `null` if the input can't be parsed as a URL.
 */
function toOrigin(raw: string): string | null {
  try {
    return new URL(raw.trim()).origin
  } catch {
    return null
  }
}

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return true

  const normalized = toOrigin(origin)
  if (!normalized) return false

  for (const allowed of STATIC_ALLOWED_ORIGINS) {
    if (normalized === allowed) return true
  }

  const envSite = process.env.NEXT_PUBLIC_SITE_URL
  if (envSite) {
    const envOrigin = toOrigin(envSite)
    if (envOrigin && normalized === envOrigin) return true
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl && normalized === `https://${vercelUrl}`) return true

  for (const re of VERCEL_ORIGIN_PATTERNS) {
    if (re.test(normalized)) return true
  }

  return false
}
