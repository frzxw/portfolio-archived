import { portfolio } from "../../../mock/portfolio";
import { Hero } from "./Hero";
import { Section } from "../ui/Section";
import { Research } from "./Research";
import { InfiniteProjectsCarousel } from "./InfiniteProjectsCarousel";
import { Apps } from "./Apps";
import { OpenSource } from "./OpenSource";
import { PersonalProjects } from "./PersonalProjects";

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
