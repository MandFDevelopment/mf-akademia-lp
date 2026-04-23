export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-2xl space-y-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-amber" />
          Coming Soon
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
          MF-AKADEMIA LP
          <span className="mt-2 block text-lg font-medium text-muted-foreground sm:text-xl">
            準備中
          </span>
        </h1>

        <p className="text-base text-muted-foreground sm:text-lg">
          AI × BIM / CAD リスキリング研修動画 432 本。
          <br />
          建設業向けの体系的なカリキュラムを、近日公開予定です。
        </p>

        <div className="pt-4 text-xs text-muted-foreground">
          提供: 株式会社 M&amp;F
        </div>
      </div>
    </main>
  );
}
