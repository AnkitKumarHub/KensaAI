import type { Metadata } from "next";
import { getServerSession } from "@/features/auth/actions";
import { ChapterSections } from "@/features/marketing/components/chapter-sections";
import { CtaBand } from "@/features/marketing/components/cta-band";
import { Hero } from "@/features/marketing/components/hero";
import { LimitsBand } from "@/features/marketing/components/limits-band";
import { PipelineBand } from "@/features/marketing/components/pipeline-band";
import { PricingBand } from "@/features/marketing/components/pricing-band";
import { ProblemBand } from "@/features/marketing/components/problem-band";
import { PrMarquee } from "@/features/marketing/components/pr-marquee";
import { SiteFooter } from "@/features/marketing/components/site-footer";
import { SiteHeader } from "@/features/marketing/components/site-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default async function LandingPage() {
  const session = await getServerSession();
  const isAuthenticated = Boolean(session);

  return (
    <>
      <SiteHeader isAuthenticated={isAuthenticated} />
      <main>
        <Hero isAuthenticated={isAuthenticated} />
        <PrMarquee />
        <ProblemBand />
        <ChapterSections />
        <PipelineBand />
        <LimitsBand />
        <PricingBand />
        <CtaBand isAuthenticated={isAuthenticated} />
      </main>
      <SiteFooter />
    </>
  );
}
