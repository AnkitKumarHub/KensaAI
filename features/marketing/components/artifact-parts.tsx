import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { DiffLine } from "./marketing-primitives";
import { reviewDimensions } from "@/features/marketing/lib/content";

export function DiffBlock({
  lines,
  visibleCount,
  header = "@@ -42,2 +42,3 @@ export async function createSession",
}: {
  lines: { type: "add" | "remove" | "context"; lineNo?: number; content: string }[];
  visibleCount: number;
  header?: string;
}) {
  return (
    <div className="landing-panel-surface">
      <div className="border-b border-white/5 px-3 py-2 font-mono text-[11px] text-landing-on-dark-soft">
        {header}
      </div>
      <div className="p-1">
        {lines.map((line, index) => (
          <div
            key={`${line.type}-${line.lineNo}-${index}`}
            data-visible={index < visibleCount}
            className="landing-line-enter"
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <DiffLine type={line.type} lineNo={line.lineNo}>
              {line.content}
            </DiffLine>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BotCommentCard({
  lines,
  visibleCount,
  showCursor,
  className,
  showAction = false,
}: {
  lines: { content: string; type: "summary" | "heading" | "body" }[];
  visibleCount: number;
  showCursor?: boolean;
  className?: string;
  showAction?: boolean;
}) {
  return (
    <div className={cn("landing-panel-surface-elevated p-4", className)}>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-landing-on-dark-soft">
        <span className="inline-flex size-5 items-center justify-center rounded-md bg-landing-coral/20 text-[10px] font-bold text-landing-coral">
          K
        </span>
        <span className="font-medium text-landing-on-dark">kensa-bot</span>
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] tracking-wide uppercase">
          bot
        </span>
        <span>commented 2m ago</span>
        {showAction ? (
          <span className="ml-auto inline-flex items-center rounded-full border border-landing-coral/40 bg-landing-coral/10 px-2.5 py-1 text-[10px] font-medium text-landing-coral">
            Review Change Stack →
          </span>
        ) : null}
      </div>

      <div className="space-y-2 text-sm">
        {lines.map((line, i) => (
          <div
            key={i}
            data-visible={i < visibleCount}
            className="landing-line-enter"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <p
              className={cn(
                line.type === "heading" && "mt-2 font-medium text-landing-on-dark",
                line.type === "summary" && "font-medium text-landing-on-dark",
                line.type === "body" && "leading-relaxed text-landing-on-dark-soft",
              )}
            >
              {line.content}
            </p>
          </div>
        ))}
        <span
          aria-hidden
          className={cn(
            "inline-block h-4 w-0.5 bg-landing-coral landing-cursor align-middle transition-opacity duration-150",
            showCursor ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </div>
  );
}

export function SeverityStrip({
  visible = true,
}: {
  visible?: boolean;
}) {
  return (
    <div
      data-visible={visible}
      className="landing-line-enter mb-3 flex items-center gap-2 text-xs"
    >
      <span className="text-landing-warning">⚠ Potential issue</span>
      <span className="text-landing-on-dark-soft">|</span>
      <span className="font-medium text-landing-error">● Major</span>
    </div>
  );
}

export function FindingHeader({
  severityLabel,
  severityLevel,
  title,
  explanation,
  visible = true,
  showExplanation = true,
}: {
  severityLabel: string;
  severityLevel: string;
  title: string;
  explanation: string;
  visible?: boolean;
  showExplanation?: boolean;
}) {
  return (
    <div data-visible={visible} className="landing-line-enter space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-landing-warning">⚠ {severityLabel}</span>
        <span className="text-landing-on-dark-soft">|</span>
        <span className="font-medium text-landing-error">● {severityLevel}</span>
      </div>
      <p className="text-base font-medium leading-snug text-landing-on-dark">
        {title}
      </p>
      <p
        data-visible={showExplanation}
        className="landing-line-enter text-sm leading-relaxed text-landing-on-dark-soft"
      >
        {explanation}
      </p>
    </div>
  );
}

export function CommittableSuggestion({
  label,
  description,
  code,
  action,
  visible = true,
}: {
  label: string;
  description: string;
  code: string;
  action: string;
  visible?: boolean;
}) {
  return (
    <div
      data-visible={visible}
      className="landing-line-enter landing-panel-surface-elevated p-4"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-landing-on-dark">{label}</p>
        <span className="rounded-full border border-landing-coral/40 bg-landing-coral/10 px-2.5 py-1 text-[10px] font-medium text-landing-coral">
          {action}
        </span>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-landing-on-dark-soft">
        {description}
      </p>
      <pre className="overflow-x-auto rounded-md bg-landing-surface-dark px-3 py-2 font-mono text-xs text-landing-success">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ReviewMetaRail({
  dimensions,
  filesReviewed,
  postingNote,
  visibleCount,
}: {
  dimensions: { name: string; fired: boolean }[];
  filesReviewed: number;
  postingNote: string;
  visibleCount: number;
}) {
  return (
    <div className="space-y-4">
      <div
        data-visible={visibleCount > 0}
        className="landing-line-enter landing-panel-surface p-3"
      >
        <p className="mb-1 text-[11px] text-landing-on-dark-soft">Files reviewed</p>
        <p className="font-mono text-lg text-landing-on-dark">{filesReviewed}</p>
      </div>
      <div className="space-y-1.5">
        {dimensions.map((dim, i) => (
          <div
            key={dim.name}
            data-visible={i < visibleCount}
            className="landing-line-enter landing-panel-surface flex items-center justify-between gap-3 px-3 py-2"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="text-sm text-landing-on-dark">{dim.name}</span>
            <span
              className={cn(
                "text-[11px] font-medium",
                dim.fired ? "text-landing-coral" : "text-landing-on-dark-soft",
              )}
            >
              {dim.fired ? "flagged" : "quiet"}
            </span>
          </div>
        ))}
      </div>
      <p
        data-visible={visibleCount >= dimensions.length}
        className="landing-line-enter text-xs leading-relaxed text-landing-on-dark-soft"
      >
        {postingNote}
      </p>
    </div>
  );
}

export function CoverageCard({
  statusLine,
  healthLabel,
  scannedPct,
  unscannedPct,
  showStatus = true,
  showBar = true,
}: {
  statusLine: string;
  healthLabel: string;
  scannedPct: number;
  unscannedPct: number;
  showStatus?: boolean;
  showBar?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div
        data-visible={showStatus}
        className="landing-line-enter landing-panel-surface flex flex-wrap items-center justify-between gap-3 p-3"
      >
        <div>
          <p className="text-sm font-medium text-landing-on-dark">
            Real-time codebase health
          </p>
          <p className="mt-1 text-xs text-landing-on-dark-soft">{statusLine}</p>
        </div>
        <span className="rounded-full border border-landing-success/40 bg-landing-success/10 px-2.5 py-1 text-[11px] font-medium text-landing-success">
          {healthLabel}
        </span>
      </div>

      <div
        data-visible={showBar}
        className="landing-line-enter landing-panel-surface p-3"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs text-landing-on-dark-soft">Scan coverage</p>
          <p className="font-mono text-xs text-landing-on-dark">
            {scannedPct}% scanned
          </p>
        </div>
        <div className="mb-3 flex h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-landing-success transition-[width] duration-500"
            style={{ width: showBar ? `${scannedPct}%` : "0%" }}
          />
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-landing-on-dark-soft">
          <span>Scanned {scannedPct}%</span>
          <span>Unscanned {unscannedPct}%</span>
        </div>
      </div>
    </div>
  );
}

export function FindingExampleRow({
  title,
  severity,
  detail,
  meta,
  visible = true,
}: {
  title: string;
  severity: string;
  detail: string;
  meta: string;
  visible?: boolean;
}) {
  return (
    <div
      data-visible={visible}
      className="landing-line-enter landing-panel-surface-elevated p-3"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-landing-on-dark">{title}</p>
        <span className="rounded bg-landing-warning/15 px-2 py-0.5 text-[10px] font-medium text-landing-warning">
          {severity}
        </span>
      </div>
      <p className="font-mono text-xs text-landing-on-dark-soft">{detail}</p>
      <p className="mt-2 text-[11px] text-landing-on-dark-soft">{meta}</p>
    </div>
  );
}

export function SeverityCountStrip({
  segments,
  visible = true,
}: {
  segments: { label: string; count: number }[];
  visible?: boolean;
}) {
  return (
    <div data-visible={visible} className="landing-line-enter space-y-2">
      <p className="text-xs text-landing-on-dark-soft">Findings by severity</p>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-landing-on-dark-soft">
        {segments.map((seg) => (
          <span key={seg.label}>
            {seg.label}{" "}
            <span className="font-mono text-landing-on-dark">{seg.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function QueueTable({
  children,
  visible = true,
}: {
  children: ReactNode;
  visible?: boolean;
}) {
  return (
    <div data-visible={visible} className="landing-line-enter space-y-1.5">
      <div className="grid grid-cols-[1.4fr_0.6fr_0.7fr_0.6fr] gap-2 px-3 text-[10px] tracking-wide text-landing-on-dark-soft uppercase">
        <span>Repo</span>
        <span>PR</span>
        <span>Status</span>
        <span className="text-right">Updated</span>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

export function SyncStateRow({
  repo,
  chunks,
  status,
  visible = true,
}: {
  repo: string;
  chunks: number;
  status: string;
  visible?: boolean;
}) {
  return (
    <div
      data-visible={visible}
      className="landing-line-enter landing-panel-surface flex items-center justify-between gap-3 px-3 py-2.5 text-sm"
    >
      <div className="min-w-0">
        <p className="truncate text-landing-on-dark">{repo}</p>
        <p className="text-xs text-landing-on-dark-soft">
          {chunks.toLocaleString()} chunks indexed
        </p>
      </div>
      <span className="text-xs font-medium text-landing-success">{status}</span>
    </div>
  );
}

export function RetrievalHitRow({
  file,
  score,
  lines,
  visible,
  staggerIndex = 0,
}: {
  file: string;
  score: number;
  lines?: string;
  visible: boolean;
  staggerIndex?: number;
}) {
  return (
    <div
      data-visible={visible}
      className="landing-line-enter landing-panel-surface flex items-center justify-between gap-3 px-3 py-2"
      style={{ transitionDelay: `${staggerIndex * 60}ms` }}
    >
      <div className="min-w-0">
        <span className="block truncate text-sm text-landing-on-dark">{file}</span>
        {lines ? (
          <span className="font-mono text-[10px] text-landing-on-dark-soft">
            L{lines}
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-landing-coral transition-[width] duration-500"
            style={{ width: visible ? `${Math.round(score * 100)}%` : "0%" }}
          />
        </div>
        <span className="font-mono text-xs text-landing-coral">
          {score.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export function FileRailItem({
  path,
  synced,
  visible,
  staggerIndex = 0,
}: {
  path: string;
  synced: boolean;
  visible: boolean;
  staggerIndex?: number;
}) {
  return (
    <div
      data-visible={visible}
      className="landing-line-enter flex items-center gap-2 px-2 py-1.5 text-xs"
      style={{ transitionDelay: `${staggerIndex * 40}ms` }}
    >
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          synced ? "bg-landing-success" : "bg-landing-on-dark-soft",
        )}
      />
      <span className="truncate text-landing-on-dark-soft">{path}</span>
    </div>
  );
}

export type PrStatus = "reviewed" | "processing" | "pending";

const statusColor: Record<PrStatus, string> = {
  reviewed: "text-landing-success",
  processing: "text-landing-warning",
  pending: "text-landing-on-dark-soft",
};

export function PrStatusRow({
  repo,
  pr,
  status,
  time,
  visible,
  staggerIndex = 0,
  dense = false,
}: {
  repo: string;
  pr: string;
  status: PrStatus;
  time: string;
  visible: boolean;
  staggerIndex?: number;
  dense?: boolean;
}) {
  if (dense) {
    return (
      <div
        data-visible={visible}
        className="landing-line-enter landing-panel-surface grid grid-cols-[1.4fr_0.6fr_0.7fr_0.6fr] items-center gap-2 px-3 py-2.5 text-sm"
        style={{ transitionDelay: `${staggerIndex * 50}ms` }}
      >
        <p className="truncate text-landing-on-dark">{repo}</p>
        <p className="font-mono text-landing-on-dark-soft">{pr}</p>
        <p className={cn("flex items-center gap-1.5", statusColor[status])}>
          {status === "processing" && (
            <span className="size-1.5 rounded-full bg-landing-warning landing-pulse-dot" />
          )}
          {status}
        </p>
        <p className="text-right text-xs text-landing-on-dark-soft">{time}</p>
      </div>
    );
  }

  return (
    <div
      data-visible={visible}
      className="landing-line-enter landing-panel-surface flex items-center justify-between gap-4 px-3 py-2.5 text-sm"
      style={{ transitionDelay: `${staggerIndex * 50}ms` }}
    >
      <div className="min-w-0">
        <p className="truncate text-landing-on-dark">{repo}</p>
        <p className="text-landing-on-dark-soft">{pr}</p>
      </div>
      <div className="text-right">
        <p className={cn("flex items-center justify-end gap-1.5", statusColor[status])}>
          {status === "processing" && (
            <span className="size-1.5 rounded-full bg-landing-warning landing-pulse-dot" />
          )}
          {status}
        </p>
        <p className="text-xs text-landing-on-dark-soft">{time}</p>
      </div>
    </div>
  );
}

export function UsageMeter({
  used,
  limit,
  label,
  visible,
}: {
  used: number;
  limit: number;
  label: string;
  visible: boolean;
}) {
  const pct = Math.round((used / limit) * 100);

  return (
    <div
      data-visible={visible}
      className="landing-line-enter landing-panel-surface p-3"
    >
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-landing-on-dark-soft">{label}</span>
        <span className="font-mono text-landing-coral">
          {used}/{limit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-landing-coral transition-[width] duration-500"
          style={{ width: visible ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function DimensionChips({
  visibleCount,
}: {
  visibleCount: number;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {reviewDimensions.map((dim, i) => (
        <span
          key={dim}
          data-visible={i < visibleCount}
          className="landing-line-enter rounded-full border border-white/10 bg-landing-surface-dark-soft px-2.5 py-1 text-[11px] text-landing-on-dark-soft"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {dim}
        </span>
      ))}
    </div>
  );
}

export function PanelShell({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("relative h-full p-3 md:p-4", className)}>
      {title ? (
        <p className="mb-3 font-mono text-[11px] text-landing-on-dark-soft">
          {title}
        </p>
      ) : null}
      {children}
      <div aria-hidden className="landing-panel-wash" />
    </div>
  );
}
