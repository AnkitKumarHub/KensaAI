"use client";

import { prMarqueeTitles } from "@/features/marketing/lib/content";
import { useInView, usePrefersReducedMotion } from "@/features/marketing/lib/use-in-view";

export function PrMarquee() {
  const { ref, inView } = useInView({ threshold: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const items = reducedMotion ? prMarqueeTitles : [...prMarqueeTitles, ...prMarqueeTitles];

  return (
    <div
      ref={ref}
      className="overflow-hidden border-y border-landing-hairline bg-landing-canvas py-4"
    >
      <div
        data-running={!reducedMotion && inView}
        className="landing-marquee flex w-max gap-8 whitespace-nowrap"
      >
        {items.map((title, i) => (
          <span
            key={`${title}-${i}`}
            className="font-mono text-sm text-landing-muted-soft"
          >
            #{100 + i} {title}
          </span>
        ))}
      </div>
    </div>
  );
}
