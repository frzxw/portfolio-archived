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

  // Delay Lanyard loading to prioritize LCP and reduce TBT
  // Mobile gets a longer delay to allow LCP to complete first
  useEffect(() => {
    const isMobile = window.matchMedia(IS_MOBILE_QUERY).matches;

    // Different delay strategies for mobile vs desktop
    // Mobile: longer delay (2.5s) to fully prioritize LCP
    // Desktop: shorter delay (1s) since it has more resources
    const baseDelay = isMobile ? 2500 : 1000;

    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleLoad = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
    const idleId = scheduleLoad(() => {
      timeoutId = setTimeout(() => setShowLanyard(true), baseDelay);
    }, { timeout: 5000 });

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as unknown as number);
      }
      clearTimeout(timeoutId);
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
