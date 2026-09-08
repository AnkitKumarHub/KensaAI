"use client";

import { useEffect, useState } from "react";
import {
  PanelShell,
  PrStatusRow,
  UsageMeter,
  type PrStatus,
} from "./artifact-parts";
import {
  heroPrRows,
  heroSyncStats,
  heroUsage,
} from "@/features/marketing/lib/content";
import { at, stagger, trackPhases } from "@/features/marketing/lib/panel-timeline";

type TrackPanelProps = {
  playing: boolean;
  reducedMotion: boolean;
  runKey: number;
  dwellMs: number;
};

export function TrackPanel({
  playing,
  reducedMotion,
  runKey,
  dwellMs,
}: TrackPanelProps) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [row2Status, setRow2Status] = useState<PrStatus>("pending");
  const [showMeter, setShowMeter] = useState(false);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    setVisibleRows(0);
    setRow2Status("pending");
    setShowMeter(false);
    setShowSync(false);

    if (!playing) return;

    if (reducedMotion) {
      setVisibleRows(heroPrRows.length);
      setRow2Status("reviewed");
      setShowMeter(true);
      setShowSync(true);
      return;
    }

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
  }, [playing, reducedMotion, runKey, dwellMs]);

  return (
    <PanelShell title="kensa · pull requests">
      <div className="relative z-[1] flex h-full flex-col gap-3">
        <div className="space-y-1.5">
          {heroPrRows.map((row, index) => (
            <PrStatusRow
              key={row.pr}
              repo={row.repo}
              pr={row.pr}
              status={index === 1 ? row2Status : row.status}
              time={row.time}
              visible={index < visibleRows}
              staggerIndex={index}
            />
          ))}
        </div>

        <UsageMeter
          used={heroUsage.used}
          limit={heroUsage.limit}
          label={heroUsage.label}
          visible={showMeter}
        />

        <div
          data-visible={showSync}
          className="landing-line-enter landing-panel-surface mt-auto flex items-center justify-between px-3 py-2.5 text-sm"
        >
          <div>
            <p className="text-landing-on-dark">{heroSyncStats.repo}</p>
            <p className="text-xs text-landing-on-dark-soft">codebase sync</p>
          </div>
          <div className="text-right">
            <p className="text-landing-success">{heroSyncStats.status}</p>
            <p className="font-mono text-xs text-landing-on-dark-soft">
              {heroSyncStats.chunks.toLocaleString()} chunks
            </p>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
