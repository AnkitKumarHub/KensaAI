"use client";

import { useEffect, useState } from "react";
import {
  BotCommentCard,
  DiffBlock,
  DimensionChips,
  PanelShell,
  SeverityStrip,
} from "./artifact-parts";
import {
  heroDiffLines,
  heroReviewLines,
  reviewDimensions,
} from "@/features/marketing/lib/content";
import { at, reviewPhases, stagger } from "@/features/marketing/lib/panel-timeline";

type ReviewPanelProps = {
  playing: boolean;
  reducedMotion: boolean;
  runKey: number;
  dwellMs: number;
};

export function ReviewPanel({
  playing,
  reducedMotion,
  runKey,
  dwellMs,
}: ReviewPanelProps) {
  const [visibleDiff, setVisibleDiff] = useState(0);
  const [visibleComments, setVisibleComments] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const [visibleChips, setVisibleChips] = useState(0);
  const [showSeverity, setShowSeverity] = useState(false);

  useEffect(() => {
    setVisibleDiff(0);
    setVisibleComments(0);
    setCardVisible(false);
    setVisibleChips(0);
    setShowSeverity(false);

    if (!playing) return;

    if (reducedMotion) {
      setVisibleDiff(heroDiffLines.length);
      setVisibleComments(heroReviewLines.length);
      setCardVisible(true);
      setVisibleChips(reviewDimensions.length);
      setShowSeverity(true);
      return;
    }

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => setShowSeverity(true), at(dwellMs, 0.04)),
    );

    stagger(
      dwellMs,
      reviewPhases.diffStart,
      reviewPhases.diffEnd,
      heroDiffLines.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleDiff(i + 1), ms));
    });

    timers.push(
      window.setTimeout(() => setCardVisible(true), at(dwellMs, reviewPhases.card)),
    );

    stagger(
      dwellMs,
      reviewPhases.commentsStart,
      reviewPhases.commentsEnd,
      heroReviewLines.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleComments(i + 1), ms));
    });

    stagger(
      dwellMs,
      reviewPhases.chipsStart,
      reviewPhases.chipsEnd,
      reviewDimensions.length,
    ).forEach((ms, i) => {
      timers.push(window.setTimeout(() => setVisibleChips(i + 1), ms));
    });

    return () => timers.forEach(clearTimeout);
  }, [playing, reducedMotion, runKey, dwellMs]);

  const typing =
    cardVisible &&
    visibleComments > 0 &&
    visibleComments < heroReviewLines.length;

  return (
    <PanelShell title="acme/platform · PR #482 · src/auth/session.ts">
      <div className="relative z-[1] h-full">
        <SeverityStrip visible={showSeverity} />

        <DiffBlock lines={heroDiffLines} visibleCount={visibleDiff} />

        <div
          data-visible={cardVisible}
          className="landing-overlay-card absolute right-2 bottom-14 left-2 z-10 md:right-4 md:left-8"
        >
          <BotCommentCard
            lines={heroReviewLines}
            visibleCount={visibleComments}
            showCursor={typing}
            showAction
          />
        </div>

        <div className="absolute right-0 bottom-0 left-0 pt-2">
          <DimensionChips visibleCount={visibleChips} />
        </div>
      </div>
    </PanelShell>
  );
}
