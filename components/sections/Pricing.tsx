import { Check, Star } from "lucide-react"
import { PLANS, formatWan, grantPerPerson } from "@/lib/pricing"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            料金プラン
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            人材開発支援助成金 3/4 活用で、
            <span className="font-semibold text-primary">
              1 人あたり実質 12 万円〜
            </span>
            。
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => {
            const perPersonGrant = grantPerPerson(plan.price)
            const netPerPerson = plan.price - perPersonGrant
            return (
              <li key={plan.id}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-7 transition-shadow",
                    plan.featured
                      ? "border-primary bg-primary text-primary-foreground shadow-lg"
                      : "border-border bg-background text-foreground",
                  )}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-brand-amber px-3 py-1 text-xs font-semibold text-primary">
                      <Star className="size-3" aria-hidden />
                      人気
                    </span>
                  )}

                  <h3
                    className={cn(
                      "text-lg font-semibold",
                      plan.featured ? "text-primary-foreground" : "text-primary",
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm leading-relaxed",
                      plan.featured ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {formatWan(plan.price)}
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          plan.featured ? "text-white/70" : "text-muted-foreground",
                        )}
                      >
                        / 人 (税別)
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-sm",
                        plan.featured ? "text-brand-amber" : "text-primary",
                      )}
                    >
                      助成金後 <span className="font-semibold">{formatWan(netPerPerson)}</span>
                      <span
                        className={cn(
                          "ml-1 text-xs",
                          plan.featured ? "text-white/60" : "text-muted-foreground",
                        )}
                      >
                        / 人
                      </span>
                    </p>
                  </div>

                  <div
                    className={cn(
                      "mt-6 grid grid-cols-2 gap-3 rounded-lg px-4 py-3 text-sm",
                      plan.featured ? "bg-white/10" : "bg-secondary",
                    )}
                  >
                    <div>
                      <div
                        className={cn(
                          "text-xs",
                          plan.featured ? "text-white/60" : "text-muted-foreground",
                        )}
                      >
                        トラック数
                      </div>
                      <div className="font-semibold">{plan.tracks} トラック</div>
                    </div>
                    <div>
                      <div
                        className={cn(
                          "text-xs",
                          plan.featured ? "text-white/60" : "text-muted-foreground",
                        )}
                      >
                        総尺
                      </div>
                      <div className="font-semibold">{plan.hours} 時間</div>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.featured ? "text-brand-amber" : "text-primary",
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            plan.featured ? "text-white/90" : "text-foreground",
                          )}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-2">
                    <Button
                      nativeButton={false}
                      render={<a href="#simulator" />}
                      className={cn(
                        "w-full",
                        plan.featured
                          ? "bg-brand-amber text-primary hover:bg-brand-amber/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                    >
                      このプランで試算する
                    </Button>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          ※ 助成金後の負担額は中小企業 (経費助成率 3/4) の場合の目安です。1 人あたり上限 72 万円・事業所年間上限 1 億円が適用されます。実際の助成額はお客様の計画内容・受講実績によって変動します。詳細はお問い合わせください。
        </p>
      </div>
    </section>
  )
}
