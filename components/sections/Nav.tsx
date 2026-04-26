"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/nav-links"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

export function Nav() {
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 120], [80, 60])
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 40))
    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.header
      style={{ height }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href="#top"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary sm:text-xl"
          aria-label="MF-AKADEMIA トップへ"
        >
          <span className="inline-block h-6 w-1 bg-brand-amber" aria-hidden />
          MF-AKADEMIA
        </Link>

        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                size="sm"
                nativeButton={false}
                render={
                  <a
                    href="#contact"
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "nav_desktop",
                        label: "contact",
                      })
                    }
                  />
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                資料請求・お問い合わせ
              </Button>
            </li>
          </ul>
        </nav>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="メニューを開く"
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left text-primary">MF-AKADEMIA</SheetTitle>
            </SheetHeader>
            <nav aria-label="モバイルナビゲーション" className="mt-6 px-4">
              <ul className="space-y-4 text-base font-medium">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-border py-2 text-foreground hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                nativeButton={false}
                render={
                  <a
                    href="#contact"
                    onClick={() => {
                      trackEvent("cta_click", {
                        location: "nav_mobile",
                        label: "contact",
                      })
                      setMobileOpen(false)
                    }}
                  />
                }
                className="mt-8 w-full bg-primary text-primary-foreground"
              >
                資料請求・お問い合わせ
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
