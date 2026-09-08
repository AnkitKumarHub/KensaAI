import { siteConfig } from "@/lib/site-config";
import { MarketingButton } from "./marketing-primitives";
import { ChapterCarousel } from "./chapter-carousel";

export function Hero({ isAuthenticated }: { isAuthenticated: boolean }) {
  const installHref = isAuthenticated
    ? siteConfig.githubInstallPath
    : `${siteConfig.signInPath}?callbackUrl=${encodeURIComponent(siteConfig.githubInstallPath)}`;

  return (
    <section className="bg-landing-canvas px-6 pt-16 pb-10 md:px-8 md:pt-20 lg:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-medium tracking-[0.2em] text-landing-muted uppercase">
            AI CODE REVIEW
          </p>
          <h1 className="font-landing-display text-[2.75rem] leading-[1.05] tracking-tight text-landing-ink md:text-5xl lg:text-[3.5rem]">
            See deeper.
            <br />
            Ship safer.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-landing-body md:text-lg">
            {siteConfig.name} reviews every pull request the moment it opens:
            correctness, security, performance, reliability, grounded in the rest
            of your repository, not just the diff.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MarketingButton href={installHref}>Install the GitHub App</MarketingButton>
            <MarketingButton href="#chapter-review" variant="secondary">
              See a real review
            </MarketingButton>
          </div>
          <p className="mt-4 text-sm text-landing-muted">
            Five reviews a month, free. No credit card.
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <ChapterCarousel />
        </div>
      </div>
    </section>
  );
}
