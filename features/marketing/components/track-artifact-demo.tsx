"use client";

import { useEffect, useState } from "react";
import { AnimatedReveal } from "./animated-reveal";
import {
  PrStatusRow,
  QueueTable,
  SyncStateRow,
  UsageMeter,
  type PrStatus,
} from "./artifact-parts";
import { CodeWindow } from "./marketing-primitives";
import { useInView, usePrefersReducedMotion } from "@/features/marketing/lib/use-in-view";
import {
  heroPrRows,
  heroSyncStats,
  heroUsage,
} from "@/features/marketing/lib/content";
import {
  at,
  SECTION_DWELL_MS,
  stagger,
  trackPhases,
} from "@/features/marketing/lib/panel-timeline";

export function TrackArtifactDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reducedMotion = usePrefersReducedMotion();
  const [visibleRows, setVisibleRows] = useState(0);
  const [row2Status, setRow2Status] = useState<PrStatus>("pending");
  const [showMeter, setShowMeter] = useState(false);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setVisibleRows(heroPrRows.length);
      setRow2Status("reviewed");
      setShowMeter(true);
      setShowSync(true);
      return;
    }

    const dwellMs = SECTION_DWELL_MS;
    const timers: number[] = [];

    stagger(
      dwellMs,
      trackPhases.rowsStart,
      trackPhases.rowsEnd,
      heroPrRows.length,
    ).forEach((ms, i) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleRows(i + 1);
          if (i === 1) setRow2Status("processing");
        }, ms),
      );
    });

    timers.push(
      window.setTimeout(
        () => setRow2Status("reviewed"),
        at(dwellMs, trackPhases.statusReviewed),
      ),
    );
    timers.push(
      window.setTimeout(() => setShowMeter(true), at(dwellMs, trackPhases.meter)),
    );
    timers.push(
      window.setTimeout(() => setShowSync(true), at(dwellMs, trackPhases.sync)),
    );

    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref}>
      <AnimatedReveal threshold={0.3}>
        <CodeWindow title="kensa · pull requests">
          <div className="space-y-3">
            <QueueTable>
              {heroPrRows.map((row, index) => (
                <PrStatusRow
                  key={row.pr}
                  repo={row.repo}
                  pr={row.pr}
                  status={index === 1 ? row2Status : row.status}
                  time={row.time}
                  visible={index < visibleRows}
                  staggerIndex={index}
                  dense
                />
              ))}
            </QueueTable>

            <SyncStateRow
              repo={heroSyncStats.repo}
              chunks={heroSyncStats.chunks}
              status={heroSyncStats.status}
              visible={showSync}
            />

            <UsageMeter
              used={heroUsage.used}
              limit={heroUsage.limit}
              label={heroUsage.label}
              visible={showMeter}
            />
          </div>
        </CodeWindow>
      </AnimatedReveal>
    </div>
  );
}
