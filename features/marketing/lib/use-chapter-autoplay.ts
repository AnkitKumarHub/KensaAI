"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTER_DWELL_MS } from "@/features/marketing/lib/panel-timeline";
import { useInView, usePrefersReducedMotion } from "@/features/marketing/lib/use-in-view";

type UseChapterAutoplayOptions = {
  count: number;
  initialIndex?: number;
};

export function useChapterAutoplay({
  count,
  initialIndex = 0,
}: UseChapterAutoplayOptions) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: false,
  });
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [tabHidden, setTabHidden] = useState(false);
  const [progressRunning, setProgressRunning] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const remainingRef = useRef(CHAPTER_DWELL_MS);

  const canAutoplay = !reducedMotion && inView && !tabHidden;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      clearTimer();
      remainingRef.current = CHAPTER_DWELL_MS;
      startedAtRef.current = null;
      setActiveIndex(((index % count) + count) % count);
    },
    [clearTimer, count],
  );

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Reset remaining time when chapter changes under autoplay
  useEffect(() => {
    remainingRef.current = CHAPTER_DWELL_MS;
    startedAtRef.current = null;
  }, [activeIndex]);

  useEffect(() => {
    clearTimer();

    if (!canAutoplay) {
      if (startedAtRef.current !== null) {
        const elapsed = Date.now() - startedAtRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        startedAtRef.current = null;
      }
      setProgressRunning(false);
      return;
    }

    setProgressRunning(true);
    startedAtRef.current = Date.now();
    const delay = remainingRef.current;

    timerRef.current = window.setTimeout(() => {
      remainingRef.current = CHAPTER_DWELL_MS;
      startedAtRef.current = null;
      setActiveIndex((prev) => (prev + 1) % count);
    }, delay);

    return clearTimer;
  }, [activeIndex, canAutoplay, clearTimer, count]);

  return {
    ref,
    activeIndex,
    goTo,
    progressRunning,
    reducedMotion,
    dwellMs: CHAPTER_DWELL_MS,
  };
}
