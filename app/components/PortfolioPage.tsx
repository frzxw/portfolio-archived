import dynamic from "next/dynamic";
import { portfolio } from "../../content/portfolio";
import { sections, type SectionId } from "../../content/sections";
import { Hero } from "./sections/hero/Hero";
import { Section } from "./ui/Section";

// Lazy load below-the-fold content to improve LCP
const sectionComponents: Record<SectionId, React.ComponentType<{ items: never[] }>> = {
  research: dynamic(
    () => import("./sections/research/Research").then((m) => ({ default: m.Research })),
    { loading: () => <div className="h-32" /> }
  ) as React.ComponentType<{ items: never[] }>,
  projects: dynamic(
    () =>
      import("./sections/projects/ProjectsCarousel").then((m) => ({
        default: m.InfiniteProjectsCarousel,
      })),
    { loading: () => <div className="h-80" /> }
  ) as React.ComponentType<{ items: never[] }>,
  apps: dynamic(
    () => import("./sections/apps/Apps").then((m) => ({ default: m.Apps })),
    { loading: () => <div className="h-32" /> }
  ) as React.ComponentType<{ items: never[] }>,
  openSource: dynamic(
    () => import("./sections/opensource/OpenSource").then((m) => ({ default: m.OpenSource })),
    { loading: () => <div className="h-32" /> }
  ) as React.ComponentType<{ items: never[] }>,
  personalProjects: dynamic(
    () => import("./sections/personal/PersonalProjects").then((m) => ({ default: m.PersonalProjects })),
    { loading: () => <div className="h-32" /> }
  ) as React.ComponentType<{ items: never[] }>,
};

const sectionData: Record<SectionId, unknown[]> = {
  research: portfolio.research,
  projects: portfolio.projects,
  apps: portfolio.apps,
  openSource: portfolio.openSource,
  personalProjects: portfolio.personalProjects,
};

export function PortfolioPage() {
  const activeSections = sections.filter((s) => s.visible && s.hasContent(portfolio));

  return (
    <main className="min-h-screen">
      <Hero data={portfolio} />

      {activeSections.map((s) => {
        const Body = sectionComponents[s.id];
        return (
          <Section key={s.id} title={s.title}>
            <Body items={sectionData[s.id] as never[]} />
          </Section>
        );
      })}

      <footer className="section">
        <div className="centered">
          <div className="text-sm text-(--color-text-secondary)">
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
