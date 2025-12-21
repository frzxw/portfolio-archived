import type { PersonalProject } from "../../../mock/portfolio";
import { TextLink } from "../ui/TextLink";

type PersonalProjectsProps = {
  items: PersonalProject[];
};

export function PersonalProjects({ items }: PersonalProjectsProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((x) => (
        <TextLink key={x.href} href={x.href} className="row-hover block px-4 py-3">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="truncate font-semibold">{x.title}</div>
              <div className="mt-1 text-sm text-(--color-text-secondary)">
                {x.description}
              </div>
              <div className="mt-2 text-xs text-(--color-text-secondary)">
                {x.stack.join(", ")}
              </div>
            </div>
            <div className="shrink-0 text-sm text-(--color-text-secondary)">Open</div>
          </div>
        </TextLink>
      ))}
    </div>
  );
}
