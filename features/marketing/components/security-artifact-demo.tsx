"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedReveal } from "./animated-reveal";
import {
  CoverageCard,
  FindingExampleRow,
  SeverityCountStrip,
} from "./artifact-parts";
import { CodeWindow } from "./marketing-primitives";
import { useInView, usePrefersReducedMotion } from "@/features/marketing/lib/use-in-view";
import {
  securityCoverage,
  securityFindings,
} from "@/features/marketing/lib/content";
import {
  at,
  SECTION_DWELL_MS,
  securitySectionPhases,
  stagger,
} from "@/features/marketing/lib/panel-timeline";

export function SecurityArtifactDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reducedMotion = usePrefersReducedMotion();
  const [showCoverageStatus, setShowCoverageStatus] = useState(false);
  const [showCoverageBar, setShowCoverageBar] = useState(false);
  const [showFindingsCard, setShowFindingsCard] = useState(false);
  const [showFindingsHeader, setShowFindingsHeader] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);
  const [showCounts, setShowCounts] = useState(false);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setShowCoverageStatus(true);
      setShowCoverageBar(true);
      setShowFindingsCard(true);
      setShowFindingsHeader(true);
      setVisibleRows(securityFindings.examples.length);
      setShowCounts(true);
      return;
    }

    const dwellMs = SECTION_DWELL_MS;
    const timers: number[] = [];

    // Stage 1: Coverage card appears
    timers.push(
      window.setTimeout(
        () => setShowCoverageStatus(true),
        at(dwellMs, securitySectionPhases.coverageStatus),
      ),
    );
    timers.push(
      window.setTimeout(
        () => setShowCoverageBar(true),
        at(dwellMs, securitySectionPhases.coverageBar),
      ),
    );

    // Stage 2: Findings card slides up with ~45% overlap
    timers.push(
      window.setTimeout(
        () => setShowFindingsCard(true),
        at(dwellMs, securitySectionPhases.findingsHeader - 0.02),
      ),
    );
    timers.push(
      window.setTimeout(
        () => setShowFindingsHeader(true),
        at(dwellMs, securitySectionPhases.findingsHeader),
      ),
    );

    stagger(
      dwellMs,
      securitySectionPhases.findingsRowsStart,
      securitySectionPhases.findingsRowsEnd,
      securityFindings.examples.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleRows(i + 1), ms));
    });

    timers.push(
      window.setTimeout(
        () => setShowCounts(true),
        at(dwellMs, securitySectionPhases.severityCounts),
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} className="relative">
      {/* Card A: Coverage — base layer */}
      <AnimatedReveal threshold={0.3}>
        <CodeWindow title="kensa · security scan">
          <CoverageCard
            statusLine={securityCoverage.statusLine}
            healthLabel={securityCoverage.healthLabel}
            scannedPct={securityCoverage.scannedPct}
            unscannedPct={securityCoverage.unscannedPct}
            showStatus={showCoverageStatus}
            showBar={showCoverageBar}
          />
        </CodeWindow>
      </AnimatedReveal>

      {/* Card B: Findings — overlaps ~45% of Card A, offset right+down */}
      <AnimatePresence>
        {showFindingsCard && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 26, stiffness: 160, mass: 0.9 }}
            className="relative z-10 -mt-24 ml-3 md:-mt-28 md:ml-5"
          >
            <CodeWindow title="kensa · findings">
              <div className="space-y-4">
                <p
                  data-visible={showFindingsHeader}
                  className="landing-line-enter text-sm font-medium text-landing-on-dark"
                >
                  {securityFindings.header}
                </p>

                <div className="space-y-2">
                  {securityFindings.examples.map((example, index) => (
                    <FindingExampleRow
                      key={example.title}
                      title={example.title}
                      severity={example.severity}
                      detail={example.detail}
                      meta={example.meta}
                      visible={index < visibleRows}
                    />
                  ))}
                </div>

                <SeverityCountStrip
                  segments={securityFindings.bySeverity}
                  visible={showCounts}
                />
              </div>
            </CodeWindow>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
