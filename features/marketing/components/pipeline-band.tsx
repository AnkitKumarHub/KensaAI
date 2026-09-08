"use client";

import { pipelineSteps } from "@/features/marketing/lib/content";
import { AnimatedReveal } from "./animated-reveal";
import { Eyebrow, MarketingSection } from "./marketing-primitives";

export function PipelineBand() {
  return (
    <MarketingSection id="pipeline" dark>
      <AnimatedReveal>
        <div className="mb-12 max-w-2xl">
          <Eyebrow>How a review actually happens</Eyebrow>
          <h2 className="font-landing-display text-3xl leading-tight tracking-tight md:text-4xl">
            From webhook to comment. No dashboard babysitting.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-landing-on-dark-soft">
            Each review runs as a durable background job. If a step fails, it
            retries without starting over from scratch.
          </p>
        </div>
      </AnimatedReveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pipelineSteps.map((step, index) => (
          <AnimatedReveal key={step.step} staggerIndex={index}>
            <div className="h-full rounded-xl border border-white/10 bg-landing-surface-dark-elevated p-6">
              <p className="mb-3 font-mono text-sm text-landing-coral">{step.step}</p>
              <h3 className="mb-2 text-lg font-medium text-landing-on-dark">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-landing-on-dark-soft">
                {step.body}
              </p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </MarketingSection>
  );
}
