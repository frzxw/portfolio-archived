"use client";

import type { Project } from "../../../../content/schema";
import { BrandIcon } from "../../icons/BrandIcon";
import { TechIcon } from "../../icons/TechIcon";
import { domAnimation, LazyMotion, m } from "framer-motion";

function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.repo ?? project.href;
  const ariaLabel = project.repo
    ? `Open ${project.title} repository on GitHub (opens in a new tab)`
    : `Open ${project.title} project (opens in a new tab)`;

  return (
    <m.a
      href={primaryHref}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      aria-label={ariaLabel}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="card flex h-72 w-72 shrink-0 flex-col p-4 sm:h-80 sm:w-80">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-semibold">{project.title}</div>
            {project.highlight && (
              <div className="mt-1 text-xs capitalize tracking-[0.14em] text-(--color-text-secondary)">
                {project.highlight}
              </div>
            )}
          </div>
          <div className="text-(--color-text-secondary)">
            <BrandIcon name="github" size={18} />
          </div>
        </div>

        <div className="mt-3 text-sm text-(--color-text-secondary)">
          {project.description}
        </div>

        <div className="mt-auto pt-4">
          <m.div className="flex items-center gap-2 text-(--color-text-secondary)">
            {project.stackSlugs.slice(0, 4).map((slug) => (
              <span
                key={slug}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card)"
                title={slug}
              >
                <TechIcon slug={slug} size={16} />
              </span>
            ))}
          </m.div>
        </div>
      </div>
    </m.a>
  );
}

type InfiniteProjectsCarouselProps = {
  items: Project[];
};

function PlaceholderCard() {
  return (
    <div
      aria-hidden="true"
      className="card flex h-72 w-72 shrink-0 flex-col p-4 sm:h-80 sm:w-80"
    >
      <div className="h-5 w-2/3 animate-pulse rounded bg-(--color-border-subtle)" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-(--color-border-subtle)" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-(--color-border-subtle)" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-(--color-border-subtle)" />
        <div className="h-3 w-4/6 animate-pulse rounded bg-(--color-border-subtle)" />
      </div>
      <div className="mt-auto flex gap-2 pt-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-8 w-8 animate-pulse rounded-full border border-(--color-border-subtle) bg-(--color-card)"
          />
        ))}
      </div>
    </div>
  );
}

export function InfiniteProjectsCarousel({ items }: InfiniteProjectsCarouselProps) {
  // Empty state: show skeleton cards in the infinite carousel
  const cards: (Project | number)[] =
    items.length > 0 ? items : [0, 1, 2, 3, 4, 5];
  // Only duplicate twice (not 3x) to reduce DOM size
  const repeated = [...cards, ...cards];

  return (
    <LazyMotion features={domAnimation}>
      <div className="marquee -mx-4 py-4 sm:-mx-6 sm:py-6">
        <div className="marqueeTrack flex gap-3 px-4 sm:gap-4 sm:px-6">
          {repeated.map((p, idx) =>
            typeof p === "number" ? (
              <PlaceholderCard key={`placeholder-${idx}`} />
            ) : (
              <ProjectCard key={`${p.href}-${idx}`} project={p} />
            )
          )}
        </div>
      </div>
    </LazyMotion>
  );
}
