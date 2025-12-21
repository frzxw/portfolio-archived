import Lanyard from "../Lanyard";
import { ThemeToggle } from "../theme/ThemeToggle";
import { TextLink } from "../ui/TextLink";
import type { PortfolioData } from "../../../mock/portfolio";
import { BrandIcon } from "../icons/BrandIcon";
import { Experiences } from "./Experiences";

type HeroProps = {
  data: Pick<PortfolioData, "name" | "socials" | "experiences">;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative w-full">
      <Lanyard className="absolute inset-0 z-50" style={{ height: "100svh" }} />

      <div className="relative z-40">
        <div className="centered section">
          <div className="flex items-start justify-between gap-6 pt-6 sm:pt-8">
            <h1 className="pointer-events-auto text-balance text-[clamp(2.75rem,7vw,4.75rem)] font-bold tracking-[-0.03em]">
              {data.name}
            </h1>

            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
          </div>

          <nav className="pointer-events-auto mt-2 flex flex-wrap items-center gap-2 text-xs text-(--color-text-secondary) sm:gap-3 sm:text-sm">
            {data.socials.map((s) => (
              <TextLink
                key={s.href}
                href={s.href}
                ariaLabel={s.label}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 row-hover"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card)">
                  <BrandIcon name={s.icon} size={14} />
                </span>
                <span className="font-medium">{s.label}</span>
              </TextLink>
            ))}
          </nav>

          <div className="pointer-events-auto mt-6 sm:mt-8">
            <div className="section-title">Experiences</div>
            <Experiences items={data.experiences} />
          </div>
        </div>
      </div>
    </section>
  );
}
