import type { PortfolioData } from "./schema";

const PERSON_NAME = "Fariz Wibisono";
const TAGLINE = "Full Stack Software Engineer";

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
  experiences: [],
  research: [],
  projects: [],
  apps: [],
  openSource: [],
  personalProjects: [],
};
