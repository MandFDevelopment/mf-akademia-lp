"use client"

import { motion } from "framer-motion"
import { ArrowDown, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TierCTAButtons } from "@/components/sections/shared/TierCTAButtons"
import { trackEvent } from "@/lib/analytics"

const BADGES = [
  "ISO 19650 認証取得",
  "Autodesk University 登壇実績",
  "建設 BIM 25 年の実績",
] as const

export function SeriesHero() {
  return (
    <section
      id="top"
      aria-label="ヒーロー"
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.25),transparent_55%),linear-gradient(180deg,#070D24_0%,#0F1B3C_60%,#132554_100%)]"
      />

      <div className="relative mx-auto flex min-h-[min(86vh,720px)] max-w-6xl flex-col justify-center px-6 py-24 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-brand-amber"
        >
          MF-AKADEMIA / 建設業 × AI リスキリングシリーズ
        </motion.p>

        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          設計図の読解で止まる現場を、
          <br className="hidden sm:inline" />
          <span className="text-brand-amber">なくす。</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          MF-AKADEMIA — AI × 建設業 リスキリング研修シリーズ。
          <br className="hidden sm:inline" />
          BIM・CAD のオペレーション標準化から、生産設計の AI 標準化まで。
          <br className="hidden sm:inline" />
          人材開発支援助成金 3/4 対応。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <TierCTAButtons pageId="top" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button
            size="lg"
            nativeButton={false}
            render={
              <a
                href="#contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "hero",
                    label: "contact_top",
                  })
                }
              />
            }
            className="bg-brand-amber text-primary hover:bg-brand-amber/90"
          >
            <Mail className="mr-2 size-5" />
            資料請求・お問い合わせ
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={
              <a
                href="#series"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "hero",
                    label: "series_jump_top",
                  })
                }
              />
            }
            className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
          >
            ラインナップを見る
            <ArrowDown className="ml-2 size-4" />
          </Button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-3"
        >
          {BADGES.map((b) => (
            <li
              key={b}
              className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-brand-amber" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
