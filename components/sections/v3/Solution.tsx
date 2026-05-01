"use client"

import {
  PlayCircle,
  Package,
  BookOpen,
  Bot,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Phase = {
  no: string
  title: string
  scenes: number
  sessions: number
}

const PHASES: readonly Phase[] = [
  { no: "01", title: "設計図の読み解き & 与件整理", scenes: 6, sessions: 48 },
  { no: "02", title: "プロジェクト初期設定", scenes: 6, sessions: 48 },
  { no: "03", title: "図面作成", scenes: 8, sessions: 64 },
  { no: "04", title: "整合確認・チェック", scenes: 7, sessions: 56 },
  { no: "05", title: "関係者協議・調整", scenes: 6, sessions: 48 },
  { no: "06", title: "納品・ナレッジ化", scenes: 7, sessions: 56 },
]

const FEATURES = [
  {
    icon: PlayCircle,
    title: "動画単独で完結",
    body: "1 セッション 13 分前後。視聴だけで実務に持ち帰れる構成で、別途のワークショップ前提ではありません。",
  },
  {
    icon: Package,
    title: "ラーニングボックスとセット販売",
    body: "ナレッジ整理用のラーニングボックス (ワークシート + プロンプト集) を同梱。社内展開時の標準教材として配布できます。",
  },
  {
    icon: BookOpen,
    title: "業界一般知識ベース",
    body: "特定の社内ルールに依存しない、生産設計の業界一般知識を題材に構成。ゼネコン・設計事務所のいずれでも使えます。",
  },
  {
    icon: Bot,
    title: "AI ツール中立",
    body: "Claude / ChatGPT / Gemini の 3 ツールを横並びで解説。社内で導入済みのいずれの AI でも応用できます。",
  },
] as const

const PHASE_1_SCENES = [
  {
    no: "1-1",
    title: "大量 PDF を「読まずに把握する」",
    body: "100 ページ規模の PDF を AI に要約させ、初見で「全体像 → 重要箇所」の順に把握する手順。",
  },
  {
    no: "1-2",
    title: "仕様書の「特記事項」を漏らさず抽出する",
    body: "特記仕様書から、後工程で問題化しがちな条件を構造化リストで吸い上げるプロンプト設計。",
  },
  {
    no: "1-3",
    title: "「設計図にない情報」を AI で炙り出す",
    body: "明示されていない前提・暗黙の慣習を、AI に質問して可視化することで早期に潰す。",
  },
  {
    no: "1-4",
    title: "与件を構造化する (Spec Sheet 化)",
    body: "プロジェクト個別の与件を Spec Sheet として標準化し、後工程に引き継げる形にまとめる。",
  },
  {
    no: "1-5",
    title: "「過去の似た案件」を AI で見つける",
    body: "社内ナレッジを RAG / 検索的に活用し、類似案件のテンプレートを再利用する流れ。",
  },
  {
    no: "1-6",
    title: "設計図書から議事録ドラフトを作る",
    body: "設計図書 + 打合せメモから、関係者協議の議事録ドラフトを AI に下書きさせる。",
  },
] as const

export function Solution() {
  return (
    <section
      aria-labelledby="solution-heading-v3"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Solution
          </p>
          <h2
            id="solution-heading-v3"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            生産設計の業務フローを、
            <br className="hidden sm:inline" />
            <span className="text-brand-amber">6 Phase</span>で AI 化する。
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            合計: 約 40 シーン / 約 300 セッション / 約 65 時間 / 1 セッション 13 分。
            生産設計の実務フローを 6 つの Phase に分解し、Phase 内をシーン単位で深掘りします。
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((phase) => (
            <li
              key={phase.no}
              className="flex h-full flex-col rounded-xl border border-border bg-background p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-brand-amber">
                  Phase {phase.no}
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold leading-snug text-primary">
                {phase.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {phase.scenes} シーン × 8 ={" "}
                <span className="font-semibold text-primary">
                  {phase.sessions} セッション
                </span>
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-primary sm:text-2xl">
            講座の特徴
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-4 rounded-xl border border-border bg-background p-5"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <div className="font-semibold text-primary">{title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-primary sm:text-2xl">
            Phase 1 のシーン例 (設計図の読み解き & 与件整理)
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            各 Phase は 6〜8 シーンで構成。Phase 1 のシーン一覧を例として展開できます。
          </p>

          <Accordion
            multiple={false}
            className="mt-6 rounded-xl border border-border bg-background"
          >
            <AccordionItem value="phase-1" className="px-5">
              <AccordionTrigger className="text-left">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-brand-amber">
                    Phase 01
                  </span>
                  <span className="text-sm font-medium text-primary sm:text-base">
                    設計図の読み解き & 与件整理 — シーン 1-1〜1-6
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-12">
                <ul className="space-y-4">
                  {PHASE_1_SCENES.map((scene) => (
                    <li key={scene.no} className="border-l-2 border-brand-amber/40 pl-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-brand-amber">
                          シーン {scene.no}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {scene.title}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {scene.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
