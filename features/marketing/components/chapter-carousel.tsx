"use client";

import { useCallback } from "react";
import { heroChapters } from "@/features/marketing/lib/content";
import { useChapterAutoplay } from "@/features/marketing/lib/use-chapter-autoplay";
import { cn } from "@/lib/utils";
import { UnderstandPanel } from "./understand-panel";
import { ReviewPanel } from "./review-panel";
import { TrackPanel } from "./track-panel";

const panels = {
  understand: UnderstandPanel,
  review: ReviewPanel,
  track: TrackPanel,
} as const;

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function canHoverSwitch() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(FINE_POINTER_QUERY).matches
  );
}

export function ChapterCarousel() {
  const { ref, activeIndex, goTo, progressRunning, reducedMotion, dwellMs } =
    useChapterAutoplay({ count: heroChapters.length });

  const onTabHover = useCallback(
    (index: number) => {
      if (!canHoverSwitch()) return;
      if (index === activeIndex) return;
      goTo(index);
    },
    [activeIndex, goTo],
  );

  return (
    <div ref={ref} className="w-full">
      <div className="landing-stage">
        <div
          aria-label="Product chapters, auto-advancing"
          className="flex gap-1 overflow-x-auto border-b border-white/5 px-3 pt-3 pb-2 md:gap-2 md:px-4"
        >
          {heroChapters.map((chapter, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={chapter.id}
                id={`hero-tab-${chapter.id}`}
                role="presentation"
                onMouseEnter={() => onTabHover(index)}
                className={cn(
                  "landing-chapter-tab shrink-0 rounded-lg px-2.5 py-2 text-left md:px-3",
                  isActive
                    ? "text-landing-on-dark"
                    : "text-landing-on-dark-soft opacity-50",
                )}
              >
                <div className="flex items-baseline gap-2 whitespace-nowrap">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      isActive ? "text-landing-coral" : "text-landing-on-dark-soft",
                    )}
                  >
                    {chapter.number}
                  </span>
                  <span className="text-sm font-medium tracking-wide">
                    {chapter.label}
                  </span>
                  {isActive ? (
                    <span className="hidden text-sm text-landing-on-dark-soft sm:inline">
                      {chapter.subtitle}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/10">
                  {isActive ? (
                    <span
                      key={activeIndex}
                      data-running={progressRunning && !reducedMotion}
                      className="landing-progress-bar block h-full bg-landing-coral"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative h-[400px] lg:h-[440px]">
          <div className="flex h-full">
            {heroChapters.map((chapter, index) => {
              const isActive = index === activeIndex;
              const Panel = panels[chapter.id];

              return (
                <div
                  key={chapter.id}
                  role="group"
                  id={`hero-panel-${chapter.id}`}
                  aria-labelledby={`hero-tab-${chapter.id}`}
                  aria-hidden={!isActive}
                  data-active={isActive}
                  className={cn(
                    "landing-accordion-col h-full",
                    !isActive && "max-lg:hidden",
                  )}
                >
                  <div className="landing-accordion-panel">
                    <Panel
                      playing={isActive}
                      reducedMotion={reducedMotion}
                      runKey={isActive ? activeIndex : -1}
                      dwellMs={dwellMs}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-landing-surface-dark to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
