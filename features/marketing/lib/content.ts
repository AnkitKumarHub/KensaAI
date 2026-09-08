import { getContactMailto } from "@/lib/site-config";

export type ChapterId = "understand" | "review" | "track" | "security";
export type HeroChapterId = "understand" | "review" | "track";

export type ChapterLayout = "split" | "split-reverse";

export type Chapter = {
  id: ChapterId;
  number: string;
  label: string;
  subtitle: string;
  title: string;
  lede?: string;
  layout: ChapterLayout;
  bullets: { lead: string; body: string }[];
};

export type HeroChapter = Chapter & { id: HeroChapterId };

export const navLinks = [
  { label: "How it works", href: "#pipeline" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/sign-in" },
] as const;

const understandChapter: HeroChapter = {
  id: "understand",
  number: "01",
  label: "UNDERSTAND",
  subtitle: "the repo, not just the diff",
  title: "It reads the repo, not just the diff.",
  layout: "split",
  bullets: [
    {
      lead: "Opt-in codebase sync",
      body: "Index your repository alongside the diff so reviews aren't blind to how the rest of the code works.",
    },
    {
      lead: "Retrieval keyed on intent",
      body: "The ten most relevant passages are pulled based on what the pull request says it's doing.",
    },
    {
      lead: "Context stays separate",
      body: "Repository context reaches the model clearly labeled, never mixed in as part of the change.",
    },
  ],
};

const reviewChapter: HeroChapter = {
  id: "review",
  number: "02",
  label: "REVIEW",
  subtitle: "every PR automatically",
  title: "A real review, on every push.",
  layout: "split-reverse",
  bullets: [
    {
      lead: "Six dimensions, every time",
      body: "Correctness, security, performance, reliability, readability, and maintainability.",
    },
    {
      lead: "Proportional, not pedantic",
      body: "Instructed not to nitpick style when there's a real bug, and to say so plainly when a diff is clean.",
    },
    {
      lead: "Sorted by what to do about it",
      body: "What looks good, suggestions you can skip, and issues you shouldn't.",
    },
  ],
};

const trackChapter: HeroChapter = {
  id: "track",
  number: "03",
  label: "TRACK",
  subtitle: "every review, kept",
  title: "Every review, kept.",
  layout: "split",
  bullets: [
    {
      lead: "Live status on each PR",
      body: "Pending, processing, reviewed. Visible as the job runs.",
    },
    {
      lead: "Full review in the dashboard",
      body: "Read the complete comment in Kensa, not just on GitHub.",
    },
    {
      lead: "Usage counted clearly",
      body: "Know how many reviews you've used against your monthly limit.",
    },
  ],
};

const securityChapter: Chapter = {
  id: "security",
  number: "04",
  label: "SECURITY",
  subtitle: "what the diff can leak",
  title: "Security findings, not another dashboard.",
  layout: "split-reverse",
  bullets: [
    {
      lead: "Injection risks",
      body: "Flags unvalidated input paths that can reach queries, shells, or templates.",
    },
    {
      lead: "Auth and session issues",
      body: "Catches weak expiry checks, missing privilege gates, and token mishandling.",
    },
    {
      lead: "Exposed secrets",
      body: "Surfaces hardcoded keys, tokens, and credentials that land in the diff.",
    },
  ],
};

/** Hero carousel tabs stay at three. */
export const heroChapters: HeroChapter[] = [
  understandChapter,
  reviewChapter,
  trackChapter,
];

/** Full landing chapter list including Security. */
export const chapters: Chapter[] = [...heroChapters, securityChapter];
export const reviewDimensions = [
  "Correctness",
  "Security",
  "Performance",
  "Reliability",
  "Readability",
  "Maintainability",
] as const;

export const heroDiffLines = [
  { type: "context" as const, lineNo: 41, content: "export async function createSession(payload) {" },
  { type: "remove" as const, lineNo: 42, content: "return issueSession(payload.userId);" },
  { type: "add" as const, lineNo: 42, content: "if (payload.expiresAt <= Date.now()) return null;" },
  { type: "add" as const, lineNo: 43, content: "return issueSession(payload.userId);" },
];

export const heroReviewLines = [
  { content: "Solid fix. Expiry check belongs before session issuance.", type: "summary" as const },
  { content: "✅ What looks good", type: "heading" as const },
  { content: "Guard at the session boundary is the right place for this check.", type: "body" as const },
  { content: "🚨 Issues", type: "heading" as const },
  { content: "Major. Reject expired refresh tokens before issuing a session.", type: "body" as const },
  { content: "Check payload.expiresAt before calling issueSession().", type: "body" as const },
];

export const reviewFinding = {
  severityLabel: "Potential issue",
  severityLevel: "Major" as const,
  title: "Reject expired refresh tokens before issuing a session.",
  explanation:
    "Check the token expiry before creating a new authenticated session.",
  hunkHeader: "@@ -42,2 +42,3 @@ export async function createSession",
  diffLines: heroDiffLines,
  committableSuggestion: {
    label: "Committable suggestion",
    description: "Guard against expired refresh tokens before issuing the session:",
    code: "if (payload.expiresAt <= Date.now()) return null;",
    action: "Commit suggestion",
  },
};

export const reviewMeta = {
  filesReviewed: 3,
  postingNote: "Posted as one comment on the PR conversation",
  dimensions: [
    { name: "Correctness", fired: true },
    { name: "Security", fired: true },
    { name: "Performance", fired: false },
    { name: "Reliability", fired: true },
    { name: "Readability", fired: false },
    { name: "Maintainability", fired: false },
  ],
};

export const heroFileRail = [
  { path: "src/auth/session.ts", synced: true },
  { path: "src/auth/tokens.ts", synced: true },
  { path: "src/middleware/auth.ts", synced: true },
  { path: "src/lib/db.ts", synced: true },
  { path: "prisma/schema.prisma", synced: true },
];

export const skippedPaths = ["node_modules", "dist", ".next", "vendor"] as const;

export const heroRetrievalHits = [
  { file: "src/auth/session.ts", score: 0.94, lines: "42-58" },
  { file: "src/auth/tokens.ts", score: 0.87, lines: "18-31" },
  { file: "src/middleware/auth.ts", score: 0.81, lines: "7-14" },
];

export const heroPrRows = [
  { repo: "acme/platform", pr: "#482", status: "reviewed" as const, time: "2m ago" },
  { repo: "acme/webapp", pr: "#247", status: "processing" as const, time: "now" },
  { repo: "acme/api", pr: "#91", status: "pending" as const, time: "queued" },
  { repo: "acme/billing", pr: "#118", status: "reviewed" as const, time: "14m ago" },
  { repo: "acme/docs", pr: "#56", status: "pending" as const, time: "queued" },
];

export const heroUsage = {
  used: 3,
  limit: 5,
  label: "3 of 5 reviews used this month",
};

export const heroSyncStats = {
  repo: "acme/platform",
  chunks: 1842,
  status: "synced" as const,
};

export const securityCoverage = {
  statusLine: "Scanning every PR · Last scan now",
  healthLabel: "Mostly healthy",
  scannedPct: 60,
  unscannedPct: 40,
};

export const securityFindings = {
  openCount: 12,
  header: "12 open findings this week",
  examples: [
    {
      title: "Exposed secret",
      severity: "High" as const,
      detail: "src/config/db.ts — hardcoded API key found",
      meta: "PR #482 · Fix ready",
    },
    {
      title: "Dependency vulnerability",
      severity: "High" as const,
      detail: "axios · GHSA-4w2v-q235-vp99",
      meta: "PR #482 · Fix ready",
    },
  ],
  bySeverity: [
    { label: "Critical", count: 0 },
    { label: "High", count: 2 },
    { label: "Medium", count: 6 },
    { label: "Low", count: 4 },
  ],
};

export const prMarqueeTitles = [
  "fix(auth): reject expired refresh tokens",
  "feat(api): add retry queue for webhook delivery",
  "chore(ci): pin runner image version",
  "fix(cache): invalidate stale project keys",
  "feat(ui): compact navigation for mobile",
  "fix(db): prevent deadlock on concurrent writes",
  "perf(search): batch embedding queries",
  "fix(webhook): honor rate-limit headers",
  "feat(logs): add structured request filters",
  "fix(session): rotate token on privilege change",
];

export const pipelineSteps = [
  {
    step: "01",
    title: "Webhook received",
    body: "GitHub sends a pull_request event on opened, synchronize, or reopened.",
  },
  {
    step: "02",
    title: "Diff fetched & chunked",
    body: "Changed files are pulled and split into reviewable 80-line windows.",
  },
  {
    step: "03",
    title: "Context retrieved",
    body: "If the repo is synced, the ten most relevant codebase passages are pulled via vector search.",
  },
  {
    step: "04",
    title: "Review generated",
    body: "An AI model writes a structured markdown review across six dimensions.",
  },
  {
    step: "05",
    title: "Comment posted",
    body: "The review lands as a single comment on the pull request conversation.",
  },
];

export const limitsItems = [
  {
    title: "Conversation comment, not inline threads",
    body: "One structured comment on the PR tab today. Per-line inline comments are on the roadmap.",
  },
  {
    title: "Suggests, doesn't commit",
    body: "Kensa flags issues and improvements. Autofix pull requests aren't here yet.",
  },
  {
    title: "Codebase context is opt-in",
    body: "You press sync when you want repository-wide context. It's not automatic on install.",
  },
];

export const roadmapItems = [
  "Inline review comments on specific lines",
  "Agent-authored fix pull requests",
  "Team board for the review queue",
  "Dependency advisory scanning",
];

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
  aspirational?: boolean;
  scopeIntro?: string;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "hobby",
    name: "Hobby",
    price: "Free",
    description: "For individual developers trying Kensa on a side project.",
    features: [
      "Up to 5 AI reviews per month",
      "Public and private repositories",
      "Community support",
    ],
    cta: "Start free",
    ctaHref: "/sign-in",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹299",
    priceNote: "/month",
    description: "Unlimited reviews for developers shipping every day.",
    features: [
      "Unlimited AI reviews on connected repos",
      "Public and private repository support",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "/dashboard/settings",
    featured: true,
    badge: "Most popular",
  },
  {
    id: "team",
    name: "Team",
    price: "Custom",
    description:
      "Running Kensa across an organisation, or need it inside your own infrastructure? Tell us what you need and we'll scope it.",
    features: [
      "SSO and organization-wide access controls",
      "Self-hosted or private-cloud deployment",
      "Model choice and custom review guidelines",
      "Dedicated support and onboarding",
      "Volume pricing for larger teams",
    ],
    cta: "Contact us",
    ctaHref: getContactMailto("Kensa Team plan"),
    aspirational: true,
    scopeIntro: "Here's what we can scope together:",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#pipeline" },
      { label: "Pricing", href: "#pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Install GitHub App", href: "/dashboard/github" },
      { label: "Settings", href: "/dashboard/settings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: getContactMailto() },
      { label: "Team plan", href: getContactMailto("Kensa Team plan") },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
] as const;
