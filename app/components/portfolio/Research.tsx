import type { ResearchItem } from "../../../data/portfolio";
import { TextLink } from "../ui/TextLink";

type ResearchProps = {
  items: ResearchItem[];
};

export function Research({ items }: ResearchProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((x) => (
        <TextLink
          key={x.href}
          href={x.href}
          ariaLabel={`Open research item: ${x.title} (opens in a new tab)`}
          className="row-hover block px-4 py-3"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="truncate font-semibold">{x.title}</div>
              {x.venue && (
                <div className="mt-1 text-sm text-(--color-text-secondary)">
                  {x.venue}
                </div>
              )}
            </div>

            {x.year && (
              <div className="shrink-0 text-sm text-(--color-text-secondary)">
                {x.year}
              </div>
            )}
          </div>
        </TextLink>
      ))}
    </div>
  );
}
