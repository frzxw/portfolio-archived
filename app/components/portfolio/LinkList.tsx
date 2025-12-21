import { TextLink } from "../ui/TextLink";

type LinkListProps = {
  items: { title: string; href: string }[];
};

export function LinkList({ items }: LinkListProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((x) => (
        <TextLink
          key={x.href}
          href={x.href}
          className="row-hover block px-4 py-3 font-semibold"
        >
          {x.title}
        </TextLink>
      ))}
    </div>
  );
}
