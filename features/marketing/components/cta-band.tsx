"use client";

import { siteConfig } from "@/lib/site-config";
import { MarketingButton, MarketingSection } from "./marketing-primitives";
import { motion } from "motion/react";
import { useInView } from "@/features/marketing/lib/use-in-view";

export function CtaBand({ isAuthenticated }: { isAuthenticated: boolean }) {
  const installHref = isAuthenticated
    ? siteConfig.githubInstallPath
    : `${siteConfig.signInPath}?callbackUrl=${encodeURIComponent(siteConfig.githubInstallPath)}`;

  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <MarketingSection className="bg-landing-canvas py-12 md:py-14">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: "spring", damping: 30, stiffness: 180, mass: 0.8 }}
        className="landing-coral-surface flex flex-col items-start justify-between gap-8 rounded-2xl px-8 py-12 md:flex-row md:items-center md:px-14 md:py-16"
      >
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-landing-display text-3xl leading-tight tracking-tight text-landing-on-coral md:text-4xl"
          >
            Put it on one repository.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-3 text-base leading-relaxed text-landing-on-coral/90"
          >
            Install the app, open a pull request, and read what comes back.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, type: "spring", damping: 24, stiffness: 200 }}
          className="shrink-0"
        >
          <MarketingButton href={installHref} variant="canvas-on-coral">
            Install the GitHub App
          </MarketingButton>
          <p className="mt-3 text-sm text-landing-on-coral/70">
            Hobby covers 5 reviews a month. No card required.
          </p>
        </motion.div>
      </motion.div>
    </MarketingSection>
  );
}

