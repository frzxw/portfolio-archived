import type { OpenSourceItem } from "../../../mock/portfolio";
import { TextLink } from "../ui/TextLink";

function formatStars(stars: number) {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
  return `${stars}`;
}

type OpenSourceProps = {
  items: OpenSourceItem[];
};

export function OpenSource({ items }: OpenSourceProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((x) => (
        <TextLink
          key={x.href}
          href={x.href}
          className="row-hover block px-4 py-3"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="truncate font-semibold">{x.title}</div>
              {x.description ? (
                <div className="mt-1 text-sm text-(--color-text-secondary)">
                  {x.description}
                </div>
              ) : null}
              <div className="mt-2 text-xs text-(--color-text-secondary)">
                {x.stack.join(", ")}
              </div>
            </div>
            <div className="shrink-0 text-sm text-(--color-text-secondary)">
              <span className="text-(--color-star)">★</span> {formatStars(x.stars)}
            </div>
          </div>
        </TextLink>
      ))}
    </div>
  );
}
