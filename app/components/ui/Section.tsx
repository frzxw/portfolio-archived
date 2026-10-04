"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "./cn";
import { domAnimation, LazyMotion, m } from "framer-motion";

type SectionProps = PropsWithChildren<{
  title: ReactNode;
  id?: string;
  className?: string;
}>;

export function Section({ title, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("section", className)}>
      <LazyMotion features={domAnimation}>
        <Container>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="section-title"
          >
            {title}
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {children}
          </m.div>
        </Container>
      </LazyMotion>
    </section>
  );
}
