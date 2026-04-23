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
    q: "動画はどのように提供されますか?",
    a: "専用クラウドからのダウンロード、または貴社 LMS へのデータ納品に対応します。",
  },
  {
    q: "SCORM パッケージには対応していますか?",
    a: "はい、ご希望の LMS フォーマットに合わせて SCORM 1.2 / 2004 でご提供可能です。",
  },
  {
    q: "カスタマイズは可能ですか?",
    a: "貴社特有の業務フロー・社内規定に合わせたカスタム映像の追加制作も承っております。",
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
      aria-labelledby="faq-heading"
      className="bg-secondary py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            FAQ
          </p>
          <h2
            id="faq-heading"
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
