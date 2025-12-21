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

const PERSON_NAME = "Fariz Wibisono";
const TAGLINE =
  "Full‑Stack Engineer";

export const portfolio: PortfolioData = {
  name: PERSON_NAME,
  tagline: TAGLINE,
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/frzxw",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/frzxw/",
      icon: "linkedin",
    },
    {
      label: "X",
      href: "https://x.com/frzwibisono",
      icon: "x",
    },
  ],
  experiences: [
    {
      company: "Lorem ipsum dolor sit amet",
      role: "Lorem ipsum",
      start: "20XX",
      end: "20XX",
      href: "https://example.com/experience-1",
      contributions: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      ],
    },
    {
      company: "Sed ut perspiciatis unde",
      role: "Lorem ipsum",
      start: "20XX",
      end: "20XX",
      href: "https://example.com/experience-2",
      contributions: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      ],
    },
    {
      company: "At vero eos et accusamus",
      role: "Lorem ipsum",
      start: "20XX",
      end: "20XX",
      href: "https://example.com/experience-3",
      contributions: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      ],
    },
  ],
  research: [
    {
      title: "Lorem ipsum dolor sit amet",
      href: "https://example.com/research-1",
      venue: "Lorem ipsum",
      year: "20XX",
    },
    {
      title: "Sed do eiusmod tempor incididunt",
      href: "https://example.com/research-2",
      venue: "Lorem ipsum",
      year: "20XX",
    },
  ],
  projects: [
    {
      title: "Lorem ipsum project I",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      href: "https://example.com/project-1",
      repo: "https://example.com/repo-1",
      stackSlugs: ["typescript", "react", "nodedotjs"],
      highlight: "Lorem ipsum",
    },
    {
      title: "Lorem ipsum project II",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      href: "https://example.com/project-2",
      repo: "https://example.com/repo-2",
      stackSlugs: ["typescript", "nextdotjs", "react"],
      highlight: "Lorem ipsum",
    },
    {
      title: "Lorem ipsum project III",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      href: "https://example.com/project-3",
      repo: "https://example.com/repo-3",
      stackSlugs: ["typescript", "nodedotjs"],
      highlight: "Lorem ipsum",
    },
    {
      title: "Lorem ipsum project IV",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      href: "https://example.com/project-4",
      repo: "https://example.com/repo-4",
      stackSlugs: ["react", "nextdotjs"],
      highlight: "Lorem ipsum",
    },
    {
      title: "Lorem ipsum project V",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      href: "https://example.com/project-5",
      repo: "https://example.com/repo-5",
      stackSlugs: ["nextdotjs", "typescript"],
      highlight: "Lorem ipsum",
    },
    {
      title: "Lorem ipsum project VI",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      href: "https://example.com/project-6",
      repo: "https://example.com/repo-6",
      stackSlugs: ["typescript", "react"],
      highlight: "Lorem ipsum",
    },
  ],
  apps: [
    {
      title: "Lorem ipsum app I",
      href: "https://example.com/app-1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      stack: ["Lorem", "Ipsum", "Dolor"],
    },
    {
      title: "Lorem ipsum app II",
      href: "https://example.com/app-2",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
      stack: ["Lorem", "Ipsum"],
    },
  ],
  openSource: [
    {
      title: "Lorem ipsum open source I",
      href: "https://example.com/open-source-1",
      stars: 1234,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      stack: ["Lorem", "Ipsum"],
    },
    {
      title: "Lorem ipsum open source II",
      href: "https://example.com/open-source-2",
      stars: 567,
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      stack: ["Lorem", "Dolor"],
    },
  ],
  personalProjects: [
    {
      title: "Lorem ipsum personal I",
      href: "https://example.com/personal-1",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      stack: ["Lorem", "Ipsum", "Sit"],
    },
    {
      title: "Lorem ipsum personal II",
      href: "https://example.com/personal-2",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      stack: ["Lorem", "Ipsum"],
    },
  ],
};
