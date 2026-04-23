import { NAV_LINKS } from "@/lib/nav-links"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <span className="inline-block h-5 w-1 bg-brand-amber" aria-hidden />
            MF-AKADEMIA
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            建設業向け AI × BIM / CAD リスキリング研修動画シリーズ。
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

        <nav aria-label="フッターナビゲーション">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            サイト内
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-primary transition-colors hover:text-brand-amber"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="法務情報">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            法務情報
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="/privacy"
                className="text-primary transition-colors hover:text-brand-amber"
              >
                プライバシーポリシー
              </a>
            </li>
            <li>
              <a
                href="/tokusho"
                className="text-primary transition-colors hover:text-brand-amber"
              >
                特定商取引法に基づく表記
              </a>
            </li>
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
