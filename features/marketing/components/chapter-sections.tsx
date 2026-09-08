import { MarketingSection } from "./marketing-primitives";
import { chapters } from "@/features/marketing/lib/content";
import { ContextArtifactDemo } from "./context-artifact-demo";
import { ReviewArtifactDemo } from "./review-artifact-demo";
import { TrackArtifactDemo } from "./track-artifact-demo";
import { SecurityArtifactDemo } from "./security-artifact-demo";
import { ChapterContentReveal } from "./chapter-content-reveal";

const artifacts = {
  understand: ContextArtifactDemo,
  review: ReviewArtifactDemo,
  track: TrackArtifactDemo,
  security: SecurityArtifactDemo,
} as const;

export function ChapterSections() {
  return (
    <>
      {chapters.map((chapter) => {
        const Artifact = artifacts[chapter.id];

        // Security breaks the 50/50 zigzag on purpose: full-width intro copy,
        // then two side-by-side proof cards (coverage vs findings).
        if (chapter.layout === "intro-dual-cards") {
          return (
            <MarketingSection
              key={chapter.id}
              id={`chapter-${chapter.id}`}
              className="bg-landing-surface-soft"
            >
              <div className="space-y-8">
                <ChapterContentReveal chapter={chapter} variant="strip" />
                <Artifact />
              </div>
            </MarketingSection>
          );
        }

        const reversed = chapter.layout === "split-reverse";

        return (
          <MarketingSection
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className={
              chapter.layout === "split"
                ? "bg-landing-canvas"
                : "bg-landing-surface-soft"
            }
          >
            <div
              className={`grid items-start gap-8 lg:grid-cols-2 lg:gap-12 ${
                reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ChapterContentReveal chapter={chapter} variant="stack" />
              <Artifact />
            </div>
          </MarketingSection>
        );
      })}
    </>
  );
}
