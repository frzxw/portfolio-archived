import type { PortfolioData } from "./schema";

export type SectionId =
  | "research"
  | "projects"
  | "apps"
  | "openSource"
  | "personalProjects";

export type SectionDef = {
  id: SectionId;
  title: string;
  /** manual kill-switch, independent of data */
  visible: boolean;
  /** auto-hide when the section has no real content */
  hasContent: (data: PortfolioData) => boolean;
};

/**
 * Single source of truth for page structure.
 * Reorder = reorder this array. Hide a section = flip `visible`.
 * Empty sections are hidden automatically via `hasContent`.
 */
export const sections: SectionDef[] = [
  {
    id: "research",
    title: "Research",
    visible: true,
    hasContent: (d) => d.research.length > 0,
  },
  {
    id: "projects",
    title: "Projects",
    visible: true,
    hasContent: (d) => d.projects.length > 0,
  },
  {
    id: "apps",
    title: "Applications",
    visible: true,
    hasContent: (d) => d.apps.length > 0,
  },
  {
    id: "openSource",
    title: "Open Source Contributions",
    visible: true,
    hasContent: (d) => d.openSource.length > 0,
  },
  {
    id: "personalProjects",
    title: "Personal Projects",
    visible: true,
    hasContent: (d) => d.personalProjects.length > 0,
  },
];
