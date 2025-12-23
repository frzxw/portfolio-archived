"use client";

import dynamic from "next/dynamic";
import { TextLink } from "../ui/TextLink";
import type { PortfolioData } from "../../../data/portfolio";
import { BrandIcon } from "../icons/BrandIcon";
import { useCallback, useState, useEffect, Suspense } from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";

// Dynamically import heavy components to reduce initial JS bundle
// Lanyard: ~500KB+ of Three.js/R3F code
const Lanyard = dynamic(() => import("../Lanyard"), {
  ssr: false,
});

// ThemeToggle - not critical for LCP
const ThemeToggle = dynamic(
  () => import("../theme/ThemeToggle").then(m => ({ default: m.ThemeToggle })),
  { ssr: false }
);

// Experiences has interaction handlers - defer loading
const Experiences = dynamic(
  () => import("./Experiences").then(m => ({ default: m.Experiences })),
  { ssr: false, loading: () => <div className="h-48 animate-pulse" /> }
);

type HeroProps = {
  data: Pick<PortfolioData, "name" | "socials" | "experiences">;
};

// Check if device is mobile/tablet (< 768px)
const IS_MOBILE_QUERY = "(max-width: 767px)";

export function Hero({ data }: HeroProps) {
  const [lanyardInteracting, setLanyardInteracting] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);

  // Delay Lanyard loading to prioritize LCP and reduce TBT
  // TBT measures blocking during first 5s, so we delay significantly
  useEffect(() => {
    const isMobile = window.matchMedia(IS_MOBILE_QUERY).matches;

    // Delay strategies optimized for TBT measurement window
    // Desktop: 3s delay to push Three.js loading outside TBT window
    // Mobile: 2.5s delay for even more time to complete LCP
    const baseDelay = isMobile ? 3000 : 2500;

    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleLoad = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 500));
    const idleId = scheduleLoad(() => {
      timeoutId = setTimeout(() => setShowLanyard(true), baseDelay);
    }, { timeout: 6000 });

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
          <LazyMotion features={domAnimation}>
            <div className="flex items-start justify-between gap-6 pt-6 sm:pt-8">
              <m.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-auto text-balance text-[clamp(2.75rem,7vw,4.75rem)] font-bold tracking-[-0.03em]"
              >
                {data.name}
              </m.h1>

              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pointer-events-auto"
              >
                <ThemeToggle />
              </m.div>
            </div>

            <m.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pointer-events-auto mt-2 flex flex-wrap items-center gap-2 text-xs text-(--color-text-secondary) sm:gap-3 sm:text-sm"
            >
              {data.socials.map((s, i) => (
                <m.div
                  key={s.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <TextLink
                    href={s.href}
                    ariaLabel={`Open ${s.label} profile (opens in a new tab)`}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 row-hover"
                  >
                    <m.span
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card)"
                    >
                      <BrandIcon name={s.icon} size={14} />
                    </m.span>
                    <span className="font-medium">{s.label}</span>
                  </TextLink>
                </m.div>
              ))}
            </m.nav>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pointer-events-auto mt-6 sm:mt-8"
            >
              <div className="section-title">Experiences</div>
              <Experiences
                items={data.experiences}
                interactionDisabled={lanyardInteracting}
              />
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </section>
  );
}
