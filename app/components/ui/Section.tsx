import type { PropsWithChildren, ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "./cn";

type SectionProps = PropsWithChildren<{
  title: ReactNode;
  id?: string;
  className?: string;
}>;

export function Section({ title, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("section", className)}>
      <Container>
        <h2 className="section-title">{title}</h2>
        {children}
      </Container>
    </section>
  );
}
