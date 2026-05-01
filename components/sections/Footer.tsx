import Link from "next/link"

const SERIES_LINKS = [
  { href: "/", label: "シリーズトップ" },
  { href: "/v1", label: "BIM × CAD × AI 編 (第1弾)" },
  { href: "/v3", label: "AI × 生産設計 編 (第3弾)" },
] as const

const LEGAL_LINKS = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokusho", label: "特定商取引法に基づく表記" },
] as const

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-primary"
            aria-label="MF-AKADEMIA シリーズトップへ"
          >
            <span className="inline-block h-5 w-1 bg-brand-amber" aria-hidden />
            MF-AKADEMIA
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            建設業向け AI リスキリング研修動画シリーズ。
          </p>
          <p className="mt-4 text-sm text-primary">
            提供:{" "}
            <a
              href="https://m-and-f.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4 hover:text-brand-amber"
            >
              株式会社 M&amp;F
            </a>
          </p>
        </div>

        <nav aria-label="シリーズ">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            シリーズ
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SERIES_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-primary transition-colors hover:text-brand-amber"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="法務情報">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            法務情報
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-primary transition-colors hover:text-brand-amber"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border py-5">
        <p className="mx-auto max-w-6xl px-6 text-xs text-muted-foreground">
          © 2026 株式会社 M&amp;F. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
