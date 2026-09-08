import { Instrument_Serif, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-landing-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-landing-body",
});

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "light min-h-full bg-landing-canvas font-landing-body text-landing-ink antialiased",
        instrumentSerif.variable,
        inter.variable,
      )}
    >
      {children}
    </div>
  );
}
