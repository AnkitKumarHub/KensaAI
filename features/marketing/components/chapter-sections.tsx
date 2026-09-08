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
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ChapterContentReveal chapter={chapter} />
              <Artifact />
            </div>
          </MarketingSection>
        );
      })}
    </>
  );
}

