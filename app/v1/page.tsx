import type { Metadata } from "next"
import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/Hero"
import { Problem } from "@/components/sections/Problem"
import { Solution } from "@/components/sections/Solution"
import { Pricing } from "@/components/sections/Pricing"
import { Simulator } from "@/components/sections/Simulator"
import { Grant } from "@/components/sections/Grant"
import { Company } from "@/components/sections/Company"
import { FAQ } from "@/components/sections/FAQ"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mf-akademia-lp.vercel.app"
const title = "BIM × CAD × AI 編 | MF-AKADEMIA"
const description =
  "建設業向け AI × BIM/CAD 研修動画 432 本。人材開発支援助成金 3/4 対応、1 人あたり実質負担 12 万円から。"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/v1" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: `${siteUrl}/v1`,
    siteName: "MF-AKADEMIA",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MF-AKADEMIA — BIM × CAD × AI 編",
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

export default function V1Page() {
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
        <Contact defaultSeries="v1" />
      </main>
      <Footer />
    </>
  )
}
