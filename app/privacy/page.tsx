import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | MF-AKADEMIA",
  description:
    "MF-AKADEMIA (株式会社 M&F) のプライバシーポリシー。お預かりする個人情報の取り扱い方針を記載しています。",
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <nav className="text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary">
          ← トップへ戻る
        </Link>
      </nav>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        プライバシーポリシー
      </h1>
      <p className="mt-8 rounded-lg border border-border bg-secondary p-6 text-sm leading-relaxed text-muted-foreground">
        本ページは準備中です。正式版の本文は後日掲載いたします。現時点では、お問い合わせフォームで
        お預かりする個人情報は、お問い合わせへのご回答・ご案内・当社サービス改善のためにのみ利用し、
        ご本人の同意なく第三者に提供することはありません。
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        お問い合わせ先: 株式会社 M&amp;F (https://m-and-f.jp)
      </p>
    </main>
  )
}
