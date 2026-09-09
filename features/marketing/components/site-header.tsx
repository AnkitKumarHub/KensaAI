import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site-config";
import { navLinks } from "@/features/marketing/lib/content";
import { MarketingButton } from "./marketing-primitives";

export function SiteHeader({ isAuthenticated }: { isAuthenticated: boolean }) {
  const installHref = isAuthenticated
    ? siteConfig.githubInstallPath
    : `${siteConfig.signInPath}?callbackUrl=${encodeURIComponent(siteConfig.githubInstallPath)}`;

  return (
    <header className="sticky top-0 z-50 border-b border-landing-hairline/80 bg-landing-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-landing-display text-lg tracking-[0.18em] text-landing-ink uppercase"
        >
          <BrandLogo width={28} height={28} variant="on-light" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="landing-link text-sm font-medium text-landing-muted transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              href={siteConfig.dashboardPath}
              className="landing-link hidden text-sm font-medium text-landing-muted transition-colors sm:inline"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href={siteConfig.signInPath}
              className="landing-link hidden text-sm font-medium text-landing-muted transition-colors sm:inline"
            >
              Sign in
            </Link>
          )}
          <MarketingButton href={installHref} variant="primary" className="h-9 px-4 text-sm">
            Install GitHub App
          </MarketingButton>
        </div>
      </div>
    </header>
  );
}
