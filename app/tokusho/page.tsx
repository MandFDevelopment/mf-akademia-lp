import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | MF-AKADEMIA",
  description:
    "MF-AKADEMIA (株式会社 M&F) の特定商取引法に基づく表記。",
  robots: { index: false, follow: true },
}

export default function TokushoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <nav className="text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary">
          ← トップへ戻る
        </Link>
      </nav>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        特定商取引法に基づく表記
      </h1>
      <p className="mt-8 rounded-lg border border-border bg-secondary p-6 text-sm leading-relaxed text-muted-foreground">
        本ページは準備中です。販売事業者情報、商品代金以外の必要料金、引渡時期、お支払方法、
        返品・キャンセルに関する事項などは後日掲載いたします。
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        お問い合わせ先: 株式会社 M&amp;F (https://m-and-f.jp)
      </p>
    </main>
  )
}
