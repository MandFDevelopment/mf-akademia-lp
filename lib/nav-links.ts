export type NavMode = "top" | "detail"

export type NavLink = { href: string; label: string }

/**
 * Detail-page nav (used on /v1, /v3). Hashes refer to the in-page sections
 * shared across both detail pages.
 */
export const DETAIL_NAV_LINKS: readonly NavLink[] = [
  { href: "#features", label: "特徴" },
  { href: "#pricing", label: "料金" },
  { href: "#grant", label: "助成金" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "お問い合わせ" },
]

/**
 * Series-top nav (used on /). Drives the visitor to the lineup, the shared
 * grant explanation, the shared FAQ, and the contact form.
 */
export const TOP_NAV_LINKS: readonly NavLink[] = [
  { href: "#series", label: "シリーズ" },
  { href: "#grant", label: "助成金" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "お問い合わせ" },
]

export function getNavLinks(mode: NavMode): readonly NavLink[] {
  return mode === "top" ? TOP_NAV_LINKS : DETAIL_NAV_LINKS
}

/**
 * Back-compat: legacy default export. New code should use `getNavLinks(mode)`.
 */
export const NAV_LINKS = DETAIL_NAV_LINKS
