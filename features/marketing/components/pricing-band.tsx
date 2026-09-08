"use client";

import { pricingTiers } from "@/features/marketing/lib/content";
import { cn } from "@/lib/utils";
import { Eyebrow, MarketingButton, MarketingSection } from "./marketing-primitives";
import { motion } from "motion/react";
import { useInView } from "@/features/marketing/lib/use-in-view";

const tierOrderClass: Record<string, string> = {
  hobby: "order-2 lg:order-1",
  pro: "order-1 lg:order-2",
  team: "order-3 lg:order-3",
};

function getButtonVariant(tierId: string, featured?: boolean) {
  if (featured) return "primary-on-dark";
  if (tierId === "team") return "secondary";
  return "secondary";
}

export function PricingBand() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <MarketingSection id="pricing" className="bg-landing-surface-soft">
      <div className="mb-12 text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="font-landing-display text-3xl leading-tight tracking-tight md:text-4xl">
          Start free. Scale when you&apos;re ready.
        </h2>
      </div>

      <div ref={ref} className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: index * 0.12,
              type: "spring",
              damping: 28,
              stiffness: 180,
              mass: 0.8,
            }}
            className={cn(
              "relative flex flex-col rounded-xl p-8",
              tierOrderClass[tier.id],
              tier.featured
                ? "bg-landing-surface-dark text-landing-on-dark ring-1 ring-landing-coral/25 shadow-[0_8px_48px_rgba(196,108,60,0.12)] lg:scale-[1.03] lg:py-10"
                : "border border-landing-hairline bg-landing-canvas",
            )}
          >
            {tier.badge && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  damping: 20,
                  stiffness: 200,
                }}
                className="absolute -top-3 left-6 rounded-full bg-landing-coral px-3 py-1 text-xs font-medium tracking-wide text-landing-on-coral uppercase shadow-[0_2px_12px_rgba(196,108,60,0.35)]"
              >
                {tier.badge}
              </motion.span>
            )}

            <div className="mb-6">
              <h3
                className={cn(
                  "font-landing-display text-2xl",
                  tier.featured ? "text-landing-on-dark" : "text-landing-ink",
                )}
              >
                {tier.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span
                  className={cn(
                    "font-landing-display text-4xl tracking-tight",
                    tier.featured ? "text-landing-on-dark" : "text-landing-ink",
                  )}
                >
                  {tier.price}
                </span>
                {tier.priceNote && (
                  <span className={tier.featured ? "text-landing-on-dark-soft" : "text-landing-muted"}>
                    {tier.priceNote}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  tier.featured ? "text-landing-on-dark-soft" : "text-landing-body",
                )}
              >
                {tier.description}
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {tier.scopeIntro && (
                <li
                  className={cn(
                    "text-sm font-medium",
                    tier.featured ? "text-landing-on-dark" : "text-landing-ink",
                  )}
                >
                  {tier.scopeIntro}
                </li>
              )}
              {tier.features.map((feature, featureIndex) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: index * 0.12 + 0.3 + featureIndex * 0.06,
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={cn(
                    "flex items-start gap-2 text-sm leading-relaxed",
                    tier.featured ? "text-landing-on-dark-soft" : "text-landing-body",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 size-1.5 shrink-0 rounded-full",
                      tier.featured ? "bg-landing-coral" : "bg-landing-coral/80",
                    )}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>

            <MarketingButton
              href={tier.ctaHref}
              variant={getButtonVariant(tier.id, tier.featured)}
              className="w-full"
            >
              {tier.cta}
            </MarketingButton>
          </motion.div>
        ))}
      </div>
    </MarketingSection>
  );
}

