import { limitsItems, roadmapItems } from "@/features/marketing/lib/content";
import { MarketingSection } from "./marketing-primitives";

export function LimitsBand() {
  return (
    <MarketingSection className="bg-landing-canvas">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-sm text-landing-coral">Today</p>
          <h2 className="font-landing-display text-3xl leading-tight tracking-tight md:text-4xl">
            What it doesn&apos;t do yet.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-landing-body">
            We&apos;d rather be honest than oversell. Here&apos;s where Kensa
            stops today.
          </p>
          <ul className="mt-8 space-y-5">
            {limitsItems.map((item) => (
              <li key={item.title}>
                <p className="font-medium text-landing-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-landing-body">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-landing-surface-card p-8">
          <p className="mb-3 font-mono text-sm text-landing-coral">Next</p>
          <h3 className="font-landing-display text-2xl text-landing-ink">
            On the roadmap
          </h3>
          <ul className="mt-6 space-y-3">
            {roadmapItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-landing-body"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-landing-coral" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MarketingSection>
  );
}
