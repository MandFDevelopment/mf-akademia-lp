"use client"

import { Layers, Wrench, UserCog } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const AXES = [
  {
    icon: Layers,
    title: "レベル",
    items: ["初級", "中級", "上級"],
  },
  {
    icon: Wrench,
    title: "ツール",
    items: ["Revit", "AutoCAD"],
  },
  {
    icon: UserCog,
    title: "役割",
    items: [
      "設計者",
      "施工管理者",
      "Revit オペレーター",
      "AutoCAD オペレーター",
      "BIM マネージャー",
      "CAD マネージャー",
    ],
  },
] as const

const CURRICULUM_BLOCKS = [
  { no: "01", title: "イントロダクション", body: "トラックの全体像と到達目標、前提知識のオリエンテーション。" },
  { no: "02", title: "基本概念の整理", body: "BIM/CAD/AI の位置づけと、業務上のキーワード整理。" },
  { no: "03", title: "ツール起動と初期設定", body: "利用環境のセットアップ、プロジェクトテンプレート整備。" },
  { no: "04", title: "UI / ショートカットの習得", body: "日々の作業効率に直結する操作の土台づくり。" },
  { no: "05", title: "基礎オペレーション (1)", body: "最小構成で成果物を出すための基本操作の習得。" },
  { no: "06", title: "基礎オペレーション (2)", body: "要素修正・ビュー制御など、実務の頻出操作。" },
  { no: "07", title: "実務演習 (基礎)", body: "基礎パートのまとめとしての実務ケース演習。" },
  { no: "08", title: "応用オペレーション (1)", body: "標準化・パラメータ設計・ファミリ / ブロック。" },
  { no: "09", title: "応用オペレーション (2)", body: "複雑図形・干渉チェック・クラスタリング。" },
  { no: "10", title: "AI 連携 (入門)", body: "生成 AI を用いた設計補助・ドキュメント生成の基礎。" },
  { no: "11", title: "AI 連携 (実装)", body: "Dynamo / アドイン経由での AI API 呼び出しと自動処理。" },
  { no: "12", title: "データ連携・IFC 出力", body: "他ツール・他社との相互運用を支える共通データ基盤。" },
  { no: "13", title: "品質チェック手法", body: "モデル整合性・命名規則・レビュー観点。" },
  { no: "14", title: "自動化スクリプト", body: "定型作業をスクリプトで省力化する具体例と解説。" },
  { no: "15", title: "実務演習 (応用)", body: "応用パートまでを統合した現場想定ワーク。" },
  { no: "16", title: "ケーススタディ", body: "建築 / 土木 / プラント領域の適用事例。" },
  { no: "17", title: "マネジメント観点", body: "BIM マネージャー / CAD マネージャー向けの運用設計。" },
  { no: "18", title: "組織展開・教育設計", body: "社内展開・教育プログラム設計・内製化のロードマップ。" },
  { no: "19", title: "最終演習", body: "トラック総括。総合課題に取り組む。" },
  { no: "20", title: "まとめと発展学習", body: "振り返り、次のトラックや発展的な学習ガイド。" },
]

export function Solution() {
  return (
    <section
      aria-labelledby="solution-heading"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Solution
          </p>
          <h2
            id="solution-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            36 トラック × 12 セッション = 432 本。
            <br className="hidden sm:inline" />
            誰もが、自分に合うコースで学べます。
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            「レベル × ツール × 役割」の 3 軸で設計。必要なトラックだけを組み合わせて受講できます。
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {AXES.map(({ icon: Icon, title, items }) => (
            <li key={title}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-primary">{title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-primary sm:text-2xl">
            カリキュラム共通構成 (全 20 ブロック)
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            すべてのトラックが同じ 20 ブロック構成。受講者は「どのトラックでも同じペースで学べる」設計です。
          </p>

          <Accordion className="mt-6 rounded-xl border border-border bg-background">
            {CURRICULUM_BLOCKS.map((block) => (
              <AccordionItem key={block.no} value={block.no} className="px-5">
                <AccordionTrigger className="text-left">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-brand-amber">{block.no}</span>
                    <span className="text-sm font-medium text-primary sm:text-base">
                      {block.title}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-12 text-sm leading-relaxed text-muted-foreground">
                  {block.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
