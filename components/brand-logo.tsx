import Image from "next/image";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  /**
   * "theme" swaps with dark mode.
   * "on-dark" always uses the white-stroke mark (e.g. footer).
   * "on-light" always uses the dark-stroke mark (e.g. marketing header on a forced light canvas).
   */
  variant?: "theme" | "on-dark" | "on-light";
};

export function BrandLogo({
  width = 32,
  height = 32,
  className,
  priority,
  variant = "theme",
}: BrandLogoProps) {
  const alt = siteConfig.name;

  if (variant === "on-dark") {
    return (
      <Image
        src="/kensa-logo-dark.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn("object-contain", className)}
      />
    );
  }

  if (variant === "on-light") {
    return (
      <Image
        src="/kensa-logo-light.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn("object-contain", className)}
      />
    );
  }

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <Image
        src="/kensa-logo-light.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-contain dark:hidden"
      />
      <Image
        src="/kensa-logo-dark.svg"
        alt=""
        width={width}
        height={height}
        priority={priority}
        className="hidden object-contain dark:block"
        aria-hidden
      />
    </span>
  );
}
