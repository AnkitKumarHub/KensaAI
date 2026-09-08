"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { usePrefersReducedMotion, useInView } from "@/features/marketing/lib/use-in-view";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  staggerIndex?: number;
  as?: "div" | "li";
  threshold?: number;
  rootMargin?: string;
};

export function AnimatedReveal({
  children,
  className,
  staggerIndex = 0,
  as = "div",
  threshold = 0.15,
  rootMargin,
}: AnimatedRevealProps) {
  const { ref, inView } = useInView({ threshold, rootMargin });
  const reducedMotion = usePrefersReducedMotion();
  const visible = reducedMotion || inView;

  const Component = as;

  return (
    <Component
      ref={ref as never}
      data-visible={visible}
      className={cn("landing-reveal", className)}
      style={
        staggerIndex > 0
          ? { transitionDelay: `${staggerIndex * 50}ms` }
          : undefined
      }
    >
      {children}
    </Component>
  );
}

type LineRevealProps = {
  children: ReactNode;
  visible: boolean;
  className?: string;
  staggerIndex?: number;
};

export function LineReveal({
  children,
  visible,
  className,
  staggerIndex = 0,
}: LineRevealProps) {
  return (
    <div
      data-visible={visible}
      className={cn("landing-line-enter", className)}
      style={
        staggerIndex > 0
          ? { transitionDelay: `${staggerIndex * 40}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
