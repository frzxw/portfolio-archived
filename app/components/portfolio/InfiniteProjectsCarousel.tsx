import type { Project } from "../../../mock/portfolio";
import { TextLink } from "../ui/TextLink";
import { BrandIcon } from "../icons/BrandIcon";
import { TechIcon } from "../icons/TechIcon";

function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.repo ?? project.href;

  return (
    <TextLink
      href={primaryHref}
      className="block"
      ariaLabel={`${project.title} GitHub`}
    >
      <div className="card flex h-72 w-72 shrink-0 flex-col p-4 sm:h-80 sm:w-80">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-semibold">{project.title}</div>
            {project.highlight && (
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-(--color-text-secondary)">
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
          <div className="flex items-center gap-2 text-(--color-text-secondary)">
            {project.stackSlugs.slice(0, 6).map((slug) => (
              <span
                key={slug}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card)"
                title={slug}
              >
                <TechIcon slug={slug} size={16} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </TextLink>
  );
}

type InfiniteProjectsCarouselProps = {
  items: Project[];
};

export function InfiniteProjectsCarousel({ items }: InfiniteProjectsCarouselProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="marquee -mx-4 py-4 sm:-mx-6 sm:py-6">
      <div className="marqueeTrack flex gap-3 px-4 sm:gap-4 sm:px-6">
        {repeated.map((p, idx) => (
          <ProjectCard key={`${p.href}-${idx}`} project={p} />
        ))}
      </div>
    </div>
  );
}
