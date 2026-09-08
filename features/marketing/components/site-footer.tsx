import { siteConfig } from "@/lib/site-config";
import { footerColumns } from "@/features/marketing/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-landing-surface-dark px-6 py-16 text-landing-on-dark-soft md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Brand */}
        <p className="mb-12 font-landing-display text-lg tracking-[0.18em] text-landing-on-dark uppercase">
          {siteConfig.name}
        </p>

        {/* Nav columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-medium tracking-wide text-landing-on-dark/60 uppercase">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-landing-on-dark-soft transition-colors duration-200 hover:text-landing-on-dark"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs sm:flex-row">
          <p>© {year} {siteConfig.name}</p>
          <p className="text-landing-on-dark-soft/50">
            Built in India
          </p>
        </div>
      </div>
    </footer>
  );
}


