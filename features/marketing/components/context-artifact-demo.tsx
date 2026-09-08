"use client";

import { useEffect, useState } from "react";
import { AnimatedReveal } from "./animated-reveal";
import {
  FileRailItem,
  RetrievalHitRow,
} from "./artifact-parts";
import { CodeWindow } from "./marketing-primitives";
import { useInView, usePrefersReducedMotion } from "@/features/marketing/lib/use-in-view";
import {
  heroFileRail,
  heroRetrievalHits,
  heroSyncStats,
  skippedPaths,
} from "@/features/marketing/lib/content";
import {
  at,
  SECTION_DWELL_MS,
  stagger,
  understandPhases,
} from "@/features/marketing/lib/panel-timeline";

const QUERY = "feat(auth): reject expired refresh tokens";

export function ContextArtifactDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reducedMotion = usePrefersReducedMotion();
  const [typedQuery, setTypedQuery] = useState("");
  const [visibleHits, setVisibleHits] = useState(0);
  const [visibleFiles, setVisibleFiles] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setTypedQuery(QUERY);
      setVisibleHits(heroRetrievalHits.length);
      setVisibleFiles(heroFileRail.length);
      setShowFooter(true);
      return;
    }

    const dwellMs = SECTION_DWELL_MS;
    const timers: number[] = [];
    let typeInterval: number | undefined;

    stagger(
      dwellMs,
      understandPhases.filesStart,
      understandPhases.filesEnd,
      Math.min(4, heroFileRail.length),
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleFiles(i + 1), ms));
    });

    const typingStart = at(dwellMs, understandPhases.typingStart);
    const typingEnd = at(dwellMs, understandPhases.typingEnd);
    const charDelay = Math.max((typingEnd - typingStart) / QUERY.length, 1);

    timers.push(
      window.setTimeout(() => {
        let charIndex = 0;
        typeInterval = window.setInterval(() => {
          charIndex += 1;
          setTypedQuery(QUERY.slice(0, charIndex));
          if (charIndex >= QUERY.length && typeInterval) clearInterval(typeInterval);
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
  }, [inView, reducedMotion]);

  return (
    <div ref={ref}>
      <AnimatedReveal threshold={0.3}>
        <CodeWindow title="vector search · feat(auth): reject expired tokens">
          <div className="space-y-3 text-xs md:text-sm">
            <div className="landing-panel-surface p-3">
              <p className="mb-2 text-landing-on-dark-soft">Query</p>
              <p className="min-h-[1.25rem] text-landing-on-dark">
                {typedQuery}
                <span
                  aria-hidden
                  className={`ml-0.5 inline-block h-3.5 w-0.5 bg-landing-coral landing-cursor align-middle transition-opacity ${
                    typedQuery.length < QUERY.length && !reducedMotion
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </p>
            </div>

            <div className="space-y-2">
              {heroRetrievalHits.map((hit, index) => (
                <RetrievalHitRow
                  key={hit.file}
                  file={hit.file}
                  score={hit.score}
                  lines={hit.lines}
                  visible={index < visibleHits}
                  staggerIndex={index}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-1 border-t border-white/5 pt-2">
              {heroFileRail.slice(0, 4).map((file, i) => (
                <FileRailItem
                  key={file.path}
                  path={file.path.split("/").pop() ?? file.path}
                  synced={file.synced}
                  visible={i < visibleFiles}
                  staggerIndex={i}
                />
              ))}
            </div>

            <div
              data-visible={showFooter}
              className="landing-line-enter space-y-2"
            >
              <div className="flex flex-wrap gap-1.5">
                {skippedPaths.map((path) => (
                  <span
                    key={path}
                    className="rounded border border-white/10 bg-landing-surface-dark px-2 py-0.5 font-mono text-[10px] text-landing-on-dark-soft"
                  >
                    skip · {path}
                  </span>
                ))}
              </div>
              <p className="text-landing-on-dark-soft">
                10 passages retrieved · {heroSyncStats.chunks.toLocaleString()}{" "}
                chunks indexed · labeled as context only
              </p>
            </div>
          </div>
        </CodeWindow>
      </AnimatedReveal>
    </div>
  );
}
