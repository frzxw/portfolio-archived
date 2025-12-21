"use client";

import type { Experience } from "../../../mock/portfolio";
import { TextLink } from "../ui/TextLink";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ExperiencesProps = {
  items: Experience[];
};

export function Experiences({ items }: ExperiencesProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {items.map((x) => {
        const key = `${x.company}-${x.role}`;
        const isActive = activeKey === key;

        const content = (
          <motion.div
            layout
            onMouseEnter={() => setActiveKey(key)}
            onMouseLeave={() => setActiveKey(null)}
            onFocus={() => setActiveKey(key)}
            onBlur={() => setActiveKey(null)}
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

            <AnimatePresence initial={false}>
              {isActive && x.contributions.length > 0 ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 text-sm text-(--color-text-secondary)">
                    {x.contributions.map((c) => (
                      <div key={c} className="flex gap-2">
                        <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-border-subtle)" />
                        <span className="min-w-0">{c}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );

        return x.href ? (
          <TextLink key={key} href={x.href} className="block">
            {content}
          </TextLink>
        ) : (
          <div key={key}>{content}</div>
        );
      })}
    </div>
  );
}
