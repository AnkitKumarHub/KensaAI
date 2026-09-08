import { siteConfig } from "@/lib/site-config";
import { MarketingButton, MarketingSection } from "./marketing-primitives";

export function CtaBand({ isAuthenticated }: { isAuthenticated: boolean }) {
  const installHref = isAuthenticated
    ? siteConfig.githubInstallPath
    : `${siteConfig.signInPath}?callbackUrl=${encodeURIComponent(siteConfig.githubInstallPath)}`;

  return (
    <MarketingSection className="bg-landing-canvas py-12 md:py-14">
      <div className="landing-coral-surface flex flex-col items-start justify-between gap-6 rounded-2xl px-8 py-12 md:flex-row md:items-center md:px-12 md:py-14">
        <div className="max-w-xl">
          <h2 className="font-landing-display text-3xl leading-tight tracking-tight text-landing-on-coral md:text-4xl">
            Put it on one repository.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-landing-on-coral/90">
            Install the app, open a pull request, and read what comes back.
          </p>
        </div>
        <div className="shrink-0">
          <MarketingButton href={installHref} variant="canvas-on-coral">
            Install the GitHub App
          </MarketingButton>
          <p className="mt-3 text-sm text-landing-on-coral/80">
            Hobby covers 5 reviews a month. No card required.
          </p>
        </div>
      </div>
    </MarketingSection>
  );
}
