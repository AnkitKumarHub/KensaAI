"use client";

import { useEffect, useState } from "react";
import {
  FileRailItem,
  PanelShell,
  RetrievalHitRow,
} from "./artifact-parts";
import {
  heroFileRail,
  heroRetrievalHits,
} from "@/features/marketing/lib/content";
import {
  at,
  stagger,
  understandPhases,
} from "@/features/marketing/lib/panel-timeline";

const QUERY = "feat(auth): reject expired refresh tokens";

type UnderstandPanelProps = {
  playing: boolean;
  reducedMotion: boolean;
  runKey: number;
  dwellMs: number;
};

export function UnderstandPanel({
  playing,
  reducedMotion,
  runKey,
  dwellMs,
}: UnderstandPanelProps) {
  const [visibleFiles, setVisibleFiles] = useState(0);
  const [typedQuery, setTypedQuery] = useState("");
  const [visibleHits, setVisibleHits] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [showChip, setShowChip] = useState(false);

  useEffect(() => {
    setVisibleFiles(0);
    setTypedQuery("");
    setVisibleHits(0);
    setShowFooter(false);
    setShowChip(false);

    if (!playing) return;

    if (reducedMotion) {
      setVisibleFiles(heroFileRail.length);
      setTypedQuery(QUERY);
      setVisibleHits(heroRetrievalHits.length);
      setShowFooter(true);
      setShowChip(true);
      return;
    }

    const timers: number[] = [];
    let typeInterval: number | undefined;

    stagger(
      dwellMs,
      understandPhases.filesStart,
      understandPhases.filesEnd,
      heroFileRail.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleFiles(i + 1), ms));
    });

    timers.push(
      window.setTimeout(() => setShowChip(true), at(dwellMs, 0.08)),
    );

    const typingStart = at(dwellMs, understandPhases.typingStart);
    const typingEnd = at(dwellMs, understandPhases.typingEnd);
    const typingDuration = Math.max(typingEnd - typingStart, 1);
    const charDelay = typingDuration / QUERY.length;

    timers.push(
      window.setTimeout(() => {
        let charIndex = 0;
        typeInterval = window.setInterval(() => {
          charIndex += 1;
          setTypedQuery(QUERY.slice(0, charIndex));
          if (charIndex >= QUERY.length && typeInterval) {
            clearInterval(typeInterval);
          }
        }, charDelay);
      }, typingStart),
    );

    stagger(
      dwellMs,
      understandPhases.hitsStart,
      understandPhases.hitsEnd,
      heroRetrievalHits.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleHits(i + 1), ms));
    });

    timers.push(
      window.setTimeout(
        () => setShowFooter(true),
        at(dwellMs, understandPhases.footer),
      ),
    );

    return () => {
      timers.forEach(clearTimeout);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [playing, reducedMotion, runKey, dwellMs]);

  return (
    <PanelShell>
      <div className="relative z-[1] grid h-full grid-cols-[168px_1fr] gap-3">
        <div className="landing-panel-surface flex flex-col">
          <p className="border-b border-white/5 px-2.5 py-2 font-mono text-[10px] tracking-wide text-landing-on-dark-soft uppercase">
            Synced files
          </p>
          <div className="flex-1 py-1">
            {heroFileRail.map((file, i) => (
              <FileRailItem
                key={file.path}
                path={file.path}
                synced={file.synced}
                visible={i < visibleFiles}
                staggerIndex={i}
              />
            ))}
          </div>
          <div
            data-visible={showChip}
            className="landing-line-enter border-t border-white/5 px-2.5 py-2"
          >
            <span className="inline-flex rounded-full bg-landing-coral/15 px-2 py-0.5 font-mono text-[10px] text-landing-coral">
              200 files indexed
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="landing-panel-surface p-3">
            <p className="mb-2 text-[11px] text-landing-on-dark-soft">Query</p>
            <p className="min-h-[1.25rem] font-mono text-sm text-landing-on-dark">
              {typedQuery}
              <span
                aria-hidden
                className={`ml-0.5 inline-block h-3.5 w-0.5 bg-landing-coral landing-cursor align-middle transition-opacity ${
                  typedQuery.length < QUERY.length && playing && !reducedMotion
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] tracking-wide text-landing-on-dark-soft uppercase">
                Retrieval
              </p>
              <p className="font-mono text-[10px] text-landing-on-dark-soft">
                {visibleHits}/{heroRetrievalHits.length} hits
              </p>
            </div>
            <div className="space-y-2">
              {heroRetrievalHits.map((hit, i) => (
                <RetrievalHitRow
                  key={hit.file}
                  file={hit.file}
                  score={hit.score}
                  lines={hit.lines}
                  visible={i < visibleHits}
                  staggerIndex={i}
                />
              ))}
            </div>
          </div>

          <div
            data-visible={showFooter}
            className="landing-line-enter mt-auto font-mono text-[11px] text-landing-on-dark-soft"
          >
            200 files · 80-line chunks · 23 file types
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
