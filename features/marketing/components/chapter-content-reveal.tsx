"use client";

import { AnimatedReveal } from "./animated-reveal";
import { ChapterHeading } from "./marketing-primitives";
import type { Chapter } from "@/features/marketing/lib/content";
import { cn } from "@/lib/utils";

export function ChapterContentReveal({
  chapter,
  dark = false,
  showNumber = true,
}: {
  chapter: Chapter;
  dark?: boolean;
  showNumber?: boolean;
}) {
  return (
    <AnimatedReveal>
      <ChapterHeading
        number={chapter.number}
        label={chapter.label}
        title={chapter.title}
        lede={chapter.lede}
        dark={dark}
        showNumber={showNumber}
      />
      <ul className="space-y-5">
        {chapter.bullets.map((item, index) => (
          <AnimatedReveal
            key={item.lead}
            as="li"
            staggerIndex={index + 1}
            className="max-w-xl"
          >
            <p
              className={cn(
                "font-medium",
                dark ? "text-landing-on-dark" : "text-landing-ink",
              )}
            >
              {item.lead}
            </p>
            <p
              className={cn(
                "mt-1 text-base leading-relaxed",
                dark ? "text-landing-on-dark-soft" : "text-landing-body",
              )}
            >
              {item.body}
            </p>
          </AnimatedReveal>
        ))}
      </ul>
    </AnimatedReveal>
  );
}
