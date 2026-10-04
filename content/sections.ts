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
  /** shown when the section has no content yet */
  placeholder: string;
  /** render the component even when empty (component handles its own empty state) */
  renderWhenEmpty?: boolean;
  hasContent: (data: PortfolioData) => boolean;
};

/**
 * Single source of truth for page structure.
 * Reorder = reorder this array. Hide a section = flip `visible`.
 * Empty sections render their `placeholder` instead of disappearing.
 */
export const sections: SectionDef[] = [
  {
    id: "research",
    title: "Research",
    visible: true,
    placeholder: "Research papers coming soon.",
    hasContent: (d) => d.research.length > 0,
  },
  {
    id: "projects",
    title: "Projects",
    visible: true,
    placeholder: "Projects coming soon.",
    renderWhenEmpty: true,
    hasContent: (d) => d.projects.length > 0,
  },
  {
    id: "apps",
    title: "Applications",
    visible: true,
    placeholder: "Applications coming soon.",
    hasContent: (d) => d.apps.length > 0,
  },
  {
    id: "openSource",
    title: "Open Source Contributions",
    visible: true,
    placeholder: "Open source contributions coming soon.",
    hasContent: (d) => d.openSource.length > 0,
  },
  {
    id: "personalProjects",
    title: "Personal Projects",
    visible: true,
    placeholder: "Personal projects coming soon.",
    hasContent: (d) => d.personalProjects.length > 0,
  },
];
