import { MarketingSection } from "./marketing-primitives";

export function ProblemBand() {
  return (
    <MarketingSection className="bg-landing-surface-soft py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-landing-display text-3xl leading-tight tracking-tight md:text-4xl">
          Writing code got fast.
          <br />
          Reading it didn&apos;t.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-landing-body md:text-lg">
          A coding agent can open six pull requests before lunch. Review became
          the bottleneck, and the bottleneck is where bugs get through.
        </p>
      </div>
    </MarketingSection>
  );
}
