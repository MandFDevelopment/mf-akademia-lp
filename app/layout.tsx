import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mf-akademia-lp.vercel.app";
const title = "AI × BIM / CAD リスキリング研修 | 株式会社 M&F";
const description =
  "建設業向け AI × BIM/CAD 研修動画 432 本。人材開発支援助成金 3/4 対応、1 人あたり実質負担 12 万円から。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "MF-AKADEMIA",
  keywords: [
    "AI",
    "BIM",
    "CAD",
    "建設業",
    "リスキリング",
    "研修",
    "人材開発支援助成金",
    "事業展開等リスキリング支援コース",
    "M&F",
    "MF-AKADEMIA",
  ],
  authors: [{ name: "株式会社 M&F" }],
  creator: "株式会社 M&F",
  publisher: "株式会社 M&F",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "MF-AKADEMIA",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MF-AKADEMIA — AI × BIM / CAD リスキリング研修",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  // Favicon / apple-icon are auto-detected from app/icon.png and app/apple-icon.png
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1B3C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
