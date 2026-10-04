export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x";
};

export type Experience = {
  company: string;
  role: string;
  href?: string;
  start: string;
  end: string;
  contributions: string[];
};

export type ResearchItem = {
  title: string;
  href: string;
  venue?: string;
  year?: string;
};

export type Project = {
  title: string;
  description: string;
  href: string;
  repo?: string;
  stackSlugs: string[];
  highlight?: string;
};

export type AppItem = {
  title: string;
  href: string;
  description: string;
  stack: string[];
};

export type OpenSourceItem = {
  title: string;
  href: string;
  stars: number;
  description?: string;
  stack: string[];
};

export type PersonalProject = {
  title: string;
  href: string;
  description: string;
  stack: string[];
};

export type PortfolioData = {
  name: string;
  tagline: string;
  socials: SocialLink[];
  experiences: Experience[];
  research: ResearchItem[];
  projects: Project[];
  apps: AppItem[];
  openSource: OpenSourceItem[];
  personalProjects: PersonalProject[];
};
