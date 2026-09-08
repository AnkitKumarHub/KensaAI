import { siteConfig } from "@/lib/site-config";
import { footerColumns } from "@/features/marketing/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-landing-surface-dark px-6 py-16 text-landing-on-dark-soft md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 font-landing-display text-lg tracking-[0.18em] text-landing-on-dark uppercase">
          {siteConfig.name}
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-medium text-landing-on-dark">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="landing-footer-link text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-sm">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
