"use client";

import type { Experience } from "../../../mock/portfolio";
import { useEffect, useState, useCallback } from "react";

type ExperiencesProps = {
  items: Experience[];
  interactionDisabled?: boolean;
};

export function Experiences({ items, interactionDisabled = false }: ExperiencesProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!interactionDisabled) return;

    const raf = requestAnimationFrame(() => {
      setActiveKey(null);
    });

    return () => cancelAnimationFrame(raf);
  }, [interactionDisabled]);

  // Handle click for mobile/tablet: first click expands, second navigates
  const handleClick = useCallback(
    (e: React.MouseEvent, key: string, href: string | undefined, isActive: boolean) => {
      // If has contributions and not yet expanded, expand first (don't navigate)
      if (!isActive && items.find(x => `${x.company}-${x.role}` === key)?.contributions.length) {
        e.preventDefault();
        setActiveKey(key);
        return;
      }
      // If already expanded or no contributions, allow navigation
      if (href && isActive) {
        // Navigation allowed - don't prevent default
        return;
      }
      // No href - just toggle
      if (!href) {
        setActiveKey(isActive ? null : key);
      }
    },
    [items]
  );

  return (
    <div className="flex flex-col gap-2">
      {items.map((x) => {
        const key = `${x.company}-${x.role}`;
        const isActive = activeKey === key;
        const hasContributions = x.contributions.length > 0;

        const content = (
          <div
            onMouseEnter={() => {
              if (interactionDisabled) return;
              setActiveKey(key);
            }}
            onMouseLeave={() => {
              if (interactionDisabled) return;
              setActiveKey(null);
            }}
            onFocus={() => {
              if (interactionDisabled) return;
              setActiveKey(key);
            }}
            onBlur={() => {
              if (interactionDisabled) return;
              setActiveKey(null);
            }}
            className="row-hover px-4 py-3"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-0">
                <div className="truncate font-semibold">{x.company}</div>
                <div className="truncate text-sm text-(--color-text-secondary)">
                  {x.role}
                </div>
              </div>
              <div className="shrink-0 text-sm text-(--color-text-secondary)">
                {x.start} — {x.end}
              </div>
            </div>

            {/* CSS-only transition for expand/collapse */}
            <div
              className="overflow-hidden transition-all duration-200 ease-out"
              style={{
                maxHeight: isActive && hasContributions ? "500px" : "0",
                opacity: isActive && hasContributions ? 1 : 0,
              }}
            >
              <div className="mt-3 space-y-2 text-sm text-(--color-text-secondary)">
                {x.contributions.map((c) => (
                  <div key={c} className="flex gap-2">
                    <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-border-subtle)" />
                    <span className="min-w-0">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

        // For mobile: wrap in clickable div that handles expand-first behavior
        return x.href ? (
          <a
            key={key}
            href={x.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={(e) => handleClick(e, key, x.href, isActive)}
          >
            {content}
          </a>
        ) : (
          <div
            key={key}
            onClick={(e) => handleClick(e, key, undefined, isActive)}
            className="cursor-pointer"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
