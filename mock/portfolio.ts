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

export const portfolio: PortfolioData = {
  name: "Fariz Wibisono",
  tagline: "Full‑Stack Engineer",
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
      company: "Tesla",
      role: "Senior Software Engineer",
      start: "2023",
      end: "Now",
      href: "https://www.tesla.com/",
      contributions: [
        "Led a latency budget program across critical user journeys.",
        "Built observability primitives that reduced MTTR by 40%.",
        "Shipped performance wins via profiling + automated regression checks.",
      ],
    },
    {
      company: "Stripe",
      role: "Software Engineer",
      start: "2021",
      end: "2023",
      href: "https://stripe.com/",
      contributions: [
        "Delivered end-to-end features across web, APIs, and data pipelines.",
        "Designed resilient async workflows with idempotency guarantees.",
        "Improved DX with typed clients and CI automation.",
      ],
    },
    {
      company: "Research Lab",
      role: "ML Engineer",
      start: "2019",
      end: "2021",
      contributions: [
        "Built evaluation harnesses for model iteration and reproducibility.",
        "Optimized training pipelines for throughput and cost.",
        "Published internal tooling adopted across multiple teams.",
      ],
    },
  ],
  research: [
    {
      title: "Fast, Reliable UX for High‑Throughput Systems",
      href: "https://example.com/paper",
      venue: "CHI",
      year: "2024",
    },
    {
      title: "Practical Streaming Architectures at Scale",
      href: "https://example.com/project",
      venue: "arXiv",
      year: "2023",
    },
  ],
  projects: [
    {
      title: "Realtime Collaboration Engine",
      description:
        "A low-latency CRDT-based sync engine with offline-first semantics and observability baked in.",
      href: "https://example.com/realtime",
      repo: "https://github.com/your-handle/realtime",
      stackSlugs: ["typescript", "react", "nodedotjs", "postgresql"],
      highlight: "99.9% conflict-free merges",
    },
    {
      title: "AI Retrieval Workspace",
      description:
        "RAG platform with structured memory, eval harness, and reproducible prompts for teams.",
      href: "https://example.com/rag",
      repo: "https://github.com/your-handle/rag-workspace",
      stackSlugs: ["python", "fastapi", "openai", "docker"],
      highlight: "Eval-driven iteration",
    },
    {
      title: "Design Token Compiler",
      description:
        "Design tokens in, multi-platform outputs out—typed, validated, and versioned.",
      href: "https://example.com/tokens",
      repo: "https://github.com/your-handle/tokens",
      stackSlugs: ["typescript", "nodedotjs"],
      highlight: "Zero-drift theming",
    },
    {
      title: "Latency Budget Dashboard",
      description:
        "A minimal dashboard that turns traces + logs into actionable product latency budgets.",
      href: "https://example.com/latency",
      repo: "https://github.com/your-handle/latency-budget",
      stackSlugs: ["react", "nextdotjs", "vercel"],
      highlight: "Microinteractions-first",
    },
    {
      title: "Secure File Drop",
      description:
        "End-to-end encrypted file transfers with short-lived links and audit-friendly events.",
      href: "https://example.com/filedrop",
      repo: "https://github.com/your-handle/filedrop",
      stackSlugs: ["nextdotjs", "typescript", "cloudflare"],
      highlight: "Strong defaults",
    },
    {
      title: "HPC Job Orchestrator",
      description:
        "Queueing, retries, and cluster autoscaling with deterministic job specs.",
      href: "https://example.com/hpc",
      repo: "https://github.com/your-handle/hpc-orchestrator",
      stackSlugs: ["go", "kubernetes", "prometheus"],
      highlight: "Production-grade ops",
    },
  ],
  apps: [
    {
      title: "Habit Ledger",
      href: "https://example.com/habit",
      description: "A tiny, fast habit tracker built for long-term consistency.",
      stack: ["TypeScript", "Next.js", "PostgreSQL"],
    },
    {
      title: "Read Later",
      href: "https://example.com/readlater",
      description: "Save, tag, and search articles with instant keyboard navigation.",
      stack: ["TypeScript", "React", "Node.js"],
    },
  ],
  openSource: [
    {
      title: "next.js contribution",
      href: "https://github.com/vercel/next.js",
      stars: 130000,
      description: "DX improvements and edge-case fixes.",
      stack: ["TypeScript", "React"],
    },
    {
      title: "react-three-fiber utilities",
      href: "https://github.com/pmndrs/react-three-fiber",
      stars: 28000,
      description: "Performance-oriented helpers.",
      stack: ["Three.js", "React"],
    },
  ],
  personalProjects: [
    {
      title: "Procedural typography experiments",
      href: "https://example.com/type",
      description: "Small generative studies exploring layout, kerning, and rhythm.",
      stack: ["TypeScript", "Canvas", "Web APIs"],
    },
    {
      title: "WebGL sketches",
      href: "https://example.com/webgl",
      description: "A collection of shader + interaction studies for the web.",
      stack: ["Three.js", "React", "GLSL"],
    },
  ],
};
