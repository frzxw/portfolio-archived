"use client";

import dynamic from "next/dynamic";
import { ThemeToggle } from "../theme/ThemeToggle";
import { TextLink } from "../ui/TextLink";
import type { PortfolioData } from "../../../mock/portfolio";
import { BrandIcon } from "../icons/BrandIcon";
import { Experiences } from "./Experiences";
import { useCallback, useState, useEffect, Suspense } from "react";

// Dynamically import Lanyard to defer heavy Three.js/R3F bundle loading
// This moves ~500KB+ of JS out of the critical rendering path
const Lanyard = dynamic(() => import("../Lanyard"), {
  ssr: false, // Three.js/R3F requires client-side only
});

type HeroProps = {
  data: Pick<PortfolioData, "name" | "socials" | "experiences">;
};

// Check if device is mobile/tablet (< 768px)
const IS_MOBILE_QUERY = "(max-width: 767px)";

export function Hero({ data }: HeroProps) {
  const [lanyardInteracting, setLanyardInteracting] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);

  // Only load Lanyard on desktop to save ~500KB+ JS on mobile
  // Also delay until browser is idle to prioritize LCP content
  useEffect(() => {
    // Skip Lanyard on mobile for better performance
    const isMobile = window.matchMedia(IS_MOBILE_QUERY).matches;
    if (isMobile) return;

    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleLoad = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const id = scheduleLoad(() => setShowLanyard(true), { timeout: 3000 });

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as unknown as number);
      }
    };
  }, []);

  const handleLanyardInteractionChange = useCallback((isInteracting: boolean) => {
    setLanyardInteracting(isInteracting);
  }, []);

  return (
    <section className="relative w-full">
      {showLanyard && (
        <Suspense fallback={null}>
          <Lanyard
            className="absolute inset-0 z-50"
            style={{ height: "100svh" }}
            onInteractionChange={handleLanyardInteractionChange}
          />
        </Suspense>
      )}

      <div className="relative z-40">
        <div className="centered section">
          <div className="flex items-start justify-between gap-6 pt-6 sm:pt-8">
            <h1 className="pointer-events-auto text-balance text-[clamp(2.75rem,7vw,4.75rem)] font-bold tracking-[-0.03em]">
              {data.name}
            </h1>

            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
          </div>

          <nav className="pointer-events-auto mt-2 flex flex-wrap items-center gap-2 text-xs text-(--color-text-secondary) sm:gap-3 sm:text-sm">
            {data.socials.map((s) => (
              <TextLink
                key={s.href}
                href={s.href}
                ariaLabel={`Open ${s.label} profile (opens in a new tab)`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 row-hover"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card)">
                  <BrandIcon name={s.icon} size={14} />
                </span>
                <span className="font-medium">{s.label}</span>
              </TextLink>
            ))}
          </nav>

          <div className="pointer-events-auto mt-6 sm:mt-8">
            <div className="section-title">Experiences</div>
            <Experiences
              items={data.experiences}
              interactionDisabled={lanyardInteracting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
