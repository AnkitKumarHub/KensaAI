"use client";

import { useEffect, useState } from "react";
import { AnimatedReveal } from "./animated-reveal";
import {
  CommittableSuggestion,
  DiffBlock,
  DimensionChips,
  FindingHeader,
} from "./artifact-parts";
import { CodeWindow } from "./marketing-primitives";
import { useInView, usePrefersReducedMotion } from "@/features/marketing/lib/use-in-view";
import { reviewFinding, reviewMeta } from "@/features/marketing/lib/content";
import {
  at,
  reviewSectionPhases,
  SECTION_DWELL_MS,
  stagger,
} from "@/features/marketing/lib/panel-timeline";

export function ReviewArtifactDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reducedMotion = usePrefersReducedMotion();
  const [showFinding, setShowFinding] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [visibleDiff, setVisibleDiff] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [visibleChips, setVisibleChips] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setShowFinding(true);
      setShowExplanation(true);
      setVisibleDiff(reviewFinding.diffLines.length);
      setShowSuggestion(true);
      setShowOverlay(true);
      setVisibleChips(reviewMeta.dimensions.length);
      return;
    }

    const dwellMs = SECTION_DWELL_MS;
    const timers: number[] = [];

    timers.push(
      window.setTimeout(
        () => setShowFinding(true),
        at(dwellMs, reviewSectionPhases.finding),
      ),
    );

    stagger(
      dwellMs,
      reviewSectionPhases.diffStart,
      reviewSectionPhases.diffEnd,
      reviewFinding.diffLines.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleDiff(i + 1), ms));
    });

    timers.push(
      window.setTimeout(
        () => setShowExplanation(true),
        at(dwellMs, reviewSectionPhases.explanation),
      ),
    );

    timers.push(
      window.setTimeout(
        () => setShowSuggestion(true),
        at(dwellMs, reviewSectionPhases.suggestion),
      ),
    );

    timers.push(
      window.setTimeout(
        () => setShowOverlay(true),
        at(dwellMs, reviewSectionPhases.overlay),
      ),
    );

    stagger(
      dwellMs,
      reviewSectionPhases.chipsStart,
      reviewSectionPhases.chipsEnd,
      reviewMeta.dimensions.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleChips(i + 1), ms));
    });

    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref}>
      <AnimatedReveal threshold={0.25}>
        <CodeWindow title="kensa-bot · review posted">
          <div className="relative min-h-[380px] md:min-h-[400px]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-landing-on-dark-soft">
                <span className="inline-flex size-5 items-center justify-center rounded-md bg-landing-coral/20 text-[10px] font-bold text-landing-coral">
                  K
                </span>
                <span className="font-medium text-landing-on-dark">
                  kensa-bot
                </span>
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] tracking-wide uppercase">
                  bot
                </span>
                <span>commented 2m ago</span>
              </div>

              <FindingHeader
                severityLabel={reviewFinding.severityLabel}
                severityLevel={reviewFinding.severityLevel}
                title={reviewFinding.title}
                explanation={reviewFinding.explanation}
                visible={showFinding}
                showExplanation={showExplanation}
              />

              <DiffBlock
                lines={reviewFinding.diffLines}
                visibleCount={visibleDiff}
                header={reviewFinding.hunkHeader}
              />

              <CommittableSuggestion
                label={reviewFinding.committableSuggestion.label}
                description={reviewFinding.committableSuggestion.description}
                code={reviewFinding.committableSuggestion.code}
                action={reviewFinding.committableSuggestion.action}
                visible={showSuggestion}
              />
            </div>

            <div
              data-visible={showOverlay}
              className="landing-overlay-card absolute right-0 bottom-0 left-0 z-10"
            >
              <div className="landing-panel-surface-elevated space-y-3 p-3">
                <p className="text-[11px] text-landing-on-dark-soft">
                  {reviewMeta.filesReviewed} files reviewed
                </p>
                <DimensionChips visibleCount={visibleChips} />
                <p className="text-xs leading-relaxed text-landing-on-dark-soft">
                  {reviewMeta.postingNote}
                </p>
              </div>
            </div>
          </div>
        </CodeWindow>
      </AnimatedReveal>
    </div>
  );
}
