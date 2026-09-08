import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MarketingSection({
  id,
  className,
  children,
  dark = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 px-6 py-14 md:px-8 md:py-18 lg:py-20",
        dark ? "bg-landing-surface-dark text-landing-on-dark" : "bg-landing-canvas text-landing-ink",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-medium tracking-[0.2em] text-landing-muted uppercase">
      {children}
    </p>
  );
}

export function ChapterHeading({
  number,
  label,
  title,
  lede,
  className,
  dark = false,
}: {
  number: string;
  label: string;
  title: string;
  lede?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <p
        className={cn(
          "mb-3 font-mono text-sm",
          dark ? "text-landing-on-dark-soft" : "text-landing-muted",
        )}
      >
        <span className="text-landing-coral">{number}</span> {label}
      </p>
      {lede && (
        <p
          className={cn(
            "mb-2 font-landing-display text-xl md:text-2xl",
            dark ? "text-landing-on-dark-soft" : "text-landing-muted",
          )}
        >
          {lede}
        </p>
      )}
      <h2
        className={cn(
          "font-landing-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]",
          dark ? "text-landing-on-dark" : "text-landing-ink",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

export function FeatureBullets({
  items,
  dark = false,
}: {
  items: { lead: string; body: string }[];
  dark?: boolean;
}) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.lead} className="max-w-xl">
          <p
            className={cn(
              "font-medium",
              dark ? "text-landing-on-dark" : "text-landing-ink",
            )}
          >
            {item.lead}
          </p>
          <p
            className={cn(
              "mt-1 text-base leading-relaxed",
              dark ? "text-landing-on-dark-soft" : "text-landing-body",
            )}
          >
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function CodeWindow({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "landing-panel-surface overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(20,20,19,0.18)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-landing-surface-dark-elevated px-4 py-3">
        <span className="size-2.5 rounded-full bg-landing-error/80" />
        <span className="size-2.5 rounded-full bg-landing-warning/80" />
        <span className="size-2.5 rounded-full bg-landing-success/80" />
        {title && (
          <span className="ml-2 truncate font-mono text-xs text-landing-on-dark-soft">
            {title}
          </span>
        )}
      </div>
      <div className="bg-landing-surface-dark-soft p-4 font-mono text-sm leading-relaxed md:p-5">
        {children}
      </div>
    </div>
  );
}

export function DiffLine({
  type,
  children,
  lineNo,
  className,
}: {
  type: "add" | "remove" | "context";
  children: ReactNode;
  lineNo?: number;
  className?: string;
}) {
  const styles = {
    add: "bg-landing-success/10 text-landing-success",
    remove: "bg-landing-error/10 text-landing-error/90",
    context: "text-landing-on-dark-soft",
  };

  return (
    <div className={cn("flex gap-3 px-2 py-0.5", styles[type], className)}>
      <span className="w-6 shrink-0 select-none text-right text-landing-muted-soft">
        {lineNo ?? ""}
      </span>
      <span className="w-4 shrink-0 select-none">
        {type === "add" ? "+" : type === "remove" ? "−" : " "}
      </span>
      <code className="min-w-0 flex-1 whitespace-pre-wrap break-all">{children}</code>
    </div>
  );
}

export function MarketingButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "primary-on-dark" | "secondary" | "secondary-dark" | "canvas-on-coral";
  className?: string;
}) {
  const variants = {
    primary: "landing-btn landing-btn-primary bg-landing-coral-active text-landing-on-coral",
    "primary-on-dark":
      "landing-btn landing-btn-primary bg-landing-coral-active text-landing-on-coral",
    secondary:
      "landing-btn landing-btn-secondary border border-landing-hairline bg-landing-canvas text-landing-ink",
    "secondary-dark":
      "landing-btn landing-btn-secondary-dark border border-white/15 bg-landing-surface-dark-elevated text-landing-on-dark",
    "canvas-on-coral":
      "landing-btn landing-btn-canvas bg-landing-canvas text-landing-ink",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-landing-coral/40 focus-visible:ring-offset-2 focus-visible:outline-none",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
