"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    q: "助成金の対象になる中小企業の条件は?",
    a: "建設業の場合、資本金 3 億円以下 または 従業員 300 人以下が中小企業と位置づけられ、経費助成率 3/4 の対象になります。",
  },
  {
    q: "大企業でも助成金は使えますか?",
    a: "はい、経費助成率は 3/5 になります。詳細な適用条件はお問い合わせください。",
  },
  {
    q: "申請サポートは有料ですか?",
    a: "導入いただくお客様には、計画申請書類の作成サポートを無償で提供します。",
  },
  {
    q: "動画だけで実装できますか?",
    a: "はい、本講座は動画単独で完結する設計です。1 セッション約 13 分、各シーンに「視聴 → 自分の案件で試す」までの流れを組み込んでいます。別途のワークショップ参加は前提としていません。",
  },
  {
    q: "特定の AI ツール (Claude / ChatGPT / Gemini) に依存しますか?",
    a: "依存しません。Claude / ChatGPT / Gemini の 3 ツールを横並びで解説しているため、社内で導入済みのいずれの AI ツールでも実務に応用できます。",
  },
  {
    q: "生産設計経験 1〜3 年でも理解できますか?",
    a: "はい、生産設計の業界一般知識をベースに構成しているため、経験 1〜3 年の実務者を主な対象としています。Phase 1 (設計図の読み解き) から段階的に積み上げる構成です。",
  },
  {
    q: "動画はどのように提供されますか?",
    a: "専用クラウドからのダウンロード、または貴社 LMS へのデータ納品に対応します。",
  },
  {
    q: "SCORM パッケージには対応していますか?",
    a: "はい、ご希望の LMS フォーマットに合わせて SCORM 1.2 / 2004 でご提供可能です。",
  },
  {
    q: "受講期間に制限はありますか?",
    a: "助成金の要件上、訓練計画期間内 (通常 3 ヶ月) に受講完了が必要です。",
  },
  {
    q: "受講履歴の管理はできますか?",
    a: "貴社 LMS に取り込んでの管理、または別途管理ツールをご提供します。",
  },
] as const

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading-v3"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            FAQ
          </p>
          <h2
            id="faq-heading-v3"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            よくあるご質問
          </h2>
        </div>

        <Accordion
          multiple={false}
          className="mt-12 rounded-xl border border-border bg-background"
        >
          {FAQS.map((item, idx) => (
            <AccordionItem key={item.q} value={`q${idx}`} className="px-5">
              <AccordionTrigger className="text-left">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-brand-amber">
                    Q{idx + 1}
                  </span>
                  <span className="text-sm font-medium text-primary sm:text-base">
                    {item.q}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-12 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
