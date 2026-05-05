"use client"

import { Compass, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

type PageId = "top" | "v1" | "v3"

type TierCTAButtonsProps = {
  pageId: PageId
}

const TIERS = [
  {
    tier: "executive" as const,
    href: "/resources/diagnosis",
    label: "経営者・決裁者の方へ",
    sub: "次世代建設業 移行診断(無料・3分)",
    Icon: Compass,
  },
  {
    tier: "manager" as const,
    href: "#contact",
    label: "現場担当者の方へ",
    sub: "MF-AKADEMIAの説明資料ダウンロード",
    Icon: FileSpreadsheet,
  },
] as const

export function TierCTAButtons({ pageId }: TierCTAButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {TIERS.map(({ tier, href, label, sub, Icon }) => (
        <Button
          key={tier}
          size="lg"
          variant="outline"
          nativeButton={false}
          render={
            <a
              href={href}
              data-cta-tier={tier}
              onClick={() =>
                trackEvent("cta_click", {
                  location: "hero",
                  label: `tier_${tier}_${pageId}`,
                  tier,
                })
              }
            />
          }
          className="group/tier h-auto items-start gap-3 border-white/40 bg-transparent px-5 py-3.5 text-left text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        >
          <Icon className="mt-0.5 size-5 shrink-0 text-brand-amber" aria-hidden />
          <span className="flex flex-1 flex-col leading-tight">
            <span className="text-sm font-semibold sm:text-base">{label}</span>
            <span className="mt-1 text-xs text-white/70 sm:text-sm">
              <span aria-hidden>→ </span>
              {sub}
            </span>
          </span>
        </Button>
      ))}
    </div>
  )
}
