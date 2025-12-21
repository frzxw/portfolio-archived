import dynamic from "next/dynamic";
import { portfolio } from "../../../mock/portfolio";
import { Hero } from "./Hero";
import { Section } from "../ui/Section";

// Lazy load below-the-fold content to improve LCP
const Research = dynamic(() => import("./Research").then(m => ({ default: m.Research })), {
  loading: () => <div className="h-32" />,
});
const InfiniteProjectsCarousel = dynamic(
  () => import("./InfiniteProjectsCarousel").then(m => ({ default: m.InfiniteProjectsCarousel })),
  { loading: () => <div className="h-80" /> }
);
const Apps = dynamic(() => import("./Apps").then(m => ({ default: m.Apps })), {
  loading: () => <div className="h-32" />,
});
const OpenSource = dynamic(() => import("./OpenSource").then(m => ({ default: m.OpenSource })), {
  loading: () => <div className="h-32" />,
});
const PersonalProjects = dynamic(
  () => import("./PersonalProjects").then(m => ({ default: m.PersonalProjects })),
  { loading: () => <div className="h-32" /> }
);

export function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Hero data={portfolio} />

      <Section title="Research">
        <Research items={portfolio.research} />
      </Section>

      <Section title="Projects">
        <InfiniteProjectsCarousel items={portfolio.projects} />
      </Section>

      <Section title="Applications">
        <Apps items={portfolio.apps} />
      </Section>

      <Section title="Open Source Contributions">
        <OpenSource items={portfolio.openSource} />
      </Section>

      <Section title="Personal Projects">
        <PersonalProjects items={portfolio.personalProjects} />
      </Section>

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
