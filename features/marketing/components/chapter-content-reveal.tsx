"use client";

import { AnimatedReveal } from "./animated-reveal";
import { ChapterHeading } from "./marketing-primitives";
import type { Chapter } from "@/features/marketing/lib/content";
import { cn } from "@/lib/utils";

export function ChapterContentReveal({
  chapter,
  variant = "stack",
  dark = false,
}: {
  chapter: Chapter;
  variant?: "stack" | "strip";
  dark?: boolean;
}) {
  const todayBullets = chapter.bullets.filter(
    (b) => !b.group || b.group === "today",
  );
  const previewBullets = chapter.bullets.filter((b) => b.group === "preview");
  const hasGroups = previewBullets.length > 0;

  if (variant === "strip") {
    return (
      <AnimatedReveal>
        <ChapterHeading
          number={chapter.number}
          label={chapter.label}
          title={chapter.title}
          lede={chapter.lede}
          dark={dark}
        />
        {hasGroups ? (
          <div className="space-y-6">
            <BulletStrip items={todayBullets} dark={dark} label="Ships today" />
            <BulletStrip
              items={previewBullets}
              dark={dark}
              label="In preview"
            />
          </div>
        ) : (
          <BulletStrip items={chapter.bullets} dark={dark} />
        )}
      </AnimatedReveal>
    );
  }

  return (
    <AnimatedReveal>
      <ChapterHeading
        number={chapter.number}
        label={chapter.label}
        title={chapter.title}
        lede={chapter.lede}
        dark={dark}
      />
      {hasGroups ? (
        <div className="space-y-8">
          <BulletStack items={todayBullets} dark={dark} label="Ships today" />
          <BulletStack items={previewBullets} dark={dark} label="In preview" />
        </div>
      ) : (
        <BulletStack items={chapter.bullets} dark={dark} />
      )}
    </AnimatedReveal>
  );
}

function BulletStack({
  items,
  dark,
  label,
}: {
  items: { lead: string; body: string }[];
  dark?: boolean;
  label?: string;
}) {
  return (
    <div>
      {label ? (
        <p className="mb-4 text-xs font-medium tracking-wide text-landing-coral">
          {label}
        </p>
      ) : null}
      <ul className="space-y-5">
        {items.map((item, index) => (
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
    </div>
  );
}

function BulletStrip({
  items,
  dark,
  label,
}: {
  items: { lead: string; body: string }[];
  dark?: boolean;
  label?: string;
}) {
  return (
    <div>
      {label ? (
        <p className="mb-4 text-xs font-medium tracking-wide text-landing-coral">
          {label}
        </p>
      ) : null}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <AnimatedReveal
            key={item.lead}
            as="li"
            staggerIndex={index + 1}
            className="max-w-sm"
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
                "mt-1 text-sm leading-relaxed",
                dark ? "text-landing-on-dark-soft" : "text-landing-body",
              )}
            >
              {item.body}
            </p>
          </AnimatedReveal>
        ))}
      </ul>
    </div>
  );
}
