/** Single source of truth for hero chapter dwell + panel story pacing. */
export const CHAPTER_DWELL_MS = 8000;

/** Shorter dwell for below-the-fold demos that play once on scroll. */
export const SECTION_DWELL_MS = 5000;

/** Convert a 0–1 fraction of the dwell into milliseconds. */
export function at(dwellMs: number, fraction: number): number {
  return Math.round(dwellMs * fraction);
}

/** Evenly space `count` beats between `start` and `end` fractions (inclusive endpoints). */
export function stagger(
  dwellMs: number,
  start: number,
  end: number,
  count: number,
): number[] {
  if (count <= 0) return [];
  if (count === 1) return [at(dwellMs, start)];
  return Array.from({ length: count }, (_, i) =>
    at(dwellMs, start + ((end - start) * i) / (count - 1)),
  );
}

export const understandPhases = {
  filesStart: 0.05,
  filesEnd: 0.25,
  typingStart: 0.25,
  typingEnd: 0.45,
  hitsStart: 0.45,
  hitsEnd: 0.8,
  footer: 0.85,
} as const;

export const reviewPhases = {
  severity: 0.04,
  diffStart: 0.08,
  diffEnd: 0.32,
  card: 0.34,
  explanation: 0.38,
  commentsStart: 0.42,
  commentsEnd: 0.62,
  suggestion: 0.68,
  chipsStart: 0.75,
  chipsEnd: 0.92,
} as const;

export const trackPhases = {
  rowsStart: 0.05,
  rowsEnd: 0.4,
  statusReviewed: 0.55,
  meter: 0.65,
  sync: 0.78,
} as const;

export const reviewSectionPhases = {
  finding: 0.04,
  diffStart: 0.08,
  diffEnd: 0.32,
  explanation: 0.36,
  suggestion: 0.55,
  overlay: 0.68,
  chipsStart: 0.72,
  chipsEnd: 0.9,
} as const;

export const securitySectionPhases = {
  coverageStatus: 0.06,
  coverageBar: 0.22,
  findingsHeader: 0.12,
  findingsRowsStart: 0.28,
  findingsRowsEnd: 0.55,
  severityCounts: 0.7,
} as const;
