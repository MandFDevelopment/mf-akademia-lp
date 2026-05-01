import type { Metadata } from "next"
import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/v3/Hero"
import { Problem } from "@/components/sections/v3/Problem"
import { Solution } from "@/components/sections/v3/Solution"
import { Pricing } from "@/components/sections/v3/Pricing"
import { Simulator } from "@/components/sections/v3/Simulator"
import { Grant } from "@/components/sections/Grant"
import { Company } from "@/components/sections/Company"
import { FAQ } from "@/components/sections/v3/FAQ"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mf-akademia-lp.vercel.app"
const title = "AI × 生産設計 編 | MF-AKADEMIA"
const description =
  "生産設計実務者のための AI 活用講座。約 290 本・総尺 約 65 時間、6 Phase 構成で生産設計を AI 標準化。人材開発支援助成金 3/4 対応。"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/v3" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: `${siteUrl}/v3`,
    siteName: "MF-AKADEMIA",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MF-AKADEMIA — AI × 生産設計 編",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
}

export default function V3Page() {
  return (
    <>
      <Nav mode="detail" />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Pricing />
        <Simulator />
        <Grant />
        <Company />
        <FAQ />
        <Contact defaultSeries="v3" />
      </main>
      <Footer />
    </>
  )
}
